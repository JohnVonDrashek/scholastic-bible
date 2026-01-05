# Scholastic Bible

A study-oriented Bible translation based on the Douay-Rheims text with scholastic commentary and annotations.

## Project Structure

```
scholastic-bible/
├── texts/                 # Source Bible texts (DR, Vulgate, LXX, Hebrew)
├── patches/               # JSON patches for verse modifications & footnotes
├── lib/
│   ├── generator.js       # Parses DR + patches → bible.json
│   ├── books.js           # Book name mappings for CLI
│   ├── index.js           # CLI lookup orchestrator
│   └── parsers/           # Text parsers for each translation
├── bin/bible.js           # CLI entry point
├── site/                  # Astro static site
│   ├── src/
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── pages/
│   │   └── data/          # Generated bible.json (gitignored)
│   └── astro.config.mjs
└── output/                # Built static site (gitignored)
```

## Commands

```bash
# CLI lookup
npm link                    # Install CLI globally
bible dr Genesis 1 1        # Lookup verse
bible vulgate Gen 1 1-5     # Lookup verse range

# Site generation
npm run generate            # Generate bible.json from DR + patches
npm run site:dev            # Run dev server (localhost:4321)
npm run site:build          # Build static site
npm run build               # Full pipeline (generate + build)
```

## Patch Format

Patches are JSON files in `patches/` keyed by verse reference:

```json
{
  "Gen:1:1": {
    "text": "Optional replacement text",
    "footnotes": [
      "Scholastic commentary note"
    ]
  }
}
```

## Deployment

GitHub Pages auto-deploys on push to `main` via `.github/workflows/deploy.yml`.

Live site: https://johnvondrashek.github.io/scholastic-bible/

## Important Guidelines

- **Do NOT create commits or push to remote without explicit user permission**
- Book IDs use Douay-Rheims names (josue, tobias, isaias, machabees, etc.)
- The site uses `/scholastic-bible/` as the base path for GitHub Pages
