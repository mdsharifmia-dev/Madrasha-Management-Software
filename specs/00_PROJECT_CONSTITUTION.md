# 📜 প্রজেক্ট কনস্টিটিউশন (Project Constitution)
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম (Madrasha ERP SaaS)

> **এটি প্রজেক্টের সর্বোচ্চ দলিল।** যেকোনো সিদ্ধান্ত, কোড, বা ডিজাইনে দ্বন্দ্ব হলে এই দলিলই চূড়ান্ত।
> এই দলিল পরিবর্তন করতে হলে প্রজেক্ট মালিকের স্পষ্ট অনুমোদন লাগবে।

**সংস্করণ:** 1.0.0
**তারিখ:** ২০২৬-১০-১৪
**অবস্থা:** অনুমোদিত ✅

---

## ১. প্রজেক্টের লক্ষ্য

বাংলাদেশের **কওমি ও আলিয়া** — উভয় ধরনের মাদ্রাসার জন্য একটি **Multi-tenant SaaS ERP** প্ল্যাটফর্ম তৈরি করা, যেখানে:

- একটি সুপার অ্যাডমিন হাজারো মাদ্রাসা পরিচালনা করতে পারবেন।
- প্রতিটি মাদ্রাসার ডাটা সম্পূর্ণ আলাদা ও নিরাপদ থাকবে।
- গ্রামের ধীর ইন্টারনেটেও কাজ করবে।
- মোবাইল অ্যাপ দিয়ে অভিভাবক ও শিক্ষক সহজে ব্যবহার করতে পারবেন।

---

## ২. মূল সিদ্ধান্তসমূহ (Irreversible Decisions)

| # | সিদ্ধান্ত | বিস্তারিত |
|---|---|---|
| D-01 | **শূন্য থেকে শুরু** | পুরনো Express + SQLite কোড বাদ দেওয়া হয়েছে। সম্পূর্ণ নতুন কোডবেস। |
| D-02 | **উভয় মাদ্রাসা টাইপ** | কওমি ও আলিয়া — উভয়ের ওয়ার্কফ্লো, গ্রেডিং ও কাঠামো সমর্থিত। |
| D-03 | **PostgreSQL** | মাল্টি-টেন্যান্সির জন্য Schema-per-tenant। SQLite নয়। |
| D-04 | **TypeScript সর্বত্র** | Backend, Frontend — সব জায়গায়। সাধারণ JavaScript নিষিদ্ধ। |
| D-05 | **Auth প্রথমে** | কোনো ব্যবসায়িক ফিচার Auth ছাড়া কোড করা যাবে না। |
| D-06 | **আর্থিক রেকর্ড অপরিবর্তনীয়** | ফি/বেতনের কোনো Entry DELETE বা UPDATE নয়, শুধু Reversal। |
| D-07 | **কোনো Secret কোডে নয়** | সব credential `.env` থেকে, Production-এ Secret Manager থেকে। |
| D-08 | **Flutter Mobile** | একটি কোড — Android + iOS। |

---

## ৩. সিস্টেমের স্তরবিন্যাস

```
সুপার অ্যাডমিন (আপনি / আপনার এজেন্সি)
    └── মাদ্রাসা অ্যাডমিন (মুহতামিম / প্রিন্সিপাল)
            ├── বিভাগীয় স্টাফ (হিসাবরক্ষক, ক্যাশিয়ার, পরীক্ষা নিয়ন্ত্রক...)
            ├── শিক্ষক (উস্তাদ)
            └── অভিভাবক + ছাত্র (মোবাইল অ্যাপ)
```

---

## ৪. নিরাপত্তার অলঙ্ঘনীয় নিয়ম

1. সব `GET /api/*` বাদে সব route-এ `authenticateJWT` middleware বাধ্যতামূলক।
2. প্রতিটি Protected route-এ `requirePermission('module', 'action')` চেক।
3. পাসওয়ার্ড হ্যাশ: **Argon2id** — bcrypt বা MD5 সম্পূর্ণ নিষিদ্ধ।
4. আর্থিক অপারেশন: **Database Transaction (`BEGIN/COMMIT`)** ছাড়া নিষিদ্ধ।
5. `innerHTML` তে raw user data সম্পূর্ণ নিষিদ্ধ — `textContent` বা escaped।
6. Receipt Number: **DB Sequence** থেকে — `Date.now()` নিষিদ্ধ।
7. সব তারিখ: **Asia/Dhaka** timezone-এ — UTC naive date নিষিদ্ধ।
8. Audit Log: শুধু **INSERT** — UPDATE বা DELETE নিষিদ্ধ।
9. Biometric/IoT device: **API Key** যাচাই ছাড়া কোনো data গ্রহণ নয়।
10. SMS "সফল" বার্তা: **Gateway থেকে সত্যিকারের response** না পেলে দেখানো নিষিদ্ধ।

---

## ৫. Spec-Kit কর্মপ্রবাহ

```
Constitution → Specification → Plan → Tasks → Implementation → Review
```

- **কোনো কোড লেখার আগে** সেই Module-এর Specification ফাইল তৈরি করতে হবে।
- **কোনো Specification ছাড়া** কোনো Task শুরু করা যাবে না।
- **প্রতিটি ধাপ** সম্পূর্ণ ও পরীক্ষিত হওয়ার পর পরবর্তী ধাপ।

---

## ৬. ফোল্ডার কাঠামো (Repository Structure)

```
madrasha-platform/
├── specs/                  ← এই ফোল্ডার (সব পরিকল্পনা)
│   ├── 00_PROJECT_CONSTITUTION.md
│   ├── 01_ARCHITECTURE.md
│   ├── 02_DATABASE_SCHEMA.md
│   ├── 03_TECH_STACK.md
│   └── 04_IMPLEMENTATION_ROADMAP.md
│
├── apps/
│   ├── api/                ← Node.js + TypeScript Backend
│   ├── web/                ← React + Vite Frontend (Admin Panels)
│   └── mobile/             ← Flutter App (Parent + Teacher)
│
├── packages/
│   ├── shared-types/       ← TypeScript Types (API + DB)
│   ├── ui-components/      ← Shared UI Components
│   └── utils/              ← Shared utility functions
│
├── infra/
│   ├── docker/             ← Docker + Compose files
│   ├── nginx/              ← Nginx config
│   └── scripts/            ← DB migration, backup scripts
│
├── .github/
│   └── workflows/          ← CI/CD pipelines
│
├── .env.example            ← Template (কোনো আসল value নয়)
├── docker-compose.yml      ← Development environment
└── README.md
```
