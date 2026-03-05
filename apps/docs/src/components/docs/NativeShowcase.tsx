'use client';

import React, { useState } from 'react';
import { TacNativeProvider } from '@tac-ui/native';
import { useTacTheme, Button, CodeBlock } from '@tac-ui/web';
import { cn } from '@tac-ui/web';
import { useTranslation } from '@/i18n';

/**
 * Native equivalent of the web Showcase component.
 * Wraps children in TacNativeProvider (bridged to web theme)
 * and provides a code toggle — same visual pattern as Showcase.
 */
export function NativeShowcase({
  children,
  code,
  language = 'tsx',
  className,
}: {
  children: React.ReactNode;
  code: string;
  language?: string;
  className?: string;
}) {
  const { mode } = useTacTheme();
  const [showCode, setShowCode] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
      <TacNativeProvider key={mode} defaultPreference={mode}>
        <div
          className={cn(
            'flex flex-wrap items-center gap-4 p-6 bg-[var(--background)] rounded-t-[var(--radius-lg)]',
            className,
          )}
        >
          {children}
        </div>
      </TacNativeProvider>
      <div className="flex justify-end border-t border-solid border-[var(--border)] bg-[var(--secondary)]/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="text-[11px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-3 py-1.5 h-auto rounded-none"
        >
          {showCode ? t.ui.hideCode : t.ui.viewCode}
        </Button>
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: showCode ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-solid border-[var(--border)] rounded-b-[var(--radius-lg)] [&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
            <CodeBlock code={code.trim()} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
