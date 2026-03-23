/**
 * Typography — Padrão Digital de Governo (GovBR)
 *
 * Estilos tipográficos derivados exclusivamente de `semanticTypography` em `@ds/tokens`.
 * Cor, alinhamento e utilitários de layout usam Tailwind via CVA (`typographyLayoutVariants`).
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { semanticTypography, fontWeights } from '@ds/tokens'
import { cn } from '../utils/cn'

export type TypographyVariant = keyof typeof semanticTypography

const typographyLayoutVariants = cva('', {
  variants: {
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
      start: 'text-start',
      end: 'text-end',
    },
    italic: { true: 'italic', false: '' },
    underline: { true: 'underline underline-offset-4', false: '' },
    truncate: { true: 'truncate', false: '' },
  },
  defaultVariants: {
    color: 'default',
    italic: false,
    underline: false,
    truncate: false,
  },
})

const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  display: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  label: 'span',
  input: 'span',
  placeholder: 'span',
  legend: 'span',
  caption: 'span',
  overline: 'span',
  button: 'span',
  code: 'code',
}

const clampClassMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

const weightToFontWeight = {
  thin: fontWeights.thin,
  extralight: fontWeights.extraLight,
  light: fontWeights.light,
  normal: fontWeights.regular,
  medium: fontWeights.medium,
  semibold: fontWeights.semiBold,
  bold: fontWeights.bold,
  extrabold: fontWeights.extraBold,
  black: fontWeights.black,
} as const

export type TypographyWeight = keyof typeof weightToFontWeight

function tokenToStyle(variant: TypographyVariant): React.CSSProperties {
  return { ...semanticTypography[variant] }
}

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyLayoutVariants> {
  variant?: TypographyVariant
  as?: React.ElementType
  clamp?: 1 | 2 | 3 | 4 | 5 | 6
  weight?: TypographyWeight
  /** Válido quando `as="label"` — associa o rótulo ao controle do formulário. */
  htmlFor?: string
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body2',
      color,
      align,
      italic,
      underline,
      truncate,
      clamp,
      weight,
      as,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = as ?? defaultElementMap[variant]

    const tokenStyle = tokenToStyle(variant)
    const mergedStyle: React.CSSProperties = {
      ...tokenStyle,
      ...(weight !== undefined ? { fontWeight: weightToFontWeight[weight] } : {}),
      ...style,
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyLayoutVariants({
            color,
            align,
            italic,
            underline,
            truncate,
          }),
          clamp !== undefined && clampClassMap[clamp],
          className,
        )}
        style={mergedStyle}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'

export { Typography, typographyLayoutVariants }
