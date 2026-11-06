#!/usr/bin/env python3
"""
setup-git-hooks.py — Configures automated Git pre-commit hooks to enforce
dual-format matrix parity (.md <-> .csv) before every commit.
"""

import sys
import stat
from pathlib import Path

# Force UTF-8 on standard output
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOOK_CONTENT = """#!/bin/sh
# Git pre-commit hook: enforces dual-matrix parity

echo "[pre-commit] Validating dual-matrix parity (.md <-> .csv)..."
python scripts/sync-matrix.py

if [ $? -ne 0 ]; then
    echo "[pre-commit] ERROR: Matrix parity check failed. Commit rejected."
    echo "Please update both AI-Coding-Skills-and-Tools-Matrix.md and AI-Coding-Skills-and-Tools-Matrix.csv"
    exit 1
fi

echo "[pre-commit] Parity check passed."
exit 0
"""

def main():
    repo_root = Path(__file__).resolve().parent.parent
    hooks_dir = repo_root / ".git" / "hooks"

    if not hooks_dir.exists():
        print(f"[FAIL] .git/hooks directory not found at {hooks_dir}")
        sys.exit(1)

    pre_commit_file = hooks_dir / "pre-commit"
    pre_commit_file.write_text(HOOK_CONTENT, encoding="utf-8", newline="\n")

    # Make executable on Unix / Git Bash
    current_mode = pre_commit_file.stat().st_mode
    pre_commit_file.chmod(current_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)

    print(f"[OK] Pre-commit hook installed successfully at:")
    print(f"     {pre_commit_file}")
    print("[OK] Future commits will automatically validate dual-matrix parity before committing.")

if __name__ == "__main__":
    main()

