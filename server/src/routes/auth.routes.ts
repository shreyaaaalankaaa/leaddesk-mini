import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';
import { signSession } from '../lib/jwt.js';
import { requireAdmin } from '../middleware/auth.js';
import { AppError } from '../middleware/error.js';
import { loginSchema } from '../schemas/auth.schema.js';

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many sign-in attempts. Please wait and try again.'
    }
  }
});

authRouter.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const result = await pool.query(
      'SELECT id, email, password_hash AS "passwordHash" FROM admins WHERE email = LOWER($1)',
      [input.email]
    );
    const admin = result.rows[0];

    if (!admin || !(await bcrypt.compare(input.password, admin.passwordHash))) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is incorrect');
    }

    const token = signSession({ sub: admin.id, email: admin.email, role: 'admin' });
    res.cookie('leaddesk_session', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 8 * 60 * 60 * 1000,
      path: '/'
    });

    return res.json({ admin: { id: admin.id, email: admin.email } });
  } catch (error) {
    return next(error);
  }
});

authRouter.post('/logout', (_req, res) => {
  res.clearCookie('leaddesk_session', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });
  return res.status(204).send();
});

authRouter.get('/me', requireAdmin, (req, res) => {
  return res.json({ admin: req.admin });
});
