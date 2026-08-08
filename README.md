# Lingo Chaps Assessment Portal

Welcome to the Lingo Chaps Assessment repository! This repository contains the automated testing and evaluation portals for translator and reviewer candidates.

## 🔗 Live Application Links

You can access the live, deployed versions of the assessments using the links below:

*   **Reviewer Certification Portal (Main Portal):**
    [https://conversify-india.github.io/lingochaps-hindi-assessment/](https://conversify-india.github.io/lingochaps-hindi-assessment/)
*   **Video Translation Assessment:**
    [https://conversify-india.github.io/lingochaps-hindi-assessment/video_assessment.html](https://conversify-india.github.io/lingochaps-hindi-assessment/video_assessment.html)

## 📊 Google Sheets Results

*   **Reviewer Quiz Results Sheet:**
    [Reviewer Quiz Results](https://docs.google.com/spreadsheets/d/1CHoywlaXCXO-o5FkPhwe0Zjl6igw0HRQxrao27fu7GE/edit)
*   **Video Assessment Results Sheet:**
    [Video Assessment Results](https://docs.google.com/spreadsheets/d/1TQt9MRKVAfGtR1h70dQqTfmbn8V4S1zArM_GOWN63xI/edit)

---

## 🛠️ Google Apps Script Linking Guide

If test submission data does not appear in your Google Sheet:

### For Reviewer Quiz (`index.html`):
1. Open the [Reviewer Quiz Results Sheet](https://docs.google.com/spreadsheets/d/1CHoywlaXCXO-o5FkPhwe0Zjl6igw0HRQxrao27fu7GE/edit).
2. Go to **Extensions → Apps Script**.
3. Delete all existing code and paste the full contents of `google-sheets/reviewer-quiz-logger.gs`.
4. Click **Save** (💾).
5. Click **Deploy → New deployment**.
   - Select **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize permissions, and copy the generated **Web App URL**.
7. In `index.html`, set `const GOOGLE_SCRIPT_URL = "YOUR_NEW_WEB_APP_URL";`.
8. Commit and push your changes to GitHub.

---

### For Video Assessment (`video_assessment.html`):
1. Open the [Video Assessment Results Sheet](https://docs.google.com/spreadsheets/d/1TQt9MRKVAfGtR1h70dQqTfmbn8V4S1zArM_GOWN63xI/edit).
2. Go to **Extensions → Apps Script**.
3. Delete all existing code and paste the full contents of `google-sheets/video-assessment-logger.gs`.
4. Click **Save** (💾).
5. Click **Deploy → New deployment** (or **Manage deployments → Edit → New version**).
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web App URL**.
7. In `video_assessment.html`, update `GOOGLE_SCRIPT_URL` with your new Web App URL.
8. Commit and push your changes to GitHub.

