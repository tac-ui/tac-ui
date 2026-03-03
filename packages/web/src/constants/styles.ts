
/** Standard focus ring: theme-aware dual-tone glow shadow via CSS variable. */
export const focusRing =
  'focus-visible:outline-none focus-visible:shadow-[var(--focus-glow)]';

/** Peer focus ring for hidden-input patterns (Checkbox / Radio). */
export const peerFocusRing =
  'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--point)] peer-focus-visible:ring-offset-0';

/** Focus ring using the point color (Card / MorphingCard). */
export const focusRingPoint =
  'outline-none focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-offset-0';

/** Compact focus ring without ring-offset (Pagination / Toast / Snackbar / CodeBlock). */
export const focusRingCompact =
  'focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none';
