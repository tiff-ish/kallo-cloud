import { useEffect, useRef } from "react";
import { SlideUp } from "../FadeIn";
import { CLOUD_TYPES } from "../../lib/theme";
import { Icon } from "../Icon";

export function ReflectScreen({
  reflection,
  setReflection,
  cloudType,
  onBack,
  onSave,
  canSave,
}: {
  reflection: string;
  setReflection: (s: string) => void;
  cloudType?: string;
  onBack: () => void;
  onSave: () => void;
  canSave: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 450);
    return () => clearTimeout(t);
  }, []);

  const cloudInfo = CLOUD_TYPES.find((c) => c.slug === cloudType);
  const cloudName = cloudInfo?.name || "Cloud";
  const dateStr = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex min-h-[100svh] flex-col justify-end">
      {/* Back button */}
      <div className="mx-auto w-full max-w-[480px] px-5 pt-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-full bg-[#F5ECDC]/20 px-3 py-1.5 text-sm text-[#F7F9FA]/80 backdrop-blur-md transition hover:bg-[#F5ECDC]/30"
        >
          <Icon name="back" size={16} color="rgba(247,249,250,0.8)" />
          Back
        </button>
      </div>

      <div className="flex-1" />

      {/* Bottom Sheet: Journal Editor */}
      <div className="mx-auto w-full max-w-[480px]">
        <SlideUp>
          <div className="glass-strong rounded-t-[22px] px-6 pb-8 pt-4" style={{ minHeight: "70svh" }}>
            {/* Drag handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-[#4B5C72]/25" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={cloudInfo?.image}
                  alt={cloudName}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h2 className="font-serif-display text-xl font-semibold text-[#16171C]/[0.92]">
                    {cloudName}
                  </h2>
                  <p className="text-xs text-[#4B5C72]">
                    {cloudName} <span className="mx-1 text-[#4B5C72]/40">&middot;</span> {dateStr}
                  </p>
                </div>
              </div>
              <button
                onClick={onSave}
                disabled={!canSave}
                className="rounded-full bg-[#16171C] px-5 py-2 text-sm font-semibold text-[#F5ECDC] transition-all hover:bg-[#2A2B32] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Entry
              </button>
            </div>

            {/* Location tag */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-[#16171C]/6 px-3 py-1.5">
                <Icon name="location" size={12} color="#7FAFB3" />
                <span className="text-xs text-[#4B5C72]">Current location</span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={ref}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={
                "What shifted in you when you looked up?\nWhat does this sky remind you of?\n\nWrite freely..."
              }
              className="mt-5 min-h-[220px] w-full resize-none border-0 bg-transparent text-lg leading-relaxed text-[#16171C]/[0.92] outline-none placeholder:text-[#4B5C72]/40"
              style={{ fontFamily: '"EB Garamond", ui-serif, Georgia, serif' }}
            />

            {/* Bottom toolbar */}
            <div className="mt-auto flex items-center justify-between border-t border-[#16171C]/8 pt-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16171C]/5 transition hover:bg-[#16171C]/10">
                <Icon name="camera" size={18} color="#4B5C72" />
              </button>

              <p className="text-xs text-[#4B5C72]/50">
                This isn't a logbook. It's a moment you chose to notice.
              </p>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
