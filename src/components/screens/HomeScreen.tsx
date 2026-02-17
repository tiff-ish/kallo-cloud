import { useEffect, useState } from "react";
import type { JournalEntry, InstallPromptState } from "../../types";
import { CLOUD_TYPES, CLOUD_TO_THUMBNAIL } from "../../lib/theme";
import { SlideUp } from "../FadeIn";
import { GlassCard, FAB, PortalWindow, SectionLabel } from "../ui";
import { Icon } from "../Icon";
import { formatDate } from "../../lib/utils";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function getGreeting(d: Date): string {
  const h = d.getHours();
  if (h < 5) return "Clear skies tonight";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  if (h < 21) return "Good Evening";
  return "Clear skies tonight";
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function getMostRecentCloudType(entries: JournalEntry[]): string | null {
  if (entries.length === 0) return null;
  return entries[0].cloudType;
}

export function HomeScreen({
  onBegin,
  onLibrary,
  install,
  onShowCue,
  entryCount,
  entries,
  onSelectEntry,
}: {
  onBegin: () => void;
  onLibrary: () => void;
  onShowCue: () => void;
  install: InstallPromptState;
  entryCount: number;
  entries?: JournalEntry[];
  onSelectEntry?: (id: string) => void;
}) {
  const now = useClock();
  const greeting = getGreeting(now);
  const recentEntries = (entries || []).slice(0, 6);
  const currentCloud = getMostRecentCloudType(recentEntries);
  const currentCloudInfo = CLOUD_TYPES.find((c) => c.slug === currentCloud);

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      {/* Portal Window: Stadium-shaped sky view */}
      <div className="mx-auto w-full max-w-[480px] px-5 pt-16">
        <SlideUp>
          <PortalWindow className="w-full">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center">
              <div className="font-serif-display text-lg font-medium text-white/80">
                {formatTime(now)}
              </div>
              <div className="mt-1 text-xs font-medium text-white/60">
                {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>
          </PortalWindow>
        </SlideUp>
      </div>

      {/* Content area below portal */}
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-4 px-5 pt-6 pb-32">
        {/* Greeting: Full-width serif, personalized */}
        <SlideUp>
          <GlassCard className="p-6">
            <h2 className="font-serif-display text-2xl font-bold text-[#2C3E50]">
              {greeting}.
            </h2>
            {currentCloudInfo ? (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={currentCloudInfo.image}
                  alt={currentCloudInfo.name}
                  className="h-7 w-7 object-contain"
                />
                <p className="text-sm text-[#546E7A]">
                  Current Sky: <span className="font-medium text-[#2C3E50]">{currentCloudInfo.name}</span>
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#546E7A]">
                {entryCount === 0
                  ? "Look up and begin your first reflection"
                  : `${entryCount} reflection${entryCount !== 1 ? "s" : ""} saved`}
              </p>
            )}
          </GlassCard>
        </SlideUp>

        {/* Quick Actions */}
        <SlideUp>
          <div className="grid grid-cols-2 gap-3">
            <GlassCard
              onClick={onShowCue}
              className="cursor-pointer p-4 transition-all hover:bg-white/55 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/50">
                <Icon name="cloud" size={18} color="#2C3E50" />
              </div>
              <div className="mt-3 font-serif-display text-sm font-semibold text-[#2C3E50]">Cloud Cue</div>
              <div className="mt-0.5 text-xs text-[#546E7A]">A visual pause</div>
            </GlassCard>

            <GlassCard
              onClick={onLibrary}
              className="cursor-pointer p-4 transition-all hover:bg-white/55 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/50">
                <Icon name="book" size={18} color="#2C3E50" />
              </div>
              <div className="mt-3 font-serif-display text-sm font-semibold text-[#2C3E50]">Library</div>
              <div className="mt-0.5 text-xs text-[#546E7A]">Past moments</div>
            </GlassCard>
          </div>
        </SlideUp>

        {/* Recent Entries with cloud thumbnail backgrounds */}
        {recentEntries.length > 0 && (
          <SlideUp>
            <SectionLabel className="mb-3 px-1">Recent Reflections</SectionLabel>
            <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
              {recentEntries.map((entry) => {
                const cloudInfo = CLOUD_TYPES.find((c) => c.slug === entry.cloudType);
                const cloudName = cloudInfo?.name || "Moment";
                const thumb = CLOUD_TO_THUMBNAIL[entry.cloudType] || "/thumbnails/neutral.jpg";
                return (
                  <button
                    key={entry.id}
                    onClick={() => onSelectEntry?.(entry.id)}
                    className="relative w-[180px] shrink-0 overflow-hidden rounded-[20px] transition-all hover:scale-[1.02] active:scale-[0.97]"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {/* Sky thumbnail background */}
                    <img
                      src={thumb}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                    {/* Content overlay */}
                    <div className="relative flex h-full flex-col justify-end p-4 text-left">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-white/75">
                        {formatDate(entry.createdAt)}
                      </div>
                      <div className="mt-1 font-serif-display text-base font-semibold text-white drop-shadow-md">
                        {cloudName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </SlideUp>
        )}

        {/* iOS install hint */}
        {install.isIos && (
          <GlassCard className="p-4" variant="light">
            <p className="text-xs text-[#546E7A]">
              <span className="font-semibold text-[#2C3E50]">Want this as an app?</span>{" "}
              Share &rarr; "Add to Home Screen".
            </p>
          </GlassCard>
        )}

        {/* PWA install */}
        {install.available && (
          <button
            onClick={install.prompt}
            className="glass flex items-center justify-center gap-2 rounded-[20px] px-4 py-3 text-sm font-semibold text-[#2C3E50] transition hover:bg-white/55"
          >
            <Icon name="download" size={16} color="#2C3E50" />
            Install this app
          </button>
        )}
      </div>

      {/* FAB: Floating Action Button */}
      <div className="fixed bottom-8 right-6 z-30 sm:right-[calc(50%-210px)]">
        <FAB onClick={onBegin} />
      </div>
    </div>
  );
}
