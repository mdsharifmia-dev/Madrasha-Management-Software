import { describe, it, expect } from 'vitest';
import { mobileService } from './mobile.service.js';

describe('Part 7: Mobile API Module Tests', () => {
  // 1. Parent OTP Request
  it('should request parent SMS OTP successfully', async () => {
    const phone = '01711223344';
    const result = await mobileService.requestParentOtp(phone);
    expect(result.success).toBe(true);
    expect(result.phone).toBe(phone);
    expect(result.expiresInSeconds).toBe(300);
  });

  // 2. Parent OTP Verification & JWT Issue
  it('should verify valid OTP and return parent JWT token', async () => {
    const phone = '01711223344';
    const authResult = await mobileService.verifyParentOtp(phone, '123456');
    expect(authResult.token).toBeDefined();
    expect(typeof authResult.token).toBe('string');
    expect(authResult.parentPhone).toBe(phone);
  });

  // 3. Reject Invalid OTP
  it('should reject invalid OTP code', async () => {
    await expect(mobileService.verifyParentOtp('01711223344', '000000')).rejects.toThrow(
      /অবৈধ বা মেয়াদোত্তীর্ণ ওটিপি/
    );
  });

  // 4. Guardian Children (Multi-Child)
  it('should retrieve list of enrolled children for guardian', async () => {
    const children = await mobileService.getGuardianChildren('01711223344');
    expect(Array.isArray(children)).toBe(true);
    expect(children.length).toBeGreaterThan(0);
    expect(children[0]?.studentCode).toBeDefined();
  });

  // 5. Child Attendance & Hifz
  it('should retrieve child daily attendance and Hifz progress', async () => {
    const attendance = await mobileService.getChildAttendance('stu-001');
    expect(attendance.todayStatus).toBe('PRESENT');
    expect(attendance.monthlySummary.presentDays).toBeGreaterThan(0);

    const hifz = await mobileService.getChildHifzProgress('stu-001');
    expect(hifz.totalQuranPages).toBe(604);
    expect(hifz.currentSabaqPage).toBeGreaterThan(0);
  });

  // 6. Teacher Schedule
  it('should retrieve teacher daily routine schedule', async () => {
    const schedule = await mobileService.getTeacherSchedule('teacher-01');
    expect(schedule.todayClasses.length).toBeGreaterThan(0);
    expect(schedule.todayClasses[0]?.subject).toBeDefined();
  });
});
