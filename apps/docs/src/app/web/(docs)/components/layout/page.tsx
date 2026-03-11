'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocSubSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`rounded bg-[var(--secondary)] ${className ?? ''}`} />
);

function LayoutPreview({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" className="block no-underline group w-full">
      <div className="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden h-48 w-full relative transition-colors group-hover:border-[var(--primary)]/50">
        {children}
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--foreground)]/0 group-hover:bg-[var(--foreground)]/5 transition-colors">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--card)] border border-solid border-[var(--border)] shadow-sm text-xs font-medium text-[var(--foreground)]">
            <ExternalLink size={12} />
            Preview
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function LayoutPage() {
  const pt = usePageTranslation('layout');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Layout'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Pre-built page layout compositions and building block components for common application patterns. All page layouts share a common shell with optional header and footer slots.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode
          code={`import { SingleColumnPage, SidebarPage, DualSidebarPage, StackedPage, HolyGrailPage, SplitPage, GridPage, AsymmetricPage, PageLayout, Header, Sidebar, Main, Footer, Container } from '@tac-ui/web';`}
        />
      </DocSection>

      {/* ─── Page Layouts ─── */}

      <DocSection title={pt?.sections?.['single-column-page']?.title ?? 'SingleColumnPage'}>
        <DocText>
          {pt?.sections?.['single-column-page']?.texts?.[0] ??
            'A centered single-column layout ideal for content-focused pages like blog posts, articles, documentation, and landing pages. Content is horizontally centered with responsive padding and a configurable max-width constraint.'}
        </DocText>
        <Showcase
          code={`<SingleColumnPage
  maxWidth="lg"
  header={<Header sticky bordered>Navigation</Header>}
  footer={<Footer>Footer</Footer>}
>
  <p>Page content goes here</p>
</SingleColumnPage>`}
        >
          <LayoutPreview href="/web/examples/layout/single-column">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <SkeletonBlock className="flex-1 w-3/4 mx-auto" />
              <SkeletonBlock className="h-5 w-full" />
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'maxWidth',
              type: '"sm" | "md" | "lg" | "xl" | "full"',
              default: '"lg"',
              description:
                pt?.props?.['SingleColumnPage.maxWidth'] ??
                'Maximum width of the content column. sm=640px, md=768px, lg=1024px, xl=1280px.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SingleColumnPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SingleColumnPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sidebar-page']?.title ?? 'SidebarPage'}>
        <DocText>
          {pt?.sections?.['sidebar-page']?.texts?.[0] ??
            'A layout with a fixed-width sidebar and a scrollable main content area. The standard app shell pattern used for admin panels, settings pages, and navigation-heavy applications. The sidebar supports collapsing, positioning on either side, rounded floating style, and custom header with label/icon.'}
        </DocText>
        <Showcase
          code={`<SidebarPage
  sidebar={<nav>Sidebar navigation</nav>}
  sidebarWidth={280}
  sidebarPosition="left"
  sidebarLabel="Navigation"
  sidebarIcon={<Menu size={18} />}
  sidebarRounded
  collapsible
  defaultCollapsed={false}
  header={<Header sticky bordered>Navigation</Header>}
>
  <p>Main content</p>
</SidebarPage>`}
        >
          <LayoutPreview href="/web/examples/layout/sidebar">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="w-1/4" />
                <SkeletonBlock className="flex-1" />
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'sidebar',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SidebarPage.sidebar'] ?? 'Content rendered inside the sidebar panel. Required.',
            },
            {
              name: 'sidebarWidth',
              type: 'number',
              default: '280',
              description: pt?.props?.['SidebarPage.sidebarWidth'] ?? 'Width of the sidebar in pixels when expanded.',
            },
            {
              name: 'sidebarPosition',
              type: '"left" | "right"',
              default: '"left"',
              description: pt?.props?.['SidebarPage.sidebarPosition'] ?? 'Which side the sidebar is placed on.',
            },
            {
              name: 'collapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['SidebarPage.collapsible'] ?? 'Whether the sidebar can be collapsed via a toggle button.',
            },
            {
              name: 'defaultCollapsed',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['SidebarPage.defaultCollapsed'] ?? 'Initial collapsed state when uncontrolled.',
            },
            {
              name: 'sidebarLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SidebarPage.sidebarLabel'] ?? 'Label displayed in the sidebar header area.',
            },
            {
              name: 'sidebarIcon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['SidebarPage.sidebarIcon'] ?? 'Icon displayed before the label in the sidebar header.',
            },
            {
              name: 'sidebarFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['SidebarPage.sidebarFillHeight'] ??
                'Whether the sidebar fills the remaining vertical space.',
            },
            {
              name: 'sidebarRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['SidebarPage.sidebarRounded'] ??
                'Whether the sidebar has rounded corners with a floating card style.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SidebarPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SidebarPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['dashboard-page']?.title ?? 'DashboardPage'}>
        <DocText>
          {pt?.sections?.['dashboard-page']?.texts?.[0] ??
            'A dashboard layout with a left-anchored navigation sidebar and a main content area. Similar to SidebarPage but specialized for dashboard use cases where the sidebar is always on the left. Commonly combined with GridPage children for card-based dashboard grids.'}
        </DocText>
        <Showcase
          code={`<DashboardPage
  sidebar={<nav>Dashboard nav</nav>}
  sidebarWidth={260}
  sidebarLabel="Dashboard"
  collapsible
  header={<Header sticky bordered blur>App Header</Header>}
>
  <GridPage columns={3}>
    <Card>Stats</Card>
    <Card>Chart</Card>
    <Card>Table</Card>
  </GridPage>
</DashboardPage>`}
        >
          <LayoutPreview href="/web/examples/layout/dashboard">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="w-1/5" />
                <div className="flex-1 grid grid-cols-3 gap-1">
                  <SkeletonBlock />
                  <SkeletonBlock />
                  <SkeletonBlock />
                  <SkeletonBlock className="col-span-2" />
                  <SkeletonBlock />
                </div>
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'sidebar',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['DashboardPage.sidebar'] ?? 'Content rendered inside the left sidebar panel. Required.',
            },
            {
              name: 'sidebarWidth',
              type: 'number',
              default: '260',
              description: pt?.props?.['DashboardPage.sidebarWidth'] ?? 'Width of the sidebar in pixels when expanded.',
            },
            {
              name: 'collapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DashboardPage.collapsible'] ?? 'Whether the sidebar can be collapsed via a toggle button.',
            },
            {
              name: 'defaultCollapsed',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DashboardPage.defaultCollapsed'] ?? 'Initial collapsed state when uncontrolled.',
            },
            {
              name: 'sidebarLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DashboardPage.sidebarLabel'] ?? 'Label displayed in the sidebar header area.',
            },
            {
              name: 'sidebarIcon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['DashboardPage.sidebarIcon'] ?? 'Icon displayed before the label in the sidebar header.',
            },
            {
              name: 'sidebarFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['DashboardPage.sidebarFillHeight'] ??
                'Whether the sidebar fills the remaining vertical space.',
            },
            {
              name: 'sidebarRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DashboardPage.sidebarRounded'] ??
                'Whether the sidebar has rounded corners with a floating card style.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DashboardPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DashboardPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['split-page']?.title ?? 'SplitPage'}>
        <DocText>
          {pt?.sections?.['split-page']?.texts?.[0] ??
            'A two-pane layout with equal-width left and right panels separated by a border. Ideal for side-by-side comparisons, authentication pages (hero + form), dual-panel editors, or before/after views. Each panel scrolls independently.'}
        </DocText>
        <Showcase
          code={`<SplitPage
  left={<div>Left panel content</div>}
  right={<div>Right panel content</div>}
  header={<Header sticky bordered>App</Header>}
/>`}
        >
          <LayoutPreview href="/web/examples/layout/split">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="flex-1" />
                <SkeletonBlock className="flex-1" />
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'left',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SplitPage.left'] ?? 'Content rendered in the left panel. Required.',
            },
            {
              name: 'right',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SplitPage.right'] ?? 'Content rendered in the right panel. Required.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SplitPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['SplitPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['grid-page']?.title ?? 'GridPage'}>
        <DocText>
          {pt?.sections?.['grid-page']?.texts?.[0] ??
            'A responsive grid layout that distributes children into columns. Columns are responsive by default: single column on mobile, scaling up to the configured column count on wider screens. Useful for card grids, image galleries, and product listings.'}
        </DocText>
        <Showcase
          code={`<GridPage
  columns={3}
  header={<Header sticky bordered>App</Header>}
>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</GridPage>`}
        >
          <LayoutPreview href="/web/examples/layout/grid">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex-1 grid grid-cols-3 gap-1">
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'columns',
              type: '2 | 3 | 4',
              default: '3',
              description:
                pt?.props?.['GridPage.columns'] ??
                'Number of grid columns at the widest breakpoint. Responsive: 2-col uses md breakpoint, 3-col uses md+lg, 4-col uses sm+lg.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['GridPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['GridPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['stacked-page']?.title ?? 'StackedPage'}>
        <DocText>
          {pt?.sections?.['stacked-page']?.texts?.[0] ??
            'A vertically stacked layout where children fill the main column in document order. Each child is rendered as a full-width section in a flex column. Ideal for multi-section landing pages, onboarding flows, and long-scroll storytelling pages.'}
        </DocText>
        <Showcase
          code={`<StackedPage header={<Header sticky bordered>Navigation</Header>}>
  <section>Hero Section</section>
  <section>Features</section>
  <section>Testimonials</section>
</StackedPage>`}
        >
          <LayoutPreview href="/web/examples/layout/stacked">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <SkeletonBlock className="h-14" />
              <SkeletonBlock className="h-10" />
              <SkeletonBlock className="flex-1" />
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['StackedPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['StackedPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['dual-sidebar-page']?.title ?? 'DualSidebarPage'}>
        <DocText>
          {pt?.sections?.['dual-sidebar-page']?.texts?.[0] ??
            'Three-column layout with independent left and right sidebars flanking the main content. Each sidebar has its own width, collapsibility, label, icon, and style options. Useful for IDE-like interfaces, email clients, or content management systems where navigation and detail panels coexist.'}
        </DocText>
        <Showcase
          code={`<DualSidebarPage
  leftSidebar={<nav>Navigation</nav>}
  rightSidebar={<aside>Details panel</aside>}
  leftWidth={240}
  rightWidth={240}
  leftCollapsible
  rightCollapsible
  leftLabel="Explorer"
  rightLabel="Properties"
  header={<Header sticky bordered>App</Header>}
>
  <p>Main content</p>
</DualSidebarPage>`}
        >
          <LayoutPreview href="/web/examples/layout/dual-sidebar">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="w-1/5" />
                <SkeletonBlock className="flex-1" />
                <SkeletonBlock className="w-1/5" />
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'leftSidebar',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['DualSidebarPage.leftSidebar'] ?? 'Content rendered in the left sidebar panel. Required.',
            },
            {
              name: 'rightSidebar',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['DualSidebarPage.rightSidebar'] ?? 'Content rendered in the right sidebar panel. Required.',
            },
            {
              name: 'leftWidth',
              type: 'number',
              default: '240',
              description: pt?.props?.['DualSidebarPage.leftWidth'] ?? 'Width of the left sidebar in pixels.',
            },
            {
              name: 'rightWidth',
              type: 'number',
              default: '240',
              description: pt?.props?.['DualSidebarPage.rightWidth'] ?? 'Width of the right sidebar in pixels.',
            },
            {
              name: 'leftCollapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.leftCollapsible'] ?? 'Whether the left sidebar can be collapsed.',
            },
            {
              name: 'rightCollapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.rightCollapsible'] ?? 'Whether the right sidebar can be collapsed.',
            },
            {
              name: 'defaultLeftCollapsed',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.defaultLeftCollapsed'] ?? 'Initial collapsed state for the left sidebar.',
            },
            {
              name: 'defaultRightCollapsed',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.defaultRightCollapsed'] ??
                'Initial collapsed state for the right sidebar.',
            },
            {
              name: 'leftLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.leftLabel'] ?? 'Label displayed in the left sidebar header.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.leftIcon'] ?? 'Icon displayed before the left sidebar label.',
            },
            {
              name: 'rightLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.rightLabel'] ?? 'Label displayed in the right sidebar header.',
            },
            {
              name: 'rightIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.rightIcon'] ?? 'Icon displayed before the right sidebar label.',
            },
            {
              name: 'leftFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['DualSidebarPage.leftFillHeight'] ??
                'Whether the left sidebar fills the remaining vertical space.',
            },
            {
              name: 'rightFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['DualSidebarPage.rightFillHeight'] ??
                'Whether the right sidebar fills the remaining vertical space.',
            },
            {
              name: 'leftRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.leftRounded'] ??
                'Whether the left sidebar has a rounded floating card style.',
            },
            {
              name: 'rightRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['DualSidebarPage.rightRounded'] ??
                'Whether the right sidebar has a rounded floating card style.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['DualSidebarPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['holy-grail-page']?.title ?? 'HolyGrailPage'}>
        <DocText>
          {pt?.sections?.['holy-grail-page']?.texts?.[0] ??
            'Classic holy-grail layout: full-width header and footer with a three-column body containing navigation, main content, and an aside. Structurally similar to DualSidebarPage but semantically designed for the traditional web layout pattern with header/footer spanning the full width.'}
        </DocText>
        <Showcase
          code={`<HolyGrailPage
  leftSidebar={<nav>Nav</nav>}
  rightSidebar={<aside>Aside</aside>}
  leftCollapsible
  rightCollapsible
  header={<Header sticky bordered>App</Header>}
  footer={<Footer bordered>Footer</Footer>}
>
  <p>Main content</p>
</HolyGrailPage>`}
        >
          <LayoutPreview href="/web/examples/layout/holy-grail">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="w-1/6" />
                <SkeletonBlock className="flex-1" />
                <SkeletonBlock className="w-1/6" />
              </div>
              <SkeletonBlock className="h-5 w-full" />
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'leftSidebar',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['HolyGrailPage.leftSidebar'] ??
                'Content rendered in the left navigation sidebar. Required.',
            },
            {
              name: 'rightSidebar',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['HolyGrailPage.rightSidebar'] ?? 'Content rendered in the right aside sidebar. Required.',
            },
            {
              name: 'leftWidth',
              type: 'number',
              default: '220',
              description: pt?.props?.['HolyGrailPage.leftWidth'] ?? 'Width of the left sidebar in pixels.',
            },
            {
              name: 'rightWidth',
              type: 'number',
              default: '220',
              description: pt?.props?.['HolyGrailPage.rightWidth'] ?? 'Width of the right sidebar in pixels.',
            },
            {
              name: 'leftCollapsible',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['HolyGrailPage.leftCollapsible'] ?? 'Whether the left sidebar can be collapsed.',
            },
            {
              name: 'rightCollapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['HolyGrailPage.rightCollapsible'] ?? 'Whether the right sidebar can be collapsed.',
            },
            {
              name: 'defaultLeftCollapsed',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['HolyGrailPage.defaultLeftCollapsed'] ?? 'Initial collapsed state for the left sidebar.',
            },
            {
              name: 'defaultRightCollapsed',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['HolyGrailPage.defaultRightCollapsed'] ?? 'Initial collapsed state for the right sidebar.',
            },
            {
              name: 'leftLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['HolyGrailPage.leftLabel'] ?? 'Label displayed in the left sidebar header.',
            },
            {
              name: 'leftIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['HolyGrailPage.leftIcon'] ?? 'Icon displayed before the left sidebar label.',
            },
            {
              name: 'rightLabel',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['HolyGrailPage.rightLabel'] ?? 'Label displayed in the right sidebar header.',
            },
            {
              name: 'rightIcon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['HolyGrailPage.rightIcon'] ?? 'Icon displayed before the right sidebar label.',
            },
            {
              name: 'leftFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['HolyGrailPage.leftFillHeight'] ??
                'Whether the left sidebar fills the remaining vertical space.',
            },
            {
              name: 'rightFillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['HolyGrailPage.rightFillHeight'] ??
                'Whether the right sidebar fills the remaining vertical space.',
            },
            {
              name: 'leftRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['HolyGrailPage.leftRounded'] ??
                'Whether the left sidebar has a rounded floating card style.',
            },
            {
              name: 'rightRounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['HolyGrailPage.rightRounded'] ??
                'Whether the right sidebar has a rounded floating card style.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['HolyGrailPage.header'] ?? 'Content rendered in the full-width top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['HolyGrailPage.footer'] ?? 'Content rendered in the full-width bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['asymmetric-page']?.title ?? 'AsymmetricPage'}>
        <DocText>
          {pt?.sections?.['asymmetric-page']?.texts?.[0] ??
            'Two-pane layout with a configurable flex ratio between the primary and secondary panels. The secondary panel has a card-style background and a left border. Ideal for article + sidebar, main content + related items, or any layout where one pane should be visually dominant.'}
        </DocText>
        <Showcase
          code={`<AsymmetricPage
  primary={<div>Main article</div>}
  secondary={<div>Related content</div>}
  ratio="2:1"
  header={<Header sticky bordered>App</Header>}
/>`}
        >
          <LayoutPreview href="/web/examples/layout/asymmetric">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--background)]">
              <SkeletonBlock className="h-6 w-full" />
              <div className="flex flex-1 gap-1">
                <SkeletonBlock className="flex-[2]" />
                <SkeletonBlock className="flex-1" />
              </div>
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'primary',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['AsymmetricPage.primary'] ??
                'Content rendered in the primary (wider by default) panel. Required.',
            },
            {
              name: 'secondary',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['AsymmetricPage.secondary'] ??
                'Content rendered in the secondary panel (card background). Required.',
            },
            {
              name: 'ratio',
              type: '"2:1" | "3:1" | "1:2" | "1:3"',
              default: '"2:1"',
              description:
                pt?.props?.['AsymmetricPage.ratio'] ?? 'Flex width ratio between primary and secondary panels.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['AsymmetricPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['AsymmetricPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['app-page']?.title ?? 'AppPage'}>
        <DocText>
          {pt?.sections?.['app-page']?.texts?.[0] ??
            'A narrow, fixed-width layout optimized for mobile apps and webview embedding. Full-width on small screens, centered with an optional elevated card style on larger screens. Supports safe-area inset padding for native iOS/Android webview environments, and independently controllable sticky header/footer.'}
        </DocText>
        <Showcase
          code={`<AppPage
  maxWidth="sm"
  elevated
  safeArea
  header={<Header sticky bordered>App</Header>}
  footer={<Footer bordered>Footer</Footer>}
>
  <p>Mobile-optimized content</p>
</AppPage>`}
        >
          <LayoutPreview href="/web/examples/layout/app-page">
            <div className="h-full flex flex-col gap-1 p-2 bg-[var(--secondary)]/30">
              <SkeletonBlock className="h-6 w-2/5 mx-auto" />
              <SkeletonBlock className="flex-1 w-2/5 mx-auto" />
              <SkeletonBlock className="h-5 w-2/5 mx-auto" />
            </div>
          </LayoutPreview>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'maxWidth',
              type: '"xs" | "sm" | "md" | "lg"',
              default: '"sm"',
              description:
                pt?.props?.['AppPage.maxWidth'] ?? 'Maximum content width. xs=360px, sm=390px, md=430px, lg=520px.',
            },
            {
              name: 'elevated',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['AppPage.elevated'] ??
                'Render as an elevated card with borders and shadow on wider screens (sm+ breakpoint).',
            },
            {
              name: 'safeArea',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['AppPage.safeArea'] ??
                'Apply safe-area inset padding (env(safe-area-inset-*)) for native webview environments.',
            },
            {
              name: 'stickyHeader',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['AppPage.stickyHeader'] ?? 'Whether the header sticks to the top of the viewport.',
            },
            {
              name: 'stickyFooter',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['AppPage.stickyFooter'] ?? 'Whether the footer sticks to the bottom of the viewport.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['AppPage.header'] ?? 'Content rendered in the top header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['AppPage.footer'] ?? 'Content rendered in the bottom footer slot.',
            },
          ]}
        />
      </DocSection>

      {/* ─── Building Blocks ─── */}

      <DocSection title={pt?.sections?.['building-blocks']?.title ?? 'Building Blocks'}>
        <DocText>
          {pt?.sections?.['building-blocks']?.texts?.[0] ??
            'Low-level layout primitives used to compose the page layouts above. These can also be used independently to build custom layouts.'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['header']?.title ?? 'Header'}>
        <DocText>
          {pt?.sections?.['header']?.texts?.[0] ??
            'Top-level page header bar (64px height) with optional sticky positioning, bottom border, backdrop blur, and auto-hide on scroll. Uses flex row layout for aligning navigation items. The header preserves its height via shrink-0, preventing compression in flex column containers.'}
        </DocText>
        <Showcase
          code={`// Basic header
<Header sticky bordered>Navigation</Header>

// Blur + auto-hide header
<Header sticky bordered blur autoHide>
  <span>Logo</span>
  <nav>Links</nav>
</Header>`}
        >
          <div className="w-full flex flex-col gap-2">
            <div className="h-10 flex items-center px-4 rounded-[var(--radius-m)] bg-[var(--card)] border border-solid border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Header — sticky bordered</span>
            </div>
            <div className="h-10 flex items-center px-4 rounded-[var(--radius-m)] bg-[var(--card)]/80 backdrop-blur-lg border border-solid border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Header — sticky bordered blur autoHide</span>
            </div>
          </div>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'sticky',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Header.sticky'] ??
                'Whether the header sticks to the top of the viewport on scroll (sticky top-0 with z-index).',
            },
            {
              name: 'bordered',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['Header.bordered'] ??
                'Whether to render a bottom border separating the header from content.',
            },
            {
              name: 'blur',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Header.blur'] ??
                'Apply backdrop blur with semi-transparent background (bg-[var(--card)]/80 backdrop-blur-lg). Great for overlapping scroll content.',
            },
            {
              name: 'autoHide',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Header.autoHide'] ??
                'Auto-hide the header when scrolling down, reappear when scrolling up. Triggers after 64px of scroll. Works best combined with sticky.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['footer']?.title ?? 'Footer'}>
        <DocText>
          {pt?.sections?.['footer']?.texts?.[0] ??
            'Page footer bar with optional top border. Renders a footer element with card background and horizontal padding.'}
        </DocText>
        <Showcase
          code={`<Footer bordered>
  <p>© 2025 Company</p>
</Footer>`}
        >
          <div className="w-full">
            <div className="h-10 flex items-center px-4 rounded-[var(--radius-m)] bg-[var(--card)] border border-solid border-[var(--border)]">
              <span className="text-xs text-[var(--muted-foreground)]">Footer — bordered</span>
            </div>
          </div>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'bordered',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['Footer.bordered'] ?? 'Whether to render a top border separating the footer from content.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sidebar']?.title ?? 'Sidebar'}>
        <DocText>
          {pt?.sections?.['sidebar']?.texts?.[0] ??
            'Collapsible side panel that can be positioned on the left or right of the layout. Features animated collapse/expand transitions, a header area with label, icon, and toggle button, a scrollable content area, and an optional pinned footer. When collapsed, the sidebar shrinks to 64px (icon-only width). The rounded variant renders the sidebar as a floating card with margins and rounded corners.'}
        </DocText>
        <Showcase
          code={`<Sidebar
  width={280}
  position="left"
  label="Navigation"
  icon={<Menu size={18} />}
  collapsible
  collapsed={collapsed}
  onCollapse={setCollapsed}
  rounded
  swapOnCollapse
  footer={<SidebarFooter>Settings</SidebarFooter>}
>
  <SidebarGroup label="Menu">
    <SidebarItem variant="filled" size="md" icon={<Home />} active>Home</SidebarItem>
    <SidebarItem variant="filled" size="md" icon={<Settings />}>Settings</SidebarItem>
  </SidebarGroup>
</Sidebar>`}
        >
          <div className="w-full flex gap-3">
            <div className="w-48 h-40 flex flex-col rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="px-3 py-2 border-b border-solid border-[var(--border)] text-xs font-semibold text-[var(--foreground)]">
                Navigation
              </div>
              <div className="flex-1 px-2 py-1.5 flex flex-col gap-1">
                <div className="h-6 rounded-[var(--radius-m)] bg-[var(--primary)] px-2 flex items-center text-[10px] text-[var(--primary-foreground)]">
                  Home
                </div>
                <div className="h-6 rounded-[var(--radius-m)] px-2 flex items-center text-[10px] text-[var(--muted-foreground)]">
                  Settings
                </div>
              </div>
            </div>
            <div className="w-12 h-40 flex flex-col items-center rounded-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="py-3 border-b border-solid border-[var(--border)] w-full flex justify-center">
                <div className="w-4 h-4 rounded bg-[var(--secondary)]" />
              </div>
              <div className="flex-1 py-2 flex flex-col gap-2 items-center">
                <div className="w-6 h-6 rounded-[var(--radius-m)] bg-[var(--primary)]" />
                <div className="w-6 h-6 rounded-[var(--radius-m)] bg-[var(--secondary)]" />
              </div>
            </div>
          </div>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'width',
              type: 'number',
              default: '280',
              description:
                pt?.props?.['Sidebar.width'] ??
                'Width of the sidebar in pixels when expanded. Collapsed width is always 64px.',
            },
            {
              name: 'position',
              type: '"left" | "right"',
              default: '"left"',
              description:
                pt?.props?.['Sidebar.position'] ??
                'Which side of the layout the sidebar appears on. Controls border side and toggle icon direction.',
            },
            {
              name: 'label',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['Sidebar.label'] ?? 'Label displayed in the sidebar header. Hidden when collapsed.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['Sidebar.icon'] ??
                'Icon displayed before the label in the sidebar header. Shown alone when collapsed.',
            },
            {
              name: 'collapsible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Sidebar.collapsible'] ??
                'Whether a toggle button is rendered to collapse/expand the sidebar.',
            },
            {
              name: 'collapsed',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['Sidebar.collapsed'] ?? 'Controlled collapsed state of the sidebar.',
            },
            {
              name: 'onCollapse',
              type: '(collapsed: boolean) => void',
              default: '-',
              description: pt?.props?.['Sidebar.onCollapse'] ?? 'Callback fired when the collapse toggle is clicked.',
            },
            {
              name: 'fillHeight',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['Sidebar.fillHeight'] ?? 'Whether the sidebar fills the remaining vertical space (h-full).',
            },
            {
              name: 'rounded',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Sidebar.rounded'] ??
                'Whether the sidebar has rounded corners with a floating card style (border + margin + rounded corners).',
            },
            {
              name: 'swapOnCollapse',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['Sidebar.swapOnCollapse'] ??
                'When true, the icon is hidden when expanded and the label is hidden when collapsed, swapping between them.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['Sidebar.footer'] ??
                'Content rendered in a fixed footer area at the bottom of the sidebar.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['sidebar-sub-components']?.title ?? 'Sidebar Sub-components'}>
        <DocText>
          {pt?.sections?.['sidebar-sub-components']?.texts?.[0] ??
            'Components designed to be used inside Sidebar for structured navigation. They automatically respond to the parent Sidebar\u0027s collapsed state via SidebarContext.'}
        </DocText>

        <DocSubSection title="SidebarHeader">
          <DocText>
            {pt?.sections?.['sidebar-sub-components']?.texts?.[0]
              ? 'SidebarHeader는 사이드바 헤더 영역을 렌더링합니다. label/icon props로 간단하게 사용하거나, children을 전달하여 접힘/펼침 상태에 따른 커스텀 콘텐츠를 렌더링할 수 있습니다. SidebarContext에서 collapsed, collapsible, position 상태를 읽어옵니다.'
              : 'Renders the sidebar header area. Use label/icon props for simple usage, or pass custom children for full control over collapsed/expanded rendering. Reads collapsed, collapsible, and position from SidebarContext. The collapse toggle button is automatically rendered when collapsible is enabled in the parent Sidebar.'}
          </DocText>
          <PropsTable
            data={[
              {
                name: 'label',
                type: 'React.ReactNode',
                default: '-',
                description:
                  pt?.props?.['SidebarHeader.label'] ??
                  'Label displayed in the sidebar header. Hidden when collapsed.',
              },
              {
                name: 'icon',
                type: 'React.ReactNode',
                default: '-',
                description:
                  pt?.props?.['SidebarHeader.icon'] ??
                  'Icon displayed before the label. Shown alone when collapsed.',
              },
              {
                name: 'swapOnCollapse',
                type: 'boolean',
                default: 'false',
                description:
                  pt?.props?.['SidebarHeader.swapOnCollapse'] ??
                  'When true, the icon is hidden when expanded and the label is hidden when collapsed, swapping between them.',
              },
              {
                name: 'children',
                type: 'React.ReactNode',
                default: '-',
                description:
                  pt?.props?.['SidebarHeader.children'] ??
                  'Custom content that replaces the default label/icon rendering. Use useSidebarContext() inside children to react to collapsed state.',
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection title="SidebarGroup">
          <DocText>
            {pt?.sections?.['sidebar-sub-components']?.texts?.[0]
              ? 'SidebarGroup은 선택적 라벨 아래 사이드바 항목을 그룹화하며 접기 섹션을 지원합니다.'
              : 'Groups sidebar items under an optional label with support for collapsible sections. When the sidebar is collapsed, behavior depends on the collapseDisplay prop: "children" (default) shows the child items as icon-only, "group" shows only the group icon.'}
          </DocText>
          <PropsTable
            data={[
              {
                name: 'label',
                type: 'string',
                default: '-',
                description:
                  pt?.props?.['SidebarGroup.label'] ??
                  'Group label displayed above items. Hidden when sidebar is collapsed.',
              },
              {
                name: 'icon',
                type: 'React.ReactNode',
                default: '-',
                description:
                  pt?.props?.['SidebarGroup.icon'] ??
                  'Icon displayed before the label. Shown alone when sidebar is collapsed and collapseDisplay="group".',
              },
              {
                name: 'active',
                type: 'boolean',
                default: 'false',
                description:
                  pt?.props?.['SidebarGroup.active'] ??
                  'Whether a child item in this group is currently active. Highlights the group label with primary color.',
              },
              {
                name: 'collapseDisplay',
                type: '"group" | "children"',
                default: '"children"',
                description:
                  pt?.props?.['SidebarGroup.collapseDisplay'] ??
                  'What to show when the sidebar is collapsed. "group" shows the group icon only, "children" shows child items (icon-only).',
              },
              {
                name: 'collapsible',
                type: 'boolean',
                default: 'false',
                description:
                  pt?.props?.['SidebarGroup.collapsible'] ??
                  'Whether the group can be expanded/collapsed by clicking the header (chevron toggle).',
              },
              {
                name: 'defaultOpen',
                type: 'boolean',
                default: 'true',
                description:
                  pt?.props?.['SidebarGroup.defaultOpen'] ??
                  'Whether the group is open by default when collapsible is enabled.',
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection title="SidebarItem">
          <DocText>
            {pt?.sections?.['sidebar-sub-components']?.texts?.[0]
              ? 'SidebarItem은 선택적 아이콘과 활성 상태를 가진 개별 내비게이션 항목입니다.'
              : 'Individual navigation item with optional icon and active state. When the sidebar is collapsed, only the icon is visible. Items without icons are hidden when collapsed. Supports three active style variants: "subtle" (muted text, point color active), "filled" (primary background), and "foreground" (primary text + bold).'}
          </DocText>
          <PropsTable
            data={[
              {
                name: 'icon',
                type: 'React.ReactNode',
                default: '-',
                description:
                  pt?.props?.['SidebarItem.icon'] ??
                  'Icon rendered before the label. Shown alone when sidebar is collapsed. Items without icons are hidden when collapsed.',
              },
              {
                name: 'active',
                type: 'boolean',
                default: 'false',
                description: pt?.props?.['SidebarItem.active'] ?? 'Whether this item is currently active/selected.',
              },
              {
                name: 'variant',
                type: '"subtle" | "filled" | "foreground"',
                default: '"subtle"',
                description:
                  pt?.props?.['SidebarItem.variant'] ??
                  'Active style variant. "subtle" uses muted text with point color when active, "filled" uses primary background color, "foreground" uses primary text color with bold weight.',
              },
              {
                name: 'size',
                type: '"sm" | "md"',
                default: '"sm"',
                description:
                  pt?.props?.['SidebarItem.size'] ??
                  'Size of the sidebar item. "sm" uses compact padding and 13px text, "md" uses standard padding and 14px text.',
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection title="SidebarContent">
          <DocText>
            Arbitrary sidebar content container. Fully hidden with animation when the sidebar is collapsed. Useful for
            search bars, status indicators, or any non-navigation content.
          </DocText>
        </DocSubSection>

        <DocSubSection title="SidebarFooter">
          <DocText>
            Footer area pinned to the bottom of the sidebar. Content is hidden with animation when collapsed. Useful for
            user profiles, settings links, or version info.
          </DocText>
        </DocSubSection>
      </DocSection>

      <DocSection title={pt?.sections?.['container']?.title ?? 'Container'}>
        <DocText>
          {pt?.sections?.['container']?.texts?.[0] ??
            'Centered content wrapper with responsive horizontal padding (px-4 on mobile, px-6 on sm, px-8 on lg) and configurable max-width. A general-purpose content constraint component.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'size',
              type: '"sm" | "md" | "lg" | "xl" | "full"',
              default: '"lg"',
              description:
                pt?.props?.['Container.size'] ??
                'Maximum width of the container. sm=640px, md=768px, lg=1024px, xl=1280px, full=no limit.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['main']?.title ?? 'Main'}>
        <DocText>
          {pt?.sections?.['main']?.texts?.[0] ??
            'Primary content area that grows to fill available space (flex-1) with padding and optional max-width constraint. Used as the main content region inside layout compositions.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'maxWidth',
              type: '"sm" | "md" | "lg" | "xl" | "full"',
              default: '"full"',
              description:
                pt?.props?.['Main.maxWidth'] ??
                'Maximum width of the main content area with auto horizontal centering.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['floating-menu-bar']?.title ?? 'FloatingMenuBar'}>
        <DocText>
          {pt?.sections?.['floating-menu-bar']?.texts?.[0] ??
            'A floating navigation bar that hovers over page content with a pill-shaped appearance. Supports 9 positions in a 3x3 grid (top/middle/bottom x left/center/right), backdrop blur, and border. Commonly used as a bottom tab bar in mobile/app-like layouts or as a floating action toolbar.'}
        </DocText>
        <Showcase
          code={`<FloatingMenuBar position="bottom-center" bordered blur>
  <FloatingMenuItem icon={<Home size={18} />} label="Home" active />
  <FloatingMenuItem icon={<Search size={18} />} label="Search" />
  <FloatingMenuItem icon={<Bell size={18} />} label="Alerts" />
  <FloatingMenuItem icon={<User size={18} />} label="Profile" />
</FloatingMenuBar>`}
        >
          <div className="w-full flex justify-center">
            <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-[var(--card)]/90 backdrop-blur-lg border border-solid border-[var(--border)] shadow-lg">
              {['Home', 'Search', 'Alerts', 'Profile'].map((label, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full text-[10px] ${i === 0 ? 'text-[var(--primary)] font-medium' : 'text-[var(--muted-foreground)]'}`}
                >
                  <div className="w-4 h-4 rounded bg-current opacity-30" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Showcase>
        <PropsTable
          data={[
            {
              name: 'position',
              type: 'FloatingMenuBarPosition',
              default: '"bottom-center"',
              description:
                pt?.props?.['FloatingMenuBar.position'] ??
                'Where the bar is anchored on the screen. 9 positions: top-left, top-center, top-right, middle-left, middle-center, middle-right, bottom-left, bottom-center, bottom-right.',
            },
            {
              name: 'bordered',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['FloatingMenuBar.bordered'] ?? 'Whether to render a border around the menu bar.',
            },
            {
              name: 'blur',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['FloatingMenuBar.blur'] ?? 'Whether to apply a backdrop blur effect (backdrop-blur-lg).',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['floating-menu-item']?.title ?? 'FloatingMenuItem'}>
        <DocText>
          {pt?.sections?.['floating-menu-item']?.texts?.[0] ??
            'An individual item inside a FloatingMenuBar. Renders an icon with an optional text label underneath. Active state highlights the item with the primary color.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['FloatingMenuItem.icon'] ?? 'The icon to display. Required.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['FloatingMenuItem.label'] ?? 'Optional text label displayed below the icon.',
            },
            {
              name: 'active',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['FloatingMenuItem.active'] ??
                'Whether this item is the currently active route. Shows primary color when active.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['page-layout']?.title ?? 'PageLayout'}>
        <DocText>
          {pt?.sections?.['page-layout']?.texts?.[0] ??
            'Low-level full-page layout shell combining a header, optional sidebar, main content area, and footer. This is the base primitive used internally — prefer the higher-level page compositions (SidebarPage, DashboardPage, etc.) for most use cases.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'sidebar',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['PageLayout.sidebar'] ?? 'Whether to render a sidebar alongside the main content.',
            },
            {
              name: 'sidebarPosition',
              type: '"left" | "right"',
              default: '"left"',
              description: pt?.props?.['PageLayout.sidebarPosition'] ?? 'Which side the sidebar appears on.',
            },
            {
              name: 'header',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['PageLayout.header'] ?? 'Content rendered in the sticky header slot.',
            },
            {
              name: 'footer',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['PageLayout.footer'] ?? 'Content rendered in the footer slot.',
            },
          ]}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['hooks']?.title ?? 'Hooks'}>
        <DocText>
          {pt?.sections?.['hooks']?.texts?.[0] ?? 'Layout-related hooks for building custom sidebar components.'}
        </DocText>
        <PropsTable
          data={[
            {
              name: 'useSidebarContext()',
              type: '{ collapsed: boolean; collapsible: boolean; position: "left" | "right"; onCollapse?: (collapsed: boolean) => void }',
              default: '-',
              description:
                pt?.props?.['useSidebarContext'] ??
                'Returns the current sidebar context including collapsed state, collapsible flag, position, and onCollapse callback. Use inside Sidebar children to conditionally render content based on sidebar state.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
