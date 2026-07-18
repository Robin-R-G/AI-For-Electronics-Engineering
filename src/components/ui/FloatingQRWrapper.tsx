'use client';
import dynamic from 'next/dynamic';

const FloatingQR = dynamic(() => import('./FloatingQR'), { ssr: false });

export default function FloatingQRWrapper() {
  return <FloatingQR />;
}
