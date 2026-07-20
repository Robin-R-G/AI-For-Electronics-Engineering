'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import dynamic from 'next/dynamic';
const ScrollReveal = dynamic(() => import("@/components/animations/ScrollReveal"), { ssr: false });
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import { getQuestionOfTheDay, QuestionOfTheDay } from "@/lib/quizService";
import { docsSections } from "@/lib/docsConfig";
import { quizQuestions } from "@/data/quizQuestions";

const diffClass: Record<string, string> = {
  Beginner: styles.diffBeginner,
  Intermediate: styles.diffIntermediate,
  Advanced: styles.diffAdvanced,
};

export default function Home() {
  const router = useRouter();

  const [qotd, setQotd] = useState<QuestionOfTheDay | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQotd(getQuestionOfTheDay());
  }, []);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const stats = [
    { value: `${docsSections.length}`, label: "Structured lessons" },
    { value: `${quizQuestions.length}+`, label: "Practice questions" },
    { value: "5", label: "Adaptive quiz modes" },
    { value: "Certificate", label: "On completion" },
  ];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <div className={styles.container}>

        {/* ── Hero ─────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={`${styles.eyebrow} reveal`}>
              Workshop · AI for Electronics Engineers
            </span>

            <h1 className={`${styles.title} reveal reveal-delay-1`} ref={titleRef}>
              Build intelligent hardware
              <br />
              with applied AI.
            </h1>

            <p className={`${styles.lede} reveal reveal-delay-2`}>
              A structured, hands-on curriculum from fundamentals to production-ready
              models on the edge — designed for electronics engineers.
            </p>

            <div className={`${styles.actions} reveal reveal-delay-3`}>
              <Button
                variant="primary"
                size="lg"
                icon={<span aria-hidden>→</span>}
                onClick={() => router.push('/learn/introduction')}
              >
                Start Learning
              </Button>
              <Button variant="secondary" size="lg" onClick={() => router.push('/learn/quiz')}>
                Take the Quiz
              </Button>
            </div>
          </div>
        </section>

        {/* ── Credibility / Stats ──────────────────── */}
        <section className={`${styles.statsStrip} reveal`}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Learning Path ────────────────────────── */}
        <section className={styles.path} id="curriculum">
          <div className={`${styles.sectionHead} reveal`}>
            <span className={styles.sectionTag}>The Curriculum</span>
            <h2>A clear path from fundamentals to deployment.</h2>
            <p>Twenty lessons that build on each other — work through them in order, or jump to what you need.</p>
          </div>

          <ol className={styles.pathList}>
            {docsSections.map((s, i) => (
              <li key={s.slug} className="reveal">
                <Link href={`/learn/${s.slug}`} className={styles.pathRow}>
                  <span className={styles.pathIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.pathBody}>
                    <span className={styles.pathTitle}>{s.title}</span>
                    <span className={styles.pathDesc}>{s.description}</span>
                  </span>
                  <span className={`${styles.diffBadge} ${diffClass[s.difficulty]}`}>{s.difficulty}</span>
                  <span className={styles.pathMeta}>{s.readingTime}</span>
                  <span className={styles.pathArrow} aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ── CTA Band ────────────────────────────── */}
        <section className={`${styles.ctaBand} reveal`}>
          <div className={styles.ctaInner}>
            <h2>Ready to start building?</h2>
            <p>Track your progress as you go, test yourself with adaptive quizzes, and earn a certificate when you finish.</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/learn/introduction')}
            >
              Begin the first lesson
            </Button>
          </div>
        </section>

        {/* ── Question of the Day Section ───────────────────────── */}
        {qotd && (
          <section className={`${styles.qotdSection} reveal`}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionTag}>Daily Brain Teaser</span>
              <h2>Question of the Day</h2>
              <p>Sharpen your engineering intuition and build smarter hardware systems.</p>
            </div>
            <div className={styles.qotdCard}>
              <div className={styles.qotdMeta}>
                <span className={styles.qotdBadge}>Interactive QOTD</span>
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
                    {selectedAnswer === qotd.correctAnswer ? 'Correct' : 'Incorrect'}
                  </div>
                  <p className={styles.qotdExplanation}>{qotd.explanation}</p>

                  <div className={styles.qotdLinksBox}>
                    <a
                      href={`/learn/${qotd.relatedLesson}`}
                      className={styles.qotdLessonRedirect}
                    >
                      Study Lesson: {qotd.relatedLesson.replace(/-/g, ' ').toUpperCase()} →
                    </a>

                    <div className={styles.qotdAiPromptBlock}>
                      <h5>Explore Further</h5>
                      <div className={styles.qotdPromptText}>{qotd.aiPrompt}</div>
                      <button
                        className={styles.copyPromptBtn}
                        onClick={() => {
                          navigator.clipboard.writeText(qotd.aiPrompt);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? 'Copied' : 'Copy prompt'}
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
