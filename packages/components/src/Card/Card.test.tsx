import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardHeaderIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'

describe('Card', () => {
  it('renders a basic card', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveTextContent('Content')
  })

  it('applies GovBR surface shadow and border tokens', () => {
    render(<Card data-testid="card">X</Card>)
    const el = screen.getByTestId('card')
    expect(el.className).toMatch(/shadow-\[var\(--shadow-card\)\]/)
    expect(el.className).toMatch(/border-border/)
  })

  it('hover enables keyboard focus tabIndex', () => {
    render(
      <Card data-testid="card" hover>
        Hit
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveAttribute('tabindex', '0')
  })

  it('disabled sets aria-disabled and blocks click', () => {
    const onClick = vi.fn()
    render(
      <Card data-testid="card" disabled onClick={onClick}>
        X
      </Card>,
    )
    const el = screen.getByTestId('card')
    expect(el).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(el)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('dragged sets data attribute', () => {
    render(
      <Card data-testid="card" dragged>
        Drag
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveAttribute('data-dragged')
  })

  it('accepts custom className', () => {
    render(
      <Card data-testid="card" className="custom-class">
        C
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })
})

describe('Card compound', () => {
  it('renders full composition', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Body</p>
        </CardContent>
        <CardFooter>
          <button type="button">Go</button>
        </CardFooter>
      </Card>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument()
  })

  it('CardHeaderIcon renders', () => {
    render(
      <CardHeaderIcon data-testid="icon-wrap" aria-hidden>
        IC
      </CardHeaderIcon>,
    )
    expect(screen.getByTestId('icon-wrap')).toHaveTextContent('IC')
  })

  it('CardTitle as h1', () => {
    render(<CardTitle as="h1">H</CardTitle>)
    expect(screen.getByText('H').tagName).toBe('H1')
  })
})
