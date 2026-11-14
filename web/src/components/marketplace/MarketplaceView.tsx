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
  Share2,
  Layers
} from 'lucide-react'
import marketplaceData from '@/data/claude-marketplace-plugins.json'
import agentsProductsData from '@/data/claude-agents-products.json'
import connectorsData from '@/data/claude-connectors-plugins.json'
import type { MarketplacePlugin, MarketplaceAgentProduct, MarketplaceConnector, TargetEcosystem } from '@/types'

const PAGE_SIZE = 20

export const MarketplaceView: React.FC = () => {
  // Mode switcher: Connectors vs Plugins vs Agents & Products
  const [activeSection, setActiveSection] = useState<'connectors' | 'plugins' | 'agents-products'>('connectors')

  // Ecosystem Filter: all | claude | chatgpt | antigravity | cursor | mcp
  const [ecosystemFilter, setEcosystemFilter] = useState<TargetEcosystem>('all')

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
  }, [connectorSearch, connectorTypeFilter, connectorTierFilter, connectorCompatFilter, connectorCategoryFilter, connectorSortBy, ecosystemFilter])

  useEffect(() => {
    setPluginLimit(PAGE_SIZE)
  }, [pluginSearch, compatFilter, verifiedFilter, statusFilter, pluginSortBy, ecosystemFilter])

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

    if (ecosystemFilter !== 'all') {
      list = list.filter((c) => c.ecosystems && c.ecosystems.includes(ecosystemFilter))
    }

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
  }, [connectors, connectorSearch, connectorTypeFilter, connectorTierFilter, connectorCompatFilter, connectorCategoryFilter, connectorSortBy, ecosystemFilter])

  // --- FILTERED PLUGINS (530) ---
  const filteredPlugins = useMemo(() => {
    let list = [...plugins]

    if (ecosystemFilter !== 'all') {
      list = list.filter((p) => p.ecosystems && p.ecosystems.includes(ecosystemFilter))
    }

    if (pluginSearch.trim()) {
      const q = pluginSearch.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subheading.toLowerCase().includes(q) ||
          p.made_by.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      )
    }

    if (compatFilter === 'claude-code') {
      list = list.filter((p) => p.works_with.includes('Claude Code'))
    } else if (compatFilter === 'other') {
      list = list.filter((p) => !p.works_with.includes('Claude Code'))
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
  }, [plugins, pluginSearch, compatFilter, verifiedFilter, statusFilter, pluginSortBy, ecosystemFilter])

  // --- FILTERED AGENTS & PRODUCTS (33) ---
  const agentCategories = useMemo(() => {
    const set = new Set<string>()
    agentsProducts.forEach((item) => {
      if (item.category) set.add(item.category)
    })
    return ['all', ...Array.from(set).sort()]
  }, [agentsProducts])

  const filteredAgents = useMemo(() => {
    let list = [...agentsProducts]

    if (ecosystemFilter !== 'all') {
      list = list.filter((a) => a.ecosystems && a.ecosystems.includes(ecosystemFilter))
    }

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
  }, [agentsProducts, agentSearch, categoryFilter, ecosystemFilter])

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
                <span>🌐</span> Universal AI Marketplace Directory
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                1,689 Listings
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Claude • ChatGPT • Antigravity
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Authoritative catalog covering <strong>1,126 MCP Connectors</strong>, <strong>530 Plugins</strong>, and <strong>33 Enterprise Platforms</strong> with cross-platform bridges for <strong>Anthropic Claude</strong>, <strong>OpenAI ChatGPT Actions</strong>, and <strong>Google Antigravity</strong>.
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
                  title="Download Agents CSV Edition"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download CSV</span>
                </a>
                <a
                  href="Claude-Agents-and-Products-Matrix.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] transition-colors"
                  title="Open Agents Markdown Edition"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View MD</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Target Ecosystem Cross-Platform Filter Ribbon */}
      <div className="mb-6 rounded-lg border border-[#27272a] bg-[#111114] p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300">Target Ecosystem:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setEcosystemFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              ecosystemFilter === 'all'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                : 'bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a]'
            }`}
          >
            All Ecosystems (1,689)
          </button>
          <button
            onClick={() => setEcosystemFilter('claude')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              ecosystemFilter === 'claude'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 font-bold'
                : 'bg-[#18181b] text-zinc-400 hover:text-orange-200 border border-[#27272a]'
            }`}
          >
            <span>🟠</span> Claude & MCP
          </button>
          <button
            onClick={() => setEcosystemFilter('chatgpt')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              ecosystemFilter === 'chatgpt'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold'
                : 'bg-[#18181b] text-zinc-400 hover:text-emerald-200 border border-[#27272a]'
            }`}
          >
            <span>🟢</span> ChatGPT Actions / GPTs
          </button>
          <button
            onClick={() => setEcosystemFilter('antigravity')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              ecosystemFilter === 'antigravity'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 font-bold'
                : 'bg-[#18181b] text-zinc-400 hover:text-blue-200 border border-[#27272a]'
            }`}
          >
            <span>🔵</span> Google Antigravity
          </button>
          <button
            onClick={() => setEcosystemFilter('cursor')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              ecosystemFilter === 'cursor'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 font-bold'
                : 'bg-[#18181b] text-zinc-400 hover:text-purple-200 border border-[#27272a]'
            }`}
          >
            <span>🟣</span> Cursor / VS Code
          </button>
        </div>
      </div>

      {/* 3-Way Mode Switcher Tabs */}
      <div className="flex border-b border-[#27272a] mb-6 gap-2">
        <button
          onClick={() => setActiveSection('connectors')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-sm transition-colors cursor-pointer ${
            activeSection === 'connectors'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>MCP Connectors</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] text-zinc-400 border border-[#27272a]">
            {filteredConnectors.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('plugins')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-sm transition-colors cursor-pointer ${
            activeSection === 'plugins'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Coding Plugins</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] text-zinc-400 border border-[#27272a]">
            {filteredPlugins.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('agents-products')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-sm transition-colors cursor-pointer ${
            activeSection === 'agents-products'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Agents & Platforms</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] text-zinc-400 border border-[#27272a]">
            {filteredAgents.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: MCP CONNECTORS (1,126)                                         */}
      {/* ========================================================================= */}
      {activeSection === 'connectors' && (
        <div>
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={connectorSearch}
                onChange={(e) => setConnectorSearch(e.target.value)}
                placeholder="Search 1,126 MCP servers by name, author, endpoint, or description..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111114] border border-[#27272a] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              {connectorSearch && (
                <button
                  onClick={() => setConnectorSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills Group */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type Filter */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setConnectorTypeFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('remote')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'remote' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Remote
                </button>
                <button
                  onClick={() => setConnectorTypeFilter('local')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTypeFilter === 'local' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Local
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
                  Claude Code
                </button>
                <button
                  onClick={() => setConnectorCompatFilter('claude-desktop')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorCompatFilter === 'claude-desktop' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Desktop
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
                  Anthropic
                </button>
                <button
                  onClick={() => setConnectorTierFilter('partner')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    connectorTierFilter === 'partner' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Partner
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

          {/* Result Count Info */}
          <div className="text-xs font-mono text-zinc-500 mb-4">
            Showing {Math.min(connectorLimit, filteredConnectors.length)} of {filteredConnectors.length} connectors
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredConnectors.slice(0, connectorLimit).map((c) => {
              const isRemote = c.type === 'remote'
              const isCopied = copiedText === c.slug
              const hasChatGpt = c.ecosystems?.includes('chatgpt') || Boolean(c.chatgpt_action_url) || Boolean(c.chatgpt_gpt_url)
              const hasAntigravity = c.ecosystems?.includes('antigravity') || Boolean(c.antigravity_plugin_id)

              return (
                <div
                  key={c._id}
                  className="rounded-lg border border-[#27272a] bg-[#111114] p-4 flex flex-col justify-between hover:border-zinc-500 transition-all duration-200 shadow-xs"
                >
                  <div>
                    {/* Header Row: Icon + Title + Badges */}
                    <div className="flex items-start gap-3 mb-2.5">
                      {c.iconUrl ? (
                        <img
                          src={c.iconUrl}
                          alt={c.title}
                          className="w-9 h-9 rounded-md object-contain bg-[#18181b] border border-[#27272a] p-1 shrink-0"
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

                    {/* Supported Ecosystem Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Claude MCP
                      </span>
                      {hasChatGpt && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <span>🟢</span> ChatGPT Action
                        </span>
                      )}
                      {hasAntigravity && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                          <span>🔵</span> Antigravity
                        </span>
                      )}
                    </div>

                    {/* OneLiner */}
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {c.oneLiner || 'No description provided.'}
                    </p>

                    {/* Endpoint / Action URL Box */}
                    {c.serverUrl && (
                      <div className="mb-2">
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

                    {/* ChatGPT Action Schema Snippet (If Available) */}
                    {c.chatgpt_action_url && (
                      <div className="mb-2">
                        <button
                          onClick={() => handleCopy(c.chatgpt_action_url!, `gpt:${c.slug}`)}
                          className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 transition-colors text-left group"
                          title="Click to copy ChatGPT Action Schema URL"
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-400">ACTION:</span>
                            <span className="truncate">{c.chatgpt_action_url}</span>
                          </span>
                          {copiedText === `gpt:${c.slug}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-300 shrink-0" />
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

                      {c.chatgpt_gpt_url && (
                        <a
                          href={c.chatgpt_gpt_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                          title="Open official Custom GPT in ChatGPT"
                        >
                          <span>GPT</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

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
                          <span>Claude</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load More Button */}
          {connectorLimit < filteredConnectors.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setConnectorLimit((prev) => prev + PAGE_SIZE)}
                className="px-6 py-2.5 rounded-lg bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] text-sm font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                Load Next 20 Connectors ({filteredConnectors.length - connectorLimit} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: CODING PLUGINS (530)                                           */}
      {/* ========================================================================= */}
      {activeSection === 'plugins' && (
        <div>
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={pluginSearch}
                onChange={(e) => setPluginSearch(e.target.value)}
                placeholder="Search 530 plugins by title, publisher, or keywords..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111114] border border-[#27272a] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              {pluginSearch && (
                <button
                  onClick={() => setPluginSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Compatibility */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setCompatFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    compatFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Plugins
                </button>
                <button
                  onClick={() => setCompatFilter('claude-code')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    compatFilter === 'claude-code' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Claude Code (445)
                </button>
              </div>

              {/* Verified */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setVerifiedFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    verifiedFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => setVerifiedFilter('verified')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    verifiedFilter === 'verified' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Verified
                </button>
              </div>

              {/* Status */}
              <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded-md p-0.5">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    statusFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('existing')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    statusFilter === 'existing' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  In Matrix
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] px-2 py-1 rounded-md text-zinc-300">
                <ArrowUpDown className="w-3 h-3 text-zinc-500" />
                <select
                  value={pluginSortBy}
                  onChange={(e) => setPluginSortBy(e.target.value as any)}
                  className="bg-transparent text-[11px] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="installs" className="bg-[#111114]">Installs</option>
                  <option value="name" className="bg-[#111114]">Name (A-Z)</option>
                  <option value="publisher" className="bg-[#111114]">Publisher</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-zinc-500 mb-4">
            Showing {Math.min(pluginLimit, filteredPlugins.length)} of {filteredPlugins.length} plugins
          </div>

          {/* Plugins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredPlugins.slice(0, pluginLimit).map((p) => {
              const isCopied = copiedText === p.slug
              const hasChatGpt = p.ecosystems?.includes('chatgpt') || Boolean(p.chatgpt_action_url) || Boolean(p.chatgpt_gpt_url)

              return (
                <div
                  key={p.slug}
                  className="rounded-lg border border-[#27272a] bg-[#111114] p-4 flex flex-col justify-between hover:border-zinc-500 transition-all duration-200 shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-zinc-100 text-sm truncate" title={p.title}>
                          {p.title}
                        </h3>
                        <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                          by <span className="text-zinc-300 font-medium">{p.made_by}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.anthropic_verified && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Verified
                          </span>
                        )}
                        {p.installs !== null && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                            {formatInstalls(p.installs)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Supported Ecosystem Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Claude Code
                      </span>
                      {hasChatGpt && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <span>🟢</span> ChatGPT Action
                        </span>
                      )}
                      {p.already_in_repo && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          In Matrix
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {p.subheading}
                    </p>

                    {/* Install Command */}
                    <div className="mb-2">
                      <button
                        onClick={() => handleCopy(p.install_cmd, p.slug)}
                        className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] text-[11px] font-mono text-zinc-300 transition-colors text-left group"
                        title="Click to copy install command"
                      >
                        <span className="truncate">{p.install_cmd}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                        )}
                      </button>
                    </div>

                    {/* ChatGPT Action Schema Snippet (If Available) */}
                    {p.chatgpt_action_url && (
                      <div className="mb-2">
                        <button
                          onClick={() => handleCopy(p.chatgpt_action_url!, `plug-gpt:${p.slug}`)}
                          className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 transition-colors text-left group"
                          title="Click to copy ChatGPT Action Schema URL"
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-400">ACTION:</span>
                            <span className="truncate">{p.chatgpt_action_url}</span>
                          </span>
                          {copiedText === `plug-gpt:${p.slug}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-300 shrink-0" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-[#27272a] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {p.works_with.join(', ')}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleCopyShare(p.title)}
                        className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        title="Copy Shareable Link"
                      >
                        {copiedText === `share:${p.title}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {p.docs_url && (
                        <a
                          href={p.docs_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                        >
                          <span>Docs</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={p.marketplace_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors font-medium"
                      >
                        <span>Listing</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {pluginLimit < filteredPlugins.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPluginLimit((prev) => prev + PAGE_SIZE)}
                className="px-6 py-2.5 rounded-lg bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] text-sm font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                Load Next 20 Plugins ({filteredPlugins.length - pluginLimit} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: AGENTS & ENTERPRISE PRODUCTS (33)                              */}
      {/* ========================================================================= */}
      {activeSection === 'agents-products' && (
        <div>
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                placeholder="Search 33 enterprise AI platforms, products, or founders..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111114] border border-[#27272a] text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              {agentSearch && (
                <button
                  onClick={() => setAgentSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {agentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-mono capitalize transition-colors ${
                    categoryFilter === cat
                      ? 'bg-zinc-100 text-zinc-900 font-bold'
                      : 'bg-[#111114] text-zinc-400 hover:text-zinc-200 border border-[#27272a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-zinc-500 mb-4">
            Showing {filteredAgents.length} platforms
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((a) => {
              const hasChatGpt = a.ecosystems?.includes('chatgpt') || Boolean(a.chatgpt_action_url) || Boolean(a.chatgpt_gpt_url)

              return (
                <div
                  key={a.id}
                  className="rounded-xl border border-[#27272a] bg-[#111114] p-5 flex flex-col justify-between hover:border-zinc-500 transition-all duration-200 shadow-xs"
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      {a.logo ? (
                        <img
                          src={a.logo}
                          alt={a.title}
                          className="w-11 h-11 rounded-lg object-contain bg-[#18181b] border border-[#27272a] p-1.5 shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center shrink-0 text-zinc-400">
                          <Building2 className="w-5 h-5" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-white text-base truncate" title={a.title}>
                            {a.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#18181b] text-zinc-300 border border-[#27272a] capitalize">
                            {a.category}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-zinc-400 truncate mt-0.5">{a.tagline}</p>
                      </div>
                    </div>

                    {/* Supported Ecosystem Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Enterprise MCP
                      </span>
                      {hasChatGpt && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <span>🟢</span> ChatGPT Action
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 mb-3.5 line-clamp-3 leading-relaxed">
                      {a.overview}
                    </p>

                    {/* Use cases chips */}
                    {a.use_cases && a.use_cases.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1.5">Core Use Cases:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {a.use_cases.slice(0, 3).map((uc, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[11px] bg-[#18181b] text-zinc-300 border border-[#27272a]"
                            >
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-xs">
                    <span className="text-zinc-500 text-[11px] font-mono truncate max-w-[140px]">
                      {a.how_to_buy || 'Enterprise'}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCopyShare(a.title)}
                        className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        title="Copy Shareable Link"
                      >
                        {copiedText === `share:${a.title}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {a.website && (
                        <a
                          href={a.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors font-medium"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {a.github && (
                        <a
                          href={a.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors font-medium"
                        >
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={a.marketplace_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                      >
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketplaceView
