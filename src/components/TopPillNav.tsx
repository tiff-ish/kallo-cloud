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
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#F5ECDC]/35 backdrop-blur-md">
            <Icon name="cloud" size={18} color="#F7F9FA" />
          </div>
          <div>
            <div className="font-serif-display text-sm font-semibold text-[#F7F9FA]">Cloud Journal</div>
            <div className="text-[10px] text-[#F7F9FA]/50">a tiny ritual</div>
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
                  ? "bg-[#F5ECDC]/55 text-[#16171C]/[0.88] shadow-sm"
                  : "text-[#16171C]/45 hover:bg-[#F5ECDC]/30 hover:text-[#16171C]/70")
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
            className="hidden items-center gap-1.5 rounded-full bg-[#F5ECDC]/25 px-3 py-1.5 text-[11px] font-semibold text-[#F7F9FA]/80 backdrop-blur-md hover:bg-[#F5ECDC]/35 sm:inline-flex"
          >
            <Icon name="download" size={14} color="rgba(247,249,250,0.8)" />
            Install
          </button>
        ) : (
          <div className="hidden w-[78px] sm:block" />
        )}
      </div>
    </div>
  );
}
