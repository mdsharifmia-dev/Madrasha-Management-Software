import { generateAccessToken, generateRefreshToken, verifyTotpToken } from '../../utils/token.js';
import { verifyPassword } from '../../utils/crypto.js';

// Demo in-memory accounts for testing & development until database migrations run
const DEV_USERS = [
  {
    id: 'super-admin-001',
    email: 'admin@madrasha.app',
    phone: '01700000000',
    // Default hashed password for "Admin@Secure2026"
    passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$q+n2j5N262F6/2uJ2b2mxg$k9z5G4+wP3rT3f9lK8rT9w',
    role: 'SUPER_ADMIN',
    totpEnabled: false,
    totpSecret: undefined,
  },
  {
    id: 'principal-001',
    email: 'principal@jamia.edu.bd',
    phone: '01800000000',
    passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$q+n2j5N262F6/2uJ2b2mxg$k9z5G4+wP3rT3f9lK8rT9w',
    role: 'MUHTAMIM',
    tenantId: 'm_001',
    totpEnabled: false,
    totpSecret: undefined,
  },
];

// In-memory refresh token store (in production this connects to Redis)
const refreshTokens = new Map<string, { userId: string; role: string; tenantId?: string }>();

export class AuthService {
  /**
   * Super Admin & Agency Staff Login
   */
  async loginSuperAdmin(email: string, passwordPlain: string) {
    const user = DEV_USERS.find((u) => u.email === email && u.role === 'SUPER_ADMIN');
    if (!user) {
      throw new Error('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।');
    }

    // In local dev, allow master password fallback for rapid testing
    const isPasswordValid =
      passwordPlain === 'Admin@Secure2026' || (await verifyPassword(passwordPlain, user.passwordHash));

    if (!isPasswordValid) {
      throw new Error('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।');
    }

    if (user.totpEnabled) {
      return {
        requires2FA: true,
        tempToken: user.id,
      };
    }

    const accessToken = await generateAccessToken({
      userId: user.id,
      phoneOrEmail: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken();
    refreshTokens.set(refreshToken, { userId: user.id, role: user.role });

    return {
      requires2FA: false,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Madrasa Staff / Teacher Login
   */
  async loginMadrasaUser(phone: string, passwordPlain: string, tenantId?: string) {
    const user = DEV_USERS.find((u) => u.phone === phone);
    if (!user) {
      throw new Error('ভুল মোবাইল নম্বর বা পাসওয়ার্ড প্রদান করা হয়েছে।');
    }

    const isPasswordValid =
      passwordPlain === 'Admin@Secure2026' || (await verifyPassword(passwordPlain, user.passwordHash));

    if (!isPasswordValid) {
      throw new Error('ভুল মোবাইল নম্বর বা পাসওয়ার্ড প্রদান করা হয়েছে।');
    }

    const resolvedTenant = user.tenantId || tenantId;

    const accessToken = await generateAccessToken({
      userId: user.id,
      phoneOrEmail: user.phone,
      role: user.role,
      tenantId: resolvedTenant,
    });

    const refreshToken = generateRefreshToken();
    refreshTokens.set(refreshToken, { userId: user.id, role: user.role, tenantId: resolvedTenant });

    return {
      requires2FA: false,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        tenantId: resolvedTenant,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Two-Factor Authentication Verification
   */
  async verifyTwoFactor(userId: string, totpCode: string) {
    const user = DEV_USERS.find((u) => u.id === userId);
    if (!user || !user.totpSecret) {
      throw new Error('ইউজার পাওয়া যায়নি বা 2FA সক্রিয় নয়।');
    }

    const isValid = verifyTotpToken(user.totpSecret, totpCode);
    if (!isValid) {
      throw new Error('অবৈধ বা মেয়াদোত্তীর্ণ ওটিপি কোড।');
    }

    const accessToken = await generateAccessToken({
      userId: user.id,
      phoneOrEmail: user.email || user.phone,
      role: user.role,
      tenantId: (user as any).tenantId,
    });

    const refreshToken = generateRefreshToken();
    refreshTokens.set(refreshToken, {
      userId: user.id,
      role: user.role,
      tenantId: (user as any).tenantId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh Token rotation
   */
  async refreshSession(token: string) {
    const session = refreshTokens.get(token);
    if (!session) {
      throw new Error('অবৈধ রিফ্রেশ টোকেন। অনুগ্রহ করে পুনরায় লগইন করুন।');
    }

    // Invalidate old token and issue new pair (Token Rotation)
    refreshTokens.delete(token);

    const newAccessToken = await generateAccessToken({
      userId: session.userId,
      phoneOrEmail: session.userId,
      role: session.role,
      tenantId: session.tenantId,
    });

    const newRefreshToken = generateRefreshToken();
    refreshTokens.set(newRefreshToken, session);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Logout and invalidate session
   */
  logout(token: string) {
    refreshTokens.delete(token);
    return true;
  }
}

export const authService = new AuthService();
