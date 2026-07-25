import { describe, expect, it } from 'vitest';
import { loginSchema } from '../src/schemas/auth.schema.js';

describe('loginSchema', () => {
  it('normalizes the admin email', () => {
    const result = loginSchema.parse({ email: ' ADMIN@LEADDESK.DEV ', password: 'password' });
    expect(result.email).toBe('admin@leaddesk.dev');
  });

  it('requires a valid email and non-empty password', () => {
    expect(loginSchema.safeParse({ email: 'admin', password: '' }).success).toBe(false);
  });
});
