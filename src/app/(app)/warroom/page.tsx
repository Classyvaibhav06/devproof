import { Metadata } from "next";
import { Card, Badge, Button, Avatar } from "@/components/ui";
import { Briefcase, Plus, Users, DollarSign, Code2, Search } from "lucide-react";

export const metadata: Metadata = { title: "War Room" };

const POSTS = [
  {
    id: "1",
    title: "Building a AI-powered code reviewer — need a backend engineer",
    description:
      "We're building a tool that does automated PR reviews using LLMs. The MVP is live, 200 users. Looking for someone to help scale the Node.js API and optimize database queries.",
    looking_for: ["Backend Engineer", "DevOps"],
    tech_stack: ["Node.js", "PostgreSQL", "OpenAI API", "Redis"],
    compensation: "equity",
    status: "open",
    user: { name: "Rahul V", username: "rahulv", avatar_url: null, xp: 4200 },
    applications: 7,
    created_at: "3d ago",
  },
  {
    id: "2",
    title: "Open-source developer tools library — contributors welcome",
    description:
      "Building a comprehensive developer utilities library in TypeScript. No strings attached — open source, MIT license. Looking for maintainers who want real OSS credits.",
    looking_for: ["TypeScript Dev", "Docs Writer"],
    tech_stack: ["TypeScript", "Vitest", "Rollup"],
    compensation: "open-source",
    status: "open",
    user: { name: "Priya K", username: "priyak", avatar_url: null, xp: 7800 },
    applications: 14,
    created_at: "1w ago",
  },
  {
    id: "3",
    title: "Paid work: build a SaaS analytics dashboard",
    description:
      "Looking for a React/Next.js frontend developer for a 2-month contract. Building an analytics dashboard for a B2B SaaS. $30-50/hr depending on skills.",
    looking_for: ["Frontend Dev", "React"],
    tech_stack: ["Next.js", "Recharts", "TypeScript", "Tailwind"],
    compensation: "paid",
    status: "open",
    user: { name: "Aryan Shah", username: "aryanshah", avatar_url: null, xp: 3100 },
    applications: 22,
    created_at: "2d ago",
  },
];

const compensationConfig: Record<string, { label: string; variant: "accent" | "warning" | "info" | "error" }> = {
  equity: { label: "Equity", variant: "warning" },
  "open-source": { label: "Open Source", variant: "info" },
  paid: { label: "Paid 💰", variant: "accent" },
  unpaid: { label: "Unpaid", variant: "error" },
};

export default function WaRoomPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.25rem",
            }}
          >
            War Room
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Find collaborators, contributors, and projects to join.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="secondary" size="sm">
            <Search size={13} />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} />
            Post
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "0.75rem 1rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {[
          { label: "Open Posts", value: "47", icon: Briefcase },
          { label: "Active Devs", value: "312", icon: Users },
          { label: "Paid Gigs", value: "12", icon: DollarSign },
          { label: "Open Source", value: "28", icon: Code2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon size={13} style={{ color: "var(--color-text-muted)" }} />
            <span
              style={{
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {value}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {POSTS.map((post) => {
          const comp = compensationConfig[post.compensation];
          return (
            <Card key={post.id} hover style={{ cursor: "pointer" }}>
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.125rem",
                    }}
                  >
                    {post.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Avatar src={post.user.avatar_url} name={post.user.name} size="xs" />
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      {post.user.name} ·{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-accent)",
                          fontSize: "0.6875rem",
                        }}
                      >
                        {post.user.xp.toLocaleString()} XP
                      </span>{" "}
                      · {post.created_at}
                    </span>
                  </div>
                </div>
                <Badge variant={comp.variant}>{comp.label}</Badge>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "0.875rem",
                }}
              >
                {post.description}
              </p>

              {/* Looking for */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.375rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                  Looking for:
                </span>
                {post.looking_for.map((role) => (
                  <span
                    key={role}
                    className="badge badge-accent"
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.875rem" }}>
                {post.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.625rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      background: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "1px 7px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--color-border-subtle)",
                  paddingTop: "0.75rem",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  <span
                    style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-text-secondary)" }}
                  >
                    {post.applications}
                  </span>{" "}
                  applications
                </span>
                <Button variant="primary" size="sm">
                  Apply
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
