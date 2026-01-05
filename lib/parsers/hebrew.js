import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXTS_DIR = join(__dirname, '../../texts/hebrew');

// Cache parsed data per file
const fileCache = new Map();

/**
 * Get the Hebrew filename for a book
 */
function getHebrewFilename(canonical) {
  const mapping = {
    'Genesis': 'gen.org',
    'Exodus': 'exo.org',
    'Leviticus': 'lev.org',
    'Numbers': 'num.org',
    'Deuteronomy': 'deu.org',
    'Josue': 'jos.org',
    'Judges': 'jdg.org',
    'Ruth': 'rut.org',
    '1 Samuel': '1sam.org',
    '2 Samuel': '2sam.org',
    '1 Kings': '1kings.org',
    '2 Kings': '2kings.org',
    '1 Chronicles': '1chron.org',
    '2 Chronicles': '2chron.org',
    'Ezra': '2ezr.org', // Ezra-Nehemiah combined
    'Nehemiah': '2ezr.org',
    'Esther': 'est.org',
    'Job': 'job.org',
    'Psalms': 'psah.org',
    'Proverbs': 'pro.org',
    'Ecclesiastes': 'ecc.org',
    'Canticle of Canticles': 'sng.org',
    'Isaias': 'isa.org',
    'Jeremias': 'jer.org',
    'Lamentations': 'lam.org',
    'Ezechiel': 'eze.org',
    'Daniel': 'dan.org',
    'Osee': 'hos.org',
    'Joel': 'joel.org',
    'Amos': 'amo.org',
    'Abdias': 'oba.org',
    'Jonas': 'jon.org',
    'Micheas': 'mic.org',
    'Nahum': 'nahum.org',
    'Habacuc': 'hab.org',
    'Sophonias': 'zep.org',
    'Aggeus': 'hag.org',
    'Zacharias': 'zec.org',
    'Malachias': 'mal.org',
  };
  return mapping[canonical] || null;
}

/**
 * Parse a Hebrew org-mode file
 * Format: "* 1" for chapter headers, "1. text" for verses
 * @param {string} filename - Filename to parse
 * @returns {Map} - Map of "chapter:verse" -> text
 */
function parseFile(filename) {
  if (fileCache.has(filename)) {
    return fileCache.get(filename);
  }

  const filePath = join(TEXTS_DIR, filename);
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }

  const lines = content.split('\n');
  const verses = new Map();

  let currentChapter = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for chapter header: "* 1" or "* 1  " (org-mode header)
    const chapterMatch = trimmed.match(/^\*\s+(\d+)\s*$/);
    if (chapterMatch) {
      currentChapter = parseInt(chapterMatch[1], 10);
      continue;
    }

    // Check for verse: "1. text" (numbered list in org-mode)
    const verseMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (verseMatch && currentChapter > 0) {
      const verse = parseInt(verseMatch[1], 10);
      const text = verseMatch[2].trim();

      const key = `${currentChapter}:${verse}`;
      verses.set(key, {
        chapter: currentChapter,
        verse,
        text
      });
    }
  }

  fileCache.set(filename, verses);
  return verses;
}

/**
 * Lookup verses in the Hebrew Masoretic text
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {object|null} verseSpec - { start, end } or null for full chapter
 * @returns {object} - { verses: [], error: null } or { verses: [], error: string }
 */
export function lookup(bookCanonical, chapter, verseSpec) {
  const filename = getHebrewFilename(bookCanonical);

  if (!filename) {
    // Deuterocanonical books not in Hebrew
    const deuterocanonical = ['Tobias', 'Judith', 'Wisdom', 'Ecclesiasticus', 'Baruch', '1 Machabees', '2 Machabees'];
    if (deuterocanonical.includes(bookCanonical)) {
      return {
        verses: [],
        error: `Hebrew text not available for ${bookCanonical} (deuterocanonical). Try: lxx, vulgate, dr`
      };
    }
    return { verses: [], error: `Book "${bookCanonical}" not available in Hebrew.` };
  }

  const data = parseFile(filename);
  if (!data) {
    return { verses: [], error: `Could not read Hebrew file for "${bookCanonical}".` };
  }

  const verses = [];
  let maxVerse = 0;
  let maxChapter = 0;

  // Find all verses for this chapter
  for (const [key, entry] of data) {
    if (entry.chapter > maxChapter) maxChapter = entry.chapter;
    if (entry.chapter === chapter) {
      if (entry.verse > maxVerse) maxVerse = entry.verse;
      verses.push(entry);
    }
  }

  // Check if chapter exists
  if (verses.length === 0) {
    if (maxChapter === 0) {
      return { verses: [], error: `No chapters found for "${bookCanonical}" in Hebrew.` };
    }
    return { verses: [], error: `${bookCanonical} only has ${maxChapter} chapters in Hebrew.` };
  }

  // Sort by verse number
  verses.sort((a, b) => a.verse - b.verse);

  // Filter by verse spec if provided
  if (verseSpec) {
    const { start, end } = verseSpec;
    if (start > maxVerse) {
      return { verses: [], error: `${bookCanonical} ${chapter} only has ${maxVerse} verses in Hebrew.` };
    }
    const filtered = verses.filter(v => v.verse >= start && v.verse <= end);
    return { verses: filtered, error: null };
  }

  return { verses, error: null };
}

/**
 * Format verses for output (right-to-left Hebrew text)
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {Array} verses - Array of verse objects
 * @returns {string} - Formatted output
 */
export function format(bookCanonical, chapter, verses) {
  if (verses.length === 0) return '';

  // Hebrew text - terminal will handle RTL
  const lines = verses.map(v => `${chapter}:${v.verse} ${v.text}`);
  return lines.join('\n');
}
