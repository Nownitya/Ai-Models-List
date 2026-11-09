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
        self.assertIn('data-preset="cloud"', self.content)
        self.assertIn('data-preset="agents"', self.content)
        self.assertIn('data-preset="uiux"', self.content)
        self.assertIn('data-preset="testing"', self.content)

    def test_slash_command_filter_support(self):
        self.assertIn('filterBySlashCommand', self.content)

    def test_keyboard_shortcut_search_slash(self):
        self.assertIn("e.key === '/'", self.content)

    def test_scoped_command_parity(self):
        self.assertIn('prefixMap = {', self.content)
        self.assertIn('s.scopedCmd', self.content)

    def test_cli_install_command_support(self):
        self.assertIn('copyCli(', self.content)
        self.assertIn('s.cliCmd', self.content)

    def test_skills_directory_integration(self):
        self.assertIn("fetch('data/skills-directory.json')", self.content)

    def test_batch_rendering_and_pagination(self):
        self.assertIn('BATCH_SIZE', self.content)
        self.assertIn('loadMoreCards', self.content)

    def test_priority_guide_modal(self):
        self.assertIn('id="priorityModal"', self.content)
        self.assertIn('openPriorityGuide', self.content)

    def test_stack_basket_support(self):
        self.assertIn('id="stackModal"', self.content)
        self.assertIn('id="stackFab"', self.content)
        self.assertIn('exportStackJson', self.content)
        self.assertIn('copyStackCombinedCli', self.content)

    def test_search_debounce_support(self):
        self.assertIn('searchDebounceTimeout', self.content)
        self.assertIn('onSearchInput', self.content)

    def test_pwa_and_service_worker(self):
        repo_root = self.html_file.parent
        manifest_file = repo_root / "manifest.json"
        sw_file = repo_root / "sw.js"
        self.assertTrue(manifest_file.exists(), "manifest.json must exist at repo root")
        self.assertTrue(sw_file.exists(), "sw.js must exist at repo root")
        self.assertIn('rel="manifest" href="manifest.json"', self.content)
        self.assertIn("navigator.serviceWorker.register('sw.js')", self.content)

    def test_fuzzy_token_search(self):
        self.assertIn('function fuzzyTokenMatch(', self.content)

    def test_stack_persistence_and_url_params(self):
        self.assertIn('loadStackFromStorage()', self.content)
        self.assertIn('saveStackToStorage()', self.content)
        self.assertIn('parseUrlParams()', self.content)
        self.assertIn('updateUrlParams()', self.content)

if __name__ == "__main__":
    unittest.main()
