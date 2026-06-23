import Foundation

@MainActor
final class HistoryViewModel: ObservableObject {
    var workouts: [Workout] { appState.workouts }

    private let appState: AppState

    init(appState: AppState) {
        self.appState = appState
    }
}