import { semanticColorsDark, semanticColorsLight } from '../semantic/colors'
import { flattenSemanticColorVars, formatCssCustomProperties } from './flatten-semantic-colors'
import { uiColorVarAliases } from './ui-color-bindings'
import {
  buildDarkPrimitiveOverrides,
  buildRootPrimitiveCssVars,
  formatPrimitiveBlock,
} from './primitive-css-vars'

/**
 * Folha de estilo com `:root` / `.dark` gerada a partir dos tokens.
 * Consumir em `globals.css` via `@import`.
 */
export function getDesignSystemThemeCss(): string {
  const lightSemantic = flattenSemanticColorVars(semanticColorsLight)
  const darkSemantic = flattenSemanticColorVars(semanticColorsDark)
  const primitives = buildRootPrimitiveCssVars()
  const aliasBlock = formatCssCustomProperties(uiColorVarAliases)
  const darkPrimitives = buildDarkPrimitiveOverrides()

  return `/**
 * Tema DS (GovBR) — gerado a partir de @ds/tokens em build time.
 * Não editar à mão; altere tokens e volte a correr o build do pacote.
 */
@layer base {
  :root {
${formatCssCustomProperties(lightSemantic)}
${formatPrimitiveBlock(primitives)}
${aliasBlock}
  }

  .dark {
${formatCssCustomProperties(darkSemantic)}
${formatCssCustomProperties(darkPrimitives)}
  }
}
`
}
