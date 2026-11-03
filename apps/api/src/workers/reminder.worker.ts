import { financeService } from '../modules/finance/finance.service.js';

export interface FeeReminderJobData {
  daysBeforeDue: 7 | 3 | 1;
}

export class ReminderWorker {
  /**
   * Scans unpaid invoices and sends automated SMS/Push due date reminders
   */
  async processJob(jobData: FeeReminderJobData) {
    const unpaidInvoices = await financeService.getInvoices(undefined, 'UNPAID');
    const remindersSent = [];

    for (const invoice of unpaidInvoices) {
      const message = `সম্মানিত অভিভাবক, ${invoice.studentName}-এর ${invoice.monthYear} মাসের ফি (৳${invoice.amountDue}) পরিশোধের শেষ সময় ${invoice.dueDate}। অনুগ্রহ করে সময়মতো পরিশোধ করুন।`;

      // Simulating dispatching reminder to guardian phone
      remindersSent.push({
        invoiceId: invoice.id,
        studentName: invoice.studentName,
        daysBeforeDue: jobData.daysBeforeDue,
        amountDue: invoice.amountDue,
        reminderMessage: message,
      });
    }

    return {
      status: 'COMPLETED',
      daysBeforeDue: jobData.daysBeforeDue,
      totalRemindersSent: remindersSent.length,
      remindersSent,
      processedAt: new Date().toISOString(),
    };
  }
}

export const reminderWorker = new ReminderWorker();
