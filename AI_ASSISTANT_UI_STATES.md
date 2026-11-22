# AI Assistant UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, edge cases, action triggers, and conversation flows of the **AI Assistant** (`AiAssistantView`) module.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any state, live stream, or conversation can be previewed or tested instantly via URL query parameters.
- **Default view integrity**: When accessed normally without parameters, the page displays the 100% original AI Assistant with 5 full conversations in the sidebar and `conv-1` active.

---

## 1. Quick Navigation Matrix

| State / Scenario | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Populated** | `?page=ai` | [Open Default AI Assistant](http://localhost:5173/?page=ai) | 5 conversations in sidebar, `conv-1` active with Welcome Hero and 4 quick action cards. |
| **Empty History & Canvas** | `?ai=empty` | [Open Empty AI State](http://localhost:5173/?ai=empty) | History is empty (0 stored chats). Chat canvas displays the enlarged Welcome Hero (`64×64px` icon box). Sidebar shows empty history card with `+ Start New Chat`. |
| **Live Streaming & Thinking** | `?ai=typing` | [Open Live Streaming](http://localhost:5173/?ai=typing) | Simulates real-time token streaming with animated pulsing cursor, thinking stage badge, and active `[Stop]` button. |
| **Action Executed State** | `?ai=action` | [Open Action Executed](http://localhost:5173/?ai=action) | Shows executed action card: 2 study tasks added to workspace with emerald checkmarks and interactive `View in Tasks` CTA. |
| **History Search Miss** | `?ai=search-empty` | [Open Search Miss](http://localhost:5173/?ai=search-empty) | Pre-fills sidebar search with `Quantum Gravitation`, showing the enlarged `No conversations found` state with `Clear search filter`. |

---

## 2. Direct Conversation Deep Links

Clicking any link below immediately loads that specific conversation with formulas, key study points, and timestamps:

| Conversation | URL Parameter | Direct Test Link | Topic & Academic Content |
| :--- | :--- | :--- | :--- |
| **Tasks Setup** | `?page=ai&chat=conv-1` | [Open Tasks Setup](http://localhost:5173/?page=ai&chat=conv-1) | Planning tomorrow's tasks (Math Ch. 4 exercises & Physics notes). |
| **Algèbre Linéaire** | `?page=ai&chat=conv-2` | [Open Linear Algebra](http://localhost:5173/?page=ai&chat=conv-2) | Matrix diagonalization theorem ($A = P \cdot D \cdot P^{-1}$) and eigenspace dimensions. |
| **Physique Thermo** | `?page=ai&chat=conv-3` | [Open Thermodynamics](http://localhost:5173/?page=ai&chat=conv-3) | Heat capacity formula ($Q = m \cdot c \cdot \Delta T$) & Mayer relation. |
| **Calculus IBP** | `?page=ai&chat=conv-4` | [Open Calculus IBP](http://localhost:5173/?page=ai&chat=conv-4) | Integration by parts formula ($\int u \cdot v' dx = u \cdot v - \int u' \cdot v dx$) and LIATE priority rule. |
| **Study Schedule** | `?page=ai&chat=conv-5` | [Open Study Schedule](http://localhost:5173/?page=ai&chat=conv-5) | 3-day balanced revision plan for upcoming exams. |

---

## 3. Detailed State Specifications

### A. Default / Populated State (`?page=ai`)
- **Header**: Shows `Action-Enabled` emerald badge and `History` count pill (5 conversations).
- **History Sidebar**: Grouped chronologically into *Today*, *Yesterday*, and *Previous 7 Days* with subject color badges.
- **Active Chat (`conv-1`)**: Displays initial prompt greeting and 4 prominent quick action cards:
  - `Add 2 Tasks for Tomorrow` (Task Manager)
  - `Schedule Revision Block` (Calendar)
  - `Daily Briefing` (Overview)
  - `Plan Exam Revision` (Exam Prep)
- **Interactive Composer**: Supports full query entry, keyboard shortcuts (`Enter` to send, `Shift+Enter` for newline), document attachments via drag-and-drop or file picker.

---

### B. Empty History State (`?ai=empty` or `?chat=empty`)
- **Chat Canvas**:
  - Displays the prominent, enlarged Welcome Hero (`py-6 sm:py-10 px-2 sm:px-4`):
    - `64×64px` icon container (`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 shadow-xl ring-1 ring-white/10`).
    - Heading: **"How can I organize your studies today?"** (`text-[22px] sm:text-[24px] font-bold text-white tracking-tight`).
    - Subtitle: *"Tell me what tasks you need to do, schedule revision blocks, plan for exams, or ask academic questions."* (`text-[14.5px] sm:text-[15px] text-zinc-400 max-w-lg leading-relaxed`).
    - 4 quick action cards for instant 1-click query initiation.
- **History Sidebar**:
  - Header displays `0` conversations stored.
  - Sidebar body displays the enlarged empty history card (`py-16 px-4`):
    - `64×64px` icon box (`w-16 h-16 rounded-2xl bg-[#18181b] border border-[#27272a] text-zinc-400 shadow-inner`) with `lucide:messages-square` (30px).
    - Heading: **"No conversations yet"** (`text-[17px] font-bold text-white tracking-tight`).
    - Subtitle: *"Start a chat to organize tasks, schedule sessions, or solve exercises."* (`text-[13px] text-textMuted max-w-[240px] leading-relaxed`).
    - Primary CTA: `+ Start New Chat` button.
- **Interactivity**: Clicking any quick action card or sending a prompt automatically creates the first conversation and updates URL.

---

### C. Live Streaming / Typing State (`?ai=typing`)
- **Visuals**:
  - Shows AI Assistant in the active streaming state.
  - Floating status pill: `Formulating revision roadmap...` with animated ping indicator.
  - Live token streaming with typewriter effect and glowing cyan cursor (`[0_0_8px_rgba(56,189,248,0.8)]`).
  - Active **`Stop` button** with square icon: clicking immediately stops generation and saves the partial message.

---

### D. Action Executed State (`?ai=action`)
- **Visuals**:
  - Pre-loads conversation demonstrating AI's action execution capability.
  - User prompt: *"I have 2 tasks to do tomorrow: Complete Chapter 4 exercises and Review Physics notes."*
  - AI reply includes the **Action Executed Card**:
    - Emerald checkmark title: **Added 2 tasks to your workspace**
    - Itemized breakdown with subjects (Math, Physics) and due dates (Tomorrow).
    - Direct link: `View in Tasks →` seamlessly switches to the Tasks page.
    - Bulleted key points detailing syllabus priority assignment and overview sync.

---

### E. History Search Miss State (`?ai=search-empty`)
- **Visuals**:
  - Search input in history sidebar is pre-filled with `Quantum Gravitation`.
  - Sidebar list displays the enlarged search miss card (`py-16 px-4`):
    - `64×64px` icon box with `lucide:search-x` (30px).
    - Heading: **"No conversations found"** (`text-[17px] font-bold text-white tracking-tight`).
    - Subtitle: *"No chats matched “Quantum Gravitation”"* (`text-[13px] text-textMuted max-w-[240px] leading-relaxed`).
    - Action button: `Clear search filter` resets the search box and restores the complete conversation list.
