# Bible CLI Design

## Overview

A Node.js CLI tool for looking up verses from the Scholastic Bible source texts.

## Command

```bash
bible <translation> <book> <chapter> [verse|range]
```

## Examples

```bash
bible dr Genesis 1           # Full chapter, Douay-Rheims
bible vulgate Gen 1 1        # Single verse, Latin
bible lxx Genesis 1 1-5      # Verse range, Greek
bible hebrew 1Kings 8 27     # Numbered book, Hebrew
```

## Translation Aliases

| Translation | Aliases |
|-------------|---------|
| Douay-Rheims | `dr`, `douay`, `douay-rheims`, `english` |
| Vulgate | `vulgate`, `vul`, `latin` |
| Septuagint | `lxx`, `septuagint`, `greek` |
| Hebrew | `hebrew`, `heb`, `masoretic` |

## Package Structure

```
scholastic-bible/
├── bin/
│   └── bible.js          # CLI entry point
├── lib/
│   ├── parsers/
│   │   ├── douay-rheims.js
│   │   ├── vulgate.js
│   │   ├── septuagint.js
│   │   └── hebrew.js
│   ├── books.js          # Book name/abbreviation mappings
│   └── index.js          # Main lookup logic
├── texts/                # Source texts
└── package.json
```

## Parsing Logic

### Douay-Rheims (`douay-rheims.txt`)
- Parse chapter headers: `Genesis Chapter 1`
- Parse verses: lines starting with `1:1.` pattern
- Handle multi-line verses by collecting lines until next verse marker
- Skip commentary lines (no verse number prefix)

### Vulgate (`vulgate.tsv`)
- TSV format, simplest to parse
- Columns: Book, Abbrev, Chapter, Section, Verse, Text
- Filter by book + chapter + verse directly

### Septuagint (`01.Genesis.txt` etc.)
- Word-by-word format: `1.1.1 word`
- Group words by verse reference, join with spaces
- Handle Greek Unicode (already UTF-8)

### Hebrew (`gen.org` etc.)
- Org-mode format with `* 1` chapter headers
- Verses as numbered lists: `1. בְּרֵאשִׁית...`
- Preserve cantillation marks and vowel points

## Book Name Handling

Accept multiple forms for books with spaces/numbers:
- `1Kings`, `1-Kings`, `1_Kings`, `"1 Kings"` → 1 Kings
- `SongOfSolomon`, `Song`, `Canticles`, `SoS` → Song of Solomon

Handle Douay-Rheims specific names:
- Paralipomenon → Chronicles
- Josue → Joshua
- Sophonias → Zephaniah
- 3/4 Kings → 1/2 Kings

## Error Handling

- Unknown translation → list available options
- Unknown book → suggest closest match (fuzzy matching)
- Invalid chapter/verse → show available range
- Missing text (e.g., Hebrew for deuterocanonical) → suggest alternatives

## Dependencies

- `commander` — CLI argument parsing
