import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  '#fbfaf8',
        beige:  '#f3efec',
        mocha:  '#564031',
        noir:   '#161616',
        gold:   '#C69F68',
        'gold-light': '#E8C99A',
      },
      fontFamily: {
        title:  ['var(--font-aref-ruqaa)', 'Aref Ruqaa', 'serif'],
        body:   ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        arabic: ['var(--font-ibm-arabic)', 'IBM Plex Sans Arabic', 'sans-serif'],
        serif:  ['var(--font-ibm-serif)', 'IBM Plex Serif', 'Georgia', 'serif'],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}

export default config
