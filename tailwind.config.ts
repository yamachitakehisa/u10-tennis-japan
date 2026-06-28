import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ball-red': '#DC2626',
        'ball-red-light': '#FEE2E2',
        'ball-orange': '#EA580C',
        'ball-orange-light': '#FFEDD5',
        'ball-green': '#16A34A',
        'ball-green-light': '#DCFCE7',
        'ball-yellow': '#CA8A04',
        'ball-yellow-light': '#FEF9C3',
      },
    },
  },
  plugins: [],
}
export default config
