import { MadrasaType, MadrasaStatus } from '@madrasha/shared-types';

export interface MadrasaApplicationInput {
  nameBn: string;
  nameEn?: string;
  type: MadrasaType;
  subType?: string;
  division: string;
  district: string;
  thana: string;
  address?: string;
  muhtamimName: string;
  muhtamimPhone: string;
  muhtamimEmail?: string;
  requestedPlanId?: string;
}

export interface MadrasaFilterQuery {
  division?: string;
  district?: string;
  thana?: string;
  type?: MadrasaType;
  status?: MadrasaStatus;
  planId?: string;
  studentCountRange?: 'under_500' | '500_to_1000' | 'over_1000';
  search?: string;
  page?: number;
  limit?: number;
}

export interface SystemHealthMetric {
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  cpuUsagePercent: number;
  memoryUsageMB: number;
  memoryTotalMB: number;
  dbPoolActive: number;
  dbPoolIdle: number;
  redisConnected: boolean;
  activeTenantsCount: number;
  uptimeSeconds: number;
}

export interface SystemAutomationLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ALERT';
  service: 'BACKEND' | 'DATABASE' | 'AUTO_SCALING' | 'BACKUP' | 'PAYMENT';
  message: string;
  actionTaken?: string;
}
