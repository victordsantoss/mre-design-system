'use client'
/**
 * Item — Padrão Digital de Governo (GovBR)
 *
 * Bloco compacto e flexível para exibir conteúdo repetido em sequência.
 * Utilizado como primitiva de List, Menu, Dropdown, etc.
 *
 * Referência: https://www.gov.br/ds/components/item
 *
 * Anatomia:
 * ┌─────────────────────────────────────────────────┐
 * │  [Suporte Visual]  [Área Principal]  [Suporte Complementar] │
 * └─────────────────────────────────────────────────┘
 * [ Divider opcional ]
 *
 * Acessibilidade:
 * - Renderiza <div>, <button> ou <a> conforme o contexto
 * - focus-visible ring GovBR em elementos interativos
 * - aria-selected, aria-disabled, aria-expanded quando aplicável
 * - Ícone de expansão com aria-hidden="true"
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { Divider } from '../Divider'
import { ListContext } from '../utils/ListContext'
import { Typography } from '../Typography/Typography'

/* ------------------------------------------------------------------ tipos */

export type ItemDensity = 'small' | 'medium' | 'large'

export interface ItemProps {
  /** Conteúdo do item (qualquer elemento React) */
  children: React.ReactNode
  /**
   * Densidade do padding vertical:
   * - `small`  → 8px  (alta densidade  / --spacing-scale-base)
   * - `medium` → 16px (média densidade / --spacing-scale-2x)
   * - `large`  → 24px (baixa densidade / --spacing-scale-3x)
   */
  density?: ItemDensity
  /** Aplica estado selecionado */
  selected?: boolean
  /** Aplica estado ativo */
  active?: boolean
  /** Desabilita o item */
  disabled?: boolean
  /** Adiciona um Divider na borda inferior do item */
  divider?: boolean
  /** Torna o item expansível (controla externamente) */
  expanded?: boolean
  /** Callback de toggle de expansão */
  onToggle?: () => void
  /** URL — renderiza como <a> */
  href?: string
  /** Callback de clique — renderiza como <button> quando não há href */
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
  /** Inline styles forwarded to the root element (permite override de padding, etc.) */
  style?: React.CSSProperties
  /** Role ARIA forwarded to the root element */
  role?: string
  /** Indica o item atual (ex: 'page' no contexto de árvore de navegação) */
  'aria-current'?: React.AriaAttributes['aria-current']
  /** Indica que o item possui um popup/submenu */
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup']
  /** Sobrescreve o elemento raiz */
  as?: 'div' | 'button' | 'a'
}

/* -------------------------------------------- mapeamento de densidades */

const DENSITY_PY: Record<ItemDensity, string> = {
  small: 'py-2',   // 8px  — alta densidade
  medium: 'py-4',  // 16px — densidade média
  large: 'py-6',   // 24px — baixa densidade
}

/* ----------------------------------------------------------------- Item */

export const Item = React.forwardRef<HTMLElement, ItemProps>(
  function Item(
    {
      children,
      density: densityProp,
      selected = false,
      active = false,
      disabled = false,
      divider = false,
      expanded,
      onToggle,
      href,
      onClick,
      className,
      style,
      role,
      'aria-current': ariaCurrent,
      'aria-haspopup': ariaHaspopup,
      as,
    },
    ref,
  ) {
    const listCtx = React.useContext(ListContext)
    const density = densityProp ?? listCtx?.density ?? 'small'

    /* Determina o elemento raiz */
    const isInteractive = Boolean(href || onClick || onToggle || as === 'button')
    const tag = as ?? (href ? 'a' : isInteractive ? 'button' : 'div')

    const baseClass = cn(
      // Layout e superfície
      'relative block w-full bg-background text-left text-foreground',
      'px-4',
      DENSITY_PY[density],
      // Transição suave de fundo
      'transition-colors duration-ds-fast',
      // Estado interativo: hover
      isInteractive && !disabled && 'cursor-pointer',
      isInteractive && !disabled && !selected && !active && 'hover:bg-primary/[0.08]',
      isInteractive && !disabled && !selected && !active && 'active:bg-primary/[0.16]',
      // Estado selecionado
      selected && 'bg-primary/[0.12] text-primary',
      // Estado ativo
      active && !selected && 'bg-primary/[0.06] text-primary',
      // Estado desabilitado
      disabled && 'pointer-events-none opacity-45',
      // Focus ring GovBR (apenas elementos interativos)
      isInteractive && 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
      // Divider na borda inferior (via borda CSS, sem componente extra)
      divider && 'border-b border-border',
      className,
    )

    const sharedProps = {
      className: baseClass,
      style,
      role,
      'aria-disabled': disabled || undefined,
      'aria-selected': selected || undefined,
      'aria-haspopup': ariaHaspopup,
    } as React.HTMLAttributes<HTMLElement>

    /* Conteúdo interno: itens com onToggle ganham chevron automático */
    const inner = (
      <span className="flex w-full items-center gap-3">
        <Typography variant="body1" as="span" color="inherit" className="min-w-0 flex-1">{children}</Typography>
        {onToggle != null && (
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
        )}
      </span>
    )

    if (tag === 'a') {
      return (
        <>
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
            {...(sharedProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {inner}
          </a>
          {divider && <Divider className="my-0" />}
        </>
      )
    }

    if (tag === 'button') {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onToggle?.()
        ;(onClick as React.MouseEventHandler<HTMLButtonElement> | undefined)?.(e)
      }
      return (
        <>
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            disabled={disabled}
            aria-expanded={expanded != null ? expanded : undefined}
            onClick={handleClick}
            {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {inner}
          </button>
          {divider && <Divider className="my-0" />}
        </>
      )
    }

    /* div (padrão, não interativo) */
    return (
      <>
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          {...(sharedProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {inner}
        </div>
        {divider && <Divider className="my-0" />}
      </>
    )
  },
)

Item.displayName = 'Item'
