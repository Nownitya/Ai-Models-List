import React from 'react'
import { Terminal, Layers, Command, Sparkles, Boxes, Store, FileText } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType, PillarType } from '@/types'

export const Header: React.FC = () => {
  const stack = useSkillStore((s) => s.stack)
  const activePillar = useSkillStore((s) => s.activePillar)
  const setPillar = useSkillStore((s) => s.setPillar)
  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const setAssistant = useSkillStore((s) => s.setAssistant)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const setCommandPaletteOpen = useSkillStore((s) => s.setCommandPaletteOpen)
  const goHome = useSkillStore((s) => s.goHome)
  const meta = useSkillStore((s) => s.meta)

  const pillars: { id: PillarType; label: string; count: number | string; icon: React.ReactNode }[] = [
    { id: 'frameworks', label: 'Skills & Suites', count: meta.totalFrameworks || 74, icon: <Boxes className="w-3.5 h-3.5" /> },
    { id: 'marketplace', label: 'Marketplace', count: 1689, icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'docs', label: 'Docs', count: meta.totalDocs || 57, icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'prompts', label: 'Prompts', count: meta.totalPrompts || 3, icon: <Sparkles className="w-3.5 h-3.5" /> },
  ]

  const isPillarActive = (id: PillarType) => {
    if (id === 'frameworks') return activePillar === 'frameworks' || activePillar === 'skills'
    return activePillar === id
  }

  const assistants: { id: AssistantType; label: string; icon: string }[] = [
    { id: 'antigravity', label: 'Antigravity', icon: '⚡' },
    { id: 'claude', label: 'Claude', icon: '🧠' },
    { id: 'codex', label: 'Codex', icon: '🤖' },
    { id: 'git', label: 'CLI', icon: '💻' },
  ]

  return (
    <header className="border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Title (Click to return Home) */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={goHome}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 rounded-md p-1 -ml-1 transition-all"
            title="SkillDock Home"
            aria-label="SkillDock Home"
          >
            <div className="w-7 h-7 rounded-md bg-[#18181b] border border-[#27272a] group-hover:border-zinc-500 group-hover:bg-[#27272a] flex items-center justify-center text-zinc-100 shadow-2xs transition-all duration-150">
              <Terminal className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                SkillDock
              </span>
              <span className="text-[10px] font-mono text-zinc-500 border border-[#27272a] px-1.5 py-0.2 rounded bg-[#121215]">
                v3.0
              </span>
            </div>
          </button>

          {/* Integrated 4-Pillar Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center gap-1 border-l border-[#27272a] pl-4">
            {pillars.map((p) => {
              const isActive = isPillarActive(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => setPillar(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#18181b] text-white font-semibold shadow-2xs border border-[#27272a]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121215]'
                  }`}
                >
                  <span className={isActive ? 'text-zinc-200' : 'text-zinc-500'}>{p.icon}</span>
                  <span>{p.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-[#27272a] text-zinc-200' : 'text-zinc-500'
                    }`}
                  >
                    {p.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right Side Actions: Search, Assistant Selector, Stack, GitHub */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#121215] hover:bg-[#18181b] text-xs text-zinc-400 hover:text-zinc-200 border border-[#27272a] transition-colors cursor-pointer"
            title="Search & Commands (⌘K or Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">
              ⌘K
            </kbd>
          </button>

          {/* Target Assistant Selector Pill */}
          <div className="hidden lg:flex items-center gap-1 bg-[#121215] border border-[#27272a] p-0.5 rounded-md text-xs">
            {assistants.map((ast) => {
              const isSelected = activeAssistant === ast.id
              return (
                <button
                  key={ast.id}
                  onClick={() => setAssistant(ast.id)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 text-white font-semibold shadow-2xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title={`Format install scripts for ${ast.label}`}
                >
                  <span className="mr-1">{ast.icon}</span>
                  <span>{ast.label}</span>
                </button>
              )
            })}
          </div>

          {/* Stack Drawer Button */}
          <button
            onClick={() => setStackModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors cursor-pointer"
            title="Open Selected Skills Stack"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Stack</span>
            {stack.length > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white text-zinc-900 font-bold">
                {stack.length}
              </span>
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/nownitya/Ai-Models-List"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-[#121215] hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200 border border-[#27272a] transition-colors"
            title="View on GitHub"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation Scroll Strip */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar px-4 py-2 border-t border-[#27272a] bg-[#09090b]">
        {pillars.map((p) => {
          const isActive = isPillarActive(p.id)
          return (
            <button
              key={p.id}
              onClick={() => setPillar(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{p.label}</span>
              <span className="text-[10px] font-mono text-zinc-500">({p.count})</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}
