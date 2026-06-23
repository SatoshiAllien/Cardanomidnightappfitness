import Foundation

final class WorkoutService {
    func createWorkout(distanceKm: Double, durationMinutes: Int, calories: Int) -> Workout {
        Workout(
            id: UUID(),
            distanceKm: distanceKm,
            durationMinutes: durationMinutes,
            calories: calories,
            createdAt: Date()
        )
    }
}