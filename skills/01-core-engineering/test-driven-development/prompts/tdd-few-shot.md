# Test-Driven Development (TDD) — Red-Green-Refactor Exemplar

---

### Step 1: RED (Failing Test)
```kotlin
@Test
fun `calculateRiskScore returns CRITICAL when packet loss exceeds twenty-five percent`() {
    val analyzer = MeshHealthAnalyzer()
    val telemetry = LinkTelemetry(packetLossRate = 0.28f, pingMs = 120)
    
    val score = analyzer.calculateRiskScore(telemetry)
    
    assertEquals(RiskScore.CRITICAL, score)
}
```
*Run test*: `./gradlew test` fails with `Unresolved reference: calculateRiskScore`.

---

### Step 2: GREEN (Minimal Implementation)
```kotlin
class MeshHealthAnalyzer {
    fun calculateRiskScore(telemetry: LinkTelemetry): RiskScore {
        return if (telemetry.packetLossRate > 0.25f) {
            RiskScore.CRITICAL
        } else {
            RiskScore.NORMAL
        }
    }
}
```
*Run test*: `./gradlew test` passes cleanly.

---

### Step 3: REFACTOR (Clean Code & Invariants)
```kotlin
class MeshHealthAnalyzer {
    companion object {
        private const val CRITICAL_PACKET_LOSS_THRESHOLD = 0.25f
    }

    fun calculateRiskScore(telemetry: LinkTelemetry): RiskScore {
        require(telemetry.packetLossRate in 0.0f..1.0f) { "Loss rate must be in [0.0, 1.0]" }
        return when {
            telemetry.packetLossRate > CRITICAL_PACKET_LOSS_THRESHOLD -> RiskScore.CRITICAL
            else -> RiskScore.NORMAL
        }
    }
}
```
*Run test*: Suite passes; input validation invariants secured.

