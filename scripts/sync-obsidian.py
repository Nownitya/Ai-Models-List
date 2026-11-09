#!/usr/bin/env python3
"""
sync-obsidian.py — Synchronizes AI Coding Skills and Tools Matrix and Layer 15
architecture docs from the codebase repository into the local Obsidian vault.
"""

import sys
import shutil
from pathlib import Path

# Force UTF-8 encoding on standard output
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def main():
    repo_root = Path(__file__).resolve().parent.parent
    
    # Primary canonical path under 01_Projects architecture
    canonical_vault_target = Path(r"D:\ObsidianVault\Vault1\ObsidianVault\01_Projects\AI-Ecosystem\Ai-Models-List")
    legacy_vault_target = Path(r"D:\ObsidianVault\Vault1\ObsidianVault\Project-Docs\Ai-Models-List")

    if canonical_vault_target.parent.parent.exists():
        vault_target = canonical_vault_target
    elif legacy_vault_target.exists():
        vault_target = legacy_vault_target
    else:
        vault_target = canonical_vault_target

    print("[*] Starting Obsidian Vault Synchronization...")
    print(f"    Repository:   {repo_root}")
    print(f"    Vault Target: {vault_target}")

    vault_target.mkdir(parents=True, exist_ok=True)

    # 1. Verify Master Matrices in Repo
    md_matrix = repo_root / "AI-Coding-Skills-and-Tools-Matrix.md"
    csv_matrix = repo_root / "AI-Coding-Skills-and-Tools-Matrix.csv"

    if not md_matrix.exists() or not csv_matrix.exists():
        print("[FAIL] Missing master matrix files in repo root.")
        sys.exit(1)

    # 2. Check Obsidian Categories Directory
    cat_dir = vault_target / "01_Categories"
    prompts_dir = vault_target / "02_Prompts"
    gov_dir = vault_target / "03_Governance"
    integrations_dir = vault_target / "05_Integrations"

    for d in [cat_dir, prompts_dir, gov_dir, integrations_dir]:
        d.mkdir(parents=True, exist_ok=True)

    # 3. Mirror latest master markdown copy into vault as a reference sheet
    vault_matrix_copy = vault_target / "AI-Coding-Skills-and-Tools-Matrix.md"
    shutil.copy2(md_matrix, vault_matrix_copy)
    print(f"    [OK] Mirrored master matrix to {vault_matrix_copy.name} ({vault_matrix_copy.stat().st_size} bytes)")

    # 4. Mirror key Layer 15 architecture and integration specifications
    key_docs = [
        ("docs/models/MODEL-ROUTING-MATRIX.md", gov_dir / "MODEL-ROUTING-MATRIX.md"),
        ("docs/architecture/ECOSYSTEM-MAP.md", gov_dir / "ECOSYSTEM-MAP.md"),
        ("docs/integrations/OBSIDIAN-DEVELOPER-SECOND-BRAIN.md", integrations_dir / "OBSIDIAN-DEVELOPER-SECOND-BRAIN.md"),
        ("docs/integrations/OBSIDIAN-PLUGINS-FOR-DEVELOPERS.md", integrations_dir / "OBSIDIAN-PLUGINS-FOR-DEVELOPERS.md"),
        ("docs/adr/0003-project-naming-and-nomenclature-skilldock.md", gov_dir / "ADR-0003-PROJECT-NAMING-AND-NOMENCLATURE-SKILLDOCK.md"),
    ]

    for rel_src, dest in key_docs:
        src_path = repo_root / rel_src
        if src_path.exists():
            shutil.copy2(src_path, dest)
            print(f"    [OK] Mirrored {src_path.name} to {dest.parent.name}/{dest.name}")

    # 5. Count and verify category files in Vault
    category_files = list(cat_dir.glob("*.md"))
    print(f"    [OK] Verified {len(category_files)} domain category notes in Obsidian vault.")

    # 6. Verify Prompt callouts and governance
    prompt_files = list(prompts_dir.glob("*.md"))
    gov_files = list(gov_dir.glob("*.md"))
    print(f"    [OK] Verified {len(prompt_files)} prompt notes and {len(gov_files)} governance standards.")

    print("[OK] Obsidian Vault synchronization completed successfully!")

if __name__ == "__main__":
    main()
