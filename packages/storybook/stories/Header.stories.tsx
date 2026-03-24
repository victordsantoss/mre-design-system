import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import {
  Header,
  Menu,
  Button,
  type HeaderDensity,
  type HeaderFunctionItem,
} from '@ds/components'

const HEADER_DOCS = `
Header de navegação GovBR. Contém logo, assinatura, título, subtítulo, links, funcionalidades, busca e login.

**Modos**: padrão (duas linhas) e compacto (uma linha).
**Sticky**: ao rolar a página, o header fixa no topo e automaticamente assume o modo compacto.
`.trim()

/* ---------------------------------------------------------------- mocks */

const LogoMRE = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/69/Itamaraty_logo.jpg"
    alt="Itamaraty — Ministério das Relações Exteriores"
  />
)

const sampleLinks = [
  { label: 'Portal Gov.br', href: '#' },
  { label: 'Transparência', href: '#' },
  { label: 'Acesso à Informação', href: '#' },
]

const sampleFunctions: HeaderFunctionItem[] = [
  {
    id: 'notifications',
    label: 'Notificações',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    onClick: fn(),
  },
  {
    id: 'settings',
    label: 'Configurações',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    onClick: fn(),
  },
]

const sampleFolders = [
  {
    id: 'nav',
    title: 'Navegação',
    items: [
      { id: 'inicio', label: 'Início' },
      { id: 'sobre', label: 'Sobre o MRE' },
      { id: 'servicos', label: 'Serviços', items: [
        { id: 'passaporte', label: 'Passaporte' },
        { id: 'visto', label: 'Visto' },
      ]},
      { id: 'contato', label: 'Contato' },
    ],
  },
]

/* ---------------------------------------------------------------- meta */

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: HEADER_DOCS } },
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies HeaderDensity[],
      table: { category: 'Layout' },
    },
    compact: { control: 'boolean', table: { category: 'Layout' } },
    sticky: { control: 'boolean', table: { category: 'Comportamento' } },
    title: { control: 'text', table: { category: 'Conteúdo' } },
    subtitle: { control: 'text', table: { category: 'Conteúdo' } },
    sign: { control: 'text', table: { category: 'Conteúdo' } },
    search: { control: 'boolean', table: { category: 'Funcionalidades' } },
    authenticated: { control: 'boolean', table: { category: 'Login' } },
  },
}

export default meta
type Story = StoryObj<typeof Header>

/* ---------------------------------------------------------------- stories */

/** Header padrão com menu integrado — demonstra a integração com o componente Menu. */
export const Playground: Story = {
  render: (args) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
      <>
        <Header
          {...args}
          onMenuClick={() => setMenuOpen(true)}
        />
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="MRE"
          folders={sampleFolders}
          activeId="inicio"
        />
        <div className="p-6 text-sm text-muted-foreground">
          Conteúdo da página...
        </div>
      </>
    )
  },
  args: {
    title: 'Ministério das Relações Exteriores',
    subtitle: 'Itamaraty',
    logo: <LogoMRE />,
    sign: 'República Federativa do Brasil',
    density: 'medium',
    compact: false,
    sticky: false,
    search: true,
    searchPlaceholder: 'Buscar no portal...',
    onSearch: fn(),
    links: sampleLinks,
    functions: sampleFunctions,
    authenticated: false,
    signIn: <Button emphasis="primary" density="small">Entrar</Button>,
  },
}

/** Apenas os campos obrigatórios: só título e botão de menu. */
export const Minimo: Story = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
      <>
        <Header
          title="MRE"
          onMenuClick={() => setMenuOpen(true)}
        />
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="MRE"
          folders={sampleFolders}
        />
      </>
    )
  },
}

/** Modo compacto: logo pequena, padding reduzido, layout de uma linha. */
export const Compacto: Story = {
  render: () => (
    <Header
      title="MRE — Itamaraty"
      logo={<LogoMRE />}
      compact
      density="small"
      functions={sampleFunctions}
      authenticated={false}
      signIn={<Button emphasis="primary" density="small">Entrar</Button>}
      onMenuClick={fn()}
    />
  ),
}

/** Modo sticky: role a página para ver o header ficar fixo e compacto. */
export const Sticky: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div>
      <Header
        title="Ministério das Relações Exteriores"
        subtitle="Itamaraty"
        logo={<LogoMRE />}
        sign="República Federativa do Brasil"
        sticky
        search
        links={sampleLinks}
        functions={sampleFunctions}
        onMenuClick={fn()}
        signIn={<Button emphasis="primary" density="small">Entrar</Button>}
      />
      <div className="p-8 space-y-4">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            Parágrafo de conteúdo {i + 1} — role a página para ver o sticky header.
          </p>
        ))}
      </div>
    </div>
  ),
}

/** Com usuário autenticado: exibe avatar no lugar do botão de login. */
export const Autenticado: Story = {
  render: () => (
    <Header
      title="MRE — Itamaraty"
      logo={<LogoMRE />}
      authenticated
      avatar={
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
          aria-label="Avatar do usuário: João Silva"
        >
          JS
        </div>
      }
      functions={sampleFunctions}
      onMenuClick={fn()}
    />
  ),
}

/** Densidades: compara os três tamanhos de padding vertical. */
export const Densidades: Story = {
  render: () => (
    <div className="flex flex-col gap-0">
      {(['small', 'medium', 'large'] satisfies HeaderDensity[]).map((d) => (
        <Header
          key={d}
          title={`MRE — Densidade ${d}`}
          density={d}
          onMenuClick={fn()}
          className="border-b border-border last:border-0"
        />
      ))}
    </div>
  ),
}
