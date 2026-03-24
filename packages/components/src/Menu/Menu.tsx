'use client'
/**
 * Menu — Padrão Digital de Governo (GovBR)
 * Navegação principal: offCanvas (padrão), push e contextual (bottom sheet).
 * API alinhada ao pacote MUI @itamaraty-ds/components.
 *
 * Conformidade GovBR DS (@govbr-ds/core):
 * - role="dialog" + aria-modal + aria-labelledby no painel
 * - role="tree" nas listas, role="treeitem" nos itens, role="group" em submenus
 * - aria-haspopup, aria-expanded, aria-hidden em ícones decorativos
 * - Navegação por teclado: Arrow Up/Down/Left/Right, Home, End
 * - Focus ring 3px/4px conforme padrão GovBR
 * - Chevron-down rotacionando 180° ao expandir
 * - Background de submenu: gray-2 (#F8F8F8 / --color-muted)
 * - Restauração de foco ao fechar o menu
 */
import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import { MenuDrawerSurface } from './MenuDrawerSurface'

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
  divider?: boolean
  items?: MenuItemDef[]
}

export interface MenuFolder {
  id?: string
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
  footer?: React.ReactNode
  density?: MenuDensity
  activeId?: string
  onItemClick?: (item: MenuItemDef) => void
  width?: number | string
  children?: React.ReactNode
}

const DENSITY_PY: Record<MenuDensity, string> = {
  small: 'py-2',
  medium: 'py-4',
  large: 'py-6',
}

const MENU_WIDTH = 300

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

interface MenuItemInternalProps {
  item: MenuItemDef
  density: MenuDensity
  level?: number
  activeId?: string
  onItemClick?: (item: MenuItemDef) => void
  expandedIds: Set<string>
  onToggle: (id: string) => void
  parentId?: string
}

function MenuItemInternal({
  item,
  density,
  level = 0,
  activeId,
  onItemClick,
  expandedIds,
  onToggle,
  parentId,
}: MenuItemInternalProps) {
  const hasChildren = Boolean(item.items?.length)
  const expanded = expandedIds.has(item.id)
  const active = activeId != null && activeId !== '' ? item.id === activeId : Boolean(item.active)
  const py = DENSITY_PY[density]
  const padLeft = 16 - 4 + level * 24

  const handleActivate = () => {
    if (hasChildren) onToggle(item.id)
    else {
      item.onClick?.(item)
      onItemClick?.(item)
    }
  }

  const content = (
    <>
      {item.icon ? (
        <span className="flex w-10 shrink-0 justify-center text-inherit" aria-hidden="true">
          {item.icon}
        </span>
      ) : null}
      <span className={cn('min-w-0 flex-1 text-base leading-snug', active ? 'font-semibold' : 'font-normal')}>
        {item.label}
      </span>
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
      {hasChildren ? (
        <svg
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
            expanded && 'rotate-180',
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      ) : null}
    </>
  )

  const itemClass = cn(
    'flex w-full items-center gap-2 border-l-4 border-transparent text-left font-body transition-colors',
    py,
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
    active && 'border-primary bg-primary/[0.06] font-semibold text-primary',
    !active && (item.danger ? 'text-destructive' : 'text-foreground'),
    item.disabled && 'pointer-events-none opacity-45',
  )

  const itemStyle = { paddingLeft: padLeft, paddingRight: 16 }

  return (
    <li className={cn('block w-full', item.divider && 'border-b border-border')} role="none">
      {item.href && !hasChildren ? (
        <a
          href={item.href}
          className={itemClass}
          style={itemStyle}
          role="treeitem"
          data-item-id={item.id}
          data-parent-id={parentId}
          aria-current={active ? 'page' : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={itemClass}
          style={itemStyle}
          disabled={item.disabled}
          role="treeitem"
          data-item-id={item.id}
          data-has-children={hasChildren ? 'true' : undefined}
          data-parent-id={parentId}
          aria-expanded={hasChildren ? expanded : undefined}
          aria-haspopup={hasChildren ? 'true' : undefined}
          aria-current={active ? 'page' : undefined}
          onClick={handleActivate}
        >
          {content}
        </button>
      )}

      {hasChildren && expanded && (
        <ul className="m-0 list-none bg-muted p-0" role="group">
          {item.items!.map((sub) => (
            <MenuItemInternal
              key={sub.id}
              item={sub}
              density={density}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
              expandedIds={expandedIds}
              onToggle={onToggle}
              parentId={item.id}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

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

  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())

  const headerBar = resolveMenuHeaderBar(header, variant, logo, title)

  const toggleExpanded = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Fecha o menu com Escape
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Foco: captura elemento ativo antes de abrir; restaura ao fechar
  React.useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement
      closeRef.current?.focus()
    } else {
      setExpandedIds(new Set())
      ;(prevFocusRef.current as HTMLElement | null)?.focus()
    }
  }, [open])

  // Navegação por teclado no menu (Arrow keys, Home, End)
  const handleNavKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const nav = navRef.current
      if (!nav) return

      const items = Array.from(
        nav.querySelectorAll<HTMLElement>('[role="treeitem"]:not([disabled])'),
      )
      const focused = document.activeElement
      const idx = items.indexOf(focused as HTMLElement)

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
          const el = focused as HTMLElement
          const itemId = el.dataset.itemId
          if (itemId && el.dataset.hasChildren === 'true' && !expandedIds.has(itemId)) {
            e.preventDefault()
            toggleExpanded(itemId)
            // Foca o primeiro filho após expandir
            requestAnimationFrame(() => {
              const firstChild = nav.querySelector<HTMLElement>(
                `[data-parent-id="${itemId}"]`,
              )
              firstChild?.focus()
            })
          }
          break
        }

        case 'ArrowLeft': {
          const el = focused as HTMLElement
          const itemId = el.dataset.itemId
          const parentItemId = el.dataset.parentId
          if (itemId && expandedIds.has(itemId)) {
            // Colapsa o item expandido atual
            e.preventDefault()
            toggleExpanded(itemId)
          } else if (parentItemId) {
            // Volta ao item pai
            e.preventDefault()
            const parentEl = nav.querySelector<HTMLElement>(
              `[data-item-id="${parentItemId}"]`,
            )
            parentEl?.focus()
          }
          break
        }
      }
    },
    [expandedIds, toggleExpanded],
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
      {/* Título acessível: visível no header ou sr-only quando não há header */}
      {!headerBar && (
        <span id={titleId} className="sr-only">
          {title ?? 'Menu'}
        </span>
      )}

      {headerBar ? (
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4">
          <div className="min-w-0 flex-1">
            {headerBar.logo}
            {headerBar.title ? (
              <p id={titleId} className="font-heading text-up-01 font-semibold text-foreground">
                {headerBar.title}
              </p>
            ) : (
              <span id={titleId} className="sr-only">
                {title ?? 'Menu'}
              </span>
            )}
          </div>
          {headerBar.showClose ? (
            <button
              ref={closeRef}
              type="button"
              aria-label="Fechar menu"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}

      <nav
        ref={navRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-2"
        aria-label="Menu principal"
        onKeyDown={handleNavKeyDown}
      >
        {folders.map((folder, fi) => (
          <div
            key={folder.id ?? folder.title ?? `folder-${fi}`}
            className="border-b border-border last:border-b-0"
          >
            {folder.title ? (
              <p
                className="px-4 pb-1 pt-3 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                aria-hidden="true"
              >
                {folder.title}
              </p>
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
                  onToggle={toggleExpanded}
                  onItemClick={(it) => {
                    onItemClick?.(it)
                    if (!it.items?.length) onClose()
                  }}
                />
              ))}
            </ul>
          </div>
        ))}
        {children}
      </nav>

      {footer ? (
        <div className="mt-auto border-t border-border px-4 py-4">{footer}</div>
      ) : null}
    </MenuDrawerSurface>
  )

  return createPortal(
    <>
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
