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
    <div className="border-b border-[#21262d] bg-[#0d1117] overflow-hidden py-2.5">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center gap-3.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 shrink-0">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Radar:</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth text-sm whitespace-nowrap">
          {topRepos.map((repo) => (
            <a
              key={repo.repo}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-slate-200 hover:text-white transition-colors border border-[#30363d]"
            >
              <span className="font-semibold text-xs">{repo.name}</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {repo.stars_formatted || repo.stars.toLocaleString()}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
