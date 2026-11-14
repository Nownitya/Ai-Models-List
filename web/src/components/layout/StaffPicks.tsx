import React, { useState } from 'react'
import { Sparkles, Star, Copy, Check, ArrowRight, Zap, Shield, Smartphone, Bot, Palette, Plus, CheckCircle2 } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { STARTER_PACKS } from '@/data/starterPacks'
import type { Skill } from '@/types'

export const StaffPicks: React.FC = () => {
  const skills = useSkillStore((s) => s.skills)
  const stack = useSkillStore((s) => s.stack)
  const openInspect = useSkillStore((s) => s.openInspect)
  const addStarterPackToStack = useSkillStore((s) => s.addStarterPackToStack)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)
  const setCategory = useSkillStore((s) => s.setCategory)
  const setPillar = useSkillStore((s) => s.setPillar)
  const setEntityScope = useSkillStore((s) => s.setEntityScope)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Identify our 4 flagship featured skills
  const featuredIds = ['taste-skill', 'unslop', 'systematic-debugging', 'ui-ux-pro-max']
  const featuredSkills: Skill[] = featuredIds
    .map((id) => skills.find((s) => s.id === id))
    .filter((s): s is Skill => Boolean(s))

  const handleCopySlash = (e: React.MouseEvent, skill: Skill) => {
    e.stopPropagation()
    const slash = `/${skill.scoped}`
    navigator.clipboard.writeText(slash)
    setCopiedId(skill.uniqueId)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const quickCategories = [
    { label: 'Autonomous Agents', icon: <Bot className="w-3.5 h-3.5 text-blue-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setEcosystem('agents') } },
    { label: 'UI/UX Craft & Anti-Slop', icon: <Palette className="w-3.5 h-3.5 text-pink-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setCategory('05-ui-ux') } },
    { label: 'Code Review & Security', icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setEcosystem('quality') } },
    { label: 'Android & Mobile', icon: <Smartphone className="w-3.5 h-3.5 text-violet-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setEcosystem('android') } },
    { label: 'GSD Wave Engine', icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setEcosystem('gsd') } },
    { label: 'Superpowers TDD', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />, action: () => { setPillar('skills'); setEntityScope('atomic'); setEcosystem('superpowers') } },
  ]

  if (featuredSkills.length === 0) return null

  return (
    <section className="border-b border-[#27272a] bg-[#0c0c0e] py-8">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] border border-[#27272a] text-zinc-300 mb-2">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Staff Picks</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Flagship Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Essential Skills for{' '}
              <span className="font-serif italic font-normal text-zinc-200 underline decoration-zinc-700/60 underline-offset-4">
                Autonomous Coding
              </span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
            Curated high-leverage agent skills powering modern agentic workflows across Antigravity, Claude Code, and Codex.
          </p>
        </div>

        {/* 4 Flagship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7">
          {featuredSkills.map((skill) => {
            const isCopied = copiedId === skill.uniqueId
            return (
              <div
                key={skill.uniqueId}
                onClick={() => openInspect(skill)}
                className="group relative rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161b] hover:border-zinc-500 transition-all duration-150 p-4.5 flex flex-col justify-between cursor-pointer shadow-xs"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                      {skill.categoryLabel}
                    </span>
                    {skill.stars > 0 && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                        <span>{(skill.stars / 1000).toFixed(0)}k</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5 flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 border-t border-[#27272a]/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 bg-[#18181b] px-2.5 py-1 rounded-md border border-[#27272a] min-w-0 flex-1 truncate">
                    <span className="text-zinc-500 shrink-0">/</span>
                    <span className="truncate">{skill.scoped}</span>
                  </div>

                  <button
                    onClick={(e) => handleCopySlash(e, skill)}
                    className="p-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#27272a] transition-colors cursor-pointer shrink-0"
                    title="Copy Slash Command"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* 1-Click Starter Stacks (Editorial Suites with Token Conservation) */}
        <div className="pt-5 border-t border-[#27272a]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                1-Click Starter Stacks
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300">
                8 Curated Suites • ~82% Context Savings
              </span>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              Pre-configured high-performance bundles ready to export or run
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STARTER_PACKS.map((pack) => {
              const matchedCount = pack.skillIds.filter((id) =>
                stack.some((s) => s.id === id || s.uniqueId === id)
              ).length
              const isFullyLoaded = matchedCount === pack.skillIds.length && pack.skillIds.length > 0

              return (
                <div
                  key={pack.id}
                  className="rounded-lg border border-[#27272a] bg-[#101014] hover:border-zinc-500 p-3.5 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-base shrink-0">{pack.icon}</span>
                        <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                          {pack.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a] shrink-0 leading-none">
                        {pack.skillIds.length} skills
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                      {pack.description}
                    </p>
                  </div>

                  <button
                    onClick={() => addStarterPackToStack(pack.skillIds)}
                    className={`w-full py-1.5 px-2.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isFullyLoaded
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-200 hover:text-white'
                    }`}
                  >
                    {isFullyLoaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Loaded in Stack</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>
                          {matchedCount > 0 ? `Add Remaining (+${pack.skillIds.length - matchedCount})` : '1-Click Load Stack'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Stacks Launcher Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#27272a]/60">
          <span className="text-xs font-mono text-zinc-500 mr-1">Browse by Domain:</span>
          {quickCategories.map((stk) => (
            <button
              key={stk.label}
              onClick={stk.action}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#141417] hover:bg-[#1a1a20] border border-[#27272a] hover:border-zinc-600 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              {stk.icon}
              <span>{stk.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
