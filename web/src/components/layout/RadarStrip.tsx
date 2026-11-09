import React, { useMemo } from 'react'
import { Activity, Star, ExternalLink } from 'lucide-react'
import rawMetrics from '@/data/github-metrics.json'

interface RepoMetric {
  repo: string
  name: string
  html_url: string
  stars: number
  stars_formatted: string
  last_updated?: string
}

export const RadarStrip: React.FC = () => {
  const topRepos = useMemo(() => {
    const repos = Object.values(rawMetrics.repositories || {}) as RepoMetric[]
    return repos
      .filter((r) => r.stars > 0)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 15)
  }, [])

  if (topRepos.length === 0) return null

  return (
    <div className="border-b border-[#21262d] bg-[#0d1117] overflow-hidden py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Radar:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth text-xs whitespace-nowrap">
          {topRepos.map((repo) => (
            <a
              key={repo.repo}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161b22] hover:bg-[#21262d] text-slate-300 hover:text-white transition-colors border border-[#30363d]"
            >
              <span className="font-medium text-[11px]">{repo.name}</span>
              <span className="flex items-center gap-0.5 text-amber-400 font-bold text-[10px]">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                {repo.stars_formatted || repo.stars.toLocaleString()}
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
