/**
 * CSS unit conversion utilities for token → CSS variable generation.
 */

/** Converts a pixel number to a rem string (base 16px). */
export function rem(v: number): string { return `${v / 16}rem`; }

/** Converts a number to a px string. */
export function px(v: number): string { return `${v}px`; }

/** Converts a number to a milliseconds string. */
export function ms(v: number): string { return `${v}ms`; }

/** Returns the number as a unitless CSS string. */
export function unitless(v: number): string { return `${v}`; }
