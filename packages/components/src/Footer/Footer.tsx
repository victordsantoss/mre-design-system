'use client'
/**
 * Footer — Padrão Digital de Governo (GovBR)
 *
 * Referência: https://www.gov.br/ds/components/footer
 *
 * Responsividade:
 * - ≥ lg (12 col): colunas lado a lado, máx 6 por linha
 * - < lg (4-8 col): acordeão vertical exclusivo (ListGroup via Item + onToggle)
 *
 * Composição interna:
 * - `List`    → container semântico das categorias e dos links
 * - `Item`    → link de navegação (href) ou gatilho de acordeão (onToggle)
 * - `Divider` → separadores visuais (entre colunas, áreas e barra legal)
 *
 * Cores:
 * - Usa exclusivamente tokens semânticos (bg-background, text-foreground, etc.)
 *   que respondem automaticamente à classe `.dark` do ancestral (página host ou
 *   toolbar do Storybook). Tema escuro → bg-background = #071D41; claro → #FFFFFF.
 * - `inverted=true`: força tokens light via inline style, sobrepondo qualquer
 *   herança de `.dark` do ancestral (útil para footer claro em página escura).
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { Divider } from '../Divider'
import { List } from '../List'
import { Item } from '../Item'

/* ------------------------------------------------------------------ tipos */

export type FooterLogoAlign = 'left' | 'center' | 'right'

export interface FooterCategory {
  /** Rótulo da categoria (uppercase no cabeçalho) */
  title: string
  /** Links exibidos abaixo do cabeçalho */
  links: Array<{ label: string; href: string }>
}

export interface FooterSocialLink {
  icon: React.ReactNode
  /** Texto acessível do link */
  label: string
  href: string
}

export interface FooterProps {
  /**
   * Força tema claro independente do esquema de cores da página.
   * Sem `inverted`, o footer herda o tema do ancestral (toolbar do Storybook
   * ou `DesignSystemProvider` da aplicação).
   */
  inverted?: boolean
  /** Logo principal — área 1 */
  logo?: React.ReactNode
  /** Alinhamento do logo: `'left'` (padrão) | `'center'` | `'right'` */
  logoAlign?: FooterLogoAlign
  /**
   * Mapa do site — áreas 2-5.
   * Desktop ≥ lg: colunas lado a lado, máx 6 por linha.
   * Mobile/tablet < lg: acordeão exclusivo (uma categoria por vez).
   */
  categories?: FooterCategory[]
  /** Título da seção de redes sociais — área 6 (padrão: "REDES SOCIAIS") */
  socialTitle?: string
  /** Links de redes sociais — área 7 */
  socialLinks?: FooterSocialLink[]
  /** Logos de assinatura — área 8, lado direito da seção secundária */
  signatures?: React.ReactNode
  /** Texto legal — área 9-11, centralizado na barra inferior. Aceita JSX. */
  legalText?: React.ReactNode
  /** Remove o divider superior (borda-top) */
  noDivider?: boolean
  className?: string
}

/* ----------------------------------------------------------------- helpers */

const LOGO_ALIGN: Record<FooterLogoAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

/** Agrupa um array em blocos de `size` elementos */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const MAX_COLS = 6

/* ----------------------------------------------------------------- Footer */

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  function Footer(
    {
      inverted = false,
      logo,
      logoAlign = 'left',
      categories,
      socialTitle = 'REDES SOCIAIS',
      socialLinks,
      signatures,
      legalText,
      noDivider = false,
      className,
    },
    ref,
  ) {
    /* Acordeão exclusivo: mobile/tablet — uma categoria aberta por vez */
    const [openCategory, setOpenCategory] = React.useState<string | null>(null)
    const handleToggle = (title: string) =>
      setOpenCategory((prev) => (prev === title ? null : title))

    const hasSitemap = Boolean(categories?.length)
    const hasSocial = Boolean(socialLinks?.length || signatures)
    const hasLegal = Boolean(legalText)

    /* Grupos de até MAX_COLS colunas para o layout desktop */
    const categoryRows = hasSitemap ? chunk(categories!, MAX_COLS) : []

    /*
     * O footer usa exclusivamente tokens semânticos (bg-background, text-foreground,
     * border-border…) que respondem automaticamente à classe `.dark` do ancestral —
     * neste caso o toolbar do Storybook (ou a aplicação host) controla o esquema.
     *
     * `inverted=true` força tema claro mesmo que a página esteja em dark mode:
     * redeclaramos as variáveis CSS semânticas com valores light diretamente no
     * elemento <footer>, sobrepondo qualquer herança de `.dark` de um ancestral.
     */
    const lightTokenOverrides: React.CSSProperties | undefined = inverted
      ? ({
          '--color-background': '#FFFFFF',
          '--color-foreground': '#333333',
          '--color-primary': '#1351B4',
          '--color-primary-foreground': '#FFFFFF',
          '--color-primary-hover': '#0C326F',
          '--color-muted': '#F0F0F0',
          '--color-muted-foreground': '#666666',
          '--color-border': '#DCDCDC',
          '--color-accent': '#F8F8F8',
          '--color-accent-foreground': '#333333',
          '--color-ring': '#155BCB',
        } as React.CSSProperties)
      : undefined

    return (
      <footer
        ref={ref as React.Ref<HTMLElement>}
        style={lightTokenOverrides}
        className={cn(
          'w-full bg-background text-foreground',
          !noDivider && 'border-t border-border',
          'pt-12',
          className,
        )}
      >
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">

          {/* ── Área 1 — Logo ─────────────────────────────────────────── */}
          {logo && (
            <div className={cn('flex pb-12', LOGO_ALIGN[logoAlign])}>
              <div className="[&_img]:max-h-12 [&_img]:max-w-[180px] [&_img]:object-contain">
                {logo}
              </div>
            </div>
          )}

          {/* ── Áreas 2-5 — Mapa do site ──────────────────────────────── */}
          {hasSitemap && (
            <div className="pb-12">

              {/* ── Desktop ≥ lg: colunas, máx 6 por linha ─────────── */}
              <div className="hidden lg:block space-y-8">
                {categoryRows.map((row, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {rowIdx > 0 && <Divider className="my-0" />}
                    <div className="flex divide-x divide-border">
                      {row.map((cat) => (
                        <div
                          key={cat.title}
                          className="flex-1 min-w-0 px-4 first:pl-0 last:pr-0"
                        >
                          {/* Cabeçalho da categoria — apenas visual, não interativo */}
                          <p
                            className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {cat.title}
                          </p>

                          {/* Links usando List + Item */}
                          <List>
                            {cat.links.map((link) => (
                              <li key={link.href}>
                                <Item
                                  href={link.href}
                                  className="!px-0 text-sm text-primary"
                                >
                                  {link.label}
                                </Item>
                              </li>
                            ))}
                          </List>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* ── Mobile/tablet < lg: acordeão vertical exclusivo ─── */}
              <List className="lg:hidden">
                {categories!.map((cat, idx) => {
                  const isOpen = openCategory === cat.title
                  const isLast = idx === categories!.length - 1
                  return (
                    <React.Fragment key={cat.title}>
                      <li className="block w-full">
                        {/* Gatilho do acordeão — Item com onToggle (chevron automático) */}
                        <Item
                          onToggle={() => handleToggle(cat.title)}
                          expanded={isOpen}
                          className="text-[11px] font-semibold uppercase tracking-wider"
                        >
                          {cat.title}
                        </Item>

                        {/* Painel expandido */}
                        {isOpen && (
                          <List className="pl-4">
                            {cat.links.map((link) => (
                              <li key={link.href} className="block w-full">
                                <Item
                                  href={link.href}
                                  className="text-sm text-primary"
                                >
                                  {link.label}
                                </Item>
                              </li>
                            ))}
                          </List>
                        )}
                      </li>

                      {/* Divider entre categorias — dentro de <li> para HTML válido */}
                      {!isLast && (
                        <li role="presentation" className="block">
                          <Divider className="my-0" />
                        </li>
                      )}
                    </React.Fragment>
                  )
                })}
              </List>
            </div>
          )}

          {/* ── Áreas 6-8 — Redes sociais + assinaturas ──────────────── */}
          {hasSocial && (
            <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
              {socialLinks && socialLinks.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-extrabold uppercase tracking-wider">
                    {socialTitle}
                  </p>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        aria-label={link.label}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full',
                          'transition-opacity hover:opacity-80',
                          'focus-visible:outline-none focus-visible:ring-[3px]',
                          'focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                        )}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {signatures && (
                <div className="flex items-center gap-4">
                  {signatures}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Área 9-11 — Barra de Informação Legal ─────────────────── */}
        {hasLegal && (
          <>
            <Divider className="my-0" />
            <div className="mx-auto max-w-screen-xl px-6 py-4 lg:px-8">
              <p
                className="text-center text-xs font-medium text-foreground/70 [&_strong]:font-extrabold [&_a]:underline"
              >
                {legalText}
              </p>
            </div>
          </>
        )}
      </footer>
    )
  },
)

Footer.displayName = 'Footer'
