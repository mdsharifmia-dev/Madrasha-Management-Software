import crypto from 'crypto';
import { Student } from '@madrasha/shared-types';
import { formatStudentCode, maskPhoneNumber } from '@madrasha/utils';
import { encryptField, decryptField } from '../../utils/crypto.js';
import {
  Department,
  ClassRoom,
  Section,
  CreateStudentInput,
  StudentFilterQuery,
  IdCardData,
} from './student.types.js';

// Pre-seeded Academic Structure for testing (Default Qawmi & Alia Jammats)
const departments: Department[] = [
  { id: 'dept-01', nameBn: 'হিফজুল কুরআন বিভাগ', type: 'HIFZ', sortOrder: 1, isActive: true },
  { id: 'dept-02', nameBn: 'কিতাব বিভাগ', type: 'KITAB', sortOrder: 2, isActive: true },
  { id: 'dept-03', nameBn: 'নূরানী ও নাজেরা বিভাগ', type: 'NURANI', sortOrder: 3, isActive: true },
];

const classes: ClassRoom[] = [
  {
    id: 'cls-01',
    departmentId: 'dept-01',
    nameBn: 'হিফজ ৩য় বর্ষ (আমুক্তা)',
    academicYear: 2026,
    hijriYear: '১৪৪৭-১৪৪৮',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cls-02',
    departmentId: 'dept-02',
    nameBn: 'দাওরায়ে হাদিস (মাস্টার্স সমমান)',
    nameAr: 'تكميل الحديث الشريف',
    academicYear: 2026,
    hijriYear: '১৪৪৭-১৪৪৮',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cls-03',
    departmentId: 'dept-02',
    nameBn: 'শরহে বেকায়া জামাত',
    academicYear: 2026,
    hijriYear: '১৪৪৭-১৪৪৮',
    sortOrder: 3,
    isActive: true,
  },
];

const sections: Section[] = [
  { id: 'sec-01', classId: 'cls-01', name: 'ক', capacity: 35 },
  { id: 'sec-02', classId: 'cls-02', name: 'ক', capacity: 60 },
  { id: 'sec-03', classId: 'cls-03', name: 'ক', capacity: 45 },
];

// In-Memory Students Store (Tenant Isolated)
const studentsStore: (Student & {
  birthCertEnc?: string;
  guardianPhoneEnc?: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianAddress?: string;
})[] = [
  {
    id: 'stu-001',
    studentCode: 'DHK-2026-0001',
    nameBn: 'মুহাম্মদ আব্দুল্লাহ',
    nameEn: 'Muhammad Abdullah',
    dob: '2010-05-15',
    gender: 'MALE',
    bloodGroup: 'B+',
    classId: 'cls-01',
    className: 'হিফজ ৩য় বর্ষ (আমুক্তা)',
    sectionId: 'sec-01',
    sectionName: 'ক',
    rollNo: 1,
    boardingType: 'BOARDING',
    eatsAtHostel: true,
    admissionDate: '2026-01-05',
    status: 'ACTIVE',
    guardianName: 'মো: রফিকুল ইসলাম',
    guardianPhoneEnc: encryptField('01711223344'),
  },
  {
    id: 'stu-002',
    studentCode: 'DHK-2026-0002',
    nameBn: 'মুহাম্মদ আবু বকর',
    nameEn: 'Muhammad Abu Bakr',
    dob: '2005-08-20',
    gender: 'MALE',
    bloodGroup: 'O+',
    classId: 'cls-02',
    className: 'দাওরায়ে হাদিস (মাস্টার্স সমমান)',
    sectionId: 'sec-02',
    sectionName: 'ক',
    rollNo: 2,
    boardingType: 'BOARDING',
    eatsAtHostel: true,
    admissionDate: '2026-01-08',
    status: 'ACTIVE',
    guardianName: 'মাওলানা জালাল উদ্দিন',
    guardianPhoneEnc: encryptField('01822334455'),
  },
];

let studentSequenceCounter = 2;

export class StudentService {
  /**
   * 1. Get Academic Structure (Departments & Classes)
   */
  async getAcademicStructure() {
    return {
      departments,
      classes,
      sections,
    };
  }

  /**
   * 2. Student Admission
   * Uses sequence-based code generation and encrypts sensitive PII
   */
  async admitStudent(input: CreateStudentInput, districtPrefix: string = 'DHK'): Promise<Student> {
    studentSequenceCounter += 1;
    const year = new Date().getFullYear();
    const studentCode = formatStudentCode(districtPrefix, year, studentSequenceCounter);

    const targetClass = classes.find((c) => c.id === input.classId);
    if (!targetClass) {
      throw new Error('নির্বাচিত শ্রেণি/জামাতটি ডাটাবেসে পাওয়া যায়নি।');
    }

    const targetSection = input.sectionId ? sections.find((s) => s.id === input.sectionId) : undefined;

    const studentRecord = {
      id: crypto.randomUUID(),
      studentCode,
      nameBn: input.nameBn,
      nameEn: input.nameEn,
      nameAr: input.nameAr,
      dob: input.dob,
      gender: input.gender,
      bloodGroup: input.bloodGroup,
      birthCertEnc: input.birthCertNo ? encryptField(input.birthCertNo) : undefined,
      classId: input.classId,
      className: targetClass.nameBn,
      sectionId: input.sectionId,
      sectionName: targetSection?.name,
      rollNo: input.rollNo || studentSequenceCounter,
      boardingType: input.boardingType,
      eatsAtHostel: input.eatsAtHostel,
      admissionDate: new Date().toISOString().split('T')[0]!,
      status: 'ACTIVE' as const,
      guardianName: input.guardianName,
      guardianRelation: input.guardianRelation,
      guardianPhoneEnc: encryptField(input.guardianPhone),
      guardianAddress: input.guardianAddress,
    };

    studentsStore.push(studentRecord);

    return {
      id: studentRecord.id,
      studentCode: studentRecord.studentCode,
      nameBn: studentRecord.nameBn,
      nameEn: studentRecord.nameEn,
      nameAr: studentRecord.nameAr,
      dob: studentRecord.dob,
      gender: studentRecord.gender,
      bloodGroup: studentRecord.bloodGroup,
      classId: studentRecord.classId,
      className: studentRecord.className,
      sectionId: studentRecord.sectionId,
      sectionName: studentRecord.sectionName,
      rollNo: studentRecord.rollNo,
      boardingType: studentRecord.boardingType,
      eatsAtHostel: studentRecord.eatsAtHostel,
      admissionDate: studentRecord.admissionDate,
      status: studentRecord.status,
    };
  }

  /**
   * 3. Filtered Student Directory
   */
  async getStudents(query: StudentFilterQuery) {
    let result = [...studentsStore];

    if (query.classId) {
      result = result.filter((s) => s.classId === query.classId);
    }

    if (query.sectionId) {
      result = result.filter((s) => s.sectionId === query.sectionId);
    }

    if (query.boardingType) {
      result = result.filter((s) => s.boardingType === query.boardingType);
    }

    if (query.status) {
      result = result.filter((s) => s.status === query.status);
    }

    if (query.bloodGroup) {
      result = result.filter((s) => s.bloodGroup === query.bloodGroup);
    }

    if (query.search) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.nameBn.toLowerCase().includes(term) ||
          s.studentCode.toLowerCase().includes(term) ||
          (s.nameEn && s.nameEn.toLowerCase().includes(term))
      );
    }

    const page = query.page || 1;
    const limit = query.limit || 25;
    const startIndex = (page - 1) * limit;

    return {
      total: result.length,
      page,
      limit,
      students: result.slice(startIndex, startIndex + limit),
    };
  }

  /**
   * 4. Digital QR ID Card Generation
   */
  async generateIdCard(studentId: string): Promise<IdCardData> {
    const student = studentsStore.find((s) => s.id === studentId);
    if (!student) {
      throw new Error('ছাত্রের তথ্য পাওয়া যায়নি।');
    }

    const guardianPhone = student.guardianPhoneEnc ? decryptField(student.guardianPhoneEnc) : '';
    const maskedPhone = maskPhoneNumber(guardianPhone);

    return {
      studentCode: student.studentCode,
      nameBn: student.nameBn,
      nameEn: student.nameEn,
      className: student.className,
      sectionName: student.sectionName,
      rollNo: student.rollNo,
      bloodGroup: student.bloodGroup,
      guardianPhoneMasked: maskedPhone,
      qrVerificationUrl: `https://madrasha.app/verify/student?code=${student.studentCode}`,
      validUntil: '2026-12-31',
    };
  }

  /**
   * 5. Year-End Batch Student Promotion
   * Promotes all students of currentClassId to nextClassId
   */
  async promoteStudents(currentClassId: string, nextClassId: string) {
    const targetNextClass = classes.find((c) => c.id === nextClassId);
    if (!targetNextClass) {
      throw new Error('পরবর্তী শ্রেণি/জামাতটি খুঁজে পাওয়া যায়নি।');
    }

    let promotedCount = 0;
    studentsStore.forEach((s) => {
      if (s.classId === currentClassId && s.status === 'ACTIVE') {
        s.classId = nextClassId;
        s.className = targetNextClass.nameBn;
        promotedCount += 1;
      }
    });

    return {
      promotedCount,
      previousClassId: currentClassId,
      newClassName: targetNextClass.nameBn,
    };
  }
}

export const studentService = new StudentService();
