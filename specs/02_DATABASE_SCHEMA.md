# ️ Database Schema Specification
## জাতীয় মাদ্রাসা ম্যানেজমেন্ট প্ল্যাটফর্ম

**সংস্করণ:** 1.0.0 | **Engine:** PostgreSQL 16 | **ORM:** Prisma

---

## ১. নামকরণের নিয়ম (Naming Conventions)

```
Tables:    snake_case, plural         (students, fee_receipts)
Columns:   snake_case                 (created_at, student_code)
Schema:    m_001, m_002, ...          (prefix: m_ + zero-padded ID)
Indexes:   idx_{table}_{column}       (idx_students_class_id)
FK:        fk_{table}_{ref_table}     (fk_students_class_id)
Enums:     SCREAMING_SNAKE_CASE       (MADRASA_TYPE, FEE_STATUS)
```

---

## ২. Control Database (`public` schema)

### ২.১ madrasa_registry — মাদ্রাসার তালিকা

```sql
madrasa_registry
├── id                UUID        PRIMARY KEY DEFAULT gen_random_uuid()
├── schema_name       VARCHAR(20) UNIQUE NOT NULL   -- "m_001"
├── code              VARCHAR(10) UNIQUE NOT NULL   -- "MDR-001"
│
├── name_bn           VARCHAR(200) NOT NULL
├── name_en           VARCHAR(200)
├── type              ENUM(QAWMI, ALIA, HAFIZIYA, NURANI, MIXED) NOT NULL
├── sub_type          VARCHAR(50)                  -- দাখিল/আলিম/ফাজিল
│
├── division          VARCHAR(50) NOT NULL
├── district          VARCHAR(50) NOT NULL
├── thana             VARCHAR(50) NOT NULL
├── address           TEXT
├── gps_lat           DECIMAL(10,7)
├── gps_lng           DECIMAL(10,7)
│
├── muhtamim_name     VARCHAR(100) NOT NULL
├── muhtamim_phone    VARCHAR(20) NOT NULL          -- encrypted at app level
├── muhtamim_email    VARCHAR(150)
│
├── status            ENUM(PENDING, ACTIVE, SUSPENDED, CANCELLED) DEFAULT 'PENDING'
├── suspension_reason TEXT
├── suspended_at      TIMESTAMPTZ
│
├── plan_id           UUID → subscription_plans.id
├── plan_expires_at   TIMESTAMPTZ
├── trial_ends_at     TIMESTAMPTZ
│
├── student_count     INT DEFAULT 0               -- cached, updated nightly
├── staff_count       INT DEFAULT 0
├── sms_balance       INT DEFAULT 0               -- remaining SMS credits
├── storage_used_mb   INT DEFAULT 0
│
├── db_user           VARCHAR(50) UNIQUE           -- PostgreSQL user for this schema
├── db_password_enc   TEXT                         -- encrypted, stored in vault
├── enc_key_ref       VARCHAR(100)                 -- reference to vault key
│
├── setup_token       UUID                         -- one-time setup link
├── setup_token_exp   TIMESTAMPTZ
│
├── approved_by       UUID → agency_staff.id
├── approved_at       TIMESTAMPTZ
├── created_at        TIMESTAMPTZ DEFAULT now()
└── updated_at        TIMESTAMPTZ DEFAULT now()
```

### ২.২ subscription_plans — প্যাকেজ

```sql
subscription_plans
├── id               UUID PRIMARY KEY
├── name             VARCHAR(50) UNIQUE          -- Trial, Basic, Standard, Enterprise
├── price_monthly    NUMERIC(10,2) NOT NULL
├── price_yearly     NUMERIC(10,2) NOT NULL
├── max_students     INT NOT NULL
├── max_staff        INT NOT NULL
├── sms_monthly      INT DEFAULT 0               -- included SMS per month
├── features         JSONB NOT NULL              -- {"parent_app": true, "online_pay": false, ...}
├── is_active        BOOLEAN DEFAULT true
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()
```

### ২.৩ billing_invoices — বিলিং ইনভয়েস

```sql
billing_invoices
├── id               UUID PRIMARY KEY
├── invoice_no       VARCHAR(20) UNIQUE           -- INV-2025-00001 (sequence)
├── madrasa_id       UUID → madrasa_registry.id
├── plan_id          UUID → subscription_plans.id
├── period_start     DATE NOT NULL
├── period_end       DATE NOT NULL
├── amount           NUMERIC(10,2) NOT NULL
├── status           ENUM(DRAFT, UNPAID, PAID, OVERDUE, WAIVED) DEFAULT 'UNPAID'
├── due_date         DATE NOT NULL
├── payment_method   VARCHAR(50)                  -- bkash, nagad, bank, cash
├── transaction_id   VARCHAR(100)
├── gateway_ref      VARCHAR(200)
├── paid_at          TIMESTAMPTZ
├── paid_by          UUID → agency_staff.id
├── notes            TEXT
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()
```

### ২.৪ agency_staff — সুপার অ্যাডমিনের দলের সদস্য

```sql
agency_staff
├── id               UUID PRIMARY KEY
├── name             VARCHAR(100) NOT NULL
├── email            VARCHAR(150) UNIQUE NOT NULL
├── phone            VARCHAR(20)
├── password_hash    TEXT NOT NULL               -- Argon2id
├── role             ENUM(OWNER, SUPPORT, BILLING, SALES, DEVELOPER) NOT NULL
├── permissions      JSONB DEFAULT '{}'          -- granular override
├── totp_secret      TEXT                        -- 2FA
├── totp_enabled     BOOLEAN DEFAULT false
├── is_active        BOOLEAN DEFAULT true
├── last_login_at    TIMESTAMPTZ
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()
```

### ২.৫ support_tickets — সাপোর্ট টিকিট

```sql
support_tickets
├── id               UUID PRIMARY KEY
├── ticket_no        VARCHAR(15) UNIQUE           -- TKT-00001 (sequence)
├── madrasa_id       UUID → madrasa_registry.id
├── submitted_by     UUID                         -- tenant users.id
├── subject          VARCHAR(200) NOT NULL
├── message          TEXT NOT NULL
├── priority         ENUM(LOW, MEDIUM, HIGH, CRITICAL) DEFAULT 'MEDIUM'
├── status           ENUM(OPEN, IN_PROGRESS, RESOLVED, CLOSED) DEFAULT 'OPEN'
├── assigned_to      UUID → agency_staff.id
├── resolved_at      TIMESTAMPTZ
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()

ticket_messages (conversation thread)
├── id               UUID PRIMARY KEY
├── ticket_id        UUID → support_tickets.id
├── sender_type      ENUM(MADRASA, AGENCY)
├── sender_id        UUID
├── message          TEXT NOT NULL
└── created_at       TIMESTAMPTZ DEFAULT now()
```

### ২.৬ system_audit_log — অপরিবর্তনীয় সুপার অ্যাডমিন লগ

```sql
system_audit_log
├── id               BIGSERIAL PRIMARY KEY
├── event_type       VARCHAR(50) NOT NULL         -- MADRASA_APPROVED, PLAN_CHANGED...
├── actor_id         UUID NOT NULL
├── actor_type       ENUM(AGENCY_STAFF, SYSTEM)
├── target_id        UUID
├── target_type      VARCHAR(50)
├── details          JSONB DEFAULT '{}'
├── ip_address       INET
├── user_agent       TEXT
├── created_at       TIMESTAMPTZ DEFAULT now()
├── prev_hash        CHAR(64)                     -- SHA-256 of previous row
└── curr_hash        CHAR(64)                     -- SHA-256 of this row's data
-- NO UPDATE, NO DELETE permissions on this table
```

---

## ৩. Tenant Database (প্রতিটি মাদ্রাসার Schema: `m_001`, `m_002`...)

### ব্লক ১: ব্যবহারকারী ও নিরাপত্তা

```sql
roles
├── id               UUID PRIMARY KEY
├── name             VARCHAR(50) NOT NULL         -- মুহতামিম, হিসাবরক্ষক, ক্যাশিয়ার...
├── permissions      JSONB NOT NULL
│   -- {
│   --   "students":    {"read": true, "create": true, "edit": true, "delete": false, "export": true},
│   --   "fees":        {"read": true, "create": true, "approve": false, ...},
│   --   "payroll":     {"read": false, ...},
│   --   "audit_log":   {"read": true},
│   --   ...
│   -- }
├── is_system_role   BOOLEAN DEFAULT false        -- system roles cannot be deleted
├── created_by       UUID
└── created_at       TIMESTAMPTZ DEFAULT now()

users
├── id               UUID PRIMARY KEY
├── name             VARCHAR(100) NOT NULL
├── phone            VARCHAR(20) UNIQUE           -- login identifier
├── email            VARCHAR(150) UNIQUE
├── password_hash    TEXT                         -- Argon2id (NULL for OTP-only)
├── role_id          UUID → roles.id
├── is_active        BOOLEAN DEFAULT true
├── totp_secret      TEXT                         -- 2FA secret (encrypted)
├── totp_enabled     BOOLEAN DEFAULT false
├── failed_logins    INT DEFAULT 0
├── locked_until     TIMESTAMPTZ
├── last_login_at    TIMESTAMPTZ
├── last_login_ip    INET
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()

-- Append-only audit log (NO UPDATE/DELETE on this table)
audit_log
├── id               BIGSERIAL PRIMARY KEY
├── event_type       VARCHAR(50) NOT NULL
├── actor_id         UUID                         -- users.id (NULL = system)
├── table_name       VARCHAR(50)
├── record_id        TEXT
├── old_values       JSONB
├── new_values       JSONB
├── ip_address       INET
├── device_fp        VARCHAR(100)                 -- device fingerprint
├── created_at       TIMESTAMPTZ DEFAULT now()
├── prev_hash        CHAR(64)
└── curr_hash        CHAR(64)
```

### ব্লক ২: প্রতিষ্ঠান কাঠামো

```sql
departments  -- বিভাগ: হিফজ, নাজেরা, কিতাব, জেনারেল, ইবতিদায়ি...
├── id               UUID PRIMARY KEY
├── name_bn          VARCHAR(100) NOT NULL
├── name_ar          VARCHAR(100)
├── type             ENUM(HIFZ, NAZIRAH, KITAB, GENERAL, IBTIDAYI, OTHER)
├── sort_order       INT DEFAULT 0
└── is_active        BOOLEAN DEFAULT true

classes  -- জামাত / শ্রেণি
├── id               UUID PRIMARY KEY
├── department_id    UUID → departments.id
├── name_bn          VARCHAR(100) NOT NULL
├── name_ar          VARCHAR(100)
├── academic_year    INT NOT NULL                 -- 2025
├── hijri_year       VARCHAR(10)                  -- ১৪৪৭
├── sort_order       INT DEFAULT 0
└── is_active        BOOLEAN DEFAULT true

sections  -- শাখা (ক, খ, গ)
├── id               UUID PRIMARY KEY
├── class_id         UUID → classes.id
├── name             VARCHAR(10) NOT NULL
└── capacity         INT
```

### ব্লক ৩: ছাত্র ও ভর্তি

```sql
admission_applications
├── id               UUID PRIMARY KEY
├── application_no   VARCHAR(20) UNIQUE           -- APP-2025-0001 (sequence)
├── applicant_name   VARCHAR(100) NOT NULL
├── dob              DATE
├── class_applied    UUID → classes.id
├── guardian_name    VARCHAR(100) NOT NULL
├── guardian_phone   VARCHAR(20) NOT NULL
├── status           ENUM(PENDING, APPROVED, REJECTED, WAITLISTED) DEFAULT 'PENDING'
├── rejection_note   TEXT
├── reviewed_by      UUID → users.id
├── reviewed_at      TIMESTAMPTZ
├── student_id       UUID → students.id           -- filled after approval
└── created_at       TIMESTAMPTZ DEFAULT now()

students
├── id               UUID PRIMARY KEY
├── student_code     VARCHAR(20) UNIQUE NOT NULL  -- DHK-2025-0001 (sequence)
├── name_bn          VARCHAR(100) NOT NULL
├── name_en          VARCHAR(100)
├── name_ar          VARCHAR(100)
├── dob              DATE NOT NULL
├── gender           ENUM(MALE, FEMALE)
├── birth_cert_no    TEXT                         -- encrypted
├── nid_no           TEXT                         -- encrypted (if adult)
├── blood_group      VARCHAR(5)                   -- A+, B-, O+ etc.
├── photo_key        VARCHAR(200)                 -- object storage key
├── health_notes     TEXT
│
├── class_id         UUID → classes.id
├── section_id       UUID → sections.id
├── roll_no          INT
│
├── boarding_type    ENUM(DAY, BOARDING, EXTERNAL) DEFAULT 'DAY'
├── eats_at_hostel   BOOLEAN DEFAULT false
│
├── admission_date   DATE NOT NULL
├── status           ENUM(ACTIVE, TC, DROPOUT, GRADUATED, DECEASED) DEFAULT 'ACTIVE'
├── tc_date          DATE
├── tc_reason        TEXT
│
├── created_by       UUID → users.id
├── created_at       TIMESTAMPTZ DEFAULT now()
└── updated_at       TIMESTAMPTZ DEFAULT now()

guardians
├── id               UUID PRIMARY KEY
├── student_id       UUID → students.id
├── name             VARCHAR(100) NOT NULL
├── relation         ENUM(FATHER, MOTHER, GUARDIAN, OTHER) NOT NULL
├── phone            TEXT NOT NULL                -- encrypted
├── whatsapp_phone   TEXT                         -- encrypted (if different)
├── address          TEXT
├── nid_no           TEXT                         -- encrypted
├── profession       VARCHAR(100)
├── is_primary       BOOLEAN DEFAULT false
└── app_user_id      UUID → users.id              -- linked to parent app account
```

### ব্লক ৪: হিফজ ও শিক্ষা

```sql
-- Reference table: all 604 pages of the Quran
quran_pages  (604 rows, pre-seeded, immutable)
├── page_no          SMALLINT PRIMARY KEY         -- 1-604
├── para_no          SMALLINT NOT NULL            -- 1-30
├── surah_start      SMALLINT
├── ayah_start       SMALLINT
└── juz_name         VARCHAR(100)                 -- আলিফ লাম মীম...

hifz_progress  -- দৈনিক সবক রেকর্ড
├── id               UUID PRIMARY KEY
├── student_id       UUID → students.id
├── teacher_id       UUID → users.id
├── date             DATE NOT NULL               -- Asia/Dhaka
├── sabaq_from       SMALLINT → quran_pages.page_no   -- নতুন সবক শুরু
├── sabaq_to         SMALLINT → quran_pages.page_no   -- নতুন সবক শেষ
├── sabqi_from       SMALLINT → quran_pages.page_no   -- পুরনো সবক শুরু
├── sabqi_to         SMALLINT → quran_pages.page_no   -- পুরনো সবক শেষ
├── manzil_from      SMALLINT → quran_pages.page_no   -- আমুখতা শুরু
├── manzil_to        SMALLINT → quran_pages.page_no   -- আমুখতা শেষ
├── quality          ENUM(MUMTAZ, JAYYID_JIDDAN, JAYYID, MAQBUL, RASIB)
├── notes            TEXT
└── UNIQUE (student_id, date)

subjects  -- বিষয়
├── id               UUID PRIMARY KEY
├── class_id         UUID → classes.id
├── name_bn          VARCHAR(100) NOT NULL
├── name_ar          VARCHAR(100)
├── name_en          VARCHAR(100)
├── full_marks       INT DEFAULT 100
├── pass_marks       INT DEFAULT 33
└── sort_order       INT DEFAULT 0

timetable  -- রুটিন
├── id               UUID PRIMARY KEY
├── class_id         UUID → classes.id
├── section_id       UUID → sections.id
├── subject_id       UUID → subjects.id
├── teacher_id       UUID → users.id
├── day_of_week      SMALLINT NOT NULL            -- 0=Sat, 1=Sun ... 4=Wed (BD school week)
├── period_no        SMALLINT NOT NULL
├── start_time       TIME NOT NULL
├── end_time         TIME NOT NULL
└── room_no          VARCHAR(20)
```

### ব্লক ৫: হাজিরা

```sql
student_attendance
├── id               UUID PRIMARY KEY
├── student_id       UUID → students.id
├── class_id         UUID → classes.id
├── date             DATE NOT NULL               -- Asia/Dhaka
├── period_no        SMALLINT                    -- NULL = full day
├── status           ENUM(PRESENT, ABSENT, LATE, LEAVE, HOLIDAY) NOT NULL
├── marked_by        UUID → users.id
├── marked_at        TIMESTAMPTZ DEFAULT now()
├── source           ENUM(MANUAL, BIOMETRIC, QR_SCAN, APP)
├── notes            TEXT
└── UNIQUE (student_id, date, COALESCE(period_no, -1))

staff_attendance
├── id               UUID PRIMARY KEY
├── user_id          UUID → users.id
├── date             DATE NOT NULL
├── check_in         TIMESTAMPTZ
├── check_out        TIMESTAMPTZ
├── status           ENUM(PRESENT, ABSENT, HALF_DAY, LEAVE, HOLIDAY)
├── source           ENUM(BIOMETRIC, APP_GPS, MANUAL)
├── gps_lat          DECIMAL(10,7)
├── gps_lng          DECIMAL(10,7)
└── UNIQUE (user_id, date)

biometric_devices
├── id               UUID PRIMARY KEY
├── device_serial    VARCHAR(50) UNIQUE NOT NULL
├── device_type      ENUM(ZKTECO_PULL, ADMS_PUSH)
├── api_key_hash     TEXT NOT NULL               -- Argon2id hash of device API key
├── location         VARCHAR(100)
├── is_active        BOOLEAN DEFAULT true
└── last_seen_at     TIMESTAMPTZ
```

### ব্লক ৬: পরীক্ষা ও ফলাফল

```sql
grading_scales  -- মাদ্রাসা নিজে সেট করবে
├── id               UUID PRIMARY KEY
├── madrasa_type     ENUM(QAWMI, ALIA)
├── min_marks        NUMERIC(5,2) NOT NULL
├── max_marks        NUMERIC(5,2) NOT NULL
├── grade_bn         VARCHAR(30) NOT NULL        -- মুমতাজ / A+
├── grade_en         VARCHAR(10) NOT NULL        -- Mumtaz / A+
├── gpa_point        NUMERIC(3,2)                -- 5.00, 4.00...
└── sort_order       INT DEFAULT 0

exams
├── id               UUID PRIMARY KEY
├── name             VARCHAR(200) NOT NULL
├── class_id         UUID → classes.id
├── exam_type        ENUM(WEEKLY, MONTHLY, TERM, ANNUAL, SPECIAL)
├── start_date       DATE NOT NULL
├── end_date         DATE NOT NULL
├── result_locked_at TIMESTAMPTZ
├── is_published     BOOLEAN DEFAULT false        -- false = শিক্ষক দেখেন, true = অভিভাবক দেখেন
├── published_at     TIMESTAMPTZ
├── published_by     UUID → users.id
└── created_by       UUID → users.id

exam_results
├── id               UUID PRIMARY KEY
├── exam_id          UUID → exams.id
├── student_id       UUID → students.id
├── subject_id       UUID → subjects.id
├── teacher_id       UUID → users.id
├── marks_obtained   NUMERIC(5,2)
├── is_absent        BOOLEAN DEFAULT false
├── submitted_at     TIMESTAMPTZ DEFAULT now()
├── is_locked        BOOLEAN DEFAULT false        -- true হলে পরিবর্তন নিষিদ্ধ
└── UNIQUE (exam_id, student_id, subject_id)
```

### ব্লক ৭: হিসাব ও অর্থ

```sql
funds  -- তহবিল (শরীয়াহ-সম্মত আলাদা)
├── id               UUID PRIMARY KEY
├── name             VARCHAR(100) NOT NULL
├── type             ENUM(GENERAL, ZAKAH, SADAQAH, LILLAH, WAQF, CONSTRUCTION, QURBANI, OTHER)
├── current_balance  NUMERIC(15,2) NOT NULL DEFAULT 0
├── bank_account     TEXT                         -- encrypted
└── is_active        BOOLEAN DEFAULT true

chart_of_accounts  -- হিসাবের খাত (ট্রি কাঠামো)
├── id               UUID PRIMARY KEY
├── code             VARCHAR(20) UNIQUE NOT NULL  -- 4-001-01
├── name_bn          VARCHAR(100) NOT NULL
├── account_type     ENUM(INCOME, EXPENSE, ASSET, LIABILITY, EQUITY)
├── fund_id          UUID → funds.id
├── parent_id        UUID → chart_of_accounts.id  -- tree structure
├── is_active        BOOLEAN DEFAULT true
└── sort_order       INT DEFAULT 0

fee_structures  -- ফি কাঠামো
├── id               UUID PRIMARY KEY
├── class_id         UUID → classes.id
├── academic_year    INT NOT NULL
├── fee_type         ENUM(ADMISSION, MONTHLY, HOSTEL, EXAM, LIBRARY, OTHER)
├── name             VARCHAR(100) NOT NULL
├── amount           NUMERIC(10,2) NOT NULL
├── fund_id          UUID → funds.id
├── account_id       UUID → chart_of_accounts.id
├── effective_from   DATE NOT NULL
└── effective_to     DATE

student_invoices  -- মাসিক ইনভয়েস (অটো-জেনারেট)
├── id               UUID PRIMARY KEY
├── invoice_no       VARCHAR(20) UNIQUE           -- INV-2025-00001 (sequence)
├── student_id       UUID → students.id
├── fee_structure_id UUID → fee_structures.id
├── month_year       CHAR(7) NOT NULL             -- "2025-01" (YYYY-MM)
├── amount_due       NUMERIC(10,2) NOT NULL
├── fine_amount      NUMERIC(10,2) DEFAULT 0
├── discount_amount  NUMERIC(10,2) DEFAULT 0
├── discount_by      UUID → users.id              -- approver (maker-checker)
├── discount_reason  TEXT
├── status           ENUM(UNPAID, PARTIAL, PAID, WAIVED, CANCELLED) DEFAULT 'UNPAID'
├── due_date         DATE NOT NULL
└── created_at       TIMESTAMPTZ DEFAULT now()

fee_receipts  -- আর্থিক রসিদ (অপরিবর্তনীয়)
├── id               UUID PRIMARY KEY
├── receipt_no       VARCHAR(20) UNIQUE NOT NULL  -- REC-2025-00001 (DB SEQUENCE)
├── invoice_id       UUID → student_invoices.id
├── student_id       UUID → students.id
├── amount_received  NUMERIC(10,2) NOT NULL
├── payment_method   ENUM(CASH, BKASH, NAGAD, ROCKET, CARD, BANK)
├── transaction_id   VARCHAR(100)                 -- gateway transaction ID
├── gateway_ref      VARCHAR(200)                 -- full gateway response (jsonb)
├── fund_id          UUID → funds.id
├── account_id       UUID → chart_of_accounts.id
├── cashier_id       UUID → users.id
├── received_at      TIMESTAMPTZ NOT NULL         -- Asia/Dhaka stored as UTC
├── is_reversed      BOOLEAN DEFAULT false
├── reversed_by      UUID → users.id
├── reversal_note    TEXT
└── reversal_at      TIMESTAMPTZ
-- NO UPDATE ALLOWED (reversal inserts a new negative entry)

journal_entries  -- ডাবল-এন্ট্রি লেজার
├── id               UUID PRIMARY KEY
├── entry_no         VARCHAR(20) UNIQUE           -- JNL-2025-00001 (sequence)
├── entry_date       DATE NOT NULL
├── description      TEXT NOT NULL
├── source_type      VARCHAR(50)                  -- fee_receipt, payroll, expense...
├── source_id        UUID
├── prepared_by      UUID → users.id
├── approved_by      UUID → users.id              -- maker-checker
├── approved_at      TIMESTAMPTZ
├── is_reversed      BOOLEAN DEFAULT false
├── reversal_of      UUID → journal_entries.id
└── created_at       TIMESTAMPTZ DEFAULT now()

journal_lines  -- ডেবিট-ক্রেডিট লাইন
├── id               UUID PRIMARY KEY
├── entry_id         UUID → journal_entries.id
├── account_id       UUID → chart_of_accounts.id
├── fund_id          UUID → funds.id
├── debit_amount     NUMERIC(15,2) DEFAULT 0
└── credit_amount    NUMERIC(15,2) DEFAULT 0
-- CONSTRAINT: SUM(debit) = SUM(credit) per entry_id

payroll_payments  -- শিক্ষকের বেতন
├── id               UUID PRIMARY KEY
├── payroll_no       VARCHAR(20) UNIQUE           -- PAY-2025-00001 (sequence)
├── user_id          UUID → users.id
├── month_year       CHAR(7) NOT NULL
├── basic_salary     NUMERIC(10,2) NOT NULL
├── allowances       JSONB DEFAULT '{}'           -- {"house": 2000, "transport": 500}
├── deductions       JSONB DEFAULT '{}'           -- {"advance": 1000, "tax": 200}
├── net_salary       NUMERIC(10,2) NOT NULL
├── payment_method   ENUM(CASH, BANK, BKASH)
├── fund_id          UUID → funds.id
├── prepared_by      UUID → users.id
├── approved_by      UUID → users.id              -- maker-checker
├── approved_at      TIMESTAMPTZ
├── paid_at          TIMESTAMPTZ
└── slip_sent_at     TIMESTAMPTZ                  -- when SMS/push sent to teacher
```

### ব্লক ৮: ছাত্রাবাস ও গেটপাস

```sql
hostel_rooms
├── id               UUID PRIMARY KEY
├── room_no          VARCHAR(20) UNIQUE NOT NULL
├── floor            INT
├── capacity         INT NOT NULL
└── is_active        BOOLEAN DEFAULT true

student_room_assignments
├── id               UUID PRIMARY KEY
├── student_id       UUID → students.id
├── room_id          UUID → hostel_rooms.id
├── bed_no           INT
├── assigned_from    DATE NOT NULL
├── assigned_to      DATE
└── assigned_by      UUID → users.id

gatepasses
├── id               UUID PRIMARY KEY
├── pass_no          VARCHAR(20) UNIQUE           -- GP-2025-00001 (sequence)
├── student_id       UUID → students.id
├── requested_by     UUID → users.id              -- guardian's app user
├── reason           TEXT NOT NULL
├── from_date        TIMESTAMPTZ NOT NULL
├── to_date          TIMESTAMPTZ NOT NULL
├── status           ENUM(PENDING, APPROVED, REJECTED, USED, EXPIRED) DEFAULT 'PENDING'
├── approved_by      UUID → users.id
├── approved_at      TIMESTAMPTZ
├── qr_token         VARCHAR(100) UNIQUE          -- signed, time-limited JWT
├── exit_scanned_at  TIMESTAMPTZ
├── return_scanned_at TIMESTAMPTZ
└── created_at       TIMESTAMPTZ DEFAULT now()
```

### ব্লক ৯: যোগাযোগ

```sql
notices
├── id               UUID PRIMARY KEY
├── title            VARCHAR(200) NOT NULL
├── content          TEXT NOT NULL
├── target_type      ENUM(ALL, CLASS, DEPARTMENT, ROLE, INDIVIDUAL)
├── target_ids       UUID[]                       -- specific class/user IDs
├── is_published     BOOLEAN DEFAULT false
├── published_at     TIMESTAMPTZ
├── published_by     UUID → users.id
└── created_at       TIMESTAMPTZ DEFAULT now()

sms_log  -- পাঠানো SMS-এর সত্যিকারের রেকর্ড
├── id               UUID PRIMARY KEY
├── recipient_phone  VARCHAR(20) NOT NULL         -- masked in display
├── message          TEXT NOT NULL
├── gateway          VARCHAR(50) NOT NULL         -- bulksmsbd, sslwireless
├── gateway_msg_id   VARCHAR(100)                 -- gateway's own ID
├── status           ENUM(QUEUED, SENT, DELIVERED, FAILED)
├── gateway_response JSONB                        -- raw gateway response
├── cost_unit        NUMERIC(5,2)                 -- SMS units consumed
├── sent_at          TIMESTAMPTZ
└── created_at       TIMESTAMPTZ DEFAULT now()
```

---

## ৪. গুরুত্বপূর্ণ Database Constraints ও Rules

```sql
-- ১. Audit Log-এ কোনো UPDATE/DELETE দেওয়া হবে না (REVOKE করা হবে)
REVOKE UPDATE, DELETE ON audit_log FROM app_user;

-- ২. fee_receipts-এ UPDATE নিষিদ্ধ
REVOKE UPDATE ON fee_receipts FROM app_user;

-- ৩. Receipt Number Sequence (ডুপ্লিকেট অসম্ভব)
CREATE SEQUENCE receipt_seq START 1;
receipt_no = 'REC-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('receipt_seq')::TEXT, 5, '0');

-- ৪. Timezone Rule (সব তারিখ Asia/Dhaka-এ সঠিক)
-- সংরক্ষণ: TIMESTAMPTZ (UTC internally)
-- পড়া: SET timezone = 'Asia/Dhaka' per session

-- ৫. Journal Balance Check
CREATE CONSTRAINT TRIGGER check_journal_balance
AFTER INSERT ON journal_lines
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION verify_journal_balance();
```

---

## ৫. ERD সম্পর্কচিত্র (সরলীকৃত)

```
students ──────────┬── student_attendance
         │         ├── hifz_progress
         │         ├── exam_results
         │         ├── student_invoices ─── fee_receipts ─── journal_entries ─── journal_lines
         │         ├── student_room_assignments ── hostel_rooms
         │         └── gatepasses
         │
         ├── guardians ── users (অভিভাবক অ্যাপ)
         ├── classes ── departments
         └── sections

users ─────────────┬── roles ── permissions
                   ├── staff_attendance
                   ├── payroll_payments
                   └── audit_log
```
