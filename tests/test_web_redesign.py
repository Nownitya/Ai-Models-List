import unittest
from pathlib import Path

class TestWebRedesign(unittest.TestCase):
    def setUp(self):
        repo_root = Path(__file__).resolve().parent.parent
        legacy_file = repo_root / "index.legacy.html"
        self.html_file = legacy_file if legacy_file.exists() else (repo_root / "index.html")
        self.content = self.html_file.read_text(encoding="utf-8")

    def test_bento_hero_telemetry_exists(self):
        self.assertIn('class="bento-grid"', self.content)
        self.assertIn('class="bento-card"', self.content)
        self.assertIn('id="stat-stars"', self.content)
        self.assertIn('M+', self.content)

    def test_radar_spotlight_strip_exists(self):
        self.assertIn('class="radar-strip"', self.content)
        self.assertIn('radar-item', self.content)

    def test_ecosystem_navigator_exists(self):
        self.assertIn('data-ecosystem="superpowers"', self.content)
        self.assertIn('data-ecosystem="gstack"', self.content)
        self.assertIn('data-ecosystem="mattpocock"', self.content)
        self.assertIn('data-ecosystem="gsd"', self.content)

    def test_design_tokens_present(self):
        self.assertIn('--font-mono', self.content)
        self.assertIn('--accent-gold', self.content)
        self.assertIn('--accent-cyan', self.content)

    def test_taste_skill_integrated(self):
        self.assertIn('leonxlnx/taste-skill', self.content)
        self.assertIn('taste-skill', self.content)

if __name__ == "__main__":
    unittest.main()

