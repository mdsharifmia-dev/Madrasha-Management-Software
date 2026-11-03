import { AttendanceStatus, AttendanceSource, HifzQuality } from '@madrasha/shared-types';

export interface HifzDailyEntryInput {
  studentId: string;
  teacherId: string;
  date: string; // YYYY-MM-DD
  sabaqFrom: number; // 1-604
  sabaqTo: number;
  sabqiFrom?: number;
  sabqiTo?: number;
  manzilFrom?: number;
  manzilTo?: number;
  quality: HifzQuality;
  notes?: string;
}

export interface StudentAttendanceInput {
  classId: string;
  date: string; // YYYY-MM-DD
  markedBy: string;
  source: AttendanceSource;
  records: {
    studentId: string;
    status: AttendanceStatus;
    notes?: string;
  }[];
}

export interface BiometricPunchInput {
  deviceSerial: string;
  deviceApiKey: string;
  studentCode: string;
  punchTime: string; // ISO
}

export interface ExamInput {
  name: string;
  classId: string;
  examType: 'WEEKLY' | 'MONTHLY' | 'TERM' | 'ANNUAL' | 'SPECIAL';
  startDate: string;
  endDate: string;
}

export interface SubmitMarksInput {
  examId: string;
  subjectId: string;
  teacherId: string;
  results: {
    studentId: string;
    marksObtained: number;
    isAbsent: boolean;
  }[];
}

export interface MarksheetItem {
  studentId: string;
  studentCode: string;
  studentName: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  gpaPoint?: number;
  rank: number;
}

export interface BefaqExportInput {
  classId: string;
  academicYear: number;
  madrasaIlhaqNo: string;
  marhala: string; // তাকমিল / ফজিলত / সানাবিয়া উলইয়া / মুতাওয়াসসিতাহ / ইবতিদায়িয়্যাহ
}

export interface OfflineAttendanceRecord {
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  timestamp: string;
  syncId: string;
}

export interface StaffAttendanceInput {
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status?: AttendanceStatus;
  gpsLat?: number;
  gpsLng?: number;
}
