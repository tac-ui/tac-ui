'use client';

import React, { useState } from 'react';
import { AnimatedToggle } from '@tac-ui/web';
import {
  Sun, Moon, Volume2, VolumeX, Eye, EyeOff,
  Heart, HeartOff, Bell, BellOff, Mic, MicOff,
  Wifi, WifiOff, Lock, Unlock, Pin, PinOff,
  Bookmark, BookmarkX, Star, StarOff,
  Play, Pause, ThumbsUp, ThumbsDown,
} from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, Showcase, PropsTable, DocText } from '@/components/docs/DocPage';

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
        <DocDescription>{pt?.description ?? 'An animated toggle button that switches between two states with a visual transition.'}</DocDescription>
      </div>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>{pt?.sections?.['default']?.texts?.[0] ?? 'Pass iconOn and iconOff to define the icon for each state. The button fires onChange with the new boolean value on each click.'}</DocText>
        <Showcase code={`<AnimatedToggle
  checked={checked}
  onChange={setChecked}
  iconOn={<Sun />}
  iconOff={<Moon />}
/>`}>
          <AnimatedToggle checked={checked1} onChange={setChecked1} iconOn={<Sun />} iconOff={<Moon />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['media-controls']?.title ?? 'Media Controls'}>
        <DocText>{pt?.sections?.['media-controls']?.texts?.[0] ?? 'AnimatedToggle works with any pair of icons — ideal for mute, mic, and play/pause controls.'}</DocText>
        <Showcase code={`<AnimatedToggle iconOn={<Volume2 />} iconOff={<VolumeX />} />
<AnimatedToggle iconOn={<Mic />} iconOff={<MicOff />} />
<AnimatedToggle iconOn={<Pause />} iconOff={<Play />} />`}>
          <AnimatedToggle checked={checked2} onChange={setChecked2} iconOn={<Volume2 />} iconOff={<VolumeX />} />
          <AnimatedToggle checked={checked3} onChange={setChecked3} iconOn={<Mic />} iconOff={<MicOff />} />
          <AnimatedToggle checked={checked4} onChange={setChecked4} iconOn={<Pause />} iconOff={<Play />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['visibility-and-security']?.title ?? 'Visibility & Security'}>
        <DocText>{pt?.sections?.['visibility-and-security']?.texts?.[0] ?? 'Use complementary icon pairs to represent binary visibility or security states.'}</DocText>
        <Showcase code={`<AnimatedToggle iconOn={<Eye />} iconOff={<EyeOff />} />
<AnimatedToggle iconOn={<Unlock />} iconOff={<Lock />} />
<AnimatedToggle iconOn={<Wifi />} iconOff={<WifiOff />} />`}>
          <AnimatedToggle checked={checked5} onChange={setChecked5} iconOn={<Eye />} iconOff={<EyeOff />} />
          <AnimatedToggle checked={checked6} onChange={setChecked6} iconOn={<Unlock />} iconOff={<Lock />} />
          <AnimatedToggle checked={checked7} onChange={setChecked7} iconOn={<Wifi />} iconOff={<WifiOff />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['social-and-actions']?.title ?? 'Social & Actions'}>
        <DocText>{pt?.sections?.['social-and-actions']?.texts?.[0] ?? 'Social reaction states animate between the active and inactive icon with a spring rotation transition.'}</DocText>
        <Showcase code={`<AnimatedToggle iconOn={<Heart />} iconOff={<HeartOff />} />
<AnimatedToggle iconOn={<Bookmark />} iconOff={<BookmarkX />} />
<AnimatedToggle iconOn={<Star />} iconOff={<StarOff />} />
<AnimatedToggle iconOn={<ThumbsUp />} iconOff={<ThumbsDown />} />`}>
          <AnimatedToggle checked={checked8} onChange={setChecked8} iconOn={<Heart />} iconOff={<HeartOff />} />
          <AnimatedToggle checked={checked9} onChange={setChecked9} iconOn={<Bookmark />} iconOff={<BookmarkX />} />
          <AnimatedToggle checked={checked10} onChange={setChecked10} iconOn={<Star />} iconOff={<StarOff />} />
          <AnimatedToggle checked={checked11} onChange={setChecked11} iconOn={<ThumbsUp />} iconOff={<ThumbsDown />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['notifications-and-pinning']?.title ?? 'Notifications & Pinning'}>
        <DocText>{pt?.sections?.['notifications-and-pinning']?.texts?.[0] ?? 'Bell and pin pairs are common toolbar toggles for notification and pin-to-top features.'}</DocText>
        <Showcase code={`<AnimatedToggle iconOn={<Bell />} iconOff={<BellOff />} />
<AnimatedToggle iconOn={<Pin />} iconOff={<PinOff />} />`}>
          <AnimatedToggle checked={checked12} onChange={setChecked12} iconOn={<Bell />} iconOff={<BellOff />} />
          <AnimatedToggle checked={checked13} onChange={setChecked13} iconOn={<Pin />} iconOff={<PinOff />} />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['custom-size']?.title ?? 'Custom Size'}>
        <DocText>{pt?.sections?.['custom-size']?.texts?.[0] ?? 'Override the button dimensions and icon size via className to scale the toggle to any size needed.'}</DocText>
        <Showcase code={`<AnimatedToggle
  iconOn={<Heart />}
  iconOff={<HeartOff />}
  className="w-12 h-12 [&_svg]:w-6 [&_svg]:h-6"
/>`}>
          <AnimatedToggle checked={checked14} onChange={setChecked14} iconOn={<Heart />} iconOff={<HeartOff />} className="w-12 h-12 [&_svg]:!w-6 [&_svg]:!h-6" />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <PropsTable data={[
          { name: 'checked', type: 'boolean', default: 'false', description: pt?.props?.['checked'] ?? 'The controlled checked state.' },
          { name: 'onChange', type: '(checked: boolean) => void', default: '-', description: pt?.props?.['onChange'] ?? 'Callback fired when the toggle is clicked, receives the new boolean value.' },
          { name: 'iconOn', type: 'React.ReactNode', default: '-', description: pt?.props?.['iconOn'] ?? 'Icon rendered when checked is true.' },
          { name: 'iconOff', type: 'React.ReactNode', default: '-', description: pt?.props?.['iconOff'] ?? 'Icon rendered when checked is false.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: pt?.props?.['disabled'] ?? 'Disables the button, blocking all interactions.' },
          { name: 'className', type: 'string', default: '-', description: pt?.props?.['className'] ?? 'Additional CSS class names for sizing or styling overrides.' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
