// Version
export { version } from './version';

// Provider
export { TacProvider, useTacTheme } from './provider/theme-provider';
export type { TacProviderProps } from './provider/theme-provider';

// Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/button';

export { Input } from './components/input';
export type { InputProps, InputSize } from './components/input';

export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { Select } from './components/select';
export type { SelectProps, SelectOption, SelectSize } from './components/select';

export { Combobox } from './components/combobox';
export type { ComboboxProps, ComboboxOption, ComboboxSize } from './components/combobox';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from './components/card';
export type { CardProps, CardVariant } from './components/card';

export { MorphingCard } from './components/morphing-card';
export type { MorphingCardProps } from './components/morphing-card';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps, BadgeVariant } from './components/badge';

export { Checkbox } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { RadioGroup, Radio } from './components/radio';
export type { RadioGroupProps, RadioProps } from './components/radio';

export { Switch } from './components/switch';
export type { SwitchProps, SwitchSize } from './components/switch';

export { Toggle, AnimatedToggle } from './components/animated-toggle';
export type { ToggleProps, AnimatedToggleProps } from './components/animated-toggle';

export { Tabs, TabsList, TabTrigger, TabContent } from './components/tabs';
export type { TabsProps, TabTriggerProps, TabTriggerClassNames, TabContentProps, TabVariant } from './components/tabs';

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/dialog';
export type { DialogProps, DialogSize } from './components/dialog';

export { Modal, ModalHeader, ModalIcon, ModalTitle, ModalDescription, ModalFooter } from './components/modal';
export type { ModalProps, ModalSize } from './components/modal';

export { Alert, AlertTitle, AlertDescription, alertVariants } from './components/alert';
export type { AlertProps, AlertVariant } from './components/alert';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
} from './components/accordion';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbLinkProps } from './components/breadcrumb';

export { Dropdown, DropdownTitle, DropdownDivider, DropdownItem, DropdownSearch } from './components/dropdown';
export type { DropdownProps, DropdownItemProps, DropdownSearchProps, DropdownAlign } from './components/dropdown';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from './components/pagination';
export type { PaginationProps, PaginationItemProps, PaginationPrevNextProps } from './components/pagination';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/table';

export { Snackbar, snackbarVariants } from './components/snackbar';
export type { SnackbarProps, SnackbarVariant } from './components/snackbar';

export { Avatar, avatarVariants } from './components/avatar';
export type { AvatarProps, AvatarSize } from './components/avatar';

export { Chip, chipVariants } from './components/chip';
export type { ChipProps, ChipVariant } from './components/chip';

export { Slider } from './components/slider';
export type { SliderProps } from './components/slider';

export { Progress } from './components/progress';
export type { ProgressProps, ProgressVariant, ProgressBarSize } from './components/progress';

export { Tooltip } from './components/tooltip';
export type { TooltipProps, TooltipPlacement } from './components/tooltip';

export { Divider, dividerVariants } from './components/divider';
export type { DividerProps, DividerVariant } from './components/divider';

export { CodeBlock } from './components/code-block';
export type { CodeBlockProps } from './components/code-block';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps, SkeletonVariant, SkeletonAnimation } from './components/skeleton';

export { Indicator } from './components/indicator';
export type { IndicatorProps, IndicatorVariant } from './components/indicator';

export { VStack, HStack } from './components/stack';
export type { StackProps, Spacing, StackAlign, StackJustify } from './components/stack';

export {
  PageLayout,
  Header,
  Sidebar,
  SidebarHeader,
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
} from './components/layout';
export type {
  PageLayoutProps,
  HeaderProps,
  SidebarProps,
  SidebarHeaderProps,
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
} from './components/layout';

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
} from './components/page-layouts';
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
} from './components/page-layouts';

export { ToastProvider, useToast, ToastItem, ToastContainer, toastVariants } from './components/toast';
export type { ToastVariant, ToastPosition, ToastOptions, ToastProviderProps, ToastItemProps } from './components/toast';

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerBody } from './components/drawer';
export type { DrawerProps, DrawerSide } from './components/drawer';

export { Popover, PopoverHeader, PopoverBody, PopoverFooter } from './components/popover';
export type { PopoverProps, PopoverAlign, PopoverSide } from './components/popover';

export { EmptyState } from './components/empty-state';
export type { EmptyStateProps } from './components/empty-state';

export { Stepper, Step } from './components/stepper';
export type { StepperProps, StepProps, StepperOrientation, StepperAlignLabels } from './components/stepper';

export { BarChart, LineChart, PieChart, DonutChart } from './components/chart';
export type {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ChartDataPoint,
  PieChartDataPoint,
  PieChartVariant,
} from './components/chart';

export { SegmentController, SlidingSelect } from './components/segment-controller';
export type {
  SegmentControllerProps,
  SegmentControllerSize,
  SegmentControllerMode,
  SegmentOption,
  SlidingSelectProps,
  SlidingSelectSize,
  SlidingSelectOption,
} from './components/segment-controller';

export { DatePicker } from './components/date-picker';
export type { DatePickerProps, DatePickerMode } from './components/date-picker';

export { ColorPicker } from './components/color-picker';
export type { ColorPickerProps } from './components/color-picker';

export { Label } from './components/label';
export type { LabelProps } from './components/label';

export { Banner, bannerVariants } from './components/banner';
export type { BannerProps, BannerVariant } from './components/banner';

export { Grid, GridItem } from './components/grid';
export type { GridProps, GridItemProps, GridVariant, GridGap } from './components/grid';

export { Link, linkVariants } from './components/link';
export type { LinkProps, LinkVariant } from './components/link';

export { ClipboardText, clipboardTextVariants } from './components/clipboard-text';
export type { ClipboardTextProps, ClipboardTextSize } from './components/clipboard-text';

export { SensitiveInput } from './components/sensitive-input';
export type { SensitiveInputProps } from './components/sensitive-input';

export { Collapsible } from './components/collapsible';
export type { CollapsibleProps } from './components/collapsible';

export { Meter } from './components/meter';
export type { MeterProps } from './components/meter';

export { StatusDot } from './components/status-dot';
export type { StatusDotProps, StatusDotStatus, StatusDotSize } from './components/status-dot';

export { CopyButton } from './components/copy-button';
export type { CopyButtonProps } from './components/copy-button';

export { ConfirmProvider, useConfirm } from './components/confirm-dialog';
export type { ConfirmOptions, ConfirmProviderProps } from './components/confirm-dialog';

// Hooks
export { useFocusTrap, useFocusRestore, useRovingIndex } from './hooks/use-accessibility';
export { useSpotlight } from './hooks/use-spotlight';
export { useReducedMotion } from './hooks/use-reduced-motion';

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
