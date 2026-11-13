#!/usr/bin/env python3
"""
tests/test_claude_marketplace.py — Unit test suite verifying the integrity,
schema, dual-matrix parity, and link completeness of the Claude Marketplace (530) dataset.
"""

import csv
import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestClaudeMarketplaceParity(unittest.TestCase):
    def setUp(self):
        self.md_file = REPO_ROOT / "Claude-Marketplace-Plugins-Matrix.md"
        self.csv_file = REPO_ROOT / "Claude-Marketplace-Plugins-Matrix.csv"
        self.json_file = REPO_ROOT / "data" / "claude-marketplace-plugins.json"
        self.web_json = REPO_ROOT / "web" / "src" / "data" / "claude-marketplace-plugins.json"

    def test_artifacts_exist(self):
        self.assertTrue(self.md_file.exists(), "Claude-Marketplace-Plugins-Matrix.md must exist")
        self.assertTrue(self.csv_file.exists(), "Claude-Marketplace-Plugins-Matrix.csv must exist")
        self.assertTrue(self.json_file.exists(), "data/claude-marketplace-plugins.json must exist")
        self.assertTrue(self.web_json.exists(), "web/src/data/claude-marketplace-plugins.json must exist")

    def test_csv_plugin_count(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 530, f"Expected 530 plugins in CSV, got {len(reader)}")

    def test_md_plugin_count(self):
        md_text = self.md_file.read_text(encoding="utf-8")
        rows = re.findall(r"^\|\s*\d+\s*\|\s*`([^`]+)`\s*\|", md_text, re.MULTILINE)
        unique_plugins = set(rows)
        self.assertEqual(len(unique_plugins), 530, f"Expected 530 unique plugins in MD, got {len(unique_plugins)}")

    def test_json_integrity(self):
        with open(self.json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.assertEqual(len(data), 530, f"Expected 530 items in JSON, got {len(data)}")

    def test_official_github_links_completeness(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            gh = row["Official GitHub Repository"]
            self.assertTrue(gh, f"Missing GitHub link for plugin: {row['Plugin']}")
            self.assertTrue(gh.startswith("https://github.com/"), f"Invalid GitHub link for {row['Plugin']}: {gh}")

    def test_install_commands_format(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            cmd = row["Install Command"]
            self.assertTrue(cmd.startswith("claude plugin install"), f"Invalid install cmd for {row['Plugin']}: {cmd}")

if __name__ == "__main__":
    unittest.main()

