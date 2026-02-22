import { useRef, useState, useEffect } from "react";
import { SlideUp } from "../FadeIn";
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

  useEffect(() => {
    const cloud = CLOUD_TYPES[centerIdx];
    if (cloud) setCloudType(cloud.slug);
  }, [centerIdx]);

  const selectedCloud = CLOUD_TYPES[centerIdx];

  return (
    <div className="flex min-h-[100svh] flex-col">
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

      {/* Cloud Carousel */}
      <div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-130px)] py-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {CLOUD_TYPES.map((cloud, i) => {
            const isCenter = i === centerIdx;
            const distance = Math.abs(i - centerIdx);
            const scale = isCenter ? 1 : Math.max(0.75, 1 - distance * 0.1);
            const opacity = isCenter ? 1 : Math.max(0.3, 1 - distance * 0.3);

            return (
              <button
                key={cloud.slug}
                data-cloud-card
                onClick={() => selectCloud(cloud.slug, i)}
                className={`flex w-[260px] shrink-0 snap-center items-center justify-center rounded-[22px] transition-all duration-300 ${
                  isCenter ? "glass-strong" : "glass"
                }`}
                style={{
                  transform: `scale(${scale}) translateZ(0)`,
                  opacity,
                  height: "260px",
                }}
              >
                <img
                  src={cloud.image}
                  alt={cloud.name}
                  className="h-[200px] w-[200px] object-contain drop-shadow-xl"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-1.5 py-4">
          {CLOUD_TYPES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === centerIdx
                  ? "h-2 w-2 bg-[#F7F9FA]"
                  : "h-1.5 w-1.5 bg-[#F7F9FA]/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Cloud name + description */}
      <SlideUp>
        <div className="flex flex-col items-center px-8 pt-2">
          <h2 className="font-serif-display text-3xl font-semibold text-[#F7F9FA]">
            {selectedCloud?.name || "Choose a cloud"}
          </h2>
          <p className="mt-3 max-w-[300px] text-center text-sm leading-relaxed text-[#F7F9FA]/65">
            {selectedCloud?.description || "Scroll through the clouds above"}
          </p>
        </div>
      </SlideUp>

      <div className="flex-1" />

      {/* Select button */}
      <div className="mx-auto w-full max-w-[380px] px-6 pb-10">
        <button
          onClick={onNext}
          disabled={!cloudType}
          className="w-full rounded-full border border-[#16171C]/10 bg-[#F5ECDC]/20 px-8 py-4 text-base font-semibold text-[#F7F9FA] backdrop-blur-xl transition-all hover:bg-[#F5ECDC]/30 focus:outline-none focus:ring-2 focus:ring-[#F5ECDC]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            boxShadow:
              "0 14px 50px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(245,236,220,0.2)",
          }}
        >
          Select This Cloud
        </button>
      </div>
    </div>
  );
}
