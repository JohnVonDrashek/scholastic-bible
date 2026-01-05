#!/usr/bin/env node

import { program } from 'commander';
import { lookupVerse, listTranslations, listBooks } from '../lib/index.js';

program
  .name('bible')
  .description('Look up verses from Douay-Rheims, Latin Vulgate, Greek Septuagint, and Hebrew Masoretic texts')
  .version('0.1.0');

program
  .command('lookup <translation> <book> <chapter> [verse]')
  .description('Look up a chapter or verse')
  .action((translation, book, chapter, verse) => {
    const result = lookupVerse(translation, book, chapter, verse);
    if (result.error) {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
    console.log(result.output);
  });

program
  .command('translations')
  .description('List available translations')
  .action(() => {
    console.log(listTranslations());
  });

program
  .command('books')
  .description('List available books')
  .action(() => {
    console.log(listBooks());
  });

// Default command: if args look like a lookup, do it
program
  .arguments('<translation> <book> <chapter> [verse]')
  .action((translation, book, chapter, verse) => {
    const result = lookupVerse(translation, book, chapter, verse);
    if (result.error) {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
    console.log(result.output);
  });

// Show help if no arguments
if (process.argv.length < 3) {
  console.log(`
bible - Scholastic Bible CLI

Usage:
  bible <translation> <book> <chapter> [verse]

Examples:
  bible vulgate Genesis 1           Full chapter in Latin
  bible dr Genesis 1 1              Single verse in Douay-Rheims
  bible lxx Genesis 1 1-5           Verse range in Greek
  bible hebrew Genesis 1 26         Hebrew Masoretic text

Translations:
  dr, douay, english                Douay-Rheims
  vulgate, vul, latin               Latin Vulgate
  lxx, septuagint, greek            Septuagint (Greek OT)
  hebrew, heb, masoretic            Hebrew Masoretic Text

Commands:
  bible translations                List all translations
  bible books                       List all books
`);
  process.exit(0);
}

program.parse();
