import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Typography } from './Typography'

// ─────────────────────────────────────────────
// Renderização padrão
// ─────────────────────────────────────────────

describe('Typography — renderização padrão', () => {
  it('renderiza com variant body-md como <p> por padrão', () => {
    render(<Typography>Texto padrão</Typography>)
    const el = screen.getByText('Texto padrão')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text-base', 'leading-normal')
  })

  it('renderiza os filhos corretamente', () => {
    render(<Typography>Conteúdo do texto</Typography>)
    expect(screen.getByText('Conteúdo do texto')).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────
// Elementos semânticos padrão por variante
// ─────────────────────────────────────────────

describe('Typography — elemento semântico padrão', () => {
  it.each([
    ['display-2xl', 'H1'],
    ['display-xl',  'H1'],
    ['display-lg',  'H2'],
  ] as const)('variant %s renderiza como <%s>', (variant, tag) => {
    render(<Typography variant={variant}>texto</Typography>)
    expect(screen.getByText('texto').tagName).toBe(tag)
  })

  it.each([
    ['heading-xl', 'H1'],
    ['heading-lg', 'H2'],
    ['heading-md', 'H3'],
    ['heading-sm', 'H4'],
    ['heading-xs', 'H5'],
  ] as const)('variant %s renderiza como <%s>', (variant, tag) => {
    render(<Typography variant={variant}>texto</Typography>)
    expect(screen.getByText('texto').tagName).toBe(tag)
  })

  it.each([
    ['body-lg', 'P'],
    ['body-md', 'P'],
    ['body-sm', 'P'],
    ['body-xs', 'P'],
  ] as const)('variant %s renderiza como <%s>', (variant, tag) => {
    render(<Typography variant={variant}>texto</Typography>)
    expect(screen.getByText('texto').tagName).toBe(tag)
  })

  it.each([
    ['label-lg', 'SPAN'],
    ['label-md', 'SPAN'],
    ['label-sm', 'SPAN'],
  ] as const)('variant %s renderiza como <%s>', (variant, tag) => {
    render(<Typography variant={variant}>texto</Typography>)
    expect(screen.getByText('texto').tagName).toBe(tag)
  })

  it.each([
    ['code-lg', 'CODE'],
    ['code-md', 'CODE'],
    ['code-sm', 'CODE'],
  ] as const)('variant %s renderiza como <%s>', (variant, tag) => {
    render(<Typography variant={variant}>texto</Typography>)
    expect(screen.getByText('texto').tagName).toBe(tag)
  })
})

// ─────────────────────────────────────────────
// Classes tipográficas por variante
// ─────────────────────────────────────────────

describe('Typography — classes por variante', () => {
  it.each([
    ['display-2xl', ['text-6xl', 'leading-none', 'font-bold', 'tracking-tighter']],
    ['display-xl',  ['text-5xl', 'leading-none', 'font-bold', 'tracking-tighter']],
    ['display-lg',  ['text-4xl', 'leading-tight', 'font-bold', 'tracking-tight']],
    ['heading-xl',  ['text-3xl', 'leading-tight', 'font-semibold', 'tracking-tight']],
    ['heading-lg',  ['text-2xl', 'leading-snug', 'font-semibold']],
    ['heading-md',  ['text-xl', 'leading-snug', 'font-semibold']],
    ['heading-sm',  ['text-lg', 'leading-normal', 'font-semibold']],
    ['heading-xs',  ['text-base', 'leading-normal', 'font-semibold']],
    ['body-lg',     ['text-lg', 'leading-relaxed']],
    ['body-md',     ['text-base', 'leading-normal']],
    ['body-sm',     ['text-sm', 'leading-normal']],
    ['body-xs',     ['text-xs', 'leading-normal']],
    ['label-lg',    ['text-base', 'font-medium']],
    ['label-md',    ['text-sm', 'font-medium']],
    ['label-sm',    ['text-xs', 'font-medium', 'tracking-wide']],
    ['code-lg',     ['font-mono', 'text-base']],
    ['code-md',     ['font-mono', 'text-sm']],
    ['code-sm',     ['font-mono', 'text-xs']],
  ] as const)('variant %s aplica as classes corretas', (variant, classes) => {
    render(<Typography variant={variant}>x</Typography>)
    const el = screen.getByText('x')
    classes.forEach((cls) => expect(el).toHaveClass(cls))
  })
})

// ─────────────────────────────────────────────
// Prop `as` — override do elemento semântico
// ─────────────────────────────────────────────

describe('Typography — prop `as`', () => {
  it('permite renderizar heading-lg como <h1>', () => {
    render(<Typography variant="heading-lg" as="h1">Título</Typography>)
    expect(screen.getByText('Título').tagName).toBe('H1')
  })

  it('permite renderizar body-md como <span>', () => {
    render(<Typography variant="body-md" as="span">inline</Typography>)
    expect(screen.getByText('inline').tagName).toBe('SPAN')
  })

  it('permite renderizar label-md como <label>', () => {
    render(<Typography variant="label-md" as="label" htmlFor="campo">Label</Typography>)
    const el = screen.getByText('Label')
    expect(el.tagName).toBe('LABEL')
    expect(el).toHaveAttribute('for', 'campo')
  })

  it('mantem as classes visuais ao sobrescrever o elemento', () => {
    render(<Typography variant="heading-md" as="p">título</Typography>)
    const el = screen.getByText('título')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text-xl', 'font-semibold')
  })
})

// ─────────────────────────────────────────────
// Variantes de cor
// ─────────────────────────────────────────────

describe('Typography — prop `color`', () => {
  it.each([
    ['default',     'text-foreground'],
    ['muted',       'text-muted-foreground'],
    ['primary',     'text-primary'],
    ['destructive', 'text-destructive'],
    ['success',     'text-success'],
    ['warning',     'text-warning'],
    ['inherit',     'text-inherit'],
  ] as const)('color %s aplica a classe %s', (color, cls) => {
    render(<Typography color={color}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(cls)
  })
})

// ─────────────────────────────────────────────
// Override de peso
// ─────────────────────────────────────────────

describe('Typography — prop `weight`', () => {
  it.each([
    ['thin',       'font-thin'],
    ['light',      'font-light'],
    ['normal',     'font-normal'],
    ['medium',     'font-medium'],
    ['semibold',   'font-semibold'],
    ['bold',       'font-bold'],
    ['extrabold',  'font-extrabold'],
    ['black',      'font-black'],
  ] as const)('weight %s aplica a classe %s', (weight, cls) => {
    render(<Typography variant="body-md" weight={weight}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(cls)
  })
})

// ─────────────────────────────────────────────
// Alinhamento
// ─────────────────────────────────────────────

describe('Typography — prop `align`', () => {
  it.each([
    ['left',    'text-left'],
    ['center',  'text-center'],
    ['right',   'text-right'],
    ['justify', 'text-justify'],
  ] as const)('align %s aplica a classe %s', (align, cls) => {
    render(<Typography align={align}>texto</Typography>)
    expect(screen.getByText('texto')).toHaveClass(cls)
  })
})

// ─────────────────────────────────────────────
// Decoração: italic, underline
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Overflow: truncate, clamp
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Responsividade
// ─────────────────────────────────────────────

describe('Typography — prop `responsive`', () => {
  it('aplica classes responsivas para display-2xl', () => {
    render(<Typography variant="display-2xl" responsive>título</Typography>)
    const el = screen.getByText('título')
    expect(el).toHaveClass('sm:text-5xl')
    expect(el).toHaveClass('lg:text-6xl')
  })

  it('aplica classes responsivas para heading-lg', () => {
    render(<Typography variant="heading-lg" responsive>título</Typography>)
    const el = screen.getByText('título')
    expect(el).toHaveClass('sm:text-2xl')
  })

  it('não aplica classes responsivas quando responsive={false}', () => {
    render(<Typography variant="display-2xl" responsive={false}>título</Typography>)
    const el = screen.getByText('título')
    expect(el).not.toHaveClass('sm:text-5xl')
  })
})

// ─────────────────────────────────────────────
// className e ref
// ─────────────────────────────────────────────

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
