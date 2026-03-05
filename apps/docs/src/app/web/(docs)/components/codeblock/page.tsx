'use client';

import React from 'react';
import { CodeBlock } from '@tac-ui/web';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

const tsExample = `import { Badge } from '@tac-ui/web';

interface StatusProps {
  status: 'active' | 'inactive' | 'pending';
}

export function StatusBadge({ status }: StatusProps) {
  const variantMap = {
    active: 'success',
    inactive: 'error',
    pending: 'warning',
  } as const;

  return (
    <Badge variant={variantMap[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}`;

const cssExample = `/* Theme Color Tokens */
--primary: #6366f1;
--primary-foreground: #ffffff;
--secondary: #f1f5f9;
--secondary-foreground: #0f172a;

/* Semantic Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;

/* Surface Colors */
--background: #ffffff;
--foreground: #0f172a;
--card: #ffffff;
--border: #e2e8f0;
--muted-foreground: #64748b;`;

const bashExample = `# Install tac-ui
npm install @tac-ui/web

# Or with pnpm
pnpm add @tac-ui/web

# Start the dev server
npm run dev`;

const glassExample = `import { CodeBlock } from '@tac-ui/web';

export function InstallCommand() {
  return (
    <CodeBlock
      glass
      language="bash"
      code="pnpm add @tac-ui/web"
    />
  );
}`;

export default function CodeBlockPage() {
  const pt = usePageTranslation('codeblock');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'CodeBlock'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A syntax-highlighted code display component with language support and copy functionality.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { CodeBlock } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the CodeBlock props below.</DocText>
        <Playground
          controls={{
            language: {
              type: 'select',
              label: 'Language',
              options: ['tsx', 'bash', 'json'],
              defaultValue: 'tsx',
            },
            glass: {
              type: 'boolean',
              label: 'Glass',
              defaultValue: false,
            },
          }}
          render={(values) => {
            const codeByLang: Record<string, string> = {
              tsx: `import { Button } from '@tac-ui/web';\n\nexport function Demo() {\n  return <Button variant="primary">Click me</Button>;\n}`,
              bash: `# Install tac-ui\nnpm install @tac-ui/web\n\n# Start the dev server\nnpm run dev`,
              json: `{\n  "name": "@tac-ui/web",\n  "version": "1.0.0",\n  "description": "Tac UI Web Components"\n}`,
            };
            return (
              <div className="w-full overflow-hidden rounded-[var(--radius-m)]">
                <CodeBlock
                  language={values.language as string}
                  glass={values.glass as boolean}
                  code={codeByLang[values.language as string] ?? codeByLang.tsx}
                />
              </div>
            );
          }}
          code={(values) => `<CodeBlock language="${values.language}"${values.glass ? ' glass' : ''} code={...} />`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['typescript-example']?.title ?? 'TypeScript Example'}>
        <DocText>
          {pt?.sections?.['typescript-example']?.texts?.[0] ??
            'Render TypeScript or TSX code with a language label in the header bar and a one-click copy-to-clipboard button.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<CodeBlock
  language="tsx"
  code={\`import { Badge } from '@tac-ui/web';

export function StatusBadge({ status }) {
  return <Badge variant="success">{status}</Badge>;
}\`}
/>`}
        >
          <CodeBlock language="tsx" code={tsExample} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['css-color-tokens']?.title ?? 'CSS Color Tokens'}>
        <DocText>
          {pt?.sections?.['css-color-tokens']?.texts?.[0] ??
            'Display CSS color tokens and theme variables with syntax-specific styling in the header.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<CodeBlock
  language="css"
  code={\`/* Theme Color Tokens */
--primary: #6366f1;
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;\`}
/>`}
        >
          <CodeBlock language="css" code={cssExample} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['bash-example']?.title ?? 'Bash Example'}>
        <DocText>
          {pt?.sections?.['bash-example']?.texts?.[0] ??
            'Shell commands rendered with a bash label, suitable for installation instructions or CLI documentation.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<CodeBlock
  language="bash"
  code={\`npm install @tac-ui/web\`}
/>`}
        >
          <CodeBlock language="bash" code={bashExample} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['glass-variant']?.title ?? 'Glass Variant'}>
        <DocText>
          {pt?.sections?.['glass-variant']?.texts?.[0] ??
            'The glass prop applies backdrop-blur glassmorphism styling — transparent background with saturated blur — ideal for overlaying code on visual backgrounds.'}
        </DocText>
        <Showcase
          className="flex-col items-stretch p-0 overflow-hidden"
          code={`<CodeBlock
  glass
  language="tsx"
  code={\`import { CodeBlock } from '@tac-ui/web';\`}
/>`}
        >
          <CodeBlock glass language="tsx" code={glassExample} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'code',
              type: 'string',
              default: '-',
              description: pt?.props?.['code'] ?? 'The source code string to display. Required.',
            },
            {
              name: 'language',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['language'] ??
                'Language label shown in the header bar (e.g. "tsx", "bash", "css"). Does not affect syntax highlighting.',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['glass'] ??
                'When true, applies glassmorphism styling with backdrop blur and saturated transparency.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names applied to the outer container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
