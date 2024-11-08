type GeneralTask = {
  id: number;
  name: string;
  tags: TaskTag[];
};

export type NumericTask = GeneralTask & {
  variant: 'numeric';
  progress: number;
  goal: number;
};

export interface ChecklistItem {
  id: number;
  name: string;
  completed: boolean;
}

export type ChecklistTask = GeneralTask & {
  variant: 'checklist';
  subtasks: ChecklistItem[];
};

export type Task = NumericTask | ChecklistTask;

export interface Period {
  id: number;
  name: string;
  duration: number;
  completion: number;
  tasks: Task[];
}

export interface TaskTag {
  text: string;
  color_code: string;
}
