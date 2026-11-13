import React, { useState, useMemo } from 'react'
import {
  Search,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Download,
  FileText,
  ArrowUpDown,
  Bot,
  Building2,
  Globe,
  Sparkles,
  Server,
  Radio
} from 'lucide-react'
import marketplaceData from '@/data/claude-marketplace-plugins.json'
import agentsProductsData from '@/data/claude-agents-products.json'
import connectorsData from '@/data/claude-connectors-plugins.json'
import type { MarketplacePlugin, MarketplaceAgentProduct, MarketplaceConnector } from '@/types'

export const ClaudeMarketplaceView: React.FC = () => {
  // Mode switcher: Connectors vs Plugins vs Agents & Products
  const [activeSection, setActiveSection] = useState<'connectors' | 'plugins' | 'agents-products'>('connectors')

  // --- CONNECTORS STATE ---
  const [connectorSearch, setConnectorSearch] = useState('')
  const [connectorTypeFilter, setConnectorTypeFilter] = useState<'all' | 'remote' | 'local'>('all')
  const [connectorTierFilter, setConnectorTierFilter] = useState<'all' | 'anthropic' | 'partner'>('all')
  const [connectorCompatFilter, setConnectorCompatFilter] = useState<'all' | 'claude-code' | 'claude-desktop' | 'claude-api'>('all')
  const [connectorCategoryFilter, setConnectorCategoryFilter] = useState<string>('all')
  const [connectorSortBy, setConnectorSortBy] = useState<'popularity' | 'name' | 'author'>('popularity')

  // --- PLUGINS STATE ---
  const [pluginSearch, setPluginSearch] = useState('')
  const [compatFilter, setCompatFilter] = useState<'all' | 'claude-code' | 'other'>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'community'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'existing' | 'new'>('all')
  const [pluginSortBy, setPluginSortBy] = useState<'installs' | 'name' | 'publisher'>('installs')

  // --- AGENTS & PRODUCTS STATE ---
  const [agentSearch, setAgentSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const [copiedText, setCopiedText] = useState<string | null>(null)

  const connectors = connectorsData as MarketplaceConnector[]
  const plugins = marketplaceData as MarketplacePlugin[]
  const agentsProducts = agentsProductsData as MarketplaceAgentProduct[]

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => {
      setCopiedText(null)
    }, 2000)
  }

  // --- FILTERED CONNECTORS (1,126) ---
  const connectorCategories = useMemo(() => {
    const set = new Set<string>()
    connectors.forEach((c) => {
      if (c.categories) {
        c.categories.forEach((cat) => set.add(cat))
      }
    })
    return ['all', ...Array.from(set).sort()]
  }, [connectors])

  const filteredConnectors = useMemo(() => {
    let list = [...connectors]

    if (connectorSearch.trim()) {
      const q = connectorSearch.toLowerCase().trim()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.author.toLowerCase().includes(q) ||
          (c.oneLiner && c.oneLiner.toLowerCase().includes(q)) ||
          (c.serverUrl && c.serverUrl.toLowerCase().includes(q))
      )
    }

    if (connectorTypeFilter !== 'all') {
      list = list.filter((c) => c.type === connectorTypeFilter)
    }

    if (connectorTierFilter === 'anthropic') {
      list = list.filter((c) => c.verifiedTier === 'anthropic')
    } else if (connectorTierFilter === 'partner') {
      list = list.filter((c) => c.verifiedTier === 'partner')
    }

    if (connectorCompatFilter !== 'all') {
      list = list.filter((c) => c.worksWith && c.worksWith.includes(connectorCompatFilter))
    }

    if (connectorCategoryFilter !== 'all') {
      list = list.filter((c) => c.categories && c.categories.includes(connectorCategoryFilter))
    }

    if (connectorSortBy === 'popularity') {
      list.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
    } else if (connectorSortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (connectorSortBy === 'author') {
      list.sort((a, b) => a.author.localeCompare(b.author))
    }

    return list
  }, [
    connectors,
    connectorSearch,
    connectorTypeFilter,
    connectorTierFilter,
    connectorCompatFilter,
    connectorCategoryFilter,
    connectorSortBy
  ])

  // --- FILTERED PLUGINS (530) ---
  const filteredPlugins = useMemo(() => {
    let list = [...plugins]

    if (pluginSearch.trim()) {
      const q = pluginSearch.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.made_by.toLowerCase().includes(q) ||
          p.subheading.toLowerCase().includes(q)
      )
    }

    if (compatFilter === 'claude-code') {
      list = list.filter((p) => p.works_with.includes('claude-code'))
    } else if (compatFilter === 'other') {
      list = list.filter((p) => !p.works_with.includes('claude-code'))
    }

    if (verifiedFilter === 'verified') {
      list = list.filter((p) => p.anthropic_verified)
    } else if (verifiedFilter === 'community') {
      list = list.filter((p) => !p.anthropic_verified)
    }

    if (statusFilter === 'existing') {
      list = list.filter((p) => p.already_in_repo)
    } else if (statusFilter === 'new') {
      list = list.filter((p) => !p.already_in_repo)
    }

    if (pluginSortBy === 'installs') {
      list.sort((a, b) => (b.installs || 0) - (a.installs || 0))
    } else if (pluginSortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (pluginSortBy === 'publisher') {
      list.sort((a, b) => a.made_by.localeCompare(b.made_by))
    }

    return list
  }, [plugins, pluginSearch, compatFilter, verifiedFilter, statusFilter, pluginSortBy])

  // --- FILTERED AGENTS & PRODUCTS (33) ---
  const categories = useMemo(() => {
    const set = new Set<string>()
    agentsProducts.forEach((item) => {
      if (item.category) set.add(item.category)
    })
    return ['all', ...Array.from(set).sort()]
  }, [agentsProducts])

  const filteredAgents = useMemo(() => {
    let list = [...agentsProducts]

    if (agentSearch.trim()) {
      const q = agentSearch.toLowerCase().trim()
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.overview.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== 'all') {
      list = list.filter((a) => a.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    return list
  }, [agentsProducts, agentSearch, categoryFilter])

  const formatInstalls = (num: number | null) => {
    if (num === null || num === undefined) return '-'
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
    return num.toLocaleString()
  }

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'code':
      case 'developer-tools':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
      case 'security':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30'
      case 'infrastructure':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30'
      case 'productivity':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
      case 'creative':
        return 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30'
      case 'financial services':
      case 'financial-services':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30'
      case 'legal':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
      case 'data':
      case 'data-analytics':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30'
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-violet-900/40 bg-gradient-to-r from-violet-950/30 via-[#0d1117] to-[#161b22] p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="text-xl font-black text-white flex items-center gap-2">
                <span>🧠</span> Claude Marketplace Universal Hub
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                1,689 Directory Listings
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                100% Dual-Matrix Parity Verified
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Authoritative catalog covering <strong>1,126 MCP Connectors & Plugins</strong>, <strong>530 Claude Code Plugins</strong>, and <strong>33 Enterprise AI Platforms</strong> across the entire Claude ecosystem.
            </p>
          </div>

          {/* Quick Dual-Parity Download Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {activeSection === 'connectors' && (
              <>
                <a
                  href="Claude-Connectors-and-Plugins-Matrix.csv"
                  download="Claude-Connectors-and-Plugins-Matrix.csv"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-sm font-semibold text-slate-200 border border-[#30363d] transition-colors shadow-sm"
                  title="Download Connectors CSV Edition"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Connectors CSV</span>
                </a>
                <a
                  href="Claude-Connectors-and-Plugins-Matrix.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-sm font-semibold text-violet-200 border border-violet-800/60 transition-colors shadow-sm"
                  title="Open Connectors Markdown Edition"
                >
                  <FileText className="w-4 h-4 text-violet-400" />
                  <span>View Connectors MD</span>
                </a>
              </>
            )}

            {activeSection === 'plugins' && (
              <>
                <a
                  href="claude-marketplace-plugins.csv"
                  download="claude-marketplace-plugins.csv"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-sm font-semibold text-slate-200 border border-[#30363d] transition-colors shadow-sm"
                  title="Download Plugins CSV Edition"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Plugins CSV</span>
                </a>
                <a
                  href="claude-marketplace-plugins.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-sm font-semibold text-violet-200 border border-violet-800/60 transition-colors shadow-sm"
                  title="Open Plugins Markdown Edition"
                >
                  <FileText className="w-4 h-4 text-violet-400" />
                  <span>View Plugins MD</span>
                </a>
              </>
            )}

            {activeSection === 'agents-products' && (
              <>
                <a
                  href="Claude-Agents-and-Products-Matrix.csv"
                  download="Claude-Agents-and-Products-Matrix.csv"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-sm font-semibold text-slate-200 border border-[#30363d] transition-colors shadow-sm"
                  title="Download Agents & Products CSV"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Products CSV</span>
                </a>
                <a
                  href="Claude-Agents-and-Products-Matrix.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-sm font-semibold text-violet-200 border border-violet-800/60 transition-colors shadow-sm"
                  title="Open Markdown Edition"
                >
                  <FileText className="w-4 h-4 text-violet-400" />
                  <span>View Products MD</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* 3-Way Section Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 pt-5 border-t border-[#30363d]/70 relative z-10">
          <button
            onClick={() => setActiveSection('connectors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
              activeSection === 'connectors'
                ? 'bg-cyan-600 text-white shadow-cyan-900/50'
                : 'bg-[#161b22] text-slate-400 hover:text-slate-200 border border-[#30363d]'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Connectors & Plugins</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-black/40 text-cyan-200 font-mono">
              1,126
            </span>
          </button>

          <button
            onClick={() => setActiveSection('plugins')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
              activeSection === 'plugins'
                ? 'bg-violet-600 text-white shadow-violet-900/50'
                : 'bg-[#161b22] text-slate-400 hover:text-slate-200 border border-[#30363d]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Marketplace Plugins</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-black/40 text-violet-200 font-mono">
              530
            </span>
          </button>

          <button
            onClick={() => setActiveSection('agents-products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
              activeSection === 'agents-products'
                ? 'bg-amber-600 text-white shadow-amber-900/50'
                : 'bg-[#161b22] text-slate-400 hover:text-slate-200 border border-[#30363d]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Agents & Products</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-black/40 text-amber-200 font-mono">
              33
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONNECTORS & PLUGINS (1,126)                                   */}
      {/* ========================================================================= */}
      {activeSection === 'connectors' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#161b22]/70 border border-[#21262d] rounded-xl p-4 mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={connectorSearch}
                onChange={(e) => setConnectorSearch(e.target.value)}
                placeholder="Search 1,126 connectors by name, author, endpoint, or description..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              {/* Type Filter */}
              <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
                <button
                  onClick={() => setConnectorTypeFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTypeFilter === 'all' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All (1,126)
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('remote')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTypeFilter === 'remote' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Remote MCP (994)
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('local')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTypeFilter === 'local' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Local MCP (132)
                </button>
              </div>

              {/* Compatibility Filter */}
              <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
                <button
                  onClick={() => setConnectorCompatFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorCompatFilter === 'all' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Apps
                </button>
                <button
                  onClick={() => setConnectorCompatFilter('claude-code')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorCompatFilter === 'claude-code' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Claude Code (847)
                </button>
                <button
                  onClick={() => setConnectorCompatFilter('claude-desktop')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorCompatFilter === 'claude-desktop' ? 'bg-violet-600/30 text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Desktop (872)
                </button>
              </div>

              {/* Tier Filter */}
              <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-1">
                <button
                  onClick={() => setConnectorTierFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTierFilter === 'all' ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Tiers
                </button>
                <button
                  onClick={() => setConnectorTierFilter('anthropic')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTierFilter === 'anthropic' ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Anthropic (10)
                </button>
                <button
                  onClick={() => setConnectorTierFilter('partner')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    connectorTierFilter === 'partner' ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Partner (1,115)
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] px-2.5 py-1.5 rounded-lg text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={connectorSortBy}
                  onChange={(e) => setConnectorSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="popularity" className="bg-[#161b22]">Popularity</option>
                  <option value="name" className="bg-[#161b22]">Name (A-Z)</option>
                  <option value="author" className="bg-[#161b22]">Author</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-thin">
            {connectorCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setConnectorCategoryFilter(cat)}
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors capitalize ${
                  connectorCategoryFilter === cat
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-[#161b22] text-slate-400 hover:text-slate-200 border border-[#30363d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between text-sm text-slate-400 mb-4 px-1">
            <span>
              Showing <strong>{filteredConnectors.length}</strong> of <strong>{connectors.length}</strong> connectors & plugins
            </span>
            <span className="hidden sm:inline text-xs text-slate-500">
              Live Model Context Protocol (MCP) tool endpoints & local integrations
            </span>
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredConnectors.map((c) => {
              const isCopied = copiedText === c.slug
              const isRemote = c.type === 'remote'
              return (
                <div
                  key={c.slug}
                  className="rounded-xl border border-[#21262d] bg-[#0d1117]/90 hover:border-cyan-500/50 transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start gap-3 mb-2.5">
                      {c.iconUrl ? (
                        <img
                          src={c.iconUrl}
                          alt={c.title}
                          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 object-contain p-1 shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                          {isRemote ? <Radio className="w-5 h-5" /> : <Server className="w-5 h-5" />}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-slate-100 text-base truncate" title={c.title}>
                            {c.title}
                          </h3>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold ${
                              isRemote
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                                : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            {isRemote ? 'Remote MCP' : 'Local MCP'}
                          </span>
                          {c.verifiedTier && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 capitalize">
                              {c.verifiedTier}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 mt-0.5 truncate">
                          by <span className="text-slate-300 font-medium">{c.author}</span>
                        </div>
                      </div>
                    </div>

                    {/* OneLiner */}
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {c.oneLiner || 'No description provided.'}
                    </p>

                    {/* Server URL Box (for remote MCPs) */}
                    {c.serverUrl && (
                      <div className="mb-3">
                        <button
                          onClick={() => handleCopy(c.serverUrl!, c.slug)}
                          className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-mono text-cyan-300/90 transition-colors text-left group"
                          title="Click to copy MCP endpoint URL"
                        >
                          <span className="truncate">{c.serverUrl}</span>
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions & Links Bottom Row */}
                  <div className="pt-3 border-t border-[#21262d] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {c.worksWith?.map((w) => (
                          <span
                            key={w}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#161b22] text-slate-400 border border-[#30363d]"
                          >
                            {w}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {c.authorUrl && (
                          <a
                            href={c.authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                            title="Visit Author Website"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {c.directoryUrl && (
                          <a
                            href={c.directoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            title="View on Claude Directory"
                          >
                            <span>Directory</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: MARKETPLACE PLUGINS (530)                                      */}
      {/* ========================================================================= */}
      {activeSection === 'plugins' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#161b22]/70 border border-[#21262d] rounded-xl p-4 mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={pluginSearch}
                onChange={(e) => setPluginSearch(e.target.value)}
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
                  value={pluginSortBy}
                  onChange={(e) => setPluginSortBy(e.target.value as any)}
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

          {/* Plugins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPlugins.map((plugin) => {
              const isCopied = copiedText === plugin.slug
              return (
                <div
                  key={plugin.slug}
                  className="rounded-xl border border-[#21262d] bg-[#0d1117]/90 hover:border-violet-500/50 transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-100 text-base truncate" title={plugin.title}>
                            {plugin.title}
                          </h3>
                          {plugin.anthropic_verified && (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              title="Verified by Anthropic"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}
                          {plugin.already_in_repo && (
                            <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                              In Matrix
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>by {plugin.made_by}</span>
                          {plugin.installs !== null && (
                            <>
                              <span>•</span>
                              <span className="font-mono text-slate-300">{formatInstalls(plugin.installs)} installs</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subheading / Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {plugin.subheading || 'No description provided.'}
                    </p>
                  </div>

                  {/* Actions & Links Bottom Row */}
                  <div className="pt-3 border-t border-[#21262d] flex flex-col gap-2.5">
                    {/* Copy CLI Box */}
                    <button
                      onClick={() => handleCopy(plugin.install_cmd, plugin.slug)}
                      className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-mono text-slate-300 transition-colors text-left group"
                      title="Click to copy CLI command"
                    >
                      <span className="truncate">{plugin.install_cmd}</span>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                      )}
                    </button>

                    {/* Source & Docs Links */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5">
                        {plugin.works_with.map((w) => (
                          <span
                            key={w}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161b22] text-slate-400 border border-[#30363d]"
                          >
                            {w}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={plugin.plugin_source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                          title="View Official Source on GitHub"
                        >
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <a
                          href={plugin.marketplace_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors font-medium"
                          title="View on Claude Marketplace"
                        >
                          <span>Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: AGENTS & PRODUCTS (33)                                         */}
      {/* ========================================================================= */}
      {activeSection === 'agents-products' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#161b22]/70 border border-[#21262d] rounded-xl p-4 mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                placeholder="Search 33 enterprise agents by title, platform, capability, or overview..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors ${
                    categoryFilter === cat
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 font-bold'
                      : 'bg-[#0d1117] text-slate-400 hover:text-slate-200 border border-[#30363d]'
                  }`}
                >
                  {cat === 'all' ? `All (${agentsProducts.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between text-sm text-slate-400 mb-4 px-1">
            <span>
              Showing <strong>{filteredAgents.length}</strong> of <strong>{agentsProducts.length}</strong> enterprise agents & commercial products
            </span>
            <span className="hidden sm:inline text-xs text-amber-400/80 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Anthropic Enterprise Commitments apply to eligible platforms
            </span>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAgents.map((product) => {
              const catBadge = getCategoryColor(product.category)
              return (
                <div
                  key={product.slug}
                  className="rounded-xl border border-[#21262d] bg-[#0d1117]/90 hover:border-amber-500/50 transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start gap-3.5 mb-3">
                      {product.logo ? (
                        <img
                          src={product.logo}
                          alt={product.title}
                          className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 object-contain p-1 shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                          <Building2 className="w-6 h-6" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-100 text-base truncate" title={product.title}>
                            {product.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${catBadge}`}>
                            {product.category}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {product.tagline}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtitle / Pitch */}
                    <p className="text-xs font-medium text-slate-300 mb-3 leading-relaxed">
                      {product.subtitle}
                    </p>

                    {/* Full Overview paragraph */}
                    <div className="bg-[#161b22]/70 rounded-lg p-3 border border-[#21262d] mb-4">
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                        {product.overview}
                      </p>
                    </div>

                    {/* How to Buy / Commitment */}
                    {product.how_to_buy && (
                      <div className="bg-amber-950/20 rounded-lg p-2.5 border border-amber-800/30 mb-4 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-200/90 leading-relaxed">
                          {product.how_to_buy}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions & Links Bottom Row */}
                  <div className="pt-3 border-t border-[#21262d] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {product.website && (
                        <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium"
                          title={`Visit official ${product.title} website`}
                        >
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Website</span>
                        </a>
                      )}

                      {product.github && (
                        <a
                          href={product.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                          title="View GitHub Organization / Repository"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>

                    <a
                      href={product.marketplace_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                      title="View Claude Marketplace Profile"
                    >
                      <span>Claude Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
