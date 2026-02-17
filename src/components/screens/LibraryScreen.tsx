import type { JournalEntry } from "../../types";
import { CLOUD_TYPES } from "../../lib/theme";
import { SlideUp } from "../FadeIn";
import { GlassCard } from "../ui";
import { Icon } from "../Icon";

export function LibraryScreen({
  entries,
  selectedId,
  onSelect,
}: {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <div className="mx-auto w-full max-w-[480px] px-5 pt-20 pb-32">
        <SlideUp>
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-serif-display text-3xl font-bold text-white">
              Library
            </h1>
            <p className="mt-1 text-sm text-white/65">
              {entries.length === 0
                ? "No reflections yet"
                : `${entries.length} moment${entries.length !== 1 ? "s" : ""} captured`}
            </p>
          </div>

          {/* Entry list */}
          <div className="grid gap-3">
            {entries.length === 0 ? (
              <GlassCard className="p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/30">
                  <Icon name="cloud" size={28} color="#2C3E50" />
                </div>
                <p className="mt-4 font-serif-display text-lg font-semibold text-[#2C3E50]">
                  No entries yet
                </p>
                <p className="mt-1 text-sm text-[#546E7A]">
                  Tap the + button to begin a moment
                </p>
              </GlassCard>
            ) : (
              entries.slice(0, 40).map((e) => {
                const cloudInfo = CLOUD_TYPES.find((c) => c.slug === e.cloudType);
                const isActive = selectedId === e.id;

                return (
                  <button
                    key={e.id}
                    onClick={() => onSelect(e.id)}
                    className={
                      "flex gap-4 rounded-[20px] p-4 text-left transition-all focus:outline-none " +
                      (isActive
                        ? "glass-strong ring-1 ring-white/40"
                        : "glass hover:bg-white/55 active:scale-[0.98]")
                    }
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/40">
                      <img
                        src={cloudInfo?.image || "/clouds/other.png"}
                        alt={cloudInfo?.name || "Cloud"}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif-display text-sm font-semibold text-[#2C3E50]">
                          {cloudInfo?.name || "Moment"}
                        </span>
                        <span className="text-[10px] font-medium text-[#546E7A]/60">
                          {new Date(e.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {e.cloudDescription?.trim() && (
                        <div className="mt-0.5 text-xs text-[#546E7A] line-clamp-1">
                          {e.cloudDescription.trim()}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-[#546E7A]/70 line-clamp-2">
                        {(e.reflection || "").trim().slice(0, 86)}
                        {(e.reflection || "").trim().length > 86 ? "..." : ""}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {entries.length > 40 && (
            <p className="mt-4 text-center text-xs text-white/50">
              Showing the most recent 40
            </p>
          )}
        </SlideUp>
      </div>
    </div>
  );
}
