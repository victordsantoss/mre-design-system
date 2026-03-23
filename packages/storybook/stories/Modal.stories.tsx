import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Modal,
  Button,
  Message,
  Select,
  ModalOptionList,
  ModalRadioGroup,
} from '@ds/components'

const MODAL_DOCS_INTRO = `
Componente de diálogo modal alinhado ao [br-modal do Design System do Governo](https://www.gov.br/ds/components/modal).

Scrim institucional azul navy, painel branco, cabeçalho com título e botão fechar, conteúdo e faixa de ações com divisória superior.

Implementado sobre o elemento \`<dialog>\` nativo do HTML5 para máxima acessibilidade (foco, Escape, aria-labelledby, aria-modal).

### Larguras disponíveis
\`xs\` | \`sm\` (padrão) | \`md\` | \`lg\` | \`xl\` | \`full\`

### Fechamento
- Pressionar \`Escape\`
- Clicar no backdrop (scrim)
- Botão fechar no cabeçalho (\`showCloseButton\`)
- Ações personalizadas via \`actions\` + \`onClose\`
`.trim()

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: MODAL_DOCS_INTRO,
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', table: { category: 'Estado' } },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      table: { category: 'Layout' },
    },
    showCloseButton: { control: 'boolean', table: { category: 'Layout' } },
    titleDivider: { control: 'boolean', table: { category: 'Layout' } },
    title: { control: 'text', table: { category: 'Conteúdo' } },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────

function useModal() {
  const [open, setOpen] = useState(false)
  return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false) }
}

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Abrir modal</Button>
        <Modal {...args} open={open} onClose={onClose}>
          <p>Conteúdo do modal. Preencha aqui as informações ou ações necessárias.</p>
        </Modal>
      </>
    )
  },
  args: {
    title: 'Título do modal',
    showCloseButton: true,
    titleDivider: false,
    maxWidth: 'sm',
    actions: undefined,
  },
}

export const ModalDeAlerta: Story = {
  name: 'Modal de alerta',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" intent="danger" onClick={onOpen}>Excluir registro</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Confirmar exclusão"
          maxWidth="xs"
          actions={
            <>
              <Button emphasis="secondary" onClick={onClose}>Cancelar</Button>
              <Button emphasis="primary" intent="danger" onClick={onClose}>Excluir</Button>
            </>
          }
        >
          <p>Esta ação não pode ser desfeita. Tem certeza que deseja excluir o registro selecionado?</p>
        </Modal>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Modal de confirmação para ações destrutivas.' },
    },
  },
}

export const ModalPorSelecao: Story = {
  name: 'Modal por seleção',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    const [uf, setUf] = useState('')
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Selecionar UF</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Selecionar Unidade Federativa"
          actions={
            <>
              <Button emphasis="secondary" onClick={onClose}>Cancelar</Button>
              <Button emphasis="primary" onClick={onClose} disabled={!uf}>Confirmar</Button>
            </>
          }
        >
          <Select
            label="Unidade federativa"
            options={[
              { value: 'DF', label: 'Distrito Federal' },
              { value: 'SP', label: 'São Paulo' },
              { value: 'RJ', label: 'Rio de Janeiro' },
              { value: 'MG', label: 'Minas Gerais' },
            ]}
            value={uf}
            onChange={(v) => setUf(v === '' ? '' : String(v))}
            placeholder="Selecione o estado"
          />
        </Modal>
      </>
    )
  },
}

export const ModalDeEntrada: Story = {
  name: 'Modal de entrada de dados',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Adicionar contato</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Novo contato"
          titleDivider
          actions={
            <>
              <Button emphasis="secondary" onClick={onClose}>Cancelar</Button>
              <Button emphasis="primary" onClick={onClose}>Salvar</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-foreground">
                Nome <span className="text-destructive ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Nome completo"
                className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-primary focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-foreground">E-mail</label>
              <input
                type="email"
                placeholder="usuario@gov.br"
                className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-primary focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-foreground">Telefone</label>
              <input
                type="tel"
                placeholder="(61) 9 0000-0000"
                className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-primary focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
              />
            </div>
          </div>
        </Modal>
      </>
    )
  },
}

export const ComMensagemDestaque: Story = {
  name: 'Com mensagem de destaque',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Visualizar aviso</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Prazo de envio"
          actions={
            <Button emphasis="primary" onClick={onClose}>Entendido</Button>
          }
        >
          <Message severity="warning" title="Atenção">
            O prazo para envio dos documentos expira em <strong>2 dias úteis</strong>.
            Após este prazo, a solicitação será arquivada automaticamente.
          </Message>
          <p className="mt-3 text-sm text-foreground">
            Caso necessite de mais prazo, entre em contato com a unidade responsável pelo protocolo.
          </p>
        </Modal>
      </>
    )
  },
}

export const Confirmacao: Story = {
  name: 'Confirmação de ação',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    const [confirmado, setConfirmado] = useState(false)
    const handleConfirm = () => {
      setConfirmado(true)
      onClose()
    }
    return (
      <>
        <div className="flex items-center gap-4">
          <Button emphasis="primary" onClick={onOpen}>Enviar solicitação</Button>
          {confirmado && <span className="text-sm text-success font-medium">Solicitação enviada!</span>}
        </div>
        <Modal
          open={open}
          onClose={onClose}
          title="Confirmar envio"
          maxWidth="xs"
          actions={
            <>
              <Button emphasis="secondary" onClick={onClose}>Voltar</Button>
              <Button emphasis="primary" onClick={handleConfirm}>Confirmar envio</Button>
            </>
          }
        >
          <p>Ao confirmar, sua solicitação será registrada no sistema e não poderá ser alterada.</p>
          <p className="mt-2 text-sm text-gray-500">Deseja prosseguir?</p>
        </Modal>
      </>
    )
  },
}

export const SemRodape: Story = {
  name: 'Sem rodapé',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="secondary" onClick={onOpen}>Ver detalhes</Button>
        <Modal open={open} onClose={onClose} title="Detalhes do protocolo">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <dt className="font-semibold text-gray-500">Número</dt>
            <dd>2024/00123-7</dd>
            <dt className="font-semibold text-gray-500">Situação</dt>
            <dd className="text-success font-medium">Em análise</dd>
            <dt className="font-semibold text-gray-500">Criado em</dt>
            <dd>15/03/2024</dd>
            <dt className="font-semibold text-gray-500">Responsável</dt>
            <dd>Unidade de Protocolo</dd>
          </dl>
        </Modal>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Modal sem `actions` — apenas botão X fecha o painel.' },
    },
  },
}

export const LarguraMedia: Story = {
  name: 'Largura média (md)',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Abrir modal médio</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Resultado da consulta"
          maxWidth="md"
          titleDivider
          actions={<Button emphasis="primary" onClick={onClose}>Fechar</Button>}
        >
          <p className="text-sm text-foreground leading-relaxed">
            A consulta retornou os seguintes dados. Revise as informações antes de confirmar
            o prosseguimento da solicitação.
          </p>
          <div className="mt-4 rounded border border-border p-4 bg-muted/30 text-sm font-mono">
            <p>CPF: 000.000.000-00</p>
            <p>Nome: João da Silva</p>
            <p>Situação: Regular</p>
            <p>Última atualização: 2024-03-15</p>
          </div>
        </Modal>
      </>
    )
  },
}

export const ListaDeOpcoes: Story = {
  name: 'Lista de opções (ModalOptionList)',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Abrir lista</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Escolha um perfil"
          titleDivider
          actions={<Button emphasis="tertiary" onClick={onClose}>Cancelar</Button>}
        >
          <ModalOptionList
            items={[
              { id: '1', label: 'Maria Souza', avatarAlt: 'MS' },
              { id: '2', label: 'João Lima', avatarAlt: 'JL' },
            ]}
            onItemClick={() => onClose()}
          />
        </Modal>
      </>
    )
  },
}

export const GrupoRadio: Story = {
  name: 'Seleção por rádio (ModalRadioGroup)',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    const [v, setV] = useState('a')
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Abrir seleção</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Tipo de solicitação"
          titleDivider
          actions={
            <>
              <Button emphasis="tertiary" onClick={onClose}>Cancelar</Button>
              <Button emphasis="primary" onClick={onClose}>Confirmar</Button>
            </>
          }
        >
          <ModalRadioGroup
            name="tipo"
            value={v}
            onChange={setV}
            options={[
              { value: 'a', label: 'Primeira opção' },
              { value: 'b', label: 'Segunda opção' },
            ]}
          />
        </Modal>
      </>
    )
  },
}

export const ConteudoLongoScroll: Story = {
  name: 'Conteúdo longo com scroll',
  render: () => {
    const { open, onOpen, onClose } = useModal()
    return (
      <>
        <Button emphasis="primary" onClick={onOpen}>Termos de uso</Button>
        <Modal
          open={open}
          onClose={onClose}
          title="Termos de Uso"
          titleDivider
          maxWidth="sm"
          actions={
            <>
              <Button emphasis="secondary" onClick={onClose}>Recusar</Button>
              <Button emphasis="primary" onClick={onClose}>Aceitar termos</Button>
            </>
          }
        >
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-foreground">
              <strong>Cláusula {i + 1}.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          ))}
        </Modal>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Conteúdo longo — o `<dialog>` nativo gerencia o scroll automaticamente.' },
    },
  },
}
