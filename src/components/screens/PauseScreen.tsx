import { useEffect, useRef, useState } from "react";
import { FadeIn } from "../FadeIn";
import { FrostedCard, Divider, GhostButton, PrimaryButton } from "../ui";

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

  return (
    <div className="mx-auto max-w-[420px] px-4 pb-28 pt-10">
      <FadeIn>
        <FrostedCard className="p-6">
          <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">10-second pause</div>
          <div className="mt-2 text-xl font-semibold text-[rgba(18,20,23,0.90)]">Look up.</div>
          <div className="mt-2 text-sm text-[rgba(18,20,23,0.68)]">Let your eyes rest on one part of the sky.</div>

          <Divider />

          <div className="mt-2 flex items-end justify-between">
            <div className="text-sm text-[rgba(18,20,23,0.70)]">Breathe once. Nothing to do.</div>
            <div className="text-3xl font-semibold tabular-nums text-[rgba(18,20,23,0.90)]">{Math.max(0, t)}</div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <GhostButton onClick={onSkip} className="flex-1">
              Skip
            </GhostButton>
            <PrimaryButton onClick={onDone} className="flex-1">
              Continue
            </PrimaryButton>
          </div>

          <div className="mt-4 text-xs text-[rgba(18,20,23,0.55)]">The sky is the teacher. The app is just the reminder.</div>
        </FrostedCard>
      </FadeIn>
    </div>
  );
}
