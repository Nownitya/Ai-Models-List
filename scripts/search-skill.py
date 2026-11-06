#!/usr/bin/env python3
"""
search-skill.py — Interactive CLI tool for searching, filtering, and inspecting
skills from the AI Coding Skills & Tools Matrix.
"""

import sys
import csv
import argparse
from pathlib import Path

# Configure UTF-8 encoding on standard output
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def load_matrix(csv_path):
    skills = []
    current_category = "General"
    
    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row or not any(row):
                continue
            first = row[0].strip()
            # Category header detection
            if first.startswith(("00 ", "01 ", "02 ", "03 ", "04 ", "05 ", "06 ", "07 ", "08 ", "09 ", "10 ", "11 ", "12 ", "13 ", "14 ", "15 ")):
                current_category = first
                continue
            
            # Header rows
            if first in ("Skill", "Skill / Capability", "Skill / Workflow", "Workflow / Capability", "Workflow / Command", "Tool / Framework", "Tool / Service", "Tool / Capability", "Field", "Layer", "Category / Tool"):
                continue
                
            # Valid priority row
            if len(row) >= 3 and row[1].strip() in ("P0", "P1", "P2", "P3"):
                skills.append({
                    "name": row[0].strip(),
                    "priority": row[1].strip(),
                    "why": row[2].strip(),
                    "category": current_category
                })
    return skills

def find_local_skill_file(skills_root, skill_name):
    matches = list(skills_root.rglob(f"{skill_name}/SKILL.md"))
    return matches[0] if matches else None

def main():
    repo_root = Path(__file__).resolve().parent.parent
    csv_path = repo_root / "AI-Coding-Skills-and-Tools-Matrix.csv"
    skills_root = repo_root / "skills"

    if not csv_path.exists():
        print(f"Error: Matrix CSV file not found at {csv_path}")
        sys.exit(1)

    parser = argparse.ArgumentParser(description="Search and filter AI Coding Skills Matrix.")
    parser.add_argument("query", nargs="?", default="", help="Keyword to search in skill names and descriptions")
    parser.add_argument("-p", "--priority", choices=["P0", "P1", "P2", "P3"], help="Filter by priority level")
    parser.add_argument("-c", "--category", help="Filter by category substring (e.g. 'android', 'core')")
    parser.add_argument("-d", "--detail", action="store_true", help="Display full details and local SKILL.md if found")
    parser.add_argument("--stats", action="store_true", help="Display matrix inventory statistics")

    args = parser.parse_args()
    skills = load_matrix(csv_path)

    if args.stats:
        print("\n=== AI Coding Skills Matrix Inventory ===")
        print(f"Total Cataloged Skills: {len(skills)}\n")
        priorities = {"P0": 0, "P1": 0, "P2": 0, "P3": 0}
        categories = {}
        for s in skills:
            priorities[s["priority"]] = priorities.get(s["priority"], 0) + 1
            cat = s["category"]
            categories[cat] = categories.get(cat, 0) + 1

        print("Breakdown by Priority:")
        for p, count in sorted(priorities.items()):
            print(f"  {p}: {count} skills")

        print("\nBreakdown by Category:")
        for c, count in sorted(categories.items()):
            print(f"  {c}: {count} skills")
        print("==========================================\n")
        return

    # Filter
    results = skills
    if args.priority:
        results = [s for s in results if s["priority"] == args.priority]
    if args.category:
        results = [s for s in results if args.category.lower() in s["category"].lower()]
    if args.query:
        q = args.query.lower()
        results = [s for s in results if q in s["name"].lower() or q in s["why"].lower()]

    print(f"\nFound {len(results)} matching skill(s):\n")
    print(f"{'PRIORITY':<10} {'SKILL NAME':<38} {'CATEGORY'}")
    print("-" * 80)
    for s in results:
        local_badge = "[Local]" if find_local_skill_file(skills_root, s["name"]) else "       "
        print(f"[{s['priority']}] {local_badge:<8} {s['name']:<38} {s['category']}")
        if args.detail:
            print(f"   Description: {s['why']}")
            local_file = find_local_skill_file(skills_root, s["name"])
            if local_file:
                print(f"   Local File:  {local_file.relative_to(repo_root)}")
            print("-" * 80)

    if not args.detail and results:
        print("\nTip: Pass -d or --detail to view descriptions and local SKILL.md paths.\n")

if __name__ == "__main__":
    main()

