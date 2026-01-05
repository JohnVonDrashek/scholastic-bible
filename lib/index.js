import { normalizeBookName, normalizeTranslation, parseVerseSpec, BOOKS, suggestBook } from './books.js';
import * as vulgate from './parsers/vulgate.js';
import * as douayRheims from './parsers/douay-rheims.js';
import * as septuagint from './parsers/septuagint.js';
import * as hebrew from './parsers/hebrew.js';

// Parser registry
const PARSERS = {
  vulgate,
  dr: douayRheims,
  lxx: septuagint,
  hebrew,
};

// Translation display names
const TRANSLATION_NAMES = {
  vulgate: 'Latin Vulgate',
  dr: 'Douay-Rheims',
  lxx: 'Septuagint (Greek)',
  hebrew: 'Hebrew Masoretic',
};

/**
 * Main lookup function
 * @param {string} translationInput - Translation name/alias
 * @param {string} bookInput - Book name/abbreviation
 * @param {string} chapterInput - Chapter number
 * @param {string|null} verseInput - Verse number or range (optional)
 * @returns {object} - { output: string, error: string|null }
 */
export function lookupVerse(translationInput, bookInput, chapterInput, verseInput = null) {
  // Normalize translation
  const translation = normalizeTranslation(translationInput);
  if (!translation) {
    const available = Object.keys(TRANSLATION_NAMES).map(k => `  ${k}: ${TRANSLATION_NAMES[k]}`).join('\n');
    return {
      output: null,
      error: `Unknown translation "${translationInput}". Available translations:\n${available}`
    };
  }

  // Normalize book name
  const bookKey = normalizeBookName(bookInput);
  if (!bookKey) {
    const suggestion = suggestBook(bookInput);
    if (suggestion) {
      return { output: null, error: `Unknown book "${bookInput}". Did you mean "${suggestion}"?` };
    }
    return { output: null, error: `Unknown book "${bookInput}".` };
  }

  const book = BOOKS[bookKey];
  const bookCanonical = book.canonical;

  // Parse chapter
  const chapter = parseInt(chapterInput, 10);
  if (isNaN(chapter) || chapter < 1) {
    return { output: null, error: `Invalid chapter "${chapterInput}". Must be a positive number.` };
  }

  // Parse verse spec
  let verseSpec = null;
  if (verseInput) {
    verseSpec = parseVerseSpec(verseInput);
    if (!verseSpec) {
      return { output: null, error: `Invalid verse "${verseInput}". Use a number (e.g., 1) or range (e.g., 1-5).` };
    }
  }

  // Get the appropriate parser
  const parser = PARSERS[translation];
  if (!parser) {
    return { output: null, error: `Parser not available for ${translation}.` };
  }

  // Perform lookup
  const result = parser.lookup(bookCanonical, chapter, verseSpec);

  if (result.error) {
    return { output: null, error: result.error };
  }

  if (result.verses.length === 0) {
    return { output: null, error: `No verses found.` };
  }

  // Format output
  const header = `${bookCanonical} ${chapter}${verseSpec ? `:${verseSpec.start}${verseSpec.end !== verseSpec.start ? '-' + verseSpec.end : ''}` : ''} (${TRANSLATION_NAMES[translation]})`;
  const body = parser.format(bookCanonical, chapter, result.verses);

  return {
    output: `${header}\n${'─'.repeat(header.length)}\n${body}`,
    error: null
  };
}

/**
 * List available translations
 * @returns {string} - Formatted list
 */
export function listTranslations() {
  const lines = [];
  lines.push('Available translations:');
  lines.push('');
  lines.push('  dr, douay, english       Douay-Rheims (English)');
  lines.push('  vulgate, vul, latin      Latin Vulgate');
  lines.push('  lxx, septuagint, greek   Septuagint (Greek OT)');
  lines.push('  hebrew, heb, masoretic   Hebrew Masoretic Text');
  return lines.join('\n');
}

/**
 * List available books
 * @returns {string} - Formatted list
 */
export function listBooks() {
  const lines = [];
  lines.push('Available books:');
  lines.push('');

  for (const [key, book] of Object.entries(BOOKS)) {
    const hebrew = book.hebrew ? '✓' : ' ';
    const lxx = book.lxx ? '✓' : ' ';
    lines.push(`  ${book.abbrev.padEnd(6)} ${book.canonical.padEnd(25)} [DR✓ VUL✓ LXX${lxx} HEB${hebrew}]`);
  }

  return lines.join('\n');
}
