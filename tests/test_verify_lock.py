import unittest
import tempfile
import json
from pathlib import Path
from scripts.verify_lock import compute_normalized_hash, verify_skills_lock

class TestVerifyLock(unittest.TestCase):
    def test_normalized_hash_crlf_lf_invariance(self):
        crlf_bytes = b"name: test\r\ndescription: sample\r\n"
        lf_bytes = b"name: test\ndescription: sample\n"
        self.assertEqual(compute_normalized_hash(crlf_bytes), compute_normalized_hash(lf_bytes))

    def test_compute_normalized_hash_hex_length(self):
        sample = b"hello world\n"
        h = compute_normalized_hash(sample)
        self.assertEqual(len(h), 64)

    def test_live_skills_lock_validity(self):
        repo_root = Path(__file__).resolve().parent.parent
        lock_file = repo_root / "skills-lock.json"
        skills_dir = repo_root / ".agents" / "skills"
        if not lock_file.exists() or not skills_dir.exists():
            self.skipTest("skills-lock.json or .agents/skills not present")
        is_valid, errors = verify_skills_lock(lock_file, skills_dir)
        self.assertTrue(is_valid, f"Verification failed with errors: {errors}")

    def test_tampered_skill_detection(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            skills_dir = tmp_path / "skills"
            skills_dir.mkdir()
            test_skill = skills_dir / "my-skill"
            test_skill.mkdir()
            skill_file = test_skill / "SKILL.md"
            skill_file.write_text("name: my-skill\noriginal content\n", encoding="utf-8")

            correct_hash = compute_normalized_hash(skill_file.read_bytes())
            lock_data = {
                "version": 1,
                "skills": {
                    "my-skill": {
                        "source": "test/repo",
                        "computedHash": correct_hash
                    }
                }
            }
            lock_file = tmp_path / "skills-lock.json"
            lock_file.write_text(json.dumps(lock_data), encoding="utf-8")

            # Check valid
            is_valid, errors = verify_skills_lock(lock_file, skills_dir)
            self.assertTrue(is_valid)
            self.assertEqual(errors, [])

            # Tamper content
            skill_file.write_text("name: my-skill\ntampered content\n", encoding="utf-8")
            is_valid, errors = verify_skills_lock(lock_file, skills_dir)
            self.assertFalse(is_valid)
            self.assertTrue(any("Hash mismatch" in err for err in errors))

if __name__ == "__main__":
    unittest.main()

