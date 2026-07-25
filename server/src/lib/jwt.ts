import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type SessionPayload = {
  sub: string;
  email: string;
  role: 'admin';
};

export function signSession(payload: SessionPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '8h',
    issuer: 'leaddesk-api',
    audience: 'leaddesk-admin'
  });
}

export function verifySession(token: string): SessionPayload {
  return jwt.verify(token, env.JWT_SECRET, {
    issuer: 'leaddesk-api',
    audience: 'leaddesk-admin'
  }) as SessionPayload;
}
