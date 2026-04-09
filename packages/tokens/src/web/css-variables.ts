/**
 * CSS Custom Properties generator - TacUIGuide.md Section 1.1
 */
import { semanticTokens } from '../semantic';
import { chart } from '../chart';
import { spacing, radius } from '../spacing';
import { elevation, zIndex } from '../elevation';
import { motion } from '../motion';
import { typography } from '../typography';
import { component } from '../component';
import { px, rem, ms, unitless } from './unit-utils';
import type { ThemeMode } from '@tac-ui/shared';

export function generateCSSVariables(mode: ThemeMode): Record<string, string> {
  const colors = semanticTokens[mode];
  const chartTokens = chart[mode];
  const elevationMode = elevation[mode];

  return {
    // Font
    '--font-primary': `'${typography.fontFamily.primary}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
    '--font-secondary': `'${typography.fontFamily.secondary}', sans-serif`,
    '--font-display': `'${typography.fontFamily.display}', '${typography.fontFamily.primary}', sans-serif`,
    '--font-mono': `'${typography.fontFamily.mono}', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`,
    // Colors
    '--background': colors.background,
    '--background-subtle': colors.backgroundSubtle,
    '--foreground': colors.foreground,
    '--surface': colors.surface,
    '--surface-hover': colors.surfaceHover,
    '--primary': colors.primary,
    '--primary-hover': colors.primaryHover,
    '--primary-foreground': colors.primaryForeground,
    '--secondary': colors.secondary,
    '--secondary-foreground': colors.secondaryForeground,
    '--muted': colors.muted,
    '--muted-foreground': colors.mutedForeground,
    '--card': colors.card,
    '--card-foreground': colors.cardForeground,
    '--border': colors.border,
    '--input': colors.input,
    '--ring': colors.ring,
    '--point': colors.point,
    '--point-hover': colors.pointHover,
    '--point-foreground': colors.pointForeground,
    '--point-subtle': colors.pointSubtle,
    '--accent-glow': colors.accentGlow,
    // Glass
    '--glass-bg': colors.glassBg,
    '--glass-border': colors.glassBorder,
    // Gradients
    '--gradient-brand': colors.gradientBrand,
    '--gradient-brand-hover': colors.gradientBrandHover,
    '--gradient-subtle': colors.gradientSubtle,
    '--gradient-accent': colors.gradientAccent,
    '--gradient-accent-vivid': colors.gradientAccentVivid,
    '--gradient-glow': colors.gradientGlow,
    '--gradient-mesh': colors.gradientMesh,
    '--gradient-surface': colors.gradientSurface,
    '--gradient-glow-shadow': colors.gradientGlowShadow,
    // Status
    '--success': colors.success,
    '--success-bg': colors.successBg,
    '--success-foreground': colors.successForeground,
    '--warning': colors.warning,
    '--warning-bg': colors.warningBg,
    '--warning-foreground': colors.warningForeground,
    '--error': colors.error,
    '--error-bg': colors.errorBg,
    '--error-foreground': colors.errorForeground,
    '--info': colors.info,
    '--info-bg': colors.infoBg,
    '--info-foreground': colors.infoForeground,
    '--shadow-color': colors.shadowColor,
    // Gray scale
    '--gray-50': colors.gray50,
    '--gray-100': colors.gray100,
    '--gray-200': colors.gray200,
    '--gray-300': colors.gray300,
    '--gray-400': colors.gray400,
    '--gray-500': colors.gray500,
    '--gray-600': colors.gray600,
    '--gray-700': colors.gray700,
    '--gray-800': colors.gray800,
    '--gray-900': colors.gray900,
    // Surface layers
    '--surface-base': colors.surfaceBase,
    '--surface-elevated-low': colors.surfaceElevatedLow,
    '--surface-elevated-mid': colors.surfaceElevatedMid,
    '--surface-elevated-high': colors.surfaceElevatedHigh,
    // Interaction states
    '--interactive-hover': colors.interactiveHover,
    '--interactive-pressed': colors.interactivePressed,
    '--interactive-focus': colors.interactiveFocus,
    // Button tokens
    '--btn-primary-surface': colors.btnPrimarySurface,
    '--btn-primary-hover': colors.btnPrimaryHover,
    '--btn-primary-energy': colors.btnPrimaryEnergy,
    '--btn-primary-inset': colors.btnPrimaryInset,
    '--btn-secondary-surface': colors.btnSecondarySurface,
    '--btn-secondary-hover': colors.btnSecondaryHover,
    '--btn-outline-border': colors.btnOutlineBorder,
    '--btn-outline-border-hover': colors.btnOutlineBorderHover,
    '--btn-outline-hover-bg': colors.btnOutlineHoverBg,
    '--btn-ghost-hover': colors.btnGhostHover,
    '--btn-point-surface': colors.btnPointSurface,
    '--btn-point-border': colors.btnPointBorder,
    '--btn-point-hover-surface': colors.btnPointHoverSurface,
    '--btn-point-hover-border': colors.btnPointHoverBorder,
    '--btn-point-energy': colors.btnPointEnergy,
    '--btn-destructive-surface': colors.btnDestructiveSurface,
    '--btn-destructive-hover': colors.btnDestructiveHover,
    // Shared interactive tokens
    '--interactive-surface-tint': colors.interactiveSurfaceTint,
    '--interactive-hover-tint': colors.interactiveHoverTint,
    '--focus-glow': colors.focusGlow,
    '--point-glow': colors.pointGlow,
    '--glass-inset': colors.glassInset,
    '--glass-panel-shadow': colors.glassPanelShadow,
    // Input tokens
    '--input-bg': colors.inputBg,
    '--input-border-rest': colors.inputBorderRest,
    '--input-border-hover': colors.inputBorderHover,
    '--input-hover-glow': colors.inputHoverGlow,
    '--input-focus-glow': colors.inputFocusGlow,
    '--input-error-glow': colors.inputErrorGlow,
    // Dropdown tokens
    '--dropdown-bg': colors.dropdownBg,
    '--dropdown-shadow': colors.dropdownShadow,
    '--dropdown-item-hover': colors.dropdownItemHover,
    // Card accent tokens
    '--card-accent-border': colors.cardAccentBorder,
    '--card-accent-glow': colors.cardAccentGlow,
    '--card-accent-hover-border': colors.cardAccentHoverBorder,
    '--card-accent-hover-glow': colors.cardAccentHoverGlow,
    // Spacing
    '--spacing-2xs': rem(spacing['2xs']),
    '--spacing-xs': rem(spacing.xs),
    '--spacing-sm': rem(spacing.sm),
    '--spacing-m': rem(spacing.m),
    '--spacing-lg': rem(spacing.lg),
    '--spacing-xl': rem(spacing.xl),
    '--spacing-2xl': rem(spacing['2xl']),
    '--spacing-3xl': rem(spacing['3xl']),
    // Radius
    '--radius-none': unitless(radius.none),
    '--radius-xs': rem(radius.xs),
    '--radius-sm': rem(radius.sm),
    '--radius-m': rem(radius.m),
    '--radius-lg': rem(radius.lg),
    '--radius-xl': rem(radius.xl),
    '--radius-2xl': rem(radius['2xl']),
    '--radius-pill': px(radius.pill),
    // Elevation
    '--shadow-sm': elevationMode.sm,
    '--shadow-m': elevationMode.m,
    '--shadow-lg': elevationMode.lg,
    '--shadow-xl': elevationMode.xl,
    '--shadow-glass': elevationMode.glass,
    '--shadow-glass-lg': elevationMode.glassLg,
    // Motion
    '--duration-instant': ms(motion.duration.instant),
    '--duration-fast': ms(motion.duration.fast),
    '--duration-normal': ms(motion.duration.normal),
    '--duration-slow': ms(motion.duration.slow),
    '--duration-complex': ms(motion.duration.complex),
    '--ease-standard': motion.easing.standard,
    '--ease-in': motion.easing.easeIn,
    '--ease-out': motion.easing.easeOut,
    '--ease-in-out': motion.easing.easeInOut,
    '--ease-bounce': motion.easing.bounce,
    '--ease-spring': motion.easing.spring,
    '--ease-elastic': motion.easing.elastic,
    // Chart
    '--chart-1': chartTokens.colors[0],
    '--chart-2': chartTokens.colors[1],
    '--chart-3': chartTokens.colors[2],
    '--chart-4': chartTokens.colors[3],
    '--chart-5': chartTokens.colors[4],
    '--chart-6': chartTokens.colors[5],
    '--chart-7': chartTokens.colors[6],
    '--chart-8': chartTokens.colors[7],
    '--chart-grid': chartTokens.grid,
    '--chart-axis': chartTokens.axis,
    '--chart-label': chartTokens.label,
    '--chart-tooltip-bg': chartTokens.tooltipBg,
    '--chart-line-width': px(chart.lineWidth),
    '--chart-dot-size': px(chart.dotSize),
    '--chart-bar-radius': px(chart.barRadius),
    '--chart-area-opacity': unitless(chart.areaOpacity),
    // Tooltip
    '--tooltip-delay': ms(motion.duration.fast),
    '--tooltip-padding': rem(16),
    '--tooltip-radius': rem(12),
    // Z-Index
    '--z-dropdown': unitless(zIndex.dropdown),
    '--z-sticky': unitless(zIndex.sticky),
    '--z-overlay': unitless(zIndex.overlay),
    '--z-modal': unitless(zIndex.modal),
    '--z-popover': unitless(zIndex.popover),
    '--z-tooltip': unitless(zIndex.tooltip),
    '--z-toast': unitless(zIndex.toast),
    // Component: Button
    '--btn-sm-height': rem(component.button.sm.height),
    '--btn-sm-px': rem(component.button.sm.paddingX),
    '--btn-sm-font-size': rem(component.button.sm.fontSize),
    '--btn-sm-radius': px(component.button.sm.borderRadius),
    '--btn-md-height': rem(component.button.md.height),
    '--btn-md-px': rem(component.button.md.paddingX),
    '--btn-md-font-size': rem(component.button.md.fontSize),
    '--btn-md-radius': px(component.button.md.borderRadius),
    '--btn-lg-height': rem(component.button.lg.height),
    '--btn-lg-px': rem(component.button.lg.paddingX),
    '--btn-lg-font-size': rem(component.button.lg.fontSize),
    '--btn-lg-radius': px(component.button.lg.borderRadius),
    '--btn-icon-size': px(component.button.md.iconSize),
    // Component: Input
    '--input-sm-height': rem(component.input.sm.height),
    '--input-sm-px': rem(component.input.sm.paddingX),
    '--input-sm-font-size': rem(component.input.sm.fontSize),
    '--input-sm-radius': px(component.input.sm.borderRadius),
    '--input-sm-icon-size': px(component.input.sm.iconSize),
    '--input-sm-icon-padding': rem(component.input.sm.iconPadding),
    '--input-md-height': rem(component.input.md.height),
    '--input-md-px': rem(component.input.md.paddingX),
    '--input-md-font-size': rem(component.input.md.fontSize),
    '--input-md-radius': px(component.input.md.borderRadius),
    '--input-md-icon-size': px(component.input.md.iconSize),
    '--input-md-icon-padding': rem(component.input.md.iconPadding),
    '--input-lg-height': rem(component.input.lg.height),
    '--input-lg-px': rem(component.input.lg.paddingX),
    '--input-lg-font-size': rem(component.input.lg.fontSize),
    '--input-lg-radius': px(component.input.lg.borderRadius),
    '--input-lg-icon-size': px(component.input.lg.iconSize),
    '--input-lg-icon-padding': rem(component.input.lg.iconPadding),
    // Component: Input (md aliases for backward compat)
    '--input-height': rem(component.input.md.height),
    '--input-radius': px(component.input.md.borderRadius),
    '--input-font-size': rem(component.input.md.fontSize),
    // Component: Card
    '--card-padding': rem(component.card.padding),
    '--card-gap': rem(component.card.gap),
    '--card-radius': px(component.card.borderRadius),
    '--card-title-size': rem(component.card.titleSize),
    '--card-body-size': rem(component.card.bodySize),
    // Component: Badge
    '--badge-px': rem(component.badge.paddingX),
    '--badge-py': rem(component.badge.paddingY),
    '--badge-font-size': rem(component.badge.fontSize),
    '--badge-radius': px(component.badge.borderRadius),
    // Component: Checkbox
    '--checkbox-size': px(component.checkbox.size),
    '--checkbox-radius': px(component.checkbox.borderRadius),
    '--checkbox-border-width': px(component.checkbox.borderWidth),
    '--checkbox-icon-size': px(component.checkbox.iconSize),
    '--checkbox-gap': rem(component.checkbox.gap),
    '--checkbox-label-size': rem(component.checkbox.labelSize),
    // Component: Radio
    '--radio-size': px(component.radio.size),
    '--radio-border-width': px(component.radio.borderWidth),
    '--radio-checked-border-width': px(component.radio.checkedBorderWidth),
    '--radio-gap': rem(component.radio.gap),
    '--radio-label-size': rem(component.radio.labelSize),
    // Component: Switch
    '--switch-width': px(component.switch.width),
    '--switch-height': px(component.switch.height),
    '--switch-thumb-size': px(component.switch.thumbSize),
    '--switch-thumb-offset': px(component.switch.thumbOffset),
    '--switch-thumb-translate-on': px(component.switch.thumbTranslateOn),
    '--switch-thumb-translate-off': px(component.switch.thumbTranslateOff),
    // Component: Chip
    '--chip-px': rem(component.chip.paddingX),
    '--chip-py': rem(component.chip.paddingY),
    '--chip-font-size': rem(component.chip.fontSize),
    '--chip-radius': px(component.chip.borderRadius),
    '--chip-icon-size': px(component.chip.iconSize),
    // Component: Tabs
    '--tab-primary-px': rem(component.tabs.primary.paddingX),
    '--tab-primary-py': rem(component.tabs.primary.paddingY),
    '--tab-primary-font-size': rem(component.tabs.primary.fontSize),
    '--tab-primary-indicator': px(component.tabs.primary.indicatorHeight),
    '--tab-secondary-px': rem(component.tabs.secondary.paddingX),
    '--tab-secondary-py': rem(component.tabs.secondary.paddingY),
    '--tab-secondary-font-size': rem(component.tabs.secondary.fontSize),
    '--tab-secondary-container-padding': px(component.tabs.secondary.containerPadding),
    '--tab-secondary-container-radius': px(component.tabs.secondary.containerRadius),
    '--tab-secondary-item-radius': px(component.tabs.secondary.itemRadius),
    // Component: Slider
    '--slider-track-height': px(component.slider.trackHeight),
    '--slider-thumb-size': px(component.slider.thumbSize),
    '--slider-thumb-border': px(component.slider.thumbBorderWidth),
    // Component: Tooltip
    '--tooltip-simple-px': rem(component.tooltip.simple.paddingX),
    '--tooltip-simple-py': rem(component.tooltip.simple.paddingY),
    '--tooltip-simple-font-size': rem(component.tooltip.simple.fontSize),
    '--tooltip-simple-radius': px(component.tooltip.simple.borderRadius),
    '--tooltip-rich-px': rem(component.tooltip.rich.paddingX),
    '--tooltip-rich-py': rem(component.tooltip.rich.paddingY),
    '--tooltip-rich-max-width': px(component.tooltip.rich.maxWidth),
    '--tooltip-rich-radius': px(component.tooltip.rich.borderRadius),
    // Component: Avatar
    '--avatar-sm': px(component.avatar.sm.size),
    '--avatar-md': px(component.avatar.md.size),
    '--avatar-lg': px(component.avatar.lg.size),
    '--avatar-xl': px(component.avatar.xl.size),
    '--avatar-status-dot': px(component.avatar.statusDot),
    '--avatar-status-border': px(component.avatar.statusBorder),
    // Component: Divider
    '--divider-thickness': px(component.divider.thickness),
    '--divider-thick': px(component.divider.thickThickness),
    '--divider-inset-margin': px(component.divider.insetMargin),
    '--divider-label-size': rem(component.divider.labelSize),
    // Component: Progress
    '--progress-height': px(component.progress.linear.height),
    '--progress-radius': px(component.progress.linear.borderRadius),
    '--progress-circular-stroke': px(component.progress.circular.strokeWidth),
    '--progress-circular-text': rem(component.progress.circular.textSize),
    // Component: Snackbar
    '--snackbar-radius': px(component.snackbar.borderRadius),
    '--snackbar-gap': rem(component.snackbar.gap),
    '--snackbar-icon-size': px(component.snackbar.iconSize),
    '--snackbar-message-size': rem(component.snackbar.messageSize),
    '--snackbar-action-px': rem(component.snackbar.actionPaddingX),
    '--snackbar-action-py': rem(component.snackbar.actionPaddingY),
    '--snackbar-action-radius': px(component.snackbar.actionRadius),
    '--snackbar-action-size': rem(component.snackbar.actionSize),
    // Component: Dialog
    '--dialog-width': px(component.dialog.width),
    '--dialog-radius': px(component.dialog.borderRadius),
    '--dialog-header-px': rem(component.dialog.headerPaddingX),
    '--dialog-header-py': rem(component.dialog.headerPaddingY),
    '--dialog-footer-px': rem(component.dialog.footerPaddingX),
    '--dialog-footer-py': rem(component.dialog.footerPaddingY),
    '--dialog-title-size': rem(component.dialog.titleSize),
    '--dialog-desc-size': rem(component.dialog.descSize),
    '--dialog-footer-gap': rem(component.dialog.footerGap),
    // Component: AnimatedToggle
    '--toggle-size': px(component.animatedToggle.size),
    '--toggle-radius': px(component.animatedToggle.borderRadius),
    '--toggle-icon-size': px(component.animatedToggle.iconSize),
  };
}

export function generateCSSBlock(mode: ThemeMode): string {
  const vars = generateCSSVariables(mode);
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/** Generates CSS @keyframes blocks from the motion.keyframes presets. */
export function generateKeyframes(): string {
  const { keyframes } = motion;
  return Object.entries(keyframes)
    .map(([name, frames]) => {
      const kebab = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      const body = Object.entries(frames as Record<string, Record<string, string>>)
        .map(([key, props]) => {
          const cssProps = Object.entries(props)
            .map(([p, v]) => `    ${p.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v};`)
            .join('\n');
          return `  ${key} {\n${cssProps}\n  }`;
        })
        .join('\n');
      return `@keyframes ${kebab} {\n${body}\n}`;
    })
    .join('\n\n');
}
