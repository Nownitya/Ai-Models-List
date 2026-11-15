import type { Skill, SavedStackItem } from '@/types'

export type SwarmInputItem = Skill | SavedStackItem

export interface SwarmWorker {
  name: string
  role: string
  model: string
  skills: { id: string; name: string; scoped: string }[]
  brief: string
}

export interface SwarmManifest {
  version: string
  title: string
  description: string
  generatedAt: string
  tokenBudget: {
    estimatedTokens: number
    monolithicBaseline: number
    savingsPercent: number
  }
  orchestration: {
    antigravity: {
      swarmTitle: string
      coordinator: {
        name: string
        role: string
        model: string
        brief: string
      }
      workers: SwarmWorker[]
    }
    langgraph: {
      nodes: { id: string; role: string; model: string; tools: string[] }[]
      edges: { from: string; to: string }[]
    }
    mastra: {
      agents: { name: string; role: string; instructions: string; model: string }[]
    }
  }
}

export function partitionStackIntoSwarm(stack: SwarmInputItem[]): {
  plannerSkills: SwarmInputItem[]
  builderSkills: SwarmInputItem[]
  verifierSkills: SwarmInputItem[]
} {
  const plannerSkills: SwarmInputItem[] = []
  const verifierSkills: SwarmInputItem[] = []
  const builderSkills: SwarmInputItem[] = []

  for (const s of stack) {
    const id = s.id.toLowerCase()
    const cat = ('categoryId' in s && s.categoryId ? s.categoryId : '').toLowerCase()
    const desc = ('description' in s && s.description ? s.description : '').toLowerCase()

    const isVerifier =
      s.priority === 'P0' ||
      cat.includes('testing') ||
      cat.includes('review') ||
      id.includes('tdd') ||
      id.includes('qa') ||
      id.includes('test') ||
      id.includes('guard') ||
      id.includes('careful') ||
      id.includes('benchmark') ||
      id.includes('reviewer') ||
      desc.includes('adversarial') ||
      desc.includes('verification')

    const isPlanner =
      cat.includes('core-engineering') ||
      cat.includes('mattpocock') ||
      cat.includes('gsd') ||
      id.includes('plan') ||
      id.includes('domain') ||
      id.includes('architecture') ||
      id.includes('to-spec') ||
      id.includes('roadmap') ||
      id.includes('triage') ||
      id.includes('gsd')

    if (isVerifier) {
      verifierSkills.push(s)
    } else if (isPlanner) {
      plannerSkills.push(s)
    } else {
      builderSkills.push(s)
    }
  }

  // Fallbacks if one bucket is empty
  if (builderSkills.length === 0 && (plannerSkills.length > 1 || verifierSkills.length > 1)) {
    if (plannerSkills.length > 1) {
      builderSkills.push(plannerSkills.pop()!)
    } else if (verifierSkills.length > 1) {
      builderSkills.push(verifierSkills.pop()!)
    }
  }

  return { plannerSkills, builderSkills, verifierSkills }
}

export function generateSwarmManifest(stack: SwarmInputItem[]): SwarmManifest {
  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)

  const estimatedTokens = stack.length * 800
  const monolithicBaseline = Math.max(18000, stack.length * 2800)
  const savingsPercent =
    stack.length === 0 ? 0 : Math.max(0, Math.round(((monolithicBaseline - estimatedTokens) / monolithicBaseline) * 100))

  const workers: SwarmWorker[] = []

  if (plannerSkills.length > 0) {
    workers.push({
      name: 'architect',
      role: 'Lead Architect & Phase Planner',
      model: 'claude-3-7-sonnet',
      skills: plannerSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      brief: `Own high-level system architecture, ADR generation, and dependency-ordered atomic wave decomposition. Active skills: ${plannerSkills.map((s) => `/${s.scoped}`).join(', ')}.`,
    })
  }

  if (builderSkills.length > 0) {
    workers.push({
      name: 'builder',
      role: 'Domain Feature Implementer',
      model: 'gemini-2.0-flash',
      skills: builderSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      brief: `Execute surgical code implementations adhering strictly to specifications and UI/UX design tokens. Active skills: ${builderSkills.map((s) => `/${s.scoped}`).join(', ')}.`,
    })
  }

  if (verifierSkills.length > 0) {
    workers.push({
      name: 'verifier',
      role: 'Adversarial QA & Security Auditor',
      model: 'deepseek-reasoner',
      skills: verifierSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      brief: `Relentless verification watchdog. Enforce Law 1 (dual matrix parity), Law 4 (creator isolation), and require empirical test evidence before asserting completion. Active skills: ${verifierSkills.map((s) => `/${s.scoped}`).join(', ')}.`,
    })
  }

  const manifest: SwarmManifest = {
    version: '1.0.0',
    title: 'SkillDock Autonomous Multi-Agent Swarm',
    description: 'Curated multi-agent execution team generated from SkillDock active stack.',
    generatedAt: new Date().toISOString(),
    tokenBudget: {
      estimatedTokens,
      monolithicBaseline,
      savingsPercent,
    },
    orchestration: {
      antigravity: {
        swarmTitle: 'SkillDock Multi-Agent Sprint Team',
        coordinator: {
          name: 'coordinator',
          role: 'Swarm Coordinator & Release Manager',
          model: 'claude-3-7-sonnet',
          brief: 'Orchestrate swarm tasks, manage shared message board, enforce repository laws, and compile final sign-off.',
        },
        workers,
      },
      langgraph: {
        nodes: [
          { id: 'coordinator', role: 'Coordinator', model: 'claude-3-7-sonnet', tools: ['manage_task'] },
          ...workers.map((w) => ({
            id: w.name,
            role: w.role,
            model: w.model,
            tools: w.skills.map((s) => s.scoped),
          })),
        ],
        edges: [
          { from: 'coordinator', to: workers[0]?.name || 'coordinator' },
          ...workers.slice(0, -1).map((w, idx) => ({ from: w.name, to: workers[idx + 1].name })),
          { from: workers[workers.length - 1]?.name || 'coordinator', to: 'coordinator' },
        ],
      },
      mastra: {
        agents: workers.map((w) => ({
          name: w.name,
          role: w.role,
          instructions: w.brief,
          model: w.model,
        })),
      },
    },
  }

  return manifest
}

export function generateSwarmBrief(stack: SwarmInputItem[]): string {
  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)
  const dateStr = new Date().toISOString().split('T')[0]

  let brief = `# 🤖 SkillDock Multi-Agent Swarm Brief (${dateStr})\n\n`
  brief += `> **Swarm Title**: SkillDock Autonomous Engineering Team\n`
  brief += `> **Selected Skills**: ${stack.length} active skills (~82%+ token savings vs monolithic prompt)\n\n`

  brief += `## 👥 Agent Roster & Model Allocation\n\n`
  brief += `### 1. @coordinator (Coordinator & Release Gate)\n`
  brief += `- **Model**: \`claude-3-7-sonnet\`\n`
  brief += `- **Responsibility**: Task lifecycle management, shared board orchestration, and milestone verification.\n\n`

  if (plannerSkills.length > 0) {
    brief += `### 2. @architect (System Architect & Wave Planner)\n`
    brief += `- **Model**: \`claude-3-7-sonnet\`\n`
    brief += `- **Active Skills**: ${plannerSkills.map((s) => `\`/${s.scoped}\``).join(', ')}\n`
    brief += `- **Mission**: Architectural blueprints, ADRs, schema design, and dependency ordering.\n\n`
  }

  if (builderSkills.length > 0) {
    brief += `### 3. @builder (Domain Implementer)\n`
    brief += `- **Model**: \`gemini-2.0-flash\`\n`
    brief += `- **Active Skills**: ${builderSkills.map((s) => `\`/${s.scoped}\``).join(', ')}\n`
    brief += `- **Mission**: High-speed, surgical implementation matching specification contracts.\n\n`
  }

  if (verifierSkills.length > 0) {
    brief += `### 4. @verifier (Adversarial QA & Security Auditor)\n`
    brief += `- **Model**: \`deepseek-reasoner\` or \`o3-mini\`\n`
    brief += `- **Active Skills**: ${verifierSkills.map((s) => `\`/${s.scoped}\``).join(', ')}\n`
    brief += `- **Mission**: Zero-regression enforcement, automated unit/E2E test runs, and boundary security checks.\n\n`
  }

  brief += `## 🏛️ Invariant Repository Laws\n`
  brief += `1. **Law 1: Dual Matrix Parity**: Synchronize Markdown and CSV catalogs simultaneously.\n`
  brief += `2. **Law 2: Open SKILL.md Standard**: Standard YAML frontmatter, When to Use, and Anti-Patterns.\n`
  brief += `3. **Law 4: Creator Independence**: Never cross-contaminate or merge skills across upstream authors.\n`
  brief += `4. **Verification Gate**: Evidence precedes assertions. Always run tests before claiming completion.\n\n`

  brief += `## 🚀 1-Click Launch Command\n`
  brief += `\`\`\`bash\n`
  brief += `/swarm title "SkillDock Active Stack Sprint"\n`
  brief += `\`\`\`\n`

  return brief
}

export interface SwarmWaveStage {
  id: string
  phaseNumber: number
  title: string
  owner: string
  model: string
  color: string
  skills: { id: string; name: string; scoped: string }[]
  mission: string
  deliverables: string[]
  telemetryLogs: string[]
}

export function getSwarmWaveStages(stack: SwarmInputItem[]): SwarmWaveStage[] {
  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)

  return [
    {
      id: 'wave-1',
      phaseNumber: 1,
      title: 'Intent & Task Decomposition',
      owner: '@coordinator',
      model: 'claude-3-7-sonnet',
      color: 'purple',
      skills: [],
      mission: 'Ingest user requirements, establish shared message board, and slice backlog into atomic dependency waves.',
      deliverables: [
        'Shared Message Board initialized',
        'Sprint Epic broken into 3 execution waves',
        'Model allocations and tool permissions verified',
      ],
      telemetryLogs: [
        '[@coordinator] Reading workspace manifests and user requirements...',
        '[@coordinator] Detected stack size: ' + stack.length + ' active skills.',
        '[@coordinator] Dispatched task contract to @architect: Design system boundaries and ADRs.',
      ],
    },
    {
      id: 'wave-2',
      phaseNumber: 2,
      title: 'System Architecture & ADRs',
      owner: '@architect',
      model: 'claude-3-7-sonnet',
      color: 'amber',
      skills: plannerSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      mission: 'Author architectural contracts, ADRs, interface definitions, and dependency graph.',
      deliverables: [
        'System Architecture & Interface Contracts',
        'ADR-001 recording key architectural decisions',
        'Wave execution breakdown with explicit invariants',
      ],
      telemetryLogs: [
        '[@architect] Evaluating constraints across active planner skills: ' +
          (plannerSkills.map((s) => '/' + s.scoped).slice(0, 3).join(', ') || 'none') +
          '...',
        '[@architect] ADR-001 created. Non-negotiable repository laws locked.',
        '[@architect] Handoff posted to shared board: Handing off to @builder.',
      ],
    },
    {
      id: 'wave-3',
      phaseNumber: 3,
      title: 'Test-Driven Implementation Slices',
      owner: '@builder',
      model: 'gemini-2.0-flash',
      color: 'emerald',
      skills: builderSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      mission: 'Execute surgical, test-first implementations adhering strictly to architectural contracts and design tokens.',
      deliverables: [
        'Red-to-green unit tests with zero flaky assertions',
        'Surgical feature code with minimal dependency footprint',
        'Atomic Git commits per task slice',
      ],
      telemetryLogs: [
        '[@builder] Implementing task slices with active skills: ' +
          (builderSkills.map((s) => '/' + s.scoped).slice(0, 3).join(', ') || 'default') +
          '...',
        '[@builder] Test suite running: Red -> Green -> Refactor cycle complete.',
        '[@builder] Atomic commit staged. Tagging @verifier for adversarial review.',
      ],
    },
    {
      id: 'wave-4',
      phaseNumber: 4,
      title: 'Adversarial QA & Law 1 Parity Gate',
      owner: '@verifier',
      model: 'deepseek-reasoner',
      color: 'rose',
      skills: verifierSkills.map((s) => ({ id: s.id, name: s.name, scoped: s.scoped })),
      mission: 'Enforce zero-regression gates, execute E2E browser test suites, and verify Law 1 dual matrix parity.',
      deliverables: [
        'Playwright E2E browser tests passing on Chromium/Firefox/WebKit',
        'Law 1 Dual Matrix Parity verified (sync-matrix.py exit 0)',
        'Security boundary scan for credentials and leaky processes',
      ],
      telemetryLogs: [
        '[@verifier] Inspecting git diff and test evidence...',
        '[@verifier] Running Playwright E2E test suite: All scenarios verified.',
        '[@verifier] Dual Matrix Parity: 100% MATCH. Sign-off issued to @coordinator.',
      ],
    },
    {
      id: 'wave-5',
      phaseNumber: 5,
      title: 'Release Gate & Trunk Landing',
      owner: '@coordinator',
      model: 'claude-3-7-sonnet',
      color: 'purple',
      skills: [],
      mission: 'Verify all sign-offs, compile changelog, and execute clean trunk-based landing.',
      deliverables: [
        'Sprint Verification Summary compiled',
        'Production bundle staged and verified',
        'Clean trunk merge & push to origin/main',
      ],
      telemetryLogs: [
        '[@coordinator] All 4 waves passed with 0 blocking findings.',
        '[@coordinator] Generating sprint release notes and updating implementation status.',
        '[@coordinator] Sprint complete. Swarm dissolved with 100% green status.',
      ],
    },
  ]
}

export function generateSwarmWavePlan(stack: SwarmInputItem[]): string {
  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)
  const dateStr = new Date().toISOString().split('T')[0]

  let md = `# 🌊 Multi-Agent Swarm Wave Execution Plan (SWARM_WAVE.md)\n\n`
  md += `> **Sprint Goal**: Autonomous multi-agent wave execution for active SkillDock stack.\n`
  md += `> **Active Skills**: ${stack.length} skills (${plannerSkills.length} Planning, ${builderSkills.length} Implementation, ${verifierSkills.length} QA/Security)\n`
  md += `> **Generated**: ${dateStr} by SkillDock Swarm Studio v3.0\n\n`
  md += `---\n\n`

  md += `## 📋 Agent Roster & Model Assignments\n\n`
  md += `| Agent Role | Model Pin | Scope & Responsibilities | Assigned Skills |\n`
  md += `| :--- | :--- | :--- | :--- |\n`
  md += `| \`@coordinator\` | \`claude-3-7-sonnet\` | Intent analysis, task slicing, shared board management, release gate | Core Orchestrator |\n`
  md += `| \`@architect\` | \`claude-3-7-sonnet\` | System contracts, ADRs, interface specifications, wave ordering | ${plannerSkills.map((s) => `\`/${s.scoped}\``).join(', ') || 'Architecture'} |\n`
  md += `| \`@builder\` | \`gemini-2.0-flash\` | TDD implementation, red-green cycles, code synthesis, design token adherence | ${builderSkills.map((s) => `\`/${s.scoped}\``).join(', ') || 'Implementation'} |\n`
  md += `| \`@verifier\` | \`deepseek-reasoner\` | Adversarial QA, E2E browser testing, Law 1 parity, zero-regression gate | ${verifierSkills.map((s) => `\`/${s.scoped}\``).join(', ') || 'QA & Parity'} |\n\n`
  md += `---\n\n`

  md += `## 🌊 Sequential Execution Waves\n\n`

  md += `### Wave 1: Intent & Architectural Foundations\n`
  md += `- **Owner**: \`@coordinator\` ➔ \`@architect\`\n`
  md += `- **Input**: User specifications, feature requirements, and domain model\n`
  md += `- **Deliverables**:\n`
  md += `  1. \`docs/ARCHITECTURE.md\` (or module design contracts)\n`
  md += `  2. \`ADR-001\` with evaluated trade-offs and non-negotiable invariants\n`
  md += `  3. Atomic task breakdown with explicit dependency graph\n`
  md += `- **Handoff Contract**: \`@architect\` posts design contracts to shared message board and tags \`@builder\`.\n\n`

  md += `### Wave 2: Test-Driven Implementation Slices\n`
  md += `- **Owner**: \`@builder\`\n`
  md += `- **Input**: Architecture contracts and verified task slices\n`
  md += `- **Deliverables**:\n`
  md += `  1. Red-to-green unit tests covering domain edge cases\n`
  md += `  2. Surgical code implementation with zero speculative abstractions\n`
  md += `  3. Atomic Git commits per task slice (\`feat(...)\`, \`fix(...)\`)\n`
  md += `- **Handoff Contract**: \`@builder\` completes local verification, runs test suites, and tags \`@verifier\`.\n\n`

  md += `### Wave 3: Adversarial Verification & Release Gate\n`
  md += `- **Owner**: \`@verifier\` ➔ \`@coordinator\`\n`
  md += `- **Input**: Implemented code slices, test logs, and git diff\n`
  md += `- **Deliverables**:\n`
  md += `  1. Full Playwright E2E browser and unit test execution\n`
  md += `  2. Law 1 (Dual Matrix Parity) verification\n`
  md += `  3. Security scan for credentials, unbounded loops, or leaking state\n`
  md += `- **Release Gate**: \`@coordinator\` verifies all green checks, compiles \`CHANGELOG.md\`, and triggers trunk landing.\n\n`

  md += `---\n\n`
  md += `## 🏛️ Invariant Repository Laws & Directives\n`
  md += `1. **Law 1 (Parity)**: Synchronize \`.md\` and \`.csv\` catalogs simultaneously.\n`
  md += `2. **Law 2 (Open SKILL.md)**: Adhere to standard frontmatter, When to Use, and Anti-Patterns.\n`
  md += `3. **Law 4 (Creator Independence)**: Never blend upstream frameworks; maintain pure individual commands.\n`
  md += `4. **Evidence Over Assertions**: Run tests and verify exit codes before claiming completion.\n\n`

  md += `---\n\n`
  md += `## 🚀 Ready-to-Execute Agent Swarm Dispatch Commands\n`
  md += `\`\`\`bash\n`
  md += `# Run directly in Claude Code, Antigravity Swarm, or OpenCode:\n`
  md += `/swarm title "SkillDock Active Stack Sprint"\n`
  md += `@coordinator Decompose active sprint backlog into 3 sequential waves.\n`
  md += `@architect Author system contracts and review against active skills: ${plannerSkills.map((s) => `/${s.scoped}`).join(', ') || 'architecture'}\n`
  md += `@builder Implement task slices using TDD with active skills: ${builderSkills.map((s) => `/${s.scoped}`).join(', ') || 'implement'}\n`
  md += `@verifier Run full test suite and verify Law 1 parity using active skills: ${verifierSkills.map((s) => `/${s.scoped}`).join(', ') || 'test'}\n`
  md += `\`\`\`\n`

  return md
}

