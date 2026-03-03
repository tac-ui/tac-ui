/** HTML event handlers that conflict with Framer Motion's prop types. */
export type MotionConflictingHandlers =
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragOver'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onAnimationStart'
  | 'onAnimationEnd';
