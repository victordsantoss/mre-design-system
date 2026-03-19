# CLAUDE.md — Design System

Monorepo de Design System com componentes React, design tokens e Storybook.

## Estrutura do monorepo

```
packages/
├── tokens/      # @ds/tokens    — Design tokens (cores, tipografia, spacing, shadows)
├── components/  # @ds/components — Biblioteca de componentes React
└── storybook/   # @ds/storybook  — Documentação visual (Storybook 8)
```

## Stack

- **Monorepo**: npm workspaces (Node >= 20)
- **Componentes**: React 18+ / TypeScript / padrão shadcn/ui (Radix UI + CVA)
- **Styling**: Tailwind CSS com CSS custom properties (suporte a tema light/dark via `darkMode: 'class'`)
- **Build**: tsup (ESM + CJS + dts)
- **Testes**: Vitest + React Testing Library
- **Versionamento**: Changesets (`@ds/storybook` ignorado nos releases)

## Comandos principais

```bash
npm install            # instala todas as dependências do monorepo
npm run build          # build de todos os pacotes
npm run dev            # dev mode em todos os pacotes
npm run test           # roda testes em todos os pacotes
npm run storybook      # inicia Storybook (porta padrão 6006)
npm run build-storybook
npm run clean
```

Para rodar em um pacote específico:

```bash
npm run test -w @ds/components
npm run build -w @ds/tokens
```

## Convenções de componentes

### Estrutura de arquivos

Cada componente vive em `packages/components/src/components/<ComponentName>/`:

```
Button/
├── Button.tsx        # implementação
├── Button.test.tsx   # testes Vitest + RTL
└── index.ts          # re-export público
```

### Padrão de implementação

Todo componente deve:

1. Usar `React.forwardRef` e definir `Component.displayName`
2. Usar `cva` (class-variance-authority) para variantes — exportar o objeto de variantes (ex: `buttonVariants`)
3. Estender as props nativas do elemento HTML correspondente via `React.HTMLAttributes<HTMLElement>`
4. Aceitar `className` e mesclá-lo via utilitário `cn` de `../../utils/cn`
5. Suportar o **Slot pattern** (`asChild`) quando fizer sentido (ex: Button)
6. Seguir compound components para elementos com múltiplas partes (ex: Card)

### Tokens de cor (CSS custom properties)

Nunca usar cores hardcoded. Usar sempre as variáveis semânticas via Tailwind:

```
bg-primary / text-primary-foreground
bg-secondary / text-secondary-foreground
bg-destructive / text-destructive-foreground
bg-success / text-success-foreground
bg-warning / text-warning-foreground
bg-muted / text-muted-foreground
bg-accent / text-accent-foreground
bg-card / text-card-foreground
bg-background / text-foreground
border-input / ring / border-border
```

Fontes: `font-sans` (Inter) e `font-mono` (JetBrains Mono).

### Exportações

Após criar o componente, exportá-lo em `packages/components/src/index.ts`:

```ts
export { ComponentName, componentVariants, type ComponentNameProps } from './components/ComponentName'
```

## Padrão de testes

Usar Vitest + React Testing Library. Cada componente deve ter testes para:

- Renderização com props padrão
- Todas as variantes e tamanhos
- Eventos (`onClick`, etc.)
- Estados especiais (`disabled`, `loading`, etc.)
- `className` customizado
- `ref` forwarding
- `asChild` (se aplicável)

```ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
```

## Padrão de Stories (Storybook)

Cada componente deve ter uma story em `packages/storybook/stories/<ComponentName>.stories.tsx`:

- `meta` com `title: 'Components/<ComponentName>'`, `argTypes` documentando todas as props
- Story `Default` com args mínimos
- Stories adicionais para variantes, estados e composições relevantes
- Importar sempre de `@ds/components`

## Design tokens (`@ds/tokens`)

Tokens organizados em:

- `colors.ts` — paletas brutas + tokens semânticos (`semanticLight`, `semanticDark`)
- `typography.ts` — fontFamily, fontSize, lineHeight, fontWeight, letterSpacing, textStyles
- `spacing.ts` — spacing, borderRadius, borderWidth, breakpoints, zIndex, container
- `shadows.ts` — shadows, opacity, duration, easing

## Componentes disponíveis

### Typography
Variantes: `display-{2xl,xl,lg}` | `heading-{xl,lg,md,sm,xs}` | `body-{lg,md,sm,xs}` | `label-{lg,md,sm}` | `code-{lg,md,sm}`
Cada variante define elemento HTML semântico padrão (ex: `heading-lg` → `h2`).
Props: `variant`, `as` (override semântico), `color`, `weight`, `align`, `italic`, `underline`, `truncate`, `clamp` (1–6), `responsive`

### Button
Variantes: `default` | `secondary` | `destructive` | `outline` | `ghost` | `link` | `success` | `warning`
Tamanhos: `sm` | `md` | `lg` | `xl` | `icon`
Props especiais: `loading`, `asChild`

### Card
Compound components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
Variantes: `default` | `outline` | `elevated` | `ghost`
Props especiais: `padding`, `interactive`

## Versionamento

Usar Changesets para releases:

```bash
npx changeset        # criar changeset
npx changeset version # bump de versões
npx changeset publish # publicar pacotes
```

`@ds/storybook` não é publicado (ignorado no config do Changesets).
