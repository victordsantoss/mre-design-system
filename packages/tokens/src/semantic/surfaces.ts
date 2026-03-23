/**
 * Superfícies de componentes — padding e estados (GovBR)
 * Derivado de `spacing` e primitivos de cor; espelhar tokens de estado em `globals.css`.
 */
import { gray, pure, blueWarmVivid } from '../primitives/colors'
import { spacingLayout } from '../primitives/spacing'

export const surfaceComponent = {
  /** Padding geral do conteúdo do card (16px) — `--card-padding` */
  cardPaddingPx: spacingLayout['2x'],
  /** Padding da área de ícone no header do card (8px) — `--card-icon-padding` */
  cardIconPaddingPx: spacingLayout.base,
  /** Fundo do card padrão — `--pure-0` / `pure[0]` */
  cardBackground: pure[0],
  /** Verso / área alternativa (gray-2) — `--color-card-back` */
  cardBack: gray[2],
  /** Container desativado (fundo claro) — `--status-disabled-background` */
  statusDisabledBackgroundLight: '#EBEBEB' as const,
  /** Container desativado (fundo escuro) */
  statusDisabledBackgroundDark: '#2A3548' as const,
  /** Arraste (fundo claro) — alinhado a info subtle Gov */
  statusDraggedBackgroundLight: blueWarmVivid[10],
  /** Arraste (fundo escuro) — semitransparente */
  statusDraggedBackgroundDark: 'rgba(197, 212, 235, 0.28)' as const,
} as const
