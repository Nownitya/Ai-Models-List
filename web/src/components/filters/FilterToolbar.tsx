import React, { useRef, useEffect } from 'react'
import {
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  List,
  GitBranch,
  Boxes,
  Layers,
  Zap,
  Terminal,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Ecosystem, Priority, SortOption } from '@/types'

const ECOSYSTEMS: { id: Ecosystem; label: string }[] = [
  { id: 'all', label: 'All Stacks' },
  { id: 'gsd', label: 'GSD Core' },
  { id: 'superpowers', label: 'Superpowers' },
  { id: 'gstack', label: 'gstack' },
  { id: 'ecc', label: 'ECC' },
  { id: 'ralph', label: 'Ralph Loop' },
  { id: 'impeccable', label: 'Impeccable' },
  { id: 'mattpocock', label: 'Matt Pocock' },
  { id: 'android', label: 'Android Mobile' },
  { id: 'kmp', label: 'Kotlin KMP' },
  { id: 'obsidian', label: 'Obsidian Brain' },
  { id: 'agents', label: 'Autonomous Agents' },
  { id: 'quality', label: 'Quality & Review' },
]

export const FilterToolbar: React.FC = () => {
  const entityScope = useSkillStore((s) => s.entityScope)
  const setEntityScope = useSkillStore((s) => s.setEntityScope)
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedPriority = useSkillStore((s) => s.selectedPriority)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedRepo = useSkillStore((s) => s.selectedRepo)
  const selectedSort = useSkillStore((s) => s.selectedSort)
  const viewMode = useSkillStore((s) => s.viewMode)
  const meta = useSkillStore((s) => s.meta)
  const frameworks = useSkillStore((s) => s.frameworks)
  const skills = useSkillStore((s) => s.skills)

  const totalPackagesCount = meta.totalFrameworks || frameworks.length || 112
  const suitesCount = frameworks.filter((f) => f.skillsCount > 1).length || 24
  const standaloneCount = frameworks.filter((f) => f.skillsCount === 1).length || 88
  const atomicSkillsCount = meta.totalSkills || skills.length || 325

  const setSearchQuery = useSkillStore((s) => s.setSearchQuery)
  const setPriority = useSkillStore((s) => s.setPriority)
  const setCategory = useSkillStore((s) => s.setCategory)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)
  const setRepo = useSkillStore((s) => s.setRepo)
  const setSort = useSkillStore((s) => s.setSort)
  const setViewMode = useSkillStore((s) => s.setViewMode)
  const resetFilters = useSkillStore((s) => s.resetFilters)

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut '/' to focus search, 'Esc' to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : ''
      const isInput = ['input', 'textarea', 'select'].includes(activeTag)

      if (e.key === '/' && !isInput) {
        e.preventDefault()
        searchInputRef.current?.focus()
        searchInputRef.current?.select()
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        if (searchQuery) setSearchQuery('')
        else searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery, setSearchQuery])

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedPriority !== 'ALL' ||
    selectedCategory !== 'ALL' ||
    selectedEcosystem !== 'all' ||
    selectedRepo !== 'all' ||
    selectedSort !== 'default'

  const activeRepoMeta = meta.repositories?.find((r) => r.repo === selectedRepo)

  return (
    <div className="w-full space-y-3 max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-4">
      {/* 1. Entity Scope Hierarchy (Parent Suites vs Standalone vs All Atomic) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-[#27272a] bg-[#111114] p-1">
          <button
            onClick={() => setEntityScope('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              entityScope === 'all'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>All Packages</span>
            <span className={`text-[10px] font-mono px-1 rounded ${entityScope === 'all' ? 'bg-zinc-300 text-zinc-900 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
              {totalPackagesCount}
            </span>
          </button>

          <button
            onClick={() => setEntityScope('suites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              entityScope === 'suites'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Suites Only</span>
            <span className={`text-[10px] font-mono px-1 rounded ${entityScope === 'suites' ? 'bg-zinc-300 text-zinc-900 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
              {suitesCount}
            </span>
          </button>

          <button
            onClick={() => setEntityScope('standalone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              entityScope === 'standalone'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Standalone</span>
            <span className={`text-[10px] font-mono px-1 rounded ${entityScope === 'standalone' ? 'bg-zinc-300 text-zinc-900 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
              {standaloneCount}
            </span>
          </button>

          <button
            onClick={() => setEntityScope('atomic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              entityScope === 'atomic'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>All {atomicSkillsCount} Atomic Skills</span>
          </button>
        </div>

        {/* Informative micro-copy */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Suites bundle sub-skills • Standalone are 1-skill tools • Cherry-pick in drawer</span>
        </div>
      </div>

      {/* Ecosystem & Upstream Framework Preset Navigation (Border-Collapsed Strip) */}
      <div className="flex items-center overflow-x-auto no-scrollbar py-1">
        <div className="inline-flex rounded-md shadow-2xs border border-[#27272a] bg-[#111114] p-0.5">
          {ECOSYSTEMS.map((eco) => {
            const isActive = selectedEcosystem === eco.id
            return (
              <button
                key={eco.id}
                onClick={() => {
                  setEcosystem(eco.id)
                  if (selectedRepo !== 'all') setRepo('all')
                }}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 font-bold shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
                }`}
              >
                {eco.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Repo Filter Indicator Banner if repo is selected */}
      {selectedRepo !== 'all' && activeRepoMeta && (
        <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-[#18181b] border border-[#27272a] text-xs">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300">
              Filtered repository: <strong className="text-white">{activeRepoMeta.repoName}</strong> ({activeRepoMeta.repo})
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              {activeRepoMeta.count} skills
            </span>
          </div>
          <button
            onClick={() => setRepo('all')}
            className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white bg-[#111114] px-2 py-0.5 rounded border border-[#27272a] hover:border-zinc-500 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Main Filter Bar */}
      <div className="bg-[#111114] border border-[#27272a] p-2.5 rounded-xl flex flex-col md:flex-row items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, slash commands (/camerax), tags, models, repos... (Press '/' to focus)"
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1 w-full md:w-auto shrink-0 overflow-x-auto">
          {(['ALL', 'P0', 'P1', 'P2', 'P3'] as Priority[]).map((p) => {
            const isActive = selectedPriority === p
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                    : 'bg-[#18181b] hover:bg-[#27272a] text-zinc-400 hover:text-zinc-200 border-[#27272a]'
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        {/* Upstream Repository Selector Dropdown */}
        <div className="w-full md:w-auto shrink-0">
          <select
            value={selectedRepo}
            onChange={(e) => setRepo(e.target.value)}
            className="w-full md:w-48 px-2.5 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 cursor-pointer font-medium"
            title="Filter by Upstream GitHub Repository"
          >
            <option value="all">All Repositories ({meta.repositories?.length || 65})</option>
            {meta.repositories?.map((r) => (
              <option key={r.repo} value={r.repo}>
                {r.repoName} ({r.count}) {r.stars > 0 ? `⭐ ${(r.stars / 1000).toFixed(0)}k` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div className="w-full md:w-auto shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 px-2.5 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 cursor-pointer"
          >
            <option value="ALL">All Categories ({meta.totalSkills})</option>
            {meta.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label} ({cat.count})
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="w-full md:w-auto shrink-0">
          <select
            value={selectedSort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full md:w-40 px-2.5 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-200 focus:outline-none focus:border-zinc-400 cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="stars-desc">Most Stars ⭐</option>
            <option value="stars-asc">Least Stars</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="priority-p0-first">Priority (P0 First)</option>
          </select>
        </div>

        {/* Density Switcher: Grid vs Rows */}
        <div className="flex items-center rounded-lg bg-[#09090b] border border-[#27272a] p-0.5 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid View (Cards)"
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('rows')}
            title="Rows View (Dense List)"
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'rows'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#18181b] hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-[#27272a]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  )
}
