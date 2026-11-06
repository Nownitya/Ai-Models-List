# Product Requirements Document (PRD) — {{PROJECT_NAME}}

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
