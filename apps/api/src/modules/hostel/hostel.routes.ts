import { Router } from 'express';
import { hostelController } from './hostel.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';

export const hostelRoutes = Router();

// Secure all hostel routes with JWT
hostelRoutes.use(authenticateJWT);

// Rooms & Bed Assignments
hostelRoutes.get('/rooms', (req, res) => hostelController.getRooms(req, res));
hostelRoutes.post('/rooms', (req, res) => hostelController.createRoom(req, res));
hostelRoutes.post('/assign', (req, res) => hostelController.assignRoom(req, res));
hostelRoutes.get('/assignments', (req, res) => hostelController.getAssignments(req, res));

// Boarding Meals (Lillah & General Fund Tracking)
hostelRoutes.post('/meals', (req, res) => hostelController.recordMeal(req, res));
hostelRoutes.get('/meals/summary', (req, res) => hostelController.getMealSummary(req, res));

// Gatepass System (Requests, Warden Approval, QR Scanner)
hostelRoutes.post('/gatepasses/request', (req, res) => hostelController.requestGatepass(req, res));
hostelRoutes.get('/gatepasses', (req, res) => hostelController.getGatepasses(req, res));
hostelRoutes.post('/gatepasses/:id/approve', (req, res) => hostelController.approveGatepass(req, res));
hostelRoutes.post('/gatepasses/:id/reject', (req, res) => hostelController.rejectGatepass(req, res));
hostelRoutes.post('/gatepasses/scan', (req, res) => hostelController.scanGatepass(req, res));
