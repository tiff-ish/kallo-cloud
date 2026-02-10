import type { JournalEntry } from "../../types";
import { CLOUD_TYPES } from "../../lib/theme";
import { FadeIn } from "../FadeIn";
import { FrostedCard, Divider } from "../ui";

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
    <div className="mx-auto max-w-[420px] px-4 pb-28 pt-6">
      <FadeIn>
        <FrostedCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Library</div>
              <div className="mt-1 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Past moments</div>
            </div>
            <div className="text-xs text-[rgba(18,20,23,0.60)]">{entries.length}</div>
          </div>

          <div className="mt-3 text-sm text-[rgba(18,20,23,0.68)]">Open one, and look up again — even for a second.</div>
          <Divider />

          <div className="mt-4 grid gap-2">
            {entries.length === 0 ? (
              <div className="rounded-[22px] border border-black/10 bg-white/40 p-4 text-sm text-[rgba(18,20,23,0.72)]">
                No entries yet.
                <div className="mt-2 text-xs text-[rgba(18,20,23,0.60)]">Tap "+" to begin a moment.</div>
              </div>
            ) : (
              entries.slice(0, 40).map((e) => (
                <button
                  key={e.id}
                  onClick={() => onSelect(e.id)}
                  className={
                    "rounded-[22px] border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-black/10 " +
                    (selectedId === e.id ? "border-black/20 bg-white/60" : "border-black/10 bg-white/40 hover:bg-white/55")
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[rgba(18,20,23,0.88)]">{CLOUD_TYPES.find((c) => c.slug === e.cloudType)?.name || "Moment"}</div>
                    <div className="text-xs text-[rgba(18,20,23,0.55)]">{new Date(e.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="mt-1 text-xs text-[rgba(18,20,23,0.68)] line-clamp-1">{e.cloudDescription?.trim() ? e.cloudDescription.trim() : "—"}</div>
                  <div className="mt-2 text-xs text-[rgba(18,20,23,0.60)] line-clamp-2">
                    {(e.reflection || "").trim().slice(0, 86)}
                    {(e.reflection || "").trim().length > 86 ? "…" : ""}
                  </div>
                </button>
              ))
            )}
          </div>

          {entries.length > 40 ? <div className="mt-3 text-xs text-[rgba(18,20,23,0.55)]">Showing the most recent 40.</div> : null}
        </FrostedCard>
      </FadeIn>
    </div>
  );
}
