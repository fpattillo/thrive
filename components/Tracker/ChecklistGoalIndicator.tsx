'use client';
import CheckIcon from '../icons/CheckIcon';
import { ChecklistTask } from '../types/types';

export const ChecklistGoalIndicator = ({ rowInfo }: { rowInfo: ChecklistTask }) => {
  return (
    <>
      <div className='flex-1'>
        {rowInfo.subtasks.filter((item) => item.completed).length} / {rowInfo.subtasks.length}
      </div>
      <CheckIcon
        className={`w-4 h-4 ${
          rowInfo.subtasks.filter((item) => item.completed).length === rowInfo.subtasks.length
            ? 'text-[#C1F7DC]'
            : rowInfo.subtasks.filter((item) => item.completed).length >= 0 &&
                rowInfo.subtasks.filter((item) => item.completed).length <=
                  Math.floor(rowInfo.subtasks.length / 3)
              ? 'text-[#A2708A]'
              : rowInfo.subtasks.filter((item) => item.completed).length >
                    Math.floor(rowInfo.subtasks.length / 3) &&
                  rowInfo.subtasks.filter((item) => item.completed).length <=
                    Math.floor((rowInfo.subtasks.length * 2) / 3)
                ? 'text-[#BDA0BC]'
                : 'text-[#C3D2D5]'
        }`}
      />
    </>
  );
};
