# 🏗️ High-Level Architecture
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম

**সংস্করণ:** 1.0.0 | **অবস্থা:** অনুমোদিত ✅

---

## ১. সম্পূর্ণ সিস্টেম আর্কিটেকচার

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│                                                                     │
│  [Super Admin Browser]  [Madrasha Admin Browser]  [Flutter App]    │
│   admin.madrasha.app     jamia.madrasha.app        Android/iOS     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ HTTPS/TLS 1.3
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EDGE / CDN LAYER                              │
│                                                                     │
│   Nginx (Reverse Proxy)                                             │
│   ├── SSL Termination (Let's Encrypt / Cloudflare)                  │
│   ├── Rate Limiting (per IP + per user)                             │
│   ├── Subdomain Routing:                                            │
│   │    admin.madrasha.app  → Super Admin App                        │
│   │    *.madrasha.app      → Tenant App (subdomain = schema name)   │
│   ├── Static Files (React Build) → served directly                  │
│   └── API calls → forwarded to API servers                         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER (PM2 Cluster)                  │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│  │   Auth Service  │  │   Core API      │  │  Worker Service  │   │
│  │                 │  │   (Express)     │  │  (BullMQ)        │   │
│  │  • JWT Issue    │  │                 │  │                  │   │
│  │  • Token Verify │  │  • All Routes   │  │  • SMS Queue     │   │
│  │  • 2FA TOTP     │  │  • RBAC Check   │  │  • Email Queue   │   │
│  │  • OTP SMS      │  │  • Tenant Route │  │  • Backup Queue  │   │
│  │  • Refresh Token│  │  • File Upload  │  │  • Report Queue  │   │
│  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘   │
│           └─────────────────────┴───────────────────┘              │
│                                 │                                   │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL 16 Server (Primary + Replica)                    │  │
│  │                                                              │  │
│  │  public schema (Control DB):                                 │  │
│  │  ├── madrasa_registry    ├── billing_invoices                │  │
│  │  ├── subscription_plans  ├── agency_staff                    │  │
│  │  ├── support_tickets     └── system_audit_log               │  │
│  │                                                              │  │
│  │  m_001 schema (জামিয়া ঢাকা):    [isolated]                 │  │
│  │  m_002 schema (দারুল উলুম):      [isolated]                 │  │
│  │  m_NNN schema (...):              [isolated]                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────┐  ┌───────────────────┐  ┌────────────────┐   │
│  │  Redis 7        │  │  Object Storage   │  │ Secret Manager │   │
│  │                 │  │  (Backblaze B2)   │  │ (HashiCorp     │   │
│  │  • Sessions     │  │                  │  │  Vault / .env) │   │
│  │  • Cache        │  │  • Photos/Files  │  │                │   │
│  │  • BullMQ Queue │  │  • PDF Reports   │  │  • DB Passwords│   │
│  │  • Rate Limit   │  │  • Backups       │  │  • API Keys    │   │
│  └─────────────────┘  └───────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                │
│                                                                     │
│  SMS: BulkSMSBD / SSL Wireless (BTRC compliant)                    │
│  Payment: SSLCommerz + bKash PGW + Nagad (adapter pattern)         │
│  Push: Firebase FCM (Android + iOS notifications)                  │
│  Email: SMTP / SendGrid (low volume)                               │
│  Biometric: ZKTeco (Pull SDK) + ADMS (Push) — per-device API key  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ২. Multi-Tenant আর্কিটেকচার (Schema-per-Tenant)

### কেন Schema-per-Tenant?

| পদ্ধতি | Data Isolation | ব্যবস্থাপনা | আমাদের পছন্দ |
|---|---|---|---|
| Shared Table + `madrasa_id` | দুর্বল (RLS bug হলে ফাঁস) | সহজ | ❌ |
| Separate Database per tenant | সর্বোচ্চ | অনেক কঠিন (হাজারো DB) | ❌ |
| **Schema per tenant** | **শক্তিশালী** | **মাঝারি (অটোমেটেড)** | **✅** |

### কীভাবে কাজ করে?

```
Request আসে: https://jamia-dhaka.madrasha.app/api/students

Nginx → API Server
  ↓
Tenant Middleware:
  1. subdomain থেকে schema name বের করো: "jamia-dhaka" → "m_001"
  2. Control DB থেকে status যাচাই করো (active? suspended?)
  3. সেশনের madrasa_id === URL-এর madrasa_id কিনা মেলাও
  4. PostgreSQL connection: SET search_path = 'm_001'
  ↓
সব পরবর্তী Query স্বয়ংক্রিয়ভাবে "m_001" schema-তে যাবে
অন্য মাদ্রাসার schema স্পর্শ করা অসম্ভব
```

### Schema Provisioning (নতুন মাদ্রাসা অনুমোদনে):

```
সুপার অ্যাডমিন "অনুমোদন" বাটন চাপেন
  ↓
Provisioning Job (BullMQ):
  1. schema_name তৈরি: "m_" + zero-padded ID (m_001, m_002...)
  2. PostgreSQL: CREATE SCHEMA m_001
  3. Prisma Migration: সব টেবিল তৈরি
  4. Default Data: grading scales, chart of accounts, fee types
  5. Admin User তৈরি (first-login link সহ)
  6. SMS + Email: মাদ্রাসার মুহতামিমকে Setup Link পাঠানো
  ↓ (সব ব্যর্থ হলে rollback + সুপার অ্যাডমিনকে alert)
```

---

## ৩. নিরাপত্তা আর্কিটেকচার (Security Architecture)

### ৩.১ Authentication Flow

```
[Browser/App]  →  POST /auth/login
                    ↓
              Argon2id verify password
                    ↓
              2FA চালু আছে?
              Yes → temp_token পাঠাও, TOTP চাও
              No  → সরাসরি token দাও
                    ↓
              Access Token (JWT, 15 min, RS256)
              Refresh Token (opaque, 7 days, Redis-stored)
                    ↓
[Browser] → সব request-এ: Authorization: Bearer <access_token>
                    ↓
              JWT verify → tenant check → permission check
                    ↓
              Controller Logic
```

### ৩.২ RBAC (Role-Based Access Control)

```
Permission Check: requirePermission('fees', 'approve')
  ↓
user.role.permissions['fees']['approve'] === true?
  Yes → চলো
  No  → 403 Forbidden
```

### ৩.৩ Network Security

```
Internet → Cloudflare (DDoS Protection) → Nginx
                                            ↓
                                     Rate Limit:
                                     - Login: 5/min per IP
                                     - API: 100/min per user
                                     - File Upload: 10/min per user
                                            ↓
                                     Application Server
                                            ↓
                              Private Network (VPC/VLAN)
                                            ↓
                                     Database Server
                                     (ইন্টারনেট থেকে সরাসরি access নেই)
```

---

## ৪. Offline-First Architecture (মোবাইল অ্যাপ)

```
Flutter App
├── Online Mode:
│   └── API → Real-time data
│
└── Offline Mode (Service Worker + Hive DB):
    ├── হাজিরা নেওয়া → Hive-এ সংরক্ষণ
    ├── সবক এন্ট্রি → Hive-এ সংরক্ষণ
    └── Internet ফিরলে → Sync Queue
                              ↓
                    Conflict Resolution Rules:
                    - একই ছাত্রের একই দিনের হাজিরা → সর্বশেষ জেতে
                    - দুই ডিভাইসে ভিন্ন status → "Conflict" flag → Admin সমাধান করবেন
```

---

## ৫. Deployment Architecture

```
Development:
  docker-compose up
  → PostgreSQL 16 + Redis 7 + Nginx (local)
  → API: localhost:3000
  → Web: localhost:5173 (Vite HMR)

Staging:
  GitHub Actions → Build → Docker Image → VPS (Staging Server)
  → auto migration → smoke tests

Production:
  GitHub Actions → Build → Docker Image → VPS (Production)
  → Blue-Green deployment (zero downtime)
  → Automated backup to Backblaze B2
```

---

## ৬. কওমি ও আলিয়া — উভয়ের সাপোর্ট

| ফিচার | কওমি মাদ্রাসা | আলিয়া মাদ্রাসা |
|---|---|---|
| শ্রেণি কাঠামো | ইবতিদায়ি → মুতাওয়াসিতা → সানাভিয়া → ফজিলত → তাকমিল | ইবতিদায়ি → দাখিল → আলিম → ফাজিল → কামিল |
| গ্রেডিং | মুমতাজ / জায়্যিদ জিদ্দান / জায়্যিদ / মাকবুল / রাসিব | GPA 5.0 সিস্টেম (A+/A/A-/B/C/D/F) |
| ক্যালেন্ডার | হিজরি প্রাথমিক | ইংরেজি প্রাথমিক |
| বিষয় | আরবি, হাদিস, ফিকহ, তাফসির, বালাগাত | বাংলা, ইংরেজি, গণিত, ইসলামিক স্টাডিজ |
| পরীক্ষা বোর্ড | বেফাক / ইত্তেহাদ / তানজিম | বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড |
| MPO | প্রযোজ্য নয় | প্রযোজ্য (সরকারি শিক্ষক বেতন) |
| হিফজ বিভাগ | হ্যাঁ (প্রাথমিক ফিচার) | ঐচ্ছিক |
| শ্রেণিকক্ষ ভাষা | আরবি + বাংলা | বাংলা + ইংরেজি |

**বাস্তবায়ন পদ্ধতি:** মাদ্রাসা নিবন্ধনের সময় `type: 'qawmi' | 'alia'` নির্বাচন করবে। এর ভিত্তিতে:
- Default গ্রেডিং স্কেল সেট হবে
- Default বিভাগ কাঠামো সেট হবে
- UI-তে প্রাসঙ্গিক ভাষা ও ফিচার দেখাবে
- তবে সবকিছু কাস্টমাইজ করার সুযোগ থাকবে
