import React from 'react'
import { Star, ShieldCheck, Zap, Store } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const HeroSection: React.FC = () => {
  const meta = useSkillStore((s) => s.meta)
  const setPillar = useSkillStore((s) => s.setPillar)
  const activePillar = useSkillStore((s) => s.activePillar)

  const formattedStars = (meta.totalStars / 1_000_000).toFixed(2)

  return (
    <section className="relative border-b border-[#27272a] bg-gradient-to-b from-[#111114] via-[#09090b] to-[#09090b] pt-12 pb-10 overflow-hidden">
      {/* Subtle background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="max-w-4xl">
          {/* Top Pill: Linux Foundation & Open Standard Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#18181b] border border-[#27272a] text-zinc-300 mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">Open Standard:</span>
            <span className="text-zinc-200 font-semibold">SKILL.md & MCP Protocol</span>
            <span className="text-zinc-500">·</span>
            <span className="text-emerald-400 font-medium">Dual-Matrix Parity 100%</span>
          </div>

          {/* Editorial Headline with Instrument Serif Italic Accent */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] mb-4">
            Discover the World&apos;s Best{' '}
            <span className="font-serif italic font-normal text-zinc-200 underline decoration-zinc-700/60 underline-offset-8">
              AI Agent Skills
            </span>{' '}
            & Frameworks.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
            The authoritative engineering launchpad cataloging <strong>{meta.totalSkills || 282} Atomic Skills</strong>,{' '}
            <strong>1,126 MCP Connectors</strong>, <strong>{meta.totalFrameworks || 73} Upstream Harnesses</strong>, and{' '}
            <strong>530 Claude Plugins</strong> with multi-assistant activation guides.
          </p>

          {/* Live Metric Ribbon (Clean, Non-Blocking, High-Density) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-zinc-400">
            <button
              onClick={() => setPillar('frameworks')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activePillar === 'frameworks'
                  ? 'bg-zinc-800 border-zinc-600 text-white font-bold'
                  : 'bg-[#121215] border-[#27272a] hover:border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <span className="text-zinc-500">Harnesses</span>
              <span className="text-zinc-100 font-bold">{meta.totalFrameworks || 73}</span>
            </button>

            <button
              onClick={() => setPillar('skills')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activePillar === 'skills'
                  ? 'bg-zinc-800 border-zinc-600 text-white font-bold'
                  : 'bg-[#121215] border-[#27272a] hover:border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-zinc-500">Skills</span>
              <span className="text-zinc-100 font-bold">{meta.totalSkills || 282}</span>
            </button>

            <button
              onClick={() => setPillar('marketplace')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activePillar === 'marketplace'
                  ? 'bg-zinc-800 border-zinc-600 text-white font-bold'
                  : 'bg-[#121215] border-[#27272a] hover:border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <Store className="w-3 h-3 text-violet-400" />
              <span className="text-zinc-500">MCP & Plugins</span>
              <span className="text-zinc-100 font-bold">1,689</span>
            </button>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121215] border border-[#27272a] text-zinc-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{formattedStars}M Stars</span>
            </div>

            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121215] border border-[#27272a] text-zinc-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Verified Parity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
