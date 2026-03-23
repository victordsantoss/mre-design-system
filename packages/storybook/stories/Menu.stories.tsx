import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Menu, Button, type MenuFolder } from '@ds/components'

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
}

export default meta
type Story = StoryObj<typeof Menu>

export const OffCanvas: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6">
        <Button emphasis="primary" onClick={() => setOpen(true)}>Abrir menu</Button>
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
        <Button emphasis="secondary" onClick={() => setOpen(true)}>Bottom sheet</Button>
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
