import Link from "next/link";
import {
  Zap,
  Code2,
  Rocket,
  Briefcase,
  MessageSquare,
  Trophy,
  Timer,
  ArrowRight,
  CheckCircle2,
  GitBranch,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ─── Navbar ─────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(9,9,11,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Zap size={16} color="var(--color-accent)" fill="var(--color-accent)" />
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.03em",
            }}
          >
            DevProof
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="#features" style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", textDecoration: "none" }}>
            Features
          </Link>
          <Link href="/leaderboard" style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", textDecoration: "none" }}>
            Leaderboard
          </Link>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-accent)",
              color: "#fff",
              padding: "0.4375rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.15s ease",
            }}
          >
            Get Started
            <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "6rem 2rem 5rem",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.25rem 0.75rem",
            background: "var(--color-accent-dim)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "100px",
            fontSize: "0.6875rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
            marginBottom: "1.5rem",
            letterSpacing: "0.04em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-accent)",
              boxShadow: "0 0 6px var(--color-accent)",
              animation: "pulse-accent 2s ease-in-out infinite",
            }}
          />
          Now in Alpha — Join the waitlist
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            background: "linear-gradient(180deg, #fafafa 0%, #a1a1aa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Ship in Public.
          <br />
          Level Up.
        </h1>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-text-secondary)",
            maxWidth: 520,
            margin: "0 auto 2.5rem",
            lineHeight: 1.65,
          }}
        >
          DevProof is where developers prove their skills — solve challenges,
          ship projects in public, find collaborators, and climb the XP leaderboard.
          No faking. No fluff.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-accent)",
              color: "#fff",
              padding: "0.6875rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Start Building
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://github.com/Classyvaibhav06/devproof"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-surface)",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              padding: "0.6875rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <GitBranch size={15} />
            Star on GitHub
          </a>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────── */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          padding: "2rem",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          flexWrap: "wrap",
        }}
      >
        {[
          { value: "500+", label: "Developers" },
          { value: "2.1k", label: "Challenges Solved" },
          { value: "180+", label: "Projects Shipped" },
          { value: "#1", label: "Ship in Public Platform" },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.875rem",
                fontWeight: 800,
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "0.25rem",
              }}
            >
              {value}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ─── Features ────────────────────────────────────────── */}
      <section id="features" style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              marginBottom: "0.75rem",
            }}
          >
            Everything a developer needs
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Built around how real developers actually work. No bloat.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem",
                  transition: "border-color 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-accent-dim)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.875rem",
                  }}
                >
                  <Icon size={15} color="var(--color-accent)" />
                </div>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.375rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
                {feature.highlights && (
                  <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {feature.highlights.map((h) => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <CheckCircle2 size={11} color="var(--color-accent)" />
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA Strip ───────────────────────────────────────── */}
      <section
        style={{
          margin: "0 2rem 5rem",
          background: "var(--color-accent-dim)",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: "var(--radius-xl)",
          padding: "3rem 2rem",
          textAlign: "center",
          maxWidth: 700,
          marginInline: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginBottom: "0.75rem",
          }}
        >
          Ready to prove yourself?
        </h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", marginBottom: "1.75rem" }}>
          Join developers who ship real projects, solve real challenges, and grow together.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--color-accent)",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Start Building Free
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Zap size={13} color="var(--color-accent)" fill="var(--color-accent)" />
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "-0.02em" }}>DevProof</span>
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
          built in public · alpha
        </span>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: Code2,
    title: "Challenge Verification",
    description: "Link your LeetCode account. Solve problems. DevProof auto-detects your submissions and awards XP — no screenshots, no manual claims.",
    highlights: ["Automated detection", "XP rewards per difficulty", "Streak tracking"],
  },
  {
    icon: Trophy,
    title: "XP Leaderboard",
    description: "A no-BS global rankings board. XP comes from real actions: solving problems, shipping projects, contributing code. Gaming it is basically impossible.",
    highlights: ["Level system with titles", "Weekly + all-time rankings", "Transparent XP sources"],
  },
  {
    icon: Rocket,
    title: "Ship in Public",
    description: "Share what you're building before it's ready. Document progress, get feedback, build an audience, and connect with other builders.",
    highlights: ["Multi-image project posts", "Devlog feed", "Like + comment system"],
  },
  {
    icon: Briefcase,
    title: "War Room",
    description: "A marketplace to find collaborators, open source contributors, or paid gigs. Post what you're building, specify what you need, and see who applies.",
    highlights: ["Equity / OSS / Paid filters", "Application tracking", "Direct messaging"],
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "1-on-1 real-time messaging between developers. Typing indicators, online presence, and a clean minimal UI that doesn't get in the way.",
    highlights: ["Typing indicators", "Online presence dots", "Message history"],
  },
  {
    icon: Timer,
    title: "Focus Sessions",
    description: "In-browser focus timer with XP rewards for deep work sessions. Track your focused coding hours over time alongside your GitHub activity.",
    highlights: ["Timed sessions with XP", "Daily focus stats", "Session history"],
  },
];
