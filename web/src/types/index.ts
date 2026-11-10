export type Priority = 'ALL' | 'P0' | 'P1' | 'P2' | 'P3'

export type PillarType = 'frameworks' | 'skills' | 'docs' | 'prompts'

export type AssistantType = 'antigravity' | 'claude' | 'codex' | 'git'

export type Ecosystem =
  | 'all'
  | 'gsd'
  | 'superpowers'
  | 'gstack'
  | 'ecc'
  | 'ralph'
  | 'impeccable'
  | 'android'
  | 'kmp'
  | 'mattpocock'
  | 'agents'
  | 'obsidian'
  | 'quality'

export type SortOption =
  | 'default'
  | 'stars-desc'
  | 'stars-asc'
  | 'name-asc'
  | 'priority-p0-first'

export interface Skill {
  id: string
  uniqueId: string
  name: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  categoryId: string
  categoryLabel: string
  description: string
  scoped: string
  cli: string
  repo: string | null
  repoName?: string
  stars: number
  ecosystems: string[]
}

export interface CategoryMeta {
  id: string
  label: string
  count: number
}

export interface RepositoryMeta {
  repo: string
  repoName: string
  count: number
  stars: number
}

export interface InstallRecipes {
  antigravity: string
  claude: string
  codex: string
  git: string
  cli: string
}

export interface FrameworkMemberSkill {
  id: string
  name: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  scoped: string
  cli: string
  description: string
}

export interface FrameworkHub {
  id: string
  repo: string
  repoName: string
  author: string
  stars: number
  starsFormatted: string
  description: string
  skillsCount: number
  categoryId: string
  categoryLabel: string
  officialUrl: string
  version?: string
  license?: string
  installRecipes: InstallRecipes
  skills: FrameworkMemberSkill[]
}

export interface DocTemplate {
  id: string
  name: string
  layer: string
  tier: 'foundation' | 'strategy' | 'product' | 'architecture' | 'governance' | 'quality'
  priority: 'P0' | 'P1' | 'P2'
  purpose: string
  scaffoldCmd: string
}

export interface SystemPromptSection {
  name: string
  content: string
}

export interface SystemPromptSuite {
  id: string
  title: string
  filename: string
  description: string
  promptsCount: number
  sections: SystemPromptSection[]
}

export interface MatrixMeta {
  totalSkills: number
  totalFrameworks: number
  totalDocs: number
  totalPrompts: number
  totalStars: number
  categories: CategoryMeta[]
  repositories: RepositoryMeta[]
  p0Count: number
  p1Count: number
  p2Count: number
  p3Count: number
  generatedAt: string
}

export interface MatrixPayload {
  meta: MatrixMeta
  frameworks: FrameworkHub[]
  skills: Skill[]
  docs: DocTemplate[]
  prompts: SystemPromptSuite[]
}

export interface SavedStackItem {
  id: string
  uniqueId: string
  name: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  scoped: string
  cli: string
}
