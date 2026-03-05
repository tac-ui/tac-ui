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
      { key: 'introduction', title: 'Introduction', href: '/web/docs' },
      { key: 'installation', title: 'Installation', href: '/web/getting-started' },
      { key: 'llms-txt', title: 'llms', href: '/web/llms-txt' },
    ],
  },
  {
    key: 'foundations',
    title: 'Foundations',
    items: [
      { key: 'colors', title: 'Colors', href: '/web/foundations/colors' },
      { key: 'typography', title: 'Typography', href: '/web/foundations/typography' },
      { key: 'icons', title: 'Icons', href: '/web/foundations/icons' },
      { key: 'animations', title: 'Animations', href: '/web/foundations/animations' },
      { key: 'customization', title: 'Customization', href: '/web/foundations/customization' },
    ],
  },
  {
    key: 'actions',
    title: 'Actions',
    items: [
      { key: 'button', title: 'Button', href: '/web/components/button' },
      { key: 'dropdown', title: 'Dropdown', href: '/web/components/dropdown' },
      { key: 'popover', title: 'Popover', href: '/web/components/popover' },
      { key: 'tooltip', title: 'Tooltip', href: '/web/components/tooltip' },
    ],
  },
  {
    key: 'form',
    title: 'Form',
    items: [
      { key: 'input', title: 'Input', href: '/web/components/input' },
      { key: 'textarea', title: 'Textarea', href: '/web/components/textarea' },
      { key: 'select', title: 'Select', href: '/web/components/select' },
      { key: 'combobox', title: 'Combobox', href: '/web/components/combobox' },
      { key: 'checkbox', title: 'Checkbox', href: '/web/components/checkbox' },
      { key: 'radio', title: 'Radio', href: '/web/components/radio' },
      { key: 'switch', title: 'Switch', href: '/web/components/switch' },
      { key: 'slider', title: 'Slider', href: '/web/components/slider' },
      { key: 'toggle', title: 'Toggle', href: '/web/components/toggle' },
      { key: 'segment-controller', title: 'SegmentController', href: '/web/components/segment-controller' },
      { key: 'date-picker', title: 'DatePicker', href: '/web/components/date-picker' },
      { key: 'color-picker', title: 'ColorPicker', href: '/web/components/color-picker' },
    ],
  },
  {
    key: 'data-display',
    title: 'Data Display',
    items: [
      { key: 'badge', title: 'Badge', href: '/web/components/badge' },
      { key: 'avatar', title: 'Avatar', href: '/web/components/avatar' },
      { key: 'chip', title: 'Chip', href: '/web/components/chip' },
      { key: 'progress', title: 'Progress', href: '/web/components/progress' },
      { key: 'table', title: 'Table', href: '/web/components/table' },
      { key: 'indicator', title: 'Indicator', href: '/web/components/indicator' },
      { key: 'skeleton', title: 'Skeleton', href: '/web/components/skeleton' },
      { key: 'codeblock', title: 'CodeBlock', href: '/web/components/codeblock' },
      { key: 'card', title: 'Card', href: '/web/components/card' },
      { key: 'morphing-card', title: 'MorphingCard', href: '/web/components/morphing-card' },
      { key: 'empty-state', title: 'EmptyState', href: '/web/components/empty-state' },
    ],
  },
  {
    key: 'charts',
    title: 'Charts',
    items: [{ key: 'chart', title: 'Chart', href: '/web/components/chart' }],
  },
  {
    key: 'feedback',
    title: 'Feedback',
    items: [
      { key: 'alert', title: 'Alert', href: '/web/components/alert' },
      { key: 'toast', title: 'Toast', href: '/web/components/toast' },
      { key: 'snackbar', title: 'Snackbar', href: '/web/components/snackbar' },
      { key: 'divider', title: 'Divider', href: '/web/components/divider' },
    ],
  },
  {
    key: 'navigation',
    title: 'Navigation',
    items: [
      { key: 'tabs', title: 'Tabs', href: '/web/components/tabs' },
      { key: 'accordion', title: 'Accordion', href: '/web/components/accordion' },
      { key: 'breadcrumb', title: 'Breadcrumb', href: '/web/components/breadcrumb' },
      { key: 'pagination', title: 'Pagination', href: '/web/components/pagination' },
      { key: 'stepper', title: 'Stepper', href: '/web/components/stepper' },
    ],
  },
  {
    key: 'overlay',
    title: 'Overlay',
    items: [
      { key: 'dialog', title: 'Dialog', href: '/web/components/dialog' },
      { key: 'modal', title: 'Modal', href: '/web/components/modal' },
      { key: 'drawer', title: 'Drawer', href: '/web/components/drawer' },
    ],
  },
  {
    key: 'layout',
    title: 'Layout',
    items: [
      { key: 'stack', title: 'Stack', href: '/web/components/stack' },
      { key: 'layout', title: 'Layout', href: '/web/components/layout' },
    ],
  },
];
