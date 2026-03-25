'use client'
/**
 * Menu — Padrão Digital de Governo (GovBR)
 *
 * Anatomia (GovBR DS):
 *  1  Ícone de acionamento   — Button (externo ao componente)
 *  2  Superfície scrim       — condicional (offCanvas / contextual)
 *  3  Cabeçalho do menu      — logo + título + botão Fechar
 *  4  Botão Fechar           — Button
 *  5  Item de 1º nível       — Item (Drop Menu → accordion)
 *  6  Item de 2º nível       — Item (Side Menu → drill-down / link)
 *  7  Ícone Expandir/Retrair — chevron auto via Item.onToggle (Drop Menu)
 *                              angle-right / angle-left (Side Menu)
 *  8  Ícone representativo   — slot icon em MenuItemDef
 *  9  Ícone Acessar Subitens — angle-right nos itens Side Menu
 * 10  Divider               — Divider
 * 11  Painel do menu         — MenuDrawerSurface (obrigatório)
 * 12  Rodapé do menu         — slot footer (React.ReactNode)
 *
 * Distinção Drop Menu × Side Menu (conforme br-menu reference):
 * - Drop Menu  → filho imediato de .menu-folder (level === 0):
 *   accordion, chevron-down rotaciona 180°
 * - Side Menu  → nível > 0 com filhos:
 *   drill-down, angle-right → painel substitui a lista, angle-left no botão voltar
 */
import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import { Item } from '../Item'
import { Divider } from '../Divider'
import { MenuDrawerSurface } from './MenuDrawerSurface'
import { Button, CircleButton } from '../Button/Button'
import { Typography } from '../Typography/Typography'

/* ------------------------------------------------------------------ tipos */

export type MenuDensity = 'small' | 'medium' | 'large'
export type MenuVariant = 'offCanvas' | 'push' | 'contextual'
export type MenuHeaderMode = 'auto' | 'title' | 'logo' | 'none'

export interface MenuItemDef {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: (item: MenuItemDef) => void
  active?: boolean
  disabled?: boolean
  danger?: boolean
  shortcut?: string
  badge?: string | number
  /** Adiciona Divider após este item */
  divider?: boolean
  items?: MenuItemDef[]
}

export interface MenuFolder {
  id?: string
  /** Rótulo fixo do agrupamento (agrupamento por rótulos — sem accordion) */
  title?: string
  items: MenuItemDef[]
}

export interface MenuProps {
  open: boolean
  onClose: () => void
  variant?: MenuVariant
  logo?: React.ReactNode
  title?: string
  header?: MenuHeaderMode
  folders?: MenuFolder[]
  /**
   * Rodapé do menu — área 12.
   * Use `MenuLogos`, `MenuLinks`, `MenuSocial` e `MenuInfo` para compor.
   */
  footer?: React.ReactNode
  density?: MenuDensity
  activeId?: string
  onItemClick?: (item: MenuItemDef) => void
  width?: number | string
  children?: React.ReactNode
}

/* ------------------------------------------------ constantes */

const DENSITY_PY: Record<MenuDensity, string> = {
  small: 'py-2',
  medium: 'py-4',
  large: 'py-6',
}

const MENU_WIDTH = 300
const INDENT_BASE = 16    // px — nível 0
const INDENT_STEP = 24    // px — incremento por nível

/* ------------------------------------------------ helpers de header */

function resolveMenuHeaderBar(
  header: MenuHeaderMode | undefined,
  variant: MenuVariant,
  logo?: React.ReactNode,
  title?: string,
): { showClose: boolean; logo?: React.ReactNode; title?: string } | null {
  if (variant === 'push') return null
  const mode = header ?? 'auto'
  const hasTitle = Boolean(title?.trim())
  const hasLogo = logo != null
  if (mode === 'none') return null
  if (mode === 'title')
    return { showClose: true, title: hasTitle ? title!.trim() : undefined }
  if (mode === 'logo')
    return { showClose: true, logo: hasLogo ? logo : undefined }
  if (!hasLogo && !hasTitle) return null
  return { showClose: true, logo: hasLogo ? logo : undefined, title: hasTitle ? title!.trim() : undefined }
}

/* ------------------------------------------------ ícones internos */

function AngleRight() {
  return (
    <svg className="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function AngleLeft() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* ------------------------------------------------ SideMenuBackButton */

/**
 * Botão Voltar do Side Menu (drill-down).
 * Renderizado no topo do painel quando há drill-down ativo.
 * Reproduz `.side-menu.active > .menu-item` do GovBR DS (flex-row-reverse equivalente).
 */
function SideMenuBackButton({
  item,
  density,
  onBack,
}: {
  item: MenuItemDef
  density: MenuDensity
  onBack: () => void
}) {
  return (
    <Button
      emphasis="tertiary"
      block
      onClick={onBack}
      className={cn(
        'justify-start rounded-none border-b border-border bg-background px-4 gap-3',
        DENSITY_PY[density],
      )}
    >
      {/* ← angle-left — lado esquerdo (row-reverse do GovBR DS) */}
      <AngleLeft />
      {item.icon && (
        <span className="flex w-8 shrink-0 items-center justify-center text-primary" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <Typography variant="body1" as="span" color="inherit" style={{ fontSize: undefined }} className="flex-1 text-base">
        {item.label}
      </Typography>
    </Button>
  )
}

/* ------------------------------------------------ MenuItemInternal */

interface MenuItemInternalProps {
  item: MenuItemDef
  density: MenuDensity
  level?: number
  activeId?: string
  onItemClick?: (item: MenuItemDef) => void
  expandedIds: Set<string>
  onDropMenuToggle: (id: string) => void
  onSideMenuNavigate?: (item: MenuItemDef) => void
  parentId?: string
}

function MenuItemInternal({
  item,
  density,
  level = 0,
  activeId,
  onItemClick,
  expandedIds,
  onDropMenuToggle,
  onSideMenuNavigate,
  parentId,
}: MenuItemInternalProps) {
  const hasChildren = Boolean(item.items?.length)
  const isDropMenu = level === 0 && hasChildren   // Drop Menu: accordion
  const isSideMenu = level > 0 && hasChildren     // Side Menu: drill-down
  const expanded = expandedIds.has(item.id)
  const active = activeId != null && activeId !== '' ? item.id === activeId : Boolean(item.active)

  const padLeft = INDENT_BASE + level * INDENT_STEP

  const handleActivate = () => {
    if (isDropMenu) {
      onDropMenuToggle(item.id)
    } else if (isSideMenu) {
      onSideMenuNavigate?.(item)
    } else {
      item.onClick?.(item)
      onItemClick?.(item)
    }
  }

  /*
   * Conteúdo interno:
   * - Ícone representativo (8) — w-8 shrink-0
   * - Rótulo — flex-1
   * - Atalho / badge — shrink-0
   * - Ícone Side Menu (9) — angle-right, apenas quando isSideMenu
   *   (o chevron do Drop Menu é injetado automaticamente pelo Item via onToggle)
   */
  const itemContent = (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      {item.icon ? (
        <span className="flex w-8 shrink-0 items-center justify-center text-inherit" aria-hidden="true">
          {item.icon}
        </span>
      ) : null}
      <Typography
        variant="body1"
        as="span"
        color="inherit"
        style={{ fontSize: undefined }}
        className={cn('min-w-0 flex-1 text-base leading-snug', active ? 'font-semibold' : 'font-normal')}
      >
        {item.label}
      </Typography>
      {item.shortcut ? (
        <span className="shrink-0 text-xs text-muted-foreground" aria-hidden="true">
          {item.shortcut}
        </span>
      ) : null}
      {item.badge != null && item.badge !== '' ? (
        <span className="flex h-[22px] min-w-[22px] shrink-0 items-center justify-center rounded-full bg-muted px-1.5 text-[0.7rem] font-semibold text-foreground">
          {item.badge}
        </span>
      ) : null}
      {/* Ícone Acessar Subitens (9) — apenas em Side Menu */}
      {isSideMenu ? <AngleRight /> : null}
    </span>
  )

  return (
    <li
      className="block w-full"
      role="none"
      data-item-id={item.id}
      data-has-children={hasChildren ? 'true' : undefined}
      data-parent-id={parentId}
    >
      <Item
        href={!hasChildren ? item.href : undefined}
        /*
         * Drop Menu: apenas onToggle — Item já chama onDropMenuToggle internamente.
         * Passar onClick também causaria toggle duplo (abrir + fechar imediato).
         * Side Menu / leaf: onClick = handleActivate.
         */
        onClick={!isDropMenu ? handleActivate : undefined}
        onToggle={isDropMenu ? () => onDropMenuToggle(item.id) : undefined}
        expanded={isDropMenu ? expanded : undefined}
        active={active}
        disabled={item.disabled}
        density={density}
        role="treeitem"
        aria-current={active ? 'page' : undefined}
        aria-haspopup={hasChildren ? 'true' : undefined}
        className={cn(
          'border-l-4',
          active ? 'border-primary' : 'border-transparent',
          item.danger && !active && '!text-destructive',
          /* Item de 2º nível+: fundo muted conforme spec GovBR */
          level > 0 && 'bg-muted',
        )}
        style={{ paddingLeft: padLeft, paddingRight: INDENT_BASE }}
      >
        {itemContent}
      </Item>

      {/* Divider após item (área 10) */}
      {item.divider && <Divider className="my-0" />}

      {/* Drop Menu: filhos expandidos inline (accordion) */}
      {isDropMenu && expanded && (
        <ul className="m-0 list-none p-0" role="group">
          {item.items!.map((sub) => (
            <MenuItemInternal
              key={sub.id}
              item={sub}
              density={density}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
              expandedIds={expandedIds}
              onDropMenuToggle={onDropMenuToggle}
              onSideMenuNavigate={onSideMenuNavigate}
              parentId={item.id}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

/* --------------------------------------------------------------- Menu */

export function Menu({
  open,
  onClose,
  variant = 'offCanvas',
  logo,
  title,
  header,
  folders = [],
  footer,
  density = 'medium',
  activeId,
  onItemClick,
  width = MENU_WIDTH,
  children,
}: MenuProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const prevFocusRef = React.useRef<Element | null>(null)
  const titleId = React.useId()

  /** Ids dos Drop Menus expandidos (accordion, nível 0) */
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())
  /**
   * Pilha de navegação Side Menu (drill-down).
   * Cada item empilhado representa um nível aprofundado.
   */
  const [sideMenuPath, setSideMenuPath] = React.useState<MenuItemDef[]>([])

  const headerBar = resolveMenuHeaderBar(header, variant, logo, title)

  /** Item mais profundo da pilha (painel atual do Side Menu) */
  const sideMenuCurrent = sideMenuPath[sideMenuPath.length - 1] ?? null

  const toggleDropMenu = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  /** Aprofunda um nível no Side Menu */
  const navigateSideMenu = React.useCallback((item: MenuItemDef) => {
    setSideMenuPath((prev) => [...prev, item])
  }, [])

  /** Volta um nível no Side Menu */
  const backSideMenu = React.useCallback(() => {
    setSideMenuPath((prev) => prev.slice(0, -1))
  }, [])

  /* Fecha com Escape */
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sideMenuPath.length > 0) backSideMenu()
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, sideMenuPath, backSideMenu])

  /* Foco: captura antes de abrir; restaura ao fechar + reset de estado */
  React.useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement
      closeRef.current?.focus()
    } else {
      setExpandedIds(new Set())
      setSideMenuPath([])
      ;(prevFocusRef.current as HTMLElement | null)?.focus()
    }
  }, [open])

  /* Navegação por teclado (Arrow keys, Home, End, Backspace para Side Menu) */
  const handleNavKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const nav = navRef.current
      if (!nav) return

      /* Backspace no Side Menu = voltar */
      if (e.key === 'Backspace' && sideMenuPath.length > 0) {
        e.preventDefault()
        backSideMenu()
        return
      }

      const items = Array.from(
        nav.querySelectorAll<HTMLElement>('[role="treeitem"]:not([disabled]):not([aria-disabled="true"])'),
      )
      const focused = document.activeElement as HTMLElement
      const idx = items.indexOf(focused)

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          items[(idx + 1) % items.length]?.focus()
          break

        case 'ArrowUp':
          e.preventDefault()
          items[(idx - 1 + items.length) % items.length]?.focus()
          break

        case 'Home':
          e.preventDefault()
          items[0]?.focus()
          break

        case 'End':
          e.preventDefault()
          items[items.length - 1]?.focus()
          break

        case 'ArrowRight': {
          const li = focused.closest('li[data-item-id]') as HTMLElement | null
          const itemId = li?.dataset.itemId
          if (itemId && li?.dataset.hasChildren === 'true' && !expandedIds.has(itemId)) {
            e.preventDefault()
            toggleDropMenu(itemId)
            requestAnimationFrame(() => {
              nav
                .querySelector<HTMLElement>(`li[data-parent-id="${itemId}"] [role="treeitem"]`)
                ?.focus()
            })
          }
          break
        }

        case 'ArrowLeft': {
          const li = focused.closest('li[data-item-id]') as HTMLElement | null
          const itemId = li?.dataset.itemId
          const parentItemId = li?.dataset.parentId
          if (itemId && expandedIds.has(itemId)) {
            e.preventDefault()
            toggleDropMenu(itemId)
          } else if (parentItemId) {
            e.preventDefault()
            nav
              .querySelector<HTMLElement>(`li[data-item-id="${parentItemId}"] [role="treeitem"]`)
              ?.focus()
          } else if (sideMenuPath.length > 0) {
            e.preventDefault()
            backSideMenu()
          }
          break
        }
      }
    },
    [expandedIds, toggleDropMenu, sideMenuPath, backSideMenu],
  )

  if (!open || typeof document === 'undefined') return null

  const w = typeof width === 'number' ? `${width}px` : width

  const panel = (
    <MenuDrawerSurface
      anchor={variant === 'contextual' ? 'bottom' : 'left'}
      className={cn(variant === 'contextual' && 'rounded-t-xl')}
      style={{
        width: variant === 'contextual' ? '100%' : w,
        maxWidth: variant === 'contextual' ? '100%' : w,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {!headerBar && (
        <span id={titleId} className="sr-only">
          {title ?? 'Menu'}
        </span>
      )}

      {/* ─── Área 3 — Cabeçalho do menu ─── */}
      {headerBar ? (
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4">
          <div className="min-w-0 flex-1">
            {headerBar.logo}
            {headerBar.title ? (
              <Typography id={titleId} variant="h5" as="p" weight="semibold">
                {headerBar.title}
              </Typography>
            ) : (
              <span id={titleId} className="sr-only">
                {title ?? 'Menu'}
              </span>
            )}
          </div>
          {/* ─── Área 4 — Botão fechar ─── */}
          {headerBar.showClose ? (
            <CircleButton
              ref={closeRef}
              density="small"
              aria-label="Fechar menu"
              onClick={onClose}
            >
              <CloseIcon />
            </CircleButton>
          ) : null}
        </div>
      ) : null}

      {/* ─── Áreas 5-10 — Navegação ─── */}
      <nav
        ref={navRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-2"
        aria-label="Menu principal"
        onKeyDown={handleNavKeyDown}
      >
        {sideMenuCurrent ? (
          /*
           * Modo drill-down (Side Menu ativo):
           * Reproduz `.side-menu.active` do GovBR DS —
           * botão voltar no topo + filhos do item ativo.
           */
          <>
            <SideMenuBackButton
              item={sideMenuCurrent}
              density={density}
              onBack={backSideMenu}
            />
            <ul
              className="m-0 list-none p-0"
              role="group"
              aria-label={sideMenuCurrent.label}
            >
              {sideMenuCurrent.items!.map((item) => (
                <MenuItemInternal
                  key={item.id}
                  item={item}
                  density={density}
                  level={0}
                  activeId={activeId}
                  onItemClick={(it) => {
                    onItemClick?.(it)
                    if (!it.items?.length) onClose()
                  }}
                  expandedIds={expandedIds}
                  onDropMenuToggle={toggleDropMenu}
                  onSideMenuNavigate={navigateSideMenu}
                />
              ))}
            </ul>
          </>
        ) : (
          /*
           * Modo normal: pastas com Drop Menu (accordion) e
           * dividers entre agrupamentos.
           */
          folders.map((folder, fi) => (
            <React.Fragment key={folder.id ?? folder.title ?? `folder-${fi}`}>
              {fi > 0 && <Divider className="my-0" />}

              {folder.title ? (
                <Typography
                  variant="overline"
                  as="p"
                  color="muted"
                  style={{ fontSize: undefined }}
                  className={cn('px-4 pb-1 tracking-wide', fi > 0 ? 'pt-3' : 'pt-2')}
                  aria-hidden="true"
                >
                  {folder.title}
                </Typography>
              ) : null}

              <ul
                className="m-0 list-none p-0"
                role="tree"
                aria-label={folder.title ?? 'Menu'}
              >
                {folder.items.map((item) => (
                  <MenuItemInternal
                    key={item.id}
                    item={item}
                    density={density}
                    activeId={activeId}
                    expandedIds={expandedIds}
                    onDropMenuToggle={toggleDropMenu}
                    onSideMenuNavigate={navigateSideMenu}
                    onItemClick={(it) => {
                      onItemClick?.(it)
                      if (!it.items?.length) onClose()
                    }}
                  />
                ))}
              </ul>
            </React.Fragment>
          ))
        )}
        {children}
      </nav>

      {/* ─── Área 12 — Rodapé do menu ─── */}
      {footer ? (
        <div className="mt-auto border-t border-border px-4 py-4">{footer}</div>
      ) : null}
    </MenuDrawerSurface>
  )

  return createPortal(
    <>
      {/* ─── Área 2 — Superfície scrim ─── */}
      {(variant === 'offCanvas' || variant === 'contextual') && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-[1190] bg-black/45"
          onClick={onClose}
        />
      )}
      {panel}
    </>,
    document.body,
  )
}
