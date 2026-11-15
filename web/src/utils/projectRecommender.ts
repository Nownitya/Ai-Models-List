import type { Skill } from '@/types'

export interface DetectedTech {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'testing' | 'database' | 'infra'
  skills: string[]
}

export interface RecommendationResult {
  manifestType: 'package.json' | 'gradle' | 'python' | 'cargo' | 'generic'
  detectedTech: string[]
  recommendedSkillIds: string[]
  summary: string
  tokenFootprint: number
  savingsPercent: number
}

// Rules mapping keywords to detected technologies and skill recommendations
const DETECTION_RULES: {
  patterns: RegExp[]
  name: string
  category: DetectedTech['category']
  skills: string[]
}[] = [
  // Frontend Web / UI
  {
    patterns: [/react/i, /next/i, /vite/i, /remix/i],
    name: 'React / Next.js',
    category: 'frontend',
    skills: ['taste-skill', 'unslop', 'modern-web-guidance', 'ui-ux-pro-max'],
  },
  {
    patterns: [/tailwind/i, /postcss/i],
    name: 'Tailwind CSS',
    category: 'frontend',
    skills: ['unslop', 'taste-skill', 'ui-ux-pro-max'],
  },
  {
    patterns: [/svelte/i],
    name: 'Svelte 5',
    category: 'frontend',
    skills: ['svelte5-runes-patterns', 'taste-skill', 'unslop'],
  },
  {
    patterns: [/vue/i, /nuxt/i],
    name: 'Vue / Nuxt',
    category: 'frontend',
    skills: ['taste-skill', 'unslop', 'modern-web-guidance'],
  },

  // Database & Backend
  {
    patterns: [/prisma/i],
    name: 'Prisma ORM',
    category: 'database',
    skills: ['prisma-orm-patterns', 'neon-serverless-postgres'],
  },
  {
    patterns: [/neon/i, /pg/i, /postgres/i, /sql/i],
    name: 'PostgreSQL / SQL',
    category: 'database',
    skills: ['neon-serverless-postgres', 'prisma-orm-patterns'],
  },
  {
    patterns: [/better-auth/i, /auth0/i, /clerk/i, /next-auth/i],
    name: 'Authentication (Better Auth / Clerk)',
    category: 'backend',
    skills: ['better-auth-patterns'],
  },
  {
    patterns: [/fastify/i, /express/i, /nest/i],
    name: 'Node.js / TypeScript Backend',
    category: 'backend',
    skills: ['codebase-design', 'systematic-debugging', 'tdd'],
  },

  // Testing & Quality
  {
    patterns: [/playwright/i],
    name: 'Playwright',
    category: 'testing',
    skills: ['playwright-cli', 'momentic-visual-testing', 'tdd'],
  },
  {
    patterns: [/jest/i, /vitest/i, /mocha/i, /pytest/i, /testing-library/i],
    name: 'Automated Test Harness',
    category: 'testing',
    skills: ['tdd', 'test-driven-development', 'systematic-debugging'],
  },

  // Android & Mobile
  {
    patterns: [/androidx\.compose/i, /compose\.ui/i, /compose/i],
    name: 'Jetpack Compose',
    category: 'mobile',
    skills: ['jetpack-compose-performance', 'navigation-3', 'edge-to-edge'],
  },
  {
    patterns: [/navigation3/i, /androidx\.navigation/i],
    name: 'Android Navigation 3',
    category: 'mobile',
    skills: ['navigation-3', 'edge-to-edge'],
  },
  {
    patterns: [/camerax/i, /camera-camera2/i],
    name: 'Android CameraX',
    category: 'mobile',
    skills: ['camerax'],
  },
  {
    patterns: [/react-native-windows/i, /react-native/i],
    name: 'React Native / Windows',
    category: 'mobile',
    skills: ['react-native-windows', 'taste-skill', 'unslop'],
  },

  // Python & AI / ML
  {
    patterns: [/unsloth/i, /triton/i],
    name: 'Unsloth LLM Fine-Tuning',
    category: 'ai',
    skills: ['unsloth', 'freellmapi'],
  },
  {
    patterns: [/fastapi/i, /flask/i, /django/i],
    name: 'Python Web / API',
    category: 'backend',
    skills: ['systematic-debugging', 'tdd', 'codebase-design'],
  },
  {
    patterns: [/torch/i, /transformers/i, /huggingface/i, /langchain/i, /crewai/i, /autogen/i],
    name: 'AI Agent & LLM Framework',
    category: 'ai',
    skills: ['freellmapi', 'swarm', 'dispatching-parallel-agents', 'unsloth'],
  },

  // Monorepo & Build Tools
  {
    patterns: [/nx/i, /turborepo/i, /lerna/i],
    name: 'Nx / Turborepo Monorepo',
    category: 'infra',
    skills: ['nx-monorepo-architect', 'codebase-design'],
  },
]

// Baseline foundational skills included in any balanced stack
const FOUNDATIONAL_SKILLS = ['systematic-debugging', 'writing-plans', 'code-review']

export function analyzeProjectManifest(
  rawContent: string,
  filename?: string,
  allSkills: Skill[] = []
): RecommendationResult {
  const content = rawContent.trim()
  let manifestType: RecommendationResult['manifestType'] = 'generic'

  if (filename) {
    const fn = filename.toLowerCase()
    if (fn.endsWith('package.json')) manifestType = 'package.json'
    else if (fn.includes('gradle')) manifestType = 'gradle'
    else if (fn.endsWith('.txt') || fn.endsWith('.toml') || fn.includes('pip') || fn.includes('python'))
      manifestType = fn.endsWith('cargo.toml') ? 'cargo' : 'python'
  } else {
    // Deduce type from content signature
    if (content.startsWith('{') && content.includes('"dependencies"')) {
      manifestType = 'package.json'
    } else if (content.includes('plugins {') || content.includes('implementation(') || content.includes('android {')) {
      manifestType = 'gradle'
    } else if (content.includes('[project]') || content.includes('requirements') || content.includes('import ')) {
      manifestType = 'python'
    } else if (content.includes('[dependencies]')) {
      manifestType = 'cargo'
    }
  }

  const detectedTech = new Set<string>()
  const recommendedSkillIds = new Set<string>()

  // 1. Run detection rules
  DETECTION_RULES.forEach((rule) => {
    const matched = rule.patterns.some((pat) => pat.test(content))
    if (matched) {
      detectedTech.add(rule.name)
      rule.skills.forEach((s) => recommendedSkillIds.add(s))
    }
  })

  // 2. If nothing specific matched, include foundational skills
  if (recommendedSkillIds.size === 0) {
    detectedTech.add('Standard Engineering Codebase')
    FOUNDATIONAL_SKILLS.forEach((s) => recommendedSkillIds.add(s))
  } else {
    // Always ensure at least systematic-debugging is present in every engineering stack
    recommendedSkillIds.add('systematic-debugging')
  }

  // 3. Filter IDs to ensure they actually exist in the matrix catalog
  const validIds: string[] = []
  recommendedSkillIds.forEach((id) => {
    // If allSkills provided, check for existence
    if (allSkills.length > 0) {
      const match = allSkills.find((s) => s.id === id || s.scoped === id || s.uniqueId === id)
      if (match) validIds.push(match.id)
    } else {
      validIds.push(id)
    }
  })

  // Deduplicate and cap at 8 skills to prevent context bloat
  const finalSkills = Array.from(new Set(validIds.length > 0 ? validIds : Array.from(recommendedSkillIds))).slice(0, 8)
  const techList = Array.from(detectedTech)

  // 4. Token & savings calculations
  const tokenFootprint = finalSkills.length * 800
  const monolithicBaseline = 26400
  const savingsPercent = Math.max(0, Math.round(((monolithicBaseline - tokenFootprint) / monolithicBaseline) * 100))

  const summary = `Detected ${techList.join(', ')}. Auto-assembled ${finalSkills.length} tailored skills (~${tokenFootprint.toLocaleString()} tokens, ${savingsPercent}% context savings vs monolithic suite).`

  return {
    manifestType,
    detectedTech: techList,
    recommendedSkillIds: finalSkills,
    summary,
    tokenFootprint,
    savingsPercent,
  }
}

const COMMON_FRAMEWORK_ALIASES: Record<string, string> = {
  gstack: 'garrytan/gstack',
  superpowers: 'obra/superpowers',
  openhands: 'openhands/openhands',
  gsd: 'open-gsd/gsd-core',
  'gsd-core': 'open-gsd/gsd-core',
  anthropic: 'anthropics/skills',
  'anthropic-skills': 'anthropics/skills',
  nextjs: 'vercel/next.js',
  'next.js': 'vercel/next.js',
  tailwind: 'tailwindlabs/tailwindcss',
  prisma: 'prisma/prisma',
  fastapi: 'fastapi/fastapi',
  svelte: 'sveltejs/svelte',
  'agent-skills-spec': 'agentskills/agentskills',
}

export function parseGitHubRepo(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim().replace(/\/+$/, '')
  // Match framework aliases (e.g. "Gstack", "superpowers", "openhands")
  const alias = COMMON_FRAMEWORK_ALIASES[trimmed.toLowerCase()]
  if (alias) {
    const [owner, repo] = alias.split('/')
    return { owner, repo }
  }
  // Match https://github.com/owner/repo or github.com/owner/repo
  const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/)
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') }
  }
  // Match shorthand: owner/repo
  const shorthand = trimmed.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/)
  if (shorthand) {
    return { owner: shorthand[1], repo: shorthand[2].replace(/\.git$/, '') }
  }
  return null
}

export async function fetchGitHubManifest(repoInput: string): Promise<{ content: string; filename: string }> {
  const parsed = parseGitHubRepo(repoInput)
  if (!parsed) {
    throw new Error('Invalid GitHub repository format. Use: https://github.com/owner/repo or owner/repo')
  }

  const { owner, repo } = parsed
  const candidates = ['package.json', 'build.gradle.kts', 'build.gradle', 'pyproject.toml', 'requirements.txt', 'Cargo.toml']

  for (const filename of candidates) {
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${filename}`
      const res = await fetch(url)
      if (res.ok) {
        const content = await res.text()
        if (content && content.trim().length > 0) {
          return { content, filename }
        }
      }
    } catch {
      // try next candidate
    }
  }

  throw new Error(`No public manifest found in github.com/${owner}/${repo} (checked package.json, build.gradle.kts, pyproject.toml, requirements.txt, Cargo.toml). Paste manifest text below.`)
}

