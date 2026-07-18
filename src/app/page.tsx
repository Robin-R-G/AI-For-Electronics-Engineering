'use client';
import { useCallback, useRef } from "react";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FloatingChips } from "@/components/animations/FloatingChips";
import { AIParticles } from "@/components/animations/AIParticles";
import { PCBDecor } from "@/components/animations/PCBDecor";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

const modules = [
  {
    id: "01",
    title: "Neural Networks for Hardware",
    desc: "Learn how to optimize neural networks for constrained environments and microcontrollers.",
    icon: "🧠",
  },
  {
    id: "02",
    title: "Edge AI & Inference",
    desc: "Implement fast, low-power inference engines directly on the PCB using TinyML.",
    icon: "⚡",
  },
  {
    id: "03",
    title: "Sensor Data Fusion",
    desc: "Merge complex sensor data streams using machine learning models for real-time decisions.",
    icon: "📡",
  },
];

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty('--mouse-x', `${x}`);
    hero.style.setProperty('--mouse-y', `${y}`);
  }, []);

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <div className={styles.container}>

        {/* ── Hero ─────────────────────────────────── */}
        <section
          ref={heroRef}
          className={styles.hero}
          onMouseMove={handleHeroMouseMove}
        >
          <FloatingChips />
          <AIParticles />

          {/* Parallax depth layers */}
          <div className={styles.parallaxLayer} data-depth="0.02">
            <PCBDecor variant="corner-tl" opacity={0.15} className={styles.pcbCornerTl} />
          </div>
          <div className={styles.parallaxLayer} data-depth="0.04">
            <PCBDecor variant="corner-br" opacity={0.15} className={styles.pcbCornerBr} />
          </div>

          {/* Ambient glow blobs */}
          <div className={`${styles.glowBlob} ${styles.glowBlue}`} />
          <div className={`${styles.glowBlob} ${styles.glowPurple}`} />
          <div className={`${styles.glowBlob} ${styles.glowCyan}`} />

          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.pulse}></span>
              Live Workshop · 2026
            </div>

            <h1 className={styles.title}>
              AI for <br />
              <span className="text-gradient-hero">Electronics Engineers</span>
            </h1>

            <div className={styles.subtitles}>
              <p className={styles.subtitle1}>Build Smarter Projects</p>
              <span className={styles.dot}>•</span>
              <p className={styles.subtitle2}>Learn Faster</p>
              <span className={styles.dot}>•</span>
              <p className={styles.subtitle3}>Get Better Placements</p>
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                glow
                icon={<span>→</span>}
                onClick={() => router.push('/learn/introduction')}
              >
                Start Learning
              </Button>
              <Button variant="secondary" size="lg" onClick={() => router.push('/learn/quiz')}>
                Take the Quiz
              </Button>
              <Button variant="ghost" size="lg" onClick={() => router.push('/learn/downloads')}>
                Downloads
              </Button>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <span>Scroll</span>
            <span className={styles.scrollLine}></span>
          </div>
        </section>

        {/* ── Modules Section ───────────────────────── */}
        <section className={styles.modules} id="agenda">
          <div className={`${styles.modulesHeader} reveal`}>
            <span className={styles.sectionTag}>Workshop Modules</span>
            <h2>Everything you need to build <span className="text-gradient">intelligent hardware.</span></h2>
            <p>From fundamentals to production-ready AI on the edge.</p>
          </div>

          <div className={styles.grid}>
            {modules.map((mod, i) => (
              <Card
                key={mod.id}
                interactive
                spotlight
                gradientBorder
                onClick={() => router.push('/learn/ai-fundamentals')}
              >
                <div className={`${styles.moduleCard} reveal reveal-delay-${i + 1}`}>
                  <div className={styles.moduleId}>{mod.icon} {mod.id}</div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                  <div className={styles.moduleArrow}>→</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
