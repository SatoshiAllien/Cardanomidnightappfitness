import Foundation

struct Workout: Identifiable, Codable, Hashable {
    let id: UUID
    let distanceKm: Double
    let durationMinutes: Int
    let calories: Int
    let createdAt: Date

    var durationFormatted: String {
        let h = durationMinutes / 60
        let m = durationMinutes % 60
        return h > 0 ? String(format: "%d:%02d", h, m) : String(format: "%d min", m)
    }
}