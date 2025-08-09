import dayjs from 'dayjs';
import { KanbanState } from '../types';

export const initialData: KanbanState = {
  columns: {
    'not-started': {
      id: 'not-started',
      title: 'Not Started',
      tasks: [
        {
          id: '1',
          title: 'Research Market Trends',
          description: 'Analyze current market conditions and competitor strategies',
          dueDate: dayjs().add(7, 'day'),
          subtasks: [],
          priority: 'medium'
        },
        {
          id: '2',
          title: 'Update Portfolio',
          description: 'Add recent projects and update skills section',
          dueDate: dayjs().add(3, 'day'),
          subtasks: [
            { id: '2-1', title: 'Add new projects', completed: false },
            { id: '2-2', title: 'Update skills', completed: false }
          ],
          priority: 'high'
        }
      ]
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Design System Documentation',
          description: 'Create comprehensive documentation for the design system',
          dueDate: dayjs().add(5, 'day'),
          subtasks: [
            { id: '3-1', title: 'Component guidelines', completed: true },
            { id: '3-2', title: 'Color palette', completed: true },
            { id: '3-3', title: 'Typography guide', completed: false }
          ],
          priority: 'medium'
        }
      ]
    },
    'blocked': {
      id: 'blocked',
      title: 'Blocked',
      tasks: [
        {
          id: '4',
          title: 'API Integration',
          description: 'Waiting for API documentation from backend team',
          dueDate: dayjs().add(1, 'day'),
          subtasks: [],
          priority: 'high'
        }
      ]
    },
    'done': {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Setup Development Environment',
          description: 'Configure development tools and environment',
          dueDate: dayjs().subtract(2, 'day'),
          subtasks: [
            { id: '5-1', title: 'Install dependencies', completed: true },
            { id: '5-2', title: 'Configure linting', completed: true }
          ],
          priority: 'low'
        },
        {
          id: '6',
          title: 'Taxes',
          description: 'Complete annual tax filing',
          dueDate: dayjs().subtract(1, 'day'),
          subtasks: [
            { id: '6-1', title: 'Gather documents', completed: true },
            { id: '6-2', title: 'Fill out forms', completed: true },
            { id: '6-3', title: 'Submit filing', completed: true }
          ],
          priority: 'high'
        }
      ]
    }
  },
  columnOrder: ['not-started', 'in-progress', 'blocked', 'done']
};