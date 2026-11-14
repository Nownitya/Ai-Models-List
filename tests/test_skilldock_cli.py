import unittest
import subprocess
import sys
import json
import os

class TestSkillDockCLI(unittest.TestCase):
    def setUp(self):
        self.cli_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'scripts', 'skilldock_cli.py')
        self.stack_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.skilldock-stack.json')
        # Ensure clean stack before each test
        subprocess.run([sys.executable, self.cli_path, 'stack', 'clear'], capture_output=True, text=True)

    def tearDown(self):
        # Clean up stack file if created
        subprocess.run([sys.executable, self.cli_path, 'stack', 'clear'], capture_output=True, text=True)
        if os.path.exists(self.stack_file):
            try:
                os.remove(self.stack_file)
            except OSError:
                pass

    def run_cli(self, args):
        cmd = [sys.executable, self.cli_path] + args
        result = subprocess.run(cmd, capture_output=True, text=True)
        return result

    def test_01_search_keyword(self):
        res = self.run_cli(['search', 'taste', '--json'])
        self.assertEqual(res.returncode, 0, f"Search failed: {res.stderr}")
        data = json.loads(res.stdout)
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        skill_ids = [s['id'] for s in data]
        self.assertIn('taste-skill', skill_ids)

    def test_02_inspect_skill(self):
        res = self.run_cli(['inspect', 'taste-skill', '--json'])
        self.assertEqual(res.returncode, 0, f"Inspect failed: {res.stderr}")
        data = json.loads(res.stdout)
        self.assertEqual(data.get('id'), 'taste-skill')
        self.assertIn('leonxlnx/taste-skill', data.get('repo', ''))

    def test_03_starter_list(self):
        res = self.run_cli(['starter', 'list', '--json'])
        self.assertEqual(res.returncode, 0, f"Starter list failed: {res.stderr}")
        data = json.loads(res.stdout)
        self.assertEqual(len(data), 8)
        pack_ids = [p['id'] for p in data]
        self.assertIn('gsd-engine', pack_ids)
        self.assertIn('modern-web-anti-slop', pack_ids)

    def test_04_starter_load_and_stack_list(self):
        res_load = self.run_cli(['starter', 'load', 'gsd-engine'])
        self.assertEqual(res_load.returncode, 0, f"Starter load failed: {res_load.stderr}")
        self.assertIn('Loaded Starter Pack', res_load.stdout)

        res_list = self.run_cli(['stack', 'list', '--json'])
        self.assertEqual(res_list.returncode, 0)
        stack = json.loads(res_list.stdout)
        self.assertGreaterEqual(len(stack), 4)

    def test_05_stack_add_and_remove(self):
        res_add = self.run_cli(['stack', 'add', 'taste-skill', 'unslop'])
        self.assertEqual(res_add.returncode, 0)
        self.assertIn('Added 2 skills to stack', res_add.stdout)

        res_list = self.run_cli(['stack', 'list', '--json'])
        stack = json.loads(res_list.stdout)
        self.assertEqual(len(stack), 2)

        res_rm = self.run_cli(['stack', 'remove', 'unslop'])
        self.assertEqual(res_rm.returncode, 0)
        self.assertIn('Removed 1 skills from stack', res_rm.stdout)

        res_list_after = self.run_cli(['stack', 'list', '--json'])
        stack_after = json.loads(res_list_after.stdout)
        self.assertEqual(len(stack_after), 1)
        self.assertEqual(stack_after[0]['id'], 'taste-skill')

    def test_06_stack_export_cursorrules_and_claude(self):
        self.run_cli(['stack', 'add', 'taste-skill'])

        res_cursor = self.run_cli(['stack', 'export', '--format', 'cursorrules'])
        self.assertEqual(res_cursor.returncode, 0)
        self.assertIn('.cursorrules', res_cursor.stdout)
        self.assertIn('taste-skill', res_cursor.stdout)

        res_claude = self.run_cli(['stack', 'export', '--format', 'claude'])
        self.assertEqual(res_claude.returncode, 0)
        claude_json = json.loads(res_claude.stdout)
        self.assertIn('customSkills', claude_json)
        self.assertEqual(claude_json['customSkills'][0]['name'], 'taste-skill')

    def test_07_swarm_manifest_and_brief(self):
        self.run_cli(['stack', 'add', 'taste-skill', 'systematic-debugging', 'writing-plans'])

        res_manifest = self.run_cli(['swarm', 'manifest'])
        self.assertEqual(res_manifest.returncode, 0)
        manifest = json.loads(res_manifest.stdout)
        self.assertEqual(manifest['version'], '1.0.0')
        self.assertIn('coordinator', manifest['orchestration']['antigravity'])
        workers = manifest['orchestration']['antigravity']['workers']
        self.assertGreater(len(workers), 0)

        res_brief = self.run_cli(['swarm', 'brief'])
        self.assertEqual(res_brief.returncode, 0)
        self.assertIn('SkillDock Multi-Agent Swarm Brief', res_brief.stdout)
        self.assertIn('@coordinator', res_brief.stdout)


if __name__ == '__main__':
    unittest.main()
