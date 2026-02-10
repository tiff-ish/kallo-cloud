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
    <button onClick={onTap} className={"w-full text-center focus:outline-none focus:ring-2 focus:ring-black/10 " + className} aria-label="Continue">
      <div
        className={
          "mx-auto max-w-[26ch] select-none text-[15px] leading-relaxed text-[rgba(242,237,230,0.88)] transition-opacity duration-700 " +
          (visible ? "opacity-100" : "opacity-0")
        }
        style={{ textShadow: "0 20px 50px rgba(0,0,0,0.45)" }}
      >
        {lines[idx]}
      </div>
      <div className="mt-3 text-[11px] text-[rgba(242,237,230,0.62)]" style={{ textShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
        tap to begin
      </div>
    </button>
  );
}
