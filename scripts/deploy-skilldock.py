#!/usr/bin/env python3
"""
scripts/deploy-skilldock.py
---------------------------
Compiles the React 19 SkillDock storefront from web/ and stages it at the
repository root for live GitHub Pages deployment.
"""

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"
DIST = WEB / "dist"

def main():
    print("[*] SkillDock GitHub Pages Live Deployment Engine")
    print(f"    Repository Root: {ROOT}")
    print(f"    Web Directory:   {WEB}")

    # 1. Build React 19 production bundle in web/
    print("[1/5] Compiling React 19 production bundle in web/...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    res = subprocess.run([npm_cmd, "run", "build"], cwd=WEB, capture_output=True, text=True)
    if res.returncode != 0:
        print("[!] Vite build failed:")
        print(res.stderr or res.stdout)
        sys.exit(1)
    print("      [OK] Vite build completed successfully.")

    # 2. Archive legacy static HTML to index.legacy.html
    legacy_file = ROOT / "index.legacy.html"
    root_index = ROOT / "index.html"
    if root_index.exists() and not legacy_file.exists():
        print(f"[2/5] Archiving legacy static HTML to {legacy_file.name}...")
        shutil.copy2(root_index, legacy_file)
        print("      [OK] Legacy version preserved.")
    else:
        print("[2/5] Legacy archive check: Already preserved.")

    # 3. Stage React 19 assets at root
    print("[3/5] Promoting SkillDock React 19 bundle to repository root...")
    shutil.copy2(DIST / "index.html", root_index)
    print("      [OK] Replaced root index.html with SkillDock React 19 entry.")

    shutil.copy2(DIST / "404.html", ROOT / "404.html")
    print("      [OK] Copied 404.html SPA router to root.")

    # Copy favicon.svg if present
    if (DIST / "favicon.svg").exists():
        shutil.copy2(DIST / "favicon.svg", ROOT / "favicon.svg")

    dist_assets = DIST / "assets"
    root_assets = ROOT / "assets"
    if root_assets.exists():
        shutil.rmtree(root_assets)
    shutil.copytree(dist_assets, root_assets)
    print(f"      [OK] Synced {len(list(root_assets.glob('*')))} asset chunks to root /assets.")

    # 4. Verify .nojekyll
    nojekyll = ROOT / ".nojekyll"
    if not nojekyll.exists():
        nojekyll.touch()
        print("      [OK] Verified .nojekyll at repository root.")
    else:
        print("[4/5] .nojekyll bypass: Confirmed present.")

    # 5. Verification
    print("[5/5] Running test suite to verify 100% green status...")
    test_res = subprocess.run([sys.executable, "-m", "unittest", "discover", "tests"], cwd=ROOT, capture_output=True, text=True)
    if test_res.returncode != 0:
        print("[!] Unit tests failed:")
        print(test_res.stdout)
        print(test_res.stderr)
        sys.exit(1)
    print("      [OK] All unit tests passed!")

    print("\n" + "=" * 80)
    print("[SUCCESS] SkillDock React 19 is fully staged and ready for GitHub Pages!")
    print("=" * 80)

if __name__ == "__main__":
    main()
