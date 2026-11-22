# Settings & Authentication UI States Reference & Testing Guide

This document is the complete reference guide and direct preview index for all simulated UI states, cloud connection modes, cache states, and authentication forms of the **Settings & Authentication** (`SettingsView` / `AuthView`) modules.

All states are **100% production-clean**:
- **Zero in-app debug bars or switcher pills** cluttering the interface.
- **Purely URL-driven**: Any screen, modal, or form state can be previewed or tested instantly via URL query parameters.
- **Default view integrity**: When accessed normally without parameters, settings displays the 100% original profile with Google Drive connected, 420 MB cache, and complete security options.

---

## 1. Quick Navigation Matrix

### Settings & Cloud Integration (`SettingsView`)
| State / Scenario | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Default Settings** | `?page=settings` | [Open Default Settings](http://localhost:5173/?page=settings) | Populated profile (Jane Doe), Google Drive active (`4.2 GB / 15 GB`, green Connected badge, Auto-Sync on), 420 MB cache. |
| **Cloud Disconnected** | `?settings=disconnected` | [Open Disconnected Drive](http://localhost:5173/?settings=disconnected) | Google Drive disconnected; displays prominent `Connect Google Drive` CTA and backup prompts. |
| **Empty Offline Cache** | `?settings=empty-cache` | [Open Empty Cache](http://localhost:5173/?settings=empty-cache) | Offline local storage cleared (`0 MB / 2 GB Cache`, 0% progress bar, green `Clean` badge). |
| **Cloud Syncing Active** | `?settings=syncing` | [Open Syncing Drive](http://localhost:5173/?settings=syncing) | Google Drive with spinning sync icon, disabled button state, and live sync animation. |

### Authentication & Account Forms (`AuthView`)
| Form / Flow | URL Parameter | Direct Test Link | Description |
| :--- | :--- | :--- | :--- |
| **Sign In / Login** | `?auth=login` | [Open Sign In Form](http://localhost:5173/?auth=login) | Full login card with email, password, "Remember me", Google OAuth, and close dismissal button. |
| **Sign In (Error Alert)** | `?auth=login&error=invalid-credentials` | [Open Login With Error](http://localhost:5173/?auth=login&error=invalid-credentials) | Login form displaying red error alert banner: *"Invalid email or password"*. |
| **Sign Up / Register** | `?auth=signup` | [Open Sign Up Form](http://localhost:5173/?auth=signup) | Registration form with full name, email, password, Google OAuth, and switch link. |
| **Sign Up (Error Alert)** | `?auth=signup&error=email-exists` | [Open SignUp With Error](http://localhost:5173/?auth=signup&error=email-exists) | Registration form displaying red error banner: *"An account with this email already exists"*. |
| **Forgot Password** | `?auth=forgot` | [Open Password Reset](http://localhost:5173/?auth=forgot) | Password recovery form with email input and "Back to sign in" return navigation. |
| **Password Reset Sent** | `?auth=forgot&sent=true` | [Open Reset Sent Confirmation](http://localhost:5173/?auth=forgot&sent=true) | Recovery success state showing green check badge, *"Check your email"*, and recipient address. |

---

## 2. Detailed State Specifications

### A. Default Settings State (`?page=settings`)
- **Profile Card**: Avatar with camera update button, Jane Doe full name, `jane@example.com` (read-only email), and `Save Changes` button.
- **Cloud Storage (Google Drive)**:
  - Status: Green `Connected` pulsing badge.
  - Quota: `4.2 GB / 15 GB Cloud Quota` with colored usage bar (28%).
  - Account: Mirrored with `jane.doe@gmail.com`.
  - Actions: `Sync Now` (with live spinner animation) and `Disconnect` button.
  - Toggle: Automatic Background Sync switch.
- **Preferences**:
  - Notification Preferences modal trigger (`Manage`).
  - Local Offline Cache: Shows `420 MB / 2 GB Cache` with interactive `Clear Cache` button.
- **Security & Session**:
  - `Update Password` trigger with instant confirmation toast.
  - `Sign Out` button with red warning styling that safely opens the AuthView.

---

### B. Disconnected Cloud Storage State (`?settings=disconnected` or `?drive=disconnected`)
- **Visuals**:
  - Google Drive card shows disconnected state without quota bar.
  - Subtitle: *"Connect your Google account to back up documents, revision summaries, and exams."*
  - Primary CTA: High-contrast `Connect Google Drive` button with official SVG Drive logo.
  - Clicking `Connect Google Drive` connects the account live with toast feedback.

---

### C. Empty Offline Cache State (`?settings=empty-cache`)
- **Visuals**:
  - Local Offline Cache displays `0 MB / 2 GB Cache`.
  - Progress bar width: `0%`.
  - Status pill: Green `Clean` badge.
  - "Clear Cache" button is replaced by the Clean indicator until new offline files are cached.

---

### D. Authentication Overlay Forms (`?auth=login`, `?auth=signup`, `?auth=forgot`)
- **Modal Container**:
  - Frosted glass backdrop blur (`bg-[#09090b]/95 backdrop-blur-md`).
  - Top-right close button (`X`) allowing 1-click dismissal and clean URL restoration.
  - Brand logo header (`GetStudy`).
- **Interactive Switching**:
  - Switching between Sign In, Sign Up, and Forgot Password updates the URL dynamically so test states can be shared or bookmarked directly.
