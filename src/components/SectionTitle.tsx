import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  as?: "h1" | "h2";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  as = "h2",
  title,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) {
  const alignClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";

  const Heading = as;

  return (
    <div className={cn("flex flex-col gap-4", alignClasses, className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-[clamp(1.5rem,2.2vw+1rem,1.875rem)] font-semibold tracking-tight text-[#0f172a] leading-tight">
        {title}
      </Heading>
      {subtitle ? (
        <p className="max-w-2xl text-[clamp(0.875rem,0.6vw+0.75rem,0.95rem)] leading-7 text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
