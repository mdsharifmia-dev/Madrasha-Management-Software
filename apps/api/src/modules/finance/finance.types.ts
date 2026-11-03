import { FundType, PaymentMethod, InvoiceStatus } from '@madrasha/shared-types';

export interface Fund {
  id: string;
  name: string;
  type: FundType;
  currentBalance: number;
  isActive: boolean;
}

export interface ChartOfAccount {
  id: string;
  code: string; // e.g. "4-001"
  nameBn: string;
  accountType: 'INCOME' | 'EXPENSE' | 'ASSET' | 'LIABILITY';
  fundId: string;
  isActive: boolean;
}

export interface FeeStructure {
  id: string;
  classId: string;
  academicYear: number;
  feeType: 'ADMISSION' | 'MONTHLY' | 'HOSTEL' | 'EXAM' | 'FINE' | 'OTHER';
  name: string;
  amount: number;
  fundId: string;
  accountId: string;
}

export interface StudentInvoice {
  id: string;
  invoiceNo: string; // INV-2026-00001
  studentId: string;
  studentCode: string;
  studentName: string;
  feeStructureId: string;
  monthYear: string; // "2026-01"
  amountDue: number;
  discountAmount: number;
  discountApprovedBy?: string;
  discountReason?: string;
  paidAmount: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
}

export interface FeeReceipt {
  id: string;
  receiptNo: string; // REC-2026-00001
  invoiceId: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  amountReceived: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  fundId: string;
  fundName: string;
  accountId: string;
  cashierId: string;
  receivedAt: string; // Asia/Dhaka ISO
  isReversed: boolean;
  reversalReason?: string;
}

export interface CollectFeeInput {
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  cashierId: string;
}

export interface DailyCashierClosing {
  date: string;
  cashierId: string;
  totalCollectedCash: number;
  totalCollectedDigital: number;
  totalReceiptsCount: number;
  handCashReported: number;
  discrepancy: number; // handCash - totalCollectedCash
  isClosed: boolean;
}

export interface FeeWaiver {
  id: string;
  invoiceId: string;
  studentId: string;
  originalAmount: number;
  requestedWaiverAmount: number;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  reviewedAt?: string;
}

export interface SalaryEntryInput {
  userId: string;
  staffName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  fundId: string;
}

export interface SalarySheet {
  id: string;
  payrollNo: string;
  monthYear: string;
  entries: {
    userId: string;
    staffName: string;
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    fundId: string;
  }[];
  totalAmount: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PAID';
  preparedBy: string;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
  createdAt: string;
}

export interface JournalLineInput {
  accountId: string;
  fundId: string;
  debitAmount: number;
  creditAmount: number;
}

export interface JournalEntryRecord {
  id: string;
  entryNo: string;
  entryDate: string;
  description: string;
  sourceType: string;
  sourceId?: string;
  preparedBy: string;
  approvedBy?: string;
  approvedAt?: string;
  isReversed: boolean;
  lines: JournalLineInput[];
  createdAt: string;
}
