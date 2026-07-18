import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first hydration render, then true on the client.
 * Hydration-safe replacement for the `useState(false)` + `useEffect(setTrue)` mounted pattern.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
