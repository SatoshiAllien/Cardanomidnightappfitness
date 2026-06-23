import SwiftUI

struct HistoryView: View {
    @EnvironmentObject var appState: AppState

    private var viewModel: HistoryViewModel { HistoryViewModel(appState: appState) }

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.workouts.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "figure.run")
                            .font(.largeTitle)
                            .foregroundStyle(.secondary)
                        Text("No workouts yet")
                            .font(.headline)
                        Text("Complete a workout to see it here.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    List(viewModel.workouts) { workout in
                        WorkoutRow(workout: workout)
                            .listRowBackground(Color.white.opacity(0.06))
                    }
                    .scrollContentBackground(.hidden)
                }
            }
            .background(Color(red: 0.06, green: 0.09, blue: 0.16))
            .navigationTitle("History")
        }
    }
}