import React, { useState, useMemo } from 'react'
import {
  Search,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Download,
  FileText,
  ArrowUpDown
} from 'lucide-react'
import marketplaceData from '@/data/claude-marketplace-plugins.json'
import type { MarketplacePlugin } from '@/types'

export const ClaudeMarketplaceView: React.FC = () => {
  const [search, setSearch] = useState('')
  const [compatFilter, setCompatFilter] = useState<'all' | 'claude-code' | 'other'>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'community'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'existing' | 'new'>('all')
  const [sortBy, setSortBy] = useState<'installs' | 'name' | 'publisher'>('installs')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const plugins = marketplaceData as MarketplacePlugin[]

  const handleCopy = (cmd: string, slug: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedSlug(slug)
    setTimeout(() => {
      setCopiedSlug(null)
    }, 2000)
  }

  const filteredPlugins = useMemo(() => {
    let list = [...plugins]

    // 1. Text Search
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.made_by.toLowerCase().includes(q) ||
          p.subheading.toLowerCase().includes(q)
      )
    }

    // 2. Compatibility Filter
    if (compatFilter === 'claude-code') {
      list = list.filter((p) => p.works_with.includes('claude-code'))
    } else if (compatFilter === 'other') {
      list = list.filter((p) => !p.works_with.includes('claude-code'))
    }

    // 3. Verified Filter
    if (verifiedFilter === 'verified') {
      list = list.filter((p) => p.anthropic_verified)
    } else if (verifiedFilter === 'community') {
      list = list.filter((p) => !p.anthropic_verified)
    }

    // 4. Status Filter
    if (statusFilter === 'existing') {
      list = list.filter((p) => p.already_in_repo)
    } else if (statusFilter === 'new') {
      list = list.filter((p) => !p.already_in_repo)
    }

    // 5. Sorting
    if (sortBy === 'installs') {
      list.sort((a, b) => (b.installs || 0) - (a.installs || 0))
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'publisher') {
      list.sort((a, b) => a.made_by.localeCompare(b.made_by))
    }

    return list
  }, [plugins, search, compatFilter, verifiedFilter, statusFilter, sortBy])

  const formatInstalls = (num: number | null) => {
    if (num === null || num === undefined) return '-'
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
    return num.toLocaleString()
  }

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-violet-900/40 bg-gradient-to-r from-violet-950/30 via-[#0d1117] to-[#161b22] p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xl font-black text-white flex items-center gap-2">
                <span>🧠</span> Claude Marketplace Plugins Registry
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                530 Plugins Total
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                100% GitHub Source Parity
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete inventory of official and community plugins from the Claude Marketplace. Includes exact CLI installation commands, verified repository source code, author attribution, and compatibility flags across Claude Code and Claude Desktop.
            </p>
          </div>

          {/* Quick Dual-Parity Download Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="claude-marketplace-plugins.csv"
              download="claude-marketplace-plugins.csv"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-sm font-semibold text-slate-200 border border-[#30363d] transition-colors shadow-sm"
              title="Download CSV Edition"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download CSV</span>
            </a>
            <a
              href="claude-marketplace-plugins.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-sm font-semibold text-violet-200 border border-violet-800/60 transition-colors shadow-sm"
              title="Open Markdown Edition"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>View Markdown</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#161b22]/70 border border-[#21262d] rounded-xl p-4 mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 530 plugins by title, slug, publisher, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500/80 transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Compatibility Filter */}
          <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
            <button
              onClick={() => setCompatFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                compatFilter === 'all' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All (530)
            </button>
            <button
              onClick={() => setCompatFilter('claude-code')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                compatFilter === 'claude-code' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Claude Code (312)
            </button>
            <button
              onClick={() => setCompatFilter('other')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                compatFilter === 'other' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              General / Other (218)
            </button>
          </div>

          {/* Repo Status Filter */}
          <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('existing')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'existing' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Existing in Repo (86)
            </button>
            <button
              onClick={() => setStatusFilter('new')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'new' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ✨ New Additions (444)
            </button>
          </div>

          {/* Verified Filter */}
          <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
            <button
              onClick={() => setVerifiedFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                verifiedFilter === 'all' ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setVerifiedFilter('verified')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                verifiedFilter === 'verified' ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ✅ Verified (227)
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] px-2.5 py-1.5 rounded-lg text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="installs" className="bg-[#161b22]">Most Installs</option>
              <option value="name" className="bg-[#161b22]">Name (A-Z)</option>
              <option value="publisher" className="bg-[#161b22]">Publisher</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-400 mb-4 px-1">
        <span>
          Showing <strong>{filteredPlugins.length}</strong> of <strong>{plugins.length}</strong> plugins
        </span>
        <span className="hidden sm:inline text-xs text-slate-500">
          Click the install code box to copy the command
        </span>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPlugins.map((plugin) => {
          const isCopied = copiedSlug === plugin.slug
          return (
            <div
              key={plugin.slug}
              className="rounded-xl border border-[#21262d] bg-[#161b22]/60 hover:bg-[#161b22] hover:border-[#30363d] transition-all p-5 flex flex-col justify-between shadow-sm group"
            >
              <div>
                {/* Card Top Row: Title, Publisher, Installs */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                        {plugin.title}
                      </h3>
                      {plugin.anthropic_verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                      {plugin.already_in_repo ? (
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                          In Matrix
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block font-mono">
                      {plugin.slug} • by <strong className="text-slate-300">{plugin.made_by}</strong>
                    </span>
                  </div>

                  {/* Installs Counter */}
                  {plugin.installs !== null && (
                    <div className="text-right shrink-0 bg-[#0d1117] border border-[#21262d] px-2.5 py-1 rounded-md">
                      <span className="text-xs font-mono font-bold text-violet-300 block">
                        {formatInstalls(plugin.installs)}
                      </span>
                      <span className="text-[10px] uppercase text-slate-500 block font-semibold">installs</span>
                    </div>
                  )}
                </div>

                {/* Subheading / Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {plugin.subheading || 'Official plugin integration for Claude.'}
                </p>

                {/* Compatibility Badges */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {plugin.works_with && plugin.works_with.length > 0 ? (
                    plugin.works_with.map((w) => (
                      <span
                        key={w}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-slate-300 border border-[#30363d]"
                      >
                        {w}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-slate-400 border border-[#30363d]">
                      general
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Install Command & Source Link */}
              <div className="pt-3 border-t border-[#21262d]/80 flex flex-col gap-2.5">
                {/* One-Click Copy Command Box */}
                <button
                  onClick={() => handleCopy(plugin.install_cmd, plugin.slug)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#0d1117] hover:bg-[#090d12] border border-[#30363d] hover:border-violet-500/50 text-left transition-all cursor-pointer group/cmd"
                  title="Click to copy install command"
                >
                  <code className="text-xs font-mono text-slate-300 group-hover/cmd:text-violet-300 truncate">
                    {plugin.install_cmd}
                  </code>
                  <span className="shrink-0 text-slate-400 group-hover/cmd:text-violet-400">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Links */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={plugin.plugin_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-medium transition-colors"
                  >
                    <span>View GitHub Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {plugin.docs_url && (
                    <a
                      href={plugin.docs_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <span>Docs</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
