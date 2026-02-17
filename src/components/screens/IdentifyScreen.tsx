import { useRef, useState, useEffect } from "react";
import { SlideUp } from "../FadeIn";
import { GlassCard, GlassButton } from "../ui";
import { CLOUD_TYPES } from "../../lib/theme";
import { Icon } from "../Icon";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(() => {
    const idx = CLOUD_TYPES.findIndex((c) => c.slug === cloudType);
    return idx >= 0 ? idx : 0;
  });

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    const cards = el.querySelectorAll("[data-cloud-card]");
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const rect = card as HTMLElement;
      const cardCenter = rect.offsetLeft + rect.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setCenterIdx(closest);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-cloud-card]");
    if (cards[centerIdx]) {
      const card = cards[centerIdx] as HTMLElement;
      const scrollTo = card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2;
      el.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, []);

  const selectCloud = (slug: string, idx: number) => {
    setCloudType(slug);
    setCenterIdx(idx);
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-cloud-card]");
    if (cards[idx]) {
      const card = cards[idx] as HTMLElement;
      const scrollTo = card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2;
      el.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const selectedCloud = CLOUD_TYPES[centerIdx];

  return (
    <div className="flex min-h-[100svh] flex-col">
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

      {/* 3D Cloud Carousel */}
      <div className="mt-6 flex-1">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-100px)] py-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {CLOUD_TYPES.map((cloud, i) => {
            const isCenter = i === centerIdx;
            const isSelected = cloudType === cloud.slug;
            const distance = Math.abs(i - centerIdx);
            const scale = isCenter ? 1 : Math.max(0.78, 1 - distance * 0.08);
            const opacity = isCenter ? 1 : Math.max(0.5, 1 - distance * 0.2);

            return (
              <button
                key={cloud.slug}
                data-cloud-card
                onClick={() => selectCloud(cloud.slug, i)}
                className={`flex w-[200px] shrink-0 snap-center flex-col items-center rounded-[28px] p-4 pt-2 transition-all duration-300 ${
                  isSelected
                    ? "glass-strong ring-2 ring-white/50"
                    : "glass"
                }`}
                style={{
                  transform: `scale(${scale}) translateZ(0)`,
                  opacity,
                }}
              >
                <img
                  src={cloud.image}
                  alt={cloud.name}
                  className="h-[140px] w-[140px] object-contain drop-shadow-lg"
                  draggable={false}
                />
                <div className="mt-1 font-serif-display text-base font-semibold text-[#2C3E50]">
                  {cloud.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 pb-4">
          {CLOUD_TYPES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === centerIdx
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Selected cloud info card */}
      <div className="mx-auto w-full max-w-[480px] px-5 pb-8">
        <SlideUp>
          <GlassCard className="p-5">
            <div className="flex items-center gap-4">
              <img
                src={selectedCloud?.image}
                alt={selectedCloud?.name}
                className="h-16 w-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-serif-display text-xl font-semibold text-[#2C3E50]">
                  {selectedCloud?.name || "Choose a cloud"}
                </h3>
                <p className="mt-1 text-sm leading-snug text-[#546E7A]">
                  {selectedCloud?.description || "Scroll through the clouds above"}
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="mt-4">
            <GlassButton onClick={onNext} disabled={!cloudType}>
              Select This Cloud
            </GlassButton>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
