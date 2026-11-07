import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Smartphone,
  QrCode,
  FileText,
  RotateCcw,
  Send,
  Download,
  RefreshCw,
  FileSpreadsheet,
  Bed,
  Utensils,
  CheckCheck,
  Sun,
  Moon,
  Bell,
  AlertTriangle,
  ExternalLink,
  MoreVertical,
  MoreHorizontal,
  LogIn,
  Ban,
  Trash2,
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Package,
  Database,
  Globe,
  Settings,
  Sliders,
  Eye,
  Check,
  GraduationCap,
  Scale,
  ShieldCheck,
  HeartPulse,
  UserCheck,
  UserX,
  Megaphone,
  Key,
  X,
  Clock,
  Printer,
  Receipt,
  Calendar,
  Wallet,
  Coins,
  ShoppingBag,
  Building,
  MessageCircle,
  Wrench,
  HeartHandshake,
  Zap,
} from 'lucide-react';

interface Madrasa {
  id: string;
  code: string;
  nameBn: string;
  division: string;
  district: string;
  thana: string;
  type: string;
  students: number;
  status: 'ACTIVE' | 'BLOCKED';
  plan: 'Basic' | 'Standard' | 'Enterprise';
  renewalDue: boolean;
}

interface DepartmentStaff {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'ACTIVE' | 'HOLD';
  assignedDate: string;
}

interface DepartmentItem {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string;
  category: 'FINANCE' | 'ACADEMIC' | 'ADMIN' | 'FACILITY';
  assignedStaff: DepartmentStaff[];
  status: 'ACTIVE' | 'HOLD' | 'UNASSIGNED';
  statsSummary: string;
  badgeColor: string;
  iconBgColor: string;
  routeKey: string;
  iconType: 'finance' | 'audit' | 'academic' | 'teachers' | 'hostel' | 'students' | 'library' | 'exam' | 'sms' | 'health' | 'security' | 'settings';
}

export interface AdminNotice {
  id: string;
  title: string;
  content: string;
  priority: 'URGENT' | 'NORMAL';
  targetDeptIds: string[];
  targetDeptNames: string;
  sender: string;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  departmentName: string;
  deptCode: string;
  requesterName: string;
  amount?: string;
  type: 'FINANCE' | 'WAIVER' | 'LEAVE' | 'REQUISITION' | 'GATEPASS';
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  urgency: 'HIGH' | 'NORMAL';
  description: string;
}

export interface PolicyRule {
  id: string;
  code: string;
  title: string;
  module: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface RegisteredStudent {
  registrationNo: string;
  roll: string;
  nameBn: string;
  fatherNameBn: string;
  motherNameBn: string;
  classGradeBn: string;
  batchSessionBn: string;
  guardianPhone: string;
  dueAmount: number;
  monthlyFee: number;
  feeHead: string;
  residentialStatus?: 'RESIDENTIAL' | 'NON_RESIDENTIAL';
  roomNo?: string;
  bloodGroup?: string;
  mealActive?: boolean;
}

export interface Teacher {
  id: string;
  nameBn: string;
  designationBn: string;
  departmentBn: string;
  phone: string;
  monthlySalary: number;
  status: 'ACTIVE' | 'LEAVE';
  assignedClasses: string[];
}

export interface ClassRoutine {
  id: string;
  teacherId: string;
  teacherNameBn: string;
  classNameBn: string;
  subjectBookBn: string;
  periodTimeBn: string;
  roomNoBn: string;
  dayBn: string;
}

export interface ShariahFund {
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

export interface FeePayment {
  id: string;
  receiptNo: string;
  registrationNo?: string;
  studentId: string;
  studentRoll: string;
  studentNameBn: string;
  fatherNameBn?: string;
  motherNameBn?: string;
  classNameBn: string;
  feeTypeBn: string;
  amount: number;
  discount: number;
  netPaid: number;
  paymentMethod: 'CASH' | 'BKASH' | 'NAGAD' | 'BANK';
  transactionRef?: string;
  fundId: string;
  fundNameBn: string;
  status: 'PENDING_CONFIRMATION' | 'COMPLETED' | 'REVERSED';
  isReceiptPrinted: boolean;
  date: string;
  receivedBy: string;
}

export interface ExpenseItem {
  id: string;
  voucherNo: string;
  title: string;
  category: 'MESS_BAZAR' | 'UTILITY' | 'SALARY' | 'REPAIR' | 'STATIONERY' | 'CAPITAL_REPAIR' | 'WELFARE_AID' | 'EVENT_CONFERENCE';
  categoryBn: string;
  amount: number;
  fundId: string;
  fundNameBn: string;
  requesterStaff: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'ADJUSTED';
  date: string;
  memoDetails: string;
}

export interface PayrollItem {
  id: string;
  monthYear: string;
  teacherId: string;
  teacherNameBn: string;
  designation: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPayable: number;
  status: 'SUBMITTED' | 'APPROVED' | 'DISBURSED';
  paymentMethod?: string;
  paidDate?: string;
}

export interface DonationRecord {
  id: string;
  receiptNo: string;
  donorName: string;
  phone: string;
  whatsapp?: string;
  causeHead?: string;
  donorType: 'ONE_TIME' | 'LIFETIME' | 'MONTHLY' | 'BOX';
  fundId: string;
  fundNameBn: string;
  amount: number;
  paymentMethod: string;
  date: string;
  notes?: string;
}

export interface DailyClosingRecord {
  id: string;
  closingDate: string;
  cashierName: string;
  cashReceived: number;
  onlineReceived: number;
  totalCollected: number;
  handCountCash: number;
  variance: number;
  submittedToMuhtamimAt: string;
  status: 'SUBMITTED' | 'ACKNOWLEDGED';
}

type Language = 'bn' | 'en' | 'ar' | 'ur' | 'ms' | 'tr';

export const App: React.FC = () => {
  // Navigation & Theme State (Default to Finance module for immediate access)
  const [activeNav, setActiveNav] = useState<string>('finance');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [systemAlertOpen, setSystemAlertOpen] = useState<boolean>(false);

  // Language State (Default: Bangla)
  const [currentLang, setCurrentLang] = useState<Language>('bn');
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [installedLanguages, setInstalledLanguages] = useState<Language[]>(['bn', 'en', 'ar']);

  // Settings Active Tab
  const [settingsTab, setSettingsTab] = useState<'dashboard' | 'mobile' | 'languages'>('dashboard');

  // Super Admin Dashboard Customizable View Widgets
  const [dashboardWidgets, setDashboardWidgets] = useState({
    showWelcomeBanner: true,
    showWebServerNode: true,
    showDbClusterNode: true,
    showMobileGatewayNode: true,
    showMadrasaDirectory: true,
    showAutoBackupLogs: true,
    showSupportMessagesWidget: true,
  });

  // Active impersonated Madrasa Admin (defaults to active madrasa for immediate full access)
  const [currentAdminMadrasa, setCurrentAdminMadrasa] = useState<Madrasa | null>({
    id: '1',
    code: 'DHK-001',
    nameBn: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
    division: 'ঢাকা',
    district: 'ঢাকা',
    thana: 'মিরপুর',
    type: 'QAWMI',
    students: 1450,
    status: 'ACTIVE',
    plan: 'Enterprise',
    renewalDue: false,
  });

  // Madrasa Admin Department Management States
  const [deptDropdownId, setDeptDropdownId] = useState<string | null>(null);
  const [deptCategoryFilter, setDeptCategoryFilter] = useState<'ALL' | 'FINANCE' | 'ACADEMIC' | 'ADMIN' | 'FACILITY'>('ALL');
  const [isDeptGridExpanded, setIsDeptGridExpanded] = useState<boolean>(false);
  const [showDeptAccessModalFor, setShowDeptAccessModalFor] = useState<DepartmentItem | null>(null);

  // Form states for Department Staff Assignment Modal
  const [assignStaffName, setAssignStaffName] = useState('');
  const [assignStaffRole, setAssignStaffRole] = useState('');
  const [assignStaffPhone, setAssignStaffPhone] = useState('');
  const [assignStaffStatus, setAssignStaffStatus] = useState<'ACTIVE' | 'HOLD'>('ACTIVE');

  // Central Notice Issuer & Broadcast States
  const [adminNotices, setAdminNotices] = useState<AdminNotice[]>([
    {
      id: 'ntc-1',
      title: 'মাসিক শুরা ও বার্ষিক বাজেট পর্যালোচনা সভা',
      content: 'আগামীকাল বাদ আসর মুহতামিম কার্যালয়ে সকল বিভাগীয় প্রধান ও জ্যেষ্ঠ আসাতায়ে কেরামের জরুরি শুরা অধিবেশন অনুষ্ঠিত হবে। সকল বিভাগের বার্ষিক বাজেট ও বিগত মাসের হিসাব বিবরণী সাথে আনার নির্দেশ দেওয়া হলো।',
      priority: 'URGENT',
      targetDeptIds: ['ALL'],
      targetDeptNames: 'সকল বিভাগ (১২টি)',
      sender: 'মুহতামিম অফিস',
      createdAt: 'আজ, সকাল ৯:৩০'
    },
    {
      id: 'ntc-2',
      title: 'আসন্ন ষান্মাসিক পরীক্ষার প্রশ্নপত্র প্রণয়ন নির্দেশিকা',
      content: 'ইমতেহান বিভাগের পক্ষ থেকে জানানো যাচ্ছে যে, আগামী ২৫ অক্টোবরের মধ্যে স্ব স্ব জামাতের প্রশ্নপত্র ইমতেহান নিয়ন্ত্রক বরাবর সিলগালা খামে জমা দিতে হবে।',
      priority: 'NORMAL',
      targetDeptIds: ['dept-3', 'dept-4', 'dept-8'],
      targetDeptNames: 'হিফজ, শিক্ষক ও পরীক্ষা বিভাগ',
      sender: 'মুহতামিম অফিস',
      createdAt: 'গতকাল, বিকাল ৪:০০'
    }
  ]);
  const [showNoticeComposerModal, setShowNoticeComposerModal] = useState<boolean>(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePriority, setNoticePriority] = useState<'URGENT' | 'NORMAL'>('NORMAL');
  const [noticeTargetDepts, setNoticeTargetDepts] = useState<string[]>(['ALL']);
  const [activeNoticeDetail, setActiveNoticeDetail] = useState<AdminNotice | null>(null);

  // Pending Approvals & Permissions Request Center States
  const [pendingApprovals, setPendingApprovals] = useState<ApprovalRequest[]>([
    {
      id: 'appr-1',
      title: 'মেস বাবুর্চি বিল ও চাল-ডাল ক্রয় ভাউচার অনুমোদন',
      departmentName: 'হোস্টেল ও মেস বিভাগ',
      deptCode: 'HST-05',
      requesterName: 'হাফেজ বেলাল আহমদ (মেস সুপার)',
      amount: '৳১৮,৫০০',
      type: 'FINANCE',
      date: '১৯ অক্টোবর ২০২৬',
      status: 'PENDING',
      urgency: 'HIGH',
      description: 'আবাসিক ১,৯২০ মিলের সাপ্তাহিক চাল, মসলা ও বাবুর্চির মজুরি অনুমোদন'
    },
    {
      id: 'appr-2',
      title: 'হিফজ ছাত্র মুহাম্মদ আব্দুল্লাহর ৮০% ফি মওকুফ আবেদন',
      departmentName: 'ছাত্রকল্যাণ ও ভর্তি বিভাগ',
      deptCode: 'STD-06',
      requesterName: 'মাওলানা যুবায়ের বিন হাসান',
      amount: '৳৪,৮০০',
      type: 'WAIVER',
      date: '১৯ অক্টোবর ২০২৬',
      status: 'PENDING',
      urgency: 'NORMAL',
      description: 'এতিম ও মেধাবী শিক্ষার্থী কোটায় মাসিক ফি মওকুফ ও লিল্লাহ ফান্ড সমন্বয়'
    },
    {
      id: 'appr-3',
      title: 'আসাতায়ে কেরাম ৩ দিনের জরুরি নৈমিত্তিক ছুটি মঞ্জুরি',
      departmentName: 'শিক্ষক ও স্টাফ প্যানেল',
      deptCode: 'FAC-04',
      requesterName: 'মাওলানা আব্দুল মতিন',
      amount: '—',
      type: 'LEAVE',
      date: '১৮ অক্টোবর ২০২৬',
      status: 'PENDING',
      urgency: 'HIGH',
      description: 'মুহাদ্দিস মাওলানা রফিকুল ইসলামের পারিবারিক জরুরি কারণে ২০-২২ অক্টোবর ছুটির আবেদন'
    },
    {
      id: 'appr-4',
      title: 'কুতুবখানার জন্য নতুন নুসখা বোখারী ও তিরমিযী খরিদ রিকুইজিশন',
      departmentName: 'বহুভাষিক কুতুবখানা',
      deptCode: 'LIB-07',
      requesterName: 'মাওলানা এনামুল হক',
      amount: '৳১২,৩০০',
      type: 'REQUISITION',
      date: '১৭ অক্টোবর ২০২৬',
      status: 'PENDING',
      urgency: 'NORMAL',
      description: 'দাওরায়ে হাদিস জামাতের জন্য বৈরুত সংস্করণের ৩ সেট নতুন কিতাব সংগ্রহের অনুমোদন'
    },
    {
      id: 'appr-5',
      title: 'জরুরি মেডিকেল গেটপাস ও অভিভাবক জিম্মা অনুমোদন',
      departmentName: 'স্বাস্থ্য ও প্রধান ফটক',
      deptCode: 'MED-10',
      requesterName: 'ডা. হাবিবুর রহমান',
      amount: '—',
      type: 'GATEPASS',
      date: '১৯ অক্টোবর ২০২৬',
      status: 'PENDING',
      urgency: 'HIGH',
      description: 'আবাসিক ছাত্র হাবিবুল্লাহর তীব্র জ্বরের কারণে অভিভাবকসহ সদর হাসপাতালে প্রেরণের গেটপাস'
    }
  ]);
  const [isApprovalsExpanded, setIsApprovalsExpanded] = useState<boolean>(false);
  const [approvalFeedbackMsg, setApprovalFeedbackMsg] = useState<string | null>(null);

  // Policy Rules & Separate Staff Permission Grants States
  const [policyRules, setPolicyRules] = useState<PolicyRule[]>([
    {
      id: 'rule-1',
      code: 'POL-01',
      title: 'শরীয়াহ তহবিল পূর্ণ পৃথকীকরণ নীতি',
      module: 'হিসাব ও অডিট',
      description: 'যাকাত ও লিল্লাহ ফান্ডের অর্থ কোনো অবস্থাতেই সাধারণ বা বেতন তহবিলে মিশ্রণ করা সম্পূর্ণ নিষিদ্ধ।',
      status: 'ACTIVE'
    },
    {
      id: 'rule-2',
      code: 'POL-02',
      title: '১০,০০০ টাকার ঊর্ধ্বের ব্যয়ে যৌথ মেকার-চেকার অনুমোদন',
      module: 'হিসাব বিভাগ',
      description: 'যেকোনো ১০ হাজার টাকার বেশি ব্যয়ে প্রধান হিসাবরক্ষকের সুপারিশ ও মুহতামিমের যৌথ ডিজিটাল স্বাক্ষর বাধ্যতামূলক।',
      status: 'ACTIVE'
    },
    {
      id: 'rule-3',
      code: 'POL-03',
      title: 'রাত ৯:৩০ এর পর স্বয়ংক্রিয় ফটক লকডাউন',
      module: 'নিরাপত্তা বিভাগ',
      description: 'মুহতামিম অনুমোদিত বিশেষ জরুরি গেটপাস ব্যতিরেকে রাতে ক্যাম্পাসে প্রবেশ বা বাহির সম্পূর্ণ বন্ধ থাকবে।',
      status: 'ACTIVE'
    },
    {
      id: 'rule-4',
      code: 'POL-04',
      title: 'শিক্ষক অনুপস্থিতিতে স্বয়ংক্রিয় বদলি ক্লাস বণ্টন',
      module: 'শিক্ষক প্যানেল',
      description: 'কোনো উস্তাদ ছুটিতে থাকলে নাজেমে তালিমাত স্বয়ংক্রিয়ভাবে সংশ্লিষ্ট জামাতে বদলি উস্তাদ নিযুক্ত করবেন।',
      status: 'ACTIVE'
    }
  ]);
  const [showAddRuleModal, setShowAddRuleModal] = useState<boolean>(false);
  const [newRuleCode, setNewRuleCode] = useState('');
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleModule, setNewRuleModule] = useState('হিসাব বিভাগ');
  const [newRuleDesc, setNewRuleDesc] = useState('');

  const [showGrantPermissionModal, setShowGrantPermissionModal] = useState<boolean>(false);
  const [grantStaffName, setGrantStaffName] = useState('');
  const [grantStaffRole, setGrantStaffRole] = useState('');
  const [grantDeptId, setGrantDeptId] = useState('dept-1');
  const [grantPermLevel, setGrantPermLevel] = useState('APPROVE');

  // Comprehensive 12 Madrasa Departments
  const [departments, setDepartments] = useState<DepartmentItem[]>([
    {
      id: 'dept-1',
      code: 'ACC-01',
      nameBn: 'হিসাব ও অর্থ বিভাগ',
      nameEn: 'Accounts & Finance',
      category: 'FINANCE',
      status: 'ACTIVE',
      statsSummary: 'আজকের আদায়: ৳৮৪,৫০০ | মাসিক: ৳৮.৪ লাখ',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      iconBgColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold',
      routeKey: 'finance',
      iconType: 'finance',
      assignedStaff: [
        { id: 'st-1', name: 'মাওলানা কাসেম মাহমুদ', role: 'প্রধান হিসাবরক্ষক', phone: '01711-223344', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-2',
      code: 'AUD-02',
      nameBn: 'শরীয়াহ অডিট ও নিরীক্ষা',
      nameEn: 'Shariah Audit & Compliance',
      category: 'FINANCE',
      status: 'ACTIVE',
      statsSummary: 'যাকাত ও লিল্লাহ ফান্ড ১০০% শরীয়াহসম্মতভাবে পৃথক',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      iconBgColor: 'bg-teal-500/10 text-teal-400',
      routeKey: 'audit',
      iconType: 'audit',
      assignedStaff: [
        { id: 'st-2', name: 'মুফতী আব্দুর রহমান চাটগামী', role: 'প্রধান শরীয়াহ পরিদর্শক', phone: '01819-334455', status: 'ACTIVE', assignedDate: '১৫ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-3',
      code: 'ACD-03',
      nameBn: 'তালিমাত ও হিফজ বিভাগ',
      nameEn: 'Academic & Hifz Ul Quran',
      category: 'ACADEMIC',
      status: 'ACTIVE',
      statsSummary: '১৮৫ জন সবক প্রদানকারী | ৯২% মুমতাজ',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      iconBgColor: 'bg-blue-500/10 text-blue-500',
      routeKey: 'academic',
      iconType: 'academic',
      assignedStaff: [
        { id: 'st-3', name: 'ক্বারী উসমান গনী', role: 'হিফজ বিভাগীয় প্রধান', phone: '01912-556677', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-4',
      code: 'FAC-04',
      nameBn: 'আসাতায়ে কেরাম ও শিক্ষক',
      nameEn: 'Teachers & Faculty Panel',
      category: 'ADMIN',
      status: 'ACTIVE',
      statsSummary: '২৮ জন শিক্ষক কর্মরত | আজকের উপস্থিতি ১০০%',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      iconBgColor: 'bg-indigo-500/10 text-indigo-400',
      routeKey: 'teachers',
      iconType: 'teachers',
      assignedStaff: [
        { id: 'st-4', name: 'মাওলানা আব্দুল মতিন', role: 'নাজেমে দারুল ইকামা', phone: '01715-667788', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-5',
      code: 'HST-05',
      nameBn: 'হোস্টেল, মেস ও গেটপাস',
      nameEn: 'Hostel, Mess & Gatepass',
      category: 'FACILITY',
      status: 'ACTIVE',
      statsSummary: '১,৯২০টি মিল প্রস্তুত | ৫ জন বর্তমানে গেটের বাইরে',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      iconBgColor: 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold',
      routeKey: 'hostel',
      iconType: 'hostel',
      assignedStaff: [
        { id: 'st-5', name: 'হাফেজ বেলাল আহমদ', role: 'হোস্টেল ও মেস সুপারভাইজার', phone: '01822-778899', status: 'ACTIVE', assignedDate: '১০ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-6',
      code: 'STD-06',
      nameBn: 'ছাত্রকল্যাণ ও ভর্তি বিভাগ',
      nameEn: 'Student Affairs & Admission',
      category: 'ACADEMIC',
      status: 'ACTIVE',
      statsSummary: 'মোট ১,৪৫০ জন ছাত্র (আবাসিক: ৯২০, অনাবাসিক: ৫৩০)',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      iconBgColor: 'bg-cyan-500/10 text-cyan-400',
      routeKey: 'students',
      iconType: 'students',
      assignedStaff: [
        { id: 'st-6', name: 'মাওলানা যুবায়ের বিন হাসান', role: 'ভর্তি ও ছাত্রকল্যাণ সমন্বয়ক', phone: '01611-889900', status: 'ACTIVE', assignedDate: '০৫ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-7',
      code: 'LIB-07',
      nameBn: 'বহুভাষিক কুতুবখানা',
      nameEn: 'Central Library & Kutubkhana',
      category: 'ACADEMIC',
      status: 'ACTIVE',
      statsSummary: '৪,২৫০টি কিতাব সংরক্ষিত | ৩টি ভাষায় ক্যাটালগ',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      iconBgColor: 'bg-purple-500/10 text-purple-500',
      routeKey: 'library',
      iconType: 'library',
      assignedStaff: [
        { id: 'st-7', name: 'মাওলানা এনামুল হক', role: 'প্রধান কুতুবখানা ইনচার্জ', phone: '01733-990011', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-8',
      code: 'EXM-08',
      nameBn: 'ইমতেহান ও পরীক্ষা নিয়ন্ত্রণ',
      nameEn: 'Examinations & Results Controller',
      category: 'ACADEMIC',
      status: 'ACTIVE',
      statsSummary: 'আসন্ন বেফাক ও অভ্যন্তরীণ পরীক্ষার সিট প্ল্যান প্রস্তুত',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      iconBgColor: 'bg-rose-500/10 text-rose-400',
      routeKey: 'exam',
      iconType: 'exam',
      assignedStaff: [
        { id: 'st-8', name: 'মুফতী শামসুল হক', role: 'পরীক্ষা নিয়ন্ত্রক (নাজেমে ইমতেহান)', phone: '01552-112233', status: 'ACTIVE', assignedDate: '১৫ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-9',
      code: 'SMS-09',
      nameBn: 'যোগাযোগ ও বিটিআরসি এসএমএস',
      nameEn: 'Communication & SMS Gateway',
      category: 'ADMIN',
      status: 'ACTIVE',
      statsSummary: 'বিটিআরসি অনুমোদিত মাস্কিং | আজকের নোটিশ পাঠানো হয়েছে',
      badgeColor: 'text-green-400 bg-green-500/10 border-green-500/20',
      iconBgColor: 'bg-green-500/10 text-green-500',
      routeKey: 'sms',
      iconType: 'sms',
      assignedStaff: [
        { id: 'st-9', name: 'হাফেজ সাইদুল ইসলাম', role: 'ডিজিটাল যোগাযোগ ও এসএমএস অপারেটর', phone: '01999-445566', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-10',
      code: 'MED-10',
      nameBn: 'চিকিৎসা ও স্বাস্থ্যসেবা',
      nameEn: 'Health & Sick Bay Unit',
      category: 'FACILITY',
      status: 'ACTIVE',
      statsSummary: '৩ জন আবাসিক ছাত্র স্বাস্থ্য পর্যবেক্ষণে রয়েছেন',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      iconBgColor: 'bg-pink-500/10 text-pink-400',
      routeKey: 'health',
      iconType: 'health',
      assignedStaff: [
        { id: 'st-10', name: 'ডা. হাবিবুর রহমান', role: 'মেডিকেল অফিসার (অন-কল)', phone: '01712-334411', status: 'ACTIVE', assignedDate: '২০ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-11',
      code: 'SEC-11',
      nameBn: 'নিরাপত্তা ও প্রধান ফটক',
      nameEn: 'Security & Gate Control',
      category: 'FACILITY',
      status: 'ACTIVE',
      statsSummary: 'প্রধান ফটক বায়োমেট্রিক ও সিসিটিভি সার্বক্ষণিক সচল',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      iconBgColor: 'bg-orange-500/10 text-orange-400',
      routeKey: 'security',
      iconType: 'security',
      assignedStaff: [
        { id: 'st-11', name: 'সুবেদার (অব.) মোতালেব মিয়া', role: 'প্রধান নিরাপত্তা কর্মকর্তা', phone: '01888-223311', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
    {
      id: 'dept-12',
      code: 'SET-12',
      nameBn: 'মুহতামিম সেন্ট্রাল রোলস ও সেটিংস',
      nameEn: 'Roles & Central Admin Settings',
      category: 'ADMIN',
      status: 'ACTIVE',
      statsSummary: '১২টি ডিপার্টমেন্ট ও স্টাফ পারমিশন সক্রিয়',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      iconBgColor: 'bg-violet-500/10 text-violet-400',
      routeKey: 'settings_rbac',
      iconType: 'settings',
      assignedStaff: [
        { id: 'st-12', name: 'মাওলানা সুপার অ্যাডমিন / মুহতামিম সাহেব', role: 'প্রধান নির্বাহী ও মুহতামিম', phone: '01700-000000', status: 'ACTIVE', assignedDate: '০১ জানুয়ারি ২০২৬' }
      ]
    },
  ]);

  // 3-dot Dropdown State
  const [dropdownMadrasaId, setDropdownMadrasaId] = useState<string | null>(null);

  // Modals State
  const [showAddMadrasaModal, setShowAddMadrasaModal] = useState<boolean>(false);
  const [showPlanModalFor, setShowPlanModalFor] = useState<Madrasa | null>(null);
  const [showDeleteModalFor, setShowDeleteModalFor] = useState<Madrasa | null>(null);

  // New Madrasa Form State
  const [newMadrasaName, setNewMadrasaName] = useState('');
  const [newMadrasaDistrict, setNewMadrasaDistrict] = useState('ঢাকা');
  const [newMadrasaStudents, setNewMadrasaStudents] = useState('500');
  const [newMadrasaPlan, setNewMadrasaPlan] = useState<'Basic' | 'Standard' | 'Enterprise'>('Standard');

  // Mobile App Settings State (Configured inside Settings)
  const [mobileOtpProvider, setMobileOtpProvider] = useState('GREENWEB');
  const [mobileBkashActive, setMobileBkashActive] = useState(true);
  const [attendancePushTime, setAttendancePushTime] = useState('08:30 AM');

  // Toggle Theme helper
  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    if (nextMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  useEffect(() => {
    document.body.classList.remove('light-mode');
  }, []);

  // Multi-Language Translations Dictionary
  const t = (key: string): string => {
    const dict: Record<Language, Record<string, string>> = {
      bn: {
        appName: 'মাদ্রাসা SaaS',
        superAdmin: 'সুপার অ্যাডমিন',
        muhtamimPanel: 'মুহতামিম প্যানেল',
        systemController: 'সিস্টেম কন্ট্রোলার',
        madrasasCategory: 'মাদ্রাসা (Madrasas)',
        directory: 'ডিরেক্টরি ও সাবস্ক্রিপশন',
        pending: 'নতুন আবেদন',
        trial: 'ডেমো ও ট্রায়াল',
        managementCategory: 'ব্যবস্থাপনা (Management)',
        monitor: 'সিস্টেম লাইভ মনিটর',
        billing: 'হিসাব ও পেমেন্টস',
        plans: 'সাবস্ক্রিপশন প্ল্যান',
        madrasaList: 'মাদ্রাসাসমূহ (Madrasa List)',
        newMadrasa: 'নতুন',
        settingsCategory: 'সফটওয়্যার সেটিংস ও কাস্টমাইজেশন',
        supportCategory: 'সাপোর্ট (Support)',
        messages: 'ক্লায়েন্ট মেসেজ',
        searchPlaceholder: 'সার্ভার, মাদ্রাসা কোড, ছাত্র বা রসিদ সার্চ করুন...',
        welcome: 'স্বাগতম, সুপার অ্যাডমিন',
        welcomeSubtitle: 'আপনার জাতীয় মাদ্রাসা SaaS ক্লাউড প্ল্যাটফর্ম শতভাগ কার্যক্ষমতা ও স্থিতিশীলতায় সচল রয়েছে।',
        uptime: 'গ্লোবাল আপটাইম',
        activeMadrasas: 'সক্রিয় মাদ্রাসা',
        liveInfra: 'লাইভ ইনফ্রাস্ট্রাকচার ও সার্ভার মনিটরিং',
        restart: 'সার্ভিসসমূহ রিস্টার্ট করুন',
        healthy: 'সুস্থ (Healthy)',
        cpuUsage: 'সিপিইউ ব্যবহার (CPU Usage)',
        ramUsage: 'র‍্যাম মেমোরি বরাদ্দ (RAM)',
        dbCluster: 'ডাটাবেস ক্লাস্টার (PostgreSQL 16)',
        storageUsed: 'স্টোরেজ ব্যবহৃত',
        activeConnections: 'সক্রিয় কানেকশন পুল',
        mobileGateway: 'মোবাইল অ্যাপ গেটওয়ে (Parent API)',
        latency: 'রিকোয়েস্ট লেটেন্সি',
        scaleUp: 'স্কেল আপ করুন',
        autoScaling: 'অটো-স্কেলিং ওয়ার্কার...',
        allDistricts: 'সকল জেলা',
        allCounts: 'সকল ছাত্র সংখ্যা',
        allTypes: 'সকল ক্যাটাগরি',
        code: 'কোড',
        name: 'মাদ্রাসার নাম',
        address: 'ঠিকানা / থানা',
        type: 'টাইপ',
        students: 'ছাত্র সংখ্যা',
        package: 'প্যাকেজ',
        status: 'স্ট্যাটাস',
        action: 'অ্যাকশন',
        login: 'লগইন',
        active: 'সক্রিয়',
        blocked: 'ব্লকড',
        lightMode: 'লাইট মোড',
        darkMode: 'ডার্ক মোড',
      },
      en: {
        appName: 'Madrasa SaaS',
        superAdmin: 'Super Admin',
        muhtamimPanel: 'Principal Admin Panel',
        systemController: 'System Controller',
        madrasasCategory: 'Madrasas',
        directory: 'Directory & Subscriptions',
        pending: 'Pending Approvals',
        trial: 'Demo & Trial',
        managementCategory: 'Management',
        monitor: 'System Live Monitor',
        billing: 'Billing & Payments',
        plans: 'Subscription Plans',
        madrasaList: 'Madrasas List',
        newMadrasa: 'New',
        settingsCategory: 'Software Settings & Customization',
        supportCategory: 'Support',
        messages: 'Client Messages',
        searchPlaceholder: 'Search servers, madrasa codes, students, receipts...',
        welcome: 'Welcome back, Super Admin',
        welcomeSubtitle: 'Your National Madrasa SaaS platform infrastructure is running with 100% capacity.',
        uptime: 'Global Uptime',
        activeMadrasas: 'Live Madrasas',
        liveInfra: 'Live Infrastructure Monitoring',
        restart: 'Restart All Services',
        healthy: 'Healthy',
        cpuUsage: 'CPU Usage',
        ramUsage: 'RAM Allocation',
        dbCluster: 'Database Cluster (PostgreSQL 16)',
        storageUsed: 'Storage Used',
        activeConnections: 'Active Connection Pool',
        mobileGateway: 'Mobile App Gateway (Parent API)',
        latency: 'Request Latency',
        scaleUp: 'Scale Up Now',
        autoScaling: 'Auto-scaling worker...',
        allDistricts: 'All Districts',
        allCounts: 'All Student Counts',
        allTypes: 'All Categories',
        code: 'Code',
        name: 'Madrasa Name',
        address: 'Address / Thana',
        type: 'Type',
        students: 'Students',
        package: 'Package',
        status: 'Status',
        action: 'Action',
        login: 'Login',
        active: 'Active',
        blocked: 'Blocked',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
      },
      ar: {
        appName: 'منصة إدارة المدارس',
        superAdmin: 'المشرف العام',
        muhtamimPanel: 'لوحة تحكم المدير',
        systemController: 'متحكم النظام',
        madrasasCategory: 'المدارس',
        directory: 'دليل المدارس والاشتراكات',
        pending: 'الطلبات الجديدة المعلقة',
        trial: 'النسخ التجريبية',
        managementCategory: 'إدارة النظام',
        monitor: 'مراقبة النظام المباشرة',
        billing: 'الحسابات والمدفوعات',
        plans: 'باقات الاشتراك',
        madrasaList: 'قائمة المدارس',
        newMadrasa: 'إضافة',
        settingsCategory: 'إعدادات النظام والتخصيص',
        supportCategory: 'الدعم الفني',
        messages: 'رسائل العملاء',
        searchPlaceholder: 'بحث في الخوادم، المدارس، الطلاب، الإيصالات...',
        welcome: 'مرحباً بك، المشرف العام',
        welcomeSubtitle: 'البنية التحتية لمنصة المدارس السحابية تعمل بكفاءة واستقرار كاملين.',
        uptime: 'جاهزية الخوادم',
        activeMadrasas: 'المدارس النشطة',
        liveInfra: 'المراقبة الحية للبنية التحتية',
        restart: 'إعادة تشغيل الخدمات',
        healthy: 'يعمل بشكل سليم',
        cpuUsage: 'استهلاك المعالج',
        ramUsage: 'استهلاك الذاكرة',
        dbCluster: 'مجموعة قواعد البيانات (PostgreSQL)',
        storageUsed: 'المساحة المستخدمة',
        activeConnections: 'الاتصالات النشطة',
        mobileGateway: 'بوابة تطبيق أولياء الأمور',
        latency: 'سرعة الاستجابة',
        scaleUp: 'ترقية وتوسيع السيرفر',
        autoScaling: 'جاري التوسيع التلقائي...',
        allDistricts: 'جميع المناطق',
        allCounts: 'جميع أعداد الطلاب',
        allTypes: 'جميع الفئات',
        code: 'الرمز',
        name: 'اسم المدرسة',
        address: 'العنوان',
        type: 'النوع',
        students: 'الطلاب',
        package: 'الباقة',
        status: 'الحالة',
        action: 'الإجراء',
        login: 'دخول',
        active: 'نشط',
        blocked: 'محظور',
        lightMode: 'الوضع النهاري',
        darkMode: 'الوضع الليلي',
      },
      ur: {
        appName: 'مدرسہ ساس پلیٹ فارم',
        superAdmin: 'سپر ایڈمن',
        muhtamimPanel: 'مہتمم ایڈمن پینل',
        systemController: 'سسٹم کنٹرولر',
        madrasasCategory: 'مدارس',
        directory: 'ڈائرکٹری و سبسکرپشن',
        pending: 'نئی درخواستیں',
        trial: 'ڈیمو و ٹرائل',
        managementCategory: 'انتظامیہ',
        monitor: 'سسٹم لائیو مانیٹر',
        billing: 'بلنگ و ادائیگیاں',
        plans: 'سبسکرپشن پلانز',
        madrasaList: 'مدارس کی فہرست',
        newMadrasa: 'نیا',
        settingsCategory: 'سافٹ ویئر سیٹنگز و کسٹمائزیشن',
        supportCategory: 'سپورٹ',
        messages: 'کلائنٹ پیغامات',
        searchPlaceholder: 'سرور، مدرسہ، طلباء یا رسید تلاش کریں...',
        welcome: 'خوش آمدید، سپر ایڈمن',
        welcomeSubtitle: 'آپ کا قومی مدرسہ ساس کلاؤڈ پلیٹ فارم مکمل صلاحیت کے ساتھ فعال ہے۔',
        uptime: 'گلوبل اپ ٹائم',
        activeMadrasas: 'فعال مدارس',
        liveInfra: 'لائیو انفراسٹرکچر مانیٹرنگ',
        restart: 'سروسز دوبارہ شروع کریں',
        healthy: 'بہترین حالت',
        cpuUsage: 'سی پی یو کا استعمال',
        ramUsage: 'ریم کی تقسیم',
        dbCluster: 'ڈیٹا بیس کلسٹر (PostgreSQL)',
        storageUsed: 'استعمال شدہ جگہ',
        activeConnections: 'ایکٹو کنکشنز',
        mobileGateway: 'موبائل ایپ گیٹ وے',
        latency: 'رسپانس ٹائم',
        scaleUp: 'سسٹم اسکیل کریں',
        autoScaling: 'آٹو اسکیلنگ جاری ہے...',
        allDistricts: 'تمام اضلاع',
        allCounts: 'طلباء کی تعداد',
        allTypes: 'تمام اقسام',
        code: 'کوڈ',
        name: 'مدرسہ کا نام',
        address: 'پتہ',
        type: 'قسم',
        students: 'طلباء',
        package: 'پیکیج',
        status: 'حیثیت',
        action: 'کارروائی',
        login: 'لاگ ان',
        active: 'فعال',
        blocked: 'بلاک شدہ',
        lightMode: 'لائٹ موڈ',
        darkMode: 'ڈارک موڈ',
      },
      ms: {
        appName: 'SaaS Madrasah',
        superAdmin: 'Pentadbir Utama',
        muhtamimPanel: 'Panel Pentadbir Madrasah',
        systemController: 'Pengawal Sistem',
        madrasasCategory: 'Madrasah',
        directory: 'Direktori & Langganan',
        pending: 'Permohonan Baharu',
        trial: 'Demo & Percubaan',
        managementCategory: 'Pengurusan',
        monitor: 'Pemantauan Sistem',
        billing: 'Pengebilan & Bayaran',
        plans: 'Pakej Langganan',
        madrasaList: 'Senarai Madrasah',
        newMadrasa: 'Baharu',
        settingsCategory: 'Tetapan & Penyesuaian',
        supportCategory: 'Sokongan',
        messages: 'Mesej Pelanggan',
        searchPlaceholder: 'Cari pelayan, madrasah, pelajar, resit...',
        welcome: 'Selamat Kembali, Pentadbir Utama',
        welcomeSubtitle: 'Infrastruktur SaaS Madrasah anda beroperasi pada kapasiti penuh.',
        uptime: 'Uptime Global',
        activeMadrasas: 'Madrasah Aktif',
        liveInfra: 'Pemantauan Infrastruktur Langsung',
        restart: 'Mulakan Semula Servis',
        healthy: 'Sihat (Healthy)',
        cpuUsage: 'Penggunaan CPU',
        ramUsage: 'Peruntukan RAM',
        dbCluster: 'Kluster Pangkalan Data',
        storageUsed: 'Storan Digunakan',
        activeConnections: 'Sambungan Aktif',
        mobileGateway: 'Gerbang Aplikasi Mudah Alih',
        latency: 'Kependaman Permintaan',
        scaleUp: 'Tingkatkan Skala',
        autoScaling: 'Penskalaan automatik...',
        allDistricts: 'Semua Daerah',
        allCounts: 'Semua Jumlah Pelajar',
        allTypes: 'Semua Kategori',
        code: 'Kod',
        name: 'Nama Madrasah',
        address: 'Alamat',
        type: 'Jenis',
        students: 'Pelajar',
        package: 'Pakej',
        status: 'Status',
        action: 'Tindakan',
        login: 'Log Masuk',
        active: 'Aktif',
        blocked: 'Disekat',
        lightMode: 'Mod Cerah',
        darkMode: 'Mod Gelap',
      },
      tr: {
        appName: 'Medrese SaaS',
        superAdmin: 'Süper Yönetici',
        muhtamimPanel: 'Medrese Yönetim Paneli',
        systemController: 'Sistem Denetleyicisi',
        madrasasCategory: 'Medreseler',
        directory: 'Dizin ve Abonelikler',
        pending: 'Bekleyen Başvurular',
        trial: 'Demo ve Deneme',
        managementCategory: 'Yönetim',
        monitor: 'Canlı Sistem İzleme',
        billing: 'Faturalandırma ve Ödemeler',
        plans: 'Abonelik Paketleri',
        madrasaList: 'Medrese Listesi',
        newMadrasa: 'Yeni',
        settingsCategory: 'Yazılım Ayarları ve Özelleştirme',
        supportCategory: 'Destek',
        messages: 'Müşteri Mesajları',
        searchPlaceholder: 'Sunucuları, medrese kodlarını, öğrencileri arayın...',
        welcome: 'Tekrar Hoş Geldiniz, Süper Yönetici',
        welcomeSubtitle: 'Medrese SaaS bulut platformunuz tam kapasite ve kararlılıkla çalışmaktadır.',
        uptime: 'Genel Çalışma Süresi',
        activeMadrasas: 'Aktif Medrese',
        liveInfra: 'Canlı Altyapı İzleme',
        restart: 'Hizmetleri Yeniden Başlat',
        healthy: 'Sağlıklı',
        cpuUsage: 'CPU Kullanımı',
        ramUsage: 'RAM Tahsisi',
        dbCluster: 'Veritabanı Kümesi',
        storageUsed: 'Kullanılan Depolama',
        activeConnections: 'Aktif Bağlantı Havuzu',
        mobileGateway: 'Mobil Uygulama Ağ Geçidi',
        latency: 'İstek Gecikmesi',
        scaleUp: 'Hemen Ölçeklendir',
        autoScaling: 'Otomatik ölçekleniyor...',
        allDistricts: 'Tüm Bölgeler',
        allCounts: 'Tüm Öğrenci Sayıları',
        allTypes: 'Tüm Kategoriler',
        code: 'Kod',
        name: 'Medrese Adı',
        address: 'Adres',
        type: 'Tür',
        students: 'Öğrenci',
        package: 'Paket',
        status: 'Durum',
        action: 'İşlem',
        login: 'Giriş',
        active: 'Aktif',
        blocked: 'Engelli',
        lightMode: 'Aydınlık Mod',
        darkMode: 'Karanlık Mod',
      },
    };

    return dict[currentLang]?.[key] || dict.bn[key] || key;
  };

  // Super Admin Filters State
  const [districtFilter, setDistrictFilter] = useState('');
  const [studentCountFilter, setStudentCountFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Madrasas Data
  const [madrasas, setMadrasas] = useState<Madrasa[]>([
    {
      id: '1',
      code: 'DHK-001',
      nameBn: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
      division: 'ঢাকা',
      district: 'ঢাকা',
      thana: 'মিরপুর',
      type: 'QAWMI',
      students: 1450,
      status: 'ACTIVE',
      plan: 'Enterprise',
      renewalDue: false,
    },
    {
      id: '2',
      code: 'CTG-002',
      nameBn: 'দারুল উলুম মঈনুল ইসলাম হাটহাজারী',
      division: 'চট্টগ্রাম',
      district: 'চট্টগ্রাম',
      thana: 'হাটহাজারী',
      type: 'QAWMI',
      students: 3200,
      status: 'ACTIVE',
      plan: 'Enterprise',
      renewalDue: true,
    },
    {
      id: '3',
      code: 'SYL-003',
      nameBn: 'সিলেট সরকারি আলিয়া মাদ্রাসা',
      division: 'সিলেট',
      district: 'সিলেট',
      thana: 'কোতোয়ালী',
      type: 'ALIA',
      students: 820,
      status: 'ACTIVE',
      plan: 'Standard',
      renewalDue: false,
    },
    {
      id: '4',
      code: 'BOG-004',
      nameBn: 'নূরানী হাফিজিয়া মাদ্রাসা ও এতিমখানা',
      division: 'রাজশাহী',
      district: 'বগুড়া',
      thana: 'সদর',
      type: 'HAFIZIYA',
      students: 320,
      status: 'ACTIVE',
      plan: 'Basic',
      renewalDue: true,
    },
  ]);

  // Support Tickets
  const [tickets] = useState([
    {
      id: 'tkt-001',
      madrasa: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
      subject: 'বায়োমেট্রিক ডিভাইস অটো-সিঙ্ক কনফিগারেশন সহায়তা চাই',
      time: '১০ মিনিট আগে',
    },
    {
      id: 'tkt-002',
      madrasa: 'দারুল উলুম মঈনুল ইসলাম হাটহাজারী',
      subject: 'এন্টারপ্রাইজ সাবস্ক্রিপশন প্যাকেজে আপগ্রেড করার প্রক্রিয়া',
      time: '১ ঘণ্টা আগে',
    },
    {
      id: 'tkt-003',
      madrasa: 'আল-হিদায়াহ একাডেমি রংপুর',
      subject: 'পরীক্ষার ফলাফলের জন্য বিটিআরসি এসএমএস গেটওয়ে এপিআই সক্রিয়করণ',
      time: 'গতকাল',
    },
  ]);

  // Pending Approvals Data
  const [pendingMadrasas, setPendingMadrasas] = useState([
    { id: 'p-1', nameBn: 'দারুল উলুম আহসানিয়া মাদ্রাসা', district: 'কুমিল্লা', students: 450, requestedPlan: 'Standard', date: '১৪ অক্টোবর ২০২৬' },
    { id: 'p-2', nameBn: 'আল-জামিয়াতুল ইসলামিয়া বাইতুস সালাম', district: 'খুলনা', students: 680, requestedPlan: 'Enterprise', date: '১৫ অক্টোবর ২০২৬' },
    { id: 'p-3', nameBn: 'মাদিনাতুল উলুম মডেল কামিল মাদ্রাসা', district: 'ময়মনসিংহ', students: 310, requestedPlan: 'Basic', date: '১৫ অক্টোবর ২০২৬' },
  ]);

  // =========================================================================
  // MODULE 1: FINANCE & ACCOUNTS STATE (Comprehensive Shariah Core)
  const [financeOpMode, setFinanceOpMode] = useState<'RECEIVE' | 'EXPENSE' | 'REPORTS'>('RECEIVE');
  const [receivePortal, setReceivePortal] = useState<'STUDENT_FEES' | 'ZAKAT' | 'LILLAH' | 'WAQF' | 'BOX' | 'RECEIPTS_LIST'>('STUDENT_FEES');
  const [expensePortal, setExpensePortal] = useState<'MESS_BAZAR' | 'CAPITAL_REPAIR' | 'TEACHER_SALARY' | 'WELFARE_AID' | 'UTILITY_ADMIN' | 'EVENT_CONFERENCE' | 'EXPENSE_LIST'>('MESS_BAZAR');
  const [approvalThresholdLimit, setApprovalThresholdLimit] = useState<number>(10000);
  const [showThresholdConfigModal, setShowThresholdConfigModal] = useState<boolean>(false);
  const [tempThresholdInput, setTempThresholdInput] = useState<string>('10000');

  // Fund Ledger Drilldown State (বাটন আকারে ভিতরে প্রবেশ ও লেনদেন খতিয়ান)
  const [activeLedgerFund, setActiveLedgerFund] = useState<ShariahFund | null>(null);
  const [ledgerFilterRange, setLedgerFilterRange] = useState<'ALL' | 'TODAY' | 'MONTH' | 'CUSTOM'>('ALL');
  const [ledgerDateFrom, setLedgerDateFrom] = useState<string>('2026-10-01');
  const [ledgerDateTo, setLedgerDateTo] = useState<string>('2026-10-20');
  const [ledgerSelectedMonth, setLedgerSelectedMonth] = useState<string>('2026-10');

  // Multi-Dimensional Report Generator & Daily Closing State (কলাপ্সিবল ও ডাইনামিক ফিল্টার)
  const [showDailyClosingDetails, setShowDailyClosingDetails] = useState<boolean>(false);
  const [showReportDetails, setShowReportDetails] = useState<boolean>(false);
  const [reportFilterType, setReportFilterType] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SIX_MONTHS' | 'YEARLY' | 'CUSTOM'>('DAILY');
  const [reportSingleDate, setReportSingleDate] = useState<string>('2026-10-20');
  const [reportSelectedMonth, setReportSelectedMonth] = useState<string>('2026-10');
  const [reportSelectedYear, setReportSelectedYear] = useState<string>('2026');
  const [reportCustomStartDate, setReportCustomStartDate] = useState<string>('2026-10-01');
  const [reportCustomEndDate, setReportCustomEndDate] = useState<string>('2026-10-20');

  // 1. Shariah Segregated Funds (পরিচ্ছন্ন ও একক ভাষা)
  const [shariahFunds, setShariahFunds] = useState<ShariahFund[]>([
    {
      id: 'fnd-gen',
      code: 'FND-01',
      nameBn: 'মাদ্রাসার সাধারণ চলতি তহবিল',
      nameEn: 'General Running Fund',
      type: 'GENERAL',
      balance: 342500,
      description: 'ভর্তি ফি, মাসিক টিউশন, প্রশাসনিক খরচ ও সার্বিক উন্নয়ন খাত',
      isRestricted: false,
      color: 'emerald',
    },
    {
      id: 'fnd-lillah',
      code: 'FND-02',
      nameBn: 'যাকাত ও লিল্লাহ বোর্ডিং ফান্ড',
      nameEn: 'Zakat & Lillah Boarding Fund',
      type: 'ZAKAT_LILLAH',
      balance: 518000,
      description: '১০০% শরীয়াহ রেস্ট্রিক্টেড: কেবল এতিম, অসচ্ছল ও হকদার ছাত্রদের খানা, কিতাব ও বস্ত্র',
      isRestricted: true,
      color: 'teal',
    },
    {
      id: 'fnd-salary',
      code: 'FND-03',
      nameBn: 'বেতন রিজার্ভ তহবিল',
      nameEn: 'Salary Reserve Fund',
      type: 'SALARY_RESERVE',
      balance: 260000,
      description: 'আসাতায়ে কেরাম ও কর্মকর্তা-কর্মচারীদের মাসিক বেতন নিশ্চয়তা ফান্ড',
      isRestricted: false,
      color: 'purple',
    },
    {
      id: 'fnd-waqf',
      code: 'FND-04',
      nameBn: 'ওয়াকফ ও নির্মাণ ফান্ড',
      nameEn: 'Waqf & Construction Fund',
      type: 'CONSTRUCTION_WAQF',
      balance: 750000,
      description: 'মসজিদ, ক্যাম্পাস সম্প্রসারণ ও অবকাঠামো নির্মাণ তহবিল',
      isRestricted: true,
      color: 'amber',
    },
    {
      id: 'fnd-mpo',
      code: 'FND-05',
      nameBn: 'সরকারি ও এমপিও তহবিল',
      nameEn: 'Government & MPO Grant Fund',
      type: 'GOVT_MPO',
      balance: 180000,
      description: 'সরকারি বিশেষ বরাদ্দ ও এমপিওভুক্ত শিক্ষক সহায়তা হিসাব',
      isRestricted: true,
      color: 'blue',
    },
  ]);

  // 2. Online Payment Queue (Student ID Payments from bKash/Nagad)
  const [onlinePaymentQueue, setOnlinePaymentQueue] = useState<FeePayment[]>([
    {
      id: 'onl-1',
      receiptNo: 'REC-2026-0812',
      studentId: 'STD-001',
      studentRoll: '০১',
      studentNameBn: 'মুহাম্মদ আব্দুল্লাহ',
      classNameBn: 'হিফজুল কুরআন বিভাগ',
      feeTypeBn: 'হিফজ মাসিক ফি ও খানা',
      amount: 1500,
      discount: 0,
      netPaid: 1500,
      paymentMethod: 'BKASH',
      transactionRef: 'BK99281X21',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      status: 'PENDING_CONFIRMATION',
      isReceiptPrinted: false,
      date: '২০ অক্টোবর ২০২৬, সকাল ১০:১৫',
      receivedBy: 'বিকাশ অনলাইন গেটওয়ে',
    },
    {
      id: 'onl-2',
      receiptNo: 'REC-2026-0813',
      studentId: 'STD-004',
      studentRoll: '০৪',
      studentNameBn: 'আব্দুর রহমান',
      classNameBn: 'মিজান জামাত (কিতাব বিভাগ)',
      feeTypeBn: 'মাসিক টিউশন ও বোর্ডিং ফি',
      amount: 2200,
      discount: 0,
      netPaid: 2200,
      paymentMethod: 'NAGAD',
      transactionRef: 'NG77102A54',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      status: 'PENDING_CONFIRMATION',
      isReceiptPrinted: false,
      date: '২০ অক্টোবর ২০২৬, সকাল ১১:০০',
      receivedBy: 'নগদ অনলাইন গেটওয়ে',
    },
    {
      id: 'onl-3',
      receiptNo: 'REC-2026-0814',
      studentId: 'STD-012',
      studentRoll: '১২',
      studentNameBn: 'মাহমুদুল হাসান',
      classNameBn: 'কাফিয়া জামাত',
      feeTypeBn: 'মাসিক বোর্ডিং ও কিতাব ফি',
      amount: 1800,
      discount: 0,
      netPaid: 1800,
      paymentMethod: 'BKASH',
      transactionRef: 'BK48119C87',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      status: 'PENDING_CONFIRMATION',
      isReceiptPrinted: false,
      date: '১৯ অক্টোবর ২০২৬, বিকাল ৪:২০',
      receivedBy: 'বিকাশ অনলাইন গেটওয়ে',
    },
  ]);

  // 3. Completed Payment Records (Counter Cash & Verified Online)
  const [completedPayments, setCompletedPayments] = useState<FeePayment[]>([
    {
      id: 'pay-101',
      receiptNo: 'REC-2026-0810',
      studentId: 'STD-007',
      studentRoll: '০৭',
      studentNameBn: 'হাফেজ উসমান গণি',
      classNameBn: 'হিফজ বিভাগ (সমাপনী)',
      feeTypeBn: 'হিফজ মাসিক ফি',
      amount: 1500,
      discount: 300,
      netPaid: 1200,
      paymentMethod: 'CASH',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      status: 'COMPLETED',
      isReceiptPrinted: true,
      date: '২০ অক্টোবর ২০২৬, সকাল ০৯:৩০',
      receivedBy: 'মাওলানা কাসেম (হিসাবরক্ষক)',
    },
    {
      id: 'pay-102',
      receiptNo: 'REC-2026-0811',
      studentId: 'STD-021',
      studentRoll: '২১',
      studentNameBn: 'মুহাম্মদ তানভীর আলম',
      classNameBn: 'নাহবেমীর জামাত',
      feeTypeBn: 'নতুন সেশন ভর্তি ও কিতাব ফি',
      amount: 3500,
      discount: 0,
      netPaid: 3500,
      paymentMethod: 'CASH',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      status: 'COMPLETED',
      isReceiptPrinted: false,
      date: '২০ অক্টোবর ২০২৬, সকাল ১০:০৫',
      receivedBy: 'মাওলানা কাসেম (হিসাবরক্ষক)',
    },
  ]);

  // 2.1 Registered Students Database (Unique Registration Numbers & Auto-fill)
  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudent[]>([
    {
      registrationNo: 'REG-2026-0001',
      roll: '০১',
      nameBn: 'মুহাম্মদ আব্দুল্লাহ',
      fatherNameBn: 'মাওলানা রফিকুল ইসলাম',
      motherNameBn: 'মাহমুদা খাতুন',
      classGradeBn: 'হিফজুল কুরআন বিভাগ (সমাপনী)',
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: '01711-223344',
      dueAmount: 1500,
      monthlyFee: 1500,
      feeHead: 'হিফজ মাসিক ফি ও খানা',
      residentialStatus: 'RESIDENTIAL',
      roomNo: 'রুম ১০১',
      bloodGroup: 'B+',
      mealActive: true,
    },
    {
      registrationNo: 'REG-2026-0002',
      roll: '০৭',
      nameBn: 'হাফেজ উসমান গণি',
      fatherNameBn: 'হাজী খোরশেদ আলম',
      motherNameBn: 'রাবেয়া বসরী',
      classGradeBn: 'হিফজুল কুরআন বিভাগ (হিফজ সমাপ্তি)',
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: '01819-334455',
      dueAmount: 1200,
      monthlyFee: 1500,
      feeHead: 'হিফজ মাসিক ফি',
      residentialStatus: 'RESIDENTIAL',
      roomNo: 'রুম ১০২',
      bloodGroup: 'A+',
      mealActive: true,
    },
    {
      registrationNo: 'REG-2026-0003',
      roll: '০৪',
      nameBn: 'আব্দুর রহমান',
      fatherNameBn: 'হাফেজ হাবিবুর রহমান',
      motherNameBn: 'আমেনা বেগম',
      classGradeBn: 'মিজান জামাত (কিতাব বিভাগ)',
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: '01912-445566',
      dueAmount: 2200,
      monthlyFee: 2200,
      feeHead: 'মাসিক টিউশন ও বোর্ডিং ফি',
      residentialStatus: 'NON_RESIDENTIAL',
      roomNo: 'অনাবাসিক',
      bloodGroup: 'O+',
      mealActive: false,
    },
    {
      registrationNo: 'REG-2026-0004',
      roll: '১২',
      nameBn: 'মাহমুদুল হাসান',
      fatherNameBn: 'মুফতী জয়নাল আবেদীন',
      motherNameBn: 'খাদিজা পারভীন',
      classGradeBn: 'কাফিয়া জামাত',
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: '01715-556677',
      dueAmount: 1800,
      monthlyFee: 1800,
      feeHead: 'মাসিক বোর্ডিং ও কিতাব ফি',
      residentialStatus: 'RESIDENTIAL',
      roomNo: 'রুম ২০২',
      bloodGroup: 'AB+',
      mealActive: true,
    },
    {
      registrationNo: 'REG-2026-0005',
      roll: '২১',
      nameBn: 'মুহাম্মদ তানভীর আলম',
      fatherNameBn: 'ইঞ্জিনিয়ার জহিরুল ইসলাম',
      motherNameBn: 'ফাতিমা আক্তার',
      classGradeBn: 'নাহবেমীর জামাত',
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: '01618-667788',
      dueAmount: 3500,
      monthlyFee: 2000,
      feeHead: 'নতুন সেশন ভর্তি ও কিতাব ফি',
      residentialStatus: 'NON_RESIDENTIAL',
      roomNo: 'অনাবাসিক',
      bloodGroup: 'B+',
      mealActive: false,
    },
  ]);

  // Teachers Database State
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 'tch-1',
      nameBn: 'মাওলানা মুফতী মাহমুদুল হাসান',
      designationBn: 'প্রধান মুহাদ্দিস ও শায়খুল হাদিস',
      departmentBn: 'কিতাব বিভাগ',
      phone: '01711-889900',
      monthlySalary: 28000,
      status: 'ACTIVE',
      assignedClasses: ['দাওরায়ে হাদিস', 'মিশকাত জামাত'],
    },
    {
      id: 'tch-2',
      nameBn: 'হাফেজ মাওলানা ক্বারী ইসমাইল',
      designationBn: 'প্রধান ক্বারী ও নাযেমুত তালিমাত',
      departmentBn: 'হিফজুল কুরআন বিভাগ',
      phone: '01819-778899',
      monthlySalary: 22000,
      status: 'ACTIVE',
      assignedClasses: ['হিফজুল কুরআন সমাপনী', 'তাজভীদ কোর্স'],
    },
    {
      id: 'tch-3',
      nameBn: 'মাওলানা কাসেম মাহমুদ',
      designationBn: 'প্রধান হিসাবরক্ষক ও মুদাররিস',
      departmentBn: 'হিসাব ও কিতাব বিভাগ',
      phone: '01912-667788',
      monthlySalary: 20000,
      status: 'ACTIVE',
      assignedClasses: ['জালালাইন জামাত', 'শরহে বেকায়া'],
    },
    {
      id: 'tch-4',
      nameBn: 'হাফেজ বেলাল আহমদ',
      designationBn: 'মেস ও ছাত্রাবাস সুপার',
      departmentBn: 'হোস্টেল ও মেস',
      phone: '01611-554433',
      monthlySalary: 16000,
      status: 'ACTIVE',
      assignedClasses: ['ছাত্রাবাস নিরাপত্তা ও তদারকি'],
    },
  ]);

  // Class & Dars Routine Schedule State
  const [classRoutines, setClassRoutines] = useState<ClassRoutine[]>([
    {
      id: 'rt-1',
      teacherId: 'tch-1',
      teacherNameBn: 'মাওলানা মুফতী মাহমুদুল হাসান',
      classNameBn: 'দাওরায়ে হাদিস (মাস্টার্স সমমান)',
      subjectBookBn: 'সহীহ বুখারী শরীফ (১ম খণ্ড)',
      periodTimeBn: '১ম পিরিয়ড (সকাল ৮:০০ - ৯:০০)',
      roomNoBn: 'দারুল হাদিস অডিটোরিয়াম',
      dayBn: 'শনিবার - বৃহস্পতিবার',
    },
    {
      id: 'rt-2',
      teacherId: 'tch-1',
      teacherNameBn: 'মাওলানা মুফতী মাহমুদুল হাসান',
      classNameBn: 'মিশকাত জামাত',
      subjectBookBn: 'মিশকাতুল মাসাবীহ (কিতাবুল ঈমান)',
      periodTimeBn: '২য় পিরিয়ড (সকাল ৯:১০ - ১০:১০)',
      roomNoBn: 'হল রুম ৩',
      dayBn: 'শনিবার - বৃহস্পতিবার',
    },
    {
      id: 'rt-3',
      teacherId: 'tch-2',
      teacherNameBn: 'হাফেজ মাওলানা ক্বারী ইসমাইল',
      classNameBn: 'হিফজুল কুরআন বিভাগ',
      subjectBookBn: 'কুরআনুল কারীম তেলাওয়াত ও তাজভীদ',
      periodTimeBn: '১ম পিরিয়ড (সকাল ৭:৩০ - ৯:০০)',
      roomNoBn: 'হিফজ খানা ১',
      dayBn: 'প্রতিদিন',
    },
    {
      id: 'rt-4',
      teacherId: 'tch-3',
      teacherNameBn: 'মাওলানা কাসেম মাহমুদ',
      classNameBn: 'জালালাইন জামাত',
      subjectBookBn: 'তাফসীরে জালালাইন (১ম খণ্ড)',
      periodTimeBn: '৩য় পিরিয়ড (সকাল ১০:২০ - ১১:২০)',
      roomNoBn: 'ক্লাসরুম ২০২',
      dayBn: 'শনিবার - বুধবার',
    },
  ]);

  // Modals and form states for Students
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [newStudentRegNo, setNewStudentRegNo] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');
  const [newStudentNameBn, setNewStudentNameBn] = useState('');
  const [newStudentFatherNameBn, setNewStudentFatherNameBn] = useState('');
  const [newStudentMotherNameBn, setNewStudentMotherNameBn] = useState('');
  const [newStudentClassBn, setNewStudentClassBn] = useState('হিফজুল কুরআন বিভাগ (সমাপনী)');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentFee, setNewStudentFee] = useState<number>(1500);
  const [newStudentResidential, setNewStudentResidential] = useState<'RESIDENTIAL' | 'NON_RESIDENTIAL'>('RESIDENTIAL');
  const [newStudentRoomNo, setNewStudentRoomNo] = useState('রুম ১০১');
  const [newStudentBloodGroup, setNewStudentBloodGroup] = useState('B+');

  // Modals and form states for Teachers and Routines
  const [showAddTeacherModal, setShowAddTeacherModal] = useState<boolean>(false);
  const [newTeacherNameBn, setNewTeacherNameBn] = useState('');
  const [newTeacherDesignationBn, setNewTeacherDesignationBn] = useState('মুহাদ্দিস ও মুদাররিস');
  const [newTeacherDepartmentBn, setNewTeacherDepartmentBn] = useState('কিতাব বিভাগ');
  const [newTeacherPhone, setNewTeacherPhone] = useState('');
  const [newTeacherSalary, setNewTeacherSalary] = useState<number>(20000);

  const [showAddRoutineModal, setShowAddRoutineModal] = useState<boolean>(false);
  const [newRoutineTeacherId, setNewRoutineTeacherId] = useState('tch-1');
  const [newRoutineClassBn, setNewRoutineClassBn] = useState('মিশকাত জামাত');
  const [newRoutineBookBn, setNewRoutineBookBn] = useState('সহীহ বুখারী শরীফ (১ম খণ্ড)');
  const [newRoutinePeriodBn, setNewRoutinePeriodBn] = useState('১ম পিরিয়ড (সকাল ৮:০০ - ৯:০০)');
  const [newRoutineRoomBn, setNewRoutineRoomBn] = useState('দারুল হাদিস হল');
  const [newRoutineDayBn, setNewRoutineDayBn] = useState('শনিবার - বৃহস্পতিবার');

  const [teacherPortalFilter, setTeacherPortalFilter] = useState<string>('ALL');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('ALL');
  const [studentResFilter, setStudentResFilter] = useState<'ALL' | 'RESIDENTIAL' | 'NON_RESIDENTIAL'>('ALL');
  const [academicSabaqStudentReg, setAcademicSabaqStudentReg] = useState('REG-2026-0001');
  const [academicSabaqPage, setAcademicSabaqPage] = useState('পৃষ্ঠা ৬০ (৩য় পারা)');
  const [academicSabqiRange, setAcademicSabqiRange] = useState('পৃষ্ঠা ৪০ - ৫৯');
  const [academicAmukhta, setAcademicAmukhta] = useState('১ম পারা সম্পূর্ণ');

  // Student Fee Portal Form States
  const [studentRegSearch, setStudentRegSearch] = useState('REG-2026-0001');
  const [posStudentRegNo, setPosStudentRegNo] = useState('REG-2026-0001');
  const [posRoll, setPosRoll] = useState('০১');
  const [posStudentName, setPosStudentName] = useState('মুহাম্মদ আব্দুল্লাহ');
  const [posFatherName, setPosFatherName] = useState('মাওলানা রফিকুল ইসলাম');
  const [posMotherName, setPosMotherName] = useState('মাহমুদা খাতুন');
  const [posClassName, setPosClassName] = useState('হিফজুল কুরআন বিভাগ (সমাপনী)');
  const [posBatchSession, setPosBatchSession] = useState('২০২৬ সেশন');
  const [posGuardianPhone, setPosGuardianPhone] = useState('01711-223344');
  const [posFeeType, setPosFeeType] = useState('হিফজ মাসিক ফি ও খানা');
  const [posAmount, setPosAmount] = useState<number>(1500);
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posMethod, setPosMethod] = useState<'CASH' | 'BKASH' | 'NAGAD' | 'BANK'>('CASH');
  const [posFundId, setPosFundId] = useState<string>('fnd-gen');

  // Customizable Donor Portal Form States (Zakat, Lillah, Waqf, Box)
  const [donorWhatsappInput, setDonorWhatsappInput] = useState('');
  const [donorAddressInput, setDonorAddressInput] = useState('');
  const [donorCauseInput, setDonorCauseInput] = useState('');

  // Dedicated Expense Portal Form States
  const [bazarShopperStaff, setBazarShopperStaff] = useState('হাফেজ বেলাল আহমদ (মেস সুপার)');
  const [bazarMemoNo, setBazarMemoNo] = useState('মেমো #৮৯২, কারওয়ান বাজার');
  const [bazarFundId, setBazarFundId] = useState('fnd-lillah');
  const [repairContractor, setRepairContractor] = useState('মেসার্স রফিক ইলেকট্রিক অ্যান্ড স্যানিটারি');
  const [repairBillNo, setRepairBillNo] = useState('ক্যাশ মেমো #৭২১');
  const [repairFundId, setRepairFundId] = useState('fnd-waqf');
  const [welfareStudentName, setWelfareStudentName] = useState('মুহাম্মদ আব্দুর রহমান (অসচ্ছল এতিম ছাত্র)');
  const [welfareReason, setWelfareReason] = useState('জরুরি চিকিৎসা ও কিতাব সহায়তা অনুদান');
  const [welfareFundId, setWelfareFundId] = useState('fnd-lillah');
  const [utilityProvider, setUtilityProvider] = useState('ঢাকা পল্লী বিদ্যুৎ সমিতি-১');
  const [utilityTxnRef, setUtilityTxnRef] = useState('বিকাশ পে-বিল ট্রানজেকশন #DESCO-9921');
  const [utilityFundId, setUtilityFundId] = useState('fnd-gen');

  // Event & Conference Expense Portal Form States (ইভেন্ট ও মাহফিল খরচ)
  const [eventExpenseTitle, setEventExpenseTitle] = useState('বার্ষিক ওয়াজ মাহফিল ও দস্তারবন্দী পাগড়ি সম্মেলন');
  const [eventSubHead, setEventSubHead] = useState('প্যান্ডেল, স্টেজ ও মাইক সাউন্ড সিস্টেম ভাড়া');
  const [eventConvener, setEventConvener] = useState('মাওলানা মুফতী নোমান (মাহফিল আহ্বায়ক কমিটি)');
  const [eventMemoNo, setEventMemoNo] = useState('ভাউচার #ইভেন্ট-১০৪, ডেকোরেটর ও সাউন্ড মেমো');
  const [eventFundId, setEventFundId] = useState('fnd-gen');
  const [eventAmount, setEventAmount] = useState<number>(45000);

  // Modals for Receipts & Print Formats
  const [activeThermalReceipt, setActiveThermalReceipt] = useState<FeePayment | null>(null);
  const [activeOfficialReceipt, setActiveOfficialReceipt] = useState<FeePayment | null>(null);
  const [activeSalarySlip, setActiveSalarySlip] = useState<PayrollItem | null>(null);

  // 4. Expenses & Bazar Requisitions
  const [expenseVouchers, setExpenseVouchers] = useState<ExpenseItem[]>([
    {
      id: 'exp-1',
      voucherNo: 'VCH-2026-0041',
      title: 'মেস বাজার: সাপ্তাহিক চাল, মসলা, তৈল, ডাল ও আলু খরিদ',
      category: 'MESS_BAZAR',
      categoryBn: 'হোস্টেল মেস বাজার',
      amount: 18500,
      fundId: 'fnd-lillah',
      fundNameBn: 'যাকাত ও লিল্লাহ ফান্ড',
      requesterStaff: 'হাফেজ বেলাল আহমদ (মেস সুপার)',
      status: 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: 'ক্যাটারিং ক্যাশ মেমো নং #৮৯২, কারওয়ান বাজার আড়ত',
    },
    {
      id: 'exp-2',
      voucherNo: 'VCH-2026-0042',
      title: 'পল্লী বিদ্যুৎ অক্টোবর মাসের ক্যাম্পাসের বিদ্যুৎ বিল পরিশোধ',
      category: 'UTILITY',
      categoryBn: 'ইউটিলিটি বিল',
      amount: 14200,
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      requesterStaff: 'মাওলানা কাসেম মাহমুদ (হিসাবরক্ষক)',
      status: 'APPROVED',
      date: '১৮ অক্টোবর ২০২৬',
      memoDetails: 'বিকাশ ইউটিলিটি পে বিল ট্রানজেকশন ট্র্যাকার #EP77192',
    },
    {
      id: 'exp-3',
      voucherNo: 'VCH-2026-0043',
      title: 'দাওরায়ে হাদিস জামাতের জন্য বৈরুত সংস্করণের কিতাব খরিদ',
      category: 'STATIONERY',
      categoryBn: 'কুতুবখানা কিতাব',
      amount: 12300,
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      requesterStaff: 'মাওলানা এনামুল হক (লাইব্রেরিয়ান)',
      status: 'SUBMITTED',
      date: '১৭ অক্টোবর ২০২৬',
      memoDetails: 'ইসলামিয়া কুতুবখানা বাংলাবাজার চালান নং #৪১২',
    },
    {
      id: 'exp-4',
      voucherNo: 'VCH-2026-0044',
      title: 'আবাসিক ছাত্রাবাসের মোটর ও পানির পাম্প জরুরি মেরামত',
      category: 'REPAIR',
      categoryBn: 'মেরামত ও রক্ষণাবেক্ষণ',
      amount: 3800,
      fundId: 'fnd-gen',
      fundNameBn: 'মাদ্রাসার সাধারণ চলতি তহবিল',
      requesterStaff: 'সুবেদার (অব.) মোতালেব মিয়া (কেয়ারটেকার)',
      status: 'ADJUSTED',
      date: '১৬ অক্টোবর ২০২৬',
      memoDetails: 'মেকানিক বিল ও পাইপ ফিটিংস ভাউচার',
    },
    {
      id: 'exp-5',
      voucherNo: 'EVT-2026-0001',
      title: 'বার্ষিক ওয়াজ মাহফিল ও দস্তারবন্দী সম্মেলন: প্যান্ডেল ও সাউন্ড সিস্টেম',
      category: 'EVENT_CONFERENCE',
      categoryBn: 'ইভেন্ট ও মাহফিল খরচ',
      amount: 45000,
      fundId: 'fnd-gen',
      fundNameBn: 'মাদ্রাসার সাধারণ চলতি তহবিল',
      requesterStaff: 'মাওলানা মুফতী নোমান (মাহফিল আহ্বায়ক)',
      status: 'APPROVED',
      date: '১৫ অক্টোবর ২০২৬',
      memoDetails: 'ডেকোরেটর ও মাইক ভাড়া বিল চালান #৩১২',
    },
  ]);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<'MESS_BAZAR' | 'UTILITY' | 'SALARY' | 'REPAIR' | 'STATIONERY' | 'CAPITAL_REPAIR' | 'WELFARE_AID' | 'EVENT_CONFERENCE'>('MESS_BAZAR');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(5000);
  const [newExpenseFundId, setNewExpenseFundId] = useState<string>('fnd-gen');
  const [newExpenseRequester, setNewExpenseRequester] = useState('');
  const [newExpenseMemo, setNewExpenseMemo] = useState('');

  // 5. Teachers & Staff Payroll Register
  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([
    {
      id: 'pay-1',
      monthYear: 'অক্টোবর ২০২৬',
      teacherId: 'TCH-001',
      teacherNameBn: 'মুফতী মনসুরুল হক সাহেব',
      designation: 'শায়খুল হাদিস ও প্রধান মুফতী',
      baseSalary: 28000,
      allowances: 2000,
      deductions: 0,
      netPayable: 30000,
      status: 'APPROVED',
      paymentMethod: 'ব্যাংক একাউন্ট ট্রান্সফার',
      paidDate: '০১ নভেম্বর ২০২৬',
    },
    {
      id: 'pay-2',
      monthYear: 'অক্টোবর ২০২৬',
      teacherId: 'TCH-002',
      teacherNameBn: 'মাওলানা কাসেম মাহমুদ',
      designation: 'সিনিয়র উস্তাদ ও প্রধান হিসাবরক্ষক',
      baseSalary: 22000,
      allowances: 1500,
      deductions: 0,
      netPayable: 23500,
      status: 'APPROVED',
      paymentMethod: 'নগদ ক্যাশ গ্রহণ',
      paidDate: '০১ নভেম্বর ২০২৬',
    },
    {
      id: 'pay-3',
      monthYear: 'অক্টোবর ২০২৬',
      teacherId: 'TCH-003',
      teacherNameBn: 'হাফেজ কারী বেলাল আহমদ',
      designation: 'প্রধান কারী ও হিফজ ইনচার্জ',
      baseSalary: 20000,
      allowances: 1000,
      deductions: 0,
      netPayable: 21000,
      status: 'SUBMITTED',
    },
    {
      id: 'pay-4',
      monthYear: 'অক্টোবর ২০২৬',
      teacherId: 'TCH-004',
      teacherNameBn: 'মাওলানা আব্দুল মতিন',
      designation: 'নাজেমে তালিমাত ও শিক্ষক',
      baseSalary: 18000,
      allowances: 1000,
      deductions: 0,
      netPayable: 19000,
      status: 'SUBMITTED',
    },
    {
      id: 'pay-5',
      monthYear: 'অক্টোবর ২০২৬',
      teacherId: 'STF-001',
      teacherNameBn: 'মোহাম্মদ ইসমাইল',
      designation: 'মেস প্রধান বাবুর্চি',
      baseSalary: 12000,
      allowances: 1000,
      deductions: 0,
      netPayable: 13000,
      status: 'DISBURSED',
      paymentMethod: 'বিকাশ পে-রোল',
      paidDate: '১৯ অক্টোবর ২০২৬',
    },
  ]);

  // 6. Donations, Waqf & Philanthropy
  const [donations, setDonations] = useState<DonationRecord[]>([
    {
      id: 'don-1',
      receiptNo: 'DON-2026-0101',
      donorName: 'আলহাজ্ব নূরুল ইসলাম চৌধুরী',
      phone: '01711-889900',
      donorType: 'LIFETIME',
      fundId: 'fnd-waqf',
      fundNameBn: 'ওয়াকফ ও নির্মাণ ফান্ড',
      amount: 50000,
      paymentMethod: 'ব্যাংক চেক (#৯৯২১০)',
      date: '২০ অক্টোবর ২০২৬',
      notes: 'নতুন ৪-তলা হিফজ ভবন নির্মাণ অনুদান',
    },
    {
      id: 'don-2',
      receiptNo: 'DON-2026-0102',
      donorName: 'ডা. শফিউল আলম',
      phone: '01819-223344',
      donorType: 'ONE_TIME',
      fundId: 'fnd-lillah',
      fundNameBn: 'যাকাত ও লিল্লাহ ফান্ড',
      amount: 15000,
      paymentMethod: 'বিকাশ ট্রানজেকশন',
      date: '১৯ অক্টোবর ২০২৬',
      notes: 'পবিত্র রমজান আগাম যাকাত সহায়তা',
    },
    {
      id: 'don-3',
      receiptNo: 'DON-2026-0103',
      donorName: 'ক্যাম্পাস কেন্দ্রীয় মসজিদ কালেকশন বক্স',
      phone: '—',
      donorType: 'BOX',
      fundId: 'fnd-gen',
      fundNameBn: 'সাধারণ তহবিল',
      amount: 18450,
      paymentMethod: 'নগদ ক্যাশ গণনা',
      date: '১৮ অক্টোবর ২০২৬',
      notes: 'জুমুয়াবার মুসল্লিদের মুক্তহস্তে দান বক্স গণনা',
    },
    {
      id: 'don-4',
      receiptNo: 'DON-2026-0104',
      donorName: 'হাজী আব্দুল খালেক সওদাগর',
      phone: '01912-334455',
      donorType: 'MONTHLY',
      fundId: 'fnd-lillah',
      fundNameBn: 'যাকাত ও লিল্লাহ ফান্ড',
      amount: 5000,
      paymentMethod: 'নগদ গ্রহণ',
      date: '১৭ অক্টোবর ২০২৬',
      notes: 'মাসিক মুয়াবিন অনুদান',
    },
  ]);
  const [showAddDonationModal, setShowAddDonationModal] = useState<boolean>(false);
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorPhone, setNewDonorPhone] = useState('');
  const [newDonorType, setNewDonorType] = useState<'ONE_TIME' | 'LIFETIME' | 'MONTHLY' | 'BOX'>('ONE_TIME');
  const [newDonorFundId, setNewDonorFundId] = useState<string>('fnd-lillah');
  const [newDonorAmount, setNewDonorAmount] = useState<number>(2000);
  const [newDonorMethod, setNewDonorMethod] = useState('নগদ ক্যাশ');
  const [newDonorNotes, setNewDonorNotes] = useState('');

  // 7. Daily Cashier Closings & Multi-Dimensional Reports
  const [dailyClosings, setDailyClosings] = useState<DailyClosingRecord[]>([
    {
      id: 'cls-1',
      closingDate: '১৯ অক্টোবর ২০২৬',
      cashierName: 'মাওলানা কাসেম মাহমুদ (প্রধান হিসাবরক্ষক)',
      cashReceived: 82500,
      onlineReceived: 42900,
      totalCollected: 125400,
      handCountCash: 82500,
      variance: 0,
      submittedToMuhtamimAt: '১৯ অক্টোবর ২০২৬, রাত ৮:৩০',
      status: 'ACKNOWLEDGED',
    },
  ]);
  const [closingHandCash, setClosingHandCash] = useState<string>('84500');
  const [closingNotes, setClosingNotes] = useState<string>('আজকের সকল ক্যাশ ও অনলাইন ট্রানজেকশন ভাউচারের সাথে শতভাগ মিলেছে।');
  const [closingFeedbackMsg, setClosingFeedbackMsg] = useState<string | null>(null);



  // =========================================================================
  // MODULE 2: ACADEMIC & HIFZ STATE (604 Pages, Offline Sync, Befaq Export)
  // =========================================================================
  const [hifzGrade, setHifzGrade] = useState<'MUMTAZ' | 'JAYYID_JIDDAN' | 'JAYYID' | 'MAQBUL'>('MUMTAZ');
  const [offlineSyncCount, setOfflineSyncCount] = useState<number>(45);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [befaqExportDownloaded, setBefaqExportDownloaded] = useState<boolean>(false);

  // =========================================================================
  // MODULE 3: HOSTEL, MEALS & GATEPASS STATE
  // =========================================================================
  const [gatepassStudent, setGatepassStudent] = useState('মুহাম্মদ আব্দুল্লাহ');
  const [gatepassReason, setGatepassReason] = useState('পারিবারিক জরূরী প্রয়োজন');
  const [activeGatepass, setActiveGatepass] = useState<{
    id: string;
    student: string;
    qrToken: string;
    status: 'ISSUED' | 'CHECKED_OUT' | 'RETURNED';
    expiry: string;
  } | null>(null);



  // =========================================================================
  // MODULE 4: LIBRARY STATE (Multilingual Catalog & Issue/Return)
  // =========================================================================
  const [librarySearchLang, setLibrarySearchLang] = useState<'ALL' | 'bn' | 'ar' | 'ur'>('ALL');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [books] = useState([
    {
      id: 'bk-1',
      title: 'صحيح البخاري (সম্পূর্ণ)',
      author: 'ইমাম বুখারী (রহ.)',
      language: 'ar',
      category: 'হাদিস শাস্ত্র',
      totalCopies: 10,
      availableCopies: 6,
      rack: 'তাক-A1',
    },
    {
      id: 'bk-2',
      title: 'فتاوى تاتارخانية (ফাতাওয়া তাতারখানিয়া)',
      author: 'আলিম বিন আলা আল-হান্দরানী',
      language: 'ur',
      category: 'ফিকহ',
      totalCopies: 5,
      availableCopies: 2,
      rack: 'তাক-B3',
    },
    {
      id: 'bk-3',
      title: 'সীরাতে খাতামুল আম্বিয়া',
      author: 'মুফতী শফী (রহ.)',
      language: 'bn',
      category: 'সীরাত',
      totalCopies: 15,
      availableCopies: 11,
      rack: 'তাক-C2',
    },
  ]);

  // =========================================================================
  // MODULE 5: COMMUNICATION & SMS STATE (BTRC 70-char counter, cost preview)
  // =========================================================================
  const [smsMessage, setSmsMessage] = useState('সম্মানিত অভিভাবক, আগামী শনিবার মাদ্রাসার অভিভাবক সমাবেশ অনুষ্ঠিত হবে। উপস্থিত থাকার জন্য বিনীত অনুরোধ রইল।');
  const [smsRecipientType, setSmsRecipientType] = useState('GUARDIANS');
  const [smsSentNotice, setSmsSentNotice] = useState<string | null>(null);

  const calculateSmsParts = (text: string) => {
    const len = text.length;
    if (len === 0) return { chars: 0, parts: 0, cost: 0 };
    const parts = len <= 70 ? 1 : Math.ceil(len / 67);
    const recipients = smsRecipientType === 'GUARDIANS' ? 1450 : smsRecipientType === 'TEACHERS' ? 65 : 1515;
    const cost = (parts * recipients * 0.25).toFixed(2);
    return { chars: len, parts, cost, recipients };
  };

  const smsMetrics = calculateSmsParts(smsMessage);

  // Filtered Madrasas Computation for Super Admin
  const filteredMadrasas = madrasas.filter((m) => {
    if (districtFilter && m.district !== districtFilter) return false;
    if (typeFilter && m.type !== typeFilter) return false;
    if (studentCountFilter === 'over_1000' && m.students < 1000) return false;
    if (studentCountFilter === '500_to_1000' && (m.students < 500 || m.students >= 1000)) return false;
    if (studentCountFilter === 'under_500' && m.students >= 500) return false;
    if (searchTerm && !m.nameBn.includes(searchTerm) && !m.code.includes(searchTerm)) return false;
    return true;
  });

  // Action Handlers for 3-Dot Menu
  const handleLoginAsAdmin = (madrasa: Madrasa) => {
    if (madrasa.status === 'BLOCKED') {
      alert(`"${madrasa.nameBn}" বর্তমানে সাময়িকভাবে স্থগিত বা ব্লক করা রয়েছে। অনুগ্রহ করে আগে আনব্লক করুন।`);
      setDropdownMadrasaId(null);
      return;
    }
    setCurrentAdminMadrasa(madrasa);
    setActiveNav('madrasa_dashboard');
    setDropdownMadrasaId(null);
  };

  // Department Action Handlers for Madrasa Admin
  const handleToggleDeptHold = (deptId: string) => {
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          const nextStatus = d.status === 'HOLD' ? 'ACTIVE' : 'HOLD';
          alert(
            nextStatus === 'HOLD'
              ? `"${d.nameBn}" এর কার্যক্রম ও স্টাফ অ্যাক্সেস সাময়িকভাবে স্থগিত (HOLD) করা হয়েছে।`
              : `"${d.nameBn}" এর কার্যক্রম পুনরায় সক্রিয় করা হয়েছে।`
          );
          return {
            ...d,
            status: nextStatus,
            badgeColor: nextStatus === 'HOLD' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : d.badgeColor,
            assignedStaff: d.assignedStaff.map((s) => ({ ...s, status: nextStatus })),
          };
        }
        return d;
      })
    );
    setDeptDropdownId(null);
  };

  const handleRevokeDeptAccess = (deptId: string) => {
    const targetDept = departments.find((d) => d.id === deptId);
    if (!targetDept) return;
    const confirmRevoke = window.confirm(
      `আপনি কি নিশ্চিত যে "${targetDept.nameBn}" থেকে সকল স্টাফের অ্যাক্সেস প্রত্যাহার করতে চান?`
    );
    if (!confirmRevoke) return;
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          return {
            ...d,
            status: 'UNASSIGNED',
            assignedStaff: [],
            badgeColor: 'text-[var(--subtle-foreground)] bg-zinc-500/10 border-zinc-500/20',
          };
        }
        return d;
      })
    );
    alert(`"${targetDept.nameBn}" এর স্টাফ অ্যাক্সেস বাতিল করা হয়েছে।`);
    setDeptDropdownId(null);
  };

  const handleOpenAssignModal = (dept: DepartmentItem) => {
    setShowDeptAccessModalFor(dept);
    const existingStaff = dept.assignedStaff[0];
    if (existingStaff) {
      setAssignStaffName(existingStaff.name);
      setAssignStaffRole(existingStaff.role);
      setAssignStaffPhone(existingStaff.phone);
      setAssignStaffStatus(existingStaff.status);
    } else {
      setAssignStaffName('');
      setAssignStaffRole(dept.nameBn.includes('হিসাব') ? 'প্রধান হিসাবরক্ষক' : 'বিভাগীয় ইনচার্জ');
      setAssignStaffPhone('');
      setAssignStaffStatus('ACTIVE');
    }
    setDeptDropdownId(null);
  };

  const handleSaveDeptAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showDeptAccessModalFor) return;
    if (!assignStaffName.trim()) {
      alert('অনুগ্রহ করে দায়িত্বপ্রাপ্ত ব্যক্তির নাম লিখুন।');
      return;
    }
    const newStaff: DepartmentStaff = {
      id: `st-${Date.now()}`,
      name: assignStaffName.trim(),
      role: assignStaffRole.trim() || 'বিভাগীয় দায়িত্বপ্রাপ্ত',
      phone: assignStaffPhone.trim() || '01700-000000',
      status: assignStaffStatus,
      assignedDate: '১৯ অক্টোবর ২০২৬',
    };
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === showDeptAccessModalFor.id) {
          return {
            ...d,
            status: assignStaffStatus,
            assignedStaff: [newStaff],
            badgeColor: assignStaffStatus === 'ACTIVE' ? d.badgeColor : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          };
        }
        return d;
      })
    );
    alert(`"${showDeptAccessModalFor.nameBn}" এর দায়িত্বে "${assignStaffName}" কে সফলভাবে নিয়োগ/হালনাগাদ করা হয়েছে।`);
    setShowDeptAccessModalFor(null);
  };

  // Central Notice Action Handlers
  const handleToggleTargetDept = (deptId: string) => {
    if (deptId === 'ALL') {
      setNoticeTargetDepts(['ALL']);
      return;
    }
    setNoticeTargetDepts((prev) => {
      const filtered = prev.filter((id) => id !== 'ALL');
      if (filtered.includes(deptId)) {
        const next = filtered.filter((id) => id !== deptId);
        return next.length === 0 ? ['ALL'] : next;
      } else {
        return [...filtered, deptId];
      }
    });
  };

  const handleSendAdminNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      alert('অনুগ্রহ করে নোটিশের শিরোনাম ও বিস্তারিত বার্তা লিখুন।');
      return;
    }

    let targetNames = 'সকল বিভাগ (১২টি)';
    if (!noticeTargetDepts.includes('ALL')) {
      const selectedNames = departments
        .filter((d) => noticeTargetDepts.includes(d.id))
        .map((d) => d.nameBn);
      targetNames = selectedNames.join(', ');
    }

    const newNotice: AdminNotice = {
      id: `ntc-${Date.now()}`,
      title: noticeTitle.trim(),
      content: noticeContent.trim(),
      priority: noticePriority,
      targetDeptIds: noticeTargetDepts,
      targetDeptNames: targetNames,
      sender: 'মুহতামিম অফিস',
      createdAt: 'এখন মাত্র প্রকাশিত',
    };

    setAdminNotices([newNotice, ...adminNotices]);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePriority('NORMAL');
    setNoticeTargetDepts(['ALL']);
    setShowNoticeComposerModal(false);
    alert(`নোটিশটি সফলভাবে "${targetNames}"-এ জারি ও নোটিফিকেশন পাঠানো হয়েছে!`);
  };

  // Approval Center Handlers
  const handleApproveRequest = (id: string) => {
    const target = pendingApprovals.find((a) => a.id === id);
    if (!target) return;
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'APPROVED' } : a))
    );
    setApprovalFeedbackMsg(`"${target.title}" সফলভাবে অনুমোদন করা হয়েছে। সংশ্লিষ্ট বিভাগে অনুমতি কার্যকর হয়েছে।`);
    setTimeout(() => setApprovalFeedbackMsg(null), 5000);
  };

  const handleRejectRequest = (id: string) => {
    const target = pendingApprovals.find((a) => a.id === id);
    if (!target) return;
    const reason = window.prompt(`"${target.title}" বাতিল করার কারণ (ঐচ্ছিক):`, 'মুহতামিম কর্তৃক পর্যালোচনায় স্থগিত');
    if (reason === null) return;
    setPendingApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'REJECTED' } : a))
    );
    setApprovalFeedbackMsg(`"${target.title}" রিকোয়েস্ট বাতিল করা হয়েছে।`);
    setTimeout(() => setApprovalFeedbackMsg(null), 5000);
  };

  // Policy Rule & Permission Handlers
  const handleSavePolicyRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle.trim() || !newRuleDesc.trim()) {
      alert('অনুগ্রহ করে রুলসের শিরোনাম ও বিবরণ লিখুন।');
      return;
    }
    const newRule: PolicyRule = {
      id: `rule-${Date.now()}`,
      code: newRuleCode.trim() || `POL-0${policyRules.length + 1}`,
      title: newRuleTitle.trim(),
      module: newRuleModule,
      description: newRuleDesc.trim(),
      status: 'ACTIVE',
    };
    setPolicyRules([...policyRules, newRule]);
    setNewRuleCode('');
    setNewRuleTitle('');
    setNewRuleDesc('');
    setShowAddRuleModal(false);
    alert(`নতুন নীতিমালা রুল "${newRule.title}" সফলভাবে সিস্টেমে কার্যকর করা হয়েছে!`);
  };

  const handleGrantStaffPermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantStaffName.trim()) {
      alert('অনুগ্রহ করে স্টাফের নাম লিখুন।');
      return;
    }
    const targetDept = departments.find((d) => d.id === grantDeptId);
    const newStaff: DepartmentStaff = {
      id: `st-${Date.now()}`,
      name: grantStaffName.trim(),
      role: grantStaffRole.trim() || (grantPermLevel === 'APPROVE' ? 'অনুমোদনকারী ইনচার্জ' : 'অপারেটর'),
      phone: '01700-112233',
      status: 'ACTIVE',
      assignedDate: '১৯ অক্টোবর ২০২৬',
    };
    setDepartments((prev) =>
      prev.map((d) => (d.id === grantDeptId ? { ...d, assignedStaff: [newStaff], status: 'ACTIVE' } : d))
    );
    setGrantStaffName('');
    setGrantStaffRole('');
    setShowGrantPermissionModal(false);
    alert(`"${grantStaffName}" কে "${targetDept?.nameBn || 'বিভাগ'}" এর জন্য "${grantPermLevel}" পারমিশন প্রদান করা হয়েছে!`);
  };

  // =========================================================================
  // STUDENT AFFAIRS, ADMISSIONS & ROSTER HANDLERS
  // =========================================================================

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentNameBn.trim()) {
      alert('অনুগ্রহ করে ছাত্রের নাম প্রদান করুন।');
      return;
    }
    const nextNum = registeredStudents.length + 1;
    const finalRegNo = newStudentRegNo.trim() || `REG-2026-${String(nextNum).padStart(4, '0')}`;
    const newStudent: RegisteredStudent = {
      registrationNo: finalRegNo,
      roll: newStudentRoll.trim() || String(nextNum).padStart(2, '0'),
      nameBn: newStudentNameBn.trim(),
      fatherNameBn: newStudentFatherNameBn.trim() || 'অভিভাবক',
      motherNameBn: newStudentMotherNameBn.trim() || 'মাতা',
      classGradeBn: newStudentClassBn,
      batchSessionBn: '২০২৬ সেশন',
      guardianPhone: newStudentPhone.trim() || '01700-000000',
      dueAmount: Number(newStudentFee) || 1500,
      monthlyFee: Number(newStudentFee) || 1500,
      feeHead: newStudentResidential === 'RESIDENTIAL' ? 'আবাসিক খানা ও কিতাব ফি' : 'অনাবাসিক টিউশন ফি',
      residentialStatus: newStudentResidential,
      roomNo: newStudentResidential === 'RESIDENTIAL' ? newStudentRoomNo : 'অনাবাসিক',
      bloodGroup: newStudentBloodGroup,
      mealActive: newStudentResidential === 'RESIDENTIAL',
    };

    setRegisteredStudents([newStudent, ...registeredStudents]);
    setShowAddStudentModal(false);
    setNewStudentNameBn('');
    setNewStudentRoll('');
    setNewStudentPhone('');
    alert(`ছাত্র "${newStudent.nameBn}" (রেজিস্ট্রেশন: ${newStudent.registrationNo}) সফলভাবে ভর্তি করা হয়েছে!`);
  };

  const handleDeleteStudent = (regNo: string) => {
    const st = registeredStudents.find((s) => s.registrationNo === regNo);
    if (!st) return;
    if (confirm(`আপনি কি নিশ্চিত যে "${st.nameBn}" (রেজিস্ট্রেশন: ${regNo}) এর ছাত্র রেকর্ড মুছে ফেলতে চান?`)) {
      setRegisteredStudents(registeredStudents.filter((s) => s.registrationNo !== regNo));
      alert(`ছাত্র "${st.nameBn}" এর রেকর্ড মুছে ফেলা হয়েছে।`);
    }
  };

  // =========================================================================
  // TEACHERS, FACULTY & CLASS ROUTINE HANDLERS
  // =========================================================================

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherNameBn.trim()) {
      alert('অনুগ্রহ করে শিক্ষকের নাম প্রদান করুন।');
      return;
    }
    const newId = `tch-${Date.now()}`;
    const newTeacher: Teacher = {
      id: newId,
      nameBn: newTeacherNameBn.trim(),
      designationBn: newTeacherDesignationBn.trim(),
      departmentBn: newTeacherDepartmentBn.trim(),
      phone: newTeacherPhone.trim() || '01700-000000',
      monthlySalary: Number(newTeacherSalary) || 20000,
      status: 'ACTIVE',
      assignedClasses: [newTeacherDepartmentBn],
    };

    setTeachers([...teachers, newTeacher]);
    setShowAddTeacherModal(false);
    setNewTeacherNameBn('');
    setNewTeacherPhone('');
    alert(`শিক্ষক "${newTeacher.nameBn}" সফলভাবে যুক্ত করা হয়েছে!`);
  };

  const handleDeleteTeacher = (id: string) => {
    const tch = teachers.find((t) => t.id === id);
    if (!tch) return;
    if (confirm(`আপনি কি নিশ্চিত যে শিক্ষক "${tch.nameBn}" এর প্রোফাইল মুছে ফেলতে চান?`)) {
      setTeachers(teachers.filter((t) => t.id !== id));
      setClassRoutines(classRoutines.filter((r) => r.teacherId !== id));
      alert(`শিক্ষক "${tch.nameBn}" এর প্রোফাইল মুছে ফেলা হয়েছে।`);
    }
  };

  const handleAddRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    const tch = teachers.find((t) => t.id === newRoutineTeacherId);
    const teacherName = tch ? tch.nameBn : 'দায়িত্বপ্রাপ্ত শিক্ষক';
    const newRoutine: ClassRoutine = {
      id: `rt-${Date.now()}`,
      teacherId: newRoutineTeacherId,
      teacherNameBn: teacherName,
      classNameBn: newRoutineClassBn,
      subjectBookBn: newRoutineBookBn,
      periodTimeBn: newRoutinePeriodBn,
      roomNoBn: newRoutineRoomBn,
      dayBn: newRoutineDayBn,
    };

    setClassRoutines([...classRoutines, newRoutine]);
    setShowAddRoutineModal(false);
    alert(`ক্লাস "${newRoutine.classNameBn}" এর জন্য "${newRoutine.subjectBookBn}" রুটিন সফলভাবে সেভ হয়েছে!`);
  };

  const handleDeleteRoutine = (id: string) => {
    const rt = classRoutines.find((r) => r.id === id);
    if (!rt) return;
    if (confirm(`আপনি কি "${rt.classNameBn} - ${rt.subjectBookBn}" এর রুটিন মুছে ফেলতে চান?`)) {
      setClassRoutines(classRoutines.filter((r) => r.id !== id));
      alert('রুটিনটি মুছে ফেলা হয়েছে।');
    }
  };

  // =========================================================================
  // CLEAR ALL DEMO DATA HANDLER
  // =========================================================================

  const handleClearAllDemoData = () => {
    if (confirm('সতর্কতা: আপনি কি নিশ্চিত যে সমস্ত ডেমো ডাটা (শিক্ষার্থী, শিক্ষক, রুটিন, ভাউচার, ক্যাশ হিসাব ও অনুদান) সম্পূর্ণ মুছে ফ্রেশ ও শূন্য অবস্থায় রিসেট করতে চান?')) {
      setRegisteredStudents([]);
      setTeachers([]);
      setClassRoutines([]);
      setCompletedPayments([]);
      setExpenseVouchers([]);
      setDonations([]);
      setDailyClosings([]);
      setShariahFunds((prev) => prev.map((f) => ({ ...f, balance: 0 })));
      setPosStudentRegNo('');
      setPosStudentName('');
      setPosFatherName('');
      setPosMotherName('');
      setPosClassName('');
      setPosRoll('');
      setPosGuardianPhone('');
      setPosAmount(0);
      setStudentRegSearch('');
      alert('সমস্ত ডেমো ডাটা সফলভাবে মুছে দেওয়া হয়েছে! সিস্টেম এখন সম্পূর্ণ ফ্রেশ এবং শূন্য ব্যালেন্সে প্রস্তুত।');
    }
  };

  // =========================================================================
  // ACCOUNTS & FINANCE HANDLERS
  // =========================================================================

  // 0. Auto-Lookup Student Profile by Unique Registration Number or Roll
  const handleLookupStudent = (regNo: string) => {
    const query = regNo.trim().toLowerCase();
    const student = registeredStudents.find(
      (s) => s.registrationNo.toLowerCase() === query || s.roll.toLowerCase() === query
    );
    if (student) {
      setPosStudentRegNo(student.registrationNo);
      setPosStudentName(student.nameBn);
      setPosFatherName(student.fatherNameBn);
      setPosMotherName(student.motherNameBn);
      setPosClassName(student.classGradeBn);
      setPosBatchSession(student.batchSessionBn);
      setPosRoll(student.roll);
      setPosGuardianPhone(student.guardianPhone);
      setPosAmount(student.dueAmount);
      setPosFeeType(student.feeHead);
      alert(`শিক্ষার্থী পাওয়া গেছে: "${student.nameBn}" (${student.registrationNo})\nপিতা: ${student.fatherNameBn} | শ্রেণি: ${student.classGradeBn}\nসকল তথ্য অটোমেটিক ফিলাপ হয়েছে!`);
    } else {
      alert(`"${regNo}" নম্বরের কোনো নিবন্ধিত শিক্ষার্থী পাওয়া যায়নি। অনুগ্রহ করে ইউনিক রেজিস্ট্রেশন নম্বর (যেমন: REG-2026-0001) দিন অথবা ম্যানুয়ালি তথ্য লিখুন।`);
    }
  };

  // 0.1 Update Admin Expense Approval Threshold Limit
  const handleSaveThresholdLimit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = Number(tempThresholdInput);
    if (!limit || limit <= 0) {
      alert('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }
    setApprovalThresholdLimit(limit);
    setShowThresholdConfigModal(false);
    alert(`মুহতামিম সাহেবের নতুন খরচের অনুমোদন সীমা সফলভাবে "৳${limit.toLocaleString('bn-BD')}" নির্ধারণ করা হয়েছে!`);
  };

  // 1. Collect Fee at Counter (POS with Unique Reg & Auto Fill)
  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posStudentName.trim() || posAmount <= 0) {
      alert('অনুগ্রহ করে ছাত্রের নাম ও সঠিক টাকার পরিমাণ প্রদান করুন।');
      return;
    }
    const net = Math.max(0, posAmount - posDiscount);
    const targetFund = shariahFunds.find((f) => f.id === posFundId) || shariahFunds[0];
    const newPayment: FeePayment = {
      id: `pay-${Date.now()}`,
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registrationNo: posStudentRegNo,
      studentId: `STD-${posRoll.padStart(3, '0')}`,
      studentRoll: posRoll,
      studentNameBn: posStudentName.trim(),
      fatherNameBn: posFatherName,
      motherNameBn: posMotherName,
      classNameBn: posClassName,
      feeTypeBn: posFeeType,
      amount: posAmount,
      discount: posDiscount,
      netPaid: net,
      paymentMethod: posMethod,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      status: 'COMPLETED',
      isReceiptPrinted: false,
      date: '২০ অক্টোবর ২০২৬, দুপুর ০১:১৫',
      receivedBy: 'মাওলানা কাসেম (হিসাবরক্ষক)',
    };

    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + net } : f))
    );
    setCompletedPayments([newPayment, ...completedPayments]);
    alert(`${newPayment.receiptNo} নম্বরে ৳${net.toLocaleString('bn-BD')} ফি সফলভাবে গ্রহণ করা হয়েছে এবং "${targetFund.nameBn}"-এ জমা হয়েছে।`);
    setActiveThermalReceipt(newPayment);
  };

  // 1.1 Specialized Portal Donation Handlers (Zakat, Lillah, Waqf, Box)
  const handleSaveZakatDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || newDonorAmount <= 0) {
      alert('অনুগ্রহ করে দাতার নাম ও সঠিক যাকাত পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === 'fnd-lillah') || shariahFunds[1];
    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNo: `ZKT-2026-0${donations.length + 201}`,
      donorName: newDonorName.trim(),
      phone: newDonorPhone.trim() || '—',
      whatsapp: donorWhatsappInput.trim() || undefined,
      causeHead: donorCauseInput.trim() || 'পবিত্র যাকাত ও এতিম সহায়তা',
      donorType: 'ONE_TIME',
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      amount: newDonorAmount,
      paymentMethod: newDonorMethod,
      date: '২০ অক্টোবর ২০২৬',
      notes: donorAddressInput.trim() || 'যাকাত তহবিল জমা',
    };
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + newDonorAmount } : f))
    );
    setDonations([newDonation, ...donations]);
    setNewDonorName('');
    setNewDonorPhone('');
    setDonorWhatsappInput('');
    setDonorCauseInput('');
    alert(`আলহামদুলিল্লাহ! "${newDonation.donorName}" এর ৳${newDonorAmount.toLocaleString('bn-BD')} যাকাত সফলভাবে "${targetFund.nameBn}"-এ জমা হয়েছে।`);
  };

  const handleSaveLillahDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || newDonorAmount <= 0) {
      alert('অনুগ্রহ করে দাতার নাম ও সঠিক লিল্লাহ অনুদান লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === 'fnd-lillah') || shariahFunds[1];
    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNo: `LIL-2026-0${donations.length + 301}`,
      donorName: newDonorName.trim(),
      phone: newDonorPhone.trim() || '—',
      whatsapp: donorWhatsappInput.trim() || undefined,
      causeHead: donorCauseInput.trim() || 'লিল্লাহ বোর্ডিং ও মেস খানা স্পন্সর',
      donorType: 'MONTHLY',
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      amount: newDonorAmount,
      paymentMethod: newDonorMethod,
      date: '২০ অক্টোবর ২০২৬',
      notes: donorAddressInput.trim() || 'লিল্লাহ বোর্ডিং খাদ্য অনুদান',
    };
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + newDonorAmount } : f))
    );
    setDonations([newDonation, ...donations]);
    setNewDonorName('');
    setNewDonorPhone('');
    setDonorWhatsappInput('');
    setDonorCauseInput('');
    alert(`জাযাকাল্লাহু খাইরান! "${newDonation.donorName}" এর ৳${newDonorAmount.toLocaleString('bn-BD')} লিল্লাহ বোর্ডিং অনুদান গ্রহণ সম্পন্ন হয়েছে।`);
  };

  const handleSaveWaqfDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || newDonorAmount <= 0) {
      alert('অনুগ্রহ করে দাতার নাম ও সঠিক ওয়াকফ পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === 'fnd-waqf') || shariahFunds[3];
    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNo: `WQF-2026-0${donations.length + 401}`,
      donorName: newDonorName.trim(),
      phone: newDonorPhone.trim() || '—',
      whatsapp: donorWhatsappInput.trim() || undefined,
      causeHead: donorCauseInput.trim() || 'মাদ্রাসা ভবন নির্মাণ ও মসজিদ ওয়াকফ',
      donorType: 'LIFETIME',
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      amount: newDonorAmount,
      paymentMethod: newDonorMethod,
      date: '২০ অক্টোবর ২০২৬',
      notes: donorAddressInput.trim() || 'ওয়াকফ নির্মাণ অনুদান',
    };
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + newDonorAmount } : f))
    );
    setDonations([newDonation, ...donations]);
    setNewDonorName('');
    setNewDonorPhone('');
    setDonorWhatsappInput('');
    setDonorCauseInput('');
    alert(`সাদাকায়ে জারিয়া! "${newDonation.donorName}" এর ৳${newDonorAmount.toLocaleString('bn-BD')} ওয়াকফ অনুদান সফলভাবে সংরক্ষিত হয়েছে।`);
  };

  const handleSaveBoxDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || newDonorAmount <= 0) {
      alert('অনুগ্রহ করে বাক্সের নাম ও গণনাকৃত পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === newDonorFundId) || shariahFunds[0];
    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNo: `BOX-2026-0${donations.length + 501}`,
      donorName: newDonorName.trim(),
      phone: '—',
      donorType: 'BOX',
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      amount: newDonorAmount,
      paymentMethod: 'নগদ ক্যাশ গণনা',
      date: '২০ অক্টোবর ২০২৬',
      notes: donorCauseInput.trim() || 'দান বাক্স ক্যাশ রেজিস্ট্রি',
    };
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + newDonorAmount } : f))
    );
    setDonations([newDonation, ...donations]);
    setNewDonorName('');
    setDonorCauseInput('');
    alert(`দান বাক্সের ৳${newDonorAmount.toLocaleString('bn-BD')} সফলভাবে "${targetFund.nameBn}"-এ জমা হয়েছে।`);
  };

  // 1.2 Dedicated Portal Expense Handlers with Approval Threshold Check
  const handleAddBazarExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim() || newExpenseAmount <= 0) {
      alert('অনুগ্রহ করে মেস বাজারের বিবরণ ও সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === bazarFundId) || shariahFunds[1];
    const isOverThreshold = newExpenseAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `BAZ-2026-00${expenseVouchers.length + 50}`,
      title: newExpenseTitle.trim(),
      category: 'MESS_BAZAR',
      categoryBn: 'হোস্টেল মেস বাজার',
      amount: newExpenseAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: bazarShopperStaff,
      status: isOverThreshold ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: `${bazarMemoNo} | মেস বাজার খরিদ`,
    };

    if (!isOverThreshold) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - newExpenseAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    setNewExpenseTitle('');
    alert(
      isOverThreshold
        ? `ব্যয়ের পরিমাণ (৳${newExpenseAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন সীমা (৳${approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি মুহতামিম সাহেবের অনুমোদন বোর্ডে দাখিল হয়েছে। মুহতামিমের পারমিশন ছাড়া ফান্ড থেকে টাকা কাটা হবে না।`
        : `মেস বাজার ভাউচার সফলভাবে পরিশোধ ও "${targetFund.nameBn}" থেকে ৳${newExpenseAmount.toLocaleString('bn-BD')} সমন্বয় হয়েছে।`
    );
  };

  const handleAddRepairExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim() || newExpenseAmount <= 0) {
      alert('অনুগ্রহ করে সংস্কার/মেরামত কাজের শিরোনাম ও টাকার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === repairFundId) || shariahFunds[3];
    const isOverThreshold = newExpenseAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `REP-2026-00${expenseVouchers.length + 60}`,
      title: newExpenseTitle.trim(),
      category: 'CAPITAL_REPAIR',
      categoryBn: 'স্থায়ী খরচ ও মেরামত',
      amount: newExpenseAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: repairContractor,
      status: isOverThreshold ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: `${repairBillNo} | মেরামত চালান`,
    };

    if (!isOverThreshold) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - newExpenseAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    setNewExpenseTitle('');
    alert(
      isOverThreshold
        ? `স্থায়ী খরচ ৳${newExpenseAmount.toLocaleString('bn-BD')} নির্ধারিত সীমা (৳${approvalThresholdLimit.toLocaleString('bn-BD')}) এর বেশি হওয়ায় মুহতামিম সাহেবের অনুমোদন বোর্ডে দাখিল হয়েছে।`
        : `নির্মাণ/মেরামত ভাউচার অনুমোদিত ও "${targetFund.nameBn}" থেকে ৳${newExpenseAmount.toLocaleString('bn-BD')} সমন্বয় হয়েছে।`
    );
  };

  const handleAddWelfareExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!welfareStudentName.trim() || newExpenseAmount <= 0) {
      alert('অনুগ্রহ করে গ্রহীতার নাম ও সঠিক সহায়তার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === welfareFundId) || shariahFunds[1];
    const isOverThreshold = newExpenseAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `WLF-2026-00${expenseVouchers.length + 70}`,
      title: `কল্যাণ অনুদান: ${welfareStudentName} - ${welfareReason}`,
      category: 'WELFARE_AID',
      categoryBn: 'সাহায্য ও কল্যাণ অনুদান',
      amount: newExpenseAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: 'নাজেমে দারুল ইকামাহ ও কল্যাণ ইনচার্জ',
      status: isOverThreshold ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: `কারণ: ${welfareReason}`,
    };

    if (!isOverThreshold) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - newExpenseAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    alert(
      isOverThreshold
        ? `কল্যাণ অনুদান ৳${newExpenseAmount.toLocaleString('bn-BD')} অনুমোদন বোর্ডে দাখিল হয়েছে।`
        : `অনুদান ভাউচার অনুমোদিত ও "${targetFund.nameBn}" থেকে সফলভাবে ছাড় হয়েছে।`
    );
  };

  const handleAddUtilityExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim() || newExpenseAmount <= 0) {
      alert('অনুগ্রহ করে বিলের বিবরণ ও সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === utilityFundId) || shariahFunds[0];
    const isOverThreshold = newExpenseAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `UTL-2026-00${expenseVouchers.length + 80}`,
      title: newExpenseTitle.trim(),
      category: 'UTILITY',
      categoryBn: 'ইউটিলিটি ও পরিচালনা',
      amount: newExpenseAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: utilityProvider,
      status: isOverThreshold ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: utilityTxnRef,
    };

    if (!isOverThreshold) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - newExpenseAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    setNewExpenseTitle('');
    alert(
      isOverThreshold
        ? `ইউটিলিটি বিল ৳${newExpenseAmount.toLocaleString('bn-BD')} অনুমোদন বোর্ডে দাখিল হয়েছে।`
        : `ইউটিলিটি বিল সফলভাবে পরিশোধ ও "${targetFund.nameBn}" থেকে ছাড় হয়েছে।`
    );
  };

  const handleAddEventExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventExpenseTitle.trim() || eventAmount <= 0) {
      alert('অনুগ্রহ করে ইভেন্টের শিরোনাম ও সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === eventFundId) || shariahFunds[0];
    const isOverThreshold = eventAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `EVT-2026-00${expenseVouchers.length + 10}`,
      title: `${eventExpenseTitle.trim()} (${eventSubHead})`,
      category: 'EVENT_CONFERENCE',
      categoryBn: 'ইভেন্ট ও মাহফিল খরচ',
      amount: eventAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: eventConvener,
      status: isOverThreshold ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: `${eventMemoNo} | উপ-খাত: ${eventSubHead}`,
    };

    if (!isOverThreshold) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - eventAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    alert(
      isOverThreshold
        ? `ইভেন্ট ব্যয়ের পরিমাণ (৳${eventAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন সীমা (৳${approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি মুহতামিম সাহেবের অনুমোদন বোর্ডে দাখিল হয়েছে। মুহতামিমের পারমিশন ছাড়া ফান্ড থেকে টাকা কাটা হবে না।`
        : `ইভেন্ট ব্যয় সফলভাবে পরিশোধ ও "${targetFund.nameBn}" থেকে ৳${eventAmount.toLocaleString('bn-BD')} সমন্বয় হয়েছে।`
    );
  };

  // 2. Confirm Online bKash/Nagad Payment from Student ID Queue (1-Click)
  const handleConfirmOnlinePayment = (paymentId: string, printFormat?: 'thermal' | 'official') => {
    const item = onlinePaymentQueue.find((p) => p.id === paymentId);
    if (!item) return;

    const confirmedItem: FeePayment = {
      ...item,
      status: 'COMPLETED',
      isReceiptPrinted: !!printFormat,
      receivedBy: 'মাওলানা কাসেম (অনলাইন ভেরিফাইড)',
    };

    setOnlinePaymentQueue((prev) => prev.filter((p) => p.id !== paymentId));
    setCompletedPayments((prev) => [confirmedItem, ...prev]);

    setShariahFunds((prev) =>
      prev.map((f) => (f.id === item.fundId ? { ...f, balance: f.balance + item.netPaid } : f))
    );

    alert(`অনলাইন পেমেন্ট (${item.transactionRef}) সফলভাবে অনুমোদিত ও রসিদ জেনারেট হয়েছে!`);
    if (printFormat === 'thermal') {
      setActiveThermalReceipt(confirmedItem);
    } else if (printFormat === 'official') {
      setActiveOfficialReceipt(confirmedItem);
    }
  };

  // 3. Reverse Wrong Payment Entry (Immutable Audit Trail)
  const handleReversePayment = (paymentId: string) => {
    const target = completedPayments.find((p) => p.id === paymentId);
    if (!target) return;
    const reason = window.prompt(`"${target.receiptNo}" রসিদ রিভার্স / বাতিল করার শরীয়াহ কারণ লিখুন:`, 'ভুল এন্ট্রি সংশোধন');
    if (reason === null) return;

    setCompletedPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: 'REVERSED' } : p))
    );
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === target.fundId ? { ...f, balance: Math.max(0, f.balance - target.netPaid) } : f))
    );
    alert(`রসিদ ${target.receiptNo} রিভার্স করা হয়েছে এবং ফান্ড থেকে ৳${target.netPaid.toLocaleString('bn-BD')} সমন্বয় করা হয়েছে।`);
  };

  // 4. Add Generic Expense / Bazar Requisition Voucher
  const handleAddExpenseVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim() || newExpenseAmount <= 0) {
      alert('অনুগ্রহ করে খরচের বিবরণ ও সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === newExpenseFundId) || shariahFunds[0];
    const isLargeExpense = newExpenseAmount >= approvalThresholdLimit;
    const newVoucher: ExpenseItem = {
      id: `exp-${Date.now()}`,
      voucherNo: `VCH-2026-00${expenseVouchers.length + 45}`,
      title: newExpenseTitle.trim(),
      category: newExpenseCategory,
      categoryBn:
        newExpenseCategory === 'MESS_BAZAR' ? 'মেস বাজার খরচ' :
        newExpenseCategory === 'CAPITAL_REPAIR' ? 'মেরামত ও স্থায়ী খরচ' :
        newExpenseCategory === 'SALARY' ? 'ওস্তাদ ও স্টাফদের বেতন' :
        newExpenseCategory === 'WELFARE_AID' ? 'ছাত্র কল্যাণ ও চিকিৎসা অনুদান' :
        newExpenseCategory === 'UTILITY' ? 'বিদ্যুৎ ও প্রশাসনিক ইউটিলিটি' :
        newExpenseCategory === 'EVENT_CONFERENCE' ? 'ইভেন্ট ও মাহফিল খরচ' : 'মেরামত ও স্থায়ী খরচ',
      amount: newExpenseAmount,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      requesterStaff: newExpenseRequester.trim() || 'মেস সুপারিনটেনডেন্ট',
      status: isLargeExpense ? 'SUBMITTED' : 'APPROVED',
      date: '২০ অক্টোবর ২০২৬',
      memoDetails: newExpenseMemo.trim() || 'ক্যাশ মেমো ও ভাউচার সংযুক্তি সংরক্ষিত',
    };

    if (!isLargeExpense) {
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === targetFund.id ? { ...f, balance: Math.max(0, f.balance - newExpenseAmount) } : f))
      );
    }
    setExpenseVouchers([newVoucher, ...expenseVouchers]);
    setNewExpenseTitle('');
    setNewExpenseMemo('');
    setShowAddExpenseModal(false);
    alert(
      isLargeExpense
        ? `ব্যয়ের পরিমাণ নির্ধারিত সীমা (৳${approvalThresholdLimit.toLocaleString('bn-BD')}) এর বেশি হওয়ায় "${newVoucher.voucherNo}" ভাউচারটি মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হয়েছে।`
        : `ব্যয় ভাউচার "${newVoucher.voucherNo}" সফলভাবে পরিশোধ ও ${targetFund.nameBn} থেকে সমন্বয় হয়েছে।`
    );
  };

  // 5. Approve & Adjust Expense Voucher
  const handleApproveExpense = (id: string) => {
    const target = expenseVouchers.find((v) => v.id === id);
    if (!target) return;
    setExpenseVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'APPROVED' } : v))
    );
    setShariahFunds((prev) =>
      prev.map((f) => (f.id === target.fundId ? { ...f, balance: Math.max(0, f.balance - target.amount) } : f))
    );
    alert(`ভাউচার "${target.voucherNo}" অনুমোদিত ও ফান্ড থেকে অর্থ ছাড় করা হয়েছে।`);
  };

  // 6. Approve Teacher Payroll
  const handleDisbursePayroll = (id?: string) => {
    if (id) {
      const target = payrollItems.find((p) => p.id === id);
      if (!target) return;
      setPayrollItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'DISBURSED', paidDate: '২০ অক্টোবর ২০২৬' } : p))
      );
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === 'fnd-salary' ? { ...f, balance: Math.max(0, f.balance - target.netPayable) } : f))
      );
      alert(`${target.teacherNameBn}-এর অক্টোবর ২০২৬ মাসের বেতন (৳${target.netPayable.toLocaleString('bn-BD')}) সফলভাবে বিতরণ সম্পন্ন হয়েছে।`);
    } else {
      const pendingTotal = payrollItems
        .filter((p) => p.status !== 'DISBURSED')
        .reduce((sum, p) => sum + p.netPayable, 0);
      setPayrollItems((prev) =>
        prev.map((p) => ({ ...p, status: 'DISBURSED', paidDate: '২০ অক্টোবর ২০২৬' }))
      );
      setShariahFunds((prev) =>
        prev.map((f) => (f.id === 'fnd-salary' ? { ...f, balance: Math.max(0, f.balance - pendingTotal) } : f))
      );
      alert(`সকল উস্তাদ ও কর্মচারীদের অক্টোবর ২০২৬ মাসের বেতন (৳${pendingTotal.toLocaleString('bn-BD')}) সম্পূর্ণ বিতরণ সম্পন্ন হয়েছে।`);
    }
  };

  // 7. Add Donation
  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || newDonorAmount <= 0) {
      alert('অনুগ্রহ করে দাতার নাম ও সঠিক অনুদানের পরিমাণ লিখুন।');
      return;
    }
    const targetFund = shariahFunds.find((f) => f.id === newDonorFundId) || shariahFunds[0];
    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      receiptNo: `DON-2026-0${donations.length + 105}`,
      donorName: newDonorName.trim(),
      phone: newDonorPhone.trim() || '—',
      donorType: newDonorType,
      fundId: targetFund.id,
      fundNameBn: targetFund.nameBn,
      amount: newDonorAmount,
      paymentMethod: newDonorMethod,
      date: '২০ অক্টোবর ২০২৬',
      notes: newDonorNotes.trim(),
    };

    setShariahFunds((prev) =>
      prev.map((f) => (f.id === targetFund.id ? { ...f, balance: f.balance + newDonorAmount } : f))
    );
    setDonations([newDonation, ...donations]);
    setNewDonorName('');
    setNewDonorPhone('');
    setNewDonorNotes('');
    setShowAddDonationModal(false);
    alert(`জাযাকাল্লাহু খাইরান! "${newDonation.donorName}" এর ৳${newDonorAmount.toLocaleString('bn-BD')} দান "${targetFund.nameBn}"-এ জমা হয়েছে।`);
  };

  // 8. Submit Daily Cashier Closing to Muhtamim
  const handleSubmitDailyClosing = (e: React.FormEvent) => {
    e.preventDefault();
    const handCash = parseFloat(closingHandCash) || 0;
    const todayCash = completedPayments
      .filter((p) => p.paymentMethod === 'CASH' && p.status === 'COMPLETED')
      .reduce((s, p) => s + p.netPaid, 0);
    const todayOnline = completedPayments
      .filter((p) => p.paymentMethod !== 'CASH' && p.status === 'COMPLETED')
      .reduce((s, p) => s + p.netPaid, 0);
    const totalToday = todayCash + todayOnline;
    const diff = handCash - todayCash;

    const newClosing: DailyClosingRecord = {
      id: `cls-${Date.now()}`,
      closingDate: '২০ অক্টোবর ২০২৬',
      cashierName: 'মাওলানা কাসেম মাহমুদ (প্রধান হিসাবরক্ষক)',
      cashReceived: todayCash,
      onlineReceived: todayOnline,
      totalCollected: totalToday,
      handCountCash: handCash,
      variance: diff,
      submittedToMuhtamimAt: '২০ অক্টোবর ২০২৬, দুপুর ০১:২০',
      status: 'SUBMITTED',
    };

    setDailyClosings([newClosing, ...dailyClosings]);
    setClosingFeedbackMsg(`আজকের দিনশেষের ক্যাশ ক্লোজিং রিপোর্ট (নগদ: ৳${todayCash.toLocaleString('bn-BD')}, অনলাইন: ৳${todayOnline.toLocaleString('bn-BD')}) সফলভাবে মুহতামিম সাহেবের ড্যাশবোর্ডে প্রেরণ করা হয়েছে!`);
    setTimeout(() => setClosingFeedbackMsg(null), 6000);
  };

  const handleToggleBlock = (madrasaId: string) => {
    setMadrasas(
      madrasas.map((m) => {
        if (m.id === madrasaId) {
          const nextStatus = m.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
          alert(
            nextStatus === 'BLOCKED'
              ? `"${m.nameBn}" সফলভাবে ব্লক / স্থগিত করা হয়েছে। টেন্যান্টের প্রবেশাধিকার বন্ধ থাকবে।`
              : `"${m.nameBn}" সফলভাবে আনব্লক করা হয়েছে। প্রতিষ্ঠানটি পুনরায় সক্রিয়।`
          );
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    setDropdownMadrasaId(null);
  };

  const handleDeleteMadrasa = (madrasa: Madrasa) => {
    setShowDeleteModalFor(madrasa);
    setDropdownMadrasaId(null);
  };

  const confirmDeleteMadrasa = () => {
    if (!showDeleteModalFor) return;
    setMadrasas(madrasas.filter((m) => m.id !== showDeleteModalFor.id));
    if (currentAdminMadrasa?.id === showDeleteModalFor.id) {
      setCurrentAdminMadrasa(null);
      setActiveNav('monitor');
    }
    alert(`"${showDeleteModalFor.nameBn}" সফলভাবে সিস্টেম থেকে মুছে ফেলা হয়েছে।`);
    setShowDeleteModalFor(null);
  };

  const handleChangePlan = (madrasa: Madrasa) => {
    setShowPlanModalFor(madrasa);
    setDropdownMadrasaId(null);
  };

  const confirmPlanChange = (newPlan: 'Basic' | 'Standard' | 'Enterprise') => {
    if (!showPlanModalFor) return;
    setMadrasas(madrasas.map((m) => (m.id === showPlanModalFor.id ? { ...m, plan: newPlan } : m)));
    if (currentAdminMadrasa?.id === showPlanModalFor.id) {
      setCurrentAdminMadrasa({ ...currentAdminMadrasa, plan: newPlan });
    }
    alert(`"${showPlanModalFor.nameBn}" এর প্যাকেজ সফলভাবে '${newPlan}' এ পরিবর্তন করা হয়েছে।`);
    setShowPlanModalFor(null);
  };

  const handleExportBackup = (madrasa: Madrasa) => {
    alert(`"${madrasa.nameBn}" এর সমস্ত ডাটাবেস ও লেজার সফলভাবে ব্যাকআপ জেনারেট হয়েছে! (মাদ্রাসা কোড: ${madrasa.code})`);
    setDropdownMadrasaId(null);
  };

  const handleAddNewMadrasa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMadrasaName.trim()) return;
    const newId = String(madrasas.length + 1);
    const newCode = `MDR-00${newId}`;
    const newEntry: Madrasa = {
      id: newId,
      code: newCode,
      nameBn: newMadrasaName,
      division: 'ঢাকা',
      district: newMadrasaDistrict,
      thana: 'সদর',
      type: 'QAWMI',
      students: Number(newMadrasaStudents) || 300,
      status: 'ACTIVE',
      plan: newMadrasaPlan,
      renewalDue: false,
    };
    setMadrasas([...madrasas, newEntry]);
    setShowAddMadrasaModal(false);
    setNewMadrasaName('');
    alert(`নতুন মাদ্রাসা "${newEntry.nameBn}" সফলভাবে যুক্ত হয়েছে!`);
  };

  // Language download/install handler
  const handleInstallLanguage = (langCode: Language, langTitle: string) => {
    if (!installedLanguages.includes(langCode)) {
      setInstalledLanguages([...installedLanguages, langCode]);
      setCurrentLang(langCode);
      alert(`"${langTitle}" ভাষা প্যাকেজ সফলভাবে ডাউনলোড ও সক্রিয় করা হয়েছে!`);
    } else {
      setCurrentLang(langCode);
    }
    setLangDropdownOpen(false);
  };

  const isRtl = currentLang === 'ar' || currentLang === 'ur';

  const renderDeptIcon = (iconType: string, className = 'w-5 h-5') => {
    switch (iconType) {
      case 'finance':
        return <CreditCard className={className} />;
      case 'audit':
        return <Scale className={className} />;
      case 'academic':
        return <BookOpen className={className} />;
      case 'teachers':
        return <Users className={className} />;
      case 'hostel':
        return <Bed className={className} />;
      case 'students':
        return <GraduationCap className={className} />;
      case 'library':
        return <FileText className={className} />;
      case 'exam':
        return <CheckCheck className={className} />;
      case 'sms':
        return <Smartphone className={className} />;
      case 'health':
        return <HeartPulse className={className} />;
      case 'security':
        return <ShieldCheck className={className} />;
      case 'settings':
      default:
        return <Settings className={className} />;
    }
  };

  // Computed Daily Totals for Central Accounts Top Cards
  const todayReceivedTotal =
    completedPayments.filter((p) => p.date.includes('২০ অক্টোবর ২০২৬')).reduce((s, p) => s + p.netPaid, 0) +
    donations.filter((d) => d.date.includes('২০ অক্টোবর ২০২৬')).reduce((s, d) => s + d.amount, 0);
  const todayExpenseTotal = expenseVouchers
    .filter((e) => e.date.includes('২০ অক্টোবর ২০২৬'))
    .reduce((s, e) => s + e.amount, 0);
  const todayNetSurplus = todayReceivedTotal - todayExpenseTotal;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      onClick={() => {
        if (dropdownMadrasaId) setDropdownMadrasaId(null);
        if (deptDropdownId) setDeptDropdownId(null);
        if (langDropdownOpen) setLangDropdownOpen(false);
      }}
      className="bg-[var(--background)] text-[var(--foreground)] antialiased h-screen flex overflow-hidden font-bangla transition-colors duration-200"
    >
      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION                                                        */}
      {/* ========================================================================= */}
      <aside className="w-64 bg-[var(--card)] border-r border-[var(--border)] flex flex-col h-full shrink-0 shadow-sm z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-lg shadow-sm">
              م
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight flex items-center gap-1.5">
                {t('appName')}
              </h1>
              <p className="text-xs font-semibold text-[var(--muted-foreground)]">
                {currentAdminMadrasa ? t('muhtamimPanel') : `${t('superAdmin')} & ERP`}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-bold border border-emerald-500/20">
            PRO
          </span>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm">
          {/* If currently logged in as a Madrasa Admin (Impersonated Context) */}
          {currentAdminMadrasa ? (
            <div className="space-y-1">
              <div className="p-3 mb-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase font-bold tracking-wider opacity-85">
                    {t('muhtamimPanel')}
                  </span>
                  <span className="text-xs font-semibold font-mono px-1.5 py-0.2 rounded bg-black/20 font-bold">
                    {currentAdminMadrasa.plan}
                  </span>
                </div>
                <div className="font-bold text-xs truncate">{currentAdminMadrasa.nameBn}</div>
                <button
                  onClick={() => {
                    setCurrentAdminMadrasa(null);
                    setActiveNav('monitor');
                  }}
                  className="w-full mt-2 py-1 px-2 rounded-lg bg-black/20 hover:bg-black/30 text-xs font-medium font-medium flex items-center justify-center gap-1 transition"
                >
                  <ArrowLeft className="w-3 h-3" />
                  সুপার অ্যাডমিনে ফিরুন
                </button>
              </div>

              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  মাদ্রাসা কার্যক্রম ও বিভাগসমূহ
                </p>
                <span className="text-xs font-semibold font-mono px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                  {departments.length}
                </span>
              </div>

              {/* Central Department Dashboard Landing Button */}
              <button
                onClick={() => setActiveNav('madrasa_dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'madrasa_dashboard'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileSpreadsheet className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" />
                  <span className="truncate font-semibold">ড্যাশবোর্ড ও সকল বিভাগ</span>
                </div>
                <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono font-bold">
                  মূল
                </span>
              </button>

              <div className="border-t border-[var(--border)] my-2 pt-1 space-y-1">
                {departments.map((d) => {
                  const isActiveNav = activeNav === d.routeKey;
                  return (
                    <div key={d.id} className="relative group">
                      <div
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors text-left ${
                          isActiveNav
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                            : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        <button
                          onClick={() => setActiveNav(d.routeKey)}
                          className="flex items-center gap-2.5 truncate flex-1 text-left"
                        >
                          <span className={isActiveNav ? 'text-[var(--primary-foreground)]' : ''}>
                            {renderDeptIcon(d.iconType, 'w-4 h-4')}
                          </span>
                          <span className="truncate text-xs">{d.nameBn}</span>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Status Dot */}
                          <span
                            className={`w-2 h-2 rounded-full ${
                              d.status === 'ACTIVE'
                                ? 'bg-emerald-500'
                                : d.status === 'HOLD'
                                ? 'bg-amber-500'
                                : 'bg-zinc-400'
                            }`}
                            title={d.status === 'ACTIVE' ? 'সক্রিয়' : d.status === 'HOLD' ? 'স্থগিত' : 'দায়িত্বহীন'}
                          ></span>

                          {/* 3-Dot Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeptDropdownId(deptDropdownId === d.id ? null : d.id);
                            }}
                            className={`p-1 rounded hover:bg-black/20 transition ${
                              deptDropdownId === d.id ? 'bg-black/20 text-white' : 'opacity-60 hover:opacity-100'
                            }`}
                            title="অ্যাক্সেস কন্ট্রোল ও দায়িত্ব"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* 3-Dot Dropdown Popover */}
                      {deptDropdownId === d.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-full top-0 ml-2 w-56 p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95"
                        >
                          <div className="px-2.5 py-1 text-xs font-semibold font-bold text-[var(--muted-foreground)] border-b border-[var(--border)] uppercase">
                            {d.nameBn} • অ্যাক্সেস কন্ট্রোল
                          </div>
                          <div className="px-2.5 py-1 text-xs font-medium text-[var(--foreground)]">
                            <span className="text-[var(--muted-foreground)]">দায়িত্বপ্রাপ্ত: </span>
                            <strong>{d.assignedStaff[0]?.name || 'কেউ নিযুক্ত নেই'}</strong>
                          </div>
                          <button
                            onClick={() => handleOpenAssignModal(d)}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                            <span>দায়িত্বপ্রাপ্ত উস্তাদ নির্ধারণ / পরিবর্তন</span>
                          </button>
                          <button
                            onClick={() => handleToggleDeptHold(d.id)}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-[var(--background)] text-amber-800 dark:text-amber-400 font-bold transition font-medium"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>{d.status === 'HOLD' ? 'অ্যাক্সেস পুনরায় সক্রিয় করুন' : 'অ্যাক্সেস সাময়িক স্থগিত (HOLD)'}</span>
                          </button>
                          <button
                            onClick={() => handleRevokeDeptAccess(d.id)}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold transition font-medium"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>স্টাফ অ্যাক্সেস সম্পূর্ণ বাতিল</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Super Admin View */
            <>
              {/* Section: Madrasas General */}
              <p className="px-3 text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 mt-1">
                {t('madrasasCategory')}
              </p>
              <button
                onClick={() => setActiveNav('directory')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'directory'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('directory')}</span>
              </button>
              <button
                onClick={() => setActiveNav('pending')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'pending'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t('pending')}</span>
                </span>
                <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs px-2 py-0.5 rounded-full font-bold">
                  {pendingMadrasas.length}
                </span>
              </button>
              <button
                onClick={() => setActiveNav('trial')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'trial'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <Package className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" />
                <span>{t('trial')}</span>
              </button>

              <div className="my-3 border-t border-[var(--border)] mx-2"></div>

              {/* Section: Management */}
              <p className="px-3 text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                {t('managementCategory')}
              </p>
              <button
                onClick={() => setActiveNav('monitor')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'monitor'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t('monitor')}</span>
              </button>
              <button
                onClick={() => setActiveNav('billing')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'billing'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{t('billing')}</span>
                </span>
                <span className="bg-red-500/15 text-red-500 border border-red-500/30 text-xs px-2 py-0.5 rounded-md font-bold">
                  ৩ বকেয়া
                </span>
              </button>
              <button
                onClick={() => setActiveNav('plans')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'plans'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <Package className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" />
                <span>{t('plans')}</span>
              </button>

              <div className="my-3 border-t border-[var(--border)] mx-2"></div>

              {/* Section: Dynamic Madrasa List with 3-Dot Menus */}
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  {t('madrasaList')}
                </p>
                <button
                  onClick={() => setShowAddMadrasaModal(true)}
                  className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-0.5 font-bold"
                  title="নতুন মাদ্রাসা যুক্ত করুন"
                >
                  <Plus className="w-3 h-3" /> {t('newMadrasa')}
                </button>
              </div>

              <div className="space-y-1">
                {madrasas.map((m) => (
                  <div
                    key={m.id}
                    className="relative group rounded-lg hover:bg-[var(--background)] transition-colors p-1"
                  >
                    <div className="flex items-center justify-between px-2 py-1.5 text-xs">
                      {/* Madrasa Name with Status Dot */}
                      <div
                        onClick={() => handleLoginAsAdmin(m)}
                        className="flex-1 min-w-0 cursor-pointer flex items-center gap-2 pr-1"
                        title={`${m.nameBn} (${m.status === 'BLOCKED' ? 'ব্লকড' : 'সক্রিয়'})`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            m.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></span>
                        <span
                          className={`truncate font-medium text-left ${
                            m.status === 'BLOCKED' ? 'line-through text-red-400' : 'text-[var(--foreground)]'
                          }`}
                        >
                          {m.nameBn}
                        </span>
                      </div>

                      {/* 3-Dot Settings Button */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownMadrasaId(dropdownMadrasaId === m.id ? null : m.id);
                          }}
                          className="p-1 rounded hover:bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition shrink-0"
                          title="মাদ্রাসা সেটিংস ও অ্যাকশন"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {/* Dropdown Menu Popup */}
                        {dropdownMadrasaId === m.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-6 w-56 p-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95"
                          >
                            <div className="px-2.5 py-1 text-xs font-semibold text-[var(--muted-foreground)] border-b border-[var(--border)] font-bold truncate">
                              {m.nameBn}
                            </div>

                            <button
                              onClick={() => handleLoginAsAdmin(m)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-emerald-700 dark:text-emerald-400 font-bold hover:bg-emerald-500/10 font-medium transition"
                            >
                              <LogIn className="w-3.5 h-3.5" />
                              <span>অ্যাডমিন পোর্টালে লগইন</span>
                            </button>

                            <button
                              onClick={() => handleToggleBlock(m.id)}
                              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left font-medium transition ${
                                m.status === 'ACTIVE'
                                  ? 'text-amber-800 dark:text-amber-400 font-bold hover:bg-amber-500/10'
                                  : 'text-green-500 hover:bg-green-500/10'
                              }`}
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>{m.status === 'ACTIVE' ? 'মাদ্রাসা ব্লক / স্থগিত' : 'মাদ্রাসা আনব্লক করুন'}</span>
                            </button>

                            <button
                              onClick={() => handleChangePlan(m)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-[var(--foreground)] hover:bg-[var(--background)] transition"
                            >
                              <Package className="w-3.5 h-3.5 text-blue-500" />
                              <span>প্যাকেজ পরিবর্তন ({m.plan})</span>
                            </button>

                            <button
                              onClick={() => handleExportBackup(m)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-[var(--foreground)] hover:bg-[var(--background)] transition"
                            >
                              <Database className="w-3.5 h-3.5 text-purple-500" />
                              <span>ডাটা ব্যাকআপ ডাউনলোড</span>
                            </button>

                            <div className="border-t border-[var(--border)] my-1"></div>

                            <button
                              onClick={() => handleDeleteMadrasa(m)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-red-500 hover:bg-red-500/10 font-medium transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>মাদ্রাসা মুছে ফেলুন (Delete)</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-3 border-t border-[var(--border)] mx-2"></div>

              {/* Section: Software Settings (Replaces direct mobile view) */}
              <p className="px-3 text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                সফটওয়্যার সেটিংস
              </p>
              <button
                onClick={() => setActiveNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'settings'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <Settings className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                <span>সিস্টেম সেটিংস ও ভিউ</span>
              </button>

              <div className="my-3 border-t border-[var(--border)] mx-2"></div>

              {/* Section: Support */}
              <p className="px-3 text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                {t('supportCategory')}
              </p>
              <button
                onClick={() => setActiveNav('messages')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                  activeNav === 'messages'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" />
                  <span>{t('messages')}</span>
                </span>
                <span className="bg-blue-500/15 text-blue-500 border border-blue-500/30 text-xs px-2 py-0.5 rounded-full font-bold">
                  {tickets.length} নতুন
                </span>
              </button>
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--background)]/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xs shadow-sm">
            {currentAdminMadrasa ? 'MA' : 'SA'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate text-[var(--foreground)]">
              {currentAdminMadrasa ? currentAdminMadrasa.nameBn : 'মাওলানা সুপার অ্যাডমিন'}
            </p>
            <p className="text-xs font-semibold text-[var(--muted-foreground)] truncate">
              {currentAdminMadrasa ? t('muhtamimPanel') : t('systemController')}
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA WITH SLEEK TOPBAR & TOP-RIGHT LANGUAGE SELECTOR         */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Active Impersonation Context Banner */}
        {currentAdminMadrasa && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 flex items-center justify-between text-xs font-medium shrink-0 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>
                বর্তমানে আপনি <strong>{currentAdminMadrasa.nameBn}</strong> এর মুহতামিম/অ্যাডমিন পোর্টালে সরাসরি যুক্ত আছেন।
              </span>
            </div>
            <button
              onClick={() => {
                setCurrentAdminMadrasa(null);
                setActiveNav('monitor');
              }}
              className="px-3 py-1 bg-black/20 hover:bg-black/40 rounded-lg text-xs font-medium font-bold flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3 h-3" />
              সুপার অ্যাডমিনে ফিরে যান
            </button>
          </div>
        )}

        {/* Modern Topbar */}
        <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] flex items-center justify-between px-8 shrink-0 shadow-sm z-20">
          {/* Curved Search Input */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full px-4 py-2 pl-10 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-[var(--muted-foreground)]" />
          </div>

          {/* Right Actions: Top-Right Language Switcher, Theme Toggle, Alerts, Avatar */}
          <div className="flex items-center gap-3">
            {/* TOP-RIGHT MULTI-LANGUAGE SELECTOR DROPDOWN (BN, EN, AR + DOWNLOAD) */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
                className="px-3 py-1.5 text-xs rounded-full border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] flex items-center gap-1.5 transition shadow-sm font-medium"
                title="ভাষা পরিবর্তন করুন (Change Language)"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>
                  {currentLang === 'bn' ? 'বাংলা (BN)' : currentLang === 'en' ? 'English (EN)' : currentLang === 'ar' ? 'العربية (AR)' : currentLang === 'ur' ? 'اردু (UR)' : currentLang === 'ms' ? 'Melayu (MS)' : 'Türkçe (TR)'}
                </span>
                <span className="text-xs font-semibold text-[var(--muted-foreground)]">▾</span>
              </button>

              {/* Language Selection Modal Dropdown */}
              {langDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95"
                >
                  <div className="px-2.5 py-1 text-xs font-semibold font-bold text-[var(--muted-foreground)] border-b border-[var(--border)] uppercase tracking-wider">
                    ভাষা নির্বাচন করুন (Select Language)
                  </div>

                  {/* 3 Mandatory Built-in Languages */}
                  <button
                    onClick={() => {
                      setCurrentLang('bn');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                      currentLang === 'bn' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold' : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">বাংলা (Bengali - BN)</span>
                    {currentLang === 'bn' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                      currentLang === 'en' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold' : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">English (EN)</span>
                    {currentLang === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentLang('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                      currentLang === 'ar' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold' : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">العربية (Arabic - AR)</span>
                    {currentLang === 'ar' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  {/* Installed Custom Language Packs */}
                  {installedLanguages.includes('ur') && (
                    <button
                      onClick={() => {
                        setCurrentLang('ur');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                        currentLang === 'ur' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold' : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-medium">اردو (Urdu - UR)</span>
                      {currentLang === 'ur' && <Check className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  {installedLanguages.includes('ms') && (
                    <button
                      onClick={() => {
                        setCurrentLang('ms');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                        currentLang === 'ms' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold' : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-medium">Bahasa Melayu (MS)</span>
                      {currentLang === 'ms' && <Check className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <div className="border-t border-[var(--border)] my-1"></div>

                  {/* Option to Download / Add More Languages */}
                  <button
                    onClick={() => {
                      setActiveNav('settings');
                      setSettingsTab('languages');
                      setLangDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-blue-500 hover:bg-blue-500/10 font-medium transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>অন্যান্য ভাষা ডাউনলোড ও যোগ করুন...</span>
                  </button>
                </div>
              )}
            </div>

            {/* Clear All Demo Data Button */}
            <button
              onClick={handleClearAllDemoData}
              className="px-2.5 py-1.5 text-xs rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold flex items-center gap-1.5 transition shadow-sm"
              title="সকল ডেমো ডাটা মুছুন ও ফ্রেশ করুন"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ডেমো রিসেট</span>
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 text-xs rounded-full border border-[var(--border)] hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1.5 transition shadow-sm"
              title="থিম পরিবর্তন করুন"
            >
              {isLightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('darkMode')}</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('lightMode')}</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setSystemAlertOpen(!systemAlertOpen)}
                className="text-[var(--muted-foreground)] hover:text-red-500 relative transition-colors p-1"
                title="সিস্টেম অ্যালার্ট ও নোটিফিকেশন"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[var(--card)] rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[var(--card)] rounded-full"></span>
              </button>

              {/* Notification Dropdown Modal */}
              {systemAlertOpen && (
                <div className="absolute right-0 mt-3 w-80 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl space-y-3 z-50 text-xs animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                    <span className="font-bold flex items-center gap-1.5 text-[var(--foreground)]">
                      <AlertTriangle className="w-4 h-4 text-amber-800 dark:text-amber-400 font-bold" /> সিস্টেম জরুরি নোটিশ
                    </span>
                    <button
                      onClick={() => setSystemAlertOpen(false)}
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 space-y-1">
                    <div className="font-bold">SSL সার্টিফিকেট মেয়াদোত্তীর্ণ সতর্কতা</div>
                    <div className="text-xs font-medium text-[var(--muted-foreground)]">domain 'jamia-islamia.edu.bd' ৩ দিনের মধ্যে রিনিউয়াল সম্পন্ন করতে হবে।</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1">
                    <div className="font-bold">দৈনিক ডাটাবেস ব্যাকআপ সম্পন্ন</div>
                    <div className="text-xs font-medium text-[var(--muted-foreground)]">১৪৫ GB এনক্রিপ্টেড ব্যাকআপ ক্লাউড স্টোরেজে সফলভাবে সংরক্ষিত।</div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Switch Prototype Links */}
            <a
              href="/super-admin-monitor.html"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] px-2 py-1 rounded-full border border-[var(--border)] transition"
              title="ডিজাইন প্রোটোটাইপ ১ উইন্ডোতে খুলুন"
            >
              <span>প্রোটোটাইপ ১</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:opacity-90">
              {currentAdminMadrasa ? 'MA' : 'SA'}
            </div>
          </div>
        </header>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* ========================================================================= */}
          {/* VIEW: SYSTEM MONITOR                                                      */}
          {/* ========================================================================= */}
          {activeNav === 'monitor' && (
            <div className="space-y-6">
              {/* Banner (Customizable view toggleable) */}
              {dashboardWidgets.showWelcomeBanner && (
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg className="w-64 h-64 -mt-16 -mr-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <div className="z-10">
                    <h2 className="text-2xl font-bold mb-1">{t('welcome')}</h2>
                    <p className="text-[var(--primary-foreground)] opacity-90 text-xs">
                      {t('welcomeSubtitle')}
                    </p>
                  </div>
                  <div className="flex gap-8 mt-4 md:mt-0 z-10">
                    <div className="text-center">
                      <p className="text-3xl font-extrabold tracking-tight">৯৯.৯%</p>
                      <p className="text-xs font-semibold opacity-80 uppercase tracking-widest mt-1">{t('uptime')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-extrabold tracking-tight">{madrasas.length}</p>
                      <p className="text-xs font-semibold opacity-80 uppercase tracking-widest mt-1">{t('activeMadrasas')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Infrastructure Monitoring (Node Cards) */}
              {(dashboardWidgets.showWebServerNode || dashboardWidgets.showDbClusterNode || dashboardWidgets.showMobileGatewayNode) && (
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <h3 className="text-base font-bold flex items-center gap-2 text-[var(--foreground)]">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      {t('liveInfra')}
                    </h3>
                    <button
                      onClick={() => alert('সার্ভার রিস্টার্ট কমান্ড পাঠানো হয়েছে।')}
                      className="text-xs border border-[var(--border)] px-3 py-1.5 rounded-lg hover:bg-[var(--card)] transition-colors shadow-sm font-medium text-[var(--foreground)]"
                    >
                      {t('restart')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Web Server Node */}
                    {dashboardWidgets.showWebServerNode && (
                      <div className="bg-[var(--card)] border border-[var(--border)] p-5 rounded-xl shadow-sm hover:border-[var(--primary)] transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-sm text-[var(--foreground)]">মেইন ওয়েব সার্ভার (Node.js API)</h4>
                            <p className="text-xs font-medium text-[var(--muted-foreground)]">Port: 4000 (Express Production)</p>
                          </div>
                          <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold px-2 py-0.5 rounded-md font-bold">
                            {t('healthy')}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[var(--muted-foreground)]">{t('cpuUsage')}</span>
                            <span className="font-bold text-[var(--foreground)]">২৮%</span>
                          </div>
                          <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-2 overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: '28%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[var(--muted-foreground)]">{t('ramUsage')}</span>
                            <span className="font-bold text-amber-800 dark:text-amber-400 font-bold">১২.৪ GB / ১৬ GB</span>
                          </div>
                          <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Database Server Node */}
                    {dashboardWidgets.showDbClusterNode && (
                      <div className="bg-[var(--card)] border border-[var(--border)] p-5 rounded-xl shadow-sm hover:border-[var(--primary)] transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-sm text-[var(--foreground)]">{t('dbCluster')}</h4>
                            <p className="text-xs font-medium text-[var(--muted-foreground)]">Multi-Tenant Isolated Schemas</p>
                          </div>
                          <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold px-2 py-0.5 rounded-md font-bold">
                            {t('healthy')}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[var(--muted-foreground)]">{t('storageUsed')}</span>
                            <span className="font-bold text-[var(--foreground)]">১৪৫ GB / ৫০০ GB</span>
                          </div>
                          <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '29%' }}></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-[var(--background)] p-2.5 rounded-xl border border-[var(--border)]">
                          <span className="text-xs text-[var(--muted-foreground)]">{t('activeConnections')}</span>
                          <span className="font-bold text-sm text-[var(--foreground)]">১,২৪৫ টি</span>
                        </div>
                      </div>
                    )}

                    {/* Mobile App Gateway Node */}
                    {dashboardWidgets.showMobileGatewayNode && (
                      <div className="bg-[var(--card)] border border-amber-500/40 p-5 rounded-xl shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-sm text-[var(--foreground)]">{t('mobileGateway')}</h4>
                            <p className="text-xs font-medium text-[var(--muted-foreground)]">ভেরিফাইড ওটিপি ও পুশ নোটিফিকেশন</p>
                          </div>
                          <span className="bg-amber-500/15 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/30 text-xs font-semibold px-2 py-0.5 rounded-md font-bold animate-pulse">
                            হাই লেটেন্সি
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[var(--muted-foreground)]">{t('latency')}</span>
                            <span className="font-bold text-amber-800 dark:text-amber-400 font-bold">৮৫০ms</span>
                          </div>
                          <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[var(--muted-foreground)]">{t('autoScaling')}</span>
                          <button
                            onClick={() => alert('অতিরিক্ত ক্লাউড ওয়ার্কার যোগ করা হয়েছে!')}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg font-bold transition shadow-sm"
                          >
                            {t('scaleUp')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Madrasas Directory Section */}
              {dashboardWidgets.showMadrasaDirectory && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                    <div>
                      <h2 className="text-base font-bold text-[var(--foreground)]">মাদ্রাসা ডিরেক্টরি ও ফিল্টার</h2>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        নিবন্ধিত মাদ্রাসাগুলোর সার্বিক অবস্থা ও নিয়ন্ত্রণ
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] font-medium">
                      মোট ফলাফল: {filteredMadrasas.length} টি
                    </span>
                  </div>

                  {/* Filter Controls Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="মাদ্রাসার নাম বা কোড..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>

                    <select
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="">{t('allDistricts')}</option>
                      <option value="ঢাকা">ঢাকা</option>
                      <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                      <option value="সিলেট">সিলেট</option>
                      <option value="বগুড়া">বগুড়া</option>
                    </select>

                    <select
                      value={studentCountFilter}
                      onChange={(e) => setStudentCountFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="">{t('allCounts')}</option>
                      <option value="over_1000">১০০০ এর বেশি ছাত্র</option>
                      <option value="500_to_1000">৫০০ - ১০০০ ছাত্র</option>
                      <option value="under_500">৫০০ এর কম ছাত্র</option>
                    </select>

                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="">{t('allTypes')}</option>
                      <option value="QAWMI">কওমি</option>
                      <option value="ALIA">আলিয়া</option>
                      <option value="HAFIZIYA">হাফিজিয়া</option>
                    </select>
                  </div>

                  {/* Data Table */}
                  <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                        <tr>
                          <th className="p-3">{t('code')}</th>
                          <th className="p-3">{t('name')}</th>
                          <th className="p-3">{t('address')}</th>
                          <th className="p-3">{t('type')}</th>
                          <th className="p-3">{t('students')}</th>
                          <th className="p-3">{t('package')}</th>
                          <th className="p-3">{t('status')}</th>
                          <th className="p-3">{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {filteredMadrasas.map((m) => (
                          <tr key={m.id} className="hover:bg-[var(--background)]/40 transition-colors">
                            <td className="p-3 font-mono font-medium text-[var(--primary)]">{m.code}</td>
                            <td className="p-3 font-semibold text-[var(--foreground)]">{m.nameBn}</td>
                            <td className="p-3 text-[var(--muted-foreground)]">
                              {m.thana}, {m.district}
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] font-mono text-xs font-semibold">
                                {m.type}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-[var(--foreground)]">{m.students} জন</td>
                            <td className="p-3 text-[var(--muted-foreground)]">{m.plan}</td>
                            <td className="p-3">
                              {m.status === 'ACTIVE' ? (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-semibold font-medium border border-emerald-500/20">
                                  {t('active')}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold font-medium border border-red-500/20">
                                  {t('blocked')}
                                </span>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleLoginAsAdmin(m)}
                                  className="px-2.5 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium font-medium hover:opacity-90 transition flex items-center gap-1"
                                >
                                  <LogIn className="w-3 h-3" /> {t('login')}
                                </button>
                                <button
                                  onClick={() => handleToggleBlock(m.id)}
                                  className={`p-1 rounded border border-[var(--border)] hover:bg-[var(--background)] text-xs font-semibold font-medium ${
                                    m.status === 'ACTIVE' ? 'text-amber-800 dark:text-amber-400 font-bold' : 'text-green-500'
                                  }`}
                                  title={m.status === 'ACTIVE' ? 'ব্লক করুন' : 'আনব্লক করুন'}
                                >
                                  <Ban className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bottom Layout: Logs & Support */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                {dashboardWidgets.showAutoBackupLogs && (
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-[var(--foreground)]">
                        <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400 inline mr-1" /> সিস্টেম অটোমেশন ও ব্যাকআপ লগ
                      </h3>
                      <button className="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline">
                        ক্লিয়ার
                      </button>
                    </div>
                    <div className="space-y-3 flex-1 text-xs">
                      <div className="flex items-start gap-3 p-3 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                        <span className="text-green-500 text-lg leading-none mt-0.5">✓</span>
                        <div>
                          <p className="font-bold text-[var(--foreground)]">দৈনিক ডাটাবেস অটো ব্যাকআপ</p>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] mt-0.5">
                            ১৪৫ GB ডাটা এনক্রিপ্ট করে ক্লাউডে ব্যাকআপ রাখা হয়েছে।
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[var(--muted-foreground)] ml-auto shrink-0">২ ঘণ্টা আগে</span>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-bold text-red-500">SSL সার্টিফিকেট রিনিউয়াল প্রয়োজন</p>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] mt-0.5">
                            ডোমেন 'jamia-islamia.com' SSL ৩ দিনের মধ্যে মেয়াদ উত্তীর্ণ হবে।
                          </p>
                        </div>
                        <button
                          onClick={() => alert('অটো-রিনিউয়াল রিকোয়েস্ট সফল!')}
                          className="text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md font-bold ml-auto shrink-0 transition"
                        >
                          অটো-রিনিউ
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {dashboardWidgets.showSupportMessagesWidget && (
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-[var(--foreground)]">
                        <MessageCircle className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" /> মাদ্রাসার সাপোর্ট মেসেজ
                      </h3>
                      <button
                        onClick={() => setActiveNav('messages')}
                        className="text-xs text-[var(--primary)] hover:underline font-medium"
                      >
                        সবগুলো ({tickets.length} টি)
                      </button>
                    </div>
                    <div className="space-y-3 flex-1 text-xs">
                      {tickets.map((tkt) => (
                        <div
                          key={tkt.id}
                          className="p-3 bg-[var(--background)] rounded-xl border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-[var(--foreground)]">{tkt.madrasa}</span>
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">{tkt.time}</span>
                          </div>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] line-clamp-1">{tkt.subject}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: SOFTWARE SETTINGS & CUSTOMIZATION (DASHBOARD, MOBILE & LANGUAGES)   */}
          {/* ========================================================================= */}
          {activeNav === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Settings className="w-5 h-5 text-emerald-700 dark:text-emerald-400 font-bold" />
                    সফটওয়্যার সেটিংস ও ড্যাশবোর্ড কাস্টমাইজেশন
                  </h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    সুপার অ্যাডমিন ড্যাশবোর্ড ভিউ পরিবর্তন, অভিভাবক মোবাইল অ্যাপ সিমুলেটর এবং ভাষা প্যাকেজ ম্যানেজার
                  </p>
                </div>

                {/* Settings Sub-tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[var(--card)] rounded-xl border border-[var(--border)] text-xs">
                  <button
                    onClick={() => setSettingsTab('dashboard')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                      settingsTab === 'dashboard'
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    ড্যাশবোর্ড ভিউ
                  </button>
                  <button
                    onClick={() => setSettingsTab('mobile')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                      settingsTab === 'mobile'
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    মোবাইল অ্যাপ ভিউ
                  </button>
                  <button
                    onClick={() => setSettingsTab('languages')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                      settingsTab === 'languages'
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    ভাষা ও ডাউনলোড
                  </button>
                </div>
              </div>

              {/* TAB 1: DASHBOARD VIEW CUSTOMIZATION */}
              {settingsTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                      সুপার অ্যাডমিন ড্যাশবোর্ড উইজেট কন্ট্রোল
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      আপনার প্রয়োজন অনুসারে মূল ড্যাশবোর্ডের যেকোনো উইজেট বা সার্ভার কার্ড অন/অফ করতে পারেন:
                    </p>

                    <div className="space-y-3 text-xs">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">ওয়েলকাম ব্যানার ও গ্লোবাল আপটাইম</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">৯৯.৯% আপটাইম ও সক্রিয় মাদ্রাসা কাউন্টার</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showWelcomeBanner}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showWelcomeBanner: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">মেইন ওয়েব সার্ভার নোড (Node.js API)</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">সিপিইউ ও র‍্যাম মেমোরি মিটার</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showWebServerNode}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showWebServerNode: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">ডাটাবেস ক্লাস্টার নোড (PostgreSQL)</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">স্টোরেজ ব্যবহার ও কানেকশন পুল</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showDbClusterNode}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showDbClusterNode: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">মোবাইল অ্যাপ গেটওয়ে নোড (API Gateway)</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">রিকোয়েস্ট লেটেন্সি ও স্কেল-আপ বোতাম</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showMobileGatewayNode}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showMobileGatewayNode: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">মাদ্রাসা ডিরেক্টরি ও ফিল্টার টেবিল</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">জেলা ও ছাত্র সংখ্যা ভিত্তিক দ্রুত অনুসন্ধান</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showMadrasaDirectory}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showMadrasaDirectory: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-medium">
                      ✓ এখানে টিক পরিবর্তন করলে তা তাৎক্ষণিকভাবে 'সিস্টেম লাইভ মনিটর' ড্যাশবোর্ডে কার্যকর হবে।
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      লাইভ প্রিভিউ প্রিফারেন্স
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      সিস্টেম অটোমেশন লগ ও সাপোর্ট টিকিট ইনবক্স ডিসপ্লে সেটিংস:
                    </p>

                    <div className="space-y-3 text-xs">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">দৈনিক ব্যাকআপ ও SSL সতর্কতা লগ</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">স্বয়ংক্রিয় ব্যাকআপ সফলতার হিস্ট্রি</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showAutoBackupLogs}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showAutoBackupLogs: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">ক্লায়েন্ট সাপোর্ট টিকিট উইজেট</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">অমীমাংসিত জরুরি প্রশ্নসমূহ</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dashboardWidgets.showSupportMessagesWidget}
                          onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, showSupportMessagesWidget: e.target.checked })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </label>
                    </div>

                    <button
                      onClick={() => setActiveNav('monitor')}
                      className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold hover:opacity-90 transition shadow"
                    >
                      ড্যাশবোর্ড প্রিভিউ দেখতে যান →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: MOBILE APP SETTINGS & HANDSET SIMULATOR */}
              {settingsTab === 'mobile' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Mobile Handset Simulator Frame */}
                  <div className="max-w-xs mx-auto w-full p-5 rounded-xl bg-[var(--card)] border-4 border-slate-700 shadow-2xl space-y-4">
                    <div className="w-20 h-1 bg-slate-600 rounded-full mx-auto mb-1"></div>
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                        <span className="font-bold text-[var(--foreground)] text-xs">অভিভাবক অ্যাপ প্রিভিউ</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                        OTP ভেরিফাইড
                      </span>
                    </div>

                    {/* Child Profile Card */}
                    <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)] text-xs">মুহাম্মদ আব্দুল্লাহ</h4>
                          <p className="text-xs font-semibold text-[var(--muted-foreground)]">রোল: ০১ | হিফজ ৩য় বর্ষ</p>
                        </div>
                        <span className="text-xs font-semibold font-mono px-1.5 py-0.5 rounded bg-[var(--card)] text-emerald-700 dark:text-emerald-400 font-bold border border-[var(--border)]">
                          DHK-0001
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--card)] text-xs font-semibold border border-[var(--border)]">
                        <span className="text-[var(--muted-foreground)]">আজকের হাজিরা:</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> উপস্থিত ({attendancePushTime})
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[var(--muted-foreground)]">হিফজ (৬০ / ৬০৪ পৃষ্ঠা)</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold font-bold">১০% সম্পন্ন</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[10%]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Gatepass Status */}
                    <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-1 text-xs font-semibold">
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--foreground)] font-semibold flex items-center gap-1">
                          <QrCode className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" /> ডিজিটাল গেটপাস
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 font-medium">
                          অনুমোদিত
                        </span>
                      </div>
                      <div className="text-[var(--muted-foreground)]">মেয়াদ: সন্ধ্যা ৬:০০ ঘটিকা</div>
                    </div>

                    {/* bKash Payment Simulation */}
                    {mobileBkashActive && (
                      <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-[var(--foreground)] font-semibold">বকেয়া মাসিক ফি</span>
                          <span className="text-amber-800 dark:text-amber-400 font-bold font-bold">৳১,৫০০</span>
                        </div>
                        <button
                          onClick={() => alert('বিকাশ পেমেন্ট সিমুলেশন সফল!')}
                          className="w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs font-semibold shadow flex items-center justify-center gap-1 transition"
                        >
                          বিকাশ (bKash) দিয়ে পরিশোধ
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mobile Gateway Configurations */}
                  <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4 text-xs">
                    <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                      অভিভাবক মোবাইল অ্যাপ সিস্টেম কনফিগারেশন
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                      সুপার অ্যাডমিন হিসেবে আপনি মোবাইল অ্যাপের সার্ভার গেটওয়ে ও ওটিপি সার্ভিস কাস্টমাইজ করতে পারেন:
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[var(--muted-foreground)] mb-1">এসএমএস ও ওটিপি গেটওয়ে প্রদানকারী</label>
                        <select
                          value={mobileOtpProvider}
                          onChange={(e) => setMobileOtpProvider(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                        >
                          <option value="GREENWEB">Greenweb SMS API (বাংলাদেশ)</option>
                          <option value="TELETALK">Teletalk Gov Gateway</option>
                          <option value="TWILIO">Twilio Global SMS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[var(--muted-foreground)] mb-1">দৈনিক হাজিরা পুশ নোটিফিকেশন সময়</label>
                        <input
                          type="text"
                          value={attendancePushTime}
                          onChange={(e) => setAttendancePushTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">বিকাশ (bKash) পেমেন্ট গেটওয়ে সক্রিয় রাখুন</div>
                          <div className="text-xs font-semibold text-[var(--muted-foreground)]">অভিভাবকরা অ্যাপ থেকেই এক ক্লিকে ফি দিতে পারবেন</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={mobileBkashActive}
                          onChange={(e) => setMobileBkashActive(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => alert('মোবাইল অ্যাপ কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে!')}
                      className="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold hover:opacity-90 transition shadow"
                    >
                      কনফিগারেশন সেভ করুন
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: LANGUAGE PACKS DOWNLOAD & MANAGER */}
              {settingsTab === 'languages' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      ভাষা ও আন্তর্জাতিকীকরণ প্যাকেজ ম্যানেজার
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      ডিফল্ট ৩টি ভাষা (বাংলা, English, العربية) প্রতিটি ইন্টারফেসের উপরে রয়েছে। প্রয়োজন অনুযায়ী যেকোনো নতুন ভাষা প্যাকেজ ডাউনলোড করে যুক্ত করা যাবে:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* 1. Urdu Pack */}
                      <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[var(--foreground)]">اردو (Urdu - UR)</span>
                          {installedLanguages.includes('ur') ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-bold text-xs font-semibold">সক্রিয়</span>
                          ) : (
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">প্যাকেজ সাইজ: ২.৪ MB</span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">
                          দারুল উলুম দেওবন্দ ও উপমহাদেশীয় কওমি মাদ্রাসার জন্য নির্ধারিত পূর্ণাঙ্গ উর্দু অনুবাদ।
                        </p>
                        <button
                          onClick={() => handleInstallLanguage('ur', 'اردو (Urdu)')}
                          className="w-full py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {installedLanguages.includes('ur') ? 'বর্তমান ভাষা হিসেবে সেট করুন' : 'ডাউনলোড ও সক্রিয় করুন'}
                        </button>
                      </div>

                      {/* 2. Bahasa Melayu Pack */}
                      <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[var(--foreground)]">Bahasa Melayu (MS)</span>
                          {installedLanguages.includes('ms') ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-bold text-xs font-semibold">সক্রিয়</span>
                          ) : (
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">প্যাকেজ সাইজ: ১.৮ MB</span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">
                          মালয়েশিয়া ও ইন্দোনেশিয়া ভিত্তিক ইসলামিক তাহফিজ ও পন্ডোক মাদ্রাসার জন্য অনুবাদ।
                        </p>
                        <button
                          onClick={() => handleInstallLanguage('ms', 'Bahasa Melayu')}
                          className="w-full py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {installedLanguages.includes('ms') ? 'বর্তমান ভাষা হিসেবে সেট করুন' : 'ডাউনলোড ও সক্রিয় করুন'}
                        </button>
                      </div>

                      {/* 3. Turkish Pack */}
                      <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[var(--foreground)]">Türkçe (TR)</span>
                          {installedLanguages.includes('tr') ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold font-bold text-xs font-semibold">সক্রিয়</span>
                          ) : (
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">প্যাকেজ সাইজ: ২.১ MB</span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">
                          তুরস্ক ও অটোমান কারিকুলাম অনুসরণকারী ধর্মীয় শিক্ষা প্রতিষ্ঠানের জন্য তুর্কি অনুবাদ।
                        </p>
                        <button
                          onClick={() => handleInstallLanguage('tr', 'Türkçe')}
                          className="w-full py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {installedLanguages.includes('tr') ? 'বর্তমান ভাষা হিসেবে সেট করুন' : 'ডাউনলোড ও সক্রিয় করুন'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: DIRECTORY                                                           */}
          {/* ========================================================================= */}
          {activeNav === 'directory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">সক্রিয় ও সাবস্ক্রাইবড মাদ্রাসা তালিকা</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">সকল নিবন্ধিত ও পরিচালিত প্রতিষ্ঠানের হালনাগাদ তথ্য</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowAddMadrasaModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold hover:opacity-90 flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    নতুন মাদ্রাসা যুক্ত করুন
                  </button>
                  <button
                    onClick={handleClearAllDemoData}
                    className="px-3.5 py-1.5 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-500 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    সব ডেমো মুছুন
                  </button>
                  <button
                    onClick={() => setActiveNav('monitor')}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--card)] text-[var(--foreground)] transition"
                  >
                    ← ড্যাশবোর্ডে ফিরে যান
                  </button>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                      <tr>
                        <th className="p-3">কোড</th>
                        <th className="p-3">মাদ্রাসার নাম</th>
                        <th className="p-3">ঠিকানা</th>
                        <th className="p-3">টাইপ</th>
                        <th className="p-3">ছাত্র সংখ্যা</th>
                        <th className="p-3">প্যাকেজ</th>
                        <th className="p-3">রিনিউয়াল</th>
                        <th className="p-3">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {madrasas.map((m) => (
                        <tr key={m.id} className="hover:bg-[var(--background)]/40 transition">
                          <td className="p-3 font-mono font-medium text-[var(--primary)]">{m.code}</td>
                          <td className="p-3 font-semibold text-[var(--foreground)]">{m.nameBn}</td>
                          <td className="p-3 text-[var(--muted-foreground)]">{m.thana}, {m.district}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] font-mono text-xs font-semibold">
                              {m.type}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-[var(--foreground)]">{m.students} জন</td>
                          <td className="p-3 text-[var(--muted-foreground)]">{m.plan}</td>
                          <td className="p-3">
                            {m.renewalDue ? (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold font-bold border border-red-500/20">
                                বকেয়া বিদ্যমান
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-semibold font-medium border border-emerald-500/20">
                                নিয়মিত
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleLoginAsAdmin(m)}
                                className="px-2.5 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium font-medium hover:opacity-90 transition flex items-center gap-1"
                              >
                                <LogIn className="w-3 h-3" /> লগইন
                              </button>
                              <button
                                onClick={() => handleToggleBlock(m.id)}
                                className="p-1 rounded border border-[var(--border)] hover:bg-[var(--background)] text-[var(--muted-foreground)]"
                                title="ব্লক / আনব্লক"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: PENDING APPROVALS                                                   */}
          {/* ========================================================================= */}
          {activeNav === 'pending' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">নতুন মাদ্রাসা অনবোর্ডিং অনুমোদন (Pending Approvals)</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">অনুমোদন দিলে স্বয়ংক্রিয়ভাবে ক্লাউড ডাটাবেস ও টেন্যান্ট স্কিমা তৈরি হবে</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/30 font-bold">
                  মোট {pendingMadrasas.length} টি আবেদন
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pendingMadrasas.map((p) => (
                  <div key={p.id} className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)]">
                        {p.date}
                      </span>
                      <span className="text-xs font-bold text-[var(--primary)]">{p.requestedPlan}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--foreground)]">{p.nameBn}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">জেলা: {p.district} | আনুমানিক ছাত্র: {p.students} জন</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                      <button
                        onClick={() => {
                          setPendingMadrasas(pendingMadrasas.filter((item) => item.id !== p.id));
                          const newId = String(madrasas.length + 1);
                          setMadrasas([
                            ...madrasas,
                            {
                              id: newId,
                              code: `MDR-00${newId}`,
                              nameBn: p.nameBn,
                              division: 'ঢাকা',
                              district: p.district,
                              thana: 'সদর',
                              type: 'QAWMI',
                              students: p.students,
                              status: 'ACTIVE',
                              plan: p.requestedPlan as any,
                              renewalDue: false,
                            },
                          ]);
                          alert(`${p.nameBn} সফলভাবে অনুমোদিত হয়েছে এবং টেন্যান্ট স্কিমা সক্রিয় করা হয়েছে!`);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold hover:opacity-90 transition"
                      >
                        অনুমোদন দিন
                      </button>
                      <button
                        onClick={() => {
                          setPendingMadrasas(pendingMadrasas.filter((item) => item.id !== p.id));
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-500 border border-red-500/20 text-xs font-medium hover:bg-red-500/25 transition"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: DEMO / TRIAL                                                        */}
          {/* ========================================================================= */}
          {activeNav === 'trial' && (
            <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center space-y-4 max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">১৪ দিনের ফ্রি ডেমো ও ট্রায়াল ম্যানেজমেন্ট</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                নতুন মাদ্রাসাগুলোর জন্য ১৪ দিনের ট্রায়াল পরিবেশ প্রস্তুত রয়েছে। ট্রায়াল শেষ হওয়ার ৩ দিন পূর্বে অটোমেটিক এসএমএস ও ইনভয়েস চলে যাবে।
              </p>
              <button
                onClick={() => alert('নতুন ট্রায়াল ইনস্ট্যান্স তৈরি হয়েছে!')}
                className="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold hover:opacity-90 shadow"
              >
                নতুন ট্রায়াল স্যান্ডবক্স তৈরি করুন
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: BILLING & PAYMENTS                                                  */}
          {/* ========================================================================= */}
          {activeNav === 'billing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">মাদ্রাসা সাবস্ক্রিপশন বিলিং ও পেমেন্টস</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">বকেয়া বিল আদায়, রিনিউয়াল ও অটোমেটেড ইনভয়েস</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[var(--muted-foreground)]">মোট মাসিক রিকারিং আয়:</span>
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-bold">৳১,৮৫,০০০/মাস</div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  বকেয়া মাদ্রাসা তালিকা (৩টি প্রতিষ্ঠান)
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-[var(--background)] border border-red-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[var(--foreground)]">দারুল উলুম মঈনুল ইসলাম হাটহাজারী</div>
                      <div className="text-xs font-medium text-[var(--muted-foreground)]">এন্টারপ্রাইজ প্ল্যান (অক্টোবর ২০২৬) — বকেয়া: ৳১৫,০০০</div>
                    </div>
                    <button
                      onClick={() => alert('পেমেন্ট রিমাইন্ডার এসএমএস পাঠানো হয়েছে!')}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition"
                    >
                      রিমাইন্ডার পাঠান
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--background)] border border-red-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[var(--foreground)]">নূরানী হাফিজিয়া মাদ্রাসা ও এতিমখানা বগুড়া</div>
                      <div className="text-xs font-medium text-[var(--muted-foreground)]">বেসিক প্ল্যান (অক্টোবর ২০২৬) — বকেয়া: ৳২,৫০০</div>
                    </div>
                    <button
                      onClick={() => alert('পেমেন্ট রিমাইন্ডার এসএমএস পাঠানো হয়েছে!')}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition"
                    >
                      রিমাইন্ডার পাঠান
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: SUBSCRIPTION PLANS                                                  */}
          {/* ========================================================================= */}
          {activeNav === 'plans' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-xl font-bold text-[var(--foreground)]">মাদ্রাসা ম্যানেজমেন্ট প্যাকেজ ও প্ল্যান</h2>
                <p className="text-xs text-[var(--muted-foreground)]">কওমি ও আলিয়া মাদ্রাসার চাহিদানুযায়ী নির্ধারিত সাবস্ক্রিপশন প্ল্যান</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                  <span className="text-xs font-bold text-[var(--muted-foreground)]">মৌলিক (Basic)</span>
                  <div className="text-2xl font-extrabold text-[var(--foreground)]">৳২,৫০০ <span className="text-xs font-normal text-[var(--muted-foreground)]">/মাস</span></div>
                  <p className="text-xs text-[var(--muted-foreground)]">অনাবাসিক ও ছোট মাদ্রাসার জন্য প্রযোজ্য (সর্বোচ্চ ৪০০ ছাত্র)</p>
                  <ul className="text-xs space-y-2 text-[var(--muted-foreground)] border-t border-[var(--border)] pt-4">
                    <li className="flex items-center gap-2">✓ ক্যাশ কাউন্টার ও ফি কালেকশন</li>
                    <li className="flex items-center gap-2">✓ মৌলিক শিক্ষার্থী প্রোফাইল</li>
                    <li className="flex items-center gap-2">✓ অফলাইন হাজিরা সিঙ্ক</li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-[var(--card)] border-2 border-[var(--primary)] shadow-md space-y-4 relative">
                  <span className="absolute -top-3 right-6 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold px-2.5 py-0.5 rounded-full font-bold">
                    জনপ্রিয় (Standard)
                  </span>
                  <span className="text-xs font-bold text-[var(--primary)]">স্ট্যান্ডার্ড (Standard)</span>
                  <div className="text-2xl font-extrabold text-[var(--foreground)]">৳৫,০০০ <span className="text-xs font-normal text-[var(--muted-foreground)]">/মাস</span></div>
                  <p className="text-xs text-[var(--muted-foreground)]">মাঝারি আবাসিক ও কওমি মাদ্রাসার জন্য প্রযোজ্য (সর্বোচ্চ ১০০০ ছাত্র)</p>
                  <ul className="text-xs space-y-2 text-[var(--muted-foreground)] border-t border-[var(--border)] pt-4">
                    <li className="flex items-center gap-2">✓ ৬০৪ পৃষ্ঠা হিফজ ট্র্যাকার</li>
                    <li className="flex items-center gap-2">✓ হোস্টেল ও খাবার হিসাব (লিল্লাহ)</li>
                    <li className="flex items-center gap-2">✓ বিটিআরসি এসএমএস ইন্টিগ্রেশন</li>
                    <li className="flex items-center gap-2">✓ অভিভাবক মোবাইল অ্যাপ</li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                  <span className="text-xs font-bold text-purple-400">এন্টারপ্রাইজ (Enterprise)</span>
                  <div className="text-2xl font-extrabold text-[var(--foreground)]">৳১৫,০০০ <span className="text-xs font-normal text-[var(--muted-foreground)]">/মাস</span></div>
                  <p className="text-xs text-[var(--muted-foreground)]">বৃহৎ জামিয়া ও বিশ্ববিদ্যালয়ের জন্য প্রযোজ্য (আনলিমিটেড ছাত্র)</p>
                  <ul className="text-xs space-y-2 text-[var(--muted-foreground)] border-t border-[var(--border)] pt-4">
                    <li className="flex items-center gap-2">✓ সম্পূর্ণ আইসোলেটেড ডাটাবেস স্কিমা</li>
                    <li className="flex items-center gap-2">✓ ডিজিটাল কিউআর গেটপাস সিস্টেম</li>
                    <li className="flex items-center gap-2">✓ মেকার-চেকার অনুমোদন সিস্টেম</li>
                    <li className="flex items-center gap-2">✓ ২৪/৭ ডেডিকেটেড সাপোর্ট</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: MADRASA ADMIN MODULAR DEPARTMENT DASHBOARD                           */}
          {/* ========================================================================= */}
          {activeNav === 'madrasa_dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Muhtamim Greeting & Institution Header Banner */}
              <div className="p-6 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1.5 z-10">
                  <div className="flex items-center gap-2">
                    <Building className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <h2 className="text-2xl font-bold tracking-tight">
                      আসসালামু আলাইকুম, মুহতামিম সাহেব
                    </h2>
                  </div>
                  <p className="text-xs opacity-90 font-medium">
                    {currentAdminMadrasa ? currentAdminMadrasa.nameBn : 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা'} • কেন্দ্রীয় বিভাগীয় নিয়ন্ত্রণ প্যানেল
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium opacity-95">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/20 font-bold">
                      শিক্ষাবর্ষ: ২০২৬-২০২৭
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/20 font-bold">
                      ১ জমাদিউল আউয়াল ১৪৪৮ হিজরি
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/20 font-bold">
                      {currentAdminMadrasa?.district || 'ঢাকা'} বিভাগ
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/20 font-bold">
                      প্যাকেজ: {currentAdminMadrasa?.plan || 'Enterprise'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <div className="p-3 rounded-xl bg-black/20 text-center min-w-[90px]">
                    <div className="text-xl font-extrabold">১,৪৫০</div>
                    <div className="text-xs font-semibold opacity-85 uppercase font-medium">মোট ছাত্র</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 text-center min-w-[90px]">
                    <div className="text-xl font-extrabold text-green-300">২৮ জন</div>
                    <div className="text-xs font-semibold opacity-85 uppercase font-medium">কর্মরত শিক্ষক</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/20 text-center min-w-[90px]">
                    <div className="text-xl font-extrabold text-amber-300">১২টি</div>
                    <div className="text-xs font-semibold opacity-85 uppercase font-medium">সক্রিয় বিভাগ</div>
                  </div>
                </div>
              </div>

              {/* Muhtamim Central Quick Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setShowNoticeComposerModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-2 active:scale-95"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span className="flex items-center gap-1.5"><Megaphone className="w-4 h-4" /> নোটিশ জারি করুন</span>
                  </button>

                  <button
                    onClick={() => setShowAddRuleModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--foreground)] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>+ নতুন রুলস যুক্ত করুন</span>
                  </button>

                  <button
                    onClick={() => setShowGrantPermissionModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--foreground)] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Key className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                    <span>+ নতুন পারমিশন দিন</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--muted-foreground)] font-medium">মুহতামিম প্রেরিত নোটিশ:</span>
                  <div className="flex items-center gap-1.5">
                    {adminNotices.slice(0, 2).map((notice) => (
                      <button
                        key={notice.id}
                        onClick={() => setActiveNoticeDetail(notice)}
                        className="px-2.5 py-1 rounded-lg bg-[var(--background)] hover:bg-[var(--primary)]/10 border border-[var(--border)] text-xs font-medium font-medium text-[var(--foreground)] flex items-center gap-1.5 transition max-w-[210px] truncate"
                        title="ক্লিক করে সম্পূর্ণ নোটিশ পড়ুন"
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${notice.priority === 'URGENT' ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`} />
                        <span className="truncate">{notice.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Department Categories Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {[
                    { id: 'ALL', label: 'সকল বিভাগ (১২)' },
                    { id: 'FINANCE', label: 'অর্থ ও অডিট (২)' },
                    { id: 'ACADEMIC', label: 'শিক্ষা ও হিফজ (৪)' },
                    { id: 'ADMIN', label: 'প্রশাসন ও যোগাযোগ (৩)' },
                    { id: 'FACILITY', label: 'হোস্টেল, স্বাস্থ্য ও নিরাপত্তা (৩)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDeptCategoryFilter(tab.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shadow-sm ${
                        deptCategoryFilter === tab.id
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>বিভাগে প্রবেশ করতে <strong>ডাবল ক্লিক (Double-Click)</strong> করুন</span>
                  </span>
                  <span className="text-[var(--border)] hidden sm:inline">|</span>
                  <span>দায়িত্ব ও পারমিশন নিয়ন্ত্রণে ৩-ডট (⋮) ব্যবহার করুন</span>
                </div>
              </div>

              {/* Modular Department Tiles Grid (4 Columns Desktop, 2 Lines Initial View) */}
              {(() => {
                const filteredDepts = departments.filter((d) => deptCategoryFilter === 'ALL' || d.category === deptCategoryFilter);
                const visibleDepts = isDeptGridExpanded ? filteredDepts : filteredDepts.slice(0, 8);
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                      {visibleDepts.map((d) => (
                        <div
                          key={d.id}
                          onDoubleClick={() => setActiveNav(d.routeKey)}
                          title={`${d.nameBn} - ডাবল ক্লিক করে প্রবেশ করুন`}
                          className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs hover:shadow-lg hover:border-[var(--primary)] transition-all flex flex-col justify-between group relative cursor-pointer active:scale-[0.98] select-none min-h-[96px]"
                        >
                          {/* Top Row: Icon, Department Title, Code & 3-Dot RBAC */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-xs ${d.iconBgColor}`}
                              >
                                {renderDeptIcon(d.iconType, 'w-4 h-4')}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs sm:text-[13px] text-[var(--foreground)] truncate leading-tight group-hover:text-[var(--primary)] transition-colors">
                                  {d.nameBn}
                                </h4>
                                <p className="text-xs font-semibold font-mono text-[var(--muted-foreground)] truncate">
                                  {d.code} • {d.nameEn}
                                </p>
                              </div>
                            </div>

                            {/* 3-Dot RBAC Popover Trigger */}
                            <div className="relative shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeptDropdownId(deptDropdownId === d.id ? null : d.id);
                                }}
                                className="p-1 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition shadow-xs"
                                title="অ্যাক্সেস কন্ট্রোল ও দায়িত্ব নির্ধারণ"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>

                              {/* 3-Dot Card Dropdown Popover */}
                              {deptDropdownId === d.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-7 w-56 p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 text-left"
                                >
                                  <div className="px-2.5 py-1 text-xs font-semibold font-bold text-[var(--muted-foreground)] border-b border-[var(--border)] uppercase">
                                    {d.nameBn} • অ্যাক্সেস কন্ট্রোল
                                  </div>
                                  <div className="px-2.5 py-1 text-xs font-medium text-[var(--foreground)]">
                                    <span className="text-[var(--muted-foreground)]">দায়িত্বপ্রাপ্ত: </span>
                                    <strong>{d.assignedStaff[0]?.name || 'কেউ নিযুক্ত নেই'}</strong>
                                  </div>
                                  <button
                                    onClick={() => handleOpenAssignModal(d)}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                                  >
                                    <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                                    <span>দায়িত্বপ্রাপ্ত উস্তাদ পরিবর্তন</span>
                                  </button>
                                  <button
                                    onClick={() => handleToggleDeptHold(d.id)}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-[var(--background)] text-amber-800 dark:text-amber-400 font-bold transition font-medium"
                                  >
                                    <Ban className="w-3.5 h-3.5" />
                                    <span>
                                      {d.status === 'HOLD'
                                        ? 'অ্যাক্সেস সক্রিয় করুন'
                                        : 'অ্যাক্সেস স্থগিত (HOLD)'}
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleRevokeDeptAccess(d.id)}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold transition font-medium"
                                  >
                                    <UserX className="w-3.5 h-3.5" />
                                    <span>স্টাফ অ্যাক্সেস বাতিল</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Row: Staff info + Double-Click / Enter Affordance */}
                          <div className="mt-2.5 pt-2 border-t border-[var(--border)]/70 flex items-center justify-between text-xs font-medium gap-1">
                            <div className="truncate flex items-center gap-1.5 text-[var(--muted-foreground)] min-w-0">
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  d.status === 'ACTIVE'
                                    ? 'bg-emerald-500'
                                    : d.status === 'HOLD'
                                    ? 'bg-amber-500'
                                    : 'bg-zinc-400'
                                }`}
                              />
                              <span className="truncate text-xs font-semibold text-[var(--foreground)]">
                                {d.assignedStaff[0]?.name || 'স্টাফ নিযুক্ত নেই'}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveNav(d.routeKey);
                              }}
                              className="text-xs font-semibold font-semibold text-[var(--primary)] group-hover:underline flex items-center gap-0.5 shrink-0 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 px-2 py-0.5 rounded-md transition"
                              title="ক্লিক বা ডাবল ক্লিক করে প্রবেশ করুন"
                            >
                              <span>এন্টার ↵</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* More Options Expand / Collapse Bar */}
                    {filteredDepts.length > 8 && (
                      <div className="flex items-center justify-center pt-1">
                        <button
                          onClick={() => setIsDeptGridExpanded(!isDeptGridExpanded)}
                          className="px-5 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/40 border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-2 shadow-xs transition hover:border-[var(--primary)] active:scale-95"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5 text-[var(--primary)]" />
                          <span>
                            {isDeptGridExpanded
                              ? 'বিভাগসমূহ সংক্ষেপ করুন (প্রথম ২ লাইন) ▴'
                              : `আরও বিভাগ দেখুন (+${filteredDepts.length - 8}টি বিভাগ) ▾`}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Muhtamim Central Approvals & Pending Permissions Board (Replaces static responsibility table) */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                  <div>
                    <h3 className="font-bold text-base text-[var(--foreground)] flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      মাদ্রাসার চলতি কার্যক্রমের অনুমোদন ও পারমিশন বোর্ড (Pending Approvals Center)
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      মুহতামিম/প্রধান শিক্ষকের চূড়ান্ত স্বাক্ষরের জন্য অপেক্ষমাণ বিষয়সমূহ — এক নজরে যাচাই করে অনুমোদন বা বাতিল করুন।
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20 font-bold">
                      অপেক্ষমাণ: {pendingApprovals.filter((a) => a.status === 'PENDING').length}টি
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20 font-bold">
                      অনুমোদিত: {pendingApprovals.filter((a) => a.status === 'APPROVED').length}টি
                    </span>
                  </div>
                </div>

                {/* Live Feedback Toast Banner */}
                {approvalFeedbackMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 flex items-center justify-between animate-in fade-in">
                    <span className="font-medium">{approvalFeedbackMsg}</span>
                    <button onClick={() => setApprovalFeedbackMsg(null)} className="text-emerald-700 dark:text-emerald-400 font-bold hover:text-emerald-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Approvals List: Initial 3 Items / Expandable Scrollable List */}
                <div className={`space-y-3 ${isApprovalsExpanded ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
                  {(isApprovalsExpanded ? pendingApprovals : pendingApprovals.slice(0, 3)).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)]">
                            {item.deptCode} • {item.departmentName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold ${
                              item.urgency === 'HIGH'
                                ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold border border-rose-500/20'
                                : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                            }`}
                          >
                            {item.urgency === 'HIGH' ? 'অতি জরুরি' : 'সাধারণ অনুমোদন'}
                          </span>
                          <span className="text-[var(--muted-foreground)] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.date}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-[var(--foreground)] leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {item.description}
                        </p>
                        <div className="text-xs font-medium text-[var(--foreground)] opacity-90">
                          <span className="text-[var(--muted-foreground)]">উত্থাপক: </span>
                          <strong>{item.requesterName}</strong>
                        </div>
                      </div>

                      {/* Right Amount & Decision Buttons */}
                      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        {item.amount && item.amount !== '—' && (
                          <div className="text-right">
                            <div className="text-xs font-semibold text-[var(--muted-foreground)]">বরাদ্দ / ব্যয়</div>
                            <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
                              {item.amount}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          {item.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApproveRequest(item.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>অনুমোদন দিন</span>
                              </button>
                              <button
                                onClick={() => handleRejectRequest(item.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-bold border border-rose-500/20 text-xs font-medium transition flex items-center gap-1.5 active:scale-95"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>বাতিল</span>
                              </button>
                            </>
                          )}

                          {item.status === 'APPROVED' && (
                            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-bold flex items-center gap-1">
                              <CheckCheck className="w-3.5 h-3.5" />
                              অনুমোদিত
                            </span>
                          )}

                          {item.status === 'REJECTED' && (
                            <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 font-bold text-xs font-bold flex items-center gap-1">
                              <Ban className="w-3.5 h-3.5" />
                              বাতিলকৃত
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More / See More Toggle Button */}
                {pendingApprovals.length > 3 && (
                  <div className="flex items-center justify-center pt-2 border-t border-[var(--border)]">
                    <button
                      onClick={() => setIsApprovalsExpanded(!isApprovalsExpanded)}
                      className="px-5 py-2.5 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/40 border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-2 shadow-xs transition hover:border-[var(--primary)] active:scale-95"
                    >
                      <MoreHorizontal className="w-4 h-4 text-[var(--primary)]" />
                      <span>
                        {isApprovalsExpanded
                          ? 'অনুমোদন তালিকা সংক্ষেপ করুন (প্রথম ৩টি) ▴'
                          : `পরবর্তী অনুমোদনসমূহ দেখুন (+${pendingApprovals.length - 3}টি রিকোয়েস্ট স্ক্রোল করুন) ▾`}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: SHARIAH AUDIT & COMPLIANCE DEPARTMENT                                */}
          {/* ========================================================================= */}
          {activeNav === 'audit' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Scale className="w-5 h-5 text-teal-400" />
                      শরীয়াহ অডিট ও নিরীক্ষা বিভাগ (Shariah Audit & Compliance)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      কওমি মাদ্রাসার শরীয়াহ মানদণ্ড অনুযায়ী যাকাত, ফিতরা, লিল্লাহ ও সাধারণ তহবিলের পূর্ণ পৃথকীকরণ
                    </p>
                  </div>
                </div>

                <div className="text-xs bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1.5 rounded-full font-bold">
                  ✓ শরীয়াহ বোর্ড অনুমোদিত
                </div>
              </div>

              {/* 3 Segregated Shariah Funds Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-2">
                  <span className="text-xs font-medium font-bold text-blue-400 uppercase tracking-wider">
                    ১. সাধারণ ফান্ড (General Fund)
                  </span>
                  <div className="text-2xl font-extrabold text-[var(--foreground)]">৳৪,৫০,০০০</div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    টিউশন ফি, কিতাব বিক্রয় ও উন্মুক্ত অনুদান থেকে সংগৃহীত।
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-2">
                  <span className="text-xs font-medium font-bold text-emerald-400 uppercase tracking-wider">
                    ২. লিল্লাহ ও যাকাত ফান্ড (Zakat/Lillah)
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-bold">৳২,৮০,০০০</div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    শুধুমাত্র এতিম, অসহায় ও দরিদ্র ছাত্রদের খাবার ও কাপড়ে ব্যয়যোগ্য।
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-2">
                  <span className="text-xs font-medium font-bold text-purple-400 uppercase tracking-wider">
                    ৩. শিক্ষক বেতন ফান্ড (Salary Reserve)
                  </span>
                  <div className="text-2xl font-extrabold text-purple-400">৳৩,৪৫,০০০</div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    আসাতায়ে কেরাম ও কর্মকর্তা-কর্মচারীদের মাসিক বেতন রিজার্ভ।
                  </p>
                </div>
              </div>

              {/* Shariah Policy & Audit Trail Statement */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-teal-400" />
                  শরীয়াহ নীতিমালা ও অপরিবর্তনীয় অডিট লগ
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  মাদ্রাসার প্রতিটি আর্থিক ট্রানজেকশনে কোনো ডিলিট বা মুছে ফেলার সুযোগ রাখা হয়নি। ভুল এন্ট্রির ক্ষেত্রে শুধুমাত্র শরীয়াহ সম্মত রিভার্সাল এন্ট্রি করা যায়। যাকাত ও লিল্লাহ তহবিলের টাকা কখনোই মাদ্রাসার সাধারণ উন্নয়ন বা নির্মাণকাজে ব্যয় করা হয় না।
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-medium text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>✓ দ্বিমুখী ডাবল-এন্ট্রি বুককিপিং</span>
                  <span>✓ রসিদ সিকোয়েন্স নম্বর অটোমেটেড</span>
                  <span>✓ মেকার-চেকার অনুমোদন কার্যকর</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: TEACHERS & FACULTY PANEL                                            */}
          {/* ========================================================================= */}
          {activeNav === 'teachers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-400" />
                      আসাতায়ে কেরাম ও শিক্ষক প্যানেল (Teachers & Faculty)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      শিক্ষক প্রোফাইল, ক্লাস দায়িত্ব, দরসি রুটিন শিডিউল ও শিক্ষক পোর্টাল
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowAddTeacherModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    নতুন শিক্ষক যুক্ত করুন
                  </button>
                  <button
                    onClick={() => setShowAddRoutineModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-[var(--card)] border border-indigo-500/40 hover:bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Clock className="w-4 h-4" />
                    নতুন ক্লাস রুটিন যোগ করুন
                  </button>
                </div>
              </div>

              {/* Dynamic Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">মোট আসাতায়ে কেরাম ও শিক্ষক</div>
                  <div className="text-2xl font-bold text-indigo-400 font-bold mt-1">{teachers.length} জন</div>
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1">সবাই সক্রিয় ও ক্লাস দায়িত্বে নিয়োজিত</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">নির্ধারিত দৈনিক ক্লাস ও দরস পিরিয়ড</div>
                  <div className="text-2xl font-bold text-[var(--foreground)] mt-1">{classRoutines.length} টি ক্লাস</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">হিফজ ও কিতাব বিভাগ সমন্বিত</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">চলতি মাসের শিক্ষক বেতন বিল</div>
                  <div className="text-2xl font-bold text-purple-400 mt-1 font-mono">
                    ৳{teachers.reduce((sum, t) => sum + t.monthlySalary, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1">নিয়মিত বাজেট অনুমোদিত</div>
                </div>
              </div>

              {/* Teacher Portal Filter & Quick Switch */}
              <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-[var(--foreground)]">শিক্ষক পোর্টাল ভিউ (ব্যক্তিগত ক্লাস রুটিন ফিল্টার):</span>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <select
                    value={teacherPortalFilter}
                    onChange={(e) => setTeacherPortalFilter(e.target.value)}
                    className="w-full sm:w-64 px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)] focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ALL">সকল শিক্ষক ও সার্বিক রুটিন ({classRoutines.length} টি)</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nameBn} ({t.designationBn})
                      </option>
                    ))}
                  </select>
                  {teacherPortalFilter !== 'ALL' && (
                    <button
                      onClick={() => setTeacherPortalFilter('ALL')}
                      className="px-2.5 py-1.5 rounded-xl border border-[var(--border)] text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      রিসেট
                    </button>
                  )}
                </div>
              </div>

              {/* Section 1: Teachers List Table */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    আসাতায়ে কেরাম ও শিক্ষক তালিকা ({teachers.length} জন)
                  </h3>
                  <span className="text-xs text-[var(--muted-foreground)]">পদবী, বিভাগ ও মোবাইল রেজিস্ট্রি</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                      <tr>
                        <th className="p-3">শিক্ষকের নাম</th>
                        <th className="p-3">পদবী / দায়িত্ব</th>
                        <th className="p-3">বিভাগ</th>
                        <th className="p-3">মোবাইল নম্বর</th>
                        <th className="p-3 text-right">মাসিক বেতন</th>
                        <th className="p-3 text-center">স্ট্যাটাস</th>
                        <th className="p-3 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {teachers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-[var(--muted-foreground)]">
                            কোনো শিক্ষক ডাটা পাওয়া যায়নি। "নতুন শিক্ষক যুক্ত করুন" বাটনে ক্লিক করে শিক্ষক যোগ করুন।
                          </td>
                        </tr>
                      ) : (
                        teachers.map((t) => (
                          <tr key={t.id} className="hover:bg-[var(--background)]/40 transition">
                            <td className="p-3 font-bold text-[var(--foreground)]">{t.nameBn}</td>
                            <td className="p-3 font-semibold text-indigo-400">{t.designationBn}</td>
                            <td className="p-3 text-[var(--muted-foreground)]">{t.departmentBn}</td>
                            <td className="p-3 font-mono text-[var(--foreground)]">{t.phone}</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                              ৳{t.monthlySalary.toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                                {t.status === 'ACTIVE' ? 'সক্রিয়' : 'ছুটিতে'}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setTeacherPortalFilter(t.id)}
                                  className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold text-xs transition"
                                  title="এই শিক্ষকের রুটিন দেখুন"
                                >
                                  রুটিন দেখুন
                                </button>
                                <button
                                  onClick={() => handleDeleteTeacher(t.id)}
                                  className="p-1 rounded-lg hover:bg-red-500/10 text-red-500 transition"
                                  title="শিক্ষক মুছে ফেলুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Class & Dars Routine Table */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      দৈনিক ক্লাস ও দরসি রুটিন শিডিউল
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {teacherPortalFilter === 'ALL'
                        ? 'সকল জামাতের কেন্দ্রীয় সময়সূচী'
                        : `নির্বাচিত শিক্ষকের নিজস্ব পিরিয়ড শিডিউল`}
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
                    {teacherPortalFilter === 'ALL'
                      ? `${classRoutines.length} টি ক্লাস`
                      : `${classRoutines.filter((r) => r.teacherId === teacherPortalFilter).length} টি পিরিয়ড`}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                      <tr>
                        <th className="p-3">পিরিয়ড ও সময়সূচী</th>
                        <th className="p-3">জামাত / শ্রেণী</th>
                        <th className="p-3">কিতাব / বিষয়</th>
                        <th className="p-3">দায়িত্বপ্রাপ্ত শিক্ষক</th>
                        <th className="p-3">কক্ষ / হল</th>
                        <th className="p-3">বার / দিন</th>
                        <th className="p-3 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {(() => {
                        const filtered =
                          teacherPortalFilter === 'ALL'
                            ? classRoutines
                            : classRoutines.filter((r) => r.teacherId === teacherPortalFilter);

                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={7} className="p-6 text-center text-[var(--muted-foreground)]">
                                কোনো রুটিন পাওয়া যায়নি। "নতুন ক্লাস রুটিন যোগ করুন" বাটনে ক্লিক করে রুটিন তৈরি করুন।
                              </td>
                            </tr>
                          );
                        }

                        return filtered.map((r) => (
                          <tr key={r.id} className="hover:bg-[var(--background)]/40 transition">
                            <td className="p-3 font-bold text-indigo-400">{r.periodTimeBn}</td>
                            <td className="p-3 font-semibold text-[var(--foreground)]">{r.classNameBn}</td>
                            <td className="p-3 font-bold text-[var(--foreground)]">{r.subjectBookBn}</td>
                            <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold font-medium">{r.teacherNameBn}</td>
                            <td className="p-3 font-mono text-[var(--muted-foreground)]">{r.roomNoBn}</td>
                            <td className="p-3 text-[var(--muted-foreground)]">{r.dayBn}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeleteRoutine(r.id)}
                                className="p-1 rounded-lg hover:bg-red-500/10 text-red-500 transition"
                                title="রুটিন মুছে ফেলুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: STUDENT AFFAIRS & ADMISSION                                          */}
          {/* ========================================================================= */}
          {activeNav === 'students' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-cyan-400" />
                      ছাত্রকল্যাণ ও ভর্তি বিভাগ (Student Affairs & Admission)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      শিক্ষার্থীদের সম্পূর্ণ ডাটাবেস, নতুন ভর্তি, আবাসিক/অনাবাসিক রেজিস্ট্রি ও ফি সংযোগ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    নতুন ছাত্র ভর্তি করুন
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('আপনি কি সকল ছাত্র ডাটা মুছে ফেলতে চান?')) {
                        setRegisteredStudents([]);
                        alert('সকল ছাত্র ডাটা মুছে ফেলা হয়েছে।');
                      }
                    }}
                    className="px-3 py-2 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-500 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    সব ছাত্র মুছুন
                  </button>
                </div>
              </div>

              {/* Dynamic Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">মোট নিবন্ধিত ছাত্র</div>
                  <div className="text-2xl font-bold text-cyan-400 font-bold mt-1">{registeredStudents.length} জন</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">সর্বমোট সক্রিয় শিক্ষার্থী ডাটাবেস</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">আবাসিক ছাত্র</div>
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                    {registeredStudents.filter((s) => s.residentialStatus === 'RESIDENTIAL').length} জন
                  </div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">হোস্টেল ও মেস সুবিধাপ্রাপ্ত</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <div className="text-xs text-[var(--muted-foreground)]">অনাবাসিক ছাত্র</div>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {registeredStudents.filter((s) => s.residentialStatus === 'NON_RESIDENTIAL').length} জন
                  </div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">দৈনিক যাতায়াতকারী শিক্ষার্থী</div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    placeholder="নাম, রোল বা রেজিস্ট্রেশন নং..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                  <select
                    value={studentClassFilter}
                    onChange={(e) => setStudentClassFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none"
                  >
                    <option value="ALL">সকল বিভাগ ও জামাত</option>
                    <option value="হিফজুল কুরআন বিভাগ">হিফজুল কুরআন বিভাগ</option>
                    <option value="মিজান জামাত">মিজান জামাত</option>
                    <option value="কাফিয়া জামাত">কাফিয়া জামাত</option>
                    <option value="নাহবেমীর জামাত">নাহবেমীর জামাত</option>
                    <option value="দাওরায়ে হাদিস">দাওরায়ে হাদিস</option>
                  </select>

                  <select
                    value={studentResFilter}
                    onChange={(e) => setStudentResFilter(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none"
                  >
                    <option value="ALL">সকল আবাসন ধরন</option>
                    <option value="RESIDENTIAL">আবাসিক</option>
                    <option value="NON_RESIDENTIAL">অনাবাসিক</option>
                  </select>
                </div>
              </div>

              {/* Student Directory Table */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    শিক্ষার্থী তালিকা ও ভর্তি রেজিস্ট্রি ({registeredStudents.length} জন)
                  </h3>
                  <span className="text-xs text-[var(--muted-foreground)]">ফি জমা, মেস ও সবক সংযোগ</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                      <tr>
                        <th className="p-3">রেজিস্ট্রেশন নং</th>
                        <th className="p-3">রোল</th>
                        <th className="p-3">ছাত্রের নাম ও পিতার নাম</th>
                        <th className="p-3">বিভাগ / জামাত</th>
                        <th className="p-3">ধরন</th>
                        <th className="p-3">রুম নং</th>
                        <th className="p-3">অভিভাবকের ফোন</th>
                        <th className="p-3 text-right">মাসিক ফি</th>
                        <th className="p-3 text-right">বকেয়া</th>
                        <th className="p-3 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {(() => {
                        const filtered = registeredStudents.filter((st) => {
                          const query = studentSearchQuery.trim().toLowerCase();
                          const matchesQuery =
                            !query ||
                            st.nameBn.toLowerCase().includes(query) ||
                            st.roll.toLowerCase().includes(query) ||
                            st.registrationNo.toLowerCase().includes(query) ||
                            st.guardianPhone.includes(query);

                          const matchesClass =
                            studentClassFilter === 'ALL' || st.classGradeBn.includes(studentClassFilter);

                          const matchesRes =
                            studentResFilter === 'ALL' || st.residentialStatus === studentResFilter;

                          return matchesQuery && matchesClass && matchesRes;
                        });

                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={10} className="p-6 text-center text-[var(--muted-foreground)]">
                                কোনো ছাত্র ডাটা পাওয়া যায়নি। "নতুন ছাত্র ভর্তি করুন" বাটনে ক্লিক করে ছাত্র ভর্তি করুন।
                              </td>
                            </tr>
                          );
                        }

                        return filtered.map((st) => (
                          <tr key={st.registrationNo} className="hover:bg-[var(--background)]/40 transition">
                            <td className="p-3 font-mono font-bold text-cyan-400">{st.registrationNo}</td>
                            <td className="p-3 font-bold text-[var(--foreground)]">{st.roll}</td>
                            <td className="p-3">
                              <div className="font-bold text-[var(--foreground)]">{st.nameBn}</div>
                              <div className="text-xs text-[var(--muted-foreground)]">{st.fatherNameBn}</div>
                            </td>
                            <td className="p-3 font-semibold text-[var(--foreground)]">{st.classGradeBn}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                                  st.residentialStatus === 'RESIDENTIAL'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                    : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                                }`}
                              >
                                {st.residentialStatus === 'RESIDENTIAL' ? 'আবাসিক' : 'অনাবাসিক'}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[var(--muted-foreground)]">{st.roomNo || 'অনাবাসিক'}</td>
                            <td className="p-3 font-mono text-[var(--foreground)]">{st.guardianPhone}</td>
                            <td className="p-3 text-right font-mono font-bold text-[var(--foreground)]">
                              ৳{st.monthlyFee.toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-amber-800 dark:text-amber-400">
                              ৳{st.dueAmount.toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setStudentRegSearch(st.registrationNo);
                                    handleLookupStudent(st.registrationNo);
                                    setActiveNav('finance');
                                    setFinanceOpMode('RECEIVE');
                                    setReceivePortal('STUDENT_FEES');
                                  }}
                                  className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
                                  title="এই ছাত্রের ফি গ্রহণ করুন"
                                >
                                  ফি জমা
                                </button>
                                <button
                                  onClick={() => {
                                    setGatepassStudent(`${st.nameBn} (${st.roll})`);
                                    setActiveNav('hostel');
                                  }}
                                  className="px-2 py-1 rounded border border-amber-500/40 hover:bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold text-xs transition"
                                  title="এই ছাত্রের গেটপাস ইস্যু করুন"
                                >
                                  গেটপাস
                                </button>
                                <button
                                  onClick={() => {
                                    setAcademicSabaqStudentReg(st.registrationNo);
                                    setActiveNav('academic');
                                  }}
                                  className="px-2 py-1 rounded border border-blue-500/40 hover:bg-blue-500/10 text-blue-500 font-bold text-xs transition"
                                  title="সবক এন্ট্রি করুন"
                                >
                                  সবক
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(st.registrationNo)}
                                  className="p-1 rounded hover:bg-red-500/10 text-red-500 transition"
                                  title="ছাত্র মুছে ফেলুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: EXAMINATIONS & RESULTS CONTROLLER                                    */}
          {/* ========================================================================= */}
          {activeNav === 'exam' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <CheckCheck className="w-5 h-5 text-rose-400" />
                      ইমতেহান ও পরীক্ষা নিয়ন্ত্রণ বিভাগ (Examinations & Results)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      বেফাকুল মাদারিসিল আরাবিয়া ও অভ্যন্তরীণ ষান্মাসিক/বার্ষিক পরীক্ষার ফলাফল ও মেধা তালিকা
                    </p>
                  </div>
                </div>

                <span className="text-xs px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold">
                  বেফাক প্রস্তুতি সম্পন্ন
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">মুমতাজ (স্টার মার্ক)</div>
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-bold mt-1">১৮২ জন</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">সর্বোচ্চ গ্রেড প্রাপ্ত</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">জায়্যিদ জিদ্দান (১ম বিভাগ)</div>
                  <div className="text-2xl font-bold text-blue-500 mt-1">৩৪০ জন</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">প্রথম বিভাগে উত্তীর্ণ</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">জায়্যিদ (২য় বিভাগ)</div>
                  <div className="text-2xl font-bold text-amber-800 dark:text-amber-400 font-bold mt-1">১২০ জন</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">দ্বিতীয় বিভাগে উত্তীর্ণ</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: HEALTH & SICK BAY UNIT                                               */}
          {/* ========================================================================= */}
          {activeNav === 'health' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-pink-400" />
                      চিকিৎসা ও প্রাথমিক স্বাস্থ্যসেবা (Health & Sick Bay)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      আবাসিক শিক্ষার্থীদের জরুরি প্রাথমিক চিকিৎসা, ওষুধ ও ডাক্তার কনসালটেশন লগ
                    </p>
                  </div>
                </div>

                <span className="text-xs px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold">
                  ৩ জন পর্যবেক্ষণে
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">অন-কল ডাক্তার</div>
                  <div className="text-base font-bold text-[var(--foreground)] mt-1">ডা. হাবিবুর রহমান (এমবিবিএস)</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">মোবাইল: 01712-334411</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">জরুরি প্রাথমিক কিট</div>
                  <div className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-bold mt-1">১০০% স্টক প্রস্তুত</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">ফার্স্ট এইড বক্স হালনাগাদ</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">জরুরি অভিভাবক যোগাযোগ</div>
                  <div className="text-base font-bold text-blue-500 mt-1">অটোমেটেড এসএমএস</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">অসুস্থতায় তাৎক্ষণিক অবহিতকরণ</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: SECURITY & GATE CONTROL                                              */}
          {/* ========================================================================= */}
          {activeNav === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-orange-400" />
                      নিরাপত্তা ও প্রধান ফটক নিয়ন্ত্রণ (Security & Gate Control)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      প্রধান ফটক মনিটরিং, বহিরাগত ভিজিটর পাস ও ছাত্রদের ক্যাম্পাসে প্রবেশ/প্রস্থান ট্র্যাকিং
                    </p>
                  </div>
                </div>

                <span className="text-xs px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold">
                  সার্বক্ষণিক সচল
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">প্রধান নিরাপত্তা কর্মকর্তা</div>
                  <div className="text-base font-bold text-[var(--foreground)] mt-1">সুবেদার (অব.) মোতালেব মিয়া</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">মোবাইল: 01888-223311</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">ক্যাম্পাসের বাইরে অবস্থানরত</div>
                  <div className="text-2xl font-bold text-amber-800 dark:text-amber-400 font-bold mt-1">৫ জন ছাত্র</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">গেটপাস অনুমোদন প্রাপ্ত</div>
                </div>
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="text-xs text-[var(--muted-foreground)]">রাত্রিকালীন লকডাউন সময়</div>
                  <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 font-bold mt-1">রাত ৯:৩০ মিনিট</div>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">পরবর্তী সকাল ৬টা পর্যন্ত বন্ধ</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: CENTRAL RBAC & ROLES SETTINGS                                        */}
          {/* ========================================================================= */}
          {activeNav === 'settings_rbac' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Settings className="w-5 h-5 text-violet-400" />
                      মুহতামিম সেন্ট্রাল রোলস ও এক্সেস কন্ট্রোল (Central RBAC Matrix)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      মাদ্রাসার সকল বিভাগের স্টাফদের প্রবেশাধিকার, পাসওয়ার্ড ও দায়িত্ব বণ্টন ব্যবস্থাপনা
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddRuleModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ নতুন রুলস যুক্ত করুন</span>
                  </button>
                  <button
                    onClick={() => setShowGrantPermissionModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <Key className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                    <span>+ নতুন পারমিশন দিন</span>
                  </button>
                </div>
              </div>

              {/* Policy Rules Register Section */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      মাদ্রাসার সক্রিয় পলিসি ও কমপ্লায়েন্স রুলস (Policy Rules Register)
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      শরীয়াহ কমপ্লায়েন্স, আর্থিক মেকার-চেকার বাধ্যবাধকতা ও একাডেমিক নীতিমালা
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-bold">
                    {policyRules.length}টি নীতিমালা কার্যকর
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {policyRules.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">
                          {r.code} • {r.module}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">
                          {r.status === 'ACTIVE' ? 'সক্রিয় নীতি' : 'নিষ্ক্রিয়'}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[var(--foreground)]">{r.title}</h4>
                      <p className="text-xs font-medium text-[var(--muted-foreground)] leading-relaxed">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Staff Permission Matrix Section */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                    বিভাগভিত্তিক স্টাফ পারমিশন ও এক্সেস কন্ট্রোল ম্যাট্রিক্স
                  </h3>
                  <button
                    onClick={() => setShowGrantPermissionModal(true)}
                    className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
                  >
                    <span>+ কাউকে নতুন পারমিশন দিন</span>
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase font-semibold border-b border-[var(--border)]">
                      <tr>
                        <th className="p-3">বিভাগ</th>
                        <th className="p-3">দায়িত্বপ্রাপ্ত উস্তাদ</th>
                        <th className="p-3">পদবি</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {departments.map((d) => (
                        <tr key={d.id} className="hover:bg-[var(--background)]/60 transition">
                          <td className="p-3 font-bold text-[var(--foreground)]">
                            {d.nameBn}
                          </td>
                          <td className="p-3 font-medium text-[var(--foreground)]">
                            {d.assignedStaff[0]?.name || 'নিযুক্ত নেই'}
                          </td>
                          <td className="p-3 text-[var(--muted-foreground)]">
                            {d.assignedStaff[0]?.role || '—'}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                d.status === 'ACTIVE'
                                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold'
                              }`}
                            >
                              {d.status === 'ACTIVE' ? 'সক্রিয়' : 'স্থগিত'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleToggleDeptHold(d.id)}
                              className="px-2.5 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-xs font-medium font-medium"
                            >
                              {d.status === 'HOLD' ? 'সক্রিয় করুন' : 'স্থগিত (Hold)'}
                            </button>
                            <button
                              onClick={() => handleOpenAssignModal(d)}
                              className="px-2.5 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium font-semibold"
                            >
                              পরিবর্তন
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: FINANCE & ACCOUNTS CORE (6 Sub-Tabs & Shariah Engine)               */}
          {/* ========================================================================= */}
          {activeNav === 'finance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header with Navigation and Overall Summary */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[var(--border)] gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2.5 px-3.5 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-2 text-[var(--foreground)] shadow-xs shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                    <span>সকল বিভাগে ফিরুন</span>
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-700 dark:text-emerald-400 font-bold" />
                      হিসাব ও অর্থ বিভাগ (Central Accounts & Shariah Finance)
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      দ্বৈত-স্তম্ভ ব্যবস্থাপনা: টাকা গ্রহণ (রিসিভ মানি) ও টাকা ব্যয় (পে মানি), ৫টি ডেডিকেটেড ১-ক্লিক পোর্টাল ও শরীয়াহ তহবিল
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setTempThresholdInput(String(approvalThresholdLimit));
                      setShowThresholdConfigModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition flex items-center gap-2 cursor-pointer"
                    title="মুহতামিমের ব্যয়ের অনুমোদন সীমা পরিবর্তন করুন"
                  >
                    <Settings className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400 font-bold" />
                    <div>
                      <span className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase block">অনুমোদন লিমিট</span>
                      <span className="text-xs font-extrabold text-amber-800 dark:text-amber-400 font-bold font-mono">
                        ৳{approvalThresholdLimit.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </button>

                  <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                    <span className="text-xs font-semibold font-bold text-[var(--muted-foreground)] uppercase block">মোট সংরক্ষিত তহবিল</span>
                    <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                      ৳{shariahFunds.reduce((sum, f) => sum + f.balance, 0).toLocaleString('bn-BD')}
                    </span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-right">
                    <span className="text-xs font-semibold font-bold text-[var(--muted-foreground)] uppercase block">অনলাইন কিউ পেন্ডিং</span>
                    <span className="text-base font-extrabold text-blue-500 font-mono">
                      {onlinePaymentQueue.length} টি আবেদন
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary 3 Operations Cards: টাকা গ্রহণ, টাকা ব্যয় বা খরচ, ক্যাশ ক্লোজিং ও রিপোর্ট */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* 1. টাকা গ্রহণ / রিসিভ মানি */}
                <button
                  type="button"
                  onClick={() => setFinanceOpMode('RECEIVE')}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    financeOpMode === 'RECEIVE'
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-[var(--card)] border-[var(--border)] hover:border-emerald-500/40 hover:bg-emerald-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${financeOpMode === 'RECEIVE' ? 'bg-emerald-600 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'}`}>
                        <ArrowDownLeft className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--foreground)]">
                          টাকা গ্রহণ (রিসিভ মানি)
                        </h3>
                        <span className="text-xs font-semibold text-[var(--muted-foreground)]">ছাত্র ফি, অনুদান, যাকাত, লিল্লাহ ও দান বক্স</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600">
                      ৬টি পোর্টাল
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">আজকের মোট আদায়:</span>
                      <span className="text-lg font-black text-emerald-600 font-mono">
                        ৳{todayReceivedTotal.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className={`text-xs font-bold ${financeOpMode === 'RECEIVE' ? 'text-emerald-600' : 'text-[var(--muted-foreground)]'}`}>
                      {financeOpMode === 'RECEIVE' ? '● সক্রিয় মোড' : 'প্রবেশ করুন ➔'}
                    </span>
                  </div>
                </button>

                {/* 2. টাকা ব্যয় বা খরচ */}
                <button
                  type="button"
                  onClick={() => setFinanceOpMode('EXPENSE')}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    financeOpMode === 'EXPENSE'
                      ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/30'
                      : 'bg-[var(--card)] border-[var(--border)] hover:border-rose-500/40 hover:bg-rose-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${financeOpMode === 'EXPENSE' ? 'bg-rose-600 text-white' : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold'}`}>
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--foreground)]">
                          টাকা ব্যয় বা খরচ
                        </h3>
                        <span className="text-xs font-semibold text-[var(--muted-foreground)]">মেস বাজার, মেরামত, বেতন, ইউটিলিটি ও ইভেন্ট</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-600">
                      ৭টি পোর্টাল
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">আজকের মোট ব্যয়:</span>
                      <span className="text-lg font-black text-rose-600 font-mono">
                        ৳{todayExpenseTotal.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className={`text-xs font-bold ${financeOpMode === 'EXPENSE' ? 'text-rose-600' : 'text-[var(--muted-foreground)]'}`}>
                      {financeOpMode === 'EXPENSE' ? '● সক্রিয় মোড' : 'প্রবেশ করুন ➔'}
                    </span>
                  </div>
                </button>

                {/* 3. ক্যাশ ক্লোজিং ও রিপোর্ট */}
                <button
                  type="button"
                  onClick={() => {
                    setFinanceOpMode('REPORTS');
                    setShowDailyClosingDetails(true);
                    setShowReportDetails(true);
                  }}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    financeOpMode === 'REPORTS'
                      ? 'bg-blue-500/10 border-blue-500 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-[var(--card)] border-[var(--border)] hover:border-blue-500/40 hover:bg-blue-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${financeOpMode === 'REPORTS' ? 'bg-blue-600 text-white' : 'bg-blue-500/10 text-blue-500'}`}>
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--foreground)]">
                          ক্যাশ ক্লোজিং ও রিপোর্ট
                        </h3>
                        <span className="text-xs font-semibold text-[var(--muted-foreground)]">দৈনিক ক্লোজিং ও বহুমুখী অডিট বিশ্লেষণ</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600">
                      মুহতামিম অডিট
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">আজকের নিট স্থিতি:</span>
                      <span className="text-lg font-black text-blue-600 font-mono">
                        ৳{todayNetSurplus.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className={`text-xs font-bold ${financeOpMode === 'REPORTS' ? 'text-blue-600' : 'text-[var(--muted-foreground)]'}`}>
                      {financeOpMode === 'REPORTS' ? '● সক্রিয় মোড' : 'প্রবেশ করুন ➔'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Shariah Funds Compact Button Strip (ছোট ও পরিচ্ছন্ন বাটন - ক্লিক করলে খতিয়ান) */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--card)]/60 border border-[var(--border)] overflow-x-auto shadow-xs">
                <span className="text-xs font-medium font-bold text-[var(--muted-foreground)] shrink-0 px-2 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                  শরীয়াহ তহবিলসমূহ:
                </span>
                {shariahFunds.map((fund) => (
                  <button
                    key={fund.id}
                    type="button"
                    onClick={() => setActiveLedgerFund(fund)}
                    className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-emerald-500 hover:bg-emerald-500/5 transition cursor-pointer text-left shrink-0 shadow-xs flex items-center gap-2"
                    title={`ক্লিক করে "${fund.nameBn}" এর সম্পূর্ণ খতিয়ান ও লেনদেন দেখুন`}
                  >
                    <div>
                      <span className="text-xs font-medium font-bold text-[var(--foreground)] block truncate max-w-[150px]">
                        {fund.nameBn}
                      </span>
                      <span className="text-xs font-black text-emerald-600 font-mono block">
                        ৳{fund.balance.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 font-bold">↗</span>
                  </button>
                ))}
              </div>

              {/* Sub-Portals Bar for Active Mode (Receive or Expense) */}
              {financeOpMode === 'RECEIVE' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-x-auto shadow-xs text-xs">
                  <button
                    onClick={() => setReceivePortal('STUDENT_FEES')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'STUDENT_FEES'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>ছাত্র ফি আদায়</span>
                    {onlinePaymentQueue.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-xs font-semibold font-mono bg-rose-500 text-white">
                        {onlinePaymentQueue.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setReceivePortal('ZAKAT')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'ZAKAT'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> যাকাত ফান্ড</span>
                  </button>

                  <button
                    onClick={() => setReceivePortal('LILLAH')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'LILLAH'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5"><Utensils className="w-4 h-4 text-amber-600 dark:text-amber-400" /> লিল্লাহ বোর্ডিং ও খানা</span>
                  </button>

                  <button
                    onClick={() => setReceivePortal('WAQF')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'WAQF'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-blue-600 dark:text-blue-400" /> ওয়াকফ ও স্থায়ী নির্মাণ</span>
                  </button>

                  <button
                    onClick={() => setReceivePortal('BOX')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'BOX'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-purple-600 dark:text-purple-400" /> মসজিদ ও দান বাক্স</span>
                  </button>

                  <button
                    onClick={() => setReceivePortal('RECEIPTS_LIST')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                      receivePortal === 'RECEIPTS_LIST'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>আদায়কৃত রসিদ খাতা</span>
                  </button>
                </div>
              )}

              {financeOpMode === 'EXPENSE' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-x-auto shadow-xs text-xs">
                  {[
                    { key: 'MESS_BAZAR', label: 'মেস বাজার খরচ', icon: ShoppingBag, color: 'text-amber-800 dark:text-amber-400 font-bold' },
                    { key: 'CAPITAL_REPAIR', label: 'মেরামত ও স্থায়ী খরচ', icon: Wrench, color: 'text-orange-500' },
                    { key: 'TEACHER_SALARY', label: 'ওস্তাদ ও স্টাফদের বেতন', icon: Users, color: 'text-purple-500' },
                    { key: 'WELFARE_AID', label: 'ছাত্র কল্যাণ ও চিকিৎসা অনুদান', icon: HeartHandshake, color: 'text-rose-700 dark:text-rose-400 font-bold' },
                    { key: 'UTILITY_ADMIN', label: 'বিদ্যুৎ ও প্রশাসনিক ইউটিলিটি', icon: Zap, color: 'text-blue-500' },
                    { key: 'EVENT_CONFERENCE', label: 'ইভেন্ট ও মাহফিল খরচ', icon: Megaphone, color: 'text-teal-500' },
                    { key: 'EXPENSE_LIST', label: 'সকল ব্যয়ের তালিকা', icon: Receipt, color: 'text-emerald-700 dark:text-emerald-400 font-bold' },
                  ].map((p) => {
                    const IconComp = p.icon;
                    const isActive = expensePortal === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setExpensePortal(p.key as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                        }`}
                      >
                        <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : p.color}`} />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ========================================================================= */}
              {/* PILLAR 1: টাকা গ্রহণ / রিসিভ মানি পোর্টালসমূহ (5 Dedicated 1-Click Portals) */}
              {/* ========================================================================= */}
              {financeOpMode === 'RECEIVE' && (
                <div className="space-y-4">
                  {/* PORTAL 1: STUDENT FEES POS & ONLINE QUEUE */}
                  {receivePortal === 'STUDENT_FEES' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left Column: Direct Counter POS Fee Form (7 cols) */}
                      <div className="lg:col-span-7 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">সরাসরি কাউন্টার থেকে ছাত্র ফি গ্রহণ</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">ইউনিক রেজিস্ট্রেশন নম্বর লুকআপ ও লীন ডাবল-এন্ট্রি পিওএস</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium font-bold text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            লাইভ পিওএস সচল
                          </span>
                        </div>

                        {/* Interactive Unique Registration Search & QR Code Scanner Panel */}
                        <div className="p-3.5 rounded-xl bg-[var(--background)] border border-emerald-500/30 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <QrCode className="w-3.5 h-3.5" />
                              ইউনিক রেজিস্ট্রেশন নম্বর দিয়ে সন্ধান করুন অথবা QR স্ক্যান করুন:
                            </span>
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Enter চাপলেই সমস্ত তথ্য অটো-ফিলাপ হবে</span>
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={studentRegSearch}
                              onChange={(e) => setStudentRegSearch(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleLookupStudent(studentRegSearch);
                                }
                              }}
                              placeholder="যেমন: REG-2026-0001 অথবা রোল ০১..."
                              className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleLookupStudent(studentRegSearch)}
                              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>অনুসন্ধান</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setStudentRegSearch('REG-2026-0002');
                                handleLookupStudent('REG-2026-0002');
                              }}
                              className="px-3.5 py-2 rounded-xl border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                              title="আইডি কার্ডের QR কোড স্ক্যান করার সিমুলেশন"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>QR স্ক্যান</span>
                            </button>
                          </div>

                          {/* Quick Selection Demo Chips */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">দ্রুত বাছাই:</span>
                            {registeredStudents.map((st) => (
                              <button
                                key={st.registrationNo}
                                type="button"
                                onClick={() => {
                                  setStudentRegSearch(st.registrationNo);
                                  handleLookupStudent(st.registrationNo);
                                }}
                                className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-emerald-500 text-[var(--foreground)] transition font-mono cursor-pointer"
                              >
                                {st.registrationNo}: {st.nameBn} ({st.roll})
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fee Collection Form */}
                        <form onSubmit={handleCollectFee} className="space-y-3.5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ইউনিক রেজিস্ট্রেশন নম্বর:
                              </label>
                              <input
                                type="text"
                                readOnly
                                value={posStudentRegNo}
                                className="w-full bg-[var(--background)]/70 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 font-bold cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                রোল নম্বর:
                              </label>
                              <input
                                type="text"
                                required
                                value={posRoll}
                                onChange={(e) => setPosRoll(e.target.value)}
                                placeholder="০১ / ০৭"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                শিক্ষার্থীর পূর্ণ নাম:
                              </label>
                              <input
                                type="text"
                                required
                                value={posStudentName}
                                onChange={(e) => setPosStudentName(e.target.value)}
                                placeholder="মুহাম্মদ আব্দুল্লাহ"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-bold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পিতার নাম:
                              </label>
                              <input
                                type="text"
                                value={posFatherName}
                                onChange={(e) => setPosFatherName(e.target.value)}
                                placeholder="মাওলানা রফিকুল ইসলাম"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মাতার নাম:
                              </label>
                              <input
                                type="text"
                                value={posMotherName}
                                onChange={(e) => setPosMotherName(e.target.value)}
                                placeholder="মাহমুদা খাতুন"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                শ্রেণি / জামাত:
                              </label>
                              <input
                                type="text"
                                value={posClassName}
                                onChange={(e) => setPosClassName(e.target.value)}
                                placeholder="হিফজুল কুরআন বিভাগ"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ব্যাচ / সেশন:
                              </label>
                              <input
                                type="text"
                                value={posBatchSession}
                                onChange={(e) => setPosBatchSession(e.target.value)}
                                placeholder="২০২৬ সেশন"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                অভিভাবকের মোবাইল:
                              </label>
                              <input
                                type="text"
                                value={posGuardianPhone}
                                onChange={(e) => setPosGuardianPhone(e.target.value)}
                                placeholder="01711-223344"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ফি এর খাত (Fee Head):
                              </label>
                              <input
                                type="text"
                                required
                                value={posFeeType}
                                onChange={(e) => setPosFeeType(e.target.value)}
                                placeholder="হিফজ মাসিক ফি ও খানা"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                জমা তহবিল (Deposit Fund):
                              </label>
                              <select
                                value={posFundId}
                                onChange={(e) => setPosFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} {f.isRestricted ? '(শরীয়াহ রেস্ট্রিক্টেড)' : ''}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ধার্যকৃত ফি (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={posAmount}
                                onChange={(e) => setPosAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ছাড় / ওয়েভার (৳):
                              </label>
                              <input
                                type="number"
                                min={0}
                                value={posDiscount}
                                onChange={(e) => setPosDiscount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                নীট আদায়যোগ্য (৳):
                              </label>
                              <div className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 font-bold">
                                ৳{Math.max(0, posAmount - posDiscount).toLocaleString('bn-BD')}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পরিশোধের মাধ্যম:
                              </label>
                              <select
                                value={posMethod}
                                onChange={(e) => setPosMethod(e.target.value as any)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-bold"
                              >
                                <option value="CASH">নগদ কাউন্টার ক্যাশ (Cash)</option>
                                <option value="BKASH">বিকাশ মার্চেন্ট গেটওয়ে (bKash)</option>
                                <option value="NAGAD">নগদ ইসলামিক ওয়ালেট (Nagad)</option>
                                <option value="BANK">ব্যাংক ডিপোজিট / অনলাইন (Bank)</option>
                              </select>
                            </div>
                            <div className="flex items-end">
                              <button
                                type="submit"
                                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                              >
                                <Receipt className="w-4 h-4" />
                                <span>ফি জমা নিন ও রসিদ প্রস্তুত করুন</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      {/* Right Column: Online Payment Queue (5 cols) */}
                      <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                              <Smartphone className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">অনলাইন বিকাশ/নগদ কিউ</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">১-ক্লিক ভেরিফিকেশন ও পেপার-সেভার মোড</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {onlinePaymentQueue.length} অপেক্ষমান
                          </span>
                        </div>

                        <div className="space-y-3">
                          {onlinePaymentQueue.length === 0 ? (
                            <div className="text-center py-10 text-[var(--muted-foreground)]">
                              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-700 dark:text-emerald-400 font-bold mb-2 opacity-50" />
                              <p className="text-xs font-semibold">কোনো অনলাইন আবেদন পেন্ডিং নেই</p>
                              <p className="text-xs font-semibold">সকল বিকাশ ও নগদ পেমেন্ট অনুমোদিত</p>
                            </div>
                          ) : (
                            onlinePaymentQueue.map((item) => (
                              <div
                                key={item.id}
                                className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2 text-xs hover:border-[var(--primary)] transition shadow-xs"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="font-bold text-[var(--foreground)] flex items-center gap-2">
                                      <span>{item.studentNameBn}</span>
                                      <span className="text-xs font-semibold font-mono px-1.5 py-0.2 rounded bg-[var(--card)] border border-[var(--border)]">
                                        রোল: {item.studentRoll}
                                      </span>
                                    </div>
                                    <div className="text-xs font-medium text-[var(--muted-foreground)] mt-0.5">
                                      {item.classNameBn} • {item.feeTypeBn}
                                    </div>
                                  </div>
                                  <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                                    ৳{item.netPaid.toLocaleString('bn-BD')}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted-foreground)] pt-1 border-t border-[var(--border)]/60">
                                  <span className="font-mono flex items-center gap-1 font-semibold text-blue-500">
                                    {item.paymentMethod === 'BKASH' ? 'বিকাশ' : 'নগদ'}: {item.transactionRef}
                                  </span>
                                  <span>{item.date}</span>
                                </div>

                                <div className="flex items-center justify-end gap-1.5 pt-1.5">
                                  <button
                                    onClick={() => handleConfirmOnlinePayment(item.id)}
                                    className="px-2.5 py-1 rounded-lg bg-[var(--card)] hover:bg-[var(--border)]/40 border border-[var(--border)] text-xs font-semibold font-semibold text-[var(--foreground)] transition shadow-xs cursor-pointer"
                                    title="শুধু লেজারে যুক্ত হবে"
                                  >
                                    ✓ শুধু কনফার্ম
                                  </button>
                                  <button
                                    onClick={() => handleConfirmOnlinePayment(item.id, 'thermal')}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold font-semibold flex items-center gap-1 transition shadow-xs cursor-pointer"
                                  >
                                    <Printer className="w-3 h-3" />
                                    <span>থার্মাল (80mm)</span>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 2: ZAKAT FUND PORTAL (100% SHARIAH RESTRICTED) */}
                  {receivePortal === 'ZAKAT' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                              <Coins className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">যাকাত তহবিল সরাসরি গ্রহণ পোর্টাল</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">১০০% শরীয়াহ রেস্ট্রিক্টেড — কাস্টমাইজেবল ডোনার প্রোফাইল ও হোয়াটসঅ্যাপ</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold font-bold text-teal-500 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                            শরীয়াহ নির্ধারিত ৮ খাত
                          </span>
                        </div>

                        {/* Shariah Notice */}
                        <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-[var(--foreground)] space-y-1">
                          <div className="font-bold text-teal-500 flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5" />
                            <span>শরীয়াহ মূলনীতি ও সতর্কতা:</span>
                          </div>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] leading-relaxed">
                            যাকাতের অর্থ কেবল শরীয়াহ নির্ধারিত ৮টি খাতের হকদার (লিল্লাহ বোর্ডিং ও দরিদ্র শিক্ষার্থীদের খানা-পোশাক) ব্যতীত সাধারণ ভবন নির্মাণ বা আসাতায়ে কেরামের বেতন খাতে ব্যয় করা সম্পূর্ণ নিষিদ্ধ।
                          </p>
                        </div>

                        {/* Zakat Donor Form */}
                        <form onSubmit={handleSaveZakatDonation} className="space-y-3.5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                যাকাত দাতার নাম (Donor Name):
                              </label>
                              <input
                                type="text"
                                required
                                value={newDonorName}
                                onChange={(e) => setNewDonorName(e.target.value)}
                                placeholder="আলহাজ্ব শফিকুল ইসলাম"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)] font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মোবাইল নম্বর:
                              </label>
                              <input
                                type="text"
                                value={newDonorPhone}
                                onChange={(e) => setNewDonorPhone(e.target.value)}
                                placeholder="01711-223344"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1 flex items-center gap-1">
                                <MessageCircle className="w-3 h-3 text-emerald-700 dark:text-emerald-400 font-bold" />
                                <span>হোয়াটসঅ্যাপ নম্বর (WhatsApp):</span>
                              </label>
                              <input
                                type="text"
                                value={donorWhatsappInput}
                                onChange={(e) => setDonorWhatsappInput(e.target.value)}
                                placeholder="01711223344 (রসিদ পাঠাতে)"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                দাতার ঠিকানা ও পরিচিতি:
                              </label>
                              <input
                                type="text"
                                value={donorAddressInput}
                                onChange={(e) => setDonorAddressInput(e.target.value)}
                                placeholder="ধানমন্ডি, ঢাকা (ব্যবসায়ী)"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              যাকাতের বিশেষ উদ্দেশ্য বা নিয়ত (Niyyah / Cause):
                            </label>
                            <input
                              type="text"
                              value={donorCauseInput}
                              onChange={(e) => setDonorCauseInput(e.target.value)}
                              placeholder="যেমন: পবিত্র রমজানের যাকাত / মরহুম পিতার মাগফিরাতের নিয়ত"
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                যাকাত অনুদানের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={newDonorAmount}
                                onChange={(e) => setNewDonorAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পরিশোধের মাধ্যম:
                              </label>
                              <select
                                value={newDonorMethod}
                                onChange={(e) => setNewDonorMethod(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-[var(--foreground)] font-bold"
                              >
                                <option value="নগদ ক্যাশ গ্রহণ">নগদ ক্যাশ গ্রহণ</option>
                                <option value="বিকাশ অনলাইন">বিকাশ অনলাইন</option>
                                <option value="নগদ অনলাইন">নগদ অনলাইন</option>
                                <option value="ব্যাংক চেক / ডিপোজিট">ব্যাংক চেক / ডিপোজিট</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                          >
                            <Coins className="w-4 h-4" />
                            <span>যাকাত জমা নিন ও পাকাপোক্ত রসিদ প্রস্তুত করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Right Column: Recent Zakat Records */}
                      <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-teal-500" />
                            <span>সাম্প্রতিক যাকাত অনুদান লগ</span>
                          </h4>
                          <span className="text-xs font-semibold font-mono text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded">
                            তহবিল: ৳{shariahFunds.find(f => f.id === 'fnd-lillah')?.balance.toLocaleString('bn-BD')}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {donations.filter(d => d.fundId === 'fnd-lillah').slice(0, 4).map((d) => (
                            <div key={d.id} className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[var(--foreground)]">{d.donorName}</span>
                                <span className="font-mono font-bold text-teal-500">৳{d.amount.toLocaleString('bn-BD')}</span>
                              </div>
                              <p className="text-xs font-medium text-[var(--muted-foreground)] line-clamp-1">{d.notes || d.causeHead || 'যাকাত তহবিল'}</p>
                              <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted-foreground)] pt-1 border-t border-[var(--border)]/50">
                                <span>{d.date} • {d.paymentMethod}</span>
                                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{d.receiptNo}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 3: LILLAH BOARDING FUND PORTAL */}
                  {receivePortal === 'LILLAH' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold">
                              <Utensils className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">লিল্লাহ বোর্ডিং ও এতিম খানা স্পনসরশিপ</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">দৈনিক খাদ্য, পোশাক ও চিকিৎসা সহায়তা অনুদান পোর্টাল</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold font-bold text-amber-800 dark:text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                            মেস স্পনসরশিপ
                          </span>
                        </div>

                        {/* Quick Preset Buttons */}
                        <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
                          <span className="text-xs font-medium font-bold text-[var(--foreground)] block">
                            এক ক্লিকে খানা প্যাকেজ বাছাই করুন:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setNewDonorAmount(3000);
                                setDonorCauseInput('১ বেলার নাস্তা স্পনসর (সকল আবাসিক ছাত্র)');
                              }}
                              className="p-2 rounded-xl border border-[var(--border)] hover:border-amber-500 bg-[var(--card)] text-left transition cursor-pointer"
                            >
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block">সকালের নাস্তা</span>
                              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-bold font-mono">৳৩,০০০</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewDonorAmount(10000);
                                setDonorCauseInput('১ দিনের পূর্ণ তিন বেলার মেস খানা স্পনসর');
                              }}
                              className="p-2 rounded-xl border border-[var(--border)] hover:border-amber-500 bg-[var(--card)] text-left transition cursor-pointer"
                            >
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block">১ দিনের পূর্ণ খানা</span>
                              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-bold font-mono">৳১০,০০০</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewDonorAmount(30000);
                                setDonorCauseInput('১০ জন এতিম ছাত্রের ১ মাসের পূর্ণ খানা স্পনসর');
                              }}
                              className="p-2 rounded-xl border border-[var(--border)] hover:border-amber-500 bg-[var(--card)] text-left transition cursor-pointer"
                            >
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block">মাসিক এতিম স্পনসর</span>
                              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-bold font-mono">৳৩০,০০০</span>
                            </button>
                          </div>
                        </div>

                        <form onSubmit={handleSaveLillahDonation} className="space-y-3.5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                দাতা / স্পনসরের নাম:
                              </label>
                              <input
                                type="text"
                                required
                                value={newDonorName}
                                onChange={(e) => setNewDonorName(e.target.value)}
                                placeholder="হাজী মুহাম্মদ এনামুল হক"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)] font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মোবাইল নম্বর:
                              </label>
                              <input
                                type="text"
                                value={newDonorPhone}
                                onChange={(e) => setNewDonorPhone(e.target.value)}
                                placeholder="01819-334455"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1 flex items-center gap-1">
                                <MessageCircle className="w-3 h-3 text-emerald-700 dark:text-emerald-400 font-bold" />
                                <span>হোয়াটসঅ্যাপ নম্বর (WhatsApp):</span>
                              </label>
                              <input
                                type="text"
                                value={donorWhatsappInput}
                                onChange={(e) => setDonorWhatsappInput(e.target.value)}
                                placeholder="01819334455"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                স্পনসরশিপের উদ্দেশ্য / খাত:
                              </label>
                              <input
                                type="text"
                                value={donorCauseInput}
                                onChange={(e) => setDonorCauseInput(e.target.value)}
                                placeholder="১ দিনের পূর্ণ খানা স্পনসর"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                অনুদানের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={newDonorAmount}
                                onChange={(e) => setNewDonorAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পরিশোধ মাধ্যম:
                              </label>
                              <select
                                value={newDonorMethod}
                                onChange={(e) => setNewDonorMethod(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-[var(--foreground)] font-bold"
                              >
                                <option value="নগদ ক্যাশ গ্রহণ">নগদ ক্যাশ গ্রহণ</option>
                                <option value="বিকাশ অনলাইন">বিকাশ অনলাইন</option>
                                <option value="নগদ অনলাইন">নগদ অনলাইন</option>
                                <option value="ব্যাংক ডিপোজিট">ব্যাংক ডিপোজিট</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                          >
                            <Utensils className="w-4 h-4" />
                            <span>লিল্লাহ বোর্ডিং অনুদান গ্রহণ ও রসিদ প্রস্তুত করুন</span>
                          </button>
                        </form>
                      </div>

                      <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400 font-bold" />
                            <span>মেস বোর্ডিং বর্তমান লাইভ পরিসংখ্যান</span>
                          </h4>
                          <span className="text-xs font-semibold font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                            ১৪০ জন লিল্লাহ ছাত্র
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[var(--muted-foreground)]">আজকের সকালের নাস্তা:</span>
                            <span className="font-bold">১৪০ জন ছাত্র (সম্পন্ন)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--muted-foreground)]">দুপুরের খাবার:</span>
                            <span className="font-bold">১৪০ জন ছাত্র (সম্পন্ন)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--muted-foreground)]">রাতের খাবার বরাদ্দ:</span>
                            <span className="font-bold text-amber-800 dark:text-amber-400 font-bold">১৪০ জন ছাত্র</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 4: WAQF & INFRASTRUCTURE CONSTRUCTION PORTAL */}
                  {receivePortal === 'WAQF' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                              <Building className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">ওয়াকফ ও স্থায়ী নির্মাণ ফান্ড পোর্টাল</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">মসজিদ কমপ্লেক্স, নতুন বহুতল শিক্ষা ভবন ও সাদাকায়ে জারিয়া</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold font-bold text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                            স্থায়ী ওয়াকফ
                          </span>
                        </div>

                        <form onSubmit={handleSaveWaqfDonation} className="space-y-3.5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                দাতা / ওয়াকিফের নাম:
                              </label>
                              <input
                                type="text"
                                required
                                value={newDonorName}
                                onChange={(e) => setNewDonorName(e.target.value)}
                                placeholder="ইঞ্জিনিয়ার মাহফুজুর রহমান"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)] font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মোবাইল নম্বর:
                              </label>
                              <input
                                type="text"
                                value={newDonorPhone}
                                onChange={(e) => setNewDonorPhone(e.target.value)}
                                placeholder="01712-445566"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1 flex items-center gap-1">
                                <MessageCircle className="w-3 h-3 text-emerald-700 dark:text-emerald-400 font-bold" />
                                <span>হোয়াটসঅ্যাপ নম্বর (WhatsApp):</span>
                              </label>
                              <input
                                type="text"
                                value={donorWhatsappInput}
                                onChange={(e) => setDonorWhatsappInput(e.target.value)}
                                placeholder="01712445566"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                নির্দিষ্ট নির্মাণ প্রকল্প বা খাত:
                              </label>
                              <input
                                type="text"
                                value={donorCauseInput}
                                onChange={(e) => setDonorCauseInput(e.target.value)}
                                placeholder="নতুন ৪-তলা হিফজ ভবনের ছাদ ঢালাই অনুদান"
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ওয়াকফ অনুদানের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={newDonorAmount}
                                onChange={(e) => setNewDonorAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পরিশোধ মাধ্যম:
                              </label>
                              <select
                                value={newDonorMethod}
                                onChange={(e) => setNewDonorMethod(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 text-[var(--foreground)] font-bold"
                              >
                                <option value="ব্যাংক চেক (#৯৯২১০)">ব্যাংক চেক / একাউন্ট পে</option>
                                <option value="নগদ ক্যাশ গ্রহণ">নগদ ক্যাশ গ্রহণ</option>
                                <option value="বিকাশ অনলাইন">বিকাশ অনলাইন</option>
                                <option value="ব্যাংক ট্রান্সফার">ব্যাংক ট্রান্সফার</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                          >
                            <Building className="w-4 h-4" />
                            <span>ওয়াকফ অনুদান গ্রহণ ও পাকা রসিদ প্রদান করুন</span>
                          </button>
                        </form>
                      </div>

                      <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-purple-500" />
                            <span>চলমান নির্মাণ ও ওয়াকফ অগ্রগতি</span>
                          </h4>
                          <span className="text-xs font-semibold font-mono text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">
                            তহবিল: ৳{shariahFunds.find(f => f.id === 'fnd-waqf')?.balance.toLocaleString('bn-BD')}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2 text-xs">
                          <div className="font-semibold text-[var(--foreground)]">নতুন ৪-তলা হিফজ ভবন নির্মাণ</div>
                          <div className="w-full bg-[var(--card)] rounded-full h-2 border border-[var(--border)] overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: '68%' }} />
                          </div>
                          <div className="flex justify-between text-xs font-semibold text-[var(--muted-foreground)]">
                            <span>অগ্রগতি: ৬৮% সম্পন্ন</span>
                            <span>লক্ষ্যমাত্রা: ৳১৫,০০,০০০</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 5: DONATION BOX PORTAL */}
                  {receivePortal === 'BOX' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[var(--foreground)]">মসজিদ ও মাদ্রাসা দান বাক্স কালেকশন</h3>
                              <p className="text-xs font-medium text-[var(--muted-foreground)]">জুমু'আ ও সাপ্তাহিক দান বাক্সের সিলগালা গণনা ও স্বাক্ষী রেজিস্ট্রি</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                            স্বাক্ষীভিত্তিক এন্ট্রি
                          </span>
                        </div>

                        <form onSubmit={handleSaveBoxDonation} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              দান বাক্সের নাম ও অবস্থান:
                            </label>
                            <input
                              type="text"
                              required
                              value={newDonorName}
                              onChange={(e) => setNewDonorName(e.target.value)}
                              placeholder="ক্যাম্পাস কেন্দ্রীয় মসজিদ কালেকশন বক্স #১"
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-[var(--foreground)] font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              গণনাকারী ও স্বাক্ষীগণের নাম (উপস্থিত দায়িত্বশীল):
                            </label>
                            <input
                              type="text"
                              required
                              value={donorAddressInput}
                              onChange={(e) => setDonorAddressInput(e.target.value)}
                              placeholder="মাওলানা মুজাম্মেল হক, কারী বেলাল আহমদ ও খাদেম ফজলুল হক"
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-[var(--foreground)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              গণনার বিবরণ ও উপলক্ষ:
                            </label>
                            <input
                              type="text"
                              value={donorCauseInput}
                              onChange={(e) => setDonorCauseInput(e.target.value)}
                              placeholder="পবিত্র জুমু'আর নামাজ পরবর্তী মুসল্লিদের মুক্তহস্তে দান গণনা"
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-[var(--foreground)]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                জমাকৃত ফান্ডের খাত:
                              </label>
                              <select
                                value={newDonorFundId}
                                onChange={(e) => setNewDonorFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-[var(--foreground)] font-bold"
                              >
                                <option value="fnd-gen">মাদ্রাসার সাধারণ চলতি তহবিল</option>
                                <option value="fnd-lillah">যাকাত ও লিল্লাহ ফান্ড</option>
                                <option value="fnd-waqf">ওয়াকফ ও নির্মাণ ফান্ড</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                গণনাকৃত মোট নগদ টাকা (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={newDonorAmount}
                                onChange={(e) => setNewDonorAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-[var(--foreground)] font-mono font-bold"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                          >
                            <Package className="w-4 h-4" />
                            <span>দান বাক্স কালেকশন ভাউচার রেজিস্ট্রি করুন</span>
                          </button>
                        </form>
                      </div>

                      <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-blue-500" />
                            <span>দান বাক্স নিরাপত্তা ও অডিট প্রটোকল</span>
                          </h4>
                          <span className="text-xs font-semibold font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                            দ্বৈত চাবি সংরক্ষণ
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs font-medium text-[var(--muted-foreground)]">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold shrink-0 mt-0.5" />
                            <span>বাক্স খোলার সময় কমপক্ষে দুজন দায়িত্বশীল ও একজন কমিটির সদস্য উপস্থিত থাকা বাধ্যতামূলক।</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold shrink-0 mt-0.5" />
                            <span>গণনার সাথে সাথে ক্যাশ টাকা মাদ্রাসার ক্যাশিয়ারের মূল ক্যাশ বক্সে জমা হবে।</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold shrink-0 mt-0.5" />
                            <span>মুহতামিম প্যানেলে দিনশেষে অটোমেটিক ক্লোজিং স্টেটমেন্ট পাঠানো হবে।</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 6: RECEIPTS ARCHIVE / LEDGER */}
                  {receivePortal === 'RECEIPTS_LIST' && (
                    <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-2">
                        <div>
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                            ফি আদায় ও মানি রসিদ খাতা (Receipts Ledger Archive)
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            অপরিবর্তনীয় আর্থিক খাতা — থার্মাল ও প্রাতিষ্ঠানিক প্যাড ফরম্যাটে প্রিন্ট সুবিধা
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">
                          মোট গৃহীত রসিদ: {completedPayments.length} টি
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold">
                              <th className="p-2.5">রসিদ নম্বর</th>
                              <th className="p-2.5">তারিখ ও সময়</th>
                              <th className="p-2.5">রেজিস্ট্রেশন ও নাম</th>
                              <th className="p-2.5">জামাত ও খাত</th>
                              <th className="p-2.5">জমা ফান্ড</th>
                              <th className="p-2.5">মেথড</th>
                              <th className="p-2.5 text-right">আদায়কৃত টাকা</th>
                              <th className="p-2.5 text-center">স্ট্যাটাস</th>
                              <th className="p-2.5 text-right">অ্যাকশন / প্রিন্ট</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {completedPayments.map((p) => (
                              <tr key={p.id} className="hover:bg-[var(--background)]/50 transition">
                                <td className="p-2.5 font-mono font-bold text-[var(--primary)]">{p.receiptNo}</td>
                                <td className="p-2.5 text-[var(--muted-foreground)] text-xs font-medium">{p.date}</td>
                                <td className="p-2.5 font-bold text-[var(--foreground)]">
                                  {p.studentNameBn}
                                  <span className="block text-xs font-semibold font-mono text-[var(--muted-foreground)]">
                                    {p.registrationNo || 'REG-2026-XXXX'} (রোল: {p.studentRoll})
                                  </span>
                                </td>
                                <td className="p-2.5">
                                  <span className="font-medium text-[var(--foreground)]">{p.feeTypeBn}</span>
                                  <span className="block text-xs font-semibold text-[var(--muted-foreground)]">{p.classNameBn}</span>
                                </td>
                                <td className="p-2.5 text-xs font-medium font-medium text-emerald-700 dark:text-emerald-400 font-bold">{p.fundNameBn}</td>
                                <td className="p-2.5">
                                  <span className="text-xs font-semibold font-mono font-bold px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)]">
                                    {p.paymentMethod}
                                  </span>
                                </td>
                                <td className="p-2.5 text-right font-black text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs">
                                  ৳{p.netPaid.toLocaleString('bn-BD')}
                                </td>
                                <td className="p-2.5 text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                      p.status === 'COMPLETED'
                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                        : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold border border-rose-500/20'
                                    }`}
                                  >
                                    {p.status === 'COMPLETED' ? 'পরিশোধিত' : 'রিভার্সড'}
                                  </span>
                                </td>
                                <td className="p-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setActiveThermalReceipt(p)}
                                      className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] transition shadow-xs cursor-pointer"
                                      title="থার্মাল রসিদ (80mm/58mm)"
                                    >
                                      <Printer className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                                    </button>
                                    <button
                                      onClick={() => setActiveOfficialReceipt(p)}
                                      className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] transition shadow-xs cursor-pointer"
                                      title="মাদ্রাসার প্যাডে A4/A5 রসিদ"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                                    </button>
                                    {p.status === 'COMPLETED' && (
                                      <button
                                        onClick={() => handleReversePayment(p.id)}
                                        className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-500 transition shadow-xs cursor-pointer"
                                        title="ভুল এন্ট্রি শরীয়াহ সম্মত রিভার্স করুন"
                                      >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* PILLAR 2: EXPENSE & DISBURSEMENT OPERATIONS (টাকা ব্যয় / খরচ)            */}
              {/* ========================================================================= */}
              {financeOpMode === 'EXPENSE' && (
                <div className="space-y-6">
                  {/* PORTAL 1: MESS BAZAR (মেস বাজার খরচ) */}
                  {expensePortal === 'MESS_BAZAR' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="pb-3 border-b border-[var(--border)]">
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-amber-800 dark:text-amber-400 font-bold" />
                            মেস বাজার খরচ
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            মেস সুপারের বাজার মেমো এন্ট্রি ও সরাসরি লিল্লাহ/সাধারণ ফান্ড সমন্বয়
                          </p>
                        </div>

                        <form onSubmit={handleAddBazarExpense} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              বাজারের শিরোনাম / খাদ্য দ্রব্যাদি:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="যেমন: সাপ্তাহিক চাল, মসলা, ডাল, তৈল ও আলু খরিদ"
                              value={newExpenseTitle}
                              onChange={(e) => setNewExpenseTitle(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                বাজারকারী (মেস সুপার):
                              </label>
                              <input
                                type="text"
                                required
                                value={bazarShopperStaff}
                                onChange={(e) => setBazarShopperStaff(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মেমো নং ও আড়তের নাম:
                              </label>
                              <input
                                type="text"
                                required
                                value={bazarMemoNo}
                                onChange={(e) => setBazarMemoNo(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                টাকার পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={10}
                                value={newExpenseAmount}
                                onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                কোন ফান্ড থেকে টাকা যাবে:
                              </label>
                              <select
                                value={bazarFundId}
                                onChange={(e) => setBazarFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} (৳{f.balance.toLocaleString('bn-BD')})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Approval Threshold Notification Pill */}
                          {newExpenseAmount >= approvalThresholdLimit && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium font-semibold flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                ব্যয়ের পরিমাণ (৳{newExpenseAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন লিমিট (৳{approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি স্বয়ংক্রিয়ভাবে মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হবে এবং অনুমোদন ছাড়া ফান্ড থেকে টাকা কাটা হবে না।
                              </span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>মেস বাজার ভাউচার নিশ্চিত করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Recent Bazar Expenses Feed */}
                      <div className="lg:col-span-2 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div>
                            <h3 className="font-bold text-sm text-[var(--foreground)]">সাম্প্রতিক মেস বাজার ভাউচারসমূহ</h3>
                            <p className="text-xs text-[var(--muted-foreground)]">খাদ্যদ্রব্য খরিদ ও ভাউচার রেজিস্ট্রি</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 font-bold">
                            মোট: {expenseVouchers.filter(e => e.category === 'MESS_BAZAR').length} টি
                          </span>
                        </div>

                        <div className="space-y-3">
                          {expenseVouchers.filter(e => e.category === 'MESS_BAZAR').map((exp) => (
                            <div
                              key={exp.id}
                              className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-amber-800 dark:text-amber-400 font-bold text-xs font-medium">{exp.voucherNo}</span>
                                  <span className="text-xs font-semibold font-medium text-[var(--muted-foreground)]">{exp.date}</span>
                                </div>
                                <h4 className="font-bold text-sm text-[var(--foreground)]">{exp.title}</h4>
                                <div className="text-xs font-medium text-[var(--muted-foreground)]">
                                  <span>ফান্ড: <strong className="text-[var(--foreground)]">{exp.fundNameBn}</strong></span> • 
                                  <span> মেমো: {exp.memoDetails}</span>
                                </div>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <span className="text-base font-extrabold text-rose-700 dark:text-rose-400 font-bold font-mono">
                                  ৳{exp.amount.toLocaleString('bn-BD')}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                    exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                      : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                  }`}
                                >
                                  {exp.status === 'APPROVED' ? 'অনুমোদিত' : exp.status === 'ADJUSTED' ? 'সমন্বয়কৃত' : 'মুহতামিমের অনুমোদনের অপেক্ষায়'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 2: CAPITAL REPAIR (মেরামত ও স্থায়ী খরচ) */}
                  {expensePortal === 'CAPITAL_REPAIR' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="pb-3 border-b border-[var(--border)]">
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-orange-500" />
                            মেরামত ও স্থায়ী খরচ
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            মাদ্রাসার ভবন সংস্কার, রং, প্লাম্বিং, বৈদ্যুতিক ও স্থায়ী রক্ষণাবেক্ষণ
                          </p>
                        </div>

                        <form onSubmit={handleAddRepairExpense} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              সংস্কার কাজের শিরোনাম ও বিবরণ:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="যেমন: আবাসিক ছাত্রাবাসের মোটর ও পানির পাম্প জরুরি মেরামত"
                              value={newExpenseTitle}
                              onChange={(e) => setNewExpenseTitle(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ঠিকাদার / মিস্ত্রি / টেকনিশিয়ান:
                              </label>
                              <input
                                type="text"
                                required
                                value={repairContractor}
                                onChange={(e) => setRepairContractor(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                বিল ভাউচার / মেমো নং:
                              </label>
                              <input
                                type="text"
                                required
                                value={repairBillNo}
                                onChange={(e) => setRepairBillNo(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ব্যয়ের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={10}
                                value={newExpenseAmount}
                                onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                কোন ফান্ড থেকে অর্থ ছাড় হবে:
                              </label>
                              <select
                                value={repairFundId}
                                onChange={(e) => setRepairFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} (৳{f.balance.toLocaleString('bn-BD')})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {newExpenseAmount >= approvalThresholdLimit && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium font-semibold flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                ব্যয়ের পরিমাণ (৳{newExpenseAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন লিমিট (৳{approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি স্বয়ংক্রিয়ভাবে মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হবে।
                              </span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Wrench className="w-3.5 h-3.5" />
                            <span>মেরামত ও স্থায়ী খরচ ভাউচার দাখিল করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Recent Repair Expenses Feed */}
                      <div className="lg:col-span-2 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div>
                            <h3 className="font-bold text-sm text-[var(--foreground)]">সাম্প্রতিক সংস্কার ও মেরামত ভাউচার</h3>
                            <p className="text-xs text-[var(--muted-foreground)]">বিল চালান ও কাজ সমাপ্তির বিবরণ</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-orange-500">
                            মোট: {expenseVouchers.filter(e => e.category === 'CAPITAL_REPAIR' || e.category === 'REPAIR').length} টি
                          </span>
                        </div>

                        <div className="space-y-3">
                          {expenseVouchers.filter(e => e.category === 'CAPITAL_REPAIR' || e.category === 'REPAIR').map((exp) => (
                            <div
                              key={exp.id}
                              className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-orange-500 text-xs font-medium">{exp.voucherNo}</span>
                                  <span className="text-xs font-semibold font-medium text-[var(--muted-foreground)]">{exp.date}</span>
                                </div>
                                <h4 className="font-bold text-sm text-[var(--foreground)]">{exp.title}</h4>
                                <div className="text-xs font-medium text-[var(--muted-foreground)]">
                                  <span>ফান্ড: <strong className="text-[var(--foreground)]">{exp.fundNameBn}</strong></span> • 
                                  <span> মেমো: {exp.memoDetails}</span>
                                </div>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <span className="text-base font-extrabold text-rose-700 dark:text-rose-400 font-bold font-mono">
                                  ৳{exp.amount.toLocaleString('bn-BD')}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                    exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                      : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                  }`}
                                >
                                  {exp.status === 'APPROVED' ? 'অনুমোদিত' : exp.status === 'ADJUSTED' ? 'সমন্বয়কৃত' : 'মুহতামিমের স্বাক্ষরের অপেক্ষায়'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 3: TEACHERS & STAFF PAYROLL (ওস্তাদ ও স্টাফদের বেতন) */}
                  {expensePortal === 'TEACHER_SALARY' && (
                    <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-3">
                        <div>
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            ওস্তাদ ও স্টাফদের বেতন
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            অক্টোবর ২০২৬ সেশন — শিক্ষক ও কর্মচারীদের মাসিক বেতন ও পেরোল বিতরণ
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDisbursePayroll()}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>সকলের বেতন একসঙ্গে বিতরণ করুন</span>
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold">
                              <th className="p-2.5">আইডি ও পদবি</th>
                              <th className="p-2.5">উস্তাদের নাম</th>
                              <th className="p-2.5 text-right">মূল বেতন</th>
                              <th className="p-2.5 text-right">ভাতা</th>
                              <th className="p-2.5 text-right">কর্তন</th>
                              <th className="p-2.5 text-right">নিট প্রদেয়</th>
                              <th className="p-2.5 text-center">স্ট্যাটাস</th>
                              <th className="p-2.5 text-right">স্যালারি স্লিপ / অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {payrollItems.map((p) => (
                              <tr key={p.id} className="hover:bg-[var(--background)]/50 transition">
                                <td className="p-2.5">
                                  <span className="font-mono font-bold text-[var(--primary)]">{p.teacherId}</span>
                                  <span className="block text-xs font-semibold text-[var(--muted-foreground)]">{p.designation}</span>
                                </td>
                                <td className="p-2.5 font-bold text-[var(--foreground)]">{p.teacherNameBn}</td>
                                <td className="p-2.5 text-right font-mono">৳{p.baseSalary.toLocaleString('bn-BD')}</td>
                                <td className="p-2.5 text-right font-mono text-emerald-700 dark:text-emerald-400 font-bold">+৳{p.allowances.toLocaleString('bn-BD')}</td>
                                <td className="p-2.5 text-right font-mono text-rose-700 dark:text-rose-400 font-bold">-৳{p.deductions.toLocaleString('bn-BD')}</td>
                                <td className="p-2.5 text-right font-mono font-black text-purple-500 text-xs">
                                  ৳{p.netPayable.toLocaleString('bn-BD')}
                                </td>
                                <td className="p-2.5 text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                      p.status === 'DISBURSED'
                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                        : p.status === 'APPROVED'
                                        ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                        : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                    }`}
                                  >
                                    {p.status === 'DISBURSED' ? 'পরিশোধিত' : p.status === 'APPROVED' ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
                                  </span>
                                </td>
                                <td className="p-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setActiveSalarySlip(p)}
                                      className="px-2.5 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] text-xs font-medium font-semibold text-[var(--foreground)] flex items-center gap-1 transition shadow-xs"
                                    >
                                      <FileText className="w-3 h-3 text-purple-500" />
                                      <span>স্লিপ</span>
                                    </button>
                                    {p.status !== 'DISBURSED' && (
                                      <button
                                        onClick={() => handleDisbursePayroll(p.id)}
                                        className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium font-bold transition shadow-xs"
                                      >
                                        বিতরণ
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 4: WELFARE & MEDICAL AID (ছাত্র কল্যাণ ও চিকিৎসা অনুদান) */}
                  {expensePortal === 'WELFARE_AID' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="pb-3 border-b border-[var(--border)]">
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <HeartHandshake className="w-4 h-4 text-rose-700 dark:text-rose-400 font-bold" />
                            ছাত্র কল্যাণ ও চিকিৎসা অনুদান
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            ১০০% শরীয়াহসম্মত যাকাত ও লিল্লাহ ফান্ড থেকে অসুস্থ ও অসচ্ছল ছাত্রদের আর্থিক অনুদান
                          </p>
                        </div>

                        <form onSubmit={handleAddWelfareExpense} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              সাহায্য গ্রহণকারীর নাম (ছাত্র / কর্মচারী):
                            </label>
                            <input
                              type="text"
                              required
                              value={welfareStudentName}
                              onChange={(e) => setWelfareStudentName(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              সহায়তার কারণ ও বিবরণ:
                            </label>
                            <textarea
                              rows={2}
                              required
                              value={welfareReason}
                              onChange={(e) => setWelfareReason(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                অনুদানের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={10}
                                value={newExpenseAmount}
                                onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                কোন ফান্ড থেকে অর্থ ছাড় হবে:
                              </label>
                              <select
                                value={welfareFundId}
                                onChange={(e) => setWelfareFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} (৳{f.balance.toLocaleString('bn-BD')})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {newExpenseAmount >= approvalThresholdLimit && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium font-semibold flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                সহায়তার পরিমাণ (৳{newExpenseAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন লিমিট (৳{approvalThresholdLimit.toLocaleString('bn-BD')}) এর বেশি হওয়ায় মুহতামিমের অনুমোদন বোর্ডে দাখিল হবে।
                              </span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>ছাত্র কল্যাণ ও চিকিৎসা অনুদান নিশ্চিত করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Recent Welfare Aid Feed */}
                      <div className="lg:col-span-2 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div>
                            <h3 className="font-bold text-sm text-[var(--foreground)]">সাম্প্রতিক কল্যাণ ও চিকিৎসা সাহায্য ভাউচার</h3>
                            <p className="text-xs text-[var(--muted-foreground)]">এতিম ও অসচ্ছল তালিবুল ইলমদের অনুদান রেকর্ড</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 font-bold">
                            মোট: {expenseVouchers.filter(e => e.category === 'WELFARE_AID').length} টি
                          </span>
                        </div>

                        <div className="space-y-3">
                          {expenseVouchers.filter(e => e.category === 'WELFARE_AID').map((exp) => (
                            <div
                              key={exp.id}
                              className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-rose-700 dark:text-rose-400 font-bold text-xs font-medium">{exp.voucherNo}</span>
                                  <span className="text-xs font-semibold font-medium text-[var(--muted-foreground)]">{exp.date}</span>
                                </div>
                                <h4 className="font-bold text-sm text-[var(--foreground)]">{exp.title}</h4>
                                <div className="text-xs font-medium text-[var(--muted-foreground)]">
                                  <span>ফান্ড: <strong className="text-[var(--foreground)]">{exp.fundNameBn}</strong></span> • 
                                  <span> {exp.memoDetails}</span>
                                </div>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <span className="text-base font-extrabold text-rose-700 dark:text-rose-400 font-bold font-mono">
                                  ৳{exp.amount.toLocaleString('bn-BD')}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                    exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                      : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                  }`}
                                >
                                  {exp.status === 'APPROVED' ? 'অনুমোদিত' : 'মুহতামিমের অনুমোদনের অপেক্ষায়'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 5: UTILITY & ADMIN BILLS (বিদ্যুৎ ও প্রশাসনিক ইউটিলিটি) */}
                  {expensePortal === 'UTILITY_ADMIN' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="pb-3 border-b border-[var(--border)]">
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Zap className="w-4 h-4 text-blue-500" />
                            বিদ্যুৎ ও প্রশাসনিক ইউটিলিটি
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            বিদ্যুৎ, গ্যাস, ইন্টারনেট বিল ও অফিসিয়াল মনিহারি খরচ
                          </p>
                        </div>

                        <form onSubmit={handleAddUtilityExpense} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              বিলের বিবরণ / খাত:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="যেমন: পল্লী বিদ্যুৎ অক্টোবর মাসের ক্যাম্পাসের বিদ্যুৎ বিল পরিশোধ"
                              value={newExpenseTitle}
                              onChange={(e) => setNewExpenseTitle(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                প্রতিষ্ঠান / সার্ভিস প্রোভাইডার:
                              </label>
                              <input
                                type="text"
                                required
                                value={utilityProvider}
                                onChange={(e) => setUtilityProvider(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                পে-বিল ট্রানজেকশন / মেমো নং:
                              </label>
                              <input
                                type="text"
                                required
                                value={utilityTxnRef}
                                onChange={(e) => setUtilityTxnRef(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                বিলের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={10}
                                value={newExpenseAmount}
                                onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                কোন ফান্ড থেকে পরিশোধ হবে:
                              </label>
                              <select
                                value={utilityFundId}
                                onChange={(e) => setUtilityFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} (৳{f.balance.toLocaleString('bn-BD')})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {newExpenseAmount >= approvalThresholdLimit && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium font-semibold flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                ইউটিলিটি বিল (৳{newExpenseAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন লিমিট (৳{approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি স্বয়ংক্রিয়ভাবে মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হবে।
                              </span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>বিদ্যুৎ ও প্রশাসনিক বিল পরিশোধ নিশ্চিত করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Recent Utility Expenses Feed */}
                      <div className="lg:col-span-2 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div>
                            <h3 className="font-bold text-sm text-[var(--foreground)]">সাম্প্রতিক ইউটিলিটি ও পরিচালনা ভাউচার</h3>
                            <p className="text-xs text-[var(--muted-foreground)]">বিদ্যুৎ, গ্যাস ও দাপ্তরিক বিল পেমেন্ট চালান</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-blue-500">
                            মোট: {expenseVouchers.filter(e => e.category === 'UTILITY' || e.category === 'STATIONERY').length} টি
                          </span>
                        </div>

                        <div className="space-y-3">
                          {expenseVouchers.filter(e => e.category === 'UTILITY' || e.category === 'STATIONERY').map((exp) => (
                            <div
                              key={exp.id}
                              className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-blue-500 text-xs font-medium">{exp.voucherNo}</span>
                                  <span className="text-xs font-semibold font-medium text-[var(--muted-foreground)]">{exp.date}</span>
                                </div>
                                <h4 className="font-bold text-sm text-[var(--foreground)]">{exp.title}</h4>
                                <div className="text-xs font-medium text-[var(--muted-foreground)]">
                                  <span>ফান্ড: <strong className="text-[var(--foreground)]">{exp.fundNameBn}</strong></span> • 
                                  <span> মেমো: {exp.memoDetails}</span>
                                </div>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <span className="text-base font-extrabold text-rose-700 dark:text-rose-400 font-bold font-mono">
                                  ৳{exp.amount.toLocaleString('bn-BD')}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                    exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                      : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                  }`}
                                >
                                  {exp.status === 'APPROVED' ? 'অনুমোদিত' : 'মুহতামিমের অনুমোদনের অপেক্ষায়'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 6: EVENT & CONFERENCE (ইভেন্ট ও মাহফিল খরচ) */}
                  {expensePortal === 'EVENT_CONFERENCE' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="pb-3 border-b border-[var(--border)]">
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Megaphone className="w-4 h-4 text-teal-500" />
                            ইভেন্ট ও মাহফিল খরচ
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            বার্ষিক ওয়াজ মাহফিল, দস্তারবন্দী ও কেরাত মাহফিলের ব্যয় ভাউচার
                          </p>
                        </div>

                        <form onSubmit={handleAddEventExpense} className="space-y-3.5 text-xs">
                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              ইভেন্ট / সম্মেলনের নাম:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="যেমন: বার্ষিক ওয়াজ মাহফিল ও দস্তারবন্দী পাগড়ি সম্মেলন"
                              value={eventExpenseTitle}
                              onChange={(e) => setEventExpenseTitle(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                খরচের উপ-খাত:
                              </label>
                              <select
                                value={eventSubHead}
                                onChange={(e) => setEventSubHead(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                <option value="প্যান্ডেল, স্টেজ ও মাইক সাউন্ড সিস্টেম ভাড়া">প্যান্ডেল ও সাউন্ড সিস্টেম</option>
                                <option value="মেহমান ও ওলামায়ে কেরামের হাদিয়া">মেহমান ওলামা হাদিয়া</option>
                                <option value="খানা-পিনা, আপ্যায়ন ও তাবাররুক">খানা-পিনা ও তাবাররুক</option>
                                <option value="প্রচারণা, মাইকিং ও পোস্টার/ব্যানার">প্রচারণা ও পোস্টারিং</option>
                                <option value="স্বেচ্ছাসেবক ব্যবস্থাপনা ও নিরাপত্তা">স্বেচ্ছাসেবক ও নিরাপত্তা</option>
                                <option value="অন্যান্য আনুষঙ্গিক খরচ">অন্যান্য বিবিধ খরচ</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                মাহফিল আহ্বায়ক / ইনচার্জ:
                              </label>
                              <input
                                type="text"
                                required
                                value={eventConvener}
                                onChange={(e) => setEventConvener(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              মেমো ও ভাউচার বিবরণ:
                            </label>
                            <input
                              type="text"
                              required
                              value={eventMemoNo}
                              onChange={(e) => setEventMemoNo(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                খরচের পরিমাণ (৳):
                              </label>
                              <input
                                type="number"
                                required
                                min={50}
                                value={eventAmount}
                                onChange={(e) => setEventAmount(Number(e.target.value))}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                                ফান্ড নির্বাচন:
                              </label>
                              <select
                                value={eventFundId}
                                onChange={(e) => setEventFundId(e.target.value)}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              >
                                {shariahFunds.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.nameBn} (৳{f.balance.toLocaleString('bn-BD')})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {eventAmount >= approvalThresholdLimit && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium font-semibold flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>
                                ইভেন্ট ব্যয়ের পরিমাণ (৳{eventAmount.toLocaleString('bn-BD')}) নির্ধারিত অনুমোদন লিমিট (৳{approvalThresholdLimit.toLocaleString('bn-BD')}) এর সমান বা বেশি হওয়ায় এটি সরাসরি মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হবে এবং মুহতামিমের পারমিশন ছাড়া তহবিল থেকে টাকা ছাড় হবে না।
                              </span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Megaphone className="w-3.5 h-3.5" />
                            <span>ইভেন্ট ব্যয় ভাউচার দাখিল করুন</span>
                          </button>
                        </form>
                      </div>

                      {/* Recent Event Expenses Feed */}
                      <div className="lg:col-span-2 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <div>
                            <h3 className="font-bold text-sm text-[var(--foreground)]">বার্ষিক ইভেন্ট ও মাহফিল ব্যয়ের খতিয়ান</h3>
                            <p className="text-xs text-[var(--muted-foreground)]">সম্মেলন ও মাহফিল পরিচালনা ভাউচারসমূহ</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-teal-600">
                            মোট: {expenseVouchers.filter((e) => e.category === 'EVENT_CONFERENCE').length} টি
                          </span>
                        </div>

                        <div className="space-y-3">
                          {expenseVouchers
                            .filter((e) => e.category === 'EVENT_CONFERENCE')
                            .map((exp) => (
                              <div
                                key={exp.id}
                                className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-teal-600 text-xs font-medium">{exp.voucherNo}</span>
                                    <span className="text-xs font-semibold font-medium text-[var(--muted-foreground)]">{exp.date}</span>
                                  </div>
                                  <h4 className="font-bold text-sm text-[var(--foreground)]">{exp.title}</h4>
                                  <div className="text-xs font-medium text-[var(--muted-foreground)]">
                                    <span>আহ্বায়ক: <strong className="text-[var(--foreground)]">{exp.requesterStaff}</strong></span> • 
                                    <span> ফান্ড: <strong className="text-[var(--foreground)]">{exp.fundNameBn}</strong></span> • 
                                    <span> মেমো: {exp.memoDetails}</span>
                                  </div>
                                </div>
                                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                  <span className="text-base font-extrabold text-rose-700 dark:text-rose-400 font-bold font-mono">
                                    ৳{exp.amount.toLocaleString('bn-BD')}
                                  </span>
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                      exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                        : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                    }`}
                                  >
                                    {exp.status === 'APPROVED' ? 'অনুমোদিত' : 'মুহতামিমের অনুমোদনের অপেক্ষায়'}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PORTAL 7: EXPENSE LIST (সকল ব্যয়ের তালিকা) */}
                  {expensePortal === 'EXPENSE_LIST' && (
                    <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-3">
                        <div>
                          <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                            সকল ব্যয়ের তালিকা
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            মেস বাজার, মেরামত, বেতন ও ইউটিলিটি সহ সকল খরচের সমন্বিত ভাউচার খাতা
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">
                            মোট ভাউচার: {expenseVouchers.length} টি
                          </span>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold">
                              <th className="p-2.5">ভাউচার নং</th>
                              <th className="p-2.5">ব্যয়ের বিবরণ</th>
                              <th className="p-2.5">খাত / ক্যাটাগরি</th>
                              <th className="p-2.5">উৎস ফান্ড</th>
                              <th className="p-2.5">রিকুইজিশনকারী</th>
                              <th className="p-2.5 text-right">টাকার পরিমাণ</th>
                              <th className="p-2.5 text-center">স্ট্যাটাস</th>
                              <th className="p-2.5 text-right">মুহতামিম অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {expenseVouchers.map((exp) => (
                              <tr key={exp.id} className="hover:bg-[var(--background)]/50 transition">
                                <td className="p-2.5 font-mono font-bold text-amber-800 dark:text-amber-400 font-bold">{exp.voucherNo}</td>
                                <td className="p-2.5 font-bold text-[var(--foreground)]">
                                  {exp.title}
                                  <span className="block text-xs font-semibold text-[var(--muted-foreground)]">{exp.memoDetails}</span>
                                </td>
                                <td className="p-2.5">
                                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold font-semibold bg-[var(--background)] border border-[var(--border)]">
                                    {exp.categoryBn}
                                  </span>
                                </td>
                                <td className="p-2.5 font-medium text-emerald-700 dark:text-emerald-400 font-bold">{exp.fundNameBn}</td>
                                <td className="p-2.5 text-[var(--foreground)]">{exp.requesterStaff}</td>
                                <td className="p-2.5 text-right font-black text-rose-700 dark:text-rose-400 font-bold font-mono text-xs">
                                  ৳{exp.amount.toLocaleString('bn-BD')}
                                </td>
                                <td className="p-2.5 text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold font-bold ${
                                      exp.status === 'APPROVED' || exp.status === 'ADJUSTED'
                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20'
                                        : 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20'
                                    }`}
                                  >
                                    {exp.status === 'APPROVED' ? 'অনুমোদিত' : exp.status === 'ADJUSTED' ? 'সমন্বয়কৃত' : 'মুহতামিমের স্বাক্ষরের অপেক্ষায়'}
                                  </span>
                                </td>
                                <td className="p-2.5 text-right">
                                  {exp.status === 'SUBMITTED' ? (
                                    <button
                                      onClick={() => handleApproveExpense(exp.id)}
                                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-medium shadow-xs transition"
                                    >
                                      অনুমোদন ও অর্থ ছাড়
                                    </button>
                                  ) : (
                                    <span className="text-xs font-medium text-[var(--muted-foreground)]">সম্পন্ন</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* PILLAR 3: DAY-END CASH CLOSING & MULTI-DIMENSIONAL AUDIT REPORTS          */}
              {/* ========================================================================= */}
              <div className="space-y-4 pt-2">
                {/* Row 1: আজকের দিনের হিসাব ও ক্যাশ কাউন্টার ক্লোজিং (Collapsible Single-Row Button) */}
                  <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm overflow-hidden transition">
                    <button
                      type="button"
                      onClick={() => setShowDailyClosingDetails(!showDailyClosingDetails)}
                      className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-[var(--background)]/50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-[var(--foreground)] flex items-center gap-2">
                            আজকের দিনের লেনদেন ও ক্যাশ কাউন্টার ক্লোজিং
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            সিস্টেম মোট আদায় বনাম ক্যাশ ড্রয়ারের নগদ টাকা মিলিয়ে দিনশেষের ক্লোজিং
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-auto sm:ml-0">
                        <div className="hidden md:flex items-center gap-2 text-xs">
                          <span className="px-3 py-1 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                            আজকের নগদ: <strong className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">৳{completedPayments.filter(p => p.paymentMethod === 'CASH').reduce((s, p) => s + p.netPaid, 0).toLocaleString('bn-BD')}</strong>
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                            ডিজিটাল: <strong className="text-blue-500 font-mono">৳{completedPayments.filter(p => p.paymentMethod !== 'CASH').reduce((s, p) => s + p.netPaid, 0).toLocaleString('bn-BD')}</strong>
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20">
                          {showDailyClosingDetails ? 'সংক্ষেপ করুন ▲' : 'হিসাব ক্লোজ করুন ও বিস্তারিত দেখুন ▼'}
                        </span>
                      </div>
                    </button>

                    {showDailyClosingDetails && (
                      <div className="p-6 pt-3 border-t border-[var(--border)] space-y-4 animate-in fade-in">
                        {closingFeedbackMsg && (
                          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold font-bold text-xs flex items-center gap-2 animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{closingFeedbackMsg}</span>
                          </div>
                        )}

                        <form onSubmit={handleSubmitDailyClosing} className="space-y-4 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <div>
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block font-semibold">আজকের নগদ আদায় (System Cash):</span>
                              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                                ৳{completedPayments.filter(p => p.paymentMethod === 'CASH').reduce((s, p) => s + p.netPaid, 0).toLocaleString('bn-BD')}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block font-semibold">আজকের অনলাইন আদায় (bKash/Nagad):</span>
                              <span className="text-base font-extrabold text-blue-500 font-mono">
                                ৳{completedPayments.filter(p => p.paymentMethod !== 'CASH').reduce((s, p) => s + p.netPaid, 0).toLocaleString('bn-BD')}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-[var(--muted-foreground)] block font-semibold">মোট সর্বমোট আদায় (Grand Total):</span>
                              <span className="text-base font-black text-purple-500 font-mono">
                                ৳{completedPayments.reduce((s, p) => s + p.netPaid, 0).toLocaleString('bn-BD')}
                              </span>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-[var(--muted-foreground)] font-semibold mb-1">
                                ক্যাশ ড্রয়ারে রক্ষিত নগদ টাকা:
                              </label>
                              <input
                                type="number"
                                required
                                value={closingHandCash}
                                onChange={(e) => setClosingHandCash(e.target.value)}
                                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[var(--muted-foreground)] font-semibold mb-1">
                              দিনশেষের হিসাব সমন্বয় নোট / পর্যবেক্ষণ (মুহতামিম সাহেবের জন্য):
                            </label>
                            <textarea
                              rows={2}
                              value={closingNotes}
                              onChange={(e) => setClosingNotes(e.target.value)}
                              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] resize-none"
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-medium text-[var(--muted-foreground)]">
                              দায়িত্বপ্রাপ্ত হিসাবরক্ষক: <strong>মাওলানা কাসেম মাহমুদ</strong>
                            </span>
                            <button
                              type="submit"
                              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>মুহতামিম বরাবর দিনশেষের ক্লোজিং রিপোর্ট প্রেরণ করুন</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Row 2: বহুমাত্রিক আর্থিক রিপোর্ট সেন্টার (Collapsible Row with Left-Buttons & Right Dynamic Inputs) */}
                  <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm overflow-hidden transition">
                    <button
                      type="button"
                      onClick={() => setShowReportDetails(!showReportDetails)}
                      className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-[var(--background)]/50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                          <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-[var(--foreground)] flex items-center gap-2">
                            বহুমাত্রিক আর্থিক রিপোর্ট সেন্টার (রিপোর্ট দেখুন ও তৈরি করুন)
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            দৈনিক, এক সপ্তাহ, এক মাস, ছয় মাস, বাৎসরিক বা প্রয়োজন অনুযায়ী কাস্টমাইজড সময়সীমার আয়-ব্যয় রিপোর্ট
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-3.5 py-1.5 rounded-xl border border-blue-500/20 ml-auto sm:ml-0 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{showReportDetails ? 'রিপোর্ট প্যানেল সংক্ষেপ করুন ▲' : 'রিপোর্ট ফিল্টার ও তৈরি করুন ▼'}</span>
                      </span>
                    </button>

                    {showReportDetails && (
                      <div className="p-6 pt-3 border-t border-[var(--border)] space-y-5 animate-in fade-in">
                        {/* 1. Side-by-Side Filter: Left Buttons & Right Dynamic Form */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                          {/* Left Column: Period Selection Buttons (4 cols) */}
                          <div className="md:col-span-4 flex flex-col gap-2">
                            <span className="text-xs font-medium font-bold text-[var(--muted-foreground)] uppercase">
                              রিপোর্টের সময়সীমা নির্বাচন করুন:
                            </span>
                            {[
                              { key: 'DAILY', label: 'দৈনিক (একদিন)' },
                              { key: 'WEEKLY', label: 'এক সপ্তাহ (৭ দিন)' },
                              { key: 'MONTHLY', label: 'এক মাস (মাসিক)' },
                              { key: 'SIX_MONTHS', label: 'ছয় মাস (অর্ধ-বার্ষিক)' },
                              { key: 'YEARLY', label: 'এক বছর (বাৎসরিক)' },
                              { key: 'CUSTOM', label: 'প্রয়োজন অনুযায়ী (কাস্টমাইজ)' },
                            ].map((tab) => (
                              <button
                                key={tab.key}
                                type="button"
                                onClick={() => setReportFilterType(tab.key as any)}
                                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                                  reportFilterType === tab.key
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card)]/80'
                                }`}
                              >
                                <span>{tab.label}</span>
                                {reportFilterType === tab.key && <span>➔</span>}
                              </button>
                            ))}
                          </div>

                          {/* Right Column: Dynamic Input Options (8 cols) */}
                          <div className="md:col-span-8 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-center gap-3">
                            {reportFilterType === 'DAILY' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  কোন তারিখের রিপোর্ট চাচ্ছেন নির্বাচন করুন:
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                  <input
                                    type="date"
                                    value={reportSingleDate}
                                    onChange={(e) => setReportSingleDate(e.target.value)}
                                    className="bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-mono font-bold focus:outline-none focus:border-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setReportSingleDate('2026-10-20')}
                                    className="px-3 py-2 rounded-xl bg-blue-500/10 text-blue-600 font-bold text-xs hover:bg-blue-500/20 cursor-pointer"
                                  >
                                    আজকের তারিখ
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setReportSingleDate('2026-10-19')}
                                    className="px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-bold text-xs hover:bg-[var(--card)] cursor-pointer"
                                  >
                                    গতকালকের তারিখ
                                  </button>
                                </div>
                                <p className="text-xs font-medium text-[var(--muted-foreground)]">
                                  নির্বাচিত দিনের সকল নগদ ও ডিজিটাল লেনদেনের অডিট বিবরণী
                                </p>
                              </div>
                            )}

                            {reportFilterType === 'WEEKLY' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  সপ্তাহ সমাপ্তির শেষ তারিখ:
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                  <input
                                    type="date"
                                    value={reportSingleDate}
                                    onChange={(e) => setReportSingleDate(e.target.value)}
                                    className="bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-mono font-bold focus:outline-none focus:border-blue-500"
                                  />
                                  <span className="text-xs text-[var(--muted-foreground)]">
                                    (উক্ত তারিখ হতে পূর্ববর্তী ৭ দিনের সকল পুঞ্জীভূত আয় ও ব্যয়)
                                  </span>
                                </div>
                              </div>
                            )}

                            {reportFilterType === 'MONTHLY' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  কোন মাসের রিপোর্ট চাচ্ছেন নির্বাচন করুন:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] block mb-1">মাস ড্রপডাউন তালিকা:</span>
                                    <select
                                      value={reportSelectedMonth}
                                      onChange={(e) => setReportSelectedMonth(e.target.value)}
                                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-bold text-[var(--foreground)]"
                                    >
                                      <option value="2026-10">অক্টোবর ২০২৬ (চলতি মাস)</option>
                                      <option value="2026-09">সেপ্টেম্বর ২০২৬</option>
                                      <option value="2026-08">আগস্ট ২০২৬</option>
                                      <option value="2026-07">জুলাই ২০২৬</option>
                                      <option value="2026-06">জুন ২০২৬</option>
                                      <option value="2026-05">মে ২০২৬</option>
                                      <option value="2026-04">এপ্রিল ২০২৬</option>
                                      <option value="2026-03">মার্চ ২০২৬</option>
                                      <option value="2026-02">ফেব্রুয়ারি ২০২৬</option>
                                      <option value="2026-01">জানুয়ারি ২০২৬</option>
                                      <option value="2025-12">ডিসেম্বর ২০২৫</option>
                                      <option value="2025-11">নভেম্বর ২০২৫</option>
                                      <option value="2025-10">অক্টোবর ২০২৫</option>
                                    </select>
                                  </div>
                                  <div>
                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] block mb-1">অথবা সরাসরি ক্যালেন্ডার মাস:</span>
                                    <input
                                      type="month"
                                      value={reportSelectedMonth}
                                      onChange={(e) => setReportSelectedMonth(e.target.value)}
                                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-mono font-bold focus:outline-none focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {reportFilterType === 'SIX_MONTHS' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  কোন অর্ধ-বার্ষিক সেশনের রিপোর্ট চাচ্ছেন:
                                </label>
                                <select className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-bold">
                                  <option value="2026-H2">মে ২০২৬ - অক্টোবর ২০২৬ (চলতি ২য় অর্ধ-বার্ষিক)</option>
                                  <option value="2026-H1">নভেম্বর ২০২৫ - এপ্রিল ২০২৬ (১ম অর্ধ-বার্ষিক)</option>
                                  <option value="2025-H2">মে ২০২৫ - অক্টোবর ২০২৫ (পূর্ববর্তী বছর)</option>
                                </select>
                                <p className="text-xs font-medium text-[var(--muted-foreground)]">
                                  মাদ্রাসার ষান্মাসিক হিসাব নিরীক্ষা ও জাতীয় কওমি বোর্ড প্রতিবেদন
                                </p>
                              </div>
                            )}

                            {reportFilterType === 'YEARLY' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  কোন বছরের রিপোর্ট চাচ্ছেন নির্বাচন করুন:
                                </label>
                                <select
                                  value={reportSelectedYear}
                                  onChange={(e) => setReportSelectedYear(e.target.value)}
                                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-bold"
                                >
                                  <option value="2026">২০২৬ অর্থবছর (১৪৪৭-১৪৪৮ হিজরি শিক্ষাবর্ষ)</option>
                                  <option value="2025">২০২৫ অর্থবছর (১৪৪৬-১৪৪৭ হিজরি শিক্ষাবর্ষ)</option>
                                  <option value="2024">২০২৪ অর্থবছর (১৪৪৫-১৪৪৬ হিজরি শিক্ষাবর্ষ)</option>
                                  <option value="2023">২০২৩ অর্থবছর (১৪৪৪-১৪৪৫ হিজরি শিক্ষাবর্ষ)</option>
                                </select>
                                <p className="text-xs font-medium text-[var(--muted-foreground)]">
                                  সম্পূর্ণ শিক্ষাবর্ষের বার্ষিক বাজেট বনাম প্রকৃত আয়-ব্যয় অডিট
                                </p>
                              </div>
                            )}

                            {reportFilterType === 'CUSTOM' && (
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] block">
                                  কোন তারিখ থেকে কোন তারিখ পর্যন্ত চাচ্ছেন (শুরুর তারিখ ও শেষের তারিখ):
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] block mb-1">শুরুর তারিখ:</span>
                                    <input
                                      type="date"
                                      value={reportCustomStartDate}
                                      onChange={(e) => setReportCustomStartDate(e.target.value)}
                                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-mono font-bold focus:outline-none focus:border-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] block mb-1">শেষের তারিখ:</span>
                                    <input
                                      type="date"
                                      value={reportCustomEndDate}
                                      onChange={(e) => setReportCustomEndDate(e.target.value)}
                                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] font-mono font-bold focus:outline-none focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs font-medium text-blue-600 font-bold">
                                  আপনার প্রয়োজন অনুযায়ী যেকোনো সময়সীমার কাস্টমাইজড অডিট রিপোর্ট
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 2. সমন্বিত আর্থিক পরিসংখ্যান কার্ডস */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)] font-semibold block">নির্বাচিত সময়ে মোট আদায়:</span>
                            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-bold font-mono mt-0.5 block">
                              {reportFilterType === 'DAILY' ? '৳৫৪,৭০০' : '৳১,৮৫,৪০০'}
                            </span>
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">ছাত্র ফি ও অনুদান মিলিয়ে</span>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)] font-semibold block">নির্বাচিত সময়ে মোট ব্যয়:</span>
                            <span className="text-lg font-black text-rose-700 dark:text-rose-400 font-bold font-mono mt-0.5 block">
                              {reportFilterType === 'DAILY' ? '৳১৮,৫০০' : '৳৪৮,৮০০'}
                            </span>
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">মেস বাজার, মেরামত ও ইউটিলিটি</span>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)] font-semibold block">নিট উদ্বৃত্ত / সারপ্লাস:</span>
                            <span className="text-lg font-black text-blue-500 font-mono mt-0.5 block">
                              {reportFilterType === 'DAILY' ? '৳৩৬,২০০' : '৳১,৩৬,৬০০'}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-bold font-semibold">তহবিলে নিট স্থিতি রক্ষিত</span>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)] font-semibold block">বকেয়া ছাত্র ফি রেজিস্টার:</span>
                            <span className="text-lg font-black text-amber-800 dark:text-amber-400 font-bold font-mono mt-0.5 block">৳৪২,০০০</span>
                            <span className="text-xs font-semibold text-[var(--muted-foreground)]">২৮ জন শিক্ষার্থীর বকেয়া ফি</span>
                          </div>
                        </div>

                        {/* 3. এক্সপোর্ট ও প্রিন্ট অ্যাকশনসমূহ */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between border-t border-[var(--border)] gap-2">
                          <span className="text-xs font-medium text-[var(--muted-foreground)]">
                            বাংলা ফন্টে আন্তর্জাতিক অডিট ও জাতীয় শিক্ষাবোর্ড মানের প্রাতিষ্ঠানিক আর্থিক বিবরণী
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => alert(`নির্বাচিত সময়সীমার (${reportFilterType}) পূর্ণাঙ্গ অডিট রিপোর্ট PDF সফলভাবে প্রস্তুত হয়েছে!`)}
                              className="px-3.5 py-1.5 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 font-bold" />
                              <span>PDF রিপোর্ট</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => alert(`নির্বাচিত সময়সীমার (${reportFilterType}) সকল খাতের ডাটা সহ Excel স্প্রেডশীট (.xlsx) ডাউনলোড শুরু হয়েছে!`)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Excel রফতানি</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => window.print()}
                              className="px-3.5 py-1.5 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-blue-500" />
                              <span>প্রিন্ট ভিউ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: ACADEMIC & HIFZ MODULE                                              */}
          {/* ========================================================================= */}
          {activeNav === 'academic' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 px-3 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)] shadow-sm shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-500" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      হিফজুল কুরআন (৬০৪ পৃষ্ঠা) ও কওমি শিক্ষা ব্যবস্থাপনা
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      দৈনিক সবক, সবকী, আমুক্তা হিসাব, অফলাইন হাজিরা ও বেফাক বোর্ড মার্কশিট এক্সপোর্ট
                    </p>
                  </div>
                </div>
              </div>

              {/* Hifz Daily Progress Tracker Widget */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-bold text-[var(--foreground)]">দৈনিক হিফজুল কুরআন সবক এন্ট্রি (প্রকৃত ৬০৪ পৃষ্ঠা)</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--muted-foreground)]">ছাত্র বাছাই:</span>
                    <select
                      value={academicSabaqStudentReg}
                      onChange={(e) => setAcademicSabaqStudentReg(e.target.value)}
                      className="px-2.5 py-1 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)] focus:outline-none"
                    >
                      {registeredStudents.map((st) => (
                        <option key={st.registrationNo} value={st.registrationNo}>
                          {st.nameBn} ({st.roll}) - {st.classGradeBn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <div className="text-[var(--muted-foreground)] font-semibold">নতুন সবক (Sabaq)</div>
                    <input
                      type="text"
                      value={academicSabaqPage}
                      onChange={(e) => setAcademicSabaqPage(e.target.value)}
                      className="w-full mt-1.5 px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)]"
                    />
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-bold mt-1">সুরূপা ও তাজভীদ সহ শুদ্ধ পাঠ</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <div className="text-[var(--muted-foreground)] font-semibold">সাত সবকী (Sabki - সাম্প্রতিক)</div>
                    <input
                      type="text"
                      value={academicSabqiRange}
                      onChange={(e) => setAcademicSabqiRange(e.target.value)}
                      className="w-full mt-1.5 px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)]"
                    />
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] mt-1">গত ৫ দিনের পড়া রিভিশন</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <div className="text-[var(--muted-foreground)] font-semibold">আমুক্তা / মানজিল (Amukhta)</div>
                    <input
                      type="text"
                      value={academicAmukhta}
                      onChange={(e) => setAcademicAmukhta(e.target.value)}
                      className="w-full mt-1.5 px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)]"
                    />
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] mt-1">আগের মুখস্থ পারার শুনানি</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between">
                    <div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-bold font-semibold">মূল্যায়ন (কওমি গ্রেড)</div>
                      <select
                        value={hifzGrade}
                        onChange={(e) => setHifzGrade(e.target.value as any)}
                        className="w-full mt-1 px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-emerald-700 dark:text-emerald-400 font-bold focus:outline-none"
                      >
                        <option value="MUMTAZ">মুমতাজ (ممتاز) - এ+</option>
                        <option value="JAYYID_JIDDAN">জায়্যিদ জিদ্দান (جيد جداً) - এ</option>
                        <option value="JAYYID">জায়্যিদ (جيد) - বি</option>
                        <option value="MAQBUL">মাকবুল (مقبول) - পাস</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const st = registeredStudents.find((s) => s.registrationNo === academicSabaqStudentReg);
                        alert(`ছাত্র "${st ? st.nameBn : 'নির্বাচিত ছাত্র'}" এর জন্য আজকের সবক "${academicSabaqPage}" সফলভাবে সংরক্ষিত হয়েছে!`);
                      }}
                      className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition"
                    >
                      সবক সংরক্ষণ
                    </button>
                  </div>
                </div>
              </div>

              {/* Offline Attendance Sync & Befaq Board Export Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                      অফলাইন হাজিরা সিঙ্ক (IndexedDB ↔ Cloud)
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20 font-medium">
                      কনফ্লিক্ট-ফ্রি
                    </span>
                  </div>

                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    ইন্টারনেট না থাকলেও ট্যাবলেটে হাজিরা নেওয়া যাবে। ইন্টারনেট সংযোগ পেলেই স্বয়ংক্রিয়ভাবে ক্লাউডে সিঙ্ক হয়ে যাবে।
                  </p>

                  <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
                    <div className="text-xs">
                      <div className="text-[var(--foreground)] font-medium">অমীমাংসিত অফলাইন রেকর্ড: {offlineSyncCount} টি</div>
                      <div className="text-xs font-semibold text-[var(--muted-foreground)]">ডিভাইস আইডি: TAB-DHK-01</div>
                    </div>
                    <button
                      disabled={isSyncing || offlineSyncCount === 0}
                      onClick={() => {
                        setIsSyncing(true);
                        setTimeout(() => {
                          setOfflineSyncCount(0);
                          setIsSyncing(false);
                        }, 800);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50 text-xs font-medium flex items-center gap-1.5 transition"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? 'সিঙ্ক হচ্ছে...' : offlineSyncCount === 0 ? 'সব সিঙ্কড' : 'এখনই সিঙ্ক করুন'}
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                      বেফাকুল মাদারিসিল আরাবিয়া এক্সপোর্ট
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                      Befaq Qawmi Board
                    </span>
                  </div>

                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    মারহালা ভিত্তিক (ফযীলত, সানাবিয়া, মুতাওয়াসসিতা, ইবতিদাইয়্যাহ ও হিফজুল কুরআন) ছাত্র তালিকা এবং প্রাপ্ত নম্বর এক ক্লিকে বেফাক ফরম্যাটে ডাউনলোড করুন।
                  </p>

                  <button
                    onClick={() => setBefaqExportDownloaded(true)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    বেফাক বোর্ড মার্কশিট ও তালিকা এক্সপোর্ট করুন (CSV/Excel)
                  </button>

                  {befaqExportDownloaded && (
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-600 dark:text-blue-300 flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>বেফাক ফাইল প্রস্তুত: <strong>befaq_exam_export_2026.csv</strong> (স্বয়ংক্রিয় ডাউনলোড সফল)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: HOSTEL, MEALS & GATEPASS MODULE                                     */}
          {/* ========================================================================= */}
          {activeNav === 'hostel' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNav('madrasa_dashboard')}
                    className="p-2 px-3 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)] shadow-sm shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-800 dark:text-amber-400 font-bold" />
                    সকল বিভাগে ফিরুন
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                      <Bed className="w-5 h-5 text-amber-800 dark:text-amber-400 font-bold" />
                      ছাত্রাবাস রুম, খাবার ও ডিজিটাল কিউআর গেটপাস
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      লিল্লাহ ও সাধারণ তহবিলের খাবার পৃথকীকরণ এবং সিকিউরিটি গেট স্ক্যানার
                    </p>
                  </div>
                </div>
              </div>

              {/* Rooms and Daily Boarding Meals */}
              {(() => {
                const resStudents = registeredStudents.filter((s) => s.residentialStatus === 'RESIDENTIAL');
                const totalRes = resStudents.length;
                const mealActiveCount = resStudents.filter((s) => s.mealActive !== false).length;

                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                            <Bed className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                            ছাত্রাবাস রুম ও সিট বরাদ্দ
                          </h4>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] font-bold">
                            মোট আবাসিক ছাত্র: {totalRes} জন
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <div className="text-[var(--foreground)] font-semibold">আবু বকর (রা.) হল - রুম ১০১</div>
                            <div className="text-[var(--muted-foreground)] mt-1">রুম ধারণক্ষমতা: ২০ সিট</div>
                            <div className="text-emerald-700 dark:text-emerald-400 font-bold mt-1">
                              বরাদ্দ: {resStudents.filter((s) => s.roomNo === 'রুম ১০১').length} জন
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                            <div className="text-[var(--foreground)] font-semibold">উমর (রা.) হল - রুম ২০২</div>
                            <div className="text-[var(--muted-foreground)] mt-1">রুম ধারণক্ষমতা: ২৫ সিট</div>
                            <div className="text-amber-800 dark:text-amber-400 font-bold mt-1">
                              বরাদ্দ: {resStudents.filter((s) => s.roomNo === 'রুম ২০২').length} জন
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                          <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-amber-800 dark:text-amber-400 font-bold" />
                            দৈনিক মেস খাবার হিসাব (লাইভ বোর্ডিং খাদ্য রেজিস্ট্রি)
                          </h4>
                          <span className="text-xs font-semibold text-[var(--muted-foreground)]">আজকের সক্রিয় মিল: {mealActiveCount} জন</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center">
                            <div className="text-[var(--muted-foreground)]">সকাল (নাস্তা)</div>
                            <div className="font-bold text-[var(--foreground)] mt-1">{mealActiveCount} জন</div>
                            <div className="text-xs font-semibold text-purple-500 mt-0.5 font-medium">খানা প্রস্তুত</div>
                          </div>
                          <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center">
                            <div className="text-[var(--muted-foreground)]">দুপুর (মধ্যাহ্নভোজ)</div>
                            <div className="font-bold text-[var(--foreground)] mt-1">{mealActiveCount} জন</div>
                            <div className="text-xs font-semibold text-purple-500 mt-0.5 font-medium">খানা প্রস্তুত</div>
                          </div>
                          <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center">
                            <div className="text-[var(--muted-foreground)]">রাত (নৈশভোজ)</div>
                            <div className="font-bold text-[var(--foreground)] mt-1">{mealActiveCount} জন</div>
                            <div className="text-xs font-semibold text-purple-500 mt-0.5 font-medium">খানা প্রস্তুত</div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                          শরীয়াহ অডিট সম্মত: লিল্লাহ ফান্ড ও সাধারণ ফান্ডের খাবার রেজিস্ট্রি শতভাগ সমন্বিত।
                        </div>
                      </div>
                    </div>

                    {/* Hostel & Mess Students Table */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                        <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                          <Bed className="w-4 h-4 text-amber-800 dark:text-amber-400 font-bold" />
                          ছাত্রাবাস সিট ও বোর্ডিং মেস শিক্ষার্থী তালিকা ({resStudents.length} জন আবাসিক)
                        </h4>
                        <span className="text-xs text-[var(--muted-foreground)]">রুম বরাদ্দ ও খাবার স্ট্যাটাস</span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                            <tr>
                              <th className="p-3">রেজিস্ট্রেশন</th>
                              <th className="p-3">রোল</th>
                              <th className="p-3">ছাত্রের নাম ও পিতা</th>
                              <th className="p-3">জামাত</th>
                              <th className="p-3">রুম নং</th>
                              <th className="p-3">খাবার স্ট্যাটাস</th>
                              <th className="p-3 text-center">অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {resStudents.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="p-6 text-center text-[var(--muted-foreground)]">
                                  কোনো আবাসিক ছাত্র ডাটা নেই। ছাত্রকল্যাণ বিভাগ থেকে আবাসিক ছাত্র ভর্তি করুন।
                                </td>
                              </tr>
                            ) : (
                              resStudents.map((st) => (
                                <tr key={st.registrationNo} className="hover:bg-[var(--background)]/40 transition">
                                  <td className="p-3 font-mono font-bold text-amber-800 dark:text-amber-400">{st.registrationNo}</td>
                                  <td className="p-3 font-bold text-[var(--foreground)]">{st.roll}</td>
                                  <td className="p-3">
                                    <div className="font-bold text-[var(--foreground)]">{st.nameBn}</div>
                                    <div className="text-xs text-[var(--muted-foreground)]">{st.fatherNameBn}</div>
                                  </td>
                                  <td className="p-3 font-semibold text-[var(--foreground)]">{st.classGradeBn}</td>
                                  <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">{st.roomNo || 'রুম ১০১'}</td>
                                  <td className="p-3">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                                        st.mealActive !== false
                                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                          : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                      }`}
                                    >
                                      {st.mealActive !== false ? 'খাবার সক্রিয়' : 'খাবার বন্ধ'}
                                    </span>
                                  </td>
                                  <td className="p-3 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          setRegisteredStudents((prev) =>
                                            prev.map((s) =>
                                              s.registrationNo === st.registrationNo
                                                ? { ...s, mealActive: s.mealActive === false ? true : false }
                                                : s
                                            )
                                          );
                                        }}
                                        className="px-2 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-xs font-bold hover:bg-[var(--card)] transition"
                                      >
                                        মিল পরিবর্তন
                                      </button>
                                      <button
                                        onClick={() => {
                                          setGatepassStudent(`${st.nameBn} (${st.roll})`);
                                          setActiveGatepass({
                                            id: `GP-2026-${Math.floor(100 + Math.random() * 900)}`,
                                            student: `${st.nameBn} (${st.roll})`,
                                            qrToken: `TOKEN_GP_${st.registrationNo}`,
                                            status: 'ISSUED',
                                            expiry: 'সন্ধ্যা ৬:০০ ঘটিকা',
                                          });
                                        }}
                                        className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-xs"
                                      >
                                        গেটপাস
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}

              {/* Gatepass QR Generator & Verification */}
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                    ডিজিটাল গেটপাস ও কিউআর স্ক্যান সিস্টেম
                  </h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20 font-medium">
                    নিরাপদ সাইনড টোকেন
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[var(--muted-foreground)] mb-1">ছাত্র নির্বাচন বা নাম লিখুন</label>
                      <input
                        type="text"
                        value={gatepassStudent}
                        onChange={(e) => setGatepassStudent(e.target.value)}
                        placeholder="ছাত্রের নাম ও রোল..."
                        className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] font-bold"
                      />
                      <div className="flex items-center gap-1 flex-wrap pt-1.5">
                        <span className="text-[10px] text-[var(--muted-foreground)]">ছাত্র বাছাই:</span>
                        {registeredStudents.map((st) => (
                          <button
                            key={st.registrationNo}
                            type="button"
                            onClick={() => setGatepassStudent(`${st.nameBn} (${st.roll})`)}
                            className="text-[10px] px-2 py-0.5 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-amber-500 text-[var(--foreground)] transition font-mono"
                          >
                            {st.nameBn} ({st.roll})
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[var(--muted-foreground)] mb-1">বাহিরে যাওয়ার কারণ</label>
                      <input
                        type="text"
                        value={gatepassReason}
                        onChange={(e) => setGatepassReason(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setActiveGatepass({
                          id: `GP-2026-${Math.floor(100 + Math.random() * 900)}`,
                          student: gatepassStudent || 'মুহাম্মদ আব্দুল্লাহ (০১)',
                          qrToken: 'JWT_SIGNED_PASS_SECURE_TOKEN_XYZ',
                          status: 'ISSUED',
                          expiry: 'সন্ধ্যা ৬:০০ ঘটিকা',
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow hover:opacity-90 transition"
                    >
                      গেটপাস ইস্যু করুন ও QR কোড তৈরি করুন
                    </button>
                  </div>

                  {activeGatepass && (
                    <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col items-center text-center space-y-2">
                      <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center p-2 shadow">
                        <QrCode className="w-20 h-20 text-slate-900" />
                      </div>
                      <div className="text-xs font-bold text-[var(--foreground)]">{activeGatepass.student}</div>
                      <div className="text-xs font-semibold text-[var(--muted-foreground)]">পাস নং: {activeGatepass.id} | মেয়াদ: {activeGatepass.expiry}</div>
                      <div className="text-xs">
                        স্ট্যাটাস:{' '}
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 font-bold">
                          {activeGatepass.status === 'ISSUED' ? 'ইস্যু করা হয়েছে (মাদ্রাসায় বিদ্যমান)' :
                           activeGatepass.status === 'CHECKED_OUT' ? 'বাহিরে আছে (প্রস্থান নিশ্চিত)' : 'ফিরে এসেছে (প্রবেশ সম্পন্ন)'}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-1">
                        {activeGatepass.status === 'ISSUED' && (
                          <button
                            onClick={() => setActiveGatepass({ ...activeGatepass, status: 'CHECKED_OUT' })}
                            className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium font-medium"
                          >
                            গেট সিকিউরিটি: প্রস্থান মার্ক করুন
                          </button>
                        )}
                        {activeGatepass.status === 'CHECKED_OUT' && (
                          <button
                            onClick={() => setActiveGatepass({ ...activeGatepass, status: 'RETURNED' })}
                            className="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium font-medium"
                          >
                            গেট সিকিউরিটি: প্রত্যাবর্তন মার্ক করুন
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: MULTILINGUAL LIBRARY MODULE                                         */}
          {/* ========================================================================= */}
          {activeNav === 'library' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveNav('madrasa_dashboard')}
                      className="p-2 px-3 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)] shadow-sm shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 text-purple-500" />
                      সকল বিভাগে ফিরুন
                    </button>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        বহুভাষিক কিতাবখানা ক্যাটালগ (বাংলা, عربي, اردو)
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground)]">কওমি ও আলিয়া মাদ্রাসার কিতাবসমূহ সহজে সন্ধান ও ইস্যু করুন</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[var(--background)] p-1 rounded-xl text-xs border border-[var(--border)]">
                    <button
                      onClick={() => setLibrarySearchLang('ALL')}
                      className={`px-2.5 py-1 rounded-lg ${librarySearchLang === 'ALL' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--muted-foreground)]'}`}
                    >
                      সকল ভাষা
                    </button>
                    <button
                      onClick={() => setLibrarySearchLang('ar')}
                      className={`px-2.5 py-1 rounded-lg ${librarySearchLang === 'ar' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--muted-foreground)]'}`}
                    >
                      عربي
                    </button>
                    <button
                      onClick={() => setLibrarySearchLang('ur')}
                      className={`px-2.5 py-1 rounded-lg ${librarySearchLang === 'ur' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--muted-foreground)]'}`}
                    >
                      اردو
                    </button>
                    <button
                      onClick={() => setLibrarySearchLang('bn')}
                      className={`px-2.5 py-1 rounded-lg ${librarySearchLang === 'bn' ? 'bg-blue-600 text-white font-medium' : 'text-[var(--muted-foreground)]'}`}
                    >
                      বাংলা
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="কিতাবের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
                    value={librarySearchQuery}
                    onChange={(e) => setLibrarySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] text-[var(--muted-foreground)] uppercase">
                      <tr>
                        <th className="p-3">কিতাবের নাম</th>
                        <th className="p-3">মুসান্নিফ / লেখক</th>
                        <th className="p-3">ভাষা ও বিষয়</th>
                        <th className="p-3">তাক নম্বর</th>
                        <th className="p-3">মজুদ কপি</th>
                        <th className="p-3">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {books
                        .filter((b) => (librarySearchLang === 'ALL' ? true : b.language === librarySearchLang))
                        .filter((b) => (librarySearchQuery ? b.title.includes(librarySearchQuery) || b.author.includes(librarySearchQuery) : true))
                        .map((b) => (
                          <tr key={b.id} className="hover:bg-[var(--background)]/40 transition">
                            <td className="p-3 font-semibold text-[var(--foreground)]">{b.title}</td>
                            <td className="p-3 text-[var(--muted-foreground)]">{b.author}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] font-mono text-xs font-semibold">
                                {b.language.toUpperCase()} | {b.category}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[var(--muted-foreground)]">{b.rack}</td>
                            <td className="p-3">
                              <span className="font-bold text-emerald-700 dark:text-emerald-400 font-bold">{b.availableCopies}</span>
                              <span className="text-[var(--muted-foreground)] text-xs font-semibold"> / {b.totalCopies}</span>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => alert(`${b.title} কিতাবটি সফলভাবে ইস্যু করা হয়েছে!`)}
                                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium font-medium"
                              >
                                ইস্যু করুন
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: SMS & COMMUNICATION MODULE                                          */}
          {/* ========================================================================= */}
          {activeNav === 'sms' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveNav('madrasa_dashboard')}
                      className="p-2 px-3 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] transition text-xs font-semibold flex items-center gap-1.5 text-[var(--foreground)] shadow-sm shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold" />
                      সকল বিভাগে ফিরুন
                    </button>
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 text-emerald-700 dark:text-emerald-400 font-bold" />
                      <h3 className="text-base font-bold text-[var(--foreground)]">বিটিআরসি অনুমোদিত বাংলা এসএমএস ও নোটিশ কম্পোজার</h3>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono">BTRC 70-Char Unicode Calculation</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3 text-xs">
                    <div>
                      <label className="block text-[var(--muted-foreground)] mb-1">প্রাপক নির্বাচন করুন</label>
                      <select
                        value={smsRecipientType}
                        onChange={(e) => setSmsRecipientType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                      >
                        <option value="GUARDIANS">সকল ছাত্রের অভিভাবকবৃন্দ (১,৪৫০ জন)</option>
                        <option value="TEACHERS">উস্তাদ ও স্টাফবৃন্দ (৬৫ জন)</option>
                        <option value="ALL">সকল অভিভাবক ও উস্তাদ (১,৫১৫ জন)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[var(--muted-foreground)]">বার্তা লিখুন (বাংলা ইউনিকোড)</label>
                        <span className="text-xs font-medium font-mono text-emerald-700 dark:text-emerald-400 font-bold font-semibold">
                          {smsMetrics.chars} অক্ষর | {smsMetrics.parts} টি এসএমএস
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] text-xs leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setSmsSentNotice(`এসএমএস কিউতে যোগ করা হয়েছে! মোট ${smsMetrics.recipients} জন প্রাপকের কাছে পাঠানোর জন্য ব্যাকগ্রাউন্ড ওয়ার্কার কাজ করছে।`);
                        setTimeout(() => setSmsSentNotice(null), 5000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold flex items-center gap-2 hover:opacity-90 shadow transition"
                    >
                      <Send className="w-4 h-4" />
                      এসএমএস পাঠান
                    </button>

                    {smsSentNotice && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 font-bold shrink-0" />
                        <span>{smsSentNotice}</span>
                      </div>
                    )}
                  </div>

                  {/* Cost Preview Card */}
                  <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-3 text-xs shadow-inner">
                    <h4 className="font-bold text-[var(--foreground)] pb-2 border-b border-[var(--border)]">এসএমএস বাজেট ও খরচ প্রিভিউ</h4>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">মোট প্রাপক:</span>
                      <span className="font-bold text-[var(--foreground)]">{smsMetrics.recipients} জন</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">প্রতি প্রাপকে এসএমএস:</span>
                      <span className="font-bold text-[var(--foreground)]">{smsMetrics.parts} টি</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">প্রতি এসএমএস রেট:</span>
                      <span className="text-[var(--foreground)]">৳০.২৫ (২৫ পয়সা)</span>
                    </div>
                    <div className="pt-2 border-t border-[var(--border)] flex justify-between font-bold text-sm">
                      <span className="text-[var(--foreground)]">মোট খরচ:</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">৳{smsMetrics.cost}</span>
                    </div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] bg-[var(--card)] p-2.5 rounded-lg border border-[var(--border)]">
                      বিটিআরসি নিয়ম অনুযায়ী ৭০ অক্ষর পর্যন্ত ১টি এসএমএস, অতিরিক্ত অংশের ক্ষেত্রে ৬৭ অক্ষর গণনা করা হয়।
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: CLIENT SUPPORT MESSAGES                                             */}
          {/* ========================================================================= */}
          {activeNav === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 inline mr-1 text-teal-600 dark:text-teal-400" /> মাদ্রাসার সাপোর্ট ইনবক্স ও ক্লায়েন্ট মেসেজ
                  </h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    টেন্যান্ট মাদ্রাসাগুলোর সমস্যা সমাধান, প্রযুক্তিগত সহায়তা ও ফিডব্যাক
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/30 font-bold">
                  {tickets.length} টি সক্রিয় মেসেজ
                </span>
              </div>

              <div className="space-y-4">
                {tickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--primary)]">{tkt.madrasa}</span>
                        <span className="text-xs font-semibold text-[var(--muted-foreground)]">• {tkt.time}</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--foreground)] mt-1">{tkt.subject}</div>
                    </div>
                    <button
                      onClick={() => alert(`"${tkt.madrasa}" এর সাথে চ্যাট ও সমাধান উইন্ডো খোলা হচ্ছে...`)}
                      className="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold hover:opacity-90 shadow transition shrink-0"
                    >
                      উত্তর দিন (Reply)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW STUDENT                                                    */}
      {/* ========================================================================= */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                নতুন শিক্ষার্থী ভর্তি ফরম (Student Admission)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3">
              <div>
                <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">রেজিস্ট্রেশন নম্বর (ঐচ্ছিক, ফাঁকা রাখলে স্বয়ংক্রিয় তৈরি হবে)</label>
                <input
                  type="text"
                  placeholder="যেমন: REG-2026-0009"
                  value={newStudentRegNo}
                  onChange={(e) => setNewStudentRegNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">ছাত্রের পূর্ণ নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                    value={newStudentNameBn}
                    onChange={(e) => setNewStudentNameBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">রোল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ০১"
                    value={newStudentRoll}
                    onChange={(e) => setNewStudentRoll(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">পিতার নাম</label>
                  <input
                    type="text"
                    placeholder="পিতার নাম"
                    value={newStudentFatherNameBn}
                    onChange={(e) => setNewStudentFatherNameBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">মাতার নাম</label>
                  <input
                    type="text"
                    placeholder="মাতার নাম"
                    value={newStudentMotherNameBn}
                    onChange={(e) => setNewStudentMotherNameBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">ভর্তি জামাত / বিভাগ</label>
                  <select
                    value={newStudentClassBn}
                    onChange={(e) => setNewStudentClassBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  >
                    <option value="হিফজুল কুরআন বিভাগ (সমাপনী)">হিফজুল কুরআন বিভাগ (সমাপনী)</option>
                    <option value="হিফজুল কুরআন বিভাগ (হিফজ সমাপ্তি)">হিফজুল কুরআন বিভাগ (হিফজ সমাপ্তি)</option>
                    <option value="মিজান জামাত (কিতাব বিভাগ)">মিজান জামাত (কিতাব বিভাগ)</option>
                    <option value="কাফিয়া জামাত">কাফিয়া জামাত</option>
                    <option value="নাহবেমীর জামাত">নাহবেমীর জামাত</option>
                    <option value="দাওরায়ে হাদিস">দাওরায়ে হাদিস</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">আবাসন ধরন</label>
                  <select
                    value={newStudentResidential}
                    onChange={(e) => setNewStudentResidential(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-bold"
                  >
                    <option value="RESIDENTIAL">আবাসিক (হোস্টেল ও মেস খানা সহ)</option>
                    <option value="NON_RESIDENTIAL">অনাবাসিক (দৈনিক যাতায়াতকারী)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">হোস্টেল রুম (আবাসিক হলে)</label>
                  <input
                    type="text"
                    disabled={newStudentResidential === 'NON_RESIDENTIAL'}
                    value={newStudentResidential === 'NON_RESIDENTIAL' ? 'অনাবাসিক' : newStudentRoomNo}
                    onChange={(e) => setNewStudentRoomNo(e.target.value)}
                    placeholder="যেমন: রুম ১০১"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">রক্তের গ্রুপ</label>
                  <select
                    value={newStudentBloodGroup}
                    onChange={(e) => setNewStudentBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">অভিভাবকের মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="01700-000000"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">মাসিক প্রদেয় ফি (টাকা)</label>
                  <input
                    type="number"
                    value={newStudentFee}
                    onChange={(e) => setNewStudentFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow transition"
                >
                  ভর্তি নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW TEACHER                                                    */}
      {/* ========================================================================= */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                নতুন শিক্ষক প্রোফাইল যুক্ত করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowAddTeacherModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3">
              <div>
                <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">শিক্ষকের নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মাওলানা মুফতী মাহমুদুল হাসান"
                  value={newTeacherNameBn}
                  onChange={(e) => setNewTeacherNameBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">পদবী / দায়িত্ব</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মুহাদ্দিস ও মুদাররিস"
                    value={newTeacherDesignationBn}
                    onChange={(e) => setNewTeacherDesignationBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">বিভাগ</label>
                  <select
                    value={newTeacherDepartmentBn}
                    onChange={(e) => setNewTeacherDepartmentBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  >
                    <option value="কিতাব বিভাগ">কিতাব বিভাগ</option>
                    <option value="হিফজুল কুরআন বিভাগ">হিফজুল কুরআন বিভাগ</option>
                    <option value="হিসাব ও অর্থ বিভাগ">হিসাব ও অর্থ বিভাগ</option>
                    <option value="হোস্টেল ও মেস">হোস্টেল ও মেস</option>
                    <option value="প্রশাসন">প্রশাসন</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="01700-000000"
                    value={newTeacherPhone}
                    onChange={(e) => setNewTeacherPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">মাসিক বেতন (টাকা)</label>
                  <input
                    type="number"
                    value={newTeacherSalary}
                    onChange={(e) => setNewTeacherSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow transition"
                >
                  শিক্ষক সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW CLASS ROUTINE                                              */}
      {/* ========================================================================= */}
      {showAddRoutineModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                নতুন ক্লাস ও দরসি রুটিন তৈরি করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRoutineModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRoutine} className="space-y-3">
              <div>
                <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">দায়িত্বপ্রাপ্ত শিক্ষক নির্বাচন করুন *</label>
                <select
                  value={newRoutineTeacherId}
                  onChange={(e) => setNewRoutineTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-bold"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nameBn} ({t.designationBn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">জামাত / ক্লাস</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মিশকাত জামাত"
                    value={newRoutineClassBn}
                    onChange={(e) => setNewRoutineClassBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">কিতাব / বিষয়</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সহীহ বুখারী শরীফ"
                    value={newRoutineBookBn}
                    onChange={(e) => setNewRoutineBookBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">পিরিয়ড ও সময়সূচী</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১ম পিরিয়ড (সকাল ৮:০০ - ৯:০০)"
                    value={newRoutinePeriodBn}
                    onChange={(e) => setNewRoutinePeriodBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">কক্ষ / হল নং</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: দারুল হাদিস অডিটোরিয়াম"
                    value={newRoutineRoomBn}
                    onChange={(e) => setNewRoutineRoomBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] mb-1 font-semibold">দিন / বার</label>
                <input
                  type="text"
                  placeholder="যেমন: শনিবার - বৃহস্পতিবার"
                  value={newRoutineDayBn}
                  onChange={(e) => setNewRoutineDayBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddRoutineModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow transition"
                >
                  রুটিন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD NEW MADRASA                                                  */}
      {/* ========================================================================= */}
      {showAddMadrasaModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[var(--primary)]" />
                নতুন মাদ্রাসা যুক্ত করুন
              </h3>
              <button
                onClick={() => setShowAddMadrasaModal(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewMadrasa} className="space-y-3">
              <div>
                <label className="block text-[var(--muted-foreground)] mb-1">মাদ্রাসার নাম (বাংলায়)</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: জামিয়া রহমানিয়া আরাবিয়া ঢাকা"
                  value={newMadrasaName}
                  onChange={(e) => setNewMadrasaName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1">জেলা</label>
                  <select
                    value={newMadrasaDistrict}
                    onChange={(e) => setNewMadrasaDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="ঢাকা">ঢাকা</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="সিলেট">সিলেট</option>
                    <option value="রাজশাহী">রাজশাহী</option>
                    <option value="খুলনা">খুলনা</option>
                    <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] mb-1">মোট ছাত্র সংখ্যা</label>
                  <input
                    type="number"
                    value={newMadrasaStudents}
                    onChange={(e) => setNewMadrasaStudents(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] mb-1">সাবস্ক্রিপশন প্ল্যান</label>
                <select
                  value={newMadrasaPlan}
                  onChange={(e) => setNewMadrasaPlan(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="Basic">Basic (৳২,৫০০/মাস)</option>
                  <option value="Standard">Standard (৳৫,০০০/মাস)</option>
                  <option value="Enterprise">Enterprise (৳১৫,০০০/মাস)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold hover:opacity-90 transition shadow"
                >
                  যুক্ত করুন ও ডাটাবেস তৈরি করুন
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMadrasaModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]"
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CHANGE SUBSCRIPTION PLAN                                         */}
      {/* ========================================================================= */}
      {showPlanModalFor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                প্যাকেজ পরিবর্তন করুন
              </h3>
              <button
                onClick={() => setShowPlanModalFor(null)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                ✕
              </button>
            </div>

            <p className="text-[var(--muted-foreground)]">
              প্রতিষ্ঠান: <strong>{showPlanModalFor.nameBn}</strong>
            </p>

            <div className="space-y-2">
              {(['Basic', 'Standard', 'Enterprise'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => confirmPlanChange(p)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                    showPlanModalFor.plan === p
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold'
                      : 'border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)]'
                  }`}
                >
                  <div>
                    <div>{p} Plan</div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)]">
                      {p === 'Basic' ? '৳২,৫০০/মাস' : p === 'Standard' ? '৳৫,০০০/মাস' : '৳১৫,০০০/মাস'}
                    </div>
                  </div>
                  {showPlanModalFor.plan === p && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: DELETE MADRASA CONFIRMATION                                      */}
      {/* ========================================================================= */}
      {showDeleteModalFor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--card)] border border-red-500/40 rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto text-xl">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-sm text-[var(--foreground)]">মাদ্রাসাটি মুছে ফেলতে চান?</h3>
              <p className="text-[var(--muted-foreground)] text-xs font-medium leading-relaxed">
                আপনি <strong>"{showDeleteModalFor.nameBn}"</strong> কে সিস্টেম থেকে অপসারণ করতে যাচ্ছেন। এর ফলে উক্ত মাদ্রাসার টেন্যান্ট ডাটাবেস ও ইউজার অ্যাক্সেস নিষ্ক্রিয় হবে।
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={confirmDeleteMadrasa}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition shadow"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
              <button
                onClick={() => setShowDeleteModalFor(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]"
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DEPARTMENT ACCESS & STAFF ASSIGNMENT MODAL                       */}
      {/* ========================================================================= */}
      {showDeptAccessModalFor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-base text-[var(--foreground)]">
                  বিভাগীয় দায়িত্ব ও অ্যাক্সেস নির্ধারণ
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {showDeptAccessModalFor.nameBn} ({showDeptAccessModalFor.code})
                </p>
              </div>
              <button
                onClick={() => setShowDeptAccessModalFor(null)}
                className="text-lg font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDeptAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  দায়িত্বপ্রাপ্ত উস্তাদ / স্টাফের নাম:
                </label>
                <input
                  type="text"
                  required
                  value={assignStaffName}
                  onChange={(e) => setAssignStaffName(e.target.value)}
                  placeholder="যেমন: মাওলানা আব্দুল্লাহ"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  বিভাগীয় পদবি / ভূমিকা:
                </label>
                <input
                  type="text"
                  required
                  value={assignStaffRole}
                  onChange={(e) => setAssignStaffRole(e.target.value)}
                  placeholder="যেমন: প্রধান হিসাবরক্ষক / বিভাগীয় প্রধান"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  যোগাযোগ মোবাইল নম্বর:
                </label>
                <input
                  type="text"
                  value={assignStaffPhone}
                  onChange={(e) => setAssignStaffPhone(e.target.value)}
                  placeholder="01700-000000"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  অ্যাক্সেস স্ট্যাটাস:
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deptStatus"
                      checked={assignStaffStatus === 'ACTIVE'}
                      onChange={() => setAssignStaffStatus('ACTIVE')}
                    />
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold font-bold">সক্রিয় (Active)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deptStatus"
                      checked={assignStaffStatus === 'HOLD'}
                      onChange={() => setAssignStaffStatus('HOLD')}
                    />
                    <span className="text-amber-800 dark:text-amber-400 font-bold font-bold">সাময়িক স্থগিত (Hold)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowDeptAccessModalFor(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow hover:opacity-90 transition"
                >
                  সংরক্ষণ করুন ও অ্যাক্সেস দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Notice Composer Modal */}
      {showNoticeComposerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold flex items-center justify-center shadow-inner">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--foreground)]">
                    মুহতামিম সেন্ট্রাল নোটিশ জারি ও সম্প্রচার
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    সকল বা নির্দিষ্ট বিভাগে একযোগে প্রাতিষ্ঠানিক নির্দেশ জারি করুন
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNoticeComposerModal(false)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendAdminNotice} className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  নোটিশের শিরোনাম:
                </label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="যেমন: পবিত্র রমাদানুল মুবারক উপলক্ষে বিশেষ কর্মপরিকল্পনা ও সময়সূচী"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    নোটিশের অগ্রাধিকার (Priority):
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setNoticePriority('NORMAL')}
                      className={`flex-1 py-2 px-3 rounded-xl border text-center font-bold text-xs transition ${
                        noticePriority === 'NORMAL'
                          ? 'bg-blue-500/10 border-blue-500 text-blue-500 shadow-sm'
                          : 'border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]'
                      }`}
                    >
                      সাধারণ বিজ্ঞপ্তি
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoticePriority('URGENT')}
                      className={`flex-1 py-2 px-3 rounded-xl border text-center font-bold text-xs transition ${
                        noticePriority === 'URGENT'
                          ? 'bg-red-500/10 border-red-500 text-red-500 shadow-sm'
                          : 'border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]'
                      }`}
                    >
                      জরুরি / রেড এলার্ট
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    প্রেরক সিলমোহর:
                  </label>
                  <div className="px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    মুহতামিম ও প্রধান প্রশাসনিক দপ্তর
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[var(--foreground)] font-semibold">
                    কোন কোন বিভাগে জারি হবে? (বিভাগ নির্বাচন করুন):
                  </label>
                  <button
                    type="button"
                    onClick={() => handleToggleTargetDept('ALL')}
                    className={`text-xs font-medium font-bold px-2 py-0.5 rounded-lg border transition ${
                      noticeTargetDepts.includes('ALL')
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent'
                        : 'border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)]/10'
                    }`}
                  >
                    {noticeTargetDepts.includes('ALL') ? '✓ সকল বিভাগ নির্বাচিত' : 'সকল বিভাগ নির্বাচন করুন'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] max-h-40 overflow-y-auto">
                  {departments.map((dept) => {
                    const isChecked = noticeTargetDepts.includes('ALL') || noticeTargetDepts.includes(dept.id);
                    return (
                      <label
                        key={dept.id}
                        onClick={() => handleToggleTargetDept(dept.id)}
                        className={`flex items-center gap-2 p-1.5 rounded-xl border cursor-pointer text-xs font-medium transition ${
                          isChecked
                            ? 'bg-[var(--primary)]/10 border-[var(--primary)]/40 font-bold text-[var(--foreground)]'
                            : 'border-transparent text-[var(--muted-foreground)] hover:bg-[var(--card)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="rounded text-[var(--primary)] focus:ring-0"
                        />
                        <span className="truncate">{dept.nameBn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  নোটিশের বিস্তারিত বার্তা ও নির্দেশাবলী:
                </label>
                <textarea
                  required
                  rows={4}
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="এখানে নোটিশের পূর্ণ বিবরণ, করণীয় ও সময়সীমা স্পষ্টভাবে লিখুন..."
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowNoticeComposerModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-md hover:opacity-90 transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>নোটিশ জারি ও প্রচার করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Notice Detail Viewer Modal */}
      {activeNoticeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                    অফিসিয়াল প্রাতিষ্ঠানিক নোটিশ
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold font-bold ${
                        activeNoticeDetail.priority === 'URGENT'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}
                    >
                      {activeNoticeDetail.priority === 'URGENT' ? 'জরুরি নোটিশ' : 'সাধারণ বিজ্ঞপ্তি'}
                    </span>
                    <span className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeNoticeDetail.createdAt}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveNoticeDetail(null)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)] leading-snug">
                  {activeNoticeDetail.title}
                </h3>
                <div className="mt-2 p-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs font-medium">
                  <span className="text-[var(--muted-foreground)] font-medium">প্রেরণকৃত আওতাভুক্ত বিভাগসমূহ: </span>
                  <span className="font-bold text-[var(--primary)]">{activeNoticeDetail.targetDeptNames}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--background)]/60 border border-[var(--border)] text-xs text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                {activeNoticeDetail.content}
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-medium text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                  ডিজিটাল সিলমোহর: {activeNoticeDetail.sender}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveNoticeDetail(null)}
                  className="px-4 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-semibold transition"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Policy Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">নতুন রুলস / পলিসি প্রণয়ন করুন</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">মাদ্রাসার প্রশাসনিক ও বিভাগীয় নীতিমালা ডাটাবেস</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddRuleModal(false)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePolicyRule} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                    রুল কোড (ঐচ্ছিক):
                  </label>
                  <input
                    type="text"
                    value={newRuleCode}
                    onChange={(e) => setNewRuleCode(e.target.value)}
                    placeholder={`POL-0${policyRules.length + 1}`}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                    সংশ্লিষ্ট মডিউল / বিভাগ:
                  </label>
                  <select
                    value={newRuleModule}
                    onChange={(e) => setNewRuleModule(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    <option value="হিসাব বিভাগ">হিসাব বিভাগ</option>
                    <option value="তালিমাত ও হিফজ">তালিমাত ও হিফজ</option>
                    <option value="শিক্ষক প্যানেল">শিক্ষক প্যানেল</option>
                    <option value="হোস্টেল ও মেস">হোস্টেল ও মেস</option>
                    <option value="নিরাপত্তা বিভাগ">নিরাপত্তা বিভাগ</option>
                    <option value="সাধারণ প্রশাসন">সাধারণ প্রশাসন</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  রুলসের শিরোনাম:
                </label>
                <input
                  type="text"
                  required
                  value={newRuleTitle}
                  onChange={(e) => setNewRuleTitle(e.target.value)}
                  placeholder="যেমন: আবাসিক ছাত্রদের সাপ্তাহিক ছুটি নীতিমালা"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  নীতিমালার ধারা ও বিস্তারিত বিবরণ:
                </label>
                <textarea
                  required
                  rows={3}
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  placeholder="নিয়মাবলী বিস্তারিত উল্লেখ করুন..."
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold shadow hover:bg-violet-700 transition"
                >
                  রুলস যুক্ত ও কার্যকর করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Grant Staff Permission Modal */}
      {showGrantPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">নতুন স্টাফ পারমিশন দিন</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">নির্দিষ্ট বিভাগে উস্তাদ / কর্মীকে দায়িত্ব বরাদ্দ দিন</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGrantPermissionModal(false)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGrantStaffPermission} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  দায়িত্বপ্রাপ্ত ব্যক্তির নাম:
                </label>
                <input
                  type="text"
                  required
                  value={grantStaffName}
                  onChange={(e) => setGrantStaffName(e.target.value)}
                  placeholder="যেমন: হাফেজ মাওলানা ইকবাল হাসান"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  পদবি / রোল:
                </label>
                <input
                  type="text"
                  value={grantStaffRole}
                  onChange={(e) => setGrantStaffRole(e.target.value)}
                  placeholder="যেমন: সহকারী বিভাগীয় ইনচার্জ"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  কোন বিভাগে পারমিশন বরাদ্দ করবেন:
                </label>
                <select
                  value={grantDeptId}
                  onChange={(e) => setGrantDeptId(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.code} - {d.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[var(--muted-foreground)] font-medium mb-1">
                  পারমিশন ক্ষমতা ও কর্তৃত্ব:
                </label>
                <select
                  value={grantPermLevel}
                  onChange={(e) => setGrantPermLevel(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-semibold"
                >
                  <option value="APPROVE">অনুমোদনকারী (Approve & Manage Authority)</option>
                  <option value="OPERATOR">অপারেটর (Data Entry & Operation Authority)</option>
                  <option value="VIEW_ONLY">নিরীক্ষক (Read & View Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowGrantPermissionModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow hover:bg-emerald-700 transition"
                >
                  পারমিশন মঞ্জুর করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Thermal POS Receipt Modal (80mm/58mm Layout) */}
      {activeThermalReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 border border-zinc-300 rounded-xl max-w-sm w-full p-5 shadow-2xl relative font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 mb-3">
              <div className="flex items-center gap-1.5 font-sans font-bold text-zinc-700">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>থার্মাল পিওএস ক্যাশ স্লিপ (80mm)</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveThermalReceipt(null)}
                className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-[var(--muted-foreground)] hover:text-zinc-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-zinc-50 p-4 rounded-xl border border-dashed border-zinc-300 space-y-2.5">
              <div className="text-center space-y-0.5">
                <p className="text-xs font-medium font-bold tracking-widest text-zinc-600">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <h3 className="font-bold text-sm tracking-tight text-zinc-900 font-sans">دار العلوم الإسلامية</h3>
                <h4 className="font-bold text-xs font-sans">দারুল উলুম আল-ইসলামিয়া মাদরাসা</h4>
                <p className="text-xs font-semibold text-[var(--muted-foreground)]">জামিয়া ক্যাম্পাস, ঢাকা-১২০৪ | ফোন: ০১৭১১-০০২২৩৩</p>
                <div className="border-t border-dashed border-zinc-400 my-1 pt-1 font-bold text-xs font-medium text-emerald-800">
                  *** ছাত্র ফি আদায় রশিদ ***
                </div>
              </div>

              <div className="text-xs font-medium space-y-1 pt-1 border-t border-dashed border-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-600">রসিদ নং:</span>
                  <span className="font-bold">{activeThermalReceipt.receiptNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">তারিখ:</span>
                  <span>{activeThermalReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">ছাত্রের নাম:</span>
                  <span className="font-bold font-sans">{activeThermalReceipt.studentNameBn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">স্টুডেন্ট আইডি:</span>
                  <span className="font-semibold">{activeThermalReceipt.studentId} (রোল: {activeThermalReceipt.studentRoll})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">বিভাগ / জামাত:</span>
                  <span className="font-sans">{activeThermalReceipt.classNameBn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">হিসাব তহবিল:</span>
                  <span className="font-sans">{activeThermalReceipt.fundNameBn}</span>
                </div>
              </div>

              <div className="border-t border-b border-dashed border-zinc-400 py-1.5 my-1 text-xs font-medium">
                <div className="flex justify-between font-bold border-b border-zinc-200 pb-1 mb-1">
                  <span>বিবরণ</span>
                  <span>টাকা</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span>{activeThermalReceipt.feeTypeBn}</span>
                  <span className="font-mono">৳{activeThermalReceipt.amount.toLocaleString('bn-BD')}</span>
                </div>
                {activeThermalReceipt.discount > 0 && (
                  <div className="flex justify-between text-amber-700 font-sans">
                    <span>বিশেষ ছাড় / মওকুফ</span>
                    <span className="font-mono">-৳{activeThermalReceipt.discount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
              </div>

              <div className="text-xs font-medium space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>সর্বমোট পরিশোধ:</span>
                  <span className="text-emerald-700 font-bold font-mono">৳{activeThermalReceipt.netPaid.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>পরিশোধ মাধ্যম:</span>
                  <span className="font-semibold">
                    {activeThermalReceipt.paymentMethod === 'CASH'
                      ? 'কাউন্টার ক্যাশ'
                      : activeThermalReceipt.paymentMethod === 'BKASH'
                      ? 'বিকাশ অনলাইন'
                      : activeThermalReceipt.paymentMethod === 'NAGAD'
                      ? 'নগদ অনলাইন'
                      : 'ব্যাংক জমা'}
                  </span>
                </div>
                {activeThermalReceipt.transactionRef && (
                  <div className="flex justify-between text-zinc-600">
                    <span>ট্রানজেকশন আইডি:</span>
                    <span className="font-mono font-bold text-zinc-800">{activeThermalReceipt.transactionRef}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>বকেয়া স্থিতি:</span>
                  <span className="font-bold text-zinc-700">৳০.০০ (পরিশোধিত)</span>
                </div>
                <div className="flex justify-between text-zinc-600 pt-1 border-t border-dashed border-zinc-300">
                  <span>আদায়কারী:</span>
                  <span className="font-sans">{activeThermalReceipt.receivedBy}</span>
                </div>
              </div>

              <div className="text-center pt-2 space-y-1 border-t border-dashed border-zinc-300">
                <div className="tracking-widest font-mono text-[9px] text-[var(--subtle-foreground)] select-none">
                  ||| |||| | ||||| || |||||| | ||||| |||
                </div>
                <p className="text-xs font-semibold text-zinc-600 italic font-sans">
                  "ইলমে দ্বীনের সহযোগিতায় আপনাদের শুকরিয়া। জাযাকাল্লাহু খাইরান।"
                </p>
                <p className="text-[9px] text-[var(--subtle-foreground)] font-sans">সফটওয়্যার প্রস্তুতকারক: মাদরাসা ম্যানেজমেন্ট সিস্টেম</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-zinc-200 font-sans">
              <button
                type="button"
                onClick={() => setActiveThermalReceipt(null)}
                className="px-3 py-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold transition"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>থার্মাল প্রিন্ট দিন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Official Madrasa Pad Receipt Modal (A4/A5 Layout) */}
      {activeOfficialReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 border border-zinc-300 rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-800">অফিসিয়াল মাদরাসা প্যাড রসিদ ভাউচার (A4/A5)</h3>
                  <p className="text-xs font-medium text-[var(--muted-foreground)]">মাদরাসার প্রাতিষ্ঠানিক হিসাব ভাউচার কপি</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveOfficialReceipt(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[var(--muted-foreground)] hover:text-zinc-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Official Voucher Pad */}
            <div className="border-2 border-emerald-800/80 rounded-xl p-6 bg-amber-50/20 relative space-y-4">
              {/* Header */}
              <div className="text-center space-y-1 pb-3 border-b-2 border-emerald-800/40">
                <p className="text-xs font-bold text-emerald-900 font-serif">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <h2 className="text-xl font-black text-emerald-950 tracking-wide">দারুল উলুম আল-ইসলামিয়া মাদরাসা ও এতিমখানা</h2>
                <p className="text-xs font-semibold text-zinc-700">DARUL ULOOM AL-ISLAMIA MADRASA & ORPHANAGE</p>
                <p className="text-xs font-medium text-zinc-600">প্রধান কার্যালয়: জামিয়া ক্যাম্পাস রোড, মিরপুর, ঢাকা-১২১৬ | স্থাপিত: ১৯৯৮ ইং</p>
                <div className="inline-block mt-1 px-4 py-0.5 rounded-full bg-emerald-800 text-white font-bold text-xs">
                  ফি আদায় ও জমা রসিদ ভাউচার
                </div>
              </div>

              {/* Meta Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-xl border border-zinc-200">
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">ভাউচার / রসিদ নং:</span>
                  <span className="font-bold text-zinc-900 font-mono">{activeOfficialReceipt.receiptNo}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">তারিখ ও সময়:</span>
                  <span className="font-semibold text-zinc-800">{activeOfficialReceipt.date}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">হিসাব তহবিল:</span>
                  <span className="font-bold text-emerald-800">{activeOfficialReceipt.fundNameBn}</span>
                </div>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white p-3 rounded-xl border border-zinc-200">
                <div className="col-span-2">
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">শিক্ষার্থীর পূর্ণ নাম:</span>
                  <span className="font-bold text-zinc-900 text-sm">{activeOfficialReceipt.studentNameBn}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">স্টুডেন্ট আইডি:</span>
                  <span className="font-mono font-semibold">{activeOfficialReceipt.studentId}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">রোল নম্বর:</span>
                  <span className="font-bold text-zinc-800">{activeOfficialReceipt.studentRoll}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">বিভাগ ও শ্রেণি/জামাত:</span>
                  <span className="font-semibold text-zinc-800">{activeOfficialReceipt.classNameBn}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">পরিশোধের মাধ্যম:</span>
                  <span className="font-semibold text-zinc-800">
                    {activeOfficialReceipt.paymentMethod === 'CASH'
                      ? 'কাউন্টার নগদ ক্যাশ'
                      : activeOfficialReceipt.paymentMethod === 'BKASH'
                      ? `বিকাশ অনলাইন (${activeOfficialReceipt.transactionRef || 'TRX'})`
                      : activeOfficialReceipt.paymentMethod === 'NAGAD'
                      ? `নগদ অনলাইন (${activeOfficialReceipt.transactionRef || 'TRX'})`
                      : 'ব্যাংক একাউন্ট'}
                  </span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-emerald-800 text-white">
                    <tr>
                      <th className="py-2 px-3 text-center w-12">ক্রম</th>
                      <th className="py-2 px-3">ফি বিবরণ ও খাত</th>
                      <th className="py-2 px-3">হিসাব ফান্ড</th>
                      <th className="py-2 px-3 text-right">নির্ধারিত ফি</th>
                      <th className="py-2 px-3 text-right">ছাড়/মওকুফ</th>
                      <th className="py-2 px-3 text-right">আদায়ের পরিমাণ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-200">
                    <tr>
                      <td className="py-2.5 px-3 text-center font-bold text-[var(--muted-foreground)]">০১</td>
                      <td className="py-2.5 px-3 font-bold text-zinc-800">{activeOfficialReceipt.feeTypeBn}</td>
                      <td className="py-2.5 px-3 text-zinc-600">{activeOfficialReceipt.fundNameBn}</td>
                      <td className="py-2.5 px-3 text-right font-mono">৳{activeOfficialReceipt.amount.toLocaleString('bn-BD')}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-700">
                        {activeOfficialReceipt.discount > 0 ? `৳${activeOfficialReceipt.discount.toLocaleString('bn-BD')}` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold font-mono text-emerald-800">
                        ৳{activeOfficialReceipt.netPaid.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/50 font-bold">
                      <td colSpan={5} className="py-2 px-3 text-right text-emerald-950">
                        সর্বমোট আদায়কৃত অর্থ:
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-sm text-emerald-900">
                        ৳{activeOfficialReceipt.netPaid.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Amount in words */}
              <div className="p-2.5 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-800">
                <span className="font-bold text-zinc-600">কথায় (টাকা): </span>
                <span className="font-semibold text-emerald-900">{activeOfficialReceipt.netPaid.toLocaleString('bn-BD')} টাকা মাত্র</span>
              </div>

              {/* 3 Signature Blocks */}
              <div className="pt-8 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="border-t border-zinc-400 pt-1.5 font-bold text-zinc-800">
                    {activeOfficialReceipt.receivedBy || 'মাওলানা কাসেম (হিসাবরক্ষক)'}
                  </div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">আদায়কারীর স্বাক্ষর ও তারিখ</span>
                </div>
                <div>
                  <div className="border-t border-zinc-400 pt-1.5 font-bold text-zinc-800">
                    মুফতী মনসুরুল হক
                  </div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">হিসাব নিরীক্ষকের স্বাক্ষর</span>
                </div>
                <div>
                  <div className="border-t border-zinc-400 pt-1.5 font-bold text-emerald-900">
                    আল্লামা মুহতামিম সাহেব
                  </div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">মুহতামিম / প্রাতিষ্ঠানিক সিল</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setActiveOfficialReceipt(null)}
                className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold transition"
              >
                বাতিল / বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>অফিসিয়াল প্যাড প্রিন্ট (A4/A5)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Teacher & Staff Salary Slip Modal */}
      {activeSalarySlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 border border-zinc-300 rounded-xl max-w-lg w-full p-6 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-800">আসাতায়ে কেরাম ও স্টাফ বেতন স্লিপ</h3>
                  <p className="text-xs font-medium text-[var(--muted-foreground)]">মাদরাসা শিক্ষক ও কর্মচারী মাসিক সম্মানী রশিদ</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSalarySlip(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[var(--muted-foreground)] hover:text-zinc-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-purple-200 bg-purple-50/20 rounded-xl p-5 space-y-4">
              <div className="text-center space-y-0.5 pb-2 border-b border-purple-200">
                <h4 className="font-bold text-base text-purple-950">দারুল উলুম আল-ইসলামিয়া মাদরাসা</h4>
                <p className="text-xs text-zinc-600">মাসিক শিক্ষক ও কর্মচারী বেতন ভাউচার স্লিপ</p>
                <span className="inline-block px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs mt-1">
                  বেতনের মাস: {activeSalarySlip.monthYear}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-zinc-200">
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">শিক্ষক / কর্মচারীর নাম:</span>
                  <span className="font-bold text-zinc-900 text-sm">{activeSalarySlip.teacherNameBn}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">আইডি ও পদবি:</span>
                  <span className="font-semibold text-zinc-800">{activeSalarySlip.designation} ({activeSalarySlip.teacherId})</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">পরিশোধ পদ্ধতি:</span>
                  <span className="font-semibold text-zinc-800">{activeSalarySlip.paymentMethod || 'নগদ ক্যাশ'}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block text-xs font-semibold">বিতরণ তারিখ ও স্ট্যাটাস:</span>
                  <span className={`font-bold ${activeSalarySlip.status === 'DISBURSED' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {activeSalarySlip.status === 'DISBURSED' ? `পরিশোধিত (${activeSalarySlip.paidDate})` : 'অনুমোদিত (অপেক্ষমান)'}
                  </span>
                </div>
              </div>

              {/* Salary Breakdown Table */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-purple-900 text-white">
                    <tr>
                      <th className="py-2 px-3">বেতন ও ভাতার বিবরণ</th>
                      <th className="py-2 px-3 text-right">পরিমাণ (টাকা)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-100">
                    <tr>
                      <td className="py-2 px-3 text-zinc-700">মূল মাসিক বেতন (Basic Pay)</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-zinc-900">
                        ৳{activeSalarySlip.baseSalary.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-emerald-700">বিশেষ যাতায়াত ও মেস ভাতা (+)</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                        +৳{activeSalarySlip.allowances.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-red-600">কল্যাণ ফান্ড / অগ্রিম কর্তন (-)</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-red-600">
                        -৳{activeSalarySlip.deductions.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                    <tr className="bg-purple-100 font-bold text-sm">
                      <td className="py-2.5 px-3 text-purple-950">সর্বমোট নিট প্রদেয় বেতন:</td>
                      <td className="py-2.5 px-3 text-right font-mono text-purple-950">
                        ৳{activeSalarySlip.netPayable.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-2 text-center text-xs font-medium">
                <div>
                  <div className="border-t border-zinc-300 pt-1 text-zinc-700 font-medium">শিক্ষকের স্বাক্ষর</div>
                </div>
                <div>
                  <div className="border-t border-zinc-300 pt-1 text-zinc-700 font-medium">হিসাবরক্ষক</div>
                </div>
                <div>
                  <div className="border-t border-zinc-300 pt-1 text-purple-900 font-bold">মুহতামিম সিলমোহর</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setActiveSalarySlip(null)}
                className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold transition"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 shadow transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>বেতন স্লিপ প্রিন্ট দিন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Add Expense Voucher Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-lg w-full shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">নতুন ব্যয় / মেস বাজার ভাউচার এন্ট্রি</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">মাদরাসা ও মেস ব্যয় সমন্বয় ও শরীয়াহ ফান্ড বরাদ্দ</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddExpenseModal(false)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddExpenseVoucher} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  ব্যয়ের শিরোনাম ও স্পষ্ট বিবরণ:
                </label>
                <input
                  type="text"
                  required
                  value={newExpenseTitle}
                  onChange={(e) => setNewExpenseTitle(e.target.value)}
                  placeholder="যেমন: হোস্টেল মেসের সাপ্তাহিক চাল, ডাল ও তেল খরিদ"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    ব্যয়ের খাত / ক্যাটাগরি:
                  </label>
                  <select
                    value={newExpenseCategory}
                    onChange={(e) => setNewExpenseCategory(e.target.value as any)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    <option value="MESS_BAZAR">মেস বাজার খরচ</option>
                    <option value="CAPITAL_REPAIR">মেরামত ও স্থায়ী খরচ</option>
                    <option value="SALARY">ওস্তাদ ও স্টাফদের বেতন</option>
                    <option value="WELFARE_AID">ছাত্র কল্যাণ ও চিকিৎসা অনুদান</option>
                    <option value="UTILITY">বিদ্যুৎ ও প্রশাসনিক ইউটিলিটি</option>
                    <option value="EVENT_CONFERENCE">ইভেন্ট ও মাহফিল খরচ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    টাকার পরিমাণ (৳):
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono font-bold"
                  />
                </div>
              </div>

              {newExpenseAmount >= 10000 && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    ১০,০০০ টাকার অধিক ব্যয় হওয়ায় এটি সরাসরি <strong>মুহতামিম সাহেবের অনুমোদন বোর্ডে</strong> দাখিল হবে।
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    শরীয়াহ ফান্ড নির্বাচন করুন:
                  </label>
                  <select
                    value={newExpenseFundId}
                    onChange={(e) => setNewExpenseFundId(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    {shariahFunds.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nameBn} (ব্যালেন্স: ৳{f.balance.toLocaleString('bn-BD')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    অধিযাচনকারী কর্মী / ইনচার্জ:
                  </label>
                  <input
                    type="text"
                    value={newExpenseRequester}
                    onChange={(e) => setNewExpenseRequester(e.target.value)}
                    placeholder="যেমন: হাফেজ বেলাল (মেস সুপার)"
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  ক্যাশ মেমো / ভাউচার রেফারেন্স:
                </label>
                <textarea
                  rows={2}
                  value={newExpenseMemo}
                  onChange={(e) => setNewExpenseMemo(e.target.value)}
                  placeholder="মেমো নং, দোকান বা আড়তের নাম ও প্রয়োজনীয় নোট..."
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold shadow hover:bg-amber-700 transition"
                >
                  ব্যয় ভাউচার দাখিল করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Add Donation Modal */}
      {showAddDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-lg w-full shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">নতুন অনুদান, যাকাত ও ওয়াকফ সংগ্রহ</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">দাতার তথ্য সংরক্ষণ ও তাৎক্ষণিক অনুদান রসিদ তৈরি</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddDonationModal(false)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDonation} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    দাতার নাম / বক্সের শিরোনাম:
                  </label>
                  <input
                    type="text"
                    required
                    value={newDonorName}
                    onChange={(e) => setNewDonorName(e.target.value)}
                    placeholder="যেমন: আলহাজ্ব আবুল কালাম"
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    মোবাইল নম্বর:
                  </label>
                  <input
                    type="text"
                    value={newDonorPhone}
                    onChange={(e) => setNewDonorPhone(e.target.value)}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    দাতার ধরন / ক্যাটাগরি:
                  </label>
                  <select
                    value={newDonorType}
                    onChange={(e) => setNewDonorType(e.target.value as any)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    <option value="ONE_TIME">এককালীন সাধারণ দাতা</option>
                    <option value="MONTHLY">মাসিক মুয়াবিন দাতা</option>
                    <option value="LIFETIME">আজীবন সদস্য দাতা</option>
                    <option value="BOX">মসজিদ ও মাদরাসা দান বক্স</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    শরীয়াহ ফান্ড নির্বাচন:
                  </label>
                  <select
                    value={newDonorFundId}
                    onChange={(e) => setNewDonorFundId(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    {shariahFunds.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nameBn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    অনুদানের পরিমাণ (৳):
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newDonorAmount}
                    onChange={(e) => setNewDonorAmount(Number(e.target.value))}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[var(--foreground)] font-semibold mb-1">
                    পরিশোধের মাধ্যম:
                  </label>
                  <select
                    value={newDonorMethod}
                    onChange={(e) => setNewDonorMethod(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
                  >
                    <option value="নগদ ক্যাশ গ্রহণ">নগদ ক্যাশ গ্রহণ</option>
                    <option value="বিকাশ অনলাইন">বিকাশ অনলাইন</option>
                    <option value="নগদ অনলাইন">নগদ অনলাইন</option>
                    <option value="ব্যাংক চেক / ডিপোজিট">ব্যাংক চেক / ডিপোজিট</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  দান বা ওয়াকফের বিশেষ উদ্দেশ্য ও মন্তব্য:
                </label>
                <textarea
                  rows={2}
                  value={newDonorNotes}
                  onChange={(e) => setNewDonorNotes(e.target.value)}
                  placeholder="যেমন: মরহুম পিতার মাগফিরাত কামনায় যাকাত / নতুন ভবনের ইট ক্রয়ের জন্য"
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowAddDonationModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold shadow hover:bg-teal-700 transition"
                >
                  অনুদান সংগ্রহ ও রশিদ প্রস্তুত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Approval Threshold Configuration Modal (মুহতামিম অনুমোদন সীমা কনফিগারেশন) */}
      {showThresholdConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-800 dark:text-amber-400 font-bold" />
                <h3 className="font-bold text-sm text-[var(--foreground)]">মুহতামিম অনুমোদন সীমা নির্ধারণ</h3>
              </div>
              <button
                onClick={() => setShowThresholdConfigModal(false)}
                className="p-1 rounded-lg hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              মাদ্রাসার যেসকল ব্যয় এই নির্ধারিত টাকার সীমার সমান বা বেশি হবে, সেগুলো স্বয়ংক্রিয়ভাবে মুহতামিম সাহেবের অনুমোদন বোর্ডে জমা হবে এবং মুহতামিমের অনুমোদন ব্যতীত তহবিল থেকে অর্থ ছাড় হবে না।
            </p>

            <form onSubmit={handleSaveThresholdLimit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--foreground)] font-semibold mb-1">
                  অনুমোদন সীমা লিমিট (টাকা - ৳):
                </label>
                <input
                  type="number"
                  required
                  min={500}
                  step={500}
                  value={tempThresholdInput}
                  onChange={(e) => setTempThresholdInput(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-base font-mono font-black text-amber-800 dark:text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                />
                <span className="block text-xs font-semibold text-[var(--muted-foreground)] mt-1">
                  বর্তমান সীমা: ৳{approvalThresholdLimit.toLocaleString('bn-BD')} (ডিফল্ট: ৳১০,০০০)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 font-bold text-xs font-medium space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>দ্বৈত মেকার-চেকার আর্থিক নিরাপত্তা:</span>
                </div>
                <p>
                  ৳{Number(tempThresholdInput || 0).toLocaleString('bn-BD')} বা তদূর্ধ্ব যেকোনো ভাউচার তৈরিতে সাথে সাথে সতর্কবার্তা প্রদর্শিত হবে।
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setShowThresholdConfigModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow transition"
                >
                  নতুন লিমিট সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Shariah Fund Ledger Drilldown Modal (তহবিল ভিত্তিক খতিয়ান ও লেনদেন) */}
      {activeLedgerFund && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold font-bold font-mono px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                      {activeLedgerFund.code}
                    </span>
                    <h3 className="font-bold text-base text-[var(--foreground)]">
                      {activeLedgerFund.nameBn}
                    </h3>
                    {activeLedgerFund.isRestricted && (
                      <span className="text-xs font-semibold font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/30">
                        ১০০% শরীয়াহ রেস্ট্রিক্টেড
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {activeLedgerFund.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveLedgerFund(null)}
                className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Bar for Fund Ledger */}
            {(() => {
              const filterLedgerDate = (dateStr: string) => {
                if (ledgerFilterRange === 'ALL') return true;
                if (ledgerFilterRange === 'TODAY') {
                  return dateStr.includes('২০ অক্টোবর ২০২৬') || dateStr.includes('2026-10-20');
                }
                if (ledgerFilterRange === 'MONTH') {
                  const monthMap: Record<string, string> = {
                    '2026-10': 'অক্টোবর ২০২৬',
                    '2026-09': 'সেপ্টেম্বর ২০২৬',
                    '2026-08': 'আগস্ট ২০২৬',
                    '2026-07': 'জুলাই ২০২৬',
                    '2026-06': 'জুন ২০২৬',
                    '2026-05': 'মে ২০২৬',
                    '2026-04': 'এপ্রিল ২০২৬',
                    '2026-03': 'মার্চ ২০২৬',
                    '2026-02': 'ফেব্রুয়ারি ২০২৬',
                    '2026-01': 'জানুয়ারি ২০২৬',
                    '2025-12': 'ডিসেম্বর ২০২৫',
                  };
                  const expected = monthMap[ledgerSelectedMonth] || 'অক্টোবর ২০২৬';
                  return dateStr.includes(expected) || dateStr.includes(ledgerSelectedMonth);
                }
                if (ledgerFilterRange === 'CUSTOM') {
                  return true;
                }
                return true;
              };

              const filteredPayments = completedPayments.filter(
                (p) => p.fundId === activeLedgerFund.id && filterLedgerDate(p.date)
              );
              const filteredDonations = donations.filter(
                (d) => d.fundId === activeLedgerFund.id && filterLedgerDate(d.date)
              );
              const filteredExpenses = expenseVouchers.filter(
                (e) => e.fundId === activeLedgerFund.id && filterLedgerDate(e.date)
              );

              const periodIn =
                filteredPayments.reduce((s, p) => s + p.netPaid, 0) +
                filteredDonations.reduce((s, d) => s + d.amount, 0);
              const periodOut = filteredExpenses.reduce((s, e) => s + e.amount, 0);
              const periodNet = periodIn - periodOut;
              const hasNoTxns =
                filteredPayments.length === 0 &&
                filteredDonations.length === 0 &&
                filteredExpenses.length === 0;

              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-medium font-semibold text-[var(--muted-foreground)] px-1">সময়সীমা:</span>
                      {(['ALL', 'TODAY', 'MONTH', 'CUSTOM'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setLedgerFilterRange(r)}
                          className={`px-3 py-1 rounded-xl font-bold transition cursor-pointer ${
                            ledgerFilterRange === r
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs'
                              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]'
                          }`}
                        >
                          {r === 'ALL' && 'সকল লেনদেন'}
                          {r === 'TODAY' && 'আজকের খতিয়ান'}
                          {r === 'MONTH' && 'মাস অনুযায়ী'}
                          {r === 'CUSTOM' && 'তারিখ অনুযায়ী (কাস্টমাইজ)'}
                        </button>
                      ))}
                    </div>

                    {ledgerFilterRange === 'MONTH' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--muted-foreground)]">মাস নির্বাচন:</span>
                        <select
                          value={ledgerSelectedMonth}
                          onChange={(e) => setLedgerSelectedMonth(e.target.value)}
                          className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-2.5 py-1 text-xs text-[var(--foreground)] font-bold cursor-pointer"
                        >
                          <option value="2026-10">অক্টোবর ২০২৬ (চলতি মাস)</option>
                          <option value="2026-09">সেপ্টেম্বর ২০২৬</option>
                          <option value="2026-08">আগস্ট ২০২৬</option>
                          <option value="2026-07">জুলাই ২০২৬</option>
                          <option value="2026-06">জুন ২০২৬</option>
                          <option value="2026-05">মে ২০২৬</option>
                          <option value="2026-04">এপ্রিল ২০২৬</option>
                          <option value="2026-03">মার্চ ২০২৬</option>
                          <option value="2026-02">ফেব্রুয়ারি ২০২৬</option>
                          <option value="2026-01">জানুয়ারি ২০২৬</option>
                          <option value="2025-12">ডিসেম্বর ২০২৫</option>
                        </select>
                      </div>
                    )}

                    {ledgerFilterRange === 'CUSTOM' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={ledgerDateFrom}
                          onChange={(e) => setLedgerDateFrom(e.target.value)}
                          className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-2.5 py-1 text-xs text-[var(--foreground)] font-mono font-bold"
                        />
                        <span className="text-[var(--muted-foreground)] text-xs">থেকে</span>
                        <input
                          type="date"
                          value={ledgerDateTo}
                          onChange={(e) => setLedgerDateTo(e.target.value)}
                          className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-2.5 py-1 text-xs text-[var(--foreground)] font-mono font-bold"
                        />
                      </div>
                    )}
                  </div>

                  {/* Summary Bar for Filtered Period */}
                  <div className="grid grid-cols-3 gap-3 p-2.5 rounded-xl bg-[var(--background)]/80 border border-[var(--border)] text-xs">
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">নির্বাচিত সময়ে জমা (+):</span>
                      <span className="text-sm font-extrabold text-emerald-600 font-mono">
                        +৳{periodIn.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">নির্বাচিত সময়ে ব্যয় (-):</span>
                      <span className="text-sm font-extrabold text-rose-600 font-mono">
                        -৳{periodOut.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[var(--muted-foreground)] block">সময়ের নিট উদ্বৃত্ত (=):</span>
                      <span className={`text-sm font-black font-mono ${periodNet >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
                        ৳{periodNet.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {/* Ledger Transactions Table */}
                  <div className="overflow-y-auto flex-1 border border-[var(--border)] rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-[var(--card)] border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold shadow-xs">
                        <tr>
                          <th className="p-3">তারিখ</th>
                          <th className="p-3">ধরণ</th>
                          <th className="p-3">রেফারেন্স / ভাউচার</th>
                          <th className="p-3">বিবরণ ও উৎস</th>
                          <th className="p-3 text-right">জমা (+)</th>
                          <th className="p-3 text-right">খরচ (-)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {hasNoTxns && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-xs text-[var(--muted-foreground)]">
                              নির্বাচিত সময়সীমায় এই তহবিলের কোনো লেনদেন পাওয়া যায়নি।
                            </td>
                          </tr>
                        )}
                        {/* Deposits from student fees */}
                        {filteredPayments.map((p) => (
                          <tr key={p.id} className="hover:bg-[var(--background)]/50">
                            <td className="p-3 text-[var(--muted-foreground)]">{p.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                আদায় (ফি)
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-[var(--foreground)]">{p.receiptNo}</td>
                            <td className="p-3">
                              <div className="font-semibold text-[var(--foreground)]">{p.studentNameBn} ({p.studentRoll})</div>
                              <div className="text-xs font-semibold text-[var(--muted-foreground)]">{p.feeTypeBn}</div>
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">
                              +৳{p.netPaid.toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 text-right text-[var(--muted-foreground)] font-mono">—</td>
                          </tr>
                        ))}

                        {/* Deposits from donations */}
                        {filteredDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-[var(--background)]/50">
                            <td className="p-3 text-[var(--muted-foreground)]">{d.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-bold bg-teal-500/10 text-teal-600 border border-teal-500/20">
                                অনুদান
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-[var(--foreground)]">{d.receiptNo}</td>
                            <td className="p-3">
                              <div className="font-semibold text-[var(--foreground)]">{d.donorName}</div>
                              <div className="text-xs font-semibold text-[var(--muted-foreground)]">{d.notes}</div>
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-teal-600">
                              +৳{d.amount.toLocaleString('bn-BD')}
                            </td>
                            <td className="p-3 text-right text-[var(--muted-foreground)] font-mono">—</td>
                          </tr>
                        ))}

                        {/* Expenses from vouchers */}
                        {filteredExpenses.map((e) => (
                          <tr key={e.id} className="hover:bg-[var(--background)]/50">
                            <td className="p-3 text-[var(--muted-foreground)]">{e.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                                ব্যয় / খরচ
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-[var(--foreground)]">{e.voucherNo}</td>
                            <td className="p-3">
                              <div className="font-semibold text-[var(--foreground)]">{e.title}</div>
                              <div className="text-xs font-semibold text-[var(--muted-foreground)]">{e.memoDetails}</div>
                            </td>
                            <td className="p-3 text-right text-[var(--muted-foreground)] font-mono">—</td>
                            <td className="p-3 text-right font-mono font-bold text-rose-600">
                              -৳{e.amount.toLocaleString('bn-BD')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}

            {/* Fund Balance Summary Footer */}
            <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)] block">তহবিলের বর্তমান স্থিতি:</span>
                  <span className="text-lg font-black text-emerald-600 font-mono">
                    ৳{activeLedgerFund.balance.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)] block">শরীয়াহ স্ট্যাটাস:</span>
                  <span className="text-xs font-bold text-[var(--foreground)]">
                    {activeLedgerFund.isRestricted ? 'নির্দিষ্ট খাতে সীমাবদ্ধ' : 'উন্মুক্ত পরিচালনা'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`"${activeLedgerFund.nameBn}" এর ব্যাংক ও খতিয়ান স্টেটমেন্ট PDF রফতানি সম্পন্ন হয়েছে!`)}
                  className="px-3.5 py-1.5 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 font-bold" />
                  <span>স্টেটমেন্ট PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`"${activeLedgerFund.nameBn}" এর এক্সেল শিট ডাউনলোড শুরু হয়েছে!`)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Excel শিট</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
