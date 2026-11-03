import { describe, it, expect } from 'vitest';
import { superAdminService } from './superAdmin.service.js';

describe('Part 3: Super Admin & Multi-Tenancy Engine Tests', () => {
  // 1. Public Registration
  it('should submit a new madrasa application successfully', async () => {
    const input = {
      nameBn: 'দারুল কুরআন ওয়াস সুন্নাহ মাদ্রাসা',
      nameEn: 'Darul Quran Was Sunnah',
      type: 'QAWMI' as const,
      division: 'ঢাকা',
      district: 'গাজীপুর',
      thana: 'টঙ্গী',
      muhtamimName: 'মাওলানা কামরুল হাসান',
      muhtamimPhone: '01755112233',
      muhtamimEmail: 'tongi.quran@gmail.com',
    };

    const application = await superAdminService.submitApplication(input);
    expect(application).toBeDefined();
    expect(application.id).toBeDefined();
    expect(application.status).toBe('PENDING');
    expect(application.applicationNo).toContain('APP-');
  });

  // 2. Automated Schema Provisioning
  it('should approve application, generate tenant schema, and issue setup link', async () => {
    const pending = await superAdminService.getPendingApplications();
    expect(pending.length).toBeGreaterThan(0);

    const targetApp = pending[0]!;
    const approvalResult = await superAdminService.approveApplication(targetApp.id);

    expect(approvalResult.madrasa).toBeDefined();
    expect(approvalResult.madrasa.schemaName).toMatch(/^m_\d{3}$/); // e.g. "m_004"
    expect(approvalResult.setupToken).toBeDefined();
    expect(approvalResult.setupLink).toContain(approvalResult.madrasa.schemaName);
    expect(approvalResult.madrasa.status).toBe('ACTIVE');
  });

  // 3. Advanced Directory Filtering (>1000 students)
  it('should filter madrasas with over 1000 students', async () => {
    const result = await superAdminService.getMadrasas({ studentCountRange: 'over_1000' });
    expect(result.madrasas.length).toBeGreaterThan(0);
    result.madrasas.forEach((m) => {
      expect(m.studentCount).toBeGreaterThanOrEqual(1000);
    });
  });

  // 4. Advanced Directory Filtering by Location (District)
  it('should filter madrasas by district correctly', async () => {
    const result = await superAdminService.getMadrasas({ district: 'চট্টগ্রাম' });
    expect(result.madrasas.length).toBeGreaterThan(0);
    result.madrasas.forEach((m) => {
      expect(m.district).toBe('চট্টগ্রাম');
    });
  });

  // 5. System Health Monitoring
  it('should retrieve live server telemetry and health metrics', async () => {
    const health = await superAdminService.getSystemHealthMetrics();
    expect(health.status).toBe('OPTIMAL');
    expect(health.cpuUsagePercent).toBeGreaterThan(0);
    expect(health.memoryUsageMB).toBeGreaterThan(0);
    expect(health.redisConnected).toBe(true);
  });

  // 6. Automation Incident Logs
  it('should retrieve system automation logs including auto-scaling records', async () => {
    const logs = await superAdminService.getAutomationLogs();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs.some((l) => l.service === 'AUTO_SCALING')).toBe(true);
  });
});
