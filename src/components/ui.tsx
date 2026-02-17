import React, { useEffect, useState } from "react";

/* ─── GlassCard: The core reusable frosted glass component ─── */
export function GlassCard({
  children,
  className = "",
  variant = "default",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light" | "strong" | "opaque";
  onClick?: () => void;
}) {
  const base =
    variant === "opaque"
      ? "bg-white/[0.92] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60"
      : variant === "strong"
        ? "glass-strong"
        : variant === "light"
          ? "glass-light"
          : "glass";

  return (
    <div
      onClick={onClick}
      className={`rounded-[24px] ${base} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Backward-compatible alias ─── */
export function FrostedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <GlassCard className={className}>{children}</GlassCard>;
}

/* ─── ScreenShell: full-height layout wrapper ─── */
export function ScreenShell({
  children,
  className = "",
  centered = false,
}: {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        `mx-auto flex min-h-[calc(100svh-60px)] max-w-[480px] flex-col px-5 pb-28 ${
          centered ? "items-center justify-center" : "justify-end"
        } ` + className
      }
    >
      {children}
    </div>
  );
}

/* ─── PortalWindow: Stadium-shaped sky view for the dashboard ─── */
export function PortalWindow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[100px] ${className}`}
      style={{ aspectRatio: "4 / 5" }}
    >
      {children}
    </div>
  );
}

/* ─── PrimaryButton: Main CTA with teal/white theme ─── */
export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-[20px] bg-white px-5 py-3.5 text-sm font-semibold text-[#2C3E50] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all hover:bg-white/90 hover:shadow-[0_6px_24px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

/* ─── GhostButton: Secondary action with glass effect ─── */
export function GhostButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-[20px] border border-white/30 bg-white/25 px-5 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/35 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

/* ─── GlassButton: Wide glass-style button ─── */
export function GlassButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "glass inline-flex w-full items-center justify-center rounded-[20px] px-6 py-4 text-base font-semibold text-[#2C3E50] transition-all hover:bg-white/55 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

/* ─── FAB: Floating Action Button ─── */
export function FAB({
  onClick,
  className = "",
  children,
}: {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2C3E50] shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95 " +
        className
      }
      style={{ animation: "pulseGlow 3s ease-in-out infinite" }}
      aria-label="New entry"
    >
      {children || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

/* ─── BottomSheet: Modal overlay from bottom ─── */
export function BottomSheet({
  open,
  onClose,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${animating ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        className={
          `absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-[32px] glass-strong transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            animating ? "translate-y-0" : "translate-y-full"
          } ` + className
        }
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10 flex justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-[#546E7A]/30" />
        </div>
        <div className="px-6 pb-8">{children}</div>
      </div>
    </div>
  );
}

/* ─── Divider ─── */
export function Divider() {
  return <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />;
}

/* ─── FrostedPill: for nav badges and tags ─── */
export function FrostedPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-full border border-white/25 bg-white/35 px-3 py-2 backdrop-blur-xl " + className}>
      {children}
    </div>
  );
}

/* ─── SectionLabel: uppercase small label ─── */
export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"font-sans-body text-xs font-medium uppercase tracking-wider text-white/70 " + className}>
      {children}
    </div>
  );
}
