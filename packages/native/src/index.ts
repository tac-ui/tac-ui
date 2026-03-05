// Provider
export { TacNativeProvider, useTacNativeTheme, type TacNativeProviderProps } from './provider/TacNativeProvider';

// Utils
export { createStyles } from './utils/createStyles';

// Constants
export { tacSpring, duration, springConfigs } from './constants/motion';

// Components — Phase 1
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button';
export { Badge, type BadgeProps, type BadgeVariant } from './components/Badge';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
  type CardTitleProps,
  type CardDescriptionProps,
} from './components/Card';
export { VStack, HStack, type StackProps, type Spacing, type StackAlign, type StackJustify } from './components/Stack';
export { Divider, type DividerProps, type DividerVariant, type DividerOrientation } from './components/Divider';
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant,
  type AlertTitleProps,
  type AlertDescriptionProps,
} from './components/Alert';
export { EmptyState, type EmptyStateProps } from './components/EmptyState';
export { Avatar, type AvatarProps, type AvatarSize } from './components/Avatar';
export { Chip, type ChipProps, type ChipVariant } from './components/Chip';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { RadioGroup, Radio, type RadioGroupProps, type RadioProps } from './components/Radio';
export { Switch, type SwitchProps } from './components/Switch';
export { Toggle, type ToggleProps, AnimatedToggle, type AnimatedToggleProps } from './components/AnimatedToggle';

// Components — Phase 2
export { Input, type InputProps } from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export {
  Tabs,
  TabsList,
  TabTrigger,
  TabContent,
  type TabsProps,
  type TabsListProps,
  type TabTriggerProps,
  type TabContentProps,
  type TabVariant,
} from './components/Tabs';
export { SegmentController, type SegmentControllerProps, type SegmentOption } from './components/SegmentController';
export { Skeleton, type SkeletonProps } from './components/Skeleton';
export { Snackbar, type SnackbarProps, type SnackbarVariant } from './components/Snackbar';
export { Stepper, Step, type StepperProps, type StepProps } from './components/Stepper';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from './components/Table';
export { Progress, type ProgressProps, type ProgressVariant, type ProgressBarSize } from './components/Progress';
export { Slider, type SliderProps } from './components/Slider';
export { Indicator, type IndicatorProps, type IndicatorVariant } from './components/Indicator';
export { CodeBlock, type CodeBlockProps } from './components/CodeBlock';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbProps,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbEllipsisProps,
} from './components/Breadcrumb';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/Accordion';
export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogProps,
  type DialogHeaderProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
} from './components/Dialog';
export {
  Dropdown,
  DropdownItem,
  DropdownTitle,
  DropdownDivider,
  type DropdownProps,
  type DropdownItemProps,
  type DropdownTitleProps,
  type DropdownDividerProps,
} from './components/Dropdown';
export { Select, type SelectProps, type SelectOption, type SelectSize } from './components/Select';
export { Combobox, type ComboboxProps, type ComboboxOption } from './components/Combobox';
export { DatePicker, type DatePickerProps } from './components/DatePicker';
export { ColorPicker, type ColorPickerProps } from './components/ColorPicker';
export { FloatingMenuBar, type FloatingMenuBarProps, type FloatingMenuBarItem } from './components/FloatingMenuBar';
export {
  ToastProvider,
  ToastContainer,
  useToast,
  type ToastOptions,
  type ToastProviderProps,
  type ToastVariant,
  type ToastPosition,
} from './components/Toast';
