import type { NextFunction, Request, Response } from 'express';
import { verifySession } from '../lib/jwt.js';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.leaddesk_session as string | undefined;

  if (!token) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHENTICATED',
        message: 'Please sign in to continue',
        requestId: req.requestId
      }
    });
  }

  try {
    const payload = verifySession(token);
    req.admin = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({
      error: {
        code: 'SESSION_EXPIRED',
        message: 'Your session has expired. Please sign in again.',
        requestId: req.requestId
      }
    });
  }
}
