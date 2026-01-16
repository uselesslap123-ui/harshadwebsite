'use client';

import { useEffect } from 'react';

interface ScrollEndNotifierProps {
  onScrollEnd: () => void;
  offset?: number;
}

export function ScrollEndNotifier({ onScrollEnd, offset = 100 }: ScrollEndNotifierProps) {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - offset) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            onScrollEnd();
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd, offset]);

  return null;
}
