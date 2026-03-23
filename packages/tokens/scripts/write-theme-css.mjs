import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { getDesignSystemThemeCss } = await import(join(root, 'dist/index.mjs'))
const css = getDesignSystemThemeCss()
writeFileSync(join(root, 'dist/ds-generated-theme.css'), css, 'utf8')
