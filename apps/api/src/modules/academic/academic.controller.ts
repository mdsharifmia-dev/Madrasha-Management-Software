import { Request, Response } from 'express';
import { z } from 'zod';
import { academicService } from './academic.service.js';

// Input Schemas
const hifzEntrySchema = z.object({
  studentId: z.string().min(1, 'ছাত্র আইডি আবশ্যক'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'তারিখ YYYY-MM-DD ফরম্যাটে দিন'),
  sabaqFrom: z.number().int().min(1).max(604, 'সবকের পৃষ্ঠা ১ থেকে ৬০৪ এর মধ্যে হতে হবে'),
  sabaqTo: z.number().int().min(1).max(604),
  sabqiFrom: z.number().int().min(1).max(604).optional(),
  sabqiTo: z.number().int().min(1).max(604).optional(),
  manzilFrom: z.number().int().min(1).max(604).optional(),
  manzilTo: z.number().int().min(1).max(604).optional(),
  quality: z.enum(['MUMTAZ', 'JAYYID_JIDDAN', 'JAYYID', 'MAQBUL', 'RASIB']),
  notes: z.string().optional(),
});

const attendanceSchema = z.object({
  classId: z.string().min(1, 'শ্রেণি আইডি আবশ্যক'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  source: z.enum(['MANUAL', 'BIOMETRIC', 'QR_SCAN', 'APP']).default('MANUAL'),
  records: z.array(
    z.object({
      studentId: z.string().min(1),
      status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'LEAVE', 'HOLIDAY']),
      notes: z.string().optional(),
    })
  ).min(1, 'কমপক্ষে একজন ছাত্রের হাজিরা প্রয়োজন'),
});

const biometricSchema = z.object({
  deviceSerial: z.string().min(1, 'ডিভাইস সিরিয়াল আবশ্যক'),
  deviceApiKey: z.string().min(1, 'ডিভাইস এপিআই কি আবশ্যক'),
  studentCode: z.string().min(1, 'ছাত্রের কোড আবশ্যক'),
  punchTime: z.string().min(1, 'পাঞ্চের সময় আবশ্যক'),
});

const examSchema = z.object({
  name: z.string().min(2, 'পরীক্ষার নাম আবশ্যক'),
  classId: z.string().min(1, 'শ্রেণি আবশ্যক'),
  examType: z.enum(['WEEKLY', 'MONTHLY', 'TERM', 'ANNUAL', 'SPECIAL']),
  startDate: z.string(),
  endDate: z.string(),
});

const submitMarksSchema = z.object({
  examId: z.string().min(1),
  subjectId: z.string().min(1),
  results: z.array(
    z.object({
      studentId: z.string().min(1),
      marksObtained: z.number().min(0).max(100),
      isAbsent: z.boolean().default(false),
    })
  ),
});

export class AcademicController {
  /**
   * POST /api/academic/hifz/daily
   */
  async recordHifzDaily(req: Request, res: Response) {
    try {
      const data = hifzEntrySchema.parse(req.body);
      const teacherId = req.user?.userId || 'teacher-001';

      const result = await academicService.recordHifzDaily({
        ...data,
        teacherId,
      });

      res.status(201).json({
        success: true,
        message: 'হিফজের দৈনিক সবক সফলভাবে সংরক্ষণ করা হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'HIFZ_ENTRY_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/attendance/mark
   */
  async markAttendance(req: Request, res: Response) {
    try {
      const data = attendanceSchema.parse(req.body);
      const markedBy = req.user?.userId || 'teacher-001';

      const result = await academicService.markStudentAttendance({
        ...data,
        date: data.date || '',
        markedBy,
      });

      res.json({
        success: true,
        message: 'শ্রেণির দৈনিক হাজিরা সংরক্ষণ সম্পন্ন হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'ATTENDANCE_FAILED', details: error.message },
      });
    }
  }

  /**
   * Biometric Device Push Endpoint
   * POST /api/academic/biometric/push
   */
  async processBiometricPunch(req: Request, res: Response) {
    try {
      const data = biometricSchema.parse(req.body);
      const result = await academicService.processBiometricPunch(data);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: { code: 'BIOMETRIC_REJECTED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/exams
   */
  async createExam(req: Request, res: Response) {
    try {
      const data = examSchema.parse(req.body);
      const exam = await academicService.createExam(data);

      res.status(201).json({
        success: true,
        message: 'পরীক্ষা সফলভাবে তৈরি করা হয়েছে।',
        data: exam,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'EXAM_CREATE_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/exams/marks
   */
  async submitMarks(req: Request, res: Response) {
    try {
      const data = submitMarksSchema.parse(req.body);
      const teacherId = req.user?.userId || 'teacher-001';

      const result = await academicService.submitMarks({
        ...data,
        teacherId,
      });

      res.json({
        success: true,
        message: 'পরীক্ষার নম্বর সফলভাবে জমা হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'MARKS_SUBMIT_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/exams/:id/lock
   */
  async lockResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await academicService.lockExamResults(id!);

      res.json({
        success: true,
        message: 'পরীক্ষার ফলাফল লক করা হয়েছে। অনুমতি ছাড়া আর পরিবর্তন করা যাবে না।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'LOCK_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/exams/:id/publish
   */
  async publishResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await academicService.publishExamResults(id!);

      res.json({
        success: true,
        message: 'ফলাফল প্রকাশ করা হয়েছে। এখন অভিভাবক অ্যাপে রেজাল্ট দেখা যাবে।',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'PUBLISH_FAILED', details: error.message },
      });
    }
  }

  /**
   * GET /api/academic/exams/:id/tabulation
   */
  async getTabulation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const gradingType = (req.query.gradingType as any) || 'QAWMI';

      const tabulation = await academicService.getExamTabulation(id!, gradingType);
      res.json({
        success: true,
        data: tabulation,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: { code: 'TABULATION_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/academic/befaq/export
   */
  async exportBefaqData(req: Request, res: Response) {
    try {
      const { classId, academicYear, madrasaIlhaqNo, marhala } = req.body;
      if (!classId || !academicYear || !madrasaIlhaqNo || !marhala) {
        return res.status(400).json({
          success: false,
          error: { message: 'শ্রেণি, শিক্ষাবর্ষ, মাদ্রাসার ইলহাক নং ও মারহালা আবশ্যক।' },
        });
      }

      const exportData = await academicService.generateBefaqExport({
        classId,
        academicYear: Number(academicYear),
        madrasaIlhaqNo,
        marhala,
      });

      return res.json({
        success: true,
        message: 'বেফাকুল মাদারিসিল আরাবিয়া রেজিস্ট্রেশন ও নম্বর ডেটা সফলভাবে তৈরি হয়েছে।',
        data: exportData,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  /**
   * POST /api/academic/attendance/offline-sync
   */
  async syncOfflineAttendance(req: Request, res: Response) {
    try {
      const { records } = req.body;
      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ success: false, error: { message: 'সিঙ্কের জন্য হাজিরা রেকর্ডের তালিকা প্রদান করুন।' } });
      }

      const syncResult = await academicService.syncOfflineAttendance(records);
      return res.json({
        success: true,
        message: 'অফলাইন হাজিরা সফলভাবে ডাটাবেসের সাথে সিঙ্ক হয়েছে।',
        data: syncResult,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  /**
   * POST /api/academic/staff-attendance
   */
  async recordStaffAttendance(req: Request, res: Response) {
    try {
      const { date, checkIn, checkOut, status, gpsLat, gpsLng } = req.body;
      const userId = req.user?.userId || 'staff-001';

      const record = await academicService.recordStaffAttendance({
        userId,
        date: date || new Date().toISOString().split('T')[0],
        checkIn,
        checkOut,
        status,
        gpsLat,
        gpsLng,
      });

      return res.status(201).json({ success: true, data: record });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  /**
   * GET /api/academic/hifz/certificate/:studentId
   */
  async getHifzCertificate(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const certificate = await academicService.generateHifzCertificate(studentId!);
      return res.json({
        success: true,
        message: 'হিফজ সমাপ্তির সনদপত্র প্রস্তুত করা হয়েছে।',
        data: certificate,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }
}

export const academicController = new AcademicController();
