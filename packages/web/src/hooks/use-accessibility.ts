import { useEffect, useRef, useCallback } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within a container element while active.
 * Tab and Shift+Tab cycle through focusable elements without escaping.
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;

    // Auto-focus first focusable element
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [active, containerRef]);
}

/**
 * Saves the previously focused element on open and restores focus on close.
 */
export function useFocusRestore(active: boolean) {
  const previousElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      previousElement.current = document.activeElement as HTMLElement;
    } else if (previousElement.current) {
      previousElement.current.focus();
      previousElement.current = null;
    }
  }, [active]);
}

/**
 * Provides arrow-key navigation for a list of items within a container.
 * Returns a callback ref to attach to the container element.
 */
export function useRovingIndex(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  opts?: { onSelect?: (index: number) => void; itemSelector?: string },
) {
  const activeIndex = useRef(-1);
  const selector = opts?.itemSelector ?? '[role="menuitem"]';

  const getItems = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(selector));
  }, [containerRef, selector]);

  useEffect(() => {
    if (!active) {
      activeIndex.current = -1;
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = getItems();
      if (items.length === 0) return;

      let idx = activeIndex.current;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          idx = idx < items.length - 1 ? idx + 1 : 0;
          break;
        case 'ArrowUp':
          e.preventDefault();
          idx = idx > 0 ? idx - 1 : items.length - 1;
          break;
        case 'Home':
          e.preventDefault();
          idx = 0;
          break;
        case 'End':
          e.preventDefault();
          idx = items.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (idx >= 0) {
            items[idx].click();
            opts?.onSelect?.(idx);
          }
          return;
        default:
          return;
      }

      activeIndex.current = idx;
      items[idx].focus();
    };

    const container = containerRef.current;
    container?.addEventListener('keydown', handleKeyDown);
    return () => container?.removeEventListener('keydown', handleKeyDown);
  }, [active, containerRef, getItems, opts]);
}
