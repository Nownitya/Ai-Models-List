import unittest
import os
import sys

# Add scripts directory to path
SCRIPTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'scripts')
sys.path.insert(0, SCRIPTS_DIR)

from sync_github_metrics import (
    extract_github_repos,
    normalize_repo_key,
    format_star_count,
    build_repo_metric,
)

class TestTelemetrySync(unittest.TestCase):
    def test_01_extract_github_repos(self):
        sample_md = """
        # Sample Markdown
        - [Repo 1](https://github.com/anthropics/claude-code)
        - [Repo 2](https://github.com/obra/superpowers.git)
        - [Excluded](https://github.com/features)
        - [Duplicate](https://github.com/anthropics/claude-code/)
        """
        repos = extract_github_repos(sample_md)
        self.assertIn("anthropics/claude-code", repos)
        self.assertIn("obra/superpowers", repos)
        self.assertNotIn("features", repos)
        self.assertEqual(len(repos), 2)

    def test_02_normalize_repo_key(self):
        self.assertEqual(normalize_repo_key("https://github.com/Owner/Repo.git"), "owner/repo")
        self.assertEqual(normalize_repo_key("Owner/Repo/"), "owner/repo")
        self.assertEqual(normalize_repo_key("owner/repo"), "owner/repo")

    def test_03_format_star_count(self):
        self.assertEqual(format_star_count(0), "0")
        self.assertEqual(format_star_count(450), "450")
        self.assertEqual(format_star_count(1200), "1.2k")
        self.assertEqual(format_star_count(298900), "299k")
        self.assertEqual(format_star_count(1500000), "1.5M")

    def test_04_build_repo_metric(self):
        raw = {
            "full_name": "obra/superpowers",
            "name": "superpowers",
            "owner": {"login": "obra"},
            "html_url": "https://github.com/obra/superpowers",
            "description": "An agentic skills harness",
            "stargazers_count": 52000,
            "forks_count": 3100,
            "open_issues_count": 42,
            "license": {"spdx_id": "MIT"},
            "pushed_at": "2026-11-15T12:00:00Z"
        }
        metric = build_repo_metric(raw, latest_tag="v3.1.0")
        self.assertEqual(metric["repo"], "obra/superpowers")
        self.assertEqual(metric["stars"], 52000)
        self.assertEqual(metric["stars_formatted"], "52.0k")
        self.assertEqual(metric["license"], "MIT")
        self.assertEqual(metric["version"], "v3.1.0")
        self.assertEqual(metric["last_updated"], "2026-11-15")


if __name__ == '__main__':
    unittest.main()
