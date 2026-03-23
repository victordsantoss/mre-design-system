import type { Preview } from '@storybook/react'
import { create } from '@storybook/theming/create'
import '../styles/globals.css'

const docsTheme = create({
  base: 'light',
  colorPrimary: '#071D41',
  colorSecondary: '#1351B4',
  textColor: '#333333',
  barTextColor: '#333333',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      toc: true,
      theme: docsTheme,
    },
    options: {
      storySort: {
        order: ['Components', '*'],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default preview
