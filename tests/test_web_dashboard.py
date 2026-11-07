import unittest
from pathlib import Path

class TestWebDashboard(unittest.TestCase):
    def setUp(self):
        repo_root = Path(__file__).resolve().parent.parent
        self.html_file = repo_root / "index.html"
        self.content = self.html_file.read_text(encoding="utf-8")

    def test_preset_filter_buttons_exist(self):
        self.assertIn('data-preset="superpowers"', self.content)
        self.assertIn('data-preset="gstack"', self.content)
        self.assertIn('data-preset="docs"', self.content)

    def test_slash_command_filter_support(self):
        self.assertIn('filterBySlashCommand', self.content)

    def test_keyboard_shortcut_search_slash(self):
        self.assertIn("e.key === '/'", self.content)

if __name__ == "__main__":
    unittest.main()
