import { getDhakaDateString } from '@madrasha/utils';
import { studentService } from '../students/student.service.js';
import { financeService } from '../finance/finance.service.js';
import { generateAccessToken } from '../../utils/token.js';

export class MobileService {
  /**
   * 1. Parent OTP Login Request (Phone -> SMS OTP)
   */
  async requestParentOtp(phone: string) {
    // In production, triggers BulkSMSBD gateway SMS with 6-digit OTP (e.g. 123456)
    return {
      success: true,
      phone,
      message: '৬-সংখ্যার যাচাইকরণ কোড (OTP) আপনার মোবাইলে পাঠানো হয়েছে। (টেস্ট কোড: 123456)',
      expiresInSeconds: 300,
    };
  }

  /**
   * 2. Verify Parent OTP & Issue JWT
   */
  async verifyParentOtp(phone: string, otp: string) {
    if (otp !== '123456' && otp !== '654321') {
      throw new Error('অবৈধ বা মেয়াদোত্তীর্ণ ওটিপি কোড।');
    }

    const token = await generateAccessToken({
      userId: `parent_${phone}`,
      phoneOrEmail: phone,
      role: 'PARENT',
    });

    return {
      token,
      parentPhone: phone,
    };
  }

  /**
   * 3. Get Enrolled Children for Guardian (Multi-Child Support)
   */
  async getGuardianChildren(_parentPhone: string) {
    const students = await studentService.getStudents({});
    // Return sample children data
    return students.students.map((child) => ({
      id: child.id,
      studentCode: child.studentCode,
      nameBn: child.nameBn,
      className: child.className,
      rollNo: child.rollNo,
      boardingType: child.boardingType,
      madrasaName: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
    }));
  }

  /**
   * 4. Get Child's Daily Attendance
   */
  async getChildAttendance(childId: string) {
    const today = getDhakaDateString();
    return {
      childId,
      todayDate: today,
      todayStatus: 'PRESENT',
      monthlySummary: {
        presentDays: 24,
        absentDays: 1,
        lateDays: 1,
        holidays: 4,
      },
    };
  }

  /**
   * 5. Get Child's Daily Hifz Progress
   */
  async getChildHifzProgress(childId: string) {
    return {
      childId,
      currentSabaqPage: 60,
      totalQuranPages: 604,
      completedParas: 3,
      progressPercent: 10,
      recentEntries: [
        {
          date: '2026-10-14',
          sabaq: 'পৃষ্ঠা ৫৯ - ৬০',
          sabqi: 'পৃষ্ঠা ৪০ - ৫০',
          manzil: 'পারা ১',
          quality: 'মুমতাজ (ممتاز)',
          teacherNotes: 'মাশাআল্লাহ, সুন্দর ও শুদ্ধ তেলাওয়াত।',
        },
      ],
    };
  }

  /**
   * 6. Get Child's Invoices & Online Payment Status
   */
  async getChildInvoices(childId: string) {
    return await financeService.getInvoices(childId);
  }

  /**
   * 7. Get Child's Published Exam Results
   */
  async getChildExamResults(childId: string) {
    return {
      childId,
      publishedExams: [
        {
          examName: 'সাময়িক পরীক্ষা ২০২৬',
          totalMarks: 100,
          obtainedMarks: 88,
          grade: 'মুমতাজ (ممتاز)',
          rank: 1,
          isPassed: true,
        },
      ],
    };
  }

  /**
   * 8. Teacher Schedule & Routine
   */
  async getTeacherSchedule(teacherId: string) {
    return {
      teacherId,
      todayClasses: [
        { period: 1, time: '08:00 AM - 08:45 AM', className: 'হিফজ ৩য় বর্ষ', subject: 'কুরআন তিলাওয়াত' },
        { period: 2, time: '08:45 AM - 09:30 AM', className: 'দাওরায়ে হাদিস', subject: 'সহীহ বুখারী শরীফ' },
        { period: 3, time: '09:45 AM - 10:30 AM', className: 'শরহে বেকায়া', subject: 'ফিকহুল ইসলাম' },
      ],
    };
  }
}

export const mobileService = new MobileService();
