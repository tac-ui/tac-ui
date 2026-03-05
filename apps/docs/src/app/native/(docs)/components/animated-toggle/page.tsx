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
import { NativePlayground } from '@/components/docs/NativePlayground';
import { Toggle } from '@tac-ui/native';
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
} from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';

function PlaygroundToggle({
  iconOn,
  iconOff,
  disabled,
}: {
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  disabled: boolean;
}) {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onChange={setChecked} iconOn={iconOn} iconOff={iconOff} disabled={disabled} />;
}

export default function NativeAnimatedTogglePage() {
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
  const pt = usePageTranslation('native-animated-toggle');

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Toggle'}</DocTitle>
        <DocDescription>
          {pt?.description ?? 'An animated toggle button that switches between two states with a visual transition.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Toggle } from '@tac-ui/native';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Toggle props below.</DocText>
        <NativePlayground
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
              'sun/moon': [<Sun key="on" size={20} />, <Moon key="off" size={20} />],
              'heart/heartOff': [<Heart key="on" size={20} />, <HeartOff key="off" size={20} />],
              'bell/bellOff': [<Bell key="on" size={20} />, <BellOff key="off" size={20} />],
              'eye/eyeOff': [<Eye key="on" size={20} />, <EyeOff key="off" size={20} />],
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
            return `<Toggle iconOn={<${on} size={20} />} iconOff={<${off} size={20} />}${values.disabled ? ' disabled' : ''} />`;
          }}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'Pass iconOn and iconOff to define the icon for each state. The button fires onChange with the new boolean value on each press.'}
        </DocText>
        <NativeShowcase
          code={`import { Sun, Moon } from '@tac-ui/icon-native';

<Toggle
  checked={checked}
  onChange={setChecked}
  iconOn={<Sun size={20} />}
  iconOff={<Moon size={20} />}
/>`}
        >
          <Toggle checked={checked1} onChange={setChecked1} iconOn={<Sun size={20} />} iconOff={<Moon size={20} />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['media-controls']?.title ?? 'Media Controls'}>
        <DocText>
          {pt?.sections?.['media-controls']?.texts?.[0] ??
            'Toggle works with any pair of icons — ideal for mute, mic, and play/pause controls.'}
        </DocText>
        <NativeShowcase
          code={`import { Volume2, VolumeX, Mic, MicOff, Pause, Play } from '@tac-ui/icon-native';

<Toggle iconOn={<Volume2 size={20} />} iconOff={<VolumeX size={20} />} />
<Toggle iconOn={<Mic size={20} />} iconOff={<MicOff size={20} />} />
<Toggle iconOn={<Pause size={20} />} iconOff={<Play size={20} />} />`}
        >
          <Toggle
            checked={checked2}
            onChange={setChecked2}
            iconOn={<Volume2 size={20} />}
            iconOff={<VolumeX size={20} />}
          />
          <Toggle checked={checked3} onChange={setChecked3} iconOn={<Mic size={20} />} iconOff={<MicOff size={20} />} />
          <Toggle checked={checked4} onChange={setChecked4} iconOn={<Pause size={20} />} iconOff={<Play size={20} />} />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['visibility-and-security']?.title ?? 'Visibility & Security'}>
        <DocText>
          {pt?.sections?.['visibility-and-security']?.texts?.[0] ??
            'Use complementary icon pairs to represent binary visibility or security states.'}
        </DocText>
        <NativeShowcase
          code={`import { Eye, EyeOff, Unlock, Lock, Wifi, WifiOff } from '@tac-ui/icon-native';

<Toggle iconOn={<Eye size={20} />} iconOff={<EyeOff size={20} />} />
<Toggle iconOn={<Unlock size={20} />} iconOff={<Lock size={20} />} />
<Toggle iconOn={<Wifi size={20} />} iconOff={<WifiOff size={20} />} />`}
        >
          <Toggle checked={checked5} onChange={setChecked5} iconOn={<Eye size={20} />} iconOff={<EyeOff size={20} />} />
          <Toggle
            checked={checked6}
            onChange={setChecked6}
            iconOn={<Unlock size={20} />}
            iconOff={<Lock size={20} />}
          />
          <Toggle
            checked={checked7}
            onChange={setChecked7}
            iconOn={<Wifi size={20} />}
            iconOff={<WifiOff size={20} />}
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['social-and-actions']?.title ?? 'Social & Actions'}>
        <DocText>
          {pt?.sections?.['social-and-actions']?.texts?.[0] ??
            'Social reaction states animate between the active and inactive icon with a spring rotation transition.'}
        </DocText>
        <NativeShowcase
          code={`import { Heart, HeartOff, Bookmark, BookmarkX, Star, StarOff, ThumbsUp, ThumbsDown } from '@tac-ui/icon-native';

<Toggle iconOn={<Heart size={20} />} iconOff={<HeartOff size={20} />} />
<Toggle iconOn={<Bookmark size={20} />} iconOff={<BookmarkX size={20} />} />
<Toggle iconOn={<Star size={20} />} iconOff={<StarOff size={20} />} />
<Toggle iconOn={<ThumbsUp size={20} />} iconOff={<ThumbsDown size={20} />} />`}
        >
          <Toggle
            checked={checked8}
            onChange={setChecked8}
            iconOn={<Heart size={20} />}
            iconOff={<HeartOff size={20} />}
          />
          <Toggle
            checked={checked9}
            onChange={setChecked9}
            iconOn={<Bookmark size={20} />}
            iconOff={<BookmarkX size={20} />}
          />
          <Toggle
            checked={checked10}
            onChange={setChecked10}
            iconOn={<Star size={20} />}
            iconOff={<StarOff size={20} />}
          />
          <Toggle
            checked={checked11}
            onChange={setChecked11}
            iconOn={<ThumbsUp size={20} />}
            iconOff={<ThumbsDown size={20} />}
          />
        </NativeShowcase>
      </DocSection>

      <DocSection title={pt?.sections?.['notifications-and-pinning']?.title ?? 'Notifications & Pinning'}>
        <DocText>
          {pt?.sections?.['notifications-and-pinning']?.texts?.[0] ??
            'Bell and pin pairs are common toolbar toggles for notification and pin-to-top features.'}
        </DocText>
        <NativeShowcase
          code={`import { Bell, BellOff, Pin, PinOff } from '@tac-ui/icon-native';

<Toggle iconOn={<Bell size={20} />} iconOff={<BellOff size={20} />} />
<Toggle iconOn={<Pin size={20} />} iconOff={<PinOff size={20} />} />`}
        >
          <Toggle
            checked={checked12}
            onChange={setChecked12}
            iconOn={<Bell size={20} />}
            iconOff={<BellOff size={20} />}
          />
          <Toggle
            checked={checked13}
            onChange={setChecked13}
            iconOn={<Pin size={20} />}
            iconOff={<PinOff size={20} />}
          />
        </NativeShowcase>
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
                pt?.props?.['onChange'] ?? 'Callback fired when the toggle is pressed, receives the new boolean value.',
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
              name: 'style',
              type: 'ViewStyle',
              default: '-',
              description: pt?.props?.['style'] ?? 'Additional styles applied to the pressable container.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
