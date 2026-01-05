# Scholastic Bible

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-in%20development-orange)
![Sources](https://img.shields.io/badge/sources-Douay--Rheims%20|%20Latin%20|%20Greek%20|%20Hebrew-informational)

A study-oriented translation and commentary that makes explicit the theological realities present in Scripture through careful attention to grammatical function and scholastic clarification.

## Overview

This project explores how certain biblical passages gain clarity when translated with careful attention to grammatical function and later-developed theological distinctions, without introducing anachronistic terminology.

The aim is **not** to rewrite Scripture or insert later dogmatic language, but to make explicit—through clearly marked adverbial or explanatory renderings—meanings already present in the original Greek or Hebrew that modern English often obscures.

## Approach

In the same way that Acts 9:31 can be read as describing the Church existing "according to the whole" (i.e., *catholically*) without using the later technical adjective "Catholic," this project systematically examines other passages where authoritative, sacramental, ecclesiological, or soteriological realities are present in substance before they are named precisely in later theology.

## Sources

- **Douay-Rheims Bible** — Primary English text
- **Latin Vulgate** — Traditional Latin source
- **Greek (Septuagint/NT Greek)** — Original language analysis
- **Hebrew (Masoretic Text)** — Old Testament original language

## Goals

- Respect the integrity of the biblical text
- Demonstrate how doctrinal development clarifies, rather than distorts, the original meaning
- Provide scholastic commentary that illuminates grammatical and theological nuances
- Create a resource for serious biblical and theological study

## Installation

```bash
npm install
```

To use the `bible` command globally:

```bash
npm link
```

## CLI Usage

```bash
bible <translation> <book> <chapter> [verse]
```

### Examples

```bash
bible dr Genesis 1           # Full chapter in Douay-Rheims
bible vulgate Gen 1 1        # Single verse in Latin
bible lxx Genesis 1 1-5      # Verse range in Greek
bible hebrew 1Kings 8 27     # Numbered book in Hebrew
bible heb Psalms 23          # Full psalm in Hebrew
```

### Translation Aliases

| Input | Translation |
|-------|-------------|
| `dr`, `douay`, `english` | Douay-Rheims |
| `vulgate`, `vul`, `latin` | Latin Vulgate |
| `lxx`, `septuagint`, `greek` | Septuagint (Greek OT) |
| `hebrew`, `heb`, `masoretic` | Hebrew Masoretic Text |

### Book Names

Books can be referenced by full name or abbreviation:
- `Genesis` or `Gen`
- `1Kings` or `1Kgs` (no space needed)
- `Psalms` or `Ps`

### Commands

```bash
bible translations    # List all translation aliases
bible books           # List all available books
```

## Project Structure

```
scholastic-bible/
├── README.md
├── package.json
├── bin/
│   └── bible.js         # CLI entry point
├── lib/
│   ├── index.js         # Main lookup orchestrator
│   ├── books.js         # Book name mappings
│   └── parsers/         # Text parsers
│       ├── douay-rheims.js
│       ├── vulgate.js
│       ├── septuagint.js
│       └── hebrew.js
├── texts/               # Source texts
│   ├── douay-rheims/
│   ├── vulgate/
│   ├── septuagint/
│   └── hebrew/
├── commentary/          # Scholastic annotations and clarifications
└── output/              # Generated study Bible with integrated commentary
```

## License

MIT License - see [LICENSE](LICENSE) for details.

---

*Ad maiorem Dei gloriam*
