'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from '@tac-ui/icon';
import { navGroups } from './nav-data';
import { useTranslation } from '@/i18n';

interface AdjacentPage {
  key: string;
  title: string;
  href: string;
  groupKey: string;
}

function useAdjacentPages() {
  const pathname = usePathname();

  return useMemo(() => {
    const flat: AdjacentPage[] = [];
    for (const group of navGroups) {
      for (const item of group.items) {
        flat.push({ key: item.key, title: item.title, href: item.href, groupKey: group.key });
      }
    }

    const idx = flat.findIndex((p) => p.href === pathname);
    if (idx === -1) return { prev: null, next: null };

    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
  }, [pathname]);
}

export function DocNavigation() {
  const { prev, next } = useAdjacentPages();
  const { t } = useTranslation();

  if (!prev && !next) return null;

  return (
    <nav className="grid grid-cols-2 gap-3 pt-8 mt-4 border-t border-solid border-[var(--border)]">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-m)] border border-solid border-[var(--border)] no-underline transition-colors hover:bg-[var(--interactive-hover)] hover:border-[var(--primary)]/30"
        >
          <ChevronLeft size={16} className="text-[var(--muted-foreground)] shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[var(--muted-foreground)]">
              {t.ui.prevPage ?? 'Previous'}
            </span>
            <span className="text-[13px] font-medium text-[var(--foreground)] truncate">
              {t.nav.items[prev.key] ?? prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 px-4 py-3 rounded-[var(--radius-m)] border border-solid border-[var(--border)] no-underline transition-colors hover:bg-[var(--interactive-hover)] hover:border-[var(--primary)]/30"
        >
          <div className="flex flex-col items-end min-w-0">
            <span className="text-[11px] text-[var(--muted-foreground)]">
              {t.ui.nextPage ?? 'Next'}
            </span>
            <span className="text-[13px] font-medium text-[var(--foreground)] truncate">
              {t.nav.items[next.key] ?? next.title}
            </span>
          </div>
          <ChevronRight size={16} className="text-[var(--muted-foreground)] shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
