import React from "react";

export function FrostedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-[28px] border border-white/15 bg-white/42 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl " +
        className
      }
    >
      {children}
    </div>
  );
}

/**
 * ScreenShell — bottom-anchored layout wrapper for notification-style screens.
 * Pushes content to the lower portion of the viewport, leaving the top
 * 40-50% as breathing room for the background photo.
 */
export function ScreenShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"mx-auto flex min-h-[calc(100svh-60px)] max-w-[420px] flex-col justify-end px-4 pb-28 " + className}>
      {children}
    </div>
  );
}

export function FrostedPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"rounded-full border border-white/15 bg-white/45 px-3 py-2 backdrop-blur-xl " + className}>{children}</div>;
}

export function Divider() {
  return <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />;
}

export function PrimaryButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-2xl bg-[#9caad5] px-4 py-3 text-sm font-semibold text-[#121417] shadow-sm transition hover:bg-[#b9c3e4] focus:outline-none focus:ring-2 focus:ring-black/15 disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/45 px-4 py-3 text-sm font-semibold text-[rgba(18,20,23,0.85)] shadow-sm transition hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}
