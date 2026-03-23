'use client'
/**
 * Lista de opções para modal “por lista” (GovBR): linhas clicáveis com avatar circular,
 * rótulo em cinza médio e divisórias horizontais entre itens.
 */
import * as React from 'react'
import { cn } from '../utils/cn'

export interface ModalOptionListItem {
  id: string
  label: React.ReactNode
  avatarSrc?: string
  avatarAlt?: string
}

export interface ModalOptionListProps {
  items: ModalOptionListItem[]
  onItemClick?: (item: ModalOptionListItem) => void
}

export function ModalOptionList({ items, onItemClick }: ModalOptionListProps) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item, index) => (
        <li key={item.id} className="block">
          <button
            type="button"
            onClick={() => onItemClick?.(item)}
            className={cn(
              'flex w-full items-center gap-4 px-6 py-4 text-left transition-colors',
              'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              index < items.length - 1 && 'border-b border-border',
            )}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-gov-sm font-medium text-muted-foreground"
              aria-hidden={item.avatarSrc ? undefined : true}
            >
              {item.avatarSrc ? (
                <img src={item.avatarSrc} alt={item.avatarAlt ?? ''} className="h-full w-full object-cover" />
              ) : (
                '?'
              )}
            </span>
            <span className="text-gov-base font-normal text-muted-foreground">
              {item.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
