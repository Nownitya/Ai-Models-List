import { create } from 'zustand'
import matrixData from '@/data/matrix.json'
import type { Ecosystem, MatrixMeta, Priority, SavedStackItem, Skill, SortOption } from '@/types'

const STACK_STORAGE_KEY = 'ai_skills_stack_v2'

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
    return { q: '', priority: 'ALL' as Priority, cat: 'ALL', eco: 'all' as Ecosystem, sort: 'default' as SortOption }
  }
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') || ''
  const p = (params.get('priority') || 'ALL').toUpperCase()
  const priority = ['ALL', 'P0', 'P1', 'P2', 'P3'].includes(p) ? (p as Priority) : 'ALL'
  const cat = params.get('cat') || 'ALL'
  const eco = (params.get('eco') || 'all') as Ecosystem
  const sort = (params.get('sort') || 'default') as SortOption

  return { q, priority, cat, eco, sort }
}

// Safeguard 11: Debounced URL synchronization using replaceState
let urlSyncTimer: ReturnType<typeof setTimeout> | null = null
function syncUrlParams(state: { searchQuery: string; priority: Priority; category: string; ecosystem: Ecosystem; sort: SortOption }) {
  if (typeof window === 'undefined') return
  if (urlSyncTimer) clearTimeout(urlSyncTimer)

  urlSyncTimer = setTimeout(() => {
    const params = new URLSearchParams()
    if (state.searchQuery.trim()) params.set('q', state.searchQuery.trim())
    if (state.priority !== 'ALL') params.set('priority', state.priority)
    if (state.category !== 'ALL') params.set('cat', state.category)
    if (state.ecosystem !== 'all') params.set('eco', state.ecosystem)
    if (state.sort !== 'default') params.set('sort', state.sort)

    const newQuery = params.toString() ? `?${params.toString()}` : ''
    const newUrl = `${window.location.pathname}${newQuery}${window.location.hash}`
    window.history.replaceState(null, '', newUrl)
  }, 150)
}

interface SkillStoreState {
  // Data
  skills: Skill[]
  meta: MatrixMeta

  // Filters (UI State)
  searchQuery: string
  selectedPriority: Priority
  selectedCategory: string
  selectedEcosystem: Ecosystem
  selectedSort: SortOption

  // Stack Builder
  stack: SavedStackItem[]

  // Modals & Drawers
  inspectSkill: Skill | null
  promptModalSkill: Skill | null
  isStackModalOpen: boolean
  isPriorityGuideOpen: boolean

  // Actions (ViewModel events)
  setSearchQuery: (query: string) => void
  setPriority: (priority: Priority) => void
  setCategory: (category: string) => void
  setEcosystem: (ecosystem: Ecosystem) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void

  toggleStack: (skill: Skill) => void
  removeFromStack: (skillId: string) => void
  clearStack: () => void

  openInspect: (skill: Skill) => void
  closeInspect: () => void
  openPromptModal: (skill: Skill) => void
  closePromptModal: () => void
  setStackModalOpen: (open: boolean) => void
  setPriorityGuideOpen: (open: boolean) => void
}

const initialUrl = getInitialUrlParams()

export const useSkillStore = create<SkillStoreState>((set, get) => ({
  skills: matrixData.skills as Skill[],
  meta: matrixData.meta as MatrixMeta,

  searchQuery: initialUrl.q,
  selectedPriority: initialUrl.priority,
  selectedCategory: initialUrl.cat,
  selectedEcosystem: initialUrl.eco,
  selectedSort: initialUrl.sort,

  stack: loadInitialStack(),

  inspectSkill: null,
  promptModalSkill: null,
  isStackModalOpen: false,
  isPriorityGuideOpen: false,

  setSearchQuery: (searchQuery) => {
    set({ searchQuery })
    const { selectedPriority, selectedCategory, selectedEcosystem, selectedSort } = get()
    syncUrlParams({ searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, sort: selectedSort })
  },

  setPriority: (selectedPriority) => {
    set({ selectedPriority })
    const { searchQuery, selectedCategory, selectedEcosystem, selectedSort } = get()
    syncUrlParams({ searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, sort: selectedSort })
  },

  setCategory: (selectedCategory) => {
    // If selecting a category, reset ecosystem preset to all
    const selectedEcosystem = selectedCategory === 'ALL' ? get().selectedEcosystem : 'all'
    set({ selectedCategory, selectedEcosystem })
    const { searchQuery, selectedPriority, selectedSort } = get()
    syncUrlParams({ searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, sort: selectedSort })
  },

  setEcosystem: (selectedEcosystem) => {
    // If selecting an ecosystem preset, reset category filter to ALL
    set({ selectedEcosystem, selectedCategory: 'ALL' })
    const { searchQuery, selectedPriority, selectedSort } = get()
    syncUrlParams({ searchQuery, priority: selectedPriority, category: 'ALL', ecosystem: selectedEcosystem, sort: selectedSort })
  },

  setSort: (selectedSort) => {
    set({ selectedSort })
    const { searchQuery, selectedPriority, selectedCategory, selectedEcosystem } = get()
    syncUrlParams({ searchQuery, priority: selectedPriority, category: selectedCategory, ecosystem: selectedEcosystem, sort: selectedSort })
  },

  resetFilters: () => {
    set({
      searchQuery: '',
      selectedPriority: 'ALL',
      selectedCategory: 'ALL',
      selectedEcosystem: 'all',
      selectedSort: 'default',
    })
    syncUrlParams({ searchQuery: '', priority: 'ALL', category: 'ALL', ecosystem: 'all', sort: 'default' })
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

  openInspect: (inspectSkill) => set({ inspectSkill }),
  closeInspect: () => set({ inspectSkill: null }),

  openPromptModal: (promptModalSkill) => set({ promptModalSkill }),
  closePromptModal: () => set({ promptModalSkill: null }),

  setStackModalOpen: (isStackModalOpen) => set({ isStackModalOpen }),
  setPriorityGuideOpen: (isPriorityGuideOpen) => set({ isPriorityGuideOpen }),
}))
