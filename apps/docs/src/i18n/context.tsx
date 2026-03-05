'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { Locale } from './config';
import { defaultLocale, locales } from './config';
import enCommon from './locales/en/common.json';
import koCommon from './locales/ko/common.json';

export interface CommonTranslations {
  nav: {
    groups: Record<string, string>;
    items: Record<string, string>;
  };
  ui: {
    search: string;
    searchPlaceholder: string;
    noResults: string;
    viewCode: string;
    hideCode: string;
    toggleTheme: string;
    searchLabel: string;
    prevPage: string;
    nextPage: string;
  };
  propsTable: {
    prop: string;
    type: string;
    default: string;
    description: string;
  };
}

export interface PageTranslations {
  title: string;
  description: string;
  sections?: Record<
    string,
    {
      title: string;
      description?: string;
      texts?: string[];
      items?: Record<string, { title: string; description: string }>;
    }
  >;
  props?: Record<string, string>;
}

const commonMessages: Record<Locale, CommonTranslations> = {
  en: enCommon as unknown as CommonTranslations,
  ko: koCommon as unknown as CommonTranslations,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: CommonTranslations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: commonMessages[defaultLocale],
});

const pageCache = new Map<string, PageTranslations>();

function detectClientLocale(): Locale {
  const stored = localStorage.getItem('tac-ui-locale');
  if (stored && (locales as readonly string[]).includes(stored)) return stored as Locale;
  const browserLang = navigator.language.split('-')[0];
  if ((locales as readonly string[]).includes(browserLang)) return browserLang as Locale;
  return defaultLocale;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('tac-ui-locale', newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    const clientLocale = detectClientLocale();
    if (clientLocale !== defaultLocale) {
      // Defer to avoid synchronous setState in effect
      queueMicrotask(() => setLocaleState(clientLocale));
    }
    document.documentElement.lang = clientLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useMemo(() => commonMessages[locale], [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}

export function usePageTranslation(pageId: string): PageTranslations | null {
  const { locale } = useTranslation();
  const [translations, setTranslations] = useState<PageTranslations | null>(() => {
    return pageCache.get(`${locale}:${pageId}`) ?? null;
  });

  useEffect(() => {
    const cacheKey = `${locale}:${pageId}`;
    if (pageCache.has(cacheKey)) {
      setTranslations(pageCache.get(cacheKey)!);
      return;
    }
    import(`./locales/${locale}/pages/${pageId}.json`)
      .then((mod) => {
        const data = mod.default as PageTranslations;
        pageCache.set(cacheKey, data);
        setTranslations(data);
      })
      .catch(() => {
        setTranslations(null);
      });
  }, [locale, pageId]);

  return translations;
}
