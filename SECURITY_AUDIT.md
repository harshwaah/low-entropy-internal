# SmritiSaathi Security, Secrets & Configuration Audit Report

**Audit Phase**: v1.0.1  
**Audit Date**: September 2026  
**Auditor**: Lead Security Architect & AI Engineering Systems Agent  
**Repository**: `smritisaathi`  
**Classification**: Internal Confidential — Healthcare & Cognitive AI Companion  
**Audit Directive**: Read-only discovery. **Document everything. Fix nothing.**

---

## 1. Executive Summary

A comprehensive security, secrets, and configuration audit was conducted across the entire **SmritiSaathi** repository. The application is designed as an AI-assisted cognitive care companion for dementia patients, family caregivers, and clinical practitioners. Due to the sensitive nature of dementia patient health information, cognitive session logs, family voice notes, and clinical telemetry, security and configuration hygiene are paramount.

### Key Audit Findings Overview
- **Exposed Database Credentials in Source Code**: High-risk hardcoded database credentials (`mysql+pymysql://root:root123@localhost:3306/sih_cognitive`) exist in the Python backend (`SIH-Backend/database/database.py`, `check_features.py`, and documentation).
- **Publicly Committed Firebase Applet Configuration**: `firebase-applet-config.json` is committed directly to the repository and bundled into client bundles, exposing Google Cloud Project ID (`parabolic-pattern-pq7jp`), Firebase API key, OAuth Client ID, and custom Firestore Database ID.
- **Critical Unprotected Firestore Security Rules**: `firestore.rules` enforces `allow read, write: if true;` globally across all collections with zero authentication, zero role-based access controls, and zero schema validation, leaving all patient medical profiles, reminders, notes, and observations completely open to public read, write, and deletion.
- **Unencrypted Patient PII & Health Data in Browser `localStorage`**: 7 distinct feature subsystems store dementia patient nicknames, family relations, memory oral histories, transcripts, and cognitive session scores directly in client-side `localStorage` without encryption or access expiration.
- **Dual Lockfile & Repository Hygiene Risks**: Committed Python bytecode artifacts (`__pycache__` and `.pyc` across 6 directories), leftover scratch files (`build-game.js.bak`, `script.ts`), and dual package managers (`bun.lock` alongside `package-lock.json`).
- **Server-Side Request Forgery (SSRF) Vector in Image Configuration**: `next.config.ts` configures `images.remotePatterns` with a wildcard hostname (`**`), allowing arbitrary remote URL fetching through Next.js image optimization routes.
- **Decoupled Backend Architecture**: The Python ML service (`SIH-Backend`) runs on a hardcoded `http://127.0.0.1:8000` assuming a local MySQL daemon on port 3306, but is completely uncoupled and unreachable from the Next.js frontend running in the sandboxed Cloud Run / Vercel container.

---

## 2. Risk Matrix & Vulnerability Classification

| Finding ID | Vulnerability / Issue | Scope | Risk Level | Remediable in Next Phase |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Hardcoded MySQL root credentials in Python backend | `SIH-Backend` | **CRITICAL** | Yes (Env migration) |
| **SEC-02** | Wide-open Firestore rules (`allow read, write: if true`) | Database | **CRITICAL** | Yes (Rules deployment) |
| **SEC-03** | Public exposure of Firebase Config & OAuth Client ID | Client bundle | **HIGH** | Yes (Config refactor) |
| **SEC-04** | Unencrypted dementia patient PII & transcripts in `localStorage` | Client storage | **HIGH** | Yes (Storage architecture) |
| **SEC-05** | Wildcard hostname (`**`) in Next.js Image optimization | `next.config.ts` | **HIGH** | Yes (Domain whitelist) |
| **SEC-06** | Localhost & fixed port hardcoding (`127.0.0.1:8000`, `:3306`) | Python / Config | **HIGH** | Yes (Env migration) |
| **SEC-07** | Committed Python bytecode (`__pycache__`, `.pyc`) & backup scripts | Repository | **MEDIUM** | Yes (Git hygiene) |
| **SEC-08** | Inconsistent lockfiles (`bun.lock` vs `package-lock.json`) | Dependencies | **MEDIUM** | Yes (Standardize on npm) |
| **SEC-09** | Missing security response headers (CSP, HSTS, X-Frame) | Next.js config | **MEDIUM** | Yes (HTTP headers) |
| **SEC-10** | Dual ESLint configs (`.eslintrc.json`, `eslint.config.mjs`, `.eslintignore`) | Tooling | **LOW** | Yes (Clean ESLint 9) |

---

## 3. Comprehensive Secret Discovery & Inventory

A repository-wide pattern scan was executed targeting API keys, tokens, database connection URIs, private keys, passwords, and service account artifacts.

| # | File Path | Line(s) | Detected Secret / Credential | Type | Exposure Status | Risk Level | Mitigation Recommendation |
| :- | :--- | :- | :--- | :--- | :--- | :- | :--- |
| 1 | `SIH-Backend/database/database.py` | 4 | `mysql+pymysql://root:root123@localhost:3306/sih_cognitive` | Database URI w/ plaintext password (`root123`) | **Exposed in code** | **CRITICAL** | Extract to `DATABASE_URL` env variable; sanitize defaults. |
| 2 | `SIH-Backend/check_features.py` | 11 | `mysql+pymysql://root:root123@localhost:3306/sih_cognitive` | Database URI w/ plaintext password (`root123`) | **Exposed in code** | **CRITICAL** | Extract to `DATABASE_URL` env variable; remove redundant script. |
| 3 | `SIH-Backend/Backend + ML.md` | 394, 401 | `mysql+pymysql://root:root123@localhost:3306/sih_cognitive` | Documentation credential leak | **Exposed in markdown** | **HIGH** | Sanitize markdown to reference `.env` examples. |
| 4 | `firebase-applet-config.json` | 4 | `AIzaSyBCC1C2jzZepsl_iijC5YAdMA8-4y5NddY` | Firebase Web API Key | **Bundled in client** | **HIGH** | Web API key itself is client-facing, but requires Firestore rules lockdown + HTTP referrer restrictions in GCP Console. |
| 5 | `firebase-applet-config.json` | 9 | `541285952957-e1bpoke2hi7vtk07lrt0t50eee3qq9c8.apps.googleusercontent.com` | Google OAuth Client ID | **Bundled in client** | **MEDIUM** | Restrict authorized JavaScript origins and redirect URIs in Google Cloud Console. |
| 6 | `firebase-applet-config.json` | 2, 7 | Project: `parabolic-pattern-pq7jp`, Bucket: `parabolic-pattern-pq7jp.firebasestorage.app` | Cloud Resource Identifiers | **Committed in repo** | **MEDIUM** | Migrate to environment variables (`NEXT_PUBLIC_FIREBASE_*`) to support multi-environment deployments. |
| 7 | `lib/config.ts` | 26 | `process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'` | Template placeholder comparison | **Code reference** | **LOW** | Clean check to rely strictly on truthy check of server-side `GEMINI_API_KEY`. |
| 8 | `.env.example` | 1 | `GEMINI_API_KEY=` | Environment variable declaration | Declared, empty | **SAFE** | Document server-side only lifecycle. |

---

## 4. Firebase & Firestore Security Audit

### 4.1 Configuration Ingestion Model
- **Current State**: `lib/firebase.ts` imports directly from `firebase-applet-config.json`:
  ```typescript
  import firebaseConfig from '@/firebase-applet-config.json';
  ```
- **Evaluation**: The configuration is statically compiled into the client bundle. Because Next.js bundles client components that import `lib/firebase.ts` (e.g., `services/context/shared-data-context.tsx` via `services/firestore/*`), these project IDs, app IDs, and API keys are completely transparent to browser visitors.
- **Environment Agnosticism**: Currently zero environment variables are used for Firebase. Deploying to a staging project or alternate production project requires modifying committed source files rather than changing environment configuration.

### 4.2 Security Rules Posture (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- **Severity**: **CRITICAL**.
- **Impact**: Any anonymous client can execute queries against:
  - `/patients/{id}`: Patient name, diagnosis, cognitive stage, home location, primary caregiver contacts, attending physician.
  - `/memories/{id}`: Private family moments, childhood stories, emotional tags, family notes.
  - `/narrations/{id}`: Audio transcripts and oral recordings.
  - `/reminders/{id}`: Medical prescriptions, dosages, adherence logs.
  - `/activities/{id}`: Cognitive performance scores and session timing.
  - `/caregivers/{id}`: Personal email, phone numbers, associated patient IDs.
  - `/practitioners/{id}`: Physician details, hospital credentials, clinical notes.
  - `/observations/{id}`: Clinical behavioral observations and severity flags.
  - `/loveNotes/{id}`: Personal family letters and emotional voice notes.
  - `/alerts/{id}`: Emergency notifications and safety beacon history.
- **Data Integrity**: An unauthorized actor can issue batch `deleteDoc` calls to permanently wipe all collections or tamper with medication dosages.

### 4.3 Schema Blueprint Discrepancies (`firebase-blueprint.json`)
The repository contains `firebase-blueprint.json` defining 10 formal entities. However:
- Firestore security rules do NOT enforce the required fields, data types, or enum bounds specified in `firebase-blueprint.json`.
- There is currently no backend validation middleware between the client and Firestore.

---

## 5. Gemini AI Configuration Audit

### 5.1 API Key Handling & Server-Side Isolation
- **Package Status**: `@google/genai` (^2.4.0) is installed in `package.json`.
- **Key Source**: Declared as `GEMINI_API_KEY` in `.env.example`.
- **Key Guard**: `AGENT_CONTEXT.md`, `ARCHITECTURE.md`, and `docs/API_CONTRACTS.md` explicitly enforce:
  > "All Gemini interactions MUST remain server-side using process.env.GEMINI_API_KEY. Never prefix with NEXT_PUBLIC_."
- **Current Client Bundles**: Zero instances of `NEXT_PUBLIC_GEMINI_API_KEY` were detected. Client components do not import `@google/genai`.
- **Scaffolding State**: `services/gemini/index.ts` currently provides an interface contract and stub implementation. No active production calls to Gemini models are executing in client code paths.
- **Planned Endpoint**: `docs/API_CONTRACTS.md` documents `POST /api/companion/chat`. However, `app/api/companion/chat/route.ts` does NOT yet exist.
- **Model Configuration**: When implementing the route, the system must utilize `gemini-2.5-flash` or `gemini-2.5-pro` using the `@google/genai` SDK with strict timeout handling (max 15s) and fallback responses for cognitive reassurance.

---

## 6. Local & Environment Assumptions

The codebase contains several assumptions that break when moving outside a localized laptop environment:

### 6.1 Hardcoded Network Endpoints & Ports
| Context | File | Hardcoded Value | Issue / Failure Scenario |
| :--- | :--- | :--- | :--- |
| **Frontend Base URL** | `lib/config.ts:22` | `http://localhost:3000` | Fallback breaks in production if `APP_URL` or `VERCEL_URL` is omitted. |
| **Python Backend URL** | `SIH-Backend/controlled_test.py:4` | `http://127.0.0.1:8000` | Assumes standalone local uvicorn process. |
| **Python Test Script** | `SIH-Backend/test_data.py:5` | `http://127.0.0.1:8000` | Assumes standalone local uvicorn process. |
| **MySQL Daemon Host** | `SIH-Backend/database/database.py:4` | `localhost:3306` | Assumes local MySQL server running with root privileges. In container/cloud, MySQL is not co-located without Cloud SQL or dedicated socket. |
| **Feature Check Script** | `SIH-Backend/check_features.py:11` | `localhost:3306` | Duplicate local MySQL assumption. |

### 6.2 Python Virtual Environment & OS Assumptions
- `SIH-Backend/Backend + ML.md` lines 417–421 provide Windows-specific setup instructions (`.venv\Scripts\activate`) which fail on POSIX / Linux container environments.
- The Python backend requires external binary libraries (`xgboost`, `pandas`, `pymysql`, `sqlalchemy`) that are not packaged in the root `package.json` container.

---

## 7. Storage & Persistence Layer Audit

| Persistence Layer | Location / Consumer | Data Elements Stored | Classification | Encryption at Rest | Sync Model | Data Loss / Cache Clear Impact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Firestore Cloud DB** | `services/firestore/*` | Patient profiles, reminders, memories, clinical observations, caregiver notes, alerts | Sensitive Medical / PII | Google-managed (AES-256) | Real-time `onSnapshot` listeners with optimistic seed fallback | Persistent in cloud across devices |
| **`localStorage`** | `features/memories/services/story-service.ts` (`smritisaathi_narrated_stories`) | Generated oral history memoirs, patient transcripts, emotional tags, family quotes | Sensitive Personal / PII | **None (Plaintext)** | Local only; not synchronized with Firestore | Cleared on browser cache reset |
| **`localStorage`** | `features/memory-trail/repositories/LocalStorageProgressRepository.ts` | Cognitive session accuracy, completion time, score, timestamps | Cognitive Telemetry | **None (Plaintext)** | Local only; independent repository | Progress lost on browser reset |
| **`localStorage`** | `features/memory-trail/repositories/LocalStorageMemoryRepository.ts` | Custom photo keepsakes, family descriptions, memory titles | Personal Keepsakes | **None (Plaintext)** | Local only; duplicates Firestore `memories` | Local records desynced from cloud |
| **`localStorage`** | `features/quick-pick-trail/services/quickPickStorageService.ts` | Game level progress, unlocked characters, game settings | Game Telemetry | **None (Plaintext)** | Local only | Game progress reset |
| **`localStorage`** | `features/patient-i18n/context/patient-language-provider.tsx` | Selected language (`en`, `hi`, `as`, `mni`) | User Preference | None | Local only | Reverts to default English |
| **`localStorage`** | `features/music/services/music-preferences-storage.ts` | Music volume, mute state, track selection | User Preference | None | Local only | Reverts to default audio preferences |
| **`localStorage`** | `hooks/use-onboarding.ts` | Persona onboarding flags, patient nicknames, joy triggers, caregiver relations, clinician specialty | User Identity / Clinical Setup | **None (Plaintext)** | Local only | Triggers re-onboarding intercept |

### Persistence Layer Observations:
1. **Split-Brain Asymmetry**: Patient actions completed in `memory-trail` or `story-service` write only to `localStorage`, while the Caregiver and Practitioner dashboards monitor Firestore. This results in caregiver/practitioner dashboards not reflecting games played in `memory-trail` unless integrated via `SharedDataProvider`.
2. **Device Sharing Vulnerabilities**: Multiple family members or clinic staff using a single tablet could expose confidential patient narratives and family relationships through accessible DevTools or malicious extensions inspecting `localStorage`.

---

## 8. Git & Repository Hygiene Audit

### 8.1 Committed Artifacts & Cache Files
- **Committed Python Bytecode**: The following compiled `.pyc` files are tracked in the repository tree:
  - `SIH-Backend/__pycache__/main.cpython-311.pyc`
  - `SIH-Backend/database/__pycache__/database.cpython-311.pyc`
  - `SIH-Backend/models/__pycache__/patient.cpython-311.pyc`
  - `SIH-Backend/models/__pycache__/session.cpython-311.pyc`
  - `SIH-Backend/schemas/__pycache__/patient.cpython-311.pyc`
  - `SIH-Backend/schemas/__pycache__/session.cpython-311.pyc`
  - `SIH-Backend/ml/__pycache__/feature_engineering.cpython-311.pyc`
  - `SIH-Backend/ml/__pycache__/predictor.cpython-311.pyc`
  - `SIH-Backend/routes/__pycache__/patients.cpython-311.pyc`
  - `SIH-Backend/routes/__pycache__/prediction.cpython-311.pyc`
  - `SIH-Backend/routes/__pycache__/sessions.cpython-311.pyc`
  - `SIH-Backend/services/__pycache__/ml_service.cpython-311.pyc`
- **Committed Backup Files**:
  - `build-game.js.bak` (39 KB backup script in root).
  - `script.ts` (39 B scratch thinking space).
- **Dual Lockfile Conflict**:
  - `package-lock.json` (305 KB) and `bun.lock` (267 KB) both exist in root, causing non-deterministic package resolution depending on the CI/CD runner.

### 8.2 Missing Patterns in `.gitignore`
The existing `.gitignore` omits:
- Python bytecode: `__pycache__/`, `*.py[cod]`, `*$py.class`
- Python environments: `.venv/`, `env/`, `venv/`, `ENV/`
- Backup files: `*.bak`, `*.backup`
- Database artifacts: `*.sqlite3`, `*.db`
- Secret files: `*.pem`, `*.key`, `serviceAccountKey*.json`

### 8.3 ESLint Configuration Inconsistency
- Three overlapping lint configuration files exist simultaneously:
  - `eslint.config.mjs` (ESLint 9 flat config)
  - `.eslintrc.json` (Legacy ESLint 8 format)
  - `.eslintignore` (Deprecated in ESLint 9; triggers build-time warnings)

---

## 9. Attack Surface & Vulnerability Analysis

### 9.1 Wildcard Remote Patterns in `next.config.ts`
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
},
```
- **Vulnerability**: Server-Side Request Forgery (SSRF) and Cache Amplification / DoS.
- **Risk**: An attacker can request `/_next/image?url=https://internal-service/sensitive-data&w=640&q=75`, forcing the Next.js server to fetch internal resources or unbounded external endpoints.
- **Mitigation**: Constrain `remotePatterns` to trusted hostnames:
  - `images.unsplash.com`
  - `lh3.googleusercontent.com`
  - `commons.wikimedia.org`
  - `firebasestorage.googleapis.com`

### 9.2 Missing HTTP Security Headers
The application currently emits default Next.js HTTP headers. Recommended headers to implement:
- `Content-Security-Policy` (CSP)
- `X-Frame-Options: SAMEORIGIN` (or platform frame ancestor rules)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: microphone=(self), camera=(), geolocation=()`

---

## 10. Actionable Roadmap for Phase v1.0.2 (Environment Migration)

| Step | Action Item | Target File(s) | Priority |
| :- | :--- | :--- | :--- |
| **1** | **Migrate Database Credentials to Environment Variables** | `SIH-Backend/database/database.py` | P0 |
| **2** | **Deploy Granular Firestore Security Rules** | `firestore.rules` | P0 |
| **3** | **Refactor Firebase Configuration to Support Environment Variables** | `lib/firebase.ts`, `.env.example` | P1 |
| **4** | **Clean Git Artifacts & Update `.gitignore`** | `.gitignore`, `SIH-Backend/**/__pycache__`, `*.bak` | P1 |
| **5** | **Secure Next.js Image Remote Patterns** | `next.config.ts` | P1 |
| **6** | **Implement Server-Side API Route for Gemini AI Companion** | `app/api/companion/chat/route.ts` | P1 |
| **7** | **Standardize Dependencies on `package-lock.json`** | Remove redundant `bun.lock` | P2 |
| **8** | **Harmonize ESLint to Flat Config Only** | Remove `.eslintrc.json`, `.eslintignore` | P2 |
| **9** | **Bridge LocalStorage Data to Cloud Persistence** | Feature services to `SharedDataProvider` | P2 |

---

*End of Security, Secrets & Configuration Audit Report (v1.0.1)*
