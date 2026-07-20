'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { docsSections } from '@/lib/docsConfig';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/#curriculum', label: 'Curriculum' },
  { href: '/learn/quiz', label: 'Quizzes' },
  { href: '/learn/career-roadmap', label: 'Roadmap' },
  { href: '/learn/resources', label: 'Resources' },
];

const MEGA_GROUPS = [
  { title: 'Fundamentals', slugs: ['introduction', 'ai-fundamentals', 'machine-learning', 'deep-learning'] },
  { title: 'Advanced Topics', slugs: ['generative-ai', 'llms', 'ai-tools', 'prompt-engineering'] },
  { title: 'Practice', slugs: ['electronics-lab', 'project-builder', 'quiz', 'interview-prep'] },
  { title: 'Reference', slugs: ['component-encyclopedia', 'resources', 'career-roadmap', 'downloads'] },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node) &&
          megaBtnRef.current && !megaBtnRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [megaOpen]);

  const isActive = useCallback((href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  }, [pathname]);

  const isLearnActive = pathname.startsWith('/learn/');

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="AI for Electronics Engineering — home">
          <span className={styles.logoMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M12 7v10M7.5 9.5l9 5M16.5 9.5l-9 5" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
              <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
            </svg>
          </span>
          <span className={styles.logoText}>AI for <span className={styles.logoAccent}>Electronics</span></span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          <button
            ref={megaBtnRef}
            className={`${styles.link} ${styles.learnBtn} ${isLearnActive ? styles.linkActive : ''}`}
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen(v => !v)}
          >
            Learn
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${styles.chevron} ${megaOpen ? styles.chevronUp : ''}`}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {megaOpen && (
            <div ref={megaRef} className={styles.mega} onMouseLeave={() => setMegaOpen(false)}>
              <div className={styles.megaGrid}>
                {MEGA_GROUPS.map(group => (
                  <div key={group.title} className={styles.megaGroup}>
                    <h4 className={styles.megaGroupTitle}>{group.title}</h4>
                    {group.slugs.map(slug => {
                      const section = docsSections.find(s => s.slug === slug);
                      if (!section) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/learn/${slug}`}
                          className={`${styles.megaLink} ${pathname === `/learn/${slug}` ? styles.megaLinkActive : ''}`}
                          onClick={() => setMegaOpen(false)}
                          prefetch={false}
                        >
                          <span className={styles.megaLinkTitle}>{section.title}</span>
                          <span className={styles.megaLinkMeta}>{section.readingTime} &middot; {section.difficulty}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${isActive(l.href) ? styles.linkActive : ''}`}
              prefetch={false}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/learn/introduction" className={styles.cta} prefetch={false}>
            Start Learning
          </Link>
        </nav>

        <div className={styles.burger} role="none">
          <button
            type="button"
            className={styles.burgerBtn}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burgerBar} ${open ? styles.burgerTop : ''}`} />
            <span className={`${styles.burgerBar} ${open ? styles.burgerMid : ''}`} />
            <span className={`${styles.burgerBar} ${open ? styles.burgerBot : ''}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        hidden={!open}
      >
        <div className={styles.drawerBody}>
          <nav className={styles.drawerNav}>
            <div className={styles.drawerGroup}>
              <h4 className={styles.drawerGroupTitle}>Learn</h4>
              {docsSections.map(s => (
                <Link
                  key={s.slug}
                  href={`/learn/${s.slug}`}
                  className={`${styles.drawerLink} ${pathname === `/learn/${s.slug}` ? styles.drawerLinkActive : ''}`}
                  onClick={() => setOpen(false)}
                  prefetch={false}
                >
                  <span>{s.title}</span>
                  <span className={styles.drawerLinkMeta}>{s.readingTime}</span>
                </Link>
              ))}
            </div>
            <div className={styles.drawerGroup}>
              <h4 className={styles.drawerGroupTitle}>Other</h4>
              {LINKS.map(l => (
                <Link key={l.href} href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)} prefetch={false}>
                  {l.label}
                </Link>
              ))}
              <Link href="/learn/introduction" className={styles.drawerCta} onClick={() => setOpen(false)} prefetch={false}>
                Start Learning →
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </header>
  );
};

export default Navbar;
