# Layer 15 — Universal Project Documentation Standard Template Library

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
