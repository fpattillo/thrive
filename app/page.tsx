'use client';
import Tracker from '@/components/Tracker/Tracker';
import History from '@/components/History/History';
import { useState } from 'react';
import { Period } from '@/components/History/types';

export default function Home() {
  const [previousPeriods, setPreviousPeriods] = useState<Period[]>([]);
  const handleAddPeriod = (period: Period) => {
    setPreviousPeriods((prevPeriods) => [...prevPeriods, period]);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        {/* HEADER */}
      </div>

      <div className=''>
        <Tracker addToHistory={handleAddPeriod} />
      </div>

      <div className='mb-32 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left'>
        <History previousPeriods={previousPeriods} />
      </div>
    </main>
  );
}
