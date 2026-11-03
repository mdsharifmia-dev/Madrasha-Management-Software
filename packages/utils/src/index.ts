// ==============================================================================
// জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম — Shared Utilities
// ==============================================================================

const BANGLA_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const ENGLISH_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English numbers/digits to Bengali digits
 */
export function toBanglaNumber(value: number | string): string {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[digit] ?? digit);
}

/**
 * Converts Bengali numbers/digits to standard English numbers
 */
export function toEnglishNumber(value: string): string {
  if (!value) return '';
  return value.replace(/[০-৯]/g, (digit) => ENGLISH_DIGITS[digit] ?? digit);
}

/**
 * Returns the current date formatted in Asia/Dhaka timezone (YYYY-MM-DD)
 * Prevents UTC midnight boundary bugs where transactions register on the previous day.
 */
export function getDhakaDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Returns current timestamp in Asia/Dhaka formatted ISO string
 */
export function getDhakaTimeString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Formats a database sequence number into a formal receipt number
 * e.g. REC-2026-00001
 */
export function formatReceiptNumber(sequence: number, year: number = new Date().getFullYear()): string {
  return `REC-${year}-${String(sequence).padStart(5, '0')}`;
}

/**
 * Formats a student ID code with district prefix, year, and sequence
 * e.g. DHK-2026-0001
 */
export function formatStudentCode(
  districtPrefix: string,
  year: number = new Date().getFullYear(),
  sequence: number
): string {
  const cleanPrefix = districtPrefix.toUpperCase().slice(0, 3);
  return `${cleanPrefix}-${year}-${String(sequence).padStart(4, '0')}`;
}

/**
 * Masks sensitive phone numbers for privacy (e.g. in reports and staff views)
 * 01712345689 -> 017*****689
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 8) return phone;
  const cleanPhone = phone.trim();
  const start = cleanPhone.slice(0, 3);
  const end = cleanPhone.slice(-3);
  return `${start}*****${end}`;
}

/**
 * Sanitizes input string to prevent Cross-Site Scripting (XSS)
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
