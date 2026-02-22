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
      ? "bg-[#F5ECDC]/[0.92] shadow-[0_14px_50px_rgba(0,0,0,0.12)] border border-[#16171C]/10"
      : variant === "strong"
        ? "glass-strong"
        : variant === "light"
          ? "glass-light"
          : "glass";

  return (
    <div
      onClick={onClick}
      className={`rounded-[22px] ${base} ${onClick ? "cursor-pointer" : ""} ${className}`}
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

/* ─── PortalWindow: Rounded sky view for the dashboard ─── */
export function PortalWindow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] ${className}`}
      style={{ aspectRatio: "3 / 4" }}
    >
      {children}
    </div>
  );
}

/* ─── PrimaryButton: Ink bg + Warm Paper text ─── */
export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-full bg-[#16171C] px-6 py-3.5 text-sm font-semibold text-[#F5ECDC] shadow-[0_14px_50px_rgba(0,0,0,0.12)] transition-all hover:bg-[#2A2B32] focus:outline-none focus:ring-2 focus:ring-[#16171C]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

/* ─── GhostButton: Secondary translucent glass ─── */
export function GhostButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center rounded-full border border-[#16171C]/10 bg-[#F5ECDC]/30 px-5 py-3.5 text-sm font-semibold text-[#F7F9FA] backdrop-blur-md transition-all hover:bg-[#F5ECDC]/40 focus:outline-none focus:ring-2 focus:ring-[#F5ECDC]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}

/* ─── GlassButton: Wide glass-style secondary button ─── */
export function GlassButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={
        "glass inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-[#16171C]/[0.88] transition-all hover:bg-[#F5ECDC]/60 focus:outline-none focus:ring-2 focus:ring-[#F5ECDC]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
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
        "flex h-16 w-16 items-center justify-center rounded-full bg-[#F5ECDC] text-[#16171C] shadow-[0_14px_50px_rgba(0,0,0,0.16)] transition-all hover:shadow-[0_18px_56px_rgba(0,0,0,0.20)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F5ECDC]/40 active:scale-95 " +
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
      <div
        className={`absolute inset-0 bg-[#16171C]/30 backdrop-blur-sm transition-opacity duration-300 ${animating ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={
          `absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-[22px] glass-strong transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            animating ? "translate-y-0" : "translate-y-full"
          } ` + className
        }
      >
        <div className="sticky top-0 z-10 flex justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-[#4B5C72]/25" />
        </div>
        <div className="px-6 pb-8">{children}</div>
      </div>
    </div>
  );
}

/* ─── Divider ─── */
export function Divider() {
  return <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#16171C]/10 to-transparent" />;
}

/* ─── FrostedPill: for nav badges and tags ─── */
export function FrostedPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-full border border-[#16171C]/10 bg-[#F5ECDC]/35 px-3 py-2 backdrop-blur-xl " + className}>
      {children}
    </div>
  );
}

/* ─── SectionLabel: uppercase small label ─── */
export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"font-sans-body text-xs font-medium uppercase tracking-wider text-[#F7F9FA]/70 " + className}>
      {children}
    </div>
  );
}
