import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-technical-yellow text-charcoal shadow-[0_8px_22px_rgba(0,0,0,.16)] hover:-translate-y-0.5 hover:bg-technical-yellow-hover hover:shadow-[0_12px_28px_rgba(0,0,0,.24)]",
  secondary: "border border-white/30 bg-transparent text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5 hover:shadow-[0_10px_24px_rgba(0,0,0,.18)]",
  ghost: "bg-transparent text-current hover:bg-white/10",
};

export function Button({ className, variant = "primary", href, children, type = "button", ...props }: ButtonProps) {
  const styles = cn("group inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-250 [&_svg]:transition-transform [&_svg]:duration-250 hover:[&_svg]:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technical-yellow disabled:pointer-events-none disabled:opacity-50", variants[variant], className);
  if (href) return <Link href={href} className={styles} aria-label={props["aria-label"]} target={props.target} rel={props.rel}>{children}</Link>;
  return <button type={type} className={styles} {...props}>{children}</button>;
}
