import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-[transform,opacity,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:translate-y-0 touch-manipulation";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
  secondary:
    "bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50",
  ghost:
    "text-slate-600 hover:bg-slate-100",
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
