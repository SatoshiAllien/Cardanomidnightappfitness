import SwiftUI

struct WorkoutView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var viewModel = WorkoutViewModel()

    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                if viewModel.isActive {
                    Text("ACTIVE")
                        .font(.caption.weight(.bold))
                        .foregroundStyle(Color(red: 0.13, green: 0.77, blue: 0.37))
                    Text(viewModel.timeFormatted)
                        .font(.system(size: 64, weight: .bold, design: .rounded))
                        .monospacedDigit()
                    Text(String(format: "%.2f km", viewModel.distanceKm))
                        .font(.title)
                    Text("\(viewModel.calories) kcal")
                        .foregroundStyle(.secondary)
                    PrimaryButton("Stop Workout", color: .red) {
                        viewModel.stop(appState: appState)
                    }
                    .padding(.horizontal)
                } else {
                    Text("Ready to move?")
                        .font(.title2.bold())
                    Button {
                        viewModel.start()
                    } label: {
                        Text("Start")
                            .font(.title.bold())
                            .frame(width: 140, height: 140)
                            .background(Color(red: 0.13, green: 0.77, blue: 0.37))
                            .foregroundStyle(Color(red: 0.06, green: 0.09, blue: 0.16))
                            .clipShape(Circle())
                    }
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(red: 0.06, green: 0.09, blue: 0.16))
            .navigationTitle("Workout")
            .sheet(item: $appState.earnedBadge) { badge in
                BadgeEarnedView(badge: badge) {
                    appState.dismissBadge()
                }
            }
        }
    }
}