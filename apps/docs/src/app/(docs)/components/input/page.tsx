'use client';

import React, { useState } from 'react';
import { Input, AnimatedToggle } from '@tac-ui/web';
import { Search, Eye, EyeOff } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

function PasswordInput() {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      label="Password"
      type={visible ? 'text' : 'password'}
      placeholder="Enter password"
      rightIcon={
        <AnimatedToggle
          checked={visible}
          onChange={setVisible}
          iconOn={<EyeOff />}
          iconOff={<Eye />}
          className="w-5 h-5 hover:bg-transparent"
          aria-label={visible ? 'Hide password' : 'Show password'}
        />
      }
    />
  );
}

export default function InputPage() {
  const pt = usePageTranslation('input');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Input'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A text input field with optional label, helper text, icons, and error state support.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'The base input renders a full-width styled text field with smooth border and shadow transitions on hover and focus.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input placeholder="Enter text..." />`}>
          <Input placeholder="Enter text..." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icons']?.title ?? 'With Icons'}>
        <DocText>{pt?.sections?.['with-icons']?.texts?.[0] ?? 'Use leftIcon or rightIcon to render an icon inside the input. The icon slot accepts any React node and automatically sizes SVGs to 20px.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input placeholder="Search..." leftIcon={<Search />} />`}>
          <Input placeholder="Search..." leftIcon={<Search />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['password-toggle']?.title ?? 'Password Toggle'}>
        <DocText>{pt?.sections?.['password-toggle']?.texts?.[0] ?? 'Combine rightIcon with an interactive element such as AnimatedToggle to build a password visibility toggle without any extra wrapper components.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`const [visible, setVisible] = useState(false);

<Input
  label="Password"
  type={visible ? 'text' : 'password'}
  placeholder="Enter password"
  rightIcon={
    <button onClick={() => setVisible(!visible)}>
      {visible ? <EyeOff /> : <Eye />}
    </button>
  }
/>`}>
          <PasswordInput />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label-and-helper']?.title ?? 'With Label and Helper'}>
        <DocText>{pt?.sections?.['with-label-and-helper']?.texts?.[0] ?? 'Pass label to render an associated <label> above the field. helperText appears below when there is no active error.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />`}>
          <Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>{pt?.sections?.['error-state']?.texts?.[0] ?? 'Set error to apply destructive border styling and pass errorMessage to display an accessible error description below the field.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input label="Username" placeholder="username" error errorMessage="Username is already taken." />`}>
          <Input label="Username" placeholder="username" error errorMessage="Username is already taken." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-button']?.title ?? 'With Button'}>
        <DocText>{pt?.sections?.['with-button']?.texts?.[0] ?? 'rightButton renders a small action button flush inside the right edge of the input, styled automatically to match the input height.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input label="Nickname" placeholder="Enter nickname" rightButton={<button>Check</button>} />`}>
          <Input label="Nickname" placeholder="Enter nickname" rightButton={<button>Check</button>} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'The native disabled attribute reduces opacity and blocks all pointer interactions.'}</DocText>
        <Showcase className="flex-col items-stretch" code={`<Input placeholder="Disabled input" disabled />`}>
          <Input placeholder="Disabled input" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label displayed above the input.' },
          { name: 'placeholder', type: 'string', default: '-', description: pt?.props?.['placeholder'] ?? 'Placeholder text shown when empty.' },
          { name: 'helperText', type: 'string', default: '-', description: pt?.props?.['helperText'] ?? 'Helper text displayed below the input when there is no error.' },
          { name: 'error', type: 'boolean', default: 'false', description: pt?.props?.['error'] ?? 'Applies error styling when true.' },
          { name: 'errorMessage', type: 'string', default: '-', description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.' },
          { name: 'leftIcon', type: 'React.ReactNode', default: '-', description: pt?.props?.['leftIcon'] ?? 'Icon rendered on the left side of the input.' },
          { name: 'rightIcon', type: 'React.ReactNode', default: '-', description: pt?.props?.['rightIcon'] ?? 'Icon rendered on the right side of the input.' },
          { name: 'rightButton', type: 'React.ReactNode', default: '-', description: pt?.props?.['rightButton'] ?? 'Button element rendered inside the right side of the input.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the input when true.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
