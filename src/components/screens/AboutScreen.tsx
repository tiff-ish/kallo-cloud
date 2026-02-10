import { FadeIn } from "../FadeIn";
import { FrostedCard, Divider } from "../ui";

export function AboutScreen() {
  return (
    <div className="mx-auto max-w-[420px] px-4 pb-28 pt-6">
      <FadeIn>
        <FrostedCard className="p-6">
          <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">About</div>
          <div className="mt-1 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Noticing, not logging.</div>
          <div className="mt-3 text-sm text-[rgba(18,20,23,0.70)]">
            This is a tiny nature-connection app. Cloud identification is simply the invitation to look up.
            <div className="mt-3">The background adapts to what you notice so your reflection feels grounded in the moment.</div>
          </div>

          <Divider />

          <div className="mt-1 text-xs text-[rgba(18,20,23,0.60)]">
            Privacy: entries live on your device (IndexedDB). If you want cross-device sync later, add an optional sign-in + cloud sync.
          </div>
        </FrostedCard>
      </FadeIn>
    </div>
  );
}
