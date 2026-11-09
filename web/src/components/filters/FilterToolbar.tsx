import React, { useRef, useEffect } from 'react'
import { Search, X, RotateCcw, Smartphone, Cpu, ShieldCheck, Zap, Bot, BookOpen, Diamond, Sparkles } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Ecosystem, Priority, SortOption } from '@/types'

const ECOSYSTEMS: { id: Ecosystem; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Stacks', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'android', label: 'Android Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  { id: 'kmp', label: 'Kotlin KMP', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'gsd', label: 'GSD Engine', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'superpowers', label: 'Superpowers', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { id: 'agents', label: 'Autonomous Agents', icon: <Bot className="w-3.5 h-3.5" /> },
  { id: 'mattpocock', label: 'Matt Pocock', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'obsidian', label: 'Obsidian Brain', icon: <Diamond className="w-3.5 h-3.5" /> },
  { id: 'quality', label: 'Quality & Review', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
]

export const FilterToolbar: React.FC = () => {
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedPriority = useSkillStore((s) => s.selectedPriority)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedSort = useSkillStore((s) => s.selectedSort)
  const meta = useSkillStore((s) => s.meta)

  const setSearchQuery = useSkillStore((s) => s.setSearchQuery)
  const setPriority = useSkillStore((s) => s.setPriority)
  const setCategory = useSkillStore((s) => s.setCategory)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)
  const setSort = useSkillStore((s) => s.setSort)
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
    selectedSort !== 'default'

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      {/* Ecosystem Preset Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {ECOSYSTEMS.map((eco) => {
          const isActive = selectedEcosystem === eco.id
          return (
            <button
              key={eco.id}
              onClick={() => setEcosystem(eco.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)] border border-blue-400'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {eco.icon}
              <span>{eco.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Filter Bar */}
      <div className="glass-panel p-3.5 rounded-2xl flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 317+ AI skills, slash commands (/camerax), tags, models... (Press '/' to focus)"
            className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1 w-full md:w-auto shrink-0 overflow-x-auto">
          {(['ALL', 'P0', 'P1', 'P2', 'P3'] as Priority[]).map((p) => {
            const isActive = selectedPriority === p
            let activeColor = 'bg-blue-600 text-white border-blue-400'
            if (p === 'P0') activeColor = 'bg-red-950 text-red-300 border-red-500'
            if (p === 'P1') activeColor = 'bg-amber-950 text-amber-300 border-amber-500'
            if (p === 'P2') activeColor = 'bg-emerald-950 text-emerald-300 border-emerald-500'
            if (p === 'P3') activeColor = 'bg-indigo-950 text-indigo-300 border-indigo-500'

            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                  isActive
                    ? activeColor
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        {/* Category Selector */}
        <div className="w-full md:w-auto shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
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
            className="w-full md:w-40 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="stars-desc">Most Stars ⭐</option>
            <option value="stars-asc">Least Stars</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="priority-p0-first">Priority (P0 First)</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  )
}
