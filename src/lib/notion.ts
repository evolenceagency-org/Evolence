import "server-only";

import { Client } from "@notionhq/client";

import type { LeadPayload } from "@/lib/leads";

export class NotionNotConfiguredError extends Error {
  code = "NOTION_NOT_CONFIGURED" as const;

  constructor() {
    super("Server not configured.");
    this.name = "NotionNotConfiguredError";
  }
}

type CreateLeadPageInput = LeadPayload & {
  source?: string;
  createdAtIso?: string;
};

function getNotionClient() {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new Client({ auth: token });
}

export function getNotionConfig() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  return { token, databaseId };
}

export async function createLeadPage(input: CreateLeadPageInput) {
  const notion = getNotionClient();
  const { databaseId } = getNotionConfig();

  if (!notion || !databaseId) {
    throw new NotionNotConfiguredError();
  }

  const createdAtIso = input.createdAtIso ?? new Date().toISOString();
  const source = input.source ?? "Website";

  const detailsRichText: Array<{ text: { content: string } }> = [];
  if (input.plan) {
    detailsRichText.push({ text: { content: `Plan: ${input.plan}\n\n` } });
  }
  detailsRichText.push({ text: { content: input.message } });

  const page = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [{ text: { content: input.name } }],
      },
      Email: {
        rich_text: [{ text: { content: input.email } }],
      },
      Phone: {
        rich_text: input.whatsapp
          ? [{ text: { content: input.whatsapp } }]
          : [],
      },
      "Business Type": {
        rich_text: [{ text: { content: input.businessType } }],
      },
      Details: {
        rich_text: detailsRichText,
      },
      Source: {
        rich_text: [{ text: { content: source } }],
      },
      "Created At": {
        date: { start: createdAtIso },
      },
    },
  });

  return { pageId: page.id };
}
