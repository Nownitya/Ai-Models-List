# TRD — Technical Requirements Document (`Ai-Models-List`)

> **Authoritative Technical Constraints & Environment Specification**  
> **Status:** Active / Living Document  
> **Standard:** Layer 15 Universal Project Documentation  
> **Target Project:** `Ai-Models-List`

---

## 1. Runtime Environment & Toolchain Constraints

* **Python Runtime**: Python 3.10+ (Tested against Python 3.14).
* **Dependency Constraint**: Strict **Zero Third-Party Pip Dependencies**. All scripts (`sync-matrix.py`, `test-skills.py`, `sync_github_metrics.py`, `install-to-project.py`, `verify-lock.py`) must operate exclusively using Python standard library packages:
  - `pathlib`, `json`, `argparse`, `hashlib`, `urllib.request`, `unittest`, `re`, `shutil`, `sys`.
* **Platform Invariance**: Must run deterministically on Windows (PowerShell), macOS (zsh), and Linux (bash/dash) with CRLF/LF line-ending normalization.

---

## 2. GitHub API & Telemetry Specifications

* **Endpoints Used**:
  - `https://api.github.com/repos/{owner}/{repo}` (Repository metadata, stars, license)
  - `https://api.github.com/repos/{owner}/{repo}/releases/latest` (Latest release tag)
* **Rate-Limit Handling**:
  - Unauthenticated limit: 60 requests/hr.
  - Authenticated limit: 5,000 requests/hr using `GITHUB_TOKEN`.
  - Fallback: Gracefully caches last known values in `data/github-metrics.json` if network fails or rate limits trigger.

---

## 3. Web Dashboard (GitHub Pages) Constraints

* **Hosting Mode**: Direct static hosting from `main` branch root `/` with `.nojekyll` enabled to prevent Jekyll parsing overhead.
* **Asset Constraints**: Zero CDN or build tool dependencies for core logic. Self-contained vanilla CSS3 and vanilla JavaScript.
* **Latency Budget**: Page First Contentful Paint (FCP) < 500ms; DOM Interactive < 800ms.

