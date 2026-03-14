'use client';

import { Suspense } from 'react';
import ActivitiesPage from './ActivitiesContent';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="pt-32 text-center">
        <div className="w-8 h-8 border-2 border-cabo-ocean border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <ActivitiesPage />
    </Suspense>
  );
}
