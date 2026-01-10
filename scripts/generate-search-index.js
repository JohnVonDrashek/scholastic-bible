#!/usr/bin/env node
/**
 * Generate search index for Fuse.js client-side search.
 *
 * Reads bible.json and extracts all searchable content:
 * - Verse text
 * - Footnotes
 * - Challoner commentary
 * - Chapter summaries
 *
 * Output: site/public/search-index.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BIBLE_JSON = path.join(PROJECT_ROOT, 'site', 'src', 'data', 'bible.json');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'site', 'public', 'search-index.json');

function generateSearchIndex() {
  console.log('Loading bible.json...');
  const bible = JSON.parse(fs.readFileSync(BIBLE_JSON, 'utf-8'));

  const verses = [];
  let totalVerses = 0;
  let versesWithFootnotes = 0;
  let versesWithChalloner = 0;
  let chaptersWithSummary = 0;

  for (const book of bible.books) {
    for (const chapter of book.chapters) {
      const hasSummary = chapter.summary && chapter.summary.trim().length > 0;
      if (hasSummary) chaptersWithSummary++;

      for (const verse of chapter.verses) {
        totalVerses++;

        // Extract footnotes as array of strings
        const footnotes = verse.footnotes || [];
        if (footnotes.length > 0) versesWithFootnotes++;

        // Extract Challoner commentary - can be array of {lemma, text} objects
        const challoner = (verse.challoner || []).map(c => {
          if (typeof c === 'string') return c;
          return `${c.lemma}: ${c.text}`;
        });
        if (challoner.length > 0) versesWithChalloner++;

        // Attach chapter summary to verse 1 for searchability
        const summary = verse.number === 1 && hasSummary ? chapter.summary : null;

        verses.push({
          id: `${book.id}-${chapter.number}-${verse.number}`,
          ref: `${book.name} ${chapter.number}:${verse.number}`,
          book: book.id,
          bookName: book.name,
          chapter: chapter.number,
          verse: verse.number,
          text: verse.text,
          footnotes: footnotes.length > 0 ? footnotes : null,
          challoner: challoner.length > 0 ? challoner : null,
          summary: summary
        });
      }
    }
  }

  const index = { verses };

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

  // Write the index
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index));

  const stats = fs.statSync(OUTPUT_PATH);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`Generated search index:`);
  console.log(`  - ${totalVerses} verses`);
  console.log(`  - ${versesWithFootnotes} with footnotes`);
  console.log(`  - ${versesWithChalloner} with Challoner commentary`);
  console.log(`  - ${chaptersWithSummary} chapter summaries`);
  console.log(`  - Output: ${OUTPUT_PATH} (${sizeMB} MB)`);
}

generateSearchIndex();
