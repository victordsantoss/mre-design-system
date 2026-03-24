import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Footer, type FooterProps, type FooterCategory, type FooterLogoAlign, type FooterSecondaryLink } from '@ds/components'

/* ------------------------------------------------------------------- meta */

const FOOTER_DOCS = `
Localizado na parte inferior das páginas, o **Footer** (Rodapé) age como elemento de
"fechamento" de conteúdo, auxiliando o usuário na localização e fornecendo informações complementares.

**Áreas:**
- **Logo** (1) — marca principal, alinhamento configurável
- **Mapa do Site** (2–5) — grid de categorias + links; acordeão exclusivo em mobile/tablet
- **Informações Secundárias** (6–8) — redes sociais + logos de assinatura
- **Barra Legal** (9–11) — texto de licença centralizado

**Tema:** herda o esquema de cores da página (toolbar do Storybook / DesignSystemProvider). Use \`inverted\` para forçar fundo claro independente do tema.
`.trim()

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: FOOTER_DOCS } },
    layout: 'fullscreen',
  },
  argTypes: {
    inverted: { control: 'boolean', table: { category: 'Tema' } },
    logoAlign: {
      control: 'select',
      options: ['left', 'center', 'right'] satisfies FooterLogoAlign[],
      table: { category: 'Logo' },
    },
    noDivider: { control: 'boolean', table: { category: 'Estilo' } },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

/* ----------------------------------------------------------- shared data */

const MRELogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/7/7b/AssinaturaMREGovBR.png"
    alt="Itamaraty — Ministério das Relações Exteriores"
  />
)

const SecondaryIcon = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <span
    className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold"
    style={{ backgroundColor: bg }}
    aria-hidden="true"
  >
    {children}
  </span>
)

const SECONDARY_LINKS: FooterSecondaryLink[] = [
  { href: '#', label: 'Twitter / X', icon: <SecondaryIcon bg="#1DA1F2">𝕏</SecondaryIcon> },
  { href: '#', label: 'YouTube', icon: <SecondaryIcon bg="#FF0000">▶</SecondaryIcon> },
  { href: '#', label: 'Instagram', icon: <SecondaryIcon bg="#E1306C">Ig</SecondaryIcon> },
  { href: '#', label: 'Facebook', icon: <SecondaryIcon bg="#1877F2">f</SecondaryIcon> },
]

const SIGNATURES = (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/7/7b/AssinaturaMREGovBR.png"
    alt="Itamaraty"
    className="h-10 opacity-80"
  />
)

const MRE_CATEGORIES: FooterCategory[] = [
  {
    title: 'Serviços Consulares',
    links: [
      { label: 'Passaporte', href: '#' },
      { label: 'Visto', href: '#' },
      { label: 'Autenticação de Documentos', href: '#' },
      { label: 'Apostilamento', href: '#' },
    ],
  },
  {
    title: 'Cidadão no Exterior',
    links: [
      { label: 'Postos no Exterior', href: '#' },
      { label: 'Assistência a Brasileiros', href: '#' },
      { label: 'Registro Consular', href: '#' },
      { label: 'Emergências Consulares', href: '#' },
    ],
  },
  {
    title: 'Relações Exteriores',
    links: [
      { label: 'Acordos Bilaterais', href: '#' },
      { label: 'Organizações Internacionais', href: '#' },
      { label: 'Política Externa', href: '#' },
      { label: 'Comércio Exterior', href: '#' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Estrutura Organizacional', href: '#' },
      { label: 'Concurso IRBr', href: '#' },
      { label: 'Transparência', href: '#' },
    ],
  },
  {
    title: 'Notícias',
    links: [
      { label: 'Comunicados', href: '#' },
      { label: 'Agenda do Ministro', href: '#' },
      { label: 'Notas à Imprensa', href: '#' },
    ],
  },
  {
    title: 'Acesso Rápido',
    links: [
      { label: 'Agendar Atendimento', href: '#' },
      { label: 'e-Consular', href: '#' },
      { label: 'Ouvidoria', href: '#' },
      { label: 'Fale Conosco', href: '#' },
    ],
  },
]

const LEGAL_TEXT = (
  <>
    Todo o conteúdo deste site está publicado sob a licença{' '}
    <strong>Creative Commons Atribuição-SemDerivações 3.0 Não Adaptada</strong>
  </>
)

/* ---------------------------------------------------------------- stories */

/**
 * **Playground** — Footer completo do MRE com todas as áreas ativas.
 */
export const Playground: Story = {
  render: (args) => (
    <Footer
      {...args}
      logo={<MRELogo />}
      categories={MRE_CATEGORIES}
      secondaryTitle="CONTEÚDO SECUNDÁRIO"
      secondaryLinks={SECONDARY_LINKS}
      signatures={SIGNATURES}
      legalText={LEGAL_TEXT}
    />
  ),
  args: {
    inverted: false,
    logoAlign: 'left',
    noDivider: false,
  },
}

/**
 * **Apenas Barra Legal** — Rodapé simples com somente a barra de informações legais.
 */
export const BarraLegal: Story = {
  render: () => (
    <Footer
      legalText={
        <>
          Texto destinado a exibição das informações relacionadas à{' '}
          <strong>licença de uso</strong>.
        </>
      }
    />
  ),
}

/**
 * **Logo + Barra Legal** — Área de logo com barra de informações legais.
 */
export const LogoComBarraLegal: Story = {
  render: () => (
    <Footer
      logo={<MRELogo />}
      legalText={LEGAL_TEXT}
    />
  ),
}

/**
 * **Mapa do Site — 6 categorias** — Grid de 12 colunas (desktop).
 * Em mobile/tablet as categorias colapsam em acordeão exclusivo.
 */
export const MapaDoSite6Listas: Story = {
  render: () => (
    <Footer
      logo={<MRELogo />}
      categories={MRE_CATEGORIES}
      legalText={LEGAL_TEXT}
    />
  ),
}

/**
 * **Mapa do Site — 12 categorias** — Dois conjuntos de 6 categorias.
 */
export const MapaDoSite12Listas: Story = {
  render: () => (
    <Footer
      logo={<MRELogo />}
      categories={[
        ...MRE_CATEGORIES,
        {
          title: 'Tratados',
          links: [
            { label: 'Tratados Bilaterais', href: '#' },
            { label: 'Tratados Multilaterais', href: '#' },
            { label: 'Convenções da ONU', href: '#' },
            { label: 'Acordos de Livre Comércio', href: '#' },
          ],
        },
        {
          title: 'Cultura',
          links: [
            { label: 'Diplomacia Cultural', href: '#' },
            { label: 'Promoção do Português', href: '#' },
            { label: 'Acordos Culturais', href: '#' },
          ],
        },
        {
          title: 'Cooperação',
          links: [
            { label: 'Cooperação Técnica', href: '#' },
            { label: 'Cooperação Humanitária', href: '#' },
            { label: 'Cooperação Sul-Sul', href: '#' },
          ],
        },
        {
          title: 'Meio Ambiente',
          links: [
            { label: 'Mudanças Climáticas', href: '#' },
            { label: 'Biodiversidade', href: '#' },
            { label: 'Agenda 2030', href: '#' },
          ],
        },
        {
          title: 'Defesa',
          links: [
            { label: 'Segurança Internacional', href: '#' },
            { label: 'Desarmamento', href: '#' },
            { label: 'Operações de Paz', href: '#' },
          ],
        },
        {
          title: 'Econômico',
          links: [
            { label: 'Promoção Comercial', href: '#' },
            { label: 'Investimentos', href: '#' },
            { label: 'APEX Brasil', href: '#' },
          ],
        },
      ]}
      secondaryTitle="CONTEÚDO SECUNDÁRIO"
      secondaryLinks={SECONDARY_LINKS}
      signatures={SIGNATURES}
      legalText={LEGAL_TEXT}
    />
  ),
}

/**
 * **Alinhamentos do Logo** — esquerda, centro e direita.
 */
export const AlinhamentosLogo: Story = {
  render: () => (
    <div className="space-y-1">
      {(['left', 'center', 'right'] satisfies FooterLogoAlign[]).map((align) => (
        <Footer
          key={align}
          logo={<MRELogo />}
          logoAlign={align}
          noDivider={align !== 'left'}
        />
      ))}
    </div>
  ),
}

/**
 * **Barra de Informações Legais** — formato genérico e exemplo real do MRE.
 */
export const BarraInformacoesLegais: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-xs text-muted-foreground px-2">Formato genérico</p>
        <Footer
          legalText={
            <>
              Texto destinado a exibição das informações relacionadas à{' '}
              <strong>licença de uso</strong>.
            </>
          }
        />
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground px-2">Exemplo MRE</p>
        <Footer legalText={LEGAL_TEXT} />
      </div>
    </div>
  ),
}

/**
 * **Footer Mínimo** — apenas a barra legal, sem nenhuma área opcional.
 */
export const Minimo: Story = {
  render: () => (
    <Footer
      legalText={
        <>
          Texto destinado a exibição das informações relacionadas à{' '}
          <strong>licença de uso</strong>.
        </>
      }
    />
  ),
}
