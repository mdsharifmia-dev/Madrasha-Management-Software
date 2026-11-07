// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { App } from './App';

describe('Madrasha ERP Frontend: Comprehensive Button & Feature Audit', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    document.body.className = '';
    window.alert = () => {};
    window.confirm = () => true;
  });

  it('renders the application shell without throwing any runtime errors', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(screen.getByTitle(/Change Language/i)).toBeTruthy();
    expect(screen.getByTitle(/থিম পরিবর্তন করুন/i)).toBeTruthy();
    expect(screen.getByTitle(/সিস্টেম অ্যালার্ট ও নোটিফিকেশন/i)).toBeTruthy();
  });

  it('audits Madrasa Admin department navigation buttons', () => {
    render(<App />);

    // 1. Dashboard & All Departments
    const dashBtn = screen.getAllByText(/ড্যাশবোর্ড ও সকল বিভাগ/i)[0].closest('button');
    expect(dashBtn).toBeTruthy();
    if (dashBtn) fireEvent.click(dashBtn);

    // 2. Accounts & Finance
    const financeBtn = screen.getAllByText(/হিসাব ও অর্থ বিভাগ/i)[0].closest('button');
    expect(financeBtn).toBeTruthy();
    if (financeBtn) fireEvent.click(financeBtn);

    // 3. Student Affairs & Admissions
    const studentsBtn = screen.getAllByText(/ছাত্রকল্যাণ ও ভর্তি বিভাগ/i)[0].closest('button');
    expect(studentsBtn).toBeTruthy();
    if (studentsBtn) fireEvent.click(studentsBtn);

    // 4. Hostel & Mess
    const hostelBtn = screen.getAllByText(/হোস্টেল, মেস ও গেটপাস/i)[0].closest('button');
    expect(hostelBtn).toBeTruthy();
    if (hostelBtn) fireEvent.click(hostelBtn);
  });

  it('audits transition to Super Admin mode and its navigation buttons', () => {
    render(<App />);

    // Click "সুপার অ্যাডমিনে ফিরুন"
    const returnBtn = screen.getAllByText(/সুপার অ্যাডমিনে ফিরুন/i)[0].closest('button');
    expect(returnBtn).toBeTruthy();
    if (returnBtn) fireEvent.click(returnBtn);

    // Verify Super Admin elements are now visible
    // 1. Directory & Subscriptions
    const dirBtn = screen.getByText(/ডিরেক্টরি ও সাবস্ক্রিপশন/i).closest('button');
    expect(dirBtn).toBeTruthy();
    if (dirBtn) fireEvent.click(dirBtn);

    // 2. System Live Monitor
    const monitorBtn = screen.getByText(/সিস্টেম লাইভ মনিটর/i).closest('button');
    expect(monitorBtn).toBeTruthy();
    if (monitorBtn) fireEvent.click(monitorBtn);

    // 3. Settings
    const settingsBtn = screen.getByText(/সিস্টেম সেটিংস ও ভিউ/i).closest('button');
    expect(settingsBtn).toBeTruthy();
    if (settingsBtn) fireEvent.click(settingsBtn);

    // 4. Messages / Support
    const messagesBtn = screen.getByText(/ক্লায়েন্ট মেসেজ/i).closest('button');
    expect(messagesBtn).toBeTruthy();
    if (messagesBtn) fireEvent.click(messagesBtn);
  });

  it('audits the Theme Toggle button (Dark to Light to Dark)', () => {
    render(<App />);

    const themeToggleBtn = screen.getByTitle(/থিম পরিবর্তন করুন/i);
    expect(themeToggleBtn).toBeTruthy();

    expect(document.body.classList.contains('light-mode')).toBe(false);

    // Click: toggle to light mode
    fireEvent.click(themeToggleBtn);
    expect(document.body.classList.contains('light-mode')).toBe(true);

    // Click: toggle back to dark mode
    fireEvent.click(themeToggleBtn);
    expect(document.body.classList.contains('light-mode')).toBe(false);
  });

  it('audits the Multi-Language dropdown selector and language switch buttons', () => {
    render(<App />);

    const langBtn = screen.getByTitle(/Change Language/i);
    expect(langBtn).toBeTruthy();

    // Click to open dropdown
    fireEvent.click(langBtn);
    expect(screen.getByText(/ভাষা নির্বাচন করুন/i)).toBeTruthy();

    // Switch to English
    const enBtn = screen.getByText(/English/i).closest('button');
    expect(enBtn).toBeTruthy();
    if (enBtn) {
      fireEvent.click(enBtn);
      // App name switches to English
      expect(screen.getAllByText(/Madrasa SaaS/i)[0]).toBeTruthy();
    }

    // Switch back to Bengali
    fireEvent.click(screen.getByTitle(/Change Language/i));
    const bnBtn = screen.getByText(/Bengali/i).closest('button');
    expect(bnBtn).toBeTruthy();
    if (bnBtn) {
      fireEvent.click(bnBtn);
      expect(screen.getAllByText(/মাদ্রাসা SaaS/i)[0]).toBeTruthy();
    }
  });

  it('audits the System Notification Bell button and popup dismissal', () => {
    render(<App />);

    const bellBtn = screen.getByTitle(/সিস্টেম অ্যালার্ট ও নোটিফিকেশন/i);
    expect(bellBtn).toBeTruthy();

    // Open notification dropdown
    fireEvent.click(bellBtn);
    expect(screen.getByText(/সিস্টেম জরুরি নোটিশ/i)).toBeTruthy();

    // Close notification dropdown
    const closeBtn = screen.getByText('✕');
    expect(closeBtn).toBeTruthy();
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/সিস্টেম জরুরি নোটিশ/i)).toBeNull();
  });

  it('audits Search bar input without throwing errors', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/সার্ভার, মাদ্রাসা কোড, ছাত্র বা রসিদ সার্চ করুন/i);
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: 'জামিয়া' } });
    expect((searchInput as HTMLInputElement).value).toBe('জামিয়া');
  });
});
