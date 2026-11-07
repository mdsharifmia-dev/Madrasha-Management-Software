---
name: feature-health-validator
description: Validates all functional and business modules of the Madrasha ERP platform, covering Finance, Student Admissions, Fee Collections, Daily Attendance, Hostel and Mess, Academic Exams, Multi-Tenancy switching, and Settings. Use when verifying that domain logic, API contracts, calculations, and data workflows execute correctly end-to-end. Do not use for testing single static buttons without business context.
---

# Feature Health Validator Skill

## Purpose
This skill validates the full functional integrity of each business module in the Madrasha Management platform. It ensures that data mutations (such as fee collections, expense vouchers, attendance marking, student admissions) succeed against backend logic and frontend state stores without regression or calculation errors.

## Positive Triggers
- "test ERP features"
- "verify fee collection workflow"
- "check finance module calculations"
- "validate student admission and attendance"
- "test multi-madrasa tenant switching"
- "run end-to-end feature validation"

## Negative Triggers
- Do not use for purely visual styling or color palette checks (use `ui-ux-pro-max`).
- Do not use for isolated unit tests of utility helper functions.

## Feature Validation Checklist

### 1. Finance & Cash Closing (আর্থিক প্রশাসন ও ক্যাশ ক্লোজিং)
- Calculate Total Collections, Total Expenses, and Net Balance (আজকের উদ্বৃত্ত).
- Ensure formula: `Net Cash = Total Received - Total Expenses`.
- Verify fund breakdowns (মাসিক বেতন, লিল্লাহ বোর্ডিং, মেরামত তহবিল, সাধারণ তহবিল).
- Ensure voucher numbering sequence (e.g., `#RC-YYYY-XXXX` and `#VC-YYYY-XXXX`) is immutable.

### 2. Student Records & Admissions (তালিবুল ইলম ও ভর্তি শাখা)
- Verify student creation with required fields: Name (Bengali/English), Roll, Department/Jamath, Guardian info.
- Verify status changes: Active, Struck-off, Transferred, Graduated.
- Verify search and filter by class, section, or department.

### 3. Attendance & RFID Sync (হাজিরা ও বায়োমেট্রিক সিস্টেম)
- Test bulk attendance marking for classes.
- Verify attendance states: Present, Absent, Sick Leave, Late.
- Verify SMS dispatch trigger on absence detection.

### 4. Hostel & Mess Ledger (ছাত্রাবাস ও মেস ডাইনিং)
- Room and seat allocation verification without double-booking.
- Daily bazaar expense calculation and per-student daily meal rate derivation.

### 5. Multi-Tenant Switching & Impersonation (সুপার অ্যাডমিন ও মুহতামিম প্যানেল)
- Seamless transition between Super Admin overview and single Madrasa Admin portal.
- Verify context banner displays current madrasa name and return button works.
- Strict data isolation: ensure madrasa A cannot view transactions of madrasa B.

### 6. Internationalization & Theme (বহুভাষিক ও থিম পরিবর্তন)
- Verify dynamic string switching for Bengali, English, Arabic, Urdu, Turkish, and Malay.
- Verify Dark / Light mode toggle preserves high-contrast text and layout stability.
