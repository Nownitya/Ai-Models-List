#!/usr/bin/env python3
"""
install-to-project.py — Injects/installs skills from the AI-Models-List repository
into any local project or agent configuration directory.
"""

import sys
import shutil
import argparse
from pathlib import Path

# Force UTF-8 on standard output
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def get_available_skills(skills_root):
    skills = {}
    for skill_file in skills_root.rglob("SKILL.md"):
        skill_dir = skill_file.parent
        cat_dir = skill_dir.parent
        skill_name = skill_dir.name
        skills[skill_name] = {
            "name": skill_name,
            "category": cat_dir.name,
            "dir": skill_dir,
            "file": skill_file
        }
    return skills

def main():
    repo_root = Path(__file__).resolve().parent.parent
    skills_root = repo_root / "skills"

    parser = argparse.ArgumentParser(description="Install AI skills into an active project or agent harness.")
    parser.add_argument("-s", "--skill", help="Name of the skill to install (e.g. 'adaptive', 'systematic-debugging')")
    parser.add_argument("-c", "--category", help="Install all skills within a category (e.g. '03-android')")
    parser.add_argument("-t", "--target", help="Destination directory (e.g. D:\\MyProject\\.agents\\skills)")
    parser.add_argument("-l", "--list", action="store_true", help="List all available installable skills")
    parser.add_argument("--dry-run", action="store_true", help="Simulate installation without copying files")

    args = parser.parse_args()
    available = get_available_skills(skills_root)

    if args.list:
        print(f"\n=== Available Skills in Library ({len(available)} total) ===")
        for name, meta in sorted(available.items()):
            print(f"  - {name:<35} [{meta['category']}]")
        print("========================================================\n")
        return

    if not args.target:
        print("Error: Target destination directory required. Use -t or --target <path>.")
        sys.exit(1)

    target_dir = Path(args.target).resolve()
    print(f"[*] Target Destination: {target_dir}")

    to_install = []
    if args.skill:
        if args.skill not in available:
            print(f"Error: Skill '{args.skill}' not found in library.")
            sys.exit(1)
        to_install.append(available[args.skill])
    elif args.category:
        for name, meta in available.items():
            if args.category.lower() in meta["category"].lower():
                to_install.append(meta)
        if not to_install:
            print(f"Error: No skills found matching category '{args.category}'.")
            sys.exit(1)
    else:
        print("Error: Must specify either --skill <name> or --category <name>.")
        sys.exit(1)

    print(f"[*] Preparing to install {len(to_install)} skill(s)...")

    for item in to_install:
        dest = target_dir / item["name"]
        print(f"    -> Installing: {item['name']} ({item['category']}) to {dest.name}")
        
        if not args.dry_run:
            dest.mkdir(parents=True, exist_ok=True)
            for file_path in item["dir"].glob("*"):
                if file_path.is_file():
                    shutil.copy2(file_path, dest / file_path.name)
                elif file_path.is_dir():
                    shutil.copytree(file_path, dest / file_path.name, dirs_exist_ok=True)

    action = "Simulated installation of" if args.dry_run else "Successfully installed"
    print(f"[OK] {action} {len(to_install)} skill(s) into {target_dir}")

if __name__ == "__main__":
    main()
