import { Request, Response, NextFunction } from 'express';

/**
 * Middleware factory that enforces granular Role-Based Access Control (RBAC)
 * Example: requirePermission('students', 'create')
 */
export function requirePermission(moduleName: string, action: 'read' | 'create' | 'edit' | 'delete' | 'approve' | 'export') {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          details: 'অনুগ্রহ করে প্রথমে লগইন করুন।',
        },
      });
      return;
    }

    const { role, permissions } = req.user;

    // Super Admin / Owner / Principal (Muhtamim) have unrestricted administrative access
    if (role === 'SUPER_ADMIN' || role === 'OWNER' || role === 'MUHTAMIM') {
      next();
      return;
    }

    // Check granular module permissions
    const modulePerms = permissions?.[moduleName];
    if (modulePerms && modulePerms[action] === true) {
      next();
      return;
    }

    // Access Denied
    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        details: `আপনার এই কার্যক্রম (${moduleName} - ${action}) সম্পন্ন করার অনুমতি নেই।`,
      },
    });
  };
}
