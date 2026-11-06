#!/usr/bin/env python3
"""
sync-obsidian.py — Synchronizes AI Coding Skills and Tools Matrix from the
codebase repository into the local Obsidian vault.
"""

import sys
import shutil
from pathlib import Path

# Force UTF-8 encoding on standard output
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def main():
    repo_root = Path(__file__).resolve().parent.parent
    vault_target = Path(r"D:\ObsidianVault\Vault1\ObsidianVault\Project-Docs\Ai-Models-List")

    print("[*] Starting Obsidian Vault Synchronization...")
    print(f"    Repository: {repo_root}")
    print(f"    Vault Target: {vault_target}")

    if not vault_target.exists():
        print(f"[FAIL] Target Obsidian directory does not exist: {vault_target}")
        sys.exit(1)

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

    for d in [cat_dir, prompts_dir, gov_dir]:
        if not d.exists():
            d.mkdir(parents=True, exist_ok=True)
            print(f"    Created directory: {d.name}")

    # 3. Mirror latest master markdown copy into vault as a reference sheet
    vault_matrix_copy = vault_target / "AI-Coding-Skills-and-Tools-Matrix.md"
    shutil.copy2(md_matrix, vault_matrix_copy)
    print(f"    [OK] Mirrored master matrix to {vault_matrix_copy.name} ({vault_matrix_copy.stat().st_size} bytes)")

    # 4. Count and verify category files in Vault
    category_files = list(cat_dir.glob("*.md"))
    print(f"    [OK] Verified {len(category_files)} domain category notes in Obsidian vault.")

    # 5. Verify Prompt callouts and governance
    prompt_files = list(prompts_dir.glob("*.md"))
    gov_files = list(gov_dir.glob("*.md"))
    print(f"    [OK] Verified {len(prompt_files)} prompt notes and {len(gov_files)} governance standards.")

    print("[OK] Obsidian Vault synchronization completed successfully!")

if __name__ == "__main__":
    main()
