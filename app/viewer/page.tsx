'use client';

import dynamic from 'next/dynamic';

const SplatViewer = dynamic(
  () => import('@/components/custom/SplatViewer'),
  { ssr: false }
);

export default function ViewerPage() {
  return <SplatViewer />;
}