import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXTS_DIR = join(__dirname, '../../texts/douay-rheims');

let cachedData = null;

/**
 * Parse the Douay-Rheims text file
 * Format: "Genesis Chapter 1" headers, verses like "1:1. text..."
 * @returns {Map} - Map of "Book:Chapter:Verse" -> text
 */
function loadData() {
  if (cachedData) return cachedData;

  const filePath = join(TEXTS_DIR, 'douay-rheims.txt');
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  cachedData = new Map();

  let currentBook = null;
  let currentChapter = null;
  let currentVerse = null;
  let currentText = [];

  // Pattern for chapter headers like "Genesis Chapter 1"
  const chapterPattern = /^(\w[\w\s]+?) Chapter (\d+)$/;
  // Pattern for verse starts like "1:1." or "12:34."
  const versePattern = /^(\d+):(\d+)\.\s*(.*)$/;

  function saveCurrentVerse() {
    if (currentBook && currentChapter && currentVerse && currentText.length > 0) {
      const key = `${currentBook}:${currentChapter}:${currentVerse}`;
      const text = currentText.join(' ').trim();
      cachedData.set(key, {
        book: currentBook,
        chapter: currentChapter,
        verse: currentVerse,
        text
      });
    }
    currentText = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for chapter header
    const chapterMatch = trimmed.match(chapterPattern);
    if (chapterMatch) {
      saveCurrentVerse();
      currentBook = chapterMatch[1];
      currentChapter = parseInt(chapterMatch[2], 10);
      currentVerse = null;
      continue;
    }

    // Check for verse start
    const verseMatch = trimmed.match(versePattern);
    if (verseMatch && currentBook) {
      saveCurrentVerse();
      const verseChapter = parseInt(verseMatch[1], 10);
      currentVerse = parseInt(verseMatch[2], 10);
      // Update chapter if verse reference indicates different chapter
      if (verseChapter !== currentChapter) {
        currentChapter = verseChapter;
      }
      currentText = [verseMatch[3]];
      continue;
    }

    // If we're in a verse, check if this is continuation or commentary
    if (currentVerse && trimmed) {
      // Commentary lines typically start with capital and describe things
      // Verse continuations are typically lowercase or continue sentences
      // Skip lines that look like standalone commentary (heuristic)
      if (!trimmed.match(/^[A-Z][a-z]+\.\.\.\./) && !trimmed.match(/^[A-Z][a-z]+ [a-z]+\.\.\.\./)) {
        currentText.push(trimmed);
      }
    }
  }

  // Save last verse
  saveCurrentVerse();

  return cachedData;
}

/**
 * Map canonical book name to Douay-Rheims book name
 */
function getDRBookName(canonical) {
  const mapping = {
    'Genesis': 'Genesis',
    'Exodus': 'Exodus',
    'Leviticus': 'Leviticus',
    'Numbers': 'Numbers',
    'Deuteronomy': 'Deuteronomy',
    'Josue': 'Josue',
    'Judges': 'Judges',
    'Ruth': 'Ruth',
    '1 Samuel': 'First Book Of Samuel',
    '2 Samuel': 'Second Book Of Samuel',
    '1 Kings': 'Third Book Of Kings',
    '2 Kings': 'Fourth Book Of Kings',
    '1 Chronicles': 'First Book Of Paralipomenon',
    '2 Chronicles': 'Second Book Of Paralipomenon',
    'Ezra': 'First Book Of Esdras',
    'Nehemiah': 'Nehemias',
    'Tobias': 'Tobias',
    'Judith': 'Judith',
    'Esther': 'Esther',
    '1 Machabees': 'First Book Of Machabees',
    '2 Machabees': 'Second Book Of Machabees',
    'Job': 'Job',
    'Psalms': 'Psalms',
    'Proverbs': 'Proverbs',
    'Ecclesiastes': 'Ecclesiastes',
    'Canticle of Canticles': 'Canticle Of Canticles',
    'Wisdom': 'Wisdom',
    'Ecclesiasticus': 'Ecclesiasticus',
    'Isaias': 'Isaias',
    'Jeremias': 'Jeremias',
    'Lamentations': 'Lamentations',
    'Baruch': 'Baruch',
    'Ezechiel': 'Ezechiel',
    'Daniel': 'Daniel',
    'Osee': 'Osee',
    'Joel': 'Joel',
    'Amos': 'Amos',
    'Abdias': 'Abdias',
    'Jonas': 'Jonas',
    'Micheas': 'Micheas',
    'Nahum': 'Nahum',
    'Habacuc': 'Habacuc',
    'Sophonias': 'Sophonias',
    'Aggeus': 'Aggeus',
    'Zacharias': 'Zacharias',
    'Malachias': 'Malachias',
  };
  return mapping[canonical] || canonical;
}

/**
 * Lookup verses in Douay-Rheims
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {object|null} verseSpec - { start, end } or null for full chapter
 * @returns {object} - { verses: [], error: null } or { verses: [], error: string }
 */
export function lookup(bookCanonical, chapter, verseSpec) {
  const data = loadData();
  const drBook = getDRBookName(bookCanonical);

  const verses = [];
  let maxVerse = 0;
  let maxChapter = 0;
  let bookFound = false;

  // Find all verses for this book/chapter
  for (const [key, entry] of data) {
    // Normalize book comparison (case insensitive)
    if (entry.book.toLowerCase() === drBook.toLowerCase()) {
      bookFound = true;
      if (entry.chapter > maxChapter) maxChapter = entry.chapter;
      if (entry.chapter === chapter) {
        if (entry.verse > maxVerse) maxVerse = entry.verse;
        verses.push(entry);
      }
    }
  }

  // Check if book exists
  if (!bookFound) {
    return { verses: [], error: `Book "${bookCanonical}" not found in Douay-Rheims.` };
  }

  // Check if chapter exists
  if (verses.length === 0) {
    return { verses: [], error: `${bookCanonical} only has ${maxChapter} chapters.` };
  }

  // Sort by verse number
  verses.sort((a, b) => a.verse - b.verse);

  // Filter by verse spec if provided
  if (verseSpec) {
    const { start, end } = verseSpec;
    if (start > maxVerse) {
      return { verses: [], error: `${bookCanonical} ${chapter} only has ${maxVerse} verses.` };
    }
    const filtered = verses.filter(v => v.verse >= start && v.verse <= end);
    return { verses: filtered, error: null };
  }

  return { verses, error: null };
}

/**
 * Format verses for output
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {Array} verses - Array of verse objects
 * @returns {string} - Formatted output
 */
export function format(bookCanonical, chapter, verses) {
  if (verses.length === 0) return '';

  const lines = verses.map(v => `${chapter}:${v.verse} ${v.text}`);
  return lines.join('\n');
}
