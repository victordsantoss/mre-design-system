# CLAUDE.md — MRE / Itamaraty Design System (shadcn)

Monorepo de Design System com componentes React seguindo o **Padrão Digital de Governo (GovBR)** para o **Ministério das Relações Exteriores — MRE (Itamaraty)**.

## Estrutura do monorepo

```
packages/
├── tokens/      # @ds/tokens    — Design tokens GovBR (cores, tipografia, spacing, shadows)
├── components/  # @ds/components — Biblioteca de componentes React
└── storybook/   # @ds/storybook  — Documentação visual (Storybook 8)
infra/
└── verdaccio/   # Registro npm privado (Verdaccio via Docker)
scripts/
├── publish-local.sh  # Publica pacotes no Verdaccio local
└── add-user.sh       # Adiciona usuário ao Verdaccio
```

## Stack

- **Monorepo**: npm workspaces (Node >= 20)
- **Componentes**: React 18+ / TypeScript / padrão shadcn/ui (Radix UI + CVA)
- **Styling**: Tailwind CSS com CSS custom properties (suporte a tema light/dark via `darkMode: 'class'`)
- **Design**: Padrão Digital de Governo (GovBR) — fonte Rawline/Raleway, cores GovBR canônicas
- **Build**: tsup (ESM + CJS + dts)
- **Testes**: Vitest + React Testing Library
- **Versionamento**: Changesets (`@ds/storybook` ignorado nos releases)
- **Registry privado**: Verdaccio (Docker) — `npm run verdaccio:up`

## Comandos principais

```bash
npm install            # instala todas as dependências do monorepo
npm run build          # build de todos os pacotes
npm run dev            # dev mode em todos os pacotes
npm run test           # roda testes em todos os pacotes
npm run storybook      # inicia Storybook (porta padrão 6006)
npm run build-storybook
npm run clean

# Verdaccio (registry privado)
npm run verdaccio:up       # sobe o container Docker
npm run verdaccio:down     # derruba o container
npm run verdaccio:add-user # adiciona usuário ao registry
npm run publish:local      # build + publica pacotes no Verdaccio local
```

Para rodar em um pacote específico:

```bash
npm run test -w @ds/components
npm run build -w @ds/tokens
```

## Design tokens GovBR

### Cores canônicas

| Token             | Hex       | Uso                          |
|-------------------|-----------|------------------------------|
| blueWarmVivid-70  | `#1351B4` | Primary (fundo claro)        |
| blueWarmVivid-90  | `#071D41` | Secondary / header escuro    |
| blueWarmVivid-20  | `#C5D4EB` | Primary interativo (dark bg) |
| blueWarmVivid-60  | `#155BCB` | Info / focus ring            |
| greenCoolVivid-50 | `#168821` | Success                      |
| yellowVivid-20    | `#FFCD07` | Warning                      |
| redVivid-50       | `#E52207` | Error / Destructive          |
| gray-80           | `#333333` | Texto primário               |
| pure-0            | `#FFFFFF` | Background principal         |
| gray-2            | `#F8F8F8` | Background alternativo       |

### Tipografia GovBR

- **Família**: Rawline (Raleway como fallback) — `font-sans`
- **Escala**: Minor Third (razão 1.2), base = 14px
- **Line-height**: 1.15 (headings) / 1.45 (body)
- **Classes Tailwind**: `text-gov-xs`, `text-gov-sm`, `text-gov-base`, `text-gov-lg`, ..., `text-gov-5xl`

### CSS custom properties (light / dark)

Injetadas pelo `globals.css` (incluído via `@ds/components/styles.css`):

```css
--color-primary:     #1351B4   /* dark: #C5D4EB */
--color-secondary:   #071D41
--color-success:     #168821
--color-warning:     #FFCD07
--color-info:        #155BCB
--color-destructive: #E52207
--color-background:  #FFFFFF   /* dark: #071D41 */
--color-foreground:  #333333   /* dark: #FFFFFF */
--color-ring:        #155BCB   /* focus ring GovBR */
```

## Convenções de componentes

### Estrutura de arquivos

```
Button/
├── Button.tsx        # implementação
├── Button.test.tsx   # testes Vitest + RTL
└── index.ts          # re-export público
```

### Padrão de implementação

Todo componente deve:

1. Usar `React.forwardRef` e definir `Component.displayName`
2. Usar `cva` (class-variance-authority) para variantes — exportar o objeto de variantes
3. Aceitar `className` e mesclá-lo via `cn` de `../../utils/cn`
4. Suportar o **Slot pattern** (`asChild`) quando fizer sentido (ex: Button)
5. Seguir compound components para elementos com múltiplas partes (ex: Card, Table)
6. **Nunca usar cores hardcoded** — usar variáveis CSS do Tailwind (ex: `bg-primary`, `text-foreground`)

### Focus ring GovBR

Todos os elementos interativos usam:
```
focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]
```

### Botões GovBR

```tsx
<Button emphasis="primary" density="medium" intent="default">Ação Principal</Button>
<Button emphasis="secondary" density="medium">Ação Secundária</Button>
<Button emphasis="tertiary" intent="danger">Cancelar</Button>
<CircleButton aria-label="Fechar" density="small">×</CircleButton>
```

### Inputs GovBR

```tsx
<Input label="Nome" density="medium" status="error" statusMessage="Campo obrigatório" />
<Select label="Estado" options={[...]} value={val} onChange={setVal} />
```

## Componentes disponíveis

### DesignSystemProvider
Envolve a aplicação. Injeta o tema light/dark.
```tsx
<DesignSystemProvider colorScheme="light">
  <App />
</DesignSystemProvider>
```

### Button / CircleButton
Props: `emphasis` (primary|secondary|tertiary), `density` (xsmall|small|medium|large), `intent` (default|danger|success|warning|info), `loading`, `block`, `asChild`, `startIcon`, `endIcon`

### Typography
Variantes: `display-{2xl,xl,lg}` | `heading-{xl,lg,md,sm,xs}` | `body-{lg,md,sm,xs}` | `label-{lg,md,sm}` | `code-{lg,md,sm}`

### Card
Compound: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
Props: `variant` (default|outline|elevated|ghost), `padding`, `interactive`

### Input
Props: `label`, `density` (small|medium|large), `highlight`, `status` (success|error|warning|info), `statusMessage`, `helperText`, `startIcon`, `endAction`, `inline`

### Select
Props: `options`, `value`, `onChange`, `placeholder`, `density`, `status`, `statusMessage`, `helperText`

### Message / Alert
Props: `severity` (success|error|warning|info), `variant` (standard|feedback), `title`, `closable`, `onClose`, `hideIcon`

### Modal
Props: `open`, `onClose`, `title`, `actions`, `showCloseButton`, `titleDivider`, `maxWidth` (xs|sm|md|lg|xl|full), `paperBorderRadius`

### Table
Subcomponentes: `TableRoot`, `TableTitleBar`, `TableContextualBar`, `TableScrollArea`, `TableElement`, `TableHead`, `TableBody`, `TableHeaderCell`, `TableBodyRow`, `TableBodyCell`, `TableExpandCell`, `TableFooterBar`, `TablePaginationBar`

Props TableRoot: `density` (default|comfortable|compact), `cellDividers` (horizontal|grid)

## Versionamento

Usar Changesets para releases:

```bash
npx changeset        # criar changeset
npx changeset version # bump de versões
npx changeset publish # publicar pacotes
```

`@ds/storybook` não é publicado (ignorado no config do Changesets).

## Verdaccio — Registry Privado

O registry privado permite distribuição interna dos pacotes `@ds/*`.

### Subir o registry

```bash
npm run verdaccio:up      # inicia em http://localhost:4873
npm run verdaccio:add-user # cria usuário (primeira vez)
npm login --registry http://localhost:4873
npm run publish:local     # build + publica @ds/tokens e @ds/components
```

### Usar em outro projeto

```bash
# .npmrc do projeto consumidor
@ds:registry=http://localhost:4873

npm install @ds/components @ds/tokens
```
