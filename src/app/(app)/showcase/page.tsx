import { Metadata } from "next";
import { Card, Badge, Button, Avatar } from "@/components/ui";
import { Rocket, Plus, ExternalLink, GitBranch, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Showcase" };

const PROJECTS = [
  {
    id: "1",
    title: "DevProof",
    description: "The platform where developers prove their skills by shipping projects in public, solving challenges, and climbing the XP leaderboard.",
    tech_stack: ["Next.js", "TypeScript", "Neon", "Tailwind"],
    github_url: "https://github.com/Classyvaibhav06/devproof",
    live_url: null,
    status: "building",
    user: { name: "Vaibhav", username: "classyvaibhav06", avatar_url: null },
    likes: 24,
    comments: 8,
    images: [],
    created_at: "2d ago",
  },
  {
    id: "2",
    title: "Bento Grid Generator",
    description: "A drag-and-drop bento grid layout generator that exports clean Tailwind CSS code.",
    tech_stack: ["React", "Framer Motion", "Tailwind"],
    github_url: "https://github.com/example/bento",
    live_url: "https://bento-gen.vercel.app",
    status: "launched",
    user: { name: "Aryan Shah", username: "aryanshah", avatar_url: null },
    likes: 87,
    comments: 21,
    images: [],
    created_at: "5d ago",
  },
  {
    id: "3",
    title: "CLI Dashboard",
    description: "A terminal-based productivity dashboard with tasks, Pomodoro timer, and GitHub stats displayed in the terminal.",
    tech_stack: ["Go", "Bubble Tea", "GitHub API"],
    github_url: "https://github.com/example/cli-dash",
    live_url: null,
    status: "launched",
    user: { name: "Priya K", username: "priyak", avatar_url: null },
    likes: 142,
    comments: 34,
    images: [],
    created_at: "1w ago",
  },
];

const statusConfig: Record<string, { label: string; variant: "accent" | "warning" | "info" }> = {
  building: { label: "Building", variant: "warning" },
  launched: { label: "Launched 🚀", variant: "accent" },
  archived: { label: "Archived", variant: "info" },
};

export default function ShowcasePage() {
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
            Showcase
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Ship in public. Share your projects, devlogs, and progress.
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={14} />
          Ship a Project
        </Button>
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {PROJECTS.map((project) => {
          const statusInfo = statusConfig[project.status];

          return (
            <Card key={project.id} hover style={{ cursor: "pointer" }}>
              {/* Top row: user + status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.875rem",
                }}
              >
                <Link
                  href={`/profile/${project.user.username}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  <Avatar src={project.user.avatar_url} name={project.user.name} size="sm" />
                  <div>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {project.user.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        marginLeft: "0.375rem",
                      }}
                    >
                      · {project.created_at}
                    </span>
                  </div>
                </Link>
                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
              </div>

              {/* Title + description */}
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.375rem",
                  color: "var(--color-text-primary)",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "0.875rem",
                }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.375rem",
                  marginBottom: "0.875rem",
                }}
              >
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.6875rem",
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

              {/* Bottom row: links + reactions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--color-border-subtle)",
                  paddingTop: "0.75rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.625rem" }}>
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                      }}
                    >
                      <GitBranch size={13} />
                      Source
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                      }}
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-text-muted)",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <Heart size={13} />
                    {project.likes}
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-text-muted)",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <MessageCircle size={13} />
                    {project.comments}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
