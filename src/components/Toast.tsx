export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed inset-x-0 top-16 z-30 px-4">
      <div className="mx-auto max-w-[420px]">
        <div className="rounded-full border border-black/10 bg-[rgba(242,237,230,0.65)] px-4 py-2 text-center text-xs font-semibold text-[rgba(18,20,23,0.82)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          {message}
        </div>
      </div>
    </div>
  );
}
