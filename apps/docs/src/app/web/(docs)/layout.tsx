'use client';

import React, { useState, useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import { useTacTheme, Header, ToastProvider, Button, SegmentController, HStack, Main, version } from '@tac-ui/web';
import { Menu, Sun, Moon, Monitor, Globe, TacLogo } from '@tac-ui/icon';
import { useTranslation } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { Sidebar, MobileSidebar } from '@/components/docs/Sidebar';
import { CommandPaletteProvider, MobileSearchButton } from '@/components/docs/CommandPalette';

const emptySubscribe = () => () => {};

const localeOptions = [
  { value: 'en', label: 'EN', icon: <Globe size={12} /> },
  { value: 'ko', label: 'KO', icon: <Globe size={12} /> },
];

const themeOptions = [
  { value: 'light', label: '', icon: <Sun size={14} /> },
  { value: 'dark', label: '', icon: <Moon size={14} /> },
  { value: 'system', label: '', icon: <Monitor size={14} /> },
];

function DocsShell({ children }: { children: React.ReactNode }) {
  const { preference, setPreference } = useTacTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { locale, setLocale } = useTranslation();

  const handleThemeChange = useCallback(
    (value: string) => {
      setPreference(value as 'light' | 'dark' | 'system');
    },
    [setPreference],
  );

  const handleLocaleChange = useCallback(
    (value: string) => {
      setLocale(value as Locale);
    },
    [setLocale],
  );

  return (
    <ToastProvider position="bottom-right">
      <CommandPaletteProvider>
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          {/* Header */}
          <Header
            sticky
            bordered
            className="h-14 justify-between px-4 lg:px-6 bg-[var(--background)]/95 backdrop-blur-lg"
          >
            <HStack gap="sm">
              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden w-8 h-8"
                aria-label="Open menu"
              >
                <Menu size={16} />
              </Button>

              {/* Logo */}
              <Link
                href="/"
                className="text-sm font-semibold text-[var(--primary)] no-underline flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <TacLogo size={22} className="shrink-0" />
                <span className="text-[var(--foreground)]">Tac UI</span>
              </Link>
              <span className="text-[10px] font-mono text-[var(--muted-foreground)] bg-[var(--secondary)] px-1.5 py-0.5 rounded-full leading-none">
                v{version}
              </span>

              {/* Platform switcher */}
              <HStack gap="xs" className="hidden sm:flex">
                <span className="text-[10px] font-mono text-[var(--point)] bg-[var(--point-subtle)] px-1.5 py-0.5 rounded-full leading-none">
                  Web
                </span>
                <Link
                  href="/native/docs"
                  className="text-[10px] font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-1.5 py-0.5 rounded-full leading-none no-underline transition-colors"
                >
                  Native
                </Link>
              </HStack>
            </HStack>

            {/* Right: mobile search + locale + theme */}
            <HStack gap="xs">
              <MobileSearchButton />
              {mounted && (
                <HStack gap="xs" className="hidden lg:flex">
                  <SegmentController options={localeOptions} value={locale} onChange={handleLocaleChange} size="sm" />
                  <SegmentController
                    options={themeOptions}
                    value={preference}
                    onChange={handleThemeChange}
                    size="sm"
                    collapsible
                  />
                </HStack>
              )}
            </HStack>
          </Header>

          {/* Body */}
          <HStack gap="none" align="start">
            <Sidebar />
            <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
            <Main className="min-w-0">{children}</Main>
          </HStack>
        </div>
      </CommandPaletteProvider>
    </ToastProvider>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
