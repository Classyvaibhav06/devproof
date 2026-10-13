"use client";

import { cn } from "@/lib/utils";

interface HeatmapProps {
  data: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  className?: string;
}

export function GitHubHeatmap({ data, className }: HeatmapProps) {
  const weeks: typeof data[] = [];
  let week: typeof data = [];

  // Pad start
  const firstDay = data[0] ? new Date(data[0].date).getDay() : 0;
  for (let i = 0; i < firstDay; i++) {
    week.push({ date: "", count: 0, level: 0 });
  }

  for (const day of data) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push(week);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Find month label positions
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, wi) => {
    const d = w.find((d) => d.date)?.date;
    if (d) {
      const m = new Date(d).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: months[m], weekIndex: wi });
        lastMonth = m;
      }
    }
  });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Month labels */}
      <div style={{ display: "flex", gap: 3, paddingLeft: 24 }}>
        {weeks.map((_, wi) => {
          const ml = monthLabels.find((m) => m.weekIndex === wi);
          return (
            <div
              key={wi}
              style={{
                width: 12,
                fontSize: "0.5625rem",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {ml?.label || ""}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", gap: 2 }}>
        {/* Day labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: 1,
          }}
        >
          {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
            <div
              key={i}
              style={{
                height: 12,
                fontSize: "0.5625rem",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                lineHeight: "12px",
                width: 20,
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {week.map((day, di) => (
              <div
                key={di}
                className="heatmap-cell"
                data-level={day.date ? day.level : undefined}
                title={day.date ? `${day.date}: ${day.count} commits` : undefined}
                style={{ cursor: day.date ? "pointer" : "default" }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "flex-end",
          fontSize: "0.5625rem",
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className="heatmap-cell" data-level={l} style={{ cursor: "default" }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
