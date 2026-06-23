import Foundation

@MainActor
final class WorkoutViewModel: ObservableObject {
    @Published var isActive = false
    @Published var elapsedSeconds = 0
    @Published var distanceKm: Double = 0
    @Published var calories: Int = 0

    private var timer: Timer?

    func start() {
        isActive = true
        elapsedSeconds = 0
        distanceKm = 0
        calories = 0
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.tick()
            }
        }
    }

    func stop(appState: AppState) {
        timer?.invalidate()
        timer = nil
        isActive = false
        let minutes = max(1, elapsedSeconds / 60)
        appState.saveWorkout(
            distanceKm: distanceKm,
            durationMinutes: minutes,
            calories: calories
        )
    }

    private func tick() {
        elapsedSeconds += 1
        if elapsedSeconds % 3 == 0 {
            distanceKm += 0.01
            calories += 2
        }
    }

    var timeFormatted: String {
        let m = elapsedSeconds / 60
        let s = elapsedSeconds % 60
        return String(format: "%02d:%02d", m, s)
    }
}