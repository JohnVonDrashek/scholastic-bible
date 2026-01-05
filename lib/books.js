// Book name mappings and normalization

// Canonical book names (using Douay-Rheims naming as base)
export const BOOKS = {
  // Pentateuch
  genesis: { canonical: 'Genesis', abbrev: 'Gen', aliases: ['gen', 'gn'], vulgate: 'Genesis', lxx: '01.Genesis', hebrew: 'gen' },
  exodus: { canonical: 'Exodus', abbrev: 'Exod', aliases: ['exod', 'exo', 'ex'], vulgate: 'Exodus', lxx: '02.Exodus', hebrew: 'exo' },
  leviticus: { canonical: 'Leviticus', abbrev: 'Lev', aliases: ['lev', 'lv'], vulgate: 'Leviticus', lxx: '03.Leviticus', hebrew: 'lev' },
  numbers: { canonical: 'Numbers', abbrev: 'Num', aliases: ['num', 'nm'], vulgate: 'Numeri', lxx: '04.Numeri', hebrew: 'num' },
  deuteronomy: { canonical: 'Deuteronomy', abbrev: 'Deut', aliases: ['deut', 'dt'], vulgate: 'Deuteronomium', lxx: '05.Deuteronomium', hebrew: 'deu' },

  // Historical Books
  josue: { canonical: 'Josue', abbrev: 'Jos', aliases: ['joshua', 'josh', 'jos'], vulgate: 'Josue', lxx: '06.Josue', hebrew: 'jos' },
  judges: { canonical: 'Judges', abbrev: 'Judg', aliases: ['judg', 'jdg', 'jg'], vulgate: 'Judicum', lxx: '08.Judices', hebrew: 'jdg' },
  ruth: { canonical: 'Ruth', abbrev: 'Ruth', aliases: ['rth', 'ru'], vulgate: 'Ruth', lxx: '10.Ruth', hebrew: 'rut' },
  '1samuel': { canonical: '1 Samuel', abbrev: '1Sam', aliases: ['1sam', '1sm', '1kings'], vulgate: 'I Samuelis', lxx: '11.Regnorum_I', hebrew: '1sam' },
  '2samuel': { canonical: '2 Samuel', abbrev: '2Sam', aliases: ['2sam', '2sm', '2kings'], vulgate: 'II Samuelis', lxx: '12.Regnorum_II', hebrew: '2sam' },
  '1kings': { canonical: '1 Kings', abbrev: '1Kgs', aliases: ['1kgs', '1ki', '3kings'], vulgate: 'III Regum', lxx: '13.Regnorum_III', hebrew: '1kings' },
  '2kings': { canonical: '2 Kings', abbrev: '2Kgs', aliases: ['2kgs', '2ki', '4kings'], vulgate: 'IV Regum', lxx: '14.Regnorum_IV', hebrew: '2kings' },
  '1chronicles': { canonical: '1 Chronicles', abbrev: '1Chr', aliases: ['1chr', '1chron', '1paralipomenon'], vulgate: 'I Paralipomenon', lxx: '15.Paralipomenon_I', hebrew: '1chron' },
  '2chronicles': { canonical: '2 Chronicles', abbrev: '2Chr', aliases: ['2chr', '2chron', '2paralipomenon'], vulgate: 'II Paralipomenon', lxx: '16.Paralipomenon_II', hebrew: '2chron' },
  ezra: { canonical: 'Ezra', abbrev: 'Ezra', aliases: ['ezr', '1esdras'], vulgate: 'Esdrae', lxx: '18.Esdras_B', hebrew: '2ezr' },
  nehemiah: { canonical: 'Nehemiah', abbrev: 'Neh', aliases: ['neh', 'ne', '2esdras'], vulgate: 'Nehemiae', lxx: '18.Esdras_B', hebrew: '2ezr' },
  tobias: { canonical: 'Tobias', abbrev: 'Tob', aliases: ['tobit', 'tb'], vulgate: 'Tobiae', lxx: '21.Tobias', hebrew: null },
  judith: { canonical: 'Judith', abbrev: 'Jdt', aliases: ['jdth', 'jth'], vulgate: 'Judith', lxx: '20.Judith', hebrew: null },
  esther: { canonical: 'Esther', abbrev: 'Esth', aliases: ['esth', 'est'], vulgate: 'Esther', lxx: '19.Esther', hebrew: 'est' },
  '1machabees': { canonical: '1 Machabees', abbrev: '1Macc', aliases: ['1macc', '1maccabees', '1mac'], vulgate: 'I Machabaeorum', lxx: '23.Machabaeorum_i', hebrew: null },
  '2machabees': { canonical: '2 Machabees', abbrev: '2Macc', aliases: ['2macc', '2maccabees', '2mac'], vulgate: 'II Machabaeorum', lxx: '24.Machabaeorum_ii', hebrew: null },

  // Wisdom Books
  job: { canonical: 'Job', abbrev: 'Job', aliases: ['jb'], vulgate: 'Job', lxx: '32.Job', hebrew: 'job' },
  psalms: { canonical: 'Psalms', abbrev: 'Ps', aliases: ['ps', 'pss', 'psalm'], vulgate: 'Psalmi', lxx: '27.Psalmi', hebrew: 'psah' },
  proverbs: { canonical: 'Proverbs', abbrev: 'Prov', aliases: ['prov', 'prv', 'pr'], vulgate: 'Proverbia', lxx: '29.Proverbia', hebrew: 'pro' },
  ecclesiastes: { canonical: 'Ecclesiastes', abbrev: 'Eccl', aliases: ['eccl', 'ecc', 'qoheleth', 'qoh'], vulgate: 'Ecclesiastes', lxx: null, hebrew: 'ecc' },
  canticles: { canonical: 'Canticle of Canticles', abbrev: 'Song', aliases: ['song', 'songofsongs', 'sos', 'canticle', 'sg'], vulgate: 'Canticum', lxx: '31.Canticum', hebrew: 'sng' },
  wisdom: { canonical: 'Wisdom', abbrev: 'Wis', aliases: ['wis', 'wisdomofsolomon', 'ws'], vulgate: 'Sapientia', lxx: '33.Sapientia_Salomonis', hebrew: null },
  ecclesiasticus: { canonical: 'Ecclesiasticus', abbrev: 'Sir', aliases: ['sir', 'sirach', 'ben sira'], vulgate: 'Ecclesiasticus', lxx: '34.Ecclesiasticus', hebrew: null },

  // Major Prophets
  isaias: { canonical: 'Isaias', abbrev: 'Isa', aliases: ['isaiah', 'isa', 'is'], vulgate: 'Isaiae', lxx: '48.Isaias', hebrew: 'isa' },
  jeremias: { canonical: 'Jeremias', abbrev: 'Jer', aliases: ['jeremiah', 'jer', 'jr'], vulgate: 'Ieremiae', lxx: '49.Jeremias', hebrew: 'jer' },
  lamentations: { canonical: 'Lamentations', abbrev: 'Lam', aliases: ['lam', 'la'], vulgate: 'Lamentationes', lxx: '51.Threni_seu_Lamentationes', hebrew: 'lam' },
  baruch: { canonical: 'Baruch', abbrev: 'Bar', aliases: ['bar', 'ba'], vulgate: 'Baruch', lxx: '50.Baruch', hebrew: null },
  ezechiel: { canonical: 'Ezechiel', abbrev: 'Ezek', aliases: ['ezekiel', 'ezek', 'ez'], vulgate: 'Ezechielis', lxx: '53.Ezechiel', hebrew: 'eze' },
  daniel: { canonical: 'Daniel', abbrev: 'Dan', aliases: ['dan', 'dn'], vulgate: 'Danielis', lxx: '57.Daniel_Theodotionis_versio', hebrew: 'dan' },

  // Minor Prophets
  osee: { canonical: 'Osee', abbrev: 'Hos', aliases: ['hosea', 'hos', 'ho'], vulgate: 'Osee', lxx: '36.Osee', hebrew: 'hos' },
  joel: { canonical: 'Joel', abbrev: 'Joel', aliases: ['jl'], vulgate: 'Ioel', lxx: '39.Joel', hebrew: 'joel' },
  amos: { canonical: 'Amos', abbrev: 'Amos', aliases: ['am'], vulgate: 'Amos', lxx: '37.Amos', hebrew: 'amo' },
  abdias: { canonical: 'Abdias', abbrev: 'Obad', aliases: ['obadiah', 'obad', 'ob'], vulgate: 'Abdiae', lxx: '40.Abdias', hebrew: 'oba' },
  jonas: { canonical: 'Jonas', abbrev: 'Jonah', aliases: ['jonah', 'jon', 'jnh'], vulgate: 'Ionae', lxx: '41.Jonas', hebrew: 'jon' },
  micheas: { canonical: 'Micheas', abbrev: 'Mic', aliases: ['micah', 'mic', 'mi'], vulgate: 'Michaeae', lxx: '38.Michaeas', hebrew: 'mic' },
  nahum: { canonical: 'Nahum', abbrev: 'Nah', aliases: ['nah', 'na'], vulgate: 'Nahum', lxx: '42.Nahum', hebrew: 'nahum' },
  habacuc: { canonical: 'Habacuc', abbrev: 'Hab', aliases: ['habakkuk', 'hab', 'hb'], vulgate: 'Habacuc', lxx: '43.Habacuc', hebrew: 'hab' },
  sophonias: { canonical: 'Sophonias', abbrev: 'Zeph', aliases: ['zephaniah', 'zeph', 'zep'], vulgate: 'Sophoniae', lxx: '44.Sophonias', hebrew: 'zep' },
  aggeus: { canonical: 'Aggeus', abbrev: 'Hag', aliases: ['haggai', 'hag', 'hg'], vulgate: 'Aggaei', lxx: '45.Aggaeus', hebrew: 'hag' },
  zacharias: { canonical: 'Zacharias', abbrev: 'Zech', aliases: ['zechariah', 'zech', 'zec'], vulgate: 'Zachariae', lxx: '46.Zacharias', hebrew: 'zec' },
  malachias: { canonical: 'Malachias', abbrev: 'Mal', aliases: ['malachi', 'mal', 'ml'], vulgate: 'Malachiae', lxx: '47.Malachias', hebrew: 'mal' },
};

// Build reverse lookup maps
const aliasMap = new Map();
for (const [key, book] of Object.entries(BOOKS)) {
  // Add the key itself
  aliasMap.set(key, key);
  // Add canonical name (lowercase, no spaces)
  aliasMap.set(book.canonical.toLowerCase().replace(/\s+/g, ''), key);
  // Add abbreviation
  aliasMap.set(book.abbrev.toLowerCase(), key);
  // Add all aliases
  for (const alias of book.aliases) {
    aliasMap.set(alias.toLowerCase().replace(/\s+/g, ''), key);
  }
}

/**
 * Normalize a book name input to its canonical key
 * @param {string} input - User input (e.g., "Gen", "genesis", "1Kings", "1-Kings")
 * @returns {string|null} - Canonical key or null if not found
 */
export function normalizeBookName(input) {
  // Normalize: lowercase, remove spaces/hyphens/underscores
  const normalized = input.toLowerCase().replace(/[\s\-_]/g, '');

  // Direct lookup
  if (aliasMap.has(normalized)) {
    return aliasMap.get(normalized);
  }

  // Try fuzzy matching for close matches
  const candidates = [];
  for (const [alias, key] of aliasMap) {
    if (alias.includes(normalized) || normalized.includes(alias)) {
      candidates.push({ alias, key, score: Math.abs(alias.length - normalized.length) });
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => a.score - b.score);
    return candidates[0].key;
  }

  return null;
}

/**
 * Get book info for a translation
 * @param {string} bookKey - Canonical book key
 * @param {string} translation - Translation key (vulgate, lxx, hebrew, dr)
 * @returns {object|null} - Book info or null
 */
export function getBookInfo(bookKey, translation) {
  const book = BOOKS[bookKey];
  if (!book) return null;

  return {
    canonical: book.canonical,
    abbrev: book.abbrev,
    file: book[translation] || null,
  };
}

/**
 * Get suggested book name if input doesn't match
 * @param {string} input - User input
 * @returns {string|null} - Suggested canonical name
 */
export function suggestBook(input) {
  const normalized = input.toLowerCase().replace(/[\s\-_]/g, '');

  let bestMatch = null;
  let bestScore = Infinity;

  for (const [alias, key] of aliasMap) {
    // Simple Levenshtein-ish scoring
    const score = levenshteinDistance(normalized, alias);
    if (score < bestScore && score <= 3) {
      bestScore = score;
      bestMatch = BOOKS[key].canonical;
    }
  }

  return bestMatch;
}

// Simple Levenshtein distance
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Translation aliases
export const TRANSLATIONS = {
  dr: 'dr',
  douay: 'dr',
  'douay-rheims': 'dr',
  douayrheims: 'dr',
  english: 'dr',

  vulgate: 'vulgate',
  vul: 'vulgate',
  latin: 'vulgate',

  lxx: 'lxx',
  septuagint: 'lxx',
  greek: 'lxx',

  hebrew: 'hebrew',
  heb: 'hebrew',
  masoretic: 'hebrew',
};

/**
 * Normalize translation input
 * @param {string} input - User input
 * @returns {string|null} - Normalized translation key or null
 */
export function normalizeTranslation(input) {
  return TRANSLATIONS[input.toLowerCase().replace(/[\s\-_]/g, '')] || null;
}

/**
 * Parse verse specification (e.g., "1", "1-5")
 * @param {string} input - Verse input
 * @returns {object} - { start, end } or null if invalid
 */
export function parseVerseSpec(input) {
  if (!input) return null;

  const rangeMatch = input.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    return { start: parseInt(rangeMatch[1], 10), end: parseInt(rangeMatch[2], 10) };
  }

  const singleMatch = input.match(/^(\d+)$/);
  if (singleMatch) {
    const v = parseInt(singleMatch[1], 10);
    return { start: v, end: v };
  }

  return null;
}
