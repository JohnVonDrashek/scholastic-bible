# Scholastic Bible Site Generator Design

## Overview

A build system that:
1. Reads Douay-Rheims source text
2. Applies JSON patches (replacements + footnotes)
3. Generates an Astro static site with book/chapter navigation

## Patch Format

Patches are stored in `patches/{book}.json`:

```json
{
  "Gen:1:1": {
    "text": "In the beginning God created the heavens and the earth.",
    "footnotes": [
      "Hebrew 'shamayim' is plural, emphasizing the cosmic scope."
    ]
  },
  "Gen:1:26": {
    "text": "And God said: Let us make man to our image and likeness...",
    "footnotes": [
      "The plural 'us' reflects the Trinity present in creation.",
      "Cf. St. Augustine, De Trinitate I.7"
    ]
  }
}
```

- **`text`** — Full verse replacement (if omitted, use original Douay-Rheims)
- **`footnotes`** — Array of notes to display below the verse

## Project Structure

```
scholastic-bible/
├── patches/
│   ├── genesis.json
│   ├── exodus.json
│   └── ...
├── site/                    # Astro project
│   ├── src/
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   └── [book]/
│   │   │       ├── index.astro
│   │   │       └── [chapter].astro
│   │   ├── components/
│   │   │   ├── Verse.astro
│   │   │   ├── Footnotes.astro
│   │   │   ├── Navigation.astro
│   │   │   └── BookList.astro
│   │   └── data/
│   │       └── bible.json   # Generated
│   └── astro.config.mjs
├── lib/
│   └── generator.js         # Builds data for Astro
└── output/                  # Generated static site
```

## Generator Output

`lib/generator.js` produces `site/src/data/bible.json`:

```json
{
  "books": [
    {
      "id": "genesis",
      "name": "Genesis",
      "chapters": [
        {
          "number": 1,
          "verses": [
            {
              "number": 1,
              "text": "In the beginning God created the heavens and the earth.",
              "footnotes": ["Hebrew 'shamayim' is plural..."],
              "patched": true
            },
            {
              "number": 2,
              "text": "And the earth was void and empty...",
              "footnotes": [],
              "patched": false
            }
          ]
        }
      ]
    }
  ]
}
```

## Build Flow

```
npm run generate  →  lib/generator.js reads DR + patches → outputs bible.json
npm run dev       →  Astro dev server for preview
npm run build     →  Astro builds static HTML to output/
```

## Patch Application Logic

1. Parse Douay-Rheims text into structured verses
2. For each verse, check if `patches/{book}.json` has an entry
3. If patch exists: use `patch.text` (or original if omitted), add `patch.footnotes`
4. Mark `patched: true` so the site can optionally style modified verses differently

## URL Structure

```
/                     → Index (all books)
/genesis/             → Genesis book overview (chapter list)
/genesis/1            → Genesis Chapter 1
/genesis/1#v3         → Direct link to verse 3
```

## Styling

- Serif font for scripture text (Georgia or system serif)
- Subtle background tint for patched verses (optional)
- Footnote numbers as superscript, footnotes in smaller text at page bottom
- Mobile-responsive, readable line lengths

## Commands

```bash
npm run generate    # Build bible.json from DR + patches
npm run dev         # Astro dev server for preview
npm run build       # Generate static site to output/
```
