import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import {
  leadIdSchema,
  listLeadQuerySchema,
  updateLeadStatusSchema
} from '../schemas/lead.schema.js';
import {
  getLeadDetails,
  getLeadStats,
  listLeads,
  updateLeadStatus
} from '../services/lead.service.js';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get('/stats', async (_req, res, next) => {
  try {
    return res.json({ stats: await getLeadStats() });
  } catch (error) {
    return next(error);
  }
});

adminRouter.get('/leads', async (req, res, next) => {
  try {
    const query = listLeadQuerySchema.parse(req.query);
    return res.json(await listLeads(query));
  } catch (error) {
    return next(error);
  }
});

adminRouter.get('/leads/:id', async (req, res, next) => {
  try {
    const id = leadIdSchema.parse(req.params.id);
    return res.json(await getLeadDetails(id));
  } catch (error) {
    return next(error);
  }
});

adminRouter.patch('/leads/:id/status', async (req, res, next) => {
  try {
    const id = leadIdSchema.parse(req.params.id);
    const input = updateLeadStatusSchema.parse(req.body);
    const lead = await updateLeadStatus(id, input.status, req.admin!.email);
    return res.json({ lead });
  } catch (error) {
    return next(error);
  }
});
