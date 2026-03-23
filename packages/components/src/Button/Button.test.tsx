import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, CircleButton } from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button).toHaveClass('h-10')
    expect(button).toHaveAttribute('data-emphasis', 'primary')
    expect(button).toHaveAttribute('data-intent', 'default')
  })

  it('renders emphasis variants', () => {
    const { rerender } = render(<Button emphasis="primary">P</Button>)
    let btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('data-emphasis', 'primary')
    expect(btn).toHaveClass('bg-primary')

    rerender(<Button emphasis="secondary">S</Button>)
    btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('data-emphasis', 'secondary')
    expect(btn).toHaveClass('border', 'bg-pure-0')

    rerender(<Button emphasis="tertiary">T</Button>)
    btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('data-emphasis', 'tertiary')
    expect(btn).toHaveClass('border-0', 'bg-transparent')
  })

  it('renders density heights (GovBR 32 / 40 / 48)', () => {
    const { rerender } = render(<Button density="small">S</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')

    rerender(<Button density="medium">M</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10')

    rerender(<Button density="large">L</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
  })

  it('handles click events', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('renders as child component via asChild', () => {
    render(
      <Button asChild>
        <a href="/about">About</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('CircleButton', () => {
  it('requires aria-label', () => {
    render(
      <CircleButton aria-label="Fechar">
        <span>×</span>
      </CircleButton>,
    )
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument()
  })

  it('matches square dimensions per density', () => {
    render(
      <CircleButton density="medium" aria-label="add">
        +
      </CircleButton>,
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('h-10', 'w-10')
    expect(btn).toHaveAttribute('data-intent', 'default')
  })
})
