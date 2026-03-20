import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './Dialog';
import { Button } from './Button';

export interface ConfirmOptions {
  /** Dialog title. */
  title: string;
  /** Dialog message/description. */
  message: string;
  /** Label for the confirm button. @default 'Confirm' */
  confirmLabel?: string;
  /** Label for the cancel button. @default 'Cancel' */
  cancelLabel?: string;
  /** Button variant for the confirm button. @default 'primary' */
  variant?: 'primary' | 'destructive' | 'point';
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const fn = useContext(ConfirmContext);
  if (!fn) throw new Error('useConfirm must be used within a ConfirmProvider');
  return fn;
}

export interface ConfirmProviderProps {
  children: React.ReactNode;
}

export const ConfirmProvider: React.FC<ConfirmProviderProps> = ({ children }) => {
  const [state, setState] = useState<(ConfirmOptions & { open: boolean }) | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setState({ ...options, open: true });
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    setState((prev) => (prev ? { ...prev, open: false } : null));
    resolveRef.current?.(result);
    resolveRef.current = null;
  }, []);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={state?.open ?? false} onClose={() => handleClose(false)}>
        <DialogHeader>
          <DialogTitle>{state?.title}</DialogTitle>
          <DialogDescription>{state?.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => handleClose(false)}>
            {state?.cancelLabel ?? 'Cancel'}
          </Button>
          <Button variant={state?.variant ?? 'primary'} size="sm" onClick={() => handleClose(true)}>
            {state?.confirmLabel ?? 'Confirm'}
          </Button>
        </DialogFooter>
      </Dialog>
    </ConfirmContext.Provider>
  );
};
