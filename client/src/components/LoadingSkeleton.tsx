export function LoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-label="Loading leads">
      {[0, 1, 2, 3, 4].map((item) => (
        <div key={item} className="grid animate-pulse grid-cols-[1.4fr_1fr_.8fr_.6fr] gap-5 border-b border-slate-100 px-5 py-5 last:border-0">
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
