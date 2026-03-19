/**
 * @ds/components — Design System Component Library
 *
 * Exports all components, utilities, and types.
 */

// Components
export { Button, buttonVariants, type ButtonProps } from './components/Button'
export { Typography, typographyVariants, type TypographyProps } from './components/Typography'
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from './components/Card'

// Utilities
export { cn } from './utils/cn'
