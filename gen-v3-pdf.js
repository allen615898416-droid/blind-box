const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 45, bottom: 45, left: 50, right: 50 }
});

const out = fs.createWriteStream('/Users/allenzqwei/WorkBuddy/2026-06-13-02-33-08/lovart-revision-brief-v3.pdf');
doc.pipe(out);

const W = doc.page.width - 100;

const C = {
  title: '#2D2016', sub: '#5C4A3A', accent: '#D4618C', red: '#C0392B',
  orange: '#E67E22', green: '#27AE60', gray: '#7F8C8D', bg: '#FFF8F0',
  line: '#E8DDD0', cellBg: '#F5EFE8', headerBg: '#F0E8DD'
};

function hr() {
  doc.moveDown(0.5);
  doc.strokeColor(C.line).lineWidth(1).moveTo(50, doc.y).lineTo(50 + W, doc.y).stroke();
  doc.moveDown(0.5);
}

function ensureSpace(px) {
  if (doc.y + px > 790) doc.addPage();
}

function title(t) {
  ensureSpace(30);
  doc.fontSize(17).font('Helvetica-Bold').fillColor(C.title).text(t);
  doc.moveDown(0.25);
}

function subtitle(t) {
  ensureSpace(20);
  doc.fontSize(11).font('Helvetica-Bold').fillColor(C.sub).text(t);
  doc.moveDown(0.15);
}

function body(t) {
  doc.fontSize(9.5).font('Helvetica').fillColor(C.sub).text(t, { lineGap: 2.5 });
  doc.moveDown(0.1);
}

function indented(t) {
  doc.fontSize(9.5).font('Helvetica').fillColor(C.sub).text(t, { lineGap: 2.5, indent: 18 });
}

function bulletRed(t) {
  ensureSpace(18);
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.red).text('● ', { continued: true });
  doc.font('Helvetica').fillColor(C.sub).text(t, { lineGap: 2.5 });
}

function bulletOrange(t) {
  ensureSpace(18);
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.orange).text('● ', { continued: true });
  doc.font('Helvetica').fillColor(C.sub).text(t, { lineGap: 2.5 });
}

function numItem(n, t) {
  ensureSpace(18);
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.accent).text(n + '. ', { continued: true });
  doc.font('Helvetica').fillColor(C.sub).text(t, { lineGap: 2.5 });
}

function simpleTable(headers, rows, colRatios) {
  const cols = colRatios.map(r => r * W);
  const startX = 55;
  const rowPad = 5;

  // Header
  ensureSpace(25);
  let y = doc.y;
  doc.rect(startX, y, W - 10, 20).fill(C.headerBg);
  let x = startX + 5;
  for (let i = 0; i < headers.length; i++) {
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(C.title).text(headers[i], x, y + rowPad, { width: cols[i] - 10 });
    x += cols[i];
  }
  doc.y = y + 20;

  // Rows
  rows.forEach((row, ri) => {
    ensureSpace(22);
    let yy = doc.y;
    if (ri % 2 === 1) {
      doc.rect(startX, yy, W - 10, 20).fill(C.cellBg);
    }
    let xx = startX + 5;
    for (let i = 0; i < row.length; i++) {
      doc.fontSize(8.5).font('Helvetica').fillColor(C.sub).text(row[i], xx, yy + rowPad, { width: cols[i] - 10 });
      xx += cols[i];
    }
    doc.y = yy + 20;
  });
}

// ===== CONTENT =====

// Header band
doc.rect(0, 0, doc.page.width, 75).fill(C.bg);
doc.fontSize(22).font('Helvetica-Bold').fillColor(C.accent).text('ShakeSecret', 50, 22, { continued: true });
doc.fontSize(14).font('Helvetica').fillColor(C.sub).text('  Lovart v3 Revision Brief');
doc.fontSize(8.5).font('Helvetica').fillColor(C.gray).text('Canvas: 750×1334px portrait @2x  |  Style: keep cream + Pop Mart ugly-cute  |  Only list what MUST change', 50, 55);

doc.y = 88;

// GLOBAL
title('Global Constraints');
simpleTable(
  ['Dimension', 'Rule'],
  [
    ['Canvas', '750 × 1334 px, portrait, @2x'],
    ['Safe area', 'Top 44pt (status bar) + Bottom 34pt (Home Indicator)'],
    ['Boxes (P3)', '3 boxes MUST be IDENTICAL — same color, pattern, "?"'],
    ['Rarity', 'No tiers for regulars. Show character NAME. Only Regular vs Hidden'],
    ['Shake count', 'Plain number: x7. NO heart/star shapes'],
  ],
  [0.22, 0.78]
);

hr();

// P1
title('Page 1 — Home');
doc.fontSize(12).font('Helvetica-Bold').fillColor(C.green).text('✅ APPROVED — No changes needed');
doc.moveDown(0.3);

hr();

// P2
title('Page 2 — Collection Wall');
subtitle('Must Add:');
numItem(1, 'Series switch tabs — 5 scrollable tabs above grid, current tab highlighted + underline');
doc.moveDown(0.1);
numItem(2, 'Series name row + preview icon');
indented('✦ COZY FRIENDS ✦            [👁]');
indented('Snuggly buddies...');
indented('Eye icon at FAR RIGHT of series name. Tap → floating modal with full lineup.');
doc.moveDown(0.1);

hr();

// P3
title('Page 3 — Game (Most Changes)');

subtitle('🔴 MUST DELETE:');
bulletRed('"HIDDEN EDITION!" label on center box — this REVEALS which is hidden. Delete entirely.');
doc.moveDown(0.15);

subtitle('🔴 MUST ADD:');
numItem(1, 'Target area at page TOP:');
indented('find:  [silhouette ?]  (0/1)');
indented('Normal: 1 target — character silhouette + "?" + counter (0/1)');
indented('Hidden triggered: 2 targets side by side → [regular ?]  [⭐ hidden ?]');
indented('Differentiate with SILHOUETTE only. NO large "HIDDEN EDITION" text.');
doc.moveDown(0.1);
numItem(2, 'Series switch tabs (same as Page 2)');
doc.moveDown(0.15);

subtitle('🟡 ADJUST:');
numItem(3, '"Your pick" → Use BUTTON TEXT instead of extra visual elements');
indented('Change CONFIRM button text to "Pick it". No tags, no icons, no extra labels needed.');
doc.moveDown(0.1);
numItem(4, '3 boxes must look COMPLETELY IDENTICAL');
indented('Same color, same pattern, same "?". Only difference: center = larger, sides = smaller + 0.65 opacity.');
indented('NO color difference. NO decoration difference. NO rarity hints of any kind.');

hr();

// P4
title('Page 4 — Result');

subtitle('🔴 MUST FIX:');
bulletRed('Character/box art quality — current version looks like flat sticker paste. Must match Page 1 quality.');
indented('Character pose: dynamic (jumping out), not pasted on');
indented('Box opening: light rays + confetti fragments + depth');
doc.moveDown(0.15);

subtitle('🟡 ADJUST:');
numItem(1, 'Button text changes by scenario:');
indented('New character → "Continue"');
indented('Duplicate → "Play Again"');
indented('Hit target → "Go to Collection"');

hr();

// SUMMARY TABLE
title('Summary: v2 → v3 Changes');
simpleTable(
  ['Page', 'Problem in v2', 'v3 Fix'],
  [
    ['P2', 'No series tabs', 'Add 5 scrollable tabs above grid'],
    ['P2', 'No series name/preview row', 'Add ✦SERIES✦ + [👁] at far right'],
    ['P3', '"HIDDEN EDITION!" exposes hidden', 'DELETE — boxes must be identical'],
    ['P3', 'No target area', 'Add "find: [silhouette?] (0/1)" at top'],
    ['P3', '"Your pick" visual tag over-designed', 'Just use "Pick it" button text'],
    ['P3', 'Boxes look different from each other', 'ALL IDENTICAL — only size differs'],
    ['P4', 'Sticker-paste art quality', 'Match P1: dynamic pose + light + fragments'],
    ['P4', 'Single "Collect" button', 'Text varies: Continue / Play Again / Go to Collection'],
    ['ALL', 'Canvas ~3:4 (near square)', '750 × 1334 px portrait @2x'],
  ],
  [0.12, 0.40, 0.48]
);

doc.moveDown(1.5);
doc.fontSize(7.5).fillColor(C.gray).text('v3 brief — only changes listed. Styles/pages not mentioned = keep as-is from v2 output.', { align: 'center' });

doc.end();

out.on('finish', () => {
  const stats = fs.statSync('/Users/allenzqwei/WorkBuddy/2026-06-13-02-33-08/lovart-revision-brief-v3.pdf');
  console.log('PDF OK —', Math.round(stats.size / 1024) + 'KB');
});
