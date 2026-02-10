import { useEffect, useState } from "react";
import type { InstallPromptState } from "../../types";
import { SlideUp } from "../FadeIn";
import { ScreenShell } from "../ui";
import { Icon } from "../Icon";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function formatDay(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

export function HomeScreen({
  onBegin,
  onLibrary,
  install,
  onShowCue,
  entryCount,
}: {
  onBegin: () => void;
  onLibrary: () => void;
  onShowCue: () => void;
  install: InstallPromptState;
  entryCount: number;
}) {
  const now = useClock();

  const summaryText =
    entryCount === 0
      ? "No reflections yet. Look up and begin."
      : entryCount === 1
        ? "You have 1 reflection saved."
        : `You have ${entryCount} reflections.`;

  return (
    <ScreenShell>
      {/* Lock-screen-style header — rendered over the background photo */}
      <div className="mb-6 px-1" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.50)" }}>
        <div className="text-[40px] font-bold leading-tight text-white/90">
          {formatTime(now)}
        </div>
        <div className="mt-1 text-sm font-medium text-white/70">
          {formatDay(now)}
        </div>
        <div className="mt-3 text-[15px] leading-relaxed text-white/80">
          {summaryText}
        </div>
      </div>

      {/* Notification-style action cards */}
      <SlideUp>
        <div className="grid gap-3">
          {/* Ritual cue teaser */}
          <button
            onClick={onShowCue}
            className="flex items-center gap-3 rounded-[24px] border border-white/15 bg-white/30 px-5 py-4 text-left backdrop-blur-xl transition hover:bg-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/40 ring-1 ring-white/20">
              <span className="text-sm">&#9702;</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-[rgba(18,20,23,0.82)]">Cloud Journal</div>
              <div className="mt-0.5 text-[13px] text-[rgba(18,20,23,0.62)]">A visual cue to slow down.</div>
            </div>
          </button>

          {/* Look up — primary action */}
          <button
            onClick={onBegin}
            className="group flex items-center gap-4 rounded-[24px] border border-white/15 bg-white/42 px-5 py-5 text-left backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:bg-white/55 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/55 ring-1 ring-black/10">
              <Icon name="plus" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[rgba(18,20,23,0.90)]">Look up</div>
              <div className="mt-0.5 text-xs text-[rgba(18,20,23,0.60)]">Begin a moment</div>
            </div>
            <div className="text-[11px] text-[rgba(18,20,23,0.45)] group-hover:text-[rgba(18,20,23,0.65)]">tap</div>
          </button>

          {/* Past moments */}
          <button
            onClick={onLibrary}
            className="group flex items-center gap-4 rounded-[24px] border border-white/15 bg-white/42 px-5 py-5 text-left backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:bg-white/55 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/55 ring-1 ring-black/10">
              <Icon name="book" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[rgba(18,20,23,0.90)]">Past moments</div>
              <div className="mt-0.5 text-xs text-[rgba(18,20,23,0.60)]">Re-enter an entry</div>
            </div>
            <div className="text-[11px] text-[rgba(18,20,23,0.45)] group-hover:text-[rgba(18,20,23,0.65)]">tap</div>
          </button>

          {/* iOS install hint */}
          {install.isIos ? (
            <div className="rounded-[20px] border border-white/15 bg-white/30 px-4 py-3 text-xs text-[rgba(18,20,23,0.66)] backdrop-blur-xl">
              <span className="font-semibold text-[rgba(18,20,23,0.82)]">Want this as an app?</span>{" "}
              Share &rarr; "Add to Home Screen".
            </div>
          ) : null}

          {/* PWA install */}
          {install.available ? (
            <button
              onClick={install.prompt}
              className="flex items-center justify-center gap-2 rounded-[20px] border border-white/15 bg-white/35 px-4 py-3 text-sm font-semibold text-[rgba(18,20,23,0.82)] backdrop-blur-xl transition hover:bg-white/50"
            >
              <Icon name="download" />
              Install this app
            </button>
          ) : null}

          <div className="pb-1 text-center text-[11px] text-white/50" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
            Made for noticing — not for tracking.
          </div>
        </div>
      </SlideUp>
    </ScreenShell>
  );
}
