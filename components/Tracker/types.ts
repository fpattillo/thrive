export interface RowProps {
  id: number;
  name: string;
  tags: TaskTag[];
}

export interface NumericTaskRow extends RowProps {
  type: 'numeric';
  goal: number;
  progress: number;
}

export interface ChecklistTaskRow extends RowProps {
  type: 'checklist';
  checklist: ChecklistItem[];
}

export type TaskRow = NumericTaskRow | ChecklistTaskRow;

export interface TaskTag {
  text: string;
  color: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}
