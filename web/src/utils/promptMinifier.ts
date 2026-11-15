import type { SavedStackItem } from '@/types'

export interface MinifiedPromptResult {
  originalPrompt: string
  minifiedPrompt: string
  originalTokens: number
  minifiedTokens: number
  tokenSavings: number
  percentSavings: number
  dollarSavingsPerThousandTurns: number
}

// Estimates token count using standard ~4 chars/token heuristic
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function minifyStackPrompt(stack: SavedStackItem[]): MinifiedPromptResult {
  // 1. Generate Raw Verbose Baseline Prompt
  let raw = `# SYSTEM PROMPT: AI CODING ASSISTANT CONFIGURATION\n\n`
  raw += `You are an expert AI software engineering assistant working on a production codebase.\n`
  raw += `Please ensure that you carefully read and follow all of the specialized capabilities and guidelines listed below.\n`
  raw += `It is very important that you always adhere to standard software engineering best practices, maintain clean code architecture, and avoid unnecessary technical debt at all times.\n\n`
  raw += `## ACTIVE SKILLS AND SPECIALIZED CAPABILITIES (${stack.length}):\n\n`

  stack.forEach((s) => {
    raw += `### Skill Name: ${s.name}\n`
    raw += `- Priority Level: ${s.priority}\n`
    raw += `- Scoped Slash Command: /${s.scoped}\n`
    if (s.repo) raw += `- Upstream Repository: https://github.com/${s.repo}\n`
    raw += `- Activation Command: ${s.officialCli || s.cli}\n`
    raw += `- Best Practices: Please make sure to follow the official implementation patterns for ${s.name}. You should always verify that your code compiles cleanly and matches the specifications.\n\n`
  })

  raw += `## OPERATING INVARIANTS AND REPOSITORY LAWS:\n`
  raw += `1. Parity Check: Please make sure that you verify parity between all documentation and code implementations before claiming completion.\n`
  raw += `2. Testing Invariant: You should always write unit tests or integration tests to prove that your code works properly before finishing.\n`
  raw += `3. Anti-Slop: Please ensure that you do not generate bloated boilerplate, purple gradients, or unneeded abstractions.\n`
  raw += `4. Minimal Changes: Try your best to make surgical, minimal changes that solve the problem directly without over-engineering.\n`

  // 2. Generate Compiled & Minified Telegraphic Prompt
  let min = `<system_prompt version="3.0" mode="production" density="high">\n`
  min += `# ROLE: Lead Systems Engineer & Autonomous Coding Fleet\n`
  min += `# DIRECTIVE: Execute surgical, deterministic implementations. Reject conversational fluff. Output verified code only.\n\n`
  
  min += `<active_skills count="${stack.length}">\n`
  stack.forEach((s) => {
    min += `[SKILL: ${s.id} | /${s.scoped} | ${s.priority}]\n`
    if (s.repo) min += `upstream: ${s.repo}\n`
    if (s.officialCli) min += `cli: ${s.officialCli}\n`
  })
  min += `</active_skills>\n\n`

  min += `<hard_invariants>\n`
  min += `1. EVIDENCE_OVER_ASSERTIONS: Never claim success without verification command outputs.\n`
  min += `2. ANTI_SLOP: Zero purple glow blobs, zero decorative emoji clutter, zero unrequested wrappers.\n`
  min += `3. YAGNI_SHORTEST_DIFF: Smallest complete change wins. No speculative factories or interfaces.\n`
  min += `4. CREATOR_PURITY: Never merge distinct upstream frameworks into synthetic blends.\n`
  min += `</hard_invariants>\n`
  min += `</system_prompt>`

  const originalTokens = estimateTokens(raw)
  const minifiedTokens = estimateTokens(min)
  const tokenSavings = Math.max(0, originalTokens - minifiedTokens)
  const percentSavings = originalTokens > 0 ? Math.round((tokenSavings / originalTokens) * 100) : 0
  
  // Claude 3.7 Sonnet pricing: $3.00 / 1M input tokens
  const dollarSavingsPerThousandTurns = Number(((tokenSavings * 1000 * 3.0) / 1_000_000).toFixed(2))

  return {
    originalPrompt: raw,
    minifiedPrompt: min,
    originalTokens,
    minifiedTokens,
    tokenSavings,
    percentSavings,
    dollarSavingsPerThousandTurns,
  }
}
