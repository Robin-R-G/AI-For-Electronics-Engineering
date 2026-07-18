import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoIcon}></span>
            <span className={styles.logoText}>AI for Electronics Engineering</span>
          </Link>
        </div>
        
        <nav className={styles.navLinks}>
          <Link href="/#agenda" className={styles.link}>Agenda</Link>
          <Link href="/learn/resources" className={styles.link}>Resources</Link>
          <Link href="/presenter" className={styles.link}>Speaker</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
