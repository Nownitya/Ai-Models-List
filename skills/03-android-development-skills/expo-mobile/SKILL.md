---
name: expo-mobile
description: Official Expo React Native mobile development workflows, custom dev clients, native module configuration, and OTA update pipelines.
---

# Expo Mobile & React Native Architecture (`expo/skills`)

> **Priority:** `P1` | **Framework:** `expo/skills` | **Domain:** `03-android-development-skills` | **Stars:** `⭐ 4.0k+`

Official Expo React Native mobile development workflows, custom dev clients, native module configuration, and OTA update pipelines.

---

## 🧭 When to Use

* When developing cross-platform mobile apps for Android and iOS using React Native.
* When configuring custom native modules and config plugins without manually touching Gradle or Xcode projects.
* When deploying over-the-air (OTA) JavaScript bundle updates via EAS Update.
* When optimizing app boot times, bundle sizes, and native bridge performance.

---

## 🎯 Core Capabilities

1. **Continuous Native Generation (CNG)**: Generates the `android` and `ios` directories dynamically from `app.json`, avoiding brittle checked-in native project files.
2. **Custom Dev Clients**: Builds debug binaries containing all custom C++/Kotlin/Swift native code for rapid local reloading.
3. **EAS Build & Update**: Cloud-managed build infrastructure generating production APK/AAB and IPA binaries.
4. **Hardware API Abstractions**: First-class access to Camera, Gyroscope, Biometrics, FileSystem, and Push Notifications.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/expo-mobile
```

### Configuration (`app.json`)
```json
{
  "expo": {
    "name": "OmniMobile",
    "slug": "omni-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "android": {
      "package": "com.company.omnimobile",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#090d16"
      }
    },
    "plugins": [
      ["expo-camera", { "cameraPermission": "Allow camera access for scanning." }]
    ]
  }
}
```

### CLI Workflow
```bash
# Start local development server with Metro bundler
npx expo start

# Prebuild native Android project files deterministically
npx expo prebuild --platform android

# Run debug build on connected Android emulator or device
npx expo run:android
```

---

## 📋 Prerequisites

* Node.js 18+
* Android Studio and Android SDK installed (for local native builds)
* Expo CLI (`npm install -g expo-cli` or `npx expo`)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Manually editing generated files in `android/` or `ios/` when Continuous Native Generation is enabled (changes will be overwritten on next prebuild).
* **Anti-Pattern:** Pushing breaking native module changes via OTA updates without bumping runtime versions.
