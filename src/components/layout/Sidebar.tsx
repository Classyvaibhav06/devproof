"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code2,
  Briefcase,
  MessageSquare,
  Timer,
  Trophy,
  Rocket,
  User,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, XPBar } from "@/components/ui";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/challenges", icon: Code2, label: "Challenges" },
  { href: "/showcase", icon: Rocket, label: "Showcase" },
  { href: "/warroom", icon: Briefcase, label: "War Room" },
  { href: "/focus", icon: Timer, label: "Focus" },
  { href: "/chat", icon: MessageSquare, label: "Messages" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
];

interface SidebarProps {
  user?: {
    name?: string;
    username?: string;
    avatar_url?: string | null;
    xp?: number;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const xp = user?.xp || 0;
  const level = Math.floor(xp / 500) + 1;
  const progress = ((xp % 500) / 500) * 100;

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Zap size={16} color="var(--color-accent)" fill="var(--color-accent)" />
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.9375rem",
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
          }}
        >
          DevProof
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0.5rem 0.5rem" }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.4375rem 0.75rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "0.125rem",
                fontSize: "0.8125rem",
                fontWeight: active ? 500 : 400,
                color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: active ? "var(--color-surface-raised)" : "transparent",
                border: active ? "1px solid var(--color-border)" : "1px solid transparent",
                textDecoration: "none",
                transition: "all 0.1s ease",
              }}
              className="hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text-primary)]"
            >
              <Icon size={15} style={{ opacity: active ? 1 : 0.7 }} />
              {label}
              {active && (
                <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.5 }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {user && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Link
            href={`/profile/${user.username}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
            }}
          >
            <Avatar src={user.avatar_url} name={user.name} size="sm" online />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name || user.username}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {xp.toLocaleString()} XP
              </div>
            </div>
            <User size={13} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
          </Link>
          <XPBar progress={progress} level={level} title="" compact />
        </div>
      )}
    </aside>
  );
}
