import SwiftUI

struct WorkoutRow: View {
    let workout: Workout

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(String(format: "%.1f km · %d min", workout.distanceKm, workout.durationMinutes))
                    .font(.headline)
                Text(workout.createdAt.formatted(date: .abbreviated, time: .shortened))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Text("\(workout.calories) kcal")
                .font(.subheadline)
                .foregroundStyle(Color(red: 0.13, green: 0.77, blue: 0.37))
        }
        .padding()
        .background(Color.white.opacity(0.06))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}