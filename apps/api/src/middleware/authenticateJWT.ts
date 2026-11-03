import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/token.js';

// Extend Express Request object to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      tenantId?: string;
    }
  }
}

/**
 * Middleware that strictly verifies JWT Access Token from Authorization Header
 */
export async function authenticateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        details: 'লগইন টোকেন অনুপস্থিত। দয়া করে পুনরায় লগইন করুন।',
      },
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        details: 'টোকেন পাওয়া যায়নি।',
      },
    });
    return;
  }

  const payload = await verifyAccessToken(token);
  if (!payload) {
    res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_EXPIRED_OR_INVALID',
        details: 'লগইন সেশনের মেয়াদ শেষ হয়েছে বা টোকেনটি অবৈধ।',
      },
    });
    return;
  }

  // Attach user payload to request
  req.user = payload;
  if (payload.tenantId) {
    req.tenantId = payload.tenantId;
  }

  next();
}
