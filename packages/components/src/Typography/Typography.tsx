/**
 * Typography — Padrão Digital de Governo (GovBR)
 * Source: Padrão Digital de Governo - Tipografia
 *
 * Variantes alinhadas com semanticTypography de @ds/tokens:
 *   display            → up-07, light (300), low (1.15)
 *   h1                 → up-06, light (300), low (1.15)
 *   h2                 → up-05, regular (400), low (1.15)
 *   h3                 → up-04, medium (500), low (1.15)
 *   h4                 → up-03, semi-bold (600), low (1.15)
 *   h5                 → up-02, bold (700), low (1.15)
 *   h6                 → up-01, extra-bold (800), low (1.15), UPPERCASE
 *   body1 / body-lg    → up-01, regular (400), medium (1.45)
 *   body2 / body-md    → base (14px), regular (400), medium (1.45)
 *   label              → base (14px), semi-bold (600), medium (1.45)
 *   caption            → down-01 (11.67px), regular (400), medium (1.45)
 *   overline           → base (14px), semi-bold (600), medium (1.45), UPPERCASE
 *   button             → up-01, semi-bold (600), low (1.15)
 *   code               → mono, base (14px), medium (500), low (1.15)
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Typography Variants — Class Variance Authority
// Usa a escala GovBR dos tokens: text-down-* | text-base | text-up-*
// ─────────────────────────────────────────────

const typographyVariants = cva('', {
  variants: {
    // ── Estilo tipográfico GovBR ──────────────
    variant: {
      // Display (hero, landing) — up-07 / light / low
      'display':     'font-heading text-up-07 leading-[1.15] font-light tracking-[-0.025em]',

      // Headings — escala Minor Third GovBR
      'h1':          'font-heading text-up-06 leading-[1.15] font-light tracking-[-0.025em]',
      'h2':          'font-heading text-up-05 leading-[1.15] font-normal tracking-[-0.025em]',
      'h3':          'font-heading text-up-04 leading-[1.15] font-medium',
      'h4':          'font-heading text-up-03  leading-[1.15] font-semibold',
      'h5':          'font-heading text-up-02  leading-[1.15] font-bold',
      'h6':          'font-heading text-up-01 leading-[1.15] font-extrabold uppercase tracking-[0.08em]',

      // Body — base: up-01 (1.05rem)
      'body1':       'font-body text-up-01 leading-[1.45] font-normal',
      'body2':       'font-body text-base   leading-[1.45] font-normal',

      // Label — base (14px) / semi-bold
      'label':       'font-body text-base leading-[1.45] font-semibold',

      // Input — up-01 / medium / low
      'input':       'font-body text-up-01 leading-[1.15] font-medium',

      // Caption — down-01 (11.67px)
      'caption':     'font-body text-down-01 leading-[1.45] font-normal',

      // Overline — base / semi-bold / uppercase
      'overline':    'font-body text-base leading-[1.45] font-semibold uppercase tracking-[0.08em]',

      // Button — up-01 / semi-bold
      'button':      'font-body text-up-01 leading-[1.15] font-semibold',

      // Code — mono / base / medium / low
      'code':        'font-mono text-base leading-[1.15] font-medium',

      // Aliases compostos para display e headings (mantém compatibilidade)
      'display-2xl': 'font-heading text-up-07 leading-[1.15] font-bold tracking-[-0.025em]',
      'display-xl':  'font-heading text-up-06 leading-[1.15] font-bold tracking-[-0.025em]',
      'display-lg':  'font-heading text-up-05 leading-[1.15] font-bold',
      'heading-xl':  'font-heading text-up-06 leading-[1.15] font-light',
      'heading-lg':  'font-heading text-up-05 leading-[1.15] font-normal',
      'heading-md':  'font-heading text-up-04 leading-[1.15] font-medium',
      'heading-sm':  'font-heading text-up-03  leading-[1.15] font-semibold',
      'heading-xs':  'font-heading text-up-02  leading-[1.15] font-bold uppercase tracking-[0.08em]',
      'body-lg':     'font-body text-up-01 leading-[1.45] font-normal',
      'body-md':     'font-body text-up-01 leading-[1.45] font-normal',
      'body-sm':     'font-body text-base   leading-[1.45] font-normal',
      'body-xs':     'font-body text-down-01   leading-[1.45] font-normal',
      'label-lg':    'font-body text-up-01 leading-[1.45] font-medium',
      'label-md':    'font-body text-base   leading-[1.45] font-medium',
      'label-sm':    'font-body text-down-01   leading-[1.45] font-medium tracking-[0.025em]',
      'code-lg':     'font-mono text-up-01 leading-[1.45] font-normal',
      'code-md':     'font-mono text-base   leading-[1.45] font-normal',
      'code-sm':     'font-mono text-down-01   leading-[1.45] font-normal',
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
    italic:    { true: 'italic',                       false: '' },
    underline: { true: 'underline underline-offset-4', false: '' },

    // ── Overflow ──────────────────────────────
    truncate: { true: 'truncate', false: '' },

    // ── Responsividade ────────────────────────
    responsive: { true: '', false: '' },
  },

  // ── Compound Variants: escala responsiva ────
  compoundVariants: [
    {
      variant: 'h1',
      responsive: true,
      className: 'font-heading text-up-05 sm:text-up-06 leading-[1.15] font-light tracking-[-0.025em]',
    },
    {
      variant: 'h2',
      responsive: true,
      className: 'font-heading text-up-04 sm:text-up-05 leading-[1.15] font-normal tracking-[-0.025em]',
    },
    {
      variant: 'h3',
      responsive: true,
      className: 'font-heading text-up-03 sm:text-up-04 leading-[1.15] font-medium',
    },
    {
      variant: 'h4',
      responsive: true,
      className: 'font-heading text-up-02 sm:text-up-03 leading-[1.15] font-semibold',
    },
    {
      variant: 'display-2xl',
      responsive: true,
      className: 'font-heading text-up-05 sm:text-up-06 lg:text-up-07 leading-[1.15] font-bold tracking-[-0.025em]',
    },
    {
      variant: 'display-xl',
      responsive: true,
      className: 'font-heading text-up-04 sm:text-up-05 lg:text-up-06 leading-[1.15] font-bold tracking-[-0.025em]',
    },
    {
      variant: 'heading-xl',
      responsive: true,
      className: 'font-heading text-up-04 sm:text-up-05 leading-[1.15] font-light',
    },
    {
      variant: 'heading-lg',
      responsive: true,
      className: 'font-heading text-up-03 sm:text-up-04 leading-[1.15] font-normal',
    },
    {
      variant: 'heading-md',
      responsive: true,
      className: 'font-heading text-up-02 sm:text-up-03 leading-[1.15] font-medium',
    },
    {
      variant: 'heading-sm',
      responsive: true,
      className: 'font-heading text-up-01 sm:text-up-02 leading-[1.15] font-semibold',
    },
  ],

  defaultVariants: {
    variant:   'body2',
    color:     'default',
    italic:    false,
    underline: false,
    truncate:  false,
    responsive: false,
  },
})

// ─────────────────────────────────────────────
// Mapeamento: variant → elemento HTML padrão
// ─────────────────────────────────────────────

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>

const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  'display':      'p',
  'h1':           'h1',
  'h2':           'h2',
  'h3':           'h3',
  'h4':           'h4',
  'h5':           'h5',
  'h6':           'h6',
  'body1':        'p',
  'body2':        'p',
  'label':        'span',
  'input':        'span',
  'caption':      'span',
  'overline':     'span',
  'button':       'span',
  'code':         'code',
  'display-2xl':  'h1',
  'display-xl':   'h1',
  'display-lg':   'h2',
  'heading-xl':   'h1',
  'heading-lg':   'h2',
  'heading-md':   'h3',
  'heading-sm':   'h4',
  'heading-xs':   'h5',
  'body-lg':      'p',
  'body-md':      'p',
  'body-sm':      'p',
  'body-xs':      'p',
  'label-lg':     'span',
  'label-md':     'span',
  'label-sm':     'span',
  'code-lg':      'code',
  'code-md':      'code',
  'code-sm':      'code',
}

// Classes para limitação de linhas (line-clamp)
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
   * (ex: h2 → h2). Use `as` para ajustar a hierarquia
   * sem alterar o estilo visual.
   *
   * @example
   * <Typography variant="h2" as="p">Subtítulo</Typography>
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
      variant = 'body2',
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
    const Comp = as ?? defaultElementMap[variant ?? 'body2']

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
