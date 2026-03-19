import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Card Variants
 *
 * Compound component pattern: Card, CardHeader, CardTitle,
 * CardDescription, CardContent, CardFooter
 */

// ─────────────────────────────────────────────
// Card (Root)
// ─────────────────────────────────────────────

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        outline: 'shadow-none',
        elevated: 'shadow-md border-0',
        ghost: 'border-0 shadow-none bg-transparent',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
      interactive: false,
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

// ─────────────────────────────────────────────
// CardHeader
// ─────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

// ─────────────────────────────────────────────
// CardTitle
// ─────────────────────────────────────────────

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

// ─────────────────────────────────────────────
// CardDescription
// ─────────────────────────────────────────────

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

// ─────────────────────────────────────────────
// CardContent
// ─────────────────────────────────────────────

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

// ─────────────────────────────────────────────
// CardFooter
// ─────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
