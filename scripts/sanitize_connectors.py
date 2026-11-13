import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

json_path = REPO_ROOT / "data" / "claude-connectors-plugins.json"
data = json.loads(json_path.read_text(encoding="utf-8"))

for c in data:
    if c.get("serverUrl") and "zpka_" in c["serverUrl"]:
        # strip tracker query parameter
        c["serverUrl"] = c["serverUrl"].split("?")[0]
        print(f"Sanitized {c['slug']} serverUrl -> {c['serverUrl']}")

json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"[OK] Saved {json_path}")

