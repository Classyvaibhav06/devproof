"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
  Code2,
  CheckCircle2,
  Clock,
  ExternalLink,
  RefreshCw,
  Zap,
  Check,
  AlertCircle,
} from "lucide-react";

interface LeetCodeProfileStats {
  username: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: {
    id: string;
    title: string;
    titleSlug: string;
    timestamp: string;
  }[];
}

const INITIAL_CHALLENGES = [
  {
    id: "1",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "easy" as const,
    tags: ["Array", "Hash Table"],
    xp: 50,
    leetcode_id: 1,
    description: "Given an array of integers and a target, return indices of the two numbers that add up to target.",
  },
  {
    id: "2",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "easy" as const,
    tags: ["Stack", "String"],
    xp: 50,
    leetcode_id: 20,
    description: "Determine if the input string of brackets is valid.",
  },
  {
    id: "3",
    slug: "reverse-string",
    title: "Reverse String",
    difficulty: "easy" as const,
    tags: ["Two Pointers", "String"],
    xp: 50,
    leetcode_id: 344,
    description: "Write a function that reverses a string in-place.",
  },
  {
    id: "4",
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "medium" as const,
    tags: ["Linked List", "Math"],
    xp: 100,
    leetcode_id: 2,
    description: "Add two non-empty linked lists representing non-negative integers.",
  },
  {
    id: "5",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "hard" as const,
    tags: ["Binary Search", "Divide & Conquer"],
    xp: 200,
    leetcode_id: 4,
    description: "Find the median of the two sorted arrays with O(log(m+n)) runtime complexity.",
  },
  {
    id: "6",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium" as const,
    tags: ["Sliding Window", "Hash Table", "String"],
    xp: 100,
    leetcode_id: 3,
    description: "Find the length of the longest substring without repeating characters.",
  },
  {
    id: "7",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "hard" as const,
    tags: ["Two Pointers", "Dynamic Programming", "Stack"],
    xp: 250,
    leetcode_id: 42,
    description: "Compute how much water it can trap after raining on an elevation map.",
  },
];

const difficultyConfig = {
  easy: { label: "Easy", variant: "accent" as const },
  medium: { label: "Medium", variant: "warning" as const },
  hard: { label: "Hard", variant: "error" as const },
};

export default function ChallengesPage() {
  const [handle, setHandle] = useState("ev7utG9eiZ");
  const [inputHandle, setInputHandle] = useState("ev7utG9eiZ");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<LeetCodeProfileStats | null>(null);
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});
  const [verifyingSlug, setVerifyingSlug] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Fetch LeetCode stats
  const fetchLeetCodeData = async (userHandle: string) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(userHandle)}`);
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
        // Map solved slugs
        const solvedSlugs = new Set(
          (data.stats.recentSubmissions || []).map((s: { titleSlug: string }) => s.titleSlug.toLowerCase())
        );
        const newMap: Record<string, boolean> = {};
        for (const c of INITIAL_CHALLENGES) {
          if (solvedSlugs.has(c.slug.toLowerCase())) {
            newMap[c.slug] = true;
          }
        }
        setVerifiedMap(newMap);
      } else {
        setStatusMessage(data.error || "Failed to load LeetCode data.");
      }
    } catch {
      setStatusMessage("Could not connect to LeetCode API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeetCodeData(handle);
  }, [handle]);

  const handleVerify = async (slug: string) => {
    setVerifyingSlug(slug);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/challenges/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leetcode_username: handle,
          leetcode_slug: slug,
        }),
      });
      const data = await res.json();
      if (data.verified) {
        setVerifiedMap((prev) => ({ ...prev, [slug]: true }));
        setStatusMessage(`🎉 Verified ${slug}! +${data.xp_earned} XP awarded!`);
      } else {
        setStatusMessage(data.message || `Challenge ${slug} not yet detected as solved on LeetCode.`);
      }
    } catch {
      setStatusMessage("Verification request failed. Please retry.");
    } finally {
      setVerifyingSlug(null);
    }
  };

  const solvedCount = Object.values(verifiedMap).filter(Boolean).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.25rem",
            }}
          >
            Engineering Challenges
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Solve problems on LeetCode. DevProof verifies your submissions in real-time and awards XP.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              padding: "0.375rem 0.75rem",
              borderRadius: "var(--radius-md)",
            }}
          >
            <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{solvedCount}</span>
            /{INITIAL_CHALLENGES.length} Verified
          </span>
        </div>
      </div>

      {/* LeetCode Integration Banner */}
      <Card style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={16} color="#F59E0B" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>LeetCode Connected:</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      color: "var(--color-accent)",
                      background: "var(--color-accent-dim)",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    @{handle}
                  </span>
                  <Badge variant="accent" dot>
                    Active
                  </Badge>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  Submissions are queried live via LeetCode GraphQL to verify questions.
                </p>
              </div>
            </div>

            {/* Sync / Update handle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="text"
                value={inputHandle}
                onChange={(e) => setInputHandle(e.target.value)}
                placeholder="LeetCode username"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.375rem 0.625rem",
                  fontSize: "0.75rem",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-mono)",
                  width: 140,
                }}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setHandle(inputHandle);
                  fetchLeetCodeData(inputHandle);
                }}
                disabled={loading}
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                {loading ? "Syncing..." : "Sync"}
              </Button>
            </div>
          </div>

          {/* Live Stats Pills */}
          {stats && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--color-border-subtle)",
              }}
            >
              <div style={{ background: "var(--color-bg)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", display: "block" }}>Total Solved</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.totalSolved}</span>
              </div>
              <div style={{ background: "var(--color-bg)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-status-success)", display: "block" }}>Easy</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.easySolved}</span>
              </div>
              <div style={{ background: "var(--color-bg)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-status-warning)", display: "block" }}>Medium</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.mediumSolved}</span>
              </div>
              <div style={{ background: "var(--color-bg)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-status-error)", display: "block" }}>Hard</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.hardSolved}</span>
              </div>
            </div>
          )}

          {statusMessage && (
            <div
              style={{
                fontSize: "0.75rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                background: statusMessage.startsWith("🎉") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                color: statusMessage.startsWith("🎉") ? "var(--color-status-success)" : "var(--color-status-error)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {statusMessage.startsWith("🎉") ? <Check size={14} /> : <AlertCircle size={14} />}
              {statusMessage}
            </div>
          )}
        </div>
      </Card>

      {/* Challenge List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {INITIAL_CHALLENGES.map((challenge) => {
          const diff = difficultyConfig[challenge.difficulty];
          const isVerified = !!verifiedMap[challenge.slug];
          const isVerifying = verifyingSlug === challenge.slug;

          return (
            <Card key={challenge.id} hover padding="none">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.875rem 1.25rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Status icon */}
                <div style={{ width: 22, flexShrink: 0 }}>
                  {isVerified ? (
                    <CheckCircle2 size={18} color="var(--color-status-success)" />
                  ) : (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "1.5px solid var(--color-border)",
                      }}
                    />
                  )}
                </div>

                {/* Challenge Details */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {challenge.title}
                    </span>
                    <Badge variant={diff.variant}>{diff.label}</Badge>
                    {isVerified && (
                      <Badge variant="accent" dot>
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
                    {challenge.description}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
                  {challenge.tags.map((tag) => (
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

                {/* XP Reward */}
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                    flexShrink: 0,
                    width: 55,
                    textAlign: "right",
                  }}
                >
                  +{challenge.xp} XP
                </span>

                {/* Action buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                  <a
                    href={`https://leetcode.com/problems/${challenge.slug}/`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.75rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      padding: "0.3125rem 0.625rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    Solve
                    <ExternalLink size={11} />
                  </a>

                  <Button
                    variant={isVerified ? "ghost" : "primary"}
                    size="sm"
                    disabled={isVerified || isVerifying}
                    onClick={() => handleVerify(challenge.slug)}
                    style={{ minWidth: 80 }}
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw size={11} className="animate-spin" />
                        Checking
                      </>
                    ) : isVerified ? (
                      <>
                        <Check size={11} />
                        Done
                      </>
                    ) : (
                      <>
                        <Zap size={11} />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
