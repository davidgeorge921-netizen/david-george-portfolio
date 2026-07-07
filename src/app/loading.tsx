export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink text-bone">
      <div className="w-64">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-wideTesla text-white/45">
          <span>Loading</span>
          <span>Motion</span>
        </div>
        <div className="h-px overflow-hidden bg-white/15">
          <div className="h-full w-full animate-scan bg-white" />
        </div>
      </div>
    </div>
  );
}
