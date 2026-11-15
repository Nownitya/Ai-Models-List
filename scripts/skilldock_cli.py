#!/usr/bin/env python3
"""
SkillDock Standalone CLI (skilldock)
The authoritative command-line interface for querying, inspecting, stacking,
and orchestrating AI coding skills, starter suites, and multi-agent swarm teams.

Usage:
    python scripts/skilldock_cli.py search <query> [--priority P0] [--limit 10] [--json]
    python scripts/skilldock_cli.py inspect <skill-id> [--json]
    python scripts/skilldock_cli.py starter list [--json]
    python scripts/skilldock_cli.py starter load <pack-id>
    python scripts/skilldock_cli.py stack list [--json]
    python scripts/skilldock_cli.py stack add <skill-id...>
    python scripts/skilldock_cli.py stack remove <skill-id...>
    python scripts/skilldock_cli.py stack clear
    python scripts/skilldock_cli.py stack export [--format cursorrules|claude|markdown|swarm|cli] [--output <path>]
    python scripts/skilldock_cli.py swarm manifest [--output <path>]
    python scripts/skilldock_cli.py swarm brief [--output <path>]
"""

import sys
import os
import json
import argparse
from typing import List, Dict, Any, Optional

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATRIX_JSON_PATH = os.path.join(ROOT_DIR, 'web', 'src', 'data', 'matrix.json')
LOCAL_STACK_PATH = os.environ.get('SKILLDOCK_STACK_PATH') or os.path.join(ROOT_DIR, '.skilldock-stack.json')

STARTER_PACKS = [
    {
        "id": "gsd-engine",
        "title": "GSD Autonomous Wave Suite",
        "category": "Autonomous Execution",
        "badge": "open-gsd/gsd-core",
        "description": "Structured development into Discuss → Plan → Execute → Verify → Ship waves with verification gates.",
        "skillIds": [
            "gsd-new-project",
            "gsd-onboard",
            "discuss-→-plan-→-execute-→-verify-→-ship",
            "gsd-core-host-integration",
            "gsd-security-/-verification-gates",
        ],
        "tokenEstimate": 2250,
        "savings": "82%"
    },
    {
        "id": "superpowers-harness",
        "title": "Superpowers Engineering Suite",
        "category": "Agent Architecture",
        "badge": "obra/superpowers",
        "description": "Jesse Vincent's battle-tested development harness: Brainstorming, Writing Plans, Executing Plans, and TDD.",
        "skillIds": [
            "brainstorming",
            "writing-plans",
            "executing-plans",
            "test-driven-development",
            "systematic-debugging",
            "using-git-worktrees",
        ],
        "tokenEstimate": 2400,
        "savings": "80%"
    },
    {
        "id": "gstack-founder",
        "title": "gstack Founder & Review Suite",
        "category": "YC Founder Workflow",
        "badge": "garrytan/gstack",
        "description": "Garry Tan / YC startup workflow: CEO strategy critique, architecture audit, design review, QA, and shipping.",
        "skillIds": ["plan-ceo-review", "plan-eng-review", "plan-design-review", "autoplan", "review", "ship"],
        "tokenEstimate": 2100,
        "savings": "84%"
    },
    {
        "id": "ecc-ralph-loop",
        "title": "ECC & Ralph Autonomous Loop",
        "category": "Autonomous Agents",
        "badge": "affaan-m/ecc",
        "description": "Autonomous PRD story execution with Ralph loop, AgentShield invariant guards, and anti-slop design checks.",
        "skillIds": ["ralph-loop", "everything-claude-code-(ecc)", "impeccable", "taste-skill", "karpathy-guidelines"],
        "tokenEstimate": 2350,
        "savings": "81%"
    },
    {
        "id": "android-kmp",
        "title": "Android & KMP Native Mobile",
        "category": "Mobile Engineering",
        "badge": "android/skills",
        "description": "Hardware interop, Compose UI, Navigation 3, ANR triage, Swift bridges, and Kotlin Gradle toolchains.",
        "skillIds": [
            "camerax",
            "navigation-3",
            "compose-preview",
            "anr-audit-and-fix",
            "r8-analyzer",
            "swiftui-pro-(twostraws)",
        ],
        "tokenEstimate": 2460,
        "savings": "90%"
    },
    {
        "id": "second-brain-context",
        "title": "Second Brain & Knowledge Graph",
        "category": "Developer Second Brain",
        "badge": "graphify-labs/graphify",
        "description": "Obsidian vault synchronization, MemPalace semantic memory, AST codebase graphs, and Context7 docs.",
        "skillIds": ["obsidian-developer-second-brain", "graphify", "mempalace", "context7", "billion-context"],
        "tokenEstimate": 2300,
        "savings": "85%"
    },
    {
        "id": "claude-marketplace-suite",
        "title": "Claude Marketplace Essential Suite",
        "category": "Claude Marketplace",
        "badge": "anthropics/claude-plugins-official",
        "description": "Top-ranked official plugins from the 530-plugin Claude Marketplace: Code Review, Context7, Playwright, Ralph Loop, and Superpowers.",
        "skillIds": ["code-review", "context7", "playwright-cli", "ralph-loop", "brainstorming"],
        "tokenEstimate": 2150,
        "savings": "83%"
    },
    {
        "id": "modern-web-anti-slop",
        "title": "Modern Web & Anti-Slop Suite",
        "category": "Design & Frontend",
        "badge": "GoogleChrome/modern-web-guidance-src",
        "description": "Google Chrome Modern Web Guidance, Taste Skill, and Unslop for high-performance native browser APIs, accessibility, and craft UI.",
        "skillIds": ["modern-web-guidance", "taste-skill", "unslop", "shadcn-ui", "extract-design-tokens"],
        "tokenEstimate": 1840,
        "savings": "93%"
    }
]


def load_matrix() -> Dict[str, Any]:
    if not os.path.exists(MATRIX_JSON_PATH):
        raise FileNotFoundError(f"Matrix data not found at {MATRIX_JSON_PATH}. Run python scripts/export_matrix_json.py first.")
    with open(MATRIX_JSON_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def find_skill(key: str, skills: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    k = key.strip().lower()
    for s in skills:
        if s.get('id', '').lower() == k or s.get('scoped', '').lower() == k or s.get('uniqueId', '').lower() == k:
            return s
    k_norm = k.replace('-', '').replace(' ', '').replace('_', '')
    for s in skills:
        sid_norm = s.get('id', '').lower().replace('-', '').replace(' ', '').replace('_', '')
        if sid_norm == k_norm:
            return s
    return None


def load_local_stack() -> List[Dict[str, Any]]:
    if not os.path.exists(LOCAL_STACK_PATH):
        return []
    try:
        with open(LOCAL_STACK_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('stack', []) if isinstance(data, dict) else data
    except Exception:
        return []


def save_local_stack(stack: List[Dict[str, Any]]) -> None:
    with open(LOCAL_STACK_PATH, 'w', encoding='utf-8') as f:
        json.dump({'stack': stack, 'updatedAt': __import__('datetime').datetime.now().isoformat()}, f, indent=2)


def partition_stack(stack: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    planners = []
    verifiers = []
    builders = []

    for s in stack:
        sid = s.get('id', '').lower()
        cat = s.get('categoryId', '').lower()
        desc = s.get('description', '').lower()
        prio = s.get('priority', '')

        is_verifier = (
            prio == 'P0' or
            'testing' in cat or 'review' in cat or
            'tdd' in sid or 'qa' in sid or 'test' in sid or
            'guard' in sid or 'careful' in sid or 'benchmark' in sid or
            'adversarial' in desc or 'verification' in desc
        )
        is_planner = (
            'core-engineering' in cat or 'mattpocock' in cat or 'gsd' in cat or
            'plan' in sid or 'domain' in sid or 'architecture' in sid or
            'to-spec' in sid or 'roadmap' in sid or 'triage' in sid or 'gsd' in sid
        )

        if is_verifier:
            verifiers.append(s)
        elif is_planner:
            planners.append(s)
        else:
            builders.append(s)

    if not builders and (len(planners) > 1 or len(verifiers) > 1):
        if len(planners) > 1:
            builders.append(planners.pop())
        elif len(verifiers) > 1:
            builders.append(verifiers.pop())

    return {'planners': planners, 'builders': builders, 'verifiers': verifiers}


def cmd_search(args: argparse.Namespace) -> None:
    matrix = load_matrix()
    skills = matrix.get('skills', [])
    query = (args.query or '').strip().lower()

    matches = []
    for s in skills:
        if args.priority and s.get('priority') != args.priority.upper():
            continue
        if args.category and args.category.lower() not in s.get('categoryId', '').lower():
            continue

        text_corpus = f"{s.get('id', '')} {s.get('name', '')} {s.get('description', '')} {s.get('categoryLabel', '')}".lower()
        if not query or query in text_corpus:
            matches.append(s)

    if args.limit:
        matches = matches[:args.limit]

    if args.json:
        print(json.dumps(matches, indent=2))
        return

    print(f"\n🔍 SkillDock Catalog Search Results for '{query}' ({len(matches)} matches):\n")
    print(f"{'PRIORITY':<10} {'ID / SLASH':<32} {'CATEGORY':<24} {'NAME & UPSTREAM'}")
    print("-" * 90)
    for s in matches:
        prio = s.get('priority', 'P1')
        slash = f"/{s.get('scoped', s.get('id'))}"
        cat = s.get('categoryLabel', s.get('categoryId', ''))[:22]
        name = s.get('name', '')
        repo = s.get('repo', '')
        upstream = f"({repo})" if repo else ""
        print(f"{prio:<10} {slash:<32} {cat:<24} {name} {upstream}")
    print(f"\nTip: Run 'skilldock inspect <id>' to inspect full rules or 'skilldock stack add <id>' to stack.\n")


def cmd_inspect(args: argparse.Namespace) -> None:
    matrix = load_matrix()
    skills = matrix.get('skills', [])
    target = args.skill_id.strip().lower()

    found = None
    for s in skills:
        if s.get('id', '').lower() == target or s.get('scoped', '').lower() == target:
            found = s
            break

    if not found:
        print(f"Error: Skill '{args.skill_id}' not found in SkillDock matrix.", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(found, indent=2))
        return

    print("=" * 80)
    print(f"📦 SKILLDOCK SPECIFICATION: {found.get('name')} (/{found.get('scoped')})")
    print("=" * 80)
    print(f"• Priority:    {found.get('priority')} | Category: {found.get('categoryLabel')} ({found.get('categoryId')})")
    print(f"• Upstream:    {found.get('repo') or 'Ai-Models-List Native Matrix'} ({found.get('stars', 0):,} ⭐)")
    print(f"• Official CLI: {found.get('cli')}")
    print(f"\n📖 DESCRIPTION & SCOPE:")
    print(f"  {found.get('description')}")
    print(f"\n⚡ ACTIVATION RECIPES:")
    print(f"  • Antigravity Chat:    /{found.get('scoped')}")
    if found.get('repo'):
        print(f"  • Claude Code (npm):   npx skills add {found.get('repo')} --skill {found.get('id')}")
    print(f"  • Local Python Script: {found.get('cli')}")
    print(f"\n🏛️ INVARIANTS & REPOSITORY LAWS:")
    print(f"  1. Law 1: Dual Matrix Parity (Markdown & CSV)")
    print(f"  2. Law 4: Strict Creator Isolation ({found.get('repo') or 'native'})")
    print(f"  3. Verification Gate: Evidence precedes assertions.")
    print("=" * 80 + "\n")


def cmd_starter_list(args: argparse.Namespace) -> None:
    if args.json:
        print(json.dumps(STARTER_PACKS, indent=2))
        return

    print("\n📦 SkillDock Curated 1-Click Starter Stacks (8 available):\n")
    print(f"{'ID':<22} {'TITLE & BADGE':<36} {'SKILLS':<8} {'TOKEN SAVINGS'}")
    print("-" * 80)
    for p in STARTER_PACKS:
        badge = f"[{p['badge']}]"
        title = f"{p['title']} {badge}"
        count = len(p['skillIds'])
        savings = f"~{p['savings']} (~{p['tokenEstimate']} tokens)"
        print(f"{p['id']:<22} {title:<36} {count:<8} {savings}")
    print(f"\nTip: Run 'skilldock starter load <id>' to load a complete suite into your local stack.\n")


def cmd_starter_load(args: argparse.Namespace) -> None:
    pack_id = args.pack_id.strip().lower()
    pack = next((p for p in STARTER_PACKS if p['id'].lower() == pack_id), None)
    if not pack:
        print(f"Error: Starter pack '{args.pack_id}' not found.", file=sys.stderr)
        sys.exit(1)

    matrix = load_matrix()
    skills = matrix.get('skills', [])

    existing_stack = load_local_stack()
    existing_ids = {s['id'] for s in existing_stack}

    added = 0
    for sid in pack['skillIds']:
        match = find_skill(sid, skills)
        if match and match['id'] not in existing_ids:
            existing_stack.append(match)
            existing_ids.add(match['id'])
            added += 1

    save_local_stack(existing_stack)
    print(f"✅ Loaded Starter Pack '{pack['title']}'. Added {added} skills. Active stack now has {len(existing_stack)} skills.")
    print(f"💡 Token Footprint: ~{pack['tokenEstimate']} tokens ({pack['savings']} savings vs monolithic prompts).")


def cmd_stack_list(args: argparse.Namespace) -> None:
    stack = load_local_stack()
    if args.json:
        print(json.dumps(stack, indent=2))
        return

    if not stack:
        print("\nℹ️  Your SkillDock stack is currently empty.")
        print("Tip: Add skills with 'skilldock stack add <id>' or load a starter with 'skilldock starter load <pack-id>'.\n")
        return

    estimated_tokens = len(stack) * 800
    baseline = 26400
    savings = round(((baseline - estimated_tokens) / baseline) * 100)
    dollar_savings = round(((baseline - estimated_tokens) * 1000 / 1000000) * 3.0, 2)

    print(f"\n🛠️  Active SkillDock Stack ({len(stack)} skills | ~{estimated_tokens:,} tokens | ~{savings}% savings | ~${dollar_savings} saved/1k turns):\n")
    print(f"{'PRIORITY':<10} {'SLASH COMMAND':<28} {'NAME & REPO'}")
    print("-" * 70)
    for s in stack:
        prio = s.get('priority', 'P1')
        slash = f"/{s.get('scoped', s.get('id'))}"
        name = s.get('name', '')
        repo = f"({s.get('repo')})" if s.get('repo') else ""
        print(f"{prio:<10} {slash:<28} {name} {repo}")
    print(f"\nCommands:")
    print(f"  • Export Config: skilldock stack export --format cursorrules|claude|markdown|swarm")
    print(f"  • Swarm Brief:   skilldock swarm brief")
    print(f"  • Clear Stack:   skilldock stack clear\n")


def cmd_stack_add(args: argparse.Namespace) -> None:
    matrix = load_matrix()
    skills = matrix.get('skills', [])

    stack = load_local_stack()
    existing_ids = {s['id'] for s in stack}

    added = []
    for sid in args.skill_ids:
        target = find_skill(sid, skills)
        if target:
            if target['id'] not in existing_ids:
                stack.append(target)
                existing_ids.add(target['id'])
                added.append(target['id'])
        else:
            print(f"Warning: Skill '{sid}' not found in catalog. Skipped.", file=sys.stderr)

    save_local_stack(stack)
    print(f"✅ Added {len(added)} skills to stack: {', '.join(added) if added else 'None'}. Total in stack: {len(stack)}.")


def cmd_stack_remove(args: argparse.Namespace) -> None:
    stack = load_local_stack()
    remove_keys = {sid.strip().lower() for sid in args.skill_ids}

    new_stack = [s for s in stack if s.get('id', '').lower() not in remove_keys and s.get('scoped', '').lower() not in remove_keys]
    removed_count = len(stack) - len(new_stack)

    save_local_stack(new_stack)
    print(f"✅ Removed {removed_count} skills from stack. Remaining: {len(new_stack)}.")


def cmd_stack_clear(args: argparse.Namespace) -> None:
    save_local_stack([])
    print("✅ Cleared all skills from local stack.")


def cmd_stack_export(args: argparse.Namespace) -> None:
    stack = load_local_stack()
    if not stack:
        print("Error: Stack is empty. Nothing to export.", file=sys.stderr)
        sys.exit(1)

    fmt = (args.format or 'markdown').lower()
    output_content = ""

    if fmt == 'cursorrules':
        output_content = f"# .cursorrules — SkillDock Custom Agent Architecture\n# Generated: {__import__('datetime').date.today()}\n\n"
        for s in stack:
            output_content += f"## Skill: {s.get('name')} (/{s.get('scoped')})\n"
            output_content += f"- Priority: {s.get('priority')}\n"
            if s.get('repo'):
                output_content += f"- Upstream: {s.get('repo')}\n"
            output_content += f"- Command: {s.get('cli')}\n\n"
        output_content += "- Always verify parity and run tests before claiming completion.\n"

    elif fmt in ('cursor045', 'mdc'):
        output_content = f"---\ndescription: \"SkillDock v3.1 Custom Agent Stack ({len(stack)} Active Skills)\"\nglobs: \"*\"\nalwaysApply: true\n---\n\n"
        output_content += f"# SkillDock Modern Cursor 0.45+ Multi-Agent Rules\n# Generated: {__import__('datetime').date.today()}\n\n"
        output_content += "## Non-Negotiable Operating Laws\n"
        output_content += "1. Think before coding: Inspect codebase, formulate plan, and verify contracts.\n"
        output_content += "2. Evidence before assertions: Always run tests before declaring success.\n"
        output_content += "3. Surgical changes: Touch only what is necessary.\n\n"
        output_content += f"## Active Skill Contracts ({len(stack)})\n\n"
        for s in stack:
            output_content += f"### [{s.get('priority')}] {s.get('name')} (/{s.get('scoped')})\n"
            if s.get('repo'):
                output_content += f"- Upstream: https://github.com/{s.get('repo')}\n"
            output_content += f"- Directive: Enforce {s.get('name')} quality rubrics and constraints.\n"
            output_content += f"- Activation: /{s.get('scoped')}\n"
            output_content += f"- Command: {s.get('cli')}\n\n"

    elif fmt in ('minified-prompt', 'minified'):
        output_content = "<system_prompt version=\"3.0\" mode=\"production\" density=\"high\">\n"
        output_content += "# ROLE: Lead Systems Engineer & Autonomous Coding Fleet\n"
        output_content += "# DIRECTIVE: Execute surgical, deterministic implementations. Reject conversational fluff. Output verified code only.\n\n"
        output_content += f"<active_skills count=\"{len(stack)}\">\n"
        for s in stack:
            output_content += f"[SKILL: {s.get('id')} | /{s.get('scoped')} | {s.get('priority')}]\n"
            if s.get('repo'):
                output_content += f"upstream: {s.get('repo')}\n"
            if s.get('cli'):
                output_content += f"cli: {s.get('cli')}\n"
        output_content += "</active_skills>\n\n"
        output_content += "<hard_invariants>\n"
        output_content += "1. EVIDENCE_OVER_ASSERTIONS: Never claim success without verification command outputs.\n"
        output_content += "2. ANTI_SLOP: Zero purple glow blobs, zero decorative emoji clutter, zero unrequested wrappers.\n"
        output_content += "3. YAGNI_SHORTEST_DIFF: Smallest complete change wins. No speculative factories or interfaces.\n"
        output_content += "4. CREATOR_PURITY: Never merge distinct upstream frameworks into synthetic blends.\n"
        output_content += "</hard_invariants>\n"
        output_content += "</system_prompt>\n"

    elif fmt == 'claude':
        config = {
            "$schema": "https://json.schemastore.org/claude-settings.json",
            "version": "1.0",
            "customSkills": [
                {
                    "name": s.get('name'),
                    "slashCommand": f"/{s.get('scoped')}",
                    "priority": s.get('priority'),
                    "upstreamRepo": s.get('repo'),
                    "installCommand": s.get('cli')
                } for s in stack
            ],
            "mcpServers": {
                "skilldock": {
                    "command": "python",
                    "args": ["scripts/mcp_server.py"]
                }
            }
        }
        output_content = json.dumps(config, indent=2)

    elif fmt in ('windsurf', 'windsurfrules'):
        output_content = f"# .windsurfrules — SkillDock Custom Cascade AI Rules\n# Generated: {__import__('datetime').date.today()}\n\n"
        output_content += "## Core Directives\n- When solving engineering tasks, strictly adhere to the following specialized skill contracts.\n- Verify code parity and execute unit tests before asserting completion.\n- Avoid speculative over-engineering; keep implementations minimal, surgical, and robust.\n\n## Active Skill Contracts\n\n"
        for s in stack:
            output_content += f"### Skill: {s.get('name')} (/{s.get('scoped')})\n"
            output_content += f"- Priority: {s.get('priority')}\n"
            if s.get('repo'):
                output_content += f"- Upstream: https://github.com/{s.get('repo')}\n"
            output_content += f"- Activation: /{s.get('scoped')}\n"
            output_content += f"- Command: {s.get('cli')}\n\n"

    elif fmt in ('cline', 'clinerules'):
        output_content = f"# .clinerules — SkillDock Autonomous Coding Agent System Rules\n# Generated: {__import__('datetime').date.today()}\n\n"
        output_content += "You are an expert autonomous software engineer operating under the SkillDock engineering framework.\n\n"
        output_content += "## Non-Negotiable Operating Laws:\n1. Think before coding: Plan changes, inspect codebase, and verify contracts first.\n2. Evidence before assertions: Always run tests before declaring success.\n3. Surgical changes: Touch only what is necessary.\n\n## Active Skill Directives:\n\n"
        for s in stack:
            output_content += f"### [{s.get('priority')}] {s.get('name')} (/{s.get('scoped')})\n"
            output_content += f"- Trigger: When working with {s.get('name', '').lower()} workflows or /{s.get('scoped')}.\n"
            output_content += f"- Directive: Enforce {s.get('name')} specification standards.\n\n"

    elif fmt == 'copilot':
        output_content = f"# GitHub Copilot Custom Repository Instructions\n# Place at: .github/copilot-instructions.md\n# Generated: {__import__('datetime').date.today()}\n\n"
        output_content += f"## Active Skill Constraints ({len(stack)} Active Skills)\n\n"
        for s in stack:
            output_content += f"### {s.get('name')} (/{s.get('scoped')}) — Priority: {s.get('priority')}\n"
            output_content += f"- Enforce {s.get('name')} rules and conventions.\n\n"

    elif fmt == 'antigravity':
        manifest = {
            "$schema": "https://schema.antigravity.google/v1/workspace-skills.json",
            "version": "1.0.0",
            "generator": "SkillDock CLI v3.0",
            "skills": [
                {
                    "id": s.get('id'),
                    "name": s.get('name'),
                    "scopedCommand": f"/{s.get('scoped')}",
                    "priority": s.get('priority'),
                    "skillPath": f".agents/skills/{s.get('id')}/SKILL.md",
                    "installCli": s.get('cli')
                } for s in stack
            ],
            "repoLaws": [
                "Law 1: Parity - Always verify parity before claiming completion.",
                "Law 2: Standard Structure - All skills must follow standard SKILL.md format.",
                "Law 3: Evidence Before Assertions - Run tests and verification commands before declaring success.",
                "Law 4: Creator Independence - Preserve unique methodology across distinct upstream frameworks."
            ]
        }
        output_content = json.dumps(manifest, indent=2)

    elif fmt == 'swarm':
        output_content = json.dumps(generate_swarm_manifest(stack), indent=2)

    elif fmt == 'cli':
        output_content = "\n".join(s.get('cli', '') for s in stack)

    else:  # markdown
        output_content = f"# 🛠️ Custom AI Agent Stack\n\n> Exported from SkillDock on {__import__('datetime').date.today()}\n\n"
        output_content += "| Priority | Skill Name | Slash Command | Official Install Command |\n"
        output_content += "| :--- | :--- | :--- | :--- |\n"
        for s in stack:
            output_content += f"| **{s.get('priority')}** | {s.get('name')} | `/{s.get('scoped')}` | `{s.get('cli')}` |\n"

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output_content)
        print(f"✅ Exported {fmt} configuration to {args.output} ({len(output_content)} bytes).")
    else:
        print(output_content)


def generate_swarm_manifest(stack: List[Dict[str, Any]]) -> Dict[str, Any]:
    partitioned = partition_stack(stack)
    planners = partitioned['planners']
    builders = partitioned['builders']
    verifiers = partitioned['verifiers']

    workers = []
    if planners:
        workers.append({
            "name": "architect",
            "role": "Lead Architect & Phase Planner",
            "model": "claude-3-7-sonnet",
            "skills": [s.get('scoped', s.get('id')) for s in planners],
            "brief": f"Decompose requirements into atomic waves. Active skills: {', '.join('/' + s.get('scoped', s.get('id')) for s in planners)}."
        })
    if builders:
        workers.append({
            "name": "builder",
            "role": "Domain Feature Implementer",
            "model": "gemini-2.0-flash",
            "skills": [s.get('scoped', s.get('id')) for s in builders],
            "brief": f"Execute implementations matching specification contracts. Active skills: {', '.join('/' + s.get('scoped', s.get('id')) for s in builders)}."
        })
    if verifiers:
        workers.append({
            "name": "verifier",
            "role": "Adversarial QA & Security Auditor",
            "model": "deepseek-reasoner",
            "skills": [s.get('scoped', s.get('id')) for s in verifiers],
            "brief": f"Enforce repository laws and require test evidence before completion. Active skills: {', '.join('/' + s.get('scoped', s.get('id')) for s in verifiers)}."
        })

    return {
        "version": "1.0.0",
        "title": "SkillDock Autonomous Multi-Agent Swarm",
        "generatedAt": __import__('datetime').datetime.now().isoformat(),
        "orchestration": {
            "antigravity": {
                "coordinator": {
                    "name": "coordinator",
                    "role": "Swarm Coordinator",
                    "model": "claude-3-7-sonnet",
                    "brief": "Coordinate tasks and manage shared board."
                },
                "workers": workers
            }
        }
    }


def cmd_swarm_manifest(args: argparse.Namespace) -> None:
    stack = load_local_stack()
    manifest = generate_swarm_manifest(stack)
    content = json.dumps(manifest, indent=2)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated Swarm Manifest at {args.output}")
    else:
        print(content)


def cmd_swarm_brief(args: argparse.Namespace) -> None:
    stack = load_local_stack()
    partitioned = partition_stack(stack)
    planners = partitioned['planners']
    builders = partitioned['builders']
    verifiers = partitioned['verifiers']

    date_str = __import__('datetime').date.today()
    brief = f"# 🤖 SkillDock Multi-Agent Swarm Brief ({date_str})\n\n"
    brief += f"> **Active Stack**: {len(stack)} skills curated from SkillDock\n\n"
    brief += "## 👥 Agent Roster\n"
    brief += "- **@coordinator** (Coordinator, Model: `claude-3-7-sonnet`): Task management and release gate.\n"
    if planners:
        brief += f"- **@architect** (Planner, Model: `claude-3-7-sonnet`): {', '.join('/' + s.get('scoped', s.get('id')) for s in planners)}\n"
    if builders:
        brief += f"- **@builder** (Builder, Model: `gemini-2.0-flash`): {', '.join('/' + s.get('scoped', s.get('id')) for s in builders)}\n"
    if verifiers:
        brief += f"- **@verifier** (QA Auditor, Model: `deepseek-reasoner`): {', '.join('/' + s.get('scoped', s.get('id')) for s in verifiers)}\n"

    brief += "\n## 🏛️ Invariants: Evidence before assertions. Parity across Markdown and CSV catalogs.\n"

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(brief)
        print(f"✅ Saved Swarm Brief to {args.output}")
    else:
        print(brief)


def cmd_recommend(args: argparse.Namespace) -> None:
    manifest_path = args.path
    if not manifest_path:
        candidates = ['package.json', 'build.gradle.kts', 'build.gradle', 'pyproject.toml', 'requirements.txt', 'Cargo.toml']
        for cand in candidates:
            if os.path.exists(cand):
                manifest_path = cand
                break

    if not manifest_path:
        print("Error: No manifest found. Please provide a path to package.json, build.gradle.kts, pyproject.toml, or a GitHub repository URL.", file=sys.stderr)
        sys.exit(1)

    import urllib.request
    import urllib.error
    import re

    content = ""
    target_filename = ""

    # Check if remote GitHub repository URL or shorthand (e.g. vercel/next.js)
    is_github_repo = False
    gh_match = re.match(r'^(?:https?://)?(?:www\.)?github\.com/([a-zA-Z0-9_.-]+)/([a-zA-Z0-9_.-]+)', manifest_path)
    if gh_match:
        gh_owner, gh_repo = gh_match.group(1), gh_match.group(2).replace('.git', '')
        is_github_repo = True
    elif not os.path.exists(manifest_path) and re.match(r'^[a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+$', manifest_path):
        parts = manifest_path.split('/')
        gh_owner, gh_repo = parts[0], parts[1].replace('.git', '')
        is_github_repo = True

    if is_github_repo:
        candidates = ['package.json', 'build.gradle.kts', 'build.gradle', 'pyproject.toml', 'requirements.txt', 'Cargo.toml']
        headers = {'User-Agent': 'SkillDock-CLI/3.1'}
        found = False
        for c in candidates:
            url = f"https://raw.githubusercontent.com/{gh_owner}/{gh_repo}/HEAD/{c}"
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=2.5) as resp:
                    if resp.status == 200:
                        content = resp.read().decode('utf-8', errors='ignore')
                        target_filename = f"github.com/{gh_owner}/{gh_repo} ({c})"
                        found = True
                        break
            except Exception:
                continue
        if not found:
            print(f"Error: Could not fetch manifest for https://github.com/{gh_owner}/{gh_repo} (checked package.json, build.gradle.kts, pyproject.toml, Cargo.toml).", file=sys.stderr)
            sys.exit(1)
    else:
        if not os.path.exists(manifest_path):
            print(f"Error: Manifest file '{manifest_path}' not found.", file=sys.stderr)
            sys.exit(1)
        target_filename = os.path.basename(manifest_path)
        with open(manifest_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

    # Rule-based detection
    detected_tech = []
    recommended_ids = []
    c_lower = content.lower()

    if 'react' in c_lower or 'next' in c_lower:
        detected_tech.append("React / Next.js")
        recommended_ids.extend(['taste-skill', 'unslop'])
    if 'tailwind' in c_lower:
        detected_tech.append("Tailwind CSS")
        if 'taste-skill' not in recommended_ids:
            recommended_ids.append('taste-skill')
    if 'svelte' in c_lower:
        detected_tech.append("Svelte 5")
        recommended_ids.extend(['svelte5-runes-patterns', 'taste-skill'])
    if 'prisma' in c_lower:
        detected_tech.append("Prisma ORM")
        recommended_ids.extend(['prisma-orm-patterns', 'neon-serverless-postgres'])
    if 'better-auth' in c_lower or 'next-auth' in c_lower or 'auth' in c_lower:
        detected_tech.append("Authentication")
        recommended_ids.append('better-auth-patterns')
    if 'fastapi' in c_lower or 'langchain' in c_lower or 'openai' in c_lower or 'anthropic' in c_lower:
        detected_tech.append("AI Agents / Python")
        recommended_ids.extend(['bifrost', 'freellmapi', 'systematic-debugging'])
    if 'compose' in c_lower or 'androidx' in c_lower or 'camerax' in c_lower:
        detected_tech.append("Android / Jetpack Compose")
        recommended_ids.extend(['compose-preview', 'navigation-3', 'camerax', 'anr-audit-and-fix'])
    if 'playwright' in c_lower or 'jest' in c_lower or 'vitest' in c_lower or 'pytest' in c_lower:
        detected_tech.append("Testing & Quality")
        recommended_ids.extend(['tdd', 'systematic-debugging', 'momentic-visual-testing'])

    # Always ensure general engineering excellence
    for baseline in ['karpathy-guidelines', 'ponytail']:
        if baseline not in recommended_ids:
            recommended_ids.append(baseline)

    matrix = load_matrix()
    skills = matrix.get('skills', [])
    matched_skills = []
    seen = set()
    for sid in recommended_ids:
        match = find_skill(sid, skills)
        if match and match['id'] not in seen:
            matched_skills.append(match)
            seen.add(match['id'])

    # Token & Dollar economics
    est_tokens = len(matched_skills) * 800
    baseline_tokens = 26400
    savings = round(((baseline_tokens - est_tokens) / baseline_tokens) * 100) if matched_skills else 0
    dollar_savings = round(((baseline_tokens - est_tokens) * 1000 / 1000000) * 3.0, 2)

    if args.json:
        res = {
            "manifest": manifest_path,
            "detectedTechnologies": detected_tech,
            "recommendedSkills": [
                {
                    "id": s['id'],
                    "name": s['name'],
                    "priority": s['priority'],
                    "scoped": s['scoped'],
                    "cli": s['cli']
                } for s in matched_skills
            ],
            "tokenEstimate": est_tokens,
            "monolithicBaseline": baseline_tokens,
            "tokenSavingsPercent": savings,
            "estimatedDollarSavingsPer1kTurnsClaude37": dollar_savings
        }
        print(json.dumps(res, indent=2))
        return

    print(f"\n✨ SkillDock Auto-Stack Recommendation for {target_filename}:")
    print(f"📦 Detected Technologies: {', '.join(detected_tech) if detected_tech else 'Standard Full-Stack'}")
    print(f"⚡ Token Footprint: ~{est_tokens:,} tokens (~{savings}% savings vs 26.4k baseline)")
    print(f"💰 Real Dollar Economics: Saves ~${dollar_savings}/1,000 Claude 3.7 turns\n")

    print(f"{'PRIORITY':<10} {'SLASH COMMAND':<28} {'NAME & CATEGORY'}")
    print("-" * 70)
    for s in matched_skills:
        print(f"{s.get('priority', 'P1'):<10} /{s.get('scoped'):<27} {s.get('name')} ({s.get('categoryLabel', '')})")

    if args.apply:
        stack = load_local_stack()
        existing_ids = {s['id'] for s in stack}
        added = 0
        for s in matched_skills:
            if s['id'] not in existing_ids:
                stack.append(s)
                existing_ids.add(s['id'])
                added += 1
        save_local_stack(stack)
        print(f"\n✅ Successfully applied recommendation! Added {added} skills to active stack. Total: {len(stack)}.")
        print(f"Tip: Run 'skilldock stack export --format cursorrules' to write rules to your project.\n")
    else:
        print(f"\nTip: Run 'skilldock recommend {manifest_path} --apply' to immediately load this stack.\n")


def lint_skill_stack_ids(skill_ids: List[str]) -> List[Dict[str, str]]:
    ids = set(s.lower() for s in skill_ids)
    findings = []

    # 1. Multiple Auth Providers
    auth_skills = ['better-auth-patterns', 'clerk-auth-identity', 'auth0']
    matched_auth = [s for s in auth_skills if s in ids]
    if len(matched_auth) > 1:
        findings.append({
            "type": "conflict",
            "title": "Redundant Authentication Providers",
            "message": f"Stack contains multiple auth solutions ({', '.join(matched_auth)}). Retaining one saves ~800 tokens and prevents contradictory session logic.",
            "action": "Keep your primary auth provider and remove duplicates."
        })

    # 2. Multiple Orchestrations
    suite_skills = ['gsd-core', 'everything-claude-code-(ecc)', 'ralph-loop']
    matched_suites = [s for s in suite_skills if s in ids]
    if len(matched_suites) > 1:
        findings.append({
            "type": "conflict",
            "title": "Overlapping Swarm / Loop Engines",
            "message": f"Stack contains multiple orchestration harnesses ({', '.join(matched_suites)}). Choose either GSD wave execution or Ralph loop.",
            "action": "Pick one orchestrator harness to prevent competing agent state loops."
        })

    # 3. Multiple Gateways
    gateway_skills = ['bifrost', 'freellmapi']
    matched_gateways = [s for s in gateway_skills if s in ids]
    if len(matched_gateways) > 1:
        findings.append({
            "type": "conflict",
            "title": "Multiple AI Router Gateways",
            "message": f"Both Bifrost (<200µs gateway) and FreeLLMAPI are active.",
            "action": "Select Bifrost for low-latency enterprise routing or FreeLLMAPI for zero-cost pooling."
        })

    # 4. Synergies
    if 'taste-skill' in ids and 'unslop' in ids:
        findings.append({
            "type": "synergy",
            "title": "Anti-Slop Design Synergy",
            "message": "Optimal pairing: taste-skill micro-interactions + unslop 9-pass design refactoring."
        })
    if 'tdd' in ids and 'systematic-debugging' in ids:
        findings.append({
            "type": "synergy",
            "title": "Verified Reliability Synergy",
            "message": "High-signal combo: TDD contract coverage + systematic-debugging root cause isolation."
        })
    if 'graphify' in ids and 'mempalace' in ids:
        findings.append({
            "type": "synergy",
            "title": "Second Brain & Knowledge Graph Synergy",
            "message": "Graphify AST code graph + MemPalace durable cross-session semantic memory."
        })
    if 'ponytail' in ids and 'karpathy-guidelines' in ids:
        findings.append({
            "type": "synergy",
            "title": "Pragmatic Simplicity Synergy",
            "message": "Ponytail shortest-diff wins + Karpathy surgical, think-before-coding discipline."
        })
    if 'pydantic-ai' in ids and 'better-auth-patterns' in ids:
        findings.append({
            "type": "synergy",
            "title": "End-to-End Type Safety Synergy",
            "message": "PydanticAI agent schemas + Better Auth typed session security."
        })
    if 'deepseek-r1-reasoning' in ids and ('tdd' in ids or 'test-driven-development' in ids):
        findings.append({
            "type": "synergy",
            "title": "Frontier Reasoning & Empirical Verification",
            "message": "DeepSeek-R1 extended <think> deliberation verified against TDD assertions."
        })

    # 5. Missing Test Guard
    ui_skills = ['taste-skill', 'unslop', 'shadcn-ui', 'compose-preview', 'modern-web-guidance', 'ui-ux-pro-max']
    testing_skills = ['tdd', 'test-driven-development', 'systematic-debugging', 'momentic-visual-testing', 'playwright-cli']
    has_ui = any(s in ids for s in ui_skills)
    has_testing = any(s in ids for s in testing_skills)
    if has_ui and not has_testing:
        findings.append({
            "type": "guard",
            "title": "Missing Test Verification Guard",
            "message": "Stack contains UI/frontend skills but lacks an automated test verification skill. Per Law 3, evidence must precede assertions.",
            "action": "Pair with /mp-tdd, /superpowers-systematic-debugging, or /test-playwright-cli."
        })

    return findings


def cmd_check(args: argparse.Namespace) -> None:
    target = args.path or os.getcwd()
    stack_file = None
    if os.path.isfile(target) and target.endswith('.json'):
        stack_file = target
    elif os.path.isdir(target):
        cand = os.path.join(target, '.skilldock-stack.json')
        if os.path.exists(cand):
            stack_file = cand
        elif os.path.exists(LOCAL_STACK_PATH):
            stack_file = LOCAL_STACK_PATH

    if not stack_file or not os.path.exists(stack_file):
        print(f"❌ Error: No active stack found at {target}. Run 'skilldock init' to initialize.", file=sys.stderr)
        sys.exit(1)

    with open(stack_file, 'r', encoding='utf-8') as f:
        stack = json.load(f)

    skill_ids = [s.get('id', '') for s in stack]
    findings = lint_skill_stack_ids(skill_ids)

    conflicts = [f for f in findings if f['type'] == 'conflict']
    guards = [f for f in findings if f['type'] == 'guard']
    synergies = [f for f in findings if f['type'] == 'synergy']

    if getattr(args, 'json', False):
        payload = {
            "valid": len(conflicts) == 0,
            "totalSkills": len(stack),
            "findings": findings
        }
        print(json.dumps(payload, indent=2))
        if conflicts:
            sys.exit(1)
        return

    print(f"\n🔍 SkillDock Compiler Linter Report ({len(stack)} skills checked in {os.path.basename(stack_file)}):")
    print("=" * 70)

    if not findings:
        print("✅ All clear! Stack is optimal with zero conflicts, redundancies, or missing guards.")
        sys.exit(0)

    for c in conflicts:
        print(f"❌ [CONFLICT] {c['title']}")
        print(f"   {c['message']}")
        if 'action' in c:
            print(f"   👉 Recommended: {c['action']}")
        print()

    for g in guards:
        print(f"⚠️  [GUARD] {g['title']}")
        print(f"   {g['message']}")
        if 'action' in g:
            print(f"   👉 Recommended: {g['action']}")
        print()

    for s in synergies:
        print(f"✨ [SYNERGY] {s['title']}")
        print(f"   {s['message']}")
        print()

    print("=" * 70)
    if conflicts:
        print("❌ Linter failed: Stack contains conflicting dependencies.")
        sys.exit(1)
    else:
        print("✅ Linter passed: Zero critical conflicts detected.")
        sys.exit(0)


def cmd_init(args: argparse.Namespace) -> None:
    target_dir = os.path.abspath(args.target) if args.target else os.getcwd()
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

    matrix = load_matrix()
    skills = matrix.get('skills', [])

    # 1. Search for project manifests
    manifest_candidates = [
        "package.json",
        "build.gradle.kts",
        "build.gradle",
        "pyproject.toml",
        "requirements.txt",
        "Cargo.toml"
    ]
    detected_manifest = None
    detected_content = ""
    for c in manifest_candidates:
        p = os.path.join(target_dir, c)
        if os.path.exists(p) and os.path.isfile(p):
            detected_manifest = c
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as f:
                    detected_content = f.read()
                break
            except Exception:
                pass

    # 2. Match skills
    if detected_manifest and detected_content:
        matched_skills, detected_tech = recommend_stack_from_manifest(detected_content, detected_manifest, skills)
    else:
        # Default core stack
        default_ids = ["taste-skill", "unslop", "systematic-debugging", "writing-plans"]
        matched_skills = [s for s in skills if s.get('id') in default_ids]
        detected_tech = ["Generic Software Engineering"]

    # Deduplicate
    unique_skills = []
    seen = set()
    for s in matched_skills:
        if s.get('id') not in seen:
            seen.add(s.get('id'))
            unique_skills.append(s)

    # 3. Save workspace stack: .skilldock-stack.json
    workspace_stack_path = os.path.join(target_dir, ".skilldock-stack.json")
    with open(workspace_stack_path, "w", encoding="utf-8") as f:
        json.dump(unique_skills, f, indent=2)

    # 4. Generate configured rule files
    fmt = (args.format or "cursor045").lower()
    created_files = [".skilldock-stack.json"]

    if fmt in ("cursor045", "cursor", "all"):
        rules_dir = os.path.join(target_dir, ".cursor", "rules")
        os.makedirs(rules_dir, exist_ok=True)
        mdc_path = os.path.join(rules_dir, "skilldock.mdc")
        mdc_content = f"""---
description: "SkillDock Curated Agent Capabilities & Repository Laws"
globs: ["*"]
alwaysApply: true
priority: 100
---

# SkillDock Agent Stack Specifications

You are an expert autonomous software engineer operating under the SkillDock Agentic framework.
The following {len(unique_skills)} capabilities are actively installed and required for this workspace:

## Active Stack Registry
"""
        for s in unique_skills:
            mdc_content += f"\n### `/{s.get('scoped')}` — {s.get('name')} [{s.get('priority')}]\n"
            if s.get('repo'):
                mdc_content += f"- Ecosystem: https://github.com/{s.get('repo')}\n"
            mdc_content += f"- Installation: `{s.get('officialCli') or s.get('cli')}`\n"
        with open(mdc_path, "w", encoding="utf-8") as f:
            f.write(mdc_content)
        created_files.append(".cursor/rules/skilldock.mdc")

    if fmt in ("windsurf", "all"):
        ws_path = os.path.join(target_dir, ".windsurfrules")
        with open(ws_path, "w", encoding="utf-8") as f:
            f.write(f"# .windsurfrules — SkillDock Custom Cascade AI Rules\n## Active Skills ({len(unique_skills)})\n")
            for s in unique_skills:
                f.write(f"### Skill: {s.get('name')} (/{s.get('scoped')})\n- Command: {s.get('cli')}\n\n")
        created_files.append(".windsurfrules")

    if fmt in ("cline", "all"):
        cline_path = os.path.join(target_dir, ".clinerules")
        with open(cline_path, "w", encoding="utf-8") as f:
            f.write(f"# .clinerules — SkillDock Autonomous Coding Agent System Rules\n## Active Skills ({len(unique_skills)})\n")
            for s in unique_skills:
                f.write(f"### [{s.get('priority')}] {s.get('name')} (/{s.get('scoped')})\n\n")
        created_files.append(".clinerules")

    if fmt in ("copilot", "all"):
        copilot_dir = os.path.join(target_dir, ".github")
        os.makedirs(copilot_dir, exist_ok=True)
        copilot_path = os.path.join(copilot_dir, "copilot-instructions.md")
        with open(copilot_path, "w", encoding="utf-8") as f:
            f.write(f"# GitHub Copilot Custom Repository Instructions\n## Active Skills ({len(unique_skills)})\n")
            for s in unique_skills:
                f.write(f"- {s.get('name')} (/{s.get('scoped')})\n")
        created_files.append(".github/copilot-instructions.md")

    if fmt in ("antigravity", "all"):
        ag_path = os.path.join(target_dir, "antigravity-skills-lock.json")
        manifest = {
            "$schema": "https://schema.antigravity.google/v1/workspace-skills.json",
            "version": "1.0.0",
            "generator": "SkillDock CLI v3.0",
            "skills": [
                {
                    "id": s.get('id'),
                    "name": s.get('name'),
                    "scopedCommand": f"/{s.get('scoped')}",
                    "priority": s.get('priority'),
                    "installCli": s.get('cli')
                } for s in unique_skills
            ]
        }
        with open(ag_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)
        created_files.append("antigravity-skills-lock.json")

    print(f"\n🚀 SkillDock Workspace Initialized successfully!")
    print(f"📁 Target Directory: {target_dir}")
    print(f"🔍 Detected Manifest: {detected_manifest or 'None (Default Core Stack applied)'}")
    print(f"📦 Technologies: {', '.join(detected_tech)}")
    print(f"⚡ Stack Size: {len(unique_skills)} curated skills")
    print(f"📝 Config Files Generated:")
    for cf in created_files:
        print(f"   ✓ {cf}")
    print(f"\nTip: Run 'skilldock check' anytime or add it to pre-commit to guard against stack conflicts.\n")


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="skilldock",
        description="SkillDock: The Command-Line AI Agent Skills Directory & Swarm Orchestrator"
    )
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")

    # Search
    p_search = subparsers.add_parser("search", help="Search cataloged skills")
    p_search.add_argument("query", nargs="?", default="", help="Keyword query")
    p_search.add_argument("--priority", choices=["P0", "P1", "P2", "P3"], help="Filter by priority")
    p_search.add_argument("--category", help="Filter by category ID")
    p_search.add_argument("--limit", type=int, default=15, help="Max results")
    p_search.add_argument("--json", action="store_true", help="Output JSON")
    p_search.set_defaults(func=cmd_search)

    # Inspect
    p_inspect = subparsers.add_parser("inspect", help="Inspect a skill specification")
    p_inspect.add_argument("skill_id", help="Skill ID or scoped slash command")
    p_inspect.add_argument("--json", action="store_true", help="Output JSON")
    p_inspect.set_defaults(func=cmd_inspect)

    # Starter Packs
    p_starter = subparsers.add_parser("starter", help="Browse or load starter stacks")
    starter_subs = p_starter.add_subparsers(dest="starter_sub")
    p_st_list = starter_subs.add_parser("list", help="List starter packs")
    p_st_list.add_argument("--json", action="store_true", help="Output JSON")
    p_st_list.set_defaults(func=cmd_starter_list)
    p_st_load = starter_subs.add_parser("load", help="Load starter pack into stack")
    p_st_load.add_argument("pack_id", help="Starter pack ID (e.g. gsd-engine, taste-uiux)")
    p_st_load.set_defaults(func=cmd_starter_load)

    # Stack Management
    p_stack = subparsers.add_parser("stack", help="Manage custom skills stack")
    stack_subs = p_stack.add_subparsers(dest="stack_sub")
    p_sk_list = stack_subs.add_parser("list", help="List active skills in stack")
    p_sk_list.add_argument("--json", action="store_true", help="Output JSON")
    p_sk_list.set_defaults(func=cmd_stack_list)

    p_sk_add = stack_subs.add_parser("add", help="Add skills to stack")
    p_sk_add.add_argument("skill_ids", nargs="+", help="One or more skill IDs")
    p_sk_add.set_defaults(func=cmd_stack_add)

    p_sk_rm = stack_subs.add_parser("remove", help="Remove skills from stack")
    p_sk_rm.add_argument("skill_ids", nargs="+", help="One or more skill IDs")
    p_sk_rm.set_defaults(func=cmd_stack_remove)

    p_sk_clr = stack_subs.add_parser("clear", help="Clear all skills from stack")
    p_sk_clr.set_defaults(func=cmd_stack_clear)

    p_sk_exp = stack_subs.add_parser("export", help="Export stack configuration")
    p_sk_exp.add_argument("--format", choices=["markdown", "cursorrules", "cursor045", "mdc", "windsurfrules", "windsurf", "clinerules", "cline", "copilot", "antigravity", "claude", "swarm", "cli", "minified-prompt", "minified"], default="markdown")
    p_sk_exp.add_argument("--output", "-o", help="Target output file")
    p_sk_exp.set_defaults(func=cmd_stack_export)

    # Init (Workspace Bootstrapper)
    p_init = subparsers.add_parser("init", help="Initialize SkillDock in current workspace with auto-detected stack and IDE rules")
    p_init.add_argument("target", nargs="?", default="", help="Target directory (default: current directory)")
    p_init.add_argument("--format", choices=["cursor045", "cursor", "windsurf", "cline", "copilot", "antigravity", "all"], default="cursor045", help="Export format for IDE rules")
    p_init.set_defaults(func=cmd_init)

    # Check (Compiler & Conflict Linter)
    p_check = subparsers.add_parser("check", help="Lint active workspace stack for conflicts, redundancies, and missing guards")
    p_check.add_argument("path", nargs="?", default="", help="Path to workspace directory or stack JSON file")
    p_check.add_argument("--json", action="store_true", help="Output JSON result")
    p_check.set_defaults(func=cmd_check)

    # Recommend (Project Auto-Stack)
    p_rec = subparsers.add_parser("recommend", help="Auto-recommend 10x skill stack from project manifest (package.json, build.gradle, etc.)")
    p_rec.add_argument("path", nargs="?", default="", help="Path to manifest file")
    p_rec.add_argument("--apply", action="store_true", help="Automatically load recommended skills into local stack")
    p_rec.add_argument("--json", action="store_true", help="Output JSON recommendation")
    p_rec.set_defaults(func=cmd_recommend)

    # Swarm
    p_swarm = subparsers.add_parser("swarm", help="Multi-agent swarm orchestrator")
    swarm_subs = p_swarm.add_subparsers(dest="swarm_sub")
    p_sw_m = swarm_subs.add_parser("manifest", help="Generate swarm manifest JSON")
    p_sw_m.add_argument("--output", "-o", help="Target output file")
    p_sw_m.set_defaults(func=cmd_swarm_manifest)

    p_sw_b = swarm_subs.add_parser("brief", help="Generate ready-to-run swarm brief markdown")
    p_sw_b.add_argument("--output", "-o", help="Target output file")
    p_sw_b.set_defaults(func=cmd_swarm_brief)

    args = parser.parse_args()
    if hasattr(args, "func"):
        args.func(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
