'use client'
/**
 * Grupo de opções com rádio para uso dentro da Modal (GovBR — “por seleção”).
 */
import * as React from 'react'
import { cn } from '../utils/cn'
import { Typography } from '../Typography'

export interface ModalRadioOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface ModalRadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: ModalRadioOption[]
  /** Espaçamento vertical entre opções (tailwind gap-y em unidades arbitrárias, padrão ~8px) */
  gap?: number
}

function formatLabel(label: React.ReactNode): React.ReactNode {
  if (typeof label === 'string' || typeof label === 'number')
    return (
      <Typography as="span" variant="body1" className="text-muted-foreground">
        {label}
      </Typography>
    )
  return label
}

export function ModalRadioGroup({
  name,
  value,
  onChange,
  options,
  gap = 2,
}: ModalRadioGroupProps) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <div className="flex flex-col" style={{ gap: `${gap * 4}px` }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'flex cursor-pointer items-center gap-3 py-2 pl-1',
              opt.disabled && 'cursor-not-allowed opacity-45',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange(opt.value)}
              className={cn(
                'h-4 w-4 shrink-0 border-2 border-muted-foreground text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              )}
            />
            <span className="min-w-0 flex-1">{formatLabel(opt.label)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
