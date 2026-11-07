#!/usr/bin/env python3
"""
Scaffold Layer 15 Universal Project Documentation into any target project.
Usage:
    python scripts/scaffold-project-docs.py --target-dir "D:/Codes/MyProject" --project-name "MyProject"
"""

import os
import sys
import argparse

TEMPLATES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates', 'layer-15'))

MAPPING = {
    '01-foundation/README.template.md': 'README.md',
    '01-foundation/CONTRIBUTING.template.md': 'CONTRIBUTING.md',
    '01-foundation/CHANGELOG.template.md': 'CHANGELOG.md',
    '01-foundation/SECURITY.template.md': 'SECURITY.md',
    '02-business-strategy/BRD.template.md': 'docs/BRD.md',
    '02-business-strategy/MRD.template.md': 'docs/MRD.md',
    '03-product-scope/PRD.template.md': 'docs/PRD.md',
    '03-product-scope/ROADMAP.template.md': 'docs/ROADMAP.md',
    '03-product-scope/FEATURES.template.md': 'docs/FEATURES.md',
    '03-product-scope/PERSONAS.template.md': 'docs/PERSONAS.md',
    '04-architecture-engineering/ARCHITECTURE.template.md': 'docs/ARCHITECTURE.md',
    '04-architecture-engineering/DESIGN.template.md': 'docs/DESIGN.md',
    '04-architecture-engineering/TRD.template.md': 'docs/TRD.md',
    '04-architecture-engineering/SRD.template.md': 'docs/SRD.md',
    '04-architecture-engineering/SSD.template.md': 'docs/SSD.md',
    '04-architecture-engineering/TSD.template.md': 'docs/TSD.md',
    '04-architecture-engineering/DATA-MODEL.template.md': 'docs/DATA-MODEL.md',
    '04-architecture-engineering/API-SPECIFICATION.template.md': 'docs/API-SPECIFICATION.md',
    '04-architecture-engineering/adr/0000-record-architecture-decision.template.md': 'docs/adr/0000-record-architecture-decision.md',
    '05-ai-governance/AGENTS.template.md': 'AGENTS.md',
    '05-ai-governance/RULES.template.md': 'docs/governance/RULES.md',
    '05-ai-governance/BRANCHING.template.md': 'docs/governance/BRANCHING.md',
    '05-ai-governance/MEMORY.template.md': 'docs/governance/MEMORY.md',
    '05-ai-governance/TASKS.template.md': 'docs/TASKS.md',
    '06-testing-and-reports/TEST-STRATEGY.template.md': 'docs/testing/TEST-STRATEGY.md',
    '06-testing-and-reports/SPRINT-CLOSEOUT-REPORT.template.md': 'docs/reports/Sprint-01-Closeout-Report.md',
    '06-testing-and-reports/MILESTONE-VERIFICATION.template.md': 'docs/reports/v1.0-Milestone-Verification-Report.md',
    '06-testing-and-reports/BENCHMARK-REPORT.template.md': 'docs/testing/field-reports/BaselineBenchmark.md'
}

def main():
    parser = argparse.ArgumentParser(description="Scaffold Layer 15 documentation into a project.")
    parser.add_argument("--target-dir", required=True, help="Target project root directory")
    parser.add_argument("--project-name", required=True, help="Project name")
    parser.add_argument("--author", default="Engineering Team", help="Author / Team name")
    parser.add_argument("--version", default="1.0.0-draft", help="Initial version string")
    parser.add_argument("--dry-run", action="store_true", help="Print actions without writing files")

    args = parser.parse_args()
    target_root = os.path.abspath(args.target_dir)

    print(f"Scaffolding Layer 15 Documentation into: {target_root}")
    print(f"Project Name: {args.project_name} | Author: {args.author} | Version: {args.version}")
    if args.dry_run:
        print("[MODE: DRY RUN]")

    count = 0
    for template_rel, target_rel in MAPPING.items():
        src_file = os.path.join(TEMPLATES_DIR, template_rel)
        if not os.path.exists(src_file):
            print(f"  [WARN] Template missing: {src_file}")
            continue

        with open(src_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace standard placeholders
        content = content.replace("{{PROJECT_NAME}}", args.project_name)
        content = content.replace("{{VERSION}}", args.version)
        content = content.replace("{{AUTHOR}}", args.author)
        content = content.replace("{{DATE}}", "2026-11-07")
        content = content.replace("{{STATUS}}", "Draft")

        dest_file = os.path.join(target_root, target_rel)

        if not args.dry_run:
            os.makedirs(os.path.dirname(dest_file), exist_ok=True)
            with open(dest_file, 'w', encoding='utf-8') as f:
                f.write(content)

        print(f"  [OK] {target_rel}")
        count += 1

    print(f"\n[DONE] Successfully scaffolded {count} Layer 15 documents into '{target_root}'.")

if __name__ == '__main__':
    main()

