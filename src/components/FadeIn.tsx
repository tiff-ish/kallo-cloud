import type React from "react";

/**
 * SlideUp — notification-style entrance animation.
 * Slides content up from 40px below with a spring-like easing.
 * FadeIn is kept as an alias for backward compatibility.
 */
export function SlideUp({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[slideUp_400ms_cubic-bezier(0.16,1,0.3,1)]">
      {children}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/** @deprecated Use SlideUp instead — kept for backward compat */
export const FadeIn = SlideUp;
