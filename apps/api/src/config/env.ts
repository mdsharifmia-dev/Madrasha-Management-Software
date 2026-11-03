import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file (current working directory and monorepo root)
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('4000'),

  // URLs
  API_BASE_URL: z.string().url().default('http://localhost:4000'),
  WEB_BASE_URL: z.string().url().default('http://localhost:5173'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:5173,http://localhost:4000'),

  // PostgreSQL
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DATABASE_MAX_CONNECTIONS: z.string().transform((val) => parseInt(val, 10)).default('20'),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform((val) => parseInt(val, 10)).default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().optional(),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Security
  FIELD_ENCRYPTION_KEY: z.string().length(64, 'FIELD_ENCRYPTION_KEY must be a 32-byte hex string (64 characters)'),
  TOTP_APP_NAME: z.string().default('Madrasha SaaS'),

  // SMS Gateway (Optional in development, required in production)
  SMS_PROVIDER: z.string().default('bulksmsbd'),
  SMS_API_KEY: z.string().optional(),
  SMS_SENDER_ID: z.string().default('MADRASHA'),

  // Timezone
  TZ: z.string().default('Asia/Dhaka'),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Environment validation failed with the following errors:');
    result.error.issues.forEach((issue) => {
      console.error(`  - [${issue.path.join('.')}] ${issue.message}`);
    });
    // In production, refuse to start with invalid configuration
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    // In development, return default/fallback for smooth initial setup if needed
    console.warn('⚠️ Starting in development mode with fallback configurations.');
    return {
      NODE_ENV: 'development',
      PORT: 4000,
      API_BASE_URL: 'http://localhost:4000',
      WEB_BASE_URL: 'http://localhost:5173',
      ALLOWED_ORIGINS: 'http://localhost:5173,http://localhost:4000',
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://madrasha_admin:madrasha_secure_pass_2026@localhost:5432/madrasha_control',
      DATABASE_MAX_CONNECTIONS: 20,
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
      REDIS_PASSWORD: 'redis_secure_pass_2026',
      REDIS_URL: 'redis://:redis_secure_pass_2026@localhost:6379',
      JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_random_key_min_32_characters_long_2026',
      JWT_ACCESS_EXPIRES_IN: '15m',
      JWT_REFRESH_EXPIRES_IN: '7d',
      FIELD_ENCRYPTION_KEY: process.env.FIELD_ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      TOTP_APP_NAME: 'Madrasha SaaS',
      SMS_PROVIDER: 'bulksmsbd',
      SMS_API_KEY: 'test',
      SMS_SENDER_ID: 'MADRASHA',
      TZ: 'Asia/Dhaka',
    } as any;
  }

  return result.data as z.infer<typeof envSchema>;
};

export const env = parseEnv();
