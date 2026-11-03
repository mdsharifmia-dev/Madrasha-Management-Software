import { describe, it, expect } from 'vitest';
import { studentService } from './student.service.js';

describe('Part 4: Madrasa Core & Student Admissions Tests', () => {
  // 1. Academic Structure
  it('should fetch departments, classes and sections', async () => {
    const structure = await studentService.getAcademicStructure();
    expect(structure.departments.length).toBeGreaterThan(0);
    expect(structure.classes.length).toBeGreaterThan(0);
    expect(structure.sections.length).toBeGreaterThan(0);
  });

  // 2. Student Admission
  it('should admit a new student with sequential ID and encrypted PII', async () => {
    const input = {
      nameBn: 'মুহাম্মদ হাসান মাহমুদ',
      nameEn: 'Hasan Mahmud',
      dob: '2012-03-10',
      gender: 'MALE' as const,
      bloodGroup: 'A+',
      birthCertNo: '20121234567890123',
      classId: 'cls-01',
      sectionId: 'sec-01',
      boardingType: 'BOARDING' as const,
      eatsAtHostel: true,
      guardianName: 'মো: আব্দুল করিম',
      guardianRelation: 'FATHER' as const,
      guardianPhone: '01712345678',
    };

    const student = await studentService.admitStudent(input, 'DHK');
    expect(student).toBeDefined();
    expect(student.id).toBeDefined();
    expect(student.studentCode).toMatch(/^DHK-\d{4}-\d{4}$/); // e.g. DHK-2026-0003
    expect(student.className).toBe('হিফজ ৩য় বর্ষ (আমুক্তা)');
    expect(student.status).toBe('ACTIVE');
  });

  // 3. Student Filtering
  it('should filter students by classId and boardingType', async () => {
    const result = await studentService.getStudents({
      classId: 'cls-01',
      boardingType: 'BOARDING',
    });

    expect(result.students.length).toBeGreaterThan(0);
    result.students.forEach((s) => {
      expect(s.classId).toBe('cls-01');
      expect(s.boardingType).toBe('BOARDING');
    });
  });

  // 4. Digital QR ID Card
  it('should generate ID card data with masked guardian phone and verification QR URL', async () => {
    const students = await studentService.getStudents({});
    const targetStudent = students.students[0]!;

    const idCard = await studentService.generateIdCard(targetStudent.id);
    expect(idCard).toBeDefined();
    expect(idCard.studentCode).toBe(targetStudent.studentCode);
    expect(idCard.guardianPhoneMasked).toContain('*****');
    expect(idCard.qrVerificationUrl).toContain('/verify/student?code=');
  });

  // 5. Batch Student Promotion
  it('should promote all active students of a class to the next class', async () => {
    const promotionResult = await studentService.promoteStudents('cls-03', 'cls-02');
    expect(promotionResult).toBeDefined();
    expect(promotionResult.newClassName).toBe('দাওরায়ে হাদিস (মাস্টার্স সমমান)');
  });
});
