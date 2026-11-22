# GetStudy — Comprehensive UI States & Preview Directory

This document provides a single-entry index for every simulated UI state and edge case across all views in the **GetStudy** platform.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any state can be tested or demoed by loading the corresponding query link.
- **Default view integrity**: When accessed without parameters, every screen renders the exact 100% original layout and populated data.

---

## 1. Dashboard (`DashboardView`)

Reference file: [`DASHBOARD_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/DASHBOARD_UI_STATES.md)

| State Name | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?dashboard=normal` (or `/`) | [Open Default Dashboard](http://localhost:5173/) | Standard academic day: 4 classes, 4 tasks, upcoming exams, active countdowns. |
| **In Progress (2/4)** | `?dashboard=in-progress` | [Open In Progress](http://localhost:5173/?dashboard=in-progress) | Midday schedule: 2 classes attended, 3rd with pulsing `Next Up`, 2/4 tasks completed. |
| **All Done 🎉** | `?dashboard=all-done` | [Open All Done Dashboard](http://localhost:5173/?dashboard=all-done) | End of day: celebratory banner, `4/4 Done 🎉` and `All Finished ✓` pills. |
| **Free Day** | `?dashboard=free-day` | [Open Free Day Dashboard](http://localhost:5173/?dashboard=free-day) | Weekend / holiday: `64×64px` coffee empty state for classes, clear tasks, `No Exams Due`. |
| **No Classes** | `?dashboard=no-classes` | [Open No Classes Dashboard](http://localhost:5173/?dashboard=no-classes) | Self-study day: 0 classes today, tasks and exams remain active. |
| **No Tasks** | `?dashboard=no-tasks` | [Open No Tasks Dashboard](http://localhost:5173/?dashboard=no-tasks) | Deadlines cleared: 0 tasks today, `+ Add Task` CTA. |
| **No Exams** | `?dashboard=no-exams` | [Open No Exams Dashboard](http://localhost:5173/?dashboard=no-exams) | Exam-free period: no assessments in next 14 days, `Open Calendar` CTA. |

---

## 2. Study Calendar (`CalendarView`)

Reference file: [`CALENDAR_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/CALENDAR_UI_STATES.md)

### Standard populated views
| View Mode | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default Week View** | `?view=week` | [Open Week View](http://localhost:5173/?view=week) | Clean 7-day academic timetable grid (Lun-Dim, original times & subjects). |
| **Default Day View** | `?view=day` | [Open Day View](http://localhost:5173/?view=day) | Original timeline schedule with live progress indicator and companion notes. |
| **Default Month View** | `?view=month` | [Open Month View](http://localhost:5173/?view=month) | Original clean May 2026 calendar grid with scheduled sessions. |

### Alternate academic states
| State & View | Direct Preview Link | Highlights |
| :--- | :--- | :--- |
| **Free Day (Day View)** | [Open Free Day](http://localhost:5173/?calendar=empty&view=day) | Centered `64×64px` coffee cup box, *"No sessions scheduled today"*, `+ Schedule Session` CTA. |
| **Break Week (Week View)** | [Open Break Week](http://localhost:5173/?calendar=empty&view=week) | Clean 7-day timetable with sized empty day slots (`w-13 h-13` icon container, `14.5px` bold *"No classes"*, and `+ Add` button). |
| **Empty Month (Month View)** | [Open Empty Month](http://localhost:5173/?calendar=empty&view=month) | Clean empty calendar grid with zero clutter. |
| **Completed Day View** | [Open Completed Day](http://localhost:5173/?calendar=completed&view=day) | Celebration banner *"All classes completed for today! 5 of 5 attended"*, `All Finished ✓` badge. |
| **Completed Week View** | [Open Completed Week](http://localhost:5173/?calendar=completed&view=week) | 7-day timetable with green checkmarks and `Attended` badges. |
| **Completed Month View** | [Open Completed Month](http://localhost:5173/?calendar=completed&view=month) | May 2026 grid with attended session indicators. |
| **Exams Day View** | [Open Exams Day](http://localhost:5173/?calendar=exams&view=day) | Highlights *DS 3 : Algèbre Linéaire* (08:00 - 11:00, 3h, coeff 4, rose badge) + exam alert. |
| **Exams Week View** | [Open Exams Week](http://localhost:5173/?calendar=exams&view=week) | Slender, balanced banner: **`DS 3 Algèbre Linéaire (Vendredi 8 Mai) & Concours Blanc Physique (Samedi 9 Mai).`** |
| **Exams Month View** | [Open Exams Month](http://localhost:5173/?calendar=exams&view=month) | Slender banner with tagged DS dates across May. |

---

## 3. Tasks & Assignments (`TasksView`)

Reference file: [`TASKS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/TASKS_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=tasks` | [Open Default Tasks](http://localhost:5173/?page=tasks) | Full assignment schedule (Overdue, Today, Later with subtasks & checkboxes). |
| **Empty State** | `?tasks=empty` | [Open Empty Tasks](http://localhost:5173/?tasks=empty) | Zero tasks on plate with `64×64px` clipboard icon & `+ Create Your First Task` CTA. |
| **All Done / Caught Up** | `?tasks=all-done` | [Open All Done Tasks](http://localhost:5173/?tasks=all-done) | Emerald celebration card, pulsing `All Caught Up` pill & `View Completed` CTA. |
| **Overdue Crunch State** | `?tasks=overdue` | [Open Overdue Tasks](http://localhost:5173/?tasks=overdue) | 3 urgent high-priority overdue assignments with red clock markers. |
| **Filter: Pending** | `?page=tasks&filter=pending` | [Open Pending Filter](http://localhost:5173/?page=tasks&filter=pending) | Direct view of pending assignments. |
| **Filter: Completed** | `?page=tasks&filter=completed` | [Open Completed Filter](http://localhost:5173/?page=tasks&filter=completed) | Direct view of completed assignments list. |
| **Filter: All** | `?page=tasks&filter=all` | [Open All Filter](http://localhost:5173/?page=tasks&filter=all) | Direct view of all assignments combined. |

---

## 4. Subjects & Syllabus (`SubjectsView`)

Reference file: [`SUBJECTS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/SUBJECTS_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=subjects` | [Open Default Subjects](http://localhost:5173/?page=subjects) | Original 4 subjects (20 chapters, 40% mastery, active progress bars). |
| **Empty Syllabus** | `?subjects=empty` | [Open Empty Syllabus](http://localhost:5173/?subjects=empty) | 0 subjects onboarded yet; centered empty hero with `+ Add Your First Subject` CTA. |
| **All Mastered (100%)** | `?subjects=all-mastered` | [Open All Mastered](http://localhost:5173/?subjects=all-mastered) | 100% curriculum completion celebration across all 20 chapters (`20/20 Ready`). |
| **New Semester (0%)** | `?subjects=new-semester` | [Open New Semester](http://localhost:5173/?subjects=new-semester) | Fresh semester kickoff; all 20 chapters set to `Not Started` (0% mastery, 20 untouched). |
| **Search Empty Miss** | `?subjects=search-empty` | [Open Search Miss](http://localhost:5173/?subjects=search-empty) | Pre-fills query with non-existent term, showing `No chapters found` and `Reset Filters`. |
| **Filter: Analyse** | `?page=subjects&subject=analyse` | [Open Analyse Filter](http://localhost:5173/?page=subjects&subject=analyse) | Pre-selects Analyse subject pill with cyan glow and shows its 6 chapters. |
| **Filter: Algèbre** | `?page=subjects&subject=algebre` | [Open Algèbre Filter](http://localhost:5173/?page=subjects&subject=algebre) | Pre-selects Algèbre subject pill with pink glow and shows its 5 chapters. |
| **Filter: Physique** | `?page=subjects&subject=physique` | [Open Physique Filter](http://localhost:5173/?page=subjects&subject=physique) | Pre-selects Physique subject pill with emerald glow and shows its 5 chapters. |
| **Filter: Informatique** | `?page=subjects&subject=informatique` | [Open Informatique Filter](http://localhost:5173/?page=subjects&subject=informatique) | Pre-selects Informatique subject pill with purple glow and shows its 4 chapters. |
| **Filter: Mastered Only** | `?page=subjects&level=mastered` | [Open Mastered Filter](http://localhost:5173/?page=subjects&level=mastered) | Displays only chapters with `Mastered` status across all subjects. |
| **Filter: In Progress** | `?page=subjects&level=in_progress` | [Open In Progress Filter](http://localhost:5173/?page=subjects&level=in_progress) | Displays chapters currently in progress (`Intermediate` or `Beginner`). |
| **Filter: Not Started** | `?page=subjects&level=not_started` | [Open Not Started Filter](http://localhost:5173/?page=subjects&level=not_started) | Displays untouched chapters requiring initial revision. |
| **Filter: Hard Difficulty** | `?page=subjects&difficulty=hard` | [Open Hard Difficulty](http://localhost:5173/?page=subjects&difficulty=hard) | Highlights high-complexity chapters with active difficulty badge. |

---

## 5. Documents & File System (`DocumentsView`)

Reference file: [`DOCUMENTS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/DOCUMENTS_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=documents` | [Open Default Documents](http://localhost:5173/?page=documents) | Original populated library (10 files across 4 courses, 4 root directories). |
| **Empty Library** | `?docs=empty` | [Open Empty Library](http://localhost:5173/?docs=empty) | Zero files in library; centered `64×64px` gradient box with `+ Upload Your First Document` CTA. |
| **Empty Folder State** | `?docs=empty-folder` | [Open Empty Folder](http://localhost:5173/?docs=empty-folder) | Subfolder with 0 files (`/Informatique/Projets & TD Python`), upload CTA. |
| **Search Empty Miss** | `?docs=search-empty` | [Open Search Miss](http://localhost:5173/?docs=search-empty) | Pre-fills query with non-existent term, showing `No documents matching` and `Clear Search`. |
| **Drive Synced Only** | `?docs=drive` | [Open Drive Synced](http://localhost:5173/?docs=drive) | Displays only the 8 files synced to Google Drive with active cloud status. |
| **Folder: Analyse** | `?page=documents&folder=analyse` | [Open Analyse Folder](http://localhost:5173/?page=documents&folder=analyse) | Subfolders: *Cours & Polys*, *TD & Séries*, *Devoirs & Concours*. |
| **Folder: Physique** | `?page=documents&folder=physique` | [Open Physique Folder](http://localhost:5173/?page=documents&folder=physique) | Subfolders: *Thermodynamique*, *Comptes-Rendus TP*, *Devoirs de Synthèse*. |
| **Folder: Algèbre** | `?page=documents&folder=algebre` | [Open Algèbre Folder](http://localhost:5173/?page=documents&folder=algebre) | Subfolders: *Espaces Vectoriels & Matrices*, *Réduction & Diagonalisation*. |
| **Folder: Informatique** | `?page=documents&folder=informatique` | [Open Informatique Folder](http://localhost:5173/?page=documents&folder=informatique) | Subfolders: *Algorithmique & Graphes*, *Projets & TD Python*. |

---

## 6. Flashcards & Active Recall (`FlashcardsView`)

Reference file: [`FLASHCARDS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/FLASHCARDS_UI_STATES.md)

### The 3 Flashcard Page Variants
| Variant | Name & Focus | Query Parameter | Direct Preview Link | Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **Variant 1** | **Decks Grid & Analytics** *(Default)* | `?page=flashcards` (or `&variant=decks`) | [Open Variant 1: Decks Grid](http://localhost:5173/?page=flashcards&variant=decks) | Visual subject decks in 2-column cards, 4-stat metrics overview bar (Due today, Mastery rate, 5-day streak, Total cards), subject filter pills, progress rings, and embedded card browser. |
| **Variant 2** | **Anki Pro Table & Heatmap** *(Power-User)* | `?page=flashcards&variant=anki` | [Open Variant 2: Anki Table](http://localhost:5173/?page=flashcards&variant=anki) | Professional Anki-style linear SRS table queue, 30-day interactive recall heatmap (35 cells with tooltips), SuperMemo 2 algorithm forecast intervals (Due today, Tomorrow, 3 Days, Next Week), and 5-min Sprint CTA. |
| **Variant 3** | **Curriculum Hub & Multi-Mode** *(Exam-Prep)* | `?page=flashcards&variant=curriculum` | [Open Variant 3: Curriculum Hub](http://localhost:5173/?page=flashcards&variant=curriculum) | Textbook/curriculum-oriented syllabus breakdown by chapter with exam countdown banners (DS 3 in 2 days), 4 active recall practice modes (3D Flip, Formula Speed Match, MCQ Quiz, Proof Reconstruct), and key formula chips. |

### Study Sessions & Edge Cases
| State / Flow | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Study: Analyse Deck** | `?page=flashcards&study=analyse` | [Open Analyse Study Session](http://localhost:5173/?page=flashcards&study=analyse) | Interactive 3D flip card session for Analyse (5 cards). Features Space/tap to flip, full mathematical answers, and 4 Spaced Repetition rating buttons. |
| **Study: Algèbre Deck** | `?page=flashcards&study=algebre` | [Open Algèbre Study Session](http://localhost:5173/?page=flashcards&study=algebre) | Interactive study session for Algèbre Linéaire (4 cards) covering Diagonalisation, Cayley-Hamilton, Rank theorem, and Vandermonde determinant. |
| **Study: All Due Cards** | `?page=flashcards&study=all` | [Open All Due Study Session](http://localhost:5173/?page=flashcards&study=all) | Mixed multi-subject active recall session reviewing all 12 cards due today across the curriculum. |
| **All Caught Up 🎉** | `?page=flashcards&state=all-done` | [Open All Caught Up State](http://localhost:5173/?page=flashcards&state=all-done) | Daily review completion celebration screen with emerald trophy, breakdown of ratings, and `Practice Again` or `Back to Decks` actions. |
| **Empty Flashcards State** | `?page=flashcards&state=empty` | [Open Empty State](http://localhost:5173/?page=flashcards&state=empty) | Zero flashcards in workspace; centered empty hero container with `+ Create Your First Flashcard` CTA. |
| **All Cards Browser & Search** | `?page=flashcards&tab=browse` | [Open Cards Browser](http://localhost:5173/?page=flashcards&tab=browse) | Searchable cards table with instant text search, subject pill filter chips, mastery tags (Mastered, Review, Learning), and streak counters. |
| **New Flashcard Modal** | `?page=flashcards&modal=new-card` | [Open New Card Modal](http://localhost:5173/?page=flashcards&modal=new-card) | Create flashcard dialog with deck selector, front prompt, back answer, key formula chip, and tags manager. |

---

## 7. AI Assistant (`AiAssistantView`)

Reference file: [`AI_ASSISTANT_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/AI_ASSISTANT_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=ai` | [Open Default AI Assistant](http://localhost:5173/?page=ai) | 5 conversations in sidebar, `conv-1` active with Welcome Hero and 4 quick action cards. |
| **Empty History & Canvas** | `?ai=empty` | [Open Empty AI State](http://localhost:5173/?ai=empty) | History is empty (0 chats); canvas shows enlarged Welcome Hero (`64×64px` icon). Sidebar shows empty history with `+ Start New Chat`. |
| **Live Streaming & Thinking** | `?ai=typing` | [Open Live Streaming](http://localhost:5173/?ai=typing) | Simulates real-time token streaming with animated pulsing cursor, thinking stage badge, and active `[Stop]` button. |
| **Action Executed State** | `?ai=action` | [Open Action Executed](http://localhost:5173/?ai=action) | Shows executed action card: 2 study tasks added to workspace with emerald checkmarks and interactive `View in Tasks` CTA. |
| **History Search Miss** | `?ai=search-empty` | [Open Search Miss](http://localhost:5173/?ai=search-empty) | Pre-fills sidebar search with `Quantum Gravitation`, showing the enlarged `No conversations found` card & `Clear search filter`. |
| **Chat: Algèbre Linéaire** | `?page=ai&chat=conv-2` | [Open Linear Algebra Chat](http://localhost:5173/?page=ai&chat=conv-2) | Matrix diagonalization theorem ($A = P \cdot D \cdot P^{-1}$) and eigenspace dimensions. |
| **Chat: Physique Thermo** | `?page=ai&chat=conv-3` | [Open Thermodynamics Chat](http://localhost:5173/?page=ai&chat=conv-3) | Heat capacity formula ($Q = m \cdot c \cdot \Delta T$) & Mayer relation. |
| **Chat: Calculus IBP** | `?page=ai&chat=conv-4` | [Open Calculus IBP Chat](http://localhost:5173/?page=ai&chat=conv-4) | Integration by parts formula ($\int u \cdot v' dx = u \cdot v - \int u' \cdot v dx$) and LIATE rule. |
| **Chat: Study Schedule** | `?page=ai&chat=conv-5` | [Open Study Schedule Chat](http://localhost:5173/?page=ai&chat=conv-5) | 3-day balanced revision plan for upcoming exams. |

---

## 8. Notifications & Alerts (`NotificationsView`)

Reference file: [`NOTIFICATIONS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/NOTIFICATIONS_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Populated** | `?page=notifications` | [Open Default Notifications](http://localhost:5173/?page=notifications) | 7 notifications across 3 chronological groups, `3 unread` badge, and `Mark all as read` CTA. |
| **Inbox Zero / Empty** | `?notifications=empty` | [Open Inbox Zero](http://localhost:5173/?notifications=empty) | Completely clear inbox (0 alerts); displays the centered `64×64px` bell container and `Return to Dashboard` CTA. |
| **All Caught Up / All Read** | `?notifications=all-read` | [Open All Read State](http://localhost:5173/?notifications=all-read) | All 7 notifications marked as read; unread badge and "Mark all as read" button cleanly hidden. |
| **Unread Only Filter** | `?notifications=unread` | [Open Unread Filter](http://localhost:5173/?notifications=unread) | Displays only the 3 pending unread alerts (Exam in 2 Days, Assignment Due Tonight, Next Class: Physics). |
| **Search Empty Miss** | `?notifications=search-empty` | [Open Search Miss](http://localhost:5173/?notifications=search-empty) | Pre-fills search with non-existent term, showing enlarged `No notifications matching` card & `Clear Search`. |
| **Category: Exams** | `?page=notifications&category=exam` | [Open Exams Category](http://localhost:5173/?page=notifications&category=exam) | Midterm alerts and logged grade reports with rose tags and `View Exam Sheet` CTA. |
| **Category: Assignments** | `?page=notifications&category=task` | [Open Assignments Category](http://localhost:5173/?page=notifications&category=task) | Due deadlines and subtask countdowns with sky-blue tags and `Open Task` CTA. |
| **Category: Classes** | `?page=notifications&category=session` | [Open Classes Category](http://localhost:5173/?page=notifications&category=session) | Lab booklet reminders and new professor notes with emerald tags and `Class Details` CTA. |
| **Category: AI Strategy** | `?page=notifications&category=ai` | [Open AI Strategy Category](http://localhost:5173/?page=notifications&category=ai) | High-yield revision suggestions with purple badges and `Review AI Plan` CTA. |

---

## 9. Settings & Authentication (`SettingsView` / `AuthView`)

Reference file: [`SETTINGS_AUTH_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/SETTINGS_AUTH_UI_STATES.md)

| State / Scenario | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Default Settings** | `?page=settings` | [Open Default Settings](http://localhost:5173/?page=settings) | Populated profile (Jane Doe), Google Drive active (`4.2 GB / 15 GB`, green Connected badge, Auto-Sync on), 420 MB cache. |
| **Cloud Disconnected** | `?settings=disconnected` | [Open Disconnected Drive](http://localhost:5173/?settings=disconnected) | Google Drive disconnected; displays prominent `Connect Google Drive` CTA and backup prompts. |
| **Empty Offline Cache** | `?settings=empty-cache` | [Open Empty Cache](http://localhost:5173/?settings=empty-cache) | Offline local storage cleared (`0 MB / 2 GB Cache`, 0% progress bar, green `Clean` badge). |
| **Cloud Syncing Active** | `?settings=syncing` | [Open Syncing Drive](http://localhost:5173/?settings=syncing) | Google Drive with spinning sync icon, disabled button state, and live sync animation. |
| **Sign In / Login** | `?auth=login` | [Open Sign In Form](http://localhost:5173/?auth=login) | Full login card with email, password, "Remember me", Google OAuth, and close dismissal button. |
| **Sign In (Error Alert)** | `?auth=login&error=invalid-credentials` | [Open Login With Error](http://localhost:5173/?auth=login&error=invalid-credentials) | Login form displaying red error alert banner: *"Invalid email or password"*. |
| **Sign Up / Register** | `?auth=signup` | [Open Sign Up Form](http://localhost:5173/?auth=signup) | Registration form with full name, email, password, Google OAuth, and switch link. |
| **Sign Up (Error Alert)** | `?auth=signup&error=email-exists` | [Open SignUp With Error](http://localhost:5173/?auth=signup&error=email-exists) | Registration form displaying red error banner: *"An account with this email already exists"*. |
| **Forgot Password** | `?auth=forgot` | [Open Password Reset](http://localhost:5173/?auth=forgot) | Password recovery form with email input and "Back to sign in" return navigation. |
| **Password Reset Sent** | `?auth=forgot&sent=true` | [Open Reset Sent Confirmation](http://localhost:5173/?auth=forgot&sent=true) | Recovery success state showing green check badge, *"Check your email"*, and recipient address. |

---

## 10. Modals, Popups & Overlays

Reference file: [`MODALS_POPUPS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/MODALS_POPUPS_UI_STATES.md)

| Modal / Popup | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **New Task Modal** | `?modal=new-task` | [Open New Task Modal](http://localhost:5173/?modal=new-task) | Create assignment dialog with subject selector, deadline picker, priority toggle, and subtasks. |
| **Task Details Modal** | `?modal=task-details` | [Open Task Details Modal](http://localhost:5173/?modal=task-details) | Populated task inspector showing *Chapter 4 Exercises*, subject badge, subtasks checklist, and action buttons. |
| **Edit Task Modal** | `?page=tasks&modal=edit-task` | [Open Edit Task Modal](http://localhost:5173/?page=tasks&modal=edit-task) | Pre-filled edit form with existing title, subject selection, deadline modification, and priority updates. |
| **Delete Task Modal** | `?page=tasks&modal=delete-task` | [Open Delete Task Modal](http://localhost:5173/?page=tasks&modal=delete-task) | Destructive action confirmation dialog with warning icon, task title citation, Cancel, and red `Delete Task` action. |
| **New Session Modal** | `?modal=new-session` | [Open New Session Modal](http://localhost:5173/?modal=new-session) | Timetable scheduler modal with title, subject selection, date, start/end times, room, and professor notes. |
| **Session Details Modal** | `?modal=session-details` | [Open Session Details Modal](http://localhost:5173/?modal=session-details) | Populated session card for *Algèbre Linéaire — Diagonalization Revision*, room, time, checklist notes, Edit & Delete. |
| **Exam Details Modal** | `?modal=exam-details` | [Open Exam Details Modal](http://localhost:5173/?modal=exam-details) | Comprehensive assessment view for *Algèbre Linéaire Midterm (DS 3)*: countdown (2 days left), Amphi 27, chapter breakdown. |
| **AI Suggest Smart Scheduler** | `?modal=ai-suggest` | [Open AI Suggest Modal](http://localhost:5173/?modal=ai-suggest) | AI study schedule generator recommending balanced revision slots based on upcoming exams with `Schedule All` CTA. |
| **Notification Settings Modal** | `?modal=notification-preferences` | [Open Notification Settings Modal](http://localhost:5173/?modal=notification-preferences) | Alert controls: 48h exam reminders, morning alerts, 15m class warnings, assignment reminders, AI digest toggles. |
| **Upload Document Modal** | `?page=documents&modal=upload-document` | [Open Upload Document Modal](http://localhost:5173/?page=documents&modal=upload-document) | File drag-and-drop zone with folder destination picker, format tags (PDF, DOCX, ZIP, PNG), and progress status. |
| **Upload In Progress** | `?page=documents&modal=upload-document&upload=uploading` | [Open Upload In Progress](http://localhost:5173/?page=documents&modal=upload-document&upload=uploading) | File upload dialog simulating active upload with animated spinner and disabled submission state. |
| **Document Details Modal** | `?page=documents&modal=document-details` | [Open Document Details Modal](http://localhost:5173/?page=documents&modal=document-details) | Document reader popup showing *Cours Complet Analyse III*, PDF metadata, file size, Drive status, and `Ask AI Assistant` action. |
| **New Subject Modal** | `?page=subjects&modal=new-subject` | [Open New Subject Modal](http://localhost:5173/?page=subjects&modal=new-subject) | Add subject dialog with name, course code, color theme selector, icon picker, professor name, and credit coefficient slider. |
| **New Chapter Modal** | `?page=subjects&modal=new-chapter` | [Open New Chapter Modal](http://localhost:5173/?page=subjects&modal=new-chapter) | Add curriculum chapter dialog with parent subject dropdown, chapter number, title, description, and difficulty rating. |
| **Chapter Details Modal** | `?page=subjects&modal=chapter-details` | [Open Chapter Details Modal](http://localhost:5173/?page=subjects&modal=chapter-details) | Deep-dive syllabus inspector showing *Suites & Séries Numériques*, mastery level switcher, and `Schedule Revision` CTA. |
| **New Flashcard Modal** | `?page=flashcards&modal=new-card` | [Open New Card Modal](http://localhost:5173/?page=flashcards&modal=new-card) | Create flashcard dialog with deck selector, front prompt, back answer, key formula chip, and tags manager. |
| **Import Timetable JSON Modal** | `?page=calendar&modal=import-json` | [Open Import JSON Modal](http://localhost:5173/?page=calendar&modal=import-json) | JSON timetable importer with drag-and-drop file upload, format validation, and `Import Schedule` action. |
| **Profile Dropdown** | `?dropdown=profile` | [Open Profile Dropdown](http://localhost:5173/?dropdown=profile) | User avatar card (Jane Doe, `jane@example.com`, online status), quick link to *Profile & Settings*, and red *Sign Out* action. |
| **Notifications Dropdown** | `?dropdown=notifications` | [Open Notifications Dropdown](http://localhost:5173/?dropdown=notifications) | Header bell popover with unread counter, fast notifications preview list, "Mark all as read", and link to full `NotificationsView`. |

---

## 11. Transactional Email Templates

Reference file: [`MODALS_POPUPS_UI_STATES.md`](file:///c:/Users/itsna/Desktop/web/MODALS_POPUPS_UI_STATES.md)

| Template Name | Query Parameter | Direct Preview Link | Description |
| :--- | :--- | :--- | :--- |
| **Verify Email Template** | `?page=emails&tab=verify` | [Open Verify Email Preview](http://localhost:5173/?page=emails&tab=verify) | Clean transactional verification email with GetStudy gradient branding, student greeting, prominent `Verify Email Address` CTA button, fallback URL, security notices, and help footer. |
| **Password Reset Template** | `?page=emails&tab=reset` | [Open Password Reset Preview](http://localhost:5173/?page=emails&tab=reset) | Secure password recovery email with lock badge, user greeting, prominent `Reset Password` CTA button, 1-hour expiration notice, security disclaimer, and direct support link. |

---

## 12. Key Implementation Files

- [`DashboardView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/dashboard/DashboardView.tsx)
- [`CalendarView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/CalendarView.tsx)
- [`WeekView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/WeekView.tsx)
- [`DayView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/DayView.tsx)
- [`MonthView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/calendar/MonthView.tsx)
- [`TasksView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/tasks/TasksView.tsx)
- [`SubjectsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/subjects/SubjectsView.tsx)
- [`DocumentsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/documents/DocumentsView.tsx)
- [`FlashcardsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/flashcards/FlashcardsView.tsx)
- [`FlashcardStudySession.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/flashcards/FlashcardStudySession.tsx)
- [`NewFlashcardModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/NewFlashcardModal.tsx)
- [`AiAssistantView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/ai/AiAssistantView.tsx)
- [`NotificationsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/notifications/NotificationsView.tsx)
- [`SettingsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/settings/SettingsView.tsx)
- [`GoogleDriveSection.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/settings/GoogleDriveSection.tsx)
- [`AuthView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/auth/AuthView.tsx)
- [`EmailPreviewView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/EmailPreviewView.tsx)
- [`VerifyEmailTemplate.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/VerifyEmailTemplate.tsx)
- [`ResetPasswordTemplate.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/emails/ResetPasswordTemplate.tsx)
- [`App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx)
