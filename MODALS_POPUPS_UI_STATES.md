# GetStudy — Modals, Popups, Overlays & Email Templates UI States Directory

This document provides direct preview links and complete documentation for all remaining interactive overlays, modals, dropdown popups, and transactional email templates across the **GetStudy** platform.

All components are **100% production-clean**:
- **Zero in-app debug bars or switcher clutter**: Pure URL parameter activation.
- **Deep-linking & Fallback Mock Data**: Modals expecting records (e.g. `TaskDetailsModal`, `ExamDetailsModal`, `ChapterDetailsModal`, `DocumentDetailsModal`) automatically populate rich realistic mock data when opened directly via URL query so you immediately see the realistic populated view.
- **Clean Escape & Dismissal**: Clicking outside, pressing Escape, or clicking the modal close button dismisses the overlay and cleanly purges the modal parameter from the URL via `window.history.replaceState`.

---

## 1. Workspace Modals & Dialogs

| Modal Name | Trigger Parameter | Direct Preview Link | Content & State Highlights |
| :--- | :--- | :--- | :--- |
| **New Task Modal** | `?modal=new-task` | [Open New Task Modal](http://localhost:5173/?modal=new-task) | Create assignment dialog with title, subject pill selector, due date picker, priority toggle (High/Medium/Low), and subtasks manager. |
| **Task Details Modal** | `?modal=task-details` | [Open Task Details Modal](http://localhost:5173/?modal=task-details) | Populated task inspector showing *Chapter 4 Exercises*, subject badge (*Analyse*), priority, interactive subtask checklist, and action buttons. |
| **Edit Task Modal** | `?page=tasks&modal=edit-task` | [Open Edit Task Modal](http://localhost:5173/?page=tasks&modal=edit-task) | Pre-filled edit form with existing title, subject selection, deadline modification, and priority updates. |
| **Delete Task Modal** | `?page=tasks&modal=delete-task` | [Open Delete Task Modal](http://localhost:5173/?page=tasks&modal=delete-task) | Destructive action confirmation dialog with warning icon, task title citation, Cancel button, and red `Delete Task` action. |
| **New Session Modal** | `?modal=new-session` | [Open New Session Modal](http://localhost:5173/?modal=new-session) | Timetable scheduler modal with session title, subject selection, date, start/end times, classroom, and professor notes. |
| **Session Details Modal** | `?modal=session-details` | [Open Session Details Modal](http://localhost:5173/?modal=session-details) | Populated session card for *Algèbre Linéaire — Diagonalization Revision*, room (*Library Room 4*), time (*14:00 - 16:00*), checklist notes, Edit & Delete actions. |
| **Exam Details Modal** | `?modal=exam-details` | [Open Exam Details Modal](http://localhost:5173/?modal=exam-details) | Comprehensive assessment view for *Algèbre Linéaire Midterm (DS 3)*: countdown (*2 days left*), Amphi 27, 3h duration, and chapter mastery progression breakdown. |
| **AI Suggest Smart Scheduler** | `?modal=ai-suggest` | [Open AI Suggest Modal](http://localhost:5173/?modal=ai-suggest) | AI-powered study schedule generator recommending balanced revision slots based on upcoming exams with `Add to Calendar` and `Schedule All` CTAs. |
| **Notification Settings Modal** | `?modal=notification-preferences` | [Open Notification Settings Modal](http://localhost:5173/?modal=notification-preferences) | Fine-grained alert controls: 48h exam reminders, morning exam alerts, 15m class warnings, assignment reminders, AI digest toggles, and sound effects. |
| **Upload Document Modal** | `?page=documents&modal=upload-document` | [Open Upload Document Modal](http://localhost:5173/?page=documents&modal=upload-document) | File drag-and-drop zone with folder destination picker, supported format tags (PDF, DOCX, ZIP, PNG), and progress status. |
| **Upload In Progress** | `?page=documents&modal=upload-document&upload=uploading` | [Open Upload In Progress](http://localhost:5173/?page=documents&modal=upload-document&upload=uploading) | File upload dialog simulating active upload with animated spinner and disabled submission state. |
| **Document Details Modal** | `?page=documents&modal=document-details` | [Open Document Details Modal](http://localhost:5173/?page=documents&modal=document-details) | Document reader popup showing *Cours Complet Analyse III*, PDF metadata, file size, Google Drive sync indicator, and `Ask AI Assistant` action. |
| **New Subject Modal** | `?page=subjects&modal=new-subject` | [Open New Subject Modal](http://localhost:5173/?page=subjects&modal=new-subject) | Add subject dialog with name, course code, color theme selector, icon picker, professor name, and credit coefficient slider. |
| **New Chapter Modal** | `?page=subjects&modal=new-chapter` | [Open New Chapter Modal](http://localhost:5173/?page=subjects&modal=new-chapter) | Add curriculum chapter dialog with parent subject dropdown, chapter number, title, description, and difficulty rating. |
| **Chapter Details Modal** | `?page=subjects&modal=chapter-details` | [Open Chapter Details Modal](http://localhost:5173/?page=subjects&modal=chapter-details) | Deep-dive syllabus inspector showing *Suites & Séries Numériques*, mastery level switcher (Not Started / Beginner / Intermediate / Mastered), and `Schedule Revision` CTA. |
| **Import Timetable JSON Modal** | `?page=calendar&modal=import-json` | [Open Import JSON Modal](http://localhost:5173/?page=calendar&modal=import-json) | JSON timetable importer with drag-and-drop file upload, format validation, and `Import Schedule` action. |

---

## 2. Dropdown Menus & Floating Popovers

| Dropdown Name | Trigger Parameter | Direct Preview Link | Content & State Highlights |
| :--- | :--- | :--- | :--- |
| **Profile Dropdown** | `?dropdown=profile` | [Open Profile Dropdown](http://localhost:5173/?dropdown=profile) | User avatar card (Jane Doe, `jane@example.com`, online status), quick link to *Profile & Settings*, and red *Sign Out* action. |
| **Notifications Dropdown** | `?dropdown=notifications` | [Open Notifications Dropdown](http://localhost:5173/?dropdown=notifications) | Header bell popover with unread counter, fast notifications preview list, "Mark all as read", and direct link to full `NotificationsView`. |

---

## 3. Transactional Email Templates

GetStudy features production-ready, responsive HTML/React email templates for authentication, verification, and password recovery.

| Template Name | Trigger Parameter | Direct Preview Link | Description & Features |
| :--- | :--- | :--- | :--- |
| **Verify Email Template** | `?page=emails&tab=verify` | [Open Verify Email Preview](http://localhost:5173/?page=emails&tab=verify) | Clean transactional verification email featuring the GetStudy brand gradient, student greeting, prominent `Verify Email Address` CTA button, fallback verification URL, security notices, and help footer. |
| **Password Reset Template** | `?page=emails&tab=reset` | [Open Password Reset Preview](http://localhost:5173/?page=emails&tab=reset) | Secure password reset email with lock badge, user greeting, prominent `Reset Password` CTA button, link expiration notice (1 hour), security disclaimer, and direct support link. |

---

## 4. Key Implementation Files

- [`src/App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx) — Central query parameter router and global modals host.
- [`src/components/modals/NewTaskModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewTaskModal.tsx)
- [`src/components/modals/TaskDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/TaskDetailsModal.tsx)
- [`src/components/modals/EditTaskModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/EditTaskModal.tsx)
- [`src/components/modals/DeleteTaskModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/DeleteTaskModal.tsx)
- [`src/components/modals/NewSessionModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewSessionModal.tsx)
- [`src/components/modals/SessionDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/SessionDetailsModal.tsx)
- [`src/components/modals/ExamDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/ExamDetailsModal.tsx)
- [`src/components/modals/AiSuggestModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/AiSuggestModal.tsx)
- [`src/components/modals/NotificationPreferencesModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NotificationPreferencesModal.tsx)
- [`src/components/modals/UploadDocumentModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/UploadDocumentModal.tsx)
- [`src/components/modals/DocumentDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/DocumentDetailsModal.tsx)
- [`src/components/modals/NewSubjectModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewSubjectModal.tsx)
- [`src/components/modals/NewChapterModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewChapterModal.tsx)
- [`src/components/modals/ChapterDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/ChapterDetailsModal.tsx)
- [`src/components/modals/ImportJsonModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/ImportJsonModal.tsx)
- [`src/components/layout/ProfileDropdown.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/layout/ProfileDropdown.tsx)
- [`src/components/dashboard/NotificationDropdown.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/dashboard/NotificationDropdown.tsx)
- [`src/components/emails/EmailPreviewView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/EmailPreviewView.tsx)
- [`src/components/emails/VerifyEmailTemplate.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/VerifyEmailTemplate.tsx)
- [`src/components/emails/ResetPasswordTemplate.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/ResetPasswordTemplate.tsx)
