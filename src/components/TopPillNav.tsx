import type { TabKey, InstallPromptState } from "../types";
import { FrostedPill } from "./ui";
import { Icon } from "./Icon";

export function TopPillNav({
  active,
  onNav,
  install,
}: {
  active: TabKey;
  onNav: (k: TabKey) => void;
  install: InstallPromptState;
}) {
  return (
    <div className="relative z-10 px-4 pt-4">
      <div className="mx-auto flex max-w-[420px] items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-white/50 ring-1 ring-black/10 backdrop-blur" />
          <div>
            <div className="text-xs font-semibold text-[rgba(18,20,23,0.85)]">Cloud Journal</div>
            <div className="text-[11px] text-[rgba(18,20,23,0.55)]">a tiny ritual</div>
          </div>
        </div>

        <FrostedPill className="flex items-center gap-1 px-1">
          {(
            [
              { k: "home", label: "Home" },
              { k: "library", label: "Library" },
              { k: "about", label: "About" },
            ] as const
          ).map((t) => (
            <button
              key={t.k}
              onClick={() => onNav(t.k)}
              className={
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-black/10 " +
                (active === t.k ? "bg-white/65 text-[rgba(18,20,23,0.88)]" : "text-[rgba(18,20,23,0.62)] hover:bg-white/55")
              }
            >
              {t.label}
            </button>
          ))}
        </FrostedPill>

        {install.available ? (
          <button
            onClick={install.prompt}
            className="ml-2 hidden items-center gap-2 rounded-full border border-black/10 bg-white/45 px-3 py-2 text-[11px] font-semibold text-[rgba(18,20,23,0.80)] backdrop-blur hover:bg-white/60 sm:inline-flex"
          >
            <Icon name="download" />
            Install
          </button>
        ) : (
          <div className="hidden sm:block w-[78px]" />
        )}
      </div>
    </div>
  );
}
