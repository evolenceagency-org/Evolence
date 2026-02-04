import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-zinc-100/20";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
  secondary:
    "bg-white/70 text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-white dark:bg-zinc-900/50 dark:text-zinc-100 dark:ring-zinc-800 dark:hover:bg-zinc-900/70",
  ghost:
    "text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

type ButtonCommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLinkProps = ButtonCommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">;

type ButtonAsButtonProps = ButtonCommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
