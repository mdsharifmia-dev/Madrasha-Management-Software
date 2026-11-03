import { Router } from 'express';
import { academicController } from './academic.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { tenantResolver } from '../../middleware/tenantResolver.js';
import { requirePermission } from '../../middleware/requirePermission.js';

const router = Router();

// Biometric IoT Machine Push Endpoint (Authenticates via device API key)
router.post('/biometric/push', (req, res) => academicController.processBiometricPunch(req, res));

// Protected Academic Routes
router.use(authenticateJWT);
router.use(tenantResolver);

// Daily Hifz Tracker
router.post('/hifz/daily', requirePermission('hifz', 'create'), (req, res) =>
  academicController.recordHifzDaily(req, res)
);

// Attendance
router.post('/attendance/mark', requirePermission('attendance', 'create'), (req, res) =>
  academicController.markAttendance(req, res)
);

// Examination Management
router.post('/exams', requirePermission('exams', 'create'), (req, res) => academicController.createExam(req, res));
router.post('/exams/marks', requirePermission('exams', 'create'), (req, res) =>
  academicController.submitMarks(req, res)
);
router.post('/exams/:id/lock', requirePermission('exams', 'approve'), (req, res) =>
  academicController.lockResults(req, res)
);
router.post('/exams/:id/publish', requirePermission('exams', 'approve'), (req, res) =>
  academicController.publishResults(req, res)
);
router.get('/exams/:id/tabulation', requirePermission('exams', 'read'), (req, res) =>
  academicController.getTabulation(req, res)
);

// Offline Attendance Sync Engine
router.post('/attendance/offline-sync', (req, res) =>
  academicController.syncOfflineAttendance(req, res)
);

// Staff Attendance
router.post('/staff-attendance', (req, res) =>
  academicController.recordStaffAttendance(req, res)
);

// Befaq Central Board Export
router.post('/befaq/export', requirePermission('exams', 'export'), (req, res) =>
  academicController.exportBefaqData(req, res)
);

// Hifz Completion Certificate
router.get('/hifz/certificate/:studentId', requirePermission('hifz', 'read'), (req, res) =>
  academicController.getHifzCertificate(req, res)
);

export const academicRoutes = router;
