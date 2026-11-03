import crypto from 'crypto';
import { formatReceiptNumber, getDhakaTimeString, getDhakaDateString } from '@madrasha/utils';
import {
  Fund,
  ChartOfAccount,
  FeeStructure,
  StudentInvoice,
  FeeReceipt,
  CollectFeeInput,
  DailyCashierClosing,
} from './finance.types.js';

// Pre-seeded Shariah Funds
const fundsStore: Fund[] = [
  { id: 'fund-01', name: 'সাধারণ তহবিল (General Fund)', type: 'GENERAL', currentBalance: 450000, isActive: true },
  { id: 'fund-02', name: 'লিল্লাহ বোর্ডিং ও খাদ্য তহবিল (Lillah Boarding)', type: 'LILLAH', currentBalance: 280000, isActive: true },
  { id: 'fund-03', name: 'যাকাত তহবিল (Zakat Fund - Shariah Restricted)', type: 'ZAKAH', currentBalance: 520000, isActive: true },
  { id: 'fund-04', name: 'মসজিদ ও মাদ্রাসা নির্মাণ তহবিল (Construction)', type: 'CONSTRUCTION', currentBalance: 850000, isActive: true },
];

// Pre-seeded Chart of Accounts
const chartOfAccountsStore: ChartOfAccount[] = [
  { id: 'acc-01', code: '4-001', nameBn: 'মাসিক টিউশন ফি আদায়', accountType: 'INCOME', fundId: 'fund-01', isActive: true },
  { id: 'acc-02', code: '4-002', nameBn: 'বোর্ডিং খাদ্য চার্জ', accountType: 'INCOME', fundId: 'fund-02', isActive: true },
  { id: 'acc-03', code: '4-003', nameBn: 'ভর্তি ফি আয়', accountType: 'INCOME', fundId: 'fund-01', isActive: true },
  { id: 'acc-04', code: '4-004', nameBn: 'যাকাত অনুদান আয়', accountType: 'INCOME', fundId: 'fund-03', isActive: true },
  { id: 'acc-05', code: '5-001', nameBn: 'উস্তাদ ও স্টাফ বেতন খরচ', accountType: 'EXPENSE', fundId: 'fund-01', isActive: true },
  { id: 'acc-06', code: '5-002', nameBn: 'দৈনিক মেস বাজার খরচ', accountType: 'EXPENSE', fundId: 'fund-02', isActive: true },
];

// Fee Structures
const feeStructuresStore: FeeStructure[] = [
  { id: 'str-01', classId: 'cls-01', academicYear: 2026, feeType: 'MONTHLY', name: 'হিফজ মাসিক টিউশন ফি', amount: 1500, fundId: 'fund-01', accountId: 'acc-01' },
  { id: 'str-02', classId: 'cls-01', academicYear: 2026, feeType: 'HOSTEL', name: 'হিফজ বোর্ডিং ও খাবার ফি', amount: 3500, fundId: 'fund-02', accountId: 'acc-02' },
  { id: 'str-03', classId: 'cls-02', academicYear: 2026, feeType: 'MONTHLY', name: 'দাওরায়ে হাদিস মাসিক ফি', amount: 1000, fundId: 'fund-01', accountId: 'acc-01' },
];

// Invoices Store
const invoicesStore: StudentInvoice[] = [
  {
    id: 'inv-001',
    invoiceNo: 'INV-2026-00001',
    studentId: 'stu-001',
    studentCode: 'DHK-2026-0001',
    studentName: 'মুহাম্মদ আব্দুল্লাহ',
    feeStructureId: 'str-01',
    monthYear: '2026-01',
    amountDue: 1500,
    discountAmount: 0,
    paidAmount: 0,
    status: 'UNPAID',
    dueDate: '2026-01-15',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'inv-002',
    invoiceNo: 'INV-2026-00002',
    studentId: 'stu-001',
    studentCode: 'DHK-2026-0001',
    studentName: 'মুহাম্মদ আব্দুল্লাহ',
    feeStructureId: 'str-02',
    monthYear: '2026-01',
    amountDue: 3500,
    discountAmount: 500, // Shariah waiver/scholarship
    discountApprovedBy: 'principal-001',
    discountReason: 'মেধাবী ও হাফেজ ছাত্রের জন্য বোর্ডিং খাদ্য ছাড়',
    paidAmount: 0,
    status: 'UNPAID',
    dueDate: '2026-01-15',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

// Immutable Receipts Store (No UPDATE/DELETE allowed)
const receiptsStore: FeeReceipt[] = [];
let receiptSequenceCounter = 0;

// Processed Online Transaction IDs (Idempotency Cache)
const processedTransactionIds = new Set<string>();

export class FinanceService {
  /**
   * 1. Get Shariah Funds & Current Balances
   */
  async getFunds(): Promise<Fund[]> {
    return fundsStore;
  }

  /**
   * 2. Get Chart of Accounts
   */
  async getChartOfAccounts(): Promise<ChartOfAccount[]> {
    return chartOfAccountsStore;
  }

  /**
   * 3. Get Student Invoices (Filter by student or status)
   */
  async getInvoices(studentId?: string, status?: string): Promise<StudentInvoice[]> {
    let result = [...invoicesStore];
    if (studentId) {
      result = result.filter((inv) => inv.studentId === studentId);
    }
    if (status) {
      result = result.filter((inv) => inv.status === status);
    }
    return result;
  }

  async createInvoice(input: {
    studentId: string;
    studentCode: string;
    studentName: string;
    feeStructureId: string;
    monthYear: string;
    amountDue: number;
    dueDate: string;
  }): Promise<StudentInvoice> {
    const seq = String(invoicesStore.length + 1).padStart(5, '0');
    const invoice: StudentInvoice = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      invoiceNo: `INV-2026-${seq}`,
      ...input,
      discountAmount: 0,
      paidAmount: 0,
      status: 'UNPAID',
      createdAt: new Date().toISOString(),
    };
    invoicesStore.push(invoice);
    return invoice;
  }

  /**
   * 4. Cash Counter POS Fee Collection (Atomic Database Transaction Simulation)
   * Enforces sequential receipt numbers and updates Fund balances atomically
   */
  async collectFee(input: CollectFeeInput): Promise<FeeReceipt> {
    const invoice = invoicesStore.find((inv) => inv.id === input.invoiceId);
    if (!invoice) {
      throw new Error('ইনভয়েসটি ডাটাবেসে পাওয়া যায়নি।');
    }

    if (invoice.status === 'PAID') {
      throw new Error('এই ইনভয়েসটি ইতিমধ্যে পরিশোধিত হয়েছে।');
    }

    const netPayable = invoice.amountDue - invoice.discountAmount;
    if (input.amount <= 0 || input.amount > netPayable) {
      throw new Error(`ভুল টাকার পরিমাণ। প্রদেয় অবশিষ্ট পরিমাণ: ৳${netPayable}`);
    }

    // Identify corresponding Fee Structure and Shariah Fund
    const feeStructure = feeStructuresStore.find((s) => s.id === invoice.feeStructureId);
    const fundId = feeStructure?.fundId || 'fund-01';
    const accountId = feeStructure?.accountId || 'acc-01';
    const fund = fundsStore.find((f) => f.id === fundId);

    // Increment Sequence Counter and format Receipt No (REC-2026-00001)
    receiptSequenceCounter += 1;
    const year = new Date().getFullYear();
    const receiptNo = formatReceiptNumber(receiptSequenceCounter, year);

    // Create Immutable Receipt Record
    const receipt: FeeReceipt = {
      id: crypto.randomUUID(),
      receiptNo,
      invoiceId: invoice.id,
      studentId: invoice.studentId,
      studentCode: invoice.studentCode,
      studentName: invoice.studentName,
      amountReceived: input.amount,
      paymentMethod: input.paymentMethod,
      transactionId: input.transactionId,
      fundId,
      fundName: fund?.name || 'সাধারণ তহবিল',
      accountId,
      cashierId: input.cashierId,
      receivedAt: getDhakaTimeString(),
      isReversed: false,
    };

    // ATOMIC TRANSACTION: Update Invoice, Append Receipt, Update Fund
    receiptsStore.push(receipt);
    invoice.paidAmount += input.amount;

    if (invoice.paidAmount >= netPayable) {
      invoice.status = 'PAID';
    } else {
      invoice.status = 'PARTIAL';
    }

    if (fund) {
      fund.currentBalance += input.amount;
    }

    return receipt;
  }

  /**
   * 5. Receipt Reversal (Audit-safe error correction)
   * In strict accordance with accounting rules, receipts are NEVER deleted or modified.
   * Instead, a reversal record is logged, and fund balance is adjusted back.
   */
  async reverseReceipt(receiptId: string, reason: string, authorizedBy: string) {
    const receipt = receiptsStore.find((r) => r.id === receiptId);
    if (!receipt) {
      throw new Error('রসিদটি পাওয়া যায়নি।');
    }

    if (receipt.isReversed) {
      throw new Error('এই রসিদটি পূর্বে একবার রিভার্স করা হয়েছে।');
    }

    const invoice = invoicesStore.find((inv) => inv.id === receipt.invoiceId);
    const fund = fundsStore.find((f) => f.id === receipt.fundId);

    // Mark receipt as reversed
    receipt.isReversed = true;
    receipt.reversalReason = `${reason} (অনুমোদনকারী: ${authorizedBy})`;

    // Revert fund and invoice balances
    if (invoice) {
      invoice.paidAmount -= receipt.amountReceived;
      invoice.status = invoice.paidAmount > 0 ? 'PARTIAL' : 'UNPAID';
    }

    if (fund) {
      fund.currentBalance -= receipt.amountReceived;
    }

    return {
      message: `রসিদ ${receipt.receiptNo} সফলভাবে রিভার্স করা হয়েছে এবং তহবিল ব্যালেন্স সমন্বয় করা হয়েছে।`,
      receipt,
    };
  }

  /**
   * 6. Online Payment Gateway Integration (bKash, Nagad, SSLCommerz)
   * Includes Idempotency Check & Server-Side Verification
   */
  async processOnlinePayment(
    invoiceId: string,
    gateway: 'BKASH' | 'NAGAD' | 'SSLCOMMERZ',
    transactionId: string,
    amount: number
  ) {
    // Idempotency check: Reject duplicate webhook/calls
    if (processedTransactionIds.has(transactionId)) {
      throw new Error(`এই ট্রানজেকশন (${transactionId}) ইতিমধ্যে প্রসেস করা হয়েছে।`);
    }

    const invoice = invoicesStore.find((inv) => inv.id === invoiceId);
    if (!invoice) throw new Error('ইনভয়েস পাওয়া যায়নি।');

    const netPayable = invoice.amountDue - invoice.discountAmount;
    if (amount !== netPayable) {
      throw new Error(`গেটের টাকার পরিমাণ (৳${amount}) ইনভয়েসের নিট টাকার (৳${netPayable}) সাথে মেলেনি।`);
    }

    // Process fee collection
    const receipt = await this.collectFee({
      invoiceId,
      amount,
      paymentMethod: gateway as any,
      transactionId,
      cashierId: `SYSTEM_GATEWAY_${gateway}`,
    });

    processedTransactionIds.add(transactionId);
    return receipt;
  }

  /**
   * 7. Daily Cashier Closing Report
   */
  async getDailyCashierClosing(cashierId: string, handCashReported: number): Promise<DailyCashierClosing> {
    const today = getDhakaDateString();

    const todayReceipts = receiptsStore.filter(
      (r) => r.cashierId === cashierId && !r.isReversed && r.receivedAt.startsWith(today)
    );

    let totalCollectedCash = 0;
    let totalCollectedDigital = 0;

    todayReceipts.forEach((r) => {
      if (r.paymentMethod === 'CASH') {
        totalCollectedCash += r.amountReceived;
      } else {
        totalCollectedDigital += r.amountReceived;
      }
    });

    const discrepancy = handCashReported - totalCollectedCash;

    return {
      date: today,
      cashierId,
      totalCollectedCash,
      totalCollectedDigital,
      totalReceiptsCount: todayReceipts.length,
      handCashReported,
      discrepancy,
      isClosed: true,
    };
  }

  // ----------------------------------------------------------------------------
  // 8. Maker-Checker: Fee Waiver / Discount Workflow
  // ----------------------------------------------------------------------------
  private feeWaiversStore: any[] = [];

  async requestFeeWaiver(input: {
    invoiceId: string;
    studentId: string;
    waiverAmount: number;
    reason: string;
    requestedBy: string;
  }) {
    const invoice = invoicesStore.find((inv) => inv.id === input.invoiceId);
    if (!invoice) throw new Error('ইনভয়েস পাওয়া যায়নি।');

    if (input.waiverAmount <= 0 || input.waiverAmount > invoice.amountDue) {
      throw new Error(`ছাড়ের পরিমাণ সর্বোচ্চ ৳${invoice.amountDue} হতে পারে।`);
    }

    const waiver = {
      id: `waiver-${Date.now()}`,
      invoiceId: input.invoiceId,
      studentId: input.studentId,
      originalAmount: invoice.amountDue,
      requestedWaiverAmount: input.waiverAmount,
      reason: input.reason,
      requestedBy: input.requestedBy,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.feeWaiversStore.push(waiver);
    return waiver;
  }

  async approveFeeWaiver(waiverId: string, approvedBy: string) {
    const waiver = this.feeWaiversStore.find((w) => w.id === waiverId);
    if (!waiver) throw new Error('ছাড়ের আবেদন পাওয়া যায়নি।');
    if (waiver.status !== 'PENDING') throw new Error(`আবেদনটি ইতিমধ্যে ${waiver.status} অবস্থায় আছে।`);

    const invoice = invoicesStore.find((inv) => inv.id === waiver.invoiceId);
    if (!invoice) throw new Error('সংশ্লিষ্ট ইনভয়েসটি পাওয়া যায়নি।');

    waiver.status = 'APPROVED';
    waiver.approvedBy = approvedBy;
    waiver.reviewedAt = new Date().toISOString();

    // Apply discount to invoice
    invoice.discountAmount = waiver.requestedWaiverAmount;
    invoice.discountApprovedBy = approvedBy;
    invoice.discountReason = waiver.reason;

    return {
      success: true,
      message: `৳${waiver.requestedWaiverAmount} টাকার ছাড় সফলভাবে অনুমোদিত হয়েছে।`,
      waiver,
      invoice,
    };
  }

  async rejectFeeWaiver(waiverId: string, rejectedBy: string, reason?: string) {
    const waiver = this.feeWaiversStore.find((w) => w.id === waiverId);
    if (!waiver) throw new Error('ছাড়ের আবেদন পাওয়া যায়নি।');

    waiver.status = 'REJECTED';
    waiver.approvedBy = rejectedBy;
    waiver.reviewedAt = new Date().toISOString();
    waiver.rejectionReason = reason;

    return {
      success: true,
      message: 'ছাড়ের আবেদন প্রত্যাখ্যান করা হয়েছে।',
      waiver,
    };
  }

  async getFeeWaivers(status?: string) {
    if (status) return this.feeWaiversStore.filter((w) => w.status === status);
    return [...this.feeWaiversStore];
  }

  // ----------------------------------------------------------------------------
  // 9. Maker-Checker: Monthly Salary Sheet Workflow
  // ----------------------------------------------------------------------------
  private salarySheetsStore: any[] = [];
  private salarySeqCounter = 1;

  async createSalarySheet(input: {
    monthYear: string; // "2026-01"
    entries: Array<{
      userId: string;
      staffName: string;
      basicSalary: number;
      allowances: number;
      deductions: number;
      fundId: string;
    }>;
    preparedBy: string;
  }) {
    const existing = this.salarySheetsStore.find((s) => s.monthYear === input.monthYear);
    if (existing && existing.status !== 'DRAFT') {
      throw new Error(`${input.monthYear} মাসের বেতন শিট ইতিমধ্যে তৈরি হয়েছে।`);
    }

    const seq = String(this.salarySeqCounter++).padStart(5, '0');
    const payrollNo = `PAY-${input.monthYear.replace('-', '')}-${seq}`;

    let totalAmount = 0;
    const mappedEntries = input.entries.map((e) => {
      const netSalary = e.basicSalary + e.allowances - e.deductions;
      totalAmount += netSalary;
      return {
        ...e,
        netSalary,
      };
    });

    const sheet = {
      id: `salary-${Date.now()}`,
      payrollNo,
      monthYear: input.monthYear,
      entries: mappedEntries,
      totalAmount,
      status: 'SUBMITTED', // Maker prepared and submitted for approval
      preparedBy: input.preparedBy,
      createdAt: new Date().toISOString(),
    };

    this.salarySheetsStore.push(sheet);
    return sheet;
  }

  async approveSalarySheet(sheetId: string, approvedBy: string) {
    const sheet = this.salarySheetsStore.find((s) => s.id === sheetId);
    if (!sheet) throw new Error('বেতন শিট পাওয়া যায়নি।');
    if (sheet.status !== 'SUBMITTED') throw new Error(`শিটটি বর্তমানে ${sheet.status} অবস্থায় আছে, অনুমোদনযোগ্য নয়।`);

    sheet.status = 'APPROVED';
    sheet.approvedBy = approvedBy;
    sheet.approvedAt = new Date().toISOString();

    return {
      success: true,
      message: `${sheet.monthYear} মাসের ৳${sheet.totalAmount} টাকার বেতন শিট মুহতামিম কর্তৃক অনুমোদিত হয়েছে।`,
      sheet,
    };
  }

  async disburseSalary(sheetId: string, _paymentMethod: any = 'BANK') {
    const sheet = this.salarySheetsStore.find((s) => s.id === sheetId);
    if (!sheet) throw new Error('বেতন শিট পাওয়া যায়নি।');
    if (sheet.status !== 'APPROVED') throw new Error('শুধুমাত্র অনুমোদিত বেতন শিট বিতরণ (Disburse) করা যাবে।');

    // Debit expense, credit cash/bank in general fund
    const generalFund = fundsStore.find((f) => f.id === 'fund-01');
    if (generalFund) {
      if (generalFund.currentBalance < sheet.totalAmount) {
        throw new Error(`সাধারণ তহবিলে পর্যাপ্ত অর্থ নেই। বর্তমান ব্যালেন্স: ৳${generalFund.currentBalance}, আবশ্যক: ৳${sheet.totalAmount}`);
      }
      generalFund.currentBalance -= sheet.totalAmount;
    }

    sheet.status = 'PAID';
    sheet.paidAt = new Date().toISOString();

    return {
      success: true,
      message: `${sheet.monthYear} মাসের বেতন সফলভাবে প্রদান করা হয়েছে।`,
      sheet,
      remainingFundBalance: generalFund?.currentBalance,
    };
  }

  async getSalarySheets() {
    return [...this.salarySheetsStore];
  }

  // ----------------------------------------------------------------------------
  // 10. Double-Entry Journal Entries with Balanced Debit/Credit Check
  // ----------------------------------------------------------------------------
  private journalEntriesStore: any[] = [];
  private journalSeq = 1;

  async createJournalEntry(input: {
    entryDate: string;
    description: string;
    sourceType: string;
    sourceId?: string;
    preparedBy: string;
    lines: Array<{
      accountId: string;
      fundId: string;
      debitAmount: number;
      creditAmount: number;
    }>;
  }) {
    let totalDebit = 0;
    let totalCredit = 0;

    input.lines.forEach((l) => {
      totalDebit += l.debitAmount;
      totalCredit += l.creditAmount;
    });

    // Enforce Double-entry constraint: SUM(Debit) === SUM(Credit)
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      throw new Error(`ডাবল-এন্ট্রি নীতি লঙ্ঘন: মোট ডেবিট (৳${totalDebit}) ও মোট ক্রেডিট (৳${totalCredit}) সমান হতে হবে।`);
    }

    const seq = String(this.journalSeq++).padStart(5, '0');
    const entry = {
      id: `jnl-${Date.now()}`,
      entryNo: `JNL-2026-${seq}`,
      entryDate: input.entryDate,
      description: input.description,
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      preparedBy: input.preparedBy,
      lines: input.lines,
      totalAmount: totalDebit,
      isReversed: false,
      createdAt: new Date().toISOString(),
    };

    this.journalEntriesStore.push(entry);
    return entry;
  }

  async getJournalEntries() {
    return [...this.journalEntriesStore];
  }

  // ----------------------------------------------------------------------------
  // 11. Thermal POS Receipt Payload Generator (ESC/POS 58mm / 80mm format)
  // ----------------------------------------------------------------------------
  async getThermalReceiptPayload(receiptId: string, width: 58 | 80 = 58) {
    const receipt = receiptsStore.find((r) => r.id === receiptId);
    if (!receipt) throw new Error('রসিদ পাওয়া যায়নি।');

    const sep = width === 58 ? '--------------------------------' : '------------------------------------------------';
    const lines = [
      '        মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম        ',
      '          ক্যাশ কাউন্টার অফিসিয়াল রসিদ          ',
      sep,
      `রসিদ নং: ${receipt.receiptNo}`,
      `তারিখ:   ${receipt.receivedAt}`,
      `ছাত্রের নাম: ${receipt.studentName}`,
      `ছাত্র কোড:  ${receipt.studentCode}`,
      `তহবিল:     ${receipt.fundName}`,
      `পদ্ধতি:     ${receipt.paymentMethod}`,
      sep,
      `আদায়কৃত অর্থ: ৳${receipt.amountReceived.toFixed(2)}`,
      sep,
      '       আল্লাহ তাআলা কবুল ও বরকত দান করুন       ',
      '          [সফটওয়্যার দ্বারা প্রস্তুতকৃত]          ',
    ];

    return {
      receiptNo: receipt.receiptNo,
      width,
      rawText: lines.join('\n'),
      qrData: `https://madrasha.app/verify/receipt/${receipt.receiptNo}`,
      amount: receipt.amountReceived,
      receivedAt: receipt.receivedAt,
    };
  }
}

export const financeService = new FinanceService();
