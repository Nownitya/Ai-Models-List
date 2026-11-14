import React, { useState } from 'react'
import {
  Terminal,
  ExternalLink,
  GitBranch,
  Check,
  Copy,
  Heart,
  Code
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const Footer: React.FC = () => {
  const meta = useSkillStore((s) => s.meta)
  const setPillar = useSkillStore((s) => s.setPillar)
  const setEntityScope = useSkillStore((s) => s.setEntityScope)
  const setCategory = useSkillStore((s) => s.setCategory)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)
  const [copiedClone, setCopiedClone] = useState(false)

  const handleCopyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/Nownitya/Ai-Models-List.git')
    setCopiedClone(true)
    setTimeout(() => setCopiedClone(false), 1600)
  }

  return (
    <footer className="border-t border-[#27272a] bg-[#070709] text-zinc-400 font-sans relative overflow-hidden">
      {/* Hairline subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* Main Multi-Column Footer Grid */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#27272a]/80">
          
          {/* Column 1 & 2: Brand Identity, Mission & Live Status */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272a] flex items-center justify-center text-zinc-100 shadow-xs">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  SkillDock
                </span>
                <span className="text-[10px] font-mono text-zinc-500 border border-[#27272a] px-1.5 py-0.2 rounded bg-[#111114]">
                  v3.0
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The authoritative open directory and prompt architecture for AI Agent Skills, Framework Harnesses, and MCP Connectors. Engineered for Claude Code, Antigravity, Cursor, and Codex.
            </p>

            {/* Live Telemetry / System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111114] border border-[#27272a] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300 font-medium">All Systems Operational</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{meta.totalSkills || 283} Skills Active</span>
            </div>

            {/* Quick Git Clone Snippet */}
            <div className="pt-2">
              <button
                onClick={handleCopyClone}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111114] hover:bg-[#18181b] border border-[#27272a] hover:border-zinc-500 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
                title="Click to copy git clone command"
              >
                <GitBranch className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                <span className="truncate">git clone Ai-Models-List.git</span>
                {copiedClone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Column 3: Catalog Pillars */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              Directory Pillars
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setPillar('frameworks')
                    setEntityScope('all')
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Suites & Packages ({meta.totalFrameworks || 74})
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPillar('frameworks')
                    setEntityScope('atomic')
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Atomic Agent Skills ({meta.totalSkills || 283})
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPillar('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Claude Marketplace</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    1,656
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPillar('docs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Layer 15 Architecture Docs ({meta.totalDocs || 57})
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPillar('prompts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  System Prompts & Personas ({meta.totalPrompts || 3})
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Curated Stacks */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              Curated Stacks
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => { setPillar('skills'); setEcosystem('agents') }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Autonomous Agents (Superpowers, GSD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPillar('skills'); setCategory('05-ui-ux') }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  UI/UX Craft & Anti-Slop (Taste, Unslop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPillar('skills'); setEcosystem('quality') }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Code Review & Security Audits
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPillar('skills'); setEcosystem('android') }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Android, Jetpack & Kotlin KMP
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPillar('skills'); setEcosystem('obsidian') }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Obsidian Developer Second Brain
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Specifications & Laws */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              Governance & Laws
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Law 1: Dual Matrix Parity</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Law 2: Open SKILL.md Spec</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Law 3: Layer 15 Standard</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Law 4: Creator Independence</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://github.com/Nownitya/Ai-Models-List/blob/main/AGENTS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
                >
                  <span>Read AGENTS.md</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 6: Supported IDEs & Runtimes */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              Target Runtimes
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span>⚡</span>
                <span className="text-zinc-200">Google Antigravity</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🧠</span>
                <span className="text-zinc-200">Anthropic Claude Code</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🖱️</span>
                <span className="text-zinc-200">Cursor IDE</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🤖</span>
                <span className="text-zinc-200">OpenAI Codex CLI</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🥧</span>
                <span className="text-zinc-200">Pi & OpenCode</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Bar: Keyboard Shortcuts Cheat Sheet */}
        <div className="py-6 border-b border-[#27272a]/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-mono">
            <span className="text-zinc-500 font-medium">Keyboard Shortcuts:</span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-[#141417] border border-[#27272a] text-zinc-300 text-[11px] font-bold">/</kbd>
              <span>Instant Search</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-[#141417] border border-[#27272a] text-zinc-300 text-[11px] font-bold">⌘K</kbd>
              <span>Command Palette</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-[#141417] border border-[#27272a] text-zinc-300 text-[11px] font-bold">Esc</kbd>
              <span>Close Drawers</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Nownitya/Ai-Models-List"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Code className="w-4 h-4 text-zinc-400" />
              <span>GitHub Repository</span>
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="Claude-Connectors-and-Plugins-Matrix.csv"
              download="Claude-Connectors-and-Plugins-Matrix.csv"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Download MCP CSV
            </a>
          </div>
        </div>

        {/* Big Editorial Brand Stamp Watermark (footer.design aesthetic) */}
        <div className="pt-10 pb-6 flex items-center justify-between text-zinc-700 select-none pointer-events-none">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter opacity-15 text-white font-mono">
            SKILLDOCK
          </span>
          <span className="text-xs font-mono text-zinc-600 hidden sm:inline text-right">
            Dual-Matrix Architecture<br />
            Layer 15 Universal Standard
          </span>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SkillDock · Licensed under MIT</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for the AI Coding Agent Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
            <span>v3.0.0-editorial</span>
            <span>·</span>
            <span>Zero-Downtime GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
