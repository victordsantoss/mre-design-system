import path from 'node:path'
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
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@ds/components': path.resolve(__dirname, '../../components/src/index.ts'),
          '@ds/tokens': path.resolve(__dirname, '../../tokens/src/index.ts'),
        },
      },
    }
  },
}

export default config
