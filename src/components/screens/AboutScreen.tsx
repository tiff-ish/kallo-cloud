import { SlideUp } from "../FadeIn";
import { GlassCard, Divider } from "../ui";
import { Icon } from "../Icon";

export function AboutScreen() {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <div className="mx-auto w-full max-w-[480px] px-5 pt-20 pb-32">
        <SlideUp>
          <h1 className="font-serif-display text-3xl font-bold text-white">
            About
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Noticing, not logging
          </p>

          <GlassCard className="mt-6 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/40">
              <Icon name="cloud" size={24} color="#2C3E50" />
            </div>
            <h2 className="mt-4 font-serif-display text-xl font-semibold text-[#2C3E50]">
              Cloud Journal
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#546E7A]">
              This is a tiny nature-connection app. Cloud identification is simply the invitation to look up.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#546E7A]">
              The background adapts to what you notice so your reflection feels grounded in the moment.
            </p>

            <Divider />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2C3E50]/6">
                <Icon name="location" size={14} color="#546E7A" />
              </div>
              <p className="text-xs text-[#546E7A]">
                <span className="font-semibold text-[#2C3E50]">Privacy first:</span>{" "}
                Entries live on your device (IndexedDB). No data leaves this app.
              </p>
            </div>
          </GlassCard>
        </SlideUp>
      </div>
    </div>
  );
}
