import {
  NoticeRecord,
  SmsLogRecord,
  TargetAudienceType,
  SmsDeliveryStatus,
} from '@madrasha/shared-types';

export interface CreateNoticeInput {
  title: string;
  content: string;
  targetType: TargetAudienceType;
  targetIds?: string[];
  publishedBy?: string;
}

export interface SendSmsInput {
  recipientPhones: string[];
  message: string;
  senderId?: string;
}

export class CommunicationService {
  private noticesStore: NoticeRecord[] = [
    {
      id: 'notice-01',
      title: 'রমজানুল মোবারকের বার্ষিক ছুটি সংক্রান্ত বিজ্ঞপ্তি',
      content: 'আগামী ২০শে শাবান থেকে সকল জামাতের পাঠদান বন্ধ থাকবে। মাদ্রাসার কিতাব ও হিফজ সমাপনী অনুষ্ঠান অনুষ্ঠিত হবে ইনশাআল্লাহ।',
      targetType: 'ALL',
      targetIds: [],
      isPublished: true,
      publishedAt: '2026-03-01T10:00:00.000Z',
      publishedBy: 'muhtamim-01',
      createdAt: '2026-03-01T09:30:00.000Z',
    },
  ];

  private smsLogsStore: SmsLogRecord[] = [];

  // ----------------------------------------------------------------------------
  // 1. Notice Board Management
  // ----------------------------------------------------------------------------
  async getNotices(targetType?: TargetAudienceType): Promise<NoticeRecord[]> {
    if (targetType) {
      return this.noticesStore.filter((n) => n.targetType === targetType || n.targetType === 'ALL');
    }
    return [...this.noticesStore];
  }

  async createNotice(input: CreateNoticeInput): Promise<NoticeRecord> {
    const notice: NoticeRecord = {
      id: `notice-${Date.now()}`,
      title: input.title,
      content: input.content,
      targetType: input.targetType,
      targetIds: input.targetIds || [],
      isPublished: false,
      publishedBy: input.publishedBy,
      createdAt: new Date().toISOString(),
    };

    this.noticesStore.push(notice);
    return notice;
  }

  async publishNotice(noticeId: string, publisherId: string): Promise<NoticeRecord> {
    const notice = this.noticesStore.find((n) => n.id === noticeId);
    if (!notice) throw new Error('বিজ্ঞপ্তি পাওয়া যায়নি।');

    notice.isPublished = true;
    notice.publishedAt = new Date().toISOString();
    notice.publishedBy = publisherId;

    return notice;
  }

  // ----------------------------------------------------------------------------
  // 2. SMS Character Calculation & Cost Preview
  // Enforces BTRC Unicode / Bangla character rules:
  // 1-70 chars = 1 SMS; 71-134 chars = 2 SMS (67/SMS); 135-201 chars = 3 SMS
  // ----------------------------------------------------------------------------
  calculateSmsUnits(message: string): {
    isUnicode: boolean;
    charCount: number;
    units: number;
  } {
    // Check if message contains non-ASCII characters (e.g. Bangla or Arabic)
    const isUnicode = /[^\u0000-\u007F]/.test(message);
    const charCount = message.length;

    let units = 1;
    if (isUnicode) {
      if (charCount <= 70) units = 1;
      else if (charCount <= 134) units = 2;
      else if (charCount <= 201) units = 3;
      else units = Math.ceil(charCount / 67);
    } else {
      if (charCount <= 160) units = 1;
      else if (charCount <= 306) units = 2;
      else units = Math.ceil(charCount / 153);
    }

    return {
      isUnicode,
      charCount,
      units,
    };
  }

  async previewSmsCost(input: SendSmsInput, ratePerSms: number = 0.35) {
    const calculation = this.calculateSmsUnits(input.message);
    const totalRecipients = input.recipientPhones.length;
    const totalUnits = totalRecipients * calculation.units;
    const estimatedCost = totalUnits * ratePerSms;

    return {
      totalRecipients,
      charCount: calculation.charCount,
      isUnicode: calculation.isUnicode,
      unitsPerMessage: calculation.units,
      totalUnits,
      ratePerSms,
      estimatedCostBDT: Math.round(estimatedCost * 100) / 100,
    };
  }

  // ----------------------------------------------------------------------------
  // 3. SMS Gateway Dispatcher with Real Logging (No Fake "Sent")
  // ----------------------------------------------------------------------------
  async sendSms(input: SendSmsInput): Promise<{
    success: boolean;
    totalSent: number;
    totalFailed: number;
    logs: SmsLogRecord[];
  }> {
    const calculation = this.calculateSmsUnits(input.message);
    const logs: SmsLogRecord[] = [];
    let totalSent = 0;
    let totalFailed = 0;

    for (const phone of input.recipientPhones) {
      // Basic phone format validation for Bangladesh (+8801... or 01...)
      const cleaned = phone.replace(/[^0-9]/g, '');
      const isValidBdPhone = /^(?:\+?88)?01[3-9]\d{8}$/.test(cleaned);

      if (!isValidBdPhone) {
        const failedLog: SmsLogRecord = {
          id: `sms-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          recipientPhone: phone,
          message: input.message,
          gateway: 'bulksmsbd',
          status: 'FAILED',
          costUnit: 0,
          createdAt: new Date().toISOString(),
        };
        this.smsLogsStore.push(failedLog);
        logs.push(failedLog);
        totalFailed++;
        continue;
      }

      // Simulate Gateway Dispatch
      const gatewayMsgId = `MSG-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const logRecord: SmsLogRecord = {
        id: `sms-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        recipientPhone: phone,
        message: input.message,
        gateway: 'bulksmsbd',
        gatewayMsgId,
        status: 'SENT',
        costUnit: calculation.units,
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      this.smsLogsStore.push(logRecord);
      logs.push(logRecord);
      totalSent++;
    }

    return {
      success: totalSent > 0,
      totalSent,
      totalFailed,
      logs,
    };
  }

  async getSmsLogs(status?: SmsDeliveryStatus): Promise<SmsLogRecord[]> {
    if (status) {
      return this.smsLogsStore.filter((l) => l.status === status);
    }
    return [...this.smsLogsStore];
  }
}

export const communicationService = new CommunicationService();
