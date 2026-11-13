#!/usr/bin/env python3
"""
tests/test_claude_connectors_plugins.py — Unit test suite verifying the integrity,
schema, and parity of the Claude Marketplace Connectors & Plugins (1,126) dataset.
"""

import csv
import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestClaudeConnectorsPluginsParity(unittest.TestCase):
    def setUp(self):
        self.md_file = REPO_ROOT / "Claude-Connectors-and-Plugins-Matrix.md"
        self.csv_file = REPO_ROOT / "Claude-Connectors-and-Plugins-Matrix.csv"
        self.json_file = REPO_ROOT / "data" / "claude-connectors-plugins.json"
        self.web_json = REPO_ROOT / "web" / "src" / "data" / "claude-connectors-plugins.json"

    def test_artifacts_exist(self):
        self.assertTrue(self.md_file.exists(), "Claude-Connectors-and-Plugins-Matrix.md must exist")
        self.assertTrue(self.csv_file.exists(), "Claude-Connectors-and-Plugins-Matrix.csv must exist")
        self.assertTrue(self.json_file.exists(), "data/claude-connectors-plugins.json must exist")
        self.assertTrue(self.web_json.exists(), "web/src/data/claude-connectors-plugins.json must exist")

    def test_csv_connector_count(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 1126, f"Expected 1126 connectors in CSV, got {len(reader)}")

    def test_md_connector_count(self):
        md_text = self.md_file.read_text(encoding="utf-8")
        rows = re.findall(r"^\|\s*\d+\s*\|\s*\*\*\[[^\]]+\]\([^)]+\)\*\*\s*\|\s*`([^`]+)`\s*\|", md_text, re.MULTILINE)
        unique_slugs = set(rows)
        self.assertEqual(len(unique_slugs), 1126, f"Expected 1126 unique connectors in MD table, got {len(unique_slugs)}")

    def test_json_integrity(self):
        with open(self.json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.assertEqual(len(data), 1126, f"Expected 1126 items in JSON, got {len(data)}")
        for item in data:
            self.assertIn("title", item)
            self.assertIn("slug", item)
            self.assertIn("type", item)
            self.assertIn(item["type"], ["remote", "local"])
            self.assertTrue(item.get("title"))
            self.assertTrue(item.get("slug"))

    def test_csv_types_valid(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            self.assertIn(row["Type"], ["Remote MCP", "Local MCP"], f"Invalid type in CSV: {row['Type']}")

if __name__ == "__main__":
    unittest.main()

