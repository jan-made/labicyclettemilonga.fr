'use client';

import { useState, useEffect } from 'react';

export const useHash = (): [string | undefined, (value: string) => void] => {
  const [hash, setHash] = useState<string>();

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);

    onHashChange();

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [setHash]);

  return [hash, setHash];
};
