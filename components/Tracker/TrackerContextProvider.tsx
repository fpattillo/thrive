import { ReactNode, createContext, useContext, useState } from 'react';
import { ChecklistItem, Task, TaskTag } from '../types/types';

interface TrackerContextType {
  rows: Task[];
  setRows: (rows: Task[]) => void;
  handleTagChange: (rowId: number, newTags: TaskTag[]) => void;
  handleProgressChange: (rowId: number, newProgress: number) => void;
  handleChecklistChange: (rowId: number, newChecklist: ChecklistItem[]) => void;
  handleGoalChange: (rowId: number, newGoal: number) => void;
}

const TrackerContext = createContext<TrackerContextType>({
  rows: [],
  setRows: () => {},
  handleTagChange: () => {},
  handleProgressChange: () => {},
  handleChecklistChange: () => {},
  handleGoalChange: () => {},
});

export const TrackerProvider = ({ children }: { children: ReactNode }) => {
  const [rows, setRows] = useState<Task[]>([]);

  const handleTagChange = (rowId: number, newTags: TaskTag[]) => {
    setRows(rows.map((row) => (row.id === rowId ? { ...row, tags: newTags } : row)));
  };
  const handleProgressChange = (rowId: number, newProgress: number) => {
    console.log('handleProgressChange', rowId, newProgress);
    console.log(
      'newRow',
      rows.map((row) => (row.id === rowId ? { ...row, progress: newProgress } : row)),
    );
    setRows(rows.map((row) => (row.id === rowId ? { ...row, progress: newProgress } : row)));
  };
  const handleChecklistChange = (rowId: number, newChecklist: ChecklistItem[]) => {
    setRows(rows.map((row) => (row.id === rowId ? { ...row, checklist: newChecklist } : row)));
  };
  const handleGoalChange = (rowId: number, newGoal: number) => {
    setRows(rows.map((row) => (row.id === rowId ? { ...row, goal: newGoal } : row)));
  };

  const trackerValue = {
    rows,
    setRows,
    handleTagChange,
    handleProgressChange,
    handleChecklistChange,
    handleGoalChange,
  };
  return <TrackerContext.Provider value={trackerValue}>{children}</TrackerContext.Provider>;
};

export const useTrackerContext = () => useContext(TrackerContext);
