import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─────────────────────────────────────────────
// Typography Variants — Class Variance Authority
//
// Mapeados diretamente dos textStyles em @ds/tokens/typography:
//   display-{2xl,xl,lg} | heading-{xl,lg,md,sm,xs}
//   body-{lg,md,sm,xs}  | label-{lg,md,sm}  | code-{lg,md,sm}
// ─────────────────────────────────────────────

const typographyVariants = cva('', {
  variants: {
    // ── Estilo tipográfico ─────────────────────
    variant: {
      // Display (hero, landing pages)
      'display-2xl': 'text-6xl leading-none font-bold tracking-tighter',
      'display-xl':  'text-5xl leading-none font-bold tracking-tighter',
      'display-lg':  'text-4xl leading-tight font-bold tracking-tight',

      // Headings
      'heading-xl': 'text-3xl leading-tight font-semibold tracking-tight',
      'heading-lg': 'text-2xl leading-snug font-semibold',
      'heading-md': 'text-xl leading-snug font-semibold',
      'heading-sm': 'text-lg leading-normal font-semibold',
      'heading-xs': 'text-base leading-normal font-semibold',

      // Body
      'body-lg': 'text-lg leading-relaxed',
      'body-md': 'text-base leading-normal',
      'body-sm': 'text-sm leading-normal',
      'body-xs': 'text-xs leading-normal',

      // Labels (forms, captions, badges)
      'label-lg': 'text-base leading-normal font-medium',
      'label-md': 'text-sm leading-normal font-medium',
      'label-sm': 'text-xs leading-normal font-medium tracking-wide',

      // Code
      'code-lg': 'font-mono text-base leading-normal',
      'code-md': 'font-mono text-sm leading-normal',
      'code-sm': 'font-mono text-xs leading-normal',
    },

    // ── Cor semântica ──────────────────────────
    color: {
      default:     'text-foreground',
      muted:       'text-muted-foreground',
      primary:     'text-primary',
      destructive: 'text-destructive',
      success:     'text-success',
      warning:     'text-warning',
      inherit:     'text-inherit',
    },

    // ── Override de peso ───────────────────────
    weight: {
      thin:       'font-thin',
      extralight: 'font-extralight',
      light:      'font-light',
      normal:     'font-normal',
      medium:     'font-medium',
      semibold:   'font-semibold',
      bold:       'font-bold',
      extrabold:  'font-extrabold',
      black:      'font-black',
    },

    // ── Alinhamento ────────────────────────────
    align: {
      left:    'text-left',
      center:  'text-center',
      right:   'text-right',
      justify: 'text-justify',
      start:   'text-start',
      end:     'text-end',
    },

    // ── Decoração ─────────────────────────────
    italic:    { true: 'italic',                        false: '' },
    underline: { true: 'underline underline-offset-4',  false: '' },

    // ── Overflow ──────────────────────────────
    truncate: { true: 'truncate', false: '' },

    // ── Responsividade ────────────────────────
    // Ativa escala mobile-first para variantes display e heading.
    // Usa compound variants para sobrescrever o tamanho base.
    responsive: { true: '', false: '' },
  },

  // ── Compound Variants: escala responsiva ────
  compoundVariants: [
    {
      variant: 'display-2xl',
      responsive: true,
      className: 'text-4xl sm:text-5xl lg:text-6xl leading-none font-bold tracking-tighter',
    },
    {
      variant: 'display-xl',
      responsive: true,
      className: 'text-3xl sm:text-4xl lg:text-5xl leading-none font-bold tracking-tighter',
    },
    {
      variant: 'display-lg',
      responsive: true,
      className: 'text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold tracking-tight',
    },
    {
      variant: 'heading-xl',
      responsive: true,
      className: 'text-2xl sm:text-3xl leading-tight font-semibold tracking-tight',
    },
    {
      variant: 'heading-lg',
      responsive: true,
      className: 'text-xl sm:text-2xl leading-snug font-semibold',
    },
    {
      variant: 'heading-md',
      responsive: true,
      className: 'text-lg sm:text-xl leading-snug font-semibold',
    },
    {
      variant: 'heading-sm',
      responsive: true,
      className: 'text-base sm:text-lg leading-normal font-semibold',
    },
  ],

  defaultVariants: {
    variant:   'body-md',
    color:     'default',
    italic:    false,
    underline: false,
    truncate:  false,
    responsive: false,
  },
})

// ─────────────────────────────────────────────
// Mapeamento: variant → elemento HTML padrão
//
// Garante semântica correta por default sem impedir
// overrides via prop `as` (ex: heading-lg como h1 em
// páginas que já possuem h1 em outro lugar).
// ─────────────────────────────────────────────

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>

const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  'display-2xl': 'h1',
  'display-xl':  'h1',
  'display-lg':  'h2',
  'heading-xl':  'h1',
  'heading-lg':  'h2',
  'heading-md':  'h3',
  'heading-sm':  'h4',
  'heading-xs':  'h5',
  'body-lg':     'p',
  'body-md':     'p',
  'body-sm':     'p',
  'body-xs':     'p',
  'label-lg':    'span',
  'label-md':    'span',
  'label-sm':    'span',
  'code-lg':     'code',
  'code-md':     'code',
  'code-sm':     'code',
}

// Classes para limitação de linhas (line-clamp).
// Tailwind exige strings completas para o JIT scanner detectar.
const clampClassMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

// ─────────────────────────────────────────────
// Typography Props
// ─────────────────────────────────────────────

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /**
   * Sobrescreve o elemento HTML renderizado.
   * Por padrão cada variante usa o elemento semântico adequado
   * (ex: heading-lg → h2). Use `as` para ajustar a hierarquia
   * sem alterar o estilo visual.
   *
   * @example
   * // Estilo de heading-lg mas sem criar um h2 extra na página
   * <Typography variant="heading-lg" as="p">Subtítulo</Typography>
   */
  as?: React.ElementType

  /**
   * Limita o texto a N linhas com reticências (CSS line-clamp).
   * Aceita valores de 1 a 6.
   */
  clamp?: 1 | 2 | 3 | 4 | 5 | 6
}

// ─────────────────────────────────────────────
// Typography Component
// ─────────────────────────────────────────────

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body-md',
      color,
      weight,
      align,
      italic,
      underline,
      truncate,
      responsive,
      clamp,
      as,
      ...props
    },
    ref,
  ) => {
    const Comp = as ?? defaultElementMap[variant ?? 'body-md']

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            color,
            weight,
            align,
            italic,
            underline,
            truncate,
            responsive,
          }),
          clamp !== undefined && clampClassMap[clamp],
          className,
        )}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
