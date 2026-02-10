"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { BUSINESS_TYPES, type PlanName } from "@/lib/leads";

type LeadFieldErrors = Partial<
  Record<"name" | "email" | "whatsapp" | "businessType" | "message", string>
>;

type ContactFormProps = {
  plan?: PlanName;
};

export function ContactForm({ plan }: ContactFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});

  const selectedPlanLabel = useMemo(() => {
    if (!plan) return null;
    return `Selected plan: ${plan}`;
  }, [plan]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setFormError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim() || undefined,
      businessType: String(formData.get("businessType") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      plan: plan,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => null)) as
        | {
            ok: true;
            error?: never;
          }
        | {
            ok: false;
            error?: string | { message?: string; fields?: Record<string, string> };
          }
        | null;

      if (res.ok && json?.ok) {
        router.push("/thanks");
        return;
      }

      if (res.status === 400 && json && "ok" in json && json.ok === false) {
        const errorObject =
          json.error && typeof json.error === "object" ? json.error : undefined;
        const fields = errorObject?.fields ?? {};
        setFieldErrors({
          name: fields.name,
          email: fields.email,
          whatsapp: fields.whatsapp,
          businessType: fields.businessType,
          message: fields.message,
        });
        setFormError(errorObject?.message ?? "Please fix the highlighted fields.");
        return;
      }

      const errorMessage =
        typeof json?.error === "string" ? json.error : json?.error?.message;

      setFormError(errorMessage ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const inputBase =
    "mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 outline-none transition focus:ring-2 focus:ring-blue-500/30";

  const labelBase = "text-sm font-medium text-slate-900";

  const errorText = "mt-2 text-xs font-medium text-rose-600";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {selectedPlanLabel ? (
        <div className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
          {selectedPlanLabel}
        </div>
      ) : null}

      {formError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
          {formError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={labelBase} htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={cn(
              inputBase,
              fieldErrors.name && "ring-rose-300 focus:ring-rose-400/40",
            )}
            aria-invalid={Boolean(fieldErrors.name) || undefined}
          />
          {fieldErrors.name ? <p className={errorText}>{fieldErrors.name}</p> : null}
        </div>

        <div className="sm:col-span-1">
          <label className={labelBase} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cn(
              inputBase,
              fieldErrors.email && "ring-rose-300 focus:ring-rose-400/40",
            )}
            aria-invalid={Boolean(fieldErrors.email) || undefined}
          />
          {fieldErrors.email ? (
            <p className={errorText}>{fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label className={labelBase} htmlFor="whatsapp">
            WhatsApp <span className="text-slate-500">(optional)</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+212..."
            className={cn(
              inputBase,
              fieldErrors.whatsapp && "ring-rose-300 focus:ring-rose-400/40",
            )}
            aria-invalid={Boolean(fieldErrors.whatsapp) || undefined}
          />
          {fieldErrors.whatsapp ? (
            <p className={errorText}>{fieldErrors.whatsapp}</p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label className={labelBase} htmlFor="businessType">
            Business type
          </label>
          <select
            id="businessType"
            name="businessType"
            required
            className={cn(
              inputBase,
              "pr-10",
              fieldErrors.businessType &&
                "ring-rose-300 focus:ring-rose-400/40",
            )}
            defaultValue=""
            aria-invalid={Boolean(fieldErrors.businessType) || undefined}
          >
            <option value="" disabled>
              Choose one...
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {fieldErrors.businessType ? (
            <p className={errorText}>{fieldErrors.businessType}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className={labelBase} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(
            inputBase,
            "resize-none",
            fieldErrors.message && "ring-rose-300 focus:ring-rose-400/40",
          )}
          aria-invalid={Boolean(fieldErrors.message) || undefined}
          placeholder="Tell us what you want to build (and what 'done' looks like)."
        />
        {fieldErrors.message ? (
          <p className={errorText}>{fieldErrors.message}</p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            Minimum 10 characters. We reply within 24h.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#2563eb] px-6 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send message"}
        </button>

        {plan ? (
          <p className="text-xs text-slate-500">
            You selected <span className="font-medium text-slate-700">{plan}</span>.{" "}
            <span className="hidden sm:inline">
              You can also change it on the Pricing page.
            </span>
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            Prefer a plan first?{" "}
            <Link
              href="/pricing"
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
            >
              See pricing
            </Link>
            .
          </p>
        )}
      </div>
    </form>
  );
}
