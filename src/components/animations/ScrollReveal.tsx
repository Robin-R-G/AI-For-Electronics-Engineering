'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — Activates .reveal, .reveal-left, .reveal-right
 * classes defined in globals.css using IntersectionObserver.
 * Mount once in a layout or page, no props needed.
 */
export const ScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all reveal-marked elements
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollReveal;
