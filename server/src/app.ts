import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type RequestHandler } from 'express';
import helmet from 'helmet';
import { createRequire } from 'node:module';
import { env } from './config/env.js';
import { adminRouter } from './routes/admin.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { leadsRouter } from './routes/leads.routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import { requestId } from './middleware/request-id.js';

// pino-http is published as CommonJS. createRequire avoids the NodeNext
// default-import type mismatch while keeping the server itself as ESM.
const require = createRequire(import.meta.url);
const pinoHttp = require('pino-http') as () => RequestHandler;

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(requestId);
app.use(pinoHttp());
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Request-Id']
  })
);
app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  return res.json({ status: 'ok', service: 'leaddesk-api', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/admin', adminRouter);

app.use(notFound);
app.use(errorHandler);
