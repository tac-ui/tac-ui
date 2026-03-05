'use client';

import React, { useSyncExternalStore } from 'react';
import { ToastProvider, FloatingMenuBar, useTacTheme } from '@tac-ui/web';
import { Sun, Moon } from '@tac-ui/icon';

const emptySubscribe = () => () => {};

function ThemeToggle() {
  const { mode, toggleMode } = useTacTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <FloatingMenuBar position="bottom-right" className="px-0 py-0">
      <button
        type="button"
        onClick={toggleMode}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        aria-label="Toggle theme"
      >
        {mounted ? mode === 'dark' ? <Sun size={16} /> : <Moon size={16} /> : <span className="w-4 h-4" />}
      </button>
    </FloatingMenuBar>
  );
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider position="bottom-right">
      <style>{`
        .theme-transition,
        .theme-transition *:not([class*="transition-all"]) {
          transition-property: background-color, border-color, box-shadow;
          transition-duration: var(--duration-normal);
          transition-timing-function: var(--ease-standard);
        }
      `}</style>
      <div className="theme-transition h-screen overflow-auto bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <ThemeToggle />
      </div>
    </ToastProvider>
  );
}
