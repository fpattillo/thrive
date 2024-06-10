import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ChecklistItem, TaskRow, TaskTag } from './types';
import { NumericGoalIndicator } from './NumericGoalIndicator';
import { ChecklistGoalIndicator } from './ChecklistGoalIndicator';
import { NumberModal } from './NumberModal';
import { ChecklistModal } from './ChecklistModal';
import { NewTagDropdown } from './NewTagDropdown';

export const Row = ({
  rowInfo,
  handleTagChange,
  handleProgressChange,
  handleGoalChange,
  handleChecklistChange,
}: {
  rowInfo: TaskRow;
  handleTagChange: (rowId: number, newTags: TaskTag[]) => void;
  handleProgressChange: (rowId: number, newProgress: number) => void;
  handleGoalChange: (rowId: number, newGoal: number) => void;
  handleChecklistChange: (rowId: number, newChecklist: ChecklistItem[]) => void;
}) => {
  const [showGoalModal, setShowGoalModal] = useState(false);

  return (
    <>
      <tr
        key={rowInfo.id}
        className='border-b border-gray-200 dark:border-gray-800 hover:bg-[#F3F4F6] dark:hover:bg-[#18181b54] cursor-pointer'
      >
        <td className='py-4 px-4 text-sm font-medium text-gray-900 dark:text-gray-50'>
          {rowInfo.name}
        </td>
        <td
          className='py-4 px-4'
          onClick={() => setShowGoalModal(true)}
        >
          <div className='flex items-center gap-2'>
            {rowInfo.type === 'numeric' ? (
              <NumericGoalIndicator progressValue={rowInfo.progress} />
            ) : (
              <ChecklistGoalIndicator rowInfo={rowInfo} />
            )}
          </div>
        </td>
        <td className='py-4 px-4'>
          <div className='flex flex-wrap gap-2'>
            {rowInfo.tags.map((tag, index) => (
              <Badge
                key={index}
                className={`bg-[${tag.color}] text-white px-2 py-1 rounded-md text-xs hover:bg-[${tag.color}]/90`}
              >
                {tag.text}
              </Badge>
            ))}
            <NewTagDropdown
              rowInfo={rowInfo}
              onAdd={handleTagChange}
            />
          </div>
        </td>
      </tr>
      {rowInfo.type === 'numeric' ? (
        <NumberModal
          open={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          row={rowInfo}
          onProgressChange={handleProgressChange}
          onGoalChange={handleGoalChange}
        />
      ) : (
        <ChecklistModal
          open={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          row={rowInfo}
          onCheck={handleChecklistChange}
        />
      )}
    </>
  );
};
