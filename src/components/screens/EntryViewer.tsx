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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16171C]/6 transition hover:bg-[#16171C]/12"
            >
              <Icon name="back" size={18} color="#4B5C72" />
            </button>
            <button
              onClick={() => {
                if (confirm("Delete this entry? This can't be undone.")) onDelete(entry.id);
              }}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#A89B91] transition hover:bg-[#A89B91]/10 hover:text-[#4B5C72]"
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
            <h2 className="mt-2 font-serif-display text-2xl font-semibold text-[#16171C]/[0.92]">
              {cloudName}
            </h2>
            <p className="mt-1 text-sm text-[#4B5C72]">
              {cloudName} <span className="mx-1.5 text-[#4B5C72]/40">&middot;</span> {formatDate(entry.createdAt)}
            </p>
          </div>

          {/* Cloud description / location tag */}
          {entry.cloudDescription?.trim() && (
            <div className="mx-6 mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#16171C]/5 px-4 py-2">
              <Icon name="location" size={13} color="#7FAFB3" />
              <span className="text-sm text-[#4B5C72]">{entry.cloudDescription.trim()}</span>
            </div>
          )}

          <div className="px-6">
            <Divider />
          </div>

          {/* Reflection body */}
          <div className="px-6">
            <div className="text-xs font-medium tracking-wider text-[#4B5C72]/70">
              Reflection
            </div>
            <div
              className="mt-3 max-h-[30svh] overflow-y-auto whitespace-pre-wrap text-base leading-relaxed text-[#16171C]/[0.92]"
              style={{ fontFamily: '"EB Garamond", ui-serif, Georgia, serif' }}
            >
              {entry.reflection}
            </div>
          </div>

          {/* Cloud photo at bottom of card */}
          <div className="mt-6 overflow-hidden rounded-b-[22px]">
            <div className="relative h-[160px] w-full">
              <img
                src={thumbnail}
                alt={`${cloudName} sky`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(245,236,220,0.5) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </GlassCard>
      </SlideUp>
    </ScreenShell>
  );
}
