/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Plus Jakarta Sans"', 'Geist', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'Geist', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Playfair Display"', 'serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
        fraunces: ['"Fraunces"', 'serif'],
        syne: ['"Syne"', 'sans-serif'],
        newsreader: ['"Newsreader"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        baseBlack: 'rgb(var(--color-base) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        cardBg: 'rgb(var(--color-card) / <alpha-value>)',
        cardHover: 'rgb(var(--color-hover) / <alpha-value>)',
        borderBase: 'rgb(var(--color-border-base) / <alpha-value>)',
        borderPanel: 'rgb(var(--color-border-panel) / <alpha-value>)',
        textMuted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        textSubtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
        algebre: '#ec4899',
        analyse: '#06b6d4',
        physique: '#10b981',
        mecanique: '#3b82f6',
        methodologie: '#f59e0b',
        langues: '#eab308',
      }
    }
  },
  plugins: [],
}
