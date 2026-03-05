import React from 'react';
import { CodeBlock } from '@tac-ui/native';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Section } from '../../components/Section';
import { ShowcaseCard } from '../../components/ShowcaseCard';
import { PropsTable } from '../../components/PropsTable';
import { CodePreview } from '../../components/CodePreview';

const sampleCode = `import { Button } from '@tac-ui/native';

export default function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Hello!')}>
      Hello, Tac UI!
    </Button>
  );
}`;

const jsCode = `const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('World'));`;

export default function CodeBlockScreen() {
  return (
    <ScreenLayout
      title="CodeBlock"
      description="Syntax-highlighted code display with optional language label and copy button."
    >
      <Section title="Import">
        <CodePreview code={`import { CodeBlock } from '@tac-ui/native';`} />
      </Section>

      <Section title="Default">
        <ShowcaseCard
          code={`<CodeBlock
  language="tsx"
  code={\`import { Button } from '@tac-ui/native';

export default function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Hello!')}>
      Hello, Tac UI!
    </Button>
  );
}\`}
/>`}
        >
          <CodeBlock language="tsx" code={sampleCode} />
        </ShowcaseCard>
      </Section>

      <Section title="JavaScript">
        <ShowcaseCard
          code={`<CodeBlock
  language="js"
  code={\`const greet = (name) => {
  return \\\`Hello, \\\${name}!\\\`;
};
console.log(greet('World'));\`}
/>`}
        >
          <CodeBlock language="js" code={jsCode} />
        </ShowcaseCard>
      </Section>

      <Section title="Glass Variant">
        <ShowcaseCard
          code={`<CodeBlock
  language="bash"
  glass
  code="pnpm add @tac-ui/native"
/>`}
        >
          <CodeBlock language="bash" glass code="pnpm add @tac-ui/native" />
        </ShowcaseCard>
      </Section>

      <Section title="API Reference">
        <PropsTable
          data={[
            {
              name: 'code',
              type: 'string',
              default: '—',
              description: 'The source code string to display.',
            },
            {
              name: 'language',
              type: 'string',
              default: '—',
              description: 'Optional language label shown in the top-left corner.',
            },
            {
              name: 'glass',
              type: 'boolean',
              default: 'false',
              description: 'Uses a semi-transparent background instead of solid dark.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '—',
              description: 'Additional styles applied to the wrapper.',
            },
          ]}
        />
      </Section>
    </ScreenLayout>
  );
}
