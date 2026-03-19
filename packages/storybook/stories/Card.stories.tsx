import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@ds/components'

/**
 * O componente **Card** é um container versátil que agrupa conteúdo relacionado.
 *
 * Utiliza o padrão **compound component**: Card, CardHeader, CardTitle,
 * CardDescription, CardContent e CardFooter.
 *
 * ## Uso básico
 * ```tsx
 * import { Card, CardHeader, CardTitle, CardContent } from '@ds/components'
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título</CardTitle>
 *   </CardHeader>
 *   <CardContent>Conteúdo aqui</CardContent>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'elevated', 'ghost'],
      description: 'Variante visual do card',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interno do card',
    },
    interactive: {
      control: 'boolean',
      description: 'Se o card é clicável',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

/** Card completo com header, conteúdo e footer. */
export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: '380px' }}>
      <CardHeader>
        <CardTitle>Criar projeto</CardTitle>
        <CardDescription>
          Configure as opções do seu novo projeto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            style={{ fontSize: '14px', fontWeight: 500 }}
            htmlFor="project-name"
          >
            Nome do projeto
          </label>
          <input
            id="project-name"
            placeholder="Meu projeto"
            style={{
              padding: '8px 12px',
              border: '1px solid hsl(240 5.9% 90%)',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </CardContent>
      <CardFooter style={{ justifyContent: 'space-between' }}>
        <Button variant="outline">Cancelar</Button>
        <Button>Criar</Button>
      </CardFooter>
    </Card>
  ),
}

/** Todas as variantes visuais do Card. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(['default', 'outline', 'elevated', 'ghost'] as const).map(
        (variant) => (
          <Card
            key={variant}
            variant={variant}
            style={{ width: '200px' }}
          >
            <CardHeader>
              <CardTitle className="text-lg">{variant}</CardTitle>
              <CardDescription>Variante {variant}</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '14px' }}>
                Conteúdo do card com variante {variant}.
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  ),
}

/** Card com padding variants. */
export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
      {(['sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} padding={p} style={{ width: '180px' }}>
          <p style={{ fontSize: '14px', fontWeight: 500 }}>Padding: {p}</p>
          <p style={{ fontSize: '12px', color: '#737373' }}>
            Conteúdo com padding {p}
          </p>
        </Card>
      ))}
    </div>
  ),
}

/** Card interativo (clicável). */
export const Interactive: Story = {
  render: () => (
    <Card
      interactive
      style={{ width: '300px' }}
      onClick={() => alert('Card clicado!')}
    >
      <CardHeader>
        <CardTitle className="text-lg">Card clicável</CardTitle>
        <CardDescription>
          Clique neste card para ver a interação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '14px' }}>
          Este card tem hover effect e é focável via teclado.
        </p>
      </CardContent>
    </Card>
  ),
}

/** Card como notification/alert. */
export const Notification: Story = {
  render: () => (
    <Card style={{ width: '400px' }} className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="text-base">Nova atualização disponível</CardTitle>
        <CardDescription>
          Uma nova versão do Design System foi publicada. Atualize para a v0.2.0
          para obter os novos componentes.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm">Atualizar agora</Button>
        <Button size="sm" variant="ghost">
          Depois
        </Button>
      </CardFooter>
    </Card>
  ),
}

/** Card com estatísticas / métricas. */
export const StatsCard: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {[
        { title: 'Receita total', value: 'R$ 45.231', change: '+20.1%' },
        { title: 'Assinantes', value: '+2.350', change: '+180.1%' },
        { title: 'Vendas', value: '+12.234', change: '+19%' },
      ].map((stat) => (
        <Card key={stat.title} style={{ width: '200px' }}>
          <CardHeader className="pb-2">
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-3xl">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '12px', color: '#16a34a' }}>
              {stat.change} vs mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
