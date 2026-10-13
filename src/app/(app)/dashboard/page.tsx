import { Metadata } from "next";
import { Card, StatCard, XPBar, Badge } from "@/components/ui";
import { GitHubHeatmap } from "@/components/dashboard/GitHubHeatmap";
import { getGitHubStats } from "@/lib/github/api";
import { getLevelFromXP, formatNumber } from "@/lib/utils";
import {
  Flame,
  Code2,
  Rocket,
  Trophy,
  GitCommit,
  Zap,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

// Mock data — will come from DB once auth is wired
const MOCK_USER = {
  name: "Vaibhav",
  username: "classyvaibhav06",
  github_username: "Classyvaibhav06",
  leetcode_username: "ev7utG9eiZ",
  xp: 2750,
  streak: 7,
  challenges_solved: 15,
  projects_shipped: 4,
  rank: 42,
};

const RECENT_CHALLENGES = [
  { title: "Reverse String", difficulty: "easy" as const, xp: 50, solved_at: "Recent" },
  { title: "Median of Two Sorted Arrays", difficulty: "hard" as const, xp: 200, solved_at: "Recent" },
  { title: "Add Two Numbers", difficulty: "medium" as const, xp: 100, solved_at: "Recent" },
  { title: "Two Sum", difficulty: "easy" as const, xp: 50, solved_at: "Verified" },
];

const RECENT_SHIPS = [
  { title: "DevProof", description: "Ship in public, level up.", status: "building" },
  { title: "CLI Dashboard", description: "Terminal productivity dashboard.", status: "launched" },
];

// Generate mock heatmap
function generateMockHeatmap() {
  return Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    const count = Math.random() < 0.4 ? Math.floor(Math.random() * 8) : 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
    return { date: date.toISOString().split("T")[0], count, level: level as 0 | 1 | 2 | 3 | 4 };
  });
}

const heatmapData = generateMockHeatmap();
const { level, title, progress, needed } = getLevelFromXP(MOCK_USER.xp);

const difficultyColors: Record<string, string> = {
  easy: "var(--color-status-success)",
  medium: "var(--color-status-warning)",
  hard: "var(--color-status-error)",
};

export default function DashboardPage() {
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
            Good morning, {MOCK_USER.name} 👋
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            You&apos;re on a{" "}
            <span style={{ color: "var(--color-status-warning)", fontWeight: 600 }}>
              {MOCK_USER.streak}-day streak
            </span>
            . Keep it going.
          </p>
        </div>
        <Badge variant="accent" dot>
          Rank #{MOCK_USER.rank}
        </Badge>
      </div>

      {/* XP Card */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Zap size={14} color="var(--color-accent)" fill="var(--color-accent)" />
            <span
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Experience Points
            </span>
          </div>
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
            }}
          >
            {needed.toLocaleString()} XP to next level
          </span>
        </div>
        <XPBar progress={progress} level={level} title={title} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {formatNumber(MOCK_USER.xp)}
          </span>
          <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            <span>XP · </span>
            <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>
              Level {level}
            </span>
            <span style={{ color: "var(--color-text-muted)" }}> · {title}</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <StatCard
          label="Streak"
          value={`${MOCK_USER.streak}d`}
          icon={<Flame size={14} />}
          accent
          sublabel="Personal best: 14d"
        />
        <StatCard
          label="Challenges"
          value={MOCK_USER.challenges_solved}
          icon={<Code2 size={14} />}
          sublabel="@ev7utG9eiZ on LeetCode"
        />
        <StatCard
          label="Projects"
          value={MOCK_USER.projects_shipped}
          icon={<Rocket size={14} />}
          sublabel="1 building now"
        />
        <StatCard
          label="Global Rank"
          value={`#${MOCK_USER.rank}`}
          icon={<Trophy size={14} />}
          sublabel="Top 5%"
        />
      </div>

      {/* Two-column: heatmap + recent */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem" }}>
        {/* GitHub Heatmap */}
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GitCommit size={14} color="var(--color-text-muted)" />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                GitHub Activity
              </span>
            </div>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
            >
              {heatmapData.reduce((a, d) => a + d.count, 0).toLocaleString()} contributions
            </span>
          </div>
          <GitHubHeatmap data={heatmapData} />
        </Card>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: 280 }}>
          {/* Recent Challenges */}
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.875rem",
              }}
            >
              <TrendingUp size={14} color="var(--color-text-muted)" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Recent Challenges</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {RECENT_CHALLENGES.map((c) => (
                <div
                  key={c.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <CheckCircle2 size={13} color={difficultyColors[c.difficulty]} />
                  <span
                    style={{
                      flex: 1,
                      fontSize: "0.75rem",
                      color: "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-accent)",
                    }}
                  >
                    +{c.xp}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Ships */}
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.875rem",
              }}
            >
              <Rocket size={14} color="var(--color-text-muted)" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Recent Ships</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {RECENT_SHIPS.map((p) => (
                <div
                  key={p.title}
                  style={{
                    padding: "0.5rem",
                    background: "var(--color-bg)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{p.title}</span>
                    <Badge variant={p.status === "launched" ? "accent" : "warning"}>
                      {p.status}
                    </Badge>
                  </div>
                  <p style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
