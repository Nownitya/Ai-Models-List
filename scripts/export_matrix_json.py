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

    # Curated Claude Marketplace Tools
    'atlassian-mcp': 'atlassian/atlassian-mcp-server',
    'huggingface-skills': 'huggingface/skills',
    'semgrep-security': 'semgrep/mcp-marketplace',
    'greptile-codebase': 'greptileai/claude-plugin',
    'sourcegraph-search': 'sourcegraph-community/sourcegraph-claudecode-plugin',
    'datadog-observability': 'datadog-labs/claude-code-plugin',
    'posthog-analytics': 'posthog/ai-plugin',
    'astronomer-airflow': 'astronomer/agents',

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
    'unslop': 'heydamir/unslop',
    'ui-unslop': 'heydamir/unslop',
    'modern-web-guidance': 'GoogleChrome/modern-web-guidance-src',
    'ui-modern-web-guidance': 'GoogleChrome/modern-web-guidance-src',
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
    'playwright-cli': 'microsoft/playwright',
    'playwright': 'microsoft/playwright',
    'compound-engineering': 'everyinc/compound-engineering-plugin',
    '21st-magic-ui': '21st-dev/cli',
    'sellbird': 'ethanplusai/sellbird',
    'hermes-agent': 'NousResearch/hermes-agent',
    'gbrain': 'garrytan/gbrain',
    'unsloth': 'unslothai/unsloth',
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
    'claude-3-7-hybrid-reasoning': 'anthropics/skills',
    'cursor-0-45-agentic-rules': 'getcursor/cursor',
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
    'microsoft/playwright': 'Playwright',
    'microsoft/playwright-cli': 'Playwright CLI',
    'everyinc/compound-engineering-plugin': 'Compound Engineering',
    '21st-dev/cli': '21st.dev Magic',
    'ethanplusai/sellbird': 'Sellbird',
    'NousResearch/hermes-agent': 'Hermes Agent',
    'garrytan/gbrain': 'gbrain',
    'unslothai/unsloth': 'Unsloth AI',
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
    'heydamir/unslop': 'Unslop',
    'googlechrome/modern-web-guidance-src': 'Modern Web Guidance',
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
    'getcursor/cursor': 'Cursor Agentic Rules',
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
                elif len(parts) >= 3 and parts[2] in ["P0", "P1", "P2", "P3"]:
                    name = parts[0]
                    priority = parts[2]
                    why = parts[4] if len(parts) >= 5 else parts[3]

            if not name or not priority:
                continue

            # Clean name (strip leading list numbering like '01. ' or '1. ' but preserve names like '21st-magic-ui')
            clean_name = re.sub(r"^\d+[\.\)]\s*", "", name).strip()
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

    # Curated fallback descriptions for repositories
    FALLBACK_DESCRIPTIONS = {
        'android/skills': "Official Google Android developer agent skills covering CameraX, Compose UI, Navigation 3, ANR triage, and Play Store SDKs.",
        'GoogleCloudPlatform/data-agent-kit': "Google Cloud Platform agent toolkit for BigQuery, Dataflow, Cloud Databases, and GCP data pipelines.",
        'coderabbitai/skills': "CodeRabbit AI automated code review and pull request intelligence harness.",
        'pingdotgg/t3code': "Theo's T3 open-source agent harness control surface with mobile, desktop, and web clients.",
        'google-research/harness2': "Google Research empirical coding-agent harness and evaluation benchmarking framework.",
        'google-ai-edge/LiteRT-LM': "Google AI Edge LiteRT Large Language Model on-device runtime and mobile acceleration SDK.",
        'google-ai-edge/litert': "Google AI Edge LiteRT (formerly TensorFlow Lite) high-performance cross-platform on-device runtime.",
        'apple/design-guidelines': "Apple Human Interface Guidelines (HIG) and native SwiftUI 26+ design system patterns.",
        'pypa/packaging': "Python Packaging Authority reference guidelines for dependency isolation, uv, and pyproject.toml.",
        'agentskills/agentskills': "Universal agent skills open specification and foundational multi-agent workflow capabilities.",
        'getcursor/cursor': "Cursor 0.45+ modular rules standard (.cursorrules & .cursor/rules/*.mdc) and autonomous agent execution harness.",
        'microsoft/playwright': "Fast and reliable end-to-end testing, tracing, snapshot comparison, and headless browser automation for Chromium, Firefox, and WebKit.",
        'everyinc/compound-engineering-plugin': "EveryInc's 4-phase compounding engineering loop (Plan, Build, Review, Compound) capturing reusable architectural patterns and repo memory.",
        '21st-dev/cli': "21st.dev Magic component marketplace, AI UI generator, and MCP server for React, Tailwind CSS, and shadcn-ui agents.",
        'ethanplusai/sellbird': "Open-source autonomous AI sales and outreach engine running on local Claude / ChatGPT / Codex plans with lead enrichment and email campaigns.",
        'NousResearch/hermes-agent': "Nous Research autonomous agent framework featuring a self-improving skill loop, tiered persistent memory, and model-agnostic execution.",
        'garrytan/gbrain': "Garry Tan's markdown-first AI agent memory system and knowledge graph layer using embedded Postgres (PGLite) + pgvector, hybrid search, and MCP support.",
        'unslothai/unsloth': "Ultra-fast open-source LLM fine-tuning and inference engine (5x faster, 80% less VRAM with Triton kernels) for Llama 3.3, Mistral, Gemma 2, and DeepSeek.",
    }

    # Build Framework Hub records (65 Upstream Repositories)
    frameworks = []
    for r in sorted_repos:
        repo_key = r["repo"]
        repo_display = r["repoName"]
        repo_stars = r["stars"]

        owner = repo_key.split("/")[0] if "/" in repo_key else "community"
        name = repo_key.split("/")[-1] if "/" in repo_key else repo_key

        meta_entry = metrics.get(repo_key) or metrics.get(repo_key.lower()) or {}
        stars_formatted = meta_entry.get("stars_formatted")
        if not stars_formatted:
            if repo_stars >= 1_000_000:
                stars_formatted = f"{repo_stars / 1_000_000:.1f}M"
            elif repo_stars >= 1_000:
                stars_formatted = f"{repo_stars // 1_000}k"
            else:
                stars_formatted = str(repo_stars)

        desc = meta_entry.get("description") or FALLBACK_DESCRIPTIONS.get(repo_key) or f"Curated tools, workflows and capabilities from {repo_display}."

        # Member skills
        member_skills = [s for s in skills if s["repo"] == repo_key]
        primary_category = member_skills[0]["categoryId"] if member_skills else "01-core-engineering"
        primary_cat_label = member_skills[0]["categoryLabel"] if member_skills else "Core Engineering"

        # Multi-Assistant Installation Recipes
        if repo_key == "android/skills":
            recipes = {
                "antigravity": "android skills add --all",
                "claude": "/plugin marketplace add android/skills && /plugin install android-skills@android-skills",
                "codex": "codex plugin marketplace add android/skills && codex plugin add android-skills@android-skills",
                "git": "git clone https://github.com/android/skills.git",
                "cli": "android skills add --all"
            }
        elif repo_key == "everyinc/compound-engineering-plugin":
            recipes = {
                "antigravity": "git clone https://github.com/everyinc/compound-engineering-plugin.git ~/.gemini/antigravity/skills/compound-engineering",
                "claude": "/plugin marketplace add EveryInc/compound-engineering-plugin && /plugin install compound-engineering",
                "cursor": "/add-plugin compound-engineering",
                "codex": "codex plugin marketplace add EveryInc/compound-engineering-plugin",
                "git": "git clone https://github.com/everyinc/compound-engineering-plugin.git",
                "cli": "npx skills add everyinc/compound-engineering-plugin"
            }
        elif repo_key == "21st-dev/cli":
            recipes = {
                "antigravity": "npx @21st-dev/cli install-skill",
                "claude": "npx @21st-dev/cli install-skill",
                "cursor": "21st init --client cursor",
                "codex": "npx @21st-dev/cli install-skill",
                "git": "git clone https://github.com/21st-dev/cli.git",
                "cli": "npx @21st-dev/cli install-skill"
            }
        elif repo_key == "ethanplusai/sellbird":
            recipes = {
                "antigravity": "git clone https://github.com/ethanplusai/sellbird.git ~/.gemini/antigravity/skills/sellbird",
                "claude": "git clone https://github.com/ethanplusai/sellbird.git",
                "codex": "git clone https://github.com/ethanplusai/sellbird.git",
                "git": "git clone https://github.com/ethanplusai/sellbird.git",
                "cli": "pip install sellbird && sellbird setup"
            }
        elif repo_key == "NousResearch/hermes-agent":
            recipes = {
                "antigravity": "git clone https://github.com/NousResearch/hermes-agent.git ~/.gemini/antigravity/skills/hermes-agent",
                "claude": "git clone https://github.com/NousResearch/hermes-agent.git",
                "cursor": "git clone https://github.com/NousResearch/hermes-agent.git",
                "codex": "git clone https://github.com/NousResearch/hermes-agent.git",
                "git": "git clone https://github.com/NousResearch/hermes-agent.git",
                "cli": "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash"
            }
        elif repo_key == "garrytan/gbrain":
            recipes = {
                "antigravity": "git clone https://github.com/garrytan/gbrain.git ~/.gemini/antigravity/skills/gbrain",
                "claude": "git clone https://github.com/garrytan/gbrain.git",
                "cursor": "git clone https://github.com/garrytan/gbrain.git",
                "codex": "git clone https://github.com/garrytan/gbrain.git",
                "git": "git clone https://github.com/garrytan/gbrain.git",
                "cli": "npx gbrain init"
            }
        elif repo_key == "unslothai/unsloth":
            recipes = {
                "antigravity": "pip install unsloth",
                "claude": "pip install unsloth",
                "cursor": "pip install unsloth",
                "codex": "pip install unsloth",
                "git": "git clone https://github.com/unslothai/unsloth.git",
                "cli": "pip install unsloth"
            }
        elif repo_key == "microsoft/playwright":
            recipes = {
                "antigravity": "npx playwright install --with-deps",
                "claude": "npx playwright install --with-deps",
                "codex": "npx playwright install --with-deps",
                "git": "git clone https://github.com/microsoft/playwright.git",
                "cli": "npm init playwright@latest"
            }
        else:
            recipes = {
                "antigravity": f"/agy add {repo_key}" if owner in ("GoogleCloudPlatform", "googleapis", "google") else f"git clone https://github.com/{repo_key}.git ~/.gemini/antigravity/skills/{name}",
                "claude": f"/plugin add {repo_key}" if "plugin" in name else f"git clone https://github.com/{repo_key}.git ~/.claude/skills/{name}",
                "codex": f"codex install {repo_key}",
                "git": f"git clone https://github.com/{repo_key}.git",
                "cli": f"python scripts/install-to-project.py --repo {repo_key}"
            }

        frameworks.append({
            "id": repo_key.replace("/", "-").lower(),
            "repo": repo_key,
            "repoName": repo_display,
            "author": owner,
            "stars": repo_stars,
            "starsFormatted": stars_formatted,
            "description": desc,
            "skillsCount": len(member_skills),
            "categoryId": primary_category,
            "categoryLabel": primary_cat_label,
            "officialUrl": meta_entry.get("html_url") or f"https://github.com/{repo_key}",
            "version": meta_entry.get("version", "latest"),
            "license": meta_entry.get("license", "Open Source"),
            "installRecipes": recipes,
            "skills": [
                {
                    "id": s["id"],
                    "name": s["name"],
                    "priority": s["priority"],
                    "scoped": s["scoped"],
                    "cli": s["cli"],
                    "description": s["description"]
                }
                for s in member_skills
            ]
        })

    # Extract Layer 15 Documentation Specs
    docs = []
    with open(csv_path, encoding='utf-8') as f:
        csv_rows = list(csv.reader(f))

    start_idx = None
    end_idx = None
    for i, row in enumerate(csv_rows):
        if len(row) > 0 and '15 Universal Project Documentation' in row[0]:
            start_idx = i
        elif start_idx is not None and len(row) > 0 and row[0].startswith(('16', '17', '18', 'Appendix', '14 Source Links')):
            end_idx = i
            break
    if end_idx is None:
        end_idx = len(csv_rows)

    doc_rows = csv_rows[start_idx:end_idx]
    current_layer = ''
    seen_names = set()
    for row in doc_rows:
        if len(row) >= 4 and row[0] and not row[0].startswith(('15', 'Purpose', 'Operating', 'Priority', 'Repository', 'Layer')):
            current_layer = row[0]
        name = row[1].strip() if len(row) >= 2 else ''
        prio = row[2].strip() if len(row) >= 3 else ''
        purpose = row[3].strip() if len(row) >= 4 else ''

        if name and prio in ('P0', 'P1', 'P2') and name not in seen_names:
            seen_names.add(name)
            tier = 'product'
            lower_layer = current_layer.lower()
            if 'foundation' in lower_layer:
                tier = 'foundation'
            elif 'business' in lower_layer:
                tier = 'strategy'
            elif 'product' in lower_layer:
                tier = 'product'
            elif 'architecture' in lower_layer:
                tier = 'architecture'
            elif 'governance' in lower_layer or 'ai' in lower_layer:
                tier = 'governance'
            elif 'testing' in lower_layer or 'quality' in lower_layer or 'execution' in lower_layer or 'report' in lower_layer:
                tier = 'quality'

            doc_id = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
            docs.append({
                'id': doc_id,
                'name': name,
                'layer': current_layer,
                'tier': tier,
                'priority': prio,
                'purpose': purpose,
                'scaffoldCmd': f'python scripts/scaffold-project-docs.py --doc {name}',
            })

    # Extract Curated System Prompts Suites
    prompts = []
    prompts_dir = REPO_ROOT / 'prompts'
    if prompts_dir.exists():
        for p in sorted(prompts_dir.glob('*.md')):
            text = p.read_text(encoding='utf-8')
            title_match = re.search(r'^#\s+(.+)$', text, re.MULTILINE)
            title = title_match.group(1) if title_match else p.stem
            desc_match = re.search(r'^#\s+.+\n\n([^\n\-#]+)', text)
            desc = desc_match.group(1).strip() if desc_match else ''

            sections = []
            raw_sections = re.split(r'\n##\s+', text)[1:]
            for sec in raw_sections:
                lines = sec.strip().split('\n')
                sec_title = lines[0].strip()
                code_blocks = re.findall(r'```(?:markdown|xml)?\n(.*?)```', sec, re.DOTALL)
                content = code_blocks[0].strip() if code_blocks else '\n'.join(lines[1:]).strip()
                sections.append({
                    'name': sec_title,
                    'content': content
                })
            prompts.append({
                'id': p.stem,
                'title': title,
                'filename': p.name,
                'description': desc,
                'promptsCount': len(sections),
                'sections': sections
            })

    meta = {
        "totalSkills": len(skills),
        "totalFrameworks": len(frameworks),
        "totalDocs": len(docs),
        "totalPrompts": len(prompts),
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
        "frameworks": frameworks,
        "skills": skills,
        "docs": docs,
        "prompts": prompts,
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"[OK] Exported {len(skills)} skills, {len(frameworks)} frameworks, {len(docs)} docs, {len(prompts)} prompts to {out_path} ({out_path.stat().st_size} bytes)")
    return payload

if __name__ == "__main__":
    export_matrix()
