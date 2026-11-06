# Jetpack Compose Performance Cheat Sheet

Rules for eliminating dropped frames, recomposition storms, and UI jank.

---

## 1. Stability Annotation
Ensure data classes passed to composables are marked as immutable or stable:
```kotlin
import androidx.compose.runtime.Immutable

@Immutable
data class ChannelUiState(
    val channelId: String,
    val participants: List<ParticipantItem>, // Ensure list is wrapped or immutable
    val isTransmitting: Boolean
)
```

---

## 2. Defer State Reading via Lambdas
Read high-frequency state (e.g. scroll offset, audio dB levels) inside draw or layout phase:
```kotlin
// BAD: Recomposes entire composable on every dB change
Modifier.offset(y = state.volumeLevel.dp)

// GOOD: Defers reading to layout phase, skipping recomposition
Modifier.offset { IntOffset(x = 0, y = state.volumeLevel.roundToPx()) }
```

---

## 3. Derived State for Dependent Computations
```kotlin
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 5 }
}
```
