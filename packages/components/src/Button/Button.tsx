'use client'
/**
 * Button — Padrão Digital de Governo (GovBR)
 * Anatomia: ícone opcional, rótulo obrigatório (exceto CircleButton), superfície por ênfase.
 * Tokens: tipografia/ícone/padding/spacing/pill conforme globals do DS — ver Storybook «Components/Button» para guia de uso.
 */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-pill',
    'px-[var(--spacing-scale-3x)] gap-[var(--spacing-scale-base)]',
    'text-[var(--font-size-scale-up-01)] font-[var(--font-weight-semi-bold)] leading-[var(--font-lineheight-low)]',
    'normal-case tracking-normal',
    '[&_svg]:h-[var(--icon-size-base)] [&_svg]:w-[var(--icon-size-base)] [&_svg]:shrink-0',
    'transition-colors duration-gov-fast',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    'disabled:pointer-events-none disabled:opacity-45',
    '[&_svg]:pointer-events-none',
  ].join(' '),
  {
    variants: {
      emphasis: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover',
        secondary:
          [
            'bg-pure-0 text-primary border border-primary',
            'hover:bg-primary/10 hover:border-primary-hover hover:text-primary-hover active:bg-primary/15',
            'dark:bg-background',
          ].join(' '),
        tertiary:
          'bg-transparent text-primary border-0 hover:bg-primary/10 active:bg-primary/15',
      },

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

      /** GovBR: 32px (alta) | 40px (padrão) | 48px (baixa) */
      density: {
        small:  'h-8 min-h-8',
        medium: 'h-10 min-h-10',
        large:  'h-12 min-h-12',
      },

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

export type ButtonEmphasis = 'primary' | 'secondary' | 'tertiary'
export type ButtonDensity  = 'small' | 'medium' | 'large'
export type ButtonIntent   = 'default' | 'danger' | 'success' | 'warning' | 'info'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  emphasis?: ButtonEmphasis
  density?: ButtonDensity
  intent?: ButtonIntent
  block?: boolean
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const SPINNER_SIZE: Record<ButtonDensity, number> = {
  small:  14,
  medium: 16,
  large:  18,
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

const circleButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full',
    '[&_svg]:h-[var(--icon-size-base)] [&_svg]:w-[var(--icon-size-base)] [&_svg]:shrink-0',
    'transition-colors duration-gov-fast',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    'disabled:pointer-events-none disabled:opacity-45',
    '[&_svg]:pointer-events-none',
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
        small:  'h-8 w-8 min-h-8 min-w-8',
        medium: 'h-10 w-10 min-h-10 min-w-10',
        large:  'h-12 w-12 min-h-12 min-w-12',
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
