import SwiftUI

struct BadgeEarnedView: View {
    let badge: Badge
    let onDismiss: () -> Void

    private var viewModel: BadgeViewModel { BadgeViewModel(badge: badge) }

    var body: some View {
        VStack(spacing: 24) {
            Text("🏅")
                .font(.system(size: 72))
            Text("Badge Earned!")
                .font(.largeTitle.bold())
                .foregroundStyle(Color(red: 0.13, green: 0.77, blue: 0.37))
            Text(viewModel.badge.name)
                .font(.title2)
            Text(viewModel.badge.subtitle)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            Text(viewModel.badge.txHash)
                .font(.caption.monospaced())
                .foregroundStyle(.secondary)
                .padding()
                .background(Color.white.opacity(0.06))
                .clipShape(RoundedRectangle(cornerRadius: 8))
            PrimaryButton("Awesome!") { onDismiss() }
                .padding(.horizontal)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(red: 0.06, green: 0.09, blue: 0.16))
    }
}