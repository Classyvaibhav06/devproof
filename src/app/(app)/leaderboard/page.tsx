import { Metadata } from "next";
import { Card, Avatar, Badge } from "@/components/ui";
import { Trophy, Zap, Flame, Code2, Rocket } from "lucide-react";
import { getLevelFromXP, formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Leaderboard" };

const USERS = [
  { rank: 1, name: "Priya K", username: "priyak", avatar_url: null, xp: 12400, streak: 45, challenges: 87, projects: 9 },
  { rank: 2, name: "Rahul V", username: "rahulv", avatar_url: null, xp: 9800, streak: 30, challenges: 72, projects: 7 },
  { rank: 3, name: "Aryan Shah", username: "aryanshah", avatar_url: null, xp: 7300, streak: 22, challenges: 58, projects: 5 },
  { rank: 4, name: "Vaibhav", username: "classyvaibhav06", avatar_url: null, xp: 2750, streak: 7, challenges: 23, projects: 4, isCurrentUser: true },
  { rank: 5, name: "Disha P", username: "dishap", avatar_url: null, xp: 2100, streak: 5, challenges: 18, projects: 2 },
  { rank: 6, name: "Karan M", username: "karanm", avatar_url: null, xp: 1800, streak: 3, challenges: 15, projects: 3 },
  { rank: 7, name: "Sneha R", username: "snehar", avatar_url: null, xp: 1400, streak: 2, challenges: 11, projects: 1 },
];

const rankMedal = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

export default function LeaderboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "0.25rem",
          }}
        >
          Leaderboard
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
          Global XP rankings. No fluff — just who puts in the work.
        </p>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
        {USERS.slice(0, 3).map((user) => {
          const { level, title } = getLevelFromXP(user.xp);
          return (
            <Card
              key={user.username}
              style={{
                textAlign: "center",
                border: user.rank === 1 ? "1px solid rgba(16,185,129,0.4)" : undefined,
                background: user.rank === 1 ? "var(--color-accent-dim)" : undefined,
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                {rankMedal(user.rank)}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <Avatar src={user.avatar_url} name={user.name} size="lg" />
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>
                {user.name}
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.625rem",
                }}
              >
                @{user.username}
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  letterSpacing: "-0.03em",
                }}
              >
                {formatNumber(user.xp)}
              </div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                XP · Lv {level} · {title}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Full table */}
      <Card padding="none">
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr 100px 80px 80px 80px",
            padding: "0.625rem 1rem",
            borderBottom: "1px solid var(--color-border)",
            fontSize: "0.625rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <span>#</span>
          <span>Developer</span>
          <span style={{ textAlign: "right" }}>
            <Zap size={10} style={{ display: "inline" }} /> XP
          </span>
          <span style={{ textAlign: "right" }}>
            <Flame size={10} style={{ display: "inline" }} /> Streak
          </span>
          <span style={{ textAlign: "right" }}>
            <Code2 size={10} style={{ display: "inline" }} /> Solved
          </span>
          <span style={{ textAlign: "right" }}>
            <Rocket size={10} style={{ display: "inline" }} /> Ships
          </span>
        </div>

        {/* Rows */}
        {USERS.map((user, i) => {
          const { level, title } = getLevelFromXP(user.xp);
          const medal = rankMedal(user.rank);
          return (
            <div
              key={user.username}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 100px 80px 80px 80px",
                padding: "0.75rem 1rem",
                borderBottom: i < USERS.length - 1 ? "1px solid var(--color-border-subtle)" : undefined,
                alignItems: "center",
                background: user.isCurrentUser ? "var(--color-accent-dim)" : "transparent",
                border: user.isCurrentUser ? "none" : undefined,
                borderLeft: user.isCurrentUser ? "2px solid var(--color-accent)" : undefined,
              }}
            >
              {/* Rank */}
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-muted)",
                  fontWeight: user.rank <= 3 ? 700 : 400,
                }}
              >
                {medal || `#${user.rank}`}
              </span>

              {/* User */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Avatar src={user.avatar_url} name={user.name} size="sm" />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-primary)" }}>
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <Badge variant="accent" style={{ fontSize: "0.5625rem", padding: "0 4px" }}>
                        you
                      </Badge>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "0.625rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Lv {level} · {title}
                  </div>
                </div>
              </div>

              {/* XP */}
              <span
                style={{
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                }}
              >
                {formatNumber(user.xp)}
              </span>

              {/* Streak */}
              <span
                style={{
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--color-status-warning)",
                }}
              >
                {user.streak}d
              </span>

              {/* Challenges */}
              <span
                style={{
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {user.challenges}
              </span>

              {/* Ships */}
              <span
                style={{
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {user.projects}
              </span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
