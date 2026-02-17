import type { JournalEntry } from "../../types";
import { CLOUD_TYPES, CLOUD_TO_THUMBNAIL } from "../../lib/theme";
import { formatDate } from "../../lib/utils";
import { SlideUp } from "../FadeIn";
import { GlassCard, Divider, ScreenShell } from "../ui";
import { Icon } from "../Icon";

export function EntryViewer({
  entry,
  onDelete,
  onClose,
}: {
  entry: JournalEntry;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const cloudInfo = CLOUD_TYPES.find((c) => c.slug === entry.cloudType);
  const cloudName = cloudInfo?.name || "Moment";
  const cloudImage = cloudInfo?.image || "/clouds/other.png";
  const thumbnail = CLOUD_TO_THUMBNAIL[entry.cloudType] || "/thumbnails/neutral.jpg";

  return (
    <ScreenShell centered>
      <SlideUp>
        <GlassCard variant="opaque" className="max-w-[440px] overflow-hidden">
          {/* Header with back chevron */}
          <div className="flex items-center justify-between px-6 pt-5">
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2C3E50]/8 transition hover:bg-[#2C3E50]/15"
            >
              <Icon name="back" size={18} color="#546E7A" />
            </button>
            <button
              onClick={() => {
                if (confirm("Delete this entry? This can't be undone.")) onDelete(entry.id);
              }}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-red-400/70 transition hover:bg-red-50 hover:text-red-500"
            >
              <Icon name="delete" size={14} color="currentColor" />
              Delete
            </button>
          </div>

          {/* Cloud type header with image */}
          <div className="flex flex-col items-center px-6 pt-4 pb-2">
            <img
              src={cloudImage}
              alt={cloudName}
              className="h-20 w-20 object-contain"
            />
            <h2 className="mt-2 font-serif-display text-2xl font-bold text-[#2C3E50]">
              {cloudName}
            </h2>
            {/* Centered-dot date separator: "Cumulus . Oct 27, 2023" */}
            <p className="mt-1 text-sm text-[#546E7A]">
              {cloudName} <span className="mx-1.5 text-[#546E7A]/40">&middot;</span> {formatDate(entry.createdAt)}
            </p>
          </div>

          {/* Cloud description / location tag */}
          {entry.cloudDescription?.trim() && (
            <div className="mx-6 mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#2C3E50]/5 px-4 py-2">
              <Icon name="location" size={13} color="#5F8D9B" />
              <span className="text-sm text-[#546E7A]">{entry.cloudDescription.trim()}</span>
            </div>
          )}

          <div className="px-6">
            <Divider />
          </div>

          {/* Reflection body */}
          <div className="px-6">
            <div className="text-xs font-medium uppercase tracking-wider text-[#546E7A]/70">
              Reflection
            </div>
            <div
              className="mt-3 max-h-[30svh] overflow-y-auto whitespace-pre-wrap text-base leading-relaxed text-[#2C3E50]"
              style={{ fontFamily: '"EB Garamond", ui-serif, Georgia, serif' }}
            >
              {entry.reflection}
            </div>
          </div>

          {/* Cloud photo at bottom of card */}
          <div className="mt-6 overflow-hidden rounded-b-[24px]">
            <div className="relative h-[160px] w-full">
              <img
                src={thumbnail}
                alt={`${cloudName} sky`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </GlassCard>
      </SlideUp>
    </ScreenShell>
  );
}
