import { Request, Response } from 'express';
import { communicationService } from './communication.service.js';

export class CommunicationController {
  async getNotices(req: Request, res: Response) {
    try {
      const { targetType } = req.query;
      const notices = await communicationService.getNotices(targetType as any);
      return res.json({ success: true, data: notices });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  async createNotice(req: Request, res: Response) {
    try {
      const { title, content, targetType, targetIds } = req.body;
      if (!title || !content) {
        return res.status(400).json({ success: false, error: { message: 'বিজ্ঞপ্তির শিরোনাম ও বিষয়বস্তু আবশ্যক।' } });
      }
      const notice = await communicationService.createNotice({
        title,
        content,
        targetType: targetType || 'ALL',
        targetIds,
        publishedBy: req.user?.userId,
      });
      return res.status(201).json({ success: true, data: notice });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async publishNotice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'বিজ্ঞপ্তি আইডি আবশ্যক।' } });
      }
      const published = await communicationService.publishNotice(id, req.user?.userId || 'admin');
      return res.json({ success: true, message: 'বিজ্ঞপ্তি সফলভাবে প্রকাশিত হয়েছে।', data: published });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async previewSms(req: Request, res: Response) {
    try {
      const { recipientPhones, message } = req.body;
      if (!Array.isArray(recipientPhones) || !message) {
        return res.status(400).json({ success: false, error: { message: 'প্রাপক ফোন নম্বরের তালিকা এবং বার্তা আবশ্যক।' } });
      }
      const preview = await communicationService.previewSmsCost({ recipientPhones, message });
      return res.json({ success: true, data: preview });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async sendSms(req: Request, res: Response) {
    try {
      const { recipientPhones, message } = req.body;
      if (!Array.isArray(recipientPhones) || !message) {
        return res.status(400).json({ success: false, error: { message: 'প্রাপক ফোন নম্বরের তালিকা এবং বার্তা আবশ্যক।' } });
      }
      const result = await communicationService.sendSms({ recipientPhones, message });
      return res.json({ success: true, message: 'এসএমএস সফলভাবে গেটওয়েতে পাঠানো হয়েছে।', data: result });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getSmsLogs(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const logs = await communicationService.getSmsLogs(status as any);
      return res.json({ success: true, data: logs });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
}

export const communicationController = new CommunicationController();
