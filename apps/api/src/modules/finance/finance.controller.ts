import { Request, Response } from 'express';
import { z } from 'zod';
import { financeService } from './finance.service.js';

// Input Schemas
const collectFeeSchema = z.object({
  invoiceId: z.string().min(1, 'ইনভয়েস আইডি আবশ্যক'),
  amount: z.number().positive('টাকার পরিমাণ শূন্যের চেয়ে বেশি হতে হবে'),
  paymentMethod: z.enum(['CASH', 'BKASH', 'NAGAD', 'ROCKET', 'CARD', 'BANK']),
  transactionId: z.string().optional(),
});

const reverseReceiptSchema = z.object({
  receiptId: z.string().min(1, 'রসিদ আইডি আবশ্যক'),
  reason: z.string().min(5, 'রিভার্সালের কারণ উল্লেখ করুন'),
});

const onlinePaymentSchema = z.object({
  invoiceId: z.string().min(1, 'ইনভয়েস আইডি আবশ্যক'),
  gateway: z.enum(['BKASH', 'NAGAD', 'SSLCOMMERZ']),
  transactionId: z.string().min(3, 'ট্রানজেকশন আইডি আবশ্যক'),
  amount: z.number().positive(),
});

const cashierClosingSchema = z.object({
  handCashReported: z.number().min(0, 'হাতে থাকা নগদের পরিমাণ দিন'),
});

export class FinanceController {
  /**
   * GET /api/finance/funds
   */
  async getFunds(_req: Request, res: Response) {
    try {
      const funds = await financeService.getFunds();
      return res.json({
        success: true,
        data: funds,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: { code: 'FETCH_FUNDS_FAILED', details: error.message },
      });
    }
  }

  /**
   * GET /api/finance/accounts
   */
  async getChartOfAccounts(_req: Request, res: Response) {
    try {
      const accounts = await financeService.getChartOfAccounts();
      return res.json({
        success: true,
        data: accounts,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: { code: 'FETCH_ACCOUNTS_FAILED', details: error.message },
      });
    }
  }

  /**
   * GET /api/finance/invoices
   */
  async getInvoices(req: Request, res: Response) {
    try {
      const studentId = req.query.studentId as string | undefined;
      const status = req.query.status as string | undefined;

      const invoices = await financeService.getInvoices(studentId, status);
      return res.json({
        success: true,
        data: invoices,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: { code: 'FETCH_INVOICES_FAILED', details: error.message },
      });
    }
  }

  /**
   * POS Fee Collection
   * POST /api/finance/collect
   */
  async collectFee(req: Request, res: Response) {
    try {
      const data = collectFeeSchema.parse(req.body);
      const cashierId = req.user?.userId || 'cashier-001';

      const receipt = await financeService.collectFee({
        ...data,
        cashierId,
      });

      return res.status(201).json({
        success: true,
        message: 'ফি সফলভাবে গ্রহণ করা হয়েছে এবং ক্রমিক রসিদ তৈরি হয়েছে।',
        data: receipt,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'FEE_COLLECTION_FAILED',
          details: error.message || 'ফি কালেকশন ব্যর্থ হয়েছে।',
        },
      });
    }
  }

  /**
   * Receipt Reversal (Audit-safe error correction)
   * POST /api/finance/receipts/reverse
   */
  async reverseReceipt(req: Request, res: Response) {
    try {
      const { receiptId, reason } = reverseReceiptSchema.parse(req.body);
      const authorizedBy = req.user?.userId || 'admin';

      const result = await financeService.reverseReceipt(receiptId, reason, authorizedBy);
      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: { code: 'REVERSAL_FAILED', details: error.message },
      });
    }
  }

  /**
   * Online Payment Gateway Webhook / IPN
   * POST /api/finance/online-pay
   */
  async processOnlinePayment(req: Request, res: Response) {
    try {
      const { invoiceId, gateway, transactionId, amount } = onlinePaymentSchema.parse(req.body);
      const receipt = await financeService.processOnlinePayment(invoiceId, gateway, transactionId, amount);

      return res.json({
        success: true,
        message: 'অনলাইন পেমেন্ট যাচাইপূর্বক সফল হয়েছে।',
        data: receipt,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: { code: 'ONLINE_PAYMENT_FAILED', details: error.message },
      });
    }
  }

  /**
   * Daily Cashier Closing
   * POST /api/finance/cashier-closing
   */
  async getDailyCashierClosing(req: Request, res: Response) {
    try {
      const { handCashReported } = cashierClosingSchema.parse(req.body);
      const cashierId = req.user?.userId || 'cashier-001';

      const report = await financeService.getDailyCashierClosing(cashierId, handCashReported);
      return res.json({
        success: true,
        message: 'ক্যাশিয়ারের দৈনিক হিসাব ক্লোজিং সম্পন্ন হয়েছে।',
        data: report,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: { code: 'CLOSING_FAILED', details: error.message },
      });
    }
  }

  // ----------------------------------------------------------------------------
  // Maker-Checker: Fee Waivers
  // ----------------------------------------------------------------------------
  async requestFeeWaiver(req: Request, res: Response) {
    try {
      const { invoiceId, studentId, waiverAmount, reason } = req.body;
      if (!invoiceId || !studentId || !waiverAmount || !reason) {
        return res.status(400).json({ success: false, error: { message: 'ইনভয়েস, ছাত্র, ছাড়ের পরিমাণ ও কারণ আবশ্যক।' } });
      }
      const waiver = await financeService.requestFeeWaiver({
        invoiceId,
        studentId,
        waiverAmount: Number(waiverAmount),
        reason,
        requestedBy: req.user?.userId || 'accountant',
      });
      return res.status(201).json({ success: true, message: 'ছাড়ের আবেদন জমা দেওয়া হয়েছে। মুহতামিমের অনুমোদনের অপেক্ষায়।', data: waiver });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async approveFeeWaiver(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const result = await financeService.approveFeeWaiver(id, req.user?.userId || 'muhtamim');
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async rejectFeeWaiver(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const { reason } = req.body;
      const result = await financeService.rejectFeeWaiver(id, req.user?.userId || 'muhtamim', reason);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getFeeWaivers(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const list = await financeService.getFeeWaivers(status as string | undefined);
      return res.json({ success: true, data: list });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  // ----------------------------------------------------------------------------
  // Maker-Checker: Salary Sheets
  // ----------------------------------------------------------------------------
  async createSalarySheet(req: Request, res: Response) {
    try {
      const { monthYear, entries } = req.body;
      if (!monthYear || !Array.isArray(entries) || entries.length === 0) {
        return res.status(400).json({ success: false, error: { message: 'মাস (YYYY-MM) এবং বেতন এন্ট্রির তালিকা আবশ্যক।' } });
      }
      const sheet = await financeService.createSalarySheet({
        monthYear,
        entries,
        preparedBy: req.user?.userId || 'accountant',
      });
      return res.status(201).json({ success: true, message: 'বেতন শিট তৈরি হয়েছে। মুহতামিমের অনুমোদনের জন্য অপেক্ষমাণ।', data: sheet });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async approveSalarySheet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const result = await financeService.approveSalarySheet(id, req.user?.userId || 'muhtamim');
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async disburseSalary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const { paymentMethod } = req.body;
      const result = await financeService.disburseSalary(id, paymentMethod);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getSalarySheets(_req: Request, res: Response) {
    try {
      const sheets = await financeService.getSalarySheets();
      return res.json({ success: true, data: sheets });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  // ----------------------------------------------------------------------------
  // Double-Entry Ledger & Thermal POS
  // ----------------------------------------------------------------------------
  async createJournalEntry(req: Request, res: Response) {
    try {
      const { entryDate, description, sourceType, sourceId, lines } = req.body;
      if (!entryDate || !description || !Array.isArray(lines) || lines.length < 2) {
        return res.status(400).json({ success: false, error: { message: 'তারিখ, বিবরণ এবং কমপক্ষে ২টি ডেবিট/ক্রেডিট লাইন আবশ্যক।' } });
      }
      const entry = await financeService.createJournalEntry({
        entryDate,
        description,
        sourceType: sourceType || 'MANUAL',
        sourceId,
        preparedBy: req.user?.userId || 'accountant',
        lines,
      });
      return res.status(201).json({ success: true, message: 'ডাবল-এন্ট্রি জাবেদা সফলভাবে সংরক্ষিত হয়েছে।', data: entry });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getJournalEntries(_req: Request, res: Response) {
    try {
      const entries = await financeService.getJournalEntries();
      return res.json({ success: true, data: entries });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  async getThermalReceipt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const width = req.query.width === '80' ? 80 : 58;
      const thermal = await financeService.getThermalReceiptPayload(id, width);
      return res.json({ success: true, data: thermal });
    } catch (error: any) {
      return res.status(404).json({ success: false, error: { message: error.message } });
    }
  }
}

export const financeController = new FinanceController();
