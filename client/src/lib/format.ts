import type { LeadStatus } from '../types';

export const budgetLabels: Record<string, string> = {
  'under-2500': 'Under ₹50,000',
  '2500-5000': '₹50,000–₹2,00,000',
  '5000-10000': '₹2,00,000–₹5,00,000',
  '10000-plus': '₹5,00,000+',
};

export const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed'
};

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
