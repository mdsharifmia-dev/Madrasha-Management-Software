import { Request, Response, NextFunction } from 'express';

/**
 * Resolves the tenant database schema from subdomain or X-Tenant-ID header
 * Example: jamia.madrasha.app -> "m_001"
 */
export async function tenantResolver(req: Request, res: Response, next: NextFunction): Promise<void> {
  const host = req.headers.host || '';
  const tenantHeader = req.headers['x-tenant-id'] as string;

  let tenantSlug = '';

  // 1. Resolve from Subdomain
  if (host.includes('.')) {
    const parts = host.split('.');
    // Avoid "admin" subdomain (reserved for Super Admin)
    if (parts[0] && parts[0] !== 'admin' && parts[0] !== 'www' && parts[0] !== 'localhost') {
      tenantSlug = parts[0];
    }
  }

  // 2. Fallback to header (useful for mobile apps and dev environments)
  if (!tenantSlug && tenantHeader) {
    tenantSlug = tenantHeader.trim().toLowerCase();
  }

  // 3. If authenticated user has tenantId, verify cross-tenant security
  if (req.user && req.user.tenantId) {
    if (tenantSlug && tenantSlug !== req.user.tenantId && req.user.role !== 'SUPER_ADMIN') {
      res.status(403).json({
        success: false,
        error: {
          code: 'TENANT_MISMATCH',
          details: 'আপনার অ্যাকাউন্টটি এই মাদ্রাসার ডাটা এক্সেস করার অনুমতিপ্রাপ্ত নয়।',
        },
      });
      return;
    }
    req.tenantId = req.user.tenantId;
  } else if (tenantSlug) {
    req.tenantId = tenantSlug;
  }

  next();
}
