'use client';

import React, { useState } from 'react';
import { ColorPicker } from '@tac-ui/web';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';
import { usePageTranslation } from '@/i18n';

function ControlledExample() {
  const [color, setColor] = useState('#3B82F6');
  return (
    <div className="flex flex-col gap-2 items-start">
      <ColorPicker label="Brand Color" value={color} onChange={setColor} />
      <span className="text-xs text-[var(--muted-foreground)]">Selected: {color}</span>
    </div>
  );
}

const customColors = [
  '#0F172A', '#1E293B', '#334155', '#475569',
  '#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0',
  '#F1F5F9', '#F8FAFC', '#FFFFFF', '#000000',
];

export default function ColorPickerPage() {
  const pt = usePageTranslation('color-picker');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'ColorPicker'}</DocTitle>
        <DocDescription>{pt?.description ?? 'A color selector with spectrum gradient picker, swatch grid, eyedropper, and channel inputs for precise color selection. Includes a confirm button for two-step picking.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'The base picker renders a trigger button showing the selected color swatch. Opening the dropdown reveals the full spectrum picker, preset swatches, hex input, and channel inputs.'}</DocText>
        <Showcase code={`<ColorPicker placeholder="Select color" />`} className="items-start">
          <ColorPicker placeholder="Select color" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-label']?.title ?? 'With Label'}>
        <DocText>{pt?.sections?.['with-label']?.texts?.[0] ?? 'Use <code>label</code> to render an associated label above the trigger and <code>helperText</code> to display a hint below when there is no active error.'}</DocText>
        <Showcase code={`<ColorPicker label="Background Color" helperText="Choose a background color for the card." />`} className="items-start">
          <ColorPicker label="Background Color" helperText="Choose a background color for the card." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-colors']?.title ?? 'Custom Colors'}>
        <DocText>{pt?.sections?.['custom-colors']?.texts?.[0] ?? 'Pass a <code>colors</code> array of hex strings to replace the 30-color default preset grid with a custom palette. The grid always uses 6 columns.'}</DocText>
        <Showcase code={`<ColorPicker
  label="Grayscale"
  colors={['#0F172A', '#1E293B', '#334155', '#475569', '#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0', '#F1F5F9', '#F8FAFC', '#FFFFFF', '#000000']}
/>`} className="items-start">
          <ColorPicker label="Grayscale" colors={customColors} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-spectrum']?.title ?? 'Without Spectrum'}>
        <DocText>{pt?.sections?.['without-spectrum']?.texts?.[0] ?? 'Set <code>showSpectrum={false}</code> to hide the saturation/brightness canvas and hue slider, leaving only the swatch grid and hex input.'}</DocText>
        <Showcase code={`<ColorPicker label="Simple Mode" showSpectrum={false} />`} className="items-start">
          <ColorPicker label="Simple Mode" showSpectrum={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-channels']?.title ?? 'Without Channels'}>
        <DocText>{pt?.sections?.['without-channels']?.texts?.[0] ?? 'Set <code>showChannels={false}</code> to hide the RGB and HSB numeric input rows for a more compact panel layout.'}</DocText>
        <Showcase code={`<ColorPicker label="No Channels" showChannels={false} />`} className="items-start">
          <ColorPicker label="No Channels" showChannels={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['swatches-only']?.title ?? 'Swatches Only'}>
        <DocText>{pt?.sections?.['swatches-only']?.texts?.[0] ?? 'Combine <code>showSpectrum={false}</code>, <code>showChannels={false}</code>, and <code>showEyeDropper={false}</code> to create a minimal swatch-only picker panel.'}</DocText>
        <Showcase code={`<ColorPicker label="Swatches Only" showSpectrum={false} showChannels={false} showEyeDropper={false} />`} className="items-start">
          <ColorPicker label="Swatches Only" showSpectrum={false} showChannels={false} showEyeDropper={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['without-input']?.title ?? 'Without Input'}>
        <DocText>{pt?.sections?.['without-input']?.texts?.[0] ?? 'Set <code>showInput={false}</code> to hide the hex text input and eyedropper row below the presets.'}</DocText>
        <Showcase code={`<ColorPicker label="Quick Pick" showInput={false} showChannels={false} />`} className="items-start">
          <ColorPicker label="Quick Pick" showInput={false} showChannels={false} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['error-state']?.title ?? 'Error State'}>
        <DocText>{pt?.sections?.['error-state']?.texts?.[0] ?? 'Set <code>error</code> to apply destructive border styling to the trigger and pass <code>errorMessage</code> to display a validation message below it.'}</DocText>
        <Showcase code={`<ColorPicker label="Theme Color" error errorMessage="Please select a color." />`} className="items-start">
          <ColorPicker label="Theme Color" error errorMessage="Please select a color." />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['disabled']?.title ?? 'Disabled'}>
        <DocText>{pt?.sections?.['disabled']?.texts?.[0] ?? 'When <code>disabled</code> is true the trigger is non-interactive and the picker panel will not open.'}</DocText>
        <Showcase code={`<ColorPicker placeholder="Disabled" disabled />`} className="items-start">
          <ColorPicker placeholder="Disabled" disabled />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['controlled']?.title ?? 'Controlled'}>
        <DocText>{pt?.sections?.['controlled']?.texts?.[0] ?? 'Use <code>value</code> and <code>onChange</code> for controlled usage. The <code>onChange</code> callback fires only when the Select button is pressed, making color changes explicit.'}</DocText>
        <Showcase code={`const [color, setColor] = useState('#3B82F6');
<ColorPicker label="Brand Color" value={color} onChange={setColor} />`} className="items-start">
          <ControlledExample />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'value', type: 'string', default: '-', description: pt?.props?.['value'] ?? 'Controlled selected color as a hex string.' },
          { name: 'onChange', type: '(color: string) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Called when a color is confirmed via the Select button.' },
          { name: 'label', type: 'string', default: '-', description: pt?.props?.['label'] ?? 'Label text displayed above the trigger.' },
          { name: 'placeholder', type: 'string', default: '"Select color"', description: pt?.props?.['placeholder'] ?? 'Placeholder text when no color is selected.' },
          { name: 'helperText', type: 'string', default: '-', description: pt?.props?.['helperText'] ?? 'Helper text displayed below the trigger when there is no error.' },
          { name: 'colors', type: 'string[]', default: '30 default colors', description: pt?.props?.['colors'] ?? 'Custom array of hex color strings for the swatch grid.' },
          { name: 'showInput', type: 'boolean', default: 'true', description: pt?.props?.['showInput'] ?? 'Shows a text input for manual hex entry.' },
          { name: 'showSpectrum', type: 'boolean', default: 'true', description: pt?.props?.['showSpectrum'] ?? 'Shows the spectrum gradient picker for detailed color selection.' },
          { name: 'showEyeDropper', type: 'boolean', default: 'true', description: pt?.props?.['showEyeDropper'] ?? 'Shows the eyedropper button (requires browser support).' },
          { name: 'showChannels', type: 'boolean', default: 'true', description: pt?.props?.['showChannels'] ?? 'Shows RGB/HSB channel inputs for precise values.' },
          { name: 'error', type: 'boolean', default: 'false', description: pt?.props?.['error'] ?? 'Applies error styling when true.' },
          { name: 'errorMessage', type: 'string', default: '-', description: pt?.props?.['errorMessage'] ?? 'Error message displayed when error is true.' },
          { name: 'id', type: 'string', default: '-', description: pt?.props?.['id'] ?? 'ID attribute for the trigger button; auto-generated if omitted.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the picker.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
