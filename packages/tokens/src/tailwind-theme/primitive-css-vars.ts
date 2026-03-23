import { blueWarmVivid, gray, pure } from '../primitives/colors'
import { elevation, interactiveSurfaceOverlay, scrim } from '../primitives/elevation'
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  iconSizes,
  lineHeights,
} from '../primitives/typography'
import { spacing } from '../primitives/spacing'
import { surfaceRounder } from '../primitives/borders'
import { surfaceComponent } from '../semantic/surfaces'
import { formatCssCustomProperties } from './flatten-semantic-colors'

function px(n: number): string {
  return `${n}px`
}

/** Variáveis de apoio (não semânticas) — :root */
export function buildRootPrimitiveCssVars(): Record<string, string> {
  const vars: Record<string, string> = {
    '--pure-0': pure[0],
    '--blue-warm-vivid-70': blueWarmVivid[70],
    '--blue-warm-vivid-90': blueWarmVivid[90],
    '--blue-warm-vivid-20': blueWarmVivid[20],
    '--gray-2': gray[2],
    '--gray-80': gray[80],
    '--ds-ui-ring': blueWarmVivid[60],
    '--ds-neutral-muted-bg': gray[5],
    '--ds-neutral-muted-fg': gray[60],
    '--ds-neutral-accent-bg': gray[2],
    '--ds-neutral-accent-fg': gray[80],
    '--ds-neutral-border': gray[10],
    '--ds-neutral-input-border': gray[10],
    '--color-pure-0': 'var(--pure-0)',
    '--color-card-back': 'var(--gray-2)',
    '--color-muted': 'var(--ds-neutral-muted-bg)',
    '--color-muted-foreground': 'var(--ds-neutral-muted-fg)',
    '--color-accent': 'var(--ds-neutral-accent-bg)',
    '--color-accent-foreground': 'var(--ds-neutral-accent-fg)',
    '--color-border': 'var(--ds-neutral-border)',
    '--color-input': 'var(--ds-neutral-input-border)',
    '--color-ring': 'var(--ds-ui-ring)',
    '--color-overlay': scrim.light,
    '--font-family-base': fontFamilies.base,
    '--font-family-body': fontFamilies.body,
    '--font-family-heading': fontFamilies.heading,
    '--font-family-mono': fontFamilies.mono,
    '--font-size-scale-base': fontSizes.base,
    '--font-size-scale-up-01': fontSizes['up-01'],
    '--font-weight-regular': String(fontWeights.regular),
    '--font-weight-semi-bold': String(fontWeights.semiBold),
    '--font-lineheight-low': String(lineHeights.low),
    '--font-lineheight-medium': String(lineHeights.medium),
    '--icon-size-base': iconSizes.base,
    '--icon-size-lg': iconSizes.lg,
    '--surface-rounder-pill': '100em',
    '--shadow-sm': elevation.shadowSm,
    '--shadow-card': elevation.shadowMd,
    '--shadow-popover': elevation.popover,
    '--shadow-drawer': elevation.drawer,
    '--card-padding': px(surfaceComponent.cardPaddingPx),
    '--card-icon-padding': px(surfaceComponent.cardIconPaddingPx),
    '--status-disabled-background': surfaceComponent.statusDisabledBackgroundLight,
    '--status-dragged-background': surfaceComponent.statusDraggedBackgroundLight,
    '--color-card-hover-overlay': interactiveSurfaceOverlay.cardHover,
    '--color-card-active-overlay': interactiveSurfaceOverlay.cardActive,
    '--spacing-scale-half': px(spacing.half),
    '--spacing-scale-base': px(spacing.base),
    '--spacing-scale-2x': px(spacing['2x']),
    '--spacing-scale-3x': px(spacing['3x']),
  }

  if (typeof surfaceRounder.sm === 'number') {
    vars['--ds-radius-sm'] = px(surfaceRounder.sm)
  }
  if (typeof surfaceRounder.md === 'number') {
    vars['--ds-radius-md'] = px(surfaceRounder.md)
  }
  if (typeof surfaceRounder.lg === 'number') {
    vars['--ds-radius-lg'] = px(surfaceRounder.lg)
  }

  return vars
}

/** Sobrescritas em `.dark` para neutros, foco e overlay */
export function buildDarkPrimitiveOverrides(): Record<string, string> {
  return {
    '--ds-ui-ring': blueWarmVivid[20],
    '--ds-neutral-muted-bg': '#222A38',
    '--ds-neutral-muted-fg': '#ADBACF',
    '--ds-neutral-accent-bg': '#0C326F',
    '--ds-neutral-accent-fg': pure[0],
    '--ds-neutral-border': '#374157',
    '--ds-neutral-input-border': '#4A5A78',
    '--color-overlay': scrim.dark,
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    '--shadow-card': '0 2px 12px 0 rgba(0, 0, 0, 0.35)',
    '--shadow-popover': '0 4px 20px 0 rgba(0, 0, 0, 0.45)',
    '--status-disabled-background': surfaceComponent.statusDisabledBackgroundDark,
    '--status-dragged-background': surfaceComponent.statusDraggedBackgroundDark,
  }
}

export function formatPrimitiveBlock(vars: Record<string, string>): string {
  return formatCssCustomProperties(vars)
}
