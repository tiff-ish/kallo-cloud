import type { InstallPromptState } from "../../types";
import { FadeIn } from "../FadeIn";
import { GhostButton } from "../ui";
import { Icon } from "../Icon";

export function HomeScreen({
  onBegin,
  onLibrary,
  install,
  onShowCue,
}: {
  onBegin: () => void;
  onLibrary: () => void;
  onShowCue: () => void;
  install: InstallPromptState;
}) {
  return (
    <div className="relative mx-auto max-w-[420px] px-4 pb-28 pt-6">
      <FadeIn>
        <div className="grid gap-3">
          <div className="rounded-[30px] border border-black/10 bg-[rgba(242,237,230,0.30)] p-5 backdrop-blur-xl">
            <div className="text-[11px] tracking-wide text-[rgba(18,20,23,0.58)]">Welcome</div>
            <div className="mt-2 text-xl font-semibold text-[rgba(18,20,23,0.90)]">A visual cue to slow down.</div>
            <div className="mt-2 text-sm text-[rgba(18,20,23,0.68)]">Clouds are the doorway. Reflection is the room.</div>
            <div className="mt-4 flex items-center gap-2">
              <GhostButton onClick={onShowCue} className="px-4 py-2 text-xs rounded-full">
                See the ritual cue
              </GhostButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onBegin}
              className="group rounded-[28px] border border-black/10 bg-white/45 p-5 text-left backdrop-blur-xl transition hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-semibold text-[rgba(18,20,23,0.88)]">Look up</div>
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/55 ring-1 ring-black/10">
                  <Icon name="plus" />
                </div>
              </div>
              <div className="mt-2 text-xs text-[rgba(18,20,23,0.60)]">Begin a moment</div>
              <div className="mt-8 text-[11px] text-[rgba(18,20,23,0.55)] group-hover:text-[rgba(18,20,23,0.68)]">tap</div>
            </button>

            <button
              onClick={onLibrary}
              className="group rounded-[28px] border border-black/10 bg-white/45 p-5 text-left backdrop-blur-xl transition hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-semibold text-[rgba(18,20,23,0.88)]">Past moments</div>
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/55 ring-1 ring-black/10">
                  <Icon name="book" />
                </div>
              </div>
              <div className="mt-2 text-xs text-[rgba(18,20,23,0.60)]">Re-enter an entry</div>
              <div className="mt-8 text-[11px] text-[rgba(18,20,23,0.55)] group-hover:text-[rgba(18,20,23,0.68)]">tap</div>
            </button>
          </div>

          {install.isIos ? (
            <div className="rounded-[24px] border border-black/10 bg-white/40 p-4 text-xs text-[rgba(18,20,23,0.66)] backdrop-blur-xl">
              <div className="font-semibold text-[rgba(18,20,23,0.82)]">Want this as an app?</div>
              <div className="mt-1">On iPhone: Share &rarr; "Add to Home Screen".</div>
            </div>
          ) : null}

          {install.available ? (
            <button
              onClick={install.prompt}
              className="inline-flex items-center justify-center gap-2 rounded-[24px] border border-black/10 bg-white/45 px-4 py-4 text-sm font-semibold text-[rgba(18,20,23,0.86)] backdrop-blur-xl transition hover:bg-white/60"
            >
              <Icon name="download" />
              Install this app
            </button>
          ) : null}

          <div className="text-center text-xs text-[rgba(18,20,23,0.55)]">Made for noticing — not for tracking.</div>
        </div>
      </FadeIn>
    </div>
  );
}
