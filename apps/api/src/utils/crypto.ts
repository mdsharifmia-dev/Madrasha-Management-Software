import argon2 from 'argon2';
import crypto from 'crypto';
import { env } from '../config/env.js';

// ==============================================================================
// 1. Password Hashing with Argon2id (Industry Gold Standard)
// ==============================================================================

/**
 * Hashes a plaintext password using Argon2id algorithm
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,       // 3 iterations
    parallelism: 4,    // 4 threads
  });
}

/**
 * Verifies a plaintext password against an Argon2id hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

// ==============================================================================
// 2. Field-Level Encryption using AES-256-GCM (Zero-Trust Data Protection)
// ==============================================================================

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recommended for GCM

/**
 * Encrypts sensitive personal data (NID, Phone, Birth Certificate)
 * Returns format: iv:authTag:ciphertext (hex encoded)
 */
export function encryptField(plainText: string): string {
  if (!plainText) return plainText;

  const key = Buffer.from(env.FIELD_ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts data encrypted by encryptField
 */
export function decryptField(encryptedText: string): string {
  if (!encryptedText || !encryptedText.includes(':')) return encryptedText;

  try {
    const [ivHex, authTagHex, cipherHex] = encryptedText.split(':');
    if (!ivHex || !authTagHex || !cipherHex) return encryptedText;

    const key = Buffer.from(env.FIELD_ENCRYPTION_KEY, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(cipherHex, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Field decryption failed:', error);
    return '[ENCRYPTED_DATA]';
  }
}
