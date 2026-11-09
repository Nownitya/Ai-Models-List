#!/usr/bin/env python3
"""
scripts/generate_skills_directory.py — Compiles a high-performance, deterministic
index mapping every cataloged skill to its canonical scoped slash command,
exact category folder, installation CLI string, and upstream GitHub repository.

Output: data/skills-directory.json (consumed by index.html and MCP server)
"""

import re
import json
import sys
from pathlib import Path

# Add repo root to sys.path
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.install_to_project import PREFIX_MAP

def generate_directory(repo_root: Path = None):
    root = (repo_root or REPO_ROOT) / "skills"
    out_file = (repo_root or REPO_ROOT) / "data" / "skills-directory.json"

    skills_dir = {}

    for skill_file in sorted(root.rglob("SKILL.md")):
        skill_dir = skill_file.parent
        cat_dir = skill_dir.parent
        base_name = skill_dir.name
        cat_name = cat_dir.name

        pfx = PREFIX_MAP.get(cat_name, "")
        scoped = pfx + base_name if not base_name.startswith(pfx) else base_name

        content = skill_file.read_text(encoding="utf-8", errors="replace")
        repo_match = re.search(r"github\.com/([a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+)", content)
        repo = repo_match.group(1).rstrip(").") if repo_match else None

        entry = {
            "name": base_name,
            "category": cat_name,
            "scoped": scoped,
            "cli": f"python scripts/install-to-project.py --skill {scoped}",
            "repo": repo
        }
        # Index by base_name, scoped name, and normalized lowercase
        skills_dir[base_name] = entry
        skills_dir[scoped] = entry
        skills_dir[base_name.lower().replace("-", " ")] = entry
        skills_dir[scoped.lower().replace("-", " ")] = entry

    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(skills_dir, indent=2), encoding="utf-8")
    print(f"[OK] Generated {len(skills_dir)} lookup entries in {out_file}")
    return skills_dir

if __name__ == "__main__":
    generate_directory()

