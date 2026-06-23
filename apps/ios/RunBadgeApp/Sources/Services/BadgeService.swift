import Foundation

final class BadgeService {
    private let minDistanceKm = 3.0
    private let minDurationMinutes = 20

    func checkBadge(for workout: Workout) -> Badge? {
        guard workout.distanceKm >= minDistanceKm,
              workout.durationMinutes >= minDurationMinutes else {
            return nil
        }

        return Badge(
            id: UUID(),
            name: "MidnightFit #\(workout.id.uuidString.prefix(6))",
            workoutId: workout.id,
            earnedAt: Date(),
            txHash: "mock_tx_\(workout.id.uuidString.prefix(8))"
        )
    }
}