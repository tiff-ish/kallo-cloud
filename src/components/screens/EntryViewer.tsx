import type { JournalEntry } from "../../types";
import { formatDate } from "../../lib/utils";
import { SlideUp } from "../FadeIn";
import { FrostedCard, Divider, GhostButton, ScreenShell } from "../ui";

export function EntryViewer({ entry, onDelete, onClose }: { entry: JournalEntry; onDelete: (id: string) => void; onClose: () => void }) {
  return (
    <ScreenShell>
      <SlideUp>
        <FrostedCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Entry</div>
              <div className="mt-1 text-lg font-semibold text-[rgba(18,20,23,0.90)]">{formatDate(entry.createdAt)}</div>
              <div className="mt-2 text-sm text-[rgba(18,20,23,0.72)]">
                <span className="font-semibold">Noticed:</span> {entry.cloudDescription?.trim() ? entry.cloudDescription.trim() : "—"}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <GhostButton onClick={onClose} className="px-3 py-2 text-xs rounded-full">
                Close
              </GhostButton>
              <GhostButton
                onClick={() => {
                  if (confirm("Delete this entry? This can't be undone.")) onDelete(entry.id);
                }}
                className="px-3 py-2 text-xs rounded-full"
              >
                Delete
              </GhostButton>
            </div>
          </div>

          <Divider />

          <div className="mt-1 text-xs tracking-wide text-[rgba(18,20,23,0.58)]">Reflection</div>
          <div
            className="mt-3 max-h-[35svh] overflow-y-auto whitespace-pre-wrap rounded-[22px] border border-white/15 bg-white/50 p-5 text-[15px] leading-relaxed text-[rgba(18,20,23,0.90)]"
            style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, serif" }}
          >
            {entry.reflection}
          </div>

          <div className="mt-5 text-xs text-[rgba(18,20,23,0.55)]">If this ever feels like "keeping up," you're allowed to stop.</div>
        </FrostedCard>
      </SlideUp>
    </ScreenShell>
  );
}
