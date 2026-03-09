import React, { forwardRef, createContext, useContext, useState, useEffect, useRef, useId } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftOpen, PanelRightOpen, Menu } from '@tac-ui/icon';
import { cn } from '../utils/cn';
import { focusRing } from '../constants/styles';
import { tacSpring, EASING, DURATION } from '../constants/motion';

/* ─── Layout Context ─── */
export const LayoutContext = createContext<{
  hasSidebar?: boolean;
  mobileSidebarOpen?: boolean;
  setMobileSidebarOpen?: (open: boolean) => void;
  hasRightSidebar?: boolean;
  mobileRightSidebarOpen?: boolean;
  setMobileRightSidebarOpen?: (open: boolean) => void;
}>({});

/* ─── Sidebar Context ─── */

const SidebarContext = createContext<{ collapsed: boolean }>({ collapsed: false });

/** Returns the current sidebar collapsed state. Use inside Sidebar children. */
export const useSidebarContext = () => useContext(SidebarContext);

// Container variants
const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-[640px]',
      md: 'max-w-[768px]',
      lg: 'max-w-[1024px]',
      xl: 'max-w-[1280px]',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

// Main content variants
const mainVariants = cva('flex-1 p-6', {
  variants: {
    maxWidth: {
      sm: 'max-w-[640px] mx-auto',
      md: 'max-w-[768px] mx-auto',
      lg: 'max-w-[1024px] mx-auto',
      xl: 'max-w-[1280px] mx-auto',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    maxWidth: 'full',
  },
});

// Header variants
const headerVariants = cva('h-16 shrink-0 flex flex-row items-center px-6', {
  variants: {
    sticky: {
      true: 'sticky top-0 z-[var(--z-sticky)]',
      false: '',
    },
    bordered: {
      true: 'border-b border-solid border-[var(--border)]',
      false: '',
    },
    blur: {
      true: 'backdrop-blur-[20px] bg-[var(--glass-bg)] border-b-[0.5px] border-b-white/[0.1]',
      false: 'bg-[var(--card)]',
    },
  },
  defaultVariants: {
    sticky: false,
    bordered: true,
    blur: false,
  },
});

// Sidebar variants
const sidebarVariants = cva(
  'relative flex flex-col overflow-hidden bg-[var(--card)] border-solid border-[var(--border)]',
  {
    variants: {
      position: {
        left: 'border-r',
        right: 'border-l',
      },
      fillHeight: {
        true: 'h-full',
        false: '',
      },
      rounded: {
        true: 'rounded-[var(--radius-lg)] border m-2',
        false: '',
      },
    },
    compoundVariants: [
      {
        rounded: true,
        fillHeight: true,
        className: 'h-[calc(100%-1rem)]',
      },
    ],
    defaultVariants: {
      position: 'left',
      fillHeight: true,
      rounded: false,
    },
  },
);

// Footer variants
const footerVariants = cva('px-6 py-4 bg-[var(--card)]', {
  variants: {
    bordered: {
      true: 'border-t border-solid border-[var(--border)]',
      false: '',
    },
  },
  defaultVariants: {
    bordered: true,
  },
});

// Container
/**
 * Centered content wrapper with responsive horizontal padding and configurable max-width.
 * @prop size - Maximum width of the container. @example size="lg"
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(containerVariants({ size }), className)} {...props} />
));
Container.displayName = 'Container';

// Header
/**
 * Top-level page header bar with optional sticky positioning, bottom border, backdrop blur, and auto-hide on scroll.
 * @prop sticky - Whether the header sticks to the top of the viewport on scroll.
 * @prop bordered - Whether to render a bottom border.
 * @prop blur - Whether to apply a backdrop blur effect with semi-transparent background.
 * @prop autoHide - Whether the header hides when scrolling down and reappears when scrolling up. Works best with sticky.
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof headerVariants> {
  /** Whether the header auto-hides on scroll down and reappears on scroll up. Works best with sticky. @default false */
  autoHide?: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, sticky, bordered, blur, autoHide = false, ...props }, ref) => {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
      if (!autoHide) return;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        setHidden(isScrollingDown && currentScrollY > 64);
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [autoHide]);

    const { hasSidebar, setMobileSidebarOpen, hasRightSidebar, setMobileRightSidebarOpen } = useContext(LayoutContext);

    return (
      <header
        ref={ref}
        className={cn(headerVariants({ sticky, bordered, blur }), autoHide && hidden && '-translate-y-full', className)}
        style={autoHide ? { transition: `transform ${DURATION.slow} ${EASING}` } : undefined}
        {...props}
      >
        {hasSidebar && (
          <button
            type="button"
            className={cn(
              'md:hidden mr-3 p-1 rounded-md shrink-0 hover:bg-[var(--point-subtle)] transition-colors text-[var(--muted-foreground)] cursor-pointer',
              focusRing,
            )}
            onClick={() => setMobileSidebarOpen?.(true)}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex-1 min-w-0 flex items-center justify-between h-full gap-2">{props.children}</div>
        {hasRightSidebar && (
          <button
            type="button"
            className={cn(
              'md:hidden ml-3 p-1 rounded-md shrink-0 hover:bg-[var(--point-subtle)] transition-colors text-[var(--muted-foreground)] cursor-pointer',
              focusRing,
            )}
            onClick={() => setMobileRightSidebarOpen?.(true)}
            aria-label="Toggle right sidebar"
          >
            <Menu size={20} />
          </button>
        )}
      </header>
    );
  },
);
Header.displayName = 'Header';

// Sidebar
/**
 * Collapsible side panel that can be positioned on the left or right of the layout.
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the sidebar in pixels when expanded. @example width={280} */
  width?: number;
  /** Label displayed in the sidebar header. @example label="Navigation" */
  label?: React.ReactNode;
  /** Icon displayed before the label in the sidebar header. @example icon={<Menu size={18} />} */
  icon?: React.ReactNode;
  /** Whether a toggle button is rendered to collapse/expand the sidebar. @example collapsible */
  collapsible?: boolean;
  /** Controlled collapsed state of the sidebar. @example collapsed={true} */
  collapsed?: boolean;
  /** Callback fired when the collapse toggle is clicked. @example onCollapse={(v) => setCollapsed(v)} */
  onCollapse?: (collapsed: boolean) => void;
  /** Which side of the layout the sidebar appears on. @example position="right" */
  position?: 'left' | 'right';
  /** Whether the sidebar fills the remaining vertical space. @default true */
  fillHeight?: boolean;
  /** Whether the sidebar has rounded corners with a floating card style. @default false */
  rounded?: boolean;
  /** When true, the icon is hidden when expanded and the label is hidden when collapsed, swapping between them. @default false */
  swapOnCollapse?: boolean;
  /** Content rendered in a fixed footer area at the bottom of the sidebar. */
  footer?: React.ReactNode;
}

const CollapseToggle = ({
  collapsed,
  position,
  onClick,
}: {
  collapsed: boolean;
  position: 'left' | 'right';
  onClick: () => void;
}) => {
  const Icon =
    (position === 'left' && collapsed) || (position === 'right' && !collapsed) ? PanelLeftOpen : PanelRightOpen;

  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 rounded-[var(--radius-m)] hover:bg-[var(--point-subtle)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <Icon size={16} />
    </button>
  );
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      width = 280,
      label,
      icon,
      collapsible = false,
      collapsed = false,
      onCollapse,
      position = 'left',
      fillHeight,
      rounded,
      swapOnCollapse = false,
      footer,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const handleToggle = () => {
      if (collapsible && onCollapse) {
        onCollapse(!collapsed);
      }
    };

    const hasHeader = label || icon || collapsible;

    const sidebarTransition = `width ${DURATION.slow} ${EASING}, padding ${DURATION.slow} ${EASING}, background-color ${DURATION.slow} ${EASING}`;

    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ position, fillHeight, rounded }), className)}
        style={{
          width: collapsed ? 64 : width,
          transition: sidebarTransition,
          ...style,
        }}
        {...props}
      >
        <SidebarContext.Provider value={{ collapsed }}>
          {hasHeader && (
            <div className="relative border-b border-solid border-[var(--border)] shrink-0">
              <div
                className={cn(
                  'flex items-center w-full',
                  collapsed
                    ? 'gap-0 justify-center px-2 pt-3 pb-12'
                    : cn(
                        swapOnCollapse ? 'gap-0' : 'gap-2',
                        'py-3',
                        collapsible && position === 'left'
                          ? 'pl-4 pr-12'
                          : collapsible && position === 'right'
                            ? 'pl-12 pr-4'
                            : 'px-4',
                      ),
                )}
                style={{ transition: `all ${DURATION.slow} ${EASING}` }}
              >
                {icon && (
                  <span
                    className={cn(
                      'flex items-center justify-center shrink-0 text-[var(--foreground)]',
                      swapOnCollapse && !collapsed && 'w-0 opacity-0 overflow-hidden',
                    )}
                    style={{ transition: `all ${DURATION.slow} ${EASING}` }}
                  >
                    {icon}
                  </span>
                )}
                {label && (
                  <span
                    className={cn(
                      'text-sm font-medium text-[var(--foreground)] truncate overflow-hidden',
                      collapsed ? 'opacity-0 w-0' : 'opacity-100 flex-1',
                    )}
                    style={{ transition: `all ${DURATION.slow} ${EASING}` }}
                  >
                    {label}
                  </span>
                )}
              </div>
              {collapsible && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: collapsed ? 'calc(100% - 22px)' : '50%',
                    left: collapsed ? '50%' : position === 'left' ? 'calc(100% - 24px)' : '24px',
                    transition: `all ${DURATION.slow} ${EASING}`,
                  }}
                >
                  <CollapseToggle collapsed={collapsed} position={position} onClick={handleToggle} />
                </div>
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
          {footer && <div className="border-t border-solid border-[var(--border)] shrink-0">{footer}</div>}
        </SidebarContext.Provider>
      </aside>
    );
  },
);
Sidebar.displayName = 'Sidebar';

/* ─── Sidebar sub-components ─── */

/**
 * Sidebar group with an optional label. Label is hidden when the sidebar is collapsed.
 */
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label displayed above items. Hidden when collapsed. */
  label?: string;
  /** Icon displayed before the label. Shown alone when collapsed. */
  icon?: React.ReactNode;
  /** Whether a child item in this group is currently active/selected. */
  active?: boolean;
  /** What to show when the sidebar is collapsed. "group" shows the group icon only, "children" shows child items only. @default "children" */
  collapseDisplay?: 'group' | 'children';
  /** Whether the group can be expanded/collapsed by clicking the header. @default false */
  collapsible?: boolean;
  /** Whether the group is open by default when collapsible. @default true */
  defaultOpen?: boolean;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  (
    {
      label,
      icon,
      active: groupActive = false,
      collapseDisplay = 'children',
      collapsible: groupCollapsible = false,
      defaultOpen = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();
    const [open, setOpen] = React.useState(defaultOpen);
    const groupId = useId();
    const showChildrenWhenCollapsed = collapseDisplay === 'children';
    const isOpen = collapsed ? showChildrenWhenCollapsed : !groupCollapsible || open;
    const showHeader = collapsed ? !showChildrenWhenCollapsed : true;

    const groupTransition = `all ${DURATION.moderate} ${EASING}`;

    return (
      <div ref={ref} className={cn('flex flex-col py-1.5', className)} {...props}>
        {showHeader && (label || icon) && (
          <>
            <div
              className={cn(
                'flex items-center text-xs font-semibold uppercase tracking-wider overflow-hidden',
                groupActive ? 'text-[var(--point)]' : 'text-[var(--muted-foreground)]',
                collapsed ? (icon ? 'justify-center px-2 py-2' : 'h-0 p-0 opacity-0') : 'gap-2 px-4 py-2',
                groupCollapsible &&
                  !collapsed &&
                  cn('cursor-pointer', groupActive ? 'hover:text-[var(--point)]' : 'hover:text-[var(--foreground)]'),
              )}
              style={{ transition: groupTransition }}
              onClick={groupCollapsible && !collapsed ? () => setOpen(!open) : undefined}
            >
              {icon && (
                <span
                  className={cn(
                    'flex items-center justify-center shrink-0 rounded-[var(--radius-sm)] p-0.5',
                    groupActive && 'text-[var(--point)] [&>svg]:stroke-[2.5]',
                  )}
                  style={{ transition: groupTransition }}
                >
                  {icon}
                </span>
              )}
              {label && (
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap',
                    collapsed ? 'w-0 opacity-0' : 'flex-1 opacity-100',
                    groupActive && 'font-bold',
                  )}
                  style={{ transition: groupTransition }}
                >
                  {label}
                </span>
              )}
              {groupCollapsible && !collapsed && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={cn('shrink-0', isOpen && 'rotate-180')}
                  style={{ transition: `transform ${DURATION.moderate} ${EASING}` }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {!icon && (
              <div
                className={cn('mx-3 bg-[var(--border)]', collapsed ? 'h-px my-1 opacity-100' : 'h-0 my-0 opacity-0')}
                style={{ transition: groupTransition }}
              />
            )}
          </>
        )}
        <div
          className={cn('grid', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
          style={{
            transition: `grid-template-rows ${DURATION.moderate} ${EASING}, opacity ${DURATION.moderate} ${EASING}`,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <LayoutGroup id={groupId}>
              <div className={cn('flex flex-col gap-1 px-2 pt-1', groupCollapsible && !collapsed && 'ml-2')}>
                {children}
              </div>
            </LayoutGroup>
          </div>
        </div>
      </div>
    );
  },
);
SidebarGroup.displayName = 'SidebarGroup';

/**
 * Sidebar navigation item with an optional icon.
 * When collapsed, only the icon is shown. If no icon, the item is hidden.
 */
/** Active style variant for sidebar items. */
export type SidebarItemVariant = 'filled' | 'foreground' | 'subtle';

/** Size variant for sidebar items. */
export type SidebarItemSize = 'sm' | 'md';

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon rendered before the label. Shown alone when sidebar is collapsed. */
  icon?: React.ReactNode;
  /** Whether this item is currently active/selected. */
  active?: boolean;
  /** Active style variant. @default "subtle" */
  variant?: SidebarItemVariant;
  /** Size of the sidebar item. @default "sm" */
  size?: SidebarItemSize;
}

export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ icon, active, variant = 'subtle', size = 'sm', className, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    const shouldHide = collapsed && !icon;

    const textClass = active
      ? variant === 'filled'
        ? 'text-[var(--primary-foreground)]'
        : 'text-[var(--point)] font-medium'
      : variant === 'subtle'
        ? 'text-[var(--muted-foreground)]'
        : 'text-[var(--foreground)]';

    const hoverClass =
      !active && !shouldHide
        ? variant === 'subtle'
          ? 'hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]'
          : 'hover:bg-[var(--point-subtle)]'
        : '';

    const sizeClass =
      size === 'sm'
        ? collapsed
          ? 'justify-center p-1.5 max-h-10'
          : 'px-2 py-1.5 max-h-10'
        : collapsed
          ? 'justify-center p-2 max-h-12'
          : 'px-3 py-2 max-h-12';

    return (
      <div
        ref={ref}
        style={{
          transition: `color ${DURATION.normal} ${EASING}`,
        }}
        className={cn(
          'relative flex items-center rounded-[var(--radius-m)] cursor-pointer overflow-hidden',
          size === 'sm' ? 'text-[13px]' : 'text-sm',
          collapsed ? 'gap-0' : 'gap-3',
          shouldHide ? 'max-h-0 opacity-0 p-0 m-0' : sizeClass,
          !shouldHide && textClass,
          hoverClass,
          className,
        )}
        {...props}
      >
        {active && !shouldHide && variant === 'filled' && (
          <motion.div
            layoutId="sidebar-active-bg"
            className="absolute inset-0 bg-[var(--point)] rounded-[var(--radius-m)]"
            transition={tacSpring.default}
          />
        )}
        {active && !shouldHide && (variant === 'foreground' || variant === 'subtle') && (
          <motion.div
            layoutId="sidebar-active-bg"
            className="absolute inset-0 bg-[var(--point-subtle)] rounded-[var(--radius-m)]"
            transition={tacSpring.default}
          />
        )}
        {icon && <span className="relative z-10 flex items-center justify-center shrink-0">{icon}</span>}
        <span
          className={cn(
            'relative z-10 min-w-0 flex items-center gap-3 whitespace-nowrap',
            collapsed ? 'w-0 opacity-0 overflow-hidden' : 'flex-1 opacity-100',
          )}
          style={{
            transition: `opacity ${DURATION.normal} ${EASING}, width ${DURATION.normal} ${EASING}`,
          }}
        >
          {children}
        </span>
      </div>
    );
  },
);
SidebarItem.displayName = 'SidebarItem';

/**
 * Arbitrary sidebar content. Fully hidden when the sidebar is collapsed.
 */
export const SidebarContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden',
          collapsed ? 'max-h-0 opacity-0 py-0 px-4' : 'max-h-96 opacity-100 px-4 py-2',
          className,
        )}
        style={{
          transition: `max-height ${DURATION.moderate} ${EASING}, opacity ${DURATION.moderate} ${EASING}, padding ${DURATION.moderate} ${EASING}`,
        }}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = 'SidebarContent';

/**
 * Footer area pinned to the bottom of the sidebar. Content is hidden when collapsed.
 */
export const SidebarFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden',
          collapsed ? 'max-h-0 opacity-0 p-0' : 'max-h-96 opacity-100 px-3 py-3',
          className,
        )}
        style={{
          transition: `max-height ${DURATION.moderate} ${EASING}, opacity ${DURATION.moderate} ${EASING}, padding ${DURATION.moderate} ${EASING}`,
        }}
        {...props}
      />
    );
  },
);
SidebarFooter.displayName = 'SidebarFooter';

// Main
/**
 * Primary content area that grows to fill available space with optional max-width constraint.
 * @prop maxWidth - Maximum width of the main content area. @example maxWidth="xl"
 */
export interface MainProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof mainVariants> {}

export const Main = forwardRef<HTMLElement, MainProps>(({ className, maxWidth, ...props }, ref) => (
  <main ref={ref} className={cn(mainVariants({ maxWidth }), className)} {...props} />
));
Main.displayName = 'Main';

// Footer
/**
 * Page footer bar with optional top border.
 * @prop bordered - Whether to render a top border separating the footer from the content.
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof footerVariants> {}

export const Footer = forwardRef<HTMLElement, FooterProps>(({ className, bordered, ...props }, ref) => (
  <footer ref={ref} className={cn(footerVariants({ bordered }), className)} {...props} />
));
Footer.displayName = 'Footer';

// FloatingMenuBar

/** Position of the floating menu bar on screen (3x3 grid). */
export type FloatingMenuBarPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const floatingPositionClass: Record<FloatingMenuBarPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'middle-left': 'top-1/2 -translate-y-1/2 left-4',
  'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'middle-right': 'top-1/2 -translate-y-1/2 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

/**
 * A floating navigation bar that hovers over page content with a pill-shaped appearance.
 * Commonly used as a bottom tab bar in mobile/app-like layouts.
 * @prop position - Where the bar is anchored (9 positions). @default 'bottom-center'
 * @prop bordered - Whether to render a border. @default true
 * @prop blur - Whether to apply a backdrop blur effect. @default true
 */
export interface FloatingMenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Where the bar is anchored on the screen (3x3 grid). @default 'bottom-center' */
  position?: FloatingMenuBarPosition;
  /** Whether to render a border. @default true */
  bordered?: boolean;
  /** Whether to apply a backdrop blur effect. @default true */
  blur?: boolean;
}

export const FloatingMenuBar = forwardRef<HTMLDivElement, FloatingMenuBarProps>(
  ({ position = 'bottom-center', bordered = true, blur = true, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed z-[var(--z-sticky)]',
        'flex items-center justify-around',
        'px-2 py-1.5 rounded-full',
        blur ? 'backdrop-blur-[20px] bg-[var(--glass-bg)]' : 'bg-[var(--card)]/90',
        bordered && 'border-[0.5px] border-solid border-white/20',
        'border-t-[0.5px] border-t-white/[0.1]',
        'shadow-glass-lg',
        floatingPositionClass[position],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
FloatingMenuBar.displayName = 'FloatingMenuBar';

/**
 * An individual item inside a FloatingMenuBar.
 * Renders an icon with an optional label underneath.
 * @prop icon - The icon to display.
 * @prop label - Optional text label below the icon.
 * @prop active - Whether this item is the currently active route.
 */
export interface FloatingMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to display. */
  icon: React.ReactNode;
  /** Optional text label below the icon. */
  label?: string;
  /** Whether this item is the currently active route. @default false */
  active?: boolean;
}

export const FloatingMenuItem = forwardRef<HTMLButtonElement, FloatingMenuItemProps>(
  ({ icon, label, active = false, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 bg-transparent border-none cursor-pointer px-3 py-1.5 rounded-full transition-colors hover:-translate-y-0.5',
        focusRing,
        active ? 'text-[var(--point)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        className,
      )}
      {...props}
    >
      {icon}
      {label && <span className={cn('text-[10px]', active && 'font-medium')}>{label}</span>}
    </button>
  ),
);
FloatingMenuItem.displayName = 'FloatingMenuItem';

// PageLayout
/**
 * Full-page layout shell combining a header, optional sidebar, main content area, and footer.
 */
export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to render a sidebar alongside the main content. @example sidebar */
  sidebar?: boolean;
  /** Which side the sidebar appears on. @example sidebarPosition="right" */
  sidebarPosition?: 'left' | 'right';
  /** Content rendered in the sticky header slot. @example header={<Header />} */
  header?: React.ReactNode;
  /** Content rendered in the footer slot. @example footer={<Footer />} */
  footer?: React.ReactNode;
}

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, sidebar = false, sidebarPosition = 'left', header, footer, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('min-h-screen flex flex-col bg-[var(--background)]', className)} {...props}>
        {header}
        <div className="flex flex-1 overflow-hidden">
          {sidebar && sidebarPosition === 'left' && children}
          <div className="flex flex-col flex-1 overflow-auto">{!sidebar && children}</div>
          {sidebar && sidebarPosition === 'right' && children}
        </div>
        {footer}
      </div>
    );
  },
);
PageLayout.displayName = 'PageLayout';

export { containerVariants, mainVariants, headerVariants, sidebarVariants, footerVariants };
