import React, { useRef, useEffect } from 'react'
import {
  Search,
  X,
  RotateCcw,
  Smartphone,
  Cpu,
  ShieldCheck,
  Zap,
  Bot,
  BookOpen,
  Diamond,
  Sparkles,
  LayoutGrid,
  List,
  GitBranch,
  Layers,
  Palette,
  Terminal,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Ecosystem, Priority, SortOption } from '@/types'

const ECOSYSTEMS: { id: Ecosystem; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Stacks', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
  { id: 'gsd', label: 'GSD Core', icon: <Zap className="w-4 h-4 text-amber-400" /> },
  { id: 'superpowers', label: 'Superpowers', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
  { id: 'gstack', label: 'gstack', icon: <Layers className="w-4 h-4 text-blue-400" /> },
  { id: 'ecc', label: 'ECC', icon: <Terminal className="w-4 h-4 text-purple-400" /> },
  { id: 'ralph', label: 'Ralph Loop', icon: <RotateCcw className="w-4 h-4 text-orange-400" /> },
  { id: 'impeccable', label: 'Impeccable', icon: <Palette className="w-4 h-4 text-pink-400" /> },
  { id: 'mattpocock', label: 'Matt Pocock', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
  { id: 'android', label: 'Android Mobile', icon: <Smartphone className="w-4 h-4 text-teal-400" /> },
  { id: 'kmp', label: 'Kotlin KMP', icon: <Cpu className="w-4 h-4 text-violet-400" /> },
  { id: 'obsidian', label: 'Obsidian Brain', icon: <Diamond className="w-4 h-4 text-cyan-300" /> },
  { id: 'agents', label: 'Autonomous Agents', icon: <Bot className="w-4 h-4 text-yellow-400" /> },
  { id: 'quality', label: 'Quality & Review', icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
]

export const FilterToolbar: React.FC = () => {
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedPriority = useSkillStore((s) => s.selectedPriority)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedRepo = useSkillStore((s) => s.selectedRepo)
  const selectedSort = useSkillStore((s) => s.selectedSort)
  const viewMode = useSkillStore((s) => s.viewMode)
  const meta = useSkillStore((s) => s.meta)

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
    <div className="w-full space-y-3.5 max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-4">
      {/* Ecosystem & Upstream Framework Preset Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {ECOSYSTEMS.map((eco) => {
          const isActive = selectedEcosystem === eco.id
          return (
            <button
              key={eco.id}
              onClick={() => {
                setEcosystem(eco.id)
                // If selecting an ecosystem preset, clear specific repo dropdown
                if (selectedRepo !== 'all') setRepo('all')
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border border-blue-400 shadow-sm'
                  : 'bg-[#0d1117] hover:bg-[#161b22] text-slate-300 hover:text-white border border-[#21262d]'
              }`}
            >
              {eco.icon}
              <span>{eco.label}</span>
            </button>
          )
        })}
      </div>

      {/* Active Repo Filter Indicator Banner if repo is selected */}
      {selectedRepo !== 'all' && activeRepoMeta && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-sm">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">
              Filtered to repository: <strong className="text-white">{activeRepoMeta.repoName}</strong> ({activeRepoMeta.repo})
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-200 border border-cyan-700/50">
              {activeRepoMeta.count} skills
            </span>
          </div>
          <button
            onClick={() => setRepo('all')}
            className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-white bg-[#0d1117] px-2.5 py-1 rounded-md border border-cyan-700/60 hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Repo Filter</span>
          </button>
        </div>
      )}

      {/* Main Filter Bar */}
      <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded-xl flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, slash commands (/camerax), tags, models, repos... (Press '/' to focus)"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#08090a] border border-[#30363d] text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto shrink-0 overflow-x-auto">
          {(['ALL', 'P0', 'P1', 'P2', 'P3'] as Priority[]).map((p) => {
            const isActive = selectedPriority === p
            let activeColor = 'bg-blue-600 text-white border-blue-400'
            if (p === 'P0') activeColor = 'bg-red-950 text-red-200 border-red-500'
            if (p === 'P1') activeColor = 'bg-amber-950 text-amber-200 border-amber-500'
            if (p === 'P2') activeColor = 'bg-emerald-950 text-emerald-200 border-emerald-500'
            if (p === 'P3') activeColor = 'bg-indigo-950 text-indigo-200 border-indigo-500'

            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer border ${
                  isActive
                    ? activeColor
                    : 'bg-[#161b22] hover:bg-slate-800 text-slate-300 hover:text-white border-[#30363d]'
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
            className="w-full md:w-56 px-3 py-2.5 rounded-lg bg-[#08090a] border border-[#30363d] text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
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
            className="w-full md:w-52 px-3 py-2.5 rounded-lg bg-[#08090a] border border-[#30363d] text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
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
            className="w-full md:w-44 px-3 py-2.5 rounded-lg bg-[#08090a] border border-[#30363d] text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="stars-desc">Most Stars ⭐</option>
            <option value="stars-asc">Least Stars</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="priority-p0-first">Priority (P0 First)</option>
          </select>
        </div>

        {/* Density Switcher: Grid vs Rows */}
        <div className="flex items-center rounded-lg bg-[#08090a] border border-[#30363d] p-1 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid View (Rich Cards)"
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#21262d] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('rows')}
            title="Rows View (High-Density List)"
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              viewMode === 'rows'
                ? 'bg-[#21262d] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-colors cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  )
}
