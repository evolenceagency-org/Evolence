/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_WHATSAPP_URL?: string;
    NEXT_PUBLIC_INSTAGRAM_URL?: string;
    NOTION_TOKEN?: string;
    NOTION_DATABASE_ID?: string;
    MAKE_WEBHOOK_URL?: string;
  }
}
