import type { PoolClient } from 'pg';
import { pool } from '../config/db.js';
import type { LeadStatus } from '../schemas/lead.schema.js';
import { AppError } from '../middleware/error.js';

type CreateLeadInput = {
  name: string;
  email: string;
  budgetRange: string;
  message: string;
};

type ListLeadInput = {
  search: string;
  status: LeadStatus | 'all';
  page: number;
  limit: number;
};

export async function createLead(input: CreateLeadInput) {
  const result = await pool.query(
    `INSERT INTO leads (name, email, budget_range, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, budget_range AS "budgetRange", status, created_at AS "createdAt"`,
    [input.name, input.email, input.budgetRange, input.message]
  );

  return result.rows[0];
}

export async function listLeads(input: ListLeadInput) {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (input.search) {
    values.push(`%${input.search}%`);
    const index = values.length;
    conditions.push(`(name ILIKE $${index} OR email ILIKE $${index} OR message ILIKE $${index})`);
  }

  if (input.status !== 'all') {
    values.push(input.status);
    conditions.push(`status = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM leads ${where}`, values);

  values.push(input.limit);
  const limitIndex = values.length;
  values.push((input.page - 1) * input.limit);
  const offsetIndex = values.length;

  const result = await pool.query(
    `SELECT id, name, email, budget_range AS "budgetRange", message, status,
            source, created_at AS "createdAt", updated_at AS "updatedAt"
     FROM leads
     ${where}
     ORDER BY created_at DESC
     LIMIT $${limitIndex} OFFSET $${offsetIndex}`,
    values
  );

  const total = countResult.rows[0]?.total ?? 0;

  return {
    items: result.rows,
    pagination: {
      page: input.page,
      limit: input.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / input.limit))
    }
  };
}

export async function getLeadDetails(id: string) {
  const [leadResult, activityResult] = await Promise.all([
    pool.query(
      `SELECT id, name, email, budget_range AS "budgetRange", message, status,
              source, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM leads WHERE id = $1`,
      [id]
    ),
    pool.query(
      `SELECT id, from_status AS "fromStatus", to_status AS "toStatus",
              actor_email AS "actorEmail", created_at AS "createdAt"
       FROM lead_activity
       WHERE lead_id = $1
       ORDER BY created_at DESC`,
      [id]
    )
  ]);

  if (!leadResult.rows[0]) {
    throw new AppError(404, 'LEAD_NOT_FOUND', 'Lead not found');
  }

  return {
    lead: leadResult.rows[0],
    activity: activityResult.rows
  };
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  actorEmail: string
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const current = await client.query('SELECT status FROM leads WHERE id = $1 FOR UPDATE', [id]);

    if (!current.rows[0]) {
      throw new AppError(404, 'LEAD_NOT_FOUND', 'Lead not found');
    }

    const fromStatus = current.rows[0].status as LeadStatus;

    if (fromStatus === status) {
      await client.query('COMMIT');
      return getLeadById(client, id);
    }

    const updated = await client.query(
      `UPDATE leads
       SET status = $1
       WHERE id = $2
       RETURNING id, name, email, budget_range AS "budgetRange", message, status,
                 source, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [status, id]
    );

    await client.query(
      `INSERT INTO lead_activity (lead_id, from_status, to_status, actor_email)
       VALUES ($1, $2, $3, $4)`,
      [id, fromStatus, status, actorEmail]
    );

    await client.query('COMMIT');
    return updated.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function getLeadById(client: PoolClient, id: string) {
  const result = await client.query(
    `SELECT id, name, email, budget_range AS "budgetRange", message, status,
            source, created_at AS "createdAt", updated_at AS "updatedAt"
     FROM leads WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function getLeadStats() {
  const result = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE status = 'new')::int AS new,
       COUNT(*) FILTER (WHERE status = 'contacted')::int AS contacted,
       COUNT(*) FILTER (WHERE status = 'closed')::int AS closed,
       COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS "lastSevenDays"
     FROM leads`
  );

  return result.rows[0];
}
