---
name: gemini-illustrations
description: Generate consistent medieval manuscript-style illustrations for the Scholastic Bible using Gemini Imagen. Use when creating images, illustrations, artwork, or visuals for Bible pages, parables, book headers, chapter art, or any visual content for the site.
---

# Gemini Illustrations for Scholastic Bible

Generate beautiful, consistent medieval illuminated manuscript-style artwork for the Scholastic Bible project using Google's Imagen model.

## When to Use This Skill

- Creating header images for book or chapter pages
- Illustrating parables, miracles, or biblical narratives
- Generating decorative elements (borders, initials, flourishes)
- Any visual content needed for the Bible site

## Quick Start

1. **Read the source content first** (REQUIRED):
   - For book images: Read the book's introduction from `site/src/data/bible.json`
   - For chapter images: Read the chapter's summary from `site/src/data/bible.json`
   - Use this context to inform what scene/imagery to depict
2. Read the style guide: `cat .claude/skills/gemini-illustrations/style-guide.md`
3. Craft a prompt that reflects the actual content/themes from step 1
4. Run the generation script with your prompt

## Reading Source Content

**IMPORTANT: Always read the actual Bible content before generating images.**

### For Book Headers

```bash
# Extract book introduction from bible.json
node -e "const b = require('./site/src/data/bible.json'); const book = b.books.find(x => x.id === 'BOOK_ID'); console.log('Introduction:', book.introduction);"
```

Or read the full bible.json and find the book's `introduction` field.

### For Chapter Images

```bash
# Extract chapter summary from bible.json
node -e "const b = require('./site/src/data/bible.json'); const book = b.books.find(x => x.id === 'BOOK_ID'); const ch = book.chapters.find(c => c.number === CHAPTER_NUM); console.log('Summary:', ch.summary);"
```

Or read the full bible.json and find the chapter's `summary` field.

### Why This Matters

The introductions and summaries contain:
- Key themes and events covered
- Important figures mentioned
- Theological context
- Specific imagery references (e.g., "the burning bush", "the flood")

This ensures generated images actually reflect the content rather than generic biblical imagery.

## Generation Script

Use `lib/generate-image.js` to generate images:

```bash
# Generate with custom prompt and output path
PROMPT="Your prompt here" OUTPUT="site/public/images/my-image.png" node lib/generate-image.js
```

Environment variables:
- `PROMPT` - The image generation prompt (required if not using default)
- `OUTPUT` - Output file path (default: `site/public/header.png`)
- `ASPECT` - Aspect ratio: "1:1", "3:4", "4:3", "9:16", "16:9" (default: "16:9")

## Prompt Construction

Always include these elements in order:

1. **Subject**: What is being depicted (biblical scene, symbol, figure)
2. **Style anchor**: "Medieval illuminated manuscript style" or "Book of Kells style"
3. **Visual elements**: From the style guide (gold leaf, Celtic knotwork, aged parchment)
4. **Color palette**: Burgundy, gold, cream, oak tones
5. **Composition note**: "wide banner format" or "square vignette" etc.
6. **Exclusions**: "no modern elements, no text, no labels, no words, no lettering"

**IMPORTANT: Always exclude text from images.** Imagen is unreliable at spelling and lettering. Even requests for labels, names, or decorative text often produce gibberish or misspelled words. Use purely visual storytelling instead.

## Example Prompts

### Book Header (Genesis)
```
Creation of the world with light separating from darkness, medieval illuminated manuscript style.
Features: ornate golden Celtic knotwork border, divine light rays in gold leaf, swirling cosmos.
Colors: deep midnight blue, brilliant gold, cream highlights.
Composition: wide banner format. No text, no labels, no words, no lettering.
```

### Parable Illustration (Prodigal Son)
```
The return of the prodigal son embraced by his father, medieval illuminated manuscript style.
Features: Byzantine-influenced figures with gold halos, pastoral background, ornate border.
Colors: rich burgundy robes, gold leaf accents, earth tones.
Composition: square vignette with decorative corner flourishes. No text, no labels, no words.
```

### Chapter Decoration
```
Decorative illuminated border frame with empty center, medieval manuscript style.
Features: intricate Celtic interlace patterns, vine scrollwork, small symbolic animals in corners.
Colors: deep burgundy, forest green, burnished gold, aged parchment background.
Composition: square format, suitable as decorative element. No text, no letters, no writing.
```

## File Organization

Save generated images to:
- `site/public/images/books/` - Book header images (named `{book-id}.png`, e.g., `genesis.png`)
- `site/public/images/chapters/` - Chapter illustrations
- `site/public/images/parables/` - Parable and narrative scenes
- `site/public/images/decorative/` - Borders, initials, flourishes

## Integration with Site

**IMPORTANT: After generating an image, you MUST integrate it into the site.**

### Book Header Images

Book pages automatically display header images if they exist at `site/public/images/books/{book-id}.png`.

The `[book]/index.astro` template checks for the image and renders a hero section:
- Image displays as a full-width banner with gradient overlay
- Book title overlays the image
- Falls back gracefully if no image exists

**Naming convention**: Use the book's URL ID (e.g., `genesis.png`, `1-corinthians.png`, `acts.png`)

### Chapter Images

Chapter pages automatically display header images if they exist at `site/public/images/chapters/{book-id}-{chapter}.png`.

The `[book]/[chapter].astro` template checks for the image and renders a hero section:
- Image displays as a full-width banner with gradient overlay
- Chapter title overlays the image
- Falls back gracefully if no image exists

**Naming convention**: Use `{book-id}-{chapter-number}.png` (e.g., `philemon-1.png`, `genesis-3.png`, `psalms-23.png`)

### Manual Integration

If adding images to other pages, use this pattern:
```astro
<img src={`${import.meta.env.BASE_URL}images/books/genesis.png`} alt="Genesis" />
```

### Integration Checklist

After generating an image:
- [ ] Verify image saved to correct path
- [ ] Confirm filename matches expected pattern ({book-id}.png)
- [ ] Test page loads image correctly (run dev server)
- [ ] Check image displays properly with overlay text readable

## Style Consistency Checklist

Before generating, verify your prompt includes:
- [ ] Medieval/manuscript style anchor phrase
- [ ] At least 2-3 visual elements from style guide
- [ ] Appropriate color palette
- [ ] **Text exclusion phrase** (e.g., "no text, no labels, no words, no lettering")
- [ ] Correct aspect ratio for intended use

**Text Warning:** Never request text, labels, names, banners, scrolls with writing, or any lettering. Imagen produces unreliable spelling and gibberish. Convey meaning through imagery alone.

See `style-guide.md` for complete visual reference.
