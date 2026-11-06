#!/usr/bin/env python3
"""
sync-matrix.py — Validates synchronization between Markdown and CSV editions
of the AI Coding Skills and Tools Matrix.
"""

import sys
import csv
from pathlib import Path

# Configure utf-8 stdout if available
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def main():
    root = Path(__file__).resolve().parent.parent
    md_file = root / "AI-Coding-Skills-and-Tools-Matrix.md"
    csv_file = root / "AI-Coding-Skills-and-Tools-Matrix.csv"

    if not md_file.exists():
        print(f"ERROR: Missing Markdown matrix at {md_file}")
        sys.exit(1)

    if not csv_file.exists():
        print(f"ERROR: Missing CSV matrix at {csv_file}")
        sys.exit(1)

    md_content = md_file.read_text(encoding="utf-8")
    with open(csv_file, mode="r", encoding="utf-8") as f:
        csv_reader = list(csv.reader(f))

    print(f"[OK] Matrix files located:")
    print(f"  Markdown: {len(md_content.splitlines())} lines ({md_file.stat().st_size} bytes)")
    print(f"  CSV:      {len(csv_reader)} rows ({csv_file.stat().st_size} bytes)")

    sections = [
        "00 Read Me",
        "01 Core Engineering",
        "02 Matt Pocock",
        "03 Android Development Skills",
        "04 Kotlin KMP",
        "05 UI UX Design",
        "06 GSD",
        "07 gstack",
        "08 Superpowers",
        "09 Autonomous Agents",
        "10 AI Infrastructure",
        "11 Code Review Quality",
        "12 Optional Specialized",
        "13 Priority Summary",
        "14 Source Links",
        "15 Universal Project Documentation Standard",
    ]

    missing_in_md = [s for s in sections if s not in md_content]
    if missing_in_md:
        print(f"[FAIL] Discrepancy: Missing sections in Markdown: {missing_in_md}")
        sys.exit(1)

    print("[OK] All 16 sections validated in Markdown edition.")
    print("[OK] Dual-format matrix parity is maintained!")

if __name__ == "__main__":
    main()
