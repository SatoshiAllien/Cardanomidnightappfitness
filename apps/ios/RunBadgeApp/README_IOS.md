# RunBadgeApp — iOS

Native SwiftUI app for Cardano Midnight App Fitness.

## Open in Xcode

```bash
open apps/ios/RunBadgeApp/RunBadgeApp.xcodeproj
```

Or double-click `RunBadgeApp.xcodeproj` in Finder.

## Requirements

- Xcode 15+
- iOS 16.0+
- Apple ID for signing (free tier OK for personal device)

## Setup

1. Select project **RunBadgeApp** in navigator
2. **Signing & Capabilities** → Team → your Apple ID
3. Select iPhone or Simulator
4. Press **⌘R**

## Features

- Start/stop workout with timer
- Track distance, duration, calories (simulated GPS during active workout)
- Local persistence via UserDefaults
- Workout history
- Badge earned screen when threshold met (3 km + 20 min)

## Architecture

MVVM with `AppState` as shared environment object.