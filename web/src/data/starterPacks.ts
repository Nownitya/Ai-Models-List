export interface StarterPack {
  id: string
  title: string
  icon: string
  badge: string
  description: string
  skillIds: string[]
}

export const STARTER_PACKS: StarterPack[] = [
  {
    id: 'android-kmp',
    title: 'Android & KMP Suite',
    icon: '📱',
    badge: 'Mobile Native',
    description: 'Hardware interop, Compose UI, Navigation 3, ANR triage, and Swift Package Manager bridges.',
    skillIds: ['camerax', 'navigation-3', 'compose-preview', 'anr-audit-and-fix', 'r8-analyzer', 'swiftui-pro'],
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous Execution Suite',
    icon: '⚡',
    badge: 'Agent Loops',
    description: 'Full autonomous development harness: GSD wave engine, red-green-refactor TDD, and debugging.',
    skillIds: ['gsd-core', 'ralph-loop', 'test-driven-development', 'systematic-debugging', 'careful', 'guard'],
  },
  {
    id: 'second-brain',
    title: 'Developer Second Brain',
    icon: '💎',
    badge: 'Knowledge Hub',
    description: 'Obsidian vault synchronization, MemPalace semantic memory, and AST codebase graph generation.',
    skillIds: ['obsidian-developer-second-brain', 'mempalace', 'graphify', 'docs', 'adr'],
  },
  {
    id: 'code-review-qa',
    title: 'Code Review & QA Shield',
    icon: '🛡️',
    badge: 'Zero-Bugs',
    description: 'Rigorous multi-agent PR review, adversarial quality assurance, and YC-style CEO/Eng critique.',
    skillIds: ['code-review', 'coderabbit', 'qa', 'plan-eng-review', 'plan-ceo-review'],
  },
]
