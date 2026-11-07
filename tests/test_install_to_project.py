import unittest
from pathlib import Path
from scripts.install_to_project import PRESET_BUNDLES, resolve_bundle_skills

class TestInstallPresetBundles(unittest.TestCase):
    def test_bundles_defined(self):
        expected_bundles = ["superpowers", "gstack", "mattpocock", "docs", "core-eng"]
        for b in expected_bundles:
            self.assertIn(b, PRESET_BUNDLES)

    def test_superpowers_bundle_resolution(self):
        skills = resolve_bundle_skills("superpowers")
        self.assertGreaterEqual(len(skills), 12)
        names = [s["name"] for s in skills]
        self.assertIn("writing-plans", names)
        self.assertIn("brainstorming", names)

    def test_gstack_bundle_resolution(self):
        skills = resolve_bundle_skills("gstack")
        self.assertGreaterEqual(len(skills), 12)
        names = [s["name"] for s in skills]
        self.assertIn("review", names)
        self.assertIn("qa", names)

    def test_unknown_bundle_raises(self):
        with self.assertRaises(ValueError):
            resolve_bundle_skills("nonexistent-bundle")

if __name__ == "__main__":
    unittest.main()

