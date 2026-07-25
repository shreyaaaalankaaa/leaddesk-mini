import { z } from 'zod';

export const leadStatusSchema = z.enum(['new', 'contacted', 'closed']);
export type LeadStatus = z.infer<typeof leadStatusSchema>;

export const budgetRangeSchema = z.enum([
  'under-2500',
  '2500-5000',
  '5000-10000',
  '10000-plus'
]);

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters')
    .max(80, 'Name must be 80 characters or fewer'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Enter a valid email address')
    .max(254),
  budgetRange: budgetRangeSchema,
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more so we can prepare a useful response')
    .max(1000, 'Message must be 1,000 characters or fewer')
});

export const listLeadQuerySchema = z.object({
  search: z.string().trim().max(100).default(''),
  status: z.union([leadStatusSchema, z.literal('all')]).default('all'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(5).max(50).default(10)
});

export const updateLeadStatusSchema = z.object({
  status: leadStatusSchema
});

export const leadIdSchema = z.string().uuid('Invalid lead id');
