# Calendar UI States Reference & Complete Testing Guide

This document is the complete reference guide and direct preview index for all views and states of the **Study Calendar** system.

All states are purely URL-driven with **zero in-app debug traces** or switcher pills, maintaining production-quality visuals across all screens.

---

## 1. Quick Navigation Matrix

| State / Scenario | Day View | Week View | Month View |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | [Open Day](http://localhost:5173/?view=day) | [Open Week (Default)](http://localhost:5173/?view=week) | [Open Month](http://localhost:5173/?view=month) |
| **Empty / Free Day / Break Week** | [Open Free Day](http://localhost:5173/?calendar=empty&view=day) | [Open Break Week](http://localhost:5173/?calendar=empty&view=week) | [Open Empty Month](http://localhost:5173/?calendar=empty&view=month) |
| **Completed / All-Done** | [Open Completed Day](http://localhost:5173/?calendar=completed&view=day) | [Open Completed Week](http://localhost:5173/?calendar=completed&view=week) | [Open Completed Month](http://localhost:5173/?calendar=completed&view=month) |
| **Exams / Exam Week** | [Open Exam Day](http://localhost:5173/?calendar=exams&view=day) | [Open Exam Week](http://localhost:5173/?calendar=exams&view=week) | [Open Exam Month](http://localhost:5173/?calendar=exams&view=month) |

---

## 2. Detailed View Specifications

### A. Default / Normal Academic Schedule (Exact Original UI)
- **Design Rule**: 100% original layout, fonts, colors, and structure are preserved with zero extra banners.
- **Week View**: Full 7-day academic timetable grid (Lun-Dim) with original course names, times (`08:00`), rooms, professors (`Prof. Gauss`, `Prof. Cauchy`, `Prof. Miller`, etc.), and subject pills.
- **Day View**: Original timeline schedule with live progress indicator (`Now: 10:45 AM`), active course markers, countdown to next major exam (`Algèbre Linéaire • 2d left`), and auto-saved quick scratchpad note.
- **Month View**: Original clean May 2026 grid with *Topologie EVN* (May 7) and *Physique* (May 8) event cards.

---

### B. Empty / Free Day / Break Week
- **Day View (`?calendar=empty&view=day`)**:
  - Centered empty state box with coffee icon (`64×64px`).
  - Clear message: *"No sessions scheduled today • You have no lecture or lab sessions scheduled for today. Great time for independent study or rest."*
  - Primary call-to-action: `+ Schedule Session` button.
  - Header badge: `Day Off` (emerald).
  - Companion card: `All Clear Today`.
- **Week View (`?calendar=empty&view=week`)**:
  - Clean 7-day timetable without bulky banners.
  - Prominent, beautifully proportioned empty day slots (`w-13 h-13` icon container, `14.5px` bold *"No classes"*, and a styled `+ Add` button with hover scale).
- **Month View (`?calendar=empty&view=month`)**:
  - Clean monthly grid with no session clutter. Clicking empty dates opens the scheduling modal.

---

### C. Completed / All-Done State
- **Day View (`?calendar=completed&view=day`)**:
  - Celebratory green status banner: *"All classes completed for today! 5 of 5 scheduled sessions attended. Great work today!"*
  - Header badge: `All Finished ✓` in emerald.
  - All timeline node indicators marked with green checkmarks and attended styling.
- **Week View (`?calendar=completed&view=week`)**:
  - Clean 7-day timetable without bulky banners.
  - Past and current sessions display green checkmark icons and `Attended` badges.
- **Month View (`?calendar=completed&view=month`)**:
  - Clean monthly grid with attended checkmarks on scheduled sessions.

---

### D. Exams / Exam Week State
- **Day View (`?calendar=exams&view=day`)**:
  - Highlights *DS 3 : Algèbre Linéaire & Espaces Préhilbertiens* (08:00 - 11:00, 3h, coeff 4, rose badge).
  - Urgent right sidebar box: *"Major Exam Today • Calculators strictly prohibited. Rough paper provided."*
  - Rose pulsing timeline markers and prominent `Exam Day` badge.
- **Week View (`?calendar=exams&view=week`)**:
  - Slender, well-padded Exam Week banner (`py-2.5 sm:py-3 px-4 sm:px-5`):
    **`DS 3 Algèbre Linéaire (Vendredi 8 Mai) & Concours Blanc Physique (Samedi 9 Mai).`**
  - Highlights Vendredi 8 Mai (*DS 3 Algèbre Coeff 4*) & Samedi 9 Mai (*Concours Blanc Coeff 5*) with glowing rose borders and coefficient tags.
- **Month View (`?calendar=exams&view=month`)**:
  - Slender, well-padded Examination Period banner (`py-2.5 sm:py-3 px-4 sm:px-5`):
    **`DS 3 Algèbre Linéaire (Vendredi 8 Mai) & Concours Blanc Physique (Samedi 9 Mai).`**
  - Tagged DS dates across May.

---

## 3. Interactive Features Built

1. **Dynamic Period Cycling (`<` and `>` Chevrons)**:
   - Clicking `<` or `>` in the calendar header cycles days, weeks, and months dynamically.
   - An **"Aujourd'hui"** return button automatically appears when navigating away from the current date.
2. **View Tabs Synchronization**:
   - Clicking `Day`, `Week`, or `Month` buttons instantly updates the active view and synchronizes the URL (`?view=...`) without page reload.
3. **Session Details & Add Modals**:
   - Clicking any session card in Day, Week, or Month view opens the detailed session modal.
   - Clicking `+ New Session`, `+ Schedule Session`, or `+ Add` opens the new session creation modal.
   - Clicking `Import Timetable` opens the JSON timetable import modal.

---

## 4. Key Implementation Files

- [`DayView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/DayView.tsx)
- [`WeekView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/WeekView.tsx)
- [`MonthView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/MonthView.tsx)
- [`CalendarHeader.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/CalendarHeader.tsx)
- [`CalendarView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/CalendarView.tsx)
- [`App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx)
