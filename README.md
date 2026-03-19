# Design System

Monorepo contendo o Design System completo com biblioteca de componentes React, design tokens e Storybook.

## Stack

- **Monorepo**: npm workspaces
- **Componentes**: React 18+ / TypeScript / shadcn/ui pattern (Radix UI + CVA)
- **Styling**: Tailwind CSS com CSS custom properties (temas light/dark)
- **Build**: tsup (ESM + CJS + dts)
- **Testes**: Vitest + React Testing Library
- **Documentação**: Storybook 8

## Setup rápido

```bash
# Instalar dependências
npm install

# Build de todos os pacotes
npm run build

# Rodar Storybook
npm run storybook

# Rodar testes
npm run test
```

## Estrutura

```
packages/
├── tokens/       # @ds/tokens — Design tokens (cores, tipografia, spacing, shadows)
├── components/   # @ds/components — Biblioteca de componentes React
└── storybook/    # @ds/storybook — Storybook para documentação e testes visuais
```

## Uso em projetos consumidores

### Instalação

```bash
npm install @ds/components
```

### Configuração Tailwind

```ts
// tailwind.config.ts
import dsPreset from '@ds/components/tailwind.config'

export default {
  presets: [dsPreset],
  content: [
    './node_modules/@ds/components/dist/**/*.{js,cjs}',
    './src/**/*.{ts,tsx}',
  ],
}
```

### Importar CSS base

```tsx
// app/layout.tsx ou _app.tsx
import '@ds/components/styles.css'
```

### Usar componentes

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@ds/components'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="md">
          Clique aqui
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Componentes disponíveis

### Button
Variantes: `default` | `secondary` | `destructive` | `outline` | `ghost` | `link` | `success` | `warning`
Tamanhos: `sm` | `md` | `lg` | `xl` | `icon`
Props especiais: `loading`, `asChild`

### Card
Compound components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
Variantes: `default` | `outline` | `elevated` | `ghost`
Props especiais: `padding`, `interactive`
