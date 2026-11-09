#!/usr/bin/env python3
"""
scripts/export_matrix_json.py — Pre-compiles the CSV matrix, GitHub telemetry,
and skills directory into a structured, type-safe JSON file for the React application.
"""

import csv
import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

CAT_MAP = {
    "01 Core Engineering": ("01-core-engineering", "Core Engineering"),
    "02 Matt Pocock": ("02-matt-pocock", "Matt Pocock"),
    "03 Android Development Skills": ("03-android", "Android Development"),
    "04 Kotlin KMP": ("04-kotlin-kmp", "Kotlin Multiplatform (KMP)"),
    "05 UI UX Design": ("05-ui-ux", "UI / UX Design"),
    "06 GSD": ("06-gsd", "GSD Autonomous Engine"),
    "07 gstack": ("07-gstack", "gstack Workflow"),
    "08 Superpowers": ("08-superpowers", "Superpowers Harness"),
    "09 Autonomous Agents": ("09-autonomous-agents", "Autonomous Agents"),
    "10 AI Infrastructure": ("10-ai-infrastructure", "AI Infrastructure & MCP"),
    "11 Code Review Quality": ("11-code-review", "Code Review & Quality"),
    "12 Optional Specialized": ("12-specialized", "Specialized Tools"),
    "15 Universal Project Documentation Standard": ("docs", "Universal Project Documentation"),
}

SKILL_TO_REPO = {
    # GSD Autonomous Engine
    'gsd-core': 'open-gsd/gsd-core',
    'gsd-new-project': 'open-gsd/gsd-core',
    'gsd-onboard': 'open-gsd/gsd-core',
    'gsd-plan-phase': 'open-gsd/gsd-core',
    'gsd-execute-phase': 'open-gsd/gsd-core',
    'gsd-verify-work': 'open-gsd/gsd-core',
    'gsd-manager': 'open-gsd/gsd-core',
    'gsd-progress': 'open-gsd/gsd-core',
    'gsd-forensics': 'open-gsd/gsd-core',
    'gsd-map-codebase': 'open-gsd/gsd-core',
    'gsd-mempalace-capture': 'open-gsd/gsd-core',
    'gsd-mempalace-recall': 'open-gsd/gsd-core',
    'gsd-milestone-summary': 'open-gsd/gsd-core',
    'gsd-pi': 'open-gsd/gsd-pi',
    'gsd-core-host-integration': 'open-gsd/gsd-core',
    'gsd-companion-mcp-server': 'open-gsd/gsd-core',
    'gsd-capability-framework': 'open-gsd/gsd-core',
    'gsd-security-/-verification-gates': 'open-gsd/gsd-core',
    'discuss-→-plan-→-execute-→-verify-→-ship': 'open-gsd/gsd-core',
    'discuss-plan-execute-verify-ship': 'open-gsd/gsd-core',

    # Superpowers Harness
    'brainstorming': 'obra/superpowers',
    'writing-plans': 'obra/superpowers',
    'executing-plans': 'obra/superpowers',
    'systematic-debugging': 'obra/superpowers',
    'diagnosing-bugs': 'obra/superpowers',
    'diagnosing-superpowers': 'obra/superpowers',
    'test-driven-development': 'obra/superpowers',
    'verification-before-completion': 'obra/superpowers',
    'subagent-driven-development': 'obra/superpowers',
    'dispatching-parallel-agents': 'obra/superpowers',
    'using-git-worktrees': 'obra/superpowers',
    'finishing-a-development-branch': 'obra/superpowers',
    'requesting-code-review': 'obra/superpowers',
    'receiving-code-review': 'obra/superpowers',
    'find-skills': 'obra/superpowers',
    'handoff': 'obra/superpowers',

    # gstack Workflow
    'office-hours': 'garrytan/gstack',
    'plan-ceo-review': 'garrytan/gstack',
    'plan-eng-review': 'garrytan/gstack',
    'plan-design-review': 'garrytan/gstack',
    'autoplan': 'garrytan/gstack',
    'design-consultation': 'garrytan/gstack',
    'design-review': 'garrytan/gstack',
    'review': 'garrytan/gstack',
    'qa': 'garrytan/gstack',
    'ship': 'garrytan/gstack',
    'land-and-deploy': 'garrytan/gstack',
    'benchmark': 'garrytan/gstack',
    'retro': 'garrytan/gstack',
    'careful': 'garrytan/gstack',
    'guard': 'garrytan/gstack',
    'investigate': 'garrytan/gstack',
    'srd': 'garrytan/gstack',
    'ssd': 'garrytan/gstack',
    'prototype': 'garrytan/gstack',

    # Ralph Loop
    'ralph-loop': 'snarktank/ralph',
    'ralph': 'snarktank/ralph',

    # ECC (Everything Claude Code)
    'ecc': 'affaan-m/ecc',
    'everything-claude-code': 'affaan-m/ecc',
    'everything-claude-code-(ecc)': 'affaan-m/ecc',

    # Impeccable
    'impeccable': 'pbakaus/impeccable',

    # Karpathy Guidelines
    'karpathy-guidelines': 'multica-ai/andrej-karpathy-skills',

    # UI / UX Pro Max
    'ui-ux-pro-max': 'nextlevelbuilder/ui-ux-pro-max-skill',

    # Taste Skill
    'taste-skill': 'leonxlnx/taste-skill',

    # Addy Osmani
    'addy-agent-skills': 'addyosmani/agent-skills',
    'web-quality-a11y': 'addyosmani/web-quality-skills',

    # Graphify / Context7 / MemPalace / Strata / Second Brain
    'graphify': 'graphify-labs/graphify',
    'context7': 'upstash/context7',
    'mempalace': 'mempalace/mempalace',
    'mempalace-data-governance-note': 'mempalace/mempalace',
    'strata': 'kytheros/strata',
    'obsidian-markdown': 'kepano/obsidian-skills',
    'obsidian-developer-second-brain': 'kepano/obsidian-skills',
    'selection-guidance': 'graphify-labs/graphify',

    # Code Review & Quality
    'coderabbit': 'coderabbitai/skills',
    'open-code-review': 'openhands/openhands',
    'code-review-skill': 'coderabbitai/skills',
    'setup-pre-commit': 'agentskills/agentskills',
    'cloudflare-security-audit': 'cloudflare/security-audit-skill',
    'trailofbits-security': 'trailofbits/skills',
    'sentry-diagnostics': 'getsentry/sentry',

    # Autonomous Agents & Host Harnesses
    'openhands': 'openhands/openhands',
    'codex': 'openai/codex',
    'ponytail': 'dietrichgebert/ponytail',
    'harness²': 'google-research/harness2',
    't3-code': 'pingdotgg/t3code',
    'wiggum-cli': 'google/agents-cli',
    'omniroute': 'adelo31/omniroute',
    'understand-anything': 'egonex-ai/understand-anything',
    'safety-note': 'openhands/openhands',
    'browser-use': 'browser-use/browser-use',
    'orca-agent': 'stablyai/orca',

    # AI Infrastructure
    'composio-skills': 'composiohq/awesome-claude-skills',
    'caveman': 'juliusbrussee/caveman',
    'billion-context': 'ranxianglei/billion-context',
    'anthropic-skills': 'anthropics/skills',
    'google-skills': 'google/skills',
    'gemini-api': 'googleapis/python-genai',
    'gemini-live-api': 'googleapis/python-genai',
    'gemini-omni-flash-api': 'googleapis/python-genai',
    'google-agents-cli': 'google/agents-cli',
    'tokeneconomizer': 'microsoft/tokeneconomizer',
    'token-economizer': 'microsoft/tokeneconomizer',
    'agent-skills-spec': 'agentskills/agentskills',
    'cloudflare-skills': 'cloudflare/skills',
    'azure-skills': 'microsoft/azure-skills',

    # UI / Design
    'astryx': 'meta/astryx',
    'archify': 'tt-a1i/archify',
    'ui-taste': 'uizze/uizze',
    'ios-design': 'apple/design-guidelines',
    'compose-preview': 'android/skills',
    'shadcn-ui': 'shadcn/ui',
    'emil-design-eng': 'emilkowalski/skills',
    'vercel-react-patterns': 'vercel-labs/skills',
    'gsap-animation': 'greensock/gsap-skills',

    # KMP / SwiftUI
    'swiftui-pro': 'twostraws/swiftui-agent-skill',
    'swiftui-pro-(twostraws)': 'twostraws/swiftui-agent-skill',
    'swiftui-expert': 'avdlee/swiftui-agent-skill',
    'swiftui-expert-(avdlee)': 'avdlee/swiftui-agent-skill',
    'kotlin-backend-jpa-entity-mapping': 'kotlin/kotlin-agent-skills',
    
    # Modern Framework Skills (Batch 1-8)
    'better-auth-patterns': 'better-auth/skills',
    'prisma-orm-patterns': 'prisma/skills',
    'neon-serverless-postgres': 'neondatabase/agent-skills',
    'mastra-agent-framework': 'mastra-ai/skills',
    'firecrawl-web-scrape': 'firecrawl/cli',
    'convex-backend': 'convex/agent-skills',
    'momentic-visual-testing': 'momentic-ai/skills',
    'extract-design-tokens': 'arvindrk/extract-design-system',
    'mermaid-design-generator': 'spillwavesolutions/design-doc-mermaid',
    'nx-monorepo-architect': 'nrwl/nx-ai-agents-config',
    'firebase-agent-suite': 'firebase/agent-skills',
    'elevenlabs-audio': 'elevenlabs/skills',
    'solana-dev': 'solana-foundation/solana-dev-skill',
    'clerk-auth': 'clerk/skills',
    'svelte5-runes-patterns': 'sveltejs/ai-tools',
    'stripe-agent-toolkit': 'stripe/link-cli',
    'stripe-link-cli': 'stripe/link-cli',
    'stripe-payments': 'stripe/link-cli',
    'playwright-cli': 'microsoft/playwright-cli',
    'agent-browser': 'vercel-labs/agent-browser',
    'agent-desktop': 'vercel-labs/agent-desktop',
    'turborepo': 'vercel/turborepo',
    'vercel-ai-sdk': 'vercel/ai',
    'remotion-video': 'remotion-dev/skills',
    'supabase-skills': 'supabase/agent-skills',

    # Core Engineering & Matt Pocock cross-category
    'code-review': 'mattpocock/skills',
    'domain-modeling': 'mattpocock/skills',
    'accidental-data-loss-prevention': 'agentskills/agentskills',
    'git-guardrails-claude-code': 'anthropics/skills',
    'writing-for-agents': 'agentskills/agentskills',
    'writing-skills': 'agentskills/agentskills',
    'skill-repair': 'agentskills/agentskills',
    'scaffold-exercises': 'agentskills/agentskills',
    'google-workspace-cli': 'googleworkspace/cli',

    # Specialized Tools / Data Agent Kit
    'google-maps-platform': 'google/skills',
    'managing-python-dependencies': 'pypa/packaging',
    'cloud-databases-onboarding': 'google/skills',
    'gcp-dataflow': 'GoogleCloudPlatform/data-agent-kit',
    'gcp-spark': 'GoogleCloudPlatform/data-agent-kit',
    'gcp-spark-troubleshooting': 'GoogleCloudPlatform/data-agent-kit',
    'gcp-spark-observability': 'GoogleCloudPlatform/data-agent-kit',
    'gcp-pipeline-orchestration': 'GoogleCloudPlatform/data-agent-kit',
    'gcp-data-pipelines': 'GoogleCloudPlatform/data-agent-kit',
    'bigquery-data-transfer-service': 'GoogleCloudPlatform/data-agent-kit',
    'dataform-bigquery': 'GoogleCloudPlatform/data-agent-kit',
    'dbt-bigquery': 'GoogleCloudPlatform/data-agent-kit',
    'notebook-guidance': 'GoogleCloudPlatform/data-agent-kit',
    'building-data-apps': 'GoogleCloudPlatform/data-agent-kit',
    'ml-best-practices': 'google/skills',
    'schema-mapping': 'GoogleCloudPlatform/data-agent-kit',
    'data-autocleaning': 'GoogleCloudPlatform/data-agent-kit',
    'dak-setup': 'GoogleCloudPlatform/data-agent-kit',
    'hyperframes-media': 'heygen-com/hyperframes',
    'marketing-growth-engine': 'coreyhaines31/marketingskills',
}

CATEGORY_FALLBACK_REPO = {
    '02-matt-pocock': 'mattpocock/skills',
    '03-android': 'android/skills',
    '04-kotlin-kmp': 'kotlin/kotlin-agent-skills',
    '06-gsd': 'open-gsd/gsd-core',
    '07-gstack': 'garrytan/gstack',
    '08-superpowers': 'obra/superpowers',
    'docs': 'agentskills/agentskills',
}

REPO_DISPLAY_NAMES = {
    'open-gsd/gsd-core': 'GSD Core',
    'open-gsd/gsd-pi': 'GSD Pi',
    'obra/superpowers': 'Superpowers',
    'garrytan/gstack': 'gstack',
    'snarktank/ralph': 'Ralph Loop',
    'affaan-m/ecc': 'ECC (Everything Claude Code)',
    'pbakaus/impeccable': 'Impeccable',
    'mattpocock/skills': 'Matt Pocock',
    'android/skills': 'Android SDK',
    'kotlin/kotlin-agent-skills': 'Kotlin & KMP',
    'nextlevelbuilder/ui-ux-pro-max-skill': 'UI/UX Pro Max',
    'multica-ai/andrej-karpathy-skills': 'Karpathy Guidelines',
    'leonxlnx/taste-skill': 'Taste Skill',
    'addyosmani/agent-skills': 'Addy Osmani',
    'addyosmani/web-quality-skills': 'Addy Osmani A11y',
    'graphify-labs/graphify': 'Graphify',
    'mempalace/mempalace': 'MemPalace',
    'upstash/context7': 'Context7',
    'coderabbitai/skills': 'CodeRabbit',
    'openhands/openhands': 'OpenHands',
    'dietrichgebert/ponytail': 'Ponytail',
    'meta/astryx': 'Meta Astryx',
    'google/skills': 'Google Agent Skills',
    'google/agents-cli': 'Google Agents CLI',
    'anthropics/skills': 'Anthropic Skills',
    'agentskills/agentskills': 'Agent Skills Spec',
    'kepano/obsidian-skills': 'Obsidian Brain',
    'GoogleCloudPlatform/data-agent-kit': 'Google Data Agent Kit',
    'twostraws/swiftui-agent-skill': 'SwiftUI Pro',
    'avdlee/swiftui-agent-skill': 'SwiftUI Expert',
    'better-auth/skills': 'Better Auth',
    'prisma/skills': 'Prisma ORM',
    'neondatabase/agent-skills': 'Neon Postgres',
    'mastra-ai/skills': 'Mastra AI',
    'firecrawl/cli': 'Firecrawl',
    'convex/agent-skills': 'Convex',
    'momentic-ai/skills': 'Momentic AI',
    'arvindrk/extract-design-system': 'Extract Design',
    'spillwavesolutions/design-doc-mermaid': 'Design Doc Mermaid',
    'nrwl/nx-ai-agents-config': 'Nx Monorepo',
    'firebase/agent-skills': 'Firebase Agent Suite',
    'elevenlabs/skills': 'ElevenLabs',
    'solana-foundation/solana-dev-skill': 'Solana Foundation',
    'clerk/skills': 'Clerk Auth',
    'sveltejs/ai-tools': 'Svelte 5 Runes',
    'stripe/link-cli': 'Stripe',
    'microsoft/playwright-cli': 'Playwright',
    'vercel-labs/agent-browser': 'Agent Browser',
    'vercel-labs/agent-desktop': 'Agent Desktop',
    'vercel-labs/skills': 'Vercel React Patterns',
    'vercel/turborepo': 'Turborepo',
    'vercel/ai': 'Vercel AI SDK',
    'remotion-dev/skills': 'Remotion',
    'supabase/agent-skills': 'Supabase',
    'browser-use/browser-use': 'browser-use',
    'stablyai/orca': 'Orca Agent',
    'juliusbrussee/caveman': 'Caveman',
    'ranxianglei/billion-context': 'Billion-Context',
    'composiohq/awesome-claude-skills': 'Composio Gateway',
    'microsoft/tokeneconomizer': 'TokenEconomizer',
    'microsoft/azure-skills': 'Microsoft Azure',
    'tt-a1i/archify': 'Archify',
    'uizze/uizze': 'Uizze UI Taste',
    'shadcn/ui': 'shadcn/ui',
    'emilkowalski/skills': 'Emil Kowalski',
    'greensock/gsap-skills': 'GSAP Animation',
    'googleworkspace/cli': 'Google Workspace',
    'pypa/packaging': 'Python Packaging (PyPA)',
    'heygen-com/hyperframes': 'Hyperframes Media',
    'coreyhaines31/marketingskills': 'Marketing Skills',
    'kytheros/strata': 'Strata Memory',
    'googleapis/python-genai': 'Google GenAI SDK',
    'openai/codex': 'OpenAI Codex',
    'pingdotgg/t3code': 'T3 Code',
    'adelo31/omniroute': 'OmniRoute',
    'google-research/harness2': 'Harness²',
    'egonex-ai/understand-anything': 'Understand Anything',
    'cloudflare/security-audit-skill': 'Cloudflare Security',
    'cloudflare/skills': 'Cloudflare Edge',
    'trailofbits/skills': 'Trail of Bits',
    'getsentry/sentry': 'Sentry Diagnostics',
    'apple/design-guidelines': 'Apple HIG',
}

ECOSYSTEM_RULES = [
    ("android", ["android", "camerax", "compose", "gradle", "view", "anr", "r8", "billing", "glance", "wear"]),
    ("kmp", ["kotlin", "kmp", "multiplatform", "swiftui"]),
    ("gsd", ["gsd", "get-stuff-done"]),
    ("superpowers", ["superpowers", "ralph", "test-driven", "systematic-debugging", "brainstorming", "executing-plans"]),
    ("gstack", ["gstack", "office-hours", "plan-ceo", "plan-eng", "plan-design", "autoplan"]),
    ("ecc", ["ecc", "everything-claude-code"]),
    ("impeccable", ["impeccable"]),
    ("agents", ["agent", "mastra", "openhands", "wiggum", "omniroute"]),
    ("mattpocock", ["matt-pocock", "triage", "ask-matt", "to-tickets", "to-spec"]),
    ("obsidian", ["obsidian", "mempalace", "second-brain"]),
    ("quality", ["review", "test", "audit", "security", "benchmark", "qa", "guard"]),
]

def parse_csv_line(text: str):
    return next(csv.reader([text]))

def derive_ecosystem(name: str, cat_id: str, desc: str, repo: str = "") -> list[str]:
    combined = f"{name} {cat_id} {desc} {repo}".lower()
    matches = []
    for eco, keywords in ECOSYSTEM_RULES:
        if any(kw in combined for kw in keywords):
            matches.append(eco)
    return matches or ["general"]

def export_matrix():
    csv_path = REPO_ROOT / "AI-Coding-Skills-and-Tools-Matrix.csv"
    dir_path = REPO_ROOT / "data" / "skills-directory.json"
    metrics_path = REPO_ROOT / "data" / "github-metrics.json"
    out_path = REPO_ROOT / "web" / "src" / "data" / "matrix.json"

    if not csv_path.exists():
        print(f"[!] Missing {csv_path}")
        return

    # Load directory and metrics if present
    skills_dir = {}
    if dir_path.exists():
        try:
            skills_dir = json.loads(dir_path.read_text(encoding="utf-8"))
        except Exception:
            pass

    metrics = {}
    if metrics_path.exists():
        try:
            metrics_payload = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics = metrics_payload.get("repositories", {})
        except Exception:
            pass

    current_cat_id = "01-core-engineering"
    current_cat_label = "Core Engineering"

    skills = []
    seen_ids = set()

    with open(csv_path, mode="r", encoding="utf-8") as f:
        for line in f:
            line_str = line.strip()
            if not line_str:
                continue

            for header, (cat_id, cat_label) in CAT_MAP.items():
                if line_str.startswith(header):
                    current_cat_id = cat_id
                    current_cat_label = cat_label
                    break

            try:
                parts = parse_csv_line(line_str)
            except Exception:
                continue

            name = ""
            priority = ""
            why = ""

            if current_cat_id == "docs":
                if len(parts) >= 4 and parts[2] in ["P0", "P1", "P2", "P3"]:
                    name = parts[1]
                    priority = parts[2]
                    why = parts[3]
            else:
                if len(parts) >= 3 and parts[1] in ["P0", "P1", "P2", "P3"]:
                    name = parts[0]
                    priority = parts[1]
                    why = parts[2]

            if not name or not priority:
                continue

            # Clean name
            clean_name = re.sub(r"^[0-9.]+\s*", "", name).strip()
            skill_id = clean_name.lower().replace(" ", "-")

            # Look up directory metadata
            dir_entry = skills_dir.get(clean_name) or skills_dir.get(skill_id) or {}
            scoped = dir_entry.get("scoped", skill_id)
            cli = dir_entry.get("cli", f"python scripts/install-to-project.py --skill {scoped}")

            # Precise repository lookup
            repo = (
                SKILL_TO_REPO.get(skill_id) or 
                SKILL_TO_REPO.get(scoped) or 
                dir_entry.get("repo") or 
                CATEGORY_FALLBACK_REPO.get(current_cat_id) or 
                "agentskills/agentskills"
            )

            # Clean repo name
            if repo.endswith(".git"):
                repo = repo[:-4]

            repo_display_name = REPO_DISPLAY_NAMES.get(repo, repo.split("/")[-1].replace("-", " ").title())

            # Stars lookup
            stars = 0
            if repo and repo in metrics:
                stars = metrics[repo].get("stars", 0)

            # Avoid duplicates
            unique_id = f"{current_cat_id}:{skill_id}"
            if unique_id in seen_ids:
                continue
            seen_ids.add(unique_id)

            skills.append({
                "id": skill_id,
                "uniqueId": unique_id,
                "name": clean_name,
                "priority": priority,
                "categoryId": current_cat_id,
                "categoryLabel": current_cat_label,
                "description": why,
                "scoped": scoped,
                "cli": cli,
                "repo": repo,
                "repoName": repo_display_name,
                "stars": stars,
                "ecosystems": derive_ecosystem(clean_name, current_cat_id, why, repo),
            })

    # Meta summary: Categories
    categories = []
    seen_cats = set()
    for cat_id, cat_label in CAT_MAP.values():
        if cat_id not in seen_cats:
            seen_cats.add(cat_id)
            count = sum(1 for s in skills if s["categoryId"] == cat_id)
            categories.append({
                "id": cat_id,
                "label": cat_label,
                "count": count
            })

    # Meta summary: Repositories
    repo_counts = {}
    for s in skills:
        r = s["repo"]
        r_name = s["repoName"]
        r_stars = s["stars"]
        if r not in repo_counts:
            repo_counts[r] = {
                "repo": r,
                "repoName": r_name,
                "count": 0,
                "stars": r_stars,
            }
        repo_counts[r]["count"] += 1

    sorted_repos = sorted(repo_counts.values(), key=lambda x: (x["count"], x["stars"]), reverse=True)

    meta = {
        "totalSkills": len(skills),
        "totalStars": sum(r["stars"] for r in repo_counts.values() if r["stars"] > 0),
        "categories": categories,
        "repositories": sorted_repos,
        "p0Count": sum(1 for s in skills if s["priority"] == "P0"),
        "p1Count": sum(1 for s in skills if s["priority"] == "P1"),
        "p2Count": sum(1 for s in skills if s["priority"] == "P2"),
        "p3Count": sum(1 for s in skills if s["priority"] == "P3"),
        "generatedAt": "2026-11-09",
    }

    payload = {
        "meta": meta,
        "skills": skills,
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"[OK] Exported {len(skills)} skills across {len(sorted_repos)} repositories to {out_path} ({out_path.stat().st_size} bytes)")
    return payload

if __name__ == "__main__":
    export_matrix()
