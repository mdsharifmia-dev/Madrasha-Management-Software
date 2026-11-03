import { BoardingType, StudentStatus } from '@madrasha/shared-types';

export interface Department {
  id: string;
  nameBn: string;
  nameAr?: string;
  type: 'HIFZ' | 'NAZIRAH' | 'KITAB' | 'GENERAL' | 'IBTIDAYI' | 'OTHER' | 'NURANI';
  sortOrder: number;
  isActive: boolean;
}

export interface ClassRoom {
  id: string;
  departmentId: string;
  nameBn: string; // e.g. "তাকমিল / দাওরায়ে হাদিস" or "আলিম ১ম বর্ষ"
  nameAr?: string;
  academicYear: number;
  hijriYear?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Section {
  id: string;
  classId: string;
  name: string; // "ক", "খ", "গ"
  capacity: number;
}

export interface CreateStudentInput {
  nameBn: string;
  nameEn?: string;
  nameAr?: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  bloodGroup?: string;
  birthCertNo?: string;
  nidNo?: string;
  classId: string;
  sectionId?: string;
  rollNo?: number;
  boardingType: BoardingType;
  eatsAtHostel: boolean;
  guardianName: string;
  guardianRelation: 'FATHER' | 'MOTHER' | 'GUARDIAN' | 'OTHER';
  guardianPhone: string;
  guardianAddress?: string;
  healthNotes?: string;
}

export interface StudentFilterQuery {
  classId?: string;
  sectionId?: string;
  boardingType?: BoardingType;
  status?: StudentStatus;
  bloodGroup?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IdCardData {
  studentCode: string;
  nameBn: string;
  nameEn?: string;
  className: string;
  sectionName?: string;
  rollNo?: number;
  bloodGroup?: string;
  guardianPhoneMasked: string;
  qrVerificationUrl: string;
  validUntil: string;
}
