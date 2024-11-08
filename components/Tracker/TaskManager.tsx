/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QLUYYvHEoHq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Row } from './TaskRow';
import CheckIcon from '../icons/CheckIcon';
import { Period } from '../types/types';
import { useTrackerContext } from './TrackerContextProvider';
import { useThriveContext } from '@/app/ThriveContextProvider';

export default function TaskManager() {
  const { selectedPeriod: period, mostRecentPeriod, handleAddPeriod } = useThriveContext();
  const {
    rows,
    setRows,
    handleChecklistChange,
    handleGoalChange,
    handleProgressChange,
    handleTagChange,
  } = useTrackerContext();
  const [newRowName, setNewRowName] = useState('');
  const [newRowType, setNewRowType] = useState<'numeric' | 'checklist'>('numeric');
  const [showEndPeriodConfirmationModal, setShowEndPeriodConfirmationModal] = useState(false);
  const [showResetConfirmationModal, setShowResetConfirmationModal] = useState(false);

  useEffect(() => {
    if (period) setRows(period.tasks);
  }, [period, setRows]);

  useEffect(() => {
    if (mostRecentPeriod?.id === period?.id && rows.length > 0) mostRecentPeriod!.tasks = rows;
  }, [mostRecentPeriod, period, rows]);

  const handleAddRow = () => {
    if (newRowName.trim() !== '') {
      setRows([
        ...rows,
        {
          id: rows.length + 1,
          name: newRowName,
          progress: 0,
          tags: [],
          variant: newRowType,
          goal: newRowType === 'numeric' ? 100 : 0,
          subtasks:
            newRowType === 'checklist'
              ? [
                  { id: 1, name: 'Subtask 1', completed: false },
                  { id: 2, name: 'Subtask 2', completed: false },
                  { id: 3, name: 'Subtask 3', completed: false },
                ]
              : [],
        },
      ]);
      setNewRowName('');
      setNewRowType('numeric');
    }
  };

  const handleResetRows = () => {
    setShowResetConfirmationModal(true);
  };
  const handleConfirmResetRows = () => {
    setRows(
      rows.map((row) => ({
        ...row,
        progress: 0,
        checklist:
          row.variant === 'checklist'
            ? [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: false },
                { id: 3, name: 'Subtask 3', completed: false },
              ]
            : [],
      })),
    );
    setShowResetConfirmationModal(false);
  };
  const handleCancelResetRows = () => {
    setShowResetConfirmationModal(false);
  };
  const handleEndPeriod = () => {
    const finishedPeriod: Period = {
      id: 1,
      name: 'September 2021',
      duration: 7,
      // Calculate average progress, for numeric consider progress, for checklist consider percentage of completion of all subtasks
      completion:
        Math.round(
          (rows.reduce((acc, row) => {
            if (row.variant === 'numeric') {
              return acc + row.progress;
            }
            return (
              acc +
              (row.subtasks.filter((subtask) => subtask.completed).length / row.subtasks.length) *
                100
            );
          }, 0) /
            rows.length) *
            10,
        ) / 10,
      tasks: rows,
    };
    handleAddPeriod(finishedPeriod);
    if (period) setRows(period.tasks);
    setShowEndPeriodConfirmationModal(false);
  };
  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-6'>
        {/* TODO: Create input for period title, duration, etc. */}
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 dark:border-gray-800'>
              <th className='py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                Task
              </th>
              <th className='py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                Progress
              </th>
              <th className='py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400'>
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <Row
                rowInfo={row}
                handleTagChange={handleTagChange}
                handleProgressChange={handleProgressChange}
                handleGoalChange={handleGoalChange}
                handleChecklistChange={handleChecklistChange}
                key={`row-${index}`}
              />
            ))}
          </tbody>
        </table>
        <div className='mt-6 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Select
              value={newRowType}
              onValueChange={(value) => setNewRowType(value as 'numeric' | 'checklist')}
            >
              <SelectTrigger>
                <SelectValue placeholder='Task Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='numeric'>Numeric</SelectItem>
                <SelectItem value='checklist'>Checklist</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='text'
              placeholder='New task'
              value={newRowName}
              onChange={(e) => setNewRowName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddRow();
                }
              }}
              className='bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2 text-sm'
            />
            <Button
              onClick={handleAddRow}
              className='bg-[#824670] text-white dark:bg-[#824670] dark:text-white hover:bg-[#824670]/90 dark:hover:bg-[#824670]/90 transition-colors'
            >
              Add Task
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              onClick={handleResetRows}
              className='bg-[#824670] text-white dark:bg-[#824670] dark:text-white hover:bg-[#824670]/90 dark:hover:bg-[#824670]/90 transition-colors'
            >
              Reset Tasks
            </Button>
            <Button
              onClick={() => setShowEndPeriodConfirmationModal(true)}
              className='bg-[#74DDAA] text-white dark:bg-[#74DDAA] dark:text-white hover:bg-[#74DDAA]/90 dark:hover:bg-[#74DDAA]/90 transition-colors'
            >
              End period
              <CheckIcon className='ml-3 w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={showResetConfirmationModal}
        onOpenChange={handleCancelResetRows}
      >
        <DialogContent className='w-full max-w-md'>
          <DialogHeader>
            <DialogTitle>Reset Tasks</DialogTitle>
            <DialogDescription>Are you sure you want to reset all tasks?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleConfirmResetRows}
              className='bg-[#824670] text-white dark:bg-[#824670] dark:text-white hover:bg-[#824670]/90 dark:hover:bg-[#824670]/90 transition-colors'
            >
              Reset Tasks
            </Button>
            <Button
              onClick={handleCancelResetRows}
              className='bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showEndPeriodConfirmationModal}
        onOpenChange={() => setShowEndPeriodConfirmationModal(false)}
      >
        <DialogContent className='w-full max-w-md'>
          <DialogHeader>
            <DialogTitle>End Period</DialogTitle>
            <DialogDescription>Are you sure you want to end the current period?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleEndPeriod}
              className='bg-[#824670] text-white dark:bg-[#824670] dark:text-white hover:bg-[#824670]/90 dark:hover:bg-[#824670]/90 transition-colors'
            >
              End Period
            </Button>
            <Button
              onClick={() => setShowEndPeriodConfirmationModal(false)}
              className='bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
