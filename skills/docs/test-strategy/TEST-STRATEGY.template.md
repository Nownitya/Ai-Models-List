# Test Strategy & Verification Architecture — {{PROJECT_NAME}}

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
