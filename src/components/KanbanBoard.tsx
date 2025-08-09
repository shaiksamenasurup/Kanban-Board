import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Box, Container, Typography, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Column from './Column';
import TaskDialog from './TaskDialog';
import { KanbanState, Task, ColumnId } from '../types';
import { initialData } from '../data/initialData';

const STORAGE_KEY = 'kanban-board-data';

const KanbanBoard: React.FC = () => {
  const [state, setState] = useState<KanbanState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = state.columns[source.droppableId as ColumnId];
    const destColumn = state.columns[destination.droppableId as ColumnId];

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedTask);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setState({
        ...state,
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
          [destColumn.id]: {
            ...destColumn,
            tasks: destTasks,
          },
        },
      });
    }
  };

  const handleCreateTask = (task: Task) => {
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        'not-started': {
          ...state.columns['not-started'],
          tasks: [...state.columns['not-started'].tasks, task],
        },
      },
    };
    setState(newState);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const newColumns = { ...state.columns };
    
    for (const columnId of state.columnOrder) {
      const column = newColumns[columnId];
      const taskIndex = column.tasks.findIndex(task => task.id === updatedTask.id);
      
      if (taskIndex !== -1) {
        newColumns[columnId] = {
          ...column,
          tasks: column.tasks.map((task, index) =>
            index === taskIndex ? updatedTask : task
          ),
        };
        break;
      }
    }

    setState({
      ...state,
      columns: newColumns,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const newColumns = { ...state.columns };
    
    for (const columnId of state.columnOrder) {
      const column = newColumns[columnId];
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        newColumns[columnId] = {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId),
        };
        break;
      }
    }

    setState({
      ...state,
      columns: newColumns,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        fontWeight: 600, 
        color: 'text.primary',
        mb: 4,
        textAlign: 'center'
      }}>
        Kanban Board
      </Typography>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ 
          display: 'flex', 
          gap: 3,
          overflow: 'auto',
          pb: 2,
          minHeight: '70vh'
        }}>
          {state.columnOrder.map(columnId => (
            <Column
              key={columnId}
              column={state.columns[columnId]}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </Box>
      </DragDropContext>

      <Fab
        color="primary"
        aria-label="add task"
        sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32,
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <TaskDialog
        open={dialogOpen}
        task={editingTask}
        onClose={handleCloseDialog}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        onDelete={editingTask ? handleDeleteTask : undefined}
      />
    </Container>
  );
};

export default KanbanBoard;