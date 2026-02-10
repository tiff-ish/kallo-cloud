import { Icon } from "./Icon";

export type DockTarget = "home" | "new" | "library";

export function Dock({ current, onGo }: { current: DockTarget; onGo: (k: DockTarget) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 pb-[max(14px,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto w-fit">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-[rgba(242,237,230,0.42)] px-2 py-2 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
          {(
            [
              { k: "home", icon: "home" },
              { k: "new", icon: "plus" },
              { k: "library", icon: "book" },
            ] as const
          ).map((b) => (
            <button
              key={b.k}
              onClick={() => onGo(b.k)}
              className={
                "grid h-10 w-10 place-items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-black/10 " +
                (current === b.k ? "bg-white/65" : "bg-white/35 hover:bg-white/55")
              }
              aria-label={b.k}
            >
              <Icon name={b.icon} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
