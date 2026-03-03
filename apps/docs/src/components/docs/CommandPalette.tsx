import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search } from '@tac-ui/icon';
import { Modal } from '@tac-ui/web';
import { navGroups } from './nav-data';
import { useTranslation } from '@/i18n';

/* ─── Context to share open state ─── */
interface CommandPaletteContextValue {
  open: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue>({ open: () => {} });

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

/* ─── Dialog (uses Modal from @tac-ui/web) ─── */
function CommandDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
  const router = useRouter();
  const { t } = useTranslation();

  const onSelect = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [router, onClose],
  );

  return (
    <Modal open={open} onClose={onClose} size="md" className="p-0 border-none bg-transparent shadow-none" backdrop>
      <Command
        className="bg-[var(--background)] border border-solid border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
        label="Search documentation"
      >
        <div className="flex items-center gap-2 px-4 border-b border-solid border-[var(--border)]">
          <Search size={16} className="shrink-0 text-[var(--muted-foreground)]" />
          <Command.Input
            autoFocus
            placeholder={t.ui.searchPlaceholder}
            className="w-full h-12 bg-transparent border-none outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
          />
        </div>
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-[var(--muted-foreground)]">
            {t.ui.noResults}
          </Command.Empty>
          {navGroups.map((group) => (
            <Command.Group
              key={group.key}
              heading={t.nav.groups[group.key] ?? group.title}
              className="[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--muted-foreground)] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`${group.title} ${item.title}`}
                  onSelect={() => onSelect(item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--foreground)] rounded-lg cursor-pointer data-[selected=true]:bg-[var(--point-subtle)] transition-colors"
                >
                  <div className="w-5 h-5 rounded bg-[var(--secondary)] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[var(--muted-foreground)]">
                      {item.title[0]}
                    </span>
                  </div>
                  {t.nav.items[item.key] ?? item.title}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </Modal>
  );
}

/* ─── Provider: wraps the app, manages state + ⌘K listener ─── */
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <CommandDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </CommandPaletteContext.Provider>
  );
}

/* ─── Search trigger button (for sidebar) ─── */
export function SearchTrigger() {
  const { open } = useCommandPalette();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={open}
      className="flex items-center gap-2 w-full h-8 px-2.5 text-[13px] text-[var(--muted-foreground)] bg-[var(--secondary)]/50 border border-solid border-[var(--border)] rounded-[var(--radius-md)] cursor-pointer hover:bg-[var(--secondary)] transition-colors"
    >
      <Search size={14} className="shrink-0" />
      <span className="flex-1 text-left">{t.ui.search}</span>
      <kbd className="text-[11px] font-mono text-[var(--muted-foreground)]/60 leading-none">
        ⌘K
      </kbd>
    </button>
  );
}

/* ─── Mobile search icon (for header) ─── */
export function MobileSearchButton() {
  const { open } = useCommandPalette();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={open}
      className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--point-subtle)] transition-colors"
      aria-label={t.ui.searchLabel}
    >
      <Search size={16} />
    </button>
  );
}
