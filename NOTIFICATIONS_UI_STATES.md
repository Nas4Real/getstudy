# Notifications & Alerts UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, edge cases, category filters, and read/unread workflows of the **Notifications & Academic Alerts** (`NotificationsView`) module.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any state, filter mode, or search query can be previewed or tested instantly via URL query parameters.
- **Default view integrity**: When accessed normally without parameters, the page displays the exact 100% original notification inbox (7 items across exams, assignments, class schedules, AI strategy, and storage sync, with 3 unread items).

---

## 1. Quick Navigation Matrix

| State / Scenario | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Populated** | `?page=notifications` | [Open Default Notifications](http://localhost:5173/?page=notifications) | 7 notifications across 3 chronological groups (*Today*, *Yesterday*, *Earlier this week*), `3 unread` badge, and `Mark all as read` CTA. |
| **Inbox Zero / Empty** | `?notifications=empty` | [Open Inbox Zero](http://localhost:5173/?notifications=empty) | Completely clear inbox (0 alerts); displays the centered `64×64px` bell container and `Return to Dashboard` CTA. |
| **All Caught Up / All Read** | `?notifications=all-read` | [Open All Read State](http://localhost:5173/?notifications=all-read) | All 7 notifications marked as read; unread badge and "Mark all as read" button cleanly hidden. |
| **Unread Only Filter** | `?notifications=unread` | [Open Unread Filter](http://localhost:5173/?notifications=unread) | Displays only the 3 pending unread alerts (Exam in 2 Days, Assignment Due Tonight, Next Class: Physics). |
| **Search Empty Miss** | `?notifications=search-empty` | [Open Search Miss](http://localhost:5173/?notifications=search-empty) | Pre-fills search query with non-existent term, showing enlarged `No notifications matching` card & `Clear Search`. |

---

## 2. Category & Tag Filters

Direct preview links for academic notification categories:

| Category | URL Parameter | Direct Test Link | Highlights |
| :--- | :--- | :--- | :--- |
| **Exams Only** | `?page=notifications&category=exam` | [Open Exams Category](http://localhost:5173/?page=notifications&category=exam) | Midterm alerts and logged grade reports with rose tags and `View Exam Sheet` CTA. |
| **Assignments Only** | `?page=notifications&category=task` | [Open Assignments Category](http://localhost:5173/?page=notifications&category=task) | Due deadlines and subtask countdowns with sky-blue tags and `Open Task` CTA. |
| **Classes & Schedule** | `?page=notifications&category=session` | [Open Classes Category](http://localhost:5173/?page=notifications&category=session) | Lab booklet reminders and new professor notes with emerald tags and `Class Details` CTA. |
| **AI Study Strategy** | `?page=notifications&category=ai` | [Open AI Strategy Category](http://localhost:5173/?page=notifications&category=ai) | High-yield revision suggestions with purple badges and `Review AI Plan` CTA. |

---

## 3. Detailed State Specifications

### A. Default / Populated State (`?page=notifications`)
- **Header**: Shows `Notifications` title, `3 unread` cyan pill, `Mark all as read` button, and preferences slider shortcut.
- **Filter Row**: Quick-filter pills (*All*, *Unread Only*, *Exams*, *Assignments*, *Classes*, *AI Strategy*) + search input.
- **Timeline Groups**:
  - **Today (4 items)**:
    - *Upcoming Exam in 2 Days* (Algèbre Linéaire midterm in Room 27 • 10 min ago • Unread • Rose alert).
    - *Assignment Due Tonight* ("Complete Chapter 4 Exercises" due 23:59 • 1 hour ago • Unread • Sky alert).
    - *Next Class: Physics (Mechanics)* (Starts 11:00 AM in Lab B-2 • 3 hours ago • Unread • Emerald alert).
    - *Google Drive Storage Synced* (14 docs mirrored to cloud • 5 hours ago • Read • Blue alert).
  - **Yesterday (2 items)**:
    - *AI Revision Strategy Ready* (2 high-yield weekend revision slots • Read • Purple alert).
    - *New Chapter Added: Séries Entières* (Prof. Schwartz notes • Read • Emerald alert).
  - **Earlier this week (1 item)**:
    - *Exam Score Available: Physique TD 1* (Grade: 17.5/20 • Read • Rose alert).
- **Interactive Actions**:
  - Clicking any action button (`View Exam Sheet`, `Open Task`, `Class Details`, `Review AI Plan`) opens the corresponding modal or navigates to the target page, marking the notification as read.
  - Toggling read/unread updates the badge counter in real-time.
  - Dismissing removes the notification with a toast notification.

---

### B. Inbox Zero / Empty State (`?notifications=empty` or `?notif=0`)
- **Visuals**:
  - Displays the prominent, enlarged empty hero card (`py-16 sm:py-20 px-6 sm:px-12`):
    - `64×64px` icon container (`w-16 h-16 rounded-2xl bg-[#141418] border border-[#25252c] text-zinc-400 mb-4 shadow-inner ring-1 ring-white/5`).
    - Heading: **"No notifications right now"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2 tracking-tight`).
    - Subtitle: *"All caught up! You'll receive alerts for upcoming exams, due assignments, schedule changes, and AI study tips here."* (`text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed`).
    - Action CTA: `Return to Dashboard` button.
  - Header unread counter is hidden.
  - `Mark all as read` button is hidden.

---

### C. All Caught Up State (`?notifications=all-read`)
- **Visuals**:
  - All 7 notification cards display the soft `read` visual styling (`bg-[#08080a] border-[#1a1a20] opacity-80`).
  - Pulsing cyan unread dots are removed.
  - Header unread badge: hidden (`0 unread`).
  - "Mark all as read" button: hidden.
  - Each item displays the `lucide:mail` icon allowing users to re-mark any item as unread with 1 click.

---

### D. Unread Only Filter State (`?notifications=unread` or `?unread=true`)
- **Visuals**:
  - Pre-selects the `Unread Only` pill with solid white background.
  - Displays only the 3 pending unread items with glowing cyan pulse indicators.
  - If all unread items are dismissed or marked as read, automatically presents the celebratory *"You're all caught up! Zero unread notifications remaining."* card with an emerald checkmark container.

---

### E. Search Empty Miss State (`?notifications=search-empty` or typing query without match)
- **Visuals**:
  - Search input is pre-filled with `NonExistentNotification`.
  - Displays the enlarged search miss card (`py-16 sm:py-20 px-6 sm:px-12`):
    - `64×64px` icon box with `lucide:search-x` (32px).
    - Heading: **No notifications matching "NonExistentNotification"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2`).
    - Subtitle: *"We couldn't find any notification matching that search query. Try adjusting your query or reset filters."* (`text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6`).
    - Action button: `Clear Search` clears the query and restores the complete notification list.
