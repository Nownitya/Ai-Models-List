# Technical Requirements Document (TRD) — {{PROJECT_NAME}}

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
