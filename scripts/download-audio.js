#!/usr/bin/env node
/**
 * Download Douay-Rheims Bible audio files from catholicgallery.org (LibriVox public domain)
 * Saves to site/public/audio/{book}/{chapter}.mp3
 */

import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

// Base URL for audio files
const BASE_URL = 'https://bcdn1.catholicgallery.org/wp-content/uploads/audio/drcb';

// Map our book IDs to catholicgallery.org URL names
const BOOK_URL_MAP = {
  // Pentateuch
  'genesis': 'genesis',
  'exodus': 'exodus',
  'leviticus': 'leviticus',
  'numbers': 'numbers',
  'deuteronomy': 'deuteronomy',

  // Historical Books (Old Testament)
  'josue': 'joshua',
  'judges': 'judges',
  'ruth': 'ruth',
  '1-samuel': '1-samuel',
  '2-samuel': '2-samuel',
  '1-kings': '1-kings',
  '2-kings': '2-kings',
  '1-chronicles': '1-chronicles',
  '2-chronicles': '2-chronicles',
  'ezra': 'ezra',
  'nehemiah': 'nehemiah',
  'tobias': 'tobit',
  'judith': 'judith',
  'esther': 'esther',
  '1-machabees': '1-maccabees',
  '2-machabees': '2-maccabees',

  // Wisdom Books
  'job': 'job',
  'psalms': 'psalms',
  'proverbs': 'proverbs',
  'ecclesiastes': 'ecclesiastes',
  'canticles': 'song-of-songs',
  'wisdom': 'wisdom',
  'ecclesiasticus': 'sirach',

  // Major Prophets
  'isaias': 'isaiah',
  'jeremias': 'jeremiah',
  'lamentations': 'lamentations',
  'baruch': 'baruch',
  'ezechiel': 'ezekiel',
  'daniel': 'daniel',

  // Minor Prophets
  'osee': 'hosea',
  'joel': 'joel',
  'amos': 'amos',
  'abdias': 'obadiah',
  'jonas': 'jonah',
  'micheas': 'micah',
  'nahum': 'nahum',
  'habacuc': 'habakkuk',
  'sophonias': 'zephaniah',
  'aggeus': 'haggai',
  'zacharias': 'zechariah',
  'malachias': 'malachi',

  // New Testament
  'matthew': 'matthew',
  'mark': 'mark',
  'luke': 'luke',
  'john': 'john',
  'acts': 'acts',
  'romans': 'romans',
  '1-corinthians': '1-corinthians',
  '2-corinthians': '2-corinthians',
  'galatians': 'galatians',
  'ephesians': 'ephesians',
  'philippians': 'philippians',
  'colossians': 'colossians',
  '1-thessalonians': '1-thessalonians',
  '2-thessalonians': '2-thessalonians',
  '1-timothy': '1-timothy',
  '2-timothy': '2-timothy',
  'titus': 'titus',
  'philemon': 'philemon',
  'hebrews': 'hebrews',
  'james': 'james',
  '1-peter': '1-peter',
  '2-peter': '2-peter',
  '1-john': '1-john',
  '2-john': '2-john',
  '3-john': '3-john',
  'jude': 'jude',
  'apocalypse': 'revelation',
};

// Load bible.json to get book list and chapter counts
const bibleJsonPath = path.join(process.cwd(), 'site/src/data/bible.json');
const bible = JSON.parse(fs.readFileSync(bibleJsonPath, 'utf-8'));

const OUTPUT_DIR = path.join(process.cwd(), 'site/public/audio');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Download a single file
 */
async function downloadFile(url, destPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // Ensure directory exists
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Stream to file
  const fileStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(response.body), fileStream);
}

/**
 * Build audio URL for a chapter
 */
function getAudioUrl(bookId, chapter, testament) {
  const urlBookName = BOOK_URL_MAP[bookId];
  if (!urlBookName) {
    return null;
  }

  const testamentPath = testament === 'old' ? 'old-testament' : 'new-testament';
  return `${BASE_URL}/${testamentPath}/${urlBookName}/drcb-${urlBookName}-${chapter}.mp3`;
}

/**
 * Download audio for a single book
 */
async function downloadBook(book) {
  const bookDir = path.join(OUTPUT_DIR, book.id);

  if (!BOOK_URL_MAP[book.id]) {
    console.log(`  Skipping ${book.name} - no URL mapping`);
    return { downloaded: 0, skipped: book.chapters.length, failed: 0 };
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 1; i <= book.chapters.length; i++) {
    const destPath = path.join(bookDir, `${i}.mp3`);

    // Skip if already downloaded
    if (fs.existsSync(destPath)) {
      skipped++;
      continue;
    }

    const url = getAudioUrl(book.id, i, book.testament);

    try {
      await downloadFile(url, destPath);
      downloaded++;
      process.stdout.write(`\r  ${book.name}: ${downloaded + skipped}/${book.chapters.length}`);
    } catch (err) {
      failed++;
      console.error(`\n  Failed: ${book.id}/${i}.mp3 - ${err.message}`);
    }

    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\r  ${book.name}: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`);
  return { downloaded, skipped, failed };
}

/**
 * Main download process
 */
async function main() {
  console.log('Downloading Douay-Rheims Bible audio files...\n');
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const book of bible.books) {
    const { downloaded, skipped, failed } = await downloadBook(book);
    totalDownloaded += downloaded;
    totalSkipped += skipped;
    totalFailed += failed;
  }

  console.log('\n--- Summary ---');
  console.log(`Downloaded: ${totalDownloaded}`);
  console.log(`Skipped (already exist): ${totalSkipped}`);
  console.log(`Failed: ${totalFailed}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
