# Contributing to Scholastic Bible

First off, **thank you** for considering contributing! I truly believe in open source and the power of community collaboration. Unlike many repositories, I actively welcome contributions of all kinds - from bug fixes to new features.

## My Promise to Contributors

- **I will respond to every PR and issue** - I guarantee feedback on all contributions
- **Bug fixes are obvious accepts** - If it fixes a bug, it's getting merged
- **New features are welcome** - I'm genuinely open to new ideas and enhancements
- **Direct line of communication** - If I'm not responding to a PR or issue, email me directly at johnvondrashek@gmail.com

## Project Vision

This project aims to make explicit the theological realities present in Scripture through careful attention to grammatical function and scholastic clarification. Contributions should:

- Respect the integrity of the biblical text
- Draw on patristic and scholastic sources
- Illuminate rather than obscure the original meaning
- Avoid anachronistic language while clarifying theological substance

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/JohnVonDrashek/scholastic-bible.git
cd scholastic-bible

# Install dependencies
npm install
cd site && npm install && cd ..

# Install CLI globally (optional)
npm link

# Generate bible.json and run dev server
npm run generate
npm run site:dev
```

The site will be available at `http://localhost:4321`.

## Ways to Contribute

### 1. Add Scholastic Commentary (Patches)

The primary way to contribute is by adding footnotes and annotations to Scripture passages. Patches are JSON files in the `patches/` directory.

#### Patch File Format

Each patch file is named after the book (using Douay-Rheims names) and contains verse-keyed annotations:

```json
{
  "Gen:1:1": {
    "footnotes": [
      "Hebrew 'shamayim' is plural, emphasizing the totality of the created cosmos."
    ]
  },
  "Gen:3:15": {
    "text": "Optional: replacement text for the verse",
    "footnotes": [
      "The Protoevangelium: the earliest prophecy of the Redeemer and His Mother.",
      "St. Irenaeus, Adv. Haer. III.22.4: 'The knot of Eve's disobedience was loosed by Mary's obedience.'"
    ]
  }
}
```

#### Verse Reference Format

Use the format `Book:Chapter:Verse`:
- `Gen:1:1` - Genesis 1:1
- `1Cor:11:24` - 1 Corinthians 11:24
- `Apoc:12:1` - Apocalypse (Revelation) 12:1

#### Book Names

Use Douay-Rheims book names:

| Douay-Rheims | Modern Name |
|--------------|-------------|
| Josue | Joshua |
| Tobias | Tobit |
| Isaias | Isaiah |
| Jeremias | Jeremiah |
| 1 Machabees | 1 Maccabees |
| 2 Machabees | 2 Maccabees |
| Apocalypse | Revelation |

#### Guidelines for Footnotes

1. **Cite sources** - Reference Church Fathers, Councils, or scholastic theologians
2. **Be concise** - Each footnote should make one clear point
3. **Show the connection** - Explain how the original language or context supports the theological reading
4. **Avoid polemics** - Focus on positive exposition, not controversy
5. **Use Latin/Greek sparingly** - Include original terms when they illuminate meaning, with translation

Good footnote examples:
- "The Greek 'ekklesia' (assembly) here carries the sense of a called-out community with authority to bind and loose."
- "Cf. Council of Trent, Session VI, Canon 9, on the necessity of grace for justification."
- "St. Thomas, ST III, q. 73, a. 3: The Eucharist is the 'consummation of the spiritual life.'"

### 2. Improve the Site

The website is built with [Astro](https://astro.build/). Source files are in `site/src/`:

- `pages/` - Page routes
- `components/` - Reusable Astro components
- `layouts/` - Page layouts

```bash
# Run development server
npm run site:dev

# Build for production
npm run site:build
```

### 3. Enhance the CLI

The CLI (`bin/bible.js`) provides verse lookup across multiple translations (Douay-Rheims, Latin Vulgate, Greek Septuagint, Hebrew Masoretic). Improvements to parsing, output formatting, or new features are welcome.

### 4. Add Source Texts

Source texts live in `texts/` with parsers in `lib/parsers/`. If you have expertise in adding or correcting source texts (Vulgate, Septuagint, Hebrew), contributions are appreciated.

## Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your changes (`git checkout -b add-romans-footnotes`)
3. **Make your changes** following the guidelines above
4. **Test locally** - Run `npm run generate && npm run site:dev` to verify
5. **Submit a pull request** with a clear description of your contribution

## Code of Conduct

This project follows the [Rule of St. Benedict](CODE_OF_CONDUCT.md) as its code of conduct.

## Questions?

- Open an issue
- Email: johnvondrashek@gmail.com

---

*Soli Deo gloria*
