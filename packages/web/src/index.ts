// Provider
export { TacProvider, useTacTheme } from './provider/ThemeProvider';
export type { TacProviderProps } from './provider/ThemeProvider';

// Components
export { Button, buttonVariants } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Select } from './components/Select';
export type { SelectProps, SelectOption, SelectSize } from './components/Select';

export { Combobox } from './components/Combobox';
export type { ComboboxProps, ComboboxOption } from './components/Combobox';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';

export { MorphingCard } from './components/MorphingCard';
export type { MorphingCardProps } from './components/MorphingCard';

export { Badge, badgeVariants } from './components/Badge';
export type { BadgeProps, BadgeVariant } from './components/Badge';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { RadioGroup, Radio } from './components/Radio';
export type { RadioGroupProps, RadioProps } from './components/Radio';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Toggle, AnimatedToggle } from './components/AnimatedToggle';
export type { ToggleProps, AnimatedToggleProps } from './components/AnimatedToggle';

export { Tabs, TabsList, TabTrigger, TabContent } from './components/Tabs';
export type { TabsProps, TabTriggerProps, TabContentProps, TabVariant } from './components/Tabs';

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/Dialog';
export type { DialogProps } from './components/Dialog';

export { Modal, ModalHeader, ModalIcon, ModalTitle, ModalDescription, ModalFooter } from './components/Modal';
export type { ModalProps, ModalSize } from './components/Modal';

export { Alert, AlertTitle, AlertDescription, alertVariants } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
} from './components/Accordion';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbLinkProps } from './components/Breadcrumb';

export { Dropdown, DropdownTitle, DropdownDivider, DropdownItem, DropdownSearch } from './components/Dropdown';
export type { DropdownProps, DropdownItemProps, DropdownSearchProps, DropdownAlign } from './components/Dropdown';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from './components/Pagination';
export type { PaginationProps, PaginationItemProps, PaginationPrevNextProps } from './components/Pagination';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/Table';

export { Snackbar, snackbarVariants } from './components/Snackbar';
export type { SnackbarProps, SnackbarVariant } from './components/Snackbar';

export { Avatar, avatarVariants } from './components/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar';

export { Chip, chipVariants } from './components/Chip';
export type { ChipProps, ChipVariant } from './components/Chip';

export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

export { Progress } from './components/Progress';
export type { ProgressProps, ProgressVariant, ProgressBarSize } from './components/Progress';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { Divider, dividerVariants } from './components/Divider';
export type { DividerProps, DividerVariant } from './components/Divider';

export { CodeBlock } from './components/CodeBlock';
export type { CodeBlockProps } from './components/CodeBlock';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonVariant, SkeletonAnimation } from './components/Skeleton';

export { Indicator } from './components/Indicator';
export type { IndicatorProps, IndicatorVariant } from './components/Indicator';

export { VStack, HStack } from './components/Stack';
export type { StackProps, Spacing, StackAlign, StackJustify } from './components/Stack';

export {
  PageLayout,
  Header,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarContent,
  SidebarFooter,
  Main,
  Footer,
  Container,
  FloatingMenuBar,
  FloatingMenuItem,
  useSidebarContext,
  containerVariants,
  mainVariants,
  headerVariants,
  sidebarVariants,
  footerVariants,
} from './components/Layout';
export type {
  PageLayoutProps,
  HeaderProps,
  SidebarProps,
  SidebarGroupProps,
  SidebarItemProps,
  SidebarItemVariant,
  SidebarItemSize,
  MainProps,
  FooterProps,
  ContainerProps,
  FloatingMenuBarProps,
  FloatingMenuBarPosition,
  FloatingMenuItemProps,
} from './components/Layout';

export {
  SingleColumnPage,
  SidebarPage,
  GridPage,
  DashboardPage,
  SplitPage,
  StackedPage,
  DualSidebarPage,
  HolyGrailPage,
  AsymmetricPage,
  AppPage,
} from './components/PageLayouts';
export type {
  SingleColumnPageProps,
  SidebarPageProps,
  GridPageProps,
  DashboardPageProps,
  SplitPageProps,
  StackedPageProps,
  DualSidebarPageProps,
  HolyGrailPageProps,
  AsymmetricPageProps,
  AppPageProps,
  AppPageWidth,
  MaxWidth,
  SidebarPosition,
  GridColumns,
  AsymmetricRatio,
} from './components/PageLayouts';

export { ToastProvider, useToast, ToastItem, ToastContainer, toastVariants } from './components/Toast';
export type { ToastVariant, ToastPosition, ToastOptions, ToastProviderProps, ToastItemProps } from './components/Toast';

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerBody } from './components/Drawer';
export type { DrawerProps, DrawerSide } from './components/Drawer';

export { Popover, PopoverHeader, PopoverBody, PopoverFooter } from './components/Popover';
export type { PopoverProps, PopoverAlign, PopoverSide } from './components/Popover';

export { EmptyState } from './components/EmptyState';
export type { EmptyStateProps } from './components/EmptyState';

export { Stepper, Step } from './components/Stepper';
export type { StepperProps, StepProps, StepperOrientation, StepperAlignLabels } from './components/Stepper';

export { BarChart, LineChart, PieChart, DonutChart } from './components/Chart';
export type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ChartDataPoint,
  PieChartDataPoint,
  PieChartVariant,
} from './components/Chart';

export { SegmentController, SlidingSelect } from './components/SegmentController';
export type {
  SegmentControllerProps,
  SegmentControllerSize,
  SegmentControllerMode,
  SegmentOption,
  SlidingSelectProps,
  SlidingSelectSize,
  SlidingSelectOption,
} from './components/SegmentController';

export { DatePicker } from './components/DatePicker';
export type { DatePickerProps, DatePickerMode } from './components/DatePicker';

export { ColorPicker } from './components/ColorPicker';
export type { ColorPickerProps } from './components/ColorPicker';

// Hooks
export { useFocusTrap, useFocusRestore, useRovingIndex } from './hooks/useAccessibility';
export { useSpotlight } from './hooks/useSpotlight';

// Motion
export {
  tacSpring,
  dropdownMotionVariants,
  panelVariants,
  fadeVariants,
  exitVariants,
  pageEntrance,
} from './constants/motion';

// Utilities
export { cn } from './utils/cn';
