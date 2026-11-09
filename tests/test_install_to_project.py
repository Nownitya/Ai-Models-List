import unittest
from pathlib import Path
from scripts.install_to_project import PRESET_BUNDLES, resolve_bundle_skills

class TestInstallPresetBundles(unittest.TestCase):
    def test_bundles_defined(self):
        expected_bundles = ["superpowers", "gstack", "mattpocock", "docs", "core-eng", "cloud", "ai-agents", "ui-ux", "testing", "obsidian"]
        for b in expected_bundles:
            self.assertIn(b, PRESET_BUNDLES)

    def test_obsidian_bundle_resolution(self):
        skills = resolve_bundle_skills("obsidian")
        self.assertEqual(len(skills), 4)
        names = [s["name"] for s in skills]
        self.assertIn("obsidian-developer-second-brain", names)
        self.assertIn("obsidian-markdown", names)
        self.assertIn("mermaid-design-generator", names)
        self.assertIn("brag-document-generator", names)

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

    def test_cloud_bundle_resolution(self):
        skills = resolve_bundle_skills("cloud")
        self.assertEqual(len(skills), 10)
        names = [s["name"] for s in skills]
        self.assertIn("firebase-agent-suite", names)
        self.assertIn("neon-serverless-postgres", names)
        self.assertIn("prisma-orm-patterns", names)

    def test_ai_agents_bundle_resolution(self):
        skills = resolve_bundle_skills("ai-agents")
        self.assertEqual(len(skills), 9)
        names = [s["name"] for s in skills]
        self.assertIn("mastra-agent-framework", names)
        self.assertIn("orca-agent", names)
        self.assertIn("browser-use", names)

    def test_ui_ux_bundle_resolution(self):
        skills = resolve_bundle_skills("ui-ux")
        self.assertEqual(len(skills), 8)
        names = [s["name"] for s in skills]
        self.assertIn("emil-design-eng", names)
        self.assertIn("gsap-animation", names)
        self.assertIn("interface-feel-polish", names)

    def test_testing_bundle_resolution(self):
        skills = resolve_bundle_skills("testing")
        self.assertEqual(len(skills), 7)
        names = [s["name"] for s in skills]
        self.assertIn("momentic-visual-testing", names)
        self.assertIn("currents-playwright-sharding", names)
        self.assertIn("network-latency-benchmarks", names)

    def test_unknown_bundle_raises(self):
        with self.assertRaises(ValueError):
            resolve_bundle_skills("nonexistent-bundle")

if __name__ == "__main__":
    unittest.main()

