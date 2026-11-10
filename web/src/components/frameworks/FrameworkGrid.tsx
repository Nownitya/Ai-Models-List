import React, { useMemo } from 'react'
import { Boxes, SearchX } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { FrameworkCard } from './FrameworkCard'

export const FrameworkGrid: React.FC = () => {
  const frameworks = useSkillStore((s) => s.frameworks)
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedSort = useSkillStore((s) => s.selectedSort)
  const resetFilters = useSkillStore((s) => s.resetFilters)

  const filteredFrameworks = useMemo(() => {
    let result = [...frameworks]

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
      // Default: By skills count and stars
      result.sort((a, b) => (b.skillsCount - a.skillsCount) || (b.stars - a.stars))
    }

    return result
  }, [frameworks, searchQuery, selectedCategory, selectedEcosystem, selectedSort])

  if (filteredFrameworks.length === 0) {
    return (
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#161b22] border border-[#30363d] flex items-center justify-center mb-4 text-[#8b949e]">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#f0f6fc] mb-1">No upstream frameworks found</h3>
        <p className="text-sm text-[#8b949e] max-w-md mb-6">
          No frameworks match your active filters or search query &quot;{searchQuery}&quot;.
        </p>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-sm font-semibold transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
      {/* Subheader summary */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-[#8b949e]">
          <Boxes className="w-4 h-4 text-cyan-400" />
          <span>
            Showing <strong className="text-[#f0f6fc] font-semibold">{filteredFrameworks.length}</strong> of{' '}
            <strong className="text-[#f0f6fc] font-semibold">{frameworks.length}</strong> upstream repositories
          </span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredFrameworks.map((framework) => (
          <FrameworkCard key={framework.id} framework={framework} />
        ))}
      </div>
    </div>
  )
}
