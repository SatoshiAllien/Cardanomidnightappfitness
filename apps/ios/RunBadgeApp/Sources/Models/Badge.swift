import Foundation

struct Badge: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let workoutId: UUID
    let earnedAt: Date
    let txHash: String

    var subtitle: String {
        "Proof of workout on Cardano Midnight"
    }
}