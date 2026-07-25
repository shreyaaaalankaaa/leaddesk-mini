import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';

async function seed() {
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await pool.query(
    `INSERT INTO admins (email, password_hash)
     VALUES (LOWER($1), $2)
     ON CONFLICT (email)
     DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [env.ADMIN_EMAIL, passwordHash]
  );

  console.log(`Admin account ready: ${env.ADMIN_EMAIL}`);
}

seed()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
