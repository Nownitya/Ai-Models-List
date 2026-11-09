#!/usr/bin/env python3
"""
tests/test_react_data_pipeline.py — Validates the React web application data pipeline,
matrix JSON compilation, and type-safe schema integrity.
"""

import json
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestReactDataPipeline(unittest.TestCase):
    def setUp(self):
        self.matrix_json = REPO_ROOT / "web" / "src" / "data" / "matrix.json"
        self.csv_file = REPO_ROOT / "AI-Coding-Skills-and-Tools-Matrix.csv"

    def test_matrix_json_exists_and_valid(self):
        self.assertTrue(self.matrix_json.exists(), "matrix.json should exist in web/src/data/")
        data = json.loads(self.matrix_json.read_text(encoding="utf-8"))
        self.assertIn("meta", data)
        self.assertIn("skills", data)

    def test_meta_summary(self):
        data = json.loads(self.matrix_json.read_text(encoding="utf-8"))
        meta = data["meta"]
        self.assertGreater(meta["totalSkills"], 200, "Should have over 200 cataloged skills")
        self.assertGreater(meta["p0Count"], 5, "Should have P0 essential skills")
        self.assertGreater(len(meta["categories"]), 10, "Should have 12+ categories")

    def test_skill_schema_integrity(self):
        data = json.loads(self.matrix_json.read_text(encoding="utf-8"))
        skills = data["skills"]
        for s in skills:
            self.assertTrue(s.get("id"), "Skill must have an id")
            self.assertTrue(s.get("name"), "Skill must have a name")
            self.assertIn(s.get("priority"), ["P0", "P1", "P2", "P3"], "Priority must be P0, P1, P2, or P3")
            self.assertTrue(s.get("scoped"), "Skill must have a scoped command")
            self.assertTrue(s.get("cli"), "Skill must have a cli command")
            self.assertIsInstance(s.get("ecosystems"), list, "Ecosystems must be a list")

    def test_react_dist_built(self):
        dist_index = REPO_ROOT / "web" / "dist" / "index.html"
        dist_404 = REPO_ROOT / "web" / "dist" / "404.html"
        self.assertTrue(dist_index.exists(), "React production dist/index.html must exist")
        self.assertTrue(dist_404.exists(), "GitHub Pages dist/404.html must exist")

if __name__ == "__main__":
    unittest.main()

