import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  fontSizes,
  fontWeights,
  lineHeights,
  semanticTypography,
} from '@ds/tokens'
import {
  Typography,
  typographyLayoutVariants,
  type TypographyVariant,
} from './Typography'

describe('Typography — renderização padrão', () => {
  it('renderiza com variant body2 como <p> por padrão', () => {
    render(<Typography>Texto padrão</Typography>)
    const el = screen.getByText('Texto padrão')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text-foreground')
    expect(el).toHaveStyle({
      fontSize: fontSizes.base,
      lineHeight: `${lineHeights.medium}`,
      fontWeight: String(fontWeights.regular),
    })
  })

  it('renderiza os filhos corretamente', () => {
    render(<Typography>Conteúdo do texto</Typography>)
    expect(screen.getByText('Conteúdo do texto')).toBeInTheDocument()
  })
})

const defaultTagByVariant: Record<TypographyVariant, string> = {
  display: 'P',
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6',
  body1: 'P',
  body2: 'P',
  label: 'SPAN',
  input: 'SPAN',
  placeholder: 'SPAN',
  legend: 'SPAN',
  caption: 'SPAN',
  overline: 'SPAN',
  button: 'SPAN',
  code: 'CODE',
}

describe('Typography — elemento semântico padrão', () => {
  it.each(Object.entries(defaultTagByVariant) as [TypographyVariant, string][])(
    'variant %s renderiza como <%s>',
    (variant, tag) => {
      render(<Typography variant={variant}>texto</Typography>)
      expect(screen.getByText('texto').tagName).toBe(tag)
    },
  )
})

describe('Typography — layout CVA', () => {
  it('typographyLayoutVariants inclui cor padrão', () => {
    expect(
      typographyLayoutVariants({
        color: 'default',
        italic: false,
        underline: false,
        truncate: false,
      }),
    ).toContain('text-foreground')
  })
})

describe('Typography — estilos alinhados aos tokens', () => {
  it('body1 usa token semanticTypography.body1', () => {
    render(<Typography variant="body1">x</Typography>)
    const el = screen.getByText('x')
    const t = semanticTypography.body1
    expect(el).toHaveStyle({
      fontSize: t.fontSize,
      lineHeight: `${t.lineHeight}`,
      fontWeight: String(t.fontWeight),
      letterSpacing: t.letterSpacing,
    })
  })

  it('h6 aplica uppercase e letterSpacing do token', () => {
    render(<Typography variant="h6">x</Typography>)
    expect(screen.getByText('x')).toHaveStyle({
      textTransform: 'uppercase',
      letterSpacing: semanticTypography.h6.letterSpacing,
    })
  })

  it('placeholder aplica fontStyle italic do token', () => {
    render(<Typography variant="placeholder">x</Typography>)
    expect(screen.getByText('x')).toHaveStyle({ fontStyle: 'italic' })
  })

  it('button aplica textTransform none do token', () => {
    render(<Typography variant="button">x</Typography>)
    expect(screen.getByText('x')).toHaveStyle({ textTransform: 'none' })
  })
})

describe('Typography — prop `as`', () => {
  it('permite renderizar h2 como <h1>', () => {
    render(
      <Typography variant="h2" as="h1">
        Título
      </Typography>,
    )
    expect(screen.getByText('Título').tagName).toBe('H1')
  })

  it('permite renderizar body2 como <span>', () => {
    render(
      <Typography variant="body2" as="span">
        inline
      </Typography>,
    )
    expect(screen.getByText('inline').tagName).toBe('SPAN')
  })

  it('permite renderizar label como <label>', () => {
    render(
      <Typography variant="label" as="label" htmlFor="campo">
        Label
      </Typography>,
    )
    const el = screen.getByText('Label')
    expect(el.tagName).toBe('LABEL')
    expect(el).toHaveAttribute('for', 'campo')
  })

  it('mantém estilos do token ao sobrescrever o elemento', () => {
    render(
      <Typography variant="h3" as="p">
        título
      </Typography>,
    )
    const el = screen.getByText('título')
    expect(el.tagName).toBe('P')
    expect(el).toHaveStyle({
      fontSize: semanticTypography.h3.fontSize,
      fontWeight: String(semanticTypography.h3.fontWeight),
    })
  })
})

describe('Typography — prop `color`', () => {
  it.each([
    ['default', 'text-foreground'],
    ['muted', 'text-muted-foreground'],
    ['primary', 'text-primary'],
    ['destructive', 'text-destructive'],
    ['success', 'text-success'],
    ['warning', 'text-warning'],
    ['inherit', 'text-inherit'],
  ] as const)('color %s aplica a classe %s', (color, cls) => {
    render(<Typography color={color}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(cls)
  })
})

describe('Typography — prop `weight`', () => {
  it.each([
    ['thin', fontWeights.thin],
    ['light', fontWeights.light],
    ['normal', fontWeights.regular],
    ['medium', fontWeights.medium],
    ['semibold', fontWeights.semiBold],
    ['bold', fontWeights.bold],
    ['extrabold', fontWeights.extraBold],
    ['black', fontWeights.black],
  ] as const)('weight %s define fontWeight no style', (weight, value) => {
    render(
      <Typography variant="body2" weight={weight}>
        texto
      </Typography>,
    )
    expect(screen.getByText('texto')).toHaveStyle({ fontWeight: String(value) })
  })
})

describe('Typography — prop `align`', () => {
  it.each([
    ['left', 'text-left'],
    ['center', 'text-center'],
    ['right', 'text-right'],
    ['justify', 'text-justify'],
  ] as const)('align %s aplica a classe %s', (align, cls) => {
    render(<Typography align={align}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(cls)
  })
})

describe('Typography — props de decoração', () => {
  it('aplica italic quando italic={true}', () => {
    render(<Typography italic>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass('italic')
  })

  it('não aplica italic quando italic={false}', () => {
    render(<Typography italic={false}>texto</Typography>)
    expect(screen.getByText('texto')).not.toHaveClass('italic')
  })

  it('aplica underline quando underline={true}', () => {
    render(<Typography underline>texto</Typography>)
    const el = screen.getByText('texto')
    expect(el).toHaveClass('underline')
    expect(el).toHaveClass('underline-offset-4')
  })
})

describe('Typography — overflow', () => {
  it('aplica truncate', () => {
    render(<Typography truncate>texto longo</Typography>)
    expect(screen.getByText('texto longo')).toHaveClass('truncate')
  })

  it.each([1, 2, 3, 4, 5, 6] as const)('aplica line-clamp-%d', (n) => {
    render(<Typography clamp={n}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(`line-clamp-${n}`)
  })
})

describe('Typography — merge de style', () => {
  it('aceita style do usuário junto ao token', () => {
    render(<Typography style={{ marginTop: 12 }}>x</Typography>)
    expect(screen.getByText('x')).toHaveStyle({ marginTop: '12px' })
  })
})

describe('Typography — className e ref', () => {
  it('aceita className customizado', () => {
    render(<Typography className="minha-classe">texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass('minha-classe')
  })

  it('encaminha ref corretamente', () => {
    const ref = vi.fn()
    render(<Typography ref={ref}>texto</Typography>)
    expect(ref).toHaveBeenCalled()
  })
})
