import unittest
from pathlib import Path

# Add project root to sys.path so scripts can be imported cleanly
import sys
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.sync_github_metrics import (
    extract_github_repos,
    normalize_repo_key,
    format_star_count,
    build_repo_metric
)

class TestSyncGitHubMetrics(unittest.TestCase):
    def test_extract_github_repos(self):
        sample_md = """
        - **Repository:** https://github.com/obra/superpowers
        - **Documentation:** https://github.com/garrytan/gstack/
        - Extra link: https://github.com/affaan-m/ecc.git
        - Non-repo: https://github.com/features
        """
        repos = extract_github_repos(sample_md)
        self.assertIn("obra/superpowers", repos)
        self.assertIn("garrytan/gstack", repos)
        self.assertIn("affaan-m/ecc", repos)
        # Should exclude generic github top-level pages
        self.assertNotIn("features", repos)

    def test_normalize_repo_key(self):
        self.assertEqual(normalize_repo_key("AvdLee/SwiftUI-Agent-Skill"), "avdlee/swiftui-agent-skill")
        self.assertEqual(normalize_repo_key("obra/superpowers/"), "obra/superpowers")
        self.assertEqual(normalize_repo_key("https://github.com/affaan-m/ecc.git"), "affaan-m/ecc")

    def test_format_star_count(self):
        self.assertEqual(format_star_count(450), "450")
        self.assertEqual(format_star_count(1200), "1.2k")
        self.assertEqual(format_star_count(298982), "299k")
        self.assertEqual(format_star_count(0), "0")

    def test_build_repo_metric(self):
        mock_raw = {
            "full_name": "obra/superpowers",
            "html_url": "https://github.com/obra/superpowers",
            "description": "Superpowers for agentic development",
            "stargazers_count": 313966,
            "forks_count": 28400,
            "open_issues_count": 12,
            "pushed_at": "2026-11-06T12:00:00Z",
            "license": {"spdx_id": "MIT"}
        }
        metric = build_repo_metric(mock_raw, latest_tag="v7.0.2")
        self.assertEqual(metric["repo"], "obra/superpowers")
        self.assertEqual(metric["stars"], 313966)
        self.assertEqual(metric["stars_formatted"], "314k")
        self.assertEqual(metric["version"], "v7.0.2")
        self.assertEqual(metric["license"], "MIT")

if __name__ == "__main__":
    unittest.main()
