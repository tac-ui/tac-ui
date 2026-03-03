'use client';

import React, { useState } from 'react';
import { cn, CodeBlock, VStack, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@tac-ui/web';
import { useTranslation } from '@/i18n';
import { DocNavigation } from './DocNavigation';

/* ─── Page wrapper ─── */
export function DocPage({ children, fullWidth = false }: { children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={cn('mx-auto py-12 px-6 lg:px-8 pb-24', fullWidth ? 'max-w-full' : 'max-w-[960px]')}>
      <VStack gap="xl">{children}</VStack>
      <DocNavigation />
    </div>
  );
}

/* ─── Title block ─── */
export function DocTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] leading-tight">
      {children}
    </h1>
  );
}

export function DocDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed mt-1">
      {children}
    </p>
  );
}

/* ─── Section ─── */
export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack gap="md">
      <h2 className="text-base font-semibold text-[var(--foreground)] pt-2 border-t border-solid border-[var(--border)]">
        {title}
      </h2>
      {children}
    </VStack>
  );
}

/* ─── Subsection ─── */
export function DocSubSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <VStack gap="sm">
      {title && <h3 className="text-sm font-medium text-[var(--foreground)]">{title}</h3>}
      {children}
    </VStack>
  );
}

/* ─── Preview + Code showcase ─── */
export function Preview({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 p-6 rounded-t-[var(--radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PreviewCode({ code, language = 'tsx' }: { code: string; language?: string }) {
  return (
    <div className="rounded-b-[var(--radius-lg)] border border-solid border-t-0 border-[var(--border)] overflow-hidden [&_pre]:!rounded-none [&_pre]:!border-none [&_pre]:!m-0">
      <CodeBlock code={code.trim()} language={language} />
    </div>
  );
}

export function Showcase({
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
  const [showCode, setShowCode] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
      <div className={cn('flex flex-wrap items-center gap-4 p-6 bg-[var(--background)] rounded-t-[var(--radius-lg)]', className)}>
        {children}
      </div>
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

/* ─── Props Table ─── */
export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ data }: { data: PropDef[] }) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-solid border-[var(--border)]">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--secondary)]/50 hover:bg-[var(--secondary)]/50 hover:translate-y-0">
            <TableHead className="py-2.5 px-4 text-[12px]">{t.propsTable.prop}</TableHead>
            <TableHead className="py-2.5 px-4 text-[12px]">{t.propsTable.type}</TableHead>
            <TableHead className="py-2.5 px-4 text-[12px]">{t.propsTable.default}</TableHead>
            <TableHead className="py-2.5 px-4 text-[12px]">{t.propsTable.description}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((prop) => (
            <TableRow key={prop.name} className="last:border-b-0 hover:translate-y-0">
              <TableCell className="py-2.5 px-4 font-mono text-[13px] text-[var(--primary)] font-medium">{prop.name}</TableCell>
              <TableCell className="py-2.5 px-4 font-mono text-[12px] text-[var(--muted-foreground)]">{prop.type}</TableCell>
              <TableCell className="py-2.5 px-4 font-mono text-[12px] text-[var(--muted-foreground)]">{prop.default ?? '-'}</TableCell>
              <TableCell className="py-2.5 px-4 text-[13px] text-[var(--foreground)]">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ─── Inline code ─── */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[13px] font-mono bg-[var(--secondary)] text-[var(--foreground)] px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-solid border-[var(--border)]">
      {children}
    </code>
  );
}

/* ─── Text paragraph ─── */
export function DocText({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-[var(--muted-foreground)] leading-relaxed">{children}</p>;
}
