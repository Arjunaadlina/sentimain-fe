/*eslint-disable */
import { Suspense } from 'react';
import Analyze from './Analyze';

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Analyze />
    </Suspense>
  );
}