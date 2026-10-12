/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Identity palette — preserved from the original portfolio.
      colors: {
        primary: '#0EA5E9',
        dark: '#0f172a',
        darker: '#020617',
      },
      // Three-role type system (self-hosted variable fonts, see src/index.css):
      // display = Space Grotesk for headings and identity moments, sans = Inter
      // for body copy, mono = JetBrains Mono for data labels and code surfaces.
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Shared elevation tokens for cards.
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.4)',
        'card-hover': '0 20px 50px -12px rgb(14 165 233 / 0.25)',
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
