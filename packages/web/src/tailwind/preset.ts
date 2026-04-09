import { generateCSSBlock, generateKeyframes } from '@tac-ui/tokens/web';
import { breakpoints, containers } from '@tac-ui/tokens';

export function generateThemeCSS(): string {
  return `@layer base {
  :root, [data-theme="light"] {
${generateCSSBlock('light')}
  }

  [data-theme="dark"] {
${generateCSSBlock('dark')}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
${generateCSSBlock('dark')}
    }
  }
}

@layer base {
  * {
    border-color: var(--border);
    -webkit-tap-highlight-color: transparent;
  }
  button, a, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [role="option"] {
    touch-action: manipulation;
  }
  *:not([data-no-bg-transition]) {
    transition-property: background-color, color, border-color, box-shadow;
    transition-duration: var(--duration-normal);
    transition-timing-function: var(--ease-standard);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-primary), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
}

@keyframes indicator-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}

@keyframes snackbar-in {
  from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes snackbar-out {
  from { opacity: 1; transform: translateY(0); filter: blur(0); }
  to { opacity: 0; transform: translateY(10px); filter: blur(2px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dialog-in {
  from { opacity: 0; transform: scale(0.95); filter: blur(4px); }
  to { opacity: 1; transform: scale(1); filter: blur(0px); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95) translateY(4px); filter: blur(2px); }
  to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
}

@keyframes toast-in {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0px); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateY(0); filter: blur(0); }
  to { opacity: 0; transform: translateY(8px); filter: blur(2px); }
}

@keyframes drawer-left-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes drawer-right-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes drawer-top-in {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes drawer-bottom-in {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes btn-shine {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

${generateKeyframes()}`;
}

export const tacPreset = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-subtle': 'var(--background-subtle)',
        foreground: 'var(--foreground)',
        surface: { DEFAULT: 'var(--surface)', hover: 'var(--surface-hover)' },
        primary: { DEFAULT: 'var(--primary)', hover: 'var(--primary-hover)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        point: {
          DEFAULT: 'var(--point)',
          hover: 'var(--point-hover)',
          foreground: 'var(--point-foreground)',
          subtle: 'var(--point-subtle)',
        },
        success: { DEFAULT: 'var(--success)', bg: 'var(--success-bg)', foreground: 'var(--success-foreground)' },
        warning: { DEFAULT: 'var(--warning)', bg: 'var(--warning-bg)', foreground: 'var(--warning-foreground)' },
        error: { DEFAULT: 'var(--error)', bg: 'var(--error-bg)', foreground: 'var(--error-foreground)' },
        info: { DEFAULT: 'var(--info)', bg: 'var(--info-bg)', foreground: 'var(--info-foreground)' },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
          6: 'var(--chart-6)',
          7: 'var(--chart-7)',
          8: 'var(--chart-8)',
        },
        'surface-base': 'var(--surface-base)',
        'surface-elevated-low': 'var(--surface-elevated-low)',
        'surface-elevated-mid': 'var(--surface-elevated-mid)',
        'surface-elevated-high': 'var(--surface-elevated-high)',
        'interactive-hover': 'var(--interactive-hover)',
        'interactive-pressed': 'var(--interactive-pressed)',
        'interactive-focus': 'var(--interactive-focus)',
        // Button tokens
        'btn-primary': { surface: 'var(--btn-primary-surface)', hover: 'var(--btn-primary-hover)' },
        'btn-secondary': { surface: 'var(--btn-secondary-surface)', hover: 'var(--btn-secondary-hover)' },
        'btn-outline': {
          border: 'var(--btn-outline-border)',
          'border-hover': 'var(--btn-outline-border-hover)',
          'hover-bg': 'var(--btn-outline-hover-bg)',
        },
        'btn-ghost-hover': 'var(--btn-ghost-hover)',
        'btn-point': {
          surface: 'var(--btn-point-surface)',
          border: 'var(--btn-point-border)',
          'hover-surface': 'var(--btn-point-hover-surface)',
          'hover-border': 'var(--btn-point-hover-border)',
        },
        'btn-destructive': { surface: 'var(--btn-destructive-surface)', hover: 'var(--btn-destructive-hover)' },
        // Interactive tokens
        'interactive-surface-tint': 'var(--interactive-surface-tint)',
        'interactive-hover-tint': 'var(--interactive-hover-tint)',
        // Input tokens
        'input-bg': 'var(--input-bg)',
        'input-border-rest': 'var(--input-border-rest)',
        'input-border-hover': 'var(--input-border-hover)',
        // Dropdown tokens
        'dropdown-bg': 'var(--dropdown-bg)',
        'dropdown-item-hover': 'var(--dropdown-item-hover)',
        // Card accent tokens
        'card-accent': { border: 'var(--card-accent-border)', 'hover-border': 'var(--card-accent-hover-border)' },
      },
      spacing: {
        '2xs': 'var(--spacing-2xs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        m: 'var(--spacing-m)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        m: 'var(--radius-m)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        m: 'var(--shadow-m)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--accent-glow)',
        glass: 'var(--shadow-glass)',
        'glass-lg': 'var(--shadow-glass-lg)',
        'gradient-glow': 'var(--gradient-glow-shadow)',
        'focus-glow': 'var(--focus-glow)',
        'point-glow': 'var(--point-glow)',
        'btn-primary-energy': 'var(--btn-primary-energy)',
        'btn-primary-inset': 'var(--btn-primary-inset)',
        'btn-point-energy': 'var(--btn-point-energy)',
        'glass-inset': 'var(--glass-inset)',
        'glass-panel': 'var(--glass-panel-shadow)',
        'input-focus-glow': 'var(--input-focus-glow)',
        'dropdown-shadow': 'var(--dropdown-shadow)',
        'card-accent-glow': 'var(--card-accent-glow)',
        'card-accent-hover-glow': 'var(--card-accent-hover-glow)',
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-brand-hover': 'var(--gradient-brand-hover)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-accent-vivid': 'var(--gradient-accent-vivid)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-mesh': 'var(--gradient-mesh)',
        'gradient-surface': 'var(--gradient-surface)',
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-primary)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        complex: 'var(--duration-complex)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
        spring: 'var(--ease-spring)',
        elastic: 'var(--ease-elastic)',
      },
      screens: {
        sm: `${breakpoints.sm}px`,
        md: `${breakpoints.md}px`,
        lg: `${breakpoints.lg}px`,
        xl: `${breakpoints.xl}px`,
        '2xl': `${breakpoints['2xl']}px`,
      },
      containers: {
        sm: `${containers.sm}px`,
        md: `${containers.md}px`,
        lg: `${containers.lg}px`,
        xl: `${containers.xl}px`,
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
      },
      keyframes: {
        'indicator-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
        'snackbar-in': {
          from: { opacity: '0', transform: 'translateY(16px)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'snackbar-out': {
          from: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
          to: { opacity: '0', transform: 'translateY(10px)', filter: 'blur(2px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dialog-in': {
          from: { opacity: '0', transform: 'scale(0.95)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'scale(1)', filter: 'blur(0px)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95) translateY(4px)', filter: 'blur(2px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)', filter: 'blur(0px)' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(12px)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        'toast-out': {
          from: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
          to: { opacity: '0', transform: 'translateY(8px)', filter: 'blur(2px)' },
        },
        'drawer-left-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'drawer-right-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'drawer-top-in': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'drawer-bottom-in': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        // Dia-inspired organic spring — blur entrance animations
        'blur-fade-in': {
          from: { opacity: '0', filter: 'blur(8px)', transform: 'translateY(8px)' },
          to: { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
        },
        'blur-scale-in': {
          from: { opacity: '0', filter: 'blur(6px)', transform: 'scale(0.95)' },
          to: { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' },
        },
        // Elastic micro-interactions — spring overshoot with physical mass
        'elastic-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(0.96)' },
        },
        'elastic-release': {
          '0%': { transform: 'scale(0.96)' },
          '50%': { transform: 'scale(1.01)' },
          '100%': { transform: 'scale(1)' },
        },
        // Spotlight pulse
        'spotlight-pulse': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        // Float animation
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        // Motion token presets
        'fade-in-preset': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'press-down': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.97)' },
        },
        'lift-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-2px)' },
        },
        'gradient-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'shimmer-flow': {
          '0%': { transform: 'translateX(-100%) scale(2) rotate(20deg)' },
          '100%': { transform: 'translateX(200%) scale(2) rotate(20deg)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'spring-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'spring-hover': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'btn-shine': {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      },
      animation: {
        'indicator-slide': 'indicator-slide 1.5s linear infinite',
        // Dia-inspired organic spring — snackbar enters with blur and momentum + overshoot
        'snackbar-in': 'snackbar-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'snackbar-out': 'snackbar-out 0.2s cubic-bezier(0.55, 0, 1, 0.45) forwards',
        // Fade is simple — spring easing still adds organic deceleration
        'fade-in': 'fade-in 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        // Dialog inflates from behind with blur — Dia overlay feel
        'dialog-in': 'dialog-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        // Popovers spring up with scale + slight overshoot
        'scale-in': 'scale-in 0.22s cubic-bezier(0.22, 1.1, 0.36, 1)',
        // Toast rises from below with blur + overshoot spring
        'toast-in': 'toast-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'toast-out': 'toast-out 0.2s cubic-bezier(0.55, 0, 1, 0.45) forwards',
        // Drawers slide with spring overshoot for physical momentum
        'drawer-left-in': 'drawer-left-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'drawer-right-in': 'drawer-right-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'drawer-top-in': 'drawer-top-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'drawer-bottom-in': 'drawer-bottom-in 0.35s cubic-bezier(0.22, 1.1, 0.36, 1)',
        'slide-in-up': 'slide-in-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-in-down': 'slide-in-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-in-left': 'slide-in-left 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-in-right': 'slide-in-right 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-out': 'fade-out 0.15s cubic-bezier(0.55, 0, 1, 0.45)',
        'zoom-in': 'zoom-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'press-down': 'press-down 0.08s cubic-bezier(0.22, 1, 0.36, 1)',
        'lift-up': 'lift-up 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
        shimmer: 'shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer-flow': 'shimmer-flow 3s linear infinite',
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        'gradient-shimmer': 'gradient-shimmer 3s ease-in-out infinite',
        // Dia-style page-level entrances — blur resolves as element springs into place
        'blur-fade-in': 'blur-fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'blur-scale-in': 'blur-scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        // Spring press/release — elastic overshoot gives physical life to interactions
        'elastic-press': 'elastic-press 0.2s cubic-bezier(0.22, 1.2, 0.36, 1) forwards',
        'elastic-release': 'elastic-release 0.35s cubic-bezier(0.22, 1.2, 0.36, 1) forwards',
        'spotlight-pulse': 'spotlight-pulse 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spring-press': 'spring-press 0.3s cubic-bezier(0.22, 1.2, 0.36, 1) forwards',
        'spring-hover': 'spring-hover 0.15s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'btn-shine': 'btn-shine 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
};
