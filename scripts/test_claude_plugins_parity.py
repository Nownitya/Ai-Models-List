#!/usr/bin/env python3
"""
scripts/test_claude_plugins_parity.py — Validates parity and integrity between
Claude-Marketplace-Plugins-Matrix.md and Claude-Marketplace-Plugins-Matrix.csv.
"""

import csv
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestClaudePluginsParity(unittest.TestCase):
    def setUp(self):
        self.md_file = REPO_ROOT / "Claude-Marketplace-Plugins-Matrix.md"
        self.csv_file = REPO_ROOT / "Claude-Marketplace-Plugins-Matrix.csv"
        self.json_file = REPO_ROOT / "data" / "claude-marketplace-plugins.json"

    def test_files_exist(self):
        self.assertTrue(self.md_file.exists(), "Claude-Marketplace-Plugins-Matrix.md must exist")
        self.assertTrue(self.csv_file.exists(), "Claude-Marketplace-Plugins-Matrix.csv must exist")
        self.assertTrue(self.json_file.exists(), "data/claude-marketplace-plugins.json must exist")

    def test_csv_row_count(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.reader(f))
        # 1 header + 530 plugins = 531 rows
        self.assertEqual(len(reader), 531, f"Expected 531 rows in CSV, got {len(reader)}")

    def test_md_plugin_count(self):
        md_text = self.md_file.read_text(encoding="utf-8")
        rows = re.findall(r"^\|\s*\d+\s*\|\s*`([^`]+)`\s*\|", md_text, re.MULTILINE)
        unique_plugins = set(rows)
        self.assertEqual(len(unique_plugins), 530, f"Expected 530 unique plugins in MD, got {len(unique_plugins)}")

    def test_official_github_links_present(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            gh = row["Official GitHub Repository"]
            self.assertTrue(gh, f"Missing GitHub link for plugin: {row['Plugin']}")
            self.assertTrue(gh.startswith("https://github.com/"), f"Invalid GitHub link for {row['Plugin']}: {gh}")

    def test_install_commands_present(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            cmd = row["Install Command"]
            self.assertTrue(cmd.startswith("claude plugin install"), f"Invalid install cmd for {row['Plugin']}: {cmd}")

if __name__ == "__main__":
    unittest.main()
