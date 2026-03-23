'use client'
/**
 * Modal — Padrão Digital de Governo (GovBR)
 *
 * Scrim institucional azul navy, painel branco, cabeçalho com título
 * e botão fechar em azul, conteúdo e faixa de ações com divisória superior.
 *
 * Implementado sobre o elemento <dialog> nativo do HTML5 para máxima
 * acessibilidade (foco, Escape, aria-labelledby, aria-modal).
 */
import * as React from 'react'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export interface ModalProps {
  open: boolean
  onClose?: () => void
  /** Título exibido no cabeçalho */
  title?: React.ReactNode
  children: React.ReactNode
  /** Botões ou conteúdo do rodapé */
  actions?: React.ReactNode
  /** Botão X no canto superior direito */
  showCloseButton?: boolean
  /** Rótulo acessível do botão fechar */
  closeButtonAriaLabel?: string
  /** Linha divisória abaixo do cabeçalho */
  titleDivider?: boolean
  /**
   * Largura máxima do painel.
   * @default 'sm'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Raio dos cantos do painel */
  paperBorderRadius?: number
  className?: string
  id?: string
}

// ─────────────────────────────────────────────
// Larguras por maxWidth
// ─────────────────────────────────────────────

const MAX_WIDTH_CLASS: Record<NonNullable<ModalProps['maxWidth']>, string> = {
  xs:   'max-w-sm',
  sm:   'max-w-lg',
  md:   'max-w-2xl',
  lg:   'max-w-4xl',
  xl:   'max-w-6xl',
  full: 'max-w-[calc(100vw-48px)]',
}

// Ícone fechar
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-5 w-5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─────────────────────────────────────────────
// Componente Modal
// ─────────────────────────────────────────────

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  function Modal(
    {
      open,
      onClose,
      title,
      children,
      actions,
      showCloseButton = true,
      closeButtonAriaLabel = 'Fechar',
      titleDivider = false,
      maxWidth = 'sm',
      paperBorderRadius = 0,
      className,
      id,
    },
    ref,
  ) {
    const dialogRef = React.useRef<HTMLDialogElement | null>(null)
    const titleId   = React.useId()

    // Sincroniza open com o dialog nativo
    React.useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      if (open) {
        if (!dialog.open) dialog.showModal()
      } else {
        if (dialog.open) dialog.close()
      }
    }, [open])

    // Fechar ao pressionar Escape ou clicar no backdrop
    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const rect = (e.currentTarget as HTMLDialogElement).getBoundingClientRect()
      const isBackdrop =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom
      if (isBackdrop) onClose?.()
    }

    const handleClose = () => onClose?.()

    const hasHeader  = title != null || showCloseButton
    const showDivider = titleDivider && title != null
    const widthClass  = MAX_WIDTH_CLASS[maxWidth]

    const borderRadiusStyle = paperBorderRadius > 0
      ? { borderRadius: `${paperBorderRadius}px` }
      : undefined

    return (
      <dialog
        ref={(node) => {
          // Repassa a ref externa e a interna
          ;(dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node
        }}
        id={id}
        aria-labelledby={title != null ? titleId : undefined}
        aria-modal="true"
        onClick={handleDialogClick}
        onClose={handleClose}
        className={cn(
          // Scrim GovBR: backdrop azul navy semitransparente
          'backdrop:bg-[var(--color-overlay)]',
          // Painel
          'relative m-auto w-full overflow-hidden bg-background font-body text-foreground',
          'shadow-modal',
          widthClass,
          // Reset dialog padrão
          'border-0 p-0',
          className,
        )}
        style={borderRadiusStyle}
      >
        {/* ── Cabeçalho ── */}
        {hasHeader && (
          <div
            className={cn(
              'flex items-start justify-between gap-4 px-6 pt-6',
              title != null ? 'pb-4' : 'pb-3',
              showDivider && 'border-b border-border',
            )}
          >
            <div className="min-w-0 flex-1">
              {title != null ? (
                typeof title === 'string' ? (
                  <h2
                    id={titleId}
                    className="font-heading text-up-03 font-semibold leading-tight text-foreground"
                  >
                    {title}
                  </h2>
                ) : (
                  <div id={titleId}>{title}</div>
                )
              ) : null}
            </div>

            {showCloseButton && (
              <button
                type="button"
                aria-label={closeButtonAriaLabel}
                onClick={handleClose}
                className={cn(
                  'mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded',
                  'text-primary transition-colors hover:bg-primary/10',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
                )}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* ── Conteúdo ── */}
        <div
          className={cn(
            'px-6 py-6 font-body text-up-01 leading-normal text-foreground',
            hasHeader ? 'pt-4' : 'pt-6',
          )}
        >
          {children}
        </div>

        {/* ── Rodapé com ações ── */}
        {actions != null && (
          <div
            className={cn(
              'flex flex-wrap items-center justify-end gap-3 border-t border-border',
              'bg-background px-6 py-4 font-body',
            )}
          >
            {actions}
          </div>
        )}
      </dialog>
    )
  },
)

Modal.displayName = 'Modal'

export { Modal }
