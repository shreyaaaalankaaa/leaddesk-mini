import clsx from 'clsx';
import type { LeadStatus } from '../types';
import { statusLabels } from '../lib/format';

const classes: Record<LeadStatus, string> = {
  new: 'bg-indigo-50 text-indigo-700 ring-indigo-600/15',
  contacted: 'bg-amber-50 text-amber-700 ring-amber-600/15',
  closed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15'
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', classes[status])}>
      {statusLabels[status]}
    </span>
  );
}
