export type Priority = 'ALL' | 'P0' | 'P1' | 'P2' | 'P3'

export type Ecosystem =
  | 'all'
  | 'android'
  | 'kmp'
  | 'gsd'
  | 'superpowers'
  | 'agents'
  | 'mattpocock'
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
  stars: number
  ecosystems: string[]
}

export interface CategoryMeta {
  id: string
  label: string
  count: number
}

export interface MatrixMeta {
  totalSkills: number
  totalStars: number
  categories: CategoryMeta[]
  p0Count: number
  p1Count: number
  p2Count: number
  p3Count: number
  generatedAt: string
}

export interface MatrixPayload {
  meta: MatrixMeta
  skills: Skill[]
}

export interface SavedStackItem {
  id: string
  uniqueId: string
  name: string
  priority: string
  scoped: string
  cli: string
}
