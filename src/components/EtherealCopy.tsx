import { useEffect, useState } from "react";

export function EtherealCopy({ lines, onTap, className = "" }: { lines: string[]; onTap: () => void; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!lines.length) return;
    const fadeOut = setTimeout(() => setVisible(false), 2200);
    const next = setTimeout(() => {
      setIdx((v) => (v + 1) % lines.length);
      setVisible(true);
    }, 2600);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [idx, lines]);

  if (!lines.length) return null;

  return (
    <button onClick={onTap} className={"w-full text-center focus:outline-none " + className} aria-label="Continue">
      <div
        className={
          "font-serif-display mx-auto max-w-[26ch] select-none text-lg leading-relaxed text-white/90 transition-opacity duration-700 " +
          (visible ? "opacity-100" : "opacity-0")
        }
        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
      >
        {lines[idx]}
      </div>
      <div
        className="mt-4 text-xs font-medium text-white/50"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.2)" }}
      >
        tap to begin
      </div>
    </button>
  );
}
