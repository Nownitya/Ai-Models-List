import React from 'react'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/layout/HeroSection'
import { StaffPicks } from '@/components/layout/StaffPicks'
import { Footer } from '@/components/layout/Footer'
import { FilterToolbar } from '@/components/filters/FilterToolbar'
import { FrameworkGrid } from '@/components/frameworks/FrameworkGrid'
import { FrameworkDrawer } from '@/components/frameworks/FrameworkDrawer'
import { VirtualizedGrid } from '@/components/skills/VirtualizedGrid'
import { MarketplaceView } from '@/components/marketplace/MarketplaceView'
import { ProjectDocsView } from '@/components/docs/ProjectDocsView'
import { SystemPromptsView } from '@/components/prompts/SystemPromptsView'
import { SkillDrawer } from '@/components/modals/SkillDrawer'
import { StackModal } from '@/components/modals/StackModal'
import { PriorityGuideModal } from '@/components/modals/PriorityGuideModal'
import { CommandPalette } from '@/components/modals/CommandPalette'
import { WebMcpConsoleModal } from '@/components/modals/WebMcpConsoleModal'
import { ToastNotification } from '@/components/layout/ToastNotification'
import { useFilteredSkills } from '@/hooks/useFilteredSkills'
import { useSkillStore } from '@/stores/useSkillStore'

export const App: React.FC = () => {
  const activePillar = useSkillStore((s) => s.activePillar)
  const entityScope = useSkillStore((s) => s.entityScope)
  const filteredSkills = useFilteredSkills()
  const totalSkills = useSkillStore((s) => s.meta.totalSkills)
  const viewMode = useSkillStore((s) => s.viewMode)

  const isCatalog = activePillar === 'frameworks' || activePillar === 'skills'

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* 1. Ultra-Slim Sticky Navigation Topbar (54px) */}
      <Header />

      {/* 2. Editorial Hero & Staff Picks (Natural Document Flow - Scrolls away smoothly) */}
      {isCatalog && (
        <>
          <HeroSection />
          <StaffPicks />
        </>
      )}

      {/* 3. Active Pillar Viewport */}
      <main className="flex-1 pb-16">
        {isCatalog && (
          <>
            <FilterToolbar />
            {entityScope === 'atomic' ? (
              <>
                <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-4 flex items-center justify-between text-xs text-zinc-400">
                  <span>
                    Showing <strong>{filteredSkills.length}</strong> of <strong>{totalSkills}</strong> cataloged atomic skills
                    <span className="text-zinc-500 ml-2 font-mono">
                      [{viewMode === 'grid' ? 'Grid Cards' : 'Dense Rows'}]
                    </span>
                  </span>
                  <span className="text-zinc-500 hidden sm:inline font-mono">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a]">/</kbd> to search, <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a]">⌘K</kbd> for command palette
                  </span>
                </div>
                <VirtualizedGrid skills={filteredSkills} />
              </>
            ) : (
              <FrameworkGrid />
            )}
          </>
        )}

        {activePillar === 'marketplace' && <MarketplaceView />}

        {activePillar === 'docs' && <ProjectDocsView />}

        {activePillar === 'prompts' && <SystemPromptsView />}
      </main>

      {/* 4. Architectural Footer (Inspired by footer.design) */}
      <Footer />

      {/* 5. Drawers & Modals */}
      <FrameworkDrawer />
      <SkillDrawer />
      <StackModal />
      <PriorityGuideModal />
      <CommandPalette />
      <WebMcpConsoleModal />
      <ToastNotification />
    </div>
  )
}

export default App
