import type { Config } from 'tailwindcss'
import preset from './src/tailwind.config'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [preset as Config],
  plugins: [],
}

export default config
