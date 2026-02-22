import { useEffect, useState } from "react";
import type { JournalEntry, InstallPromptState } from "../../types";
import { CLOUD_TYPES } from "../../lib/theme";
import { SlideUp } from "../FadeIn";
import { GlassCard, FAB } from "../ui";
import { Icon } from "../Icon";

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
  if (h < 5) return "Clear skies\ntonight";
  if (h < 12) return "Good Morning,";
  if (h < 17) return "Good Afternoon,";
  if (h < 21) return "Good Evening,";
  return "Clear skies\ntonight";
}

function getMostRecentCloudType(entries: JournalEntry[]): string | null {
  if (entries.length === 0) return null;
  return entries[0].cloudType;
}

function shortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
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
  const recentEntries = (entries || []).slice(0, 2);
  const currentCloud = getMostRecentCloudType(entries || []);
  const currentCloudInfo = CLOUD_TYPES.find((c) => c.slug === currentCloud);

  const isNightGreeting = greeting.includes("tonight");

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      {/* Sky Window */}
      <div className="mx-auto w-full max-w-[480px] px-5 pt-16">
        <SlideUp>
          <div
            className="relative w-full overflow-hidden rounded-[32px]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <img
              src="/backgrounds/neutral.jpg"
              alt="Sky view"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(22,23,28,0.12) 100%)",
              }}
            />
          </div>
        </SlideUp>
      </div>

      {/* Content area */}
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-4 px-5 pt-5 pb-32">
        {/* Greeting card */}
        <SlideUp>
          <GlassCard className="p-6">
            <h2 className="font-serif-display text-[28px] leading-tight font-medium text-[#16171C]/[0.92]">
              {isNightGreeting ? (
                <>Clear skies<br />tonight.</>
              ) : (
                <>{greeting}<br />Tiffany.</>
              )}
            </h2>
            {currentCloudInfo ? (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-[#4B5C72]">
                  Current Sky: <span className="font-medium text-[#16171C]/[0.92]">{currentCloudInfo.name}</span>
                </p>
                <Icon name="cloud" size={18} color="#4B5C72" />
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#4B5C72]">
                {entryCount === 0
                  ? "Look up and begin your first reflection"
                  : `${entryCount} reflection${entryCount !== 1 ? "s" : ""} saved`}
              </p>
            )}
          </GlassCard>
        </SlideUp>

        {/* Recent entry cards */}
        {recentEntries.length > 0 && (
          <SlideUp>
            <div className="grid grid-cols-2 gap-3">
              {recentEntries.map((entry) => {
                const cloudInfo = CLOUD_TYPES.find((c) => c.slug === entry.cloudType);
                const cloudName = cloudInfo?.name || "Moment";

                return (
                  <GlassCard
                    key={entry.id}
                    onClick={() => onSelectEntry?.(entry.id)}
                    className="cursor-pointer p-3.5 transition-all hover:bg-[#F5ECDC]/60 active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between">
                      <img
                        src={cloudInfo?.image || "/clouds/other.png"}
                        alt={cloudName}
                        className="h-10 w-10 rounded-[10px] object-contain"
                      />
                      <Icon name="edit" size={14} color="rgba(75,92,114,0.40)" />
                    </div>
                    <div className="mt-2.5 text-xs text-[#4B5C72]">
                      {shortDate(entry.createdAt)} &middot; {cloudName}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </SlideUp>
        )}
      </div>

      {/* FAB: Centered */}
      <div className="fixed bottom-8 left-1/2 z-30 -translate-x-1/2">
        <FAB onClick={onBegin} />
      </div>
    </div>
  );
}
