/**
 * Lingo Chaps — Video Translation Assessment Logger
 *
 * IMPORTANT: Attach this script TO your results Google Sheet (recommended).
 *
 * SETUP:
 * 1. Open your results sheet:
 *    https://docs.google.com/spreadsheets/d/1TQt9MRKVAfGtR1h70dQqTfmbn8V4S1zArM_GOWN63xI/edit
 * 2. Extensions → Apps Script
 * 3. Delete ALL existing code in the editor, paste this entire file, Save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the new Web App URL
 * 6. Paste it into video_assessment.html → GOOGLE_SCRIPT_URL
 * 7. Push the HTML change to GitHub Pages (or update the URL in the live file)
 *
 * NOTE: After changing script code you MUST create a "New deployment"
 * (Deploy → Manage deployments → Edit → New version → Deploy).
 * Updating the code alone does NOT update the live Web App URL behavior.
 */

// Used only when this script is deployed as a standalone project (not sheet-bound).
var SPREADSHEET_ID = '1TQt9MRKVAfGtR1h70dQqTfmbn8V4S1zArM_GOWN63xI';

var SUMMARY_SHEET = 'Submissions';
var DETAIL_SHEET = 'Translation Details';

var SUMMARY_HEADERS = [
  'Submitted At',
  'Employee Name',
  'Difficulty Level',
  'Time Taken',
  'Auto Score',
  'OST Answer (Row 1)',
  'Notes Answer (Row 1)'
];

var DETAIL_HEADERS = [
  'Submitted At',
  'Employee Name',
  'Timestamp',
  'OST',
  'Notes'
];

function doGet() {
  return ContentService.createTextOutput('Video Assessment Logger is running.');
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST body received.');
    }

    var data = JSON.parse(e.postData.contents);
    writeSubmission_(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSpreadsheet_() {
  // Preferred: script opened from Extensions → Apps Script inside the target sheet.
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      return active;
    }
  } catch (ignore) {}

  if (!SPREADSHEET_ID) {
    throw new Error('SPREADSHEET_ID is not set. Open this script from your Google Sheet via Extensions → Apps Script.');
  }

  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function writeSubmission_(data) {
  var ss = getSpreadsheet_();
  var submittedAt = data.submittedAt ? new Date(data.submittedAt) : new Date();
  var employeeName = data.employeeName || data.name || 'Unknown';

  var summary = getOrCreateSheet_(ss, SUMMARY_SHEET, SUMMARY_HEADERS);
  summary.appendRow([
    submittedAt,
    employeeName,
    data.difficultyLevel || '',
    data.timeTaken || '',
    data.autoScore || '',
    stripHtml_(data.ostAnswer || ''),
    stripHtml_(data.notesAnswer || '')
  ]);

  var detail = getOrCreateSheet_(ss, DETAIL_SHEET, DETAIL_HEADERS);
  var rows = [];

  try {
    rows = JSON.parse(data.translations || '[]');
  } catch (parseErr) {
    rows = [];
  }

  if (!rows.length) {
    detail.appendRow([
      submittedAt,
      employeeName,
      '',
      stripHtml_(data.ostAnswer || ''),
      stripHtml_(data.notesAnswer || '')
    ]);
    return;
  }

  rows.forEach(function(row) {
    detail.appendRow([
      submittedAt,
      employeeName,
      row.timestamp || '',
      stripHtml_(row.ost || ''),
      stripHtml_(row.notes || '')
    ]);
  });
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#4a86e8')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    return sheet;
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function stripHtml_(html) {
  if (!html) {
    return '';
  }

  return String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
