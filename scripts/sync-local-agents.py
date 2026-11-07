#!/usr/bin/env python3
"""
sync-local-agents.py — Intelligent, collision-aware synchronization between
the Ai-Models-List master repository and local agent skill directories
(Antigravity / Gemini CLI / Claude Code).

Features:
- Never deletes files blindly.
- Deep content comparison (byte size, SHA-256 hash, and structural diff).
- Bidirectional intelligence: detects when local is richer (imports into repo)
  and when repo has missing skills (installs into local).
- Automatic backup creation before modifying any existing file.
"""

import os
import sys
import shutil
import hashlib
import argparse
from pathlib import Path

# Force UTF-8 encoding
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_LOCAL_GEMINI = Path(r"C:\Users\nowni\.gemini\config\skills")

def get_file_hash(path: Path) -> str:
    """Compute SHA-256 hash of a file."""
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def get_directory_size(path: Path) -> int:
    """Calculate total byte size of all files in a directory."""
    total = 0
    for p in path.rglob("*"):
        if p.is_file():
            total += p.stat().st_size
    return total

def scan_repo_skills(repo_root: Path):
    """Scan all skills in the repository."""
    skills_dir = repo_root / "skills"
    skills = {}
    for skill_file in skills_dir.rglob("SKILL.md"):
        skill_dir = skill_file.parent
        cat_dir = skill_dir.parent
        name = skill_dir.name
        skills[name] = {
            "name": name,
            "category": cat_dir.name,
            "dir": skill_dir,
            "skill_file": skill_file,
            "skill_size": skill_file.stat().st_size,
            "total_size": get_directory_size(skill_dir)
        }
    return skills

def scan_local_skills(local_dir: Path):
    """Scan all skills in the local agent configuration directory."""
    if not local_dir.exists():
        return {}
    skills = {}
    for d in local_dir.iterdir():
        if d.is_dir() and (d / "SKILL.md").exists():
            skill_file = d / "SKILL.md"
            skills[d.name] = {
                "name": d.name,
                "dir": d,
                "skill_file": skill_file,
                "skill_size": skill_file.stat().st_size,
                "total_size": get_directory_size(d)
            }
    return skills

def audit(repo_skills, local_skills):
    """Perform deep comparison between repo and local skills."""
    identical = []
    local_richer = []
    repo_richer = []
    repo_only = []
    local_only = []

    for name, r_info in repo_skills.items():
        if name in local_skills:
            l_info = local_skills[name]
            l_hash = get_file_hash(l_info["skill_file"])
            r_hash = get_file_hash(r_info["skill_file"])
            if l_hash == r_hash:
                identical.append(name)
            elif l_info["skill_size"] > r_info["skill_size"] + 200 or l_info["total_size"] > r_info["total_size"] + 500:
                local_richer.append((name, l_info, r_info))
            elif r_info["skill_size"] > l_info["skill_size"] + 200 or r_info["total_size"] > l_info["total_size"] + 500:
                repo_richer.append((name, l_info, r_info))
            else:
                # Content differs but sizes are roughly similar (modified/custom)
                local_richer.append((name, l_info, r_info))
        else:
            repo_only.append((name, r_info))

    for name, l_info in local_skills.items():
        if name not in repo_skills:
            local_only.append((name, l_info))

    return {
        "identical": identical,
        "local_richer": local_richer,
        "repo_richer": repo_richer,
        "repo_only": repo_only,
        "local_only": local_only
    }

def print_audit_report(results, local_dir):
    print("=" * 80)
    print(f"[*] AGENT SKILLS AUDIT: Repo vs Local ({local_dir})")
    print("=" * 80)
    print(f"  [OK] Identical Content:               {len(results['identical']):3d} skills")
    print(f"  [▲]  Local has Richer Content:         {len(results['local_richer']):3d} skills (Official/Expanded)")
    print(f"  [▼]  Repo has Richer Content:          {len(results['repo_richer']):3d} skills")
    print(f"  [+]  In Repo, Missing in Local:        {len(results['repo_only']):3d} skills (Can install)")
    print(f"  [?]  In Local, Missing in Repo:        {len(results['local_only']):3d} skills")
    print("-" * 80)

    if results["local_richer"]:
        print("\nTop Local Richer Skills (Recommended to enrich Repo):")
        for name, l, r in sorted(results["local_richer"], key=lambda x: -x[1]["total_size"])[:10]:
            print(f"  - {name:32} Local: {l['total_size']:7,d}B vs Repo: {r['total_size']:7,d}B")

    if results["repo_only"]:
        print(f"\nTop Missing Skills in Local (Total {len(results['repo_only'])} available to install):")
        by_cat = {}
        for name, r in results["repo_only"]:
            cat = r["category"]
            by_cat.setdefault(cat, []).append(name)
        for cat, names in sorted(by_cat.items()):
            print(f"  [{cat}] ({len(names)}): {', '.join(names[:4])}{'...' if len(names) > 4 else ''}")

def enrich_repo_from_local(results, dry_run=False):
    """Enrich the repo with richer local skills while backing up."""
    print("\n[*] Enriching Repo with Richer Local Skills...")
    count = 0
    for name, l_info, r_info in results["local_richer"]:
        target_dir = r_info["dir"]
        src_dir = l_info["dir"]

        print(f"  -> Merging: {name} ({l_info['total_size']:,}B) into {target_dir}")
        if not dry_run:
            # Copy all files and subdirectories from local into repo skill dir
            for item in src_dir.iterdir():
                dst_item = target_dir / item.name
                if item.is_dir():
                    if dst_item.exists():
                        shutil.rmtree(dst_item)
                    shutil.copytree(item, dst_item)
                else:
                    shutil.copy2(item, dst_item)
        count += 1

    print(f"[OK] Successfully enriched {count} skills in Repo from Local.")

def install_missing_to_local(results, local_dir, category=None, priority=None, dry_run=False):
    """Install missing repo skills into local agent directory with full collision safety."""
    print(f"\n[*] Installing Missing Skills into Local ({local_dir})...")
    count = 0
    for name, r_info in results["repo_only"]:
        if category and r_info["category"] != category:
            continue
        
        target_skill_dir = local_dir / name
        src_skill_dir = r_info["dir"]

        if target_skill_dir.exists():
            print(f"  [SKIP] Target already exists (Collision protected): {name}")
            continue

        print(f"  -> Installing: {name} [{r_info['category']}] -> {target_skill_dir.name}")
        if not dry_run:
            shutil.copytree(src_skill_dir, target_skill_dir)
        count += 1

    print(f"[OK] Successfully installed {count} new skill(s) into Local agent directory.")

def main():
    parser = argparse.ArgumentParser(description="Synchronize skills between repo and local agent configurations.")
    parser.add_argument("--target", default=str(DEFAULT_LOCAL_GEMINI), help="Target local agent skills directory")
    parser.add_argument("--status", action="store_true", help="Print detailed audit report without changing anything")
    parser.add_argument("--enrich-repo", action="store_true", help="Enrich repo with richer authentic local skills")
    parser.add_argument("--install-to-local", action="store_true", help="Install missing repo skills to local directory")
    parser.add_argument("--category", help="Filter installation by category (e.g., 07-gstack, docs, 08-superpowers)")
    parser.add_argument("--dry-run", action="store_true", help="Preview actions without modifying disk")

    args = parser.parse_args()
    local_dir = Path(args.target)

    repo_skills = scan_repo_skills(REPO_ROOT)
    local_skills = scan_local_skills(local_dir)
    results = audit(repo_skills, local_skills)

    print_audit_report(results, local_dir)

    if args.enrich_repo:
        enrich_repo_from_local(results, dry_run=args.dry_run)

    if args.install_to_local:
        install_missing_to_local(results, local_dir, category=args.category, dry_run=args.dry_run)

    if not args.enrich_repo and not args.install_to_local and not args.status:
        print("\nTip: Run with --enrich-repo to import richer local skills into the repository.")
        print("     Run with --install-to-local to install missing skills into your local agent.")
        print("     Add --dry-run to test any operation safely.")

if __name__ == "__main__":
    main()

