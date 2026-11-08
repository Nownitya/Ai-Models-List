---
name: trailofbits-security
description: Trail of Bits high-assurance code security, sharp edges detection, supply-chain risk auditing, and static analysis verification.
---

# Trail of Bits High-Assurance Security (`trailofbits/skills`)

> **Priority:** `P0` | **Framework:** `trailofbits/skills` | **Domain:** `03-code-review-and-quality` | **Stars:** `⭐ 8.0k+`

Trail of Bits high-assurance code security, sharp edges detection, supply-chain risk auditing, and static analysis verification.

---

## 🧭 When to Use

* When conducting security-focused code reviews on sensitive cryptographic, financial, or authentication logic.
* When detecting subtle API traps, "sharp edges", and language misfeatures (e.g. unsafe concurrency, memory safety hazards).
* When auditing third-party dependencies and supply-chain lockfiles for known vulnerabilities and typosquatting.
* When verifying defensive invariant checks before deploying critical software.

---

## 🎯 Core Capabilities

1. **Sharp Edges Taxonomy**: Identifies deceptively simple APIs that invite catastrophic security bugs when misused.
2. **Supply-Chain Dependency Auditing**: Analyzes package locks, pinned commit hashes, and build-time install scripts.
3. **Cryptographic Invariant Verification**: Audits random number generators (CSPRNG), constant-time comparisons, and key derivation.
4. **Adversarial Bug Modeling**: Formulates proof-of-concept exploits to verify whether reported vulnerabilities are actionable.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/trailofbits-security
```

### Static Security Review Rubric
```markdown
### Trail of Bits Security Review Checklist
1. **Memory & Concurrency Safety:**
   - Are shared state access points protected by explicit mutexes or immutable data structures?
   - Is there any risk of time-of-check to time-of-use (TOCTOU) file race conditions?

2. **Input Sanitization & Injection:**
   - Are raw SQL queries or shell strings constructed via interpolation?
   - Are deserialization payloads validated against strict schemas before instantiation?

3. **Cryptographic Rigor:**
   - Is `crypto.getRandomValues()` or `secrets` used instead of `Math.random()`?
   - Are timing attacks mitigated using `crypto.timingSafeEqual()`?
```

---

## 📋 Prerequisites

* Codebase in Python, Rust, Go, C++, or TypeScript
* Familiarity with OWASP ASVS and Trail of Bits security publications

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Assuming internal network microservices are trusted and omitting authorization checks.
* **Anti-Pattern:** Inventing custom cryptographic algorithms or hand-rolled cipher modes.

