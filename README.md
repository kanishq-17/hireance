# Hireance – Candidate Module (Frontend)

This repository contains the **Candidate-side frontend implementation** for Hireance.
All components are built using **React + Vite + Tailwind CSS** and are structured in a
feature-based manner for easy backend integration.

---

## 📁 Folder Overview

### 1. `candidate/`

Contains all **job discovery and job detail related UI**.

#### 📌 Job Pages

candidate/jobs/

├── CompanyHeader.jsx // Company banner header

├── StickyJobHeader.jsx // Appears on scroll (Apply / Save CTA)

├── JobHeader.jsx // Job meta info (salary, industry, type)

├── JobDescription.jsx // About job + responsibilities

├── JobHighlights.jsx // Key highlights

├── JobSkills.jsx // Required skills

├── JobMatchScore.jsx // User–job skill match score

├── CompanyOverview.jsx // About company section

├── CompanyJobs.jsx // More jobs from same company

├── JobCard.jsx // Reusable job card

👉 Backend responsibility:

- Provide job, company, and user-job-match data via APIs
- Frontend only renders received JSON

---

### 2. `modules/apply/`

Contains the **common job application form** used for applying to any job.

#### 📌 Structure

modules/apply/

├── components/

│ ├── Step1PersonalDetails.jsx

│ ├── Step2Education.jsx

│ ├── Step3JobPreferences.jsx

│ ├── Step4ExperienceDeclaration.jsx

│ ├── Stepper.jsx

│ └── ApplyLayout.jsx

├── hooks/

│ └── useApplyForm.js // Form state & submission logic
│

├── utils/

│ └── validation.js // Frontend-only validations
│

└── pages/
└── ApplyFormPage.jsx // Main entry point

#### 🧾 Apply Form Flow

1. Personal Details
2. Educational Qualifications
3. Job Preferences
4. Experience & Declaration

👉 Backend integration point:

- `POST /api/jobs/apply`
- Single payload submitted from `ApplyFormPage.jsx`

Frontend uses **React Hook Form**, backend validation is still expected.

---

### 3. `modules/payment/`

Handles **payment status UI only** (no gateway logic).

#### 📌 Structure

modules/payment/

├── components/

│ ├── PaymentSuccessCard.jsx
│ └── PaymentFailureCard.jsx
│

├── pages/

│ └── PaymentStatusPage.jsx
│

└── utils/
└── PaymentHelper.js

#### 💳 Payment Flow

- Backend sends payment status (`success` / `failed`)
- Frontend renders appropriate card

👉 Backend decides:

- Transaction ID
- Amount
- Timestamp
- Status

---

## 🔗 Backend Integration Notes

- All data keys are in **camelCase**
- Frontend validation exists but **backend validation is mandatory**
- No business logic is hardcoded in UI
- UI components are reusable and API-driven

---

## 🚀 Current Status

- Job detail page ✅
- Multi-step apply form ✅
- Payment success/failure UI ✅
- Ready for backend API integration

---

## 📌 Branch Info

All latest frontend work is available on:

branch: testing
