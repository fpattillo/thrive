/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AWdM59Tz4Y0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { HistoryCard } from './HistoryCard';
import { useThriveContext } from '@/app/ThriveContextProvider';

export default function History() {
  const { previousPeriods, setSelectedPeriod } = useThriveContext();
  // TODO: add onClick to navigate to period details
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
      {previousPeriods.map((period, index) => (
        <HistoryCard
          key={`history-card-${index}`}
          period={period}
          handleClick={() => setSelectedPeriod(period)}
        />
      ))}
    </div>
  );
}
