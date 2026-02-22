export function Toast({ message }: { message: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div
        className="glass pointer-events-auto rounded-full px-5 py-2.5 text-sm font-medium text-[#16171C]/[0.88]"
        style={{ animation: "fadeIn 200ms ease, slideUp 200ms ease" }}
      >
        {message}
      </div>
    </div>
  );
}
