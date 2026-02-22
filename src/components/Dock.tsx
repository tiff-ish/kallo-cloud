import { Icon } from "./Icon";

export type DockTarget = "home" | "new" | "library";

export function Dock({ current, onGo }: { current: DockTarget; onGo: (k: DockTarget) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 pb-[max(14px,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto w-fit">
        <div className="glass flex items-center gap-1.5 rounded-full px-2 py-2">
          {(
            [
              { k: "home", icon: "home", label: "Home" },
              { k: "new", icon: "plus", label: "New" },
              { k: "library", icon: "book", label: "Library" },
            ] as const
          ).map((b) => (
            <button
              key={b.k}
              onClick={() => onGo(b.k)}
              className={
                "flex h-11 w-11 items-center justify-center rounded-full transition-all focus:outline-none " +
                (current === b.k
                  ? "bg-[#F5ECDC]/60 shadow-sm"
                  : "bg-transparent hover:bg-[#F5ECDC]/25")
              }
              aria-label={b.label}
            >
              <Icon
                name={b.icon}
                size={18}
                color={current === b.k ? "#16171C" : "rgba(22,23,28,0.45)"}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
