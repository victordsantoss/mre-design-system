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
  CardHeaderIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
  CardFooter,
  CardMedia,
  type CardProps,
  type CardHeaderProps,
  type CardHeaderIconProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardActionsProps,
  type CardFooterProps,
  type CardMediaProps,
} from './Card'
export {
  Typography,
  typographyLayoutVariants,
  type TypographyProps,
  type TypographyVariant,
  type TypographyWeight,
} from './Typography'
export {
  Message,
  type MessageProps,
  type MessageSeverity,
  type MessageVariant,
} from './Message'
export { Alert, type AlertProps } from './Alert'
export {
  Item,
  type ItemProps,
  type ItemDensity,
} from './Item'
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
  type DividerThickness,
} from './Divider'
export {
  Header,
  type HeaderProps,
  type HeaderDensity,
  type HeaderLink,
  type HeaderFunctionItem,
} from './Header'
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
  TableExpandedContentRow,
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
  TableRowSelectionContext,
  getTableCellPadding,
  getTableColors,
  useItamaratyTableSection,
  useTableSection,
  useTableRowSelected,
  DEFAULT_TABLE_SECTION,
  type TableRootProps,
  type TableTitleBarProps,
  type TableContextualBarProps,
  type TableContextualActionProps,
  type TableExpandCellProps,
  type TableExpandedContentRowProps,
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
export {
  List,
  ListHeader,
  ListLabel,
  ListGroup,
  type ListProps,
  type ListHeaderProps,
  type ListLabelProps,
  type ListGroupProps,
} from './List'
export {
  Footer,
  type FooterProps,
  type FooterLogoAlign,
  type FooterCategory,
  type FooterSocialLink,
} from './Footer'
export { cn } from './utils/cn'
