import { Request, Response } from 'express';
import { hostelService } from './hostel.service.js';

export class HostelController {
  // 1. Rooms
  async getRooms(_req: Request, res: Response) {
    try {
      const rooms = await hostelService.getRooms();
      return res.json({ success: true, data: rooms });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  async createRoom(req: Request, res: Response) {
    try {
      const { roomNo, floor, capacity } = req.body;
      if (!roomNo || !capacity) {
        return res.status(400).json({ success: false, error: { message: 'রুম নম্বর এবং ধারণক্ষমতা আবশ্যক।' } });
      }
      const room = await hostelService.createRoom({ roomNo, floor: floor || 1, capacity });
      return res.status(201).json({ success: true, data: room });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  // 2. Bed Assignment
  async assignRoom(req: Request, res: Response) {
    try {
      const { studentId, roomId, bedNo, assignedFrom } = req.body;
      if (!studentId || !roomId) {
        return res.status(400).json({ success: false, error: { message: 'শিক্ষার্থী এবং রুম আইডি আবশ্যক।' } });
      }
      const assignment = await hostelService.assignStudentToRoom({
        studentId,
        roomId,
        bedNo,
        assignedFrom,
        assignedBy: req.user?.userId,
      });
      return res.status(201).json({ success: true, data: assignment });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getAssignments(req: Request, res: Response) {
    try {
      const { roomId } = req.query;
      const assignments = await hostelService.getRoomAssignments(roomId as string | undefined);
      return res.json({ success: true, data: assignments });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  // 3. Meals
  async recordMeal(req: Request, res: Response) {
    try {
      const { studentId, date, session, isTaken, fundType } = req.body;
      if (!studentId || !date || !session) {
        return res.status(400).json({ success: false, error: { message: 'শিক্ষার্থী, তারিখ এবং মিল সেশন আবশ্যক।' } });
      }
      const record = await hostelService.recordMeal({
        studentId,
        date,
        session,
        isTaken: isTaken !== undefined ? isTaken : true,
        fundType: fundType || 'LILLAH',
        recordedBy: req.user?.userId,
      });
      return res.status(201).json({ success: true, data: record });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getMealSummary(req: Request, res: Response) {
    try {
      const date = (req.query.date as string) || (new Date().toISOString().split('T')[0] as string);
      const summary = await hostelService.getMealSummary(date);
      return res.json({ success: true, data: summary });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }

  // 4. Gatepass
  async requestGatepass(req: Request, res: Response) {
    try {
      const { studentId, reason, fromDate, toDate } = req.body;
      if (!studentId || !reason || !fromDate || !toDate) {
        return res.status(400).json({ success: false, error: { message: 'শিক্ষার্থী, কারণ ও সময়সীমা আবশ্যক।' } });
      }
      const gatepass = await hostelService.requestGatepass({
        studentId,
        requestedBy: req.user?.userId || 'parent-app',
        reason,
        fromDate,
        toDate,
      });
      return res.status(201).json({ success: true, data: gatepass });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async approveGatepass(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const approved = await hostelService.approveGatepass(id, req.user?.userId || 'warden');
      return res.json({ success: true, data: approved });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async rejectGatepass(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, error: { message: 'আইডি আবশ্যক।' } });
      }
      const rejected = await hostelService.rejectGatepass(id, req.user?.userId || 'warden');
      return res.json({ success: true, data: rejected });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async scanGatepass(req: Request, res: Response) {
    try {
      const { qrToken, scanType } = req.body;
      if (!qrToken || !scanType) {
        return res.status(400).json({ success: false, error: { message: 'QR টোকেন এবং স্ক্যান টাইপ (EXIT/RETURN) আবশ্যক।' } });
      }
      const result = await hostelService.verifyAndScanGatepass(qrToken, scanType);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, error: { message: error.message } });
    }
  }

  async getGatepasses(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const list = await hostelService.getGatepasses(status as any);
      return res.json({ success: true, data: list });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
}

export const hostelController = new HostelController();
