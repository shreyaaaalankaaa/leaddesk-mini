import type { LucideIcon } from 'lucide-react';

export function MetricCard({ label, value, hint, icon: Icon }: { label: string; value: number; hint: string; icon: LucideIcon }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{hint}</p>
    </article>
  );
}
