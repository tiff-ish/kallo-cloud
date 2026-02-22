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
    <div className="flex min-h-[100svh] items-center justify-center px-5">
      <div className="glass rounded-[22px] p-10">
        <EtherealCopy lines={CUE_LINES} onTap={onTap} />
      </div>
    </div>
  );
}
