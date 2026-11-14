import React, { useState, useMemo } from 'react'
import { FileText, Copy, Check, Terminal, Search } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const ProjectDocsView: React.FC = () => {
  const docs = useSkillStore((s) => s.docs)
  const [search, setSearch] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('ALL')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const tiers = [
    { id: 'ALL', label: 'All Docs', count: docs.length },
    { id: 'product', label: 'Product & Scope', count: docs.filter((d) => d.tier === 'product').length },
    { id: 'architecture', label: 'Architecture', count: docs.filter((d) => d.tier === 'architecture').length },
    { id: 'governance', label: 'AI Governance', count: docs.filter((d) => d.tier === 'governance').length },
    { id: 'quality', label: 'Testing & Quality', count: docs.filter((d) => d.tier === 'quality').length },
    { id: 'strategy', label: 'Business Strategy', count: docs.filter((d) => d.tier === 'strategy').length },
    { id: 'foundation', label: 'Foundation', count: docs.filter((d) => d.tier === 'foundation').length },
  ]

  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesSearch =
        search.trim() === '' ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.purpose.toLowerCase().includes(search.toLowerCase()) ||
        doc.layer.toLowerCase().includes(search.toLowerCase())

      const matchesTier = selectedTier === 'ALL' || doc.tier === selectedTier

      return matchesSearch && matchesTier
    })
  }, [docs, search, selectedTier])

  const handleCopy = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1600)
  }

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-[#111114] border border-[#27272a] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] text-zinc-300 border border-[#27272a]">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Universal Project Documentation Standard · Layer 15</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Living Project Documentation Specs & Scaffolding
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Standardized schemas for PRD, BRD, Architecture, ADRs, Rules, and Test Strategies.
              Scaffold any document directly into your project using the official CLI injector.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#09090b] border border-[#27272a] text-center">
              <div className="text-2xl font-bold font-mono text-zinc-100">{docs.length}</div>
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Standard Docs</div>
            </div>
          </div>
        </div>

        {/* Search & Tier Filters */}
        <div className="mt-5 pt-5 border-t border-[#27272a] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tier Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTier === t.id
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-bold'
                    : 'bg-[#18181b] hover:bg-[#27272a] text-zinc-400 hover:text-zinc-200 border-[#27272a]'
                }`}
              >
                <span>{t.label}</span>
                <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-[#09090b] text-zinc-400">
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents (PRD, ADR, Rules)..."
              className="w-full pl-8 pr-4 py-1.5 text-xs bg-[#09090b] border border-[#27272a] rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col justify-between bg-[#111114] hover:bg-[#16161a] border border-[#27272a] hover:border-zinc-500 rounded-xl p-4 transition-all duration-150 shadow-2xs"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[200px]">
                  {doc.layer}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    doc.priority === 'P0'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : doc.priority === 'P1'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-[#18181b] text-zinc-400 border-[#27272a]'
                  }`}
                >
                  {doc.priority}
                </span>
              </div>

              {/* Doc Title */}
              <h3 className="text-sm font-bold text-zinc-100 mb-1.5 font-mono flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{doc.name}</span>
              </h3>

              {/* Purpose */}
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-3">
                {doc.purpose}
              </p>
            </div>

            {/* Scaffolding Command */}
            <div className="pt-2.5 border-t border-[#27272a]">
              <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-xs font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span className="text-zinc-300 text-[11px] truncate select-all">{doc.scaffoldCmd}</span>
                </div>
                <button
                  onClick={() => handleCopy(doc.id, doc.scaffoldCmd)}
                  className="shrink-0 p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy scaffolding command"
                >
                  {copiedId === doc.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
