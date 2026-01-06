/**
 * Custom SVG patterns for Bible books
 * More expressive, thematic patterns than generic geometric ones
 */

const PATTERN_COLOR = '#8b4513';
const PATTERN_OPACITY = 0.08;

function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg);
  return `url("data:image/svg+xml,${encoded}")`;
}

/**
 * Genesis - Radiating light rays (Let there be light)
 * Starburst pattern emanating from center points
 */
export function genesisPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1">
      <!-- Central starburst -->
      <circle cx="50" cy="50" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <line x1="50" y1="50" x2="50" y2="20"/>
      <line x1="50" y1="50" x2="71" y2="29"/>
      <line x1="50" y1="50" x2="80" y2="50"/>
      <line x1="50" y1="50" x2="71" y2="71"/>
      <line x1="50" y1="50" x2="50" y2="80"/>
      <line x1="50" y1="50" x2="29" y2="71"/>
      <line x1="50" y1="50" x2="20" y2="50"/>
      <line x1="50" y1="50" x2="29" y2="29"/>
      <!-- Corner starbursts (partial, for tiling) -->
      <circle cx="0" cy="0" r="2" fill="${color}" fill-opacity="${opacity}"/>
      <line x1="0" y1="0" x2="15" y2="0"/>
      <line x1="0" y1="0" x2="0" y2="15"/>
      <line x1="0" y1="0" x2="11" y2="11"/>
      <circle cx="100" cy="0" r="2" fill="${color}" fill-opacity="${opacity}"/>
      <line x1="100" y1="0" x2="85" y2="0"/>
      <line x1="100" y1="0" x2="100" y2="15"/>
      <line x1="100" y1="0" x2="89" y2="11"/>
      <circle cx="0" cy="100" r="2" fill="${color}" fill-opacity="${opacity}"/>
      <line x1="0" y1="100" x2="15" y2="100"/>
      <line x1="0" y1="100" x2="0" y2="85"/>
      <line x1="0" y1="100" x2="11" y2="89"/>
      <circle cx="100" cy="100" r="2" fill="${color}" fill-opacity="${opacity}"/>
      <line x1="100" y1="100" x2="85" y2="100"/>
      <line x1="100" y1="100" x2="100" y2="85"/>
      <line x1="100" y1="100" x2="89" y2="89"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Psalms - Harp strings with musical flow
 * Vertical strings with gentle wave motion
 */
export function psalmsPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 80 100">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1">
      <!-- Harp strings - gentle curves -->
      <path d="M10,0 Q15,50 10,100"/>
      <path d="M25,0 Q20,50 25,100"/>
      <path d="M40,0 Q45,50 40,100"/>
      <path d="M55,0 Q50,50 55,100"/>
      <path d="M70,0 Q75,50 70,100"/>
      <!-- Musical notes suggestion -->
      <circle cx="15" cy="30" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="45" cy="60" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="65" cy="40" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="35" cy="80" r="3" fill="${color}" fill-opacity="${opacity}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Gospels - Vine and branches (I am the vine)
 * Organic flowing vine pattern
 */
export function gospelPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.5">
      <!-- Main vine -->
      <path d="M0,60 Q30,40 60,60 Q90,80 120,60"/>
      <!-- Branches -->
      <path d="M30,52 Q35,35 50,30"/>
      <path d="M90,68 Q85,85 70,90"/>
      <!-- Leaves -->
      <ellipse cx="50" cy="30" rx="8" ry="5" transform="rotate(-30 50 30)" fill="${color}" fill-opacity="${opacity * 0.5}"/>
      <ellipse cx="70" cy="90" rx="8" ry="5" transform="rotate(30 70 90)" fill="${color}" fill-opacity="${opacity * 0.5}"/>
      <!-- Small grapes/berries cluster -->
      <circle cx="25" cy="70" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="30" cy="75" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="22" cy="77" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="95" cy="45" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="100" cy="50" r="3" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="92" cy="52" r="3" fill="${color}" fill-opacity="${opacity}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Apocalypse - Scattered stars and embers
 * Continuous celestial field with rising sparks
 */
export function apocalypsePattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <g fill="${color}" fill-opacity="${opacity}">
      <!-- Scattered stars of varying sizes -->
      <polygon points="15,10 16,13 19,13 17,15 18,18 15,16 12,18 13,15 11,13 14,13" />
      <polygon points="75,5 76,8 79,8 77,10 78,13 75,11 72,13 73,10 71,8 74,8" />
      <polygon points="45,25 46,27 48,27 47,28 47,30 45,29 43,30 43,28 42,27 44,27" />
      <polygon points="85,35 86,38 89,38 87,40 88,43 85,41 82,43 83,40 81,38 84,38" />
      <polygon points="25,50 26,52 28,52 27,53 27,55 25,54 23,55 23,53 22,52 24,52" />
      <polygon points="60,55 61,57 63,57 62,58 62,60 60,59 58,60 58,58 57,57 59,57" />
      <polygon points="10,75 11,78 14,78 12,80 13,83 10,81 7,83 8,80 6,78 9,78" />
      <polygon points="50,80 51,82 53,82 52,83 52,85 50,84 48,85 48,83 47,82 49,82" />
      <polygon points="90,70 91,72 93,72 92,73 92,75 90,74 88,75 88,73 87,72 89,72" />
      <!-- Rising ember/flame wisps -->
      <path d="M35,95 Q33,88 35,82 Q37,88 35,95" />
      <path d="M70,100 Q68,93 70,87 Q72,93 70,100" />
      <path d="M20,100 Q19,96 20,92 Q21,96 20,100" />
      <path d="M55,98 Q54,94 55,90 Q56,94 55,98" />
      <path d="M85,95 Q84,91 85,87 Q86,91 85,95" />
      <!-- Edge stars for seamless tiling -->
      <polygon points="0,40 1,42 3,42 2,43 2,45 0,44 -2,45 -2,43 -3,42 -1,42" />
      <polygon points="100,60 101,62 103,62 102,63 102,65 100,64 98,65 98,63 97,62 99,62" />
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Exodus - Parting waves
 * Waters divided, path through the sea
 */
export function exodusPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.5">
      <!-- Parted waves - left side -->
      <path d="M0,20 Q10,15 20,20 Q30,25 35,35"/>
      <path d="M0,35 Q10,30 20,35 Q30,40 35,50"/>
      <path d="M0,50 Q10,45 20,50 Q30,55 35,65"/>
      <!-- Parted waves - right side -->
      <path d="M100,20 Q90,15 80,20 Q70,25 65,35"/>
      <path d="M100,35 Q90,30 80,35 Q70,40 65,50"/>
      <path d="M100,50 Q90,45 80,50 Q70,55 65,65"/>
      <!-- Path through (subtle) -->
      <line x1="50" y1="0" x2="50" y2="80" stroke-dasharray="4,4" stroke-opacity="${opacity * 0.5}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Wisdom books - Scroll and quill
 * Ancient learning motif
 */
export function wisdomPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1">
      <!-- Scroll -->
      <path d="M20,20 L20,70 Q20,80 30,80 L70,80 Q80,80 80,70 L80,30"/>
      <ellipse cx="80" cy="25" rx="5" ry="10"/>
      <ellipse cx="20" cy="75" rx="5" ry="8" fill="${color}" fill-opacity="${opacity * 0.3}"/>
      <!-- Text lines on scroll -->
      <line x1="30" y1="35" x2="65" y2="35" stroke-opacity="${opacity * 0.5}"/>
      <line x1="30" y1="45" x2="60" y2="45" stroke-opacity="${opacity * 0.5}"/>
      <line x1="30" y1="55" x2="55" y2="55" stroke-opacity="${opacity * 0.5}"/>
      <line x1="30" y1="65" x2="50" y2="65" stroke-opacity="${opacity * 0.5}"/>
      <!-- Quill -->
      <path d="M85,90 Q75,60 90,40" stroke-width="2"/>
      <path d="M90,40 L95,35 L92,42 Z" fill="${color}" fill-opacity="${opacity}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Prophets - Eye and flame (visionary)
 * Watchful, prophetic imagery
 */
export function prophetPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.5">
      <!-- All-seeing eye -->
      <ellipse cx="50" cy="40" rx="25" ry="15"/>
      <circle cx="50" cy="40" r="8" fill="${color}" fill-opacity="${opacity}"/>
      <circle cx="50" cy="40" r="3" fill="none"/>
      <!-- Rays above -->
      <line x1="50" y1="15" x2="50" y2="5"/>
      <line x1="35" y1="20" x2="28" y2="12"/>
      <line x1="65" y1="20" x2="72" y2="12"/>
      <!-- Flame below (prophetic fire) -->
      <path d="M50,65 Q42,75 50,90 Q58,75 50,65"/>
      <path d="M50,70 Q46,78 50,85 Q54,78 50,70" fill="${color}" fill-opacity="${opacity * 0.5}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Lamentations - Tears falling
 * Sorrow and weeping
 */
export function lamentationsPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80">
    <g fill="${color}" fill-opacity="${opacity}">
      <!-- Teardrops at various positions -->
      <path d="M15,20 Q15,12 12,8 Q15,12 18,8 Q15,12 15,20 Z"/>
      <path d="M45,35 Q45,27 42,23 Q45,27 48,23 Q45,27 45,35 Z"/>
      <path d="M25,55 Q25,47 22,43 Q25,47 28,43 Q25,47 25,55 Z"/>
      <path d="M50,70 Q50,62 47,58 Q50,62 53,58 Q50,62 50,70 Z"/>
      <path d="M10,75 Q10,67 7,63 Q10,67 13,63 Q10,67 10,75 Z"/>
      <path d="M35,10 Q35,2 32,-2 Q35,2 38,-2 Q35,2 35,10 Z"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Ruth - Wheat sheaves
 * Harvest, gleaning
 */
export function ruthPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 80 100">
    <g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1">
      <!-- Wheat stalk 1 -->
      <line x1="20" y1="100" x2="25" y2="40"/>
      <ellipse cx="25" cy="35" rx="3" ry="6" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="22" cy="42" rx="3" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="28" cy="42" rx="3" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="25" cy="28" rx="2" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <!-- Wheat stalk 2 -->
      <line x1="50" y1="100" x2="55" y2="50"/>
      <ellipse cx="55" cy="45" rx="3" ry="6" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="52" cy="52" rx="3" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="58" cy="52" rx="3" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <ellipse cx="55" cy="38" rx="2" ry="5" fill="${color}" fill-opacity="${opacity}"/>
      <!-- Wheat stalk 3 (partial for tiling) -->
      <line x1="75" y1="100" x2="78" y2="60"/>
      <ellipse cx="78" cy="55" rx="3" ry="6" fill="${color}" fill-opacity="${opacity}"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

/**
 * Job - Scattered rain and wind
 * Continuous storm texture - trials, whirlwind
 */
export function jobPattern(color = PATTERN_COLOR, opacity = PATTERN_OPACITY): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <g stroke="${color}" stroke-opacity="${opacity}" fill="none">
      <!-- Diagonal rain lines scattered across -->
      <line x1="10" y1="0" x2="0" y2="20" stroke-width="1"/>
      <line x1="30" y1="0" x2="20" y2="20" stroke-width="1"/>
      <line x1="55" y1="0" x2="45" y2="20" stroke-width="1"/>
      <line x1="75" y1="0" x2="65" y2="20" stroke-width="1"/>
      <line x1="20" y1="25" x2="10" y2="45" stroke-width="1"/>
      <line x1="45" y1="20" x2="35" y2="40" stroke-width="1"/>
      <line x1="70" y1="25" x2="60" y2="45" stroke-width="1"/>
      <line x1="5" y1="50" x2="-5" y2="70" stroke-width="1"/>
      <line x1="35" y1="50" x2="25" y2="70" stroke-width="1"/>
      <line x1="60" y1="55" x2="50" y2="75" stroke-width="1"/>
      <line x1="80" y1="50" x2="70" y2="70" stroke-width="1"/>
      <line x1="15" y1="70" x2="5" y2="90" stroke-width="1"/>
      <line x1="50" y1="75" x2="40" y2="95" stroke-width="1"/>
      <line x1="75" y1="70" x2="65" y2="90" stroke-width="1"/>
      <!-- Small lightning fragments -->
      <path d="M25,30 L22,38 L26,38 L20,48" stroke-width="1.5"/>
      <path d="M65,60 L62,68 L66,68 L60,78" stroke-width="1.5"/>
    </g>
  </svg>`;
  return svgToDataUrl(svg);
}

// Export all custom patterns
export const customPatterns = {
  genesis: genesisPattern,
  exodus: exodusPattern,
  ruth: ruthPattern,
  job: jobPattern,
  psalms: psalmsPattern,
  proverbs: wisdomPattern,
  ecclesiastes: wisdomPattern,
  wisdom: wisdomPattern,
  ecclesiasticus: wisdomPattern,
  canticles: gospelPattern, // vine imagery fits Song of Songs
  lamentations: lamentationsPattern,
  isaias: prophetPattern,
  jeremias: prophetPattern,
  ezechiel: prophetPattern,
  daniel: apocalypsePattern,
  matthew: gospelPattern,
  mark: gospelPattern,
  luke: gospelPattern,
  john: gospelPattern,
  apocalypse: apocalypsePattern,
};
