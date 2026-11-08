---
name: sentry-diagnostics
description: Developer-first error tracking, distributed tracing, crash dump analysis, and performance monitoring diagnostics for applications and AI agents.
---

# Sentry Diagnostics & Reliability (`getsentry/sentry`)

> **Priority:** `P0` | **Framework:** `getsentry/sentry` | **Domain:** `06-debugging-and-investigation` | **Stars:** `⭐ 45k+`

Developer-first error tracking, distributed tracing, crash dump analysis, and performance monitoring diagnostics for applications and AI agents.

---

## 🧭 When to Use

* When investigating production crashes, unhandled exceptions, and performance regressions.
* When instrumenting LLM agent calls, tool execution latencies, and token spend telemetry.
* When correlating frontend user errors with distributed backend microservice trace spans.
* When triaging releases with automated health regressions and canary deployment tracking.

---

## 🎯 Core Capabilities

1. **Stack Trace Demangling & Source Maps**: Automatically maps minified production stack traces back to original TypeScript/Kotlin/Python source lines.
2. **Distributed Tracing & Spans**: Traces end-to-end execution paths across HTTP requests, database queries, and AI model inference calls.
3. **AI Agent Telemetry**: Native spans for LLM prompts, completion token counts, latency distributions, and tool-call errors.
4. **Issue Grouping & Fingerprinting**: Groups duplicate exceptions by root cause while isolating novel regression spikes.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/sentry-diagnostics
```

### Python SDK Instrumentation
```python
import sentry_sdk

sentry_sdk.init(
    dsn="https://examplePublicKey@o0.ingest.sentry.io/0",
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

with sentry_sdk.start_span(op="ai.agent.run", description="Execute reasoning loop"):
    # Instrumented agent task execution
    pass
```

### Sentry CLI Release & Source Map Management
```bash
# Associate source maps with release
sentry-cli releases new "v1.4.0"
sentry-cli releases files "v1.4.0" upload-sourcemaps ./dist
sentry-cli releases finalize "v1.4.0"
```

---

## 📋 Prerequisites

* Sentry DSN or local self-hosted Sentry instance
* `sentry-cli` installed for build-time source map uploads
* Sentry SDK for target runtime (Python, JavaScript/TypeScript, Go, Kotlin)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Leaking sensitive PII (passwords, auth tokens, credit cards) into error event breadcrumbs.
* **Anti-Pattern:** Blindly setting `traces_sample_rate=1.0` in high-throughput production without budgeting.
* **Anti-Pattern:** Ignoring source map verification, leaving production errors unreadable.

