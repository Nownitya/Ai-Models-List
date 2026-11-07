import unittest
from pathlib import Path
import json

import sys
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.sync_github_metrics import generate_live_stats_markdown

class TestLiveStatsGeneration(unittest.TestCase):
    def test_generate_live_stats_markdown(self):
        sample_metrics = {
            "version": 1,
            "last_synced": "2026-11-07 12:00:00Z",
            "total_repositories": 2,
            "repositories": {
                "obra/superpowers": {
                    "repo": "obra/superpowers",
                    "html_url": "https://github.com/obra/superpowers",
                    "stars": 314000,
                    "stars_formatted": "314k",
                    "version": "v7.0.2",
                    "license": "MIT",
                    "last_updated": "2026-11-03"
                },
                "mattpocock/skills": {
                    "repo": "mattpocock/skills",
                    "html_url": "https://github.com/mattpocock/skills",
                    "stars": 317000,
                    "stars_formatted": "317k",
                    "version": "v1.3.2",
                    "license": "MIT",
                    "last_updated": "2026-11-05"
                }
            }
        }
        md = generate_live_stats_markdown(sample_metrics)
        self.assertIn("# Live Upstream Skills Radar", md)
        self.assertIn("mattpocock/skills", md)
        self.assertIn("obra/superpowers", md)
        # Verify rank 1 is highest stars (mattpocock with 317k)
        matt_pos = md.find("mattpocock/skills")
        obra_pos = md.find("obra/superpowers")
        self.assertLess(matt_pos, obra_pos, "Expected mattpocock (317k) to be ranked higher than obra (314k)")

if __name__ == "__main__":
    unittest.main()

