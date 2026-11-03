import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';

import { authRoutes } from './modules/auth/auth.routes.js';
import { superAdminRouter, publicMadrasaRouter } from './modules/super-admin/superAdmin.routes.js';
import { studentRoutes } from './modules/students/student.routes.js';
import { financeRoutes } from './modules/finance/finance.routes.js';
import { academicRoutes } from './modules/academic/academic.routes.js';
import { mobileRoutes } from './modules/mobile/mobile.routes.js';
import { hostelRoutes } from './modules/hostel/hostel.routes.js';
import { libraryRoutes } from './modules/library/library.routes.js';
import { communicationRoutes } from './modules/communication/communication.routes.js';

export const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Configuration
const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((origin: string) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl) or allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked request from origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

// 3. Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      details: 'Too many requests, please try again later.',
    },
  },
});
app.use('/api/', globalLimiter);

// 5. Authentication & Identity Routes
app.use('/api/auth', authRoutes);

// 6. Public Registration & Super Admin Routes
app.use('/api/public/madrasa', publicMadrasaRouter);
app.use('/api/super', superAdminRouter);

// 7. Student Management & Academic Structure Routes
app.use('/api/students', studentRoutes);

// 8. Finance, Fee Collection & POS Routes
app.use('/api/finance', financeRoutes);

// 9. Academic, Hifz, Attendance & Exam Routes
app.use('/api/academic', academicRoutes);

// 10. Mobile App Endpoints (Parent & Teacher)
app.use('/api/mobile', mobileRoutes);

// 11. Hostel, Boarding Meals & Gatepass Routes
app.use('/api/hostel', hostelRoutes);

// 12. Library Management Routes
app.use('/api/library', libraryRoutes);

// 13. Communication, Notices & SMS Routes
app.use('/api/communication', communicationRoutes);

// 14. System Health & Infrastructure Monitoring Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    success: true,
    status: 'HEALTHY',
    system: 'জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম Core API',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    timezone: env.TZ,
    uptimeSeconds: Math.floor(process.uptime()),
    memory: {
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
    },
  });
});

// 6. Central 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      details: `Endpoint ${req.method} ${req.originalUrl} does not exist.`,
    },
  });
});

// 7. Central Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      details: env.NODE_ENV === 'production' ? 'An unexpected internal error occurred.' : err.message,
    },
  });
});
