# Flashcards & Active Recall UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, study session modes, deck views, and card creation flows of the **Flashcards & Active Recall** (`FlashcardsView`) module.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any deck, review session, empty state, browser list, or creation modal can be previewed or tested instantly via URL query parameters.
- **Default view integrity**: When accessed normally without parameters, flashcards displays the populated 4-subject decks overview with 12 due cards, 5-day streak, 82% mastery rate, and quick study triggers.

---

## 1. Quick Navigation Matrix & 3 Layout Variants

### The 3 Flashcard Page Variants
| Variant | Name & Focus | URL Parameter | Direct Preview Link | Description & Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **Variant 1** | **Decks Grid & Analytics** *(Default)* | `?page=flashcards` (or `&variant=decks`) | [Open Variant 1: Decks Grid](http://localhost:5173/?page=flashcards&variant=decks) | Visual subject decks in 2-column cards, 4-stat metrics overview bar (Due today, Mastery rate, 5-day streak, Total cards), subject filter pills, progress rings, and embedded card browser. |
| **Variant 2** | **Anki Pro Table & Heatmap** *(Power-User)* | `?page=flashcards&variant=anki` | [Open Variant 2: Anki Table](http://localhost:5173/?page=flashcards&variant=anki) | Professional Anki-style linear SRS table queue, 30-day interactive recall heatmap (35 cells with tooltips), SuperMemo 2 algorithm forecast intervals (Due today, Tomorrow, 3 Days, Next Week), and 5-min Sprint CTA. |
| **Variant 3** | **Curriculum Hub & Multi-Mode** *(Exam-Prep)* | `?page=flashcards&variant=curriculum` | [Open Variant 3: Curriculum Hub](http://localhost:5173/?page=flashcards&variant=curriculum) | Textbook/curriculum-oriented syllabus breakdown by chapter with exam countdown banners (DS 3 in 2 days), 4 active recall practice modes (3D Flip, Formula Speed Match, MCQ Quiz, Proof Reconstruct), and key formula chips. |

---

### Study Sessions & Edge Cases
| State / Flow | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Study Mode: Analyse Deck** | `?page=flashcards&study=analyse` | [Open Analyse Study Session](http://localhost:5173/?page=flashcards&study=analyse) | Interactive 3D flip card session for Analyse (5 cards). Features prompt, hint, tap/Space to flip, correct mathematical answer, and 4 Spaced Repetition rating buttons (Again, Hard, Good, Easy). |
| **Study Mode: Algèbre Deck** | `?page=flashcards&study=algebre` | [Open Algèbre Study Session](http://localhost:5173/?page=flashcards&study=algebre) | Interactive study session for Algèbre Linéaire (4 cards) covering Diagonalisation, Cayley-Hamilton, Rank theorem, and Vandermonde determinant. |
| **Study Mode: All Due Cards** | `?page=flashcards&study=all` | [Open All Due Study Session](http://localhost:5173/?page=flashcards&study=all) | Mixed multi-subject active recall session reviewing all 12 cards due today across the curriculum. |
| **All Caught Up 🎉** | `?page=flashcards&state=all-done` | [Open All Caught Up State](http://localhost:5173/?page=flashcards&state=all-done) | Daily review completion celebration screen with emerald trophy, breakdown of ratings, and `Practice Again` or `Back to Decks` actions. |
| **Empty Flashcards State** | `?page=flashcards&state=empty` | [Open Empty State](http://localhost:5173/?page=flashcards&state=empty) | Zero flashcards in workspace; centered empty hero container with `+ Create Your First Flashcard` CTA. |
| **All Cards Browser & Search** | `?page=flashcards&tab=browse` | [Open Cards Browser](http://localhost:5173/?page=flashcards&tab=browse) | Searchable cards table with instant text search, prominent subject filter pills (All, Due Today, Analyse, Algèbre, Physique, Info), mastery tags (Mastered, Review, Learning), and streak counters. |
| **New Flashcard Modal** | `?page=flashcards&modal=new-card` | [Open New Card Modal](http://localhost:5173/?page=flashcards&modal=new-card) | Create flashcard dialog with deck selector, front prompt, back answer, key formula chip, and tags manager. |

---

## 2. Filter Pills & Search System
- **Decks Filter Bar**: Both on `Subject Decks` and `All Cards Browser`, prominent pill buttons allow instant filtering:
  - `All Decks` / `All Cards`
  - `Due Today` (shows only decks/cards with pending reviews)
  - `Analyse`
  - `Algèbre`
  - `Physique`
  - `Informatique`
- **Pill Styling**: Bold typography (`h-[44px] sm:h-[48px] px-5 sm:px-6 rounded-full text-[14px] sm:text-[15px] font-bold`), active white solid pill with black text and ambient glow, inactive dark background with hover borders.
- **Search Bar**: Instant real-time search filtering theorem names, proof steps, LaTeX formula chips, and tags.

---

## 3. Detailed Features & UX Highlights

### A. Spaced Repetition Study Engine (`FlashcardStudySession.tsx`)
- **3D Card Flip**: Smooth perspective rotation when clicking the card or pressing the `Space` bar.
- **Front of Card**: Clean typography presenting the concept prompt, chapter tag, and hint.
- **Back of Card**: Detailed step-by-step mathematical definition, convergence conditions, and formula chips.
- **Spaced Repetition Feedback**:
  - `Again (< 1m)`: Red button / hotkey `1`
  - `Hard (10m)`: Amber button / hotkey `2`
  - `Good (1d)`: Sky-blue button / hotkey `3`
  - `Easy (4d)`: Emerald button / hotkey `4`
- **Session Progress Bar**: Live progress indicator tracking completed cards in the current study block.

---

### B. Subject Decks Overview (`FlashcardsView.tsx`)
- **Analyse**: *Théorèmes & Convergence* (Cyan theme, 24 total, 5 due today, 75% mastered).
- **Algèbre**: *Matrices & Réduction* (Purple theme, 18 total, 4 due today, 88% mastered).
- **Physique**: *Thermodynamique & Ondes* (Emerald theme, 20 total, 3 due today, 65% mastered).
- **Informatique**: *Algorithmes & Graphes* (Amber theme, 15 total, 0 due today, 100% mastered).

---

### C. New Flashcard Modal (`NewFlashcardModal.tsx`)
- Built using GetStudy's refined modal header standard (clean badges, close button, zero harsh top border).
- Deck / Subject picker with color indicators.
- Textareas for front question and back answer with auto-validation.
- Optional key formula and comma-separated tags inputs.
