import urllib.request
import re
import json

url = "https://claude.com/marketplace/connectors-plugins"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8")

with open("data/claude_connectors_plugins_raw.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Saved raw HTML, size:", len(html))

chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
print(f"Found {len(chunks)} flight chunks")

full_stream = ""
for c in chunks:
    try:
        decoded = c.encode('utf-8').decode('unicode_escape')
        full_stream += decoded
    except Exception:
        full_stream += c

with open("data/claude_connectors_plugins_stream.txt", "w", encoding="utf-8") as f:
    f.write(full_stream)

print("Saved flight stream, size:", len(full_stream))

# Search for "items": [
items_pos = [m.start() for m in re.finditer(r'"items":\s*\[', full_stream)]
print(f"Found {len(items_pos)} 'items': [ occurrences")

for idx, p in enumerate(items_pos):
    snippet = full_stream[max(0, p-50):min(len(full_stream), p+120)]
    print(f"[{idx:2d}] {snippet}")
