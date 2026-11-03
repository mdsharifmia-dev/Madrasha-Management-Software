import { describe, it, expect } from 'vitest';
import { academicService } from './academic.service.js';

describe('Part 6: Academics, Hifz & Examinations Tests', () => {
  // 1. Daily Hifz Progress Tracker
  it('should record daily Hifz entry and calculate Quran memorization percentage', async () => {
    const input = {
      studentId: 'stu-001',
      teacherId: 'teacher-01',
      date: '2026-10-14',
      sabaqFrom: 1,
      sabaqTo: 60, // 3 Paras (approx 20 pages per para)
      sabqiFrom: 1,
      sabqiTo: 40,
      manzilFrom: 1,
      manzilTo: 20,
      quality: 'MUMTAZ' as const,
      notes: 'মাশাআল্লাহ, সুন্দর ও শুদ্ধ তেলাওয়াত।',
    };

    const result = await academicService.recordHifzDaily(input);
    expect(result).toBeDefined();
    expect(result.entry.quality).toBe('MUMTAZ');
    expect(result.progressPercent).toBe(10); // 60 / 604 = ~10%
    expect(result.remainingPages).toBe(544);
  });

  // 2. Attendance Tracking & Absent Notification Trigger
  it('should mark student attendance and detect absent students', async () => {
    const input = {
      classId: 'cls-01',
      date: '2026-10-14',
      markedBy: 'teacher-01',
      source: 'MANUAL' as const,
      records: [
        { studentId: 'stu-001', status: 'PRESENT' as const },
        { studentId: 'stu-002', status: 'ABSENT' as const, notes: 'জরুরি অসুস্থতা' },
      ],
    };

    const result = await academicService.markStudentAttendance(input);
    expect(result.totalMarked).toBe(2);
    expect(result.absentCount).toBe(1);
    expect(result.notificationTriggered).toBe(true);
    expect(result.absentStudentIds).toContain('stu-002');
  });

  // 3. Biometric IoT Machine Push Verification
  it('should accept biometric punch with valid device key and reject invalid key', async () => {
    // Valid punch
    const validPunch = await academicService.processBiometricPunch({
      deviceSerial: 'ZK-DHK-MAIN-GATE',
      deviceApiKey: 'secret_device_api_key_zk_2026',
      studentCode: 'DHK-2026-0001',
      punchTime: new Date().toISOString(),
    });
    expect(validPunch.success).toBe(true);
    expect(validPunch.status).toBe('PRESENT');

    // Invalid punch
    await expect(
      academicService.processBiometricPunch({
        deviceSerial: 'ZK-DHK-MAIN-GATE',
        deviceApiKey: 'wrong_unauthorized_key',
        studentCode: 'DHK-2026-0001',
        punchTime: new Date().toISOString(),
      })
    ).rejects.toThrow(/অননুমোদিত বায়োমেট্রিক ডিভাইস/);
  });

  // 4. Exams, Marks Submission and Lock Protection
  it('should create exam, submit marks, lock results, and prevent unauthorized tampering', async () => {
    const exam = await academicService.createExam({
      name: 'সাময়িক পরীক্ষা ২০২৬',
      classId: 'cls-01',
      examType: 'TERM',
      startDate: '2026-06-01',
      endDate: '2026-06-10',
    });
    expect(exam.id).toBeDefined();

    // Submit marks
    const submission = await academicService.submitMarks({
      examId: exam.id,
      subjectId: 'sub-quran-01',
      teacherId: 'teacher-01',
      results: [{ studentId: 'stu-001', marksObtained: 85, isAbsent: false }],
    });
    expect(submission.totalSubmitted).toBe(1);

    // Lock results
    const lockResult = await academicService.lockExamResults(exam.id);
    expect(lockResult.resultsLocked).toBe(true);

    // Attempting to modify locked marks must be rejected
    await expect(
      academicService.submitMarks({
        examId: exam.id,
        subjectId: 'sub-quran-01',
        teacherId: 'teacher-01',
        results: [{ studentId: 'stu-001', marksObtained: 95, isAbsent: false }],
      })
    ).rejects.toThrow(/নম্বর লক করা হয়েছে/);
  });

  // 5. Tabulation & Qawmi Grading
  it('should generate tabulation sheet with accurate Qawmi grading', async () => {
    const tabulation = await academicService.getExamTabulation('exam-01', 'QAWMI');
    expect(tabulation.length).toBeGreaterThan(0);

    const topRanked = tabulation[0]!;
    expect(topRanked.rank).toBe(1);
    expect(topRanked.grade).toContain('মুমতাজ');
  });

  // 6. Befaq Board Exam Data Export
  it('should generate compliant Befaqul Madaris board export payload', async () => {
    const befaqData = await academicService.generateBefaqExport({
      classId: 'cls-takmil-01',
      academicYear: 1447,
      madrasaIlhaqNo: 'DHK-786',
      marhala: 'তাকমিল (দাওরায়ে হাদিস)',
    });

    expect(befaqData.boardShortName).toBe('BEFAQ');
    expect(befaqData.totalCandidates).toBeGreaterThan(0);
    expect(befaqData.candidates[0].registrationNo).toContain('BEFAQ-1447-DHK-786');
    expect(befaqData.candidates[0].subjects.length).toBeGreaterThan(0);
  });

  // 7. Offline Attendance Sync Engine
  it('should sync offline attendance queue and resolve conflicts', async () => {
    const offlineRecords = [
      {
        studentId: 'stu-offline-01',
        classId: 'cls-01',
        date: '2026-10-15',
        status: 'PRESENT' as const,
        timestamp: '2026-10-15T09:00:00.000Z',
        syncId: 'sync-item-1',
      },
      {
        studentId: 'stu-offline-02',
        classId: 'cls-01',
        date: '2026-10-15',
        status: 'ABSENT' as const,
        timestamp: '2026-10-15T09:01:00.000Z',
        syncId: 'sync-item-2',
      },
    ];

    const syncResult = await academicService.syncOfflineAttendance(offlineRecords);
    expect(syncResult.success).toBe(true);
    expect(syncResult.syncedCount).toBe(2);
    expect(syncResult.processedSyncIds).toContain('sync-item-1');
  });

  // 8. Hifz Completion Certificate
  it('should generate Khatam-e-Quran certificate with signatories and QR verify link', async () => {
    const cert = await academicService.generateHifzCertificate('stu-001');
    expect(cert.certificateNo).toContain('HIFZ-CERT-2026');
    expect(cert.totalParas).toBe(30);
    expect(cert.totalPages).toBe(604);
    expect(cert.signatories.length).toBe(2);
    expect(cert.qrVerificationUrl).toContain('/verify/hifz/stu-001');
  });
});
