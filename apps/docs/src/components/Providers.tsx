'use client';

import { TacProvider } from '@tac-ui/web';
import { LocaleProvider } from '@/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TacProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </TacProvider>
  );
}
