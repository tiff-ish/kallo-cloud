import { SlideUp } from "../FadeIn";
import { FrostedCard, GhostButton, PrimaryButton, ScreenShell } from "../ui";
import { CLOUD_TYPES } from "../../lib/theme";

export function IdentifyScreen({
  cloudType,
  setCloudType,
  onNext,
  onBack,
}: {
  cloudType: string;
  setCloudType: (s: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selected = CLOUD_TYPES.find((c) => c.slug === cloudType);
  return (
    <ScreenShell>
      <SlideUp>
        <FrostedCard className="p-6">
          <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Step 1 of 3</div>
          <div className="mt-2 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Name what you see.</div>
          <div className="mt-2 text-sm text-[rgba(18,20,23,0.68)]">A best guess is perfect. This isn't a test.</div>

          <label className="mt-5 block text-sm font-semibold text-[rgba(18,20,23,0.82)]">Cloud type</label>
          <select
            value={cloudType}
            onChange={(e) => setCloudType(e.target.value)}
            className="mt-2 w-full rounded-[20px] border border-white/15 bg-white/55 px-4 py-3 text-sm text-[rgba(18,20,23,0.88)] outline-none backdrop-blur transition focus:border-black/20"
          >
            <option value="">Choose…</option>
            {CLOUD_TYPES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="mt-2 text-xs text-[rgba(18,20,23,0.60)]">{selected ? <>Hint: {selected.hint}</> : 'Not sure? Pick "Not sure / Other."'}</div>

          <div className="mt-6 flex items-center gap-2">
            <GhostButton onClick={onBack} className="flex-1">
              Back
            </GhostButton>
            <PrimaryButton onClick={onNext} disabled={!cloudType} className="flex-1">
              Next
            </PrimaryButton>
          </div>

          <div className="mt-4 text-xs text-[rgba(18,20,23,0.55)]">As you choose, the sky behind you shifts to match.</div>
        </FrostedCard>
      </SlideUp>
    </ScreenShell>
  );
}
