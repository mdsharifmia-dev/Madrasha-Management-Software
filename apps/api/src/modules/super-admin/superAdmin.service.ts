import crypto from 'crypto';
import { MadrasaProfile, MadrasaStatus } from '@madrasha/shared-types';
import {
  MadrasaApplicationInput,
  MadrasaFilterQuery,
  SystemHealthMetric,
  SystemAutomationLog,
} from './superAdmin.types.js';

// Seeded In-Memory State for Super Admin (Simulates PostgreSQL Control DB)
const madrasaRegistry: MadrasaProfile[] = [
  {
    id: 'mdr-001-uuid',
    schemaName: 'm_001',
    code: 'DHK-001',
    nameBn: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
    nameEn: 'Jamia Islamia Darul Uloom Dhaka',
    type: 'QAWMI',
    division: 'ঢাকা',
    district: 'ঢাকা',
    thana: 'মিরপুর',
    address: 'মিরপুর-১২, ঢাকা-১২১৬',
    muhtamimName: 'মাওলানা মাহমুদ হাসান',
    muhtamimPhone: '01811223344',
    muhtamimEmail: 'darululum@jamia.edu.bd',
    status: 'ACTIVE',
    planId: 'enterprise-plan-id',
    studentCount: 1450, // > 1000
    staffCount: 45,
    smsBalance: 5000,
    storageUsedMb: 1250,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-10-14T10:00:00Z',
  },
  {
    id: 'mdr-002-uuid',
    schemaName: 'm_002',
    code: 'CTG-002',
    nameBn: 'দারুল উলুম মঈনুল ইসলাম হাটহাজারী',
    nameEn: 'Darul Uloom Hathazari',
    type: 'QAWMI',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    thana: 'হাটহাজারী',
    address: 'হাটহাজারী, চট্টগ্রাম',
    muhtamimName: 'মাওলানা ইয়াহইয়া আল ফারুক',
    muhtamimPhone: '01711998877',
    status: 'ACTIVE',
    planId: 'enterprise-plan-id',
    studentCount: 3200, // > 1000
    staffCount: 90,
    smsBalance: 12000,
    storageUsedMb: 3400,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-10-14T10:00:00Z',
  },
  {
    id: 'mdr-003-uuid',
    schemaName: 'm_003',
    code: 'SYL-003',
    nameBn: 'সিলেট সরকারি আলিয়া মাদ্রাসা',
    nameEn: 'Sylhet Govt. Alia Madrasah',
    type: 'ALIA',
    division: 'সিলেট',
    district: 'সিলেট',
    thana: 'কোতোয়ালী',
    address: 'চৌহাট্টা, সিলেট',
    muhtamimName: 'ড. মো: রফিকুল ইসলাম',
    muhtamimPhone: '01911445566',
    status: 'ACTIVE',
    planId: 'standard-plan-id',
    studentCount: 820, // 500-1000
    staffCount: 35,
    smsBalance: 2500,
    storageUsedMb: 750,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-10-14T10:00:00Z',
  },
];

// Pending Registration Applications
const pendingApplications: (MadrasaApplicationInput & {
  id: string;
  applicationNo: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  rejectionReason?: string;
})[] = [
  {
    id: 'app-001',
    applicationNo: 'APP-2026-001',
    nameBn: 'নূরানী হাফিজিয়া মাদ্রাসা ও এতিমখানা',
    nameEn: 'Nurani Hafizia Madrasa',
    type: 'HAFIZIYA',
    division: 'রাজশাহী',
    district: 'বগুড়া',
    thana: 'সদর',
    muhtamimName: 'মাওলানা ক্বারী আব্দুল হাই',
    muhtamimPhone: '01511223344',
    muhtamimEmail: 'nurani.bogura@gmail.com',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];

// System Automation Incidents and Logs
const automationLogs: SystemAutomationLog[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    level: 'INFO',
    service: 'AUTO_SCALING',
    message: 'পরীক্ষার রেজাল্ট ডাউনলোডের সময় সিপিইউ লোড বেড়েছিল (৮২%)। ব্যাকএন্ড অটো-স্কেলিং ক্লাস্টার স্কেল-আপ করেছে।',
    actionTaken: 'অতিরিক্ত ২ টি ওয়ার্কার ইনস্ট্যান্স যুক্ত করা হয়েছিল। লোড স্বাভাবিক হওয়ায় রিলিজ হয়েছে।',
  },
  {
    id: 'log-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    level: 'INFO',
    service: 'BACKUP',
    message: 'দৈনিক স্বয়ংক্রিয় WAL-নিরাপদ ডাটাবেস ব্যাকআপ সফলভাবে সম্পন্ন হয়েছে এবং ব্যাকব্লেজ B2-তে আপলোড হয়েছে।',
    actionTaken: 'SHA-256 ভ্যালিডেশন সফল।',
  },
];

// Support Tickets
const supportTickets = [
  {
    id: 'tkt-001',
    ticketNo: 'TKT-2026-001',
    madrasaId: 'mdr-001-uuid',
    madrasaName: 'জামিয়া ইসলামিয়া দারুল উলুম ঢাকা',
    subject: 'নতুন শিক্ষাবর্ষের ফি কাঠামো যুক্ত করার সহযোগিতা',
    message: 'আমাদের ২০২৬-২৭ শিক্ষাবর্ষের নূরানী বিভাগের মাসিক ফি আপডেট করার ক্ষেত্রে পরামর্শ প্রয়োজন।',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export class SuperAdminService {
  /**
   * 1. Public Madrasa Application Submission
   */
  async submitApplication(input: MadrasaApplicationInput) {
    const application = {
      ...input,
      id: crypto.randomUUID(),
      applicationNo: `APP-${new Date().getFullYear()}-${String(pendingApplications.length + 1).padStart(3, '0')}`,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString(),
    };
    pendingApplications.push(application);
    return application;
  }

  /**
   * 2. List Pending Applications for Super Admin
   */
  async getPendingApplications() {
    return pendingApplications.filter((app) => app.status === 'PENDING');
  }

  /**
   * 3. Approve Madrasa & Trigger Automated Schema Provisioning
   */
  async approveApplication(applicationId: string, planId: string = 'standard-plan-id') {
    const appIndex = pendingApplications.findIndex((a) => a.id === applicationId);
    if (appIndex === -1) {
      throw new Error('আবেদনটি পাওয়া যায়নি।');
    }

    const app = pendingApplications[appIndex]!;
    if (app.status !== 'PENDING') {
      throw new Error('এই আবেদনটি ইতিমধ্যে প্রক্রিয়াকরণ করা হয়েছে।');
    }

    // Generate unique schema and code
    const sequence = madrasaRegistry.length + 1;
    const schemaName = `m_${String(sequence).padStart(3, '0')}`;
    const codePrefix = app.district.slice(0, 3).toUpperCase();
    const code = `${codePrefix}-${String(sequence).padStart(3, '0')}`;
    const setupToken = crypto.randomUUID();

    // Auto-provisioning registered profile
    const newMadrasa: MadrasaProfile = {
      id: crypto.randomUUID(),
      schemaName,
      code,
      nameBn: app.nameBn,
      nameEn: app.nameEn,
      type: app.type,
      subType: app.subType,
      division: app.division,
      district: app.district,
      thana: app.thana,
      address: app.address,
      muhtamimName: app.muhtamimName,
      muhtamimPhone: app.muhtamimPhone,
      muhtamimEmail: app.muhtamimEmail,
      status: 'ACTIVE',
      planId,
      studentCount: 0,
      staffCount: 1,
      smsBalance: 100, // Welcome free SMS credits
      storageUsedMb: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    madrasaRegistry.push(newMadrasa);
    app.status = 'APPROVED';

    // Log automation event
    automationLogs.unshift({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'DATABASE',
      message: `নতুন মাদ্রাসা অনুমোদিত: ${app.nameBn} (${code})। স্কিমা: ${schemaName} সফলভাবে প্রভিশন করা হয়েছে।`,
      actionTaken: `মুহতামিমকে এককালীন সেটআপ লিঙ্ক (${setupToken}) এসএমএস ও ইমেইলে পাঠানো হয়েছে।`,
    });

    return {
      madrasa: newMadrasa,
      setupToken,
      setupLink: `https://${schemaName}.madrasha.app/setup?token=${setupToken}`,
    };
  }

  /**
   * 4. Reject Application with Reason
   */
  async rejectApplication(applicationId: string, reason: string) {
    const app = pendingApplications.find((a) => a.id === applicationId);
    if (!app) throw new Error('আবেদনটি পাওয়া যায়নি।');

    app.status = 'REJECTED';
    app.rejectionReason = reason;
    return app;
  }

  /**
   * 5. Filtered Madrasa Directory (Advanced Search)
   * Supports: Location (Division/District/Thana), Student Count (>1000, 500-1000, <500), Type, Plan, Status
   */
  async getMadrasas(query: MadrasaFilterQuery) {
    let result = [...madrasaRegistry];

    // Filter by Division
    if (query.division) {
      result = result.filter((m) => m.division.toLowerCase() === query.division!.toLowerCase());
    }

    // Filter by District
    if (query.district) {
      result = result.filter((m) => m.district.toLowerCase() === query.district!.toLowerCase());
    }

    // Filter by Thana
    if (query.thana) {
      result = result.filter((m) => m.thana.toLowerCase() === query.thana!.toLowerCase());
    }

    // Filter by Madrasa Type (QAWMI / ALIA / HAFIZIYA)
    if (query.type) {
      result = result.filter((m) => m.type === query.type);
    }

    // Filter by Status
    if (query.status) {
      result = result.filter((m) => m.status === query.status);
    }

    // Filter by Subscription Plan
    if (query.planId) {
      result = result.filter((m) => m.planId === query.planId);
    }

    // Filter by Student Count Range
    if (query.studentCountRange) {
      if (query.studentCountRange === 'over_1000') {
        result = result.filter((m) => m.studentCount >= 1000);
      } else if (query.studentCountRange === '500_to_1000') {
        result = result.filter((m) => m.studentCount >= 500 && m.studentCount < 1000);
      } else if (query.studentCountRange === 'under_500') {
        result = result.filter((m) => m.studentCount < 500);
      }
    }

    // General Search Text (Name, Code, Muhtamim, Phone)
    if (query.search) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.nameBn.toLowerCase().includes(term) ||
          m.code.toLowerCase().includes(term) ||
          (m.nameEn && m.nameEn.toLowerCase().includes(term)) ||
          m.muhtamimName.toLowerCase().includes(term) ||
          m.muhtamimPhone.includes(term)
      );
    }

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return {
      total: result.length,
      page,
      limit,
      madrasas: paginated,
    };
  }

  /**
   * 6. Madrasa Status Lifecycle (Suspend / Unsuspend)
   */
  async updateMadrasaStatus(id: string, status: MadrasaStatus, reason?: string) {
    const madrasa = madrasaRegistry.find((m) => m.id === id);
    if (!madrasa) throw new Error('মাদ্রাসা পাওয়া যায়নি।');

    madrasa.status = status;
    madrasa.updatedAt = new Date().toISOString();

    automationLogs.unshift({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: status === 'SUSPENDED' ? 'WARNING' : 'INFO',
      service: 'DATABASE',
      message: `মাদ্রাসার স্ট্যাটাস পরিবর্তিত: ${madrasa.nameBn} -> ${status} ${reason ? `(কারণ: ${reason})` : ''}`,
    });

    return madrasa;
  }

  /**
   * 7. Live System Infrastructure Metrics
   */
  async getSystemHealthMetrics(): Promise<SystemHealthMetric> {
    const memory = process.memoryUsage();
    return {
      status: 'OPTIMAL',
      cpuUsagePercent: 18.5,
      memoryUsageMB: Math.round(memory.heapUsed / 1024 / 1024),
      memoryTotalMB: Math.round(memory.heapTotal / 1024 / 1024),
      dbPoolActive: 4,
      dbPoolIdle: 16,
      redisConnected: true,
      activeTenantsCount: madrasaRegistry.filter((m) => m.status === 'ACTIVE').length,
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }

  /**
   * 8. System Automation & Incident Logs
   */
  async getAutomationLogs() {
    return automationLogs;
  }

  /**
   * 9. Support Tickets List
   */
  async getSupportTickets(status?: string) {
    if (status) {
      return supportTickets.filter((t) => t.status === status);
    }
    return supportTickets;
  }

  /**
   * 10. Reply to Support Ticket
   */
  async replySupportTicket(ticketId: string, replyMessage: string) {
    const ticket = supportTickets.find((t) => t.id === ticketId);
    if (!ticket) throw new Error('সাপোর্ট টিকিট পাওয়া যায়নি।');

    ticket.status = 'IN_PROGRESS';
    return {
      ticket,
      reply: {
        id: crypto.randomUUID(),
        ticketId,
        senderType: 'AGENCY',
        message: replyMessage,
        createdAt: new Date().toISOString(),
      },
    };
  }
}

export const superAdminService = new SuperAdminService();
