import { describe, it, expect } from 'vitest';
import { smsWorker } from './sms.worker.js';
import { invoiceWorker } from './invoice.worker.js';
import { reminderWorker } from './reminder.worker.js';
import { backupWorker } from './backup.worker.js';

describe('Phase 9 & Background Workers Tests', () => {
  it('should process async SMS job and report dispatched count', async () => {
    const result = await smsWorker.processJob({
      recipientPhones: ['01712345678', '01812345678'],
      message: 'আসসালামু আলাইকুম, আজ বিকাল ৪টায় অভিভাবক সভা।',
      senderId: 'MADRASHA',
    });

    expect(result.status).toBe('COMPLETED');
    expect(result.totalSent).toBe(2);
    expect(result.processedAt).toBeDefined();
  });

  it('should auto-generate monthly invoices for active students', async () => {
    const result = await invoiceWorker.processJob({
      monthYear: '2026-03',
      dueDate: '2026-03-15',
      students: [
        {
          studentId: 'stu-worker-01',
          studentCode: 'DHK-2026-0301',
          studentName: 'মুহাম্মদ তালহা',
          feeStructureId: 'str-01',
          amountDue: 1500,
        },
        {
          studentId: 'stu-worker-02',
          studentCode: 'DHK-2026-0302',
          studentName: 'মুহাম্মদ যুবায়ের',
          feeStructureId: 'str-01',
          amountDue: 1500,
        },
      ],
    });

    expect(result.status).toBe('COMPLETED');
    expect(result.totalGenerated).toBe(2);
    expect(result.generatedInvoices[0].invoiceNo).toContain('INV-2026-');
  });

  it('should generate fee reminders for due dates', async () => {
    const result = await reminderWorker.processJob({ daysBeforeDue: 3 });
    expect(result.status).toBe('COMPLETED');
    expect(result.daysBeforeDue).toBe(3);
    expect(Array.isArray(result.remindersSent)).toBe(true);
  });

  it('should execute encrypted WAL-safe database backup job', async () => {
    const result = await backupWorker.processJob({ schemaName: 'm_001', retentionDays: 30 });
    expect(result.status).toBe('SUCCESS');
    expect(result.isEncrypted).toBe(true);
    expect(result.encryptionAlgorithm).toBe('AES-256-GCM');
    expect(result.backupFileName).toContain('.sql.enc');
  });
});
