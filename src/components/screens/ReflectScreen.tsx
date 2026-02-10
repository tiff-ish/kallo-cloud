import { useEffect, useRef } from "react";
import { FadeIn } from "../FadeIn";
import { FrostedCard, GhostButton, PrimaryButton } from "../ui";

export function ReflectScreen({
  reflection,
  setReflection,
  onBack,
  onSave,
  canSave,
}: {
  reflection: string;
  setReflection: (s: string) => void;
  onBack: () => void;
  onSave: () => void;
  canSave: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-[420px] px-4 pb-28 pt-6">
      <FadeIn>
        <FrostedCard className="p-6">
          <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Step 3 of 3</div>
          <div className="mt-2 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Reflect.</div>
          <div className="mt-2 text-sm text-[rgba(18,20,23,0.68)]">No polish. One true sentence at a time.</div>

          <textarea
            ref={ref}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={
              "Try one…\n\n• What shifted in you when you looked up?\n• What does this sky remind you of?\n• If the clouds were a message, what would they say?\n\nWrite freely…"
            }
            className="mt-5 min-h-[220px] w-full resize-y rounded-[24px] border border-black/10 bg-white/55 p-5 text-[15px] leading-relaxed text-[rgba(18,20,23,0.92)] outline-none backdrop-blur transition placeholder:text-[rgba(18,20,23,0.45)] focus:border-black/20"
            style={{ fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, serif" }}
          />

          <div className="mt-4 flex items-center gap-2">
            <GhostButton onClick={onBack} className="flex-1">
              Back
            </GhostButton>
            <PrimaryButton onClick={onSave} disabled={!canSave} className="flex-1">
              Save
            </PrimaryButton>
          </div>

          <div className="mt-4 text-xs text-[rgba(18,20,23,0.55)]">This isn't a logbook. It's a small record of a moment you chose to notice.</div>
        </FrostedCard>
      </FadeIn>
    </div>
  );
}
