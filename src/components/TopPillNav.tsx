import type { TabKey, InstallPromptState } from "../types";
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
    <div className="fixed top-0 inset-x-0 z-20 pt-[max(12px,env(safe-area-inset-top))]">
      <div className="mx-auto flex max-w-[480px] items-center justify-between px-5 py-2">
        {/* App Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/40 backdrop-blur-md">
            <Icon name="cloud" size={18} color="#2C3E50" />
          </div>
          <div>
            <div className="font-serif-display text-sm font-semibold text-white">Cloud Journal</div>
            <div className="text-[10px] text-white/55">a tiny ritual</div>
          </div>
        </div>

        {/* Nav Pills */}
        <div className="glass flex items-center gap-0.5 rounded-full px-1 py-1">
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
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all focus:outline-none " +
                (active === t.k
                  ? "bg-white/60 text-[#2C3E50] shadow-sm"
                  : "text-[#2C3E50]/55 hover:bg-white/30 hover:text-[#2C3E50]/80")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Install */}
        {install.available ? (
          <button
            onClick={install.prompt}
            className="hidden items-center gap-1.5 rounded-full bg-white/30 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-md hover:bg-white/40 sm:inline-flex"
          >
            <Icon name="download" size={14} color="rgba(255,255,255,0.8)" />
            Install
          </button>
        ) : (
          <div className="hidden w-[78px] sm:block" />
        )}
      </div>
    </div>
  );
}
