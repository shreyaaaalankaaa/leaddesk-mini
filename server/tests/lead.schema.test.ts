import { describe, expect, it } from 'vitest';
import { createLeadSchema, listLeadQuerySchema } from '../src/schemas/lead.schema.js';

describe('createLeadSchema', () => {
  it('accepts and normalizes a valid lead', () => {
    const result = createLeadSchema.parse({
      name: '  Maya Chen  ',
      email: 'MAYA@EXAMPLE.COM ',
      budgetRange: '5000-10000',
      message: 'We need a responsive client portal before our September launch.'
    });

    expect(result.name).toBe('Maya Chen');
    expect(result.email).toBe('maya@example.com');
  });

  it('rejects malformed email addresses', () => {
    const result = createLeadSchema.safeParse({
      name: 'Maya Chen',
      email: 'not-an-email',
      budgetRange: '5000-10000',
      message: 'We need a responsive client portal before our September launch.'
    });

    expect(result.success).toBe(false);
  });

  it('rejects messages that are too vague', () => {
    const result = createLeadSchema.safeParse({
      name: 'Maya Chen',
      email: 'maya@example.com',
      budgetRange: '5000-10000',
      message: 'Call me.'
    });

    expect(result.success).toBe(false);
  });
});

describe('listLeadQuerySchema', () => {
  it('coerces query parameters and protects pagination limits', () => {
    const result = listLeadQuerySchema.parse({ page: '2', limit: '20', status: 'contacted' });
    expect(result).toMatchObject({ page: 2, limit: 20, status: 'contacted' });
  });

  it('rejects oversized pages', () => {
    expect(listLeadQuerySchema.safeParse({ limit: '1000' }).success).toBe(false);
  });
});
