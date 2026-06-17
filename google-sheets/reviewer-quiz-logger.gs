/**
 * Lingo Chaps — Reviewer Certification Quiz Logger
 *
 * Attach this script to your REVIEWER Google Sheet only.
 *
 * SETUP:
 * 1. Open your Reviewer results sheet:
 *    https://docs.google.com/spreadsheets/d/1hYH-gN4XC9hEwwPyHtG8MFXCnyHShfEr54K9ZcXHLPA/edit
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into index.html → GOOGLE_SCRIPT_URL
 */

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

function doPost(e) {
  try {
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
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}
