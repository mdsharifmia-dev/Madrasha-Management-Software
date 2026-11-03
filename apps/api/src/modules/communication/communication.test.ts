import { describe, it, expect } from 'vitest';
import { communicationService } from './communication.service.js';

describe('Phase 8: Communication, Notices & SMS Log Service Tests', () => {
  it('should create notice, filter by target audience, and publish', async () => {
    // 1. Create draft notice
    const notice = await communicationService.createNotice({
      title: 'হিফজ বিভাগের জরুরি অভিভাবক সম্মেলন',
      content: 'সকল হিফজ জামাতের ছাত্রদের অভিভাবকদের আগামী শনিবার সকাল ১০টায় উপস্থিত থাকার অনুরোধ করা হচ্ছে।',
      targetType: 'DEPARTMENT',
      targetIds: ['dept-hifz-01'],
      publishedBy: 'teacher-01',
    });

    expect(notice.title).toContain('হিফজ');
    expect(notice.isPublished).toBe(false);

    // 2. Publish
    const published = await communicationService.publishNotice(notice.id, 'muhtamim-01');
    expect(published.isPublished).toBe(true);
    expect(published.publishedAt).toBeDefined();

    // 3. Filter
    const list = await communicationService.getNotices('DEPARTMENT');
    expect(list.some((n) => n.id === notice.id)).toBe(true);
  });

  it('should calculate BTRC Unicode character units accurately', () => {
    // 1. Short Bengali text (<= 70 chars) = 1 SMS
    const shortBangla = 'সম্মানিত অভিভাবক, আপনার সন্তান মাদ্রাসায় উপস্থিত হয়েছে।';
    const calc1 = communicationService.calculateSmsUnits(shortBangla);
    expect(calc1.isUnicode).toBe(true);
    expect(calc1.units).toBe(1);

    // 2. Long Bengali text (> 70 chars) = 2 SMS
    const longBangla = 'সম্মানিত অভিভাবক, আগামী রবিবার হিফজুল কুরআন প্রতিযোগিতার শুভ উদ্বোধন অনুষ্ঠিত হবে। সকল অভিভাবককে সময়মত উপস্থিত থেকে দোয়া ও বরকত হাসিলের জন্য বিনীত অনুরোধ করা হচ্ছে।';
    const calc2 = communicationService.calculateSmsUnits(longBangla);
    expect(calc2.isUnicode).toBe(true);
    expect(calc2.units).toBeGreaterThan(1);

    // 3. ASCII English text (<= 160 chars) = 1 SMS
    const englishText = 'Dear guardian, your child is present at madrasha today. Thank you.';
    const calc3 = communicationService.calculateSmsUnits(englishText);
    expect(calc3.isUnicode).toBe(false);
    expect(calc3.units).toBe(1);
  });

  it('should preview SMS cost based on recipients and message units', async () => {
    const preview = await communicationService.previewSmsCost({
      recipientPhones: ['01711000001', '01811000002', '01911000003'],
      message: 'টেস্ট মেসেজ। ফি পরিশোধের জন্য ধন্যবাদ।',
    });

    expect(preview.totalRecipients).toBe(3);
    expect(preview.unitsPerMessage).toBe(1);
    expect(preview.totalUnits).toBe(3);
    expect(preview.estimatedCostBDT).toBe(1.05);
  });

  it('should dispatch SMS and record raw gateway logs (no fake sent)', async () => {
    const result = await communicationService.sendSms({
      recipientPhones: [
        '01712345678', // Valid BD phone
        '01899887766', // Valid BD phone
        '12345',       // Invalid phone
      ],
      message: 'জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম এসএমএস ভেরিফিকেশন।',
    });

    expect(result.totalSent).toBe(2);
    expect(result.totalFailed).toBe(1);
    expect(result.logs.length).toBe(3);

    // Check failed log
    const failedLog = result.logs.find((l) => l.recipientPhone === '12345');
    expect(failedLog?.status).toBe('FAILED');

    // Check sent log
    const sentLog = result.logs.find((l) => l.recipientPhone === '01712345678');
    expect(sentLog?.status).toBe('SENT');
    expect(sentLog?.gatewayMsgId).toBeDefined();

    // Verify persisted in logs store
    const logs = await communicationService.getSmsLogs();
    expect(logs.length).toBeGreaterThanOrEqual(3);
  });
});
