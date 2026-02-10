import React from "react";
import type { Theme, Parallax } from "../types";

export function Background({ theme, parallax }: { theme: Theme; parallax: Parallax }) {
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
      <div className="absolute inset-0" style={{ background: "#0c0d10" }} />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 700px at 20% 18%, var(--b), transparent 62%),
            radial-gradient(1000px 650px at 78% 24%, var(--a), transparent 58%),
            radial-gradient(900px 620px at 48% 78%, var(--c), transparent 55%),
            linear-gradient(180deg, rgba(242,237,230,0.02), rgba(0,0,0,0.14))
          `,
        }}
      />

      <div
        className="absolute -inset-[30%] opacity-50 will-change-transform"
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

      <div
        className="absolute inset-0 opacity-60 mix-blend-soft-light"
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

      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(1200px 700px at 50% 45%, transparent 55%, var(--vig))` }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, var(--haze), transparent 42%)` }} />

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
