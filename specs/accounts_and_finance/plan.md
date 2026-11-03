# 🏗️ Technical Architecture & Implementation Plan: Accounts & Finance Module

**মডিউল:** হিসাব ও অর্থ বিভাগ  
**ভার্সন:** 2.0.0 | **তারিখ:** ২০ অক্টোবর ২০২৬  

---

## ১. স্টেট আর্কিটেকচার ও ডেটা মডেলস (Data Models)

### ক. প্রধান অপারেশনাল মোড ও পোর্টাল নির্বাচন
```typescript
type FinanceMainTab = 'RECEIVE_MONEY' | 'EXPENSE_PAY' | 'REPORTS_AUDIT';

type ReceivePortal = 
  | 'STUDENT_FEES'     // ১. স্টুডেন্ট ফি কালেকশন (ইউনিক রেজি নং ও কিউআর)
  | 'ZAKAT_FUND'       // ২. যাকাত ফান্ড (কাস্টমাইজেবল দাতা ফর্ম ও হোয়াটসঅ্যাপ)
  | 'LILLAH_BOARDING'  // ৩. লিল্লাহ বোর্ডিং ও এতিম তহবিল
  | 'WAQF_BUILD'       // ৪. ওয়াকফ ও স্থায়ী নির্মাণ ফান্ড
  | 'MOSQUE_BOX';      // ৫. মসজিদ ও মাদ্রাসা দান বাক্স

type ExpensePortal =
  | 'MESS_BAZAR'       // ১. দৈনিক ও সাপ্তাহিক মেস বাজার খরচ
  | 'CAPITAL_REPAIR'   // ২. স্থায়ী খরচ, নির্মাণ ও বড় মেরামত
  | 'TEACHER_SALARY'   // ৩. শিক্ষক ও কর্মচারীদের বেতন ও সম্মানী
  | 'WELFARE_AID'      // ৪. সাহায্য ও ছাত্রকল্যাণ অনুদান বিতরণ
  | 'UTILITY_ADMIN';   // ৫. ইউটিলিটি বিল ও প্রাতিষ্ঠানিক পরিচালনা
```

### খ. ইউনিক রেজিস্ট্রেশন নম্বরসহ স্টুডেন্ট মডেল (`StudentAccountProfile`)
```typescript
interface StudentAccountProfile {
  registrationNo: string; // e.g. "REG-2026-0001" (১০০% ইউনিক)
  roll: string;
  nameBn: string;
  fatherNameBn: string;
  motherNameBn: string;
  classGradeBn: string;
  batchSessionBn: string;
  guardianPhone: string;
  dueAmount: number;
  monthlyFee: number;
}
```

### গ. শরীয়াহ ফান্ড মডেল (`ShariahFund`)
```typescript
interface ShariahFund {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string;
  type: 'GENERAL' | 'ZAKAT_LILLAH' | 'SALARY_RESERVE' | 'CONSTRUCTION_WAQF' | 'GOVT_MPO';
  balance: number;
  description: string;
  isRestricted: boolean;
  color: string;
}
```

### ঘ. কাস্টমাইজেবল অ্যাডমিন থ্রেশহোল্ড ও এপ্রুভাল লিমিট (`approvalThresholdLimit`)
```typescript
const [approvalThresholdLimit, setApprovalThresholdLimit] = useState<number>(10000);
// অ্যাডমিন/মুহতামিম এই লিমিট পরিবর্তন করতে পারবে।
// যেকোনো খরচের পরিমাণ >= approvalThresholdLimit হলে তা অটোমেটিক মুহতামিমের পারমিশন বোর্ডে যাবে।
```

---

## ২. ইউআই কম্পোনেন্ট লেআউট (UI Layout Structure)

1. **টপ হেডার ও ব্যালেন্স সামারি বার:**
   - ৫টি শরিয়াহ ফান্ডের লাইভ ব্যালেন্স ব্যাজ (সাধারণ, যাকাত/লিল্লাহ, বেতন রিজার্ভ, ওয়াকফ, সরকারি/এমপিও)।
   - অ্যাডমিন অনুমোদন সীমা কনফিগ বোতাম `[⚙️ এপ্রুভাল লিমিট: ৳১০,০০০]`.
2. **প্রধান দুই অ্যাকশন মোড ট্যাব (Hero Operation Tabs):**
   - `[📥 টাকা গ্রহণ (Receive Money)]` (সবুজ থিম)
   - `[📤 টাকা ব্যয় / খরচ (Expense / Pay Money)]` (অ্যাম্বার/লাল থিম)
   - `[📊 অডিট ও ক্লোজিং রিপোর্ট (Reports & Closing)]` (নীল থিম)
3. **পোর্টাল নির্বাচন গ্রিড (1-Click Portals):**
   - টাকা গ্রহণের অধীনে ৫টি ডেডিকেটেড পোর্টাল ট্যাব।
   - টাকা ব্যয়ের অধীনে ৫টি ডেডিকেটেড পোর্টাল ট্যাব।
4. **সংশ্লিষ্ট পোর্টাল ফর্ম ও লাইভ অ্যাকশনস:**
   - স্টুডেন্ট ফি পোর্টালে ইউনিক রেজি নং অটো-লুকআপ ও কিউআর স্ক্যান বাটন।
   - যাকাত/লিল্লাহ পোর্টালে হোয়াটসঅ্যাপ ও কাস্টমাইজেবল দাতা ফর্ম।
   - ব্যয়ের সকল পোর্টালে সুনির্দিষ্ট ফান্ড নির্বাচন ও থ্রেশহোল্ড ওয়ার্নিং।
5. **প্রিন্ট ও ভাউচার ইন্টিগ্রেশন:**
   - ৮০মিমি থার্মাল ও A4/A5 প্রাতিষ্ঠানিক প্যাড রসিদ, স্যালারি স্লিপ ইত্যাদি অক্ষুণ্ণ রাখা।


---

## ২. ইউআই ও কম্পোনেন্ট আর্কিটেকচার (Frontend Layout in `finance` View)

1. **টপ কেপিআই ব্যানার (Financial Health & Fund Segregation Banner):**
   - সাধারণ তহবিল ব্যালেন্স (৳), যাকাত ও লিল্লাহ ফান্ড ব্যালেন্স (৳), আজকের নগদ আদায় (৳), বকেয়া স্থিতি (৳)।
2. **কোর ট্যাব নেভিগেশন (Sub-Tabs):**
   - 💳 **কাউন্টার পিওএস ও অনলাইন কালেকশন কিউ (Counter POS & Online Queue)**
   - 📜 **ফি রসিদ ও ভাউচার রেজিস্টার (Receipts Register with Thermal & A4/A5 Print View)**
   - 🛒 **মেস বাজার ও মাদ্রাসার ব্যয় ভাউচার (Expense & Requisitions)**
   - 👨‍🏫 **আসাতায়ে কেরাম পে-রোল ও বেতন শিট (Teacher Payroll & Salary Slips)**
   - 🎁 **দান, যাকাত ও আজীবন দাতা (Donation & Waqf CRM)**
   - 📊 **দিনশেষের ক্যাশ ক্লোজিং ও অডিট রিপোর্ট (Daily Closing & Flexible Reports)**
3. **প্রিন্ট ইঞ্জিন:**
   - থার্মাল পিওএস রসিদ (Thermal 80mm/58mm) মডাল ও ব্রাউজার ডিরেক্ট প্রিন্ট।
   - অফিসিয়াল প্যাড A4/A5 ভাউচার প্রিন্ট ফরম্যাট।
