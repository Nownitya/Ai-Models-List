import React, { useState, useMemo } from 'react'
import {
  X,
  Sparkles,
  Upload,
  FileCode,
  Check,
  ArrowRight,
  Zap,
  Copy,
  GitBranch,
  Loader2,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { analyzeProjectManifest, fetchGitHubManifest, type RecommendationResult } from '@/utils/projectRecommender'
import { CopyButton } from '@/components/common/CopyButton'

const SAMPLE_PRESETS: { name: string; filename: string; content: string }[] = [
  {
    name: 'Next.js + Tailwind + Prisma',
    filename: 'package.json',
    content: JSON.stringify(
      {
        name: 'my-modern-saas',
        version: '0.1.0',
        dependencies: {
          next: '^15.1.0',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@prisma/client': '^6.2.0',
          'better-auth': '^1.1.0',
          tailwindcss: '^4.0.0',
        },
        devDependencies: {
          typescript: '^5.7.0',
          prisma: '^6.2.0',
          playwright: '^1.50.0',
        },
      },
      null,
      2
    ),
  },
  {
    name: 'Android Compose + Navigation 3',
    filename: 'build.gradle.kts',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

dependencies {
    implementation("androidx.compose.ui:ui:1.8.0")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.navigation3:navigation3-runtime:1.0.0-alpha01")
    implementation("androidx.camera:camera-camera2:1.4.1")
}`,
  },
  {
    name: 'Python FastAPI + Agents',
    filename: 'pyproject.toml',
    content: `[project]
name = "agent-service"
version = "0.1.0"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn>=0.32.0",
    "torch>=2.5.0",
    "transformers>=4.48.0",
    "unsloth",
    "playwright",
]`,
  },
  {
    name: 'Svelte 5 Runes App',
    filename: 'package.json',
    content: JSON.stringify(
      {
        name: 'svelte-app',
        dependencies: {
          svelte: '^5.0.0',
          '@sveltejs/kit': '^2.0.0',
          tailwindcss: '^4.0.0',
        },
      },
      null,
      2
    ),
  },
]

export const ProjectRecommenderModal: React.FC = () => {
  const isRecommenderOpen = useSkillStore((s) => s.isRecommenderOpen)
  const setRecommenderOpen = useSkillStore((s) => s.setRecommenderOpen)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const addSelectedSkillsToStack = useSkillStore((s) => s.addSelectedSkillsToStack)
  const showToast = useSkillStore((s) => s.showToast)
  const allSkills = useSkillStore((s) => s.skills)

  const [inputContent, setInputContent] = useState('')
  const [filename, setFilename] = useState('')
  const [copiedCli, setCopiedCli] = useState(false)
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [githubUrl, setGithubUrl] = useState('')
  const [isFetchingGithub, setIsFetchingGithub] = useState(false)
  const [githubError, setGithubError] = useState<string | null>(null)

  const handleGitHubFetch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!githubUrl.trim()) return
    setIsFetchingGithub(true)
    setGithubError(null)
    try {
      const { content, filename: fetchedFilename } = await fetchGitHubManifest(githubUrl)
      setFilename(fetchedFilename)
      setInputContent(content)
      showToast(
        `✅ Fetched ${fetchedFilename} from GitHub`,
        `Auto-assembled tailored skills for ${githubUrl}`,
        undefined,
        undefined
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch manifest from repository'
      setGithubError(msg)
    } finally {
      setIsFetchingGithub(false)
    }
  }

  // Parse result dynamically whenever input changes
  const recommendation = useMemo<RecommendationResult | null>(() => {
    if (!inputContent.trim()) return null
    return analyzeProjectManifest(inputContent, filename, allSkills)
  }, [inputContent, filename, allSkills])

  // Sync selected skills when recommendation changes
  React.useEffect(() => {
    if (recommendation) {
      setSelectedSkillIds(recommendation.recommendedSkillIds)
    }
  }, [recommendation])

  if (!isRecommenderOpen) return null

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFilename(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setInputContent(text)
    }
    reader.readAsText(file)
  }

  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setFilename(preset.filename)
    setInputContent(preset.content)
  }

  const toggleSkillSelect = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleApplyToStack = () => {
    if (!recommendation || selectedSkillIds.length === 0) return

    const skillsToAdd = selectedSkillIds
      .map((id) => allSkills.find((s) => s.id === id || s.scoped === id || s.uniqueId === id))
      .filter((s): s is NonNullable<typeof s> => !!s)
      .map((s) => ({
        id: s.id,
        uniqueId: s.uniqueId,
        name: s.name,
        priority: s.priority,
        scoped: s.scoped,
        cli: s.cli,
        repo: s.repo,
        officialCli: s.repo ? `npx skills add ${s.repo} --skill ${s.id}` : s.cli,
      }))

    addSelectedSkillsToStack(skillsToAdd)
    setRecommenderOpen(false)
    showToast(
      `🪄 Loaded ${skillsToAdd.length} Auto-Recommended Skills`,
      `${recommendation.savingsPercent}% token savings active vs monolithic suite`,
      'View Stack',
      () => setStackModalOpen(true)
    )
  }

  const handleCopyCli = () => {
    if (!recommendation) return
    const cmds = selectedSkillIds
      .map((id) => {
        const s = allSkills.find((sk) => sk.id === id || sk.scoped === id)
        return s?.repo ? `npx skills add ${s.repo} --skill ${s.id}` : `python scripts/install-to-project.py --skill ${s?.scoped || id}`
      })
      .join('\n')

    navigator.clipboard.writeText(cmds)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 1600)
  }

  return (
    <div
      onClick={() => setRecommenderOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#09090b] border border-[#27272a] rounded-2xl p-6 space-y-5 relative shadow-2xl flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Project Auto-Stack Recommender</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Zero Guesswork
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Drop your project manifest (<code className="text-zinc-300">package.json</code>, <code className="text-zinc-300">build.gradle.kts</code>, <code className="text-zinc-300">pyproject.toml</code>) to auto-assemble the optimal 10x AI agent stack.
              </p>
            </div>
          </div>
          <button
            onClick={() => setRecommenderOpen(false)}
            className="text-zinc-400 hover:text-white p-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input & Upload Zone */}
        <div className="space-y-3">
          {/* GitHub Repo URL 1-Click Fetcher */}
          <form onSubmit={handleGitHubFetch} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <GitBranch className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="Paste GitHub URL (e.g. https://github.com/vercel/next.js or owner/repo)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#111114] border border-[#27272a] text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isFetchingGithub || !githubUrl.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold font-mono disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {isFetchingGithub ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Fetch Stack</span>
                  </>
                )}
              </button>
            </div>
            {githubError && (
              <div className="text-[11px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md">
                {githubError}
              </div>
            )}
          </form>

          {/* Quick Presets Ribbon */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-400">Quick Samples:</span>
            {SAMPLE_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => loadPreset(p)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#141417] hover:bg-[#1a1a20] text-zinc-300 border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Paste or Upload Area */}
          <div className="relative">
            <textarea
              value={inputContent}
              onChange={(e) => {
                setInputContent(e.target.value)
                if (!filename) setFilename('pasted-manifest.txt')
              }}
              rows={4}
              placeholder="Paste package.json, build.gradle.kts, pyproject.toml, or requirements.txt here..."
              className="w-full p-3 rounded-xl bg-[#111114] border border-[#27272a] text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18181b] hover:bg-zinc-800 text-[11px] font-mono text-zinc-300 border border-[#27272a] cursor-pointer transition-colors">
                <Upload className="w-3 h-3 text-purple-400" />
                <span>Upload File</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".json,.kts,.gradle,.txt,.toml,.yml,.yaml"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Analysis & Recommendation Preview */}
        {recommendation ? (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Detected Technologies Header */}
            <div className="p-3.5 rounded-xl bg-[#111114] border border-purple-500/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-zinc-200">Detected Stack Technologies:</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-semibold">
                    ~{recommendation.savingsPercent}% savings
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">vs monolithic suite</span>
                </div>
              </div>

              {/* Detected Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {recommendation.detectedTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#18181b] text-purple-300 border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-[11px] text-zinc-400">
                {recommendation.summary}
              </div>
            </div>

            {/* Recommended Skills List */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
                <span>Recommended AI Agent Skills ({selectedSkillIds.length} of {recommendation.recommendedSkillIds.length}):</span>
                <button
                  onClick={() =>
                    setSelectedSkillIds(
                      selectedSkillIds.length === recommendation.recommendedSkillIds.length
                        ? []
                        : recommendation.recommendedSkillIds
                    )
                  }
                  className="text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  {selectedSkillIds.length === recommendation.recommendedSkillIds.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {recommendation.recommendedSkillIds.map((id) => {
                  const skill = allSkills.find((s) => s.id === id || s.scoped === id)
                  const isChecked = selectedSkillIds.includes(id)
                  return (
                    <div
                      key={id}
                      onClick={() => toggleSkillSelect(id)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer text-xs ${
                        isChecked
                          ? 'bg-[#151222] border-purple-500/40 text-zinc-100'
                          : 'bg-[#111114] border-[#27272a] text-zinc-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-purple-600 border-purple-500 text-white'
                              : 'border-zinc-600 bg-zinc-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                          {skill?.priority || 'P0'}
                        </span>
                        <span className="font-semibold text-zinc-100 truncate">
                          {skill?.name || id}
                        </span>
                        <CopyButton
                          variant="pill"
                          text={`/${skill?.scoped || id}`}
                          title={`Copy slash command /${skill?.scoped || id}`}
                          className="shrink-0 hidden sm:inline-flex"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {skill?.repo && (
                          <span className="text-[10px] font-mono text-zinc-400 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a] truncate max-w-[160px] hidden md:inline">
                            {skill.repo}
                          </span>
                        )}
                        <CopyButton
                          variant="icon"
                          text={skill?.repo ? `npx skills add ${skill.repo} --skill ${skill.id}` : `python scripts/install-to-project.py --skill ${skill?.scoped || id}`}
                          title="Copy skill install command"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-zinc-500 text-xs border border-dashed border-[#27272a] rounded-xl space-y-2">
            <FileCode className="w-8 h-8 text-zinc-600 mx-auto" />
            <p>Paste or upload your manifest above to see instant AI skill recommendations.</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#27272a] flex items-center justify-between gap-3 text-xs">
          <button
            onClick={() => {
              setInputContent('')
              setFilename('')
            }}
            className="text-zinc-500 hover:text-zinc-300 font-mono text-xs cursor-pointer"
          >
            Clear Input
          </button>

          <div className="flex items-center gap-2">
            {recommendation && selectedSkillIds.length > 0 && (
              <button
                onClick={handleCopyCli}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-[#1a1a20] text-zinc-300 border border-[#27272a] hover:border-zinc-500 transition-colors font-mono cursor-pointer"
                title="Copy batch CLI commands"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? 'Copied Commands!' : 'Copy CLI'}</span>
              </button>
            )}

            <button
              onClick={handleApplyToStack}
              disabled={!recommendation || selectedSkillIds.length === 0}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer shadow-lg ${
                recommendation && selectedSkillIds.length > 0
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-purple-200" />
              <span>Apply Stack ({selectedSkillIds.length} Skills)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
