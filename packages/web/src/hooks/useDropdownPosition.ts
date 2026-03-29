import { useLayoutEffect, useEffect, useState, type RefObject } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Measures whether a dropdown panel would overflow below the viewport
 * and returns 'top' or 'bottom' to indicate where the panel should open.
 * Also recalculates on scroll/resize while open.
 */
export function useDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  open: boolean,
): 'top' | 'bottom' {
  const [side, setSide] = useState<'top' | 'bottom'>('bottom');

  useIsomorphicLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;

    const calculate = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const triggerRect = trigger.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;
      const vh = window.innerHeight;
      const spaceBelow = vh - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      setSide(spaceBelow < panelHeight + 8 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    };

    calculate();

    window.addEventListener('scroll', calculate, true);
    window.addEventListener('resize', calculate);
    return () => {
      window.removeEventListener('scroll', calculate, true);
      window.removeEventListener('resize', calculate);
    };
  }, [open, triggerRef, panelRef]);

  return side;
}
