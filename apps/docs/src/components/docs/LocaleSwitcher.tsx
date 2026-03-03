'use client';

import React from 'react';
import { Globe } from '@tac-ui/icon';
import { Button } from '@tac-ui/web';
import { useTranslation } from '@/i18n';
import { localeNames } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export function LocaleSwitcher() {
  const { locale, setLocale } = useTranslation();

  const next: Locale = locale === 'en' ? 'ko' : 'en';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      className="h-8 px-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      leftIcon={<Globe size={14} />}
      aria-label={`Switch to ${localeNames[next]}`}
    >
      <span className="text-[11px] font-medium uppercase">{locale}</span>
    </Button>
  );
}
