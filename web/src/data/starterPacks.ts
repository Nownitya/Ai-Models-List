export interface StarterPack {
  id: string
  title: string
  icon: string
  badge: string
  repo: string
  description: string
  skillIds: string[]
}

export const STARTER_PACKS: StarterPack[] = [
  {
    id: 'gsd-engine',
    title: 'GSD Autonomous Wave Suite',
    icon: '⚡',
    badge: 'open-gsd/gsd-core',
    repo: 'open-gsd/gsd-core',
    description: 'Structured development into Discuss → Plan → Execute → Verify → Ship waves with verification gates.',
    skillIds: ['gsd-core', 'gsd-plan-phase', 'gsd-execute-phase', 'gsd-verify-work', 'gsd-security-/-verification-gates'],
  },
  {
    id: 'superpowers-harness',
    title: 'Superpowers Engineering Suite',
    icon: '🛡️',
    badge: 'obra/superpowers',
    repo: 'obra/superpowers',
    description: 'Jesse Vincent\'s battle-tested development harness: Brainstorming, Writing Plans, Executing Plans, and TDD.',
    skillIds: ['brainstorming', 'writing-plans', 'executing-plans', 'test-driven-development', 'systematic-debugging', 'using-git-worktrees'],
  },
  {
    id: 'gstack-founder',
    title: 'gstack Founder & Review Suite',
    icon: '🚀',
    badge: 'garrytan/gstack',
    repo: 'garrytan/gstack',
    description: 'Garry Tan / YC startup workflow: CEO strategy critique, architecture audit, design review, QA, and shipping.',
    skillIds: ['plan-ceo-review', 'plan-eng-review', 'plan-design-review', 'autoplan', 'review', 'ship'],
  },
  {
    id: 'ecc-ralph-loop',
    title: 'ECC & Ralph Autonomous Loop',
    icon: '🤖',
    badge: 'affaan-m/ecc',
    repo: 'affaan-m/ecc',
    description: 'Autonomous PRD story execution with Ralph loop, AgentShield invariant guards, and anti-slop design checks.',
    skillIds: ['ralph-loop', 'everything-claude-code', 'impeccable', 'taste-skill', 'karpathy-guidelines'],
  },
  {
    id: 'android-kmp',
    title: 'Android & KMP Native Mobile',
    icon: '📱',
    badge: 'android/skills',
    repo: 'android/skills',
    description: 'Hardware interop, Compose UI, Navigation 3, ANR triage, Swift bridges, and Kotlin Gradle toolchains.',
    skillIds: ['camerax', 'navigation-3', 'compose-preview', 'anr-audit-and-fix', 'r8-analyzer', 'swiftui-pro'],
  },
  {
    id: 'second-brain-context',
    title: 'Second Brain & Knowledge Graph',
    icon: '💎',
    badge: 'Second Brain',
    repo: 'graphify-labs/graphify',
    description: 'Obsidian vault synchronization, MemPalace semantic memory, AST codebase graphs, and Context7 docs.',
    skillIds: ['obsidian-developer-second-brain', 'graphify', 'mempalace', 'context7', 'docs'],
  },
  {
    id: 'claude-marketplace-suite',
    title: 'Claude Marketplace Essential Suite',
    icon: '🧠',
    badge: 'Claude Marketplace',
    repo: 'anthropics/claude-plugins-official',
    description: 'Top-ranked official plugins from the 530-plugin Claude Marketplace: Code Review, Context7, Playwright, Ralph Loop, and Superpowers.',
    skillIds: ['code-review', 'context7', 'playwright-cli', 'ralph-loop', 'superpowers'],
  },
]
