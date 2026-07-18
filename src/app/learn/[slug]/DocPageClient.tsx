'use client';

import React, { useEffect, use } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import { notFound } from 'next/navigation';
import { docsSections } from '@/lib/docsConfig';
import { useProgress } from '@/context/ProgressContext';
import styles from '../docs.module.css';
import DocNavigation from '@/components/ui/DocNavigation';
import ChapterHeader from '@/components/course/ChapterHeader';
import LessonResources from '@/components/course/LessonResources';
import LessonQuiz from '@/components/course/LessonQuiz';
import MarkdownView from '@/lib/markdown';
import { getLessonOverride } from '@/lib/lessonContent';

const ContentComponents: Record<string, React.FC> = {
  'introduction': React.lazy(() => import('@/content/introduction')),
  'ai-fundamentals': React.lazy(() => import('@/content/ai-fundamentals')),
  'machine-learning': React.lazy(() => import('@/content/machine-learning')),
  'deep-learning': React.lazy(() => import('@/content/deep-learning')),
  'generative-ai': React.lazy(() => import('@/content/generative-ai')),
  'llms': React.lazy(() => import('@/content/llms')),
  'ai-tools': React.lazy(() => import('@/content/ai-tools')),
  'electronics-applications': React.lazy(() => import('@/content/electronics-applications')),
  'electronics-lab': React.lazy(() => import('@/content/electronics-lab')),
  'component-encyclopedia': React.lazy(() => import('@/content/component-encyclopedia')),
  'interview-prep': React.lazy(() => import('@/content/interview-prep')),
  'project-builder': React.lazy(() => import('@/content/project-builder')),
  'prompt-engineering': React.lazy(() => import('@/content/prompt-engineering')),
  'career-roadmap': React.lazy(() => import('@/content/career-roadmap')),
  'live-demonstrations': React.lazy(() => import('@/content/live-demonstrations')),
  'future-trends': React.lazy(() => import('@/content/future-trends')),
  'resources': React.lazy(() => import('@/content/resources')),
  'quiz': React.lazy(() => import('@/content/quiz')),
  'downloads': React.lazy(() => import('@/content/downloads')),
  'badges': React.lazy(() => import('@/content/badges')),
};

export default function DocPageClient({ slugPromise }: { slugPromise: Promise<string> }) {
  const slug = use(slugPromise);
  const { markAsRead } = useProgress();
  const isClient = useIsClient();

  const section = docsSections.find((s) => s.slug === slug);

  useEffect(() => {
    if (section) {
      markAsRead(slug);
    }
  }, [slug, section, markAsRead]);

  if (!section) {
    notFound();
  }

  const Content = ContentComponents[slug];
  const override = isClient ? getLessonOverride(slug) : null;

  return (
    <div>
      <ChapterHeader
        title={section.title}
        readingTime={section.readingTime}
        difficulty={section.difficulty}
      />

      <div className={styles.docContent}>
        {override ? (
          <MarkdownView markdown={override} />
        ) : isClient && Content ? (
          <React.Suspense fallback={<div className={styles.placeholder}>Loading premium content...</div>}>
            <Content />
          </React.Suspense>
        ) : (
          <p>
            Welcome to the <strong>{section.title}</strong> module. {section.description}
          </p>
        )}
      </div>

      <LessonResources slug={slug} />

      <LessonQuiz slug={slug} lessonTitle={section.title} />

      <DocNavigation currentSlug={slug} />
    </div>
  );
}
