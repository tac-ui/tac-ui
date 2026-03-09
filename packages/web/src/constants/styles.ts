/** Standard focus glow: theme-aware shadow via CSS variable. */
export const focusRing = 'focus-visible:outline-none focus-visible:shadow-[var(--focus-glow)]';

/** Peer focus glow for hidden-input patterns (Checkbox / Radio). */
export const peerFocusRing = 'peer-focus-visible:outline-none peer-focus-visible:shadow-[var(--point-glow)]';

/** Focus glow using the point/accent color (Card / MorphingCard). */
export const focusRingPoint = 'outline-none focus-visible:shadow-[var(--point-glow)]';

import { EASING, DURATION } from './motion';

/** Shared inline transition for input-type elements (border, shadow, color, bg). */
export const inputTransition = `border-color ${DURATION.normal} ${EASING}, box-shadow ${DURATION.normal} ${EASING}, color ${DURATION.normal} ${EASING}, background-color ${DURATION.normal} ${EASING}`;
