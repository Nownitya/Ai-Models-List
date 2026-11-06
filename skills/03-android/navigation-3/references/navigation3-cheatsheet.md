# Jetpack Navigation 3 Cheat Sheet

Essential architectural patterns for `androidx.navigation3` in Compose Multiplatform / Android.

---

## 1. Typed Route Declarations
```kotlin
import kotlinx.serialization.Serializable

@Serializable
sealed interface Route {
    @Serializable
    data object Dashboard : Route

    @Serializable
    data class ChannelDetail(val channelId: String) : Route

    @Serializable
    data object Settings : Route
}
```

---

## 2. Navigation3 Scene Setup
```kotlin
@Composable
fun MainAppNavigation(
    backstack: List<Route>,
    onNavigate: (Route) -> Unit,
    onBack: () -> Unit
) {
    NavDisplay(
        backstack = backstack,
        wrapper = { record ->
            PredictiveBackHandlerRecord(record, onBack = onBack)
        }
    ) { route ->
        when (route) {
            is Route.Dashboard -> DashboardScreen(onOpenChannel = { id -> onNavigate(Route.ChannelDetail(id)) })
            is Route.ChannelDetail -> ChannelScreen(channelId = route.channelId, onBack = onBack)
            is Route.Settings -> SettingsScreen(onBack = onBack)
        }
    }
}
```
