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
    baseline = max(18000, len(stack) * 2800)
    savings = round(((baseline - estimated_tokens) / baseline) * 100)

    print(f"\n🛠️  Active SkillDock Stack ({len(stack)} skills | ~{estimated_tokens:,} tokens | ~{savings}% savings):\n")
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
    p_sk_exp.add_argument("--format", choices=["markdown", "cursorrules", "claude", "swarm", "cli"], default="markdown")
    p_sk_exp.add_argument("--output", "-o", help="Target output file")
    p_sk_exp.set_defaults(func=cmd_stack_export)

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
