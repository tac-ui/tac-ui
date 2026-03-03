import React, { forwardRef, useState } from 'react';
import { cn } from '../utils/cn';
import { Sidebar, LayoutContext } from './Layout';
import { Drawer } from './Drawer';

/* ─── Shared types ─── */

/** Maximum content width for single-column layouts. */
export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Side the sidebar is placed on. */
export type SidebarPosition = 'left' | 'right';

/** Number of grid columns for GridPage. */
export type GridColumns = 2 | 3 | 4;

/** Width ratio between the primary and secondary panes in AsymmetricPage. */
export type AsymmetricRatio = '2:1' | '3:1' | '1:2' | '1:3';

/* ─── Shared base ─── */

interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered in the top header slot. */
  header?: React.ReactNode;
  /** Content rendered in the bottom footer slot. */
  footer?: React.ReactNode;
}

const Shell = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('h-full min-h-screen flex flex-col bg-[var(--background)]', className)} {...props} />
  ),
);
Shell.displayName = 'Shell';

/* ─── 1. SingleColumnPage ─── */

/**
 * Single centered content column with configurable max-width and optional header/footer.
 */
export interface SingleColumnPageProps extends BaseLayoutProps {
  /** Maximum width of the content column. @example maxWidth="lg" */
  maxWidth?: MaxWidth;
}

export const SingleColumnPage = forwardRef<HTMLDivElement, SingleColumnPageProps>(
  ({ header, footer, maxWidth = 'lg', className, children, ...props }, ref) => {
    const maxWidthClass = {
      sm: 'max-w-[640px]',
      md: 'max-w-[768px]',
      lg: 'max-w-[1024px]',
      xl: 'max-w-[1280px]',
      full: 'max-w-full',
    }[maxWidth];

    return (
      <Shell ref={ref} className={className} {...props}>
        {header}
        <main className={cn('flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200', maxWidthClass)}>
          {children}
        </main>
        {footer}
      </Shell>
    );
  },
);
SingleColumnPage.displayName = 'SingleColumnPage';

/* ─── 2. SidebarPage ─── */

/**
 * Page layout with a fixed-width sidebar and a scrollable main content area.
 */
export interface SidebarPageProps extends BaseLayoutProps {
  /** Content rendered inside the sidebar panel. */
  sidebar: React.ReactNode;
  /** Width of the sidebar in pixels. @example sidebarWidth={280} */
  sidebarWidth?: number;
  /** Side the sidebar is placed on. @example sidebarPosition="right" */
  sidebarPosition?: SidebarPosition;
  /** Whether the sidebar can be collapsed. */
  collapsible?: boolean;
  /** Initial collapsed state when uncontrolled. */
  defaultCollapsed?: boolean;
  /** Label displayed in the sidebar header. */
  sidebarLabel?: React.ReactNode;
  /** Icon displayed before the label in the sidebar header. */
  sidebarIcon?: React.ReactNode;
  /** Whether the sidebar fills the remaining vertical space. @default true */
  sidebarFillHeight?: boolean;
  /** Whether the sidebar has rounded corners with a floating card style. @default false */
  sidebarRounded?: boolean;
}

export const SidebarPage = forwardRef<HTMLDivElement, SidebarPageProps>(
  ({ header, footer, sidebar, sidebarWidth = 280, sidebarPosition = 'left', collapsible, defaultCollapsed = false, sidebarLabel, sidebarIcon, sidebarFillHeight, sidebarRounded, className, children, ...props }, ref) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
      <LayoutContext.Provider value={{
        hasSidebar: true,
        mobileSidebarOpen,
        setMobileSidebarOpen: sidebarPosition === 'left' ? setMobileSidebarOpen : undefined,
        hasRightSidebar: sidebarPosition === 'right',
        mobileRightSidebarOpen: mobileSidebarOpen,
        setMobileRightSidebarOpen: sidebarPosition === 'right' ? setMobileSidebarOpen : undefined,
      }}>
        <Shell ref={ref} className={className} {...props}>
          {header}
          <div className="flex flex-1 overflow-hidden">
            {sidebarPosition === 'left' && (
              <Sidebar width={sidebarWidth} position="left" collapsible={collapsible} collapsed={collapsed} onCollapse={setCollapsed} label={sidebarLabel} icon={sidebarIcon} fillHeight={sidebarFillHeight} rounded={sidebarRounded} className="hidden md:flex shrink-0">
                {sidebar}
              </Sidebar>
            )}
            <Drawer open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} side={sidebarPosition} className="p-0 border-none rounded-none" style={{ width: sidebarWidth }}>
              <Sidebar width={sidebarWidth} position={sidebarPosition} collapsible={false} label={sidebarLabel} icon={sidebarIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {sidebar}
              </Sidebar>
            </Drawer>
            <main className="flex-1 overflow-y-auto p-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{children}</main>
            {sidebarPosition === 'right' && (
              <Sidebar width={sidebarWidth} position="right" collapsible={collapsible} collapsed={collapsed} onCollapse={setCollapsed} label={sidebarLabel} icon={sidebarIcon} fillHeight={sidebarFillHeight} rounded={sidebarRounded} className="hidden md:flex shrink-0">
                {sidebar}
              </Sidebar>
            )}
          </div>
          {footer}
        </Shell>
      </LayoutContext.Provider>
    );
  },
);
SidebarPage.displayName = 'SidebarPage';

/* ─── 3. GridPage ─── */

/**
 * Page layout that arranges children in a responsive CSS grid with a configurable column count.
 */
export interface GridPageProps extends BaseLayoutProps {
  /** Number of grid columns at the widest breakpoint. @example columns={4} */
  columns?: GridColumns;
}

export const GridPage = forwardRef<HTMLDivElement, GridPageProps>(
  ({ header, footer, columns = 3, className, children, ...props }, ref) => {
    const colClass = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns];

    return (
      <Shell ref={ref} className={className} {...props}>
        {header}
        <main className="flex-1 p-6">
          <div className={cn('grid gap-6', colClass)}>{children}</div>
        </main>
        {footer}
      </Shell>
    );
  },
);
GridPage.displayName = 'GridPage';

/* ─── 4. DashboardPage ─── */

/**
 * Dashboard layout with a left-anchored navigation sidebar and a main content area.
 */
export interface DashboardPageProps extends BaseLayoutProps {
  /** Content rendered inside the left sidebar panel. */
  sidebar: React.ReactNode;
  /** Width of the sidebar in pixels. @example sidebarWidth={260} */
  sidebarWidth?: number;
  /** Whether the sidebar can be collapsed. */
  collapsible?: boolean;
  /** Initial collapsed state when uncontrolled. */
  defaultCollapsed?: boolean;
  /** Label displayed in the sidebar header. */
  sidebarLabel?: React.ReactNode;
  /** Icon displayed before the label in the sidebar header. */
  sidebarIcon?: React.ReactNode;
  /** Whether the sidebar fills the remaining vertical space. @default true */
  sidebarFillHeight?: boolean;
  /** Whether the sidebar has rounded corners with a floating card style. @default false */
  sidebarRounded?: boolean;
}

export const DashboardPage = forwardRef<HTMLDivElement, DashboardPageProps>(
  ({ header, footer, sidebar, sidebarWidth = 260, collapsible, defaultCollapsed = false, sidebarLabel, sidebarIcon, sidebarFillHeight, sidebarRounded, className, children, ...props }, ref) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
      <LayoutContext.Provider value={{ hasSidebar: true, mobileSidebarOpen, setMobileSidebarOpen }}>
        <Shell ref={ref} className={className} {...props}>
          {header}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar width={sidebarWidth} position="left" collapsible={collapsible} collapsed={collapsed} onCollapse={setCollapsed} label={sidebarLabel} icon={sidebarIcon} fillHeight={sidebarFillHeight} rounded={sidebarRounded} className="hidden md:flex shrink-0">
              {sidebar}
            </Sidebar>
            <Drawer open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} side="left" className="p-0 border-none rounded-none" style={{ width: sidebarWidth }}>
              <Sidebar width={sidebarWidth} position="left" collapsible={false} label={sidebarLabel} icon={sidebarIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {sidebar}
              </Sidebar>
            </Drawer>
            <main className="flex-1 overflow-y-auto p-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{children}</main>
          </div>
          {footer}
        </Shell>
      </LayoutContext.Provider>
    );
  },
);
DashboardPage.displayName = 'DashboardPage';

/* ─── 5. SplitPage ─── */

/**
 * Two-pane layout with equal-width left and right panels separated by a border.
 */
export interface SplitPageProps extends BaseLayoutProps {
  /** Content rendered in the left panel. */
  left: React.ReactNode;
  /** Content rendered in the right panel. */
  right: React.ReactNode;
}

export const SplitPage = forwardRef<HTMLDivElement, SplitPageProps>(
  ({ header, footer, left, right, className, children: _children, ...props }, ref) => (
    <Shell ref={ref} className={className} {...props}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 border-r border-solid border-[var(--border)] animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{left}</div>
        <div className="flex-1 overflow-y-auto p-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{right}</div>
      </div>
      {footer}
    </Shell>
  ),
);
SplitPage.displayName = 'SplitPage';

/* ─── 6. StackedPage ─── */

/**
 * Vertically stacked page layout where children fill the main column in document order.
 */
export type StackedPageProps = BaseLayoutProps;

export const StackedPage = forwardRef<HTMLDivElement, StackedPageProps>(
  ({ header, footer, className, children, ...props }, ref) => (
    <Shell ref={ref} className={className} {...props}>
      {header}
      <main className="flex-1 flex flex-col">{children}</main>
      {footer}
    </Shell>
  ),
);
StackedPage.displayName = 'StackedPage';

/* ─── 7. DualSidebarPage ─── */

/**
 * Three-column layout with independent left and right sidebars flanking the main content.
 */
export interface DualSidebarPageProps extends BaseLayoutProps {
  /** Content rendered in the left sidebar panel. */
  leftSidebar: React.ReactNode;
  /** Content rendered in the right sidebar panel. */
  rightSidebar: React.ReactNode;
  /** Width of the left sidebar in pixels. @example leftWidth={240} */
  leftWidth?: number;
  /** Width of the right sidebar in pixels. @example rightWidth={240} */
  rightWidth?: number;
  /** Whether the left sidebar can be collapsed. */
  leftCollapsible?: boolean;
  /** Whether the right sidebar can be collapsed. */
  rightCollapsible?: boolean;
  /** Initial collapsed state for the left sidebar. */
  defaultLeftCollapsed?: boolean;
  /** Initial collapsed state for the right sidebar. */
  defaultRightCollapsed?: boolean;
  /** Label displayed in the left sidebar header. */
  leftLabel?: React.ReactNode;
  /** Icon displayed before the label in the left sidebar header. */
  leftIcon?: React.ReactNode;
  /** Label displayed in the right sidebar header. */
  rightLabel?: React.ReactNode;
  /** Icon displayed before the label in the right sidebar header. */
  rightIcon?: React.ReactNode;
  /** Whether the left sidebar fills the remaining vertical space. @default true */
  leftFillHeight?: boolean;
  /** Whether the right sidebar fills the remaining vertical space. @default true */
  rightFillHeight?: boolean;
  /** Whether the left sidebar has rounded corners with a floating card style. @default false */
  leftRounded?: boolean;
  /** Whether the right sidebar has rounded corners with a floating card style. @default false */
  rightRounded?: boolean;
}

export const DualSidebarPage = forwardRef<HTMLDivElement, DualSidebarPageProps>(
  ({ header, footer, leftSidebar, rightSidebar, leftWidth = 240, rightWidth = 240, leftCollapsible, rightCollapsible, defaultLeftCollapsed = false, defaultRightCollapsed = false, leftLabel, leftIcon, rightLabel, rightIcon, leftFillHeight, rightFillHeight, leftRounded, rightRounded, className, children, ...props }, ref) => {
    const [leftCollapsed, setLeftCollapsed] = useState(defaultLeftCollapsed);
    const [rightCollapsed, setRightCollapsed] = useState(defaultRightCollapsed);
    const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
    const [mobileRightOpen, setMobileRightOpen] = useState(false);

    return (
      <LayoutContext.Provider value={{
        hasSidebar: true,
        mobileSidebarOpen: mobileLeftOpen,
        setMobileSidebarOpen: setMobileLeftOpen,
        hasRightSidebar: true,
        mobileRightSidebarOpen: mobileRightOpen,
        setMobileRightSidebarOpen: setMobileRightOpen,
      }}>
        <Shell ref={ref} className={className} {...props}>
          {header}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar width={leftWidth} position="left" collapsible={leftCollapsible} collapsed={leftCollapsed} onCollapse={setLeftCollapsed} label={leftLabel} icon={leftIcon} fillHeight={leftFillHeight} rounded={leftRounded} className="hidden md:flex shrink-0">
              {leftSidebar}
            </Sidebar>
            <Drawer open={mobileLeftOpen} onClose={() => setMobileLeftOpen(false)} side="left" className="p-0 border-none rounded-none" style={{ width: leftWidth }}>
              <Sidebar width={leftWidth} position="left" collapsible={false} label={leftLabel} icon={leftIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {leftSidebar}
              </Sidebar>
            </Drawer>

            <main className="flex-1 overflow-y-auto p-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{children}</main>

            <Drawer open={mobileRightOpen} onClose={() => setMobileRightOpen(false)} side="right" className="p-0 border-none rounded-none" style={{ width: rightWidth }}>
              <Sidebar width={rightWidth} position="right" collapsible={false} label={rightLabel} icon={rightIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {rightSidebar}
              </Sidebar>
            </Drawer>
            <Sidebar width={rightWidth} position="right" collapsible={rightCollapsible} collapsed={rightCollapsed} onCollapse={setRightCollapsed} label={rightLabel} icon={rightIcon} fillHeight={rightFillHeight} rounded={rightRounded} className="hidden md:flex shrink-0">
              {rightSidebar}
            </Sidebar>
          </div>
          {footer}
        </Shell>
      </LayoutContext.Provider>
    );
  },
);
DualSidebarPage.displayName = 'DualSidebarPage';

/* ─── 8. HolyGrailPage ─── */

/**
 * Classic holy-grail layout: full-width header/footer with a three-column body (nav, main, aside).
 */
export interface HolyGrailPageProps extends BaseLayoutProps {
  /** Content rendered in the left navigation sidebar. */
  leftSidebar: React.ReactNode;
  /** Content rendered in the right aside sidebar. */
  rightSidebar: React.ReactNode;
  /** Width of the left sidebar in pixels. @example leftWidth={220} */
  leftWidth?: number;
  /** Width of the right sidebar in pixels. @example rightWidth={220} */
  rightWidth?: number;
  /** Whether the left sidebar can be collapsed. */
  leftCollapsible?: boolean;
  /** Whether the right sidebar can be collapsed. */
  rightCollapsible?: boolean;
  /** Initial collapsed state for the left sidebar. */
  defaultLeftCollapsed?: boolean;
  /** Initial collapsed state for the right sidebar. */
  defaultRightCollapsed?: boolean;
  /** Label displayed in the left sidebar header. */
  leftLabel?: React.ReactNode;
  /** Icon displayed before the label in the left sidebar header. */
  leftIcon?: React.ReactNode;
  /** Label displayed in the right sidebar header. */
  rightLabel?: React.ReactNode;
  /** Icon displayed before the label in the right sidebar header. */
  rightIcon?: React.ReactNode;
  /** Whether the left sidebar fills the remaining vertical space. @default true */
  leftFillHeight?: boolean;
  /** Whether the right sidebar fills the remaining vertical space. @default true */
  rightFillHeight?: boolean;
  /** Whether the left sidebar has rounded corners with a floating card style. @default false */
  leftRounded?: boolean;
  /** Whether the right sidebar has rounded corners with a floating card style. @default false */
  rightRounded?: boolean;
}

export const HolyGrailPage = forwardRef<HTMLDivElement, HolyGrailPageProps>(
  ({ header, footer, leftSidebar, rightSidebar, leftWidth = 220, rightWidth = 220, leftCollapsible, rightCollapsible, defaultLeftCollapsed = false, defaultRightCollapsed = false, leftLabel, leftIcon, rightLabel, rightIcon, leftFillHeight, rightFillHeight, leftRounded, rightRounded, className, children, ...props }, ref) => {
    const [leftCollapsed, setLeftCollapsed] = useState(defaultLeftCollapsed);
    const [rightCollapsed, setRightCollapsed] = useState(defaultRightCollapsed);
    const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
    const [mobileRightOpen, setMobileRightOpen] = useState(false);

    return (
      <LayoutContext.Provider value={{
        hasSidebar: true,
        mobileSidebarOpen: mobileLeftOpen,
        setMobileSidebarOpen: setMobileLeftOpen,
        hasRightSidebar: true,
        mobileRightSidebarOpen: mobileRightOpen,
        setMobileRightSidebarOpen: setMobileRightOpen,
      }}>
        <Shell ref={ref} className={className} {...props}>
          {header}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar width={leftWidth} position="left" collapsible={leftCollapsible} collapsed={leftCollapsed} onCollapse={setLeftCollapsed} label={leftLabel} icon={leftIcon} fillHeight={leftFillHeight} rounded={leftRounded} className="hidden md:flex shrink-0">
              {leftSidebar}
            </Sidebar>
            <Drawer open={mobileLeftOpen} onClose={() => setMobileLeftOpen(false)} side="left" className="p-0 border-none rounded-none" style={{ width: leftWidth }}>
              <Sidebar width={leftWidth} position="left" collapsible={false} label={leftLabel} icon={leftIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {leftSidebar}
              </Sidebar>
            </Drawer>

            <main className="flex-1 overflow-y-auto p-6 animate-blur-fade-in [&>*]:animate-blur-fade-in [&>*]:opacity-0 [&>*:nth-child(1)]:animation-delay-0 [&>*:nth-child(2)]:animation-delay-75 [&>*:nth-child(3)]:animation-delay-150 [&>*:nth-child(n+4)]:animation-delay-200">{children}</main>

            <Drawer open={mobileRightOpen} onClose={() => setMobileRightOpen(false)} side="right" className="p-0 border-none rounded-none" style={{ width: rightWidth }}>
              <Sidebar width={rightWidth} position="right" collapsible={false} label={rightLabel} icon={rightIcon} fillHeight={true} rounded={false} className="border-none w-full !h-full">
                {rightSidebar}
              </Sidebar>
            </Drawer>
            <Sidebar width={rightWidth} position="right" collapsible={rightCollapsible} collapsed={rightCollapsed} onCollapse={setRightCollapsed} label={rightLabel} icon={rightIcon} fillHeight={rightFillHeight} rounded={rightRounded} className="hidden md:flex shrink-0">
              {rightSidebar}
            </Sidebar>
          </div>
          {footer}
        </Shell>
      </LayoutContext.Provider>
    );
  },
);
HolyGrailPage.displayName = 'HolyGrailPage';

/* ─── 9. AsymmetricPage ─── */

/**
 * Two-pane layout with a configurable flex ratio between the primary and secondary panels.
 */
export interface AsymmetricPageProps extends BaseLayoutProps {
  /** Content rendered in the primary (wider by default) panel. */
  primary: React.ReactNode;
  /** Content rendered in the secondary panel. */
  secondary: React.ReactNode;
  /** Flex width ratio between primary and secondary panels. @example ratio="3:1" */
  ratio?: AsymmetricRatio;
}

export const AsymmetricPage = forwardRef<HTMLDivElement, AsymmetricPageProps>(
  ({ header, footer, primary, secondary, ratio = '2:1', className, children: _children, ...props }, ref) => {
    const [primaryFlex, secondaryFlex] = {
      '2:1': ['flex-[2]', 'flex-1'],
      '3:1': ['flex-[3]', 'flex-1'],
      '1:2': ['flex-1', 'flex-[2]'],
      '1:3': ['flex-1', 'flex-[3]'],
    }[ratio];

    return (
      <Shell ref={ref} className={className} {...props}>
        {header}
        <div className="flex flex-1 overflow-hidden">
          <div className={cn(primaryFlex, 'overflow-y-auto p-6')}>{primary}</div>
          <div className={cn(secondaryFlex, 'overflow-y-auto p-6 border-l border-solid border-[var(--border)] bg-[var(--card)]')}>
            {secondary}
          </div>
        </div>
        {footer}
      </Shell>
    );
  },
);
AsymmetricPage.displayName = 'AsymmetricPage';

/* ─── 10. AppPage ─── */

/** Maximum content width for mobile/app-like layouts. */
export type AppPageWidth = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Mobile and webview-optimized page layout with a narrow, fixed-width content area.
 * Full-width on small screens, centered with an optional card-like appearance on larger screens.
 * Supports safe-area insets for native webview embedding.
 */
export interface AppPageProps extends BaseLayoutProps {
  /** Maximum width of the content area.
   * - `'xs'`: 360px (small phones)
   * - `'sm'`: 390px (standard phones)
   * - `'md'`: 430px (large phones)
   * - `'lg'`: 520px (phablets / small tablets)
   * @default 'sm'
   */
  maxWidth?: AppPageWidth;
  /** Whether to apply safe-area inset padding for mobile webview environments. @default true */
  safeArea?: boolean;
  /** Whether the content area appears as an elevated card on wider screens. @default false */
  elevated?: boolean;
  /** Whether the header is sticky. @default true */
  stickyHeader?: boolean;
  /** Whether the footer is sticky. @default false */
  stickyFooter?: boolean;
}

const appPageWidthClass: Record<AppPageWidth, string> = {
  xs: 'max-w-[360px]',
  sm: 'max-w-[390px]',
  md: 'max-w-[430px]',
  lg: 'max-w-[520px]',
};

export const AppPage = forwardRef<HTMLDivElement, AppPageProps>(
  ({ header, footer, maxWidth = 'sm', safeArea = true, elevated = false, stickyHeader = true, stickyFooter = false, className, children, ...props }, ref) => {
    const widthClass = appPageWidthClass[maxWidth];

    return (
      <Shell
        ref={ref}
        className={cn(
          elevated && 'sm:bg-[var(--secondary)]',
          safeArea && 'pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]',
          className,
        )}
        {...props}
      >
        {header && (
          <div className={cn(
            'w-full mx-auto',
            widthClass,
            stickyHeader && 'sticky top-0 z-[var(--z-sticky)]',
            safeArea && 'pt-[env(safe-area-inset-top)]',
          )}>
            {header}
          </div>
        )}
        <main className={cn(
          'flex-1 mx-auto w-full overflow-y-auto px-4 py-4',
          widthClass,
          elevated && [
            'sm:bg-[var(--card)]',
            'sm:border-x sm:border-solid sm:border-[var(--border)]',
            'sm:shadow-sm',
          ],
        )}>
          {children}
        </main>
        {footer && (
          <div className={cn(
            'w-full mx-auto mt-auto',
            widthClass,
            stickyFooter && 'sticky bottom-0 z-[var(--z-sticky)]',
            safeArea && 'pb-[env(safe-area-inset-bottom)]',
          )}>
            {footer}
          </div>
        )}
      </Shell>
    );
  },
);
AppPage.displayName = 'AppPage';
