import { communicationService } from '../modules/communication/communication.service.js';

export interface SmsJobData {
  recipientPhones: string[];
  message: string;
  senderId?: string;
  tenantId?: string;
}

export class SmsWorker {
  /**
   * Processes an asynchronous SMS dispatch job
   */
  async processJob(jobData: SmsJobData) {
    if (!jobData.recipientPhones || jobData.recipientPhones.length === 0) {
      throw new Error('কোনো প্রাপক ফোন নম্বর প্রদান করা হয়নি।');
    }

    const result = await communicationService.sendSms({
      recipientPhones: jobData.recipientPhones,
      message: jobData.message,
      senderId: jobData.senderId,
    });

    return {
      status: 'COMPLETED',
      totalSent: result.totalSent,
      totalFailed: result.totalFailed,
      processedAt: new Date().toISOString(),
    };
  }
}

export const smsWorker = new SmsWorker();
