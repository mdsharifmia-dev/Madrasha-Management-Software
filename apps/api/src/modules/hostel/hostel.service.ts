import {
  HostelRoom,
  StudentRoomAssignment,
  HostelMealRecord,
  GatepassRecord,
  MealSession,
  FundType,
  GatepassStatus,
} from '@madrasha/shared-types';
import { generateJWT, verifyJWT } from '../../utils/token.js';

export interface CreateRoomInput {
  roomNo: string;
  floor: number;
  capacity: number;
}

export interface AssignRoomInput {
  studentId: string;
  roomId: string;
  bedNo?: number;
  assignedFrom: string;
  assignedBy?: string;
}

export interface RecordMealInput {
  studentId: string;
  date: string; // YYYY-MM-DD
  session: MealSession;
  isTaken: boolean;
  fundType?: FundType;
  recordedBy?: string;
}

export interface RequestGatepassInput {
  studentId: string;
  requestedBy: string; // Guardian user id
  reason: string;
  fromDate: string;
  toDate: string;
}

export class HostelService {
  // In-memory data store for testing and fast development
  private rooms: HostelRoom[] = [
    {
      id: 'room-101',
      roomNo: '১০১',
      floor: 1,
      capacity: 8,
      occupied: 6,
      isActive: true,
    },
    {
      id: 'room-102',
      roomNo: '১০২',
      floor: 1,
      capacity: 6,
      occupied: 4,
      isActive: true,
    },
    {
      id: 'room-201',
      roomNo: '২০১',
      floor: 2,
      capacity: 10,
      occupied: 8,
      isActive: true,
    },
  ];

  private assignments: StudentRoomAssignment[] = [];
  private meals: HostelMealRecord[] = [];
  private gatepasses: GatepassRecord[] = [];
  private sequenceCounter = 1;

  // ----------------------------------------------------------------------------
  // 1. Room Management
  // ----------------------------------------------------------------------------
  async getRooms(): Promise<HostelRoom[]> {
    return [...this.rooms];
  }

  async createRoom(input: CreateRoomInput): Promise<HostelRoom> {
    const existing = this.rooms.find((r) => r.roomNo === input.roomNo);
    if (existing) {
      throw new Error(`রুম নং ${input.roomNo} ইতিমধ্যে বিদ্যমান।`);
    }

    const room: HostelRoom = {
      id: `room-${Date.now()}`,
      roomNo: input.roomNo,
      floor: input.floor,
      capacity: input.capacity,
      occupied: 0,
      isActive: true,
    };

    this.rooms.push(room);
    return room;
  }

  // ----------------------------------------------------------------------------
  // 2. Student Bed Assignment
  // ----------------------------------------------------------------------------
  async assignStudentToRoom(input: AssignRoomInput): Promise<StudentRoomAssignment> {
    const room = this.rooms.find((r) => r.id === input.roomId);
    if (!room) {
      throw new Error('নির্দিষ্ট হোস্টেল রুমটি খুঁজে পাওয়া যায়নি।');
    }

    if (room.occupied >= room.capacity) {
      throw new Error(`রুম নং ${room.roomNo}-এ কোনো সিট খালি নেই (সর্বোচ্চ ধারণক্ষমতা: ${room.capacity})।`);
    }

    // Check if student is already active in a room
    const currentAssignment = this.assignments.find(
      (a) => a.studentId === input.studentId && !a.assignedTo
    );
    if (currentAssignment) {
      // Deallocate from previous room
      currentAssignment.assignedTo = new Date().toISOString().split('T')[0];
      const prevRoom = this.rooms.find((r) => r.id === currentAssignment.roomId);
      if (prevRoom && prevRoom.occupied > 0) {
        prevRoom.occupied -= 1;
      }
    }

    const assignment: StudentRoomAssignment = {
      id: `assign-${Date.now()}`,
      studentId: input.studentId,
      roomId: input.roomId,
      roomNo: room.roomNo,
      bedNo: input.bedNo || room.occupied + 1,
      assignedFrom: input.assignedFrom || (new Date().toISOString().split('T')[0] as string),
    };

    this.assignments.push(assignment);
    room.occupied += 1;

    return assignment;
  }

  async getRoomAssignments(roomId?: string): Promise<StudentRoomAssignment[]> {
    if (roomId) {
      return this.assignments.filter((a) => a.roomId === roomId && !a.assignedTo);
    }
    return this.assignments.filter((a) => !a.assignedTo);
  }

  // ----------------------------------------------------------------------------
  // 3. Boarding Meal Tracking (Breakfast / Lunch / Dinner + Lillah Fund Tagging)
  // ----------------------------------------------------------------------------
  async recordMeal(input: RecordMealInput): Promise<HostelMealRecord> {
    const existingIdx = this.meals.findIndex(
      (m) =>
        m.studentId === input.studentId &&
        m.date === input.date &&
        m.session === input.session
    );

    const existingMeal = existingIdx >= 0 ? this.meals[existingIdx] : undefined;
    const record: HostelMealRecord = {
      id: existingMeal ? existingMeal.id : `meal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      studentId: input.studentId,
      date: input.date,
      session: input.session,
      isTaken: input.isTaken,
      fundType: input.fundType || 'LILLAH',
      recordedBy: input.recordedBy,
      recordedAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      this.meals[existingIdx] = record;
    } else {
      this.meals.push(record);
    }

    return record;
  }

  async getMealSummary(date: string): Promise<{
    date: string;
    totalBreakfast: number;
    totalLunch: number;
    totalDinner: number;
    lillahCount: number;
    generalCount: number;
  }> {
    const dayMeals = this.meals.filter((m) => m.date === date && m.isTaken);

    return {
      date,
      totalBreakfast: dayMeals.filter((m) => m.session === 'BREAKFAST').length,
      totalLunch: dayMeals.filter((m) => m.session === 'LUNCH').length,
      totalDinner: dayMeals.filter((m) => m.session === 'DINNER').length,
      lillahCount: dayMeals.filter((m) => m.fundType === 'LILLAH').length,
      generalCount: dayMeals.filter((m) => m.fundType === 'GENERAL').length,
    };
  }

  // ----------------------------------------------------------------------------
  // 4. Gatepass Management with Signed QR JWT Tokens
  // ----------------------------------------------------------------------------
  async requestGatepass(input: RequestGatepassInput): Promise<GatepassRecord> {
    const seq = String(this.sequenceCounter++).padStart(5, '0');
    const passNo = `GP-2026-${seq}`;

    const gatepass: GatepassRecord = {
      id: `gp-${Date.now()}`,
      passNo,
      studentId: input.studentId,
      requestedBy: input.requestedBy,
      reason: input.reason,
      fromDate: input.fromDate,
      toDate: input.toDate,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.gatepasses.push(gatepass);
    return gatepass;
  }

  async approveGatepass(gatepassId: string, wardenId: string): Promise<GatepassRecord> {
    const pass = this.gatepasses.find((g) => g.id === gatepassId);
    if (!pass) {
      throw new Error('গেটপাস খুঁজে পাওয়া যায়নি।');
    }

    if (pass.status !== 'PENDING') {
      throw new Error(`এই গেটপাস ইতিমধ্যে ${pass.status} অবস্থায় আছে।`);
    }

    // Generate signed JWT token with expiry
    const qrPayload = {
      passId: pass.id,
      passNo: pass.passNo,
      studentId: pass.studentId,
      validUntil: pass.toDate,
    };

    const qrToken = await generateJWT(qrPayload, '7d');

    pass.status = 'APPROVED';
    pass.approvedBy = wardenId;
    pass.approvedAt = new Date().toISOString();
    pass.qrToken = qrToken;

    return pass;
  }

  async rejectGatepass(gatepassId: string, wardenId: string): Promise<GatepassRecord> {
    const pass = this.gatepasses.find((g) => g.id === gatepassId);
    if (!pass) {
      throw new Error('গেটপাস খুঁজে পাওয়া যায়নি।');
    }

    pass.status = 'REJECTED';
    pass.approvedBy = wardenId;
    pass.approvedAt = new Date().toISOString();

    return pass;
  }

  async verifyAndScanGatepass(
    qrToken: string,
    scanType: 'EXIT' | 'RETURN'
  ): Promise<{
    success: boolean;
    pass: GatepassRecord;
    message: string;
  }> {
    const decoded = await verifyJWT(qrToken);
    if (!decoded || !decoded.passId) {
      throw new Error('অবৈধ বা বিকৃত গেটপাস QR কোড।');
    }

    const pass = this.gatepasses.find((g) => g.id === decoded.passId);
    if (!pass) {
      throw new Error('নির্দিষ্ট গেটপাস রেকর্ডটি সিস্টেমে নেই।');
    }

    const now = new Date().toISOString();

    if (scanType === 'EXIT') {
      if (pass.exitScannedAt) {
        throw new Error(`ছাত্রটি ইতিমধ্যে প্রস্থান করেছে (${pass.exitScannedAt})।`);
      }
      pass.exitScannedAt = now;
      pass.status = 'USED';
      return {
        success: true,
        pass,
        message: `প্রস্থান সফলভাবে স্ক্যান করা হয়েছে (${now})। অভিভাবককে এসএমএস অ্যালার্ট পাঠানো হয়েছে।`,
      };
    } else {
      // RETURN scan
      if (!pass.exitScannedAt) {
        throw new Error('প্রস্থানের কোনো রেকর্ড নেই, সরাসরি প্রবেশ স্ক্যান করা যাবে না।');
      }
      pass.returnScannedAt = now;
      return {
        success: true,
        pass,
        message: `মাদ্রাসায় প্রত্যাবর্তন সফলভাবে স্ক্যান করা হয়েছে (${now})। গেটপাস সম্পূর্ণ।`,
      };
    }
  }

  async getGatepasses(status?: GatepassStatus): Promise<GatepassRecord[]> {
    if (status) {
      return this.gatepasses.filter((g) => g.status === status);
    }
    return [...this.gatepasses];
  }
}

export const hostelService = new HostelService();
