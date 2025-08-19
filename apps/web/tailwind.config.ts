import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nd-bg': 'var(--nd-bg)',
        'nd-surface': 'var(--nd-surface)',
        'nd-primary': 'var(--nd-primary)',
        'nd-secondary': 'var(--nd-secondary)',
        'nd-accent': 'var(--nd-accent)',
        'nd-muted': 'var(--nd-muted)',
        'nd-ring': 'var(--nd-ring)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
