'use client';

import React, { useState } from 'react';
import { Toggle } from '@tac-ui/web';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Heart,
  HeartOff,
  Bell,
  BellOff,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  Lock,
  Unlock,
  Pin,
  PinOff,
  Bookmark,
  BookmarkX,
  Star,
  StarOff,
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
} from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
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
import { Playground } from '@/components/docs/Playground';

function PlaygroundToggle(props: React.ComponentProps<typeof Toggle>) {
  const [on, setOn] = useState(false);
  return <Toggle {...props} checked={on} onChange={setOn} />;
}

export default function TogglePage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(true);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(true);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [checked11, setChecked11] = useState(true);
  const [checked12, setChecked12] = useState(false);
  const [checked13, setChecked13] = useState(false);
  const [checked14, setChecked14] = useState(false);
  const pt = usePageTranslation('toggle');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Toggle'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'An animated toggle button that switches between two states with a visual transition.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Toggle } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Toggle props below.</DocText>
        <Playground
          controls={{
            iconPair: {
              type: 'select',
              label: 'Icon Pair',
              options: ['sun/moon', 'heart/heartOff', 'bell/bellOff', 'eye/eyeOff'],
              defaultValue: 'sun/moon',
            },
            disabled: {
              type: 'boolean',
              label: 'Disabled',
              defaultValue: false,
            },
          }}
          render={(values) => {
            const iconMap: Record<string, [React.ReactNode, React.ReactNode]> = {
              'sun/moon': [<Sun key="on" />, <Moon key="off" />],
              'heart/heartOff': [<Heart key="on" />, <HeartOff key="off" />],
              'bell/bellOff': [<Bell key="on" />, <BellOff key="off" />],
              'eye/eyeOff': [<Eye key="on" />, <EyeOff key="off" />],
            };
            const [iconOn, iconOff] = iconMap[values.iconPair as string] ?? iconMap['sun/moon'];
            return <PlaygroundToggle iconOn={iconOn} iconOff={iconOff} disabled={values.disabled as boolean} />;
          }}
          code={(values) => {
            const iconCodeMap: Record<string, [string, string]> = {
              'sun/moon': ['Sun', 'Moon'],
              'heart/heartOff': ['Heart', 'HeartOff'],
              'bell/bellOff': ['Bell', 'BellOff'],
              'eye/eyeOff': ['Eye', 'EyeOff'],
            };
            const [on, off] = iconCodeMap[values.iconPair as string] ?? ['Sun', 'Moon'];
            return `<Toggle iconOn={<${on} />} iconOff={<${off} />}${values.disabled ? ' disabled' : ''} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Pass iconOn and iconOff to define the icon for each state. The button fires onChange with the new boolean value on each click.'}
        </DocText>
        <Showcase
          code={`<Toggle
  checked={checked}
  onChange={setChecked}
  iconOn={<Sun />}
  iconOff={<Moon />}
/>`}
        >
          <Toggle checked={checked1} onChange={setChecked1} iconOn={<Sun />} iconOff={<Moon />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['media-controls']?.title ?? 'Media Controls'}>
        <DocText>
          {pt?.sections?.['media-controls']?.texts?.[0] ??
            'Toggle works with any pair of icons — ideal for mute, mic, and play/pause controls.'}
        </DocText>
        <Showcase
          code={`<Toggle iconOn={<Volume2 />} iconOff={<VolumeX />} />
<Toggle iconOn={<Mic />} iconOff={<MicOff />} />
<Toggle iconOn={<Pause />} iconOff={<Play />} />`}
        >
          <Toggle checked={checked2} onChange={setChecked2} iconOn={<Volume2 />} iconOff={<VolumeX />} />
          <Toggle checked={checked3} onChange={setChecked3} iconOn={<Mic />} iconOff={<MicOff />} />
          <Toggle checked={checked4} onChange={setChecked4} iconOn={<Pause />} iconOff={<Play />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['visibility-and-security']?.title ?? 'Visibility & Security'}>
        <DocText>
          {pt?.sections?.['visibility-and-security']?.texts?.[0] ??
            'Use complementary icon pairs to represent binary visibility or security states.'}
        </DocText>
        <Showcase
          code={`<Toggle iconOn={<Eye />} iconOff={<EyeOff />} />
<Toggle iconOn={<Unlock />} iconOff={<Lock />} />
<Toggle iconOn={<Wifi />} iconOff={<WifiOff />} />`}
        >
          <Toggle checked={checked5} onChange={setChecked5} iconOn={<Eye />} iconOff={<EyeOff />} />
          <Toggle checked={checked6} onChange={setChecked6} iconOn={<Unlock />} iconOff={<Lock />} />
          <Toggle checked={checked7} onChange={setChecked7} iconOn={<Wifi />} iconOff={<WifiOff />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['social-and-actions']?.title ?? 'Social & Actions'}>
        <DocText>
          {pt?.sections?.['social-and-actions']?.texts?.[0] ??
            'Social reaction states animate between the active and inactive icon with a spring rotation transition.'}
        </DocText>
        <Showcase
          code={`<Toggle iconOn={<Heart />} iconOff={<HeartOff />} />
<Toggle iconOn={<Bookmark />} iconOff={<BookmarkX />} />
<Toggle iconOn={<Star />} iconOff={<StarOff />} />
<Toggle iconOn={<ThumbsUp />} iconOff={<ThumbsDown />} />`}
        >
          <Toggle checked={checked8} onChange={setChecked8} iconOn={<Heart />} iconOff={<HeartOff />} />
          <Toggle checked={checked9} onChange={setChecked9} iconOn={<Bookmark />} iconOff={<BookmarkX />} />
          <Toggle checked={checked10} onChange={setChecked10} iconOn={<Star />} iconOff={<StarOff />} />
          <Toggle checked={checked11} onChange={setChecked11} iconOn={<ThumbsUp />} iconOff={<ThumbsDown />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['notifications-and-pinning']?.title ?? 'Notifications & Pinning'}>
        <DocText>
          {pt?.sections?.['notifications-and-pinning']?.texts?.[0] ??
            'Bell and pin pairs are common toolbar toggles for notification and pin-to-top features.'}
        </DocText>
        <Showcase
          code={`<Toggle iconOn={<Bell />} iconOff={<BellOff />} />
<Toggle iconOn={<Pin />} iconOff={<PinOff />} />`}
        >
          <Toggle checked={checked12} onChange={setChecked12} iconOn={<Bell />} iconOff={<BellOff />} />
          <Toggle checked={checked13} onChange={setChecked13} iconOn={<Pin />} iconOff={<PinOff />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-size']?.title ?? 'Custom Size'}>
        <DocText>
          {pt?.sections?.['custom-size']?.texts?.[0] ??
            'Override the button dimensions and icon size via className to scale the toggle to any size needed.'}
        </DocText>
        <Showcase
          code={`<Toggle
  iconOn={<Heart />}
  iconOff={<HeartOff />}
  className="w-12 h-12 [&_svg]:w-6 [&_svg]:h-6"
/>`}
        >
          <Toggle
            checked={checked14}
            onChange={setChecked14}
            iconOn={<Heart />}
            iconOff={<HeartOff />}
            className="w-12 h-12 [&_svg]:!w-6 [&_svg]:!h-6"
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable
          data={[
            {
              name: 'checked',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['checked'] ?? 'The controlled checked state.',
            },
            {
              name: 'onChange',
              type: '(checked: boolean) => void',
              default: '-',
              description:
                pt?.props?.['onChange'] ?? 'Callback fired when the toggle is clicked, receives the new boolean value.',
            },
            {
              name: 'iconOn',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['iconOn'] ?? 'Icon rendered when checked is true.',
            },
            {
              name: 'iconOff',
              type: 'React.ReactNode',
              default: '-',
              description: pt?.props?.['iconOff'] ?? 'Icon rendered when checked is false.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: pt?.props?.['disabled'] ?? 'Disables the button, blocking all interactions.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names for sizing or styling overrides.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
