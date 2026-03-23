// Primitives — Colors
export {
  primitiveColors,
  blueWarmVivid,
  blueWarm,
  greenCoolVivid,
  yellowVivid,
  redVivid,
  gray,
  pure,
} from './primitives/colors'

// Primitives — Typography
export {
  fontFamilies,
  fontWeights,
  fontSizes,
  fontSizesPx,
  lineHeights,
  letterSpacings,
  iconSizeVariables,
  iconSizes,
  iconSizesPx,
} from './primitives/typography'

// Primitives — Spacing
export { spacing, spacingLayout, spacingAdjust, type SpacingToken } from './primitives/spacing'

// Primitives — Borders & superfícies (GovBR)
export {
  surfaceBorderDefaultColorHex,
  surfaceBorderDefaultColorVariable,
  surfaceBorderVariables,
  surfaceWidth,
  surfaceWidthVariables,
  surfaceRounder,
  surfaceRounderVariables,
  getSurfaceBorderVariable,
  borderRadius,
  borderWidths,
  type SurfaceBorderSide,
  type SurfaceBorderStyle,
  type SurfaceRounderCorner,
  type SurfaceRounderKey,
  type SurfaceWidthKey,
} from './primitives/borders'

// Primitives — Shadows
export { shadows } from './primitives/shadows'

// Primitives — Elevação / scrim / overlay (GovBR)
export {
  elevation,
  scrim,
  interactiveSurfaceOverlay,
  primaryInteractiveAlpha,
} from './primitives/elevation'

// Primitives — Transitions
export {
  transitionDuration,
  transitionEasing,
  transitions,
  muiTransitionDuration,
  muiTransitionEasing,
  type TransitionDurationKey,
  type TransitionEasingKey,
} from './primitives/transitions'

// Semantic
export { govEspecificacao } from './semantic/gov-spec'
export { semanticColors } from './semantic/colors'
export { semanticTypography } from './semantic/typography'
export { surfaceComponent } from './semantic/surfaces'
