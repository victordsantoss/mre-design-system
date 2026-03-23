'use client'
/**
 * Menu — Padrão Digital de Governo (GovBR)
 * Navegação principal: offCanvas (padrão), push e contextual (bottom sheet).
 * API alinhada ao pacote MUI @itamaraty-ds/components.
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
}

function MenuItemInternal({
  item,
  density,
  level = 0,
  activeId,
  onItemClick,
}: MenuItemInternalProps) {
  const [expanded, setExpanded] = React.useState(false)
  const hasChildren = Boolean(item.items?.length)
  const active = activeId != null && activeId !== '' ? item.id === activeId : Boolean(item.active)
  const py = DENSITY_PY[density]
  const padLeft = 16 - 4 + level * 24

  const handleActivate = () => {
    if (hasChildren) setExpanded((v) => !v)
    else {
      item.onClick?.(item)
      onItemClick?.(item)
    }
  }

  const content = (
    <>
      {item.icon ? <span className="flex w-10 shrink-0 justify-center text-inherit">{item.icon}</span> : null}
      <span className={cn('min-w-0 flex-1 text-base leading-snug', active ? 'font-semibold' : 'font-normal')}>
        {item.label}
      </span>
      {item.shortcut ? (
        <span className="shrink-0 text-xs text-muted-foreground">{item.shortcut}</span>
      ) : null}
      {item.badge != null && item.badge !== '' ? (
        <span className="flex h-[22px] min-w-[22px] shrink-0 items-center justify-center rounded-full bg-muted px-1.5 text-[0.7rem] font-semibold text-foreground">
          {item.badge}
        </span>
      ) : null}
      {hasChildren ? (
        <svg
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300', expanded && 'rotate-90')}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      ) : null}
    </>
  )

  const itemClass = cn(
    'flex w-full items-center gap-2 border-l-4 border-transparent text-left font-body transition-colors',
    py,
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    active && 'border-primary bg-primary/[0.06] font-semibold text-primary',
    !active && (item.danger ? 'text-destructive' : 'text-foreground'),
    item.disabled && 'pointer-events-none opacity-45',
  )

  const itemStyle = { paddingLeft: padLeft, paddingRight: 16 }

  return (
    <li className={cn('block w-full', item.divider && 'border-b border-border')}>
      {item.href && !hasChildren ? (
        <a
          href={item.href}
          className={itemClass}
          style={itemStyle}
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
          aria-expanded={hasChildren ? expanded : undefined}
          aria-current={active ? 'page' : undefined}
          onClick={handleActivate}
        >
          {content}
        </button>
      )}

      {hasChildren && expanded && (
        <ul className="m-0 list-none bg-accent/30 p-0">
          {item.items!.map((sub) => (
            <MenuItemInternal
              key={sub.id}
              item={sub}
              density={density}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
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
  const headerBar = resolveMenuHeaderBar(header, variant, logo, title)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  React.useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus()
  }, [open])

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
    >
      {headerBar ? (
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4">
          <div className="min-w-0 flex-1">
            {headerBar.logo}
            {headerBar.title ? (
              <p className="font-heading text-up-01 font-semibold text-foreground">{headerBar.title}</p>
            ) : null}
          </div>
          {headerBar.showClose ? (
            <button
              ref={closeRef}
              type="button"
              aria-label="Fechar menu"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-2" aria-label="Menu principal">
        {folders.map((folder, fi) => (
          <div key={folder.id ?? folder.title ?? `folder-${fi}`} className="border-b border-border last:border-b-0">
            {folder.title ? (
              <p className="px-4 pb-1 pt-3 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {folder.title}
              </p>
            ) : null}
            <ul className="m-0 list-none p-0">
              {folder.items.map((item) => (
                <MenuItemInternal
                  key={item.id}
                  item={item}
                  density={density}
                  activeId={activeId}
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

