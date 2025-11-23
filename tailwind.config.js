/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary-foreground": "#ffffff",
        background: "#ffffff",
        foreground: "#111827",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        success: "#16a34a",
        error: "#dc2626",
        card: "#ffffff",
        "card-foreground": "#111827",
      },
    },
  },
  plugins: [],
}
