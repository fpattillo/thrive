import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { NumericTaskRow } from './types';

export const NumberModal = ({
  open,
  onClose,
  row,
  onProgressChange,
  onGoalChange,
}: {
  open: boolean;
  onClose: () => void;
  row: NumericTaskRow;
  onProgressChange: (rowId: number, newProgress: number) => void;
  onGoalChange: (rowId: number, newGoal: number) => void;
}) => {
  const [progress, setProgress] = useState(row.progress);
  const [goal, setGoal] = useState(row.goal);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(event.target.value);
    setProgress(newProgress >= 0 ? (newProgress <= goal ? newProgress : goal) : 0);
  };

  const handleClose = () => {
    onProgressChange(row.id, progress);
    onGoalChange(row.id, goal);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className='w-full max-w-md'>
        <DialogHeader>
          <DialogTitle>{row.name}</DialogTitle>
          <DialogDescription>
            <div className='flex items-center gap-2'>
              <Progress
                value={progress}
                className={`flex-1 ${
                  progress >= 0 && progress <= 33
                    ? 'bg-[#A2708A]'
                    : progress >= 34 && progress <= 66
                      ? 'bg-[#BDA0BC]'
                      : progress >= 67 && progress < 100
                        ? 'bg-[#C3D2D5]'
                        : 'bg-[#C1F7DC]'
                }`}
              />
              <Input
                type='number'
                min={0}
                max={goal}
                value={progress}
                onChange={handleProgressChange}
                className='w-20 text-right'
              />
              <span>/ {goal}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-500 dark:text-gray-400'>Goal:</span>
            <Input
              type='number'
              min={1}
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value))}
              className='w-20 text-right'
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
