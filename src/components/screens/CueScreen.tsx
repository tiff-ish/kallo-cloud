import { EtherealCopy } from "../EtherealCopy";

const CUE_LINES = [
  "Look up.",
  "Notice the light.",
  "Choose one shape.",
  "Let the sky name your pace.",
  "When you're ready, begin.",
];

export function CueScreen({ onTap }: { onTap: () => void }) {
  return (
    <div className="mx-auto max-w-[420px] px-4 pb-28 pt-24">
      <div className="rounded-[34px] border border-white/10 bg-black/10 p-10 backdrop-blur-xl">
        <EtherealCopy lines={CUE_LINES} onTap={onTap} />
      </div>
    </div>
  );
}
