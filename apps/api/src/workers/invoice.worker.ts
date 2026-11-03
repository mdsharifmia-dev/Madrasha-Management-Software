import { financeService } from '../modules/finance/finance.service.js';

export interface MonthlyInvoiceJobData {
  monthYear: string; // e.g. "2026-03"
  dueDate: string;   // e.g. "2026-03-15"
  students: Array<{
    studentId: string;
    studentCode: string;
    studentName: string;
    feeStructureId: string;
    amountDue: number;
  }>;
}

export class InvoiceWorker {
  /**
   * Generates monthly recurring invoices for all active students on the 1st of each month
   */
  async processJob(jobData: MonthlyInvoiceJobData) {
    const generatedInvoices = [];

    for (const student of jobData.students) {
      const invoice = await financeService.createInvoice({
        studentId: student.studentId,
        studentCode: student.studentCode,
        studentName: student.studentName,
        feeStructureId: student.feeStructureId,
        monthYear: jobData.monthYear,
        amountDue: student.amountDue,
        dueDate: jobData.dueDate,
      });
      generatedInvoices.push(invoice);
    }

    return {
      status: 'COMPLETED',
      monthYear: jobData.monthYear,
      totalGenerated: generatedInvoices.length,
      generatedInvoices,
      processedAt: new Date().toISOString(),
    };
  }
}

export const invoiceWorker = new InvoiceWorker();
