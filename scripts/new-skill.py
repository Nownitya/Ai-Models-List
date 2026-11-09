#!/usr/bin/env python3
"""
scripts/new-skill.py — Automated Skill Scaffolder & Law-Enforcing CLI

Automates the creation of new skills adhering to:
- Law 1: Dual Matrix Parity (simultaneous MD and CSV appending)
- Law 2: Standardized Skill Structure (SKILL.md with YAML, When to Use, Capabilities, Command, Prerequisites, Warnings)
- Automatic directory indexing via scripts/generate_skills_directory.py
"""

import os
import sys
import re
import csv
import argparse
from pathlib import Path

# Force UTF-8 stdout
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent.parent

CATEGORY_PREFIX_MAP = {
    '01-core-engineering': 'core-',
    '01-core-workflows': 'workflow-',
    '02-matt-pocock': 'mp-',
    '03-android': 'android-',
    '03-android-development-skills': 'android-',
    '03-code-review-and-quality': 'review-',
    '04-kotlin-kmp': 'kmp-',
    '04-testing-and-verification': 'test-',
    '05-ui-ux': 'ui-',
    '06-debugging-and-investigation': 'debug-',
    '06-gsd': 'gsd-',
    '07-gstack': 'gstack-',
    '08-superpowers': 'superpowers-',
    '09-autonomous-agent-architectures': 'agent-',
    '09-autonomous-agents': 'agent-',
    '09-deep-research': 'research-',
    '10-ai-infrastructure': 'infra-',
    '10-frontend-fullstack': 'front-',
    '11-code-review': 'review-',
    '11-project-documentation': 'doc-',
    '12-specialized': 'spec-',
    '12-specialized-domains': 'spec-',
    'docs': 'doc-'
}

def slugify(text: str) -> str:
    """Normalize string to kebab-case slug."""
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\-]+', '-', text)
    return text.strip('-')

def title_case(slug: str) -> str:
    """Convert kebab-case slug to human readable Title Case."""
    words = slug.split('-')
    return ' '.join(w.capitalize() for w in words)

def build_skill_md_content(name: str, title: str, category: str, priority: str, why: str, repo: str = None, author: str = None) -> str:
    """Generates standardized Law 2 SKILL.md template content."""
    prefix = CATEGORY_PREFIX_MAP.get(category, '')
    scoped_cmd = f"/{prefix}{name}" if prefix else f"/{name}"
    author_str = f" by {author}" if author else ""
    repo_str = f" ([{repo}](https://github.com/{repo}))" if repo else ""

    return f"""---
name: {name}
description: "{why}"
---

# {title}{author_str}{repo_str}

Authoritative engineering and execution instructions for `{name}` ({priority} Priority).

## When to Use

Activate this skill when:
- Designing, building, refactoring, or optimizing workflows involving `{name}`.
- Addressing defects, edge cases, and performance bottlenecks specific to this domain.
- Requiring deterministic, verified step-by-step procedures rather than guesswork.

## Core Capabilities

- **Automated Workflow Orchestration**: Rapidly scaffold, configure, and inspect target implementations.
- **Strict Invariant Validation**: Enforces architectural boundaries, error boundaries, and security rules.
- **Falsifiable Verification**: Validates deliverables through automated test suites and behavioral assertions.

## Activation Command

```bash
{scoped_cmd}
```

Or install directly into an active project workspace:
```bash
python scripts/install-to-project.py --skill {scoped_cmd.lstrip('/')}
```

## Prerequisites

- Compatible Node.js / Python / Polyglot toolchain installed.
- Appropriate project dependencies configured in lockfiles.
- Git repository initialized with clean working tree or isolated branch.

## Workflow

1. **Discovery & Invariant Check**: Inspect existing domain contracts, configuration, and interfaces.
2. **Implementation & Refactoring**: Apply surgical, minimal modifications adhering to clean architecture.
3. **Automated Verification**: Run unit, integration, and behavioral tests to guarantee zero regressions.
4. **Commit & Documentation**: Document changes with clear evidence and update project tracking ledgers.

## Anti-Patterns & Warnings

> [!WARNING]
> - Never apply speculative abstractions or unnecessary generic layers (Rule: Anti-Overengineering / YAGNI).
> - Never disable linting, security gates, or bypass type assertions to make code pass.
> - Never commit untested or unverified changes to the primary development branch.
"""

def append_to_matrix_files(repo_root: Path, name: str, title: str, priority: str, why: str, dry_run: bool = False) -> tuple[bool, str]:
    """Appends the new skill simultaneously to MD and CSV matrix files enforcing Law 1."""
    md_file = repo_root / "AI-Coding-Skills-and-Tools-Matrix.md"
    csv_file = repo_root / "AI-Coding-Skills-and-Tools-Matrix.csv"

    if not md_file.exists() or not csv_file.exists():
        return False, f"Matrix files not found at {repo_root}"

    md_content = md_file.read_text(encoding="utf-8")
    scoped_cmd = f"/{name}"
    md_row = f"| `{name}` | **{title}** | `{priority}` | `{scoped_cmd}` | {why} |"
    
    # CSV row format: name,Title,Priority,scopedCmd,"Why"
    clean_why = why.replace('"', '""')
    csv_row_text = f'{name},"{title}",{priority},{scoped_cmd},"{clean_why}"\n'

    # Check for duplicate
    if f"`{name}`" in md_content:
        return False, f"Skill `{name}` already exists in Markdown matrix."

    if dry_run:
        return True, f"[Dry Run] Would append row to {md_file.name} and {csv_file.name}"

    # Find insertion point before Section 02 Matt Pocock
    insert_marker = "\n## 02 Matt Pocock"
    if insert_marker in md_content:
        parts = md_content.split(insert_marker, 1)
        new_md_content = parts[0].rstrip() + "\n" + md_row + "\n\n## 02 Matt Pocock" + parts[1]
        md_file.write_text(new_md_content, encoding="utf-8")
    else:
        # Fallback append to end
        with open(md_file, "a", encoding="utf-8") as f:
            f.write(f"\n{md_row}\n")

    # CSV insertion before "02 Matt Pocock,,"
    csv_content = csv_file.read_text(encoding="utf-8")
    csv_marker = "\n02 Matt Pocock,,"
    if csv_marker in csv_content:
        c_parts = csv_content.split(csv_marker, 1)
        new_csv_content = c_parts[0].rstrip() + "\n" + csv_row_text + "02 Matt Pocock,," + c_parts[1]
        csv_file.write_text(new_csv_content, encoding="utf-8")
    else:
        with open(csv_file, "a", encoding="utf-8") as f:
            f.write(csv_row_text)

    return True, f"Appended row to both {md_file.name} and {csv_file.name} (Law 1 Parity Preserved)"

def scaffold_skill(name: str, category: str, priority: str, why: str, title: str = None, repo: str = None, author: str = None, repo_root: Path = None, dry_run: bool = False) -> dict:
    """Core scaffolding function."""
    if repo_root is None:
        repo_root = REPO_ROOT

    slug = slugify(name)
    if not slug:
        raise ValueError("Skill name cannot be empty.")

    if not title:
        title = title_case(slug)

    category_dir = repo_root / "skills" / category
    target_skill_dir = category_dir / slug
    skill_file = target_skill_dir / "SKILL.md"

    if skill_file.exists():
        raise FileExistsError(f"Skill file already exists at {skill_file}")

    content = build_skill_md_content(slug, title, category, priority, why, repo, author)

    result = {
        "slug": slug,
        "title": title,
        "category": category,
        "priority": priority,
        "skill_file": skill_file,
        "dry_run": dry_run
    }

    if dry_run:
        result["status"] = "dry_run_success"
        return result

    # 1. Create directory and write SKILL.md (Law 2)
    target_skill_dir.mkdir(parents=True, exist_ok=True)
    skill_file.write_text(content, encoding="utf-8")

    # 2. Append to Matrix files (Law 1)
    ok, msg = append_to_matrix_files(repo_root, slug, title, priority, why, dry_run=False)
    if not ok:
        raise RuntimeError(f"Failed to update matrix files: {msg}")

    # 3. Regenerate skills directory JSON
    try:
        from scripts.generate_skills_directory import generate_directory
        generate_directory(repo_root)
    except Exception as e:
        result["directory_warning"] = f"Failed to regenerate skills directory: {e}"

    result["status"] = "success"
    return result

def main():
    parser = argparse.ArgumentParser(description="Scaffold a new standardized agent skill complying with Law 1 & Law 2.")
    parser.add_argument("-n", "--name", required=True, help="Skill name in kebab-case (e.g. bun-runtime-expert)")
    parser.add_argument("-c", "--category", default="01-core-workflows", help="Skills category subfolder (default: 01-core-workflows)")
    parser.add_argument("-p", "--priority", default="P1", choices=["P0", "P1", "P2", "P3"], help="Priority tier (default: P1)")
    parser.add_argument("-w", "--why", required=True, help="Rationale / purpose description")
    parser.add_argument("-t", "--title", help="Human-friendly Title (default: Title Case of name)")
    parser.add_argument("-r", "--repo", help="Upstream GitHub repository (owner/name)")
    parser.add_argument("-a", "--author", help="Creator or upstream author name")
    parser.add_argument("--dry-run", action="store_true", help="Preview scaffolding without touching disk")

    args = parser.parse_args()

    print("=" * 80)
    print("[*] AUTOMATED SKILL SCAFFOLDER (Law 1 & Law 2 Enforcer)")
    print(f"    Name:     {args.name}")
    print(f"    Category: {args.category}")
    print(f"    Priority: {args.priority}")
    print(f"    Why:      {args.why}")
    if args.dry_run:
        print("    MODE:     DRY RUN (no files modified)")
    print("=" * 80)

    try:
        res = scaffold_skill(
            name=args.name,
            category=args.category,
            priority=args.priority,
            why=args.why,
            title=args.title,
            repo=args.repo,
            author=args.author,
            dry_run=args.dry_run
        )
        print(f"[OK] Successfully scaffolded skill '{res['slug']}'!")
        print(f"     Target file: {res['skill_file']}")
        if "directory_warning" in res:
            print(f"[!]  Warning: {res['directory_warning']}")
        print("=" * 80)
        return 0
    except Exception as e:
        print(f"[FAIL] Error: {e}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
