# Documents & Library UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, edge cases, and directory navigation scenarios of the **Documents & File System** (`DocumentsView`) module.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any state, folder view, or search result can be previewed or tested instantly via URL query parameters.
- **Default view integrity**: When accessed normally without parameters, the page displays the exact 100% original library (10 files across 4 subjects, 4 root directories, and full breadcrumb navigation).

---

## 1. Quick Navigation Matrix

| State / Scenario | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Default / Normal** | `?page=documents` | [Open Default Documents](http://localhost:5173/?page=documents) | Original populated library: 10 files across 4 courses, 4 root folders, Google Drive sync indicators. |
| **Empty Library** | `?docs=empty` | [Open Empty Library](http://localhost:5173/?docs=empty) | Zero files in library; centered `64×64px` gradient box with `+ Upload Your First Document` CTA. |
| **Empty Folder State** | `?docs=empty-folder` | [Open Empty Folder](http://localhost:5173/?docs=empty-folder) | Navigates into an empty subfolder (`/Informatique/Projets & TD Python`) showing empty folder alert & CTA. |
| **Search Empty Miss** | `?docs=search-empty` | [Open Search Miss](http://localhost:5173/?docs=search-empty) | Pre-fills search query with non-existent term, showing enlarged `No documents matching` card & `Clear Search`. |
| **Drive Synced Only** | `?docs=drive` | [Open Drive Synced](http://localhost:5173/?docs=drive) | Displays only the 8 files synced to Google Drive with active cloud status. |

---

## 2. Direct Folder Navigation Scenarios

| Directory Level | URL Parameter | Direct Test Link | Highlights |
| :--- | :--- | :--- | :--- |
| **Folder: Analyse** | `?page=documents&folder=analyse` | [Open Analyse Folder](http://localhost:5173/?page=documents&folder=analyse) | Subfolders: *Cours & Polys*, *TD & Séries*, *Devoirs & Concours* + Analyse files. |
| **Folder: Physique** | `?page=documents&folder=physique` | [Open Physique Folder](http://localhost:5173/?page=documents&folder=physique) | Subfolders: *Thermodynamique*, *Comptes-Rendus TP*, *Devoirs de Synthèse* + Physique files. |
| **Folder: Algèbre** | `?page=documents&folder=algebre` | [Open Algèbre Folder](http://localhost:5173/?page=documents&folder=algebre) | Subfolders: *Espaces Vectoriels & Matrices*, *Réduction & Diagonalisation*. |
| **Folder: Informatique** | `?page=documents&folder=informatique` | [Open Informatique Folder](http://localhost:5173/?page=documents&folder=informatique) | Subfolders: *Algorithmique & Graphes*, *Projets & TD Python*. |
| **Subfolder: TD Analyse** | `?page=documents&folder=analyse/td` | [Open TD Analyse Subfolder](http://localhost:5173/?page=documents&folder=analyse/td) | Direct deep-dive into the tutorial sheets directory with back navigation. |

---

## 3. Detailed State Specifications

### A. Default / Normal State (`?page=documents`)
- **Header**: Shows `10 Files` badge and `+ Upload Document` button.
- **Search Bar**: Full text search across title, course, or folder path with keyboard shortcut indicator (`⌘K`).
- **Directory Breadcrumbs**: Interactive trail (`Documents / ...`) with file/folder counts and one-click ancestor jumping.
- **Root Folders Grid**: 4 prominent course folders with subject color glows, stored size metrics, and item counters.
- **Files Table**: Rich data table with Drive sync cloud icons, subject badge pills, file formats (PDF), size, and upload dates.
- **Interactive Modals**:
  - Clicking any file row opens [`DocumentDetailsModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/DocumentDetailsModal.tsx) with AI summary options.
  - Clicking `Upload Document` opens [`UploadDocumentModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/UploadDocumentModal.tsx).

---

### B. Empty Library State (`?docs=empty` or `?docs=0`)
- **Visuals**:
  - Top header badge displays `0 Files`.
  - Root directories grid is hidden to keep focus clean.
  - Displays the prominent, enlarged empty hero card (`py-16 sm:py-20 px-6 sm:px-12`):
    - `64×64px` icon container (`w-16 h-16 rounded-3xl bg-gradient-to-b from-[#1c1c22] to-[#121216] border border-[#27272a] text-cyan-400 mb-4 shadow-xl`).
    - Heading: **"No documents in your library yet"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2 tracking-tight`).
    - Subtitle: *"Upload your syllabus notes, tutorial problem sheets, exam papers, and course polycopiés to organize them across subjects."* (`text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed`).
    - Primary CTA: `+ Upload Your First Document` opens [`UploadDocumentModal`](file:///c:/Users/itsna/Desktop/web/src/components/modals/UploadDocumentModal.tsx).

---

### C. Empty Folder State (`?docs=empty-folder`)
- **Visuals**:
  - Active path: `/Informatique/Projets & TD Python` (0 files inside).
  - Displays the clean, enlarged empty folder card (`py-16 sm:py-20 px-6 sm:px-12`):
    - `64×64px` icon container with `lucide:folder-open` (`34px`).
    - Heading: **"No files in this folder yet"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2 tracking-tight`).
    - Subtitle: *"You can upload lecture notes, problem sets, or past exams directly into this directory."* (`text-[15px] text-zinc-400 max-w-md mb-6`).
    - Action button: `+ Upload File Here` pre-selects the current directory path for instant uploading.

---

### D. Search Empty Miss State (`?docs=search-empty` or typing query without match)
- **Visuals**:
  - Pre-fills search with non-existent filename `NonExistentDoc.pdf`.
  - Displays the enlarged search miss card (`py-16 sm:py-20 px-6 sm:px-12`):
    - `64×64px` icon box with `lucide:search-x` (`34px`).
    - Heading: **No documents matching "NonExistentDoc.pdf"** (`text-[21px] sm:text-[23px] font-bold text-white mb-2`).
    - Subtitle: *"We couldn't find any file with that name in this folder or search scope."* (`text-[15px] text-zinc-400 max-w-md mb-6`).
    - Action button: `Clear Search` clears the query and resets the view and URL.

---

### E. Google Drive Synced Only (`?docs=drive` or `?docs=drive-synced`)
- **Visuals**:
  - Header badge highlights: `8 Synced to Drive` with blue cloud icon.
  - File table filters exclusively to documents with active Google Drive backup paths.

---

## 4. Key Implementation Files

- [`DocumentsView.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/documents/DocumentsView.tsx)
- [`DocumentDetailsModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/DocumentDetailsModal.tsx)
- [`UploadDocumentModal.tsx`](file:///c:/Users/itsna/Desktop/web/src/components/modals/UploadDocumentModal.tsx)
- [`App.tsx`](file:///c:/Users/itsna/Desktop/web/src/App.tsx)
