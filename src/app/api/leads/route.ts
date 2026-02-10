import { NextResponse } from "next/server";
import { APIResponseError } from "@notionhq/client";

import { validateLeadPayload } from "@/lib/leads";
import { createLeadPage, getNotionConfig } from "@/lib/notion";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { message: "Invalid JSON." } },
      { status: 400 },
    );
  }

  const validated = validateLeadPayload(body);
  if (!validated.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: validated.error.message,
          fields: validated.error.fields,
        },
      },
      { status: 400 },
    );
  }

  const createdAtIso = new Date().toISOString();
  const leadPayload = {
    ...validated.data,
    source: "Website",
    createdAtIso,
  };

  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
  const notionConfig = getNotionConfig();
  const notionConfigured = Boolean(
    notionConfig.token && notionConfig.databaseId,
  );
  const makeConfigured = Boolean(makeWebhookUrl);

  if (!notionConfigured && !makeConfigured) {
    return NextResponse.json(
      { ok: false, error: "Server not configured." },
      { status: 500 },
    );
  }

  try {
    const tasks: Promise<unknown>[] = [];

    if (notionConfigured) {
      tasks.push(createLeadPage(leadPayload));
    }

    if (makeConfigured && makeWebhookUrl) {
      tasks.push(
        sendToMakeWebhook(makeWebhookUrl, {
          ...leadPayload,
          meta: {
            userAgent: req.headers.get("user-agent") ?? "",
            ip: req.headers.get("x-forwarded-for") ?? "",
            referer: req.headers.get("referer") ?? "",
          },
        }),
      );
    }

    const results = await Promise.allSettled(tasks);
    results.forEach((result) => {
      if (result.status !== "rejected") return;
      const reason = result.reason;
      if (APIResponseError.isAPIResponseError(reason)) {
        console.error("Notion APIResponseError", {
          status: reason.status,
          code: reason.code,
          body: reason.body,
        });
        return;
      }
      console.error("Lead delivery failed", reason);
    });
    const hasSuccess = results.some((result) => result.status === "fulfilled");

    if (!hasSuccess) {
      throw new Error("Lead capture failed.");
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (APIResponseError.isAPIResponseError(err)) {
      console.error("Notion APIResponseError", {
        status: err.status,
        code: err.code,
        body: err.body,
      });
    } else {
      console.error("Lead capture error", err);
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Could not save your message. Please try again.",
      },
      { status: 500 },
    );
  }
}

async function sendToMakeWebhook(url: string, payload: unknown) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Make webhook failed: ${res.status} ${body}`);
    }

    return { ok: true };
  } finally {
    clearTimeout(timeout);
  }
}
