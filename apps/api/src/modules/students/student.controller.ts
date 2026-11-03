import { Request, Response } from 'express';
import { z } from 'zod';
import { studentService } from './student.service.js';

// Input Schemas
const admissionSchema = z.object({
  nameBn: z.string().min(2, 'ছাত্রের বাংলা নাম আবশ্যক'),
  nameEn: z.string().optional(),
  nameAr: z.string().optional(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'জন্মতারিখ YYYY-MM-DD ফরম্যাটে দিন'),
  gender: z.enum(['MALE', 'FEMALE']).default('MALE'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
  birthCertNo: z.string().optional(),
  classId: z.string().min(1, 'শ্রেণি/জামাত নির্বাচন আবশ্যক'),
  sectionId: z.string().optional(),
  rollNo: z.number().int().positive().optional(),
  boardingType: z.enum(['DAY', 'BOARDING', 'EXTERNAL']).default('DAY'),
  eatsAtHostel: z.boolean().default(false),
  guardianName: z.string().min(2, 'অভিভাবকের নাম আবশ্যক'),
  guardianRelation: z.enum(['FATHER', 'MOTHER', 'GUARDIAN', 'OTHER']).default('FATHER'),
  guardianPhone: z.string().min(11, '১১ ডিজিটের মোবাইল নম্বর দিন'),
  guardianAddress: z.string().optional(),
  healthNotes: z.string().optional(),
});

const promotionSchema = z.object({
  currentClassId: z.string().min(1, 'বর্তমান শ্রেণি আবশ্যক'),
  nextClassId: z.string().min(1, 'পরবর্তী শ্রেণি আবশ্যক'),
});

export class StudentController {
  /**
   * GET /api/students/academic-structure
   */
  async getAcademicStructure(_req: Request, res: Response) {
    try {
      const structure = await studentService.getAcademicStructure();
      res.json({
        success: true,
        data: structure,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'FETCH_STRUCTURE_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/students/admit
   */
  async admitStudent(req: Request, res: Response) {
    try {
      const data = admissionSchema.parse(req.body);
      const student = await studentService.admitStudent(data as any);

      res.status(201).json({
        success: true,
        message: 'ছাত্র সফলভাবে ভর্তি করা হয়েছে এবং আইডি কোড তৈরি হয়েছে।',
        data: student,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          code: 'ADMISSION_FAILED',
          details: error.message || 'ভর্তি প্রক্রিয়া ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * GET /api/students
   */
  async getStudents(req: Request, res: Response) {
    try {
      const query = {
        classId: req.query.classId as string,
        sectionId: req.query.sectionId as string,
        boardingType: req.query.boardingType as any,
        status: req.query.status as any,
        bloodGroup: req.query.bloodGroup as string,
        search: req.query.search as string,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 25,
      };

      const result = await studentService.getStudents(query);
      res.json({
        success: true,
        data: result.students,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'FETCH_STUDENTS_FAILED', details: error.message },
      });
    }
  }

  /**
   * GET /api/students/:id/id-card
   */
  async generateIdCard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idCard = await studentService.generateIdCard(id!);

      res.json({
        success: true,
        data: idCard,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: { code: 'ID_CARD_FAILED', details: error.message },
      });
    }
  }

  /**
   * POST /api/students/promote
   */
  async promoteStudents(req: Request, res: Response) {
    try {
      const { currentClassId, nextClassId } = promotionSchema.parse(req.body);
      const result = await studentService.promoteStudents(currentClassId, nextClassId);

      res.json({
        success: true,
        message: `${result.promotedCount} জন ছাত্রকে সফলভাবে ${result.newClassName}-এ উত্তীর্ণ করা হয়েছে।`,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'PROMOTION_FAILED', details: error.message },
      });
    }
  }
}

export const studentController = new StudentController();
