import { Router } from 'express';
import { superAdminController } from './superAdmin.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';

// 1. Public Router for new registrations
export const publicMadrasaRouter = Router();
publicMadrasaRouter.post('/apply', (req, res) => superAdminController.submitApplication(req, res));

// 2. Super Admin Protected Router
export const superAdminRouter = Router();

// Protect all Super Admin endpoints
superAdminRouter.use(authenticateJWT);

// Access Gatekeeper: Verify role is SUPER_ADMIN or OWNER
superAdminRouter.use((req, res, next) => {
  if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'OWNER') {
    res.status(403).json({
      success: false,
      error: {
        code: 'SUPER_ADMIN_REQUIRED',
        details: 'এই প্যানেল শুধুমাত্র সুপার অ্যাডমিনের জন্য সংরক্ষিত।',
      },
    });
    return;
  }
  next();
});

// Applications Management
superAdminRouter.get('/applications', (req, res) => superAdminController.getPendingApplications(req, res));
superAdminRouter.post('/applications/:id/approve', (req, res) => superAdminController.approveApplication(req, res));
superAdminRouter.post('/applications/:id/reject', (req, res) => superAdminController.rejectApplication(req, res));

// Madrasa Directory with Advanced Filters (Location, Students > 1000, Type, Plan)
superAdminRouter.get('/madrasas', (req, res) => superAdminController.getMadrasas(req, res));
superAdminRouter.patch('/madrasas/:id/status', (req, res) => superAdminController.updateStatus(req, res));

// Live System Infrastructure Monitoring & Incident Logs
superAdminRouter.get('/system/health', (req, res) => superAdminController.getSystemHealth(req, res));
superAdminRouter.get('/system/logs', (req, res) => superAdminController.getAutomationLogs(req, res));

// Client Support Tickets & Resolution Inbox
superAdminRouter.get('/support/tickets', (req, res) => superAdminController.getSupportTickets(req, res));
superAdminRouter.post('/support/tickets/:id/reply', (req, res) => superAdminController.replySupportTicket(req, res));
