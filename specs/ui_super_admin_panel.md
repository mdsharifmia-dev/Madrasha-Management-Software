# Super Admin Panel - UI/UX Specification

## 1. Login & Security Flow
1. **Login Screen:** Minimalist design with only `ID/Email` and `Password` fields.
2. **2-Step Verification (2FA):** After entering the password, the system prompts for an OTP.
   - **Options:** SMS, Email, or WhatsApp.
   - **Settings:** Super Admin can configure/change their preferred 2FA method from the profile settings.
   - **Fallback:** Backup recovery codes if the device is lost.

## 2. Interface Layout (Dashboard)

### A. Left Sidebar (Navigation & Filtering)
*Displays quick links and filtered lists of clients.*
- ⏳ **Pending Approvals:** List of madrasas that registered but are waiting for permission.
- 🎁 **Demo / Trial Madrasas:** Madrasas using temporary access without paid subscription.
- ✅ **Active / Subscribed:** List of fully approved, paying madrasas.
- 🚫 **Suspended / Blacklisted:** Madrasas blocked due to non-payment or policy violations.
- 💰 **Billing & Revenue:** Super Admin's income tracking, pending dues, and expense tracking.
- 📦 **Subscription Plans:** Manage software packages and usage limits.
- 🖥️ **Server & Code Management:** Developer tools, GitHub sync status, and server health.
- 📢 **Global Announcements:** Send notices to all active Madrasa Admins.
- 🎫 **Support Tickets:** View help requests/bugs reported by Madrasa Admins.
- 👥 **Agency / Staff Management:** Create sub-accounts for agency employees (e.g., Accounts Team, Developers) and assign them specific module permissions.

### B. Top Bar
- **Search Bar:** Quickly search for any Madrasa by name or ID.
- **Profile Icon:** Super Admin profile details.
- **Settings (⚙️):** 2FA configuration, theme settings, and global software parameters.

### C. Main Content Area (Center)
1. **Welcome Banner:** A beautifully designed, compact banner showing quick global stats (e.g., "Total Active Madrasas: 150 | Total Students: 45,000 | Monthly Revenue: X").
2. **Madrasa Grid View:**
   - App-icon style grid (Desktop icon format).
   - Each item shows the **Madrasa Logo** and **Name**.
   - Displays 2 to 3 rows maximum to keep the screen clean.
   - **[ Show More ]** button at the bottom to expand the full list.
   - **Action (Impersonation):** Double-clicking an icon securely logs the Super Admin into that specific Madrasa's Admin Portal in a new tab without needing their password.
3. **Financial & Server Overview (Bottom Section):**
   - **Income vs Expense:** Mini graph showing Server/Backend cost vs Subscription Revenue.
   - **Server Health:** Quick status (e.g., "Server Load: 24% - Normal").

## 3. Developer-Friendly Notes
- The **Server & Code Management** portal will be built as an isolated React/Vue component that simply iframes or connects via API to backend CI/CD tools, meaning developers can add/modify code management features without touching the main SaaS logic.
- Adding a new module (e.g., "Global Notice") simply requires adding a new API endpoint in `src/modules/super-admin/` and a new icon in the sidebar.
