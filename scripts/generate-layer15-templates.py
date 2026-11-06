"""Layer 15 Universal Project Documentation Template Generator
Generates institutional-quality, reusable markdown templates parameterized with placeholders.
"""
import os
import sys

TEMPLATES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates', 'layer-15'))

TEMPLATES = {
    '01-foundation/README.template.md': """# {{PROJECT_NAME}}

> {{PROJECT_TAGLINE_OR_ELEVATOR_PITCH}}

---

## 🚀 Overview
{{PROJECT_SUMMARY_PARAGRAPH}}

### Key Highlights
- **{{HIGHLIGHT_1_TITLE}}:** {{HIGHLIGHT_1_DESC}}
- **{{HIGHLIGHT_2_TITLE}}:** {{HIGHLIGHT_2_DESC}}
- **{{HIGHLIGHT_3_TITLE}}:** {{HIGHLIGHT_3_DESC}}

---

## 📦 Architecture & Key Modules

| Module / Directory | Responsibility | Tech Stack |
| :--- | :--- | :--- |
| `core/` | Domain logic and invariants | Kotlin / TypeScript / Python |
| `api/` | Interface contracts and routes | REST / gRPC / GraphQL |
| `ui/` | Client presentation layer | Compose / React / Flutter |
| `docs/` | Universal Project Documentation | Markdown (Layer 15) |

---

## 🛠️ Quick Start

### Prerequisites
- {{PREREQUISITE_1}}
- {{PREREQUISITE_2}}

### Installation & Run
```bash
# Clone repository
git clone {{REPO_URL}}
cd {{PROJECT_DIR}}

# Install dependencies
{{INSTALL_COMMAND}}

# Run development server / application
{{RUN_COMMAND}}

# Run test suite
{{TEST_COMMAND}}
```

---

## 📚 Project Documentation (Layer 15)
- [PRD (Product Requirements)](docs/PRD.md)
- [Architecture Blueprint](docs/ARCHITECTURE.md)
- [Test Strategy & Verification](docs/testing/TEST-STRATEGY.md)
- [Agent Operating Instructions](AGENTS.md)
- [Roadmap & Milestones](docs/ROADMAP.md)

---

## ⚖️ License
Distributed under the {{LICENSE_TYPE}} License. See `LICENSE` for details.
""",

    '01-foundation/CONTRIBUTING.template.md': """# Contributing to {{PROJECT_NAME}}

Thank you for your interest in contributing to **{{PROJECT_NAME}}**! This guide outlines our development workflow, coding standards, and branch policies.

---

## 🧭 Code of Conduct
All contributors are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to `{{SECURITY_CONTACT_EMAIL}}`.

---

## 🌿 Branching & Development Workflow
We follow Trunk-Based Development with short-lived feature branches:
1. Create branch from `main`: `feature/{{SHORT_NAME}}` or `fix/{{SHORT_NAME}}`.
2. Ensure all pre-commit hooks pass locally:
   ```bash
   {{PRE_COMMIT_COMMAND}}
   ```
3. Run local unit & integration tests:
   ```bash
   {{TEST_COMMAND}}
   ```
4. Open a Pull Request with a clear summary against `main`.

---

## 🧪 Definition of Done (DoD)
Before any PR is merged, it must meet:
- [ ] 100% passing tests (`{{TEST_COMMAND}}`).
- [ ] No regressions in test coverage.
- [ ] Documentation updated in `docs/` (Layer 15).
- [ ] Clean linting and static analysis report.
- [ ] Code review approved by at least 1 maintainer.
""",

    '01-foundation/CHANGELOG.template.md': """# Changelog

All notable changes to **{{PROJECT_NAME}}** will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Added
- {{FEATURE_OR_IMPROVEMENT}}

### Changed
- {{CHANGE_DESCRIPTION}}

### Fixed
- {{BUG_FIX_DESCRIPTION}}

---

## [{{VERSION_1_0_0}}] - {{RELEASE_DATE}}
### Added
- Initial public release of {{PROJECT_NAME}}.
- Full Layer 15 documentation suite.
- Baseline test verification suite.
""",

    '01-foundation/SECURITY.template.md': """# Security Policy — {{PROJECT_NAME}}

## 🛡️ Supported Versions

| Version | Supported | Notes |
| :--- | :--- | :--- |
| `{{CURRENT_VERSION}}` | :white_check_mark: | Active security updates |
| `< {{CURRENT_VERSION}}` | :x: | Upgrade required |

---

## 🚨 Reporting a Vulnerability
If you discover a security vulnerability in **{{PROJECT_NAME}}**, please report it responsibly:
- **Email:** `{{SECURITY_CONTACT_EMAIL}}`
- **PGP Key / Encryption:** `{{OPTIONAL_PGP_KEY}}`
- **Expected Initial Response:** Within {{RESPONSE_WINDOW_HOURS}} hours.

**Please DO NOT open a public issue on GitHub.** We will acknowledge receipt, triage the issue, and provide a remediation timeline.
""",

    '02-business-strategy/BRD.template.md': """# Business Requirements Document (BRD) — {{PROJECT_NAME}}

> **Document Version:** {{VERSION}}  
> **Status:** {{STATUS}} (Draft / In Review / Approved)  
> **Product Category:** {{CATEGORY}}  
> **Target Audience:** {{TARGET_AUDIENCE}}  

---

## 1. Business Context & Strategic Alignment

### 1.1 Commercial Objectives
1. **{{OBJECTIVE_1_NAME}}:** {{OBJECTIVE_1_DESCRIPTION}}
2. **{{OBJECTIVE_2_NAME}}:** {{OBJECTIVE_2_DESCRIPTION}}
3. **{{OBJECTIVE_3_NAME}}:** {{OBJECTIVE_3_DESCRIPTION}}

### 1.2 Key Performance Indicators (KPIs)

| Business KPI | Baseline | Target Metric | Business Impact |
| :--- | :--- | :--- | :--- |
| **{{KPI_1_NAME}}** | {{BASELINE_1}} | **{{TARGET_1}}** | {{IMPACT_1}} |
| **{{KPI_2_NAME}}** | {{BASELINE_2}} | **{{TARGET_2}}** | {{IMPACT_2}} |
| **{{KPI_3_NAME}}** | {{BASELINE_3}} | **{{TARGET_3}}** | {{IMPACT_3}} |

---

## 2. Stakeholder Matrix & Impact Analysis

| Stakeholder Role | Needs & Expectations | Primary Concern |
| :--- | :--- | :--- |
| **End Users** | {{END_USER_NEEDS}} | {{END_USER_CONCERN}} |
| **Engineering / DevOps** | {{ENG_NEEDS}} | {{ENG_CONCERN}} |
| **Security & Compliance** | {{SEC_NEEDS}} | {{SEC_CONCERN}} |
| **Executive Leadership** | {{LEADERSHIP_NEEDS}} | {{LEADERSHIP_CONCERN}} |

---

## 3. Financial, Licensing & Regulatory Invariants
- **Operating Cost Budget:** Maximum ${{MONTHLY_BUDGET}}/month.
- **Hardware & Bandwidth Constraints:** {{HARDWARE_CONSTRAINTS}}
- **Regulatory Compliance:** {{REGULATORY_STANDARDS}} (e.g. GDPR, HIPAA, FCC, CE).
""",

    '02-business-strategy/MRD.template.md': """# Market Requirements Document (MRD) — {{PROJECT_NAME}}

> **Document Version:** {{VERSION}}  
> **Status:** {{STATUS}}  
> **Market Segment:** {{MARKET_SEGMENT}}  

---

## 1. Market Problem Statement & Opportunity
- **Core Market Pain:** {{CORE_MARKET_PAIN_DESCRIPTION}}
- **Market Size (TAM / SAM / SOM):** {{MARKET_SIZE_ESTIMATES}}
- **Current Alternatives & Deficiencies:**
  1. *{{ALTERNATIVE_1}}:* {{DEFICIENCY_1}}
  2. *{{ALTERNATIVE_2}}:* {{DEFICIENCY_2}}

---

## 2. Competitive Positioning Matrix

| Capability / Factor | {{PROJECT_NAME}} | Competitor A | Competitor B |
| :--- | :--- | :--- | :--- |
| **Deployment Model** | {{OUR_DEPLOYMENT}} | Cloud-only | On-premise only |
| **Pricing / TCO** | **{{OUR_PRICING}}** | High / User / Mo | Enterprise quote |
| **Offline Reliability** | **{{OUR_OFFLINE}}** | Fails offline | Partial |
| **Open Ecosystem** | **{{OUR_OPENNESS}}** | Walled garden | Proprietary API |

---

## 3. Target User Personas
- **Primary Persona:** {{PRIMARY_PERSONA_SUMMARY}}
- **Secondary Persona:** {{SECONDARY_PERSONA_SUMMARY}}
""",

    '03-product-scope/PRD.template.md': """# Product Requirements Document (PRD) — {{PROJECT_NAME}}

> **Document Version:** {{VERSION}}  
> **Product Lead:** {{PRODUCT_LEAD}}  
> **Engineering Lead:** {{ENGINEERING_LEAD}}  

---

## 1. Executive Summary & Product Vision
{{PRODUCT_VISION_STATEMENT}}

---

## 2. Core User Stories & Acceptance Criteria

### 2.1 Epic: {{EPIC_1_TITLE}}

#### User Story US-101: {{STORY_101_TITLE}}
> **As a** {{USER_ROLE}},  
> **I want to** {{ACTION_DESIRED}},  
> **So that** {{BENEFIT_ACHIEVED}}.

**Acceptance Criteria (Gherkin):**
```gherkin
Scenario: {{SCENARIO_NAME}}
  Given {{INITIAL_CONDITION}}
  When {{EVENT_OR_ACTION}}
  Then {{EXPECTED_OUTCOME}}
  And {{ADDITIONAL_VERIFICATION}}
```

---

## 3. Non-Functional Requirements (NFRs)

| Dimension | Constraint / Target | Verification Method |
| :--- | :--- | :--- |
| **Latency** | < {{LATENCY_MS}} ms for critical user paths | Automated benchmark test |
| **Throughput** | > {{THROUGHPUT_REQ}} ops/sec | Load test harness |
| **Availability** | {{AVAILABILITY_PERCENT}}% uptime SLA | CloudWatch / Prometheus |
| **Battery / CPU** | < {{CPU_BUDGET}}% peak CPU | Profiler trace |
| **Security** | Zero high/critical CVEs | Trivy / Snyk security scan |
""",

    '03-product-scope/ROADMAP.template.md': """# Product & Engineering Roadmap — {{PROJECT_NAME}}

> **Last Updated:** {{DATE}}  
> **Strategy:** Phased delivery with strict Definition of Done gates.

---

## 🗺️ Milestone Horizon Map

```mermaid
flowchart LR
    M1["Phase 1: Foundation (v1.0)"] --> M2["Phase 2: Core Capabilities (v2.0)"]
    M2 --> M3["Phase 3: Scale & Ecosystem (v3.0)"]
```

---

## Detailed Milestone Gates

### Milestone 1: Foundation (v1.0) — Target: {{DATE_M1}}
- [ ] Core domain model and local persistence engine.
- [ ] Basic CLI / API interface contracts.
- [ ] Automated CI/CD with 90%+ unit test coverage.
- **Exit Gate:** All core acceptance tests passing; zero critical bugs.

### Milestone 2: Core Capabilities (v2.0) — Target: {{DATE_M2}}
- [ ] Real-time communication and multi-node synchronization.
- [ ] Production-hardened security and encryption layer.
- [ ] Cross-platform client apps (Android / Web / Desktop).
- **Exit Gate:** Benchmark verification passes load limits.

### Milestone 3: Ecosystem & Scale (v3.0) — Target: {{DATE_M3}}
- [ ] Third-party plugin SDK and external integration APIs.
- [ ] High-availability multi-region cloud clustering.
""",

    '03-product-scope/FEATURES.template.md': """# Feature Inventory & Status Matrix — {{PROJECT_NAME}}

> **Tracking Standard:** Every feature has an immutable ID (`FEAT-xxx`), owner, status, and automated test link.

---

## 📋 Feature Register

| Feature ID | Category | Feature Name | Priority | Status | Verification Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `FEAT-001` | Core | {{FEAT_001_NAME}} | P0 | Verified | `tests/core/test_auth.py` |
| `FEAT-002` | Core | {{FEAT_002_NAME}} | P0 | In Progress | `tests/core/test_sync.py` |
| `FEAT-003` | Protocol | {{FEAT_003_NAME}} | P1 | Planned | `tests/protocol/test_wire.py` |
| `FEAT-004` | UI | {{FEAT_004_NAME}} | P1 | In Review | `tests/ui/test_dashboard.py` |
| `FEAT-005` | Security | {{FEAT_005_NAME}} | P0 | Verified | `tests/security/test_crypto.py` |

---

## Status Legend
- **Planned:** In backlog; specifications ready.
- **In Progress:** Actively under branch development.
- **In Review:** Pull request open; undergoing code & security review.
- **Verified:** 100% test pass recorded with factual evidence.
- **Deprecated:** Superseded by a newer architectural pattern.
""",

    '03-product-scope/PERSONAS.template.md': """# User Personas & Archetypes — {{PROJECT_NAME}}

---

## 👤 Primary Persona: {{PERSONA_1_TITLE}}
- **Profile:** {{PERSONA_1_DEMOGRAPHICS}}
- **Core Goals:**
  1. {{PERSONA_1_GOAL_1}}
  2. {{PERSONA_1_GOAL_2}}
- **Key Frustrations:**
  1. {{PERSONA_1_PAIN_1}}
  2. {{PERSONA_1_PAIN_2}}
- **Operating Environment:** {{PERSONA_1_ENVIRONMENT}} (e.g. Low battery, high noise, offline).

---

## 👤 Secondary Persona: {{PERSONA_2_TITLE}}
- **Profile:** {{PERSONA_2_DEMOGRAPHICS}}
- **Core Goals:** {{PERSONA_2_GOALS}}
""",

    '04-architecture-engineering/ARCHITECTURE.template.md': """# System Architecture Document — {{PROJECT_NAME}}

> **Architecture Style:** Clean Architecture / Domain-Driven Design  
> **Status:** Active Architectural Blueprint  

---

## 1. High-Level System Context (C4 Context Diagram)

```mermaid
graph TD
    User["End User / Client App"] --> API["API Gateway / Routing Layer"]
    API --> Auth["Authentication & IAM Service"]
    API --> Core["Core Domain Engine"]
    Core --> DB[("Primary Database")]
    Core --> Cache[("Distributed Cache (Redis)")]
    Core --> EventBus["Message Bus / Event Broker"]
```

---

## 2. Subsystem Decomposition & Boundaries

### 2.1 Core Subsystems
1. **Gateway Layer (`gateway/`):** Handles TLS termination, rate limiting, and JWT validation.
2. **Domain Service (`services/`):** Pure business logic isolated from external frameworks.
3. **Storage Engine (`storage/`):** Abstractions for persistence, transactional consistency, and migrations.
4. **Transport Layer (`transport/`):** Network protocol encoders, serializes payloads into compact binary/JSON.

---

## 3. Data Flow & Communication Invariants
- **Synchronous Commands:** REST / gRPC with strict timeout budgets (< {{TIMEOUT_MS}} ms).
- **Asynchronous Events:** Event-driven architecture via {{EVENT_BROKER}} with at-least-once delivery.
- **State Mutation:** CQRS pattern separating read models from write commands.
""",

    '04-architecture-engineering/DESIGN.template.md': """# Technical & UX Design Document — {{PROJECT_NAME}}

> **Author:** {{AUTHOR}}  
> **Status:** Approved Design  

---

## 1. Design Principles & Goals
1. **Low Cognitive Friction:** Minimal taps/clicks to complete core workflows.
2. **Graceful Degradation:** Full operational capability in offline or degraded network scenarios.
3. **Zero Data Loss:** Local-first queuing with optimistic UI updates.

---

## 2. Interaction Design & User Flows

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Client UI
    participant Service as Backend Service
    participant Store as Local Storage

    User->>App: Trigger Action
    App->>Store: Optimistic Local Save
    App->>User: Immediate UI Confirmation
    App->>Service: Async Sync Event
    Service-->>App: Ack & Server Timestamp
```

---

## 3. Screen Layouts & Tactical UI Profiles
- **Profile A (Normal Mode):** Rich dashboard, full telemetry, visual analytics.
- **Profile B (Tactical / High Stress):** High-contrast monochrome, oversized touch targets, haptic feedback.
""",

    '04-architecture-engineering/TRD.template.md': """# Technical Requirements Document (TRD) — {{PROJECT_NAME}}

> **Scope:** Hardware, OS, runtime environments, and performance budgets.

---

## 1. Runtime Targets & Compatibility Matrix

| Platform / Runtime | Minimum Version | Target Version | Toolchain / Compiler |
| :--- | :--- | :--- | :--- |
| **Server / Linux** | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS | Docker / Containerd |
| **Android** | API Level 26 (Android 8.0) | API Level 35 (Android 15) | AGP 8.x / Kotlin 2.1+ |
| **iOS** | iOS 16.0 | iOS 18.x | Swift 6 / Xcode 16+ |
| **Web Browser** | Chrome 120+, Safari 17+ | Evergreen Browsers | Node 22+ / Vite |

---

## 2. Performance Budgets & Resource Limits

| Resource | Budget Allocation | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Memory (RAM)** | < {{MAX_RAM_MB}} MB peak | Memory Profiler leak detection |
| **CPU Utilization** | < {{MAX_CPU_PERCENT}}% on 4-core device | Thread pool limits |
| **Binary Size** | < {{MAX_APP_SIZE_MB}} MB stripped | R8 / ProGuard / tree-shaking |
| **Network Payload** | < {{MAX_PAYLOAD_KB}} KB / transmission | Gzip / Protobuf compaction |
""",

    '04-architecture-engineering/SRD.template.md': """# Software Requirements Document (SRD) — {{PROJECT_NAME}}

> **Detailed Specifications for Software Subsystems & State Machines**

---

## 1. Subsystem Requirements

### 1.1 State Management Subsystem
- **SR-101:** The state manager must survive application restarts without state loss.
- **SR-102:** Invalid state transitions must throw typed domain errors and revert cleanly.

### 1.2 Network & Resilience Subsystem
- **SR-201:** The network client must apply exponential backoff with jitter on HTTP 5xx / connection dropped.
- **SR-202:** Offline queue must buffer up to {{MAX_OFFLINE_ITEMS}} actions in persistent SQLite/Room storage.

---

## 2. Error Taxonomy & Fallback Strategies

| Error Code | Error Category | Trigger Condition | Fallback Action |
| :--- | :--- | :--- | :--- |
| `ERR_NET_UNAVAILABLE` | Network | Radio disconnected | Queue offline mutation; notify user via status pill |
| `ERR_AUTH_EXPIRED` | Security | Refresh token rejected | Flush session; prompt biometric re-authentication |
| `ERR_STORAGE_FULL` | System | Disk write failed | Evict LRU cache chunks; alert user |
""",

    '04-architecture-engineering/SSD.template.md': """# System Specification Document (SSD) — {{PROJECT_NAME}}

> **Module Decomposition, Concurrency, and Threading Model**

---

## 1. Threading & Concurrency Model

| Dispatcher / Thread Pool | Pool Size | Allowed Tasks | Prohibited Tasks |
| :--- | :--- | :--- | :--- |
| **Main / UI Thread** | Single-threaded | UI rendering, user input | Any disk I/O, network calls |
| **IO Dispatcher** | 64 threads | Database queries, file writes | Heavy CPU transformations |
| **Computation Dispatcher** | Core count | Encryption, audio/video codecs | Blocking network I/O |

---

## 2. Lifecycle & Background Execution
- Subsystems must register with the application lifecycle manager.
- Background workers must yield within 50ms upon OS low-memory warning.
""",

    '04-architecture-engineering/TSD.template.md': """# Technical Specification Document (TSD) — {{PROJECT_NAME}}

> **Wire Protocols, Binary Layouts, and Mathematical Algorithms**

---

## 1. Packet Wire Protocol Layout

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Magic (0xAA) |  Version (01) |          Packet Type          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Sequence Number                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Payload Length (N)                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Payload Bytes...                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     CRC-32 Checksum (4 bytes)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

---

## 2. Mathematical Algorithms & Cryptography
- **Audio Codec:** Opus compressed at {{OPUS_BITRATE}} kbps.
- **End-to-End Encryption:** XChaCha20-Poly1305 with ephemeral Curve25519 key exchange.
- **Routing Algorithm:** Distance-Vector routing with hop-count TTL damping.
""",

    '04-architecture-engineering/DATA-MODEL.template.md': """# Data Model & Schema Specification — {{PROJECT_NAME}}

> **Entities, Relationships, Ownership, and Migrations**

---

## 1. Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ SESSION : owns
    USER ||--o{ AUDIT_LOG : generates
    USER ||--o{ RECORD : creates
    RECORD ||--|{ ATTACHMENT : contains
```

---

## 2. Schema Definitions

### 2.1 Table: `users`
| Column | Type | Constraints | Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, Not Null | Unique user identity |
| `email` | `VARCHAR(255)` | Unique, Indexed, Not Null | Account identifier |
| `role` | `VARCHAR(50)` | Not Null, Default 'user' | RBAC authorization role |
| `created_at` | `TIMESTAMP WITH TZ`| Not Null, Current Timestamp | Creation audit |

---

## 3. Data Retention & Privacy Invariants
- User sensitive personal data must be encrypted at rest with AES-256-GCM.
- Inactive temporary tokens must be purged every 24 hours.
""",

    '04-architecture-engineering/API-SPECIFICATION.template.md': """# API Specification — {{PROJECT_NAME}}

> **Standard:** OpenAPI 3.1 / RESTful JSON / gRPC

---

## 1. Base URL & Authentication
- **Base URL:** `https://api.{{DOMAIN_NAME}}/v1`
- **Authentication:** Bearer JWT in `Authorization` header.

---

## 2. Endpoint Index

| Method | Route | Description | Auth Required | Rate Limit |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate & exchange credentials | No | 5 req / min |
| `GET` | `/users/me` | Fetch active user profile | Yes | 60 req / min |
| `POST` | `/records` | Create new domain record | Yes | 30 req / min |
| `GET` | `/records/{id}` | Retrieve record by ID | Yes | 120 req / min |

---

## 3. Standard Error Envelope
All error responses return:
```json
{
  "error": {
    "code": "INVALID_ARGUMENT",
    "message": "Field 'email' must be a valid email format.",
    "timestamp": "2026-11-07T05:00:00Z",
    "trace_id": "req-7a8f902b"
  }
}
```
""",

    '04-architecture-engineering/adr/0000-record-architecture-decision.template.md': """# ADR-{{NUMBER}}: {{TITLE}}

> **Date:** {{DATE}}  
> **Status:** {{STATUS}} (Proposed / Accepted / Deprecated / Superseded)  
> **Deciders:** {{DECIDERS}}  

---

## Context and Problem Statement
{{PROBLEM_DESCRIPTION_AND_DRIVERS}}

---

## Considered Options
1. **Option 1:** {{OPTION_1_NAME}}
2. **Option 2:** {{OPTION_2_NAME}}
3. **Option 3:** {{OPTION_3_NAME}}

---

## Decision Outcome
**Chosen Option:** {{CHOSEN_OPTION}} because {{REASONING}}.

### Positive Consequences
- {{POSITIVE_CONSEQUENCE_1}}
- {{POSITIVE_CONSEQUENCE_2}}

### Negative Consequences / Trade-offs
- {{TRADE_OFF_1}}
- {{TRADE_OFF_2}}

---

## Compliance & Verification
How will this decision be enforced in CI or code review?
- {{VERIFICATION_METHOD}}
""",

    '05-ai-governance/AGENTS.template.md': """# AGENTS.md — Agent Operating Instructions & Invariants

> **Authoritative Guide for AI Coding Agents Operating in {{PROJECT_NAME}}**

---

## 🏛️ Non-Negotiable Laws

### Law 1: Test-First & No Mocking Real Business Logic
Never claim a feature is complete without running real tests with verified factual evidence.

### Law 2: Dual Matrix & Documentation Parity
Any architectural modification or skill addition must be updated across all indexes simultaneously.

### Law 3: Atomic Git Commits with Conventional Syntax
Every commit must be small, cohesive, and follow Conventional Commits format:
`feat(scope): message`, `fix(scope): message`, `docs(scope): message`.

---

## 🧭 Repository Navigation

| Path | Purpose |
| :--- | :--- |
| `src/` | Primary source code |
| `tests/` | Automated test suite |
| `docs/` | Universal Project Documentation (Layer 15) |
| `scripts/` | Tooling and automation scripts |

---

## ⚡ Agent Self-Review Gate
Before presenting output to user, verify:
- [ ] Did all tests pass without errors?
- [ ] Were relevant markdown docs updated?
- [ ] Are there any unverified hallucinations or dead links?
""",

    '05-ai-governance/RULES.template.md': """# Project Rules & Repository Invariants — {{PROJECT_NAME}}

> **Enforced by Automated CI and Pre-commit Hooks**

---

## 1. Code Architecture Rules
- **Layering Constraint:** The domain layer (`core/`) must NEVER import from presentation or transport layers.
- **Immutability:** Data transfer objects and domain events must be immutable data structures.
- **Explicit Error Handling:** Do not use bare `except:` or swallow exceptions without logging.

---

## 2. Git & Commit Hygiene
- Never commit private keys, `.env` files, or un-sanitized credentials.
- All Pull Requests must link to a valid `FEAT-xxx` or issue number.
""",

    '05-ai-governance/BRANCHING.template.md': """# Git Branching & Release Strategy — {{PROJECT_NAME}}

> **Standard:** Trunk-Based Development with Protected Main

---

## 1. Branch Strategy Diagram

```mermaid
gitGraph
    commit id: "Initial commit"
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Implement login logic"
    commit id: "Add login unit tests"
    checkout main
    merge feature/user-auth id: "Merge PR #101"
    branch release/v1.0.0
    checkout release/v1.0.0
    commit id: "Tag v1.0.0"
```

---

## 2. Branch Naming Conventions
- `feature/<ticket-id>-<slug>`: New functionality
- `fix/<ticket-id>-<slug>`: Bug fixes
- `refactor/<slug>`: Code restructuring without feature change
- `docs/<slug>`: Documentation-only changes
- `release/v<semver>`: Release staging branch
""",

    '05-ai-governance/MEMORY.template.md': """# Project Memory & Agent State — {{PROJECT_NAME}}

> **Long-term Context & Institutional Memory for AI Agents**

---

## 1. Critical Historical Decisions
- **Decision 1:** Chose Clean Architecture to isolate transport protocols.
- **Decision 2:** Standardized on Layer 15 Universal Project Documentation.

---

## 2. Active Technical Debt & Known Pitfalls
- **Debt 1:** Legacy parser needs migration to new streaming engine.
- **Pitfall 1:** Ensure memory cache is cleared across tenant context switches.
""",

    '05-ai-governance/TASKS.template.md': """# Work Breakdown Structure & Task Tracker — {{PROJECT_NAME}}

> **Sprint & Milestone Task Register**

---

## 📌 Active Sprint: Sprint {{SPRINT_NUMBER}}

| Task ID | Description | Owner | Status | Estimated (h) | Actual (h) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-101` | Setup database migrations | Lead Dev | Done | 4 | 3.5 |
| `TASK-102` | Implement JWT token verification | Security Eng | In Progress | 6 | - |
| `TASK-103` | Create end-to-end integration test | QA Eng | To Do | 8 | - |

---

## Status Key
- `To Do` -> `In Progress` -> `In Review` -> `Done`
""",

    '06-testing-and-reports/TEST-STRATEGY.template.md': """# Test Strategy & Verification Architecture — {{PROJECT_NAME}}

> **Goal:** 100% deterministic test execution with automated CI gating.

---

## 1. Test Pyramid & Coverage Targets

| Test Level | Scope | Framework | Coverage Target | Execution Frequency |
| :--- | :--- | :--- | :--- | :--- |
| **Unit Tests** | Pure domain functions & classes | pytest / JUnit / Vitest | > 90% | Every commit |
| **Integration Tests**| Database, cache, and API routes | Testcontainers | > 80% | Every PR |
| **E2E Tests** | User journeys & real clients | Playwright / Appium | Critical paths | Nightly & Release |
| **Performance** | Load, latency, and memory | k6 / JMeter / Profiler | Budget adherence| Milestone gate |

---

## 2. Definition of Done (DoD) Checklist
- [ ] Unit tests pass with 0 errors.
- [ ] Integration tests verify real network boundaries.
- [ ] No flaky tests allowed in pipeline.
- [ ] Test execution completes in < {{MAX_TEST_TIME_SEC}} seconds.
""",

    '06-testing-and-reports/SPRINT-CLOSEOUT-REPORT.template.md': """# Sprint {{SPRINT_NUMBER}} Closeout Report — {{PROJECT_NAME}}

> **Sprint Dates:** {{START_DATE}} to {{END_DATE}}  
> **Sprint Goal:** {{SPRINT_GOAL}}  
> **Status:** Completed / Partially Completed  

---

## 1. Executive Summary
During Sprint {{SPRINT_NUMBER}}, the team accomplished:
- **Velocity Delivered:** {{DELIVERED_STORY_POINTS}} of {{PLANNED_STORY_POINTS}} story points ({{COMPLETION_PERCENT}}%).
- **Tests Executed:** {{TEST_COUNT}} passing (100% pass rate).
- **Defects Discovered:** {{DEFECTS_COUNT}} (all triaged).

---

## 2. Completed Stories & Features

| Feature ID | Story Title | PR Link | Verification Evidence |
| :--- | :--- | :--- | :--- |
| `FEAT-001` | Implement user login | PR #101 | 15 passing tests |
| `FEAT-002` | Session invalidation | PR #104 | 8 passing tests |

---

## 3. Retrospective: What Went Well & What to Improve
- **What Went Well:** Swift turnaround on PR reviews; zero flaky tests.
- **To Improve:** Better estimation on complex data migration tasks.
""",

    '06-testing-and-reports/MILESTONE-VERIFICATION.template.md': """# Milestone {{MILESTONE_VERSION}} Verification Report — {{PROJECT_NAME}}

> **Milestone:** {{MILESTONE_VERSION}}  
> **Release Date:** {{RELEASE_DATE}}  
> **Verdict:** :white_check_mark: APPROVED FOR PRODUCTION / :x: REJECTED  

---

## 1. Verification Scorecard

| Domain | Criteria | Requirement | Observed Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Functional** | Acceptance Criteria Pass | 100% | 100% ({{TEST_PASS_COUNT}} tests) | :white_check_mark: PASS |
| **Performance** | API Latency (p95) | < 100ms | 42ms | :white_check_mark: PASS |
| **Security** | Vulnerability Scan | 0 High / Crit | 0 High / 0 Crit | :white_check_mark: PASS |
| **Reliability** | Stress Test Duration | 4 hours continuous | 4 hours zero crashes | :white_check_mark: PASS |

---

## 2. Sign-Off Approvals
- **Lead Architect:** {{ARCHITECT_NAME}} (Approved)
- **Product Owner:** {{PO_NAME}} (Approved)
- **Security Officer:** {{SECURITY_OFFICER_NAME}} (Approved)
""",

    '06-testing-and-reports/BENCHMARK-REPORT.template.md': """# Benchmark & Stress Test Report — {{PROJECT_NAME}}

> **Test Environment:** {{ENVIRONMENT_SPEC}}  
> **Execution Date:** {{TEST_DATE}}  

---

## 1. Test Objectives & Hardware Configuration
- **Hardware:** {{HARDWARE_DETAILS}} (CPU, Memory, Radio / Network)
- **Tooling:** {{BENCHMARK_TOOLS}} (e.g. k6, locust, iperf3)

---

## 2. Empirical Benchmark Results

| Metric | Target | Observed (Mean) | Observed (p99) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Throughput (req/s)** | > 5,000 | 7,420 | 6,110 | :white_check_mark: PASS |
| **Latency (ms)** | < 50ms | 18ms | 34ms | :white_check_mark: PASS |
| **Packet Drop Rate (%)** | < 2% | 0.04% | 0.12% | :white_check_mark: PASS |
| **Memory Consumption** | < 256 MB | 148 MB | 192 MB | :white_check_mark: PASS |
""",

    'README.md': """# Layer 15 — Universal Project Documentation Standard Template Library

This library contains production-grade, reusable document templates adhering to **Layer 15 Universal Project Documentation Standard** from the master AI matrix.

---

## 📂 Template Directory Hierarchy

```
templates/layer-15/
├── 01-foundation/
│   ├── README.template.md
│   ├── CONTRIBUTING.template.md
│   ├── CHANGELOG.template.md
│   └── SECURITY.template.md
├── 02-business-strategy/
│   ├── BRD.template.md                       # Business Requirements Document (P1)
│   └── MRD.template.md                       # Market Requirements Document (P2)
├── 03-product-scope/
│   ├── PRD.template.md                       # Product Requirements Document (P0)
│   ├── ROADMAP.template.md                   # Phased Delivery Roadmap (P0)
│   ├── FEATURES.template.md                  # Feature Matrix & Status (P0)
│   └── PERSONAS.template.md                  # Target Personas & Scenarios (P2)
├── 04-architecture-engineering/
│   ├── ARCHITECTURE.template.md              # System Architecture Blueprint (P0)
│   ├── DESIGN.template.md                    # Technical & UX Design (P1)
│   ├── TRD.template.md                       # Technical Requirements Document (P1)
│   ├── SRD.template.md                       # Software Requirements Document (P1)
│   ├── SSD.template.md                       # System Specification & Decomposition (P2)
│   ├── TSD.template.md                       # Technical Specification & Protocols (P2)
│   ├── DATA-MODEL.template.md                # Data Model & Schema (P1)
│   ├── API-SPECIFICATION.template.md         # API Contracts & Endpoints (P2)
│   └── adr/
│       └── 0000-record-architecture-decision.template.md (P1)
├── 05-ai-governance/
│   ├── AGENTS.template.md                    # AI Agent Entry Point & Laws (P0)
│   ├── RULES.template.md                     # Coding Standards & Prohibited Patterns (P0)
│   ├── BRANCHING.template.md                 # Git Branching & Protection Strategy (P1)
│   ├── MEMORY.template.md                    # Context & Cross-Session Memory (P1)
│   └── TASKS.template.md                     # Work Breakdown Structure (P0)
└── 06-testing-and-reports/
    ├── TEST-STRATEGY.template.md             # Verification Architecture & DoD (P0)
    ├── SPRINT-CLOSEOUT-REPORT.template.md     # Sprint Closeout Report (P1)
    ├── MILESTONE-VERIFICATION.template.md    # Milestone Verification Report (P1)
    └── BENCHMARK-REPORT.template.md          # Benchmark & Stress Testing (P2)
```

---

## 🛠️ Instant Project Scaffolding
To scaffold all Layer 15 documentation templates into a new project:
```bash
python scripts/scaffold-project-docs.py --target-dir /path/to/my-new-project --project-name "MyProject"
```
"""
}

def main():
    print(f"Generating Layer 15 templates into: {TEMPLATES_DIR}")
    for rel_path, content in TEMPLATES.items():
        full_path = os.path.join(TEMPLATES_DIR, rel_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content.strip() + '\n')
        print(f"  [OK] {rel_path}")

    print(f"\n[DONE] Successfully generated {len(TEMPLATES)} Layer 15 templates.")

if __name__ == '__main__':
    main()
