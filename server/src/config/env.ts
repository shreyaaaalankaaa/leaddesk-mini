import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const serverDirectory = path.resolve(currentDirectory, '../..');
const repositoryDirectory = path.resolve(serverDirectory, '..');

// Support both repository-level and server-level environment files.
// server/.env takes precedence when both exist.
const rootEnvPath = path.join(repositoryDirectory, '.env');
const serverEnvPath = path.join(serverDirectory, '.env');

if (existsSync(rootEnvPath)) {
  loadEnv({ path: rootEnvPath });
}

if (existsSync(serverEnvPath)) {
  loadEnv({ path: serverEnvPath, override: true });
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must contain at least 32 characters'),
  ADMIN_EMAIL: z.string().email().default('admin@leaddesk.dev'),
  ADMIN_PASSWORD: z.string().min(10).default('ChangeMe!123')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  console.error(
    'Run "npm run setup" from the project root, then retry. ' +
      'The setup command creates server/.env and client/.env without committing secrets.'
  );
  throw new Error('Environment validation failed');
}

export const env = parsed.data;
