/**
 * Card — GovBR (superfície + área mínima de conteúdo)
 * Blocos: CardHeader (títulos), CardContent, CardActions/CardFooter (ações), CardMedia (sangria).
 * Tokens: `--pure-0`, `--color-border`, `--shadow-card`, `--shadow-popover` (hover), `--card-padding` (16px), `--card-icon-padding` (8px).
 * Ver Storybook «Components/Card» para anatomia, margens, dimensões e boas práticas.
 */
import * as React from 'react'
import { cn } from '../utils/cn'

interface CardContextValue {
  fixedHeight: boolean
  contentHeight: number
}

export const CardContext = React.createContext<CardContextValue>({
  fixedHeight: false,
  contentHeight: 250,
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card clicável / hover (foco visível) */
  hover?: boolean
  /** Superfície desativada — `aria-disabled` + `--status-disabled-background` */
  disabled?: boolean
  /** Arrastar (feedback visual) — `--status-dragged-background` */
  dragged?: boolean
  /** Altura fixa da área de conteúdo (sem rolagem interna; GovBR recomenda evitar scroll no card) */
  fixedHeight?: boolean
  /** Altura em px quando `fixedHeight` (padrão 250) */
  contentHeight?: number
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = false,
      disabled = false,
      dragged = false,
      fixedHeight = false,
      contentHeight = 250,
      children,
      onClick,
      ...props
    },
    ref,
  ) => (
    <CardContext.Provider value={{ fixedHeight, contentHeight }}>
      <div
        ref={ref}
        className={cn(
          'rounded-md border border-border bg-pure-0 font-body text-card-foreground shadow-[var(--shadow-card)] dark:bg-card dark:text-card-foreground',
          'transition-[box-shadow,background-color] duration-gov-base ease-[cubic-bezier(0.42,0,0.58,1)]',
          hover && !disabled && [
            'cursor-pointer',
            'hover:shadow-[var(--shadow-popover)]',
            'hover:bg-[linear-gradient(var(--color-card-hover-overlay),var(--color-card-hover-overlay))]',
            'active:bg-[linear-gradient(var(--color-card-active-overlay),var(--color-card-active-overlay))]',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
          ],
          disabled &&
            'pointer-events-none cursor-not-allowed border-border/50 bg-[var(--status-disabled-background)] shadow-none text-muted-foreground',
          dragged &&
            !disabled &&
            'bg-[var(--status-dragged-background)] ring-2 ring-primary/40 ring-offset-0',
          className,
        )}
        aria-disabled={disabled || undefined}
        data-dragged={dragged || undefined}
        tabIndex={hover && !disabled ? 0 : undefined}
        onClick={!disabled ? onClick : undefined}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  ),
)
Card.displayName = 'Card'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-[var(--card-padding)] pt-[var(--card-padding)] pb-0',
        className,
      )}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

/** Ícone / avatar na área de título — padding 8px (GovBR) */
export interface CardHeaderIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeaderIcon = React.forwardRef<HTMLDivElement, CardHeaderIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex shrink-0 p-[var(--card-icon-padding)]', className)}
      {...props}
    />
  ),
)
CardHeaderIcon.displayName = 'CardHeaderIcon'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn('font-heading text-up-03 font-semibold leading-[1.15]', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-body text-base text-muted-foreground leading-[1.45]', className)}
      {...props}
    />
  ),
)
CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, style, ...props }, ref) => {
    const { fixedHeight, contentHeight } = React.useContext(CardContext)

    return (
      <div
        ref={ref}
        className={cn(
          'p-[var(--card-padding)]',
          fixedHeight && 'min-h-0 overflow-hidden',
          className,
        )}
        style={{
          ...(fixedHeight ? { height: contentHeight, maxHeight: contentHeight } : {}),
          ...style,
        }}
        {...props}
      />
    )
  },
)
CardContent.displayName = 'CardContent'

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-[var(--spacing-scale-base)] px-[var(--card-padding)] pb-[var(--card-padding)] pt-0',
        className,
      )}
      {...props}
    />
  ),
)
CardActions.displayName = 'CardActions'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-[var(--spacing-scale-base)] px-[var(--card-padding)] pb-[var(--card-padding)] pt-0',
        className,
      )}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  alt?: string
  height?: number | string
  component?: 'div' | 'img' | 'video'
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, image, alt, height = 200, component: Comp = 'div', style, ...props }, ref) => {
    if (Comp === 'img') {
      return (
        <img
          ref={ref as React.Ref<HTMLImageElement>}
          src={image}
          alt={alt ?? ''}
          className={cn('w-full object-cover', className)}
          style={{ height, ...style }}
          {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      )
    }

    return (
      <div
        ref={ref}
        role={image ? 'img' : undefined}
        aria-label={image ? alt : undefined}
        className={cn('w-full bg-cover bg-center', className)}
        style={{
          height,
          backgroundImage: image ? `url(${image})` : undefined,
          ...style,
        }}
        {...props}
      />
    )
  },
)
CardMedia.displayName = 'CardMedia'

export {
  Card,
  CardHeader,
  CardHeaderIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
  CardFooter,
  CardMedia,
}
