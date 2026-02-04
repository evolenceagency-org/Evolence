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
    <div className={cn("flex flex-col gap-3", alignClasses, className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </Heading>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
