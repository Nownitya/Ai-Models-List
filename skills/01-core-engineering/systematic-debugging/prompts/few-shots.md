# Systematic Debugging — Few-Shot Prompt Exemplar

This document provides a canonical few-shot exemplar demonstrating how an agent must execute the 4-Phase Diagnostic Protocol.

---

### User Request
> "Our message deduplication filter in `PacketDeduplicator.kt` is randomly dropping valid consecutive packets when they arrive with identical timestamps."

---

### Model Reasoning & Scratchpad
```markdown
<scratchpad>
1. REPRODUCE:
   - Identify how PacketDeduplicator checks equality.
   - Hypothesis: It compares `timestamp` alone rather than `(packetId, sequenceNumber, senderUid)`.
   - Write a unit test sending two distinct packets with the exact same millisecond timestamp.

2. ISOLATE:
   - Run `./gradlew :app:sharedLogic:test --tests PacketDeduplicatorTest.testDuplicateTimestampDistinctId`.
   - Result: Test FAILS. The deduplicator returns `false` on the second valid packet because key collision occurs in `seenTimestamps.contains(packet.timestamp)`.

3. SURGICAL FIX:
   - Change deduplication key composite: `data class DeduplicationKey(val packetId: Long, val senderUid: Int)`.
   - Retain 1000-entry LRU sliding window.
   - Zero changes to packet parsing or networking interfaces.

4. REGRESSION VERIFICATION:
   - Run `./gradlew :app:sharedLogic:test`.
   - Result: 48 tests pass cleanly. Zero regressions.
</scratchpad>
```

---

### Verifiable Output
```kotlin
// In PacketDeduplicator.kt
private val seenPackets = LruCache<DeduplicationKey, Boolean>(maxSize = 1000)

fun isDuplicate(packet: MeshPacket): Boolean {
    val key = DeduplicationKey(packetId = packet.id, senderUid = packet.senderUid)
    if (seenPackets.get(key) == true) {
        return true
    }
    seenPackets.put(key, true)
    return false
}
```
Verification proof:
```text
> Task :app:sharedLogic:test
PacketDeduplicatorTest > testDuplicateTimestampDistinctId PASSED
BUILD SUCCESSFUL in 1s
```

