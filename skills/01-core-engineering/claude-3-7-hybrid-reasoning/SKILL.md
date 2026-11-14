---
name: claude-3-7-hybrid-reasoning
description: "Calibrated extended thinking budget, step-by-step reasoning tokens, chain-of-thought verification, and fallback guards for Claude 3.7 Sonnet."
priority: P0
category: 01-core-engineering
---

# Claude 3.7 Hybrid Reasoning

Dynamic thinking budget management and calibrated step-by-step reasoning tokens for frontier agentic engineering with Claude 3.7 Sonnet.

## When to Use
- Tackling non-trivial architectural decisions, complex algorithmic refactorings, or multi-file bug investigations.
- When an agent needs explicit extended thinking (`thinking: { type: "enabled", budget_tokens: N }`) to prevent impulsive edits.
- Verifying math, protocol layouts, or cryptographic invariants before writing code.
- Calibrating speed vs. depth tradeoffs across rapid code completions and deep systematic analysis.

## Core Capabilities & Protocol
1. **Dynamic Thinking Budget Allocation**:
   - *Low Complexity (Bugfix, simple refactor)*: `budget_tokens: 2048` - Rapid validation and surgical fixes.
   - *Medium Complexity (Module design, API contract)*: `budget_tokens: 8192` - Multi-perspective trade-off analysis.
   - *High Complexity (Cross-system architecture, deep debugging)*: `budget_tokens: 16384` - Exhaustive hypothesis generation, AST tracing, and formal verification.
2. **Chain-of-Thought Scratchpad Protocol**:
   - Always formulate verifiable hypotheses before proposing code modifications.
   - Trace data flows and invariants across component boundaries.
   - Double-check edge conditions (nullability, concurrency races, off-by-one indices) in the thinking block.
3. **Execution Guard & Fallback**:
   - Ensure the final answer provides drop-in production code without intermediate thinking noise.
   - When thinking budget is exceeded, enforce graceful degradation to structured action lists.

## Activation Command
```bash
/claude-3-7-hybrid-reasoning
# Or CLI invocation:
npx skills add anthropics/skills --skill claude-3-7-hybrid-reasoning
```

## Prerequisites
- Claude 3.7 Sonnet model access or Anthropic API key supporting extended thinking.
- Modern agent harness supporting structured reasoning blocks (`thinking` parameter).

## Anti-Patterns & Warnings
- **Thinking Token Bloat**: Never allocate 16k tokens to trivial one-line typo fixes or routine documentation formatting.
- **Speculative Hallucination**: Do not accept unverified assumptions inside the thinking block without live code or test evidence.
- **Leaked Scratchpad**: Never allow raw, unstructured thinking scratchpads to bleed into public user responses or commit messages.
