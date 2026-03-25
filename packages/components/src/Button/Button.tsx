'use client'
/**
 * Button — Padrão Digital de Governo (GovBR), DS 3.7
 *
 * Anatomia (PDF): ícone opcional, rótulo obrigatório (CircleButton: só ícone + aria-label), superfície.
 * Tokens: `--font-size-scale-up-01`, `--font-weight-semi-bold`, `--icon-size-base`,
 * `--spacing-scale-base`, `--spacing-scale-3x`, `--surface-rounder-pill`.
 * Cores de ênfase default: variáveis semânticas `--color-*` (equivalente à tabela claro/escuro do PDF).
 */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../utils/cn'
import { Typography } from '../Typography/Typography'

export type ButtonEmphasis = 'primary' | 'secondary' | 'tertiary'
export type ButtonDensity = 'small' | 'medium' | 'large'
export type ButtonIntent = 'default' | 'danger' | 'success' | 'warning' | 'info'

const BUTTON_BASE =
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-pill font-body',
    'px-[var(--spacing-scale-3x)] gap-[var(--spacing-scale-base)]',
    'text-[var(--font-size-scale-up-01)] font-[var(--font-weight-semi-bold)] leading-[var(--font-lineheight-low)]',
    'normal-case tracking-normal',
    '[&_svg]:h-[var(--icon-size-base)] [&_svg]:w-[var(--icon-size-base)] [&_svg]:shrink-0',
    'transition-colors duration-ds-fast',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    'disabled:pointer-events-none disabled:opacity-45',
    '[&_svg]:pointer-events-none',
  ].join(' ')

const DENSITY_HEIGHT: Record<ButtonDensity, string> = {
  small: 'h-8 min-h-8',
  medium: 'h-10 min-h-10',
  large: 'h-12 min-h-12',
}

/** Superfície + texto por ênfase (intent default) — PDF + tema semântico claro/escuro. */
function classesDefaultIntent(emphasis: ButtonEmphasis): string {
  switch (emphasis) {
    case 'primary':
      return [
        'bg-primary text-primary-foreground',
        'hover:bg-primary-hover active:bg-primary-hover',
      ].join(' ')
    case 'secondary':
      return [
        'bg-pure-0 text-primary border border-primary',
        'hover:bg-primary/10 hover:border-primary-hover hover:text-primary-hover',
        'active:bg-primary/15',
        'dark:bg-background',
      ].join(' ')
    case 'tertiary':
      return [
        'bg-transparent text-primary border-0',
        'hover:bg-primary/10 active:bg-primary/15',
      ].join(' ')
    default:
      return ''
  }
}

function classesDanger(emphasis: ButtonEmphasis): string {
  switch (emphasis) {
    case 'primary':
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/90'
    case 'secondary':
      return [
        'bg-pure-0 text-destructive border border-destructive',
        'hover:bg-destructive/10 hover:border-destructive/90 active:bg-destructive/15',
        'dark:bg-background',
      ].join(' ')
    case 'tertiary':
      return 'bg-transparent text-destructive border-0 hover:bg-destructive/10 active:bg-destructive/15'
    default:
      return ''
  }
}

function classesSuccess(emphasis: ButtonEmphasis): string {
  switch (emphasis) {
    case 'primary':
      return 'bg-success text-success-foreground hover:bg-success/85 active:bg-success/90'
    case 'secondary':
      return [
        'bg-pure-0 text-success border border-success',
        'hover:bg-success/10 hover:border-success/90 active:bg-success/15',
        'dark:bg-background',
      ].join(' ')
    case 'tertiary':
      return 'bg-transparent text-success border-0 hover:bg-success/10 active:bg-success/15'
    default:
      return ''
  }
}

function classesWarning(emphasis: ButtonEmphasis): string {
  switch (emphasis) {
    case 'primary':
      return 'bg-warning text-warning-foreground hover:bg-warning/85 active:bg-warning/90'
    case 'secondary':
      return [
        'bg-pure-0 text-warning border border-warning',
        'hover:bg-warning/10 hover:border-warning/90 active:bg-warning/15',
        'dark:bg-background',
      ].join(' ')
    case 'tertiary':
      return 'bg-transparent text-warning border-0 hover:bg-warning/10 active:bg-warning/15'
    default:
      return ''
  }
}

function classesInfo(emphasis: ButtonEmphasis): string {
  switch (emphasis) {
    case 'primary':
      return 'bg-info text-info-foreground hover:bg-info/85 active:bg-info/90'
    case 'secondary':
      return [
        'bg-pure-0 text-info border border-info',
        'hover:bg-info/10 hover:border-info/90 active:bg-info/15',
        'dark:bg-background',
      ].join(' ')
    case 'tertiary':
      return 'bg-transparent text-info border-0 hover:bg-info/10 active:bg-info/15'
    default:
      return ''
  }
}

function buttonSurfaceClasses(emphasis: ButtonEmphasis, intent: ButtonIntent): string {
  switch (intent) {
    case 'default':
      return classesDefaultIntent(emphasis)
    case 'danger':
      return classesDanger(emphasis)
    case 'success':
      return classesSuccess(emphasis)
    case 'warning':
      return classesWarning(emphasis)
    case 'info':
      return classesInfo(emphasis)
    default:
      return classesDefaultIntent(emphasis)
  }
}

export type ButtonVariantOptions = {
  emphasis?: ButtonEmphasis
  density?: ButtonDensity
  intent?: ButtonIntent
  block?: boolean
  className?: string | null
}

/**
 * Classes do botão padrão (composição pública), alinhadas ao PDF GovBR + tokens.
 */
export function buttonVariants(options?: ButtonVariantOptions): string {
  const emphasis = options?.emphasis ?? 'primary'
  const density = options?.density ?? 'medium'
  const intent = options?.intent ?? 'default'
  const block = options?.block ?? false
  return cn(
    BUTTON_BASE,
    DENSITY_HEIGHT[density],
    block && 'w-full',
    buttonSurfaceClasses(emphasis, intent),
    options?.className,
  )
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: ButtonEmphasis
  density?: ButtonDensity
  intent?: ButtonIntent
  block?: boolean
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const SPINNER_PX: Record<ButtonDensity, number> = {
  small: 14,
  medium: 16,
  large: 18,
}

/** Indicador de progresso (SVG distinto do legado — arco + círculo de fundo). */
function ButtonSpinner({ size }: { size: number }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

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
    const isDisabled = Boolean(disabled || loading)
    const spinnerSize = SPINNER_PX[density]

    return (
      <Comp
        ref={ref}
        className={buttonVariants({ emphasis, density, intent, block, className })}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        data-emphasis={emphasis}
        data-intent={intent}
        {...props}
      >
        {loading ? (
          <ButtonSpinner size={spinnerSize} />
        ) : (
          <>
            {startIcon}
            {asChild ? children : (
              <Typography variant="button" as="span" color="inherit">
                {children}
              </Typography>
            )}
            {endIcon}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

const CIRCLE_BASE = [
  'inline-flex items-center justify-center rounded-full font-body',
  '[&_svg]:h-[var(--icon-size-base)] [&_svg]:w-[var(--icon-size-base)] [&_svg]:shrink-0',
  'transition-colors duration-ds-fast',
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
  'disabled:pointer-events-none disabled:opacity-45',
  '[&_svg]:pointer-events-none',
].join(' ')

const CIRCLE_SIZE: Record<ButtonDensity, string> = {
  small: 'h-8 w-8 min-h-8 min-w-8',
  medium: 'h-10 w-10 min-h-10 min-w-10',
  large: 'h-12 w-12 min-h-12 min-w-12',
}

/** Superfície circular: ênfase primária do PDF por intenção (sólida + hover). */
function circleIntentSurface(intent: ButtonIntent): string {
  switch (intent) {
    case 'default':
      return 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover'
    case 'danger':
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/90'
    case 'success':
      return 'bg-success text-success-foreground hover:bg-success/85 active:bg-success/90'
    case 'warning':
      return 'bg-warning text-warning-foreground hover:bg-warning/85 active:bg-warning/90'
    case 'info':
      return 'bg-info text-info-foreground hover:bg-info/85 active:bg-info/90'
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover'
  }
}

export type CircleButtonVariantOptions = {
  intent?: ButtonIntent
  density?: ButtonDensity
  className?: string | null
}

export function circleButtonVariants(options?: CircleButtonVariantOptions): string {
  const intent = options?.intent ?? 'default'
  const density = options?.density ?? 'medium'
  return cn(CIRCLE_BASE, CIRCLE_SIZE[density], circleIntentSurface(intent), options?.className)
}

export interface CircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  density?: ButtonDensity
  intent?: ButtonIntent
  loading?: boolean
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
    const isDisabled = Boolean(disabled || loading)
    const spinnerSize = SPINNER_PX[density]

    return (
      <button
        ref={ref}
        className={circleButtonVariants({ intent, density, className })}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        data-intent={intent}
        {...props}
      >
        {loading ? <ButtonSpinner size={spinnerSize} /> : children}
      </button>
    )
  },
)

CircleButton.displayName = 'CircleButton'

export { Button, CircleButton }
