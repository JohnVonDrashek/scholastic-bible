import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEXTS_DIR = join(__dirname, '../texts/douay-rheims');
const PATCHES_DIR = join(__dirname, '../patches');
const OUTPUT_DIR = join(__dirname, '../site/src/data');

// Book metadata with canonical names and abbreviations
const BOOK_ORDER = [
  // Old Testament
  { id: 'genesis', name: 'Genesis', abbrev: 'Gen', testament: 'old' },
  { id: 'exodus', name: 'Exodus', abbrev: 'Exod', testament: 'old' },
  { id: 'leviticus', name: 'Leviticus', abbrev: 'Lev', testament: 'old' },
  { id: 'numbers', name: 'Numbers', abbrev: 'Num', testament: 'old' },
  { id: 'deuteronomy', name: 'Deuteronomy', abbrev: 'Deut', testament: 'old' },
  { id: 'josue', name: 'Josue', abbrev: 'Jos', testament: 'old' },
  { id: 'judges', name: 'Judges', abbrev: 'Judg', testament: 'old' },
  { id: 'ruth', name: 'Ruth', abbrev: 'Ruth', testament: 'old' },
  { id: '1-samuel', name: '1 Samuel', abbrev: '1Sam', testament: 'old' },
  { id: '2-samuel', name: '2 Samuel', abbrev: '2Sam', testament: 'old' },
  { id: '1-kings', name: '1 Kings', abbrev: '1Kgs', testament: 'old' },
  { id: '2-kings', name: '2 Kings', abbrev: '2Kgs', testament: 'old' },
  { id: '1-chronicles', name: '1 Chronicles', abbrev: '1Chr', testament: 'old' },
  { id: '2-chronicles', name: '2 Chronicles', abbrev: '2Chr', testament: 'old' },
  { id: 'ezra', name: 'Ezra', abbrev: 'Ezra', testament: 'old' },
  { id: 'nehemiah', name: 'Nehemiah', abbrev: 'Neh', testament: 'old' },
  { id: 'tobias', name: 'Tobias', abbrev: 'Tob', testament: 'old' },
  { id: 'judith', name: 'Judith', abbrev: 'Jdt', testament: 'old' },
  { id: 'esther', name: 'Esther', abbrev: 'Esth', testament: 'old' },
  { id: 'job', name: 'Job', abbrev: 'Job', testament: 'old' },
  { id: 'psalms', name: 'Psalms', abbrev: 'Ps', testament: 'old' },
  { id: 'proverbs', name: 'Proverbs', abbrev: 'Prov', testament: 'old' },
  { id: 'ecclesiastes', name: 'Ecclesiastes', abbrev: 'Eccl', testament: 'old' },
  { id: 'canticles', name: 'Canticle of Canticles', abbrev: 'Song', testament: 'old' },
  { id: 'wisdom', name: 'Wisdom', abbrev: 'Wis', testament: 'old' },
  { id: 'ecclesiasticus', name: 'Ecclesiasticus', abbrev: 'Sir', testament: 'old' },
  { id: 'isaias', name: 'Isaias', abbrev: 'Isa', testament: 'old' },
  { id: 'jeremias', name: 'Jeremias', abbrev: 'Jer', testament: 'old' },
  { id: 'lamentations', name: 'Lamentations', abbrev: 'Lam', testament: 'old' },
  { id: 'baruch', name: 'Baruch', abbrev: 'Bar', testament: 'old' },
  { id: 'ezechiel', name: 'Ezechiel', abbrev: 'Ezek', testament: 'old' },
  { id: 'daniel', name: 'Daniel', abbrev: 'Dan', testament: 'old' },
  { id: 'osee', name: 'Osee', abbrev: 'Hos', testament: 'old' },
  { id: 'joel', name: 'Joel', abbrev: 'Joel', testament: 'old' },
  { id: 'amos', name: 'Amos', abbrev: 'Amos', testament: 'old' },
  { id: 'abdias', name: 'Abdias', abbrev: 'Obad', testament: 'old' },
  { id: 'jonas', name: 'Jonas', abbrev: 'Jonah', testament: 'old' },
  { id: 'micheas', name: 'Micheas', abbrev: 'Mic', testament: 'old' },
  { id: 'nahum', name: 'Nahum', abbrev: 'Nah', testament: 'old' },
  { id: 'habacuc', name: 'Habacuc', abbrev: 'Hab', testament: 'old' },
  { id: 'sophonias', name: 'Sophonias', abbrev: 'Zeph', testament: 'old' },
  { id: 'aggeus', name: 'Aggeus', abbrev: 'Hag', testament: 'old' },
  { id: 'zacharias', name: 'Zacharias', abbrev: 'Zech', testament: 'old' },
  { id: 'malachias', name: 'Malachias', abbrev: 'Mal', testament: 'old' },
  { id: '1-machabees', name: '1 Machabees', abbrev: '1Macc', testament: 'old' },
  { id: '2-machabees', name: '2 Machabees', abbrev: '2Macc', testament: 'old' },
  // New Testament
  { id: 'matthew', name: 'Matthew', abbrev: 'Matt', testament: 'new' },
  { id: 'mark', name: 'Mark', abbrev: 'Mark', testament: 'new' },
  { id: 'luke', name: 'Luke', abbrev: 'Luke', testament: 'new' },
  { id: 'john', name: 'John', abbrev: 'John', testament: 'new' },
  { id: 'acts', name: 'Acts', abbrev: 'Acts', testament: 'new' },
  { id: 'romans', name: 'Romans', abbrev: 'Rom', testament: 'new' },
  { id: '1-corinthians', name: '1 Corinthians', abbrev: '1Cor', testament: 'new' },
  { id: '2-corinthians', name: '2 Corinthians', abbrev: '2Cor', testament: 'new' },
  { id: 'galatians', name: 'Galatians', abbrev: 'Gal', testament: 'new' },
  { id: 'ephesians', name: 'Ephesians', abbrev: 'Eph', testament: 'new' },
  { id: 'philippians', name: 'Philippians', abbrev: 'Phil', testament: 'new' },
  { id: 'colossians', name: 'Colossians', abbrev: 'Col', testament: 'new' },
  { id: '1-thessalonians', name: '1 Thessalonians', abbrev: '1Thess', testament: 'new' },
  { id: '2-thessalonians', name: '2 Thessalonians', abbrev: '2Thess', testament: 'new' },
  { id: '1-timothy', name: '1 Timothy', abbrev: '1Tim', testament: 'new' },
  { id: '2-timothy', name: '2 Timothy', abbrev: '2Tim', testament: 'new' },
  { id: 'titus', name: 'Titus', abbrev: 'Titus', testament: 'new' },
  { id: 'philemon', name: 'Philemon', abbrev: 'Phlm', testament: 'new' },
  { id: 'hebrews', name: 'Hebrews', abbrev: 'Heb', testament: 'new' },
  { id: 'james', name: 'James', abbrev: 'Jas', testament: 'new' },
  { id: '1-peter', name: '1 Peter', abbrev: '1Pet', testament: 'new' },
  { id: '2-peter', name: '2 Peter', abbrev: '2Pet', testament: 'new' },
  { id: '1-john', name: '1 John', abbrev: '1John', testament: 'new' },
  { id: '2-john', name: '2 John', abbrev: '2John', testament: 'new' },
  { id: '3-john', name: '3 John', abbrev: '3John', testament: 'new' },
  { id: 'jude', name: 'Jude', abbrev: 'Jude', testament: 'new' },
  { id: 'apocalypse', name: 'Apocalypse', abbrev: 'Rev', testament: 'new' },
];

/**
 * Parse Douay-Rheims text file into structured data
 */
function parseDouayRheims() {
  const filePath = join(TEXTS_DIR, 'douay-rheims.txt');
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const books = new Map();
  let currentBook = null;
  let currentChapter = null;
  let currentVerse = null;
  let currentText = [];
  let chapterSummary = [];
  let bookIntro = [];
  let inChapterSummary = false;
  let inBookIntro = false;
  let currentBookTitle = null;

  // Pattern for chapter headers like "Genesis Chapter 1"
  const chapterPattern = /^(\w[\w\s]+?) Chapter (\d+)$/;
  // Pattern for verse starts like "1:1." or "12:34."
  const versePattern = /^(\d+):(\d+)\.\s*(.*)$/;
  // Pattern for book titles like "THE BOOK OF GENESIS", "THE FIRST EPISTLE OF ST. PETER",
  // or standalone names like "ECCLESIASTES", "ECCLESIASTICUS", "SOLOMON'S CANTICLE OF CANTICLES"
  // Note: SOLOMON'S uses curly apostrophe (U+2019) in source
  const bookTitlePattern = /^(?:THE\s+(?:(?:FIRST|SECOND|THIRD|FOURTH|CATHOLIC|HOLY)\s+)?(?:BOOK|EPISTLE|GOSPEL|ACTS|PROPHECY|LAMENTATIONS|CANTICLE|APOCALYPSE)|ECCLESIASTES|ECCLESIASTICUS|SOLOMON['\u2019]S CANTICLE)/i;

  // Store chapter summaries and book intros separately
  const chapterSummaries = new Map(); // key: "BookName:ChapterNum"
  const bookIntros = new Map(); // key: BookName

  function saveCurrentVerse() {
    if (currentBook && currentChapter !== null && currentVerse !== null && currentText.length > 0) {
      if (!books.has(currentBook)) {
        books.set(currentBook, new Map());
      }
      const bookChapters = books.get(currentBook);
      if (!bookChapters.has(currentChapter)) {
        bookChapters.set(currentChapter, []);
      }
      bookChapters.get(currentChapter).push({
        number: currentVerse,
        text: currentText.join(' ').trim()
      });
    }
    currentText = [];
  }

  function saveChapterSummary() {
    if (currentBook && currentChapter !== null && chapterSummary.length > 0) {
      const key = `${currentBook}:${currentChapter}`;
      chapterSummaries.set(key, chapterSummary.join(' ').trim());
    }
    chapterSummary = [];
    inChapterSummary = false;
  }

  function saveBookIntro() {
    if (currentBookTitle && bookIntro.length > 0) {
      bookIntros.set(currentBookTitle, bookIntro.join(' ').trim());
    }
    bookIntro = [];
    inBookIntro = false;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for book title (all caps headers like "THE BOOK OF GENESIS")
    if (bookTitlePattern.test(trimmed) && trimmed === trimmed.toUpperCase()) {
      saveBookIntro();
      currentBookTitle = trimmed;
      inBookIntro = true;
      continue;
    }

    // Check for chapter header
    const chapterMatch = trimmed.match(chapterPattern);
    if (chapterMatch) {
      saveCurrentVerse();
      saveChapterSummary();
      saveBookIntro();
      currentBook = chapterMatch[1];
      currentChapter = parseInt(chapterMatch[2], 10);
      currentVerse = null;
      inChapterSummary = true;
      continue;
    }

    // Check for verse start
    const verseMatch = trimmed.match(versePattern);
    if (verseMatch && currentBook) {
      if (inChapterSummary) {
        saveChapterSummary();
      }
      saveCurrentVerse();
      const verseChapter = parseInt(verseMatch[1], 10);
      currentVerse = parseInt(verseMatch[2], 10);
      if (verseChapter !== currentChapter) {
        currentChapter = verseChapter;
      }
      currentText = [verseMatch[3]];
      continue;
    }

    // Capture book intro (text between book title and first chapter)
    if (inBookIntro && trimmed && !trimmed.match(/^[A-Z][a-z]+\.\.\.\./)) {
      bookIntro.push(trimmed);
      continue;
    }

    // Capture chapter summary (text between chapter header and first verse)
    if (inChapterSummary && trimmed && !trimmed.match(/^[A-Z][a-z]+\.\.\.\./)) {
      chapterSummary.push(trimmed);
      continue;
    }

    // Continue current verse (skip commentary-like lines)
    if (currentVerse && trimmed && !trimmed.match(/^[A-Z][a-z]+\.\.\.\./)) {
      currentText.push(trimmed);
    }
  }

  // Save last verse
  saveCurrentVerse();

  return { books, chapterSummaries, bookIntros };
}

/**
 * Load all patch files
 */
function loadPatches() {
  const patches = new Map();

  if (!existsSync(PATCHES_DIR)) {
    return patches;
  }

  const files = readdirSync(PATCHES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = join(PATCHES_DIR, file);
    const content = JSON.parse(readFileSync(filePath, 'utf-8'));

    for (const [key, patch] of Object.entries(content)) {
      patches.set(key, patch);
    }
  }

  return patches;
}

/**
 * Normalize book name from DR text to match BOOK_ORDER
 */
function normalizeBookName(drBookName) {
  const normalized = drBookName.toLowerCase().replace(/\s+/g, ' ').trim();

  // Handle special cases - maps DR book names to our book IDs
  const mappings = {
    'genesis': 'genesis',
    'exodus': 'exodus',
    'leviticus': 'leviticus',
    'numbers': 'numbers',
    'deuteronomy': 'deuteronomy',
    'josue': 'josue',
    'judges': 'judges',
    'ruth': 'ruth',
    // DR uses "1 Kings" for 1 Samuel, etc.
    '1 kings': '1-samuel',
    '2 kings': '2-samuel',
    '3 kings': '1-kings',
    '4 kings': '2-kings',
    '1 paralipomenon': '1-chronicles',
    '2 paralipomenon': '2-chronicles',
    '1 esdras': 'ezra',
    '2 esdras': 'nehemiah',
    'tobias': 'tobias',
    'judith': 'judith',
    'esther': 'esther',
    'job': 'job',
    'psalms': 'psalms',
    'proverbs': 'proverbs',
    'ecclesiastes': 'ecclesiastes',
    'canticle of canticles': 'canticles',
    'wisdom': 'wisdom',
    'ecclesiasticus': 'ecclesiasticus',
    'isaias': 'isaias',
    'jeremias': 'jeremias',
    'lamentations': 'lamentations',
    'baruch': 'baruch',
    'ezechiel': 'ezechiel',
    'daniel': 'daniel',
    'osee': 'osee',
    'joel': 'joel',
    'amos': 'amos',
    'abdias': 'abdias',
    'jonas': 'jonas',
    'micheas': 'micheas',
    'nahum': 'nahum',
    'habacuc': 'habacuc',
    'sophonias': 'sophonias',
    'aggeus': 'aggeus',
    'zacharias': 'zacharias',
    'malachias': 'malachias',
    '1 machabees': '1-machabees',
    '2 machabees': '2-machabees',
    // New Testament - DR uses simple names
    'matthew': 'matthew',
    'mark': 'mark',
    'luke': 'luke',
    'john': 'john',
    'acts': 'acts',
    'romans': 'romans',
    '1 corinthians': '1-corinthians',
    '2 corinthians': '2-corinthians',
    'galatians': 'galatians',
    'ephesians': 'ephesians',
    'philippians': 'philippians',
    'colossians': 'colossians',
    '1 thessalonians': '1-thessalonians',
    '2 thessalonians': '2-thessalonians',
    '1 timothy': '1-timothy',
    '2 timothy': '2-timothy',
    'titus': 'titus',
    'philemon': 'philemon',
    'hebrews': 'hebrews',
    'james': 'james',
    '1 peter': '1-peter',
    '2 peter': '2-peter',
    '1 john': '1-john',
    '2 john': '2-john',
    '3 john': '3-john',
    'jude': 'jude',
    'apocalypse': 'apocalypse',
  };

  return mappings[normalized] || null;
}

/**
 * Generate the bible.json data file
 */
// Map book titles to book IDs
const BOOK_TITLE_MAP = {
  'THE BOOK OF GENESIS': 'genesis',
  'THE BOOK OF EXODUS': 'exodus',
  'THE BOOK OF LEVITICUS': 'leviticus',
  'THE BOOK OF NUMBERS': 'numbers',
  'THE BOOK OF DEUTERONOMY': 'deuteronomy',
  'THE BOOK OF JOSUE': 'josue',
  'THE BOOK OF JUDGES': 'judges',
  'THE BOOK OF RUTH': 'ruth',
  'THE FIRST BOOK OF SAMUEL, OTHERWISE CALLED THE FIRST BOOK OF KINGS': '1-samuel',
  'THE SECOND BOOK OF SAMUEL, OTHERWISE CALLED THE SECOND BOOK OF KINGS': '2-samuel',
  'THE THIRD BOOK OF KINGS': '1-kings',
  'THE FOURTH BOOK OF KINGS': '2-kings',
  'THE FIRST BOOK OF PARALIPOMENON': '1-chronicles',
  'THE SECOND BOOK OF PARALIPOMENON': '2-chronicles',
  'THE FIRST BOOK OF ESDRAS': 'ezra',
  'THE BOOK OF NEHEMIAS, WHICH IS CALLED THE SECOND OF ESDRAS': 'nehemiah',
  'THE BOOK OF TOBIAS': 'tobias',
  'THE BOOK OF JUDITH': 'judith',
  'THE BOOK OF ESTHER': 'esther',
  'THE BOOK OF JOB': 'job',
  'THE BOOK OF PSALMS': 'psalms',
  'THE BOOK OF PROVERBS': 'proverbs',
  'ECCLESIASTES': 'ecclesiastes',
  "SOLOMON'S CANTICLE OF CANTICLES": 'canticles',
  'THE BOOK OF WISDOM': 'wisdom',
  'ECCLESIASTICUS': 'ecclesiasticus',
  'THE PROPHECY OF ISAIAS': 'isaias',
  'THE PROPHECY OF JEREMIAS': 'jeremias',
  'THE LAMENTATIONS OF JEREMIAS': 'lamentations',
  'THE PROPHECY OF BARUCH': 'baruch',
  'THE PROPHECY OF EZECHIEL': 'ezechiel',
  'THE PROPHECY OF DANIEL': 'daniel',
  'THE PROPHECY OF OSEE': 'osee',
  'THE PROPHECY OF JOEL': 'joel',
  'THE PROPHECY OF AMOS': 'amos',
  'THE PROPHECY OF ABDIAS': 'abdias',
  'THE PROPHECY OF JONAS': 'jonas',
  'THE PROPHECY OF MICHEAS': 'micheas',
  'THE PROPHECY OF NAHUM': 'nahum',
  'THE PROPHECY OF HABACUC': 'habacuc',
  'THE PROPHECY OF SOPHONIAS': 'sophonias',
  'THE PROPHECY OF AGGEUS': 'aggeus',
  'THE PROPHECY OF ZACHARIAS': 'zacharias',
  'THE PROPHECY OF MALACHIAS': 'malachias',
  'THE FIRST BOOK OF MACHABEES': '1-machabees',
  'THE SECOND BOOK OF MACHABEES': '2-machabees',
  'THE HOLY GOSPEL OF JESUS CHRIST ACCORDING TO SAINT MATTHEW': 'matthew',
  'THE HOLY GOSPEL OF JESUS CHRIST ACCORDING TO ST. MARK': 'mark',
  'THE HOLY GOSPEL OF JESUS CHRIST ACCORDING TO ST. LUKE': 'luke',
  'THE HOLY GOSPEL OF JESUS CHRIST ACCORDING TO ST. JOHN': 'john',
  'THE ACTS OF THE APOSTLES': 'acts',
  'THE EPISTLE OF ST. PAUL THE APOSTLE TO THE ROMANS': 'romans',
  'THE FIRST EPISTLE OF ST. PAUL TO THE CORINTHIANS': '1-corinthians',
  'THE SECOND EPISTLE OF ST. PAUL TO THE CORINTHIANS': '2-corinthians',
  'THE EPISTLE OF ST. PAUL TO THE GALATIANS': 'galatians',
  'THE EPISTLE OF ST. PAUL TO THE EPHESIANS': 'ephesians',
  'THE EPISTLE OF ST. PAUL TO THE PHILIPPIANS': 'philippians',
  'THE EPISTLE OF ST. PAUL TO THE COLOSSIANS': 'colossians',
  'THE FIRST EPISTLE OF ST. PAUL TO THE THESSALONIANS': '1-thessalonians',
  'THE SECOND EPISTLE OF ST. PAUL TO THE THESSALONIANS': '2-thessalonians',
  'THE FIRST EPISTLE OF ST. PAUL TO TIMOTHY': '1-timothy',
  'THE SECOND EPISTLE OF ST. PAUL TO TIMOTHY': '2-timothy',
  'THE EPISTLE OF ST. PAUL TO TITUS': 'titus',
  'THE EPISTLE OF ST. PAUL TO PHILEMON': 'philemon',
  'THE EPISTLE OF ST. PAUL TO THE HEBREWS': 'hebrews',
  'THE CATHOLIC EPISTLE OF ST. JAMES THE APOSTLE': 'james',
  'THE FIRST EPISTLE OF ST. PETER THE APOSTLE': '1-peter',
  'THE SECOND EPISTLE OF ST. PETER THE APOSTLE': '2-peter',
  'THE FIRST EPISTLE OF ST. JOHN THE APOSTLE': '1-john',
  'THE SECOND EPISTLE OF ST. JOHN THE APOSTLE': '2-john',
  'THE THIRD EPISTLE OF ST. JOHN THE APOSTLE': '3-john',
  'THE CATHOLIC EPISTLE OF ST. JUDE': 'jude',
  'THE APOCALYPSE OF ST. JOHN THE APOSTLE': 'apocalypse',
};

function generate() {
  console.log('Parsing Douay-Rheims text...');
  const { books: drBooks, chapterSummaries, bookIntros } = parseDouayRheims();

  console.log('Loading patches...');
  const patches = loadPatches();
  console.log(`  Found ${patches.size} patches`);
  console.log(`  Found ${chapterSummaries.size} chapter summaries`);
  console.log(`  Found ${bookIntros.size} book introductions`);

  console.log('Building structured data...');
  const books = [];

  for (const bookMeta of BOOK_ORDER) {
    // Find the DR book data
    let drBookData = null;
    let drBookName = null;
    for (const [drName, chapters] of drBooks) {
      const normalizedId = normalizeBookName(drName);
      if (normalizedId === bookMeta.id) {
        drBookData = chapters;
        drBookName = drName;
        break;
      }
    }

    if (!drBookData) {
      console.log(`  Warning: No data found for ${bookMeta.name}`);
      continue;
    }

    const chapters = [];
    const sortedChapters = Array.from(drBookData.keys()).sort((a, b) => a - b);

    let bookEditCount = 0;
    let bookFootnoteCount = 0;

    for (const chapterNum of sortedChapters) {
      const drVerses = drBookData.get(chapterNum);
      const verses = [];
      let chapterEditCount = 0;
      let chapterFootnoteCount = 0;

      for (const drVerse of drVerses.sort((a, b) => a.number - b.number)) {
        const patchKey = `${bookMeta.abbrev}:${chapterNum}:${drVerse.number}`;
        const patch = patches.get(patchKey);

        if (patch) {
          chapterEditCount++;
          chapterFootnoteCount += patch.footnotes?.length || 0;
        }

        verses.push({
          number: drVerse.number,
          text: patch?.text || drVerse.text,
          footnotes: patch?.footnotes || [],
          patched: !!patch
        });
      }

      bookEditCount += chapterEditCount;
      bookFootnoteCount += chapterFootnoteCount;

      // Get chapter summary if available
      const summaryKey = `${drBookName}:${chapterNum}`;
      const summary = chapterSummaries.get(summaryKey) || null;

      chapters.push({
        number: chapterNum,
        summary,
        verses,
        editCount: chapterEditCount,
        footnoteCount: chapterFootnoteCount
      });
    }

    // Find book introduction by matching title to book ID
    // Normalize apostrophes (curly ' U+2019 to straight ' U+0027) for comparison
    const normalizeApostrophe = (s) => s.replace(/[\u2019\u2018]/g, "'");
    let bookIntro = null;
    for (const [title, intro] of bookIntros) {
      const normalizedTitle = normalizeApostrophe(title);
      // Check both the original title and normalized version against the map
      const mapId = BOOK_TITLE_MAP[title] || BOOK_TITLE_MAP[normalizedTitle];
      if (mapId === bookMeta.id) {
        bookIntro = intro;
        break;
      }
    }

    books.push({
      id: bookMeta.id,
      name: bookMeta.name,
      abbrev: bookMeta.abbrev,
      testament: bookMeta.testament,
      introduction: bookIntro,
      chapters,
      editCount: bookEditCount,
      footnoteCount: bookFootnoteCount
    });
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const output = { books };
  const outputPath = join(OUTPUT_DIR, 'bible.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`Generated ${outputPath}`);
  console.log(`  ${books.length} books`);
  console.log(`  ${books.reduce((sum, b) => sum + b.chapters.length, 0)} chapters`);
  console.log(`  ${books.reduce((sum, b) => sum + b.chapters.reduce((s, c) => s + c.verses.length, 0), 0)} verses`);
}

// Run generator
generate();
