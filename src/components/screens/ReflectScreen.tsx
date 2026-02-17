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
          className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/30"
        >
          <Icon name="back" size={16} color="rgba(255,255,255,0.8)" />
          Back
        </button>
      </div>

      <div className="flex-1" />

      {/* Bottom Sheet: Journal Editor */}
      <div className="mx-auto w-full max-w-[480px]">
        <SlideUp>
          <div className="glass-strong rounded-t-[32px] px-6 pb-8 pt-4" style={{ minHeight: "70svh" }}>
            {/* Drag handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-[#546E7A]/25" />
            </div>

            {/* Header row: cloud name . date | Save Entry pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={cloudInfo?.image}
                  alt={cloudName}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h2 className="font-serif-display text-xl font-bold text-[#2C3E50]">
                    {cloudName}
                  </h2>
                  <p className="text-xs text-[#546E7A]">
                    {cloudName} <span className="mx-1 text-[#546E7A]/40">&middot;</span> {dateStr}
                  </p>
                </div>
              </div>
              <button
                onClick={onSave}
                disabled={!canSave}
                className="rounded-full bg-[#2C3E50] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#3A5F6B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Entry
              </button>
            </div>

            {/* Location tag */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-[#2C3E50]/8 px-3 py-1.5">
                <Icon name="location" size={12} color="#5F8D9B" />
                <span className="text-xs text-[#546E7A]">Current location</span>
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
              className="mt-5 min-h-[220px] w-full resize-none border-0 bg-transparent text-lg leading-relaxed text-[#2C3E50] outline-none placeholder:text-[#546E7A]/40"
              style={{ fontFamily: '"EB Garamond", ui-serif, Georgia, serif' }}
            />

            {/* Bottom toolbar */}
            <div className="mt-auto flex items-center justify-between border-t border-[#2C3E50]/8 pt-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2C3E50]/6 transition hover:bg-[#2C3E50]/12">
                <Icon name="camera" size={18} color="#546E7A" />
              </button>

              <p className="text-xs text-[#546E7A]/50">
                This isn't a logbook. It's a moment you chose to notice.
              </p>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
