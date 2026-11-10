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
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <FileText className="w-3.5 h-3.5" />
              <span>Universal Project Documentation Standard · Layer 15</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc]">
              Living Project Documentation Specs & Scaffolding
            </h2>
            <p className="text-sm sm:text-base text-[#8b949e] max-w-3xl leading-relaxed">
              Standardized schemas for PRD, BRD, Architecture, ADRs, Rules, and Test Strategies.
              Scaffold any document directly into your project using the official CLI injector.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
              <div className="text-2xl font-bold font-mono text-emerald-400">{docs.length}</div>
              <div className="text-xs text-[#8b949e] uppercase font-semibold">Standard Docs</div>
            </div>
          </div>
        </div>

        {/* Search & Tier Filters */}
        <div className="mt-6 pt-6 border-t border-[#21262d] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tier Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTier === t.id
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-xs'
                    : 'bg-[#0d1117]/60 hover:bg-[#0d1117] text-[#8b949e] hover:text-[#c9d1d9] border-[#30363d]/60'
                }`}
              >
                <span>{t.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#161b22] text-[#8b949e]">
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents (PRD, ADR, Rules)..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#0d1117] border border-[#30363d] rounded-lg text-[#f0f6fc] placeholder-[#8b949e] focus:outline-hidden focus:border-emerald-500/60 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col justify-between bg-[#161b22]/70 hover:bg-[#161b22] border border-[#30363d]/80 hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-200"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-[#8b949e] truncate max-w-[200px]">
                  {doc.layer}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                    doc.priority === 'P0'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : doc.priority === 'P1'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  }`}
                >
                  {doc.priority}
                </span>
              </div>

              {/* Doc Title */}
              <h3 className="text-base font-bold text-[#f0f6fc] mb-2 font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{doc.name}</span>
              </h3>

              {/* Purpose */}
              <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-3 mb-4">
                {doc.purpose}
              </p>
            </div>

            {/* Scaffolding Command */}
            <div className="pt-3 border-t border-[#21262d]">
              <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
                  <span className="text-[#c9d1d9] truncate select-all">{doc.scaffoldCmd}</span>
                </div>
                <button
                  onClick={() => handleCopy(doc.id, doc.scaffoldCmd)}
                  className="shrink-0 p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
                  title="Copy scaffolding command"
                >
                  {copiedId === doc.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
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
