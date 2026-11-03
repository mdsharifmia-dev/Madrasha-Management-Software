import { Request, Response } from 'express';
import { libraryService } from './library.service.js';

export class LibraryController {
  async getBooks(req: Request, res: Response) {
    try {
      const { q, category } = req.query;
      const books = await libraryService.getBooks(q as string | undefined, category as string | undefined);
      return res.json({ success: true, data: books });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const { accessionNo, titleBn, titleAr, titleUrdu, author, publisher, category, totalCopies, shelfNo } = req.body;
      if (!accessionNo || !titleBn || !author || !category || !totalCopies) {
        return res.status(400).json({ success: false, error: { message: 'একসেশন নম্বর, শিরোনাম, লেখক, ক্যাটাগরি ও মোট কপি আবশ্যক।' } });
      }
      const book = await libraryService.createBook({
        accessionNo,
        titleBn,
        titleAr,
        titleUrdu,
        author,
        publisher,
        category,
        totalCopies: Number(totalCopies),
        shelfNo,
      });
      return res.status(201).json({ success: true, data: book });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async issueBook(req: Request, res: Response) {
    try {
      const { bookId, studentId, userId, studentName, userName, issueDurationDays } = req.body;
      if (!bookId) {
        return res.status(400).json({ success: false, error: { message: 'বইয়ের আইডি আবশ্যক।' } });
      }
      const issue = await libraryService.issueBook({
        bookId,
        studentId,
        userId,
        studentName,
        userName,
        issueDurationDays: issueDurationDays ? Number(issueDurationDays) : undefined,
        issuedBy: req.user?.userId || 'librarian',
      });
      return res.status(201).json({ success: true, data: issue });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { issueId, dailyFineRate } = req.body;
      if (!issueId) {
        return res.status(400).json({ success: false, error: { message: 'ইস্যু আইডি আবশ্যক।' } });
      }
      const result = await libraryService.returnBook({
        issueId,
        returnedBy: req.user?.userId || 'librarian',
        dailyFineRate: dailyFineRate ? Number(dailyFineRate) : undefined,
      });
      return res.json({ success: true, data: result });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getOverdueIssues(_req: Request, res: Response) {
    try {
      const overdues = await libraryService.getOverdueIssues();
      return res.json({ success: true, data: overdues });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  async getAllIssues(req: Request, res: Response) {
    try {
      const { isReturned } = req.query;
      const issues = await libraryService.getAllIssues(
        isReturned !== undefined ? isReturned === 'true' : undefined
      );
      return res.json({ success: true, data: issues });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
}

export const libraryController = new LibraryController();
