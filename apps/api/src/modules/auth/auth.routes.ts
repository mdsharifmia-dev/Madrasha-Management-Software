import { Router } from 'express';
import { authController } from './auth.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { tenantResolver } from '../../middleware/tenantResolver.js';

const router = Router();

// Public Authentication Endpoints
router.post('/super/login', (req, res) => authController.loginSuperAdmin(req, res));
router.post('/madrasa/login', tenantResolver, (req, res) => authController.loginMadrasaUser(req, res));
router.post('/verify-2fa', (req, res) => authController.verifyTwoFactor(req, res));
router.post('/refresh', (req, res) => authController.refreshSession(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

// Protected Identity Endpoint
router.get('/me', authenticateJWT, (req, res) => authController.getCurrentUser(req, res));

export const authRoutes = router;
