import { ChevronLeft, ChevronRight, Inbox, SearchX } from 'lucide-react';
import type { Lead, LeadStatus } from '../types';
import { budgetLabels, formatDate, initials } from '../lib/format';
import { StatusBadge } from './StatusBadge';

const statuses: LeadStatus[] = ['new', 'contacted', 'closed'];

export function LeadTable({
  leads,
  page,
  totalPages,
  total,
  onPageChange,
  onStatusChange,
  onSelect,
  updatingId,
  filtered
}: {
  leads: Lead[];
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onSelect: (id: string) => void;
  updatingId: string | null;
  filtered: boolean;
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
          {filtered ? <SearchX size={22} /> : <Inbox size={22} />}
        </span>
        <h3 className="mt-4 font-display text-lg font-extrabold text-slate-950">{filtered ? 'No matching leads' : 'No leads yet'}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {filtered ? 'Try a broader search or switch the status filter.' : 'New project submissions will appear here in real time.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Lead</th>
              <th className="px-5 py-4">Budget</th>
              <th className="px-5 py-4">Received</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition hover:bg-slate-50/80">
                <td className="px-5 py-4">
                  <button className="flex items-center gap-3 text-left" onClick={() => onSelect(lead.id)}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white">{initials(lead.name)}</span>
                    <span>
                      <span className="block font-semibold text-slate-900">{lead.name}</span>
                      <span className="mt-0.5 block text-sm text-slate-500">{lead.email}</span>
                    </span>
                  </button>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-slate-600">{budgetLabels[lead.budgetRange]}</td>
                <td className="px-5 py-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
                <td className="px-5 py-4"><StatusBadge status={lead.status} /></td>
                <td className="px-5 py-4 text-right">
                  <select
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60"
                    aria-label={`Update status for ${lead.name}`}
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
                  >
                    {statuses.map((status) => <option key={status} value={status}>{status[0]?.toUpperCase()}{status.slice(1)}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 lg:hidden">
        {leads.map((lead) => (
          <article key={lead.id} className="p-5">
            <button className="flex w-full items-start gap-3 text-left" onClick={() => onSelect(lead.id)}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white">{initials(lead.name)}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-slate-900">{lead.name}</span>
                <span className="mt-0.5 block truncate text-sm text-slate-500">{lead.email}</span>
              </span>
              <StatusBadge status={lead.status} />
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-600">{budgetLabels[lead.budgetRange]}</span>
              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                aria-label={`Update status for ${lead.name}`}
                value={lead.status}
                disabled={updatingId === lead.id}
                onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
              >
                {statuses.map((status) => <option key={status} value={status}>{status[0]?.toUpperCase()}{status.slice(1)}</option>)}
              </select>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">{total} lead{total === 1 ? '' : 's'} total</p>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="px-2 text-sm font-medium text-slate-500">{page} / {totalPages}</span>
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
