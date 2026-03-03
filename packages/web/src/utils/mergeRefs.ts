import type React from 'react';

/** Merges multiple React refs into a single ref callback. */
export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined | null>): React.RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
