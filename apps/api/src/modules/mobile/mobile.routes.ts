import { Router } from 'express';
import { mobileController } from './mobile.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';

const router = Router();

// Public Parent Authentication Endpoints
router.post('/parent/request-otp', (req, res) => mobileController.requestParentOtp(req, res));
router.post('/parent/verify-otp', (req, res) => mobileController.verifyParentOtp(req, res));

// Protected Mobile Endpoints (Parent & Teacher)
router.use(authenticateJWT);

// Parent Features
router.get('/parent/children', (req, res) => mobileController.getChildren(req, res));
router.get('/parent/child/:id/attendance', (req, res) => mobileController.getChildAttendance(req, res));
router.get('/parent/child/:id/hifz', (req, res) => mobileController.getChildHifz(req, res));
router.get('/parent/child/:id/invoices', (req, res) => mobileController.getChildInvoices(req, res));
router.get('/parent/child/:id/results', (req, res) => mobileController.getChildResults(req, res));

// Teacher Features
router.get('/teacher/schedule', (req, res) => mobileController.getTeacherSchedule(req, res));

export const mobileRoutes = router;
