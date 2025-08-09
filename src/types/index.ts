import { Dayjs } from 'dayjs';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Dayjs;
  subtasks: Subtask[];
  priority: 'low' | 'medium' | 'high';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export type ColumnId = 'not-started' | 'in-progress' | 'blocked' | 'done';

export interface KanbanState {
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
}