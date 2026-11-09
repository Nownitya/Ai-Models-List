#!/usr/bin/env python3
"""
tests/test_obsidian_integration.py — Automated tests for Universal Obsidian Developer Second Brain
"""

import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestObsidianIntegration(unittest.TestCase):
    def setUp(self):
        self.repo_root = REPO_ROOT
        self.doc_arch = self.repo_root / "docs" / "integrations" / "OBSIDIAN-DEVELOPER-SECOND-BRAIN.md"
        self.doc_plugins = self.repo_root / "docs" / "integrations" / "OBSIDIAN-PLUGINS-FOR-DEVELOPERS.md"
        self.skill_file = self.repo_root / "skills" / "11-project-documentation" / "obsidian-developer-second-brain" / "SKILL.md"
        self.sync_script = self.repo_root / "scripts" / "sync-obsidian.py"

    def test_canonical_integration_docs_exist(self):
        self.assertTrue(self.doc_arch.exists(), "OBSIDIAN-DEVELOPER-SECOND-BRAIN.md must exist")
        content = self.doc_arch.read_text(encoding="utf-8")
        self.assertIn("The 4 Universal Integration Modes", content)
        self.assertIn("Git-First Separation Principle", content)
        self.assertIn("01_Projects", content)

    def test_plugin_orchestration_guide_exists(self):
        self.assertTrue(self.doc_plugins.exists(), "OBSIDIAN-PLUGINS-FOR-DEVELOPERS.md must exist")
        content = self.doc_plugins.read_text(encoding="utf-8")
        self.assertIn("Dataview", content)
        self.assertIn("Smart Connections", content)
        self.assertIn("Obsidian Git", content)
        self.assertIn("Templater", content)

    def test_skill_structure_and_law2_compliance(self):
        self.assertTrue(self.skill_file.exists(), "obsidian-developer-second-brain/SKILL.md must exist")
        content = self.skill_file.read_text(encoding="utf-8")
        self.assertTrue(content.startswith("---"))
        self.assertIn("name: obsidian-developer-second-brain", content)
        self.assertIn("## When to Use", content)
        self.assertIn("## Core Capabilities", content)
        self.assertIn("## Activation Command", content)
        self.assertIn("/doc-obsidian-developer-second-brain", content)
        self.assertIn("## Prerequisites", content)
        self.assertIn("## Workflow", content)
        self.assertIn("## Anti-Patterns & Warnings", content)

    def test_sync_script_configuration(self):
        self.assertTrue(self.sync_script.exists(), "sync-obsidian.py must exist")
        content = self.sync_script.read_text(encoding="utf-8")
        self.assertIn("01_Projects", content)
        self.assertIn("AI-Ecosystem", content)

    def test_vault_target_structure(self):
        vault_root = Path(r"D:\ObsidianVault\Vault1\ObsidianVault\01_Projects")
        if vault_root.exists():
            ai_dir = vault_root / "AI-Ecosystem" / "Ai-Models-List"
            android_dir = vault_root / "Mobile-Android"
            index_file = vault_root / "INDEX.md"
            self.assertTrue(ai_dir.exists(), "AI-Ecosystem/Ai-Models-List must exist in vault")
            self.assertTrue(android_dir.exists(), "Mobile-Android must exist in vault")
            self.assertTrue(index_file.exists(), "01_Projects/INDEX.md must exist in vault")

if __name__ == "__main__":
    unittest.main()

