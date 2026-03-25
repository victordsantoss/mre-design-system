'use client'
/**
 * Header — Padrão Digital de Governo (GovBR)
 *
 * Cabeçalho do site/sistema com logo, assinatura, título, subtítulo,
 * links de apoio, funcionalidades, busca e área de login/avatar.
 *
 * Referência: https://www.gov.br/ds/components/header
 *
 * Acessibilidade:
 * - Usa <header> semântico
 * - Navegação por Tab/Shift+Tab e Space/Enter nos elementos interativos
 * - aria-label em todas as regiões e botões
 * - Busca acessível com role="search"
 * - Ordem de foco lógica
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { Input } from '../Input/Input'
import { CircleButton } from '../Button/Button'
import { Typography } from '../Typography/Typography'
import { Divider } from '../Divider/Divider'

/* ------------------------------------------------------------------ tipos */

export type HeaderDensity = 'small' | 'medium' | 'large'

export interface HeaderLink {
  /** Rótulo visível do link */
  label: string
  /** URL de destino */
  href: string
}

export interface HeaderFunctionItem {
  /** Identificador único */
  id: string
  /** Ícone exibido no botão */
  icon: React.ReactNode
  /** Rótulo acessível (aria-label) */
  label: string
  /** Callback ao clicar */
  onClick?: () => void
}

export interface HeaderProps {
  /** Título do site/sistema — obrigatório */
  title: string
  /** Converte o título em link */
  titleHref?: string
  /** Subtítulo abaixo do título (oculto em mobile e modo compacto) */
  subtitle?: string
  /** Converte o subtítulo em link */
  subtitleHref?: string
  /** Logo (elemento <img> ou <svg>) */
  logo?: React.ReactNode
  /** Assinatura ao lado da logo (oculta em mobile e modo compacto) */
  sign?: string
  /** Modo compacto — reduz logo, padding e título */
  compact?: boolean
  /** Densidade do padding vertical */
  density?: HeaderDensity
  /**
   * Ativa comportamento sticky: fixa o header no topo
   * e o torna compacto ao rolar.
   */
  sticky?: boolean
  /** Callback do botão hamburguer (abre o Menu) */
  onMenuClick?: () => void
  /** Links de apoio exibidos na área superior */
  links?: HeaderLink[]
  /** Botões de funcionalidades (ícones) na área superior */
  functions?: HeaderFunctionItem[]
  /** Exibe campo de busca */
  search?: boolean
  /** Placeholder do campo de busca */
  searchPlaceholder?: string
  /** Callback ao submeter a busca */
  onSearch?: (value: string) => void
  /** Usuário está autenticado */
  authenticated?: boolean
  /** Conteúdo de login (botão sign-in) — exibido quando não autenticado */
  signIn?: React.ReactNode
  /** Avatar do usuário — exibido quando autenticado */
  avatar?: React.ReactNode
  /** className adicional para o elemento <header> */
  className?: string
}

/* ------------------------------------------------- constantes de densidade */

const DENSITY_PY: Record<HeaderDensity, string> = {
  small: 'py-2',  // --spacing-scale-base = 8px
  medium: 'py-4', // --spacing-scale-2x   = 16px
  large: 'py-6',  // --spacing-scale-3x   = 24px
}

/* ---------------------------------------------------------------- ícones */

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* ----------------------------------------------------------- Header principal */

export function Header({
  title,
  titleHref,
  subtitle,
  subtitleHref,
  logo,
  sign,
  compact: compactProp = false,
  density = 'medium',
  sticky = false,
  onMenuClick,
  links,
  functions: functionItems,
  search = false,
  searchPlaceholder = 'Buscar...',
  onSearch,
  authenticated = false,
  signIn,
  avatar,
  className,
}: HeaderProps) {
  const headerRef = React.useRef<HTMLElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const [searchOpen, setSearchOpen] = React.useState(false)
  const [scrollCompact, setScrollCompact] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  /** Compacto por prop ou por scroll no modo sticky */
  const isCompact = compactProp || scrollCompact

  /* Sticky: observa scroll e ativa modo compacto */
  React.useEffect(() => {
    if (!sticky) return
    const header = headerRef.current
    if (!header) return

    const onScroll = () => setScrollCompact(window.scrollY > header.offsetHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sticky])

  /* Foca o input ao abrir a busca */
  React.useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchValue)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchValue('')
  }

  const hasLinks = Boolean(links?.length)
  const hasFunctions = Boolean(functionItems?.length)
  const hasTop = !isCompact && (logo || sign || hasLinks || hasFunctions || signIn || avatar)

  /* Logo: tamanho varia por modo */
  const logoClass = isCompact
    ? '[&_img]:h-4 [&_svg]:h-4 sm:[&_img]:h-6 sm:[&_svg]:h-6'
    : '[&_img]:h-10 [&_svg]:h-10 sm:[&_img]:h-6 sm:[&_svg]:h-6 lg:[&_img]:h-10 lg:[&_svg]:h-10'

  const densityClass = isCompact ? DENSITY_PY.small : DENSITY_PY[density]

  /* -------------------- render */
  return (
    <header
      ref={headerRef}
      className={cn(
        'relative w-full bg-background font-body text-foreground',
        'shadow-card-sm',
        sticky && 'sticky top-0 z-[2000] transition-all duration-150',
        scrollCompact && sticky && 'shadow-modal',
        className,
      )}
    >
      <div className={cn('px-4', densityClass)}>

        {/* ── Overlay de busca (mobile / compacto) ────────────────── */}
        {search && searchOpen && (
          <div className="absolute inset-0 z-10 flex items-center gap-3 bg-background px-4 lg:hidden" role="search">
            <form className="flex flex-1 items-center" onSubmit={handleSearchSubmit} aria-label="Busca">
              <Input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Campo de busca"
                className="w-full"
                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              />
            </form>
            <CircleButton
              aria-label="Fechar busca"
              density="small"
              onClick={closeSearch}
            >
              <IconClose />
            </CircleButton>
          </div>
        )}

        {/* ── Área superior: logo · assinatura · links · funcionalidades · login ── */}
        {hasTop && (
          <div className="mb-2 flex items-center justify-end gap-4">

            {/* Logo + separador + assinatura */}
            {(logo || sign) && (
              <div className="mr-auto flex items-center gap-3">
                {logo && (
                  <span className={cn('flex items-center', logoClass)}>
                    {logo}
                  </span>
                )}
                {logo && sign && (
                  <Divider
                    orientation="vertical"
                    className="hidden sm:block mx-0 h-8"
                  />
                )}
                {sign && (
                  <Typography
                    variant="body2"
                    color="muted"
                    weight="medium"
                    className="hidden sm:block"
                  >
                    {sign}
                  </Typography>
                )}
              </div>
            )}

            {/* Links de apoio — desktop inline, mobile omitido */}
            {hasLinks && (
              <nav aria-label="Links de apoio" className="hidden lg:flex lg:items-center lg:gap-6">
                {links!.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className={cn(
                      'text-down-01 font-semibold text-primary no-underline',
                      'hover:underline',
                      'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Funcionalidades */}
            {hasFunctions && (
              <div className="flex items-center gap-1" role="group" aria-label="Funcionalidades">
                {functionItems!.map((fn) => (
                  <CircleButton
                    key={fn.id}
                    aria-label={fn.label}
                    density="small"
                    onClick={fn.onClick}
                  >
                    <span aria-hidden="true">{fn.icon}</span>
                  </CircleButton>
                ))}
              </div>
            )}

            {/* Login (sign-in ou avatar) */}
            {(signIn || avatar) && (
              <div className="ml-2 flex items-center">
                {authenticated ? avatar : signIn}
              </div>
            )}
          </div>
        )}

        {/* ── Área inferior: menu trigger · título/subtítulo · busca ── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Botão menu hamburguer */}
          {onMenuClick && (
            <CircleButton
              aria-label="Abrir menu principal"
              density="small"
              onClick={onMenuClick}
              className={cn(!isCompact && 'sm:self-start sm:mt-0.5')}
            >
              <IconMenu />
            </CircleButton>
          )}

          {/* Título + subtítulo */}
          <div className="min-w-0 flex-1">
            {titleHref ? (
              <a href={titleHref} className="block no-underline hover:underline">
                <Typography
                  variant="h4"
                  weight="normal"
                  className={cn(
                    'uppercase line-clamp-2 text-foreground',
                    'text-base sm:text-up-02 lg:text-up-03',
                    isCompact && 'sm:text-up-01 lg:text-up-02',
                  )}
                  style={{ fontSize: undefined }}
                >
                  {title}
                </Typography>
              </a>
            ) : (
              <Typography
                variant="h4"
                weight="normal"
                className={cn(
                  'uppercase line-clamp-2 text-foreground',
                  'text-base sm:text-up-02 lg:text-up-03',
                  isCompact && 'sm:text-up-01 lg:text-up-02',
                )}
                style={{ fontSize: undefined }}
              >
                {title}
              </Typography>
            )}

            {subtitle && !isCompact && (
              subtitleHref ? (
                <a href={subtitleHref} className="block no-underline hover:underline">
                  <Typography
                    variant="body2"
                    color="muted"
                    weight="medium"
                    className="hidden sm:block mt-[4px] text-down-01 lg:text-base"
                    style={{ fontSize: undefined }}
                  >
                    {subtitle}
                  </Typography>
                </a>
              ) : (
                <Typography
                  variant="body2"
                  color="muted"
                  weight="medium"
                  className="hidden sm:block mt-[4px] text-down-01 lg:text-base"
                  style={{ fontSize: undefined }}
                >
                  {subtitle}
                </Typography>
              )
            )}
          </div>

          {/* Modo compacto: logo · funcionalidades · login (inline à direita) */}
          {isCompact && (
            <div className="flex items-center gap-2">
              {logo && (
                <span className={cn('hidden items-center sm:flex', logoClass)}>
                  {logo}
                </span>
              )}

              {hasFunctions && (
                <div className="flex items-center gap-1" role="group" aria-label="Funcionalidades">
                  {functionItems!.map((fn) => (
                    <CircleButton
                      key={fn.id}
                      aria-label={fn.label}
                      density="small"
                      onClick={fn.onClick}
                    >
                      <span aria-hidden="true">{fn.icon}</span>
                    </CircleButton>
                  ))}
                </div>
              )}

              {(signIn || avatar) && (
                <div className="ml-1 flex items-center">
                  {authenticated ? avatar : signIn}
                </div>
              )}
            </div>
          )}

          {/* Busca mobile / compacto: ícone lupa */}
          {search && (
            <CircleButton
              aria-label="Buscar"
              density="small"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden"
            >
              <IconSearch />
            </CircleButton>
          )}

          {/* Busca desktop (standard): input sempre visível */}
          {search && !isCompact && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex lg:items-center"
              role="search"
              aria-label="Busca"
            >
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Campo de busca"
                className="w-[385px]"
                endAction={
                  <CircleButton
                    type="submit"
                    aria-label="Pesquisar"
                    density="small"
                  >
                    <IconSearch />
                  </CircleButton>
                }
              />
            </form>
          )}
        </div>

      </div>
    </header>
  )
}
