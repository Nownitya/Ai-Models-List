#!/usr/bin/env python3
"""
scripts/mcp-server.py — CLI entry point for mcp_server.py
"""
import sys
from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent
if str(repo_root) not in sys.path:
    sys.path.insert(0, str(repo_root))

try:
    from scripts.mcp_server import main
except ImportError:
    from mcp_server import main

if __name__ == "__main__":
    main()
