import React from "react";
import type { Theme, Parallax } from "../types";

const MOOD_PHOTOS: Record<string, string> = {
  neutral: "/backgrounds/neutral.jpg",
  warm: "/backgrounds/warm.jpg",
  deep: "/backgrounds/deep.jpg",
  cool: "/backgrounds/cool.jpg",
};

export function Background({ theme, parallax }: { theme: Theme; parallax: Parallax }) {
  const mood = theme.mood || "neutral";
  const allMoods = ["neutral", "warm", "deep", "cool"] as const;
  const surreal = theme.surrealIntensity ?? 0;

  const photoOpacity = Math.max(0.15, 0.5 - surreal * 0.3);
  const gradientOpacity = 0.65 + surreal * 0.3;

  const style = {
    "--grad-start": theme.gradientStart,
    "--grad-end": theme.gradientEnd,
    "--accent": theme.accent,
    "--drift": `${theme.drift}s`,
    "--px": `${parallax.x}px`,
    "--py": `${parallax.y}px`,
  } as React.CSSProperties;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={style}>
      {/* Base gradient — the atmospheric teal sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, var(--grad-start) 0%, var(--grad-end) 45%, var(--accent) 100%)`,
          transition: "background 1200ms ease",
        }}
      />

      {/* Photo layer — mood-based sky photography */}
      {allMoods.map((m) => (
        <div
          key={m}
          className="absolute -inset-[8%] will-change-transform"
          style={{
            opacity: mood === m ? photoOpacity : 0,
            transition: "opacity 1000ms ease",
            transform: `translate3d(calc(var(--px) * 0.06), calc(var(--py) * 0.06), 0)`,
            mixBlendMode: "soft-light",
          }}
        >
          <img
            src={MOOD_PHOTOS[m]}
            alt=""
            className="h-full w-full object-cover"
            loading={m === "neutral" ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      ))}

      {/* Secondary gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gradientOpacity,
          background: `
            radial-gradient(ellipse 140% 80% at 20% 10%, var(--grad-start), transparent 60%),
            radial-gradient(ellipse 120% 70% at 80% 20%, var(--grad-end), transparent 55%),
            radial-gradient(ellipse 100% 60% at 50% 90%, var(--accent), transparent 50%)
          `,
          transition: "opacity 1000ms ease",
        }}
      />

      {/* Drifting cloud-like wisps */}
      <div
        className="absolute -inset-[30%] opacity-20 will-change-transform"
        style={{ transform: `translate3d(calc(var(--px) * 0.1), calc(var(--py) * 0.1), 0)` }}
      >
        <div
          className="h-full w-full"
          style={{
            animation: "drift var(--drift) ease-in-out infinite",
            background: `
              radial-gradient(800px 500px at 30% 25%, rgba(255,255,255,0.12), transparent 60%),
              radial-gradient(900px 520px at 70% 40%, rgba(255,255,255,0.08), transparent 62%),
              radial-gradient(700px 520px at 55% 72%, rgba(255,255,255,0.06), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Soft light wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.08), transparent 50%),
            linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15))
          `,
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 45%, transparent 45%, rgba(0,0,0,0.2))`,
        }}
      />
    </div>
  );
}
