import { useEffect, useRef, useState } from "react";
import { SlideUp } from "../FadeIn";
import { GlassCard, Divider, GlassButton, GhostButton } from "../ui";

export function PauseScreen({ onSkip, onDone }: { onSkip: () => void; onDone: () => void }) {
  const [t, setT] = useState(9);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setT(9);
    const id = setInterval(() => setT((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (t <= 0) onDoneRef.current();
  }, [t]);

  const progress = ((10 - Math.max(0, t)) / 10) * 100;

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5">
      <div className="w-full max-w-[420px]">
        <SlideUp>
          <GlassCard className="p-8 text-center">
            {/* Timer circle */}
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/25">
              <div className="font-serif-display text-5xl font-bold text-[#2C3E50]">
                {Math.max(0, t)}
              </div>
            </div>

            <h2 className="font-serif-display text-2xl font-semibold text-[#2C3E50]">
              Look up.
            </h2>
            <p className="mt-2 text-sm text-[#546E7A]">
              Let your eyes rest on one part of the sky.
            </p>

            {/* Progress bar */}
            <div className="mx-auto mt-6 h-1 w-3/4 overflow-hidden rounded-full bg-[#2C3E50]/10">
              <div
                className="h-full rounded-full bg-[#5F8D9B] transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <Divider />

            <p className="text-sm text-[#546E7A]">
              Breathe once. Nothing to do.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <GhostButton onClick={onSkip} className="flex-1 text-[#2C3E50]">
                Skip
              </GhostButton>
              <GlassButton onClick={onDone} className="flex-1">
                Continue
              </GlassButton>
            </div>

            <p className="mt-4 text-xs text-[#546E7A]/50">
              The sky is the teacher. The app is just the reminder.
            </p>
          </GlassCard>
        </SlideUp>
      </div>
    </div>
  );
}
