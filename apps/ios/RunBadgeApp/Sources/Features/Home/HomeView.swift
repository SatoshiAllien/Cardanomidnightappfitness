import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState

    private var viewModel: HomeViewModel { HomeViewModel(appState: appState) }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    VStack(spacing: 8) {
                        Text("Cardano Midnight")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(Color(red: 0.13, green: 0.77, blue: 0.37))
                        Text("Proof of Workout")
                            .font(.largeTitle.bold())
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top, 12)

                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        StatCard(title: "Workouts", value: "\(viewModel.totalWorkouts)", unit: "")
                        StatCard(title: "Badges", value: "\(viewModel.totalBadges)", unit: "")
                        StatCard(title: "Distance", value: String(format: "%.1f", viewModel.totalDistance), unit: "km")
                        StatCard(title: "Threshold", value: "3km", unit: "· 20min")
                    }

                    Text("Start a workout from the Workout tab. Earn a badge when you hit 3 km and 20 minutes.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                        .padding()
                }
                .padding()
            }
            .background(Color(red: 0.06, green: 0.09, blue: 0.16))
            .navigationTitle("Home")
        }
    }
}