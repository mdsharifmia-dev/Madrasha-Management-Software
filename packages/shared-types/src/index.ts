// ==============================================================================
// জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম — Shared TypeScript Domain Types
// ==============================================================================

// Madrasa Types
export type MadrasaType = 'QAWMI' | 'ALIA' | 'HAFIZIYA' | 'NURANI' | 'MIXED';

export type MadrasaStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';

export interface MadrasaProfile {
  id: string;
  schemaName: string; // e.g. "m_001"
  code: string; // e.g. "MDR-001"
  nameBn: string;
  nameEn?: string;
  type: MadrasaType;
  subType?: string;
  division: string;
  district: string;
  thana: string;
  address?: string;
  gpsLat?: number;
  gpsLng?: number;
  muhtamimName: string;
  muhtamimPhone: string;
  muhtamimEmail?: string;
  status: MadrasaStatus;
  planId: string;
  studentCount: number;
  staffCount: number;
  smsBalance: number;
  storageUsedMb: number;
  createdAt: string;
  updatedAt: string;
}

// User & Role Types
export type SystemRole =
  | 'SUPER_ADMIN'
  | 'AGENCY_STAFF'
  | 'MUHTAMIM'
  | 'NAIB_MUHTAMIM'
  | 'ACCOUNTANT'
  | 'CASHIER'
  | 'AUDITOR'
  | 'TEACHER'
  | 'EXAM_CONTROLLER'
  | 'HOSTEL_WARDEN'
  | 'PARENT'
  | 'STUDENT';

export interface ModulePermissions {
  read: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  approve?: boolean;
  export?: boolean;
}

export interface RolePermissions {
  students?: ModulePermissions;
  fees?: ModulePermissions;
  ledger?: ModulePermissions;
  payroll?: ModulePermissions;
  exams?: ModulePermissions;
  attendance?: ModulePermissions;
  hifz?: ModulePermissions;
  hostel?: ModulePermissions;
  library?: ModulePermissions;
  notices?: ModulePermissions;
  auditLog?: { read: boolean };
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  totpEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

// Student & Academic Types
export type BoardingType = 'DAY' | 'BOARDING' | 'EXTERNAL';
export type StudentStatus = 'ACTIVE' | 'TC' | 'DROPOUT' | 'GRADUATED' | 'DECEASED';

export interface Student {
  id: string;
  studentCode: string; // Sequence: DHK-2025-0001
  nameBn: string;
  nameEn?: string;
  nameAr?: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  bloodGroup?: string;
  classId: string;
  className: string;
  sectionId?: string;
  sectionName?: string;
  rollNo?: number;
  boardingType: BoardingType;
  eatsAtHostel: boolean;
  admissionDate: string;
  status: StudentStatus;
  photoUrl?: string;
}

// Attendance Types
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE' | 'HOLIDAY';
export type AttendanceSource = 'MANUAL' | 'BIOMETRIC' | 'QR_SCAN' | 'APP';

export interface StudentAttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string; // YYYY-MM-DD (Asia/Dhaka)
  status: AttendanceStatus;
  source: AttendanceSource;
  markedBy: string;
  markedAt: string;
}

// Hifz Progress Types
export type HifzQuality = 'MUMTAZ' | 'JAYYID_JIDDAN' | 'JAYYID' | 'MAQBUL' | 'RASIB';

export interface HifzProgressRecord {
  id: string;
  studentId: string;
  teacherId: string;
  date: string;
  sabaqFrom: number; // Page 1-604
  sabaqTo: number;
  sabqiFrom?: number;
  sabqiTo?: number;
  manzilFrom?: number;
  manzilTo?: number;
  quality: HifzQuality;
  notes?: string;
}

// Finance & Fee Types
export type FundType =
  | 'GENERAL'
  | 'ZAKAH'
  | 'SADAQAH'
  | 'LILLAH'
  | 'WAQF'
  | 'CONSTRUCTION'
  | 'QURBANI'
  | 'OTHER';

export type PaymentMethod = 'CASH' | 'BKASH' | 'NAGAD' | 'ROCKET' | 'CARD' | 'BANK';

export type InvoiceStatus = 'UNPAID' | 'PARTIAL' | 'PAID' | 'WAIVED' | 'CANCELLED';

export interface FeeReceipt {
  id: string;
  receiptNo: string; // Sequence: REC-2025-00001
  invoiceId: string;
  studentId: string;
  amountReceived: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  fundId: string;
  accountId: string;
  cashierId: string;
  receivedAt: string;
  isReversed: boolean;
}

// API Response Envelope
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    timestamp: string;
  };
}

// ==============================================================================
// Hostel, Meals & Gatepass Types (Phase 8)
// ==============================================================================

export interface HostelRoom {
  id: string;
  roomNo: string;
  floor: number;
  capacity: number;
  occupied: number;
  isActive: boolean;
}

export interface StudentRoomAssignment {
  id: string;
  studentId: string;
  studentName?: string;
  roomId: string;
  roomNo?: string;
  bedNo?: number;
  assignedFrom: string;
  assignedTo?: string;
}

export type MealSession = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export interface HostelMealRecord {
  id: string;
  studentId: string;
  studentName?: string;
  date: string; // YYYY-MM-DD
  session: MealSession;
  isTaken: boolean;
  fundType: FundType; // LILLAH or GENERAL
  recordedBy?: string;
  recordedAt: string;
}

export type GatepassStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'USED' | 'EXPIRED';

export interface GatepassRecord {
  id: string;
  passNo: string; // GP-2026-00001
  studentId: string;
  studentName?: string;
  studentCode?: string;
  requestedBy: string; // Guardian user id
  guardianPhone?: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: GatepassStatus;
  approvedBy?: string;
  approvedAt?: string;
  qrToken?: string;
  exitScannedAt?: string;
  returnScannedAt?: string;
  createdAt: string;
}

// ==============================================================================
// Library & Books Types (Phase 8)
// ==============================================================================

export interface LibraryBook {
  id: string;
  accessionNo: string;
  titleBn: string;
  titleAr?: string;
  titleUrdu?: string;
  author: string;
  publisher?: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfNo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface BookIssueRecord {
  id: string;
  bookId: string;
  bookTitle?: string;
  accessionNo?: string;
  studentId?: string;
  studentName?: string;
  userId?: string;
  userName?: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  isReturned: boolean;
  issuedBy: string;
  returnedBy?: string;
}

// ==============================================================================
// Befaq & Board Exam Export Types (Phase 6)
// ==============================================================================

export interface BefaqStudentExport {
  registrationNo: string;
  rollNo: number;
  studentCode: string;
  nameBn: string;
  nameAr?: string;
  fatherNameBn: string;
  marhala: string; // তাকমিল / ফজিলত / সানাবিয়া উলইয়া
  madrasaIlhaqNo: string;
  academicYear: number;
  subjects: {
    subjectNameBn: string;
    subjectNameAr?: string;
    marks?: number;
  }[];
}

export interface TabulationRecord {
  studentId: string;
  studentCode: string;
  nameBn: string;
  rollNo: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  gradeBn: string;
  rank: number;
  status: 'PASSED' | 'FAILED';
}

// ==============================================================================
// Finance Maker-Checker & Cashier Closing Types (Phase 4)
// ==============================================================================

export interface FeeWaiverRequest {
  id: string;
  invoiceId: string;
  studentId: string;
  studentName?: string;
  originalAmount: number;
  requestedWaiverAmount: number;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  reviewedAt?: string;
}

export interface SalarySheetRecord {
  id: string;
  payrollNo: string;
  userId: string;
  staffName: string;
  monthYear: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PAID';
  preparedBy: string;
  approvedBy?: string;
  paidAt?: string;
}

export interface CashierClosingRecord {
  id: string;
  cashierId: string;
  date: string;
  systemTotalAmount: number;
  physicalHandCount: number;
  discrepancy: number; // physical - system
  notes?: string;
  closedAt: string;
  status: 'RECONCILED' | 'DISCREPANCY';
}

// ==============================================================================
// Communication, Notices & SMS Log Types (Phase 8)
// ==============================================================================

export type TargetAudienceType = 'ALL' | 'CLASS' | 'DEPARTMENT' | 'ROLE' | 'INDIVIDUAL';

export interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  targetType: TargetAudienceType;
  targetIds: string[];
  isPublished: boolean;
  publishedAt?: string;
  publishedBy?: string;
  createdAt: string;
}

export type SmsDeliveryStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED';

export interface SmsLogRecord {
  id: string;
  recipientPhone: string;
  message: string;
  gateway: string;
  gatewayMsgId?: string;
  status: SmsDeliveryStatus;
  costUnit: number;
  sentAt?: string;
  createdAt: string;
}
