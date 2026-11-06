#!/usr/bin/env python3
"""
generate-skills.py — Auto-generates standardized SKILL.md packages across all 12
categories directly from the AI-Coding-Skills-and-Tools-Matrix.csv workbook.
"""

import re
import csv
import sys
from pathlib import Path

# Force UTF-8 on standard output
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

CATEGORY_MAP = {
    "01 Core Engineering": "01-core-engineering",
    "02 Matt Pocock": "02-matt-pocock",
    "03 Android Development Skills": "03-android",
    "04 Kotlin KMP": "04-kotlin-kmp",
    "05 UI UX Design": "05-ui-ux",
    "06 GSD": "06-gsd",
    "07 gstack": "07-gstack",
    "08 Superpowers": "08-superpowers",
    "09 Autonomous Agents": "09-autonomous-agents",
    "10 AI Infrastructure": "10-ai-infrastructure",
    "11 Code Review Quality": "11-code-review",
    "12 Optional Specialized": "12-specialized",
}

def sanitize_slug(name):
    # e.g. "swiftui-pro (twostraws)" -> "swiftui-pro"
    slug = re.sub(r"\(.*?\)", "", name).strip()
    # e.g. "Discuss → Plan → Execute → Verify → Ship" -> "discuss-plan-execute-verify-ship"
    slug = slug.replace("→", "-").replace(" ", "-").replace("/", "-")
    slug = re.sub(r"[^a-zA-Z0-9\-_]", "", slug).lower()
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug

def build_skill_markdown(name, priority, why, category_slug):
    title = name.replace("-", " ").title()
    return f"""---
name: {sanitize_slug(name)}
title: "{name}"
description: "{why.replace('"', "'")}"
priority: {priority}
category: {category_slug}
---

# {title}

> **Priority**: `{priority}` | **Category**: `{category_slug}`

{why}

## When to Use
- Activate when executing workflows requiring **{name}**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
"""

def main():
    repo_root = Path(__file__).resolve().parent.parent
    csv_path = repo_root / "AI-Coding-Skills-and-Tools-Matrix.csv"
    skills_root = repo_root / "skills"

    if not csv_path.exists():
        print(f"[FAIL] Missing CSV at {csv_path}")
        sys.exit(1)

    current_cat = None
    created = 0
    existing = 0

    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row or not any(row):
                continue
            first = row[0].strip()
            
            # Category match
            for cat_key in CATEGORY_MAP:
                if first.startswith(cat_key):
                    current_cat = CATEGORY_MAP[cat_key]
                    break
            
            if not current_cat:
                continue

            # Skip header rows
            if first in ("Skill", "Skill / Capability", "Skill / Workflow", "Workflow / Capability", "Workflow / Command", "Tool / Framework", "Tool / Service", "Tool / Capability"):
                continue

            # Valid skill row
            if len(row) >= 3 and row[1].strip() in ("P0", "P1", "P2", "P3"):
                raw_name = row[0].strip()
                priority = row[1].strip()
                why = row[2].strip()
                slug = sanitize_slug(raw_name)

                if not slug:
                    continue

                skill_dir = skills_root / current_cat / slug
                skill_dir.mkdir(parents=True, exist_ok=True)
                skill_file = skill_dir / "SKILL.md"

                if not skill_file.exists():
                    content = build_skill_markdown(raw_name, priority, why, current_cat)
                    skill_file.write_text(content, encoding="utf-8")
                    created += 1
                else:
                    existing += 1

    print(f"[OK] Full Matrix Skill Generation Complete:")
    print(f"     Newly generated skills: {created}")
    print(f"     Pre-existing skills:    {existing}")
    print(f"     Total skills in catalog: {created + existing}")

if __name__ == "__main__":
    main()
