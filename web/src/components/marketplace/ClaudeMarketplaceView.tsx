import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Check,
  Copy,
  ExternalLink,
  Download,
  FileText,
  ArrowUpDown,
  Bot,
  Building2,
  Globe,
  Server,
  Radio,
  ChevronDown,
  Share2
} from 'lucide-react'
import marketplaceData from '@/data/claude-marketplace-plugins.json'
import agentsProductsData from '@/data/claude-agents-products.json'
import connectorsData from '@/data/claude-connectors-plugins.json'
import type { MarketplacePlugin, MarketplaceAgentProduct, MarketplaceConnector } from '@/types'

const PAGE_SIZE = 20

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
  const [connectorLimit, setConnectorLimit] = useState(PAGE_SIZE)

  // --- PLUGINS STATE ---
  const [pluginSearch, setPluginSearch] = useState('')
  const [compatFilter, setCompatFilter] = useState<'all' | 'claude-code' | 'other'>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'community'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'existing' | 'new'>('all')
  const [pluginSortBy, setPluginSortBy] = useState<'installs' | 'name' | 'publisher'>('installs')
  const [pluginLimit, setPluginLimit] = useState(PAGE_SIZE)

  // --- AGENTS & PRODUCTS STATE ---
  const [agentSearch, setAgentSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const [copiedText, setCopiedText] = useState<string | null>(null)

  const connectors = connectorsData as MarketplaceConnector[]
  const plugins = marketplaceData as MarketplacePlugin[]
  const agentsProducts = agentsProductsData as MarketplaceAgentProduct[]

  // Reset pagination when filters change
  useEffect(() => {
    setConnectorLimit(PAGE_SIZE)
  }, [connectorSearch, connectorTypeFilter, connectorTierFilter, connectorCompatFilter, connectorCategoryFilter, connectorSortBy])

  useEffect(() => {
    setPluginLimit(PAGE_SIZE)
  }, [pluginSearch, compatFilter, verifiedFilter, statusFilter, pluginSortBy])

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => {
      setCopiedText(null)
    }, 1800)
  }

  const handleCopyShare = (term: string) => {
    const url = `${window.location.origin}${window.location.pathname}?pillar=marketplace&q=${encodeURIComponent(term)}`
    navigator.clipboard.writeText(url)
    setCopiedText(`share:${term}`)
    setTimeout(() => {
      setCopiedText(null)
    }, 1800)
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

  // Visible connectors (sliced for 60fps performance)
  const visibleConnectors = useMemo(() => {
    return filteredConnectors.slice(0, connectorLimit)
  }, [filteredConnectors, connectorLimit])

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

  const visiblePlugins = useMemo(() => {
    return filteredPlugins.slice(0, pluginLimit)
  }, [filteredPlugins, pluginLimit])

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

  const formatInstalls = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
    return num.toLocaleString()
  }

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
      {/* Editorial Header Banner */}
      <div className="rounded-xl border border-[#27272a] bg-[#111114] p-6 mb-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>🧠</span> Claude Marketplace Directory
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                1,689 Listings
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Dual-Parity
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Authoritative catalog covering <strong>1,126 MCP Connectors</strong>, <strong>530 Claude Plugins</strong>, and <strong>33 Enterprise Platforms</strong> with live endpoints and activation CLI commands.
            </p>
          </div>

          {/* Quick Dual-Parity Download Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {activeSection === 'connectors' && (
              <>
                <a
                  href="Claude-Connectors-and-Plugins-Matrix.csv"
                  download="Claude-Connectors-and-Plugins-Matrix.csv"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Download Connectors CSV Edition"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download CSV</span>
                </a>
                <a
                  href="Claude-Connectors-and-Plugins-Matrix.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Open Connectors Markdown Edition"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View MD</span>
                </a>
              </>
            )}

            {activeSection === 'plugins' && (
              <>
                <a
                  href="claude-marketplace-plugins.csv"
                  download="claude-marketplace-plugins.csv"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Download Plugins CSV Edition"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download CSV</span>
                </a>
                <a
                  href="claude-marketplace-plugins.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Open Plugins Markdown Edition"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View MD</span>
                </a>
              </>
            )}

            {activeSection === 'agents-products' && (
              <>
                <a
                  href="Claude-Agents-and-Products-Matrix.csv"
                  download="Claude-Agents-and-Products-Matrix.csv"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Download Agents & Products CSV"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download CSV</span>
                </a>
                <a
                  href="Claude-Agents-and-Products-Matrix.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Open Markdown Edition"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View MD</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* 3-Way Segmented Switcher Tabs (Craft Grid Style) */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#27272a] relative z-10">
          <div className="inline-flex rounded-lg border border-[#27272a] bg-[#09090b] p-1">
            <button
              onClick={() => setActiveSection('connectors')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeSection === 'connectors'
                  ? 'bg-zinc-100 text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Connectors & Plugins</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeSection === 'connectors' ? 'bg-zinc-300 text-zinc-900' : 'bg-[#18181b] text-zinc-400'}`}>
                1,126
              </span>
            </button>

            <button
              onClick={() => setActiveSection('plugins')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeSection === 'plugins'
                  ? 'bg-zinc-100 text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Marketplace Plugins</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeSection === 'plugins' ? 'bg-zinc-300 text-zinc-900' : 'bg-[#18181b] text-zinc-400'}`}>
                530
              </span>
            </button>

            <button
              onClick={() => setActiveSection('agents-products')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeSection === 'agents-products'
                  ? 'bg-zinc-100 text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Agents & Products</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeSection === 'agents-products' ? 'bg-zinc-300 text-zinc-900' : 'bg-[#18181b] text-zinc-400'}`}>
                33
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONNECTORS & PLUGINS (1,126)                                   */}
      {/* ========================================================================= */}
      {activeSection === 'connectors' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#111114] border border-[#27272a] rounded-xl p-3 mb-4 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
            {/* Search input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={connectorSearch}
                onChange={(e) => setConnectorSearch(e.target.value)}
                placeholder="Search 1,126 connectors by name, author, endpoint, or description..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Type Filter */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setConnectorTypeFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All (1,126)
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('remote')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'remote' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Remote MCP (994)
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('local')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'local' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Local MCP (132)
                </button>
              </div>

              {/* Compatibility Filter */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setConnectorCompatFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorCompatFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Apps
                </button>
                <button
                  onClick={() => setConnectorCompatFilter('claude-code')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorCompatFilter === 'claude-code' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Claude Code (847)
                </button>
                <button
                  onClick={() => setConnectorCompatFilter('claude-desktop')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorCompatFilter === 'claude-desktop' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Desktop (872)
                </button>
              </div>

              {/* Tier Filter */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setConnectorTierFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTierFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Tiers
                </button>
                <button
                  onClick={() => setConnectorTierFilter('anthropic')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTierFilter === 'anthropic' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Anthropic (10)
                </button>
                <button
                  onClick={() => setConnectorTierFilter('partner')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTierFilter === 'partner' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Partner (1,115)
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] px-2 py-1 rounded-md text-zinc-300">
                <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                <select
                  value={connectorSortBy}
                  onChange={(e) => setConnectorSortBy(e.target.value as any)}
                  className="bg-transparent text-[11px] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="popularity" className="bg-[#111114]">Popularity</option>
                  <option value="name" className="bg-[#111114]">Name (A-Z)</option>
                  <option value="author" className="bg-[#111114]">Author</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 no-scrollbar">
            {connectorCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setConnectorCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors capitalize ${
                  connectorCategoryFilter === cat
                    ? 'bg-zinc-100 text-zinc-900 font-bold'
                    : 'bg-[#111114] text-zinc-400 hover:text-zinc-200 border border-[#27272a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Counter Header */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 px-1">
            <span>
              Showing <strong>{visibleConnectors.length}</strong> of <strong>{filteredConnectors.length}</strong> connectors
            </span>
            <span className="hidden sm:inline text-[11px] text-zinc-500 font-mono">
              Live Model Context Protocol (MCP) endpoints
            </span>
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {visibleConnectors.map((c) => {
              const isCopied = copiedText === c.slug
              const isRemote = c.type === 'remote'
              return (
                <div
                  key={c.slug}
                  className="rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161a] hover:border-zinc-500 transition-all duration-150 p-4 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start gap-3 mb-2">
                      {c.iconUrl ? (
                        <img
                          src={c.iconUrl}
                          alt={c.title}
                          className="w-9 h-9 rounded-md bg-white/5 border border-white/10 object-contain p-1 shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center shrink-0 text-zinc-400">
                          {isRemote ? <Radio className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-zinc-100 text-sm truncate" title={c.title}>
                            {c.title}
                          </h3>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                            {isRemote ? 'Remote' : 'Local'}
                          </span>
                          {c.verifiedTier && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 capitalize">
                              {c.verifiedTier}
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                          by <span className="text-zinc-300 font-medium">{c.author}</span>
                        </div>
                      </div>
                    </div>

                    {/* OneLiner */}
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {c.oneLiner || 'No description provided.'}
                    </p>

                    {/* Server URL Box (for remote MCPs) */}
                    {c.serverUrl && (
                      <div className="mb-3">
                        <button
                          onClick={() => handleCopy(c.serverUrl!, c.slug)}
                          className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] text-[11px] font-mono text-zinc-300 transition-colors text-left group"
                          title="Click to copy MCP endpoint URL"
                        >
                          <span className="truncate">{c.serverUrl}</span>
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions & Links Bottom Row */}
                  <div className="pt-2.5 border-t border-[#27272a] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {c.worksWith?.map((w) => (
                        <span
                          key={w}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#18181b] text-zinc-500 border border-[#27272a]"
                        >
                          {w}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleCopyShare(c.title)}
                        className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        title="Copy Shareable Link"
                      >
                        {copiedText === `share:${c.title}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {c.authorUrl && (
                        <a
                          href={c.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                          title="Visit Author Website"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {c.directoryUrl && (
                        <a
                          href={c.directoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors font-medium"
                          title="View on Claude Directory"
                        >
                          <span>Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progressive Load More Button */}
          {filteredConnectors.length > visibleConnectors.length && (
            <div className="mt-8 mb-6 flex flex-col items-center justify-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setConnectorLimit((prev) => prev + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-xs font-semibold text-zinc-100 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-all cursor-pointer group"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
                  <span>Load More Connectors (+{Math.min(PAGE_SIZE, filteredConnectors.length - visibleConnectors.length)})</span>
                </button>

                <button
                  onClick={() => setConnectorLimit(filteredConnectors.length)}
                  className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200 border border-[#27272a] text-xs font-mono transition-colors cursor-pointer"
                >
                  Show All ({filteredConnectors.length})
                </button>
              </div>
              <p className="text-[11px] font-mono text-zinc-500">
                Showing {visibleConnectors.length} of {filteredConnectors.length} connectors
              </p>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: MARKETPLACE PLUGINS (530)                                      */}
      {/* ========================================================================= */}
      {activeSection === 'plugins' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#111114] border border-[#27272a] rounded-xl p-3 mb-4 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
            {/* Search input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={pluginSearch}
                onChange={(e) => setPluginSearch(e.target.value)}
                placeholder="Search 530 plugins by title, slug, publisher, or description..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setCompatFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    compatFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All (530)
                </button>
                <button
                  onClick={() => setCompatFilter('claude-code')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    compatFilter === 'claude-code' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Claude Code (312)
                </button>
              </div>

              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    statusFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => setStatusFilter('existing')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    statusFilter === 'existing' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  In Repo (86)
                </button>
                <button
                  onClick={() => setStatusFilter('new')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    statusFilter === 'new' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  New (444)
                </button>
              </div>

              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setVerifiedFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    verifiedFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setVerifiedFilter('verified')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    verifiedFilter === 'verified' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Verified (227)
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] px-2 py-1 rounded-md text-zinc-300">
                <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                <select
                  value={pluginSortBy}
                  onChange={(e) => setPluginSortBy(e.target.value as any)}
                  className="bg-transparent text-[11px] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="installs" className="bg-[#111114]">Most Installs</option>
                  <option value="name" className="bg-[#111114]">Name (A-Z)</option>
                  <option value="publisher" className="bg-[#111114]">Publisher</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Counter Header */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 px-1">
            <span>
              Showing <strong>{visiblePlugins.length}</strong> of <strong>{filteredPlugins.length}</strong> plugins
            </span>
          </div>

          {/* Plugins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {visiblePlugins.map((plugin) => {
              const isCopied = copiedText === plugin.slug
              return (
                <div
                  key={plugin.slug}
                  className="rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161a] hover:border-zinc-500 transition-all duration-150 p-4 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center shrink-0 text-zinc-300 font-bold text-xs">
                        {plugin.title.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-zinc-100 text-sm truncate" title={plugin.title}>
                            {plugin.title}
                          </h3>
                          {plugin.anthropic_verified && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                          by <span className="text-zinc-300 font-medium">{plugin.made_by}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subheading */}
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {plugin.subheading || 'No description provided.'}
                    </p>

                    {/* Install Command */}
                    <div className="mb-3">
                      <button
                        onClick={() => handleCopy(plugin.install_cmd, plugin.slug)}
                        className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] text-[11px] font-mono text-zinc-300 transition-colors text-left group cursor-pointer"
                        title="Click to copy install command"
                      >
                        <span className="truncate">{plugin.install_cmd}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-2.5 border-t border-[#27272a] flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono text-[11px]">
                      {formatInstalls(plugin.installs || 0)} installs
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleCopyShare(plugin.title)}
                        className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        title="Copy Shareable Link"
                      >
                        {copiedText === `share:${plugin.title}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={plugin.marketplace_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                      >
                        <span>Claude Hub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progressive Load More Button */}
          {filteredPlugins.length > visiblePlugins.length && (
            <div className="mt-8 mb-6 flex flex-col items-center justify-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setPluginLimit((prev) => prev + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-xs font-semibold text-zinc-100 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-all cursor-pointer group"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
                  <span>Load More Plugins (+{Math.min(PAGE_SIZE, filteredPlugins.length - visiblePlugins.length)})</span>
                </button>

                <button
                  onClick={() => setPluginLimit(filteredPlugins.length)}
                  className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200 border border-[#27272a] text-xs font-mono transition-colors cursor-pointer"
                >
                  Show All ({filteredPlugins.length})
                </button>
              </div>
              <p className="text-[11px] font-mono text-zinc-500">
                Showing {visiblePlugins.length} of {filteredPlugins.length} plugins
              </p>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: ENTERPRISE AGENTS & PRODUCTS (33)                             */}
      {/* ========================================================================= */}
      {activeSection === 'agents-products' && (
        <>
          {/* Filter & Search Toolbar */}
          <div className="bg-[#111114] border border-[#27272a] rounded-xl p-3 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                placeholder="Search 33 enterprise agents by platform name, category, or capability..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-md bg-[#09090b] border border-[#27272a] text-zinc-300 text-xs focus:outline-none cursor-pointer capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#111114]">
                    {cat === 'all' ? 'All Categories (33)' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {filteredAgents.map((product) => (
              <div
                key={product.slug}
                className="rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161a] hover:border-zinc-500 transition-all duration-150 p-4 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    {product.logo ? (
                      <img
                        src={product.logo}
                        alt={product.title}
                        className="w-10 h-10 rounded-md bg-white/5 border border-white/10 object-contain p-1 shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center shrink-0 text-zinc-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-zinc-100 text-sm truncate" title={product.title}>
                          {product.title}
                        </h3>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                          {product.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                        {product.tagline}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  <div className="bg-[#18181b] rounded-md p-2.5 border border-[#27272a] mb-3">
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {product.overview}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#27272a] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {product.website && (
                      <a
                        href={product.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        <span>Website</span>
                      </a>
                    )}
                    {product.github && (
                      <a
                        href={product.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
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
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors font-medium"
                  >
                    <span>Claude Hub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
