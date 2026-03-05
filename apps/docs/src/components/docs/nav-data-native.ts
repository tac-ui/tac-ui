import type { NavGroup } from './nav-data';

export const nativeNavGroups: NavGroup[] = [
  {
    key: 'getting-started',
    title: 'Getting Started',
    items: [
      { key: 'native-introduction', title: 'Introduction', href: '/native/docs' },
      { key: 'native-installation', title: 'Installation', href: '/native/getting-started' },
      { key: 'native-llms-txt', title: 'llms', href: '/native/llms-txt' },
    ],
  },
  {
    key: 'foundations',
    title: 'Foundations',
    items: [
      { key: 'native-colors', title: 'Colors', href: '/native/foundations/colors' },
      { key: 'native-typography', title: 'Typography', href: '/native/foundations/typography' },
      { key: 'native-icons', title: 'Icons', href: '/native/foundations/icons' },
      { key: 'native-animations', title: 'Animations', href: '/native/foundations/animations' },
      { key: 'native-customization', title: 'Customization', href: '/native/foundations/customization' },
    ],
  },
  {
    key: 'actions',
    title: 'Actions',
    items: [
      { key: 'button', title: 'Button', href: '/native/components/button' },
      { key: 'dropdown', title: 'Dropdown', href: '/native/components/dropdown' },
    ],
  },
  {
    key: 'form',
    title: 'Form',
    items: [
      { key: 'input', title: 'Input', href: '/native/components/input' },
      { key: 'textarea', title: 'Textarea', href: '/native/components/textarea' },
      { key: 'select', title: 'Select', href: '/native/components/select' },
      { key: 'combobox', title: 'Combobox', href: '/native/components/combobox' },
      { key: 'checkbox', title: 'Checkbox', href: '/native/components/checkbox' },
      { key: 'radio', title: 'Radio', href: '/native/components/radio' },
      { key: 'switch', title: 'Switch', href: '/native/components/switch' },
      { key: 'slider', title: 'Slider', href: '/native/components/slider' },
      { key: 'animated-toggle', title: 'Toggle', href: '/native/components/animated-toggle' },
      { key: 'segment-controller', title: 'SegmentController', href: '/native/components/segment-controller' },
      { key: 'date-picker', title: 'DatePicker', href: '/native/components/date-picker' },
      { key: 'color-picker', title: 'ColorPicker', href: '/native/components/color-picker' },
    ],
  },
  {
    key: 'data-display',
    title: 'Data Display',
    items: [
      { key: 'badge', title: 'Badge', href: '/native/components/badge' },
      { key: 'avatar', title: 'Avatar', href: '/native/components/avatar' },
      { key: 'chip', title: 'Chip', href: '/native/components/chip' },
      { key: 'progress', title: 'Progress', href: '/native/components/progress' },
      { key: 'table', title: 'Table', href: '/native/components/table' },
      { key: 'indicator', title: 'Indicator', href: '/native/components/indicator' },
      { key: 'skeleton', title: 'Skeleton', href: '/native/components/skeleton' },
      { key: 'code-block', title: 'CodeBlock', href: '/native/components/code-block' },
      { key: 'card', title: 'Card', href: '/native/components/card' },
      { key: 'empty-state', title: 'EmptyState', href: '/native/components/empty-state' },
    ],
  },
  {
    key: 'feedback',
    title: 'Feedback',
    items: [
      { key: 'alert', title: 'Alert', href: '/native/components/alert' },
      { key: 'snackbar', title: 'Snackbar', href: '/native/components/snackbar' },
      { key: 'divider', title: 'Divider', href: '/native/components/divider' },
    ],
  },
  {
    key: 'navigation',
    title: 'Navigation',
    items: [
      { key: 'tabs', title: 'Tabs', href: '/native/components/tabs' },
      { key: 'accordion', title: 'Accordion', href: '/native/components/accordion' },
      { key: 'stepper', title: 'Stepper', href: '/native/components/stepper' },
      { key: 'floating-menu-bar', title: 'FloatingMenuBar', href: '/native/components/floating-menu-bar' },
    ],
  },
  {
    key: 'overlay',
    title: 'Overlay',
    items: [{ key: 'dialog', title: 'Dialog', href: '/native/components/dialog' }],
  },
  {
    key: 'layout',
    title: 'Layout',
    items: [
      { key: 'stack', title: 'Stack', href: '/native/components/stack' },
      { key: 'native-layout-tab-bar', title: 'Tab Bar', href: '/native/examples/layout/tab-bar' },
      {
        key: 'native-layout-header-content',
        title: 'Header + Content',
        href: '/native/examples/layout/header-content',
      },
      { key: 'native-layout-bottom-sheet', title: 'Bottom Sheet', href: '/native/examples/layout/bottom-sheet' },
    ],
  },
];
