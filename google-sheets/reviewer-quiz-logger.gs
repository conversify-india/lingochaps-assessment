/**
 * Lingo Chaps — Reviewer Certification Quiz Logger
 * @OnlyCurrentDoc
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1CHoywlaXCXO-o5FkPhwe0Zjl6igw0HRQxrao27fu7GE/edit
 * 2. Click Extensions → Apps Script.
 * 3. Delete any existing code, paste this ENTIRE file, and click Save (💾).
 * 4. IMPORTANT:
 *    Click Deploy → Manage deployments → Edit (pencil icon) → Version: "New version" → Deploy.
 *    (OR click Deploy → New deployment → Web app → Execute as: Me → Access: Anyone → Deploy).
 * 5. Copy the Web App URL into index.html for GOOGLE_SCRIPT_URL.
 */

var SPREADSHEET_ID = "1CHoywlaXCXO-o5FkPhwe0Zjl6igw0HRQxrao27fu7GE";
var SHEET_NAME = "Reviewer Quiz Logs";
var HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Score (%)",
  "Correct",
  "Total",
  "Result",
  "Time Taken",
  "Feedback"
];

function doGet(e) {
  return ContentService
    .createTextOutput("Reviewer Certification Quiz Logger is active and ready to receive submissions.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var rawContents = "";
    if (e && e.postData && e.postData.contents) {
      rawContents = e.postData.contents;
    } else if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      rawContents = JSON.stringify(e.parameter);
    }

    var data = {};
    if (rawContents) {
      try {
        data = JSON.parse(rawContents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var sheet = getTargetSheet_();
    var submittedAt = new Date();

    sheet.appendRow([
      submittedAt,
      data.name || data.userName || "",
      data.email || data.userEmail || "",
      data.score !== undefined ? data.score : "",
      data.correctCount !== undefined ? data.correctCount : "",
      data.totalQuestions !== undefined ? data.totalQuestions : 11,
      data.resultStatus || "",
      data.timeTaken || "",
      data.feedback || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", success: false, message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getTargetSheet_() {
  var ss = null;

  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e1) {}

  if (!ss && SPREADSHEET_ID) {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e2) {}
  }

  if (!ss) {
    throw new Error("Unable to access spreadsheet. Ensure this script is opened via Extensions -> Apps Script inside the Google Sheet.");
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#10b981")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#10b981")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  return sheet;
}


