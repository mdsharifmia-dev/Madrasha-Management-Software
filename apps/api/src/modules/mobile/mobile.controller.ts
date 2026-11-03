import { Request, Response } from 'express';
import { z } from 'zod';
import { mobileService } from './mobile.service.js';

const requestOtpSchema = z.object({
  phone: z.string().min(11, '১১ ডিজিটের মোবাইল নম্বর প্রদান করুন'),
});

const verifyOtpSchema = z.object({
  phone: z.string().min(11),
  otp: z.string().length(6, '৬ সংখ্যার ওটিপি কোড দিন'),
});

export class MobileController {
  async requestParentOtp(req: Request, res: Response) {
    try {
      const { phone } = requestOtpSchema.parse(req.body);
      const result = await mobileService.requestParentOtp(phone);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, error: { code: 'OTP_REQUEST_FAILED', details: error.message } });
    }
  }

  async verifyParentOtp(req: Request, res: Response) {
    try {
      const { phone, otp } = verifyOtpSchema.parse(req.body);
      const result = await mobileService.verifyParentOtp(phone, otp);
      res.json({ success: true, message: 'অভিভাবক লগইন সফল হয়েছে।', data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, error: { code: 'OTP_VERIFY_FAILED', details: error.message } });
    }
  }

  async getChildren(req: Request, res: Response) {
    try {
      const parentPhone = req.user?.phoneOrEmail || '01711223344';
      const children = await mobileService.getGuardianChildren(parentPhone);
      res.json({ success: true, data: children });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_CHILDREN_FAILED', details: error.message } });
    }
  }

  async getChildAttendance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await mobileService.getChildAttendance(id!);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_ATTENDANCE_FAILED', details: error.message } });
    }
  }

  async getChildHifz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await mobileService.getChildHifzProgress(id!);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_HIFZ_FAILED', details: error.message } });
    }
  }

  async getChildInvoices(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await mobileService.getChildInvoices(id!);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_INVOICES_FAILED', details: error.message } });
    }
  }

  async getChildResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await mobileService.getChildExamResults(id!);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_RESULTS_FAILED', details: error.message } });
    }
  }

  async getTeacherSchedule(req: Request, res: Response) {
    try {
      const teacherId = req.user?.userId || 'teacher-01';
      const data = await mobileService.getTeacherSchedule(teacherId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: { code: 'FETCH_SCHEDULE_FAILED', details: error.message } });
    }
  }
}

export const mobileController = new MobileController();
