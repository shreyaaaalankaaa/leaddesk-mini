import { pool } from '../config/db.js';

type DemoLead = {
  name: string;
  email: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
};

const leads: DemoLead[] = [
  {
    name: 'Maya Chen',
    email: 'maya.chen@example.com',
    budget: '5000-10000',
    message: 'We are preparing a September product launch and need to simplify our mobile onboarding before paid traffic starts.',
    status: 'new'
  },
  {
    name: 'Jordan Ellis',
    email: 'jordan.ellis@example.com',
    budget: '10000-plus',
    message: 'Our team has a working marketplace MVP, but the admin workflow is still manual. We need a reliable operations dashboard.',
    status: 'contacted'
  },
  {
    name: 'Ava Patel',
    email: 'ava.patel@example.com',
    budget: '2500-5000',
    message: 'The current landing page performs poorly on mobile. We want a focused redesign and a faster lead-capture flow.',
    status: 'closed'
  },
  {
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    budget: 'under-2500',
    message: 'We need a small internal tool that replaces a spreadsheet used by our support team for customer handoffs.',
    status: 'new'
  },
  {
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    budget: '5000-10000',
    message: 'Our API and frontend were built separately and error handling is inconsistent. We need help stabilizing the release flow.',
    status: 'contacted'
  }
];

async function seedDemo() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const lead of leads) {
      const existing = await client.query('SELECT id FROM leads WHERE email = $1 LIMIT 1', [lead.email]);
      if (existing.rows[0]) continue;

      const inserted = await client.query(
        `INSERT INTO leads (name, email, budget_range, message, status, source)
         VALUES ($1, $2, $3, $4, $5, 'demo-seed')
         RETURNING id`,
        [lead.name, lead.email, lead.budget, lead.message, lead.status]
      );

      if (lead.status !== 'new') {
        await client.query(
          `INSERT INTO lead_activity (lead_id, from_status, to_status, actor_email)
           VALUES ($1, 'new', $2, 'demo@leaddesk.dev')`,
          [inserted.rows[0].id, lead.status]
        );
      }
    }
    await client.query('COMMIT');
    console.log('Optional demo leads are ready.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

seedDemo()
  .catch((error) => {
    console.error('Demo seed failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
