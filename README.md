# Lingo Chaps Assessment Portal

Welcome to the Lingo Chaps Assessment repository! This repository contains the automated testing and evaluation portals for translator candidates.

## 🔗 Live Application Links

You can access the live, deployed versions of the assessments at any time using the links below. (Save these or check back here whenever you need them!)

*   **Main Portal (Client Selection):**
    [https://conversify-india.github.io/lingochaps-assessment/](https://conversify-india.github.io/lingochaps-assessment/)
*   **Video Translation Assessment:**
    [https://conversify-india.github.io/lingochaps-assessment/video_assessment.html](https://conversify-india.github.io/lingochaps-assessment/video_assessment.html)

---

## 📂 Project Structure

Currently, all files are stored in the root of this repository. If you are building out multiple different assessments for different clients, you have two options:

**Option 1: Folders (Recommended)**
Instead of creating entirely new GitHub repositories for every single client, it is much easier to create folders *inside* this repository. For example:
- `/client-a/video_assessment.html`
- `/client-b/translation_test.html`
This keeps everything in one place, and the links would just be: `https://conversify-india.github.io/lingochaps-assessment/client-a/video_assessment.html`

**Option 2: Separate Repositories**
If you strictly want separate repositories for security or organizational reasons, you will need to go to GitHub.com, click the **"+"** icon in the top right, select **"New repository"**, and then we can push specific code to those new repositories!

## ⚙️ Google Sheets Integration
The assessments are connected to a Google Apps Script that securely logs the candidate's Name, Time Taken, Difficulty, and Auto-Score directly to a private Google Sheet.
