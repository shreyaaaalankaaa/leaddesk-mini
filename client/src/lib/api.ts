import type { Lead, LeadListResponse, LeadStats, LeadStatus } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

type ApiErrorShape = {
  error?: {
    code?: string;
    message?: string;
    details?: Record<string, string[]>;
    requestId?: string;
  };
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, string[]>,
    public requestId?: string
  ) {
    super(message);
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorShape;
    throw new ApiError(
      body.error?.message ?? 'Request failed',
      response.status,
      body.error?.code,
      body.error?.details,
      body.error?.requestId
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  submitLead: (input: {
    name: string;
    email: string;
    budgetRange: string;
    message: string;
  }) => apiFetch<{ message: string }>('/api/leads', { method: 'POST', body: JSON.stringify(input) }),

  login: (input: { email: string; password: string }) =>
    apiFetch<{ admin: { id: string; email: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(input)
    }),

  logout: () => apiFetch<void>('/api/auth/logout', { method: 'POST' }),

  me: () => apiFetch<{ admin: { id: string; email: string } }>('/api/auth/me'),

  listLeads: (params: { search: string; status: string; page: number; limit?: number }) => {
    const searchParams = new URLSearchParams({
      search: params.search,
      status: params.status,
      page: String(params.page),
      limit: String(params.limit ?? 10)
    });
    return apiFetch<LeadListResponse>(`/api/admin/leads?${searchParams.toString()}`);
  },

  leadDetails: (id: string) =>
    apiFetch<{ lead: Lead; activity: Array<{
      id: string;
      fromStatus: LeadStatus | null;
      toStatus: LeadStatus;
      actorEmail: string;
      createdAt: string;
    }> }>(`/api/admin/leads/${id}`),

  updateStatus: (id: string, status: LeadStatus) =>
    apiFetch<{ lead: Lead }>(`/api/admin/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  stats: () => apiFetch<{ stats: LeadStats }>('/api/admin/stats')
};
