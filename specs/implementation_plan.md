# Madrasa Management SaaS - Implementation Plan

## 1. Architectural Philosophy (Developer-Friendly & Scalable)
The system is designed with a **Developer-Friendly, Plug-and-Play Modular Architecture**. 
- **Easy Future Expansion:** Even after the software is deployed and running live, new modules (e.g., a new "Healthcare" module) can be added simply by dropping a new folder into `src/modules/` without touching or breaking existing core files.
- **Microservice-Ready:** The codebase is loosely coupled. Features are heavily isolated, making it incredibly easy for any developer to understand, maintain, and scale the application as the business grows.

## 2. Directory Structure (Modular)
```text
src/
├── config/                  # Global configs (DB, Environment variables)
├── core/                    # Shared middleware (Auth, Tenant Identification)
└── modules/
    ├── super-admin/         # Super Admin panel APIs
    ├── madrasa-onboarding/  # Tenant creation, domain/IP mapping
    ├── auth/                # Login, RBAC, User Activity Log
    ├── academic/            # Classes, Routines, Exams, Tabulation
    ├── attendance/          # RFID/Biometric integration
    ├── accounts/            # Fees, Fines, Day-book, Cash-book, Payroll
    ├── hostel/              # Room mapping, Meal-rate calculation
    ├── communication/       # Bulk SMS, Notifications
    ├── inventory/           # Asset tracking, Grocery supplies
    └── app-api/             # Dedicated endpoints for Mobile Apps
```

## 3. Step-by-Step Task Breakdown

### Phase 1: Base Setup & Security 
- [ ] Initialize Node.js project with standard linting/formatting.
- [ ] Setup Database Connection (with Multi-tenant isolation strategy).
- [ ] Create base error handler to catch all bugs cleanly.
- [ ] Setup `config/` and `.env` parsing safely.

### Phase 2: Super Admin & Tenant Onboarding
- [ ] Create `super-admin` module.
- [ ] Implement Madrasa registration request API.
- [ ] Implement Super Admin approval API (creates separate tenant space/database profile).
- [ ] **Super Admin Global Access:** Super admin can view and monitor ALL data across ALL madrasas.
- [ ] Tenant identifier middleware (routing traffic based on Madrasa IP/Subdomain).

### Phase 3: Core Authentication, RBAC & Audit Trail
- [ ] Create `auth` module with JWT-based login.
- [ ] Define Roles: SuperAdmin, MadrasaAdmin, Teacher, Accountant, Auditor.
- [ ] **User Activity Log (History):** 
    - **Madrasa Admin Access:** Each Madrasa Admin can view the full activity log of their own institution (tracking what their teachers, accountants, or staff are doing).
    - **Super Admin Access:** Can view logs globally across all 1000+ madrasas if needed for troubleshooting.

### Phase 4: Core Administrative & Academic Modules
- [ ] **Student Management**: Admission form, Section assign, and linking Parents Profile.
- [ ] **Digital ID Generation**: Auto-generate and print student/teacher ID cards.
- [ ] **Smart Attendance**: RFID/Biometric integration with auto SMS alert.
- [ ] **Academic & Classes**: Teacher portal access, routine management.
- [ ] **Exam & Results**: Tabulation sheet generation, Question Paper Generator, and Qawmi/Alia Board format marksheets.
- [ ] **Library Management**: Book issue, return date, and late fine tracking.

### Phase 5: Advanced Financial & HR Modules
- [ ] **Accounts & Fees**: Fee collection, Online Payment Gateway (bKash/Card), and automated Late Fine calculation.
- [ ] **Professional Audit**: Day-book, Cash-book, Ledger, and Trial Balance reports.
- [ ] **Shariah Funds**: Separate cash ledgers for Zakat, Lillah boarding, and general funds.
- [ ] **HR & Payroll**: Teacher leave management, Provident Fund, and automated salary generation.
- [ ] **Inventory & Assets**: Tracking Madrasa assets and hostel grocery/kitchen supplies.

### Phase 6: Specialized Madrasa & Security Features
- [ ] **Hifz Tracker**: Daily tracking of Sabaq, Sabqi, and Manzil with mistake analysis for parents.
- [ ] **Hostel Management**: Room mapping, meal-rate calculation, and boarding fee automation.
- [ ] **Gate Pass Security**: Visitor entry log and digital out-pass for boarding students.
- [ ] **Behavior & Discipline**: Point-based reward/demerit system to track student conduct.
- [ ] **Transport & GPS**: Bus route management, driver info, and transport fee collection.

### Phase 7: Mobile App & Communication
- [ ] **App-API Module**: Build secure endpoints for mobile apps.
- [ ] **Bulk SMS Gateway**: Automated SMS for exam results, bulk notices, and due fees.
- [ ] **Alumni Network**: Database of graduates for networking and donation requests.

### Phase 8: CMS & Public Website Builder (For Each Madrasa)
- [ ] **Dynamic Website**: Auto-generated public-facing website for each Madrasa (on their own subdomain).
- [ ] **Notice & News Portal**: Publish admission notices, event news, and cultural activities.
- [ ] **Online Admission Forms**: Public forms for new student registrations directly from the website.
- [ ] **Multi-Branch Support**: Manage multiple campuses under one Admin account.

## 4. Debugging & Maintenance Strategy
- Designed for rapid onboarding of new developers.
- If attendance fails -> Only check `src/modules/attendance/`
- No cross-file spaghetti code. Modifying one API does not break another.
