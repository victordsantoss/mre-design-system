import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'

describe('Card', () => {
  it('renders a basic card', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveTextContent('Content')
  })

  it('renders with default variant (shadow-sm)', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('shadow-sm')
  })

  it('renders different variants', () => {
    const { rerender } = render(
      <Card data-testid="card" variant="elevated">Content</Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('shadow-md')

    rerender(<Card data-testid="card" variant="outline">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('shadow-none')

    rerender(<Card data-testid="card" variant="ghost">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('bg-transparent')
  })

  it('renders with padding variants', () => {
    const { rerender } = render(
      <Card data-testid="card" padding="sm">Content</Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('p-4')

    rerender(<Card data-testid="card" padding="md">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('p-6')

    rerender(<Card data-testid="card" padding="lg">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('p-8')
  })

  it('renders as interactive', () => {
    render(
      <Card data-testid="card" interactive>
        Click me
      </Card>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabindex', '0')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('accepts custom className', () => {
    render(
      <Card data-testid="card" className="custom-class">
        Content
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })
})

describe('Card Compound Components', () => {
  it('renders a full card composition', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description text</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('CardTitle renders with custom heading level', () => {
    render(<CardTitle as="h1">Main Title</CardTitle>)
    const heading = screen.getByText('Main Title')
    expect(heading.tagName).toBe('H1')
  })

  it('CardTitle defaults to h3', () => {
    render(<CardTitle>Default Title</CardTitle>)
    const heading = screen.getByText('Default Title')
    expect(heading.tagName).toBe('H3')
  })

  it('CardDescription renders as paragraph', () => {
    render(<CardDescription>Desc</CardDescription>)
    const desc = screen.getByText('Desc')
    expect(desc.tagName).toBe('P')
    expect(desc).toHaveClass('text-muted-foreground')
  })
})
