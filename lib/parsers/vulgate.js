import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXTS_DIR = join(__dirname, '../../texts/vulgate');

let cachedData = null;

/**
 * Load and parse the Vulgate TSV file
 * @returns {Map} - Map of "Book:Chapter:Verse" -> text
 */
function loadData() {
  if (cachedData) return cachedData;

  const filePath = join(TEXTS_DIR, 'vulgate.tsv');
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  cachedData = new Map();

  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 6) {
      // Format: BookName | Abbrev | BookNum | Chapter | Verse | Text
      const [bookName, abbrev, bookNum, chapter, verse, ...textParts] = parts;
      const text = textParts.join('\t').replace(/\r/g, ''); // Remove Windows line endings
      const key = `${bookName}:${chapter}:${verse}`;
      cachedData.set(key, { bookName, abbrev, chapter: parseInt(chapter, 10), verse: parseInt(verse, 10), text });
    }
  }

  return cachedData;
}

/**
 * Get the Vulgate book name from canonical name
 * @param {string} canonical - Canonical book name
 * @returns {string} - Vulgate book name
 */
function getVulgateBookName(canonical) {
  // Map canonical names (Douay-Rheims style) to Vulgate TSV book names (modern style)
  const mapping = {
    'Genesis': 'Genesis',
    'Exodus': 'Exodus',
    'Leviticus': 'Leviticus',
    'Numbers': 'Numbers',
    'Deuteronomy': 'Deuteronomy',
    'Josue': 'Joshua',
    'Judges': 'Judges',
    'Ruth': 'Ruth',
    '1 Samuel': '1 Samuel',
    '2 Samuel': '2 Samuel',
    '1 Kings': '1 Kings',
    '2 Kings': '2 King', // Note: file has typo "2 King" not "2 Kings"
    '1 Chronicles': '1 Chronicles',
    '2 Chronicles': '2 Chronicles',
    'Ezra': 'Ezra',
    'Nehemiah': 'Nehemiah',
    'Tobias': 'Tobit',
    'Judith': 'Judith',
    'Esther': 'Esther',
    '1 Machabees': '1 Maccabees',
    '2 Machabees': '2 Maccabees',
    'Job': 'Job',
    'Psalms': 'Psalms',
    'Proverbs': 'Proverbs',
    'Ecclesiastes': 'Ecclesiastes',
    'Canticle of Canticles': 'Song of Solomon',
    'Wisdom': 'Wisdom',
    'Ecclesiasticus': 'Sirach',
    'Isaias': 'Isaiah',
    'Jeremias': 'Jeremiah',
    'Lamentations': 'Lamentations',
    'Baruch': 'Baruch',
    'Ezechiel': 'Ezekiel',
    'Daniel': 'Daniel',
    'Osee': 'Hosea',
    'Joel': 'Joel',
    'Amos': 'Amos',
    'Abdias': 'Obadiah',
    'Jonas': 'Jonah',
    'Micheas': 'Micah',
    'Nahum': 'Nahum',
    'Habacuc': 'Habakkuk',
    'Sophonias': 'Zephaniah',
    'Aggeus': 'Haggai',
    'Zacharias': 'Zechariah',
    'Malachias': 'Malachi',
  };
  return mapping[canonical] || canonical;
}

/**
 * Lookup verses in the Vulgate
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {object|null} verseSpec - { start, end } or null for full chapter
 * @returns {object} - { verses: [], error: null } or { verses: [], error: string }
 */
export function lookup(bookCanonical, chapter, verseSpec) {
  const data = loadData();
  const vulgateBook = getVulgateBookName(bookCanonical);

  const verses = [];
  let maxVerse = 0;
  let maxChapter = 0;

  // Find all verses for this book/chapter
  for (const [key, entry] of data) {
    if (entry.bookName === vulgateBook) {
      if (entry.chapter > maxChapter) maxChapter = entry.chapter;
      if (entry.chapter === chapter) {
        if (entry.verse > maxVerse) maxVerse = entry.verse;
        verses.push(entry);
      }
    }
  }

  // Check if book exists
  if (maxChapter === 0) {
    return { verses: [], error: `Book "${bookCanonical}" not found in Vulgate.` };
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
