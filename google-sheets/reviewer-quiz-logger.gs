/**
 * Lingo Chaps — Reviewer Certification Quiz Logger
 *
 * SETUP INSTRUCTIONS FOR GOOGLE SHEET:
 * 1. Open your target Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1CHoywlaXCXO-o5FkPhwe0Zjl6igw0HRQxrao27fu7GE/edit
 * 2. In Google Sheets, click Extensions → Apps Script.
 * 3. Delete any existing code, paste this entire file, and click Save (floppy disk icon).
 * 4. Click Deploy → New deployment.
 *    - Select type: Web app
 *    - Description: Reviewer Quiz Logger
 *    - Execute as: Me (your email)
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize permissions if prompted, and copy the Web App URL.
 * 6. Replace GOOGLE_SCRIPT_URL in index.html with your new Web App URL.
 */

// Target Spreadsheet ID
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
  return ContentService.createTextOutput("Reviewer Certification Quiz Logger is active and running.");
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST payload received.");
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet_(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.score !== undefined ? data.score : "",
      data.correctCount !== undefined ? data.correctCount : "",
      data.totalQuestions !== undefined ? data.totalQuestions : "",
      data.resultStatus || "",
      data.timeTaken || "",
      data.feedback || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSpreadsheet_() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (ignore) {}

  if (!SPREADSHEET_ID) {
    throw new Error("SPREADSHEET_ID is not configured.");
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getOrCreateSheet_(name) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#4a86e8")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#4a86e8")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

