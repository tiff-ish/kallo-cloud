import { SlideUp } from "../FadeIn";
import { GlassCard, Divider } from "../ui";
import { Icon } from "../Icon";

export function AboutScreen() {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <div className="mx-auto w-full max-w-[480px] px-5 pt-20 pb-32">
        <SlideUp>
          <h1 className="font-serif-display text-3xl font-semibold text-[#F7F9FA]">
            About
          </h1>
          <p className="mt-1 text-sm text-[#F7F9FA]/60">
            Noticing, not logging
          </p>

          <GlassCard className="mt-6 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F5ECDC]/40">
              <Icon name="cloud" size={24} color="#16171C" />
            </div>
            <h2 className="mt-4 font-serif-display text-xl font-semibold text-[#16171C]/[0.92]">
              Cloud Journal
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5C72]">
              This is a tiny nature-connection app. Cloud identification is simply the invitation to look up.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5C72]">
              The background adapts to what you notice so your reflection feels grounded in the moment.
            </p>

            <Divider />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16171C]/5">
                <Icon name="location" size={14} color="#4B5C72" />
              </div>
              <p className="text-xs text-[#4B5C72]">
                <span className="font-semibold text-[#16171C]/[0.92]">Privacy first:</span>{" "}
                Entries live on your device (IndexedDB). No data leaves this app.
              </p>
            </div>
          </GlassCard>
        </SlideUp>
      </div>
    </div>
  );
}
