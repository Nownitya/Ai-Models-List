import React from 'react'
import { Header } from '@/components/layout/Header'
import { StarterPacks } from '@/components/layout/StarterPacks'
import { RadarStrip } from '@/components/layout/RadarStrip'
import { FilterToolbar } from '@/components/filters/FilterToolbar'
import { VirtualizedGrid } from '@/components/skills/VirtualizedGrid'
import { SkillDrawer } from '@/components/modals/SkillDrawer'
import { StackModal } from '@/components/modals/StackModal'
import { PriorityGuideModal } from '@/components/modals/PriorityGuideModal'
import { CommandPalette } from '@/components/modals/CommandPalette'
import { useFilteredSkills } from '@/hooks/useFilteredSkills'
import { useSkillStore } from '@/stores/useSkillStore'

export const App: React.FC = () => {
  const filteredSkills = useFilteredSkills()
  const totalSkills = useSkillStore((s) => s.meta.totalSkills)
  const viewMode = useSkillStore((s) => s.viewMode)

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* 1. Header & Navigation Topbar */}
      <Header />

      {/* 2. Curated Starter Packs (1-Click Bundles) */}
      <StarterPacks />

      {/* 3. Live Upstream Radar Strip */}
      <RadarStrip />

      {/* 4. Filter & Search Controls with Density Switcher */}
      <FilterToolbar />

      {/* 5. Active Results Counter */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3 flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong>{filteredSkills.length}</strong> of <strong>{totalSkills}</strong> cataloged skills
          <span className="text-slate-500 ml-2 font-mono">
            [{viewMode === 'grid' ? 'Grid Cards' : 'Dense Rows'}]
          </span>
        </span>
        <span className="text-slate-500 hidden sm:inline">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 font-mono text-[10px] border border-[#30363d]">/</kbd> to search, <kbd className="px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 font-mono text-[10px] border border-[#30363d]">⌘K</kbd> for command palette
        </span>
      </div>

      {/* 6. Virtualized Grid / Row Feed */}
      <main className="flex-1 pb-10">
        <VirtualizedGrid skills={filteredSkills} />
      </main>

      {/* 7. Drawers & Modals */}
      <SkillDrawer />
      <StackModal />
      <PriorityGuideModal />
      <CommandPalette />
    </div>
  )
}

export default App
