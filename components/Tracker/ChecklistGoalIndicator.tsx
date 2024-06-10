import CheckIcon from '../icons/CheckIcon';
import { ChecklistTaskRow } from './types';

export const ChecklistGoalIndicator = ({ rowInfo }: { rowInfo: ChecklistTaskRow }) => {
  return (
    <>
      <div className='flex-1'>
        {rowInfo.checklist.filter((item) => item.completed).length} / {rowInfo.checklist.length}
      </div>
      <CheckIcon
        className={`w-4 h-4 ${
          rowInfo.checklist.filter((item) => item.completed).length === rowInfo.checklist.length
            ? 'text-[#C1F7DC]'
            : rowInfo.checklist.filter((item) => item.completed).length >= 0 &&
                rowInfo.checklist.filter((item) => item.completed).length <=
                  Math.floor(rowInfo.checklist.length / 3)
              ? 'text-[#A2708A]'
              : rowInfo.checklist.filter((item) => item.completed).length >
                    Math.floor(rowInfo.checklist.length / 3) &&
                  rowInfo.checklist.filter((item) => item.completed).length <=
                    Math.floor((rowInfo.checklist.length * 2) / 3)
                ? 'text-[#BDA0BC]'
                : 'text-[#C3D2D5]'
        }`}
      />
    </>
  );
};
