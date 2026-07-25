import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, '..');
const serverDirectory = path.join(rootDirectory, 'server');
const clientDirectory = path.join(rootDirectory, 'client');
const serverEnvPath = path.join(serverDirectory, '.env');
const clientEnvPath = path.join(clientDirectory, '.env');

mkdirSync(serverDirectory, { recursive: true });
mkdirSync(clientDirectory, { recursive: true });

if (!existsSync(serverEnvPath)) {
  const jwtSecret = randomBytes(48).toString('hex');
  const serverEnv = `PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/leaddesk
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=${jwtSecret}
ADMIN_EMAIL=admin@leaddesk.dev
ADMIN_PASSWORD=ChangeMe!123
`;
  writeFileSync(serverEnvPath, serverEnv, 'utf8');
  console.log('Created server/.env with a generated JWT secret.');
} else {
  console.log('server/.env already exists; left it unchanged.');
}

if (!existsSync(clientEnvPath)) {
  writeFileSync(clientEnvPath, 'VITE_API_URL=http://localhost:4000\n', 'utf8');
  console.log('Created client/.env.');
} else {
  console.log('client/.env already exists; left it unchanged.');
}

console.log('\nNext commands:');
console.log('  docker compose up -d postgres');
console.log('  npm run db:migrate --workspace server');
console.log('  npm run db:seed --workspace server');
console.log('  npm run db:seed-demo --workspace server');
console.log('  npm run dev');
