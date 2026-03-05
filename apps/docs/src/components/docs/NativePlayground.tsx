'use client';

import React from 'react';
import { TacNativeProvider } from '@tac-ui/native';
import { useTacTheme } from '@tac-ui/web';
import { Playground } from './Playground';
import type { ControlDef } from './Playground';

export type { ControlDef, SelectControl, BooleanControl, TextControl } from './Playground';

export interface NativePlaygroundProps {
  controls: Record<string, ControlDef>;
  render: (values: Record<string, string | boolean>) => React.ReactNode;
  code?: string | ((values: Record<string, string | boolean>) => string);
  previewClassName?: string;
}

export function NativePlayground({ controls, render, code, previewClassName }: NativePlaygroundProps) {
  const { mode } = useTacTheme();

  return (
    <Playground
      controls={controls}
      render={render}
      code={code}
      previewClassName={previewClassName}
      previewWrapper={(children) => (
        <TacNativeProvider key={mode} defaultPreference={mode}>
          {children}
        </TacNativeProvider>
      )}
    />
  );
}
