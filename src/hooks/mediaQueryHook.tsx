import { useEffect, useState } from 'react';

/**
 * Returns true if the media query matches the current window state.
 *
 * @example
 *
 * ```typescript
 *   const isMobile = useMedia('(max-width: 320px)');
 * ```
 *
 * @param query A media query string as in
 * https://developer.mozilla.org/pt-BR/docs/Web/Guide/CSS/CSS_Media_queries.
 */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // We need a handler to be able to remove the listener afterwards
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Listn to any media query status change
    mediaQuery.addEventListener('change', handler);
    // Once the component is destroyed, remove the listener
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return matches;
}
