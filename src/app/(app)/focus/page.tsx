"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Badge, StatCard } from "@/components/ui";
import { Timer, Play, Pause, RotateCcw, Zap, CheckCircle2 } from "lucide-react";

type SessionState = "idle" | "running" | "paused" | "done";

const PRESET_MINUTES = [25, 45, 60, 90];

const XP_PER_MINUTE = 2;

export default function FocusPage() {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [state, setState] = useState<SessionState>("idle");
  const [sessionsToday, setSessionsToday] = useState(3);
  const [minutesToday, setMinutesToday] = useState(75);
  const [xpEarned, setXpEarned] = useState(150);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "running") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setState("done");
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  const start = () => setState("running");
  const pause = () => setState("paused");
  const reset = () => {
    setState("idle");
    setTimeLeft(duration * 60);
  };

  const handlePreset = (min: number) => {
    if (state !== "idle") return;
    setDuration(min);
    setTimeLeft(min * 60);
  };

  const elapsed = duration * 60 - timeLeft;
  const progress = elapsed / (duration * 60);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference * (1 - progress);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const xpThisSession = Math.floor((elapsed / 60) * XP_PER_MINUTE);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
          Focus Session
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
          Earn XP for deep work. {XP_PER_MINUTE} XP per minute of focused coding.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        <StatCard label="Sessions Today" value={sessionsToday} icon={<CheckCircle2 size={14} />} sublabel="Goal: 4" />
        <StatCard label="Minutes Today" value={minutesToday} icon={<Timer size={14} />} sublabel="Goal: 120m" />
        <StatCard label="XP Earned Today" value={xpEarned} icon={<Zap size={14} />} accent sublabel="From focus only" />
      </div>

      {/* Timer */}
      <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2.5rem 2rem" }}>
        {/* Preset buttons */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {PRESET_MINUTES.map((min) => (
            <Button
              key={min}
              variant={duration === min ? "primary" : "secondary"}
              size="sm"
              onClick={() => handlePreset(min)}
              disabled={state !== "idle"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {min}m
            </Button>
          ))}
        </div>

        {/* Circular timer */}
        <div style={{ position: "relative", width: 220, height: 220 }}>
          <svg width={220} height={220} style={{ transform: "rotate(-90deg)" }}>
            {/* Track */}
            <circle
              cx={110}
              cy={110}
              r={radius}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={6}
            />
            {/* Progress */}
            <circle
              cx={110}
              cy={110}
              r={radius}
              fill="none"
              stroke={state === "done" ? "var(--color-status-success)" : "var(--color-accent)"}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>

          {/* Center */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.25rem",
            }}
          >
            {state === "done" ? (
              <>
                <CheckCircle2 size={28} color="var(--color-status-success)" />
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-status-success)" }}>
                  Session Done!
                </div>
                <Badge variant="accent" style={{ fontFamily: "var(--font-mono)" }}>
                  +{xpThisSession} XP
                </Badge>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "-0.04em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {fmt(timeLeft)}
                </div>
                {state !== "idle" && (
                  <Badge variant="accent" style={{ fontFamily: "var(--font-mono)" }}>
                    +{xpThisSession} XP
                  </Badge>
                )}
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {state === "done" ? (
            <Button variant="primary" size="lg" onClick={reset}>
              <RotateCcw size={15} />
              New Session
            </Button>
          ) : state === "idle" ? (
            <Button variant="primary" size="lg" onClick={start}>
              <Play size={15} fill="currentColor" />
              Start Focus
            </Button>
          ) : state === "paused" ? (
            <>
              <Button variant="secondary" size="md" onClick={reset}>
                <RotateCcw size={14} />
              </Button>
              <Button variant="primary" size="lg" onClick={start}>
                <Play size={15} fill="currentColor" />
                Resume
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" size="md" onClick={reset}>
                <RotateCcw size={14} />
              </Button>
              <Button variant="primary" size="lg" onClick={pause}>
                <Pause size={15} />
                Pause
              </Button>
            </>
          )}
        </div>

        {/* XP info */}
        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", textAlign: "center" }}>
          Complete the session to earn{" "}
          <span style={{ color: "var(--color-accent)" }}>
            {duration * XP_PER_MINUTE} XP
          </span>
        </p>
      </Card>
    </div>
  );
}
