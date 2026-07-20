'use client';

import React, { useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { docsSections } from '@/lib/docsConfig';
import { useProgress } from '@/context/ProgressContext';
import LessonTemplate from '@/components/course/LessonTemplate';
import MarkdownView from '@/lib/markdown';
import { getLessonOverride, subscribeLessons } from '@/lib/lessonContent';

import dynamic from 'next/dynamic';

const ContentComponents: Record<string, React.ComponentType> = {
  'introduction': dynamic(() => import('@/content/introduction')),
  'ai-fundamentals': dynamic(() => import('@/content/ai-fundamentals')),
  'machine-learning': dynamic(() => import('@/content/machine-learning')),
  'deep-learning': dynamic(() => import('@/content/deep-learning')),
  'generative-ai': dynamic(() => import('@/content/generative-ai')),
  'llms': dynamic(() => import('@/content/llms')),
  'ai-tools': dynamic(() => import('@/content/ai-tools')),
  'electronics-applications': dynamic(() => import('@/content/electronics-applications')),
  'electronics-lab': dynamic(() => import('@/content/electronics-lab')),
  'component-encyclopedia': dynamic(() => import('@/content/component-encyclopedia')),
  'interview-prep': dynamic(() => import('@/content/interview-prep')),
  'project-builder': dynamic(() => import('@/content/project-builder')),
  'prompt-engineering': dynamic(() => import('@/content/prompt-engineering')),
  'career-roadmap': dynamic(() => import('@/content/career-roadmap')),
  'live-demonstrations': dynamic(() => import('@/content/live-demonstrations')),
  'future-trends': dynamic(() => import('@/content/future-trends')),
  'resources': dynamic(() => import('@/content/resources')),
  'quiz': dynamic(() => import('@/content/quiz')),
  'downloads': dynamic(() => import('@/content/downloads')),
  'badges': dynamic(() => import('@/content/badges')),
};

export default function DocPageClient({ slugPromise }: { slugPromise: Promise<string> }) {
  const slug = use(slugPromise);
  const { markAsRead } = useProgress();
  const [override, setOverride] = React.useState<string | null>(null);

  const section = docsSections.find((s) => s.slug === slug);

  useEffect(() => {
    if (section) {
      markAsRead(slug);
    }
    const load = () => setOverride(getLessonOverride(slug));
    load();
    return subscribeLessons(load);
  }, [slug, section, markAsRead]);

  if (!section) {
    notFound();
  }

  const Content = ContentComponents[slug];

  return (
    <LessonTemplate
      slug={slug}
      title={section.title}
      readingTime={section.readingTime}
      difficulty={section.difficulty}
    >
      {override ? (
        <MarkdownView markdown={override} />
      ) : Content ? (
        <Content />
      ) : (
        <p>
          Welcome to the <strong>{section.title}</strong> module. {section.description}
        </p>
      )}
    </LessonTemplate>
  );
}
