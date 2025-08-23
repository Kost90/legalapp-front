'use client';

import { useEffect, RefObject } from 'react';

export const useHeaderTheme = (headerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-section-theme');
          if (theme) {
            headerEl.setAttribute('data-theme', theme);
          } else {
            headerEl.setAttribute('data-theme', 'light');
          }
        }
      });
    }, options);

    const sections = document.querySelectorAll('[data-section-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [headerRef]);
};
