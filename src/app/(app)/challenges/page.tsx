import { Metadata } from "next";
import { Card, Badge, Button } from "@/components/ui";
import { Code2, CheckCircle2, Clock, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Challenges" };

const CHALLENGES = [
  {
    id: "1",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    xp: 50,
    leetcode_id: 1,
    solved_by: 2341,
    status: "verified",
    description: "Given an array of integers and a target, return indices of the two numbers that add up to target.",
  },
  {
    id: "2",
    slug: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    tags: ["Sliding Window", "Hash Table", "String"],
    xp: 100,
    leetcode_id: 3,
    solved_by: 1821,
    status: "pending",
    description: "Find the length of the longest substring without repeating characters.",
  },
  {
    id: "3",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "medium",
    tags: ["Array", "Sorting"],
    xp: 100,
    leetcode_id: 56,
    solved_by: 1203,
    status: null,
    description: "Given an array of intervals, merge all overlapping intervals.",
  },
  {
    id: "4",
    slug: "median-two-sorted",
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    tags: ["Binary Search", "Divide & Conquer"],
    xp: 200,
    leetcode_id: 4,
    solved_by: 543,
    status: null,
    description: "Find the median of the two sorted arrays with O(log(m+n)) time complexity.",
  },
  {
    id: "5",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "easy",
    tags: ["Stack", "String"],
    xp: 50,
    leetcode_id: 20,
    solved_by: 3012,
    status: "verified",
    description: "Determine if the input string of brackets is valid.",
  },
  {
    id: "6",
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "hard",
    tags: ["BFS", "Graph"],
    xp: 250,
    leetcode_id: 127,
    solved_by: 287,
    status: null,
    description: "Transform one word to another changing one letter at a time through valid words.",
  },
];

const difficultyConfig: Record<string, { label: string; variant: "accent" | "warning" | "error" }> = {
  easy: { label: "Easy", variant: "accent" },
  medium: { label: "Medium", variant: "warning" },
  hard: { label: "Hard", variant: "error" },
};

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  verified: { icon: CheckCircle2, color: "var(--color-status-success)", label: "Verified" },
  pending: { icon: Clock, color: "var(--color-status-warning)", label: "Pending" },
};

export default function ChallengesPage() {
  const solved = CHALLENGES.filter((c) => c.status === "verified").length;

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
            Challenges
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Solve LeetCode problems. Verification is automatic — just submit on LeetCode.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
            }}
          >
            <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{solved}</span>
            /{CHALLENGES.length} solved
          </span>
          <Button variant="secondary" size="sm">
            <Filter size={13} />
            Filter
          </Button>
        </div>
      </div>

      {/* How verification works */}
      <Card style={{ background: "var(--color-accent-dim)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <Code2 size={16} color="var(--color-accent)" style={{ marginTop: 2 }} />
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
              How verification works
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Link your LeetCode username in your profile. When you solve a challenge on LeetCode, DevProof
              automatically detects it within minutes and awards your XP. No screenshots, no manual submission.
            </p>
          </div>
        </div>
      </Card>

      {/* Challenge List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {CHALLENGES.map((challenge) => {
          const diff = difficultyConfig[challenge.difficulty];
          const statusInfo = challenge.status ? statusConfig[challenge.status] : null;
          const StatusIcon = statusInfo?.icon;

          return (
            <Card
              key={challenge.id}
              hover
              padding="none"
              style={{ cursor: "pointer" }}
            >
              <Link
                href={`/challenges/${challenge.slug}`}
                style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "0.875rem 1rem", gap: "1rem" }}
              >
                {/* Status indicator */}
                <div style={{ width: 20, flexShrink: 0 }}>
                  {StatusIcon ? (
                    <StatusIcon size={16} color={statusInfo?.color} />
                  ) : (
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "1.5px solid var(--color-border)",
                      }}
                    />
                  )}
                </div>

                {/* Title + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                      marginBottom: "0.125rem",
                    }}
                  >
                    {challenge.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {challenge.description}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
                  {challenge.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.625rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-text-muted)",
                        background: "var(--color-surface-raised)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "1px 6px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Difficulty */}
                <Badge variant={diff.variant} style={{ flexShrink: 0 }}>
                  {diff.label}
                </Badge>

                {/* XP */}
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                    flexShrink: 0,
                    width: 48,
                    textAlign: "right",
                  }}
                >
                  +{challenge.xp}
                </span>

                {/* LeetCode link */}
                <ExternalLink
                  size={13}
                  style={{ color: "var(--color-text-muted)", flexShrink: 0 }}
                />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
