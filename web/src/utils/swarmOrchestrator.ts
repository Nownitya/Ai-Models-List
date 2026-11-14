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
