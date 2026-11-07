import unittest
from pathlib import Path

class TestWebMetricsIntegration(unittest.TestCase):
    def setUp(self):
        repo_root = Path(__file__).resolve().parent.parent
        self.html_file = repo_root / "index.html"
        self.content = self.html_file.read_text(encoding="utf-8")

    def test_sort_dropdown_exists(self):
        self.assertIn('id="sortSelect"', self.content)
        self.assertIn('value="stars"', self.content)
        self.assertIn('value="updated"', self.content)

    def test_metrics_json_fetch_logic(self):
        self.assertIn('data/github-metrics.json', self.content)
        self.assertIn('githubMetrics', self.content)

    def test_metric_badges_rendered(self):
        self.assertIn('metric-badge', self.content)
        self.assertIn('metric-stars', self.content)

if __name__ == "__main__":
    unittest.main()
