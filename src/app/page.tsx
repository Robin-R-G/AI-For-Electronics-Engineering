'use client';
import { useCallback, useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import dynamic from 'next/dynamic';
const FloatingChips = dynamic(() => import("@/components/animations/FloatingChips").then(m => m.FloatingChips), { ssr: false });
const AIParticles = dynamic(() => import("@/components/animations/AIParticles").then(m => m.AIParticles), { ssr: false });
const PCBDecor = dynamic(() => import("@/components/animations/PCBDecor").then(m => m.PCBDecor), { ssr: false });
const ScrollReveal = dynamic(() => import("@/components/animations/ScrollReveal"), { ssr: false });
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import { getQuestionOfTheDay, QuestionOfTheDay } from "@/lib/quizService";

const modules = [
  {
    id: "01",
    title: "Neural Networks for Hardware",
    desc: "Learn how to optimize neural networks for constrained environments and microcontrollers.",
    icon: "🧠",
    slug: "deep-learning",
  },
  {
    id: "02",
    title: "Edge AI & Inference",
    desc: "Implement fast, low-power inference engines directly on the PCB using TinyML.",
    icon: "⚡",
    slug: "ai-fundamentals",
  },
  {
    id: "03",
    title: "Sensor Data Fusion",
    desc: "Merge complex sensor data streams using machine learning models for real-time decisions.",
    icon: "📡",
    slug: "machine-learning",
  },
];

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);

  const [qotd, setQotd] = useState<QuestionOfTheDay | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQotd(getQuestionOfTheDay());
  }, []);

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
                onClick={() => router.push('/learn/' + mod.slug)}
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

        {/* ── Question of the Day Section ───────────────────────── */}
        {qotd && (
          <section className={`${styles.qotdSection} reveal`}>
            <div className={styles.modulesHeader}>
              <span className={styles.sectionTag}>Daily Brain Teaser</span>
              <h2>Question of the Day</h2>
              <p>Sharpen your engineering intuition and build smarter hardware systems.</p>
            </div>
            <div className={styles.qotdCard}>
              <div className={styles.qotdMeta}>
                <span className={styles.qotdBadge}>💡 Interactive QOTD</span>
                <span className={styles.qotdLesson}>
                  Lesson: {qotd.relatedLesson.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </span>
              </div>
              <h3 className={styles.qotdQuestion}>{qotd.question}</h3>
              <div className={styles.qotdOptions}>
                {qotd.options.map((opt: string, i: number) => {
                  const letter = String.fromCharCode(65 + i);
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === qotd.correctAnswer;
                  
                  let btnStyle = styles.qotdOptionBtn;
                  if (isSelected) {
                    btnStyle += ` ${styles.optionSelected}`;
                  }
                  if (submitted) {
                    if (isCorrect) {
                      btnStyle += ` ${styles.optionCorrect}`;
                    } else if (isSelected) {
                      btnStyle += ` ${styles.optionIncorrect}`;
                    }
                    btnStyle += ` ${styles.disabledOption}`;
                  }
                  return (
                    <button
                      key={opt}
                      className={btnStyle}
                      disabled={submitted}
                      onClick={() => setSelectedAnswer(opt)}
                    >
                      <span className={styles.qotdOptionLetter}>{letter}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!submitted ? (
                <Button 
                  variant="primary" 
                  disabled={!selectedAnswer}
                  onClick={() => setSubmitted(true)}
                >
                  Submit Answer
                </Button>
              ) : (
                <div className={styles.qotdFeedbackPanel}>
                  <div className={`${styles.qotdFeedbackHeader} ${selectedAnswer === qotd.correctAnswer ? styles.textSuccess : styles.textDanger}`}>
                    {selectedAnswer === qotd.correctAnswer ? '🟢 Correct!' : '🔴 Incorrect'}
                  </div>
                  <p className={styles.qotdExplanation}>{qotd.explanation}</p>
                  
                  <div className={styles.qotdLinksBox}>
                    <a 
                      href={`/AI-For-Electronics-Engineering/learn/${qotd.relatedLesson}`}
                      className={styles.qotdLessonRedirect}
                    >
                      📖 Study Lesson: {qotd.relatedLesson.replace(/-/g, ' ').toUpperCase()} →
                    </a>
                    
                    <div className={styles.qotdAiPromptBlock}>
                      <h5>🤖 Explore Further with AI</h5>
                      <div className={styles.qotdPromptText}>{qotd.aiPrompt}</div>
                      <button 
                        className={styles.copyPromptBtn}
                        onClick={() => {
                          navigator.clipboard.writeText(qotd.aiPrompt);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? '✓ Copied' : '📋 Copy AI Prompt'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
