import React from 'react'
import { Terminal, Layers, Star, Sparkles, Command, ShieldCheck } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const Header: React.FC = () => {
  const meta = useSkillStore((s) => s.meta)
  const stack = useSkillStore((s) => s.stack)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const setPriorityGuideOpen = useSkillStore((s) => s.setPriorityGuideOpen)
  const setCommandPaletteOpen = useSkillStore((s) => s.setCommandPaletteOpen)

  const formattedStars = (meta.totalStars / 1_000_000).toFixed(2)

  return (
    <header className="border-b border-[#21262d] bg-[#08090a] sticky top-0 z-40">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand & Version */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-slate-100 shadow-sm">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-black tracking-tight text-white">SkillDock</span>
            <span className="text-xs font-mono text-slate-300 border border-[#21262d] px-2 py-0.5 rounded bg-[#0d1117]">
              v2.0
            </span>
          </div>
        </div>

        {/* Quick Actions & Navigation */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Command Palette Trigger Button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0d1117] hover:bg-[#161b22] text-sm text-slate-300 hover:text-white border border-[#21262d] transition-colors cursor-pointer"
            title="Open Command Palette (⌘K or Ctrl+K)"
          >
            <Command className="w-4 h-4 text-slate-400" />
            <span>Search & Commands</span>
            <kbd className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d]">
              ⌘K
            </kbd>
          </button>

          {/* Priority Guide Trigger */}
          <button
            onClick={() => setPriorityGuideOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1117] hover:bg-[#161b22] text-sm font-semibold text-slate-200 border border-[#21262d] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Priority Guide</span>
          </button>

          {/* My Stack Drawer Trigger */}
          <button
            onClick={() => setStackModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-950/70 text-sm font-bold text-cyan-300 border border-cyan-800/60 transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Stack</span>
            {stack.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300">
                {stack.length}
              </span>
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/nownitya/Ai-Models-List"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0d1117] hover:bg-[#161b22] text-slate-300 hover:text-white border border-[#21262d] transition-colors"
            title="View on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hero Subbar */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-[#161b22]">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-sm font-semibold text-slate-200">
              The Launchpad for AI Coding Skills & Agent Harnesses
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Dual-Matrix Parity Verified
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Empirical launchpad covering <strong>{meta.totalFrameworks || 65} upstream frameworks</strong>, <strong>{meta.totalSkills} atomic skills</strong>, and <strong>{meta.totalDocs || 57} Layer 15 project docs</strong> with multi-assistant installation guides.
          </p>
        </div>

        {/* Minimal High-Density Metric Badges */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-x-auto no-scrollbar">
          <div className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-left">
            <span className="text-xs uppercase font-bold text-cyan-400 block">Frameworks</span>
            <span className="text-base sm:text-lg font-black text-cyan-300">{meta.totalFrameworks || 65}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-left">
            <span className="text-xs uppercase font-bold text-slate-400 block">Skills</span>
            <span className="text-base sm:text-lg font-black text-slate-100">{meta.totalSkills}</span>
          </div>

          <div
            onClick={() => setPriorityGuideOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-left cursor-pointer hover:border-red-500/50 transition-colors"
          >
            <span className="text-xs uppercase font-bold text-red-400 block">P0 Critical</span>
            <span className="text-base sm:text-lg font-black text-red-400">{meta.p0Count}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-left">
            <span className="text-xs uppercase font-bold text-amber-400 block">Stars</span>
            <span className="text-base sm:text-lg font-black text-amber-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {formattedStars}M
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-left">
            <span className="text-xs uppercase font-bold text-emerald-400 block">Parity</span>
            <span className="text-base sm:text-lg font-black text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100%
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
