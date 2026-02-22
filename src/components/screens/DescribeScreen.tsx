import { SlideUp } from "../FadeIn";
import { GlassButton } from "../ui";
import { suggestCloudFromDescription, CLOUD_TYPES } from "../../lib/theme";
import { Icon } from "../Icon";

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
  const cloudInfo = CLOUD_TYPES.find((c) => c.slug === cloudType);
  const cloudName = cloudInfo?.name || "Cloud";

  const footerCopy =
    cloudType === "other"
      ? cloudDescription.trim() === ""
        ? "Simply noticing something beyond this app is enough."
        : suggestion
          ? `This might be ${suggestion.name} — no need to change if it feels right.`
          : "Those words softly steer the mood of the background."
      : "Those words softly steer the mood of the background.";

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

      {/* Bottom sheet style editor */}
      <div className="mx-auto w-full max-w-[480px]">
        <SlideUp>
          <div className="glass-strong rounded-t-[22px] px-6 pb-8 pt-4">
            {/* Drag handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-[#4B5C72]/25" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={cloudInfo?.image || "/clouds/other.png"}
                  alt={cloudName}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h2 className="font-serif-display text-xl font-semibold text-[#16171C]/[0.92]">
                    {cloudName}
                  </h2>
                  <p className="text-xs text-[#4B5C72]">Describe the scene</p>
                </div>
              </div>
              <div className="text-xs font-medium tracking-wider text-[#4B5C72]/60">
                Step 2 of 3
              </div>
            </div>

            {/* Location tag placeholder */}
            <div className="mt-4 flex items-center gap-2 rounded-[14px] bg-[#16171C]/5 px-3 py-2">
              <Icon name="location" size={14} color="#4B5C72" />
              <span className="text-xs text-[#4B5C72]">Current location</span>
            </div>

            {/* Description input */}
            <label className="mt-5 block text-xs font-medium tracking-wider text-[#4B5C72]/70">
              What did you notice? (optional)
            </label>
            <input
              value={cloudDescription}
              onChange={(e) => setCloudDescription(e.target.value)}
              placeholder='e.g., "wispy and pink at sunset"'
              className="mt-2 w-full rounded-[14px] border border-[#16171C]/8 bg-[#F5ECDC]/40 px-4 py-3.5 text-sm text-[#16171C]/[0.92] outline-none backdrop-blur transition placeholder:text-[#4B5C72]/50 focus:border-[#7FAFB3]/40 focus:ring-2 focus:ring-[#7FAFB3]/20"
              maxLength={140}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-[#4B5C72]/60">
              <div>Color. Movement. Light. Temperature.</div>
              <div className="tabular-nums">{cloudDescription.length}/140</div>
            </div>

            {/* Action button */}
            <div className="mt-6">
              <GlassButton onClick={onNext}>
                Next — Reflect
              </GlassButton>
            </div>

            <p className="mt-3 text-center text-xs text-[#4B5C72]/60">{footerCopy}</p>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
