'use client';

import React from 'react';
import { Label, Input } from '@tac-ui/web';
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

export default function LabelPage() {
  const pt = usePageTranslation('label');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Label'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'An accessible form label with optional required indicator, optional suffix, and tooltip support.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Label } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Label props below.</DocText>
        <Playground
          controls={{
            required: {
              type: 'boolean',
              label: 'Required',
              defaultValue: false,
            },
            showOptional: {
              type: 'boolean',
              label: 'Show Optional',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Label
              required={values.required as boolean}
              showOptional={values.showOptional as boolean}
            >
              Email address
            </Label>
          )}
          code={(values) =>
            `<Label${values.required ? ' required' : ''}${values.showOptional ? ' showOptional' : ''}>
  Email address
</Label>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'A basic label with no additional modifiers. Renders as a styled HTML label element with medium font weight.'}
        </DocText>
        <Showcase code={`<Label>Email address</Label>`}>
          <Label>Email address</Label>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['required']?.title ?? 'Required'}>
        <DocText>
          {pt?.sections?.['required']?.texts?.[0] ??
            'Set the required prop to append a red asterisk after the label text. The asterisk is hidden from assistive technology via aria-hidden.'}
        </DocText>
        <Showcase
          code={`<Label required>Password</Label>
<Label required>Username</Label>`}
        >
          <div className="flex flex-col gap-2">
            <Label required>Password</Label>
            <Label required>Username</Label>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['optional']?.title ?? 'Optional'}>
        <DocText>
          {pt?.sections?.['optional']?.texts?.[0] ??
            'Set showOptional to append a muted "(optional)" suffix, signalling to users that the field is not mandatory.'}
        </DocText>
        <Showcase
          code={`<Label showOptional>Bio</Label>
<Label showOptional>Website</Label>`}
        >
          <div className="flex flex-col gap-2">
            <Label showOptional>Bio</Label>
            <Label showOptional>Website</Label>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-tooltip']?.title ?? 'With Tooltip'}>
        <DocText>
          {pt?.sections?.['with-tooltip']?.texts?.[0] ??
            'Pass any React node to the tooltip prop to display an info icon next to the label. Hovering or focusing the icon reveals the tooltip.'}
        </DocText>
        <Showcase
          code={`<Label tooltip="We'll never share your email with anyone else.">
  Email address
</Label>
<Label required tooltip="Must be at least 8 characters and contain a number.">
  Password
</Label>`}
        >
          <div className="flex flex-col gap-2">
            <Label tooltip="We'll never share your email with anyone else.">Email address</Label>
            <Label required tooltip="Must be at least 8 characters and contain a number.">
              Password
            </Label>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-input']?.title ?? 'With Input'}>
        <DocText>
          {pt?.sections?.['with-input']?.texts?.[0] ??
            'Pair Label with an Input by passing a matching htmlFor and id. The label click focuses the input field.'}
        </DocText>
        <Showcase
          code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="email" required>
    Email address
  </Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio" showOptional>
    Bio
  </Label>
  <Input id="bio" placeholder="Tell us about yourself" />
</div>`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="label-demo-email" required>
                Email address
              </Label>
              <Input id="label-demo-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="label-demo-bio" showOptional>
                Bio
              </Label>
              <Input id="label-demo-bio" placeholder="Tell us about yourself" />
            </div>
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Label props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['required'] ??
                'When true, appends a red asterisk to indicate the field is required.',
            },
            {
              name: 'showOptional',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['showOptional'] ?? 'When true, appends a grey "(optional)" suffix.',
            },
            {
              name: 'tooltip',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['tooltip'] ??
                'Tooltip content shown next to the label via an info icon.',
            },
            {
              name: 'htmlFor',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['htmlFor'] ??
                'Associates the label with a form control by its id.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['children'] ?? 'The label text or content.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
