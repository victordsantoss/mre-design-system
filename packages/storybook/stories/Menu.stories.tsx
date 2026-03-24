import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import {
  Menu,
  Button,
  Divider,
  type MenuFolder,
  type MenuDensity,
  type MenuHeaderMode,
  type MenuVariant,
  type MenuItemDef,
} from '@ds/components'

/* ------------------------------------------------------------------- meta */

const MENU_DOCS = `
Menu de navegação **GovBR DS** — variantes **offCanvas** (padrão), **push** e **contextual** (bottom sheet).

**Anatomia:**
- **Painel** (11, obrigatório) — \`MenuDrawerSurface\` com scrim opcional (área 2)
- **Cabeçalho** (3) — logo e/ou título, com botão Fechar (4)
- **Itens 1º nível** (5) — \`Item\` com borda-left indicadora de estado ativo
- **Itens 2º nível** (6) — \`Item\` com fundo \`bg-muted\` e indentação maior
- **Expandir/Retrair** (7) — chevron automático via \`Item.onToggle\`
- **Divider** (10) — \`Divider\` entre agrupamentos ou após itens com \`divider: true\`
- **Rodapé** (12) — slot \`footer\` (\`React.ReactNode\`)

**Agrupamentos:** por expansão (accordion), por rótulos (\`folder.title\`) ou por dividers (\`item.divider\`).
`.trim()

/* ---------------------------------------------------------------- ícones */

const Icon = ({ children, color = 'currentColor' }: { children: string; color?: string }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={color} aria-hidden="true">
    <text x="12" y="16" textAnchor="middle" fontSize="14" fontFamily="sans-serif">
      {children}
    </text>
  </svg>
)

/* Ícones genéricos usando SVG paths simples */
const IcBell = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IcBan = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
)
const IcFile = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
)
const IcUser = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const IcHeart = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IcScale = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="12" y1="3" x2="12" y2="21" /><path d="M3 6l9-3 9 3M3 18l9 3 9-3" />
  </svg>
)
const IcGlobe = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const IcExternalLink = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/* ---------------------------------------------------------------- dados */

/** Agrupamento por expansão — accordion */
const foldersExpansao: MenuFolder[] = [
  {
    id: 'g1',
    items: [
      {
        id: 'ag1',
        label: 'Agrupamento do Menu 1',
        icon: <IcBell />,
        items: [
          { id: 'ag1i1', label: 'Item do Menu 1', icon: <IcHeart />, items: [{ id: 'ag1i1s1', label: 'Subitem 1', href: '#' }, { id: 'ag1i1s2', label: 'Subitem 2', href: '#' }] },
          { id: 'ag1i2', label: 'Item do Menu 2', icon: <IcHeart />, href: '#' },
          { id: 'ag1i3', label: 'Item do Menu 3', icon: <IcHeart />, href: '#' },
          { id: 'ag1i4', label: 'Item do Menu 4', icon: <IcHeart />, href: '#' },
        ],
      },
      { id: 'ag2', label: 'Agrupamento do Menu 2', icon: <IcBan />, items: [{ id: 'ag2i1', label: 'Item do Menu 1', href: '#' }] },
      { id: 'ag3', label: 'Agrupamento do Menu 3', icon: <IcFile />, items: [{ id: 'ag3i1', label: 'Item do Menu 1', href: '#' }] },
      { id: 'ag4', label: 'Agrupamento do Menu 4', icon: <IcUser />, items: [{ id: 'ag4i1', label: 'Item do Menu 1', href: '#' }] },
    ],
  },
]

/** Agrupamento por rótulos — sem accordion */
const foldersRotulos: MenuFolder[] = [
  {
    id: 'r1',
    title: 'AGRUPAMENTO 01',
    items: [
      { id: 'r1i1', label: 'Item do Menu 1', icon: <IcHeart />, href: '#', active: true },
      { id: 'r1i2', label: 'Item do Menu 1', icon: <IcHeart />, href: '#' },
      { id: 'r1i3', label: 'Item do Menu 1', icon: <IcHeart />, href: '#' },
      { id: 'r1i4', label: 'Item do Menu 1', icon: <IcHeart />, href: '#' },
    ],
  },
  {
    id: 'r2',
    title: 'AGRUPAMENTO 02',
    items: [
      { id: 'r2i1', label: 'Item do Menu 2', icon: <IcHeart />, href: '#' },
      { id: 'r2i2', label: 'Item do Menu 2', icon: <IcHeart />, href: '#' },
      { id: 'r2i3', label: 'Item do Menu 2', icon: <IcHeart />, href: '#' },
      { id: 'r2i4', label: 'Item do Menu 2', icon: <IcHeart />, href: '#' },
    ],
  },
]

/** Agrupamento por dividers — itens separados por Divider */
const foldersDividers: MenuFolder[] = [
  {
    id: 'd1',
    items: [
      { id: 'd1i1', label: 'Item do Menu 1', icon: <IcBell />, href: '#' },
      { id: 'd1i2', label: 'Item do Menu 2', icon: <IcBan />, href: '#', divider: true },
      { id: 'd1i3', label: 'Item do Menu 3', icon: <IcFile />, href: '#', divider: true },
      { id: 'd1i4', label: 'Item do Menu 4', icon: <IcUser />, href: '#', divider: true },
      { id: 'd1i5', label: 'Item do Menu 5', icon: <IcBell />, href: '#', divider: true },
      { id: 'd1i6', label: 'Item do Menu 6', icon: <IcBan />, href: '#' },
    ],
  },
]

/** Dados MRE realistas para o Playground */
const mreFolders: MenuFolder[] = [
  {
    id: 'consulares',
    items: [
      {
        id: 'passaporte',
        label: 'Passaporte',
        icon: <IcGlobe />,
        items: [
          { id: 'pass-solicitar', label: 'Solicitar Passaporte', href: '#' },
          { id: 'pass-renovar', label: 'Renovar Passaporte', href: '#' },
          { id: 'pass-status', label: 'Status do Pedido', href: '#' },
        ],
      },
      { id: 'visto', label: 'Visto', icon: <IcFile />, href: '#' },
      { id: 'autenticacao', label: 'Autenticação de Documentos', icon: <IcScale />, href: '#' },
      { id: 'apostila', label: 'Apostilamento', icon: <IcFile />, href: '#', divider: true },
    ],
  },
  {
    id: 'institucional',
    items: [
      { id: 'estrutura', label: 'Estrutura Organizacional', icon: <IcUser />, href: '#' },
      { id: 'concurso', label: 'Concurso IRBr', icon: <IcFile />, href: '#' },
      { id: 'transparencia', label: 'Transparência', icon: <IcScale />, href: '#' },
    ],
  },
]

/** Footer do menu (área 12) */
const MenuFooter = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-20 items-center justify-center rounded border border-dashed border-border bg-muted text-xs text-muted-foreground">
        Logo
      </div>
      <div className="flex h-8 w-20 items-center justify-center rounded border border-dashed border-border bg-muted text-xs text-muted-foreground">
        Logo
      </div>
    </div>
    <div className="space-y-2">
      {['Link para sítios externos', 'Link para sítios externos'].map((label) => (
        <a
          key={label}
          href="#"
          className="flex items-center justify-between gap-2 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px] rounded"
        >
          {label}
          <IcExternalLink />
        </a>
      ))}
    </div>
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">TÍTULO</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            aria-label={`Link ${i}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border bg-muted text-xs text-muted-foreground hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
          >
            ☆
          </button>
        ))}
      </div>
    </div>
    <Divider className="my-0" />
    <p className="text-center text-xs text-muted-foreground">
      Todo o conteúdo deste site está publicado sob a licença{' '}
      <strong>Creative Commons Atribuição-SemDerivações 3.0</strong>
    </p>
  </div>
)

/* ------------------------------------------------------------------- meta */

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: MENU_DOCS } },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['offCanvas', 'push', 'contextual'] satisfies MenuVariant[],
      table: { category: 'Layout' },
    },
    header: {
      control: 'select',
      options: ['auto', 'title', 'logo', 'none'] satisfies MenuHeaderMode[],
      table: { category: 'Cabeçalho' },
    },
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies MenuDensity[],
      table: { category: 'Layout' },
    },
    title: { control: 'text', table: { category: 'Conteúdo' } },
    activeId: { control: 'text', table: { category: 'Estado' } },
    width: { control: 'text', table: { category: 'Layout' } },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

/* ---------------------------------------------------------------- stories */

/**
 * **Playground** — Controle completo via painel de args.
 */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button
          emphasis="primary"
          aria-controls="menu-playground"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          Abrir menu
        </Button>
        <Menu
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          folders={mreFolders}
          footer={<MenuFooter />}
        />
      </div>
    )
  },
  args: {
    variant: 'offCanvas',
    title: 'MRE — Itamaraty',
    header: 'auto',
    density: 'medium',
    activeId: 'passaporte',
    onItemClick: fn(),
  },
}

/**
 * **Menu Principal** — offCanvas com todos os agrupamentos e rodapé.
 */
export const MenuPrincipal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
          <Button
            emphasis="tertiary"
            density="small"
            aria-label="Abrir menu principal"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </Button>
          <span className="font-heading text-up-02 font-normal text-foreground">
            Título do Cabeçalho
          </span>
        </div>
        <div className="flex-1 p-8 text-muted-foreground text-sm">(conteúdo da página)</div>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          variant="offCanvas"
          title="MRE"
          header="auto"
          folders={foldersExpansao}
          footer={<MenuFooter />}
          activeId="ag1i1"
        />
      </div>
    )
  },
}

/**
 * **Menu Contextual** — lado direito, simplificado, sem scrim.
 * Ideal para navegação interna (âncoras, seções da página).
 */
export const MenuContextual: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-[600px] gap-6">
        <div className="flex-1 p-6 text-sm text-muted-foreground">(conteúdo principal)</div>
        <div className="w-64 border-l border-border">
          {foldersRotulos.map((folder) => (
            <div key={folder.id}>
              {folder.title && (
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {folder.title}
                </p>
              )}
              {folder.items.map((item) => (
                <a
                  key={item.id}
                  href={item.href ?? '#'}
                  className={`block px-4 py-2 text-sm ${item.active ? 'bg-primary/10 font-semibold text-primary' : 'text-foreground hover:bg-primary/5'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          variant="contextual"
          header="title"
          title="Ações rápidas"
          folders={foldersRotulos}
        />
      </div>
    )
  },
}

/**
 * **Modos de Cabeçalho** — título, logo e sem cabeçalho, lado a lado.
 */
export const ModosCabecalho: Story = {
  render: () => {
    const configs: Array<{ label: string; props: Partial<Parameters<typeof Menu>[0]> }> = [
      { label: 'Menu - Cabeçalho com Título', props: { header: 'title', title: 'Título do Cabeçalho do Menu' } },
      {
        label: 'Menu - Cabeçalho com Logo',
        props: {
          header: 'logo',
          logo: (
            <div className="flex h-8 w-24 items-center justify-center rounded border border-dashed border-border bg-muted text-xs text-muted-foreground">
              Logo
            </div>
          ),
        },
      },
      { label: 'Menu - Sem Cabeçalho', props: { header: 'none', title: 'Menu' } },
    ]
    const [openIdx, setOpenIdx] = useState<number | null>(null)
    return (
      <div className="flex flex-wrap gap-6 p-6">
        {configs.map((c, i) => (
          <div key={i} className="flex flex-col items-start gap-2">
            <p className="rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {c.label}
            </p>
            <Button emphasis="secondary" density="small" onClick={() => setOpenIdx(i)}>
              Abrir
            </Button>
            <Menu
              open={openIdx === i}
              onClose={() => setOpenIdx(null)}
              folders={foldersExpansao}
              {...c.props}
            />
          </div>
        ))}
      </div>
    )
  },
}

/**
 * **Agrupamento por Expansão** — accordion vertical (padrão).
 */
export const AgrupamentoPorExpansao: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" onClick={() => setOpen(true)}>Abrir menu</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          title="Expansão"
          folders={foldersExpansao}
          activeId="ag1i1"
        />
      </div>
    )
  },
}

/**
 * **Agrupamento por Rótulos** — folders com título, sem accordion.
 * Cada folder.title funciona como separador semântico.
 */
export const AgrupamentoPorRotulos: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" onClick={() => setOpen(true)}>Abrir menu</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          title="Rótulos"
          folders={foldersRotulos}
          activeId="r1i1"
        />
      </div>
    )
  },
}

/**
 * **Agrupamento por Dividers** — itens com `divider: true` inserem Divider após si.
 */
export const AgrupamentoPorDividers: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" onClick={() => setOpen(true)}>Abrir menu</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          title="Dividers"
          folders={foldersDividers}
        />
      </div>
    )
  },
}

/**
 * **Com Ícones / Sem Ícones** — comparação lado a lado.
 */
export const ComESemIcones: Story = {
  render: () => {
    const [openA, setOpenA] = useState(false)
    const [openB, setOpenB] = useState(false)

    const semIcones: MenuFolder[] = [
      {
        id: 's1',
        items: foldersExpansao[0].items.map((item) => ({
          ...item,
          icon: undefined,
          items: item.items?.map((sub) => ({ ...sub, icon: undefined })),
        })),
      },
    ]

    return (
      <div className="flex gap-4 p-6">
        <div>
          <p className="mb-2 rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground inline-block">
            Menu - Uso de Ícones
          </p>
          <br />
          <Button emphasis="secondary" density="small" onClick={() => setOpenA(true)}>Abrir</Button>
          <Menu open={openA} onClose={() => setOpenA(false)} title="Com Ícones" folders={foldersExpansao} />
        </div>
        <div>
          <p className="mb-2 rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground inline-block">
            Menu - Sem Ícones
          </p>
          <br />
          <Button emphasis="secondary" density="small" onClick={() => setOpenB(true)}>Abrir</Button>
          <Menu open={openB} onClose={() => setOpenB(false)} title="Sem Ícones" folders={semIcones} />
        </div>
      </div>
    )
  },
}

/**
 * **Densidades** — small (alta), medium (padrão) e large (baixa).
 */
export const Densidades: Story = {
  render: () => {
    const densities: MenuDensity[] = ['small', 'medium', 'large']
    const labels = { small: 'Densidade Alta', medium: 'Densidade Média', large: 'Densidade Baixa' }
    const [openDensity, setOpenDensity] = useState<MenuDensity | null>(null)

    return (
      <div className="flex flex-wrap gap-6 p-6">
        {densities.map((d) => (
          <div key={d} className="flex flex-col items-start gap-2">
            <p className="rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {labels[d]}
            </p>
            <Button emphasis="secondary" density="small" onClick={() => setOpenDensity(d)}>
              Abrir
            </Button>
            <Menu
              open={openDensity === d}
              onClose={() => setOpenDensity(null)}
              title={labels[d]}
              density={d}
              folders={foldersExpansao}
            />
          </div>
        ))}
      </div>
    )
  },
}

/**
 * **Com Rodapé** — área 12 com logos, links externos, ícones e texto legal.
 */
export const ComRodape: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" onClick={() => setOpen(true)}>Abrir menu com rodapé</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          title="MRE"
          folders={foldersExpansao}
          footer={<MenuFooter />}
          activeId="ag1i1"
        />
      </div>
    )
  },
}

/**
 * **Opções de Fechamento** — botão Fechar e clique fora (scrim).
 */
export const OpcoesFechamento: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex min-h-[400px] flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
          <Button
            emphasis="tertiary"
            density="small"
            aria-label="Abrir / Fechar menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </Button>
          <span className="font-heading text-up-02 font-normal text-foreground">
            Título do Cabeçalho
          </span>
        </div>
        <div className="flex-1 bg-muted/30 p-8 text-sm text-muted-foreground">
          (conteúdo da página — clique fora do menu ou no botão Fechar para fechá-lo)
        </div>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          variant="offCanvas"
          header="auto"
          logo={
            <div className="flex h-8 w-20 items-center justify-center rounded border border-dashed border-border bg-muted text-xs text-muted-foreground">
              Logo
            </div>
          }
          folders={foldersExpansao}
          activeId="ag1i1"
        />
      </div>
    )
  },
}
