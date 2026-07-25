export type LeadStatus = 'new' | 'contacted' | 'closed';

export type Lead = {
  id: string;
  name: string;
  email: string;
  budgetRange: 'under-2500' | '2500-5000' | '5000-10000' | '10000-plus';
  message: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadActivity = {
  id: string;
  fromStatus: LeadStatus | null;
  toStatus: LeadStatus;
  actorEmail: string;
  createdAt: string;
};

export type LeadListResponse = {
  items: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type LeadStats = {
  total: number;
  new: number;
  contacted: number;
  closed: number;
  lastSevenDays: number;
};

export type Admin = {
  id: string;
  email: string;
};
