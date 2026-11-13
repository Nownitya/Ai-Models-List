#!/usr/bin/env python3
"""
setup-project-agents.py — Sets up the complete agent runtime, installs relevant
engineering skills, generates skills-lock.json, and writes root SKILL.md for Ai-Models-List.

Complies with:
- Law 1: Dual Matrix Parity
- Law 2: Standardized Skill Structure
- Law 3: Layer 15 Universal Project Documentation Standard
- Law 4: Skill Independence vs Project Docs Synthesis
"""

import os
import sys
import json
import shutil
import hashlib
from pathlib import Path

# Force UTF-8 stdout
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_SRC = REPO_ROOT / "skills"
INTERCOM_PATH = Path("D:/Codes/Antigravity/Project4/Intercom-Alpha")

AGENTS_DIR = REPO_ROOT / ".agents"
PROJECT_SKILLS_DIR = AGENTS_DIR / "skills"

def compute_sha256(file_path: Path) -> str:
    """Compute sha256 checksum with LF line-ending normalization for cross-platform parity."""
    content = file_path.read_bytes().replace(b"\r\n", b"\n")
    return hashlib.sha256(content).hexdigest()

def copy_runtime_foundation():
    """Copy .agents foundation (gsd-core, hooks, agents, rules, settings) from Intercom-Alpha if available."""
    if not INTERCOM_PATH.exists():
        print(f"[!] Warning: Intercom-Alpha not found at {INTERCOM_PATH}")
        return

    src_agents = INTERCOM_PATH / ".agents"
    if not src_agents.exists():
        return

    print("[*] Setting up .agents runtime foundation...")
    AGENTS_DIR.mkdir(parents=True, exist_ok=True)

    items_to_copy = [
        "gsd-core",
        "hooks",
        "agents",
        "rules",
        "settings.json",
        "mcp_config.json",
        "gsd-file-manifest.json",
        "gsd-install-state.json",
        ".gsd-profile"
    ]

    for item_name in items_to_copy:
        src_item = src_agents / item_name
        dst_item = AGENTS_DIR / item_name
        if src_item.exists() and not dst_item.exists():
            if src_item.is_dir():
                shutil.copytree(src_item, dst_item)
                print(f"  -> Initialized directory: .agents/{item_name}")
            else:
                shutil.copy2(src_item, dst_item)
                print(f"  -> Initialized file: .agents/{item_name}")

def gather_skills_to_install():
    """
    Collect all high-value engineering skills from the local skills catalog.
    Returns dict: { target_folder_name: (source_dir, source_repo, skill_rel_path) }
    """
    to_install = {}

    # 1. Superpowers Suite (obra/superpowers)
    superpowers_skills = [
        "using-superpowers", "diagnosing-superpowers", "brainstorming", "writing-plans",
        "executing-plans", "systematic-debugging", "test-driven-development",
        "requesting-code-review", "receiving-code-review", "verification-before-completion",
        "using-git-worktrees", "subagent-driven-development", "writing-skills",
        "dispatching-parallel-agents", "finishing-a-development-branch"
    ]
    for name in superpowers_skills:
        src = SKILLS_SRC / "08-superpowers" / name
        if not src.exists():
            src = SKILLS_SRC / "01-core-engineering" / name
        if src.exists():
            to_install[name] = (src, "obra/superpowers", f"skills/{name}/SKILL.md")

    # 2. Garry Tan's gstack Suite (garrytan/gstack)
    gstack_skills = [
        "plan-ceo-review", "plan-eng-review", "plan-design-review", "qa", "ship",
        "retro", "office-hours", "careful", "investigate", "autoplan", "benchmark",
        "design-review", "document-release", "guard", "land-and-deploy", "review"
    ]
    for name in gstack_skills:
        src = SKILLS_SRC / "07-gstack" / name
        if src.exists():
            # For review, name it gstack-review to avoid colliding with generic code-review
            dest_name = "gstack-review" if name == "review" else name
            to_install[dest_name] = (src, "garrytan/gstack", f"skills/{name}/SKILL.md")

    # 3. Matt Pocock Suite (mattpocock/skills)
    mp_skills = [
        "ask-matt", "grill-me", "grill-with-docs", "codebase-design", "code-review",
        "diagnosing-bugs", "domain-modeling", "implement", "improve-codebase-architecture",
        "research", "resolving-merge-conflicts", "tdd", "to-spec", "to-tickets",
        "triage", "wayfinder", "writing-great-skills", "handoff"
    ]
    for name in mp_skills:
        src = SKILLS_SRC / "02-matt-pocock" / name
        if not src.exists():
            src = SKILLS_SRC / "01-core-engineering" / name
        if src.exists():
            to_install[name] = (src, "mattpocock/skills", f"skills/engineering/{name}/SKILL.md")

    # 4. GSD Suite (open-gsd / GSD Core)
    gsd_skills = [
        "gsd-plan-phase", "gsd-execute-phase", "gsd-verify-work", "gsd-progress",
        "gsd-manager", "gsd-forensics", "gsd-milestone-summary", "grilling",
        "gsd-map-codebase", "gsd-mempalace-capture", "gsd-mempalace-recall",
        "discuss-plan-execute-verify-ship", "gsd-capability-framework"
    ]
    for name in gsd_skills:
        src = SKILLS_SRC / "06-gsd" / name
        if src.exists():
            to_install[name] = (src, "open-gsd/gsd", f"skills/{name}/SKILL.md")

    # 5. Layer 15 Docs Suite (Ai-Models-List / docs)
    docs_skills = [
        "docs", "prd", "architecture", "test-strategy", "adr", "roadmap", "tasks",
        "sprint-closeout", "milestone-verification", "rules", "branching", "memory",
        "design", "features", "benchmark-report"
    ]
    for name in docs_skills:
        src = SKILLS_SRC / "docs" / name if name != "docs" else SKILLS_SRC / "docs"
        if src.exists() and (src / "SKILL.md").exists():
            dest_name = f"doc-{name}" if name != "docs" else "docs"
            to_install[dest_name] = (src, "local/project-docs", f"skills/docs/{name}/SKILL.md")

    # 6. Code Quality, Review & Special Engineering
    extra_skills = [
        ("coderabbit", SKILLS_SRC / "11-code-review" / "coderabbit", "coderabbitai/skill", "skills/coderabbit/SKILL.md"),
        ("open-code-review", SKILLS_SRC / "11-code-review" / "open-code-review", "opencode/review", "skills/open-code-review/SKILL.md"),
        ("setup-pre-commit", SKILLS_SRC / "01-core-engineering" / "setup-pre-commit", "local/core", "skills/setup-pre-commit/SKILL.md"),
        ("karpathy-guidelines", SKILLS_SRC / "01-core-engineering" / "karpathy-guidelines", "karpathy/guidelines", "skills/karpathy-guidelines/SKILL.md"),
        ("writing-for-agents", SKILLS_SRC / "01-core-engineering" / "writing-for-agents", "local/core", "skills/writing-for-agents/SKILL.md"),
        ("prototype", SKILLS_SRC / "01-core-engineering" / "prototype", "local/core", "skills/prototype/SKILL.md"),
        ("ui-ux-pro-max", SKILLS_SRC / "05-ui-ux" / "ui-ux-pro-max", "local/ui-ux", "skills/ui-ux-pro-max/SKILL.md"),
        ("graphify", SKILLS_SRC / "10-ai-infrastructure" / "graphify", "graphify/skill", "skills/graphify/SKILL.md"),
        ("agent-browser", SKILLS_SRC / "12-specialized" / "agent-browser", "vercel-labs/agent-browser", "skills/agent-browser/SKILL.md"),
        ("find-skills", SKILLS_SRC / "01-core-engineering" / "find-skills", "vercel-labs/skills", "skills/find-skills/SKILL.md"),
        ("everything-claude-code", SKILLS_SRC / "09-autonomous-agents" / "everything-claude-code", "affaan-m/ecc", "skills/everything-claude-code/SKILL.md"),
        ("mastra-agent-framework", SKILLS_SRC / "09-autonomous-agent-architectures" / "mastra-agent-framework", "mastra-ai/mastra", "skills/mastra-agent-framework/SKILL.md"),
        ("momentic-visual-testing", SKILLS_SRC / "04-testing-and-verification" / "momentic-visual-testing", "momentic-ai/momentic", "skills/momentic-visual-testing/SKILL.md"),
        ("extract-design-tokens", SKILLS_SRC / "05-ui-ux" / "extract-design-tokens", "local/ui-ux", "skills/extract-design-tokens/SKILL.md"),
        ("better-auth-patterns", SKILLS_SRC / "01-core-workflows" / "better-auth-patterns", "better-auth/better-auth", "skills/better-auth-patterns/SKILL.md"),
        ("mermaid-design-generator", SKILLS_SRC / "11-project-documentation" / "mermaid-design-generator", "mermaid-js/mermaid", "skills/mermaid-design-generator/SKILL.md"),
        ("nx-monorepo-architect", SKILLS_SRC / "01-core-workflows" / "nx-monorepo-architect", "nrwl/nx", "skills/nx-monorepo-architect/SKILL.md"),
        ("firebase-agent-suite", SKILLS_SRC / "01-core-workflows" / "firebase-agent-suite", "firebase/firebase-tools", "skills/firebase-agent-suite/SKILL.md"),
        ("neon-serverless-postgres", SKILLS_SRC / "01-core-workflows" / "neon-serverless-postgres", "neondatabase/serverless", "skills/neon-serverless-postgres/SKILL.md"),
        ("prisma-orm-patterns", SKILLS_SRC / "01-core-workflows" / "prisma-orm-patterns", "prisma/prisma", "skills/prisma-orm-patterns/SKILL.md"),
        ("svelte5-runes-patterns", SKILLS_SRC / "01-core-workflows" / "svelte5-runes-patterns", "sveltejs/svelte", "skills/svelte5-runes-patterns/SKILL.md"),
        ("firecrawl-web-scrape", SKILLS_SRC / "01-core-workflows" / "firecrawl-web-scrape", "mendableai/firecrawl", "skills/firecrawl-web-scrape/SKILL.md"),
        ("obsidian-developer-second-brain", SKILLS_SRC / "11-project-documentation" / "obsidian-developer-second-brain", "local/project-docs", "skills/11-project-documentation/obsidian-developer-second-brain/SKILL.md"),
        ("unslop", SKILLS_SRC / "05-ui-ux" / "unslop", "heydamir/unslop", "skills/05-ui-ux/unslop/SKILL.md"),
    ]
    for dest_name, src, repo, rel_path in extra_skills:
        if src.exists():
            to_install[dest_name] = (src, repo, rel_path)

    return to_install

def install_skills_and_generate_lock(skills_map):
    """Install selected skills into .agents/skills/ and build skills-lock.json."""
    PROJECT_SKILLS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\n[*] Installing {len(skills_map)} engineering skills into .agents/skills/...")

    lock_data = {
        "version": 1,
        "skills": {}
    }

    installed_count = 0
    for dest_name, (src_dir, source_repo, rel_path) in sorted(skills_map.items()):
        dst_dir = PROJECT_SKILLS_DIR / dest_name
        dst_dir.mkdir(parents=True, exist_ok=True)

        # Copy skill directory contents
        for item in src_dir.iterdir():
            dst_item = dst_dir / item.name
            if item.is_dir():
                if dst_item.exists():
                    shutil.rmtree(dst_item)
                shutil.copytree(item, dst_item)
            else:
                shutil.copy2(item, dst_item)

        skill_md = dst_dir / "SKILL.md"
        computed_hash = compute_sha256(skill_md) if skill_md.exists() else ""

        lock_data["skills"][dest_name] = {
            "source": source_repo,
            "sourceType": "github" if "/" in source_repo and not source_repo.startswith("local/") else "local",
            "skillPath": rel_path,
            "computedHash": computed_hash
        }
        installed_count += 1

    # Write skills-lock.json at repo root
    lock_file = REPO_ROOT / "skills-lock.json"
    with open(lock_file, "w", encoding="utf-8") as f:
        json.dump(lock_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"[OK] Successfully installed {installed_count} skills into .agents/skills/")
    print(f"[OK] Written authoritative skills-lock.json ({lock_file.stat().st_size:,} bytes, {len(lock_data['skills'])} skills locked)")

def write_root_skill_md():
    """Create root SKILL.md defining project laws, architecture, and verification commands."""
    root_skill = REPO_ROOT / "SKILL.md"
    content = """---
name: Ai-Models-List
description: "Master engineering, architecture, and catalog governance skill for the Ai-Models-List repository. Enforces Dual Matrix Parity, Standardized Skill Structure, Layer 15 Project Documentation Standard, and Skill Independence across creators (Superpowers, gstack, Matt Pocock, GSD, Google Android, Docs)."
---

# Ai-Models-List Master Engineering Skill

Authoritative engineering, catalog governance, and skill optimization instructions for **Ai-Models-List** (The Definitive AI Coding Skills, Models & Agent Engineering Catalog).

## When to Use

Activate this skill whenever:
* Adding, modifying, auditing, or removing any AI skill, model, framework, prompt, or tool.
* Maintaining dual matrix parity between `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv`.
* Authoring or refactoring skills in `skills/` or `.agents/skills/`.
* Running verification gates (`scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync-local-agents.py`).
* Generating or updating project documentation under `docs/` using the Layer 15 Universal Project Documentation Standard.
* Deploying updates to GitHub or GitHub Pages (`scripts/github-push.ps1`).

---

## 🏛️ Non-Negotiable Repository Laws

### Law 1: Dual Matrix Parity
Any addition, modification, or removal of an AI skill, model, framework, or tool **MUST** be applied simultaneously to:
1. `AI-Coding-Skills-and-Tools-Matrix.md` (Markdown format)
2. `AI-Coding-Skills-and-Tools-Matrix.csv` (CSV format)
Never update one without updating the other in the exact same turn or commit. Validate parity with:
```bash
python scripts/sync-matrix.py
```

### Law 2: Standardized Skill Structure
Every skill package in `skills/<category>/<skill-name>/` or `.agents/skills/<skill-name>/`:
- Must have a root `SKILL.md` with standard YAML frontmatter (`name`, `description`).
- Must document **When to Use**, **Core Capabilities** (or **Workflow**), **Installation / Activation Command**, **Prerequisites**, and **Anti-Patterns / Warnings** (or **Rules**).
- Prompts and templates must be clearly delimited with `<system>`, `<user>`, or fenced blocks.
Validate compliance with:
```bash
python scripts/test-skills.py
```

### Law 3: Layer 15 Universal Project Documentation Standard
Maintain the single-source-of-truth living documentation under `docs/`:
- Keep `docs/IMPLEMENTATION-STATUS.md` updated with factual, verified evidence.
- Maintain `GLOSSARY.md` for any new acronyms or agent protocols.
- Scaffold target project documentation suites using:
```bash
python scripts/scaffold-project-docs.py --target <path>
```

### Law 4: Skill Independence vs Project Docs Synthesis
- **Skill Independence (Never Merge Skills Across Creators)**:
  Skills from different upstream creators or repositories (`obra/superpowers`, `garrytan/gstack`, `mattpocock`, `open-gsd`, `google/android`) **MUST** remain separate, distinct, and pure. Never merge, blend, or overwrite different framework skills together even if they share similar names (such as `code-review`, `debugging`, or `tdd`). Each skill must preserve its author's unique methodology, prompts, and workflow, selectable individually using its repository-scoped `/` slash command.
- **Project Documentation Synthesis (`docs/` Merging Only)**:
  The rule of cumulative merging and updating applies **strictly to the `docs/` folder** created for a specific project. Within `docs/`, new findings, requirements, sprint reports, and test evidence must be synthesized and merged into canonical living documents without fragmentation.

---

## 🛠️ Verification & Synchronization Commands

| Command | Purpose | Verification Gate |
| :--- | :--- | :--- |
| `python scripts/sync-matrix.py` | Verify & synchronize `.md` and `.csv` matrices | Must output `[OK] Master Matrix Parity Verified` |
| `python scripts/test-skills.py` | Audit all skills for YAML, Law 2 sections, links | Must report `0 errors` |
| `python scripts/sync-local-agents.py` | Synchronize skills with local agent config | Bidirectional sync with collision safety |
| `python scripts/scaffold-project-docs.py` | Scaffold 28 Layer 15 documents into target project | Layer 15 documentation setup |
| `.\\scripts\\github-push.ps1` | Validate gates, commit atomic changes, push to GitHub | Clean origin push with CI/CD trigger |

---

## ⚡ Agent Self-Review Gate
Before presenting any work or concluding a turn:
- [ ] Were both `.md` and `.csv` updated if matrix entries changed?
- [ ] Does `python scripts/sync-matrix.py` report 0 parity drift?
- [ ] Does `python scripts/test-skills.py` report 0 errors?
- [ ] Are skills across different creators preserved as independent units?
- [ ] Is there any unverified hallucination or broken reference link?
"""
    with open(root_skill, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] Created root SKILL.md ({root_skill.stat().st_size:,} bytes)")

def write_repo_laws_rule():
    """Ensure .agents/rules/repo-laws.md exists and encodes the 4 repository laws."""
    rules_dir = AGENTS_DIR / "rules"
    rules_dir.mkdir(parents=True, exist_ok=True)
    rule_file = rules_dir / "repo-laws.md"
    content = """---
trigger: always_on
description: Non-negotiable repository laws for Ai-Models-List (Matrix Parity, Skill Structure, Layer 15 Docs, Skill Independence).
---

# Ai-Models-List Repository Laws

Rules:
1. **Law 1: Dual Matrix Parity**:
   Any change to skills, models, frameworks, or tools MUST be applied to both `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv` in the same turn. Run `python scripts/sync-matrix.py` to verify parity.
2. **Law 2: Standardized Skill Structure**:
   Every `SKILL.md` must have YAML frontmatter (`name`, `description`), When to Use, Core Capabilities, Activation Command, Prerequisites, and Anti-Patterns. Run `python scripts/test-skills.py`.
3. **Law 3: Layer 15 Universal Project Documentation**:
   Update `docs/IMPLEMENTATION-STATUS.md` and `GLOSSARY.md` with verified evidence. Scaffold project documentation via `python scripts/scaffold-project-docs.py`.
4. **Law 4: Skill Independence vs Project Docs Synthesis**:
   Never merge or overwrite skills across different creators (Superpowers, gstack, Matt Pocock, GSD, Android). Keep them separate and pure with their author's unique methodology. Cumulative merging applies exclusively to `docs/` in a project.
"""
    with open(rule_file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] Created .agents/rules/repo-laws.md ({rule_file.stat().st_size:,} bytes)")

def main():
    print("=" * 80)
    print("[*] Ai-Models-List Agent Environment & Skills Setup")
    print("=" * 80)

    copy_runtime_foundation()
    skills_map = gather_skills_to_install()
    install_skills_and_generate_lock(skills_map)
    write_root_skill_md()
    write_repo_laws_rule()

    print("\n" + "=" * 80)
    print("[SUCCESS] Project Agent Environment & Skills Fully Configured!")
    print("=" * 80)

if __name__ == "__main__":
    main()

