'use client'
/**
 * Button — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Botão
 *
 * Ênfases:
 *   primary   → fundo sólido (ação principal)
 *   secondary → borda + fundo transparente (ação secundária)
 *   tertiary  → apenas texto (ação terciária/suporte)
 *
 * Densidade (altura):
 *   xsmall (24px) | small (32px) | medium (40px, padrão) | large (48px)
 *
 * Intenção semântica:
 *   default | danger | success | warning | info
 *
 * Pill radius e focus ring 3px/4px — marca visual GovBR.
 */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Variantes base (CVA)
// ─────────────────────────────────────────────

const buttonVariants = cva(
  [
    // Pill radius — marca visual dos botões GovBR
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill',
    'font-semibold text-gov-base leading-none',
    'transition-colors duration-gov-fast',
    // Focus ring GovBR: 3px outline, 4px offset
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    'disabled:pointer-events-none disabled:opacity-45',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      /** Ênfase: primary (filled) | secondary (outlined) | tertiary (text) */
      emphasis: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover',
        secondary:
          'bg-transparent text-primary border border-primary hover:bg-primary/10 hover:border-primary-hover hover:text-primary-hover active:bg-primary/15',
        tertiary:
          'bg-transparent text-primary border-0 hover:bg-primary/10 active:bg-primary/15',
      },

      /** Intenção semântica (sobrepõe cores de emphasis) */
      intent: {
        default: '',
        danger:
          'data-[emphasis=primary]:bg-destructive data-[emphasis=primary]:text-destructive-foreground data-[emphasis=primary]:hover:bg-destructive/85 data-[emphasis=secondary]:text-destructive data-[emphasis=secondary]:border-destructive data-[emphasis=secondary]:hover:bg-destructive/10 data-[emphasis=tertiary]:text-destructive data-[emphasis=tertiary]:hover:bg-destructive/10',
        success:
          'data-[emphasis=primary]:bg-success data-[emphasis=primary]:text-success-foreground data-[emphasis=primary]:hover:bg-success/85 data-[emphasis=secondary]:text-success data-[emphasis=secondary]:border-success data-[emphasis=secondary]:hover:bg-success/10 data-[emphasis=tertiary]:text-success data-[emphasis=tertiary]:hover:bg-success/10',
        warning:
          'data-[emphasis=primary]:bg-warning data-[emphasis=primary]:text-warning-foreground data-[emphasis=primary]:hover:bg-warning/85 data-[emphasis=secondary]:text-warning data-[emphasis=secondary]:border-warning data-[emphasis=secondary]:hover:bg-warning/10 data-[emphasis=tertiary]:text-warning data-[emphasis=tertiary]:hover:bg-warning/10',
        info:
          'data-[emphasis=primary]:bg-info data-[emphasis=primary]:text-info-foreground data-[emphasis=primary]:hover:bg-info/85 data-[emphasis=secondary]:text-info data-[emphasis=secondary]:border-info data-[emphasis=secondary]:hover:bg-info/10 data-[emphasis=tertiary]:text-info data-[emphasis=tertiary]:hover:bg-info/10',
      },

      /** Densidade: define altura e padding horizontal */
      density: {
        xsmall: 'h-6 min-h-6 px-4 text-[0.729rem]',
        small:  'h-8 min-h-8 px-4 text-gov-sm',
        medium: 'h-10 min-h-10 px-6',
        large:  'h-12 min-h-12 px-6 text-gov-lg',
      },

      /** Largura 100% do container */
      block: {
        true:  'w-full',
        false: '',
      },
    },
    defaultVariants: {
      emphasis: 'primary',
      intent:   'default',
      density:  'medium',
      block:    false,
    },
  },
)

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export type ButtonEmphasis = 'primary' | 'secondary' | 'tertiary'
export type ButtonDensity  = 'xsmall' | 'small' | 'medium' | 'large'
export type ButtonIntent   = 'default' | 'danger' | 'success' | 'warning' | 'info'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Ênfase do botão: primary (filled) | secondary (outlined) | tertiary (text) */
  emphasis?: ButtonEmphasis
  /** Densidade/altura: xsmall(24) | small(32) | medium(40) | large(48) */
  density?: ButtonDensity
  /** Intenção semântica */
  intent?: ButtonIntent
  /** Largura 100% */
  block?: boolean
  /** Slot pattern — renderiza filho como elemento raiz */
  asChild?: boolean
  /** Estado de carregamento */
  loading?: boolean
  /** Ícone antes do label */
  startIcon?: React.ReactNode
  /** Ícone após o label */
  endIcon?: React.ReactNode
}

// Spinner SVG tamanhos por densidade
const SPINNER_SIZE: Record<ButtonDensity, number> = {
  xsmall: 12,
  small:  14,
  medium: 18,
  large:  22,
}

// ─────────────────────────────────────────────
// Button Component
// ─────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      emphasis = 'primary',
      density = 'medium',
      intent = 'default',
      block = false,
      asChild = false,
      loading = false,
      disabled,
      children,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const spinnerSize = SPINNER_SIZE[density]

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ emphasis, density, intent, block, className }))}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        data-emphasis={emphasis}
        data-intent={intent}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width={spinnerSize}
            height={spinnerSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

// ─────────────────────────────────────────────
// CircleButton — botão circular de ícone
// aria-label obrigatório (GovBR / WCAG 2.2)
// ─────────────────────────────────────────────

const circleButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full',
    'transition-colors duration-gov-fast',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    'disabled:pointer-events-none disabled:opacity-45',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      intent: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        danger:  'bg-destructive text-destructive-foreground hover:bg-destructive/85',
        success: 'bg-success text-success-foreground hover:bg-success/85',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/85',
        info:    'bg-info text-info-foreground hover:bg-info/85',
      },
      density: {
        xsmall: 'h-6 w-6',
        small:  'h-8 w-8',
        medium: 'h-10 w-10',
        large:  'h-12 w-12',
      },
    },
    defaultVariants: {
      intent:  'default',
      density: 'medium',
    },
  },
)

export interface CircleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof circleButtonVariants> {
  density?: ButtonDensity
  intent?: ButtonIntent
  loading?: boolean
  /** Obrigatório — acessibilidade GovBR */
  'aria-label': string
}

const CircleButton = React.forwardRef<HTMLButtonElement, CircleButtonProps>(
  (
    {
      className,
      density = 'medium',
      intent = 'default',
      loading = false,
      disabled,
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    const spinnerSize = SPINNER_SIZE[density]

    return (
      <button
        ref={ref}
        className={cn(circleButtonVariants({ intent, density, className }))}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width={spinnerSize}
            height={spinnerSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          children
        )}
      </button>
    )
  },
)

CircleButton.displayName = 'CircleButton'

export { Button, CircleButton, buttonVariants, circleButtonVariants }
