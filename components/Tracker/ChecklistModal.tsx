'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChecklistItem, ChecklistTask } from '../types/types';

export const ChecklistModal = ({
  open,
  onClose,
  row,
  onCheck,
}: {
  open: boolean;
  onClose: () => void;
  row: ChecklistTask;
  onCheck: (rowId: number, newChecklist: ChecklistItem[]) => void;
}) => {
  const [checklist, setChecklist] = useState(row.subtasks);
  const [newSubtaskName, setNewSubtaskName] = useState('');

  const handleCheck = (checked: CheckedState, itemId: number) => {
    setChecklist((prevChecklist: ChecklistItem[]) => {
      const newChecklist = [...prevChecklist].map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            completed: Boolean(checked),
          };
        }
        return item;
      });
      return newChecklist;
    });
  };

  const handleAddSubtask = () => {
    if (newSubtaskName.trim() === '') return;
    const newChecklist = [
      ...checklist,
      {
        id: checklist.length + 1,
        name: newSubtaskName,
        completed: false,
      },
    ];
    setChecklist(newChecklist);
    setNewSubtaskName('');
  };

  const handleClose = () => {
    onCheck(row.id, checklist);
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
        </DialogHeader>
        <div className='grid gap-2'>
          {checklist.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-2'
            >
              <Checkbox
                id={`checklist-${item.id}`}
                checked={item.completed}
                onCheckedChange={(checked) => handleCheck(checked, item.id)}
              />
              <label
                htmlFor={`checklist-${item.id}`}
                className={`text-sm ${
                  item.completed
                    ? 'line-through text-gray-400 dark:text-gray-600'
                    : 'text-gray-900 dark:text-gray-50'
                }`}
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <Input
            type='text'
            placeholder='New subtask'
            value={newSubtaskName}
            onChange={(e) => setNewSubtaskName(e.target.value)}
          />
          <Button
            onClick={handleAddSubtask}
            className='bg-[#824670] text-white dark:bg-[#824670] dark:text-white hover:bg-[#824670]/90 dark:hover:bg-[#824670]/90 transition-colors'
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
