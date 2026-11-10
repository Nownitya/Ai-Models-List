import { create } from 'zustand'
import matrixData from '@/data/matrix.json'
import type {
  AssistantType,
  DocTemplate,
  Ecosystem,
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
      q: '',
      priority: 'ALL' as Priority,
      cat: 'ALL',
      eco: 'all' as Ecosystem,
      repo: 'all',
      sort: 'default' as SortOption,
    }
  }
  const params = new URLSearchParams(window.location.search)
  const pil = params.get('pillar') as PillarType
  const pillar = ['frameworks', 'skills', 'docs', 'prompts'].includes(pil) ? pil : 'frameworks'
  const q = params.get('q') || ''
  const p = (params.get('priority') || 'ALL').toUpperCase()
  const priority = ['ALL', 'P0', 'P1', 'P2', 'P3'].includes(p) ? (p as Priority) : 'ALL'
  const cat = params.get('cat') || 'ALL'
  const eco = (params.get('eco') || 'all') as Ecosystem
  const repo = params.get('repo') || 'all'
  const sort = (params.get('sort') || 'default') as SortOption

  return { pillar, q, priority, cat, eco, repo, sort }
}

// Safeguard 11: Debounced URL synchronization using replaceState
let urlSyncTimer: ReturnType<typeof setTimeout> | null = null
function syncUrlParams(state: {
  pillar: PillarType
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
  promptModalSkill: Skill | null
  isStackModalOpen: boolean
  isPriorityGuideOpen: boolean

  // Actions (ViewModel events)
  setPillar: (pillar: PillarType) => void
  setAssistant: (assistant: AssistantType) => void
  setViewMode: (mode: 'grid' | 'rows') => void
  setCommandPaletteOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setPriority: (priority: Priority) => void
  setCategory: (category: string) => void
  setEcosystem: (ecosystem: Ecosystem) => void
  setRepo: (repo: string) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void

  toggleStack: (skill: Skill) => void
  addStarterPackToStack: (skillIds: string[]) => void
  addFrameworkToStack: (framework: FrameworkHub) => void
  removeFromStack: (skillId: string) => void
  clearStack: () => void

  openInspect: (skill: Skill) => void
  closeInspect: () => void
  openFrameworkInspect: (framework: FrameworkHub) => void
  closeFrameworkInspect: () => void
  openPromptModal: (skill: Skill) => void
  closePromptModal: () => void
  setStackModalOpen: (open: boolean) => void
  setPriorityGuideOpen: (open: boolean) => void
}

const initialUrl = getInitialUrlParams()

export const useSkillStore = create<SkillStoreState>((set, get) => ({
  skills: ((matrixData as any).skills || []) as Skill[],
  frameworks: ((matrixData as any).frameworks || []) as FrameworkHub[],
  docs: ((matrixData as any).docs || []) as DocTemplate[],
  prompts: ((matrixData as any).prompts || []) as SystemPromptSuite[],
  meta: ((matrixData as any).meta || {}) as MatrixMeta,

  activePillar: initialUrl.pillar,
  activeAssistant: loadInitialAssistant(),

  searchQuery: initialUrl.q,
  selectedPriority: initialUrl.priority,
  selectedCategory: initialUrl.cat,
  selectedEcosystem: initialUrl.eco,
  selectedRepo: initialUrl.repo,
  selectedSort: initialUrl.sort,

  stack: loadInitialStack(),

  viewMode: 'grid',
  isCommandPaletteOpen: false,

  inspectSkill: null,
  inspectFramework: null,
  promptModalSkill: null,
  isStackModalOpen: false,
  isPriorityGuideOpen: false,

  setPillar: (activePillar) => {
    set({ activePillar })
    const { searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setAssistant: (activeAssistant) => {
    set({ activeAssistant })
    try {
      localStorage.setItem(ASSISTANT_STORAGE_KEY, activeAssistant)
    } catch (e) {
      console.warn('Failed to persist assistant:', e)
    }
  },

  setViewMode: (viewMode) => set({ viewMode }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),

  setSearchQuery: (searchQuery) => {
    set({ searchQuery })
    const { activePillar, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setPriority: (selectedPriority) => {
    set({ selectedPriority })
    const { activePillar, searchQuery, selectedCategory, selectedEcosystem, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setCategory: (selectedCategory) => {
    const selectedEcosystem = selectedCategory === 'ALL' ? get().selectedEcosystem : 'all'
    set({ selectedCategory, selectedEcosystem })
    const { activePillar, searchQuery, selectedPriority, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setEcosystem: (selectedEcosystem) => {
    set({ selectedEcosystem, selectedCategory: 'ALL' })
    const { activePillar, searchQuery, selectedPriority, selectedRepo, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: 'ALL', ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setRepo: (selectedRepo) => {
    set({ selectedRepo })
    const { activePillar, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedSort } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  setSort: (selectedSort) => {
    set({ selectedSort })
    const { activePillar, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedRepo } = get()
    syncUrlParams({ pillar: activePillar, searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, repo: selectedRepo, sort: selectedSort })
  },

  resetFilters: () => {
    set({
      searchQuery: '',
      selectedPriority: 'ALL',
      selectedCategory: 'ALL',
      selectedEcosystem: 'all',
      selectedRepo: 'all',
      selectedSort: 'default',
    })
    const { activePillar } = get()
    syncUrlParams({ pillar: activePillar, searchQuery: '', priority: 'ALL', category: 'ALL', ecosystem: 'all', repo: 'all', sort: 'default' })
  },

  toggleStack: (skill) => {
    const { stack } = get()
    const exists = stack.some((s) => s.id === skill.id)
    const newStack = exists
      ? stack.filter((s) => s.id !== skill.id)
      : [...stack, { id: skill.id, uniqueId: skill.uniqueId, name: skill.name, priority: skill.priority, scoped: skill.scoped, cli: skill.cli }]
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

  openInspect: (skill) => set({ inspectSkill: skill }),
  closeInspect: () => set({ inspectSkill: null }),

  openFrameworkInspect: (inspectFramework) => set({ inspectFramework }),
  closeFrameworkInspect: () => set({ inspectFramework: null }),

  openPromptModal: (skill) => set({ promptModalSkill: skill }),
  closePromptModal: () => set({ promptModalSkill: null }),

  setStackModalOpen: (isStackModalOpen) => set({ isStackModalOpen }),
  setPriorityGuideOpen: (isPriorityGuideOpen) => set({ isPriorityGuideOpen }),
}))