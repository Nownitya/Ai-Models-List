import React, { useState, useEffect } from 'react'
import {
  X,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Terminal,
  Cpu,
  Lock,
  Layers,
  FileCode,
  CheckCircle2,
} from 'lucide-react'
import type { SavedStackItem, Skill } from '@/types'
import {
  generateAgentDockerfile,
  generateAgentCompose,
  DOCKER_SECURITY_SPEC,
} from '@/utils/dockerExporter'

interface DockerSandboxModalProps {
  isOpen: boolean
  onClose: () => void
  stack: (Skill | SavedStackItem)[]
}

export const DockerSandboxModal: React.FC<DockerSandboxModalProps> = ({
  isOpen,
  onClose,
  stack,
}) => {
  const [activeTab, setActiveTab] = useState<'dockerfile' | 'compose'>('dockerfile')
  const [copiedDockerfile, setCopiedDockerfile] = useState(false)
  const [copiedCompose, setCopiedCompose] = useState(false)
  const [copiedQuickCommand, setCopiedQuickCommand] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const dockerfileContent = generateAgentDockerfile(stack)
  const composeContent = generateAgentCompose(stack)

  const copyDockerfile = () => {
    navigator.clipboard.writeText(dockerfileContent)
    setCopiedDockerfile(true)
    setTimeout(() => setCopiedDockerfile(false), 1600)
  }

  const copyCompose = () => {
    navigator.clipboard.writeText(composeContent)
    setCopiedCompose(true)
    setTimeout(() => setCopiedCompose(false), 1600)
  }

  const copyQuickCommand = () => {
    navigator.clipboard.writeText('docker compose -f compose.agent.yml up -d')
    setCopiedQuickCommand(true)
    setTimeout(() => setCopiedQuickCommand(false), 1600)
  }

  const downloadDockerfile = () => {
    const blob = new Blob([dockerfileContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Dockerfile.agent'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadCompose = () => {
    const blob = new Blob([composeContent], { type: 'text/yaml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'compose.agent.yml'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadBoth = () => {
    downloadDockerfile()
    setTimeout(downloadCompose, 300)
  }

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0c0c0e] border border-[#27272a] rounded-2xl shadow-2xl flex flex-col h-[88vh] max-h-[820px] overflow-hidden transition-all duration-200"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#111114] flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white truncate">
                Sandboxed Agent Docker Exporter
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Non-Root UID {DOCKER_SECURITY_SPEC.uid}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 truncate">
              Enterprise runtime boundaries preventing destructive commands (<code className="text-rose-300">rm -rf</code>) and credential exfiltration.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Invariants Telemetry Strip */}
        <div className="px-6 py-3 bg-[#141418] border-b border-[#27272a] grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d0d10] border border-cyan-500/20">
            <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-500 uppercase">User Privilege</div>
              <div className="text-white font-bold truncate">non-root (1001)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d0d10] border border-emerald-500/20">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-500 uppercase">RAM / CPU Cap</div>
              <div className="text-white font-bold truncate">{DOCKER_SECURITY_SPEC.memoryLimit} / {DOCKER_SECURITY_SPEC.cpuLimit} cores</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d0d10] border border-purple-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-500 uppercase">Linux Caps</div>
              <div className="text-white font-bold truncate">ALL dropped</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0d0d10] border border-amber-500/20">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-500 uppercase">Git Config</div>
              <div className="text-white font-bold truncate">read-only bind</div>
            </div>
          </div>
        </div>

        {/* Tab Selector & Quick Action Bar */}
        <div className="px-6 py-2.5 bg-[#111114] border-b border-[#27272a] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="inline-flex rounded-lg bg-zinc-900 border border-[#27272a] p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('dockerfile')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeTab === 'dockerfile'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Dockerfile.agent</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('compose')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeTab === 'compose'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>compose.agent.yml</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyQuickCommand}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 border border-zinc-700/60 cursor-pointer"
              title="Copy docker compose command"
            >
              {copiedQuickCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3 text-cyan-400" />}
              <span className="hidden sm:inline">docker compose up -d</span>
            </button>

            {activeTab === 'dockerfile' ? (
              <button
                type="button"
                onClick={copyDockerfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
              >
                {copiedDockerfile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDockerfile ? 'Copied Dockerfile!' : 'Copy Dockerfile'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={copyCompose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
              >
                {copiedCompose ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCompose ? 'Copied Compose!' : 'Copy Compose'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Code Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0c]">
          <pre className="font-mono text-xs leading-relaxed text-zinc-300 whitespace-pre bg-[#111115] border border-[#27272a] p-4 rounded-xl overflow-x-auto selection:bg-cyan-900/60 selection:text-cyan-200">
            {activeTab === 'dockerfile' ? dockerfileContent : composeContent}
          </pre>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-3 border-t border-[#27272a] bg-[#111114] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ready for production containers. Zero root vulnerabilities.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadDockerfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-[#27272a] hover:border-zinc-500 text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dockerfile.agent</span>
            </button>

            <button
              type="button"
              onClick={downloadCompose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-[#27272a] hover:border-zinc-500 text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>compose.agent.yml</span>
            </button>

            <button
              type="button"
              onClick={downloadBoth}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-zinc-950" />
              <span>Download Both Files</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
