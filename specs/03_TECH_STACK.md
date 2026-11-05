# ️ Tech Stack Specification
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম

**সংস্করণ:** 1.0.0 | **অবস্থা:** অনুমোদিত 

---

## ১. সম্পূর্ণ Tech Stack তালিকা

### ১.১ Backend (API Server)

| স্তর | প্রযুক্তি | সংস্করণ | কারণ |
|---|---|---|---|
| Runtime | **Node.js** | ≥ 20 LTS | Mature, large ecosystem, team familiarity |
| Language | **TypeScript** | 5.x | Type-safety, refactoring confidence, auto-docs |
| Framework | **Express.js** | 5.x | Simple, flexible, huge community |
| Validation | **Zod** | 3.x | TypeScript-native, schema inference |
| ORM | **Prisma** | 5.x | Type-safe queries, migration tool, schema-per-tenant support |
| Auth | **jose** (JWT) | 5.x | RFC-compliant JWT, RS256, supports JWKS |
| Password | **Argon2** | latest | Industry-best password hashing |
| 2FA | **otpauth** | latest | TOTP generation & verification |
| Queue | **BullMQ** | 5.x | Redis-based, reliable, retries, delayed jobs |
| File Upload | **Multer** | latest | Multipart form handling |
| HTTP Client | **undici** | latest | Fast, Node.js built-in style |
| Logging | **Pino** | 9.x | Structured JSON logging, fast |
| Security | **Helmet** | latest | Security headers |
| Rate Limit | **express-rate-limit** | latest | IP + User based limiting |
| CORS | **cors** | latest | Configured, not wildcard |
| Testing | **Vitest** | latest | Fast, TypeScript native |
| API Docs | **zod-openapi** | latest | Auto-generate OpenAPI from Zod schemas |

### ১.২ Frontend (Admin Web App)

| স্তর | প্রযুক্তি | সংস্করণ | কারণ |
|---|---|---|---|
| Framework | **React** | 18.x | Stable, large ecosystem |
| Language | **TypeScript** | 5.x | Same as backend, shared types |
| Build Tool | **Vite** | 5.x | Fast HMR, small bundle, offline-ready |
| Styling | **Tailwind CSS** | 3.x | Build-time CSS (CDN নয়), utility-first |
| Components | **shadcn/ui** | latest | Accessible, customizable, copy-paste |
| State | **Zustand** | 4.x | Simple, no boilerplate |
| Server State | **TanStack Query** | 5.x | Caching, background refetch, optimistic UI |
| Forms | **React Hook Form + Zod** | latest | Performant, type-safe validation |
| Tables | **TanStack Table** | 8.x | Virtual scroll, filtering, sorting |
| Charts | **Recharts** | latest | React-native, responsive |
| i18n | **react-i18next** | latest | বাংলা + English language support |
| Icons | **Lucide React** | latest | Consistent icon set |
| PDF | **@react-pdf/renderer** | latest | বাংলা font support, server or client-side |
| Excel | **xlsx** | latest | Export to Excel |
| Offline | **Workbox** (Service Worker) | latest | Cache assets + API responses |

### ১.৩ Mobile App (Flutter)

| স্তর | প্রযুক্তি | সংস্করণ | কারণ |
|---|---|---|---|
| Framework | **Flutter** | 3.x | একটি কোড → Android + iOS |
| Language | **Dart** | 3.x | — |
| State | **Riverpod** | 2.x | Type-safe, testable |
| HTTP | **Dio** | latest | Interceptors, retry, token refresh |
| Local DB | **Hive** | 2.x | Fast offline storage |
| Navigation | **go_router** | latest | Declarative, deep link |
| Push Notif | **firebase_messaging** | latest | FCM Android + iOS |
| Payment | **bkash_pgw / nagad SDK** | latest | In-app payment |
| QR Scan | **mobile_scanner** | latest | Camera QR/barcode |
| Biometric Auth | **local_auth** | latest | Fingerprint/Face for app unlock |

### ১.৪ Infrastructure

| স্তর | প্রযুক্তি | সংস্করণ | কারণ |
|---|---|---|---|
| Database | **PostgreSQL** | 16 | ACID, Schema-per-tenant, JSON support |
| Cache / Queue | **Redis** | 7.x | Session store, BullMQ backend, cache |
| Reverse Proxy | **Nginx** | latest | SSL, subdomain routing, static files |
| Process Manager | **PM2** | latest | Clustering, auto-restart, logs |
| Containerization | **Docker + Compose** | latest | Dev parity, easy deploy |
| CI/CD | **GitHub Actions** | — | Free for public, powerful |
| Secret Management | **HashiCorp Vault** (prod) / `.env` (dev) | — | No secrets in code |
| Object Storage | **Backblaze B2** | — | Cheap S3-compatible, backups, files |
| Email | **Nodemailer + SMTP** | — | Low volume, any SMTP |
| SMS | **BulkSMSBD** or **SSL Wireless** | — | BTRC compliant, Bangladesh |
| Push | **Firebase FCM** | — | Android + iOS |
| Monitoring | **Uptime Kuma** | latest | Self-hosted uptime monitor |
| Error Tracking | **Sentry** | latest | Error + performance tracking |

---

## ২. Developer Experience (DX) Tools

```
Root Level (Monorepo: npm workspaces):
├── ESLint + TypeScript ESLint  → Code quality
├── Prettier                    → Consistent formatting
├── Husky + lint-staged         → Pre-commit hooks
├── Commitlint                  → Conventional commits
├── Vitest                      → Unit + Integration tests
└── GitHub Actions              → CI on every PR
```

---

## ৩. Project Monorepo কাঠামো

```
madrasha-platform/          ← Git root
│
├── package.json            ← Root (npm workspaces)
│
├── apps/
│   ├── api/                ← Node.js API
│   │   ├── src/
│   │   │   ├── config/         config, env validation (Zod)
│   │   │   ├── middleware/      auth, rbac, tenant, error handler
│   │   │   ├── modules/
│   │   │   │   ├── auth/        login, refresh, 2fa, otp
│   │   │   │   ├── super-admin/ madrasa registry, billing, support
│   │   │   │   ├── students/    profiles, admissions, promotion
│   │   │   │   ├── hifz/        sabaq, sabqi, manzil
│   │   │   │   ├── attendance/  student + staff + biometric
│   │   │   │   ├── exams/       create, results, publish
│   │   │   │   ├── fees/        structures, invoices, receipts, POS
│   │   │   │   ├── ledger/      journal entries, reports
│   │   │   │   ├── payroll/     salary, slips
│   │   │   │   ├── hostel/      rooms, gatepasses
│   │   │   │   ├── library/     books, issues
│   │   │   │   ├── notices/     board, SMS, push
│   │   │   │   └── reports/     PDF, Excel generators
│   │   │   ├── workers/         BullMQ processors
│   │   │   │   ├── sms.worker.ts
│   │   │   │   ├── backup.worker.ts
│   │   │   │   ├── invoice.worker.ts    auto monthly invoice
│   │   │   │   └── reminder.worker.ts   due date reminders
│   │   │   ├── prisma/          schema.prisma + migrations
│   │   │   └── app.ts           Express app entry
│   │   └── package.json
│   │
│   ├── web/                ← React Admin Panel
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── super-admin/
│   │   │   │   └── madrasa-admin/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store/      (Zustand)
│   │   │   └── lib/        (API client, utils)
│   │   └── package.json
│   │
│   └── mobile/             ← Flutter App
│       ├── lib/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   ├── attendance/
│       │   │   ├── hifz/
│       │   │   ├── fees/
│       │   │   └── notices/
│       │   └── main.dart
│       └── pubspec.yaml
│
├── packages/
│   ├── shared-types/       ← TypeScript types (shared between api + web)
│   └── utils/              ← Pure utility functions
│
├── infra/
│   ├── nginx/nginx.conf
│   ├── docker/
│   │   ├── Dockerfile.api
│   │   └── Dockerfile.web
│   └── scripts/
│       ├── backup.sh
│       └── provision-tenant.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml          test + lint on PR
│       └── deploy.yml      deploy on merge to main
│
├── docker-compose.yml      Dev environment
├── docker-compose.prod.yml Production
├── .env.example
└── README.md
```

---

## ৪. Environment Variables (.env.example)

```bash
# ============================================
# SERVER
# ============================================
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000
WEB_BASE_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,https://admin.madrasha.app

# ============================================
# DATABASE (Control DB)
# ============================================
DATABASE_URL=postgresql://postgres:CHANGEME@localhost:5432/madrasha_control
DATABASE_MAX_CONNECTIONS=20

# ============================================
# REDIS
# ============================================
REDIS_URL=redis://:CHANGEME@localhost:6379

# ============================================
# JWT (use RS256 — generate with: openssl genrsa -out private.pem 2048)
# ============================================
JWT_PRIVATE_KEY_PATH=./keys/private.pem
JWT_PUBLIC_KEY_PATH=./keys/public.pem
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ============================================
# ENCRYPTION (for sensitive fields)
# ============================================
FIELD_ENCRYPTION_KEY=CHANGEME_32_BYTE_HEX_KEY

# ============================================
# SMS GATEWAY (BulkSMSBD or SSL Wireless)
# ============================================
SMS_PROVIDER=bulksmsbd
SMS_API_KEY=CHANGEME
SMS_SENDER_ID=MADRASHA

# ============================================
# PAYMENT GATEWAYS
# ============================================
SSLCOMMERZ_STORE_ID=CHANGEME
SSLCOMMERZ_STORE_PASS=CHANGEME
SSLCOMMERZ_IS_SANDBOX=true

BKASH_APP_KEY=CHANGEME
BKASH_APP_SECRET=CHANGEME
BKASH_USERNAME=CHANGEME
BKASH_PASSWORD=CHANGEME
BKASH_IS_SANDBOX=true

# ============================================
# FIREBASE (Push Notifications)
# ============================================
FIREBASE_PROJECT_ID=CHANGEME
FIREBASE_CLIENT_EMAIL=CHANGEME
FIREBASE_PRIVATE_KEY=CHANGEME

# ============================================
# OBJECT STORAGE (Backblaze B2 / S3-compatible)
# ============================================
STORAGE_ENDPOINT=https://s3.us-west-004.backblazeb2.com
STORAGE_BUCKET=madrasha-files
STORAGE_ACCESS_KEY=CHANGEME
STORAGE_SECRET_KEY=CHANGEME

# ============================================
# BACKUP
# ============================================
BACKUP_STORAGE_BUCKET=madrasha-backups
BACKUP_ENCRYPTION_KEY=CHANGEME_32_BYTE_HEX_KEY
BACKUP_RETENTION_DAYS=30
```

---

## ৫. গুরুত্বপূর্ণ: যা কখনো করা যাবে না

```
❌ CDN থেকে Tailwind/Bootstrap লোড করা (offline breaks)
❌ সরাসরি SQL string concatenation (Prisma use করতে হবে)
❌ console.log production-এ (Pino logger use করতে হবে)
❌ any TypeScript type ব্যবহার (strict mode on)
❌ .env ফাইল Git-এ push করা (.gitignore তে আছে)
❌ process.env সরাসরি কোডে (config/env.ts থেকে Zod-validated import)
❌ setTimeout/setInterval দিয়ে background jobs (BullMQ use করতে হবে)
❌ Date.now() দিয়ে unique IDs (DB sequence use করতে হবে)
❌ 'any' cast দিয়ে TypeScript এড়ানো
❌ Feature branch ছাড়া main-এ সরাসরি commit
```
