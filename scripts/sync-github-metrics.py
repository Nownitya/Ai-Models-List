#!/usr/bin/env python3
"""CLI entry point for sync_github_metrics."""
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.sync_github_metrics import main

if __name__ == "__main__":
    main()

