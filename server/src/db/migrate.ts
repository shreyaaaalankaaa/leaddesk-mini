import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../config/db.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const migrationPath = path.join(currentDir, 'migrations', '001_init.sql');

async function migrate() {
  const sql = await readFile(migrationPath, 'utf8');
  await pool.query(sql);
  console.log('Database migration completed.');
}

migrate()
  .catch((error) => {
    console.error('Migration failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
