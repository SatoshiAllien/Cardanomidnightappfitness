import Foundation

@MainActor
final class AppState: ObservableObject {
    @Published var workouts: [Workout] = []
    @Published var badges: [Badge] = []
    @Published var earnedBadge: Badge?

    private let storage = StorageService()
    private let workoutService = WorkoutService()
    private let badgeService = BadgeService()

    init() {
        workouts = storage.loadWorkouts()
        badges = storage.loadBadges()
    }

    func saveWorkout(distanceKm: Double, durationMinutes: Int, calories: Int) {
        let workout = workoutService.createWorkout(
            distanceKm: distanceKm,
            durationMinutes: durationMinutes,
            calories: calories
        )
        workouts.insert(workout, at: 0)
        storage.saveWorkouts(workouts)

        if let badge = badgeService.checkBadge(for: workout) {
            badges.insert(badge, at: 0)
            storage.saveBadges(badges)
            earnedBadge = badge
        }
    }

    func dismissBadge() {
        earnedBadge = nil
    }
}