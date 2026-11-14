import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Search,
  CornerDownLeft,
  Sparkles,
  Boxes,
  Zap,
  FileText,
  Plug,
  Smartphone,
  Terminal,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { STARTER_PACKS, type StarterPack } from '@/data/starterPacks'
import connectorsData from '@/data/claude-connectors-plugins.json'
import type { Skill, FrameworkHub, DocTemplate, MarketplaceConnector } from '@/types'

type PaletteTab = 'all' | 'packs' | 'frameworks' | 'skills' | 'connectors' | 'docs'

type SearchResultItem =
  | { type: 'starter-pack'; id: string; title: string; subtitle: string; tag: string; data: StarterPack }
  | { type: 'framework'; id: string; title: string; subtitle: string; tag: string; priority?: string; data: FrameworkHub }
  | { type: 'skill'; id: string; title: string; subtitle: string; tag: string; priority?: string; data: Skill }
  | { type: 'connector'; id: string; title: string; subtitle: string; tag: string; priority?: string; data: MarketplaceConnector }
  | { type: 'doc'; id: string; title: string; subtitle: string; tag: string; priority?: string; data: DocTemplate }
  | { type: 'action'; id: string; title: string; subtitle: string; tag: string; onAction: () => void }

export const CommandPalette: React.FC = () => {
  const isCommandPaletteOpen = useSkillStore((s) => s.isCommandPaletteOpen)
  const setCommandPaletteOpen = useSkillStore((s) => s.setCommandPaletteOpen)
  const skills = useSkillStore((s) => s.skills)
  const frameworks = useSkillStore((s) => s.frameworks)
  const docs = useSkillStore((s) => s.docs)
  const meta = useSkillStore((s) => s.meta)
  const setPillar = useSkillStore((s) => s.setPillar)
  const openInspect = useSkillStore((s) => s.openInspect)
  const openFrameworkInspect = useSkillStore((s) => s.openFrameworkInspect)
  const addStarterPackToStack = useSkillStore((s) => s.addStarterPackToStack)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const setPriorityGuideOpen = useSkillStore((s) => s.setPriorityGuideOpen)
  const setWebMcpModalOpen = useSkillStore((s) => s.setWebMcpModalOpen)
  const setPriority = useSkillStore((s) => s.setPriority)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)

  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<PaletteTab>('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Listen for ⌘K or Ctrl+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!isCommandPaletteOpen)
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen, setCommandPaletteOpen])

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setActiveTab('all')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isCommandPaletteOpen])

  // Filter items across 5 catalogs + system actions
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.toLowerCase().trim()

    // 0. Starter Stacks
    const matchedPacks: SearchResultItem[] = STARTER_PACKS.filter((p) => {
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.repo.toLowerCase().includes(q) ||
        p.skillIds.some((id) => id.toLowerCase().includes(q))
      )
    })
      .slice(0, activeTab === 'packs' ? 8 : q ? 4 : 2)
      .map((p) => ({
        type: 'starter-pack',
        id: `pack-${p.id}`,
        title: `${p.icon} ${p.title}`,
        subtitle: `${p.badge} • ${p.skillIds.length} skills • ~82% token savings (Press Enter to load)`,
        tag: 'Starter Stack',
        data: p,
      }))

    // 1. Frameworks / Suites
    const matchedFrameworks: SearchResultItem[] = frameworks
      .filter((f) => {
        if (!q) return f.stars > 5000 || f.repoName.includes('gstack') || f.repoName.includes('superpowers')
        return (
          f.repoName.toLowerCase().includes(q) ||
          f.author.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.categoryLabel.toLowerCase().includes(q) ||
          f.skills.some((sk) => sk.name.toLowerCase().includes(q) || sk.scoped.toLowerCase().includes(q))
        )
      })
      .slice(0, q ? 6 : 3)
      .map((f) => ({
        type: 'framework',
        id: `fw-${f.id}`,
        title: f.repoName,
        subtitle: f.description.slice(0, 75) + (f.description.length > 75 ? '...' : ''),
        tag: `${f.skillsCount} skills • ⭐ ${f.starsFormatted}`,
        data: f,
      }))

    // 2. Atomic Skills
    const matchedSkills: SearchResultItem[] = skills
      .filter((s) => {
        if (!q) return s.priority === 'P0'
        return (
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.scoped.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
        )
      })
      .slice(0, q ? 8 : 4)
      .map((s) => ({
        type: 'skill',
        id: `sk-${s.uniqueId}`,
        title: s.name,
        subtitle: `/${s.scoped} — ${s.description.slice(0, 65)}...`,
        tag: s.categoryLabel,
        priority: s.priority,
        data: s,
      }))

    // 3. MCP Connectors
    const connectors = (connectorsData as MarketplaceConnector[]) || []
    const matchedConnectors: SearchResultItem[] = connectors
      .filter((c) => {
        if (!q) return c.verifiedTier === 'anthropic' || (c.popularityScore && c.popularityScore > 9000)
        return (
          c.title.toLowerCase().includes(q) ||
          c.author.toLowerCase().includes(q) ||
          (c.oneLiner && c.oneLiner.toLowerCase().includes(q))
        )
      })
      .slice(0, q ? 5 : 2)
      .map((c) => ({
        type: 'connector',
        id: `cn-${c._id}`,
        title: c.title,
        subtitle: `${c.author} • ${c.oneLiner?.slice(0, 65) || 'Official MCP Server'}`,
        tag: `MCP (${c.type})`,
        data: c,
      }))

    // 4. Docs Templates
    const matchedDocs: SearchResultItem[] = docs
      .filter((d) => {
        if (!q) return d.priority === 'P0'
        return (
          d.name.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.purpose.toLowerCase().includes(q) ||
          d.tier.toLowerCase().includes(q)
        )
      })
      .slice(0, q ? 4 : 2)
      .map((d) => ({
        type: 'doc',
        id: `dc-${d.id}`,
        title: d.name,
        subtitle: `${d.layer} • ${d.purpose.slice(0, 65)}...`,
        tag: `Doc (${d.tier})`,
        priority: d.priority,
        data: d,
      }))

    // 5. System Quick Actions
    const actions: SearchResultItem[] = []
    if (q.includes('mcp') || q.includes('console') || q.includes('tool') || q.includes('bridge') || q.includes('agent')) {
      actions.push({
        type: 'action',
        id: 'action-webmcp',
        title: 'Open WebMCP Live Agent Console',
        subtitle: 'Inspect client-side tools and test JSON-RPC calls live in browser',
        tag: 'Developer Tool',
        onAction: () => setWebMcpModalOpen(true),
      })
    }
    if (q.includes('stack') || q.includes('basket') || q.includes('export')) {
      actions.push({
        type: 'action',
        id: 'action-stack',
        title: 'View Active Stack & Token Budget',
        subtitle: 'Inspect cherry-picked skills and export Cursor, Claude, or Obsidian configs',
        tag: 'Stack Action',
        onAction: () => setStackModalOpen(true),
      })
    }
    if (q.includes('priority') || q.includes('guide') || q.includes('p0') || q.includes('tax')) {
      actions.push({
        type: 'action',
        id: 'action-priority',
        title: 'Open Priority Taxonomy Guide',
        subtitle: 'Explanation of P0 (Essential), P1 (High), P2 (Medium), and P3 contracts',
        tag: 'Governance',
        onAction: () => setPriorityGuideOpen(true),
      })
    }

    let aggregated: SearchResultItem[] = []
    if (activeTab === 'all') {
      aggregated = [...actions, ...matchedPacks, ...matchedFrameworks, ...matchedSkills, ...matchedConnectors, ...matchedDocs]
    } else if (activeTab === 'packs') {
      aggregated = matchedPacks
    } else if (activeTab === 'frameworks') {
      aggregated = matchedFrameworks
    } else if (activeTab === 'skills') {
      aggregated = matchedSkills
    } else if (activeTab === 'connectors') {
      aggregated = matchedConnectors
    } else if (activeTab === 'docs') {
      aggregated = matchedDocs
    }

    return aggregated
  }, [query, activeTab, frameworks, skills, docs, setWebMcpModalOpen, setStackModalOpen, setPriorityGuideOpen])

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelectItem(results[selectedIndex])
      }
    }
  }

  const handleSelectItem = (item: SearchResultItem) => {
    setCommandPaletteOpen(false)
    if (item.type === 'starter-pack') {
      addStarterPackToStack(item.data.skillIds)
    } else if (item.type === 'action') {
      item.onAction()
    } else if (item.type === 'framework') {
      openFrameworkInspect(item.data)
    } else if (item.type === 'skill') {
      openInspect(item.data)
    } else if (item.type === 'connector') {
      setPillar('marketplace')
    } else if (item.type === 'doc') {
      setPillar('docs')
    }
  }

  if (!isCommandPaletteOpen) return null

  return (
    <div
      onClick={() => setCommandPaletteOpen(false)}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#27272a]">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search 8 starter packs, 113 suites, 326 skills, 1,126 MCPs, docs, or actions..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">
            ESC
          </kbd>
        </div>

        {/* Catalog Scope Filter Tabs */}
        <div className="px-3 py-2 bg-[#111114] border-b border-[#27272a] flex items-center justify-between gap-1 overflow-x-auto text-xs">
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'packs', label: 'Starter Stacks (8)' },
              { id: 'frameworks', label: `Suites (${meta.totalFrameworks || 113})` },
              { id: 'skills', label: `Skills (${meta.totalSkills || 326})` },
              { id: 'connectors', label: 'MCPs (1,126)' },
              { id: 'docs', label: `Docs (${meta.totalDocs || 57})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as PaletteTab)
                  setSelectedIndex(0)
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Jumps */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px]">
            <button
              onClick={() => {
                setPriority('P0')
                setCommandPaletteOpen(false)
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#18181b] text-rose-300 border border-rose-500/30 hover:border-rose-500/60 cursor-pointer font-medium"
            >
              <Sparkles className="w-2.5 h-2.5 text-rose-400" />
              <span>P0</span>
            </button>
            <button
              onClick={() => {
                setEcosystem('android')
                setCommandPaletteOpen(false)
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a] hover:border-zinc-500 cursor-pointer font-medium"
            >
              <Smartphone className="w-2.5 h-2.5 text-zinc-400" />
              <span>Android</span>
            </button>
            <button
              onClick={() => {
                setEcosystem('gsd')
                setCommandPaletteOpen(false)
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a] hover:border-zinc-500 cursor-pointer font-medium"
            >
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              <span>GSD</span>
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">
              No matching resources found for &quot;{query}&quot;. Try broadening your keywords.
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#18181b] text-white border border-[#3f3f46]'
                      : 'text-zinc-300 hover:bg-[#18181b]/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Entity Icon Badge */}
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                        item.type === 'starter-pack'
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                          : item.type === 'action'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : item.type === 'framework'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : item.type === 'skill'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                          : item.type === 'connector'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {item.type === 'starter-pack' && <Sparkles className="w-3.5 h-3.5" />}
                      {item.type === 'action' && <Terminal className="w-3.5 h-3.5" />}
                      {item.type === 'framework' && <Boxes className="w-3.5 h-3.5" />}
                      {item.type === 'skill' && <Zap className="w-3.5 h-3.5" />}
                      {item.type === 'connector' && <Plug className="w-3.5 h-3.5" />}
                      {item.type === 'doc' && <FileText className="w-3.5 h-3.5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-100 truncate text-[13px]">{item.title}</span>
                        {'priority' in item && item.priority && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                              item.priority === 'P0'
                                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                                : 'bg-[#18181b] text-zinc-400 border-[#27272a]'
                            }`}
                          >
                            {item.priority}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0">
                          {item.type.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                      {item.tag}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-zinc-300" />}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2.5 bg-[#111114] border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a] text-zinc-400">↑</kbd>{' '}
              <kbd className="bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a] text-zinc-400">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a] text-zinc-400">↵</kbd> to execute
            </span>
          </div>
          <span className="text-zinc-600">SkillDock Omni-Search • 5 Unified Catalogs</span>
        </div>
      </div>
    </div>
  )
}
