'use client'
/**
 * Divider — Padrão Digital de Governo (GovBR)
 *
 * Separador visual entre seções de conteúdo.
 * Referência: https://www.gov.br/ds/components/divider
 *
 * Acessibilidade:
 * - Elemento puramente decorativo → aria-hidden="true" em todos os casos
 * - Usa <hr> quando horizontal sem conteúdo (semântica nativa)
 * - Usa role="separator" com aria-orientation para as demais variantes
 * - Não recebe foco (não é interativo)
 */
import * as React from 'react'
import { cn } from '../utils/cn'

/* ------------------------------------------------------------------ tipos */

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerThickness = 'sm' | 'md' | 'lg'

export interface DividerProps {
  /** Orientação da linha — padrão: horizontal */
  orientation?: DividerOrientation
  /** Aplica estilo tracejado */
  dashed?: boolean
  /**
   * Espessura da linha
   * - `sm` → 1px (`--surface-width-sm`)
   * - `md` → 2px (`--surface-width-md`)
   * - `lg` → 4px (`--surface-width-lg`)
   */
  thickness?: DividerThickness
  /**
   * Inverte a cor para uso em fundos escuros (`--pure-0` / branco)
   */
  inverted?: boolean
  /**
   * Conteúdo central (ex: rótulo de seção).
   * Cria um divider com texto/elemento no meio.
   */
  children?: React.ReactNode
  className?: string
}

/* -------------------------------------------- mapeamento de espessuras */

/**
 * Espessuras conforme surface-width do GovBR DS:
 *   sm = 1px | md = 2px | lg = 4px
 */
const THICKNESS_H: Record<DividerThickness, string> = {
  sm: 'border-t',       // 1px
  md: 'border-t-2',    // 2px
  lg: 'border-t-4',    // 4px
}

const THICKNESS_V: Record<DividerThickness, string> = {
  sm: 'border-r',
  md: 'border-r-2',
  lg: 'border-r-4',
}

/* --------------------------------------------------------------- Divider */

export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      dashed = false,
      thickness = 'sm',
      inverted = false,
      children,
      className,
    },
    ref,
  ) {
    const isVertical = orientation === 'vertical'
    const hasContent = children != null

    /* Cor: border-border (light) ou border-white (inverted/dark) */
    const colorClass = inverted ? 'border-white' : 'border-border'

    /* Estilo: solid (padrão) ou dashed */
    const styleClass = dashed ? 'border-dashed' : 'border-solid'

    /* ── Divider com conteúdo central (ex: rótulo de seção) ── */
    if (hasContent) {
      return (
        <div
          role="separator"
          aria-hidden="true"
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          className={cn(
            'flex items-center',
            isVertical && 'flex-col self-stretch',
            !isVertical && 'my-4',
            isVertical && 'mx-4',
            className,
          )}
        >
          {/* Linha antes */}
          <span
            className={cn(
              'flex-1',
              isVertical ? THICKNESS_V[thickness] : THICKNESS_H[thickness],
              colorClass,
              styleClass,
            )}
          />

          {/* Conteúdo */}
          <span
            className={cn(
              'shrink-0 text-xs font-medium text-muted-foreground',
              isVertical ? 'my-2' : 'mx-2',
            )}
          >
            {children}
          </span>

          {/* Linha depois */}
          <span
            className={cn(
              'flex-1',
              isVertical ? THICKNESS_V[thickness] : THICKNESS_H[thickness],
              colorClass,
              styleClass,
            )}
          />
        </div>
      )
    }

    /* ── Divider vertical (sem conteúdo) ── */
    if (isVertical) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="separator"
          aria-hidden="true"
          aria-orientation="vertical"
          className={cn(
            'mx-4 self-stretch',
            THICKNESS_V[thickness],
            colorClass,
            styleClass,
            className,
          )}
        />
      )
    }

    /* ── Divider horizontal sem conteúdo — usa <hr> semântico ── */
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        aria-hidden="true"
        className={cn(
          // Reset: navegadores injetam border e margin no <hr>
          'my-4 w-full border-0',
          // Aplica só a borda superior conforme espessura
          THICKNESS_H[thickness],
          colorClass,
          styleClass,
          className,
        )}
      />
    )
  },
)

Divider.displayName = 'Divider'
