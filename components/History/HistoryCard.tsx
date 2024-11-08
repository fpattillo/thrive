'use client';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Period } from '../types/types';

export const HistoryCard = ({
  period,
  handleClick,
}: {
  period: Period;
  handleClick: () => void;
}) => {
  // TODO: make a static radial progress bar with the completion percentage
  return (
    <Card
      className='w-full max-w-sm hover:bg-gray-50'
      onClick={handleClick}
    >
      <CardContent className='flex flex-col items-center justify-center gap-4 p-4'>
        <div className='relative w-full max-w-[200px] aspect-square'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-4xl font-bold'>
              {(() => {
                if (period.completion >= 90) return 'A';
                else if (period.completion >= 80) return 'B';
                else if (period.completion >= 70) return 'C';
                else if (period.completion >= 60) return 'D';
                else if (period.completion >= 50) return 'E';
                else return 'F';
              })()}
            </span>
          </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-full h-full rounded-full border-2 border-black dark:border-white'>
              <div className='w-full h-full rounded-full bg-transparent flex items-center justify-center' />
            </div>
          </div>
        </div>
        <div className='space-y-2 text-center'>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>
            {`You reached ${period.completion}% of your goals in this period. Keep up the great work!`}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
