/** Standard focus glow: theme-aware shadow via CSS variable. */
export const focusRing = 'focus-visible:outline-none focus-visible:shadow-[var(--focus-glow)]';

/** Peer focus glow for hidden-input patterns (Checkbox / Radio). */
export const peerFocusRing = 'peer-focus-visible:outline-none peer-focus-visible:shadow-[var(--point-glow)]';

/** Focus glow using the point/accent color (Card / MorphingCard). */
export const focusRingPoint = 'outline-none focus-visible:shadow-[var(--point-glow)]';

/** Shared inline transition for input-type elements (border, shadow, color, bg). */
export const inputTransition =
  'border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)';
