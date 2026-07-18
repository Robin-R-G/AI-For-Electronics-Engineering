import { docsSections } from '@/lib/docsConfig';
import DocPageClient from './DocPageClient';

export function generateStaticParams() {
  return docsSections.map((s) => ({ slug: s.slug }));
}

export default function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DocPageClient slugPromise={params.then(p => p.slug)} />;
}
