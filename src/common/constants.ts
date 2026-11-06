import { useSyncExternalStore } from 'react';

// BUILD_TIME is inlined by next.config.ts, so the server and the browser
// bundles share the same build year.
export const currentYear = new Date(
  process.env.BUILD_TIME ?? Date.now()
).getFullYear();
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
