import { Request, Response } from 'express';
import { z } from 'zod';
import { superAdminService } from './superAdmin.service.js';

// Input Validation Schemas
const applicationSchema = z.object({
  nameBn: z.string().min(3, 'মাদ্রাসার বাংলা নাম আবশ্যক'),
  nameEn: z.string().optional(),
  type: z.enum(['QAWMI', 'ALIA', 'HAFIZIYA', 'NURANI', 'MIXED']),
  subType: z.string().optional(),
  division: z.string().min(2, 'বিভাগ নির্বাচন করুন'),
  district: z.string().min(2, 'জেলা নির্বাচন করুন'),
  thana: z.string().min(2, 'থানা নির্বাচন করুন'),
  address: z.string().optional(),
  muhtamimName: z.string().min(3, 'মুহতামিম/প্রধানের নাম আবশ্যক'),
  muhtamimPhone: z.string().min(11, '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন'),
  muhtamimEmail: z.string().email('সঠিক ইমেইল দিন').optional().or(z.literal('')),
  requestedPlanId: z.string().optional(),
});

const approveSchema = z.object({
  planId: z.string().default('standard-plan-id'),
});

const rejectSchema = z.object({
  reason: z.string().min(5, 'প্রত্যাখ্যানের কারণ উল্লেখ করুন'),
});

const statusUpdateSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'CANCELLED']),
  reason: z.string().optional(),
});

const replyTicketSchema = z.object({
  message: z.string().min(2, 'উত্তরের বার্তা লিখুন'),
});

export class SuperAdminController {
  /**
   * Public: Submit new Madrasa Application
   * POST /api/public/madrasa/apply
   */
  async submitApplication(req: Request, res: Response) {
    try {
      const data = applicationSchema.parse(req.body);
      const application = await superAdminService.submitApplication(data as any);

      res.status(201).json({
        success: true,
        message: 'মাদ্রাসা রেজিস্ট্রেশন আবেদন সফলভাবে গৃহীত হয়েছে। খুব শীঘ্রই যাচাই করে অনুমোদন দেওয়া হবে।',
        data: application,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          code: 'APPLICATION_FAILED',
          details: error.message || 'আবেদন প্রক্রিয়াকরণ ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * Super Admin: Get Pending Applications
   * GET /api/super/applications
   */
  async getPendingApplications(_req: Request, res: Response) {
    try {
      const applications = await superAdminService.getPendingApplications();
      res.json({
        success: true,
        data: applications,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'FETCH_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Approve Madrasa Application
   * POST /api/super/applications/:id/approve
   */
  async approveApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { planId } = approveSchema.parse(req.body);

      const result = await superAdminService.approveApplication(id!, planId);
      res.json({
        success: true,
        message: 'মাদ্রাসা সফলভাবে অনুমোদিত হয়েছে এবং ডাটাবেস স্কিমা তৈরি সম্পন্ন হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'APPROVAL_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Reject Application
   * POST /api/super/applications/:id/reject
   */
  async rejectApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { reason } = rejectSchema.parse(req.body);

      const result = await superAdminService.rejectApplication(id!, reason);
      res.json({
        success: true,
        message: 'আবেদনটি প্রত্যাখ্যান করা হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'REJECT_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Madrasa Directory & Filtered Search
   * GET /api/super/madrasas
   */
  async getMadrasas(req: Request, res: Response) {
    try {
      const query = {
        division: req.query.division as string,
        district: req.query.district as string,
        thana: req.query.thana as string,
        type: req.query.type as any,
        status: req.query.status as any,
        planId: req.query.planId as string,
        studentCountRange: req.query.studentCountRange as any,
        search: req.query.search as string,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 20,
      };

      const result = await superAdminService.getMadrasas(query);
      res.json({
        success: true,
        data: result.madrasas,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'DIRECTORY_SEARCH_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Update Madrasa Status (Suspend / Reactivate)
   * PATCH /api/super/madrasas/:id/status
   */
  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, reason } = statusUpdateSchema.parse(req.body);

      const result = await superAdminService.updateMadrasaStatus(id!, status, reason);
      res.json({
        success: true,
        message: `মাদ্রাসার স্ট্যাটাস পরিবর্তিত হয়ে ${status} হয়েছে।`,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'STATUS_UPDATE_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Live System Health Metrics
   * GET /api/super/system/health
   */
  async getSystemHealth(_req: Request, res: Response) {
    try {
      const health = await superAdminService.getSystemHealthMetrics();
      res.json({
        success: true,
        data: health,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'HEALTH_CHECK_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: System Automation & Incident Logs
   * GET /api/super/system/logs
   */
  async getAutomationLogs(_req: Request, res: Response) {
    try {
      const logs = await superAdminService.getAutomationLogs();
      res.json({
        success: true,
        data: logs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'LOGS_FETCH_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Support Tickets List
   * GET /api/super/support/tickets
   */
  async getSupportTickets(req: Request, res: Response) {
    try {
      const status = req.query.status as string;
      const tickets = await superAdminService.getSupportTickets(status);
      res.json({
        success: true,
        data: tickets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'TICKETS_FETCH_FAILED', details: error.message },
      });
    }
  }

  /**
   * Super Admin: Reply to Support Ticket
   * POST /api/super/support/tickets/:id/reply
   */
  async replySupportTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { message } = replyTicketSchema.parse(req.body);

      const result = await superAdminService.replySupportTicket(id!, message);
      res.json({
        success: true,
        message: 'উত্তর সফলভাবে পাঠানো হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'REPLY_FAILED', details: error.message },
      });
    }
  }
}

export const superAdminController = new SuperAdminController();
