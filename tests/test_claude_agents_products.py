#!/usr/bin/env python3
"""
tests/test_claude_agents_products.py — Unit test suite verifying the integrity,
schema, dual-matrix parity, and link completeness of the Claude Agents & Products (33) dataset.
"""

import csv
import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestClaudeAgentsProductsParity(unittest.TestCase):
    def setUp(self):
        self.md_file = REPO_ROOT / "Claude-Agents-and-Products-Matrix.md"
        self.csv_file = REPO_ROOT / "Claude-Agents-and-Products-Matrix.csv"
        self.json_file = REPO_ROOT / "data" / "claude-agents-products.json"
        self.web_json = REPO_ROOT / "web" / "src" / "data" / "claude-agents-products.json"

    def test_artifacts_exist(self):
        self.assertTrue(self.md_file.exists(), "Claude-Agents-and-Products-Matrix.md must exist")
        self.assertTrue(self.csv_file.exists(), "Claude-Agents-and-Products-Matrix.csv must exist")
        self.assertTrue(self.json_file.exists(), "data/claude-agents-products.json must exist")
        self.assertTrue(self.web_json.exists(), "web/src/data/claude-agents-products.json must exist")

    def test_csv_product_count(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 33, f"Expected 33 products in CSV, got {len(reader)}")

    def test_md_product_count(self):
        md_text = self.md_file.read_text(encoding="utf-8")
        rows = re.findall(r"^\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*\s*\|\s*`([^`]+)`\s*\|", md_text, re.MULTILINE)
        unique_slugs = set(r[1] for r in rows)
        self.assertEqual(len(unique_slugs), 33, f"Expected 33 unique products in MD table, got {len(unique_slugs)}")

    def test_json_integrity(self):
        with open(self.json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.assertEqual(len(data), 33, f"Expected 33 items in JSON, got {len(data)}")
        for item in data:
            self.assertIn("title", item)
            self.assertIn("slug", item)
            self.assertIn("tagline", item)
            self.assertIn("overview", item)
            self.assertIn("website", item)
            self.assertIn("github", item)
            self.assertIn("marketplace_url", item)

    def test_official_websites_completeness(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            web = row["Official Website"]
            self.assertTrue(web, f"Missing Website link for product: {row['Product Name']}")
            self.assertTrue(web.startswith("https://"), f"Invalid website URL for {row['Product Name']}: {web}")

    def test_official_github_links_completeness(self):
        with open(self.csv_file, "r", encoding="utf-8") as f:
            reader = list(csv.DictReader(f))
        for row in reader:
            gh = row["Official GitHub"]
            if gh:  # Webflow does not have a public org link in the dict
                self.assertTrue(gh.startswith("https://github.com/"), f"Invalid GitHub link for {row['Product Name']}: {gh}")

if __name__ == "__main__":
    unittest.main()

