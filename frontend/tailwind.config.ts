import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'risk-red': '#E24B4A',
        'risk-amber': '#EF9F27',
        'risk-green': '#1D9E75'
      },
    },
  },
  plugins: [],
}

export default config
