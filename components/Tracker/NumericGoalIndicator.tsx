import { Progress } from '@/components/ui/progress';

export const NumericGoalIndicator = ({ progressValue }: { progressValue: number }) => {
  // TODO: find out why the progressValue is not being updated
  return (
    <>
      <Progress
        value={progressValue}
        className={`flex-1 ${
          progressValue >= 0 && progressValue <= 33
            ? 'bg-[#A2708A]'
            : progressValue >= 34 && progressValue <= 66
              ? 'bg-[#BDA0BC]'
              : progressValue >= 67 && progressValue < 100
                ? 'bg-[#C3D2D5]'
                : 'bg-[#C1F7DC]'
        }`}
      />
      <span className='text-sm text-gray-500 dark:text-gray-400'>{progressValue}%</span>
    </>
  );
};
