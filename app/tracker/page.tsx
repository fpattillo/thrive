/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QLUYYvHEoHq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { Button } from '@/components/ui/button';
import { TrackerProvider } from '../../components/Tracker/TrackerContextProvider';
import { useThriveContext } from '@/app/ThriveContextProvider';
import TaskManager from '../../components/Tracker/TaskManager';
import History from '@/components/History/History';

export default function Tracker() {
  const { mostRecentPeriodSelected, handleReturnToCurrentPeriod } = useThriveContext();
  return (
    <div className='p-5'>
      <div className='m-5'>
        {!mostRecentPeriodSelected && (
          <Button
            className='mb-3'
            onClick={handleReturnToCurrentPeriod}
          >
            Return to current period
          </Button>
        )}
        <TrackerProvider>
          <TaskManager />
        </TrackerProvider>
      </div>

      <div className='mb-32 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left'>
        <History />
      </div>
    </div>
  );
}
