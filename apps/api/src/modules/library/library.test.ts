import { describe, it, expect } from 'vitest';
import { libraryService } from './library.service.js';

describe('Phase 8: Library & Books Management Service Tests', () => {
  it('should search books by Arabic, Bengali, Urdu and category', async () => {
    // 1. Search in Arabic
    const arabicResults = await libraryService.getBooks('البخاري');
    expect(arabicResults.length).toBeGreaterThan(0);
    expect(arabicResults[0].titleAr).toContain('البخاري');

    // 2. Search in Urdu
    const urduResults = await libraryService.getBooks('ہدایہ');
    expect(urduResults.length).toBeGreaterThan(0);
    expect(urduResults[0].titleUrdu).toBe('ہدایہ');

    // 3. Search by Category
    const tafsirBooks = await libraryService.getBooks(undefined, 'তাফসির');
    expect(tafsirBooks.length).toBeGreaterThan(0);
    expect(tafsirBooks[0].category).toContain('তাফসির');
  });

  it('should add a new book to the catalog', async () => {
    const book = await libraryService.createBook({
      accessionNo: 'LIB-US-004',
      titleBn: 'উসুলুশ শাশী',
      titleAr: 'أصول الشاشي',
      author: 'ইমাম নিজামুদ্দিন আশ-শাশী (রহ.)',
      category: 'উসুলে ফিকহ',
      totalCopies: 6,
      shelfNo: 'D-02',
    });

    expect(book.accessionNo).toBe('LIB-US-004');
    expect(book.availableCopies).toBe(6);
    expect(book.titleAr).toBe('أصول الشاشي');
  });

  it('should issue a book to a student and decrement available stock', async () => {
    const books = await libraryService.getBooks('বুখারি');
    const targetBook = books[0];
    const initialCopies = targetBook.availableCopies;

    const issue = await libraryService.issueBook({
      bookId: targetBook.id,
      studentId: 'std-lib-001',
      studentName: 'মুহাম্মদ আব্দুল্লাহ',
      issuedBy: 'librarian-01',
      issueDurationDays: 14,
    });

    expect(issue.bookId).toBe(targetBook.id);
    expect(issue.studentName).toBe('মুহাম্মদ আব্দুল্লাহ');
    expect(issue.isReturned).toBe(false);
    expect(targetBook.availableCopies).toBe(initialCopies - 1);
  });

  it('should return a book and restore available stock', async () => {
    const allIssues = await libraryService.getAllIssues(false);
    const issueToReturn = allIssues[0];

    const returnResult = await libraryService.returnBook({
      issueId: issueToReturn.id,
      returnedBy: 'librarian-01',
    });

    expect(returnResult.issue.isReturned).toBe(true);
    expect(returnResult.issue.returnDate).toBeDefined();

    const books = await libraryService.getBooks();
    const book = books.find((b) => b.id === issueToReturn.bookId);
    expect(book).toBeDefined();
  });
});
