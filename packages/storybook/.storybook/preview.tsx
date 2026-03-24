import type { Preview } from '@storybook/react'
import type { StoryContext } from '@storybook/react'
import * as React from 'react'
import { addons } from '@storybook/preview-api'
import { GLOBALS_UPDATED } from '@storybook/core/core-events'
import { create } from '@storybook/theming/create'
import { DesignSystemProvider, cn } from '@ds/components'
import '../styles/globals.css'

const docsTheme = create({
  base: 'light',
  colorPrimary: '#071D41',
  colorSecondary: '#1351B4',
  textColor: '#333333',
  barTextColor: '#333333',
})

type ToolbarGlobals = { dsColorScheme?: string }

function globalsFromPayload(data: unknown): ToolbarGlobals | null {
  if (typeof data !== 'object' || data === null || !('globals' in data)) return null
  const g = (data as { globals: unknown }).globals
  if (typeof g !== 'object' || g === null) return null
  return g as ToolbarGlobals
}

/**
 * `useGlobals()` não pode ser usado aqui: o preview decorator corre fora do
 * hooks context do Storybook. O channel `GLOBALS_UPDATED` mantém o tema em
 * sincronia com a toolbar. `context.globals` define o estado inicial.
 */
function DsThemeDecorator({
  children,
  contextGlobals,
}: {
  children: React.ReactNode
  contextGlobals: ToolbarGlobals
}) {
  const [globals, setGlobals] = React.useState<ToolbarGlobals>(() => ({
    ...contextGlobals,
  }))

  React.useEffect(() => {
    const channel = addons.getChannel()
    if (!channel) return undefined

    const onGlobalsUpdated = (data: unknown) => {
      const next = globalsFromPayload(data)
      if (next) setGlobals((prev) => ({ ...prev, ...next }))
    }

    channel.on(GLOBALS_UPDATED, onGlobalsUpdated)
    return () => {
      channel.off(GLOBALS_UPDATED, onGlobalsUpdated)
    }
  }, [])

  const isDark = globals.dsColorScheme === 'dark'
  const colorScheme = isDark ? 'dark' : 'light'

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    return () => root.classList.remove('dark')
  }, [isDark])

  return (
    <DesignSystemProvider
      colorScheme={colorScheme}
      className={cn('bg-background text-foreground')}
    >
      {children}
    </DesignSystemProvider>
  )
}

const preview: Preview = {
  initialGlobals: {
    dsColorScheme: 'light',
  },
  globalTypes: {
    dsColorScheme: {
      description: 'Tema claro ou escuro do DS (classe .dark + variáveis semânticas)',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Escuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context: StoryContext) => (
      <DsThemeDecorator
        key={context.id}
        contextGlobals={context.globals as ToolbarGlobals}
      >
        <Story />
      </DsThemeDecorator>
    ),
  ],
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
      default: 'transparent',
      values: [
        { name: 'transparent', value: 'transparent' },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#071D41' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default preview
