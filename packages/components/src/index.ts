/**
 * @ds/components — MRE / Itamaraty Design System
 * Padrão Digital de Governo (GovBR)
 *
 * Estrutura de pastas e API pública alinhadas ao pacote `@itamaraty-ds/components` (MUI).
 */
export {
  Button,
  CircleButton,
  buttonVariants,
  circleButtonVariants,
  type ButtonProps,
  type CircleButtonProps,
  type ButtonEmphasis,
  type ButtonDensity,
  type ButtonIntent,
} from './Button'
export {
  Input,
  DENSITY_HEIGHT,
  HIGHLIGHT_HEIGHT,
  FONT_SIZES,
  verticalPadding,
  helperTextColorHex,
  type InputProps,
  type InputDensity,
  type InputStatus,
} from './Input'
export { Select, type SelectProps, type SelectOption } from './Select'
export {
  Modal,
  ModalOptionList,
  ModalRadioGroup,
  type ModalProps,
  type ModalOptionListProps,
  type ModalOptionListItem,
  type ModalRadioGroupProps,
  type ModalRadioOption,
} from './Modal'
export {
  Autocomplete,
  getOptionLabel,
  type AutocompleteProps,
  type AutocompleteOption,
} from './Autocomplete'
export {
  Card,
  CardContext,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
  CardFooter,
  CardMedia,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardActionsProps,
  type CardFooterProps,
  type CardMediaProps,
} from './Card'
export { Typography, typographyVariants, type TypographyProps } from './Typography'
export {
  Message,
  type MessageProps,
  type MessageSeverity,
  type MessageVariant,
} from './Message'
export { Alert, type AlertProps } from './Alert'
export {
  Menu,
  type MenuProps,
  type MenuDensity,
  type MenuVariant,
  type MenuHeaderMode,
  type MenuItemDef,
  type MenuFolder,
} from './Menu'
export {
  DatePicker,
  type DatePickerProps,
  type DatePickerSelectionMode,
  type DateRangeValue,
} from './DatePicker'
export {
  TableRoot,
  Table,
  TableTitleBar,
  TableContextualBar,
  TableContextualAction,
  TableExpandCell,
  TableScrollArea,
  TableElement,
  TableHead,
  TableBody,
  TableHeaderCell,
  TableBodyRow,
  TableBodyCell,
  TableFooterBar,
  TablePaginationBar,
  TableSectionContext,
  TableColorsContext,
  getTableCellPadding,
  getTableColors,
  useItamaratyTableSection,
  useTableSection,
  DEFAULT_TABLE_SECTION,
  type TableRootProps,
  type TableTitleBarProps,
  type TableContextualBarProps,
  type TableContextualActionProps,
  type TableExpandCellProps,
  type TableScrollAreaProps,
  type TableElementProps,
  type TableSortDirection,
  type TableHeaderCellProps,
  type TableBodyRowProps,
  type TableBodyCellProps,
  type TableFooterBarProps,
  type TablePaginationBarProps,
  type TablePaginationBarLabels,
  type TablePaddingSlot,
  type TableSectionState,
  type TableDensity,
  type TableCellDividers,
  type DsTableColors,
} from './Table'
export {
  DesignSystemProvider,
  type DesignSystemProviderProps,
  type ColorScheme,
} from './Provider'
export { cn } from './utils/cn'
