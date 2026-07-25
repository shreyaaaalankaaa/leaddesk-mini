import { useQuery } from '@tanstack/react-query';
import { Clock3, Mail, MessageSquareText, User2, X } from 'lucide-react';
import { api } from '../lib/api';
import { budgetLabels, formatDate, statusLabels } from '../lib/format';
import { StatusBadge } from './StatusBadge';

export function LeadDrawer({ leadId, onClose }: { leadId: string | null; onClose: () => void }) {
  const details = useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => api.leadDetails(leadId!),
    enabled: Boolean(leadId)
  });

  if (!leadId) return null;

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title">
      <button className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" onClick={onClose} aria-label="Close lead details" />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Lead detail</p>
            <h2 id="lead-detail-title" className="mt-2 font-display text-2xl font-extrabold text-slate-950">Conversation context</h2>
          </div>
          <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        {details.isLoading && <div className="mt-8 h-48 animate-pulse rounded-2xl bg-slate-100" />}
        {details.isError && <p className="mt-8 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">Could not load this lead.</p>}

        {details.data && (
          <>
            <div className="mt-8 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                    {details.data.lead.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">{details.data.lead.name}</p>
                    <p className="text-sm text-slate-500">{budgetLabels[details.data.lead.budgetRange]}</p>
                  </div>
                </div>
                <StatusBadge status={details.data.lead.status} />
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 shrink-0 text-slate-400" size={17} />
                  <div><dt className="font-semibold text-slate-700">Email</dt><dd className="mt-1 text-slate-500">{details.data.lead.email}</dd></div>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-slate-400" size={17} />
                  <div><dt className="font-semibold text-slate-700">Submitted</dt><dd className="mt-1 text-slate-500">{formatDate(details.data.lead.createdAt)}</dd></div>
                </div>
                <div className="flex gap-3">
                  <MessageSquareText className="mt-0.5 shrink-0 text-slate-400" size={17} />
                  <div><dt className="font-semibold text-slate-700">Project context</dt><dd className="mt-1 whitespace-pre-wrap leading-6 text-slate-600">{details.data.lead.message}</dd></div>
                </div>
              </dl>
            </div>

            <section className="mt-8">
              <div className="flex items-center gap-2">
                <User2 size={17} className="text-indigo-600" />
                <h3 className="font-display text-lg font-extrabold text-slate-950">Status history</h3>
              </div>
              {details.data.activity.length === 0 ? (
                <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No status changes yet. This lead is still in its initial state.</p>
              ) : (
                <ol className="mt-5 space-y-4 border-l border-slate-200 pl-5">
                  {details.data.activity.map((entry) => (
                    <li key={entry.id} className="relative">
                      <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50" />
                      <p className="text-sm font-semibold text-slate-800">
                        {entry.fromStatus ? `${statusLabels[entry.fromStatus]} → ` : ''}{statusLabels[entry.toStatus]}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{entry.actorEmail} · {formatDate(entry.createdAt)}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
