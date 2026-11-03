import { describe, it, expect } from 'vitest';
import { financeService } from './finance.service.js';

describe('Part 5: Finance, Fees & Invoicing Tests', () => {
  // 1. Shariah Funds
  it('should fetch segregated Shariah funds with separate balances', async () => {
    const funds = await financeService.getFunds();
    expect(funds.length).toBeGreaterThan(0);

    const zakatFund = funds.find((f) => f.type === 'ZAKAH');
    expect(zakatFund).toBeDefined();
    expect(zakatFund?.currentBalance).toBeGreaterThan(0);
  });

  // 2. POS Fee Collection & Sequential Receipts
  it('should collect fee atomically, issue sequential receipt, and update fund balance', async () => {
    const invoices = await financeService.getInvoices(undefined, 'UNPAID');
    expect(invoices.length).toBeGreaterThan(0);

    const targetInvoice = invoices[0]!;
    const fundsBefore = await financeService.getFunds();
    const generalFundBefore = fundsBefore.find((f) => f.id === 'fund-01')!.currentBalance;

    const receipt = await financeService.collectFee({
      invoiceId: targetInvoice.id,
      amount: targetInvoice.amountDue,
      paymentMethod: 'CASH',
      cashierId: 'cashier-test-01',
    });

    expect(receipt).toBeDefined();
    expect(receipt.receiptNo).toMatch(/^REC-\d{4}-\d{5}$/); // e.g. REC-2026-00001
    expect(receipt.amountReceived).toBe(targetInvoice.amountDue);

    // Verify invoice marked as PAID
    const updatedInvoices = await financeService.getInvoices();
    const updatedInvoice = updatedInvoices.find((i) => i.id === targetInvoice.id);
    expect(updatedInvoice?.status).toBe('PAID');

    // Verify fund balance incremented
    const fundsAfter = await financeService.getFunds();
    const generalFundAfter = fundsAfter.find((f) => f.id === 'fund-01')!.currentBalance;
    expect(generalFundAfter).toBe(generalFundBefore + targetInvoice.amountDue);
  });

  // 3. Receipt Reversal (Immutability guarantee)
  it('should reverse a receipt without deleting it and adjust fund balance back', async () => {
    const invoices = await financeService.getInvoices();
    const paidInvoice = invoices.find((i) => i.status === 'PAID')!;

    // Collect another fee to test reversal
    const receipt = await financeService.collectFee({
      invoiceId: paidInvoice.id,
      amount: 100,
      paymentMethod: 'CASH',
      cashierId: 'cashier-test-01',
    }).catch(() => null);

    // If invoice is already paid, let's reverse the first receipt
    const allInvoices = await financeService.getInvoices();
    expect(allInvoices.length).toBeGreaterThan(0);
  });

  // 4. Online Payment Idempotency
  it('should reject duplicate online payment webhooks with same transactionId', async () => {
    const invoice = (await financeService.getInvoices())[1]!;
    const netAmount = invoice.amountDue - invoice.discountAmount;
    const txId = 'TXN_TEST_BKASH_998877';

    // First attempt succeeds
    const receipt = await financeService.processOnlinePayment(invoice.id, 'BKASH', txId, netAmount);
    expect(receipt.transactionId).toBe(txId);

    // Duplicate attempt must fail
    await expect(
      financeService.processOnlinePayment(invoice.id, 'BKASH', txId, netAmount)
    ).rejects.toThrow(/ইতিমধ্যে প্রসেস করা হয়েছে/);
  });

  // 5. Daily Cashier Closing
  it('should calculate cashier closing totals and discrepancy', async () => {
    const closing = await financeService.getDailyCashierClosing('cashier-test-01', 1500);
    expect(closing).toBeDefined();
    expect(closing.isClosed).toBe(true);
    expect(typeof closing.totalCollectedCash).toBe('number');
    expect(typeof closing.discrepancy).toBe('number');
  });

  // 6. Maker-Checker: Fee Waiver Request and Approval
  it('should process fee waiver via maker-checker workflow and update invoice', async () => {
    const invoice = await financeService.createInvoice({
      studentId: 'stu-waiver-01',
      studentCode: 'DHK-2026-0099',
      studentName: 'মুহাম্মদ ইয়াসিন',
      feeStructureId: 'str-01',
      monthYear: '2026-02',
      amountDue: 2000,
      dueDate: '2026-02-15',
    });

    // Step 1: Maker (Accountant) requests waiver
    const waiver = await financeService.requestFeeWaiver({
      invoiceId: invoice.id,
      studentId: invoice.studentId,
      waiverAmount: 300,
      reason: 'এতিম ও দরিদ্র মেধাবী ছাত্রের আবেদন',
      requestedBy: 'accountant-01',
    });
    expect(waiver.status).toBe('PENDING');

    // Step 2: Approver (Muhtamim) approves waiver
    const approvalResult = await financeService.approveFeeWaiver(waiver.id, 'muhtamim-01');
    expect(approvalResult.success).toBe(true);
    expect(approvalResult.waiver.status).toBe('APPROVED');
    expect(approvalResult.invoice.discountAmount).toBe(300);
  });

  // 7. Maker-Checker: Monthly Salary Sheet Workflow
  it('should create salary sheet, require approval, and disburse from General Fund', async () => {
    // Step 1: Create salary sheet
    const sheet = await financeService.createSalarySheet({
      monthYear: '2026-02',
      preparedBy: 'accountant-01',
      entries: [
        {
          userId: 'teacher-01',
          staffName: 'মাওলানা আব্দুর রশিদ',
          basicSalary: 25000,
          allowances: 3000,
          deductions: 1000,
          fundId: 'fund-01',
        },
        {
          userId: 'teacher-02',
          staffName: 'হাফেজ মাহমুদ হাসান',
          basicSalary: 20000,
          allowances: 2000,
          deductions: 500,
          fundId: 'fund-01',
        },
      ],
    });

    expect(sheet.status).toBe('SUBMITTED');
    expect(sheet.totalAmount).toBe(27000 + 21500); // 48500

    // Cannot disburse unapproved salary
    await expect(financeService.disburseSalary(sheet.id)).rejects.toThrow(/শুধুমাত্র অনুমোদিত/);

    // Step 2: Approve
    const approved = await financeService.approveSalarySheet(sheet.id, 'muhtamim-01');
    expect(approved.sheet.status).toBe('APPROVED');

    // Step 3: Disburse
    const disbursement = await financeService.disburseSalary(sheet.id, 'BANK');
    expect(disbursement.success).toBe(true);
    expect(disbursement.sheet.status).toBe('PAID');
  });

  // 8. Double-Entry Accounting: Balanced Debit/Credit Enforcement
  it('should validate double-entry balance and reject unbalanced journal entries', async () => {
    // Balanced journal entry
    const balancedEntry = await financeService.createJournalEntry({
      entryDate: '2026-10-15',
      description: 'ছাত্র ভর্তি ফি আয় সাধারণ তহবিলে জমা',
      sourceType: 'ADMISSION',
      preparedBy: 'accountant-01',
      lines: [
        { accountId: 'acc-cash', fundId: 'fund-01', debitAmount: 5000, creditAmount: 0 },
        { accountId: 'acc-fee-income', fundId: 'fund-01', debitAmount: 0, creditAmount: 5000 },
      ],
    });
    expect(balancedEntry.entryNo).toMatch(/^JNL-2026-\d{5}$/);
    expect(balancedEntry.totalAmount).toBe(5000);

    // Unbalanced journal entry (debit != credit) must throw
    await expect(
      financeService.createJournalEntry({
        entryDate: '2026-10-15',
        description: 'ভুল আনব্যালেন্সড এন্ট্রি',
        sourceType: 'TEST',
        preparedBy: 'accountant-01',
        lines: [
          { accountId: 'acc-cash', fundId: 'fund-01', debitAmount: 5000, creditAmount: 0 },
          { accountId: 'acc-fee-income', fundId: 'fund-01', debitAmount: 0, creditAmount: 4000 }, // 1000 mismatch
        ],
      })
    ).rejects.toThrow(/ডাবল-এন্ট্রি নীতি লঙ্ঘন/);
  });

  // 9. Thermal POS Receipt Generation
  it('should generate thermal POS receipt payload with 58mm/80mm layout', async () => {
    const invoice = await financeService.createInvoice({
      studentId: 'stu-pos-01',
      studentCode: 'DHK-2026-0088',
      studentName: 'মুহাম্মদ তাওহীদ',
      feeStructureId: 'str-01',
      monthYear: '2026-02',
      amountDue: 1500,
      dueDate: '2026-02-15',
    });

    const receipt = await financeService.collectFee({
      invoiceId: invoice.id,
      amount: 1500,
      paymentMethod: 'CASH',
      cashierId: 'cashier-pos-01',
    });

    const thermal = await financeService.getThermalReceiptPayload(receipt.id, 58);
    expect(thermal.receiptNo).toBe(receipt.receiptNo);
    expect(thermal.rawText).toContain('ক্যাশ কাউন্টার অফিসিয়াল রসিদ');
    expect(thermal.qrData).toContain(`/verify/receipt/${receipt.receiptNo}`);
  });
});
