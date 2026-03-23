'use client'
/**
 * DesignSystemProvider — MRE / Itamaraty Design System
 *
 * Injeta CSS custom properties GovBR no DOM e aplica a classe .dark
 * quando colorScheme = 'dark'. Deve envolver a aplicação inteira.
 *
 * Uso:
 * ```tsx
 * import { DesignSystemProvider } from '@ds/components'
 * import '@ds/components/styles.css'
 *
 * <DesignSystemProvider colorScheme="light">
 *   <App />
 * </DesignSystemProvider>
 * ```
 */
import * as React from 'react'
import { cn } from '../utils/cn'

export type ColorScheme = 'light' | 'dark'

export interface DesignSystemProviderProps {
  children: React.ReactNode
  /** Esquema de cores: light (padrão) | dark */
  colorScheme?: ColorScheme
  className?: string
}

const DesignSystemProvider = React.forwardRef<HTMLDivElement, DesignSystemProviderProps>(
  function DesignSystemProvider(
    { children, colorScheme = 'light', className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          colorScheme === 'dark' && 'dark',
          'min-h-full font-body',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

DesignSystemProvider.displayName = 'DesignSystemProvider'

export { DesignSystemProvider }
