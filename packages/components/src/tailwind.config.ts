import type { Config } from 'tailwindcss'
import type { CSSRuleObject } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import {
  buildBorderRadiusExtend,
  buildBoxShadowExtend,
  buildDsColorTree,
  buildFontFamilyExtend,
  buildFontSizeExtend,
  buildSpacingExtend,
  buildTransitionDurationExtend,
  buildTypographyUtilityStyles,
  buildUiColorExtend,
} from '@ds/tokens'

const dsTypographyPlugin = plugin(({ addUtilities }) => {
  addUtilities(buildTypographyUtilityStyles() as CSSRuleObject)
})

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...buildUiColorExtend(),
        ds: buildDsColorTree() as Record<string, Record<string, string>>,
      },
      spacing: buildSpacingExtend(),
      borderRadius: buildBorderRadiusExtend(),
      fontFamily: buildFontFamilyExtend(),
      fontSize: buildFontSizeExtend(),
      ringWidth: {
        gov: '3px',
      },
      ringOffsetWidth: {
        gov: '4px',
      },
      boxShadow: buildBoxShadowExtend(),
      transitionDuration: buildTransitionDurationExtend(),
    },
  },
  plugins: [dsTypographyPlugin],
}

export default config
