import { create } from 'zustand'
import matrixData from '@/data/matrix.json'
import type {
  AssistantType,
  DocTemplate,
  Ecosystem,
  EntityScope,
  FrameworkHub,
  MatrixMeta,
  PillarType,
  Priority,
  SavedStackItem,
  Skill,
  SortOption,
  SystemPromptSuite,
} from '@/types'

const STACK_STORAGE_KEY = 'ai_skills_stack_v2'
const ASSISTANT_STORAGE_KEY = 'skilldock_assistant_v1'

function loadInitialAssistant(): AssistantType {
  try {
    const raw = localStorage.getItem(ASSISTANT_STORAGE_KEY)
    if (raw && ['antigravity', 'claude', 'codex', 'git'].includes(raw)) {
      return raw as AssistantType
    }
  } catch (e) {
    console.warn('Failed to parse assistant from localStorage:', e)
  }
  return 'antigravity'
}

// Safeguard 12: Schema migration & safe hydration from localStorage
function loadInitialStack(): SavedStackItem[] {
  try {
    const raw = localStorage.getItem(STACK_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => item && typeof item.id === 'string')
    }
  } catch (e) {
    console.warn('Failed to parse saved stack from localStorage:', e)
  }
  return []
}

function saveStackToStorage(stack: SavedStackItem[]) {
  try {
    localStorage.setItem(STACK_STORAGE_KEY, JSON.stringify(stack))
  } catch (e) {
    console.warn('Failed to save stack to localStorage:', e)
  }
}

// Read initial URL params
function getInitialUrlParams() {
  if (typeof window === 'undefined') {
    return {
      pillar: 'frameworks' as PillarType,
      scope: 'all' as EntityScope,
      q: '',
      priority: 'ALL' as Priority,
      cat: 'ALL',
      eco: 'all' as Ecosystem,
      repo: 'all',
      sort: 'default' as SortOption,
      skillId: null as string | null,
      frameworkRepo: null as string | null,
    }
  }
  const params = new URLSearchParams(window.location.search)
  const pil = params.get('pillar') as PillarType
  const initialSkillId = params.get('skill')
  const initialFrameworkRepo = params.get('framework')
  
  let pillar: PillarType = 'frameworks'
  if (initialSkillId) {
    pillar = 'skills'
  } else if (['frameworks', 'skills', 'marketplace', 'docs', 'prompts'].includes(pil)) {
    pillar = pil
  }

  const sc = params.get('scope') as EntityScope
  const scope: EntityScope = ['all', 'suites', 'standalone', 'atomic'].includes(sc) ? sc : 'all'

  const q = params.get('q') || ''
  const p = (params.get('priority') || 'ALL').toUpperCase()
  const priority = ['ALL', 'P0', 'P1', 'P2', 'P3'].includes(p) ? (p as Priority) : 'ALL'
  const cat = params.get('cat') || 'ALL'
  const eco = (params.get('eco') || 'all') as Ecosystem
  const repo = params.get('repo') || 'all'
  const sort = (params.get('sort') || 'default') as SortOption

  return { pillar, scope, q, priority, cat, eco, repo, sort, skillId: initialSkillId, frameworkRepo: initialFrameworkRepo }
}

// Safeguard 11: Debounced URL synchronization using replaceState
let urlSyncTimer: ReturnType<typeof setTimeout> | null = null
function syncUrlParams(state: {
  pillar: PillarType
  scope?: EntityScope
  searchQuery: string
  priority: Priority
  category: string
  ecosystem: Ecosystem
  repo: string
  sort: SortOption
}) {
  if (typeof window === 'undefined') return
  if (urlSyncTimer) clearTimeout(urlSyncTimer)

  urlSyncTimer = setTimeout(() => {
    const params = new URLSearchParams()
    if (state.pillar !== 'frameworks') params.set('pillar', state.pillar)
    if (state.scope && state.scope !== 'all') params.set('scope', state.scope)
    if (state.searchQuery.trim()) params.set('q', state.searchQuery.trim())
    if (state.priority !== 'ALL') params.set('priority', state.priority)
    if (state.category !== 'ALL') params.set('cat', state.category)
    if (state.ecosystem !== 'all') params.set('eco', state.ecosystem)
    if (state.repo !== 'all') params.set('repo', state.repo)
    if (state.sort !== 'default') params.set('sort', state.sort)

    const newQuery = params.toString() ? `?${params.toString()}` : ''
    const newUrl = `${window.location.pathname}${newQuery}${window.location.hash}`
    window.history.replaceState(null, '', newUrl)
  }, 150)
}

interface SkillStoreState {
  // Data
  skills: Skill[]
  frameworks: FrameworkHub[]
  docs: DocTemplate[]
  prompts: SystemPromptSuite[]
  meta: MatrixMeta

  // Pillar & Assistant
  activePillar: PillarType
  activeAssistant: AssistantType

  // Entity Scope Hierarchy (All Packages | Suites Only | Standalone | All Atomic Skills)
  entityScope: EntityScope

  // Filters (UI State)
  searchQuery: string
  selectedPriority: Priority
  selectedCategory: string
  selectedEcosystem: Ecosystem
  selectedRepo: string
  selectedSort: SortOption

  // Stack Builder
  stack: SavedStackItem[]

  // View mode & Command Palette
  viewMode: 'grid' | 'rows'
  isCommandPaletteOpen: boolean

  // Modals & Drawers
  inspectSkill: Skill | null
  inspectFramework: FrameworkHub | null
  isStackModalOpen: boolean
  isPriorityGuideOpen: boolean

  // Actions (ViewModel events)
  setPillar: (pillar: PillarType) => void
  setAssistant: (assistant: AssistantType) => void
  setEntityScope: (scope: EntityScope) => void
  setViewMode: (mode: 'grid' | 'rows') => void
  setCommandPaletteOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setPriority: (priority: Priority) => void
  setCategory: (category: string) => void
  setEcosystem: (ecosystem: Ecosystem) => void
  setRepo: (repo: string) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void
  goHome: () => void

  toggleStack: (skill: Skill) => void
  addStarterPackToStack: (skillIds: string[]) => void
  addFrameworkToStack: (framework: FrameworkHub) => void
  addSelectedSkillsToStack: (skills: { id: string; uniqueId: string; name: string; priority: 'P0' | 'P1' | 'P2' | 'P3'; scoped: string; cli: string; repo?: string | null; officialCli?: string }[]) => void
  removeFromStack: (skillId: string) => void
  clearStack: () => void

  openInspect: (skill: Skill) => void
  closeInspect: () => void
  openFrameworkInspect: (framework: FrameworkHub) => void
  closeFrameworkInspect: () => void
  setStackModalOpen: (open: boolean) => void
  setPriorityGuideOpen: (open: boolean) => void
}

const initialUrl = getInitialUrlParams()
const loadedSkills = ((matrixData as any).skills || []) as Skill[]
const loadedFrameworks = ((matrixData as any).frameworks || []) as FrameworkHub[]
const initialInspectSkill = initialUrl.skillId
  ? loadedSkills.find((s) => s.id === initialUrl.skillId || s.scoped === initialUrl.skillId) || null
  : null
const initialInspectFramework = initialUrl.frameworkRepo
  ? loadedFrameworks.find((f) => f.repo === initialUrl.frameworkRepo || f.repoName.toLowerCase() === initialUrl.frameworkRepo?.toLowerCase()) || null
  : null

export const useSkillStore = create<SkillStoreState>((set, get) => ({
  skills: loadedSkills,
  frameworks: loadedFrameworks,
  docs: ((matrixData as any).docs || []) as DocTemplate[],
  prompts: ((matrixData as any).prompts || []) as SystemPromptSuite[],
  meta: ((matrixData as any).meta || {}) as MatrixMeta,

  activePillar: initialUrl.pillar,
  activeAssistant: loadInitialAssistant(),
  entityScope: initialUrl.scope,

  searchQuery: initialUrl.q,
  selectedPriority: initialUrl.priority,
  selectedCategory: initialUrl.cat,
  selectedEcosystem: initialUrl.eco,
  selectedRepo: initialUrl.repo,
  selectedSort: initialUrl.sort,

  stack: loadInitialStack(),

  viewMode: 'grid',
  isCommandPaletteOpen: false,

  inspectSkill: initialInspectSkill,
  inspectFramework: initialInspectFramework,
  isStackModalOpen: false,
  isPriorityGuideOpen: false,

  setPillar: (activePillar) => {
    set({ activePillar })
    const { entityScope, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setAssistant: (activeAssistant) => {
    set({ activeAssistant })
    try {
      localStorage.setItem(ASSISTANT_STORAGE_KEY, activeAssistant)
    } catch (e) {
      console.warn('Failed to persist assistant:', e)
    }
  },

  setEntityScope: (entityScope) => {
    set({ entityScope })
    const { activePillar, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setViewMode: (viewMode) => set({ viewMode }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),

  setSearchQuery: (searchQuery) => {
    set({ searchQuery })
    const { activePillar, entityScope, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setPriority: (selectedPriority) => {
    set({ selectedPriority })
    const { activePillar, entityScope, searchQuery, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setCategory: (selectedCategory) => {
    const selectedEcosystem = selectedCategory === 'ALL' ? get().selectedEcosystem : 'all'
    set({ selectedCategory, selectedEcosystem })
    const { activePillar, entityScope, searchQuery, selectedPriority, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setEcosystem: (selectedEcosystem) => {
    set({ selectedEcosystem, selectedCategory: 'ALL' })
    const { activePillar, entityScope, searchQuery, selectedPriority, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: 'ALL', ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setRepo: (selectedRepo) => {
    set({ selectedRepo })
    const { activePillar, entityScope, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setSort: (selectedSort) => {
    set({ selectedSort })
    const { activePillar, entityScope, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo } = get()
    syncUrlParams({ pillar: activePillar, scope: entityScope, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  resetFilters: () => {
    set({
      entityScope: 'all',
      searchQuery: '',
      selectedPriority: 'ALL',
      selectedCategory: 'ALL',
      selectedEcosystem: 'all',
      selectedRepo: 'all',
      selectedSort: 'default',
    })
    const { activePillar } = get()
    syncUrlParams({ pillar: activePillar, scope: 'all', searchQuery: '', priority: 'ALL', category: 'ALL', ecosystem: 'all', repo: 'all', sort: 'default' })
  },

  goHome: () => {
    set({
      activePillar: 'frameworks',
      entityScope: 'all',
      searchQuery: '',
      selectedPriority: 'ALL',
      selectedCategory: 'ALL',
      selectedEcosystem: 'all',
      selectedRepo: 'all',
      selectedSort: 'default',
      inspectSkill: null,
      inspectFramework: null,
      isStackModalOpen: false,
      isPriorityGuideOpen: false,
      isCommandPaletteOpen: false,
    })
    syncUrlParams({
      pillar: 'frameworks',
      scope: 'all',
      searchQuery: '',
      priority: 'ALL',
      category: 'ALL',
      ecosystem: 'all',
      repo: 'all',
      sort: 'default',
    })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },

  toggleStack: (skill) => {
    const { stack } = get()
    const exists = stack.some((s) => s.id === skill.id)
    const officialCli = skill.repo ? `npx skills add ${skill.repo} --skill ${skill.id}` : skill.cli
    const newStack = exists
      ? stack.filter((s) => s.id !== skill.id)
      : [
          ...stack,
          {
            id: skill.id,
            uniqueId: skill.uniqueId,
            name: skill.name,
            priority: skill.priority,
            scoped: skill.scoped,
            cli: skill.cli,
            repo: skill.repo,
            officialCli,
          },
        ]
    set({ stack: newStack })
    saveStackToStorage(newStack)
  },

  addStarterPackToStack: (skillIds: string[]) => {
    const { stack, skills } = get()
    const toAdd: SavedStackItem[] = []
    for (const id of skillIds) {
      if (!stack.some((s) => s.id === id || s.uniqueId === id)) {
        const match = skills.find((s) => s.id === id || s.uniqueId === id)
        if (match) {
          toAdd.push({
            id: match.id,
            uniqueId: match.uniqueId,
            name: match.name,
            priority: match.priority,
            scoped: match.scoped,
            cli: match.cli,
            repo: match.repo,
            officialCli: match.repo ? `npx skills add ${match.repo} --skill ${match.id}` : match.cli,
          })
        }
      }
    }
    if (toAdd.length > 0) {
      const newStack = [...stack, ...toAdd]
      set({ stack: newStack })
      saveStackToStorage(newStack)
    }
  },

  addFrameworkToStack: (framework: FrameworkHub) => {
    const { stack } = get()
    const toAdd: SavedStackItem[] = []
    for (const skill of framework.skills) {
      if (!stack.some((s) => s.id === skill.id)) {
        toAdd.push({
          id: skill.id,
          uniqueId: `${framework.categoryId}:${skill.id}`,
          name: skill.name,
          priority: skill.priority,
          scoped: skill.scoped,
          cli: skill.cli,
          repo: framework.repo,
          officialCli: `npx skills add ${framework.repo} --skill ${skill.id}`,
        })
      }
    }
    if (toAdd.length > 0) {
      const newStack = [...stack, ...toAdd]
      set({ stack: newStack })
      saveStackToStorage(newStack)
    }
  },

  addSelectedSkillsToStack: (skillsToAdd) => {
    const { stack } = get()
    const toAdd: SavedStackItem[] = []
    for (const item of skillsToAdd) {
      if (!stack.some((s) => s.id === item.id)) {
        toAdd.push({
          id: item.id,
          uniqueId: item.uniqueId,
          name: item.name,
          priority: item.priority,
          scoped: item.scoped,
          cli: item.cli,
          repo: item.repo,
          officialCli: item.officialCli || (item.repo ? `npx skills add ${item.repo} --skill ${item.id}` : item.cli),
        })
      }
    }
    if (toAdd.length > 0) {
      const newStack = [...stack, ...toAdd]
      set({ stack: newStack })
      saveStackToStorage(newStack)
    }
  },

  removeFromStack: (skillId) => {
    const { stack } = get()
    const newStack = stack.filter((s) => s.id !== skillId)
    set({ stack: newStack })
    saveStackToStorage(newStack)
  },

  clearStack: () => {
    set({ stack: [] })
    saveStackToStorage([])
  },

  openInspect: (skill) => {
    set({ inspectSkill: skill })
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.set('skill', skill.id)
      const newQuery = params.toString() ? `?${params.toString()}` : ''
      window.history.replaceState(null, '', `${window.location.pathname}${newQuery}${window.location.hash}`)
    }
  },
  closeInspect: () => {
    set({ inspectSkill: null })
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.delete('skill')
      const newQuery = params.toString() ? `?${params.toString()}` : ''
      window.history.replaceState(null, '', `${window.location.pathname}${newQuery}${window.location.hash}`)
    }
  },

  openFrameworkInspect: (inspectFramework) => {
    set({ inspectFramework })
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.set('framework', inspectFramework.repo)
      const newQuery = params.toString() ? `?${params.toString()}` : ''
      window.history.replaceState(null, '', `${window.location.pathname}${newQuery}${window.location.hash}`)
    }
  },
  closeFrameworkInspect: () => {
    set({ inspectFramework: null })
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.delete('framework')
      const newQuery = params.toString() ? `?${params.toString()}` : ''
      window.history.replaceState(null, '', `${window.location.pathname}${newQuery}${window.location.hash}`)
    }
  },

  setStackModalOpen: (isStackModalOpen) => set({ isStackModalOpen }),
  setPriorityGuideOpen: (isPriorityGuideOpen) => set({ isPriorityGuideOpen }),
}))