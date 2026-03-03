export interface NavItem {
  key: string;
  title: string;
  href: string;
}

export interface NavGroup {
  key: string;
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    key: 'getting-started',
    title: 'Getting Started',
    items: [
      { key: 'introduction', title: 'Introduction', href: '/docs' },
      { key: 'installation', title: 'Installation', href: '/getting-started' },
    ],
  },
  {
    key: 'foundations',
    title: 'Foundations',
    items: [
      { key: 'colors', title: 'Colors', href: '/foundations/colors' },
      { key: 'typography', title: 'Typography', href: '/foundations/typography' },
      { key: 'icons', title: 'Icons', href: '/foundations/icons' },
      { key: 'animations', title: 'Animations', href: '/foundations/animations' },
      { key: 'customization', title: 'Customization', href: '/foundations/customization' },
    ],
  },
  {
    key: 'actions',
    title: 'Actions',
    items: [
      { key: 'button', title: 'Button', href: '/components/button' },
      { key: 'dropdown', title: 'Dropdown', href: '/components/dropdown' },
      { key: 'popover', title: 'Popover', href: '/components/popover' },
      { key: 'tooltip', title: 'Tooltip', href: '/components/tooltip' },
    ],
  },
  {
    key: 'form',
    title: 'Form',
    items: [
      { key: 'input', title: 'Input', href: '/components/input' },
      { key: 'textarea', title: 'Textarea', href: '/components/textarea' },
      { key: 'select', title: 'Select', href: '/components/select' },
      { key: 'combobox', title: 'Combobox', href: '/components/combobox' },
      { key: 'checkbox', title: 'Checkbox', href: '/components/checkbox' },
      { key: 'radio', title: 'Radio', href: '/components/radio' },
      { key: 'switch', title: 'Switch', href: '/components/switch' },
      { key: 'slider', title: 'Slider', href: '/components/slider' },
      { key: 'toggle', title: 'Toggle', href: '/components/toggle' },
      { key: 'segment-controller', title: 'SegmentController', href: '/components/segment-controller' },
      { key: 'date-picker', title: 'DatePicker', href: '/components/date-picker' },
      { key: 'color-picker', title: 'ColorPicker', href: '/components/color-picker' },
    ],
  },
  {
    key: 'data-display',
    title: 'Data Display',
    items: [
      { key: 'badge', title: 'Badge', href: '/components/badge' },
      { key: 'avatar', title: 'Avatar', href: '/components/avatar' },
      { key: 'chip', title: 'Chip', href: '/components/chip' },
      { key: 'progress', title: 'Progress', href: '/components/progress' },
      { key: 'table', title: 'Table', href: '/components/table' },
      { key: 'indicator', title: 'Indicator', href: '/components/indicator' },
      { key: 'skeleton', title: 'Skeleton', href: '/components/skeleton' },
      { key: 'codeblock', title: 'CodeBlock', href: '/components/codeblock' },
      { key: 'card', title: 'Card', href: '/components/card' },
      { key: 'empty-state', title: 'EmptyState', href: '/components/empty-state' },
    ],
  },
  {
    key: 'charts',
    title: 'Charts',
    items: [
      { key: 'chart', title: 'Chart', href: '/components/chart' },
    ],
  },
  {
    key: 'feedback',
    title: 'Feedback',
    items: [
      { key: 'alert', title: 'Alert', href: '/components/alert' },
      { key: 'toast', title: 'Toast', href: '/components/toast' },
      { key: 'snackbar', title: 'Snackbar', href: '/components/snackbar' },
      { key: 'divider', title: 'Divider', href: '/components/divider' },
    ],
  },
  {
    key: 'navigation',
    title: 'Navigation',
    items: [
      { key: 'tabs', title: 'Tabs', href: '/components/tabs' },
      { key: 'accordion', title: 'Accordion', href: '/components/accordion' },
      { key: 'breadcrumb', title: 'Breadcrumb', href: '/components/breadcrumb' },
      { key: 'pagination', title: 'Pagination', href: '/components/pagination' },
      { key: 'stepper', title: 'Stepper', href: '/components/stepper' },
    ],
  },
  {
    key: 'overlay',
    title: 'Overlay',
    items: [
      { key: 'dialog', title: 'Dialog', href: '/components/dialog' },
      { key: 'modal', title: 'Modal', href: '/components/modal' },
      { key: 'drawer', title: 'Drawer', href: '/components/drawer' },
    ],
  },
  {
    key: 'layout',
    title: 'Layout',
    items: [
      { key: 'stack', title: 'Stack', href: '/components/stack' },
      { key: 'layout', title: 'Layout', href: '/components/layout' },
    ],
  },
];
