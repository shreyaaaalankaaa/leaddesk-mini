import { CheckCircle2, X, XCircle } from 'lucide-react';

export type ToastState = { type: 'success' | 'error'; message: string } | null;

export function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  if (!toast) return null;

  const Icon = toast.type === 'success' ? CheckCircle2 : XCircle;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,380px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-soft" role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <Icon className={toast.type === 'success' ? 'text-emerald-600' : 'text-rose-600'} size={21} />
        <p className="flex-1 text-sm font-medium text-slate-800">{toast.message}</p>
        <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={onClose} aria-label="Dismiss notification">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
