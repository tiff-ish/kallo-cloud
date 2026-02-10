import type React from "react";

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[fadeIn_520ms_ease-out]">
      {children}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
