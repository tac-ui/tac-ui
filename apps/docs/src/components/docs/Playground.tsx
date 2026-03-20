'use client';

import React, { useState, useCallback } from 'react';
import { Button, CodeBlock, Switch, Select, cn } from '@tac-ui/web';

/* ─── Control Definitions ─── */

export interface SelectControl {
  type: 'select';
  label: string;
  options: string[];
  defaultValue: string;
}

export interface BooleanControl {
  type: 'boolean';
  label: string;
  defaultValue: boolean;
}

export interface TextControl {
  type: 'text';
  label: string;
  defaultValue: string;
}

export type ControlDef = SelectControl | BooleanControl | TextControl;

export interface PlaygroundProps {
  controls: Record<string, ControlDef>;
  render: (values: Record<string, string | boolean>) => React.ReactNode;
  code?: string | ((values: Record<string, string | boolean>) => string);
  /** Optional wrapper around the preview area (e.g. TacNativeProvider for native) */
  previewWrapper?: (children: React.ReactNode) => React.ReactNode;
  /** Additional class name for the preview container */
  previewClassName?: string;
}

function buildDefaults(controls: Record<string, ControlDef>): Record<string, string | boolean> {
  const defaults: Record<string, string | boolean> = {};
  for (const [key, def] of Object.entries(controls)) {
    defaults[key] = def.defaultValue;
  }
  return defaults;
}

export function Playground({ controls, render, code, previewWrapper, previewClassName }: PlaygroundProps) {
  const [values, setValues] = useState(() => buildDefaults(controls));
  const [showCode, setShowCode] = useState(false);

  const setValue = useCallback((key: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resolvedCode = typeof code === 'function' ? code(values) : code;

  const preview = (
    <div
      className={cn(
        'p-6 bg-[var(--background)] rounded-t-[var(--radius-lg)] flex flex-wrap items-center gap-4',
        previewClassName,
      )}
    >
      {render(values)}
    </div>
  );

  return (
    <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
      {/* Preview */}
      {previewWrapper ? previewWrapper(preview) : preview}

      {/* Controls panel */}
      <div className="border-t border-solid border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {Object.entries(controls).map(([key, def]) => {
            if (def.type === 'select') {
              return (
                <div key={key} className="flex items-center gap-2">
                  <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider whitespace-nowrap">
                    {def.label}
                  </label>
                  <Select
                    size="sm"
                    value={values[key] as string}
                    onChange={(v) => setValue(key, v)}
                    options={def.options.map((o) => ({ value: o, label: o }))}
                  />
                </div>
              );
            }
            if (def.type === 'boolean') {
              return (
                <div key={key} className="flex items-center gap-2">
                  <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider whitespace-nowrap">
                    {def.label}
                  </label>
                  <Switch checked={values[key] as boolean} onChange={(checked) => setValue(key, checked)} />
                </div>
              );
            }
            if (def.type === 'text') {
              return (
                <div key={key} className="flex items-center gap-2">
                  <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider whitespace-nowrap">
                    {def.label}
                  </label>
                  <input
                    type="text"
                    value={values[key] as string}
                    onChange={(e) => setValue(key, e.target.value)}
                    className="h-7 px-2 text-xs rounded-[var(--radius-sm)] border border-solid border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Code toggle */}
      {resolvedCode && (
        <>
          <div className="flex justify-end border-t border-solid border-[var(--border)] bg-[var(--secondary)]/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="text-[11px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-3 py-1.5 h-auto rounded-none"
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: showCode ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="border-t border-solid border-[var(--border)] rounded-b-[var(--radius-lg)] [&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
                <CodeBlock code={resolvedCode.trim()} language="tsx" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
