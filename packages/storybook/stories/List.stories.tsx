import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  List,
  ListHeader,
  ListLabel,
  ListGroup,
  Item,
  Divider,
  type ListProps,
  type ItemDensity,
} from '@ds/components'

const LIST_DOCS = `
Container semântico para sequências de itens. Compõe \`Item\` e \`Divider\` seguindo o **Padrão Digital de Governo (GovBR)**.

**Orientações**: \`vertical\` (padrão) e \`horizontal\`.
**Densidade**: herdada por todos os \`Item\` filhos via contexto (\`small\` | \`medium\` | \`large\`).
**Subcomponentes**: \`ListHeader\`, \`ListLabel\` (rótulo de grupo), \`ListGroup\` (expansível).
**Divisores**: prop \`divided\` insere \`Divider\` automaticamente entre itens.
`.trim()

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: LIST_DOCS } },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: { category: 'Layout' },
    },
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies ItemDensity[],
      table: { category: 'Layout' },
    },
    divided: { control: 'boolean', table: { category: 'Estilo' } },
    bordered: { control: 'boolean', table: { category: 'Estilo' } },
  },
}

export default meta
type Story = StoryObj<typeof List>

/* ---------------------------------------------------------- shared helpers */

const HeartIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const PackageIcon = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <svg className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const MoreVertIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

/** Linha de item com as 3 zonas: [ícone/suporte visual] [textos] [meta/ação] */
type ItemRowProps = {
  icon?: React.ReactNode
  label?: string
  primary?: string
  secondary?: string | string[]
  meta?: React.ReactNode
  action?: React.ReactNode
}
const ItemRow = ({ icon, label, primary, secondary, meta, action }: ItemRowProps) => (
  <span className="flex w-full items-center gap-3">
    {icon !== undefined && (
      <span className="flex shrink-0 items-center justify-center text-foreground" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="min-w-0 flex-1">
      {label && <span className="block text-xs font-semibold uppercase tracking-wider text-foreground">{label}</span>}
      {primary && <span className="block text-sm">{primary}</span>}
      {typeof secondary === 'string' && (
        <span className="block text-xs text-muted-foreground">{secondary}</span>
      )}
      {Array.isArray(secondary) &&
        secondary.map((s, i) => (
          <span key={i} className="block text-xs text-muted-foreground">{s}</span>
        ))}
    </span>
    {meta !== undefined && (
      <span className="shrink-0 text-xs text-muted-foreground">{meta}</span>
    )}
    {action !== undefined && (
      <span className="shrink-0 text-muted-foreground">{action}</span>
    )}
  </span>
)

/* ---------------------------------------------------------------- stories */

/** Lista vertical simples — itens estáticos. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <List {...args}>
        <li><Item>Início</Item></li>
        <li><Item>Sobre</Item></li>
        <li><Item>Serviços</Item></li>
        <li><Item>Contato</Item></li>
      </List>
    </div>
  ),
  args: {
    orientation: 'vertical',
    density: 'small',
    divided: false,
    bordered: false,
  },
}

/** Lista vertical com divisores automáticos (prop `divided`). */
export const ComDivisores: Story = {
  render: () => (
    <div className="w-80">
      <List divided bordered>
        <li><Item>Início</Item></li>
        <li><Item>Sobre</Item></li>
        <li><Item>Serviços</Item></li>
        <li><Item>Contato</Item></li>
      </List>
    </div>
  ),
}

/** `ListHeader` como título da seção de lista. */
export const ComHeader: Story = {
  render: () => (
    <div className="w-80">
      <ListHeader>Navegação</ListHeader>
      <List bordered>
        <li><Item>Início</Item></li>
        <li><Item>Sobre</Item></li>
        <li><Item>Serviços</Item></li>
      </List>
    </div>
  ),
}

/** `ListLabel` organiza itens em grupos nomeados dentro da mesma lista. */
export const ComRotulos: Story = {
  render: () => (
    <div className="w-80">
      <List bordered>
        <ListLabel>Conta</ListLabel>
        <li><Item onClick={() => {}}>Perfil</Item></li>
        <li><Item onClick={() => {}}>Preferências</Item></li>
        <Divider className="my-0" />
        <ListLabel>Suporte</ListLabel>
        <li><Item onClick={() => {}}>Central de ajuda</Item></li>
        <li><Item onClick={() => {}}>Fale conosco</Item></li>
      </List>
    </div>
  ),
}

/** `ListGroup` — grupo expansível com toggle controlado. */
export const GrupoExpansivel: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false)
    return (
      <div className="w-80">
        <List bordered>
          <li><Item onClick={() => {}}>Início</Item></li>
          <ListGroup
            title="Serviços"
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          >
            <li><Item onClick={() => {}}>Passaporte</Item></li>
            <li><Item onClick={() => {}}>Visto</Item></li>
            <li><Item onClick={() => {}}>Autenticação</Item></li>
          </ListGroup>
          <li><Item onClick={() => {}}>Contato</Item></li>
        </List>
      </div>
    )
  },
}

/** Múltiplos grupos expansíveis simultâneos. */
export const MultiplosGrupos: Story = {
  render: () => {
    const [open, setOpen] = React.useState<Record<string, boolean>>({})
    const toggle = (k: string) => setOpen((s) => ({ ...s, [k]: !s[k] }))
    return (
      <div className="w-80">
        <List bordered>
          <ListGroup
            id="grupo-servicos"
            title="Serviços Consulares"
            expanded={!!open['servicos']}
            onToggle={() => toggle('servicos')}
          >
            <li><Item onClick={() => {}}>Passaporte</Item></li>
            <li><Item onClick={() => {}}>Visto</Item></li>
            <li><Item onClick={() => {}}>Autenticação de documentos</Item></li>
          </ListGroup>
          <Divider className="my-0" />
          <ListGroup
            id="grupo-atendimento"
            title="Atendimento"
            expanded={!!open['atendimento']}
            onToggle={() => toggle('atendimento')}
          >
            <li><Item onClick={() => {}}>Agendar atendimento</Item></li>
            <li><Item onClick={() => {}}>Postos no exterior</Item></li>
          </ListGroup>
          <Divider className="my-0" />
          <ListGroup
            id="grupo-noticias"
            title="Notícias"
            expanded={!!open['noticias']}
            onToggle={() => toggle('noticias')}
          >
            <li><Item onClick={() => {}}>Comunicados</Item></li>
            <li><Item onClick={() => {}}>Avisos de segurança</Item></li>
          </ListGroup>
        </List>
      </div>
    )
  },
}

/** Comparação das três densidades — herdadas automaticamente por todos os `Item` via contexto. */
export const Densidades: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['small', 'medium', 'large'] satisfies ItemDensity[]).map((d) => (
        <div key={d} className="w-52">
          <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">{d}</p>
          <List density={d} bordered>
            <li><Item>Início</Item></li>
            <li><Item>Sobre</Item></li>
            <li><Item>Serviços</Item></li>
          </List>
        </div>
      ))}
    </div>
  ),
}

/** Lista horizontal — itens lado a lado. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-full">
      <List orientation="horizontal" bordered className="gap-0">
        <li><Item onClick={() => {}}>Início</Item></li>
        <li>
          <Divider orientation="vertical" className="mx-0 h-full" />
        </li>
        <li><Item onClick={() => {}}>Sobre</Item></li>
        <li>
          <Divider orientation="vertical" className="mx-0 h-full" />
        </li>
        <li><Item onClick={() => {}}>Serviços</Item></li>
        <li>
          <Divider orientation="vertical" className="mx-0 h-full" />
        </li>
        <li><Item onClick={() => {}}>Contato</Item></li>
      </List>
    </div>
  ),
}

/** Lista com itens em estados selecionado, ativo e desabilitado. */
export const Estados: Story = {
  render: () => (
    <div className="w-80">
      <List bordered divided>
        <li><Item onClick={() => {}}>Normal</Item></li>
        <li><Item onClick={() => {}} selected>Selecionado</Item></li>
        <li><Item onClick={() => {}} active>Ativo (página atual)</Item></li>
        <li><Item onClick={() => {}} disabled>Desabilitado</Item></li>
      </List>
    </div>
  ),
}

/** Lista com ícones nas áreas de suporte dos itens. */
export const ComIcones: Story = {
  render: () => {
    const Icon = ({ path }: { path: string }) => (
      <svg
        className="h-4 w-4 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
    return (
      <div className="w-80">
        <List bordered>
          <li>
            <Item onClick={() => {}}>
              <span className="flex items-center gap-3">
                <Icon path="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <span>Início</span>
              </span>
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <span className="flex items-center gap-3">
                <Icon path="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <span>Usuário</span>
              </span>
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <span className="flex items-center gap-3">
                <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <span>Configurações</span>
              </span>
            </Item>
          </li>
        </List>
      </div>
    )
  },
}

/** Lista como menu de navegação lateral — padrão GovBR. */
export const NavegacaoLateral: Story = {
  render: () => {
    const [open, setOpen] = React.useState<Record<string, boolean>>({})
    const [selected, setSelected] = React.useState('inicio')
    const toggle = (k: string) => setOpen((s) => ({ ...s, [k]: !s[k] }))

    return (
      <div className="w-64 rounded-md border border-border bg-background shadow-card-sm">
        <ListHeader>Menu Principal</ListHeader>
        <Divider className="my-0" />
        <List density="small">
          <li>
            <Item
              onClick={() => setSelected('inicio')}
              selected={selected === 'inicio'}
            >
              Início
            </Item>
          </li>
          <ListGroup
            title="Serviços"
            expanded={!!open['servicos']}
            onToggle={() => toggle('servicos')}
          >
            <li>
              <Item
                onClick={() => setSelected('passaporte')}
                selected={selected === 'passaporte'}
              >
                Passaporte
              </Item>
            </li>
            <li>
              <Item
                onClick={() => setSelected('visto')}
                selected={selected === 'visto'}
              >
                Visto
              </Item>
            </li>
          </ListGroup>
          <Divider className="my-0" />
          <li>
            <Item
              onClick={() => setSelected('contato')}
              selected={selected === 'contato'}
            >
              Contato
            </Item>
          </li>
          <li>
            <Item disabled>Em manutenção</Item>
          </li>
        </List>
      </div>
    )
  },
}

/* ══════════════════════════════════════════════════════════════════════════
   STORIES BASEADAS NAS IMAGENS DE REFERÊNCIA DO GovBR DS
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * **Anatomia do Item** — 3 zonas funcionais.
 *
 * `[1]` Suporte Visual (ícone/avatar) · `[2]` Área Principal (textos) · `[3]` Suporte Complementar (ação/meta)
 */
export const AnatomiaItem: Story = {
  render: () => (
    <div className="w-[480px] p-8">
      <List divided>
        <li>
          <Item onClick={() => {}}>
            <ItemRow
              icon={<HeartIcon />}
              primary="Texto de uma linha"
              action={<MoreVertIcon />}
            />
          </Item>
        </li>
      </List>
      <div className="mt-4 flex gap-6 text-xs text-muted-foreground">
        <span><strong className="text-foreground">1</strong> — Suporte Visual</span>
        <span><strong className="text-foreground">2</strong> — Área Principal</span>
        <span><strong className="text-foreground">3</strong> — Suporte Complementar</span>
      </div>
    </div>
  ),
}

/**
 * **Número de linhas** — 1 linha, 2 linhas e 3 linhas na área de texto.
 *
 * A altura do item cresce automaticamente conforme o conteúdo.
 */
export const LinhasDeTexto: Story = {
  render: () => (
    <div className="flex gap-12 flex-wrap">
      {/* 1 linha */}
      <div className="w-56">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">1 Linha</p>
        <p className="mb-1 text-sm font-semibold">Título</p>
        <Divider className="my-0" />
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow icon={<HeartIcon />} label="ITEM" action={<ChevronRightIcon />} />
              </Item>
            </li>
          ))}
        </List>
      </div>

      {/* 2 linhas */}
      <div className="w-64">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">2 Linhas</p>
        <p className="mb-1 text-sm font-semibold">Título</p>
        <Divider className="my-0" />
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" action={<ChevronRightIcon />} />
              </Item>
            </li>
          ))}
        </List>
      </div>

      {/* 3 linhas */}
      <div className="w-72">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">3 Linhas</p>
        <p className="mb-1 text-sm font-semibold">Título</p>
        <Divider className="my-0" />
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow
                  icon={<HeartIcon />}
                  label="ITEM"
                  primary="Texto principal"
                  secondary="Texto secundário Lorem ipsum dolor sit amet"
                  action={<ChevronRightIcon />}
                />
              </Item>
            </li>
          ))}
        </List>
      </div>
    </div>
  ),
}

/**
 * **Anatomia dos textos** — zonas de conteúdo textual: subtítulo, texto principal e linhas secundárias.
 */
export const AnatomiaTextos: Story = {
  render: () => (
    <div className="w-[480px]">
      <List divided>
        <li>
          <Item>
            <ItemRow primary="Texto de uma linha" meta="meta" />
          </Item>
        </li>
        <li>
          <Item>
            <ItemRow primary="Texto principal" secondary="Texto secundário" meta="meta" />
          </Item>
        </li>
        <li>
          <Item>
            <ItemRow icon={<HeartIcon />} label="SUBTÍTULO" primary="Texto principal" meta="meta" />
          </Item>
        </li>
        <li>
          <Item>
            <ItemRow
              primary="Texto principal"
              secondary="Texto secundário Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              meta="meta"
            />
          </Item>
        </li>
        <li>
          <Item>
            <ItemRow
              icon={<HeartIcon />}
              label="SUBTÍTULO"
              primary="Texto principal"
              secondary="Texto secundário Lorem ipsum dolor sit amet"
              meta="meta"
            />
          </Item>
        </li>
      </List>
    </div>
  ),
}

/**
 * **Boas práticas — altura consistente** (Recomendável × Uso com cautela).
 *
 * Mantenha todos os itens da lista com a mesma estrutura de texto para garantir
 * alturas uniformes. Evite misturar itens de 2 e 3 linhas na mesma lista.
 */
export const BoasPraticasAltura: Story = {
  render: () => (
    <div className="flex gap-16 flex-wrap">
      {/* Recomendável */}
      <div className="w-72">
        <div className="mb-3 rounded bg-[#168821] px-3 py-1 text-xs font-semibold text-white">Recomendável</div>
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
              </Item>
            </li>
          ))}
        </List>
      </div>

      {/* Uso com cautela */}
      <div className="w-80">
        <div className="mb-3 rounded border border-[#FFCD07] bg-[#FFFDF0] px-3 py-1 text-xs font-semibold text-[#6B5000]">Uso com cautela</div>
        <List divided>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" secondary="Texto secundário Lorem ipsum dolor sit amet" meta="meta" />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" secondary="Texto secundário Lorem ipsum dolor sit amet" meta="meta" />
            </Item>
          </li>
        </List>
      </div>
    </div>
  ),
}

/**
 * **Tipos de suporte visual** — ícone, avatar circular, thumbnail quadrado pequeno e retangular.
 *
 * O suporte visual fica na zona `[1]` do item e pode ter diferentes formas e tamanhos.
 */
export const TiposDeSuporteVisual: Story = {
  render: () => (
    <div className="flex gap-16 flex-wrap">
      {/* Coluna esquerda */}
      <div className="w-72">
        <List divided>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-10 rounded-full bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={<PackageIcon />}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-10 rounded bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-16 rounded bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário Lorem ipsum dolor sit amet, consectetur"
                action={<MoreVertIcon />}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-16 rounded bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={<ChevronRightIcon />}
              />
            </Item>
          </li>
        </List>
      </div>

      {/* Coluna direita */}
      <div className="w-64">
        <List divided>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} primary="Texto de uma linha" action={<MoreVertIcon />} />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-10 rounded-full bg-primary" />}
                primary="Texto de uma linha"
                action={<PackageIcon />}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<HeartIcon />}
                primary="Texto principal"
                secondary="Texto secundário Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow primary="Texto principal" secondary="Texto secundário" meta="meta" action={<PackageIcon />} />
            </Item>
          </li>
        </List>
      </div>
    </div>
  ),
}

/**
 * **Boas práticas — consistência do suporte visual** (Faça! × Não faça!).
 *
 * Use o mesmo tipo e tamanho de suporte visual em todos os itens da lista.
 * Misturar ícones com avatares ou ausência de ícone quebra o alinhamento.
 */
export const BoasPraticasIcones: Story = {
  render: () => (
    <div className="flex gap-16 flex-wrap">
      {/* Faça */}
      <div className="w-72">
        <div className="mb-3 rounded bg-[#168821] px-3 py-1 text-xs font-semibold text-white">Faça!</div>
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow
                  icon={<span className="h-10 w-10 rounded-full bg-primary" />}
                  primary="Texto principal"
                  secondary="Texto secundário"
                  action={<PackageIcon />}
                />
              </Item>
            </li>
          ))}
        </List>
      </div>

      {/* Não faça */}
      <div className="w-72">
        <div className="mb-3 rounded bg-[#E52207] px-3 py-1 text-xs font-semibold text-white">Não faça!</div>
        <List divided>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-10 rounded-full bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={<PackageIcon size="md" />}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<PackageIcon size="md" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={<span className="h-10 w-10 rounded-full bg-primary" />}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-10 rounded-full bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={undefined}
              />
            </Item>
          </li>
          <li>
            <Item onClick={() => {}}>
              <ItemRow
                icon={<span className="h-10 w-16 rounded bg-primary" />}
                primary="Texto principal"
                secondary="Texto secundário"
                action={<PackageIcon />}
              />
            </Item>
          </li>
        </List>
      </div>
    </div>
  ),
}

/**
 * **Estado selecionado com checkbox** — seleção múltipla com feedback visual destacado.
 */
export const EstadoSelecionadoCheckbox: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<number>>(new Set([0, 2]))
    const toggle = (i: number) =>
      setSelected((s) => {
        const next = new Set(s)
        next.has(i) ? next.delete(i) : next.add(i)
        return next
      })
    return (
      <div className="w-80">
        <List>
          {[0, 1, 2].map((i) => {
            const isSelected = selected.has(i)
            return (
              <li key={i}>
                <Item onClick={() => toggle(i)} selected={isSelected}>
                  <ItemRow
                    icon={<HeartIcon />}
                    label="ITEM"
                    primary="Texto principal"
                    action={
                      <span
                        className={[
                          'flex h-5 w-5 items-center justify-center rounded border-2',
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-border bg-background',
                        ].join(' ')}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg className="h-3 w-3 text-primary" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="1.5 6 4.5 9 10.5 3" />
                          </svg>
                        )}
                      </span>
                    }
                  />
                </Item>
              </li>
            )
          })}
        </List>
      </div>
    )
  },
}

/**
 * **Posicionamento dos divisores** — todas as posições vs. entre grupos vs. sem divisores.
 */
export const PlacamentoDivisores: Story = {
  render: () => {
    const items = [1, 2, 3, 4]
    return (
      <div className="flex gap-12 flex-wrap">
        {/* Todos os itens */}
        <div className="w-56">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Entre todos</p>
          <List divided>
            {items.map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>

        {/* Entre grupos */}
        <div className="w-56">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Entre grupos</p>
          <List>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
            <Divider className="my-0" />
            {[4, 5].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
            <Divider className="my-0" />
            {[6, 7].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>

        {/* Sem divisores */}
        <div className="w-56">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Sem divisores</p>
          <List>
            {[...items, 5, 6].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>
      </div>
    )
  },
}

/**
 * **Boas práticas — uso dos divisores** (Faça! × Não faça!).
 *
 * Aplique divisores de forma consistente: todos os itens ou nenhum.
 * Não divida apenas alguns itens da mesma lista.
 */
export const BoasPraticasDivisores: Story = {
  render: () => (
    <div className="flex gap-16 flex-wrap">
      {/* Faça */}
      <div className="w-64">
        <div className="mb-3 rounded bg-[#168821] px-3 py-1 text-xs font-semibold text-white">Faça!</div>
        <List divided>
          {[1, 2, 3, 4].map((i) => (
            <li key={i}>
              <Item onClick={() => {}}>
                <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
              </Item>
            </li>
          ))}
        </List>
      </div>

      {/* Não faça */}
      <div className="w-64">
        <div className="mb-3 rounded bg-[#E52207] px-3 py-1 text-xs font-semibold text-white">Não faça!</div>
        <List>
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
          <Divider className="my-0" />
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
          {/* sem divisor aqui — inconsistente */}
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
          <Divider className="my-0" />
          <li>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
        </List>
      </div>
    </div>
  ),
}

/**
 * **Lista vertical com título** — padrão GovBR com header, ícones e ações de navegação.
 */
export const ListaVerticalComTitulo: Story = {
  render: () => (
    <div className="w-80">
      <p className="mb-1 text-sm font-semibold">Título</p>
      <Divider className="my-0" />
      <List divided>
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" action={<ChevronRightIcon />} />
            </Item>
          </li>
        ))}
      </List>
    </div>
  ),
}

/**
 * **Lista horizontal com título** — itens lado a lado, cada um com ícone, texto e meta.
 */
export const ListaHorizontalComTitulo: Story = {
  render: () => (
    <div className="w-full">
      <p className="mb-1 text-sm font-semibold">Título</p>
      <Divider className="my-0" />
      <List orientation="horizontal">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex-1">
            <Item onClick={() => {}}>
              <ItemRow icon={<HeartIcon />} label="ITEM" primary="Texto principal" meta="meta" />
            </Item>
          </li>
        ))}
      </List>
    </div>
  ),
}

/**
 * **Comparação de densidades** — Alta (8 px), Média (16 px) e Baixa (24 px).
 */
export const ComparacaoDensidades: Story = {
  render: () => (
    <div className="flex gap-12 flex-wrap">
      {(
        [
          { label: 'Densidade alta', density: 'small' },
          { label: 'Densidade média', density: 'medium' },
          { label: 'Densidade baixa', density: 'large' },
        ] as { label: string; density: ItemDensity }[]
      ).map(({ label, density }) => (
        <div key={density} className="w-64">
          <div className="mb-3 rounded border border-[#FF69B4] bg-[#FFF0F7] px-3 py-1 text-xs font-semibold text-[#C2185B]">{label}</div>
          <List density={density} divided>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Texto principal" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>
      ))}
    </div>
  ),
}

/**
 * **Tipos de agrupamento** — Rótulos, Separadores e Expansão.
 */
export const TiposDeAgrupamento: Story = {
  render: () => {
    const [open, setOpen] = React.useState<Record<string, boolean>>({ r1: true })
    const toggle = (k: string) => setOpen((s) => ({ ...s, [k]: !s[k] }))
    return (
      <div className="flex gap-12 flex-wrap">
        {/* Com rótulos */}
        <div className="w-64">
          <div className="mb-3 rounded border border-[#FF69B4] bg-[#FFF0F7] px-3 py-1 text-xs font-semibold text-[#C2185B]">Agrupamento com rótulos</div>
          <p className="mb-1 text-sm font-semibold">Título</p>
          <Divider className="my-0" />
          <List>
            <ListLabel>Rótulo 01</ListLabel>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Sub-item" meta="meta" />
                </Item>
              </li>
            ))}
            <ListLabel>Rótulo 02</ListLabel>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Sub-item" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>

        {/* Com separadores */}
        <div className="w-64">
          <div className="mb-3 rounded border border-[#FF69B4] bg-[#FFF0F7] px-3 py-1 text-xs font-semibold text-[#C2185B]">Agrupamento com separadores</div>
          <p className="mb-1 text-sm font-semibold">Título</p>
          <Divider className="my-0" />
          <List divided>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Sub-item" meta="meta" />
                </Item>
              </li>
            ))}
            <Divider className="my-0 border-border/50" />
            {[4, 5, 6].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Sub-item" meta="meta" />
                </Item>
              </li>
            ))}
            <Divider className="my-0 border-border/50" />
            {[7].map((i) => (
              <li key={i}>
                <Item onClick={() => {}}>
                  <ItemRow icon={<HeartIcon />} primary="Sub-item" meta="meta" />
                </Item>
              </li>
            ))}
          </List>
        </div>

        {/* Com expansão */}
        <div className="w-64">
          <div className="mb-3 rounded border border-[#FF69B4] bg-[#FFF0F7] px-3 py-1 text-xs font-semibold text-[#C2185B]">Agrupamento com expansão</div>
          <p className="mb-1 text-sm font-semibold">Título</p>
          <Divider className="my-0" />
          <List>
            <ListGroup title="Rótulo 01" expanded={!!open['r1']} onToggle={() => toggle('r1')}>
              {[1, 2, 3].map((i) => (
                <li key={i}>
                  <Item onClick={() => {}}>
                    <ItemRow icon={<HeartIcon />} primary="Sub-item" />
                  </Item>
                </li>
              ))}
            </ListGroup>
            <Divider className="my-0" />
            <ListGroup title="Rótulo 02" expanded={!!open['r2']} onToggle={() => toggle('r2')} />
            <Divider className="my-0" />
            <ListGroup title="Rótulo 03" expanded={!!open['r3']} onToggle={() => toggle('r3')} />
          </List>
        </div>
      </div>
    )
  },
}

/**
 * **Anatomia da expansão** — trigger com círculo, divisores internos e chevron de estado.
 *
 * `[1]` Botão trigger com chevron-up (expandido) · `[2]` Divisor entre sub-itens · `[3]` Chevron-down (colapsado)
 */
export const AnatomiaExpansao: Story = {
  render: () => {
    const [open, setOpen] = React.useState<Record<string, boolean>>({ r1: true })
    const toggle = (k: string) => setOpen((s) => ({ ...s, [k]: !s[k] }))
    return (
      <div className="flex gap-12 flex-wrap">
        {/* Todos colapsados */}
        <div className="w-64">
          <p className="mb-1 text-sm font-semibold">Título</p>
          <Divider className="my-0" />
          <List>
            {['Rótulo 01', 'Rótulo 02', 'Rótulo 03'].map((r, i) => (
              <React.Fragment key={r}>
                <ListGroup title={r} expanded={false} onToggle={() => {}} />
                {i < 2 && <Divider className="my-0" />}
              </React.Fragment>
            ))}
          </List>
        </div>

        {/* Com primeiro expandido */}
        <div className="w-64">
          <p className="mb-1 text-sm font-semibold">Título</p>
          <Divider className="my-0" />
          <List>
            <ListGroup
              title="Rótulo 01"
              expanded={!!open['r1']}
              onToggle={() => toggle('r1')}
            >
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <li>
                    <Item onClick={() => {}}>
                      <ItemRow icon={<HeartIcon />} primary="ITEM" />
                    </Item>
                  </li>
                  {i < 3 && <Divider className="my-0" />}
                </React.Fragment>
              ))}
            </ListGroup>
            <Divider className="my-0" />
            <ListGroup title="Rótulo 02" expanded={false} onToggle={() => {}} />
            <Divider className="my-0" />
            <ListGroup title="Rótulo 03" expanded={false} onToggle={() => {}} />
          </List>
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <span><strong className="text-foreground">1</strong> — Trigger expandido</span>
            <span><strong className="text-foreground">2</strong> — Divisor interno</span>
            <span><strong className="text-foreground">3</strong> — Trigger colapsado</span>
          </div>
        </div>
      </div>
    )
  },
}

/* ---------------------------------------------------------------- stories */

/** Lista como barra de navegação por abas / breadcrumb horizontal. */
export const NavegacaoHorizontal: Story = {
  render: () => {
    const [active, setActive] = React.useState('visao-geral')
    const tabs = [
      { id: 'visao-geral', label: 'Visão Geral' },
      { id: 'codigos', label: 'Códigos' },
      { id: 'acessibilidade', label: 'Acessibilidade' },
      { id: 'changelog', label: 'Changelog' },
    ]
    return (
      <div className="w-full border-b border-border">
        <List orientation="horizontal">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Item
                onClick={() => setActive(tab.id)}
                active={active === tab.id}
                className={
                  active === tab.id
                    ? 'border-b-2 border-primary pb-[6px]'
                    : 'pb-2'
                }
              >
                {tab.label}
              </Item>
            </li>
          ))}
        </List>
      </div>
    )
  },
}
