---
name: react-native-windows
description: Microsoft official React Native for Windows and macOS architecture samples, native C++/WinRT modules, WinUI 3 desktop controls, and XAML styling patterns.
---

# React Native for Windows & Desktop Samples (`react-native-windows`)

Official architecture samples, templates, and native module patterns stewarded by Microsoft for building desktop experiences on Windows 10/11, macOS, and Surface Duo devices with React Native, WinUI 3, and WinRT.

---

## When to Use

- When building or modernizing desktop applications targeting Windows 10/11 using React Native for Windows (`react-native-windows`).
- When implementing native C++ or C# WinRT modules (`NativeModuleSample`) to call Windows platform APIs directly from JavaScript/TypeScript.
- When creating custom native desktop UI components that embed native WinUI 3, XAML controls, or Win32 window chrome into a React Native tree.
- When configuring automated CI/CD build pipelines with MSBuild, Visual Studio, and GitHub Actions for React Native desktop packaging (MSIX / Store).
- When designing adaptive desktop layouts, mouse/keyboard shortcuts, window resizing behaviors, or Surface Duo dual-screen adaptivity.

---

## Core Capabilities

1. **Native Module Development (C++ / WinRT & C#)**:
   - Scaffolds strongly typed C++ / WinRT asynchronous methods, events, and callback channels (`ReactContext`).
   - Maps Windows Runtime (WinRT) APIs (notifications, file system pickers, hardware sensors, windows registry) to JavaScript promises.
2. **WinUI 3 & XAML Desktop Controls**:
   - Host native XAML controls (e.g. `AutoSuggestBox`, `NavigationView`, `ColorPicker`, `MediaPlayerElement`) inside React Native JSX components.
   - Enforce fluent design system tokens: Mica and Acrylic material transparency, elevation, and responsive window resizing.
3. **Desktop Windowing & Ergonomics**:
   - Window lifecycle control: title bar customization, min/max dimensions, fullscreen states, and system tray integration.
   - Keyboard accelerator dispatch and hardware mouse right-click context menus.
4. **CI/CD & MSIX Packaging**:
   - Sample Azure DevOps and GitHub Actions workflows for deterministic headless MSBuild compilation and NuGet package resolution.
   - MSIX package generation for enterprise sideloading and Microsoft Store distribution.
5. **Cross-Desktop Portability**:
   - Shared business logic and UI components across Windows (`react-native-windows`) and macOS (`react-native-macos`).

---

## Installation & Activation

```bash
# Add React Native for Windows to an existing React Native app
npx react-native-windows-init --overwrite

# Clone Microsoft's official architecture samples & templates
git clone https://github.com/microsoft/react-native-windows-samples.git

# Run sample calculator (C++ / WinUI)
cd react-native-windows-samples/samples/Calculator
npm install
npx react-native run-windows
```

---

## Prerequisites

- **Windows 10/11** operating system (build 19041 or higher recommended).
- **Node.js** (`>= 18.x`) and package manager (`npm` or `yarn`).
- **Visual Studio 2022** with the following workloads:
  - Desktop development with C++
  - Universal Windows Platform (UWP) development (or Windows App SDK / WinUI 3)
  - C++ (v143) Universal Windows Platform tools
  - Windows 10/11 SDK (10.0.19041.0 or newer)

---

## Anti-Patterns & Warnings

- **Avoid Mobile-Only Assumptions**: Desktop apps run in resizable, multi-window environments. Never hardcode fixed window dimensions or rely exclusively on mobile touch gestures; always support mouse scroll-wheels, hovering, and keyboard tab indices.
- **Do Not Block the UI Thread in Native Modules**: Long-running WinRT or C++ native operations must execute on background threads via `std::async` or `winrt::resume_background()`; blocking the XAML UI thread causes desktop application freezing and window unresponsiveness.
- **Avoid Heavy C++ Recompiles in JS-Only Cycles**: When modifying pure TypeScript/JavaScript application logic, rely on React Native Fast Refresh (`npx react-native start`) instead of repeatedly rebuilding the heavy native Visual Studio C++ solution.
- **Validate Target SDK Matrix**: Ensure NuGet dependencies and Windows App SDK versions match the target Windows OS build requirements across enterprise client machines.
