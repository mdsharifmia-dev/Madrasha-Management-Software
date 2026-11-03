import { Router } from 'express';
import { communicationController } from './communication.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';

export const communicationRoutes = Router();

communicationRoutes.use(authenticateJWT);

// Notice Board
communicationRoutes.get('/notices', (req, res) => communicationController.getNotices(req, res));
communicationRoutes.post('/notices', (req, res) => communicationController.createNotice(req, res));
communicationRoutes.post('/notices/:id/publish', (req, res) => communicationController.publishNotice(req, res));

// SMS Dispatcher & Cost Preview
communicationRoutes.post('/sms/preview', (req, res) => communicationController.previewSms(req, res));
communicationRoutes.post('/sms/send', (req, res) => communicationController.sendSms(req, res));
communicationRoutes.get('/sms/logs', (req, res) => communicationController.getSmsLogs(req, res));
