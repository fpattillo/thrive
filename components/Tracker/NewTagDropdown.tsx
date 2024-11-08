'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import PlusIcon from '../icons/PlusIcon';
import { useState } from 'react';
import ColorPicker from '../utils/ColorPicker';
import { Task, TaskTag } from '../types/types';

export const NewTagDropdown = ({
  rowInfo,
  onAdd,
}: {
  rowInfo: Task;
  onAdd: (rowId: number, newTags: TaskTag[]) => void;
}) => {
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#A2708A');

  const handleAddTag = () => {
    if (newTagName === '') return;
    onAdd(rowInfo.id, [...rowInfo.tags, { text: newTagName, color_code: newTagColor }]);
    setNewTagName('');
    setNewTagColor('#A2708A');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full border border-gray-200 w-8 h-8 hover:bg-gray-300'
        >
          <PlusIcon className='w-4 h-4' />
          <span className='sr-only'>Add tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Add new tag</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* TODO: find out why the field loses focus at times (when typing 'a') */}
        <Input
          type='text'
          placeholder='New tag'
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <DropdownMenuSeparator />
        <ColorPicker
          color={newTagColor}
          setColor={setNewTagColor}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={handleAddTag}
            className='w-full'
          >
            Add Tag
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
