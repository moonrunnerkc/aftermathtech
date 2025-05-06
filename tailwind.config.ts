import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          cyan: '#00FFFF',
        },
      },
    },
  },
  plugins: [],
}

export default config
