# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

STEM & Higher Education students (e.g., CPGE / Classes Préparatoires, STEM university students, and engineering tracks) facing demanding coursework, heavy problem set volumes, continuous assessment exams (Devoirs Surveillés / DS, Concours Blancs), and extensive formula-heavy syllabi.

## Product Purpose

GetStudy exists to transform an overwhelming STEM curriculum into an actionable, daily execution system. Success means a student opens the platform, instantly knows their daily class schedule, sees their next urgent priority or problem set, tracks mastery chapter by chapter, and uses active recall to retain core formulas and theorems without getting lost in planning overhead.

## Positioning

An integrated academic cockpit built specifically for intense STEM curricula: unlike generic task managers or standard calendars, GetStudy natively binds timetable schedule slots to coursework chapters, provides formula-native active recall (LaTeX/KaTeX integration across cards and syllabi), and features an action-enabled AI co-pilot that directly creates tasks, schedules revision blocks into the calendar, and answers academic questions without leaving the workflow.

## Operating Context

- **Academic Cadence**: Daily class sessions (Lectures, TD, TP), upcoming DS exam countdowns (e.g., DS 3 Algèbre Linéaire, Concours Blanc Physique), weekly revision schedules, and exam preparation crunch phases.
- **Academic Hierarchy**: Subjects (Algèbre, Analyse, Physique, Mécanique, Informatique, Méthodologie) → Chapters → Syllabus Topics → Practice Exercises & Problem Sets.
- **Primary Workflows**:
  - Daily overview & timetable tracking via the Dashboard.
  - Multi-view schedule planning via the Study Calendar (Day, Week, Month).
  - Assignment and problem-set tracking with subtasks via the Tasks tab.
  - Syllabus tracking with progress percentages and chapter difficulty levels in Subjects.
  - Formula and proof memorization via Flashcards (Decks grid, Anki SRS table with review heatmap, and Curriculum hub).
  - Lecture notes, exercises, and exams management in Documents.
  - Actionable planning and exercise breakdowns via the AI Assistant.

## Capabilities and Constraints

- **Capabilities**:
  - Full client-side interactive state management with instant URL-driven mock states for testing and demonstrations.
  - Dual-codebase architecture (`src/` and `app/src/`) requiring strict parity on edits.
  - KaTeX mathematical typography rendering for complex mathematical and physical notations.
  - Action-driven AI assistant capable of parsing intent and updating application state (adding tasks, scheduling study calendar sessions).
- **Constraints**:
  - Web platform running on Vite + React 19 + TypeScript + Tailwind CSS.
  - Dark-mode primary visual design system (`#000000` base, `#09090b` panel, `#121214` card surface, `#25252b` / `#27272a` borders).
  - High accessibility standards: touch targets ≥ 44×44px, WCAG compliant contrast, keyboard navigation support.

## Brand Commitments

- **Name**: GetStudy
- **Voice**: Crisp, focused, serious, and supportive academic assistant. Professional tone that avoids infantilizing gamification while maintaining motivating clarity.
- **Design Personality**: Precision-crafted academic instrument — utilitarian dark aesthetic, distinct subject accent color identities (Analyse cyan, Algèbre pink, Physique emerald, Mécanique blue, Méthodologie amber, Informatique purple), readable typography (Poppins & JetBrains Mono), smooth transitions.

## Evidence on Hand

- Fully functioning web application running on Vite dev server at `http://localhost:5174/`.
- Concrete subject syllabi, chapters, and problem sets already codified in `src/types/index.ts`, `src/components/subjects/SubjectsView.tsx`, and `src/components/flashcards/FlashcardsView.tsx`.
- Comprehensive documented UI states across 10+ markdown specifications (`ALL_UI_STATES.md`, `DASHBOARD_UI_STATES.md`, `TASKS_UI_STATES.md`, etc.).

## Product Principles

1. **Academic Reality First**: Ground every view in how real STEM students work (DS countdowns, TD problem sets, coefficients, and realistic session slots).
2. **Action Over Clutter**: Ensure tasks and sessions can be checked off or created with one click; provide instant visual feedback without blocking the user.
3. **Progressive Disclosure**: Keep high-density curriculum data organized and scannable; reveal subtasks, notes, and detailed formulas on demand rather than overwhelming the student upfront.
4. **Resilient Local Integrity**: Guarantee that the student's workspace remains reliable, fast, and responsive with zero layout shifts or abrupt vanishes.

## Accessibility & Inclusion

- Keyboard navigability with standard focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-400`).
- Minimum touch targets of 44×44px for interactive elements and checkboxes.
- Color indicators paired with text labels or icons so information is never conveyed by color alone.
