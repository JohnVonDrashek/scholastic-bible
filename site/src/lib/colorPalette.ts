/**
 * Color palette for Bible book backgrounds
 * Muted, manuscript-appropriate tones grouped by theme
 */

// Base palette - all colors are muted/earthy to maintain scholastic feel
export const palette = {
  // Warm earth tones
  sepia: '#8b4513',      // Original brown - earth, origins
  burgundy: '#6b2d3a',   // Wine/blood - sacrifice, passion
  amber: '#8b6914',      // Gold - glory, revelation

  // Cool tones
  navy: '#2c4a6e',       // Deep blue - heaven, wisdom, water
  forest: '#2d5a3d',     // Green - life, growth, pastoral
  teal: '#2a5a5a',       // Blue-green - prophecy, vision

  // Neutrals
  slate: '#4a4a5a',      // Gray-purple - mourning, lament
  plum: '#5a3a5a',       // Muted purple - royalty, majesty
} as const;

// Background colors (very subtle tints)
export const backgrounds = {
  warm: '#faf9f7',       // Current warm white
  cool: '#f7f9fa',       // Slight blue tint
  cream: '#faf8f5',      // Warmer cream
  sage: '#f8faf8',       // Hint of green
} as const;

export type PaletteColor = keyof typeof palette;
export type BackgroundColor = keyof typeof backgrounds;

// Thematic color assignments by book
export const bookColors: Record<string, PaletteColor> = {
  // Torah/Pentateuch - earth tones
  'genesis': 'sepia',
  'exodus': 'burgundy',
  'leviticus': 'burgundy',
  'numbers': 'sepia',
  'deuteronomy': 'sepia',

  // Historical books - varied
  'josue': 'forest',
  'judges': 'slate',
  'ruth': 'forest',
  '1-samuel': 'plum',
  '2-samuel': 'plum',
  '1-kings': 'plum',
  '2-kings': 'plum',
  '1-chronicles': 'plum',
  '2-chronicles': 'plum',
  'ezra': 'teal',
  'nehemiah': 'teal',
  'tobias': 'forest',
  'judith': 'burgundy',
  'esther': 'plum',
  '1-machabees': 'burgundy',
  '2-machabees': 'burgundy',

  // Wisdom literature - deep blue
  'job': 'slate',
  'psalms': 'navy',
  'proverbs': 'navy',
  'ecclesiastes': 'slate',
  'canticles': 'burgundy',
  'wisdom': 'navy',
  'ecclesiasticus': 'navy',

  // Prophets - teal/vision
  'isaias': 'teal',
  'jeremias': 'teal',
  'lamentations': 'slate',
  'baruch': 'teal',
  'ezechiel': 'teal',
  'daniel': 'amber',
  'osee': 'teal',
  'joel': 'teal',
  'amos': 'teal',
  'abdias': 'teal',
  'jonas': 'navy',
  'micheas': 'teal',
  'nahum': 'teal',
  'habacuc': 'teal',
  'sophonias': 'teal',
  'aggeus': 'teal',
  'zacharias': 'teal',
  'malachias': 'teal',

  // Gospels - burgundy (passion)
  'matthew': 'burgundy',
  'mark': 'burgundy',
  'luke': 'burgundy',
  'john': 'navy',

  // Acts & Epistles - varied
  'acts': 'forest',
  'romans': 'navy',
  '1-corinthians': 'navy',
  '2-corinthians': 'navy',
  'galatians': 'forest',
  'ephesians': 'navy',
  'philippians': 'forest',
  'colossians': 'navy',
  '1-thessalonians': 'teal',
  '2-thessalonians': 'teal',
  '1-timothy': 'forest',
  '2-timothy': 'forest',
  'titus': 'forest',
  'philemon': 'forest',
  'hebrews': 'burgundy',
  'james': 'forest',
  '1-peter': 'navy',
  '2-peter': 'navy',
  '1-john': 'navy',
  '2-john': 'navy',
  '3-john': 'navy',
  'jude': 'slate',

  // Apocalypse - golden glory
  'apocalypse': 'amber',
};

// Get color hex for a book
export function getBookColor(bookId: string): string {
  const colorName = bookColors[bookId] || 'sepia';
  return palette[colorName];
}

// Get a subtle background tint based on the book's color family
export function getBookBackground(bookId: string): string {
  const colorName = bookColors[bookId] || 'sepia';
  switch (colorName) {
    case 'navy':
    case 'teal':
    case 'slate':
      return backgrounds.cool;
    case 'forest':
      return backgrounds.sage;
    case 'burgundy':
    case 'plum':
    case 'amber':
      return backgrounds.cream;
    default:
      return backgrounds.warm;
  }
}
