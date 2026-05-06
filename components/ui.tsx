import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-sifo-teal/20 bg-sifo-mint px-2.5 py-1 text-xs font-medium text-sifo-blue", className)}>
      {children}
    </span>
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft", className)} {...props} />;
}

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-sifo-blue text-white shadow-glow hover:bg-sifo-blue/90",
        variant === "secondary" && "border border-slate-200 bg-white text-sifo-ink hover:border-sifo-teal/50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
