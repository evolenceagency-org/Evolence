import type { PlanName } from "@/lib/leads";

export const SITE = {
  name: "Evolence",
  title: "Evolence - Digital systems that make your business run faster",
  description:
    "Notion systems, AI automation, and modern web presence - built fast and designed to convert.",
  trustLine: "Notion systems / Automation / Modern websites",
};

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    title: "Notion Systems",
    description:
      "A clean, fast workspace that replaces chaos with one system your team actually uses.",
    bullets: [
      "Dashboards, CRM, tasks, pipelines",
      "Templates tailored to your workflow",
      "Simple handoff + usage guide",
    ],
  },
  {
    title: "AI + Automation",
    description:
      "AI workflows that save hours every week without adding tool overload or complexity.",
    bullets: [
      "AI task breakdown & planning",
      "Prompt systems for consistent output",
      "Automations with Notion + Make",
    ],
  },
  {
    title: "Modern Web Presence",
    description:
      "A premium, mobile-first site that loads fast and makes your offer instantly clear.",
    bullets: [
      "High-converting one-pagers",
      "Multi-page performance websites",
      "SEO-friendly structure",
    ],
  },
] as const;

export type Plan = {
  name: PlanName;
  priceRange: string;
  billing: "One-time";
  popular?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Starter",
    priceRange: "300-400 MAD",
    billing: "One-time",
    popular: true,
    features: [
      "AI Project System or 1-page AI Website",
      "Built with Notion or Next.js (AI-assisted)",
      "Clean structure, mobile-ready",
      "Basic AI prompts / copy",
      "Delivery in 48 hours",
    ],
  },
  {
    name: "Pro",
    priceRange: "800-1,000 MAD",
    billing: "One-time",
    features: [
      "AI Project Management System (tasks, projects, clients)",
      "1-page or multi-section website",
      "AI task breakdown & planning",
      "Custom structure for the business",
      "Delivery in 3-4 days",
    ],
  },
  {
    name: "Elite",
    priceRange: "1,800-2,500 MAD",
    billing: "One-time",
    features: [
      "Full AI operations system (projects, clients, team)",
      "Advanced AI workflows & prompts",
      "Automations (Notion + Make)",
      "Multi-page performance website",
      "Priority delivery + onboarding call",
    ],
  },
];

export const FAQS = [
  {
    q: "What do you need from me to start?",
    a: "A short message about your business, your offer, and what you want to improve. If needed, we'll do a quick call.",
  },
  {
    q: "Can you work with my existing Notion setup?",
    a: "Yes. We can clean it up, simplify the structure, and keep what's already working.",
  },
  {
    q: "Do you offer monthly retainers?",
    a: "Not currently. We focus on fast, one-time builds with a clear scope and quick delivery.",
  },
  {
    q: "What's included in the website deliverable?",
    a: "A premium, mobile-first site with clean structure, fast load, and clear sections that support your conversion goal.",
  },
  {
    q: "How do AI workflows/automation fit in?",
    a: "We build repeatable prompts and simple automations so planning, writing, and operations take less time and feel consistent.",
  },
];

export const SOCIALS = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
};
