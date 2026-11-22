# GetStudy UI States & Test Directory

This document serves as the permanent reference guide for all simulated UI states across the GetStudy application, with direct clickable test links and component state mappings.

---

## 1. Dashboard State Catalog

The Dashboard (`DashboardView.tsx`) dynamically adapts its 4 main widgets (**KPI Cards**, **Today's Classes**, **Today's Tasks**, and **Exams & Tests**) based on the URL query parameter `?dashboard=<state>`.

All visible switcher bars and debug text have been removed from the user interface, leaving a 100% production-clean layout while preserving complete state simulation through URL parameters.

| State Name | Query Parameter | Direct Test Link | Description & Key Features |
|---|---|---|---|
| **Default / Normal** | `?dashboard=normal` (or `/`) | [http://localhost:5173/](http://localhost:5173/) | **Standard Academic Day**: Full schedule with 4 classes, 4 tasks (with interactive checkboxes), upcoming exams, and active countdowns. |
| **In Progress (2/4)** | `?dashboard=in-progress` | [http://localhost:5173/?dashboard=in-progress](http://localhost:5173/?dashboard=in-progress) | **Midday Schedule**: First 2 classes marked attended, 3rd class highlighted with `Next Up` pulse, tasks showing `2/4 Done`, and next session KPI synced to Thermodynamics at 14:00. |
| **All Done 🎉** | `?dashboard=all-done` | [http://localhost:5173/?dashboard=all-done](http://localhost:5173/?dashboard=all-done) | **End of Day Accomplishment**: Emerald celebratory banner with `+ New Task`, `4/4 Done 🎉` and `All Finished ✓` header badges, and KPI cards reflecting 0 pending. |
| **Free Day** | `?dashboard=free-day` | [http://localhost:5173/?dashboard=free-day](http://localhost:5173/?dashboard=free-day) | **Weekend / Holiday / Day Off**: Enlarged `64×64px` coffee empty state for classes, clean empty state for tasks, `No Exams Due` KPI card, and relaxed messaging. |
| **No Classes** | `?dashboard=no-classes` | [http://localhost:5173/?dashboard=no-classes](http://localhost:5173/?dashboard=no-classes) | **Self-Study Day**: 0 classes scheduled today, but tasks and exams remain active and normal. |
| **No Tasks** | `?dashboard=no-tasks` | [http://localhost:5173/?dashboard=no-tasks](http://localhost:5173/?dashboard=no-tasks) | **Deadlines Cleared**: Today's task list is clear with `0 Tasks` badge and `+ Add Task` CTA; classes and exams are normal. |
| **No Exams** | `?dashboard=no-exams` | [http://localhost:5173/?dashboard=no-exams](http://localhost:5173/?dashboard=no-exams) | **Exam-Free Period**: No assessments scheduled in the next 14 days; shows `Open Calendar` CTA and relaxed KPI card. |

---

## 2. Widget Behavior Matrix

### A. KPI Cards (`KpiCards.tsx`)
- **Upcoming Exam Card**:
  - `urgent` (Default, In Progress, All Done, No Classes, No Tasks): Shows *Algèbre Linéaire* • *In 2 days* • *Amphi Schwartz 08:00 AM*.
  - `empty` (Free Day, No Exams): Shows *No Exams Due* • *None Soon* • *No tests scheduled for the next 14 days*.
- **Next Session Card**:
  - `upcoming` (Default, No Tasks, No Exams): Shows *Mathematics (Calculus)* • *Starts in 25m* • *Room 27*.
  - `midday` (In Progress): Shows *Thermodynamics Lecture* • *Starts in 45m* • *2 attended • 2 upcoming*.
  - `finished` (All Done): Shows *Classes Finished* • *All Done ✓* • *4 of 4 classes completed for today*.
  - `empty` (Free Day, No Classes): Shows *No Classes Today* • *Free Day* • *Next class tomorrow 09:00 AM*.
- **Tasks & To-Dos Card**:
  - `active` (Default, In Progress, No Classes, No Exams): Shows *04 pending assignments* • *2 due today*.
  - `all-done` (All Done): Shows *00 pending (4 completed)* • *100% Done 🎉*.
  - `empty` (Free Day, No Tasks): Shows *00 pending* • *All Clear* • *No deadlines due today*.

---

### B. Today's Classes (`TodayClasses.tsx`)
- **Normal**: Shows 4 sessions (Calculus past, Mechanics current/Next Up, Thermodynamics upcoming, Linear Algebra upcoming). Header badge shows `4 Sessions`.
- **In Progress (2/4)**: First 2 classes marked `Attended`. 3rd class has pulsing `Next Up` badge. Header badge shows `2/4 Attended`.
- **All Done**: All 4 classes marked `Attended`. Displays the celebration banner (*"All classes completed for today! 4 of 4 attended"*). Header badge shows `All Finished ✓`.
- **Empty (Free Day / No Classes)**: Displays the spacious empty box with `64×64px` coffee icon, `20px` bold title (*"No classes today"*), `15px` description, and `px-7 py-3` *"Open Calendar"* button. Header badge shows `0 Sessions`.

---

### C. Today's Tasks (`TodayTasks.tsx`)
- **Normal**: 4 tasks (1 urgent high priority, 2 medium, 1 low). Header badge shows `1/4 Done` or active progress.
- **In Progress (2/4)**: Tasks 1 and 2 checked off (`Completed`). Header badge shows `2/4 Done`.
- **All Done**: All 4 tasks checked off. Displays the gradient celebration banner (*"All tasks completed today! 🎉 You're completely caught up"*) with the compact `+ New Task` pill button. Header badge shows `4/4 Done 🎉`.
- **Empty (Free Day / No Tasks)**: Displays the spacious empty box with `64×64px` checkmark icon, `20px` bold title (*"No tasks for today"*), and `px-7 py-3` *"Add Task"* button. Header badge shows `0 Tasks`.

---

### D. Exams & Tests (`UpcomingAssignments.tsx`)
- **Normal**: Shows 3 upcoming major assessments (DS 3 Linear Algebra, Electromagnetism, Colle Oral). Header badge shows `3 Upcoming`.
- **Empty (Free Day / No Exams)**: Displays the empty box with `64×64px` award icon, `20px` bold title (*"No upcoming exams"*), and `px-7 py-3` *"Open Calendar"* button. Header badge shows `0 Upcoming`.

---

## 3. Other Application Views State Links

| Page | State | Direct Test Link | Description |
|---|---|---|---|
| **Tasks Page** | All Done | [http://localhost:5173/?state=all-done](http://localhost:5173/?state=all-done) | All tasks marked complete with party popper illustration and view completed filter. |
| **Tasks Page** | Zero Tasks | [http://localhost:5173/?state=empty-tasks](http://localhost:5173/?state=empty-tasks) | First-time user onboarding state with *"Create Your First Task"* CTA. |
| **AI Assistant** | Active Typing | [http://localhost:5173/?state=ai-typing](http://localhost:5173/?state=ai-typing) | Live AI thinking indicator with animated stages (*"Formulating study plan..."*). |
| **Documents** | Search Miss | [http://localhost:5173/?state=search-empty](http://localhost:5173/?state=search-empty) | Empty document search state with *"Clear Search"* button and enlarged icon. |

---

## 4. URL Parameter Aliases

All URL parameters are case-insensitive and support standard shorthand aliases:

- **Free Day**: `?dashboard=free-day`, `?dashboard=empty`, `?classes=0&tasks=0`, `?state=empty-dashboard`
- **In Progress**: `?dashboard=in-progress`, `?dashboard=midday`, `?dashboard=2-4`, `?dashboard=progress`
- **All Done**: `?dashboard=all-done`, `?state=all-done`, `?tasks=done`
- **No Classes**: `?dashboard=no-classes`, `?classes=0`
- **No Tasks**: `?dashboard=no-tasks`, `?tasks=0`
- **No Exams**: `?dashboard=no-exams`, `?exams=0`
- **Default**: `http://localhost:5173/` (no parameters required)
