'use client'
/**
 * Message (Mensagem) — MRE / GovBR
 *
 * Superfície de feedback ao utilizador. Cores, tipografia e espaçamentos alinhados ao guia
 * de Message do Padrão Digital (tokens em `@ds/tokens`: paletas + escala de espaçamento).
 *
 * Tipos: `standard` (padrão — contexto global à página/secção) | `feedback` (contextual ao componente).
 * Severidades: `success` | `error` | `warning` | `info`.
 *
 * O botão fechar só aplica ao tipo **padrão**; no tipo contextual é ignorado (GovBR).
 */
import * as React from 'react'
import {
  blueWarmVivid,
  greenCoolVivid,
  redVivid,
  yellowVivid,
  gray,
  pure,
} from '@ds/tokens'
import { cn } from '../utils/cn'

export type MessageSeverity = 'success' | 'error' | 'warning' | 'info'
export type MessageVariant = 'standard' | 'feedback'

export interface MessageProps {
  severity?: MessageSeverity
  variant?: MessageVariant
  title?: string
  /** Quando `true`, título e mensagem na mesma linha (com quebra responsiva). */
  titleInline?: boolean
  children: React.ReactNode
  closable?: boolean
  onClose?: () => void
  icon?: React.ReactNode
  hideIcon?: boolean
  live?: 'polite' | 'assertive' | 'off'
  className?: string
  id?: string
}

/** Paleta Message — espelha tabelas de especificação GovBR (primitivos @ds/tokens). */
const MESSAGE_VISUALS: Record<
  MessageSeverity,
  {
    surfaceStandard: string
    surfaceContext: string
    icon: string
    title: string
    messageStandard: string
    messageContext: string
    close: string
  }
> = {
  info: {
    surfaceStandard: blueWarmVivid[10],
    surfaceContext: blueWarmVivid[60],
    icon: blueWarmVivid[60],
    title: gray[80],
    messageStandard: gray[80],
    messageContext: pure[0],
    close: blueWarmVivid[60],
  },
  success: {
    surfaceStandard: greenCoolVivid[5],
    surfaceContext: greenCoolVivid[50],
    icon: greenCoolVivid[50],
    title: gray[80],
    messageStandard: gray[80],
    messageContext: pure[0],
    close: greenCoolVivid[50],
  },
  warning: {
    surfaceStandard: yellowVivid[5],
    surfaceContext: yellowVivid[20],
    icon: yellowVivid[50],
    title: gray[80],
    messageStandard: gray[80],
    messageContext: gray[80],
    close: gray[80],
  },
  error: {
    surfaceStandard: redVivid[10],
    surfaceContext: redVivid[50],
    icon: redVivid[50],
    title: gray[80],
    messageStandard: gray[80],
    messageContext: pure[0],
    close: redVivid[50],
  },
}

const SeverityIcon: Record<MessageSeverity, React.FC<{ className?: string }>> = {
  success: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-[var(--icon-size-base)] w-[var(--icon-size-base)]', className)}
      aria-hidden="true"
    >
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  )
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(function Message(
  {
    severity = 'info',
    variant = 'standard',
    title,
    titleInline = false,
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
  const v = MESSAGE_VISUALS[severity]
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = React.useState(true)
  const isControlled = onClose !== undefined
  const DefaultIcon = SeverityIcon[severity]
  const showClose = closable && variant === 'standard'

  React.useEffect(() => {
    if (showClose && visible && closeButtonRef.current) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [showClose, visible])

  const handleClose = () => {
    if (isControlled) onClose?.()
    else setVisible(false)
  }

  // ── Mensagem contextual (tipo feedback) — sem botão fechar (GovBR)
  if (variant === 'feedback') {
    return (
      <div
        ref={ref}
        id={id}
        role="status"
        aria-live={live ?? 'polite'}
        style={{
          backgroundColor: v.surfaceContext,
          color: v.messageContext,
        }}
        className={cn(
          'inline-flex max-w-full items-center gap-[var(--spacing-scale-half)] rounded-xs',
          'px-[var(--spacing-scale-half)] py-[var(--spacing-scale-half)]',
          'font-body text-[length:var(--font-size-scale-base)] font-medium leading-[var(--font-lineheight-medium)]',
          className,
        )}
      >
        {!hideIcon && (
          <span className="flex shrink-0 items-center text-current">
            {icon ?? (
              <DefaultIcon className="h-[var(--icon-size-base)] w-[var(--icon-size-base)]" />
            )}
          </span>
        )}
        <span>{children}</span>
      </div>
    )
  }

  if (!visible && !isControlled) return null

  return (
    <div
      ref={ref}
      id={id}
      role="alert"
      aria-live={live ?? 'assertive'}
      aria-atomic="true"
      style={{ backgroundColor: v.surfaceStandard }}
      className={cn(
        'mb-[var(--spacing-scale-2x)] flex w-full max-w-full rounded-sm',
        className,
      )}
    >
      {!hideIcon && (
        <div
          className="flex shrink-0 items-center justify-center self-stretch px-[var(--spacing-scale-2x)]"
          style={{ color: v.icon }}
        >
          {icon ?? (
            <DefaultIcon className="h-[var(--icon-size-lg)] w-[var(--icon-size-lg)]" />
          )}
        </div>
      )}

      <div
        className={cn(
          'min-w-0 flex-1 py-[var(--spacing-scale-3x)] pr-[var(--spacing-scale-base)]',
          hideIcon ? 'pl-[var(--spacing-scale-2x)]' : '',
        )}
      >
        {title && titleInline ? (
          <div
            className="flex flex-wrap items-baseline gap-x-1 gap-y-0 font-body text-[length:var(--font-size-scale-up-01)] leading-[var(--font-lineheight-medium)]"
            style={{ color: v.messageStandard }}
          >
            <span className="font-heading font-semibold">{title}</span>
            <span className="font-normal">{children}</span>
          </div>
        ) : (
          <>
            {title ? (
              <p
                className="mb-1 font-heading text-[length:var(--font-size-scale-up-01)] font-semibold leading-[var(--font-lineheight-low)]"
                style={{ color: v.title }}
              >
                {title}
              </p>
            ) : null}
            <div
              className="text-[length:var(--font-size-scale-up-01)] font-normal leading-[var(--font-lineheight-medium)]"
              style={{ color: v.messageStandard }}
            >
              {children}
            </div>
          </>
        )}
      </div>

      {showClose && (
        <div className="mt-[var(--spacing-scale-base)] mr-[var(--spacing-scale-base)] shrink-0">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Fechar mensagem"
            style={{ color: v.close }}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-sm transition-colors',
              'hover:bg-black/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-[4px]',
            )}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  )
})

Message.displayName = 'Message'

export const Alert = Message

export { Message }
