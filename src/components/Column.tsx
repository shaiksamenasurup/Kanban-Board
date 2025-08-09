import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, Chip } from '@mui/material';
import TaskCard from './TaskCard';
import { Column as ColumnType, Task } from '../types';

interface ColumnProps {
  column: ColumnType;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const getColumnColor = (columnId: string) => {
  const colors = {
    'not-started': '#f1f5f9',
    'in-progress': '#fef3c7',
    'blocked': '#fee2e2',
    'done': '#dcfce7'
  };
  return colors[columnId as keyof typeof colors] || '#f1f5f9';
};

const getHeaderColor = (columnId: string) => {
  const colors = {
    'not-started': '#64748b',
    'in-progress': '#d97706',
    'blocked': '#dc2626',
    'done': '#16a34a'
  };
  return colors[columnId as keyof typeof colors] || '#64748b';
};

const Column: React.FC<ColumnProps> = ({ column, onEditTask, onDeleteTask }) => {
  return (
    <Box sx={{ minWidth: 300, width: 300 }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: getColumnColor(column.id),
          borderRadius: 3,
          p: 2,
          minHeight: '600px',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              color: getHeaderColor(column.id)
            }}
          >
            {column.title}
          </Typography>
          <Chip 
            label={column.tasks.length}
            size="small"
            sx={{
              backgroundColor: getHeaderColor(column.id),
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                minHeight: 100,
                borderRadius: 2,
                backgroundColor: snapshot.isDraggingOver 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'transparent',
                transition: 'background-color 0.2s ease',
                p: 1
              }}
            >
              {column.tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Paper>
    </Box>
  );
};

export default Column;