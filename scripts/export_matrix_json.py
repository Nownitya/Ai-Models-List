#!/usr/bin/env python3
"""
scripts/export_matrix_json.py — Pre-compiles the CSV matrix, GitHub telemetry,
and skills directory into a structured, type-safe JSON file for the React application.
"""

import csv
import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

CAT_MAP = {
    "01 Core Engineering": ("01-core-engineering", "Core Engineering"),
    "02 Matt Pocock": ("02-matt-pocock", "Matt Pocock"),
    "03 Android Development Skills": ("03-android", "Android Development"),
    "04 Kotlin KMP": ("04-kotlin-kmp", "Kotlin Multiplatform (KMP)"),
    "05 UI UX Design": ("05-ui-ux", "UI / UX Design"),
    "06 GSD": ("06-gsd", "GSD Autonomous Engine"),
    "07 gstack": ("07-gstack", "gstack Workflow"),
    "08 Superpowers": ("08-superpowers", "Superpowers Harness"),
    "09 Autonomous Agents": ("09-autonomous-agents", "Autonomous Agents"),
    "10 AI Infrastructure": ("10-ai-infrastructure", "AI Infrastructure & MCP"),
    "11 Code Review Quality": ("11-code-review", "Code Review & Quality"),
    "12 Optional Specialized": ("12-specialized", "Specialized Tools"),
    "15 Universal Project Documentation Standard": ("docs", "Universal Project Documentation"),
}

ECOSYSTEM_RULES = [
    ("android", ["android", "camerax", "compose", "gradle", "view", "anr", "r8", "billing", "glance", "wear"]),
    ("kmp", ["kotlin", "kmp", "multiplatform", "swiftui"]),
    ("gsd", ["gsd", "get-stuff-done"]),
    ("superpowers", ["superpowers", "ralph", "test-driven", "systematic-debugging"]),
    ("agents", ["agent", "mastra", "openhands", "wiggum", "omniroute"]),
    ("mattpocock", ["matt-pocock", "triage", "ask-matt", "to-tickets", "to-spec"]),
    ("obsidian", ["obsidian", "mempalace", "second-brain"]),
    ("quality", ["review", "test", "audit", "security", "benchmark", "qa", "guard"]),
]

def parse_csv_line(text: str):
    return next(csv.reader([text]))

def derive_ecosystem(name: str, cat_id: str, desc: str) -> list[str]:
    combined = f"{name} {cat_id} {desc}".lower()
    matches = []
    for eco, keywords in ECOSYSTEM_RULES:
        if any(kw in combined for kw in keywords):
            matches.append(eco)
    return matches or ["general"]

def export_matrix():
    csv_path = REPO_ROOT / "AI-Coding-Skills-and-Tools-Matrix.csv"
    dir_path = REPO_ROOT / "data" / "skills-directory.json"
    metrics_path = REPO_ROOT / "data" / "github-metrics.json"
    out_path = REPO_ROOT / "web" / "src" / "data" / "matrix.json"

    if not csv_path.exists():
        print(f"[!] Missing {csv_path}")
        return

    # Load directory and metrics if present
    skills_dir = {}
    if dir_path.exists():
        try:
            skills_dir = json.loads(dir_path.read_text(encoding="utf-8"))
        except Exception:
            pass

    metrics = {}
    if metrics_path.exists():
        try:
            metrics_payload = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics = metrics_payload.get("repositories", {})
        except Exception:
            pass

    current_cat_id = "01-core-engineering"
    current_cat_label = "Core Engineering"

    skills = []
    seen_ids = set()

    with open(csv_path, mode="r", encoding="utf-8") as f:
        for line in f:
            line_str = line.strip()
            if not line_str:
                continue

            for header, (cat_id, cat_label) in CAT_MAP.items():
                if line_str.startswith(header):
                    current_cat_id = cat_id
                    current_cat_label = cat_label
                    break

            try:
                parts = parse_csv_line(line_str)
            except Exception:
                continue

            name = ""
            priority = ""
            why = ""

            if current_cat_id == "docs":
                if len(parts) >= 4 and parts[2] in ["P0", "P1", "P2", "P3"]:
                    name = parts[1]
                    priority = parts[2]
                    why = parts[3]
            else:
                if len(parts) >= 3 and parts[1] in ["P0", "P1", "P2", "P3"]:
                    name = parts[0]
                    priority = parts[1]
                    why = parts[2]

            if not name or not priority:
                continue

            # Clean name
            clean_name = re.sub(r"^[0-9.]+\s*", "", name).strip()
            skill_id = clean_name.lower().replace(" ", "-")

            # Look up directory metadata
            dir_entry = skills_dir.get(clean_name) or skills_dir.get(skill_id) or {}
            scoped = dir_entry.get("scoped", skill_id)
            cli = dir_entry.get("cli", f"python scripts/install-to-project.py --skill {scoped}")
            repo = dir_entry.get("repo")

            # Stars lookup
            stars = 0
            if repo and repo in metrics:
                stars = metrics[repo].get("stars", 0)

            # Avoid duplicates
            unique_id = f"{current_cat_id}:{skill_id}"
            if unique_id in seen_ids:
                continue
            seen_ids.add(unique_id)

            skills.append({
                "id": skill_id,
                "uniqueId": unique_id,
                "name": clean_name,
                "priority": priority,
                "categoryId": current_cat_id,
                "categoryLabel": current_cat_label,
                "description": why,
                "scoped": scoped,
                "cli": cli,
                "repo": repo,
                "stars": stars,
                "ecosystems": derive_ecosystem(clean_name, current_cat_id, why),
            })

    # Meta summary
    categories = []
    seen_cats = set()
    for cat_id, cat_label in CAT_MAP.values():
        if cat_id not in seen_cats:
            seen_cats.add(cat_id)
            count = sum(1 for s in skills if s["categoryId"] == cat_id)
            categories.append({
                "id": cat_id,
                "label": cat_label,
                "count": count
            })

    meta = {
        "totalSkills": len(skills),
        "totalStars": sum(s["stars"] for s in skills),
        "categories": categories,
        "p0Count": sum(1 for s in skills if s["priority"] == "P0"),
        "p1Count": sum(1 for s in skills if s["priority"] == "P1"),
        "p2Count": sum(1 for s in skills if s["priority"] == "P2"),
        "p3Count": sum(1 for s in skills if s["priority"] == "P3"),
        "generatedAt": "2026-11-09",
    }

    payload = {
        "meta": meta,
        "skills": skills,
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"[OK] Exported {len(skills)} skills to {out_path} ({out_path.stat().st_size} bytes)")
    return payload

if __name__ == "__main__":
    export_matrix()
