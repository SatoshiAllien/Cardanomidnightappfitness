import SwiftUI

struct PrimaryButton: View {
    let title: String
    let color: Color
    let action: () -> Void

    init(_ title: String, color: Color = Color(red: 0.31, green: 0.27, blue: 0.9), action: @escaping () -> Void) {
        self.title = title
        self.color = color
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .background(color)
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 14))
        }
    }
}