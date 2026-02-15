import { SlideUp } from "../FadeIn";
import { FrostedCard, GhostButton, PrimaryButton, ScreenShell } from "../ui";
import { suggestCloudFromDescription } from "../../lib/theme";

export function DescribeScreen({
  cloudType,
  cloudDescription,
  setCloudDescription,
  onNext,
  onBack,
}: {
  cloudType: string;
  cloudDescription: string;
  setCloudDescription: (s: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const suggestion = cloudType === "other" ? suggestCloudFromDescription(cloudDescription) : null;

  const footerCopy =
    cloudType === "other"
      ? cloudDescription.trim() === ""
        ? "Simply noticing something beyond this app is enough."
        : suggestion
          ? `This might be ${suggestion.name} — no need to change if it feels right.`
          : "Those words softly steer the mood of the background."
      : "Those words softly steer the mood of the background.";

  return (
    <ScreenShell>
      <SlideUp>
        <FrostedCard className="p-6">
          <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Step 2 of 3</div>
          <div className="mt-2 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Write a scene note.</div>
          <div className="mt-2 text-sm text-[rgba(18,20,23,0.68)]">Color. Movement. Light. Temperature. One line is enough.</div>

          <label className="mt-5 block text-sm font-semibold text-[rgba(18,20,23,0.82)]">What did you notice? (optional)</label>
          <input
            value={cloudDescription}
            onChange={(e) => setCloudDescription(e.target.value)}
            placeholder='e.g., "wispy and pink at sunset"'
            className="mt-2 w-full rounded-[20px] border border-white/15 bg-white/55 px-4 py-3 text-sm text-[rgba(18,20,23,0.88)] outline-none backdrop-blur transition placeholder:text-[rgba(18,20,23,0.45)] focus:border-black/20"
            maxLength={140}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-[rgba(18,20,23,0.55)]">
            <div>Let it be sensory, not clever.</div>
            <div className="tabular-nums">{cloudDescription.length}/140</div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <GhostButton onClick={onBack} className="flex-1">
              Back
            </GhostButton>
            <PrimaryButton onClick={onNext} className="flex-1">
              Next
            </PrimaryButton>
          </div>

          <div className="mt-4 text-xs text-[rgba(18,20,23,0.55)]">{footerCopy}</div>
        </FrostedCard>
      </SlideUp>
    </ScreenShell>
  );
}
