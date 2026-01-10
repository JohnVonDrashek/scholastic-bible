#!/usr/bin/env python3
"""
Generate verse timing data from audio files using OpenAI Whisper.

Usage:
  python align-audio.py genesis 1          # Align one chapter
  python align-audio.py genesis            # Align all chapters in a book
  python align-audio.py --all              # Align all books
"""

import json
import os
import sys
import re
from pathlib import Path

# Force unbuffered output for progress tracking
sys.stdout.reconfigure(line_buffering=True)

# Ensure we can import whisper
try:
    import whisper
except ImportError:
    print("Please install whisper: pip install openai-whisper")
    print("And activate the venv: source .venv/bin/activate")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
BIBLE_JSON = PROJECT_ROOT / "site" / "src" / "data" / "bible.json"
AUDIO_DIR = PROJECT_ROOT / "site" / "public" / "audio"
TIMING_DIR = PROJECT_ROOT / "site" / "src" / "data" / "timing"

# Whisper settings
MODEL_SIZE = "base"  # Options: tiny, base, small, medium, large


def load_bible():
    """Load the bible.json file."""
    with open(BIBLE_JSON, "r") as f:
        return json.load(f)


def get_verse_texts(bible_data, book_id, chapter_num):
    """Extract verse texts for a specific chapter."""
    for book in bible_data["books"]:
        if book["id"] == book_id:
            for chapter in book["chapters"]:
                if chapter["number"] == chapter_num:
                    return [(v["number"], v["text"]) for v in chapter["verses"]]
    return None


def clean_text(text):
    """Normalize text for comparison."""
    # Remove punctuation and lowercase
    text = re.sub(r'[^\w\s]', '', text.lower())
    # Collapse whitespace
    text = ' '.join(text.split())
    return text


def align_words_to_verses(word_segments, verses):
    """
    Align whisper word segments to verse boundaries.

    Returns list of {verse: n, start: t1, end: t2} dicts.
    """
    if not word_segments or not verses:
        return []

    # Build word list with times
    whisper_words = []
    for seg in word_segments:
        word = seg.get("word", "").strip()
        if word:
            whisper_words.append({
                "word": word,
                "start": seg.get("start", 0),
                "end": seg.get("end", 0)
            })

    if not whisper_words:
        return []

    # For each verse, find the matching word range
    verse_timings = []
    word_idx = 0

    for verse_num, verse_text in verses:
        verse_words = clean_text(verse_text).split()
        if not verse_words:
            continue

        # Find start word for this verse
        verse_start_idx = word_idx

        # Advance word_idx by approximately the verse length
        words_to_advance = len(verse_words)
        word_idx = min(word_idx + words_to_advance, len(whisper_words) - 1)

        # Get timing from word segments
        if verse_start_idx < len(whisper_words):
            start_time = whisper_words[verse_start_idx]["start"]
            end_time = whisper_words[min(word_idx, len(whisper_words) - 1)]["end"]

            verse_timings.append({
                "verse": verse_num,
                "start": round(start_time, 2),
                "end": round(end_time, 2)
            })

    return verse_timings


def process_chapter(bible_data, book_id, chapter_num, model):
    """Process a single chapter and generate timing data."""
    # Check if audio file exists
    audio_path = AUDIO_DIR / book_id / f"{chapter_num}.mp3"
    if not audio_path.exists():
        print(f"  Skipping {book_id} {chapter_num}: no audio file")
        return None

    # Get verse texts
    verses = get_verse_texts(bible_data, book_id, chapter_num)
    if not verses:
        print(f"  Skipping {book_id} {chapter_num}: no verse data")
        return None

    print(f"  Processing {book_id} chapter {chapter_num}...")

    # Transcribe with word-level timestamps
    result = model.transcribe(
        str(audio_path),
        language="en",
        word_timestamps=True
    )

    # Extract word segments from all segments
    word_segments = []
    for segment in result.get("segments", []):
        word_segments.extend(segment.get("words", []))

    # Align words to verses
    timings = align_words_to_verses(word_segments, verses)

    return timings


def process_book(bible_data, book_id, model):
    """Process all chapters in a book."""
    book_data = None
    for book in bible_data["books"]:
        if book["id"] == book_id:
            book_data = book
            break

    if not book_data:
        print(f"Book '{book_id}' not found")
        return

    # Create timing directory for this book
    book_timing_dir = TIMING_DIR / book_id
    book_timing_dir.mkdir(parents=True, exist_ok=True)

    print(f"Processing {book_data['name']}...")

    for chapter in book_data["chapters"]:
        chapter_num = chapter["number"]
        timings = process_chapter(bible_data, book_id, chapter_num, model)

        if timings:
            # Save timing data
            timing_file = book_timing_dir / f"{chapter_num}.json"
            with open(timing_file, "w") as f:
                json.dump(timings, f, indent=2)
            print(f"    Saved {timing_file.name}")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    # Load bible data
    print("Loading bible.json...")
    bible_data = load_bible()

    # Load Whisper model
    print(f"Loading Whisper model ({MODEL_SIZE})...")
    model = whisper.load_model(MODEL_SIZE)

    # Create timing directory
    TIMING_DIR.mkdir(parents=True, exist_ok=True)

    if sys.argv[1] == "--all":
        # Process all books
        for book in bible_data["books"]:
            process_book(bible_data, book["id"], model)
    elif sys.argv[1] == "--range":
        # Process a range of books: --range START END
        start_idx = int(sys.argv[2])
        end_idx = int(sys.argv[3])
        books = bible_data["books"][start_idx:end_idx]
        print(f"Processing books {start_idx}-{end_idx} ({len(books)} books)")
        for book in books:
            process_book(bible_data, book["id"], model)
    elif len(sys.argv) == 2:
        # Process one book
        book_id = sys.argv[1].lower()
        process_book(bible_data, book_id, model)
    else:
        # Process one chapter
        book_id = sys.argv[1].lower()
        chapter_num = int(sys.argv[2])

        # Create timing directory for this book
        book_timing_dir = TIMING_DIR / book_id
        book_timing_dir.mkdir(parents=True, exist_ok=True)

        timings = process_chapter(bible_data, book_id, chapter_num, model)

        if timings:
            timing_file = book_timing_dir / f"{chapter_num}.json"
            with open(timing_file, "w") as f:
                json.dump(timings, f, indent=2)
            print(f"Saved {timing_file}")
            print(json.dumps(timings[:5], indent=2))  # Show first 5 verses


if __name__ == "__main__":
    main()
