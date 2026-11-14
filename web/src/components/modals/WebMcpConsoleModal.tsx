import React, { useState, useEffect } from 'react'
import {
  X,
  Terminal,
  Play,
  Copy,
  Check,
  Code2,
  ArrowRight,
  Clock,
  Activity,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { WEBMCP_TOOLS } from '@/bridge/webmcp'
import { STARTER_PACKS } from '@/data/starterPacks'

export const WebMcpConsoleModal: React.FC = () => {
  const isOpen = useSkillStore((s) => s.isWebMcpModalOpen)
  const setOpen = useSkillStore((s) => s.setWebMcpModalOpen)

  const [selectedTool, setSelectedTool] = useState<string>('search_skills')
  const [queryInput, setQueryInput] = useState('taste-skill')
  const [priorityInput, setPriorityInput] = useState('ALL')
  const [skillIdInput, setSkillIdInput] = useState('taste-skill')
  const [packIdInput, setPackIdInput] = useState('gsd-engine')
  const [assistantInput, setAssistantInput] = useState<'antigravity' | 'claude' | 'codex' | 'git'>('antigravity')
  const [limitInput, setLimitInput] = useState(5)

  const [isRunning, setIsRunning] = useState(false)
  const [responseOutput, setResponseOutput] = useState<string | null>(null)
  const [latencyMs, setLatencyMs] = useState<number | null>(null)
  const [isError, setIsError] = useState(false)
  const [copiedResponse, setCopiedResponse] = useState(false)
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setOpen])

  if (!isOpen) return null

  const currentToolDef = WEBMCP_TOOLS.find((t) => t.name === selectedTool) || WEBMCP_TOOLS[0]

  const getArgsForTool = () => {
    switch (selectedTool) {
      case 'search_skills':
        return { query: queryInput, priority: priorityInput, limit: Number(limitInput) }
      case 'get_skill':
        return { id: skillIdInput }
      case 'list_frameworks':
        return { limit: Number(limitInput) }
      case 'get_starter_packs':
        return {}
      case 'get_stack':
        return {}
      case 'add_to_stack':
        return { skillIds: [skillIdInput] }
      case 'load_starter_pack':
        return { packId: packIdInput }
      case 'clear_stack':
        return {}
      case 'export_stack_cli':
        return { assistant: assistantInput }
      case 'export_swarm_manifest':
        return { format: 'manifest' }
      default:
        return {}
    }
  }

  const currentArgs = getArgsForTool()
  const snippet = `await window.__SKILLDOCK_MCP__.callTool("${selectedTool}", ${JSON.stringify(currentArgs)});`

  const handleExecute = async () => {
    setIsRunning(true)
    setIsError(false)
    setResponseOutput(null)
    const t0 = performance.now()

    try {
      const mcp = (window as any).__SKILLDOCK_MCP__
      if (!mcp || typeof mcp.callTool !== 'function') {
        throw new Error('WebMCP bridge is not initialized on window.__SKILLDOCK_MCP__')
      }

      const res = await mcp.callTool(selectedTool, currentArgs)
      const t1 = performance.now()
      setLatencyMs(Math.round((t1 - t0) * 10) / 10)
      setIsError(Boolean(res.isError))

      if (res.content && res.content[0]) {
        setResponseOutput(res.content[0].text)
      } else {
        setResponseOutput(JSON.stringify(res, null, 2))
      }
    } catch (err: any) {
      const t1 = performance.now()
      setLatencyMs(Math.round((t1 - t0) * 10) / 10)
      setIsError(true)
      setResponseOutput(err?.message || String(err))
    } finally {
      setIsRunning(false)
    }
  }

  const copyResponse = () => {
    if (!responseOutput) return
    navigator.clipboard.writeText(responseOutput)
    setCopiedResponse(true)
    setTimeout(() => setCopiedResponse(false), 1400)
  }

  const copySnippet = () => {
    navigator.clipboard.writeText(snippet)
    setCopiedSnippet(true)
    setTimeout(() => setCopiedSnippet(false), 1400)
  }

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#27272a] bg-[#101014]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">
                  WebMCP Live Agent Diagnostic Console
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  JSON-RPC 2.0 Bridge Active
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Mounted at <code className="text-emerald-300">window.__SKILLDOCK_MCP__</code> for Chrome DevTools & browser coding agents
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body: 2-Column Responsive Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#27272a]">
          {/* Left Column: Tool Selector & Inputs (5 Cols) */}
          <div className="md:col-span-5 p-4 space-y-4 bg-[#0d0d10] overflow-y-auto">
            {/* Tool Selection Menu */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1.5">
                Select WebMCP Endpoint ({WEBMCP_TOOLS.length})
              </label>
              <div className="space-y-1">
                {WEBMCP_TOOLS.map((tool) => {
                  const isSelected = selectedTool === tool.name
                  return (
                    <button
                      key={tool.name}
                      onClick={() => {
                        setSelectedTool(tool.name)
                        setResponseOutput(null)
                        setLatencyMs(null)
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/20 text-blue-200 font-bold border border-blue-500/40 shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b] border border-transparent'
                      }`}
                    >
                      <span className="truncate">{tool.name}</span>
                      {isSelected && <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Tool Description */}
            <div className="p-3 rounded-lg bg-[#141418] border border-[#27272a] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                Tool Specification
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {currentToolDef.description}
              </p>
            </div>

            {/* Input Arguments Form */}
            <div className="p-3 rounded-lg bg-[#141418] border border-[#27272a] space-y-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                Invocation Parameters
              </span>

              {selectedTool === 'search_skills' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Search Query</label>
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Priority</label>
                      <select
                        value={priorityInput}
                        onChange={(e) => setPriorityInput(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                      >
                        <option value="ALL">ALL</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Limit</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={limitInput}
                        onChange={(e) => setLimitInput(Number(e.target.value))}
                        className="w-full bg-[#18181b] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(selectedTool === 'get_skill' || selectedTool === 'add_to_stack') && (
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Skill ID</label>
                  <input
                    type="text"
                    value={skillIdInput}
                    onChange={(e) => setSkillIdInput(e.target.value)}
                    placeholder="e.g. taste-skill, unslop, camerax"
                    className="w-full bg-[#18181b] border border-[#27272a] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {['taste-skill', 'unslop', 'camerax', 'systematic-debugging'].map((suggest) => (
                      <button
                        key={suggest}
                        onClick={() => setSkillIdInput(suggest)}
                        className="text-[10px] font-mono text-zinc-400 bg-[#18181b] hover:text-white px-1.5 py-0.5 rounded border border-[#27272a] cursor-pointer"
                      >
                        {suggest}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTool === 'load_starter_pack' && (
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Starter Pack Suite</label>
                  <select
                    value={packIdInput}
                    onChange={(e) => setPackIdInput(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                  >
                    {STARTER_PACKS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.icon} {p.title} ({p.skillIds.length} skills)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedTool === 'export_stack_cli' && (
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Target Assistant Format</label>
                  <select
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value as any)}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option value="antigravity">Antigravity (/slash-commands)</option>
                    <option value="claude">Claude Code (npx skills add)</option>
                    <option value="codex">Codex / Cursor Agent</option>
                    <option value="git">CLI Stand-alone Script</option>
                  </select>
                </div>
              )}

              {['get_starter_packs', 'get_stack', 'clear_stack', 'export_swarm_manifest'].includes(selectedTool) && (
                <p className="text-[11px] text-zinc-500 font-mono">
                  No input arguments required. Endpoint executes dynamically against active catalog and store state.
                </p>
              )}

              {/* Action Button */}
              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Executing Tool...' : 'Execute Tool Call'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Output & Agent Integration Code (7 Cols) */}
          <div className="md:col-span-7 p-4 flex flex-col justify-between space-y-4 bg-[#09090b] overflow-y-auto">
            <div className="space-y-3">
              {/* Output Header with Latency & Status */}
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider">
                    Response Payload
                  </span>
                  {latencyMs !== null && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {latencyMs}ms
                    </span>
                  )}
                  {responseOutput && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded font-semibold ${
                        isError ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'
                      }`}
                    >
                      {isError ? 'ERROR' : '200 OK'}
                    </span>
                  )}
                </div>

                {responseOutput && (
                  <button
                    onClick={copyResponse}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white cursor-pointer transition-colors"
                  >
                    {copiedResponse ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedResponse ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {/* Response Code Block */}
              <div className="rounded-xl border border-[#27272a] bg-[#111114] p-3 min-h-[220px] max-h-[360px] overflow-y-auto font-mono text-xs">
                {responseOutput ? (
                  <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed select-all">
                    {responseOutput}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12 space-y-2">
                    <Terminal className="w-6 h-6 text-zinc-600" />
                    <span>Select an endpoint and click &quot;Execute Tool Call&quot; to test.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Agent Integration Snippet Box */}
            <div className="p-3 rounded-xl bg-[#111114] border border-[#27272a] space-y-1.5 shrink-0">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Agent DevTools Snippet</span>
                </span>
                <button
                  onClick={copySnippet}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy JS'}</span>
                </button>
              </div>
              <div className="p-2 rounded-md bg-[#09090b] border border-[#27272a] font-mono text-[11px] text-blue-300 overflow-x-auto whitespace-pre select-all">
                {snippet}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
