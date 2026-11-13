import json
import re
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

def main():
    with open('claude_marketplace_items.json', 'r', encoding='utf-8') as f:
        all_items = json.load(f)

    # Filter to only plugins working with claude-code
    claude_code_plugins = [
        it for it in all_items 
        if it.get("worksWith") and any(w.get("value") == "claude-code" for w in it.get("worksWith"))
    ]
    print(f"Total Claude Code plugins to scan: {len(claude_code_plugins)}")

    results = {}
    # Load existing progress if available
    progress_file = 'data/claude-code-plugins-raw.json'
    try:
        with open(progress_file, 'r', encoding='utf-8') as f:
            results = json.load(f)
        print(f"Loaded {len(results)} previously scanned plugins from cache.")
    except Exception:
        results = {}

    to_fetch = [it for it in claude_code_plugins if it['slug'] not in results]
    print(f"Plugins remaining to fetch: {len(to_fetch)}")

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }

    def fetch_plugin(item):
        slug = item['slug']
        url = f"https://claude.com/marketplace/plugins/{slug}"
        req = urllib.request.Request(url, headers=headers)
        
        for attempt in range(3):
            try:
                t0 = time.time()
                with urllib.request.urlopen(req, timeout=12) as resp:
                    html = resp.read().decode('utf-8', errors='ignore')
                    elapsed = time.time() - t0
                    
                    # 1. Plugin source (Official GitHub link)
                    # Example pattern: Plugin source ... <a href="https://github.com/..."
                    src_match = re.search(r'Plugin source.*?<a\s+[^>]*href="([^"]+)"', html, re.DOTALL)
                    plugin_source = src_match.group(1) if src_match else None
                    
                    # Fallback for github url if Plugin source wasn't matched with that regex
                    if not plugin_source:
                        sidebar_pos = html.find('DetailSidebar-module-scss-module')
                        if sidebar_pos != -1:
                            sidebar_html = html[sidebar_pos:sidebar_pos+3500]
                            gh_match = re.search(r'href="(https?://github\.com/[^"]+)"', sidebar_html)
                            if gh_match:
                                plugin_source = gh_match.group(1)
                    
                    # 2. Documentation URL
                    docs_match = re.search(r'Documentation.*?<a\s+[^>]*href="([^"]+)"', html, re.DOTALL)
                    docs_url = docs_match.group(1) if docs_match else None

                    # 3. Install Command
                    # aria-label="Copy: claude plugin install superpowers@claude-plugins-official"
                    cmd_match = re.search(r'aria-label="Copy:\s*(claude plugin (?:install|add) [^"]+)"', html)
                    if cmd_match:
                        install_cmd = cmd_match.group(1)
                    else:
                        cmd_match2 = re.search(r'claude plugin (?:install|add) [a-zA-Z0-9_\-@\./:]+', html)
                        install_cmd = cmd_match2.group(0) if cmd_match2 else f"claude plugin install {slug}"

                    # 4. Made By (author / vendor)
                    made_by = item.get("madeBy")
                    if not made_by:
                        made_by_match = re.search(r'Made by.*?<span[^>]*class="[^"]*value[^"]*"[^>]*>(.*?)</span>', html, re.DOTALL)
                        if made_by_match:
                            made_by = re.sub(r'<[^>]+>', ' ', made_by_match.group(1)).strip()

                    # 5. Detail description / markdown if available
                    desc = item.get("subheading") or ""

                    return {
                        'title': item.get('title'),
                        'slug': slug,
                        'subheading': desc,
                        'plugin_source': plugin_source,
                        'docs_url': docs_url,
                        'install_cmd': install_cmd,
                        'made_by': made_by or "Anthropic / Community",
                        'installs': item.get('installs'),
                        'anthropic_verified': item.get('anthropicVerified', False),
                        'marketplace_url': url,
                        'status': 'ok',
                        'time': elapsed
                    }
            except Exception as e:
                time.sleep(1.0 * (attempt + 1))
                if attempt == 2:
                    return {
                        'title': item.get('title'),
                        'slug': slug,
                        'subheading': item.get('subheading', ''),
                        'plugin_source': None,
                        'docs_url': None,
                        'install_cmd': f"claude plugin install {slug}",
                        'made_by': item.get('madeBy') or "Unknown",
                        'installs': item.get('installs'),
                        'anthropic_verified': item.get('anthropicVerified', False),
                        'marketplace_url': url,
                        'status': f'error: {e}',
                        'time': 0
                    }

    if to_fetch:
        print("Starting concurrent scan with 12 workers...")
        completed_count = 0
        with ThreadPoolExecutor(max_workers=12) as executor:
            future_to_slug = {executor.submit(fetch_plugin, it): it['slug'] for it in to_fetch}
            for future in as_completed(future_to_slug):
                slug = future_to_slug[future]
                res = future.result()
                results[slug] = res
                completed_count += 1
                if completed_count % 25 == 0 or completed_count == len(to_fetch):
                    print(f"Progress: {completed_count}/{len(to_fetch)} plugins fetched (latest: {slug})")
                    # checkpoint save
                    with open(progress_file, 'w', encoding='utf-8') as f:
                        json.dump(results, f, indent=2)

    # Save final results
    with open(progress_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print(f"Scan complete! Total plugins in dataset: {len(results)}")

    # Check how many have plugin_source
    with_source = [r for r in results.values() if r.get('plugin_source')]
    print(f"Plugins with official source link: {len(with_source)}/{len(results)}")

if __name__ == '__main__':
    main()

