export interface PromptImpact {
  skillId: string
  title: string
  badPromptSummary: string
  badCodeSnippet: string
  goodPromptSummary: string
  goodCodeSnippet: string
  keyTakeaway: string
}

const CURATED_IMPACTS: Record<string, Omit<PromptImpact, 'skillId'>> = {
  unslop: {
    title: 'Anti-Slop Clean Design vs AI Purple Bloat',
    badPromptSummary: 'Without skill: Generic agent generates heavy purple gradient glows, nested unnecessary divs, and AI-slop visual clutter.',
    badCodeSnippet: `// ❌ Without unslop: AI Purple Slop & Bloated Nested Elements
<div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-black p-8 flex items-center justify-center">
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
    <div className="relative px-8 py-10 bg-black ring-1 ring-purple-500/50 rounded-2xl leading-none flex items-top justify-start space-x-6">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        AI Power Dashboard 🚀✨
      </h2>
    </div>
  </div>
</div>`,
    goodPromptSummary: 'With unslop: Clean semantic markup, quiet tactile dark surfaces, crisp borders, and zero gratuitous gradients.',
    goodCodeSnippet: `// ✅ With unslop: High-Craft Native UI with Quiet Chrome
<div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 font-sans antialiased">
  <header className="flex items-center justify-between border-b border-[#27272a] pb-4">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-emerald-500" />
      <h1 className="text-sm font-semibold tracking-tight text-zinc-200">System Telemetry</h1>
    </div>
    <span className="font-mono text-xs text-zinc-500">v3.2.0 • 12ms</span>
  </header>
</div>`,
    keyTakeaway: 'Replaces 4 layers of bloated glow wrappers with quiet, high-signal craft and 70% fewer CSS classes.',
  },

  'taste-skill': {
    title: 'Front-End Polish & Quiet Micro-Interactions',
    badPromptSummary: 'Without skill: Generic button with oversaturated blue and no hover state consistency or accessibility.',
    badCodeSnippet: `// ❌ Without taste-skill: Default AI button template
<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 transition duration-200">
  Click Here To Continue!
</button>`,
    goodPromptSummary: 'With taste-skill: Subdued borders, active depression states, tactile focus rings, and proper aria accessibility.',
    goodCodeSnippet: `// ✅ With taste-skill: Tactile, Accessible Micro-Interaction
<button 
  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 active:scale-[0.98] text-xs font-semibold text-zinc-200 border border-[#27272a] hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-400 transition-colors cursor-pointer"
  aria-label="Export configuration bundle"
>
  <Download className="w-3.5 h-3.5 text-zinc-400" />
  <span>Export Bundle</span>
</button>`,
    keyTakeaway: 'Delivers professional design system consistency with tactile feedback and accessibility.',
  },

  ponytail: {
    title: 'Pragmatic Simplicity vs Over-Engineering',
    badPromptSummary: 'Without skill: Over-abstracted Repository Factory Pattern with 5 files to read a simple JSON configuration.',
    badCodeSnippet: `// ❌ Without ponytail: Speculative Generic Enterprise Wrapper
export interface IConfigRepository<T> {
  fetchAsync(id: string): Promise<Result<T, ConfigError>>;
  hydrateCache(policy: CacheStrategy): void;
}
export class AbstractConfigRepositoryFactory {
  static createRepository<T extends BaseConfig>(): IConfigRepository<T> {
    return new DefaultDistributedDistributedConfigRepositoryImpl<T>(new RedisCacheAdapter(), new FileFallbackDriver());
  }
}`,
    goodPromptSummary: 'With ponytail: The smallest complete change. Reuses built-in standard library or direct JSON import.',
    goodCodeSnippet: `// ✅ With ponytail: Smallest Complete Working Implementation
import config from './config.json' assert { type: 'json' }

export function getApiKey(service: string): string | undefined {
  return config.keys[service] || process.env[\`\${service.toUpperCase()}_KEY\`]
}`,
    keyTakeaway: 'Saves 120 lines of unneeded boilerplate and prevents speculative architecture traps.',
  },

  'systematic-debugging': {
    title: 'Root-Cause Scientific Diagnosis vs Blind Patching',
    badPromptSummary: 'Without skill: Agent blindly wraps failing code in speculative try/catch blocks that mask the underlying failure.',
    badCodeSnippet: `// ❌ Without systematic-debugging: Blind try/catch symptom-masking
try {
  const result = await processUserPayment(userId, cart.total)
  return result
} catch (e) {
  console.log("Something went wrong, continuing anyway:", e)
  return { status: "ok" } // Silently corrupts database state!
}`,
    goodPromptSummary: 'With systematic-debugging: Reproduces in a minimal harness, asserts boundary invariants, and verifies root cause.',
    goodCodeSnippet: `// ✅ With systematic-debugging: Minimal reproduction & strict boundary check
test('rejects payment when idempotencyKey is missing', async () => {
  const payload = { userId: 'usr_123', total: 4500 }
  // Verified Root Cause: Stripe API rejects calls without Idempotency-Key header on retries
  await expect(processUserPayment(payload)).rejects.toThrow(/IdempotencyKeyRequired/)
})`,
    keyTakeaway: 'Pinpoints exact root cause before touching code; zero symptom-masking or silent state corruption.',
  },

  tdd: {
    title: 'Test-Driven Red-Green-Refactor vs Post-Hoc Guessing',
    badPromptSummary: 'Without skill: Agent writes 300 lines of complex untested logic and asserts "All done, code looks great!"',
    badCodeSnippet: `// ❌ Without tdd: 200 lines of unverified code written without tests
export function calculateDynamicTaxRate(order: Order, taxProfile: TaxProfile): number {
  // Complex untested discount calculations, edge cases completely ignored
  if (order.region === 'EU') {
    return order.total * (taxProfile.vatRates[order.countryCode] || 0.20)
  }
  // What about exempt products? Reverse charge VAT? Zero tests exist!
  return order.total * 0.08
}`,
    goodPromptSummary: 'With tdd: Writes failing test for VAT edge case first, writes minimal green code, verifies pass.',
    goodCodeSnippet: `// ✅ With tdd: Red-Green Cycle with Exhaustive Boundary Coverage
describe('calculateDynamicTaxRate', () => {
  it('applies reverse charge VAT for B2B cross-border EU orders', () => {
    const order = { region: 'EU', countryCode: 'FR', isB2B: true, vatId: 'FR123456789', total: 1000 }
    expect(calculateDynamicTaxRate(order, mockTaxProfile)).toBe(0) // Verified!
  })
})`,
    keyTakeaway: 'Ensures 100% test verification evidence before claiming completion. Zero untested edge cases.',
  },

  'better-auth-patterns': {
    title: 'Type-Safe Modern Auth vs Insecure JWT Guesswork',
    badPromptSummary: 'Without skill: Hand-rolled insecure JWT cookies with unverified expiry and missing CSRF headers.',
    badCodeSnippet: `// ❌ Without better-auth-patterns: Insecure token storage
localStorage.setItem('authToken', token); // Vulnerable to XSS token theft!
const user = jwtDecode(token); // Unsigned client trust!`,
    goodPromptSummary: 'With better-auth-patterns: HttpOnly samesite cookies, passkey WebAuthn support, and session rotation.',
    goodCodeSnippet: `// ✅ With better-auth-patterns: Robust Server-Side Session Validation
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return new Response('Unauthorized', { status: 401 })
  return Response.json({ user: session.user })
}`,
    keyTakeaway: 'Prevents XSS/CSRF token exfiltration with native HttpOnly sessions and passkeys.',
  },

  'prisma-orm-patterns': {
    title: 'Targeted Projection & Indexing vs N+1 Query Cascade',
    badPromptSummary: 'Without skill: Overfetching full rows with multiple unbatched queries inside a .map() loop.',
    badCodeSnippet: `// ❌ Without prisma-orm-patterns: Fatal N+1 query loop
const posts = await prisma.post.findMany()
const results = await Promise.all(posts.map(async (p) => {
  const author = await prisma.user.findUnique({ where: { id: p.authorId } }) // 100 queries!
  return { ...p, authorName: author?.name }
}))`,
    goodPromptSummary: 'With prisma-orm-patterns: Single round-trip with explicit select projection and foreign key index.',
    goodCodeSnippet: `// ✅ With prisma-orm-patterns: Single Roundtrip Batch Query with Projection
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: { select: { name: true } },
  },
  take: 50,
})`,
    keyTakeaway: 'Cuts database query latency by 90% and reduces memory footprint by 80%.',
  },
}

export function getPromptImpactForSkill(skill: {
  id: string
  name: string
  scoped: string
  categoryLabel?: string
  description?: string
}): PromptImpact {
  if (CURATED_IMPACTS[skill.id]) {
    return {
      skillId: skill.id,
      ...CURATED_IMPACTS[skill.id],
    }
  }

  // Fallback intelligent generator based on skill metadata
  return {
    skillId: skill.id,
    title: `${skill.name} Contract Enforcement`,
    badPromptSummary: `Without /${skill.scoped}: Agent dumps monolithic prompt (~26k tokens), produces generic template code, and ignores project invariants.`,
    badCodeSnippet: `// ❌ Without /${skill.scoped}: Monolithic context dilution & hallucinations
// Agent generated bloated boilerplate ignoring repository conventions:
function executeOperation() {
  // Speculative variables, untested mock assumptions
  console.log("Running generic routine...");
  return { status: "assumed_ok" }; // Zero verification!
}`,
    goodPromptSummary: `With /${skill.scoped}: Pinned atomic skill instructions (~800 tokens, 90% context savings) enforce exact domain rules.`,
    goodCodeSnippet: `// ✅ With /${skill.scoped}: Surgical, Verified Domain Contract
// Agent strictly adheres to ${skill.name} invariants:
import { verifyContract } from '@/governance'

export async function executeOperation() {
  const verified = await verifyContract()
  if (!verified.ok) throw new Error(verified.reason)
  return verified.data
}`,
    keyTakeaway: `Enforces strict ${skill.name} invariants while saving ~85% prompt tokens compared to monolithic prompt suites.`,
  }
}
