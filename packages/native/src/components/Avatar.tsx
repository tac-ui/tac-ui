import React, { forwardRef, useState } from 'react';
import { View, Text, Image, type ViewProps, type ImageSourcePropType } from 'react-native';
import { useTacNativeTheme } from '../provider/TacNativeProvider';
import { componentTokens } from '@tac-ui/tokens/native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ViewProps {
  size?: AvatarSize;
  src?: ImageSourcePropType | string;
  alt?: string;
  /** Text initials shown when no image is available. */
  initials?: string;
  /** @deprecated Use `initials` instead. */
  fallback?: string;
  /** Icon node shown when no image or fallback initials are available. */
  icon?: React.ReactNode;
  /** Status indicator shown as a dot in the bottom-right corner. */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Custom background color for the status dot. Overrides default status color mapping. */
  statusColor?: string;
  /** Custom content rendered inside the status dot. */
  statusContent?: React.ReactNode;
}

export const Avatar = forwardRef<View, AvatarProps>(
  (
    {
      size = 'md',
      src,
      alt,
      initials: initialsProp,
      fallback,
      icon,
      status,
      statusColor,
      statusContent,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTacNativeTheme();
    const [hasError, setHasError] = useState(false);
    const tokens = componentTokens.avatar[size];

    const imageSource = typeof src === 'string' ? { uri: src } : src;
    const showImage = src && !hasError;
    const initials = initialsProp || fallback || (alt ? alt.charAt(0).toUpperCase() : undefined);

    const defaultStatusColors: Record<string, string> = {
      online: theme.colors.success,
      offline: theme.colors.gray500,
      busy: theme.colors.error,
      away: theme.colors.warning,
    };

    const resolvedStatusColor = statusColor ?? (status ? defaultStatusColors[status] : undefined);
    const hasStatus = !!(status || statusColor || statusContent);

    return (
      <View
        ref={ref}
        style={[
          {
            position: 'relative',
            width: tokens.size,
            height: tokens.size,
          },
          style,
        ]}
        {...props}
      >
        <View
          style={{
            width: tokens.size,
            height: tokens.size,
            borderRadius: tokens.size / 2,
            overflow: 'hidden',
            backgroundColor: theme.colors.interactiveSurfaceTint,
            alignItems: 'center',
            justifyContent: 'center',
            ...(!showImage ? { borderWidth: 1, borderColor: theme.colors.cardAccentBorder } : {}),
          }}
        >
          {showImage ? (
            <Image
              source={imageSource!}
              style={{ width: tokens.size, height: tokens.size, borderRadius: tokens.size / 2 }}
              onError={() => setHasError(true)}
              accessibilityLabel={alt}
            />
          ) : initials ? (
            <Text style={{ fontSize: tokens.fontSize, fontWeight: '600', color: theme.colors.point }}>{initials}</Text>
          ) : icon ? (
            icon
          ) : (
            <Text style={{ fontSize: tokens.fontSize, fontWeight: '600', color: theme.colors.point }}>?</Text>
          )}
        </View>
        {hasStatus && (
          <View
            style={{
              position: 'absolute',
              bottom: tokens.size * 0.14 - componentTokens.avatar.statusDot / 2,
              right: tokens.size * 0.14 - componentTokens.avatar.statusDot / 2,
              width: componentTokens.avatar.statusDot,
              height: componentTokens.avatar.statusDot,
              borderRadius: componentTokens.avatar.statusDot / 2,
              backgroundColor: resolvedStatusColor,
              borderWidth: componentTokens.avatar.statusBorder,
              borderColor: theme.colors.background,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {statusContent ?? null}
          </View>
        )}
      </View>
    );
  },
);
Avatar.displayName = 'Avatar';
