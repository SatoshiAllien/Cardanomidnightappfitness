import Foundation

@MainActor
final class BadgeViewModel: ObservableObject {
    let badge: Badge

    init(badge: Badge) {
        self.badge = badge
    }
}