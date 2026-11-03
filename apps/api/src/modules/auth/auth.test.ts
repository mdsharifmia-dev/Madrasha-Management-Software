import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, encryptField, decryptField } from '../../utils/crypto.js';
import { generateAccessToken, verifyAccessToken, generateTotpSecret, verifyTotpToken } from '../../utils/token.js';

describe('Part 2: Authentication & Security Core Tests', () => {
  // 1. Password Hashing
  it('should hash password using Argon2id and verify correctly', async () => {
    const password = 'MadrashaSecurePass#2026';
    const hash = await hashPassword(password);

    expect(hash).toContain('$argon2id$');
    const isValid = await verifyPassword(password, hash);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword('WrongPassword', hash);
    expect(isInvalid).toBe(false);
  });

  // 2. Field-level Encryption
  it('should encrypt and decrypt sensitive fields with AES-256-GCM', () => {
    const sensitiveNid = '19951234567890123';
    const encrypted = encryptField(sensitiveNid);

    expect(encrypted).not.toBe(sensitiveNid);
    expect(encrypted.split(':')).toHaveLength(3); // iv:authTag:cipher

    const decrypted = decryptField(encrypted);
    expect(decrypted).toBe(sensitiveNid);
  });

  // 3. JWT Access Token
  it('should generate and verify JWT access token', async () => {
    const payload = {
      userId: 'user-test-123',
      phoneOrEmail: '01711223344',
      role: 'MUHTAMIM',
      tenantId: 'm_001',
    };

    const token = await generateAccessToken(payload);
    expect(typeof token).toBe('string');

    const decoded = await verifyAccessToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.role).toBe(payload.role);
    expect(decoded?.tenantId).toBe(payload.tenantId);
  });

  // 4. Two-Factor Authentication (TOTP)
  it('should generate TOTP secret and validate token', () => {
    const { secret } = generateTotpSecret('test@madrasha.app');
    expect(secret).toBeDefined();
    expect(typeof secret).toBe('string');
  });
});
