export interface NavItem {
  key: string;
  title: string;
  screen: string;
}

export interface NavGroup {
  key: string;
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    key: 'actions',
    title: 'Actions',
    items: [
      { key: 'button', title: 'Button', screen: 'ButtonScreen' },
      { key: 'dropdown', title: 'Dropdown', screen: 'DropdownScreen' },
    ],
  },
  {
    key: 'form',
    title: 'Form',
    items: [
      { key: 'input', title: 'Input', screen: 'InputScreen' },
      { key: 'textarea', title: 'Textarea', screen: 'TextareaScreen' },
      { key: 'select', title: 'Select', screen: 'SelectScreen' },
      { key: 'combobox', title: 'Combobox', screen: 'ComboboxScreen' },
      { key: 'checkbox', title: 'Checkbox', screen: 'CheckboxScreen' },
      { key: 'radio', title: 'Radio', screen: 'RadioScreen' },
      { key: 'switch', title: 'Switch', screen: 'SwitchScreen' },
      { key: 'slider', title: 'Slider', screen: 'SliderScreen' },
      { key: 'toggle', title: 'Toggle', screen: 'ToggleScreen' },
      { key: 'segment-controller', title: 'SegmentController', screen: 'SegmentControllerScreen' },
      { key: 'date-picker', title: 'DatePicker', screen: 'DatePickerScreen' },
      { key: 'color-picker', title: 'ColorPicker', screen: 'ColorPickerScreen' },
    ],
  },
  {
    key: 'data-display',
    title: 'Data Display',
    items: [
      { key: 'badge', title: 'Badge', screen: 'BadgeScreen' },
      { key: 'avatar', title: 'Avatar', screen: 'AvatarScreen' },
      { key: 'chip', title: 'Chip', screen: 'ChipScreen' },
      { key: 'progress', title: 'Progress', screen: 'ProgressScreen' },
      { key: 'table', title: 'Table', screen: 'TableScreen' },
      { key: 'indicator', title: 'Indicator', screen: 'IndicatorScreen' },
      { key: 'skeleton', title: 'Skeleton', screen: 'SkeletonScreen' },
      { key: 'code-block', title: 'CodeBlock', screen: 'CodeBlockScreen' },
      { key: 'card', title: 'Card', screen: 'CardScreen' },
      { key: 'empty-state', title: 'EmptyState', screen: 'EmptyStateScreen' },
    ],
  },
  {
    key: 'feedback',
    title: 'Feedback',
    items: [
      { key: 'alert', title: 'Alert', screen: 'AlertScreen' },
      { key: 'snackbar', title: 'Snackbar', screen: 'SnackbarScreen' },
      { key: 'toast', title: 'Toast', screen: 'ToastScreen' },
      { key: 'divider', title: 'Divider', screen: 'DividerScreen' },
    ],
  },
  {
    key: 'navigation',
    title: 'Navigation',
    items: [
      { key: 'tabs', title: 'Tabs', screen: 'TabsScreen' },
      { key: 'accordion', title: 'Accordion', screen: 'AccordionScreen' },
      { key: 'stepper', title: 'Stepper', screen: 'StepperScreen' },
      { key: 'floating-menu-bar', title: 'FloatingMenuBar', screen: 'FloatingMenuBarScreen' },
    ],
  },
  {
    key: 'overlay',
    title: 'Overlay',
    items: [{ key: 'dialog', title: 'Dialog', screen: 'DialogScreen' }],
  },
  {
    key: 'layout',
    title: 'Layout',
    items: [{ key: 'stack', title: 'Stack', screen: 'StackScreen' }],
  },
];
