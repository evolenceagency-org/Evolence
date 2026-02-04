export const BUSINESS_TYPES = [
  "Freelancer",
  "Coach / Consultant",
  "Agency",
  "Local Service",
  "E-commerce",
  "Other",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const PLAN_NAMES = ["Starter", "Pro", "Elite"] as const;
export type PlanName = (typeof PLAN_NAMES)[number];

export type LeadPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  businessType: BusinessType;
  message: string;
  plan?: PlanName;
};

type LeadValidationError = {
  message: string;
  fields: Partial<Record<keyof LeadPayload, string>>;
};

type LeadValidationResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; error: LeadValidationError };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "";
}

export function validateLeadPayload(payload: unknown): LeadValidationResult {
  const errors: LeadValidationError = {
    message: "Please fix the highlighted fields.",
    fields: {},
  };

  if (!isRecord(payload)) {
    errors.fields.name = "Full name is required.";
    errors.fields.email = "Email is required.";
    errors.fields.businessType = "Business type is required.";
    errors.fields.message = "Message is required.";
    return { ok: false, error: errors };
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const whatsapp = asTrimmedString(payload.whatsapp);
  const businessType = asTrimmedString(payload.businessType);
  const message = asTrimmedString(payload.message);
  const plan = asTrimmedString(payload.plan);

  if (!name) {
    errors.fields.name = "Full name is required.";
  } else if (name.length < 2 || name.length > 80) {
    errors.fields.name = "Full name must be 2–80 characters.";
  }

  if (!email) {
    errors.fields.email = "Email is required.";
  } else if (email.length > 254 || !EMAIL_RE.test(email)) {
    errors.fields.email = "Invalid email.";
  }

  if (whatsapp && whatsapp.length > 30) {
    errors.fields.whatsapp = "WhatsApp must be 30 characters or less.";
  }

  if (!businessType) {
    errors.fields.businessType = "Business type is required.";
  } else if (!BUSINESS_TYPES.includes(businessType as BusinessType)) {
    errors.fields.businessType = "Please choose a valid business type.";
  }

  if (!message) {
    errors.fields.message = "Message is required.";
  } else if (message.length < 10 || message.length > 2000) {
    errors.fields.message = "Message must be 10–2000 characters.";
  }

  if (plan && !PLAN_NAMES.includes(plan as PlanName)) {
    errors.fields.plan = "Invalid plan.";
  }

  if (Object.keys(errors.fields).length > 0) {
    return { ok: false, error: errors };
  }

  return {
    ok: true,
    data: {
      name: name!,
      email: email!,
      whatsapp: whatsapp || undefined,
      businessType: businessType as BusinessType,
      message: message!,
      plan: (plan as PlanName) || undefined,
    },
  };
}

