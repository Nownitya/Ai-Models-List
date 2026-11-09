import unittest
from pathlib import Path

class TestDocsIntegrity(unittest.TestCase):
    def setUp(self):
        self.repo_root = Path(__file__).resolve().parent.parent
        self.docs_dir = self.repo_root / "docs"

    def test_canonical_docs_exist(self):
        required_files = [
            "PRD.md", "ARCHITECTURE.md", "ROADMAP.md", "TASKS.md",
            "BRD.md", "TRD.md", "testing/TEST-STRATEGY.md",
            "adr/0001-dual-matrix-parity.md", "adr/0002-law-4-skill-independence.md",
            "models/MODEL-ROUTING-MATRIX.md", "architecture/ECOSYSTEM-MAP.md"
        ]
        for rel_path in required_files:
            file_path = self.docs_dir / rel_path
            self.assertTrue(file_path.exists(), f"Missing canonical doc: {rel_path}")
            content = file_path.read_text(encoding="utf-8")
            self.assertIn("Ai-Models-List", content, f"Doc {rel_path} missing project name")

if __name__ == "__main__":
    unittest.main()

