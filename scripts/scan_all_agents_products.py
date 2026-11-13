import urllib.request
import re
import json
from pathlib import Path

items = json.loads(Path("data/claude-agents-products.json").read_text(encoding="utf-8"))

results = []
for idx, it in enumerate(items, 1):
    slug = it["slug"]
    url = f"https://claude.com/marketplace/agents-products/{slug}"
    print(f"[{idx:2d}/{len(items)}] Scanning {slug}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        html = urllib.request.urlopen(req).read().decode("utf-8")
        
        # Flight stream
        chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
        stream = ""
        for c in chunks:
            try:
                stream += c.encode('utf-8').decode('unicode_escape')
            except Exception:
                stream += c
                
        paragraphs = re.findall(r'className":"text-body-2-serif","children":\["(.*?)"\]', stream)
        paragraphs = [p.replace('\\"', '"').replace('\\n', ' ').strip() for p in paragraphs]
        
        overview = paragraphs[0] if len(paragraphs) > 0 else it.get("subtitle", "")
        how_to_buy = paragraphs[1] if len(paragraphs) > 1 else ""
        
        # External links in stream
        ext_links = re.findall(r'https?://[a-zA-Z0-9_\-\./]+', stream)
        interesting_links = []
        for l in ext_links:
            if not any(x in l for x in ['claude.com', 'anthropic.com', 'w3.org', 'schema.org', 'assets.claude.com', 'nextjs.org', 'schema.org', 'linkedin.com', 'youtube.com', 'x.com']):
                interesting_links.append(l)
                
        results.append({
            "id": it["_id"],
            "title": it["title"].replace("Â®", "®").replace("â„¢", "™").strip(),
            "slug": slug,
            "tagline": it.get("tagline", "").strip(),
            "subtitle": it.get("subtitle", "").strip(),
            "overview": overview,
            "how_to_buy": how_to_buy,
            "use_cases": [uc.get("name") for uc in (it.get("useCases") or [])],
            "category": (it.get("useCases") or [{}])[0].get("name", "Productivity"),
            "logo": it.get("logoSquareUrl") or it.get("logoUrl"),
            "marketplace_url": url,
            "external_links": list(set(interesting_links))
        })
    except Exception as e:
        print(f"Error on {slug}: {e}")

out_path = Path("data/claude-agents-products-scanned.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\n[OK] Successfully scanned all {len(results)} agents & products to {out_path}!")

