'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarItem,
  Sidebar as SidebarShell,
  Drawer,
  useTacTheme,
  SegmentController,
  HStack,
} from '@tac-ui/web';
import {
  X,
  TacLogo,
  Search,
  Sun,
  Moon,
  Monitor,
  Globe,
  Rocket,
  Palette,
  MousePointerClick,
  FormInput,
  BarChart3,
  PieChart,
  MessageCircle,
  Navigation,
  Layers,
  LayoutGrid,
} from '@tac-ui/icon';
import { navGroups as defaultNavGroups, type NavGroup } from './nav-data';
import { SearchTrigger, useCommandPalette } from './CommandPalette';
import { useTranslation } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { RotateCw } from '@tac-ui/icon';

function useActiveGroup(pathname: string, groups: NavGroup[]) {
  return useMemo(() => {
    for (const group of groups) {
      for (const item of group.items) {
        if (pathname === item.href) return group.title;
      }
    }
    return groups[0]?.title ?? '';
  }, [pathname, groups]);
}

const groupIcons: Record<string, React.ReactNode> = {
  'getting-started': <Rocket size={14} />,
  foundations: <Palette size={14} />,
  actions: <MousePointerClick size={14} />,
  form: <FormInput size={14} />,
  'data-display': <BarChart3 size={14} />,
  charts: <PieChart size={14} />,
  feedback: <MessageCircle size={14} />,
  navigation: <Navigation size={14} />,
  overlay: <Layers size={14} />,
  layout: <LayoutGrid size={14} />,
  animation: <RotateCw size={14} />,
};

function NavLinks({ onNavigate, navGroups = defaultNavGroups }: { onNavigate?: () => void; navGroups?: NavGroup[] }) {
  const pathname = usePathname();
  const activeGroup = useActiveGroup(pathname, navGroups);
  const { t } = useTranslation();

  return (
    <nav className="flex flex-col pt-2 pb-2">
      {navGroups.map((group) => {
        const isActive = group.title === activeGroup;
        const isDefaultOpen = isActive || group.title === 'Getting Started';
        return (
          <SidebarGroup
            key={group.title}
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
                <Link key={item.href} href={item.href} onClick={onNavigate} className="no-underline">
                  <SidebarItem active={isItemActive}>{t.nav.items[item.key] ?? item.title}</SidebarItem>
                </Link>
              );
            })}
          </SidebarGroup>
        );
      })}
    </nav>
  );
}

export function Sidebar({ navGroups }: { navGroups?: NavGroup[] } = {}) {
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
      <NavLinks navGroups={navGroups} />
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

export function MobileSidebar({
  open,
  onClose,
  navGroups,
}: {
  open: boolean;
  onClose: () => void;
  navGroups?: NavGroup[];
}) {
  const { preference, setPreference } = useTacTheme();
  const { locale, setLocale } = useTranslation();

  if (!open) return null;

  return (
    <div className="lg:hidden">
      <Drawer
        open={open}
        onClose={onClose}
        side="left"
        className="w-[280px] rounded-none border-y-0 border-l-0 border-r border-solid border-[var(--border)] p-0"
      >
        <HStack gap="sm" justify="between" className="px-3 pt-4 pb-0 mb-3">
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
        </HStack>
        <div className="px-3 pb-3 shrink-0">
          <SearchTrigger />
        </div>
        <div className="relative flex-1 min-h-0">
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[var(--background)] to-transparent" />
          <div className="h-full overflow-y-auto px-3 pt-1 pb-4">
            <NavLinks onNavigate={onClose} navGroups={navGroups} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 z-10 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>
        {/* Language & Theme controls */}
        <HStack gap="sm" className="px-3 py-3 border-t border-solid border-[var(--border)]">
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
        </HStack>
      </Drawer>
    </div>
  );
}
