export interface LintFinding {
  type: 'conflict' | 'synergy' | 'guard'
  title: string
  message: string
  suggestedAction?: string
}

export function lintSkillStack(stackSkillIds: string[]): LintFinding[] {
  const ids = new Set(stackSkillIds.map((id) => id.toLowerCase()))
  const findings: LintFinding[] = []

  // 1. CONFLICTS / REDUNDANCIES
  // Multiple Auth Providers
  const authSkills = ['better-auth-patterns', 'clerk-auth-identity', 'auth0']
  const matchedAuth = authSkills.filter((s) => ids.has(s))
  if (matchedAuth.length > 1) {
    findings.push({
      type: 'conflict',
      title: 'Redundant Authentication Providers',
      message: `Stack contains multiple auth solutions (${matchedAuth.join(', ')}). Retaining one saves ~800 tokens and prevents contradictory session logic.`,
      suggestedAction: 'Keep your primary auth provider and remove duplicates.',
    })
  }

  // Multiple Orchestration Suites
  const suiteSkills = ['gsd-core', 'everything-claude-code-(ecc)', 'ralph-loop']
  const matchedSuites = suiteSkills.filter((s) => ids.has(s))
  if (matchedSuites.length > 1) {
    findings.push({
      type: 'conflict',
      title: 'Overlapping Swarm / Loop Engines',
      message: `Stack contains multiple orchestration harnesses (${matchedSuites.join(', ')}). Choose either GSD wave execution or Ralph loop.`,
      suggestedAction: 'Pick one orchestrator harness to prevent competing agent state loops.',
    })
  }

  // Multiple AI Gateways
  const gatewaySkills = ['bifrost', 'freellmapi']
  const matchedGateways = gatewaySkills.filter((s) => ids.has(s))
  if (matchedGateways.length > 1) {
    findings.push({
      type: 'conflict',
      title: 'Multiple AI Router Gateways',
      message: `Both Bifrost (<200µs gateway) and FreeLLMAPI (free multi-provider) are active.`,
      suggestedAction: 'Select Bifrost for low-latency enterprise routing or FreeLLMAPI for zero-cost pooling.',
    })
  }

  // 2. HIGH-LEVERAGE SYNERGIES
  if (ids.has('taste-skill') && ids.has('unslop')) {
    findings.push({
      type: 'synergy',
      title: 'Anti-Slop Design Synergy',
      message: 'Optimal pairing: taste-skill provides quiet tactile micro-interactions while unslop strips AI purple gradients and template bloat.',
    })
  }

  if (ids.has('tdd') && ids.has('systematic-debugging')) {
    findings.push({
      type: 'synergy',
      title: 'Verified Reliability Synergy',
      message: 'High-signal combo: TDD ensures red-green contract coverage, while systematic-debugging reproduces root causes before code changes.',
    })
  }

  if (ids.has('graphify') && ids.has('mempalace')) {
    findings.push({
      type: 'synergy',
      title: 'Second Brain & Knowledge Graph Synergy',
      message: 'Graphify provides AST structural relationships while MemPalace preserves durable semantic memory across agent sessions.',
    })
  }

  if (ids.has('ponytail') && ids.has('karpathy-guidelines')) {
    findings.push({
      type: 'synergy',
      title: 'Pragmatic Engineering Simplicity',
      message: 'Ponytail cuts speculative abstractions while Karpathy guidelines enforce surgical, think-before-coding discipline.',
    })
  }

  if (ids.has('deepseek-r1-reasoning') && (ids.has('tdd') || ids.has('test-driven-development'))) {
    findings.push({
      type: 'synergy',
      title: 'Frontier Reasoning & Empirical Verification',
      message: 'DeepSeek-R1 extended deliberation (<think>) paired with TDD creates a provably verifiable, hallucination-resistant execution loop.',
    })
  }

  if (ids.has('pydantic-ai') && ids.has('better-auth-patterns')) {
    findings.push({
      type: 'synergy',
      title: 'End-to-End Type Safety Synergy',
      message: 'PydanticAI validated agent schemas combined with Better Auth typed session management ensures end-to-end runtime security.',
    })
  }

  // 3. COMPLETENESS & SAFETY GUARDS
  const uiSkills = ['taste-skill', 'unslop', 'shadcn-ui', 'compose-preview', 'modern-web-guidance', 'ui-ux-pro-max']
  const testingSkills = ['tdd', 'test-driven-development', 'systematic-debugging', 'momentic-visual-testing', 'playwright-cli']
  const hasUi = uiSkills.some((s) => ids.has(s))
  const hasTesting = testingSkills.some((s) => ids.has(s))

  if (hasUi && !hasTesting) {
    findings.push({
      type: 'guard',
      title: 'Missing Test Verification Guard',
      message: 'Stack contains UI/frontend skills but lacks an automated test verification skill. Per Law 3, evidence must precede assertions.',
      suggestedAction: 'Consider pairing with /mp-tdd or /superpowers-systematic-debugging.',
    })
  }

  return findings
}
