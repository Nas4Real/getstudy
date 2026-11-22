# GetStudy - React Web Application

Complete, modular React application ported directly from the SuperDesign design system.

## 🚀 Getting Started

From this directory:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📂 Architecture

- **`src/components/layout/`**: `Sidebar`, `ProfileDropdown`
- **`src/components/dashboard/`**: `DashboardView`, `KpiCards`, `UpcomingAssignments`, `TodayClasses`
- **`src/components/calendar/`**: `CalendarView`, `CalendarHeader`, `WeekView`, `DayView`, `MonthView`
- **`src/components/tasks/`**: `TasksView`
- **`src/components/documents/`**: `DocumentsView`
- **`src/components/settings/`**: `SettingsView`
- **`src/components/auth/`**: `AuthView`, `SignInForm`, `SignUpForm`, `ForgotPasswordForm`
- **`src/components/emails/`**: `EmailPreviewView`, `VerifyEmailTemplate`, `ResetPasswordTemplate`
- **`src/components/modals/`**: `NewTaskModal`, `NewSessionModal`, `SessionDetailsModal`, `TaskDetailsModal`
- **`src/components/common/`**: `Icon`, `Toast`
- **`src/types/`**: TypeScript type definitions

## ✨ Features

- **Exact Design Match**: 100% faithful to the "Quiet Precision" dark aesthetic, typography (Poppins & IBM Plex Mono), colors, borders, and animations.
- **Zero Duplication**: Modularized into reusable components.
- **Full Interactivity**:
  - Seamless navigation between all screens (Dashboard, Calendar, Documents, Tasks, Settings, Auth, Email Previews).
  - Day, Week, and Month views for the Calendar.
  - Interactive modals for adding tasks, scheduling sessions (Revision, Exam, University).
  - Detailed popups for sessions (notes, questions for professor, edit/delete) and tasks (subtasks checklist, complete/delete).
  - Full-screen Auth flow (Sign In, Sign Up, Forgot Password).
  - Floating toast notifications and Escape-key dismissals.
