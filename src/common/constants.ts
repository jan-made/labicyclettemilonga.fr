import { useSyncExternalStore } from 'react';

export const currentYear = new Date().getFullYear();
export const unComputedHeaderHeight = 158;

const noopSubscribe = () => () => {};
const getBrowserYear = () => new Date().getFullYear();
const getBuildYear = () => currentYear;

/**
 * Renders the build-time year during SSR/hydration, then the browser year.
 */
export function useCurrentYear() {
  return useSyncExternalStore(noopSubscribe, getBrowserYear, getBuildYear);
}
