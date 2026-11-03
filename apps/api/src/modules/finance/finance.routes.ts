import { Router } from 'express';
import { financeController } from './finance.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { tenantResolver } from '../../middleware/tenantResolver.js';
import { requirePermission } from '../../middleware/requirePermission.js';

const router = Router();

// Apply Authentication & Tenant Resolver
router.use(authenticateJWT);
router.use(tenantResolver);

// Shariah Funds & Chart of Accounts
router.get('/funds', requirePermission('fees', 'read'), (req, res) => financeController.getFunds(req, res));
router.get('/accounts', requirePermission('fees', 'read'), (req, res) =>
  financeController.getChartOfAccounts(req, res)
);

// Student Invoices
router.get('/invoices', requirePermission('fees', 'read'), (req, res) => financeController.getInvoices(req, res));

// Cash Counter POS Fee Collection
router.post('/collect', requirePermission('fees', 'create'), (req, res) => financeController.collectFee(req, res));

// Receipt Reversal (Audit-safe Reversal: requires approve permission)
router.post('/receipts/reverse', requirePermission('fees', 'approve'), (req, res) =>
  financeController.reverseReceipt(req, res)
);

// Online Payment Webhook / Parent App Payment
router.post('/online-pay', (req, res) => financeController.processOnlinePayment(req, res));

// Daily Cashier Closing
router.post('/cashier-closing', requirePermission('fees', 'create'), (req, res) =>
  financeController.getDailyCashierClosing(req, res)
);

// Maker-Checker: Fee Waivers
router.post('/waivers/request', requirePermission('fees', 'create'), (req, res) =>
  financeController.requestFeeWaiver(req, res)
);
router.post('/waivers/:id/approve', requirePermission('fees', 'approve'), (req, res) =>
  financeController.approveFeeWaiver(req, res)
);
router.post('/waivers/:id/reject', requirePermission('fees', 'approve'), (req, res) =>
  financeController.rejectFeeWaiver(req, res)
);
router.get('/waivers', requirePermission('fees', 'read'), (req, res) =>
  financeController.getFeeWaivers(req, res)
);

// Maker-Checker: Salary Sheets & Payroll
router.post('/salaries', requirePermission('payroll', 'create'), (req, res) =>
  financeController.createSalarySheet(req, res)
);
router.post('/salaries/:id/approve', requirePermission('payroll', 'approve'), (req, res) =>
  financeController.approveSalarySheet(req, res)
);
router.post('/salaries/:id/disburse', requirePermission('payroll', 'approve'), (req, res) =>
  financeController.disburseSalary(req, res)
);
router.get('/salaries', requirePermission('payroll', 'read'), (req, res) =>
  financeController.getSalarySheets(req, res)
);

// Double-Entry Ledger & Thermal POS
router.post('/journal', requirePermission('ledger', 'create'), (req, res) =>
  financeController.createJournalEntry(req, res)
);
router.get('/journal', requirePermission('ledger', 'read'), (req, res) =>
  financeController.getJournalEntries(req, res)
);
router.get('/receipts/:id/thermal', requirePermission('fees', 'read'), (req, res) =>
  financeController.getThermalReceipt(req, res)
);

export const financeRoutes = router;
