/**
 * Card — Padrão Digital de Governo (GovBR)
 *
 * Superfície branca com sombra que agrupa conteúdo de um único assunto.
 *
 * Anatomia (3 áreas opcionais, qualquer ordem):
 *   CardHeader  → títulos, subtítulos, ícones, avatares, tags
 *   CardContent → qualquer conteúdo (exceto navegação)
 *   CardActions → exclusivo para botões e links
 *
 * Props extras:
 *   hover       → habilita estado interativo (cursor + overlay ao hover)
 *   disabled    → estado desativado (aria-disabled + visual)
 *   fixedHeight → altura fixa com scroll interno no CardContent
 *   contentHeight → valor em px para a altura fixa (default 250)
 */
import * as React from 'react'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Context — compartilha fixedHeight com CardContent
// ─────────────────────────────────────────────

interface CardContextValue {
  fixedHeight: boolean
  contentHeight: number
}

export const CardContext = React.createContext<CardContextValue>({
  fixedHeight: false,
  contentHeight: 250,
})

// ─────────────────────────────────────────────
// Card (Root)
// ─────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Habilita estado hover — indica que o card é interativo/clicável */
  hover?: boolean
  /** Estado desabilitado — adiciona aria-disabled e visual de inatividade */
  disabled?: boolean
  /** Ativa altura fixa com scroll interno no CardContent */
  fixedHeight?: boolean
  /** Altura do conteúdo quando fixedHeight=true (padrão: 250px) */
  contentHeight?: number
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = false,
      disabled = false,
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
          // Base — superfície branca com borda-radius 8px (md) e sombra card-sm
          'rounded-md bg-card text-card-foreground shadow-[0_1px_2px_0_rgba(7,29,65,0.08)]',
          // Transição
          'transition-[box-shadow,background-image] duration-[300ms] ease-[cubic-bezier(0.42,0,0.58,1)]',
          // Hover interativo
          hover && !disabled && [
            'cursor-pointer',
            'hover:shadow-[0_2px_8px_0_rgba(7,29,65,0.12)]',
            'hover:bg-[linear-gradient(rgba(19,81,180,0.08),rgba(19,81,180,0.08))]',
            'active:bg-[linear-gradient(rgba(19,81,180,0.16),rgba(19,81,180,0.16))]',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
          ],
          // Disabled
          disabled && 'opacity-45 pointer-events-none cursor-default shadow-none bg-muted',
          className,
        )}
        aria-disabled={disabled || undefined}
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

// ─────────────────────────────────────────────
// CardHeader — área de títulos
// padding: 16px lateral+topo, sem padding-bottom
// ─────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 pt-4 pb-0', className)}
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
        'text-gov-xl font-semibold leading-[1.15]',
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

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-gov-sm text-muted-foreground leading-[1.45]', className)}
      {...props}
    />
  ),
)
CardDescription.displayName = 'CardDescription'

// ─────────────────────────────────────────────
// CardContent — área de conteúdo
// padding: 16px todos os lados
// Suporte a fixedHeight com scroll interno
// ─────────────────────────────────────────────

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, style, ...props }, ref) => {
    const { fixedHeight, contentHeight } = React.useContext(CardContext)

    return (
      <div
        ref={ref}
        className={cn(
          'p-4',
          fixedHeight && 'overflow-y-auto scrollbar-thin',
          className,
        )}
        style={{
          ...(fixedHeight ? { maxHeight: contentHeight } : {}),
          ...style,
        }}
        {...props}
      />
    )
  },
)
CardContent.displayName = 'CardContent'

// ─────────────────────────────────────────────
// CardActions — área de ações
// padding: sem padding-top, 16px lateral+baixo, gap 8px
// ─────────────────────────────────────────────

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-2 px-4 pb-4 pt-0', className)}
      {...props}
    />
  ),
)
CardActions.displayName = 'CardActions'

// ─────────────────────────────────────────────
// CardFooter — alias de CardActions (compatibilidade)
// ─────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-2 px-4 pb-4 pt-0', className)}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'

// ─────────────────────────────────────────────
// CardMedia — imagem/vídeo (pode sangrar nas bordas)
// ─────────────────────────────────────────────

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem (renderiza como background-image) */
  image?: string
  /** Texto alternativo para acessibilidade quando image está presente */
  alt?: string
  /** Altura do bloco de mídia */
  height?: number | string
  /** Tag HTML a renderizar */
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

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
  CardFooter,
  CardMedia,
}
