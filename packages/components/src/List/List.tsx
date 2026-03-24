'use client'
/**
 * List — Padrão Digital de Governo (GovBR)
 *
 * Container semântico para sequências de itens. Compõe `Item` e `Divider`.
 *
 * Referência: https://www.gov.br/ds/components/list
 *
 * Anatomia:
 * ┌────────────────────────────────────┐
 * │  [ListHeader]                      │
 * │  ├─ [ListLabel] "Grupo A"          │
 * │  │  ├─ Item                        │
 * │  │  ├─ Divider (opcional)          │
 * │  │  └─ Item                        │
 * │  ├─ [ListGroup] expansível         │
 * │  │  └─ Item …                      │
 * └────────────────────────────────────┘
 *
 * Acessibilidade:
 * - Raiz renderiza <ul> com role="list" (padrão)
 * - ListHeader renderiza <div> com role="heading" e aria-level
 * - ListLabel renderiza <li> com role="presentation" + texto rotulador
 * - ListGroup: <li> expansível com aria-expanded, aria-controls
 * - Horizontal: role="list" + flex layout
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { Divider } from '../Divider'
import { ListContext, type ListOrientation } from '../utils/ListContext'
import type { ItemDensity } from '../Item'

/* ------------------------------------------------------------------ tipos */

export interface ListProps {
  /** Orientação da lista: `vertical` (padrão) ou `horizontal` */
  orientation?: ListOrientation
  /**
   * Densidade aplicada a todos os `Item` filhos (via contexto).
   * - `small`  → 8px (padrão)
   * - `medium` → 16px
   * - `large`  → 24px
   */
  density?: ItemDensity
  /** Adiciona Divider entre os itens automaticamente */
  divided?: boolean
  /** Contorno visual ao redor da lista */
  bordered?: boolean
  /** Sobrescreve o elemento raiz */
  as?: 'ul' | 'ol' | 'div' | 'nav'
  className?: string
  children: React.ReactNode
}

export interface ListHeaderProps {
  /** Nível do heading ARIA (default: 3) */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children: React.ReactNode
}

export interface ListLabelProps {
  className?: string
  children: React.ReactNode
}

export interface ListGroupProps {
  /** Título do grupo (disparador do toggle) */
  title: React.ReactNode
  /** Ícone opcional antes do título */
  icon?: React.ReactNode
  /** Controlado: estado de expansão */
  expanded?: boolean
  /** Callback de toggle */
  onToggle?: () => void
  /** id único para aria-controls */
  id?: string
  className?: string
  children: React.ReactNode
}

/* --------------------------------------------------------------- List root */

export const List = React.forwardRef<HTMLElement, ListProps>(
  function List(
    {
      orientation = 'vertical',
      density = 'small',
      divided = false,
      bordered = false,
      as,
      className,
      children,
    },
    ref,
  ) {
    const Tag = (as ?? 'ul') as React.ElementType

    const childrenArray = React.Children.toArray(children)
    const childrenWithDividers = divided
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, i) => {
          acc.push(child)
          if (i < childrenArray.length - 1) {
            acc.push(<Divider key={`divider-${i}`} className="my-0" />)
          }
          return acc
        }, [])
      : children

    return (
      <ListContext.Provider value={{ density, orientation }}>
        <Tag
          ref={ref as React.Ref<HTMLUListElement>}
          role="list"
          className={cn(
            'list-none p-0 m-0',
            orientation === 'horizontal' && 'flex flex-wrap items-center',
            bordered && 'rounded-md border border-border',
            className,
          )}
        >
          {childrenWithDividers}
        </Tag>
      </ListContext.Provider>
    )
  },
)

List.displayName = 'List'

/* ----------------------------------------------------------- ListHeader */

export const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  function ListHeader({ level = 3, className, children }, ref) {
    return (
      <div
        ref={ref}
        role="heading"
        aria-level={level}
        className={cn(
          'px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

ListHeader.displayName = 'ListHeader'

/* ------------------------------------------------------------ ListLabel */

export const ListLabel = React.forwardRef<HTMLLIElement, ListLabelProps>(
  function ListLabel({ className, children }, ref) {
    return (
      <li
        ref={ref}
        role="presentation"
        className={cn(
          'px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
          className,
        )}
      >
        {children}
      </li>
    )
  },
)

ListLabel.displayName = 'ListLabel'

/* ------------------------------------------------------------ ListGroup */

export const ListGroup = React.forwardRef<HTMLLIElement, ListGroupProps>(
  function ListGroup(
    { title, icon, expanded = false, onToggle, id, className, children },
    ref,
  ) {
    const generatedId = React.useId().replace(/:/g, '')
    const panelId = id ? `${id}-panel` : generatedId

    return (
      <li ref={ref} role="presentation" className={cn('list-none', className)}>
        {/* Cabeçalho do grupo — toggle button */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-foreground',
            'transition-colors duration-ds-fast',
            'hover:bg-primary/[0.08] active:bg-primary/[0.16]',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
          )}
        >
          {icon && (
            <span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
              {icon}
            </span>
          )}
          <span className="flex-1">{title}</span>
          {/* chevron-down rotaciona 180° quando expandido */}
          <svg
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
              expanded && 'rotate-180',
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Conteúdo expansível */}
        <ul
          id={panelId}
          role="list"
          hidden={!expanded}
          className={cn(
            'list-none p-0 m-0',
            'bg-muted/40',
            !expanded && 'hidden',
          )}
        >
          {children}
        </ul>
      </li>
    )
  },
)

ListGroup.displayName = 'ListGroup'
