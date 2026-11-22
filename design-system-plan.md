# Education Calendar App - Design System Plan

## 1. Typography
We will use a clean, modern sans-serif font, such as **Inter** or **Geist**, to ensure maximum legibility for study schedules.
- **Font Family**: Inter (Primary)
- **Scale**:
  - `h1` (App Title/Main Header): 24px (text-2xl), Bold
  - `h2` (Date/View Header): 20px (text-xl), Semi-bold
  - `h3` (Card Titles): 16px (text-base), Bold
  - `body` (General Text): 14px (text-sm), Normal
  - `small` (Meta info, timestamps, category tags): 12px (text-xs), Medium

## 2. Color Palette
To improve upon the screenshot, we will use a more cohesive dark mode color palette (with light mode support).

### Base Colors (Dark Theme)
- **Background**: `slate-950` (#020617) - Deep dark background for less eye strain.
- **Surface/Card**: `slate-900` (#0f172a) - Slightly lighter for contrast.
- **Borders**: `slate-800` (#1e293b)
- **Text (Primary)**: `slate-50` (#f8fafc)
- **Text (Secondary/Muted)**: `slate-400` (#94a3b8)

### Category Accent Colors
Used for event card borders, subtle backgrounds, and category text. We will use soft, distinct Tailwind colors:
- **Mathematics (Algebra/Analyse)**: Blue / Indigo
- **Physics**: Violet / Purple
- **Chemistry**: Emerald / Teal
- **Methodology/General**: Amber / Orange
- **Languages**: Rose / Pink

## 3. Layout & Structure
- **Navigation Bar (Top)**: Logo/App Name on the left, main navigation links centered (Today, Activity, Calendar, Active Recall, etc.), and user/settings on the right.
- **Toolbar (Sub-header)**: 
  - Left: Previous/Next buttons, Current Date (e.g., "7 Mai 2026", "Vue Semaine").
  - Right: View Toggles (Week, Month), Action Buttons (Import/Export).
- **Calendar Grid**:
  - A responsive CSS Grid. 7 equal columns for the days of the week.
  - Column headers with Day name and Date.
  - Scrollable content area for each day column.

## 4. UI Components (Shadcn UI based)
- **Button**: Solid, outline, and ghost variants for different actions.
- **Card**: For the events, using a subtle border that matches the category color and a slight hover effect.
- **Badge**: For displaying the category name or duration compactly.
- **Toggle Group**: For switching between 'Week' and 'Month' views.

## 5. Event Card Anatomy
- **Header**: Duration or Time (e.g., "Matin 1 - 100 min") in a small, muted font.
- **Title**: Bold, clear text (e.g., "Réduction des endomorphismes").
- **Footer**: Category name, colored to match the accent.
- **Style**: The card will have a thin border matching the category color, with a highly transparent background of the same color to make it pop slightly without being overwhelming.
