import { NextResponse } from "next/server";
import { APIResponseError } from "@notionhq/client";

import { validateLeadPayload } from "@/lib/leads";
import { createLeadPage, NotionNotConfiguredError } from "@/lib/notion";

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

  try {
    await createLeadPage({
      ...validated.data,
      source: "Website",
      createdAtIso: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof NotionNotConfiguredError) {
      return NextResponse.json(
        { ok: false, error: "Server not configured." },
        { status: 500 },
      );
    }

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
