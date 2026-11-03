# 🗺️ Implementation Roadmap
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম

**সংস্করণ:** 1.0.0 | **অবস্থা:** অনুমোদিত ✅
**শুরুর তারিখ:** TBD | **আনুমানিক সময়:** ৭-৮ মাস

---

> [!IMPORTANT]
> **রোডম্যাপের তিনটি অলঙ্ঘনীয় নিয়ম:**
> 1. পরবর্তী ধাপ শুরুর আগে বর্তমান ধাপের সব Checkbox ✅ হতে হবে।
> 2. কোনো ফিচারের কোড লেখার আগে সেই ফিচারের Spec পড়তে হবে।
> 3. যেকোনো আর্থিক অপারেশনের কোড লেখার আগে Team Lead-এর Review বাধ্যতামূলক।

---

## ধাপ ০ — ভিত্তি প্রস্তুতি (Foundation)
**আনুমানিক সময়:** ১ সপ্তাহ
**দায়িত্বশীল:** Tech Lead / Architecture

### লক্ষ্য
কোড লেখার পরিবেশ তৈরি করা। এই ধাপ শেষ না হলে কেউ কোড লিখতে পারবেন না।

### কাজের তালিকা

**Git & Repository:**
- [ ] GitHub Repository তৈরি (private)
- [ ] Branch strategy: `main` (production), `develop` (integration), `feature/*`, `hotfix/*`
- [ ] Branch protection rules: `main` ও `develop`-এ direct push নিষিদ্ধ
- [ ] PR template তৈরি
- [ ] `.gitignore` — `.env`, `*.pem`, `*.sqlite`, `node_modules`, `dist`

**Development Environment:**
- [ ] `docker-compose.yml` — PostgreSQL 16 + Redis 7 + Nginx (local)
- [ ] Monorepo setup: `npm workspaces` (root `package.json`)
- [ ] `apps/api/` — Express + TypeScript প্রজেক্ট initialize
- [ ] `apps/web/` — Vite + React + TypeScript প্রজেক্ট initialize
- [ ] `apps/mobile/` — Flutter প্রজেক্ট initialize
- [ ] `packages/shared-types/` — Shared TypeScript types

**Code Quality:**
- [ ] TypeScript strict mode চালু (`strict: true`)
- [ ] ESLint + TypeScript ESLint কনফিগারেশন
- [ ] Prettier কনফিগারেশন
- [ ] Husky pre-commit hooks (lint + format)
- [ ] Commitlint (conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`)

**Environment & Secrets:**
- [ ] `.env.example` তৈরি (সব variable, কোনো actual value নয়)
- [ ] `config/env.ts` — Zod দিয়ে env validation (missing variable = startup fail)
- [ ] RSA key pair তৈরি: `keys/private.pem` + `keys/public.pem` (gitignored)
- [ ] Local `.env` তৈরি (সব developer নিজে করবেন, share নয়)

**Database Foundation:**
- [ ] Prisma initialize (`apps/api/prisma/schema.prisma`)
- [ ] Control DB schema লেখা (সব Tables from `02_DATABASE_SCHEMA.md`)
- [ ] Tenant DB schema লেখা (সব Tables from `02_DATABASE_SCHEMA.md`)
- [ ] Initial migration run (`prisma migrate dev`)
- [ ] Seed script: subscription plans, default agency owner account

**CI/CD Foundation:**
- [ ] GitHub Actions: `ci.yml` — PR-এ lint + test run
- [ ] GitHub Actions: `deploy.yml` — merge to main-এ deploy (staging)
- [ ] `README.md` — কীভাবে local-এ চালাবে (step-by-step)

**সমাপ্তির চিহ্ন:** `docker-compose up` চালিয়ে API health check পাস করবে।

---

## ধাপ ১ — Authentication & RBAC
**আনুমানিক সময়:** ২ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Security Review

### লক্ষ্য
সম্পূর্ণ নিরাপদ লগইন সিস্টেম। এই ধাপ ছাড়া কোনো ব্যবসায়িক ফিচার শুরু হবে না।

### কাজের তালিকা

**Middleware আর্কিটেকচার:**
- [ ] `middleware/tenantResolver.ts` — subdomain থেকে schema name বের করা
- [ ] `middleware/authenticateJWT.ts` — RS256 JWT verify
- [ ] `middleware/requirePermission.ts` — Role + Permission check
- [ ] `middleware/rateLimiter.ts` — Login: 5/min/IP, API: 100/min/user
- [ ] `middleware/errorHandler.ts` — Centralized error handling (Zod errors, Prisma errors)
- [ ] `middleware/requestLogger.ts` — Pino structured logging

**Agency Staff Auth (সুপার অ্যাডমিন লগইন):**
- [ ] `POST /auth/agency/login` — Email + Password (Argon2id)
- [ ] `POST /auth/agency/2fa/verify` — TOTP code verify
- [ ] `POST /auth/agency/2fa/setup` — TOTP QR code generate
- [ ] `POST /auth/refresh` — Refresh token → new access token
- [ ] `POST /auth/logout` — Redis থেকে refresh token invalidate
- [ ] Brute force: ৫ বার ভুলে ১৫ মিনিট lock (Redis counter)

**Madrasa User Auth (মাদ্রাসা লগইন):**
- [ ] `POST /auth/madrasa/login` — Phone + Password (Argon2id)
- [ ] `POST /auth/madrasa/2fa/verify` — TOTP code verify
- [ ] `POST /auth/madrasa/setup-password` — First login (setup link থেকে)
- [ ] Tenant resolution: subdomain মিলিয়ে দেখা

**Parent App Auth (অভিভাবক লগইন):**
- [ ] `POST /auth/parent/request-otp` — Phone number → SMS OTP
- [ ] `POST /auth/parent/verify-otp` — OTP verify → JWT issue
- [ ] OTP: 6 digits, 5 min expiry, max 3 attempts, Redis stored

**RBAC System:**
- [ ] Default Roles seed (সিস্টেম রোল — মুছা যাবে না):
  - `MUHTAMIM` — সব অনুমতি
  - `NAIB_MUHTAMIM` — মুহতামিমের দেওয়া অনুমতি
  - `ACCOUNTANT` — হিসাব সব, ছাত্র দেখা
  - `CASHIER` — শুধু ফি গ্রহণ ও রসিদ
  - `AUDITOR` — শুধু দেখা ও export
  - `TEACHER` — নিজের ক্লাস + হাজিরা + নম্বর
  - `EXAM_CONTROLLER` — পরীক্ষা তৈরি, ফলাফল publish
  - `HOSTEL_WARDEN` — ছাত্রাবাস, গেটপাস
  - `PARENT` — শুধু নিজের সন্তান
- [ ] Custom role তৈরি + permission matrix UI

**নিরাপত্তা যাচাই (Security Tests):**
- [ ] সব API route-এ unauthorized → 401
- [ ] অন্য মাদ্রাসার data request → 403
- [ ] Expired token → 401
- [ ] CORS: শুধু configured origins

**সমাপ্তির চিহ্ন:** Postman দিয়ে সব auth endpoint ম্যানুয়ালি পরীক্ষা পাস। Unit tests পাস।

---

## ধাপ ২ — Super Admin Panel
**আনুমানিক সময়:** ৩ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Frontend Dev

### কাজের তালিকা

**Madrasa Registration & Approval:**
- [ ] Public registration page (React) — কোনো লগইন ছাড়েই জমা দেওয়া যাবে
- [ ] `POST /public/madrasa/apply` — Application submit
- [ ] Phone OTP verify (registration-এ)
- [ ] Application review UI (Super Admin)
- [ ] `POST /super/madrasa/:id/approve` — Approve + plan assign
  - BullMQ job: Schema create, Prisma migrate, default data seed, setup link generate
- [ ] `POST /super/madrasa/:id/reject` — Reject with reason + SMS to muhtamim
- [ ] Provisioning failure → auto rollback + alert

**Madrasa Directory:**
- [ ] `GET /super/madrasas` — Paginated + filtered list
- [ ] Filters: division, district, thana, type (qawmi/alia), status, plan, student_count_range
- [ ] Export: Excel (filtered results)
- [ ] Madrasa detail page: info, billing history, support tickets, last login

**Madrasa Control:**
- [ ] `PATCH /super/madrasa/:id/suspend` — Suspend with reason
- [ ] `PATCH /super/madrasa/:id/unsuspend` — Unsuspend
- [ ] `PATCH /super/madrasa/:id/change-plan` — Plan upgrade/downgrade
- [ ] SMS balance recharge

**Billing & Payments:**
- [ ] `GET /super/billing/invoices` — All invoices
- [ ] `POST /super/billing/invoices/:id/mark-paid` — Manual mark as paid
- [ ] Auto invoice generation (BullMQ monthly cron)
- [ ] Overdue reminder (BullMQ: 7 days, 3 days, 1 day before due)
- [ ] Sidebar notification badge: unpaid invoices count

**Support Inbox:**
- [ ] `GET /super/support/tickets` — All tickets (filterable)
- [ ] `POST /super/support/tickets/:id/reply` — Reply message
- [ ] `PATCH /super/support/tickets/:id/status` — Update status
- [ ] Assign to agency staff member
- [ ] Real-time notification (SSE or polling)

**Agency Staff Management:**
- [ ] `GET /super/agency/staff` — List all staff
- [ ] `POST /super/agency/staff` — Create new staff
- [ ] `PATCH /super/agency/staff/:id/permissions` — Update permissions
- [ ] `DELETE /super/agency/staff/:id` — Deactivate (soft delete)

**System Monitoring Dashboard:**
- [ ] CPU, RAM, Disk usage (from `/proc` or pm2 API)
- [ ] Database: connection count, active queries, slow queries
- [ ] Redis: memory, hit rate
- [ ] BullMQ: pending jobs, failed jobs
- [ ] Uptime: last 30 days (ping check per minute, stored in Redis)
- [ ] Server alerts: email + SMS if uptime < 99%
- [ ] Automation logs: last 50 system events

**সমাপ্তির চিহ্ন:** একটি নতুন মাদ্রাসা registration → approval → schema creation → setup link — সম্পূর্ণ flow কাজ করছে।

---

## ধাপ ৩ — Madrasa Admin Core
**আনুমানিক সময়:** ৩ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Frontend Dev

### কাজের তালিকা

**Academic Structure:**
- [ ] Department CRUD (বিভাগ)
- [ ] Class CRUD (জামাত) + Hijri year support
- [ ] Section CRUD (শাখা)
- [ ] Academic year management

**Student Management:**
- [ ] Admission application flow (online form → review → approve → student create)
- [ ] Student profile CRUD (সব ফিল্ড + ছবি upload → object storage)
- [ ] Guardian profiles (একজন ছাত্রের একাধিক অভিভাবক)
- [ ] Roll number assignment
- [ ] Bulk import from Excel (validation + preview before import)
- [ ] QR ID card generate (PDF, বাংলা font)
- [ ] Year-end promotion (class→next class, bulk for all students)
- [ ] Student search: name, code, guardian phone
- [ ] TC (Transfer Certificate) generate with QR verification

**Staff Management (HR):**
- [ ] Staff profile CRUD (teachers + admin staff)
- [ ] Digital service book: qualifications, join/leave dates, documents
- [ ] Subject-teacher assignment
- [ ] Custom role create + permission matrix UI
- [ ] User account create (phone + password) for each staff

**Madrasa Admin Dashboard:**
- [ ] KPI widgets: today's attendance %, today's collection, total due, fund balance
- [ ] Quick actions: new student, fee collection, notice
- [ ] Recent activities feed
- [ ] Notification center

**Settings Module:**
- [ ] Madrasa profile (name, logo, address, contact)
- [ ] Madrasa type: Qawmi / Alia (determines default grading, departments)
- [ ] Academic year setup (hijri + english calendar)
- [ ] Grading scale setup (per madrasa type, customizable)
- [ ] Holiday calendar (রমজান, ঈদ, সরকারি ছুটি)

**সমাপ্তির চিহ্ন:** একটি সম্পূর্ণ ছাত্রের প্রোফাইল তৈরি, QR ID card download করা যাচ্ছে।

---

## ধাপ ৪ — Fees & Finance (হিসাব মডিউল)
**আনুমানিক সময়:** ৪ সপ্তাহ | ⚠️ সর্বোচ্চ সতর্কতা
**দায়িত্বশীল:** Senior Backend Dev (সব code peer-reviewed)

> [!CAUTION]
> এই ধাপের প্রতিটি endpoint-এ Database Transaction বাধ্যতামূলক। কোনো আর্থিক লেখার কোড একা লেখা নিষিদ্ধ — peer review ছাড়া merge নয়।

### কাজের তালিকা

**Fund & Chart of Accounts:**
- [ ] Fund CRUD (তহবিল: সাধারণ, লিল্লাহ, যাকাত, সদকা, ওয়াকফ, নির্মাণ, কুরবানি)
- [ ] Default funds seed (নতুন মাদ্রাসায়)
- [ ] Chart of Accounts CRUD (ট্রি কাঠামো, fund-linked)
- [ ] Default accounts seed (income/expense categories)

**Fee Structure:**
- [ ] Fee structure setup (class-wise, type-wise)
- [ ] Different amounts for Qawmi vs Alia class structures
- [ ] Effective date range (পুরনো হার রেকর্ডে থাকবে)

**Invoice Management:**
- [ ] Monthly auto-invoice generation (BullMQ cron: 1st of every month)
- [ ] Preview before generation
- [ ] Manual invoice for late students
- [ ] Discount / waiver (maker enters → approver approves → Audit log)
- [ ] Due date reminders (BullMQ: SMS + Push)

**Cash Counter POS:**
- [ ] Student lookup by roll/QR/name
- [ ] Show all unpaid invoices for student
- [ ] Amount entry + payment method selection
- [ ] Transaction → DB Transaction:
  - invoice status update
  - receipt create (sequence number)
  - journal entry create (double-entry)
  - fund balance update
  - (all in single BEGIN/COMMIT)
- [ ] Receipt print (thermal printer via browser print API)
- [ ] Receipt SMS/Push to guardian (BullMQ)
- [ ] Daily cashier closing (system total vs hand count)

**Online Payment Integration:**
- [ ] SSLCommerz adapter
- [ ] bKash PGW adapter
- [ ] Nagad adapter
- [ ] Payment adapter interface (easy to add new gateways)
- [ ] IPN callback: signature verify → server-side amount verify → mark paid
- [ ] Idempotency: same transaction ID → reject duplicate

**Ledger & Reports:**
- [ ] Income ledger (grouped by account, fund, date)
- [ ] Expense ledger
- [ ] Fund-wise balance sheet
- [ ] Daily cashbook (cash in / cash out / closing balance)
- [ ] Monthly income-expense summary
- [ ] Trial balance
- [ ] Due list (by class, by guardian)
- [ ] All reports: PDF (বাংলা font) + Excel export

**Payroll:**
- [ ] Salary structure per teacher
- [ ] Monthly salary sheet (maker creates, approver approves)
- [ ] Payroll payment recording (fund-linked)
- [ ] Teacher salary slip (PDF → push to teacher app)
- [ ] Payroll register (all teachers, one month)

**Donation & Fund Collection:**
- [ ] Donor management (regular, one-time)
- [ ] Donation receipt (PDF + SMS)
- [ ] Fund-linked donation (কোন তহবিলে গেল দেখা যাবে)

**সমাপ্তির চিহ্ন:** একটি ফি আদায় → receipt তৈরি → journal entry → fund balance update → সব সঠিক। রিপোর্ট দেখা যাচ্ছে।

---

## ধাপ ৫ — Attendance & Timetable
**আনুমানিক সময়:** ২ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Frontend Dev

### কাজের তালিকা

- [ ] Timetable builder UI (drag-drop বা form-based)
- [ ] Teacher schedule view
- [ ] Student daily attendance (teacher app + web)
- [ ] Attendance: Asia/Dhaka timezone (সব তারিখ)
- [ ] Offline attendance (IndexedDB → sync queue) — web version
- [ ] Duplicate prevention: UNIQUE constraint (student, date, period)
- [ ] Absent notification → guardian (BullMQ: SMS + Push)
- [ ] Biometric device registration (serial + API key)
- [ ] ZKTeco pull integration (cron: fetch records every 5 min)
- [ ] ADMS push integration (endpoint + device API key verify)
- [ ] Staff attendance (biometric + manual)
- [ ] Monthly attendance report (student + staff)
- [ ] Late mark tracking
- [ ] Hijri calendar — ছুটির দিন চিহ্নিত (রমজান, ঈদ)

**সমাপ্তির চিহ্ন:** শিক্ষক web portal থেকে হাজিরা নিলে guardian SMS যাচ্ছে।

---

## ধাপ ৬ — Examination & Results
**আনুমানিক সময়:** ৩ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Frontend Dev

### কাজের তালিকা

- [ ] Exam creation (name, class, type, dates)
- [ ] Exam schedule / routine generate
- [ ] Admit card generate (PDF, QR-coded)
- [ ] Marks entry (teacher → per subject)
- [ ] Marks lock: after deadline → is_locked = true → change needs approval
- [ ] Grading calculation (Qawmi or Alia — based on madrasa type)
- [ ] Marksheet generate (individual, PDF + বাংলা font)
- [ ] Tabulation sheet (class-wise all students, Excel)
- [ ] Merit list (rank-based)
- [ ] Result publish: `is_published = true` → parent app দেখতে পাবে
- [ ] Befalq export format (Qawmi board registration data)
- [ ] Hifz progress tracking (sabaq, sabqi, manzil daily entry)
- [ ] Hifz progress graph (pages completed, projected completion)
- [ ] Hifz certificate generate (upon khatam)

**সমাপ্তির চিহ্ন:** একটি ক্লাসের পরীক্ষা → নম্বর এন্ট্রি → lock → publish → অভিভাবক অ্যাপে দেখা যাচ্ছে।

---

## ধাপ ৭ — Mobile App (Flutter)
**আনুমানিক সময়:** ৬ সপ্তাহ
**দায়িত্বশীল:** Flutter Developer

### কাজের তালিকা

**Setup:**
- [ ] Flutter project (Riverpod + go_router + Hive + Dio)
- [ ] Flavor: `parent` (OTP auth) + `teacher` (password auth)
- [ ] API interceptor: JWT attach + refresh on 401
- [ ] Push notification setup (FCM)

**Parent App:**
- [ ] OTP login (phone → SMS OTP → JWT)
- [ ] Multi-child support (one account, multiple children)
- [ ] Multi-madrasa support (child in different madrasas)
- [ ] Attendance: daily status, monthly calendar
- [ ] Hifz progress: daily sabaq, para progress graph
- [ ] Fee & Payment: unpaid invoices → bKash/Nagad payment
- [ ] Results: published marksheet
- [ ] Notices: push notification + in-app list
- [ ] Gatepass: request leave, notification on exit/return
- [ ] Profile: child photo, class, roll

**Teacher App:**
- [ ] Password login + TOTP 2FA
- [ ] Today's schedule
- [ ] Attendance marking (offline-first → Hive → sync)
- [ ] Hifz entry (sabaq, sabqi, manzil)
- [ ] Marks entry
- [ ] My attendance + leave application
- [ ] Salary slip (PDF view)
- [ ] Notice board

**Offline Sync:**
- [ ] Hive local storage for attendance + hifz
- [ ] Background sync queue (Dio interceptor)
- [ ] Conflict resolution: last successful sync wins (display conflict to admin)

**Build & Release:**
- [ ] Android APK + AAB (Play Store)
- [ ] iOS IPA (App Store)
- [ ] GitHub Actions: build on tag push

**সমাপ্তির চিহ্ন:** অভিভাবক অ্যাপ থেকে ফি পরিশোধ করা যাচ্ছে। শিক্ষক offline-এ হাজিরা নিচ্ছেন।

---

## ধাপ ৮ — Hostel, Library & Communication
**আনুমানিক সময়:** ২ সপ্তাহ
**দায়িত্বশীল:** Backend Dev + Frontend Dev

### কাজের তালিকা

**Hostel:**
- [ ] Room & bed management
- [ ] Room assignment (student → room → bed)
- [ ] Night attendance (hostel warden)
- [ ] Meal tracking (boarding students)

**Gatepass System:**
- [ ] Guardian requests from app
- [ ] Warden approves/rejects (push notification to guardian)
- [ ] QR token generate (signed JWT, valid until `to_date`)
- [ ] Gate scanner: QR scan → exit recorded → guardian notification
- [ ] Return scan → guardian notification

**Library:**
- [ ] Book catalog (Arabic + Bengali + Urdu name search)
- [ ] Book issue (student → book)
- [ ] Return + fine calculation
- [ ] Overdue reminders

**Communication:**
- [ ] Notice board CRUD (publish to class, department, all)
- [ ] Push notification on notice publish
- [ ] SMS: individual, class, all
- [ ] SMS cost preview before sending
- [ ] Bulk SMS (BullMQ queue, not instant — avoids gateway timeout)
- [ ] SMS log (real gateway response recorded)
- [ ] WhatsApp (optional — Business API if budget allows)

**সমাপ্তির চিহ্ন:** Guardian SMS পাঠানো হলে gateway response লগে আছে (মিথ্যা "sent" নয়)।

---

## ধাপ ৯ — Reports, DevOps & Production Launch
**আনুমানিক সময়:** ৩ সপ্তাহ
**দায়িত্বশীল:** Full Team

### কাজের তালিকা

**Reports & Export:**
- [ ] All reports: PDF (Noto Sans Bengali font embed) + Excel
- [ ] বাংলা সংখ্যা option (১২৩ বনাম 123)
- [ ] Report scheduler (auto-generate monthly reports, store in B2)
- [ ] Custom date range reports

**Backup System:**
- [ ] `pg_dump` with WAL-safe method (`VACUUM INTO` for SQLite, `pg_dump` for PG)
- [ ] AES-256 encryption of backup file
- [ ] Upload to Backblaze B2 (backup bucket, separate from files)
- [ ] Backup verification: restore test (monthly automated)
- [ ] Retention: 30 days daily, 12 months monthly
- [ ] PITR: PostgreSQL WAL archiving → recovery to any point in time
- [ ] Super admin notification: backup success/failure daily

**Monitoring & Alerting:**
- [ ] Uptime Kuma setup (self-hosted, monitors API + DB + Redis)
- [ ] Sentry integration (error + performance)
- [ ] Pino logs → structured JSON → log aggregation
- [ ] Alerting: downtime → SMS + Email to agency owner within 2 min
- [ ] BullMQ dashboard (bull-board): view queues, failed jobs
- [ ] Database slow query logging

**Security Hardening:**
- [ ] OWASP Top 10 checklist review
- [ ] Dependency audit (`npm audit`) — no high/critical vulnerabilities
- [ ] Secrets rotation procedure document
- [ ] Penetration test plan

**Production Deployment:**
- [ ] Production server setup (Ubuntu 22.04 LTS)
- [ ] Nginx production config (subdomain routing, SSL, gzip, cache headers)
- [ ] PM2 cluster mode (CPU count workers)
- [ ] Docker production images (non-root user, distroless)
- [ ] Blue-Green deployment script (zero downtime)
- [ ] Database connection pooling (PgBouncer)
- [ ] Production `.env` → HashiCorp Vault (never plaintext on server)
- [ ] Firewall: only 80, 443 open; PostgreSQL/Redis never exposed

**Pre-Launch Checklist:**
- [ ] Load test (k6 বা Artillery): 1000 concurrent users
- [ ] All API endpoints: auth required ✓
- [ ] No hardcoded secrets in codebase ✓
- [ ] Error messages: user-friendly বাংলায়, no stack traces in prod ✓
- [ ] Bangla font: all PDFs render correctly ✓
- [ ] Timezone: all dates in Asia/Dhaka ✓
- [ ] SMS: real delivery tested with actual number ✓
- [ ] Payment: sandbox + live test ✓
- [ ] Backup: restore tested ✓

**পাইলট লঞ্চ:**
- [ ] ১টি Qawmi মাদ্রাসা (কওমি টাইপ পরীক্ষা)
- [ ] ১টি Alia মাদ্রাসা (আলিয়া টাইপ পরীক্ষা)
- [ ] ১ মাস free trial → feedback collection
- [ ] Bug fixes → stable release

---

## সময়রেখা সারসংক্ষেপ

| ধাপ | বিষয় | সময় | ক্রমবর্ধমান |
|---|---|---|---|
| ধাপ ০ | Foundation | ১ সপ্তাহ | সপ্তাহ ১ |
| ধাপ ১ | Auth & RBAC | ২ সপ্তাহ | সপ্তাহ ৩ |
| ধাপ ২ | Super Admin | ৩ সপ্তাহ | সপ্তাহ ৬ |
| ধাপ ৩ | Madrasa Admin Core | ৩ সপ্তাহ | সপ্তাহ ৯ |
| ধাপ ৪ | Finance | ৪ সপ্তাহ | সপ্তাহ ১৩ |
| ধাপ ৫ | Attendance | ২ সপ্তাহ | সপ্তাহ ১৫ |
| ধাপ ৬ | Examination | ৩ সপ্তাহ | সপ্তাহ ১৮ |
| ধাপ ৭ | Mobile App | ৬ সপ্তাহ | সপ্তাহ ২৪ |
| ধাপ ৮ | Hostel + Library + SMS | ২ সপ্তাহ | সপ্তাহ ২৬ |
| ধাপ ৯ | DevOps + Launch | ৩ সপ্তাহ | সপ্তাহ ২৯ |
| **মোট** | | **~৭ মাস** | |

> **দ্রষ্টব্য:** ধাপ ৪, ৫, ৬ আংশিকভাবে সমান্তরালে চলতে পারে যদি একাধিক developer থাকে।

---

## Milestone Gates (মাইলস্টোন চেকপয়েন্ট)

```
M1 (সপ্তাহ ৩):  লগইন করা যাচ্ছে, permission কাজ করছে
M2 (সপ্তাহ ৬):  নতুন মাদ্রাসা provision করা যাচ্ছে
M3 (সপ্তাহ ৯):  ছাত্র ভর্তি ও ID card তৈরি হচ্ছে
M4 (সপ্তাহ ১৩): ফি আদায় ও রসিদ কাজ করছে (MVP Finance)
M5 (সপ্তাহ ১৮): পরীক্ষা ও ফলাফল publish হচ্ছে
M6 (সপ্তাহ ২৪): মোবাইল অ্যাপ পাবলিশ হয়েছে
M7 (সপ্তাহ ২৯): 🚀 Production Launch — পাইলট মাদ্রাসায় চালু
```
