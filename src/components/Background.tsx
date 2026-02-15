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

  const photoOpacity = 1 - surreal * 0.3;
  const gradientOpacity = 0.7 + surreal * 0.25;

  const style = {
    "--a": theme.a,
    "--b": theme.b,
    "--c": theme.c,
    "--haze": theme.haze,
    "--vig": theme.vignette,
    "--drift": `${theme.drift}s`,
    "--px": `${parallax.x}px`,
    "--py": `${parallax.y}px`,
  } as React.CSSProperties;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={style}>
      {/* Base dark fill */}
      <div className="absolute inset-0" style={{ background: "#0c0d10" }} />

      {/* Photo layer — opacity fades as surrealIntensity increases */}
      {allMoods.map((m) => (
        <div
          key={m}
          className="absolute -inset-[8%] will-change-transform"
          style={{
            opacity: mood === m ? photoOpacity : 0,
            transition: "opacity 800ms ease",
            transform: `translate3d(calc(var(--px) * 0.08), calc(var(--py) * 0.08), 0)`,
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

      {/* Tinted gradient overlay — strength increases with surrealIntensity */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gradientOpacity,
          background: `
            radial-gradient(1200px 700px at 20% 18%, var(--b), transparent 62%),
            radial-gradient(1000px 650px at 78% 24%, var(--a), transparent 58%),
            radial-gradient(900px 620px at 48% 78%, var(--c), transparent 55%),
            linear-gradient(180deg, rgba(242,237,230,0.02), rgba(0,0,0,0.14))
          `,
          transition: "opacity 800ms ease, background 800ms ease",
        }}
      />

      {/* Surreal color wash — appears when scene note steers mood */}
      {surreal > 0 ? (
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: surreal * 0.25,
            background: `radial-gradient(800px 500px at 30% 30%, var(--a), transparent 60%), radial-gradient(600px 400px at 70% 60%, var(--c), transparent 55%)`,
            transition: "opacity 800ms ease",
          }}
        />
      ) : null}

      {/* Drifting cloud-like overlay */}
      <div
        className="absolute -inset-[30%] opacity-35 will-change-transform"
        style={{ transform: `translate3d(calc(var(--px) * 0.12), calc(var(--py) * 0.12), 0)` }}
      >
        <div
          className="h-full w-full"
          style={{
            animation: "drift var(--drift) ease-in-out infinite",
            background: `
              radial-gradient(800px 500px at 30% 25%, rgba(242,237,230,0.14), transparent 60%),
              radial-gradient(900px 520px at 70% 40%, rgba(242,237,230,0.10), transparent 62%),
              radial-gradient(700px 520px at 55% 72%, rgba(242,237,230,0.09), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Grain / sparkle layer */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-soft-light"
        style={{ transform: `translate3d(calc(var(--px) * 0.05), calc(var(--py) * 0.05), 0)` }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `
              radial-gradient(1px 1px at 10% 20%, rgba(242,237,230,0.18) 0, transparent 60%),
              radial-gradient(1px 1px at 70% 60%, rgba(242,237,230,0.16) 0, transparent 62%),
              radial-gradient(1px 1px at 40% 85%, rgba(242,237,230,0.14) 0, transparent 58%)
            `,
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(1200px 700px at 50% 45%, transparent 55%, var(--vig))`,
          transition: "background 800ms ease",
        }}
      />
      {/* Haze */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, var(--haze), transparent 42%)`,
          transition: "background 800ms ease",
        }}
      />

      <style>{`
        @keyframes drift {
          0% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); }
          50% { transform: translate3d(1.2%, 1.4%, 0) scale(1.03); }
          100% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); }
        }
      `}</style>
    </div>
  );
}
