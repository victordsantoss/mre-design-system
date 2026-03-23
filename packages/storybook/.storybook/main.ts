import path from 'path'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  managerHead: (head) => `${head}<meta name="description" content="Design System GovBR — Ministério das Relações Exteriores (MRE / Itamaraty)" />`,
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    const rawAlias = config.resolve?.alias
    const restAliases = Array.isArray(rawAlias)
      ? rawAlias
      : Object.entries((rawAlias ?? {}) as Record<string, string>).map(([find, replacement]) => ({
          find,
          replacement,
        }))

    // Só `@ds/tokens` e `@ds/components` exatos → fonte TS (HMR). Subpaths como
    // `@ds/tokens/ds-generated-theme.css` seguem `package.json` exports → dist.
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          {
            find: /^@ds\/components$/,
            replacement: path.resolve(__dirname, '../../components/src/index.ts'),
          },
          {
            find: /^@ds\/tokens$/,
            replacement: path.resolve(__dirname, '../../tokens/src/index.ts'),
          },
          ...restAliases,
        ],
      },
    }
  },
}

export default config
