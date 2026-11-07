#!/usr/bin/env python3
"""
scripts/verify-lock.py — CLI entry point for verify_lock.py
"""
import sys
from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent
if str(repo_root) not in sys.path:
    sys.path.insert(0, str(repo_root))

try:
    from scripts.verify_lock import main
except ImportError:
    from verify_lock import main

if __name__ == "__main__":
    sys.exit(main())

