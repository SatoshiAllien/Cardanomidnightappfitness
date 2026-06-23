import Foundation

@MainActor
final class HomeViewModel: ObservableObject {
    var totalWorkouts: Int { appState.workouts.count }
    var totalBadges: Int { appState.badges.count }
    var totalDistance: Double {
        appState.workouts.map(\.distanceKm).reduce(0, +)
    }

    private let appState: AppState

    init(appState: AppState) {
        self.appState = appState
    }
}