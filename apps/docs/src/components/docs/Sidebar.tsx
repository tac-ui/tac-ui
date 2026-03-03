'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { cn, SidebarGroup, Sidebar as SidebarShell, Drawer, useTacTheme, SegmentController } from '@tac-ui/web';
import {
  X, TacLogo, Search, Sun, Moon, Monitor, Globe,
  Rocket, Palette, MousePointerClick, FormInput, BarChart3,
  PieChart, MessageCircle, Navigation, Layers, LayoutGrid,
} from '@tac-ui/icon';
import { navGroups } from './nav-data';
import { SearchTrigger, useCommandPalette } from './CommandPalette';
import { useTranslation } from '@/i18n';
import type { Locale } from '@/i18n/config';

function useActiveGroup(pathname: string) {
  return useMemo(() => {
    for (const group of navGroups) {
      for (const item of group.items) {
        if (pathname === item.href) return group.title;
      }
    }
    return navGroups[0]?.title ?? '';
  }, [pathname]);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeGroup = useActiveGroup(pathname);
  const { t } = useTranslation();

  const groupIcons: Record<string, React.ReactNode> = {
    'getting-started': <Rocket size={14} />,
    'foundations': <Palette size={14} />,
    'actions': <MousePointerClick size={14} />,
    'form': <FormInput size={14} />,
    'data-display': <BarChart3 size={14} />,
    'charts': <PieChart size={14} />,
    'feedback': <MessageCircle size={14} />,
    'navigation': <Navigation size={14} />,
    'overlay': <Layers size={14} />,
    'layout': <LayoutGrid size={14} />,
  };

  return (
    <nav className="flex flex-col pt-2 pb-2">
      {navGroups.map((group) => {
        const isActive = group.title === activeGroup;
        const isDefaultOpen = isActive || group.title === 'Getting Started';
        return (
          <LayoutGroup key={group.title} id={`sidebar-${group.key}`}>
            <SidebarGroup
              label={t.nav.groups[group.key] ?? group.title}
              icon={groupIcons[group.key]}
              active={isActive}
              collapseDisplay="group"
              collapsible
              defaultOpen={isDefaultOpen}
            >
              {group.items.map((item) => {
                const isItemActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'relative text-[13px] px-2 py-1.5 rounded-[var(--radius-md)] no-underline transition-colors duration-200',
                      isItemActive
                        ? 'text-[var(--point)] font-medium'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--interactive-hover)]',
                    )}
                  >
                    <AnimatePresence>
                      {isItemActive && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-[var(--point-subtle)] rounded-[var(--radius-md)]"
                        />
                      )}
                    </AnimatePresence>
                    <span className="relative z-[1]">
                      {t.nav.items[item.key] ?? item.title}
                    </span>
                  </Link>
                );
              })}
            </SidebarGroup>
          </LayoutGroup>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { open: openSearch } = useCommandPalette();

  return (
    <SidebarShell
      width={240}
      position="left"
      fillHeight={false}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      rounded
      swapOnCollapse
      icon={
        <button
          type="button"
          onClick={openSearch}
          className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--point-subtle)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
        >
          <Search size={16} />
        </button>
      }
      label={<SearchTrigger />}
      className="sticky top-[calc(3.5rem+0.5rem)] h-[calc(100vh-3.5rem-1rem)] hidden lg:flex bg-transparent"
    >
      <NavLinks />
    </SidebarShell>
  );
}

const localeOptions = [
  { value: 'en', label: 'EN', icon: <Globe size={12} /> },
  { value: 'ko', label: 'KO', icon: <Globe size={12} /> },
];

const themeOptions = [
  { value: 'light', label: '', icon: <Sun size={14} /> },
  { value: 'dark', label: '', icon: <Moon size={14} /> },
  { value: 'system', label: '', icon: <Monitor size={14} /> },
];

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { preference, setPreference } = useTacTheme();
  const { locale, setLocale } = useTranslation();

  if (!open) return null;

  return (
    <div className="lg:hidden">
      <Drawer open={open} onClose={onClose} side="left" className="w-[280px] rounded-none border-y-0 border-l-0 border-r border-solid border-[var(--border)] p-0">
        <div className="px-3 pt-4 pb-0 items-center justify-between mb-3 flex">
          <Link href="/" className="flex items-center gap-2 no-underline text-[var(--primary)]" onClick={onClose}>
            <TacLogo size={20} className="shrink-0" />
            <span className="text-sm font-medium text-[var(--foreground)]">Tac UI</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border-none bg-transparent cursor-pointer rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:bg-[var(--point-subtle)] hover:text-[var(--foreground)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
        <div className="px-3 pb-3 shrink-0">
          <SearchTrigger />
        </div>
        <div className="relative flex-1 min-h-0">
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[var(--background)] to-transparent" />
          <div className="h-full overflow-y-auto px-3 pt-1 pb-4">
            <NavLinks onNavigate={onClose} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 z-10 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>
        {/* Language & Theme controls */}
        <div className="px-3 py-3 border-t border-solid border-[var(--border)] flex items-center gap-2">
          <SegmentController
            options={localeOptions}
            value={locale}
            onChange={(v) => setLocale(v as Locale)}
            size="sm"
          />
          <SegmentController
            options={themeOptions}
            value={preference}
            onChange={(v) => setPreference(v as 'light' | 'dark' | 'system')}
            size="sm"
          />
        </div>
      </Drawer>
    </div>
  );
}
