'use client';

import React, { useState } from 'react';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  DocText,
  PreviewCode,
  PropsTable,
} from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { NativeShowcase } from '@/components/docs/NativeShowcase';
import { ColorPicker } from '@tac-ui/native';
import { usePageTranslation } from '@/i18n';

function ControlledExample() {
  const [color, setColor] = useState('#3B82F6');
  return <ColorPicker label="Brand Color" value={color} onChange={setColor} />;
}

const customColors = [
  '#0F172A',
  '#1E293B',
  '#334155',
  '#475569',
  '#64748B',
  '#94A3B8',
  '#CBD5E1',
  '#E2E8F0',
  '#F1F5F9',
  '#F8FAFC',
  '#FFFFFF',
  '#000000',
];

export default function NativeColorPickerPage() {
  const pt = usePageTranslation('native-color-picker');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'ColorPicker'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A color selector with spectrum gradient picker, swatch grid, and channel inputs for precise color selection. Includes a confirm button for two-step picking.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { ColorPicker } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The base picker renders a trigger button showing the selected color swatch. Opening the modal reveals the full spectrum picker, preset swatches, hex input, and channel inputs.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker placeholder="Select color" />`}>
          <ColorPicker placeholder="Select color" />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>
          {pt?.sections?.['with-label']?.texts?.[0] ??
            'Use label to render an associated label above the trigger and helperText to display a hint below when there is no active error.'}
        </DocText>
        <NativeShowcase
          code={`<ColorPicker label="Background Color" helperText="Choose a background color for the card." />`}
        >
          <ColorPicker label="Background Color" helperText="Choose a background color for the card." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-colors']?.title ?? 'Custom Colors'}>
        <DocText>
          {pt?.sections?.['custom-colors']?.texts?.[0] ??
            'Pass a colors array of hex strings to replace the default preset grid with a custom palette.'}
        </DocText>
        <NativeShowcase
          code={`<ColorPicker
  label="Grayscale"
  colors={['#0F172A', '#1E293B', '#334155', '#475569', '#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0', '#F1F5F9', '#F8FAFC', '#FFFFFF', '#000000']}
/>`}
        >
          <ColorPicker label="Grayscale" colors={customColors} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-spectrum']?.title ?? 'Without Spectrum'}>
        <DocText>
          {pt?.sections?.['without-spectrum']?.texts?.[0] ??
            'Set showSpectrum={false} to hide the saturation/brightness canvas and hue slider, leaving only the swatch grid and hex input.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker label="Simple Mode" showSpectrum={false} />`}>
          <ColorPicker label="Simple Mode" showSpectrum={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-channels']?.title ?? 'Without Channels'}>
        <DocText>
          {pt?.sections?.['without-channels']?.texts?.[0] ??
            'Set showChannels={false} to hide the RGB numeric input rows for a more compact panel layout.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker label="No Channels" showChannels={false} />`}>
          <ColorPicker label="No Channels" showChannels={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['swatches-only']?.title ?? 'Swatches Only'}>
        <DocText>
          {pt?.sections?.['swatches-only']?.texts?.[0] ??
            'Combine showSpectrum={false}, showChannels={false}, and showInput={false} to create a minimal swatch-only picker panel.'}
        </DocText>
        <NativeShowcase
          code={`<ColorPicker label="Swatches Only" showSpectrum={false} showChannels={false} showInput={false} />`}
        >
          <ColorPicker label="Swatches Only" showSpectrum={false} showChannels={false} showInput={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-input']?.title ?? 'Without Input'}>
        <DocText>
          {pt?.sections?.['without-input']?.texts?.[0] ??
            'Set showInput={false} to hide the hex text input row below the presets.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker label="Quick Pick" showInput={false} showChannels={false} />`}>
          <ColorPicker label="Quick Pick" showInput={false} showChannels={false} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>
          {pt?.sections?.['error-state']?.texts?.[0] ??
            'Set error to apply destructive border styling to the trigger and pass errorMessage to display a validation message below it.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker label="Theme Color" error errorMessage="Please select a color." />`}>
          <ColorPicker label="Theme Color" error errorMessage="Please select a color." />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>
          {pt?.sections?.['disabled']?.texts?.[0] ??
            'When disabled is true the trigger is non-interactive and the picker panel will not open.'}
        </DocText>
        <NativeShowcase code={`<ColorPicker placeholder="Disabled" disabled />`}>
          <ColorPicker placeholder="Disabled" disabled />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>
          {pt?.sections?.['controlled']?.texts?.[0] ??
            'Use value and onChange for controlled usage. The onChange callback fires only when the Select button is pressed, making color changes explicit.'}
        </DocText>
        <NativeShowcase
          code={`const [color, setColor] = useState('#3B82F6');
<ColorPicker label="Brand Color" value={color} onChange={setColor} />`}
        >
          <ControlledExample />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'value',
              type: 'string',
              default: '-',
              description: pt?.props?.['value'] ?? 'Controlled selected color as a hex string.',
            },
            {
              name: 'onChange',
              type: '(color: string) => void',
              default: '-',
              description: pt?.props?.['onChange'] ?? 'Called when a color is confirmed via the Select button.',
            },
            {
              name: 'label',
              type: 'string',
              default: '-',
              description: pt?.props?.['label'] ?? 'Label text displayed above the trigger.',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: '"Select color"',
              description: pt?.props?.['placeholder'] ?? 'Placeholder text when no color is selected.',
            },
            {
              name: 'helperText',
              type: 'string',
              default: '-',
              description:
                pt?.props?.['helperText'] ?? 'Helper text displayed below the trigger when there is no error.',
            },
            {
              name: 'colors',
              type: 'string[]',
              default: 'Default palette',
              description: pt?.props?.['colors'] ?? 'Custom array of hex color strings for the swatch grid.',
            },
            {
              name: 'showInput',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['showInput'] ?? 'Shows a text input for manual hex entry.',
            },
            {
              name: 'showSpectrum',
              type: 'boolean',
              default: 'true',
              description:
                pt?.props?.['showSpectrum'] ?? 'Shows the spectrum gradient picker for detailed color selection.',
            },
            {
              name: 'showChannels',
              type: 'boolean',
              default: 'true',
              description: pt?.props?.['showChannels'] ?? 'Shows RGB channel inputs for precise values.',
            },
            {
              name: 'error',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['error'] ?? 'Applies error styling when true.',
            },
            {
              name: 'errorMessage',
              type: 'string',
              default: '-',
              description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the picker.',
            },
            {
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the trigger container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
