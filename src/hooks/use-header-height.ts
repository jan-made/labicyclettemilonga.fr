import { useLayoutEffect, useState } from 'react';

export const useHeaderHeight = (initialHeight: number = 0) => {
  const [headHeight, setHeadHeight] = useState(initialHeight);

  useLayoutEffect(() => {
    const header = document.getElementById('header');

    if (header === null) return;

    queueMicrotask(() => {
      setHeadHeight(header.getBoundingClientRect().height);
    });

    const resizeObserver = new ResizeObserver(() => {
      setHeadHeight(header.getBoundingClientRect().height);
    });
    resizeObserver.observe(header);

    return () => resizeObserver.disconnect();
  }, []);

  return headHeight;
};
