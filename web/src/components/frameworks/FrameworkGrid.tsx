import React, { useMemo, useState, useEffect } from 'react'
import { Boxes, SearchX, ChevronDown } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { FrameworkCard } from './FrameworkCard'

const PAGE_SIZE = 20

export const FrameworkGrid: React.FC = () => {
  const frameworks = useSkillStore((s) => s.frameworks)
  const entityScope = useSkillStore((s) => s.entityScope)
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedSort = useSkillStore((s) => s.selectedSort)
  const resetFilters = useSkillStore((s) => s.resetFilters)

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery, selectedCategory, selectedEcosystem, selectedSort, entityScope])

  const filteredFrameworks = useMemo(() => {
    let result = [...frameworks]

    // 0. Entity Scope Filter (Suites vs Standalone)
    if (entityScope === 'suites') {
      result = result.filter((f) => f.skillsCount > 1)
    } else if (entityScope === 'standalone') {
      result = result.filter((f) => f.skillsCount === 1)
    }

    // 1. Text Search across name, author, repo, description, and member skills
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (f) =>
          f.repoName.toLowerCase().includes(q) ||
          f.repo.toLowerCase().includes(q) ||
          f.author.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.skills.some((s) => s.name.toLowerCase().includes(q) || s.scoped.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
      )
    }

    // 2. Category Filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((f) => f.categoryId === selectedCategory)
    }

    // 3. Ecosystem Filter
    if (selectedEcosystem !== 'all') {
      const eco = selectedEcosystem.toLowerCase()
      result = result.filter((f) => {
        const repoLower = f.repo.toLowerCase()
        const nameLower = f.repoName.toLowerCase()
        if (eco === 'gsd') return repoLower.includes('gsd') || nameLower.includes('gsd')
        if (eco === 'superpowers') return repoLower.includes('superpowers') || nameLower.includes('superpowers')
        if (eco === 'gstack') return repoLower.includes('gstack') || nameLower.includes('gstack')
        if (eco === 'ecc') return repoLower.includes('ecc') || nameLower.includes('claude')
        if (eco === 'ralph') return repoLower.includes('ralph') || nameLower.includes('ralph')
        if (eco === 'impeccable') return repoLower.includes('impeccable') || nameLower.includes('impeccable')
        if (eco === 'android') return repoLower.includes('android') || nameLower.includes('android')
        if (eco === 'kmp') return repoLower.includes('kotlin') || nameLower.includes('kmp')
        if (eco === 'mattpocock') return repoLower.includes('mattpocock') || nameLower.includes('matt')
        if (eco === 'agents') return repoLower.includes('agent') || f.categoryId.includes('autonomous')
        if (eco === 'obsidian') return repoLower.includes('obsidian') || nameLower.includes('obsidian')
        if (eco === 'quality') return f.categoryId.includes('review') || f.description.toLowerCase().includes('quality')
        return true
      })
    }

    // 4. Sorting
    if (selectedSort === 'stars-desc') {
      result.sort((a, b) => b.stars - a.stars)
    } else if (selectedSort === 'stars-asc') {
      result.sort((a, b) => a.stars - b.stars)
    } else if (selectedSort === 'name-asc') {
      result.sort((a, b) => a.repoName.localeCompare(b.repoName))
    } else {
      result.sort((a, b) => (b.skillsCount - a.skillsCount) || (b.stars - a.stars))
    }

    return result
  }, [frameworks, searchQuery, selectedCategory, selectedEcosystem, selectedSort, entityScope])

  if (filteredFrameworks.length === 0) {
    return (
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#141417] border border-[#27272a] flex items-center justify-center mb-4 text-zinc-500">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No matching packages found</h3>
        <p className="text-sm text-zinc-400 max-w-md mb-6">
          No upstream packages match your active filters or search query &quot;{searchQuery}&quot;.
        </p>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 text-xs font-semibold transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    )
  }

  const visibleFrameworks = filteredFrameworks.slice(0, visibleCount)
  const hasMore = filteredFrameworks.length > visibleCount

  const scopeLabel =
    entityScope === 'suites'
      ? 'multi-skill suites'
      : entityScope === 'standalone'
      ? 'standalone skills'
      : 'packages (suites & standalone)'

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
      {/* Subheader summary */}
      <div className="flex items-center justify-between mb-4 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Boxes className="w-4 h-4 text-emerald-400" />
          <span>
            Showing <strong className="text-white font-semibold">{visibleFrameworks.length}</strong> of{' '}
            <strong className="text-white font-semibold">{filteredFrameworks.length}</strong> {scopeLabel}
          </span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5">
        {visibleFrameworks.map((framework) => (
          <FrameworkCard key={framework.id} framework={framework} />
        ))}
      </div>

      {/* Progressive Load More (+20) */}
      {hasMore && (
        <div className="mt-8 mb-8 flex flex-col items-center justify-center gap-2.5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredFrameworks.length))}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-zinc-100 hover:text-white border border-[#27272a] hover:border-zinc-500 font-semibold text-xs transition-all shadow-xs cursor-pointer group"
            >
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
              <span>Load More Frameworks (+{PAGE_SIZE})</span>
            </button>

            <button
              onClick={() => setVisibleCount(filteredFrameworks.length)}
              className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200 border border-[#27272a] text-xs font-mono transition-colors cursor-pointer"
            >
              Show All ({filteredFrameworks.length})
            </button>
          </div>

          <p className="text-center text-[11px] font-mono text-zinc-500">
            Showing <strong className="text-zinc-300">{visibleFrameworks.length}</strong> of{' '}
            <strong className="text-zinc-300">{filteredFrameworks.length}</strong> frameworks
          </p>
        </div>
      )}

      {!hasMore && filteredFrameworks.length > PAGE_SIZE && (
        <p className="text-center text-xs font-mono text-zinc-500 mt-8 mb-8">
          All {filteredFrameworks.length} frameworks loaded · Scroll down for directory links and system status
        </p>
      )}
    </div>
  )
}
