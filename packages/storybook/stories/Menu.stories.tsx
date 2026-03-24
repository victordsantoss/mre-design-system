import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import {
  Menu,
  Button,
  type MenuFolder,
  type MenuDensity,
  type MenuHeaderMode,
  type MenuVariant,
} from '@ds/components'

const MENU_DOCS = `
Menu de navegação GovBR — variantes **offCanvas** (padrão), **push** e **contextual** (bottom sheet).
API alinhada ao pacote MUI \`@itamaraty-ds/components\`.
`.trim()

const sampleFolders: MenuFolder[] = [
  {
    id: 'principal',
    title: 'Navegação',
    items: [
      { id: 'inicio', label: 'Início', icon: <span aria-hidden>⌂</span> },
      {
        id: 'servicos',
        label: 'Serviços',
        icon: <span aria-hidden>◎</span>,
        items: [
          { id: 's1', label: 'Consulta' },
          { id: 's2', label: 'Agendamento' },
        ],
      },
      { id: 'ajuda', label: 'Ajuda', icon: <span aria-hidden>?</span> },
    ],
  },
]

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

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" aria-controls="menu-playground" aria-expanded={open} onClick={() => setOpen(true)}>
          Abrir menu
        </Button>
        <Menu
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          folders={sampleFolders}
        />
      </div>
    )
  },
  args: {
    variant: 'offCanvas',
    title: 'MRE',
    header: 'auto',
    density: 'medium',
    activeId: 'inicio',
    onItemClick: fn(),
  },
}

export const OffCanvas: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" aria-expanded={open} onClick={() => setOpen(true)}>Abrir menu</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          variant="offCanvas"
          title="MRE"
          folders={sampleFolders}
          activeId="inicio"
        />
      </div>
    )
  },
}

export const Contextual: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="secondary" aria-expanded={open} onClick={() => setOpen(true)}>Bottom sheet</Button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          variant="contextual"
          header="title"
          title="Ações rápidas"
          folders={sampleFolders}
        />
      </div>
    )
  },
}
