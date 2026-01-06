/**
 * Book patterns - custom expressive patterns with hero-patterns fallback
 */
import * as hero from 'hero-patterns';
import * as custom from './customPatterns';
import { getBookColor } from './colorPalette';

const PATTERN_OPACITY = 0.08;
const DARK_PATTERN_OPACITY = 0.15;

type PatternFn = (color: string, opacity: number) => string;

// Custom patterns for key books (more expressive)
const customPatternMap: Record<string, PatternFn> = {
  'genesis': custom.genesisPattern,
  'exodus': custom.exodusPattern,
  'ruth': custom.ruthPattern,
  'job': custom.jobPattern,
  'psalms': custom.psalmsPattern,
  'proverbs': custom.wisdomPattern,
  'ecclesiastes': custom.wisdomPattern,
  'canticles': custom.gospelPattern,
  'wisdom': custom.wisdomPattern,
  'ecclesiasticus': custom.wisdomPattern,
  'lamentations': custom.lamentationsPattern,
  'isaias': custom.prophetPattern,
  'jeremias': custom.prophetPattern,
  'ezechiel': custom.prophetPattern,
  'daniel': custom.apocalypsePattern,
  'matthew': custom.gospelPattern,
  'mark': custom.gospelPattern,
  'luke': custom.gospelPattern,
  'john': custom.gospelPattern,
  'apocalypse': custom.apocalypsePattern,
};

// Fallback hero-patterns for remaining books
const heroPatternMap: Record<string, PatternFn> = {
  'leviticus': hero.temple,
  'numbers': hero.tinyCheckers,
  'deuteronomy': hero.texture,
  'josue': hero.diagonalStripes,
  'judges': hero.brickWall,
  '1-samuel': hero.signal,
  '2-samuel': hero.architect,
  '1-kings': hero.steelBeams,
  '2-kings': hero.fallingTriangles,
  '1-chronicles': hero.formalInvitation,
  '2-chronicles': hero.formalInvitation,
  'ezra': hero.overlappingCircles,
  'nehemiah': hero.brickWall,
  'tobias': hero.morphingDiamonds,
  'judith': hero.hexagons,
  'esther': hero.flippedDiamonds,
  'baruch': hero.stripes,
  'osee': hero.lips,
  'joel': hero.bamboo,
  'amos': hero.parkayFloor,
  'abdias': hero.volcanoLamp,
  'jonas': hero.bubbles,
  'micheas': hero.wiggle,
  'nahum': hero.stampCollection,
  'habacuc': hero.cage,
  'sophonias': hero.current,
  'aggeus': hero.squares,
  'zacharias': hero.plus,
  'malachias': hero.slantedStars,
  '1-machabees': hero.anchorsAway,
  '2-machabees': hero.anchorsAway,
  'acts': hero.jigsaw,
  'romans': hero.boxes,
  '1-corinthians': hero.pianoMan,
  '2-corinthians': hero.hideout,
  'galatians': hero.cutout,
  'ephesians': hero.intersectingCircles,
  'philippians': hero.happyIntersection,
  'colossians': hero.ticTacToe,
  '1-thessalonians': hero.rails,
  '2-thessalonians': hero.rails,
  '1-timothy': hero.bankNote,
  '2-timothy': hero.bankNote,
  'titus': hero.lisbon,
  'philemon': hero.kiwi,
  'hebrews': hero.temple,
  'james': hero.polkaDots,
  '1-peter': hero.dominos,
  '2-peter': hero.dominos,
  '1-john': hero.circlesAndSquares,
  '2-john': hero.circlesAndSquares,
  '3-john': hero.circlesAndSquares,
  'jude': hero.deathStar,
};

const defaultPattern: PatternFn = hero.topography;

/**
 * Lighten a hex color for dark mode patterns
 */
function lightenColor(hex: string, amount: number = 0.6): string {
  // Parse hex
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Mix with white
  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get a default pattern for non-book pages (home, etc.)
 */
export function getDefaultPattern(): string {
  return defaultPattern('#8b4513', PATTERN_OPACITY);
}

/**
 * Get a default pattern for non-book pages in dark mode
 */
export function getDefaultPatternDark(): string {
  const lightColor = lightenColor('#8b4513', 0.5);
  return defaultPattern(lightColor, DARK_PATTERN_OPACITY);
}

/**
 * Get the CSS background-image value for a book's pattern
 * Prefers custom patterns, falls back to hero-patterns
 */
export function getBookPattern(bookId: string): string {
  const color = getBookColor(bookId);
  const customFn = customPatternMap[bookId];
  if (customFn) {
    return customFn(color, PATTERN_OPACITY);
  }

  const heroFn = heroPatternMap[bookId] || defaultPattern;
  return heroFn(color, PATTERN_OPACITY);
}

/**
 * Get the CSS background-image value for a book's pattern in dark mode
 * Uses lightened colors for visibility on dark backgrounds
 */
export function getBookPatternDark(bookId: string): string {
  const color = getBookColor(bookId);
  const lightColor = lightenColor(color, 0.5);
  const customFn = customPatternMap[bookId];
  if (customFn) {
    return customFn(lightColor, DARK_PATTERN_OPACITY);
  }

  const heroFn = heroPatternMap[bookId] || defaultPattern;
  return heroFn(lightColor, DARK_PATTERN_OPACITY);
}
