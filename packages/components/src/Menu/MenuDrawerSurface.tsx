'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export interface MenuDrawerSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  anchor?: 'left' | 'right' | 'top' | 'bottom'
}

/**
 * Superfície fixa do drawer do Menu — paridade com o pacote MUI (sem Paper).
 */
export const MenuDrawerSurface = React.forwardRef<HTMLDivElement, MenuDrawerSurfaceProps>(
  function MenuDrawerSurface({ anchor = 'left', className, style, ...rest }, ref) {
    const position =
      anchor === 'left'
        ? { left: 0, top: 0, bottom: 0 }
        : anchor === 'right'
          ? { right: 0, top: 0, bottom: 0 }
          : anchor === 'bottom'
            ? { left: 0, right: 0, bottom: 0, top: 'auto' }
            : { left: 0, right: 0, top: 0, bottom: 'auto' }

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-[1200] flex flex-col overflow-y-auto bg-background font-body text-foreground shadow-drawer outline-none',
          anchor === 'bottom' && 'max-h-[85vh] rounded-t-xl',
          className,
        )}
        style={{ ...position, ...style }}
        {...rest}
      />
    )
  },
)
MenuDrawerSurface.displayName = 'MenuDrawerSurface'
