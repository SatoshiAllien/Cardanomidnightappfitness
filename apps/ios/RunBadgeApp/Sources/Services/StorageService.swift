import Foundation

final class StorageService {
    private let workoutsKey = "runbadge_workouts"
    private let badgesKey = "runbadge_badges"

    func loadWorkouts() -> [Workout] {
        guard let data = UserDefaults.standard.data(forKey: workoutsKey),
              let items = try? JSONDecoder().decode([Workout].self, from: data) else {
            return []
        }
        return items
    }

    func saveWorkouts(_ workouts: [Workout]) {
        if let data = try? JSONEncoder().encode(workouts) {
            UserDefaults.standard.set(data, forKey: workoutsKey)
        }
    }

    func loadBadges() -> [Badge] {
        guard let data = UserDefaults.standard.data(forKey: badgesKey),
              let items = try? JSONDecoder().decode([Badge].self, from: data) else {
            return []
        }
        return items
    }

    func saveBadges(_ badges: [Badge]) {
        if let data = try? JSONEncoder().encode(badges) {
            UserDefaults.standard.set(data, forKey: badgesKey)
        }
    }
}