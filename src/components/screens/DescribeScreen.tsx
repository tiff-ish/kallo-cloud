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
          className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/30"
        >
          <Icon name="back" size={16} color="rgba(255,255,255,0.8)" />
          Back
        </button>
      </div>

      <div className="flex-1" />

      {/* Bottom sheet style editor */}
      <div className="mx-auto w-full max-w-[480px]">
        <SlideUp>
          <div className="glass-strong rounded-t-[32px] px-6 pb-8 pt-4">
            {/* Drag handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-[#546E7A]/25" />
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
                  <h2 className="font-serif-display text-xl font-semibold text-[#2C3E50]">
                    {cloudName}
                  </h2>
                  <p className="text-xs text-[#546E7A]">Describe the scene</p>
                </div>
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-[#546E7A]/60">
                Step 2 of 3
              </div>
            </div>

            {/* Location tag placeholder */}
            <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-[#2C3E50]/5 px-3 py-2">
              <Icon name="location" size={14} color="#546E7A" />
              <span className="text-xs text-[#546E7A]">Current location</span>
            </div>

            {/* Description input */}
            <label className="mt-5 block text-xs font-medium uppercase tracking-wider text-[#546E7A]/70">
              What did you notice? (optional)
            </label>
            <input
              value={cloudDescription}
              onChange={(e) => setCloudDescription(e.target.value)}
              placeholder='e.g., "wispy and pink at sunset"'
              className="mt-2 w-full rounded-[16px] border border-[#2C3E50]/8 bg-white/60 px-4 py-3.5 text-sm text-[#2C3E50] outline-none backdrop-blur transition placeholder:text-[#546E7A]/50 focus:border-[#5F8D9B]/40 focus:ring-2 focus:ring-[#5F8D9B]/20"
              maxLength={140}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-[#546E7A]/60">
              <div>Color. Movement. Light. Temperature.</div>
              <div className="tabular-nums">{cloudDescription.length}/140</div>
            </div>

            {/* Action button */}
            <div className="mt-6">
              <GlassButton onClick={onNext}>
                Next — Reflect
              </GlassButton>
            </div>

            <p className="mt-3 text-center text-xs text-[#546E7A]/60">{footerCopy}</p>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
