'use client';

import React from 'react';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';
import { usePageTranslation } from '@/i18n';

export default function NativeLayoutBottomSheetPage() {
  const pt = usePageTranslation('native-layout-bottom-sheet');
  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Bottom Sheet Layout'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A draggable bottom sheet pattern commonly used in mobile apps for contextual content. The sheet slides up from the bottom with snap points and gesture-based interaction.'}
        </DocDescription>
      </div>

      <DocSection title={pt?.sections?.['basic-bottom-sheet']?.title ?? 'Basic Bottom Sheet'}>
        <DocText>
          {pt?.sections?.['basic-bottom-sheet']?.texts?.[0] ??
            'A bottom sheet overlay with a drag handle that can be pulled up to reveal content. Uses PanResponder and Animated for smooth gesture handling.'}
        </DocText>
        <PreviewCode
          code={`import { useRef, useState } from 'react';
import {
  View, Text, Animated, PanResponder, Dimensions,
  StyleSheet, Pressable, ScrollView,
} from 'react-native';
import { useTacNativeTheme, Button, Card, CardTitle, VStack } from '@tac-ui/native';
import { nativeShadows } from '@tac-ui/tokens/native';

const { height: SCREEN_H } = Dimensions.get('window');
const SNAP_TOP = SCREEN_H * 0.15;
const SNAP_MID = SCREEN_H * 0.5;
const SNAP_BOTTOM = SCREEN_H * 0.85;

export default function BottomSheetScreen() {
  const { theme } = useTacNativeTheme();
  const translateY = useRef(new Animated.Value(SNAP_BOTTOM)).current;
  const lastSnap = useRef(SNAP_BOTTOM);
  const shadow = nativeShadows[theme.mode].lg;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 10,
      onPanResponderMove: (_, g) => {
        const newY = lastSnap.current + g.dy;
        const clamped = Math.max(SNAP_TOP, Math.min(SNAP_BOTTOM, newY));
        translateY.setValue(clamped);
      },
      onPanResponderRelease: (_, g) => {
        const currentY = lastSnap.current + g.dy;
        // Find nearest snap point
        const snaps = [SNAP_TOP, SNAP_MID, SNAP_BOTTOM];
        const nearest = snaps.reduce((prev, snap) =>
          Math.abs(snap - currentY) < Math.abs(prev - currentY) ? snap : prev
        );
        lastSnap.current = nearest;
        Animated.spring(translateY, {
          toValue: nearest,
          useNativeDriver: true,
          stiffness: 300,
          damping: 30,
        }).start();
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Map or main content behind the sheet */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.mutedForeground }}>
          Main content (map, feed, etc.)
        </Text>
      </View>

      {/* Bottom Sheet */}
      <Animated.View
        style={[{
          position: 'absolute',
          left: 0, right: 0,
          height: SCREEN_H,
          backgroundColor: theme.colors.surface,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          transform: [{ translateY }],
          ...shadow,
        }]}
        {...panResponder.panHandlers}
      >
        {/* Drag Handle */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 12,
        }}>
          <View style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.colors.border,
          }} />
        </View>

        {/* Sheet Content */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <VStack gap="md">
            <Card><CardTitle>Nearby Places</CardTitle></Card>
            <Card><CardTitle>Recent Activity</CardTitle></Card>
            <Card><CardTitle>Favorites</CardTitle></Card>
          </VStack>
        </ScrollView>
      </Animated.View>
    </View>
  );
}`}
        />
      </DocSection>

      <DocSection title={pt?.sections?.['persistent-bottom-sheet']?.title ?? 'Persistent Bottom Sheet'}>
        <DocText>
          {pt?.sections?.['persistent-bottom-sheet']?.texts?.[0] ??
            'A bottom sheet that stays visible and snaps between a peeking state and expanded state — common for music players or ride-sharing apps.'}
        </DocText>
        <PreviewCode
          code={`const PEEK_HEIGHT = 80;
const EXPANDED_HEIGHT = SCREEN_H * 0.6;

function PersistentSheet() {
  const { theme } = useTacNativeTheme();
  const translateY = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    const toValue = expanded ? 0 : -(EXPANDED_HEIGHT - PEEK_HEIGHT);
    setExpanded(!expanded);
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      stiffness: 260,
      damping: 30,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main content */}
      <ScrollView style={{ flex: 1 }}>
        {/* ... */}
      </ScrollView>

      {/* Persistent Sheet */}
      <Animated.View style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: EXPANDED_HEIGHT,
        transform: [{ translateY: Animated.add(
          translateY,
          EXPANDED_HEIGHT - PEEK_HEIGHT
        ) }],
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
        <Pressable onPress={toggle}>
          <View style={{
            height: PEEK_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
            <View style={{
              width: 48, height: 48,
              borderRadius: 8,
              backgroundColor: theme.colors.secondary,
            }} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontWeight: '600', color: theme.colors.foreground }}>
                Now Playing
              </Text>
              <Text style={{ fontSize: 13, color: theme.colors.mutedForeground }}>
                Artist - Song Title
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Expanded content */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Full player UI */}
        </ScrollView>
      </Animated.View>
    </View>
  );
}`}
        />
      </DocSection>
    </DocPage>
  );
}
