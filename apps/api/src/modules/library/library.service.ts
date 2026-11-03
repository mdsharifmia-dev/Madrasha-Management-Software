import { LibraryBook, BookIssueRecord } from '@madrasha/shared-types';

export interface CreateBookInput {
  accessionNo: string;
  titleBn: string;
  titleAr?: string;
  titleUrdu?: string;
  author: string;
  publisher?: string;
  category: string;
  totalCopies: number;
  shelfNo?: string;
}

export interface IssueBookInput {
  bookId: string;
  studentId?: string;
  userId?: string;
  studentName?: string;
  userName?: string;
  issueDurationDays?: number; // default 14 days
  issuedBy: string;
}

export interface ReturnBookInput {
  issueId: string;
  returnedBy: string;
  dailyFineRate?: number; // default 2 Taka per day overdue
}

export class LibraryService {
  private books: LibraryBook[] = [
    {
      id: 'book-001',
      accessionNo: 'LIB-AR-001',
      titleBn: 'সহিহ বুখারি শরীফ (সম্পূর্ণ)',
      titleAr: 'صحيح البخاري',
      titleUrdu: 'صحیح بخاری',
      author: 'ইমাম বুখারি (রহ.)',
      publisher: 'মাকতাবাতুল বুশরা',
      category: 'হাদিস (Hadith)',
      totalCopies: 5,
      availableCopies: 4,
      shelfNo: 'A-12',
      isActive: true,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'book-002',
      accessionNo: 'LIB-FQ-002',
      titleBn: 'হিদায়া (কিতাবুল বুয়ূ)',
      titleAr: 'الهداية في شرح بداية المبتدي',
      titleUrdu: 'ہدایہ',
      author: 'আল্লামা মারগিনানী (রহ.)',
      publisher: 'দারুল উলুম দেওবন্দ',
      category: 'ফিকহ (Fiqh)',
      totalCopies: 8,
      availableCopies: 6,
      shelfNo: 'B-04',
      isActive: true,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'book-003',
      accessionNo: 'LIB-TF-003',
      titleBn: 'তাফসিরে জালালাইন',
      titleAr: 'تفسير الجلالين',
      author: 'জালালুদ্দিন সুয়ূতী ও জালালুদ্দিন মহল্লী (রহ.)',
      publisher: 'দারুল কুতুব আল-ইলমিয়্যাহ',
      category: 'তাফসির (Tafsir)',
      totalCopies: 10,
      availableCopies: 9,
      shelfNo: 'C-01',
      isActive: true,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  private issues: BookIssueRecord[] = [];

  // ----------------------------------------------------------------------------
  // 1. Book Catalog & Multilingual Search (Arabic, Bengali, Urdu)
  // ----------------------------------------------------------------------------
  async getBooks(query?: string, category?: string): Promise<LibraryBook[]> {
    let result = [...this.books];

    if (category) {
      result = result.filter((b) => b.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (query) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.titleBn.toLowerCase().includes(q) ||
          (b.titleAr && b.titleAr.toLowerCase().includes(q)) ||
          (b.titleUrdu && b.titleUrdu.toLowerCase().includes(q)) ||
          b.author.toLowerCase().includes(q) ||
          b.accessionNo.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async createBook(input: CreateBookInput): Promise<LibraryBook> {
    const existing = this.books.find((b) => b.accessionNo === input.accessionNo);
    if (existing) {
      throw new Error(`একসেশন নম্বর ${input.accessionNo} ইতিমধ্যে ব্যবহার করা হয়েছে।`);
    }

    const book: LibraryBook = {
      id: `book-${Date.now()}`,
      accessionNo: input.accessionNo,
      titleBn: input.titleBn,
      titleAr: input.titleAr,
      titleUrdu: input.titleUrdu,
      author: input.author,
      publisher: input.publisher,
      category: input.category,
      totalCopies: input.totalCopies,
      availableCopies: input.totalCopies,
      shelfNo: input.shelfNo,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.books.push(book);
    return book;
  }

  // ----------------------------------------------------------------------------
  // 2. Book Issue
  // ----------------------------------------------------------------------------
  async issueBook(input: IssueBookInput): Promise<BookIssueRecord> {
    const book = this.books.find((b) => b.id === input.bookId);
    if (!book) {
      throw new Error('নির্দিষ্ট বইটি লাইব্রেরিতে নেই।');
    }

    if (book.availableCopies <= 0) {
      throw new Error(`"${book.titleBn}" বইটির সকল কপি বর্তমানে ইস্যুকৃত। কোনো কপি খালি নেই।`);
    }

    if (!input.studentId && !input.userId) {
      throw new Error('বই ইস্যু করার জন্য ছাত্র বা শিক্ষকের আইডি থাকা বাধ্যতামূলক।');
    }

    const issueDurationDays = input.issueDurationDays || 14;
    const now = new Date();
    const issueDate = now.toISOString().split('T')[0] as string;
    const dueDateObj = new Date(now.getTime() + issueDurationDays * 24 * 60 * 60 * 1000);
    const dueDate = dueDateObj.toISOString().split('T')[0] as string;

    const issue: BookIssueRecord = {
      id: `issue-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.titleBn,
      accessionNo: book.accessionNo,
      studentId: input.studentId,
      studentName: input.studentName,
      userId: input.userId,
      userName: input.userName,
      issueDate,
      dueDate,
      fineAmount: 0,
      isReturned: false,
      issuedBy: input.issuedBy,
    };

    this.issues.push(issue);
    book.availableCopies -= 1;

    return issue;
  }

  // ----------------------------------------------------------------------------
  // 3. Book Return & Overdue Fine Calculation
  // ----------------------------------------------------------------------------
  async returnBook(input: ReturnBookInput): Promise<{
    issue: BookIssueRecord;
    fineAmount: number;
    daysOverdue: number;
    message: string;
  }> {
    const issue = this.issues.find((i) => i.id === input.issueId);
    if (!issue) {
      throw new Error('বই ইস্যু রেকর্ডটি খুঁজে পাওয়া যায়নি।');
    }

    if (issue.isReturned) {
      throw new Error('বইটি ইতিমধ্যে জমা নেওয়া হয়েছে।');
    }

    const returnDateObj = new Date();
    const returnDate = returnDateObj.toISOString().split('T')[0] as string;
    const dueDateObj = new Date(issue.dueDate);

    // Calculate overdue days
    const diffTime = returnDateObj.getTime() - dueDateObj.getTime();
    const daysOverdue = diffTime > 0 ? Math.floor(diffTime / (1000 * 60 * 60 * 24)) : 0;
    const dailyFineRate = input.dailyFineRate || 2; // 2 Taka per day
    const fineAmount = daysOverdue * dailyFineRate;

    issue.isReturned = true;
    issue.returnDate = returnDate;
    issue.returnedBy = input.returnedBy;
    issue.fineAmount = fineAmount;

    // Return copy to available stock
    const book = this.books.find((b) => b.id === issue.bookId);
    if (book) {
      book.availableCopies += 1;
    }

    const message =
      daysOverdue > 0
        ? `বই জমা নেওয়া হয়েছে। নির্ধারিত সময়ের চেয়ে ${daysOverdue} দিন দেরির কারণে জরিমানা: ৳${fineAmount}`
        : 'নির্ধারিত সময়ের মধ্যে বইটি নিরাপদে জমা নেওয়া হয়েছে। কোনো জরিমানা নেই।';

    return {
      issue,
      fineAmount,
      daysOverdue,
      message,
    };
  }

  // ----------------------------------------------------------------------------
  // 4. Overdue Books List
  // ----------------------------------------------------------------------------
  async getOverdueIssues(): Promise<BookIssueRecord[]> {
    const today = new Date().toISOString().split('T')[0] as string;
    return this.issues.filter((i) => !i.isReturned && i.dueDate < today);
  }

  async getAllIssues(isReturned?: boolean): Promise<BookIssueRecord[]> {
    if (isReturned !== undefined) {
      return this.issues.filter((i) => i.isReturned === isReturned);
    }
    return [...this.issues];
  }
}

export const libraryService = new LibraryService();
