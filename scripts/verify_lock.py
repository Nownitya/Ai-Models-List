#!/usr/bin/env python3
"""
scripts/verify_lock.py — Cryptographic Lockfile Verifier for Agent Skills

Validates local skills against skills-lock.json with cross-platform
CRLF/LF line-ending normalization and SHA-256 integrity verification.
"""

import sys
import json
import hashlib
import argparse
from pathlib import Path

def compute_normalized_hash(content: bytes) -> str:
    """Computes SHA-256 digest after normalizing CRLF to LF."""
    normalized = content.replace(b"\r\n", b"\n")
    return hashlib.sha256(normalized).hexdigest()

def verify_skills_lock(lock_path: Path, skills_root: Path) -> tuple[bool, list[str]]:
    """
    Validates skills against a lockfile.
    Returns (is_valid, list_of_error_messages).
    """
    errors: list[str] = []

    if not lock_path.exists():
        return False, [f"Lockfile not found at: {lock_path}"]

    try:
        data = json.loads(lock_path.read_text(encoding="utf-8"))
    except Exception as e:
        return False, [f"Failed to parse lockfile JSON: {e}"]

    skills_dict = data.get("skills", {})
    if not skills_dict:
        return False, ["Lockfile contains no skills entries under 'skills' key."]

    for skill_name, meta in skills_dict.items():
        expected_hash = meta.get("computedHash")
        if not expected_hash:
            errors.append(f"Skill '{skill_name}' is missing 'computedHash' in lockfile.")
            continue

        skill_file = skills_root / skill_name / "SKILL.md"
        if not skill_file.exists():
            errors.append(f"Skill file missing: {skill_file}")
            continue

        content = skill_file.read_bytes()
        raw_hash = hashlib.sha256(content).hexdigest()
        norm_hash = compute_normalized_hash(content)

        if expected_hash not in (raw_hash, norm_hash):
            errors.append(
                f"Hash mismatch for '{skill_name}': expected {expected_hash}, got raw {raw_hash} / norm {norm_hash}"
            )

    return (len(errors) == 0), errors

def main() -> int:
    parser = argparse.ArgumentParser(description="Cryptographically verify local skills against skills-lock.json")
    parser.add_argument("--lock-file", default="skills-lock.json", help="Path to skills-lock.json")
    parser.add_argument("--skills-dir", default=".agents/skills", help="Directory of active agent skills")
    parser.add_argument("--quiet", action="store_true", help="Suppress non-error logging")

    args = parser.parse_args()
    repo_root = Path(__file__).resolve().parent.parent
    lock_path = (repo_root / args.lock_file) if not Path(args.lock_file).is_absolute() else Path(args.lock_file)
    skills_root = (repo_root / args.skills_dir) if not Path(args.skills_dir).is_absolute() else Path(args.skills_dir)

    if not args.quiet:
        print("=" * 80)
        print("[*] CRYPTOGRAPHIC SKILLS LOCKFILE VERIFIER")
        print(f"    Lockfile:   {lock_path}")
        print(f"    Skills Dir: {skills_root}")
        print("=" * 80)

    is_valid, errors = verify_skills_lock(lock_path, skills_root)

    if is_valid:
        if not args.quiet:
            with open(lock_path, "r", encoding="utf-8") as f:
                count = len(json.load(f).get("skills", {}))
            print(f"[OK] All {count} skills in {lock_path.name} verified cryptographically!")
        return 0
    else:
        print(f"[FAIL] Cryptographic integrity verification FAILED with {len(errors)} error(s):", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
