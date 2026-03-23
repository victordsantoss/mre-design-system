import type { Config } from 'tailwindcss'
import dsPreset from '@ds/components/tailwind.config'

/**
 * Storybook — estende o preset GovBR de `@ds/components` (tipografia `down-*` / `base` / `up-*`, etc.).
 */
const config: Config = {
  presets: [dsPreset],
  content: [
    './stories/**/*.{ts,tsx,mdx}',
    '../components/src/**/*.{ts,tsx}',
  ],
  theme: {},
  plugins: [],
}

export default config
