---
name: runcomfy-cli
description: Unified CLI and agent skills for 100+ hosted diffusion and generative video models (Kling 3.0, Wan 2.1, FLUX 2, GPT Image 2, inpainting, face-swap).
---

# RunComfy CLI (`runcomfy-cli`)

The `runcomfy-cli` skill equips AI coding agents with a unified command-line interface to invoke over 100 state-of-the-art diffusion, image synthesis, and generative video model endpoints hosted on RunComfy—without requiring local GPU hardware or local model weight downloads.

---

## When to Use

- When building web, desktop, or mobile applications that need photorealistic assets, hero illustrations, app icons, textures, or marketing banners generated on demand.
- When producing AI video animations, feature walkthrough clips, or generative backgrounds using frontier video models (Kling 3.0, Wan 2.1 / Wan 2.7, Seedance v2).
- When performing automated visual editing tasks in a pipeline: inpainting, outpainting, image restyling, face swapping, lip syncing, or background relighting.
- When an autonomous agent (e.g. `image-generator`, `sellbird`, or social media assistants) requires deterministic cloud generation with automated polling, progress tracking, and local file download.

---

## Core Capabilities

1. **Unified CLI Invocation**:
   Call any hosted model through a single deterministic binary pattern:
   ```bash
   runcomfy run <vendor>/<model>/<endpoint> --input '<JSON>' --output-dir <path>
   ```
2. **Generative Video Suite**:
   - **Kling 3.0** (`kuaishou/kling-3-0/text-to-video`): High-temporal-coherence cinematic video generation.
   - **Wan 2.1 / 2.7** (`wan-video/wan-2-1/text-to-video`): Open-weights frontier video model execution.
   - **Image-to-Video** (`runcomfy run .../image-to-video`): Animate still UI mockups or concept art into motion clips.
   - **Video Extend & Inpainting**: Seamless clip lengthening and frame-level object replacement.
3. **Diffusion & Image Synthesis**:
   - **FLUX 2** (`black-forest-labs/flux-2/text-to-image`): State-of-the-art typography rendering and prompt adherence.
   - **GPT Image 2** (`openai/gpt-image-2/text-to-image`): Multi-modal stylized and photorealistic generation.
4. **Visual Editing & Character Consistency**:
   - **Lip-Sync & Talking Head**: Synchronize speech audio tracks with video frames.
   - **Face-Swap & Pose Control**: Align character faces and match human poses via ControlNet.
   - **Inpainting & Relighting**: Studio lighting adjustment and localized UI cleanup.
5. **Agent-First Execution Lifecycle**:
   - **Submit**: Dispatches payload via HTTPS bearer authentication to `model-api.runcomfy.net`.
   - **Poll**: Deterministic status polling every 2 seconds (`in_queue` -> `in_progress` -> `completed`).
   - **Auto-Download**: Automatically downloads resulting media files directly into the project workspace.
   - **Cancellation Grace**: `Ctrl-C` or timeout cleanly dispatches cancellation to prevent orphaned GPU billing.

---

## Installation & Activation

```bash
# Install the skill into coding assistant environments
npx skills add agentspace-so/runcomfy-agent-skills --skill runcomfy-cli -g

# Install the official RunComfy CLI
npm install -g @runcomfy/cli

# Authenticate session
runcomfy login

# Or set non-interactive API token in CI / Container environments
export RUNCOMFY_TOKEN="<your-runcomfy-api-token>"

# Verify connection
runcomfy whoami
```

---

## Prerequisites

- **Node.js runtime** (`node >= 18`) for npm CLI execution, or pre-built binary.
- **RunComfy Account & Token**: Active RunComfy account with API credit balance.
- **Network Access**: Outbound HTTPS connectivity to `model-api.runcomfy.net` and `*.runcomfy.net` / `*.runcomfy.com`.

---

## Anti-Patterns & Warnings

- **Do Not Pipe Unvetted Shell Scripts**: Never pipe curl outputs directly to bash (`curl | sh`). Always install the verified package via `npm install -g @runcomfy/cli` or review standalone binaries.
- **Do Not Hardcode or Commit Tokens**: Never commit `RUNCOMFY_TOKEN` to version control or echo it into chat prompt context. Use environment variables or local `~/.config/runcomfy/token.json` (chmod 0600).
- **Do Not Run Indefinite Unbounded Polls**: Always set a reasonable polling timeout for long video generation jobs (e.g. 5–10 minutes maximum).
- **Beware of Large File Quotas**: The CLI automatically caps downloads at 2 GiB per artifact to prevent local disk exhaustion; ensure destination paths have sufficient free storage.
- **Avoid Overlapping Local GPU Dependencies**: Do not install heavy PyTorch or CUDA dependencies locally when utilizing `runcomfy-cli`; computation runs remotely in cloud serverless clusters.
