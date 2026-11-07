#!/usr/bin/env python3
"""
scripts/install_to_project.py — Injects/installs skills from the AI-Models-List repository
into any local project or agent configuration directory.

Supports base names, repo-scoped slash commands, and curated preset bundles.
"""

import sys
import shutil
import argparse
from pathlib import Path

# Force UTF-8 on standard output
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PREFIX_MAP = {
    '01-core-engineering': 'core-',
    '02-matt-pocock': 'mp-',
    '03-android': 'android-',
    '04-kotlin-kmp': 'kmp-',
    '05-ui-ux': 'ui-',
    '06-gsd': 'gsd-',
    '07-gstack': 'gstack-',
    '08-superpowers': 'superpowers-',
    '09-autonomous-agents': 'agent-',
    '10-ai-infrastructure': 'infra-',
    '11-code-review': 'review-',
    '12-specialized': 'spec-',
    'docs': 'doc-'
}

PRESET_BUNDLES = {
    "superpowers": {
        "category": "08-superpowers",
        "description": "obra/superpowers complete 15-skill multi-agent engineering harness"
    },
    "gstack": {
        "category": "07-gstack",
        "description": "garrytan/gstack 16 YC review, sprint, and shipping skills"
    },
    "mattpocock": {
        "category": "02-matt-pocock",
        "description": "mattpocock/skills 16 TypeScript/engineering workflow skills"
    },
    "docs": {
        "category": "docs",
        "description": "Layer 15 Universal Project Documentation standard specifications & sub-skills"
    },
    "core-eng": {
        "category": "01-core-engineering",
        "description": "Essential core engineering skills (TDD, debugging, safe guardrails, code quality)"
    }
}

def get_available_skills(skills_root: Path):
    """
    Returns:
    - skills_by_scoped: Dict mapping unique scoped command to skill info
    - skills_by_base: Dict mapping base name to list of skill infos (for collision resolution)
    """
    skills_by_scoped = {}
    skills_by_base = {}

    for skill_file in skills_root.rglob("SKILL.md"):
        skill_dir = skill_file.parent
        cat_dir = skill_dir.parent
        base_name = skill_dir.name
        cat_name = cat_dir.name

        prefix = PREFIX_MAP.get(cat_name, "")
        scoped_name = prefix + base_name if not base_name.startswith(prefix) else base_name

        info = {
            "name": base_name,
            "scoped_name": scoped_name,
            "category": cat_name,
            "dir": skill_dir,
            "file": skill_file
        }

        skills_by_scoped[scoped_name] = info
        skills_by_base.setdefault(base_name, []).append(info)

    return skills_by_scoped, skills_by_base

def resolve_bundle_skills(bundle_name: str, skills_root: Path = None) -> list[dict]:
    """Resolves all skills belonging to a curated preset bundle."""
    if bundle_name not in PRESET_BUNDLES:
        valid_keys = ", ".join(PRESET_BUNDLES.keys())
        raise ValueError(f"Unknown preset bundle '{bundle_name}'. Available bundles: {valid_keys}")

    if skills_root is None:
        skills_root = Path(__file__).resolve().parent.parent / "skills"

    bundle_info = PRESET_BUNDLES[bundle_name]
    target_cat = bundle_info["category"].lower()

    skills_by_scoped, _ = get_available_skills(skills_root)
    resolved = [
        info for info in skills_by_scoped.values()
        if info["category"].lower() == target_cat
    ]
    return sorted(resolved, key=lambda x: x["name"])

def main():
    repo_root = Path(__file__).resolve().parent.parent
    skills_root = repo_root / "skills"

    parser = argparse.ArgumentParser(description="Install skills into a target project directory.")
    parser.add_argument("-s", "--skill", help="Name or scoped command of skill to install (e.g. mp-code-review, gstack-qa, doc-prd)")
    parser.add_argument("-c", "--category", help="Install all skills in a category (e.g. 07-gstack, docs, 08-superpowers)")
    parser.add_argument("-b", "--bundle", help="Install a curated preset bundle (e.g. superpowers, gstack, mattpocock, docs, core-eng)")
    parser.add_argument("--list-bundles", action="store_true", help="List available curated preset bundles")
    parser.add_argument("-t", "--target", default=".", help="Target directory (default: current directory)")
    parser.add_argument("-l", "--list", action="store_true", help="List all available skills with their slash commands")
    parser.add_argument("--dry-run", action="store_true", help="Simulate installation without copying files")

    args = parser.parse_args()

    if args.list_bundles:
        print("\n=== Curated Preset Bundles ===")
        for name, data in PRESET_BUNDLES.items():
            print(f"  • {name:15} -> [{data['category']}] {data['description']}")
        print("===============================\n")
        return

    skills_by_scoped, skills_by_base = get_available_skills(skills_root)

    if args.list:
        print(f"\n=== Available Skills in Library ({len(skills_by_scoped)} uniquely scoped skills) ===")
        by_cat = {}
        for scoped_name, info in skills_by_scoped.items():
            by_cat.setdefault(info["category"], []).append(info)

        for cat in sorted(by_cat.keys()):
            items = by_cat[cat]
            print(f"\n📂 [{cat}] ({len(items)} skills):")
            for info in sorted(items, key=lambda x: x["scoped_name"]):
                cmd = f"/{info['scoped_name']}"
                print(f"  {cmd:35} (Base: {info['name']})")
        print("\n========================================================")
        return

    target_path = Path(args.target).resolve()
    print(f"[*] Target Destination: {target_path}")

    to_install = []

    if args.bundle:
        try:
            to_install = resolve_bundle_skills(args.bundle, skills_root)
        except ValueError as e:
            print(f"[FAIL] {e}")
            sys.exit(1)

    elif args.category:
        for scoped_name, info in skills_by_scoped.items():
            if info["category"].lower() == args.category.lower():
                to_install.append(info)
        if not to_install:
            print(f"[FAIL] Category '{args.category}' not found.")
            sys.exit(1)

    elif args.skill:
        req = args.skill.strip().lstrip("/")
        # 1. Exact match on scoped name
        if req in skills_by_scoped:
            to_install.append(skills_by_scoped[req])
        # 2. Match on base name
        elif req in skills_by_base:
            matches = skills_by_base[req]
            if len(matches) == 1:
                to_install.append(matches[0])
            else:
                print(f"\n[!] Notice: '{req}' exists in multiple distinct framework repositories:")
                for m in matches:
                    print(f"    - /{m['scoped_name']} [{m['category']}]")
                print("\nPlease re-run with the specific scoped command above to choose the exact repository skill!")
                sys.exit(1)
        else:
            print(f"[FAIL] Skill '{args.skill}' not found in library.")
            print("Tip: Run with --list to see all available slash commands.")
            sys.exit(1)
    else:
        print("[!] Specify either --skill <name>, --category <name>, --bundle <name>, or --list.")
        sys.exit(1)

    print(f"[*] Preparing to install {len(to_install)} skill(s)...")
    installed_count = 0

    for item in to_install:
        dest_dir = target_path / item["name"]
        print(f"    -> Installing: /{item['scoped_name']} [{item['category']}] to {dest_dir.name}")
        if not args.dry_run:
            dest_dir.mkdir(parents=True, exist_ok=True)
            for file_path in item["dir"].iterdir():
                dest_file = dest_dir / file_path.name
                if file_path.is_dir():
                    if dest_file.exists():
                        shutil.rmtree(dest_file)
                    shutil.copytree(file_path, dest_file)
                else:
                    shutil.copy2(file_path, dest_file)
        installed_count += 1

    mode = "Simulated installation of" if args.dry_run else "Successfully installed"
    print(f"[OK] {mode} {installed_count} skill(s) into {target_path}")

if __name__ == "__main__":
    main()
