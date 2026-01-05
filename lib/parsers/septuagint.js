import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXTS_DIR = join(__dirname, '../../texts/septuagint');

// Cache parsed data per file
const fileCache = new Map();

/**
 * Get the LXX filename for a book
 */
function getLXXFilename(canonical) {
  const mapping = {
    'Genesis': '01.Genesis.txt',
    'Exodus': '02.Exodus.txt',
    'Leviticus': '03.Leviticus.txt',
    'Numbers': '04.Numeri.txt',
    'Deuteronomy': '05.Deuteronomium.txt',
    'Josue': '06.Josue.txt',
    'Judges': '08.Judices.txt',
    'Ruth': '10.Ruth.txt',
    '1 Samuel': '11.Regnorum_I.txt',
    '2 Samuel': '12.Regnorum_II.txt',
    '1 Kings': '13.Regnorum_III.txt',
    '2 Kings': '14.Regnorum_IV.txt',
    '1 Chronicles': '15.Paralipomenon_I.txt',
    '2 Chronicles': '16.Paralipomenon_II.txt',
    'Ezra': '17.Esdras_A.txt',
    'Nehemiah': '18.Esdras_B.txt',
    'Esther': '19.Esther.txt',
    'Judith': '20.Judith.txt',
    'Tobias': '21.Tobias.txt',
    '1 Machabees': '23.Machabaeorum_i.txt',
    '2 Machabees': '24.Machabaeorum_ii.txt',
    'Psalms': '27.Psalmi.txt',
    'Proverbs': '29.Proverbia.txt',
    'Canticle of Canticles': '31.Canticum.txt',
    'Job': '32.Job.txt',
    'Wisdom': '33.Sapientia_Salomonis.txt',
    'Ecclesiasticus': '34.Ecclesiasticus.txt',
    'Osee': '36.Osee.txt',
    'Amos': '37.Amos.txt',
    'Micheas': '38.Michaeas.txt',
    'Joel': '39.Joel.txt',
    'Abdias': '40.Abdias.txt',
    'Jonas': '41.Jonas.txt',
    'Nahum': '42.Nahum.txt',
    'Habacuc': '43.Habacuc.txt',
    'Sophonias': '44.Sophonias.txt',
    'Aggeus': '45.Aggaeus.txt',
    'Zacharias': '46.Zacharias.txt',
    'Malachias': '47.Malachias.txt',
    'Isaias': '48.Isaias.txt',
    'Jeremias': '49.Jeremias.txt',
    'Baruch': '50.Baruch.txt',
    'Lamentations': '51.Threni_seu_Lamentationes.txt',
    'Ezechiel': '53.Ezechiel.txt',
    'Daniel': '57.Daniel_Theodotionis_versio.txt',
  };
  return mapping[canonical] || null;
}

/**
 * Parse an LXX file (word-by-word format)
 * Format: "1.1.1 word" where 1.1.1 is chapter.section.verse
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

  const lines = content.split('\n').filter(line => line.trim());
  const verses = new Map();

  // Group words by verse reference
  for (const line of lines) {
    // Format: "Book.Chapter.Verse word" e.g., "1.1.1 word"
    // Book number is always the same within a file (1 for Genesis, etc.)
    const match = line.match(/^(\d+)\.(\d+)\.(\d+)\s+(.+)$/);
    if (match) {
      const bookNum = parseInt(match[1], 10); // Book number (ignored, same per file)
      const chapter = parseInt(match[2], 10); // Chapter
      const verse = parseInt(match[3], 10);   // Verse
      const word = match[4];

      const key = `${chapter}:${verse}`;
      if (!verses.has(key)) {
        verses.set(key, { chapter, verse, words: [] });
      }
      verses.get(key).words.push(word);
    }
  }

  // Convert word arrays to text
  const result = new Map();
  for (const [key, data] of verses) {
    result.set(key, {
      chapter: data.chapter,
      verse: data.verse,
      text: data.words.join(' ')
    });
  }

  fileCache.set(filename, result);
  return result;
}

/**
 * Lookup verses in the Septuagint
 * @param {string} bookCanonical - Canonical book name
 * @param {number} chapter - Chapter number
 * @param {object|null} verseSpec - { start, end } or null for full chapter
 * @returns {object} - { verses: [], error: null } or { verses: [], error: string }
 */
export function lookup(bookCanonical, chapter, verseSpec) {
  const filename = getLXXFilename(bookCanonical);

  if (!filename) {
    return { verses: [], error: `Book "${bookCanonical}" not available in Septuagint.` };
  }

  const data = parseFile(filename);
  if (!data) {
    return { verses: [], error: `Could not read Septuagint file for "${bookCanonical}".` };
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
      return { verses: [], error: `No chapters found for "${bookCanonical}" in Septuagint.` };
    }
    return { verses: [], error: `${bookCanonical} only has ${maxChapter} chapters in Septuagint.` };
  }

  // Sort by verse number
  verses.sort((a, b) => a.verse - b.verse);

  // Filter by verse spec if provided
  if (verseSpec) {
    const { start, end } = verseSpec;
    if (start > maxVerse) {
      return { verses: [], error: `${bookCanonical} ${chapter} only has ${maxVerse} verses in Septuagint.` };
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
