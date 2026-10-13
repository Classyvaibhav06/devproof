"use client";

import { cn } from "@/lib/utils";
import React from "react";

// ─── Button ────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md border transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white border-transparent focus-visible:outline-[var(--color-accent)]",
    secondary:
      "bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] border-[var(--color-border)] focus-visible:outline-[var(--color-accent)]",
    ghost:
      "bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-transparent",
    danger:
      "bg-transparent hover:bg-[rgba(239,68,68,0.1)] text-[var(--color-status-error)] border-[rgba(239,68,68,0.3)] hover:border-[var(--color-status-error)]",
  };

  const sizes = {
    sm: "h-7 px-3 text-xs",
    md: "h-8 px-4 text-sm",
    lg: "h-10 px-6 text-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── Card ───────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({ hover, padding = "md", className, children, ...props }: CardProps) {
  const paddings = { none: "", sm: "p-3", md: "p-4", lg: "p-6" };
  return (
    <div
      className={cn(
        "card",
        hover && "card-hover",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge ──────────────────────────────────────────────────────
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "warning" | "error" | "info" | "default";
  dot?: boolean;
}

export function Badge({ variant = "default", dot, className, children, ...props }: BadgeProps) {
  const variantClass = variant === "default" ? "badge" : `badge badge-${variant}`;
  return (
    <span className={cn(variantClass, className)} {...props}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}

// ─── Input ──────────────────────────────────────────────────────
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
}

export function Input({ label, error, prefix, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 500 }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={cn("input", prefix && "pl-8", error && "border-[var(--color-status-error)]", className)}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: "0.6875rem", color: "var(--color-status-error)" }}>{error}</span>
      )}
    </div>
  );
}

// ─── Textarea ───────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 500 }}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "input resize-none",
          error && "border-[var(--color-status-error)]",
          className
        )}
        {...props}
      />
      {error && (
        <span style={{ fontSize: "0.6875rem", color: "var(--color-status-error)" }}>{error}</span>
      )}
    </div>
  );
}

// ─── Avatar ─────────────────────────────────────────────────────
interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
}

export function Avatar({ src, name, size = "md", online }: AvatarProps) {
  const sizes = { xs: 20, sm: 28, md: 36, lg: 48, xl: 64 };
  const px = sizes[size];
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="relative inline-block" style={{ width: px, height: px }}>
      {src ? (
        <img
          src={src}
          alt={name || "Avatar"}
          style={{
            width: px,
            height: px,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid var(--color-border)",
          }}
        />
      ) : (
        <div
          style={{
            width: px,
            height: px,
            borderRadius: "50%",
            background: "var(--color-accent-subtle)",
            border: "1px solid rgba(16,185,129,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-accent)",
            fontSize: px < 32 ? "0.6rem" : "0.75rem",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
          }}
        >
          {initials}
        </div>
      )}
      {online && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: px * 0.28,
            height: px * 0.28,
            borderRadius: "50%",
            background: "var(--color-status-success)",
            border: "2px solid var(--color-bg)",
            boxShadow: "0 0 6px var(--color-status-success)",
          }}
        />
      )}
    </div>
  );
}

// ─── Divider ────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cn("divider", className)} />;
}

// ─── Skeleton ───────────────────────────────────────────────────
export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("skeleton rounded-md", className)}
      style={{ height: 16, ...style }}
    />
  );
}

// ─── XP Bar ─────────────────────────────────────────────────────
interface XPBarProps {
  progress: number; // 0-100
  level: number;
  title: string;
  compact?: boolean;
}

export function XPBar({ progress, level, title, compact }: XPBarProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {!compact && (
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontWeight: 600,
            }}
          >
            LVL {level} · {title}
          </span>
          <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: boolean;
  sublabel?: string;
}

export function StatCard({ label, value, icon, accent, sublabel }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: "0.6875rem",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        {icon && (
          <span style={{ color: accent ? "var(--color-accent)" : "var(--color-text-muted)" }}>
            {icon}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: accent ? "var(--color-accent)" : "var(--color-text-primary)",
        }}
      >
        {value}
      </div>
      {sublabel && (
        <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>{sublabel}</span>
      )}
    </Card>
  );
}
