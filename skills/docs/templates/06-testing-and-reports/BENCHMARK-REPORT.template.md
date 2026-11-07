# Benchmark & Stress Test Report — {{PROJECT_NAME}}

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
