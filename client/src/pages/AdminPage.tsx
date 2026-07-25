import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, CircleDot, Inbox, LogOut, Search, SlidersHorizontal, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { LeadDrawer } from '../components/LeadDrawer';
import { LeadTable } from '../components/LeadTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { Logo } from '../components/Logo';
import { MetricCard } from '../components/MetricCard';
import { Toast, type ToastState } from '../components/Toast';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { api, ApiError } from '../lib/api';
import type { LeadListResponse, LeadStatus } from '../types';

export function AdminPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | LeadStatus>('all');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const debouncedSearch = useDebouncedValue(search);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => setPage(1), [debouncedSearch, status]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const auth = useQuery({ queryKey: ['auth'], queryFn: api.me, staleTime: 5 * 60 * 1000 });
  const stats = useQuery({ queryKey: ['stats'], queryFn: api.stats });
  const leads = useQuery({
    queryKey: ['leads', debouncedSearch, status, page],
    queryFn: () => api.listLeads({ search: debouncedSearch, status, page }),
    placeholderData: (previous) => previous
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: LeadStatus }) => api.updateStatus(id, nextStatus),
    onMutate: async ({ id, nextStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] });
      const snapshots = queryClient.getQueriesData<LeadListResponse>({ queryKey: ['leads'] });
      snapshots.forEach(([key, data]) => {
        if (!data) return;
        queryClient.setQueryData<LeadListResponse>(key, {
          ...data,
          items: data.items.map((lead) => lead.id === id ? { ...lead, status: nextStatus } : lead)
        });
      });
      return { snapshots };
    },
    onError: (error, _variables, context) => {
      context?.snapshots.forEach(([key, data]) => queryClient.setQueryData(key, data));
      setToast({ type: 'error', message: error instanceof ApiError ? error.message : 'Status update failed.' });
    },
    onSuccess: () => setToast({ type: 'success', message: 'Lead status updated and added to the activity history.' }),
    onSettled: async (_data, _error, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['leads'] }),
        queryClient.invalidateQueries({ queryKey: ['stats'] }),
        queryClient.invalidateQueries({ queryKey: ['lead', variables.id] })
      ]);
    }
  });

  const logout = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/admin/login');
    }
  });

  const statValues = stats.data?.stats ?? { total: 0, new: 0, contacted: 0, closed: 0, lastSevenDays: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Logo />
            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 md:inline">{auth.data?.admin.email}</span>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60" onClick={() => logout.mutate()} disabled={logout.isPending}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Lead operations</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Make the next action obvious.</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">A compact queue for qualification, follow-up, and handoff—not a CRM replica.</p>
          </div>
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
            <span className="font-bold">{statValues.lastSevenDays}</span> new lead{statValues.lastSevenDays === 1 ? '' : 's'} in the last 7 days
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Lead statistics">
          <MetricCard label="All leads" value={statValues.total} hint="Every captured project brief" icon={UsersRound} />
          <MetricCard label="New" value={statValues.new} hint="Waiting for first review" icon={CircleDot} />
          <MetricCard label="Contacted" value={statValues.contacted} hint="Conversation in progress" icon={Inbox} />
          <MetricCard label="Closed" value={statValues.closed} hint="Qualified loop completed" icon={CheckCircle2} />
        </section>

        <section className="mt-8" aria-labelledby="lead-queue-title">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Search name, email, or message…"
                aria-label="Search leads"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-slate-400" />
              <label className="sr-only" htmlFor="status-filter">Filter by status</label>
              <select
                id="status-filter"
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={status}
                onChange={(event) => setStatus(event.target.value as 'all' | LeadStatus)}
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <h2 id="lead-queue-title" className="sr-only">Lead queue</h2>
          <div className="mt-4">
            {leads.isLoading ? <LoadingSkeleton /> : leads.isError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                We could not load the lead queue. {leads.error instanceof ApiError && leads.error.requestId ? `Reference: ${leads.error.requestId}` : ''}
              </div>
            ) : (
              <LeadTable
                leads={leads.data?.items ?? []}
                page={leads.data?.pagination.page ?? 1}
                totalPages={leads.data?.pagination.totalPages ?? 1}
                total={leads.data?.pagination.total ?? 0}
                onPageChange={setPage}
                onStatusChange={(id, nextStatus) => updateStatus.mutate({ id, nextStatus })}
                onSelect={setSelectedLead}
                updatingId={updateStatus.isPending ? updateStatus.variables?.id ?? null : null}
                filtered={Boolean(debouncedSearch || status !== 'all')}
              />
            )}
          </div>
        </section>
      </main>

      <Footer compact />
      <LeadDrawer leadId={selectedLead} onClose={() => setSelectedLead(null)} />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
