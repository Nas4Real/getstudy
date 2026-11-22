# Subjects & Syllabus UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, edge cases, and filter scenarios of the **Subjects & Syllabus** (`SubjectsView`) module.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the user interface.
- **Purely URL-driven**: Any state or filter combination can be tested or demoed with a single click.
- **Default view integrity**: When accessed normally without parameters, the page displays the exact 100% original curriculum (4 subjects, 20 chapters, 40% mastery, and active progress).

---

## 1. Quick Navigation Matrix

| State / Scenario | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=subjects` | [Open Default Subjects](http://localhost:5173/?page=subjects) | Original 4 subjects (Analyse, Algèbre, Physique, Info) with 20 chapters, 40% mastery, and original progress. |
| **Empty Syllabus** | `?subjects=empty` | [Open Empty Syllabus](http://localhost:5173/?subjects=empty) | 0 subjects onboarded yet; centered empty hero with `64×64px` icon and `+ Add Your First Subject` CTA. |
| **All Mastered (100%)** | `?subjects=all-mastered` | [Open All Mastered](http://localhost:5173/?subjects=all-mastered) | 100% curriculum completion celebration across all 20 chapters; `20/20 Ready` and green indicators. |
| **New Semester (0%)** | `?subjects=new-semester` | [Open New Semester](http://localhost:5173/?subjects=new-semester) | Fresh semester kickoff; all 20 chapters set to `Not Started`, 0% mastery, 20 untouched chapters. |
| **Search Empty Miss** | `?subjects=search-empty` | [Open Search Miss](http://localhost:5173/?subjects=search-empty) | Pre-fills search query with non-existent term, showing `No chapters found` and `Reset Filters` button. |

---

## 2. Direct Filter Combinations

| Filter Scenario | URL Parameter | Direct Test Link | Highlights |
| :--- | :--- | :--- | :--- |
| **Filter: Analyse** | `?page=subjects&subject=analyse` | [Open Analyse Filter](http://localhost:5173/?page=subjects&subject=analyse) | Pre-selects the Analyse subject pill with cyan glow and shows its 6 chapters. |
| **Filter: Algèbre** | `?page=subjects&subject=algebre` | [Open Algèbre Filter](http://localhost:5173/?page=subjects&subject=algebre) | Pre-selects the Algèbre subject pill with pink glow and shows its 5 chapters. |
| **Filter: Physique** | `?page=subjects&subject=physique` | [Open Physique Filter](http://localhost:5173/?page=subjects&subject=physique) | Pre-selects the Physique subject pill with emerald glow and shows its 5 chapters. |
| **Filter: Informatique** | `?page=subjects&subject=informatique` | [Open Informatique Filter](http://localhost:5173/?page=subjects&subject=informatique) | Pre-selects the Informatique subject pill with purple glow and shows its 4 chapters. |
| **Filter: Mastered Only** | `?page=subjects&level=mastered` | [Open Mastered Filter](http://localhost:5173/?page=subjects&level=mastered) | Filters across all subjects to show only chapters with `Mastered` status. |
| **Filter: In Progress** | `?page=subjects&level=in_progress` | [Open In Progress Filter](http://localhost:5173/?page=subjects&level=in_progress) | Filters to show chapters currently in progress (`Intermediate` or `Beginner`). |
| **Filter: Not Started** | `?page=subjects&level=not_started` | [Open Not Started Filter](http://localhost:5173/?page=subjects&level=not_started) | Filters to show untouched chapters requiring initial study. |
| **Filter: Hard Difficulty** | `?page=subjects&difficulty=hard` | [Open Hard Difficulty](http://localhost:5173/?page=subjects&difficulty=hard) | Highlights high-complexity chapters with active difficulty badge. |

---

## 3. Detailed State Specifications

### A. Default / Normal State (`?page=subjects`)
- **Header**: Displays `4 Subjects • 20 Chapters` badge.
- **Top 3 KPI Metric Cards**:
  - **Syllabus Mastery**: `40%` with progress bar, `8/20 Ready`, and *"8 of 20 chapters exam-ready"*.
  - **Currently Studying**: `08` In Progress (`4 Intermediate • 4 Beginner`).
  - **Yet to Cover**: `04` Untouched chapters remaining (`3 Hard Left`).
- **Interactive Features**:
  - Subject accordion cards with progress bars and collapse chevrons.
  - Dropdown popover on any chapter's status pill to change its mastery level.
  - Clicking any chapter row opens [`ChapterDetailsModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/ChapterDetailsModal.tsx).
  - Quick action buttons: `+ New Subject` and `+ Add Chapter`.

---

### B. Empty Syllabus State (`?subjects=empty` or `?subjects=0`)
- **Visuals**:
  - Top header badge displays `0 Subjects • 0 Chapters`.
  - Top 3 KPI cards show zeroed metrics: `0%` (0 Ready), `00` Studying, `00` Left.
  - Search toolbar and filter pills are cleanly hidden to eliminate clutter.
  - Centered onboarding hero card:
    - `64×64px` gradient container with `lucide:book-open` icon.
    - Title: **"No subjects in your syllabus yet"** (`text-[21px] font-bold`).
    - Subtitle: *"Add your courses and curriculum chapters to track topic mastery, study hours, and exam readiness."*
    - Primary CTA: `+ Add Your First Subject` opens [`NewSubjectModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewSubjectModal.tsx).

---

### C. All Mastered State (`?subjects=all-mastered` or `?subjects=100`)
- **Visuals**:
  - Top header badge turns celebratory: `4 Subjects • All Mastered 🎉`.
  - **Syllabus Mastery**: `100%` with full emerald track, `All Mastered` badge, and *"All 20 chapters exam-ready"*.
  - **Currently Studying**: `00` In Progress with `Exam Ready` pill and *"All curriculum chapters completed! 🎉"*.
  - **Yet to Cover**: `00` Untouched with `0 Left` pill and *"100% Curriculum complete"*.
  - Every single chapter displays the glowing green `Mastered` badge.

---

### D. New Semester State (`?subjects=new-semester` or `?subjects=fresh`)
- **Visuals**:
  - Simulates the start of a semester where all 4 courses exist, but no chapters have been studied yet.
  - **Syllabus Mastery**: `0%` with empty track, `0/20 Ready`, and *"0 of 20 chapters exam-ready"*.
  - **Currently Studying**: `00` In Progress.
  - **Yet to Cover**: `20` Untouched with `10 Hard Left` and *"20 untouched chapters remaining"*.
  - All chapters display the gray `Not Started` badge with dashed icon.

---

### E. Search Empty Miss State (`?subjects=search-empty`)
- **Visuals**:
  - Pre-fills search with a query that matches no chapters.
  - Displays the prominent, enlarged search miss card (`py-16 sm:py-20 px-6 sm:px-12`):
    - Enlarged `64×64px` icon box (`w-16 h-16 rounded-2xl bg-[#1c1c20] border border-[#2e2e34]`) with `34px` `lucide:book-x` icon.
    - Enlarged heading: **"No chapters found"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2`).
    - Enlarged subtitle: *"Try adjusting your search query, selecting 'All Levels', or reset your filters."* (`text-[15px] text-zinc-400 max-w-md mb-6`).
    - Sized action button: `px-6 py-2.5 rounded-xl text-[14px] font-bold` *"Reset Filters"* button that clears the search query and resets all active filters and URL parameters.

---

## 4. Key Implementation Files

- [`SubjectsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/subjects/SubjectsView.tsx)
- [`ChapterDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/ChapterDetailsModal.tsx)
- [`NewSubjectModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewSubjectModal.tsx)
- [`NewChapterModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewChapterModal.tsx)
- [`App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx)
