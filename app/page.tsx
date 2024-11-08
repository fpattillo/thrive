'use client';
import { ThriveProvider, useThriveContext } from './ThriveContextProvider';

export default function Home() {
  const { mostRecentPeriodSelected, handleReturnToCurrentPeriod } = useThriveContext();

  return (
    <ThriveProvider>
      <main className='flex h-screen flex-col items-center justify-between'>Homepage</main>
    </ThriveProvider>
  );
}
