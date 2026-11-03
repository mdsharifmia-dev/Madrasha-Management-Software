import * as jose from 'jose';
import * as OTPAuth from 'otpauth';
import crypto from 'crypto';
import { env } from '../config/env.js';

export interface TokenPayload {
  userId: string;
  phoneOrEmail: string;
  role: string;
  tenantId?: string;       // Schema name: "m_001" or undefined for super-admin
  permissions?: Record<string, any>;
}

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

/**
 * Signs a short-lived Access Token (15 minutes by default)
 */
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_ACCESS_EXPIRES_IN)
    .sign(secretKey);
}

/**
 * Generates an opaque cryptographically random Refresh Token (7 days)
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

/**
 * Verifies and decodes a JWT access token
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Signs an arbitrary JWT payload with custom expiry (e.g. for Gatepass QR, verification links)
 */
export async function generateJWT(payload: Record<string, any>, expiresIn: string = '7d'): Promise<string> {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verifies an arbitrary JWT token
 */
export async function verifyJWT(token: string): Promise<Record<string, any> | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload as Record<string, any>;
  } catch (error) {
    return null;
  }
}

// ==============================================================================
// Two-Factor Authentication (TOTP - Google Authenticator / Microsoft Authenticator)
// ==============================================================================

/**
 * Generates a new TOTP secret for a user
 */
export function generateTotpSecret(accountName: string) {
  const totp = new OTPAuth.TOTP({
    issuer: env.TOTP_APP_NAME,
    label: accountName,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });

  return {
    secret: totp.secret.base32,
    uri: totp.toString(),
  };
}

/**
 * Validates a 6-digit TOTP token against user's secret
 */
export function verifyTotpToken(secretBase32: string, token: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: env.TOTP_APP_NAME,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secretBase32),
    });

    const delta = totp.validate({ token, window: 1 });
    return delta !== null;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
}
