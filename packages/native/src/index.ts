// Version
export { version } from './version';

// Provider
export { TacNativeProvider, useTacNativeTheme, type TacNativeProviderProps } from './provider/tac-native-provider';

// Utils
export { createStyles } from './utils/create-styles';

// Constants
export { tacSpring, duration, springConfigs } from './constants/motion';

// Components — Phase 1
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/button';
export { Badge, type BadgeProps, type BadgeVariant } from './components/badge';
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
} from './components/card';
export { VStack, HStack, type StackProps, type Spacing, type StackAlign, type StackJustify } from './components/stack';
export { Divider, type DividerProps, type DividerVariant, type DividerOrientation } from './components/divider';
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant,
  type AlertTitleProps,
  type AlertDescriptionProps,
} from './components/alert';
export { EmptyState, type EmptyStateProps } from './components/empty-state';
export { Avatar, type AvatarProps, type AvatarSize } from './components/avatar';
export { Chip, type ChipProps, type ChipVariant } from './components/chip';
export { Checkbox, type CheckboxProps } from './components/checkbox';
export { RadioGroup, Radio, type RadioGroupProps, type RadioProps } from './components/radio';
export { Switch, type SwitchProps } from './components/switch';
export { Toggle, type ToggleProps, AnimatedToggle, type AnimatedToggleProps } from './components/animated-toggle';

// Components — Phase 2
export { Input, type InputProps, type InputSize } from './components/input';
export { Textarea, type TextareaProps, type TextareaSize } from './components/textarea';
export {
  Tabs,
  TabsList,
  TabTrigger,
  TabContent,
  type TabsProps,
  type TabsListProps,
  type TabTriggerProps,
  type TabTriggerStyles,
  type TabContentProps,
  type TabVariant,
} from './components/tabs';
export { SegmentController, type SegmentControllerProps, type SegmentOption } from './components/segment-controller';
export { Skeleton, type SkeletonProps } from './components/skeleton';
export { Snackbar, type SnackbarProps, type SnackbarVariant } from './components/snackbar';
export { Stepper, Step, type StepperProps, type StepProps } from './components/stepper';
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
} from './components/table';
export { Progress, type ProgressProps, type ProgressVariant, type ProgressBarSize } from './components/progress';
export { Slider, type SliderProps } from './components/slider';
export { Indicator, type IndicatorProps, type IndicatorVariant } from './components/indicator';
export { CodeBlock, type CodeBlockProps } from './components/code-block';
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
} from './components/breadcrumb';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/accordion';
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
} from './components/dialog';
export {
  Dropdown,
  DropdownItem,
  DropdownTitle,
  DropdownDivider,
  type DropdownProps,
  type DropdownItemProps,
  type DropdownTitleProps,
  type DropdownDividerProps,
} from './components/dropdown';
export { Select, type SelectProps, type SelectOption, type SelectSize } from './components/select';
export { Combobox, type ComboboxProps, type ComboboxOption } from './components/combobox';
export { DatePicker, type DatePickerProps } from './components/date-picker';
export { ColorPicker, type ColorPickerProps } from './components/color-picker';
export { FloatingMenuBar, type FloatingMenuBarProps, type FloatingMenuBarItem } from './components/floating-menu-bar';
export {
  ToastProvider,
  ToastContainer,
  useToast,
  type ToastOptions,
  type ToastProviderProps,
  type ToastVariant,
  type ToastPosition,
} from './components/toast';
