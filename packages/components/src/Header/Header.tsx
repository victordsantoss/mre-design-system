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

function IconClose({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={size === 'md' ? 'h-5 w-5' : 'h-4 w-4'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* -------------------------------------------- componente HeaderIconButton */

interface HeaderIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: 'sm' | 'md'
}

function HeaderIconButton({ label, size = 'sm', className, children, ...rest }: HeaderIconButtonProps) {
  const dim = size === 'md' ? 'h-9 w-9' : 'h-8 w-8'
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full text-primary',
        'hover:bg-primary/10',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
        dim,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
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

  /* -------------------- tipografia do título (responsiva + modo) */
  const titleClass = cn(
    'font-heading uppercase text-foreground line-clamp-2 font-normal',
    isCompact
      ? 'text-base sm:text-up-01 lg:text-up-02'
      : 'text-base sm:text-up-02 lg:text-up-03',
  )

  const subtitleClass = cn(
    'font-medium text-muted-foreground mt-[4px]',
    'hidden sm:block',        // oculto em mobile (4 cols)
    'text-down-01 lg:text-base',
  )

  /* Logo: tamanho varia por modo */
  const logoClass = isCompact
    ? '[&_img]:h-4 [&_svg]:h-4 sm:[&_img]:h-6 sm:[&_svg]:h-6'         // small (16/24px)
    : '[&_img]:h-10 [&_svg]:h-10 sm:[&_img]:h-6 sm:[&_svg]:h-6 lg:[&_img]:h-10 lg:[&_svg]:h-10' // large no desktop, medium no tablet

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
              <input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Campo de busca"
                className={cn(
                  'flex-1 rounded-md border-none bg-muted px-4 py-2',
                  'text-up-01 font-medium placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                )}
                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              />
            </form>
            <HeaderIconButton label="Fechar busca" size="md" onClick={closeSearch}>
              <IconClose size="md" />
            </HeaderIconButton>
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
                  <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
                )}
                {sign && (
                  <span className="hidden text-base font-medium text-muted-foreground sm:block">
                    {sign}
                  </span>
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
              <div
                className="flex items-center gap-1"
                role="group"
                aria-label="Funcionalidades"
              >
                {functionItems!.map((fn) => (
                  <HeaderIconButton key={fn.id} label={fn.label} onClick={fn.onClick}>
                    <span aria-hidden="true">{fn.icon}</span>
                  </HeaderIconButton>
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
            <HeaderIconButton
              label="Abrir menu principal"
              onClick={onMenuClick}
              className={cn(!isCompact && 'sm:self-start sm:mt-0.5')}
            >
              <IconMenu />
            </HeaderIconButton>
          )}

          {/* Título + subtítulo */}
          <div className="min-w-0 flex-1">
            {titleHref ? (
              <a
                href={titleHref}
                className={cn(titleClass, 'block no-underline hover:underline')}
              >
                {title}
              </a>
            ) : (
              <span className={titleClass}>{title}</span>
            )}

            {subtitle && !isCompact && (
              subtitleHref ? (
                <a
                  href={subtitleHref}
                  className={cn(subtitleClass, 'block no-underline hover:underline')}
                >
                  {subtitle}
                </a>
              ) : (
                <span className={subtitleClass}>{subtitle}</span>
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
                    <HeaderIconButton key={fn.id} label={fn.label} onClick={fn.onClick}>
                      <span aria-hidden="true">{fn.icon}</span>
                    </HeaderIconButton>
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
            <HeaderIconButton
              label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden"
            >
              <IconSearch />
            </HeaderIconButton>
          )}

          {/* Busca desktop (standard): input sempre visível */}
          {search && !isCompact && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex lg:items-center"
              role="search"
              aria-label="Busca"
            >
              <div className="relative flex items-center">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Campo de busca"
                  className={cn(
                    'w-[385px] rounded-md border-none bg-muted py-2 pl-4 pr-10',
                    'text-up-01 font-medium placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                  )}
                />
                <button
                  type="submit"
                  aria-label="Pesquisar"
                  className={cn(
                    'absolute right-2 text-primary',
                    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                    'rounded',
                  )}
                >
                  <IconSearch />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </header>
  )
}
