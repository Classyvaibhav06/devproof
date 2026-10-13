import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getLevelFromXP(xp: number): { level: number; title: string; progress: number; needed: number } {
  const thresholds = [
    { level: 1, title: "Script Kiddie", xp: 0 },
    { level: 2, title: "Junior Dev", xp: 500 },
    { level: 3, title: "Mid-level Dev", xp: 1500 },
    { level: 4, title: "Senior Dev", xp: 3500 },
    { level: 5, title: "Staff Engineer", xp: 7000 },
    { level: 6, title: "Principal", xp: 12000 },
    { level: 7, title: "Architect", xp: 20000 },
    { level: 8, title: "10x Dev", xp: 35000 },
  ];

  let current = thresholds[0];
  let next = thresholds[1];

  for (let i = 0; i < thresholds.length - 1; i++) {
    if (xp >= thresholds[i].xp && xp < thresholds[i + 1].xp) {
      current = thresholds[i];
      next = thresholds[i + 1];
      break;
    }
    if (xp >= thresholds[thresholds.length - 1].xp) {
      current = thresholds[thresholds.length - 1];
      next = thresholds[thresholds.length - 1];
    }
  }

  const progress = next.xp === current.xp ? 100 : ((xp - current.xp) / (next.xp - current.xp)) * 100;
  return { level: current.level, title: current.title, progress: Math.min(progress, 100), needed: next.xp - xp };
}

export function getDifficultyColor(difficulty: "easy" | "medium" | "hard"): string {
  return {
    easy: "var(--color-status-success)",
    medium: "var(--color-status-warning)",
    hard: "var(--color-status-error)",
  }[difficulty];
}
