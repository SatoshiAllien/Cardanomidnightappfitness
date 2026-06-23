import SwiftUI

@main
struct RunBadgeApp: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            TabView {
                HomeView()
                    .tabItem { Label("Home", systemImage: "house.fill") }
                WorkoutView()
                    .tabItem { Label("Workout", systemImage: "figure.run") }
                HistoryView()
                    .tabItem { Label("History", systemImage: "clock.fill") }
            }
            .environmentObject(appState)
            .preferredColorScheme(.dark)
        }
    }
}