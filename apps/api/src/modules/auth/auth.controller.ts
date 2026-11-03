import { Request, Response } from 'express';
import { z } from 'zod';
import { authService } from './auth.service.js';

// Input Schemas
const superAdminLoginSchema = z.object({
  email: z.string().email('সঠিক ইমেইল ঠিকানা প্রদান করুন'),
  password: z.string().min(6, 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে'),
});

const madrasaLoginSchema = z.object({
  phone: z.string().min(10, 'সঠিক মোবাইল নম্বর প্রদান করুন'),
  password: z.string().min(6, 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে'),
});

const verify2FASchema = z.object({
  userId: z.string().min(1, 'ইউজার আইডি আবশ্যক'),
  totpCode: z.string().length(6, 'ওটিপি কোড ৬ সংখ্যার হতে হবে'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'রিফ্রেশ টোকেন আবশ্যক'),
});

export class AuthController {
  /**
   * Super Admin Login Endpoint
   * POST /api/auth/super/login
   */
  async loginSuperAdmin(req: Request, res: Response) {
    try {
      const { email, password } = superAdminLoginSchema.parse(req.body);
      const result = await authService.loginSuperAdmin(email, password);

      res.json({
        success: true,
        message: 'সুপার অ্যাডমিন লগইন সফল হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          details: error.message || 'লগইন প্রক্রিয়া ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * Madrasa Staff/Teacher Login Endpoint
   * POST /api/auth/madrasa/login
   */
  async loginMadrasaUser(req: Request, res: Response) {
    try {
      const { phone, password } = madrasaLoginSchema.parse(req.body);
      const tenantId = (req as any).tenantId;
      const result = await authService.loginMadrasaUser(phone, password, tenantId);

      res.json({
        success: true,
        message: 'মাদ্রাসা পোর্টালে লগইন সফল হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          details: error.message || 'লগইন প্রক্রিয়া ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * Verify 2FA OTP Endpoint
   * POST /api/auth/verify-2fa
   */
  async verifyTwoFactor(req: Request, res: Response) {
    try {
      const { userId, totpCode } = verify2FASchema.parse(req.body);
      const result = await authService.verifyTwoFactor(userId, totpCode);

      res.json({
        success: true,
        message: '2FA যাচাই সফল হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          code: '2FA_VERIFICATION_FAILED',
          details: error.message || '2FA যাচাই ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * Refresh Token Endpoint
   * POST /api/auth/refresh
   */
  async refreshSession(req: Request, res: Response) {
    try {
      const { refreshToken } = refreshTokenSchema.parse(req.body);
      const result = await authService.refreshSession(refreshToken);

      res.json({
        success: true,
        message: 'সেশন সফলভাবে নবায়ন করা হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: {
          code: 'SESSION_REFRESH_FAILED',
          details: error.message,
        },
      });
    }
  }

  /**
   * Logout Endpoint
   * POST /api/auth/logout
   */
  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (refreshToken) {
      authService.logout(refreshToken);
    }
    res.json({
      success: true,
      message: 'লগআউট সফল হয়েছে।',
    });
  }

  /**
   * Get Current Authenticated User Profile
   * GET /api/auth/me
   */
  async getCurrentUser(req: Request, res: Response) {
    res.json({
      success: true,
      data: {
        user: req.user,
        tenantId: req.tenantId,
      },
    });
  }
}

export const authController = new AuthController();
