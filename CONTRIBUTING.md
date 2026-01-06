# Contributing to Scholastic Bible

Thank you for your interest in contributing to the Scholastic Bible project. This guide will help you get started.

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

The CLI (`bin/bible.js`) provides verse lookup across multiple translations. Improvements to parsing, output formatting, or new features are welcome.

### 4. Add Source Texts

Source texts live in `texts/` with parsers in `lib/parsers/`. If you have expertise in adding or correcting source texts (Vulgate, Septuagint, Hebrew), contributions are appreciated.

## Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your changes (`git checkout -b add-romans-footnotes`)
3. **Make your changes** following the guidelines above
4. **Test locally** - Run `npm run generate && npm run site:dev` to verify
5. **Submit a pull request** with a clear description of your contribution

## Code of Conduct

Contributors are expected to engage respectfully with both the sacred texts and fellow contributors. This is a project rooted in the Catholic intellectual tradition; contributions should reflect that context.

## Questions?

Open an issue or reach out to the maintainer.

---

*Soli Deo gloria*
