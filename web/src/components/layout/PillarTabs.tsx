import React from 'react'
import { Boxes, Zap, FileText, Sparkles, Bot, Store } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType, PillarType } from '@/types'

export const PillarTabs: React.FC = () => {
  const activePillar = useSkillStore((s) => s.activePillar)
  const setPillar = useSkillStore((s) => s.setPillar)
  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const setAssistant = useSkillStore((s) => s.setAssistant)
  const meta = useSkillStore((s) => s.meta)

  const pillars: { id: PillarType; label: string; count: number; icon: React.ReactNode; color: string; activeBg: string }[] = [
    {
      id: 'frameworks',
      label: 'Upstream Frameworks',
      count: meta.totalFrameworks || 73,
      icon: <Boxes className="w-4 h-4" />,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-950/50',
    },
    {
      id: 'skills',
      label: 'All Skills Directory',
      count: meta.totalSkills || 282,
      icon: <Zap className="w-4 h-4" />,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-950/50',
    },
    {
      id: 'marketplace',
      label: 'Claude Marketplace',
      count: 1689,
      icon: <Store className="w-4 h-4" />,
      color: 'text-violet-400',
      activeBg: 'bg-violet-500/15 border-violet-500/50 text-violet-300 shadow-sm shadow-violet-950/50',
    },
    {
      id: 'docs',
      label: 'Project Docs (Layer 15)',
      count: meta.totalDocs || 57,
      icon: <FileText className="w-4 h-4" />,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950/50',
    },
    {
      id: 'prompts',
      label: 'System Prompts & Roles',
      count: meta.totalPrompts || 3,
      icon: <Sparkles className="w-4 h-4" />,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-sm shadow-purple-950/50',
    },
  ]

  const assistants: { id: AssistantType; label: string; icon: string }[] = [
    { id: 'antigravity', label: 'Antigravity', icon: '⚡' },
    { id: 'claude', label: 'Claude Code', icon: '🧠' },
    { id: 'codex', label: 'Codex / Pi', icon: '🤖' },
    { id: 'git', label: 'Git / CLI', icon: '💻' },
  ]

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-3 pb-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#21262d] pb-3">
        {/* 4 Core Pillar Switchers */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {pillars.map((p) => {
            const isActive = activePillar === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPillar(p.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border whitespace-nowrap cursor-pointer ${
                  isActive
                    ? p.activeBg
                    : 'bg-[#161b22]/60 hover:bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] border-[#30363d]/60 hover:border-[#30363d]'
                }`}
              >
                <span className={isActive ? p.color : 'text-[#8b949e]'}>{p.icon}</span>
                <span>{p.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium ${
                    isActive ? 'bg-[#0d1117]/80 text-[#f0f6fc]' : 'bg-[#0d1117]/60 text-[#8b949e]'
                  }`}
                >
                  {p.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Global Assistant Mode Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-[#161b22]/80 border border-[#30363d] px-2.5 py-1 rounded-lg">
          <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Assistant:</span>
          </span>
          <div className="flex items-center gap-1">
            {assistants.map((a) => {
              const isSelected = activeAssistant === a.id
              return (
                <button
                  key={a.id}
                  onClick={() => setAssistant(a.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/60'
                  }`}
                  title={`Format installation recipes for ${a.label}`}
                >
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
