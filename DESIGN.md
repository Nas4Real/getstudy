---
name: GetStudy
description: Instrument-grade academic cockpit for rigorous STEM curricula
colors:
  primary: "#ffffff"
  primary-foreground: "#000000"
  neutral-base: "#000000"
  neutral-panel: "#09090b"
  neutral-surface: "#121214"
  neutral-surface-hover: "#18181b"
  neutral-surface-active: "#222228"
  border-base: "#1f1f22"
  border-panel: "#27272a"
  border-card: "#25252b"
  border-card-subtle: "#2a2a32"
  text-primary: "#ffffff"
  text-secondary: "#e4e4e7"
  text-muted: "#8b8b8b"
  text-subtle: "#52525b"
  accent-analyse: "#06b6d4"
  accent-algebre: "#ec4899"
  accent-physique: "#10b981"
  accent-mecanique: "#3b82f6"
  accent-methodologie: "#f59e0b"
  accent-informatique: "#c084fc"
  accent-purple: "#a855f7"
  base-navy: "#0b1118"
  status-urgent: "#ef4444"
  status-warning: "#f59e0b"
  status-success: "#10b981"
typography:
  display:
    fontFamily: "Space Grotesk, Poppins, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  display-sm:
    fontFamily: "Space Grotesk, Poppins, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  title-sm:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body-sm:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  caption:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.text-secondary}"
  button-secondary:
    backgroundColor: "{colors.neutral-surface-hover}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  card-standard:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip-subject:
    backgroundColor: "{colors.neutral-panel}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
---

# Design System: GetStudy

## Overview

**Creative North Star: "The Precision Observatory"**

GetStudy is an instrument-grade, high-focus academic cockpit engineered for students tackling rigorous STEM programs. Like a scientific observatory pointing into deep space, the interface is anchored in an uncompromising deep obsidian environment (`#000000` base, `#09090b` panels, and `#121214` card surfaces). Against this void, mathematical formulas, countdown timers, subject trajectories, and curriculum mastery metrics radiate with razor-sharp optical clarity.

The visual atmosphere is serious, adult, and exact. It rejects consumer to-do app fluff, playful cartoon gamification, celebratory confetti explosions, and noisy saturated banners. Instead, every pixel conveys purpose: hairline `#27272a` borders structure high-density academic information; vibrant chromatic subject accents provide immediate course orientation; and spring-tuned micro-interactions deliver quiet, tactile satisfaction upon task completion.

**Key Characteristics:**
- **Obsidian Tonal Layering**: Deep dark hierarchical planes (`#000000` base → `#09090b` sidebar/panel → `#121214` card container → `#18181b` interactive surface).
- **Subject-Chromatic Wayfinding**: Distinct, high-luminance chromatic identities for each discipline against monochrome neutral foundations.
- **Mathematical Typographic Rigor**: High-legibility Poppins paired with Space Grotesk headings, JetBrains Mono metadata, and native KaTeX typesetting for mathematical expressions.
- **Tactile Micro-Interactions**: Confident pill action buttons, spring checkmark snaps, subtle emerald completion ripples, and smooth layout height collapses.

## Colors

The GetStudy palette pairs deep neutral obsidian surfaces with vivid, functional chromatic subject beacons. Color is never decorative wallpaper; it is an active orienting signal.

### Primary
- **Stark Crisp White** (`#ffffff`): Reserved for primary call-to-action buttons, high-priority active labels, and hero headlines. Creates maximum contrast against obsidian surfaces.
- **True Obsidian Base** (`#000000`): The ground plane for the application frame and view canvas.

### Neutrals & Surfaces
- **Obsidian Panel** (`#09090b`): The baseline surface for the primary sidebar, top navigation bars, and background drawers.
- **Observation Surface** (`#121214`): The foundational card background across Dashboard, Calendar, Tasks, and Subjects.
- **Surface Hover** (`#18181b`): Lifted state for cards, hovered dropdown items, and active icon buttons.
- **Surface Active / Border Subdued** (`#1f1f22`): Subtle separator lines and nested container borders.
- **Hairline Border** (`#27272a` / `#25252b`): Standard structural border framing every card, module, and table row.
- **Primary Text** (`#ffffff`): Course titles, task headings, and active values.
- **Muted Text** (`#8b8b8b`): Subtitles, helper text, and inactive metadata.
- **Subtle Metadata** (`#52525b`): Keyboard shortcut badges, secondary timestamps, and structural markers.

### Subject Accents
Each discipline owns a permanent, unambiguous chromatic signature:
- **Analyse (Electric Cyan)** (`#06b6d4`): Limits, integrals, sequences, and differential calculus.
- **Algèbre (Vivid Orchid)** (`#ec4899`): Vector spaces, matrices, endomorphisms, and diagonalization.
- **Physique (Emerald Beacon)** (`#10b981`): Mechanics, electromagnetism, thermodynamics, and laboratory sessions.
- **Mécanique (Sapphire)** (`#3b82f6`): Kinematics, fluid dynamics, and rigid body physics.
- **Méthodologie (Solar Amber)** (`#f59e0b`): Exam strategy, problem set drafting, and review milestones.
- **Informatique (Digital Violet)** (`#c084fc`): Python algorithms, data structures, and graph theory.

### Status Indicators
- **Overdue / Critical** (`#ef4444`): High-priority deadlines, overdue assignments, and exam countdowns under 48 hours.
- **Warning / Approaching** (`#f59e0b`): Medium-priority tasks, deadlines within 7 days, and ongoing review sessions.
- **Success / Completed** (`#10b981`): Mastered chapters, completed tasks, attended lectures, and 100% curriculum milestones.

### Named Rules
**The Signal Purity Rule.** Chromatic subject accents are restricted to badges, tags, active progress bars, and calendar borders. They must never be used as full-bleed backgrounds or decorative card fills.
**The Hairline Boundary Rule.** Surfaces never separate by drop shadow alone; every card or panel must be defined by a crisp 1px hairline border (`#25252b` or `#27272a`).

## Typography

Typography prioritizes extreme readability across high-density timetables, technical course titles, and complex mathematical notation.

**Display Font:** Space Grotesk (fallback: Poppins, sans-serif)  
**Body Font:** Poppins (fallback: ui-sans-serif, system-ui, sans-serif)  
**Label/Mono Font:** JetBrains Mono (fallback: monospace)  
**Mathematical Engine:** KaTeX (AMS / LaTeX rendering)

**Character:** Modern geometric clarity tempered by open letterforms, balancing rapid scanning on dashboards with formal elegance in mathematical formulas.

### Hierarchy
- **Display** (Bold 700, 24px–28px, line-height 1.15, tracking -0.025em): View hero headers (e.g., "AI Assistant", "Study Calendar", "Overview").
- **Headline** (Bold 700, 18px–20px, line-height 1.25, tracking -0.02em): Section headers, course names, and major card headings.
- **Title** (Semi-bold 600, 15px–17px, line-height 1.35, tracking -0.015em): Task items, timetable slot titles, chapter names.
- **Body** (Regular 400–Medium 500, 13px–14.5px, line-height 1.5): Descriptions, assistant messages, notes, and instructions. Max line length 65–75ch.
- **Label / Metric** (JetBrains Mono Semi-bold 600, 11px–12.5px, uppercase, tracking 0.04em): Time stamps, difficulty ratings, coefficients (`DS 3 • Coeff 4 • 3 Hours`), and keyboard shortcuts.

### Named Rules
**The Mathematical Primacy Rule.** Any equation or mathematical variable appearing in notes, prompts, flashcards, or syllabus chapters must be rendered with KaTeX formatting (`\(...\)` or `$$...$$`), never plain ascii approximations like `x^2` or `integral`.

## Layout

GetStudy operates as an edge-to-edge web workspace engineered for rapid navigation without page reloads.

- **Desktop Framework**: Fixed left navigation sidebar (240px) housing primary navigation links and profile controls. Main viewport fills remaining space with dedicated scroll container (`scrollbar-hide`).
- **Header Dock**: Sticky top bar (`bg-[#09090b]/85 backdrop-blur-md border-b border-[#27272a]`) providing breadcrumb view title, live action status, and primary action buttons.
- **Grid Systems**:
  - Dashboard: Balanced 2-column or 3-column responsive card grid (`gap-6 sm:gap-7`).
  - Calendar Week: 7 equal-width columns (Lun–Dim) with dedicated time-axis gutters.
  - Tasks & Subjects: Focused single-column central track (`max-w-[1240px]`) centered within the reading canvas.
- **Mobile Responsive Behavior**: Navigation transitions into a bottom navigation tab bar; sidebars transform into smooth slide-in drawers (`w-[85vw] max-w-[360px]`).

## Elevation & Depth

GetStudy relies strictly on **tonal layering** and **hairline boundaries** rather than heavy drop shadows. Depth is established through subtle variations in surface luminance.

### Depth Vocabulary
- **Level 0 (Canvas Base)**: `#000000` (Pure Black).
- **Level 1 (Dock & Panels)**: `#09090b` (Deep Obsidian).
- **Level 2 (Cards & Modules)**: `#121214` (Surface Layer).
- **Level 3 (Hover & Active Surfaces)**: `#18181b` (Interactive Elevation).
- **Level 4 (Floating Modals & Menus)**: `#141416` with `border border-[#27272a]` and soft ambient shadow `0 10px 35px rgba(0,0,0,0.85)`.

### State-Driven Shadows & Glows
- **Focused State**: `ring-2 ring-cyan-400/40` or `ring-1 ring-white/30`.
- **Completion Ping**: Emerald circular pulse wave (`shadow-[0_0_12px_rgba(16,185,129,0.4)]` and `animate-ping`).
- **Subject Glow**: Subtle 8px glow matched to subject color (`shadow-[0_0_8px_rgba(6,182,212,0.3)]`) on active filter pills.

### Named Rules
**The Shadow-as-State Rule.** Ambient shadows are banned on static resting cards. Elevation glows and drop shadows are strictly transient responses to focus, hover, modal presence, or action completion.

## Shapes

The form language pairs ergonomic pills for interactive triggers with structured rectangular cards for data containment.

- **Pill Triggers (`rounded-full`)**: Primary actions ("New Task", "Start New Chat", "New Session"), subject filter chips, and status badges.
- **Container Cards (`rounded-2xl` / 16px to `rounded-[24px]` / 24px)**: Outer module boundaries, task group sections, and subject cards.
- **Interactive Rows & Inputs (`rounded-xl` / 12px)**: Search inputs, modal text fields, task items, and menu buttons.
- **Micro Badges (`rounded-md` / 6px to `rounded-lg` / 8px)**: Category tags, duration chips, and difficulty indicators.

## Components

### Primary Buttons
- **Shape**: Pill (`rounded-full`).
- **Style**: High-contrast white background (`bg-white`), black text (`text-black font-bold text-sm`), subtle border (`border border-white/20`).
- **Hover / Active**: `hover:bg-zinc-200 active:scale-95 transition-all shadow-sm`.
- **Target Size**: Minimum touch target ≥ 44×44px.

### Circular Completion Checkbox
- **Shape**: Circle (`w-[26px] h-[26px] rounded-full border-[2px]`).
- **Resting**: `border-[#27272a] bg-transparent group-hover:border-white transition-all`.
- **Completed**: `border-emerald-500 bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]`.
- **Interaction**: Press bounce (`active:scale-90 group-hover:scale-105 duration-150`), checkmark rotation pop (`scale-0 -rotate-45` → `scale-100 rotate-0 duration-200`), and emerald ripple wave.

### Subject Badge Chips
- **Shape**: `rounded-md px-2.5 py-1 text-[12px] font-bold border`.
- **Coloring**: 10%–15% tinted background with matching 25% border and vibrant text (e.g. `bg-analyse/10 border-analyse/20 text-analyse`).

### Cards & Modules
- **Shape**: `rounded-2xl sm:rounded-[24px] border border-[#25252b] bg-[#121214] p-5 sm:p-7`.
- **Hover**: Subtle border brightening (`hover:border-[#3f3f46] hover:bg-[#18181b] transition-all duration-200`).

### Search & Text Inputs
- **Shape**: `rounded-xl border border-[#27272a] bg-[#0c0c0e] px-4 py-2.5 text-[14px] text-white`.
- **Focus**: `focus:border-white focus:ring-1 focus:ring-white/40 focus:outline-none transition-all`.

## Do's and Don'ts

### Do:
- **Do** maintain the 4-tier obsidian hierarchy: `#000000` base, `#09090b` panels, `#121214` cards, `#18181b` hover states.
- **Do** frame all cards and containers with crisp `#25252b` or `#27272a` 1px borders.
- **Do** use `rounded-full` exclusively for primary action buttons, filter toggles, and status badges.
- **Do** pair every subject color with its established code (`#06b6d4` Analyse, `#ec4899` Algèbre, `#10b981` Physique, etc.).
- **Do** provide smooth completion transitions (450ms persistence + 320ms slide collapse) when items leave filtered views.
- **Do** ensure interactive elements maintain a minimum 44×44px touch target.

### Don't:
- **Don't** use heavy drop shadows on resting cards or panels.
- **Don't** use subject colors as large full-bleed card backgrounds.
- **Don't** add juvenile gamification, cartoon mascots, or party confetti to academic views.
- **Don't** display raw ASCII math approximations when KaTeX rendering is required.
- **Don't** instantaneously remove completed tasks in 0ms without a visual confirmation transition.
- **Don't** introduce light-mode backgrounds into the core obsidian interface.
