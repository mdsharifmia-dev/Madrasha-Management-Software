import { describe, it, expect } from 'vitest';
import { hostelService } from './hostel.service.js';

describe('Phase 8: Hostel, Meals & Gatepass Service Tests', () => {
  it('should list existing rooms and create a new room with capacity limits', async () => {
    const initialRooms = await hostelService.getRooms();
    expect(initialRooms.length).toBeGreaterThan(0);

    const newRoom = await hostelService.createRoom({
      roomNo: '৩০১',
      floor: 3,
      capacity: 12,
    });

    expect(newRoom.roomNo).toBe('৩০১');
    expect(newRoom.capacity).toBe(12);
    expect(newRoom.occupied).toBe(0);
  });

  it('should assign a student to a room and update occupancy', async () => {
    const rooms = await hostelService.getRooms();
    const targetRoom = rooms[0];
    const initialOccupancy = targetRoom.occupied;

    const assignment = await hostelService.assignStudentToRoom({
      studentId: 'std-hostel-001',
      roomId: targetRoom.id,
      assignedFrom: '2026-01-01',
    });

    expect(assignment.studentId).toBe('std-hostel-001');
    expect(assignment.roomId).toBe(targetRoom.id);
    expect(targetRoom.occupied).toBe(initialOccupancy + 1);
  });

  it('should record boarding meals and categorize by Lillah and General funds', async () => {
    const today = '2026-10-15';

    // Student 1: Lillah meal
    await hostelService.recordMeal({
      studentId: 'std-001',
      date: today,
      session: 'BREAKFAST',
      isTaken: true,
      fundType: 'LILLAH',
    });

    // Student 2: General meal
    await hostelService.recordMeal({
      studentId: 'std-002',
      date: today,
      session: 'BREAKFAST',
      isTaken: true,
      fundType: 'GENERAL',
    });

    // Student 1: Lunch
    await hostelService.recordMeal({
      studentId: 'std-001',
      date: today,
      session: 'LUNCH',
      isTaken: true,
      fundType: 'LILLAH',
    });

    const summary = await hostelService.getMealSummary(today);
    expect(summary.totalBreakfast).toBe(2);
    expect(summary.totalLunch).toBe(1);
    expect(summary.lillahCount).toBe(2);
    expect(summary.generalCount).toBe(1);
  });

  it('should handle gatepass lifecycle: request -> approve with signed QR -> exit scan -> return scan', async () => {
    // 1. Request
    const request = await hostelService.requestGatepass({
      studentId: 'std-001',
      requestedBy: 'parent-001',
      reason: 'জরুরি পারিবারিক অনুষ্ঠানে অংশগ্রহণ',
      fromDate: '2026-10-16T08:00:00.000Z',
      toDate: '2026-10-18T18:00:00.000Z',
    });

    expect(request.passNo).toMatch(/^GP-2026-\d{5}$/);
    expect(request.status).toBe('PENDING');

    // 2. Approve
    const approved = await hostelService.approveGatepass(request.id, 'warden-001');
    expect(approved.status).toBe('APPROVED');
    expect(approved.qrToken).toBeDefined();

    // 3. Gate Scanner: Exit Scan
    const exitResult = await hostelService.verifyAndScanGatepass(approved.qrToken!, 'EXIT');
    expect(exitResult.success).toBe(true);
    expect(exitResult.pass.status).toBe('USED');
    expect(exitResult.pass.exitScannedAt).toBeDefined();

    // 4. Gate Scanner: Return Scan
    const returnResult = await hostelService.verifyAndScanGatepass(approved.qrToken!, 'RETURN');
    expect(returnResult.success).toBe(true);
    expect(returnResult.pass.returnScannedAt).toBeDefined();
  });
});
