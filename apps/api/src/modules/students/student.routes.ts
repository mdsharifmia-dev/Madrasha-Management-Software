import { Router } from 'express';
import { studentController } from './student.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { tenantResolver } from '../../middleware/tenantResolver.js';
import { requirePermission } from '../../middleware/requirePermission.js';

const router = Router();

// Apply Authentication and Tenant Resolution to all Student routes
router.use(authenticateJWT);
router.use(tenantResolver);

// Academic Structure (Departments, Classes, Sections)
router.get('/academic-structure', (req, res) => studentController.getAcademicStructure(req, res));

// Student Directory & Search (Read permission)
router.get('/', requirePermission('students', 'read'), (req, res) => studentController.getStudents(req, res));

// Student Admission (Create permission)
router.post('/admit', requirePermission('students', 'create'), (req, res) => studentController.admitStudent(req, res));

// QR ID Card Data (Read permission)
router.get('/:id/id-card', requirePermission('students', 'read'), (req, res) =>
  studentController.generateIdCard(req, res)
);

// Batch Promotion (Edit permission)
router.post('/promote', requirePermission('students', 'edit'), (req, res) =>
  studentController.promoteStudents(req, res)
);

export const studentRoutes = router;
