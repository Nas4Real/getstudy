# Tasks UI States Reference & Complete Testing Guide

This document is the complete reference guide and direct preview index for all views and states of the **Tasks** (`TasksView`) system.

All states are cleanly driven via URL parameters with **zero in-app debug traces** or switcher pills, maintaining production-quality visuals across all screens.

---

## 1. Quick Navigation Matrix

| State / Scenario | Description | Direct Test Link |
| :--- | :--- | :--- |
| **Default / Normal** | Original populated task list (Overdue, Today, Later sections with 4 assignments) | [Open Default Tasks](http://localhost:5173/?page=tasks) |
| **Empty State** | Zero tasks on plate with large clipboard icon and creation CTA | [Open Empty Tasks](http://localhost:5173/?tasks=empty) |
| **All Done / Caught Up** | Celebration card with party-popper icon, `All Caught Up` pulse badge & view completed CTA | [Open All Done Tasks](http://localhost:5173/?tasks=all-done) |
| **Overdue Crunch State** | 3 urgent high-priority overdue assignments with red clock indicators | [Open Overdue Tasks](http://localhost:5173/?tasks=overdue) |
| **Filter: Pending** | Filter pre-selected to Pending tasks | [Open Pending Filter](http://localhost:5173/?page=tasks&filter=pending) |
| **Filter: Completed** | Filter pre-selected to Completed tasks list | [Open Completed Filter](http://localhost:5173/?page=tasks&filter=completed) |
| **Filter: All** | Filter pre-selected to All tasks (Pending + Completed) | [Open All Filter](http://localhost:5173/?page=tasks&filter=all) |

---

## 2. Detailed State Specifications

### A. Default / Normal Tasks State (`?page=tasks`)
- **Design Rule**: 100% original layout, fonts, and structure are preserved.
- **Sections**:
  - **Overdue**: *TD2: Suites Numériques* (Analyse • High Priority • Red clock tag • 4 subtasks).
  - **Today**: *Read Chapter 4: Forces* (Physique • Medium Priority • 3 subtasks) & *Project Proposal Draft* (Méthodologie • High Priority • 3 subtasks).
  - **Later this week**: *Review Matrices* (Algèbre • Low Priority • 3 subtasks).
- **Interactive Checkboxes**: Clicking any circular checkbox completes or uncompletes the task with smooth line-through decoration.
- **3-Dots Options Menu**: Edit task and Remove task actions.

---

### B. Empty State (`?tasks=empty` or `?tasks=0`)
- **Visuals**:
  - Centered empty state card with `64×64px` gradient container and `clipboard-check` icon.
  - Heading: **"No tasks on your plate yet"** (`text-[21px] font-bold`).
  - Subtitle: *"Keep your coursework, problem sets, and revision deadlines organized in one clean schedule."*
  - Action Button: `+ Create Your First Task` opens the New Task modal.

---

### C. All Done / Caught Up State (`?tasks=all-done` or `?tasks=done`)
- **Visuals**:
  - Centered celebration card with `64×64px` emerald container and `party-popper` icon.
  - Badge: `All Caught Up` with green pulsing dot.
  - Heading: **"Great job! All tasks completed"** (`text-[22px] font-bold`).
  - Subtitle: *"You have finished every pending task for today. Enjoy your free time or review completed items."*
  - Dual Actions:
    - `View Completed (4)` switches the filter tab to Completed to view all finished items.
    - `+ New Task` creates a new assignment.

---

### D. Overdue Crunch State (`?tasks=overdue` or `?tasks=urgent`)
- **Visuals**:
  - Highlights 3 urgent overdue assignments in the Overdue section:
    1. *TD2: Suites Numériques & Séries* (Analyse • High Priority • 4 subtasks).
    2. *DM 1: Électrostatique & Gauss* (Physique • High Priority • 2 subtasks).
    3. *TP Python: Dijkstra & Sac à dos* (Informatique • High Priority • 2 subtasks).
  - Plus Today's assignment: *Fiche de Synthèse Algèbre*.
  - Red pulsing urgency markers and bold due dates.

---

## 3. Interactive Features Built

1. **Reactive Completion Toggle**:
   - Marking a task completed immediately updates the filter counts (`Pending`, `Completed`, `All`).
   - If the last pending task is completed, it dynamically transitions to the **All Caught Up** celebration view.
2. **Filter Tabs URL Synchronization**:
   - Clicking `Pending`, `Completed`, or `All` updates the view and sets `?filter=...` in the URL via `replaceState` without reloading.
3. **Task Modals**:
   - Clicking any task opens the [`TaskDetailsModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/TaskDetailsModal.tsx) with editable subtasks.
   - Clicking `+ New Task` opens the [`NewTaskModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewTaskModal.tsx).
   - Selecting `Edit Task` from the 3-dots menu opens [`EditTaskModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/EditTaskModal.tsx).
   - Selecting `Remove` opens [`DeleteTaskModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/DeleteTaskModal.tsx).

---

## 4. Key Implementation Files

- [`TasksView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/tasks/TasksView.tsx)
- [`TodayTasks.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/dashboard/TodayTasks.tsx)
- [`App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx)
