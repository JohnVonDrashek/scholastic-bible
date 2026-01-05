# Source Texts

This directory contains the source texts for the Scholastic Bible project.

## Texts Included

### Douay-Rheims (`douay-rheims/`)
- **File**: `douay-rheims.txt`
- **Source**: [Project Gutenberg](https://www.gutenberg.org/ebooks/1581)
- **Edition**: Challoner Revision (1749-1752)
- **License**: Public Domain
- **Format**: Plain text, ~144,000 lines

### Latin Vulgate (`vulgate/`)
- **File**: `vulgate.tsv`
- **Source**: [LukeSmithxyz/vul](https://github.com/LukeSmithxyz/vul)
- **Edition**: Clementine Vulgate (based on 1590s Sixtus-Clement edition)
- **License**: Public Domain
- **Format**: TSV with columns: Book, Abbreviation, Chapter, Section, Verse, Latin Text

### Greek Septuagint (`septuagint/`)
- **Files**: Individual `.txt` files per book (e.g., `01.Genesis.txt`)
- **Source**: [nathans/lxx-swete](https://github.com/nathans/lxx-swete)
- **Edition**: Swete's Septuagint (1909-1930)
- **License**: CC BY-SA 4.0
- **Format**: Word-by-word with chapter.section.verse references

### Hebrew Masoretic Text (`hebrew/`)
- **Files**: Individual `.org` files per book (e.g., `gen.org`)
- **Source**: [kainekh/org-bibles](https://github.com/kainekh/org-bibles)
- **Edition**: Based on Westminster Leningrad Codex via eBible.org
- **License**: Public Domain
- **Format**: Org-mode with fully vocalized Hebrew (including cantillation marks)

## Notes

- The Greek Septuagint includes deuterocanonical books (Wisdom, Sirach, Maccabees, etc.)
- The Hebrew Masoretic text covers the protocanonical Old Testament books only
- For deuterocanonical books, the Greek Septuagint serves as the original language source
