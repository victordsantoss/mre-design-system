'use client'
/**
 * Message — Padrão Digital de Governo (GovBR)
 *
 * Componente de feedback ao usuário sobre eventos do sistema.
 *
 * Variantes:
 *   standard  → bloco com fundo claro, ícone, título e botão fechar
 *   feedback  → inline contextual com fundo sólido (ao lado de inputs)
 *
 * Severidades: success | error | warning | info
 *
 * Acessibilidade:
 *   - role="alert" (standard) — lido imediatamente pelo screen reader
 *   - role="status" (feedback) — polite
 *   - Foco automático no botão fechar quando exibido
 *   - Não desaparece automaticamente
 */
import * as React from 'react'
import { cn } from '../utils/cn'

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export type MessageSeverity = 'success' | 'error' | 'warning' | 'info'
export type MessageVariant  = 'standard' | 'feedback'

export interface MessageProps {
  severity?: MessageSeverity
  variant?: MessageVariant
  title?: string
  children: React.ReactNode
  closable?: boolean
  onClose?: () => void
  icon?: React.ReactNode
  hideIcon?: boolean
  live?: 'polite' | 'assertive' | 'off'
  className?: string
  id?: string
}

// ─────────────────────────────────────────────
// Configuração de cores por severidade — GovBR
// ─────────────────────────────────────────────

const SEVERITY_CONFIG = {
  success: {
    bg:         'bg-success/10',          // tint suave — alinhado com MUI messageStandardTintAlpha
    bgSolid:    'bg-success',
    iconColor:  'text-success',
    textColor:  'text-success-foreground',
  },
  error: {
    bg:         'bg-destructive/10',
    bgSolid:    'bg-destructive',
    iconColor:  'text-destructive',
    textColor:  'text-destructive-foreground',
  },
  warning: {
    bg:         'bg-warning/20',
    bgSolid:    'bg-warning',
    iconColor:  'text-[#967117]',          // yellowVivid-50 para legibilidade
    textColor:  'text-warning-foreground',
  },
  info: {
    bg:         'bg-info/10',
    bgSolid:    'bg-info',
    iconColor:  'text-info',
    textColor:  'text-info-foreground',
  },
} as const

// ─────────────────────────────────────────────
// Ícones por severidade
// ─────────────────────────────────────────────

const SeverityIcon: Record<MessageSeverity, React.FC<{ className?: string }>> = {
  success: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={cn('h-5 w-5 shrink-0', className)} aria-hidden="true">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  ),
  error: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={cn('h-5 w-5 shrink-0', className)} aria-hidden="true">
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  ),
  warning: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={cn('h-5 w-5 shrink-0', className)} aria-hidden="true">
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  ),
  info: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={cn('h-5 w-5 shrink-0', className)} aria-hidden="true">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z" clipRule="evenodd" />
    </svg>
  ),
}

// Ícone fechar
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─────────────────────────────────────────────
// Componente Message
// ─────────────────────────────────────────────

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  function Message(
    {
      severity = 'info',
      variant = 'standard',
      title,
      children,
      closable = false,
      onClose,
      icon,
      hideIcon = false,
      live,
      className,
      id,
    },
    ref,
  ) {
    const config         = SEVERITY_CONFIG[severity]
    const closeButtonRef = React.useRef<HTMLButtonElement>(null)
    const [visible, setVisible] = React.useState(true)
    const isControlled   = onClose !== undefined

    const DefaultIcon    = SeverityIcon[severity]

    // Foco automático no botão fechar quando exibido
    React.useEffect(() => {
      if (closable && visible && closeButtonRef.current) {
        const timer = setTimeout(() => closeButtonRef.current?.focus(), 50)
        return () => clearTimeout(timer)
      }
    }, [closable, visible])

    const handleClose = () => {
      if (isControlled) onClose?.()
      else setVisible(false)
    }

    // ── Variante Feedback (inline contextual) ──
    if (variant === 'feedback') {
      return (
        <div
          ref={ref}
          id={id}
          role="status"
          aria-live={live ?? 'polite'}
          className={cn(
            // borderRadius: 2px (xs), padding: 4px (spacing-scale-half)
            // gap: 4px entre ícone e texto — alinhado com MUI StyledFeedback
            'inline-flex items-center gap-1 rounded-xs p-1',
            'text-gov-sm font-medium italic',
            config.bgSolid,
            config.textColor,
            className,
          )}
        >
          {!hideIcon && (
            <span className="flex items-center">
              {icon ?? <DefaultIcon />}
            </span>
          )}
          <span>{children}</span>
        </div>
      )
    }

    // ── Variante Standard — br-message ──
    if (!visible && !isControlled) return null

    return (
      <div
        ref={ref}
        id={id}
        role="alert"
        aria-live={live ?? 'assertive'}
        aria-atomic="true"
        className={cn(
          // borderRadius: 4px (sm) — alinhado com MUI StyledStandard
          // marginBottom: 16px (spacing-scale-2x)
          'mb-4 flex rounded-sm',
          config.bg,
          className,
        )}
      >
        {/* Ícone — px-4 (16px) em cada lado, centralizado verticalmente */}
        {!hideIcon && (
          <div className={cn('flex shrink-0 items-center justify-center self-center px-4', config.iconColor)}>
            {icon ?? <DefaultIcon />}
          </div>
        )}

        {/* Conteúdo — py-6 (24px), pr-2 (8px), pl-4 quando sem ícone */}
        <div className={cn('flex-1 py-6 pr-2 text-gov-base text-foreground', hideIcon ? 'pl-4' : '')}>
          {title && (
            <p className="mb-1 font-semibold leading-snug">{title}</p>
          )}
          <div className="font-normal leading-normal">{children}</div>
        </div>

        {/* Botão fechar — mr-2 mt-2 */}
        {closable && (
          <div className="mr-2 mt-2 shrink-0">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Fechar mensagem"
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded transition-colors',
                config.iconColor,
                'hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
              )}
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    )
  },
)

Message.displayName = 'Message'

/** Alias para compatibilidade */
export const Alert = Message

export { Message }
