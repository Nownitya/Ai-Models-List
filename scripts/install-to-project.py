#!/usr/bin/env python3
"""
scripts/install-to-project.py — CLI entry point for install_to_project.py
"""
import sys
from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent
if str(repo_root) not in sys.path:
    sys.path.insert(0, str(repo_root))

try:
    from scripts.install_to_project import main
except ImportError:
    from install_to_project import main

if __name__ == "__main__":
    main()
