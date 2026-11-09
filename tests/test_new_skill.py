#!/usr/bin/env python3
"""
tests/test_new_skill.py — Unit tests for scripts/new-skill.py
"""

import sys
import unittest
import tempfile
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

# Import from scripts/new-skill.py
import importlib.util
spec = importlib.util.spec_from_file_location("new_skill", str(REPO_ROOT / "scripts" / "new-skill.py"))
new_skill = importlib.util.module_from_spec(spec)
spec.loader.exec_module(new_skill)

class TestNewSkillScaffolder(unittest.TestCase):
    def test_slugify(self):
        self.assertEqual(new_skill.slugify("Bun Runtime Expert"), "bun-runtime-expert")
        self.assertEqual(new_skill.slugify("  GraphQL_Schema-Sync!  "), "graphql-schema-sync")
        self.assertEqual(new_skill.slugify("123-test"), "123-test")

    def test_title_case(self):
        self.assertEqual(new_skill.title_case("bun-runtime-expert"), "Bun Runtime Expert")
        self.assertEqual(new_skill.title_case("graphql-sync"), "Graphql Sync")

    def test_build_skill_md_content_law2_compliance(self):
        content = new_skill.build_skill_md_content(
            name="test-skill",
            title="Test Skill Title",
            category="01-core-workflows",
            priority="P1",
            why="Testing law 2 compliance.",
            repo="org/repo",
            author="TestAuthor"
        )
        self.assertTrue(content.startswith("---"))
        self.assertIn("name: test-skill", content)
        self.assertIn("description: \"Testing law 2 compliance.\"", content)
        self.assertIn("## When to Use", content)
        self.assertIn("## Core Capabilities", content)
        self.assertIn("## Activation Command", content)
        self.assertIn("/workflow-test-skill", content)
        self.assertIn("## Prerequisites", content)
        self.assertIn("## Workflow", content)
        self.assertIn("## Anti-Patterns & Warnings", content)

    def test_dry_run_does_not_modify_disk(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            temp_root = Path(tmp_dir)
            (temp_root / "skills" / "01-core-workflows").mkdir(parents=True)
            (temp_root / "AI-Coding-Skills-and-Tools-Matrix.md").write_text("## 02 Matt Pocock\n", encoding="utf-8")
            (temp_root / "AI-Coding-Skills-and-Tools-Matrix.csv").write_text("\n02 Matt Pocock,,\n", encoding="utf-8")

            res = new_skill.scaffold_skill(
                name="dry-run-skill",
                category="01-core-workflows",
                priority="P2",
                why="Dry run test.",
                repo_root=temp_root,
                dry_run=True
            )
            self.assertEqual(res["status"], "dry_run_success")
            self.assertFalse(res["skill_file"].exists())

    def test_scaffold_skill_end_to_end_in_temp_root(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            temp_root = Path(tmp_dir)
            (temp_root / "skills" / "01-core-workflows").mkdir(parents=True)
            (temp_root / "data").mkdir(parents=True)
            
            md_path = temp_root / "AI-Coding-Skills-and-Tools-Matrix.md"
            csv_path = temp_root / "AI-Coding-Skills-and-Tools-Matrix.csv"
            
            md_path.write_text("# Master Matrix\n\n## 01 Core\n| Skill | Title | Priority | Cmd | Why |\n\n## 02 Matt Pocock\n", encoding="utf-8")
            csv_path.write_text("Skill,Title,Priority,Cmd,Why\n02 Matt Pocock,,\n", encoding="utf-8")

            res = new_skill.scaffold_skill(
                name="sample-e2e-skill",
                category="01-core-workflows",
                priority="P1",
                why="Testing end-to-end scaffolding.",
                title="Sample E2E Skill",
                repo_root=temp_root,
                dry_run=False
            )
            self.assertEqual(res["status"], "success")
            self.assertTrue(res["skill_file"].exists())
            
            # Check SKILL.md contents
            content = res["skill_file"].read_text(encoding="utf-8")
            self.assertIn("name: sample-e2e-skill", content)
            
            # Check matrix files updated in parity
            updated_md = md_path.read_text(encoding="utf-8")
            updated_csv = csv_path.read_text(encoding="utf-8")
            
            self.assertIn("`sample-e2e-skill`", updated_md)
            self.assertIn("Sample E2E Skill", updated_md)
            self.assertIn("sample-e2e-skill", updated_csv)
            self.assertIn("Sample E2E Skill", updated_csv)

            # Test duplicate rejection
            with self.assertRaises(FileExistsError):
                new_skill.scaffold_skill(
                    name="sample-e2e-skill",
                    category="01-core-workflows",
                    priority="P1",
                    why="Duplicate test.",
                    repo_root=temp_root,
                    dry_run=False
                )

if __name__ == "__main__":
    unittest.main()
