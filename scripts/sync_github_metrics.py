#!/usr/bin/env python3
"""
sync_github_metrics.py — Automatically extracts all upstream GitHub repositories
from the master matrix, queries live metrics (Stars, Releases, Activity, License),
saves to data/github-metrics.json, and updates Markdown and CSV matrices in dual parity.
"""

import os
import re
import sys
import json
import urllib.request
import urllib.error
import subprocess
from pathlib import Path
from datetime import datetime, timezone

# Force UTF-8 on Windows
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MATRIX_MD = REPO_ROOT / "AI-Coding-Skills-and-Tools-Matrix.md"
DEFAULT_MATRIX_CSV = REPO_ROOT / "AI-Coding-Skills-and-Tools-Matrix.csv"
DEFAULT_METRICS_JSON = REPO_ROOT / "data" / "github-metrics.json"

EXCLUDED_SLUGS = {
    "features", "topics", "collections", "trending", "explore", "about",
    "pricing", "security", "customer-stories", "enterprise", "team"
}

def extract_github_repos(markdown_text: str) -> list[str]:
    """Extract distinct valid GitHub repository slugs (owner/repo) from Markdown text."""
    pattern = r'https://github\.com/([a-zA-Z0-9_\-\.]+/[a-zA-Z0-9_\-\.]+)'
    matches = re.findall(pattern, markdown_text)
    seen = set()
    valid_repos = []

    for match in matches:
        clean = match.rstrip('/').rstrip('.').removesuffix('.git')
        parts = clean.split('/')
        if len(parts) == 2:
            owner, repo = parts
            if owner.lower() not in EXCLUDED_SLUGS and repo.lower() not in EXCLUDED_SLUGS:
                norm_key = clean.lower()
                if norm_key not in seen:
                    seen.add(norm_key)
                    valid_repos.append(clean)

    return sorted(valid_repos)

def normalize_repo_key(url_or_slug: str) -> str:
    """Normalize any GitHub URL or slug into lower-cased 'owner/repo' without .git or trailing slashes."""
    slug = url_or_slug.strip()
    slug = re.sub(r'^https?://github\.com/', '', slug)
    slug = slug.rstrip('/').removesuffix('.git')
    return slug.lower()

def format_star_count(count: int) -> str:
    """Format star count into human-friendly string (e.g. 1.2k, 298.9k, 314k)."""
    if count is None or count == 0:
        return "0"
    if count < 1000:
        return str(count)
    if count < 1000000:
        val = count / 1000.0
        return f"{val:.1f}k" if val < 100 else f"{int(round(val))}k"
    return f"{count / 1000000.0:.1f}M"

def build_repo_metric(raw_repo: dict, latest_tag: str = "latest") -> dict:
    """Transform raw GitHub API payload into structured metrics."""
    stars = raw_repo.get("stargazers_count", 0)
    license_info = raw_repo.get("license") or {}
    spdx = license_info.get("spdx_id") if isinstance(license_info, dict) else "None"
    if not spdx or spdx == "NOASSERTION":
        spdx = "Other"

    pushed_at = raw_repo.get("pushed_at", "")
    date_str = pushed_at[:10] if pushed_at else "Unknown"

    return {
        "repo": raw_repo.get("full_name", ""),
        "name": raw_repo.get("name", ""),
        "owner": raw_repo.get("owner", {}).get("login", "") if isinstance(raw_repo.get("owner"), dict) else "",
        "html_url": raw_repo.get("html_url", ""),
        "description": raw_repo.get("description") or "",
        "stars": stars,
        "stars_formatted": format_star_count(stars),
        "forks": raw_repo.get("forks_count", 0),
        "open_issues": raw_repo.get("open_issues_count", 0),
        "version": latest_tag or "latest",
        "license": spdx,
        "last_updated": date_str,
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ")
    }

def resolve_github_token() -> str | None:
    """Resolve GitHub token from environment variables or git credential helper."""
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token.strip()

    # Try Git Credential helper
    try:
        proc = subprocess.run(
            ["git", "credential", "fill"],
            input="protocol=https\nhost=github.com\n\n",
            capture_output=True,
            text=True,
            timeout=3
        )
        for line in proc.stdout.splitlines():
            if line.startswith("password="):
                return line.split("=", 1)[1].strip()
    except Exception:
        pass

    return None

def fetch_github_repo_data(repo_slug: str, token: str | None = None) -> tuple[dict | None, str | None]:
    """Query GitHub API for repository info and latest release/tag."""
    base_headers = {
        "User-Agent": "Ai-Models-List-Bot/1.0",
        "Accept": "application/vnd.github.v3+json"
    }
    if token:
        base_headers["Authorization"] = f"Bearer {token}"

    repo_url = f"https://api.github.com/repos/{repo_slug}"
    req = urllib.request.Request(repo_url, headers=base_headers)

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw_repo = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"    [!] HTTP Error {e.code} for {repo_slug}: {e.reason}")
        return None, None
    except Exception as e:
        print(f"    [!] Error fetching {repo_slug}: {e}")
        return None, None

    # Fetch latest release or tag
    latest_tag = None
    tags_url = f"https://api.github.com/repos/{repo_slug}/tags"
    tag_req = urllib.request.Request(tags_url, headers=base_headers)
    try:
        with urllib.request.urlopen(tag_req, timeout=10) as resp:
            tags = json.loads(resp.read().decode("utf-8"))
            if tags and isinstance(tags, list):
                latest_tag = tags[0].get("name")
    except Exception:
        pass

    if not latest_tag:
        releases_url = f"https://api.github.com/repos/{repo_slug}/releases/latest"
        rel_req = urllib.request.Request(releases_url, headers=base_headers)
        try:
            with urllib.request.urlopen(rel_req, timeout=10) as resp:
                rel = json.loads(resp.read().decode("utf-8"))
                latest_tag = rel.get("tag_name")
        except Exception:
            pass

    return raw_repo, latest_tag or "latest"

def generate_live_stats_markdown(metrics_payload: dict) -> str:
    """Generate GitHub Flavored Markdown table ranking repositories by stars."""
    repos_dict = metrics_payload.get("repositories", {})
    sorted_repos = sorted(repos_dict.values(), key=lambda r: r.get("stars", 0), reverse=True)
    last_synced = metrics_payload.get("last_synced", "Unknown")

    lines = [
        "# Live Upstream Skills Radar",
        "",
        f"> **Last Synchronized:** `{last_synced}` | **Tracked Repositories:** `{len(sorted_repos)}`",
        "",
        "Real-time tracking of community engagement, release versions, and maintenance activity across all upstream AI coding skill repositories.",
        "",
        "| Rank | Repository | Stars | Latest Tag | License | Last Updated | Live Badge |",
        "| :---: | :--- | :---: | :---: | :---: | :---: | :--- |"
    ]

    for rank, repo in enumerate(sorted_repos, 1):
        slug = repo.get("repo", "")
        url = repo.get("html_url") or f"https://github.com/{slug}"
        stars_fmt = repo.get("stars_formatted", "0")
        tag = repo.get("version", "latest")
        license_str = repo.get("license", "Unknown")
        updated = repo.get("last_updated", "Unknown")
        badge = f"![Stars](https://img.shields.io/github/stars/{slug}?style=flat&label=stars)"

        lines.append(f"| {rank:2d} | [{slug}]({url}) | **⭐ {stars_fmt}** | `{tag}` | `{license_str}` | {updated} | {badge} |")

    lines.append("")
    lines.append("---")
    lines.append("*Automatically synchronized via `.github/workflows/sync-metrics.yml` and `scripts/sync-github-metrics.py`.*")
    lines.append("")
    return "\n".join(lines)

def generate_live_stats_csv(metrics_payload: dict) -> str:
    """Generate CSV string of ranked repository metrics."""
    import csv
    import io
    repos_dict = metrics_payload.get("repositories", {})
    sorted_repos = sorted(repos_dict.values(), key=lambda r: r.get("stars", 0), reverse=True)

    output = io.StringIO()
    writer = csv.writer(output, lineterminator="\n")
    writer.writerow(["Rank", "Repository", "Stars", "Latest_Tag", "License", "Last_Updated", "URL"])

    for rank, repo in enumerate(sorted_repos, 1):
        writer.writerow([
            rank,
            repo.get("repo", ""),
            repo.get("stars", 0),
            repo.get("version", "latest"),
            repo.get("license", "Unknown"),
            repo.get("last_updated", "Unknown"),
            repo.get("html_url", "")
        ])

    return output.getvalue()

def update_live_stats_files(metrics_payload: dict, docs_dir: Path, data_dir: Path):
    """Write docs/LIVE-STATS.md and data/live-stats.csv."""
    docs_dir.mkdir(parents=True, exist_ok=True)
    data_dir.mkdir(parents=True, exist_ok=True)

    md_content = generate_live_stats_markdown(metrics_payload)
    md_path = docs_dir / "LIVE-STATS.md"
    md_path.write_text(md_content, encoding="utf-8")
    print(f"[OK] Written {md_path} ({md_path.stat().st_size:,} bytes)")

    csv_content = generate_live_stats_csv(metrics_payload)
    csv_path = data_dir / "live-stats.csv"
    csv_path.write_text(csv_content, encoding="utf-8")
    print(f"[OK] Written {csv_path} ({csv_path.stat().st_size:,} bytes)")

def load_cached_metrics(json_path: Path) -> dict:
    """Load existing metrics cache if available."""
    if json_path.exists():
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"version": 1, "last_synced": "", "repositories": {}}

def sync_metrics(md_path=DEFAULT_MATRIX_MD, output_json=DEFAULT_METRICS_JSON, update_docs=True, dry_run=False) -> dict:
    """Main synchronization runner."""
    print("=" * 80)
    print("[*] LIVE GITHUB METRICS RADAR SYNCHRONIZER")
    print("=" * 80)

    if not md_path.exists():
        print(f"[FAIL] Matrix file not found: {md_path}")
        sys.exit(1)

    content = md_path.read_text(encoding="utf-8")
    repos = extract_github_repos(content)
    print(f"[*] Discovered {len(repos)} distinct upstream repositories in matrix.")

    token = resolve_github_token()
    if token:
        print("[*] GitHub Token: Authenticated (High Rate-Limit)")
    else:
        print("[*] GitHub Token: Anonymous (60 req/hr rate limit)")

    cached = load_cached_metrics(output_json)
    metrics_by_repo = cached.get("repositories", {})

    success_count = 0
    fallback_count = 0

    for idx, repo_slug in enumerate(repos, 1):
        norm_key = normalize_repo_key(repo_slug)
        print(f"[{idx:2d}/{len(repos)}] Querying: {repo_slug}...")

        raw_data, tag = fetch_github_repo_data(repo_slug, token)
        if raw_data:
            metric = build_repo_metric(raw_data, tag)
            metrics_by_repo[norm_key] = metric
            print(f"      ⭐ {metric['stars_formatted']:>6} | 🏷️ {metric['version']:<12} | ⚖️ {metric['license']:<8} | 🕒 {metric['last_updated']}")
            success_count += 1
        elif norm_key in metrics_by_repo:
            print(f"      [~] Using cached metrics for {repo_slug}")
            fallback_count += 1
        else:
            print(f"      [-] No data available for {repo_slug}")

    result_payload = {
        "version": 1,
        "last_synced": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ"),
        "total_repositories": len(metrics_by_repo),
        "repositories": metrics_by_repo
    }

    if not dry_run:
        output_json.parent.mkdir(parents=True, exist_ok=True)
        with open(output_json, "w", encoding="utf-8") as f:
            json.dump(result_payload, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"\n[OK] Saved metrics to {output_json} ({output_json.stat().st_size:,} bytes)")

        if update_docs:
            update_live_stats_files(result_payload, REPO_ROOT / "docs", REPO_ROOT / "data")

    print(f"[OK] Sync Complete: {success_count} fetched live, {fallback_count} cached fallbacks.")
    return result_payload

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Synchronize live GitHub metrics for upstream skill repositories.")
    parser.add_argument("--matrix", default=str(DEFAULT_MATRIX_MD), help="Path to master Markdown matrix")
    parser.add_argument("--output", default=str(DEFAULT_METRICS_JSON), help="Output path for github-metrics.json")
    parser.add_argument("--update-docs", action="store_true", default=True, help="Generate docs/LIVE-STATS.md and data/live-stats.csv")
    parser.add_argument("--dry-run", action="store_true", help="Fetch without saving to disk")
    args = parser.parse_args()

    sync_metrics(Path(args.matrix), Path(args.output), update_docs=args.update_docs, dry_run=args.dry_run)

if __name__ == "__main__":
    main()
