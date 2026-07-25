import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createLeadSchema } from '../schemas/lead.schema.js';
import { createLead } from '../services/lead.service.js';

export const leadsRouter = Router();

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many submissions from this network. Please try again later.'
    }
  }
});

leadsRouter.post('/', submissionLimiter, async (req, res, next) => {
  try {
    const input = createLeadSchema.parse(req.body);
    const lead = await createLead(input);
    return res.status(201).json({
      message: 'Thanks — your project brief is in our queue.',
      lead: { id: lead.id, status: lead.status, createdAt: lead.createdAt }
    });
  } catch (error) {
    return next(error);
  }
});
