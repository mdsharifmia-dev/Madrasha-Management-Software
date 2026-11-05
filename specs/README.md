# Specs সূচিপত্র (Index)
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম

> এই `specs/` ফোল্ডারে প্রজেক্টের সম্পূর্ণ পরিকল্পনা আছে।
> কোড লেখার আগে সংশ্লিষ্ট spec পড়া বাধ্যতামূলক।

---

## ফাইল তালিকা

| ফাইল | বিষয় | পড়বেন কখন |
|---|---|---|
| [00_PROJECT_CONSTITUTION.md](./00_PROJECT_CONSTITUTION.md) | প্রজেক্টের সর্বোচ্চ নিয়মকানুন | সবার আগে, একবার হলেও |
| [01_ARCHITECTURE.md](./01_ARCHITECTURE.md) | High-Level সিস্টেম আর্কিটেকচার | যেকোনো নতুন ফিচার শুরুর আগে |
| [02_DATABASE_SCHEMA.md](./02_DATABASE_SCHEMA.md) | সম্পূর্ণ Database Schema | ডাটাবেস কাজ শুরুর আগে |
| [03_TECH_STACK.md](./03_TECH_STACK.md) | প্রযুক্তি তালিকা ও নিয়ম | Onboarding-এ নতুন developer-এর জন্য |
| [04_IMPLEMENTATION_ROADMAP.md](./04_IMPLEMENTATION_ROADMAP.md) | ধাপে ধাপে রোডম্যাপ + চেকলিস্ট | প্রতিটি ধাপ শুরুর আগে |

---

## মূল সিদ্ধান্ত (Quick Reference)

- **Database:** PostgreSQL 16, Schema-per-Tenant
- **Backend:** Node.js + TypeScript + Express + Prisma + BullMQ
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Mobile:** Flutter 3 (Android + iOS)
- **Auth:** JWT (RS256) + Argon2id + TOTP 2FA
- **Queue:** BullMQ + Redis 7
- **Storage:** Backblaze B2 (files + backups)
- **SMS:** BulkSMSBD / SSL Wireless
- **Payment:** SSLCommerz + bKash + Nagad (adapter pattern)
- **Madrasa Types:** Qawmi + Alia (উভয় সমর্থিত)

## সর্বোচ্চ অগ্রাধিকার (Top Priorities)

1. Auth ছাড়া কোনো ব্যবসায়িক কোড নয়
2. আর্থিক রেকর্ড মুছা বা edit নিষিদ্ধ
3. Database Transaction ছাড়া আর্থিক অপারেশন নিষিদ্ধ
4. কোনো Secret কোডে নয়
5. TypeScript strict mode — `any` নিষিদ্ধ
