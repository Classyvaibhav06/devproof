"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const [dark, setDark] = useState(true);

  return (
    <header
      style={{
        height: 52,
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        paddingInline: "1.25rem",
        gap: "0.75rem",
        background: "var(--color-bg)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {title && (
        <h1
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            marginRight: "auto",
          }}
        >
          {title}
        </h1>
      )}

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "0.3125rem 0.625rem",
          width: 200,
          cursor: "text",
          marginLeft: title ? 0 : "auto",
        }}
      >
        <Search size={13} style={{ color: "var(--color-text-muted)" }} />
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          Search devs, projects...
        </span>
        <kbd
          style={{
            marginLeft: "auto",
            fontSize: "0.625rem",
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
            borderRadius: 3,
            padding: "1px 4px",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <Button variant="ghost" size="sm" style={{ padding: "0.25rem" }}>
        <Bell size={15} />
      </Button>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="sm"
        style={{ padding: "0.25rem" }}
        onClick={() => setDark(!dark)}
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </Button>
    </header>
  );
}
