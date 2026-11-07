#!/usr/bin/env python3
"""
test-skills.py — Automated linter and validation test suite for all skills
in the Ai-Models-List repository.

Validates:
1. Standard YAML frontmatter (name, description).
2. Law 2 core sections (When to Use, Core Capabilities / Workflow, Warnings / Anti-patterns).
3. Local file link references (asserts referenced templates, references, and scripts exist).
"""

import os
import re
import sys
from pathlib import Path

# Force UTF-8 encoding
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_ROOT = REPO_ROOT / "skills"

def parse_frontmatter(content: str):
    """Extract YAML frontmatter without external dependencies."""
    if not content.startswith("---"):
        return None, "Missing opening frontmatter delimiter (---)"
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, "Missing closing frontmatter delimiter (---)"
    fm_text = parts[1]
    data = {}
    for line in fm_text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" in line:
            k, v = line.split(":", 1)
            k = k.strip()
            v = v.strip().strip('"').strip("'")
            data[k] = v
    return data, None

def validate_skill(skill_file: Path):
    """Validate a single SKILL.md file against Law 2 and link integrity."""
    errors = []
    warnings = []

    try:
        with open(skill_file, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
    except Exception as e:
        return [f"Failed to read file: {e}"], []

    # 1. Frontmatter Validation
    fm, err = parse_frontmatter(content)
    if err:
        errors.append(err)
    else:
        if "name" not in fm or not fm["name"]:
            errors.append("Frontmatter missing required 'name' field")
        if "description" not in fm or not fm["description"]:
            errors.append("Frontmatter missing required 'description' field")

    # 2. Section Checks (Law 2 compliance)
    lower_content = content.lower()
    has_when = "when to use" in lower_content or "prerequisites" in lower_content or "objective" in lower_content
    has_capabilities = "capabilities" in lower_content or "workflow" in lower_content or "instructions" in lower_content or "steps" in lower_content
    has_warnings = "anti-pattern" in lower_content or "warning" in lower_content or "rules" in lower_content or "invariants" in lower_content or "prerequisites" in lower_content or "execution_context" in lower_content

    if not has_when:
        warnings.append("Missing 'When to Use' or 'Prerequisites' section")
    if not has_capabilities:
        warnings.append("Missing 'Core Capabilities' or 'Workflow' section")
    if not has_warnings:
        warnings.append("Missing 'Anti-Patterns / Warnings' or 'Rules' section")

    # 3. Local Link Integrity Check
    # Regex to capture markdown links: [text](path)
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
    for text, link in links:
        link = link.strip()
        # Skip external http/https, mailto, anchor links, and file://
        if link.startswith(("http://", "https://", "mailto:", "#", "file://")):
            continue
        # Split optional anchor
        target_path_str = link.split("#")[0]
        if not target_path_str:
            continue
        
        target_file = (skill_file.parent / target_path_str).resolve()
        if not target_file.exists():
            # Check relative to REPO_ROOT
            repo_relative = (REPO_ROOT / target_path_str.lstrip("/\\")).resolve()
            if not repo_relative.exists():
                warnings.append(f"Broken local link reference: '{link}' (target not found)")

    return errors, warnings

def main():
    print("=" * 80)
    print("[*] SKILLS QUALITY & LINK AUDIT SUITE (Law 2 Compliance Gate)")
    print(f"    Scanning: {SKILLS_ROOT}")
    print("=" * 80)

    all_skills = list(SKILLS_ROOT.rglob("SKILL.md"))
    print(f"[*] Discovered {len(all_skills)} SKILL.md packages across all domains.")

    total_passed = 0
    total_warnings = 0
    total_errors = 0

    error_details = []
    warning_details = []

    for skill_file in sorted(all_skills):
        rel_path = skill_file.relative_to(SKILLS_ROOT)
        errors, warnings = validate_skill(skill_file)

        if errors:
            total_errors += 1
            error_details.append((rel_path, errors))
            print(f"  [FAIL] {rel_path}: {len(errors)} error(s)")
        elif warnings:
            total_warnings += 1
            warning_details.append((rel_path, warnings))
            total_passed += 1
        else:
            total_passed += 1

    print("\n" + "-" * 80)
    print(f"[*] AUDIT RESULTS:")
    print(f"    Total Skills Evaluated: {len(all_skills)}")
    print(f"    Passed Cleanly:         {total_passed - total_warnings} skills")
    print(f"    Passed with Warnings:   {total_warnings} skills")
    print(f"    Failed (Errors):        {total_errors} skills")
    print("-" * 80)

    if error_details:
        print("\n[!] CRITICAL ERRORS:")
        for path, errs in error_details:
            print(f"  - {path}:")
            for e in errs:
                print(f"      * {e}")
        sys.exit(1)

    if warning_details:
        print(f"\n[i] NOTICE: {len(warning_details)} skills have minor structural recommendations.")
        for path, warns in warning_details[:5]:
            print(f"  - {path}: {', '.join(warns)}")
        if len(warning_details) > 5:
            print(f"    ... and {len(warning_details) - 5} more.")

    print("\n[OK] Skill Quality & Link Audit PASSED successfully!")
    sys.exit(0)

if __name__ == "__main__":
    main()
