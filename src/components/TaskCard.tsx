import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    handleMenuClose();
  };

  const getDueDateColor = (dueDate: typeof task.dueDate) => {
    if (!dueDate) return 'default';
    
    const now = dayjs();
    const daysDiff = dueDate.diff(now, 'day');
    
    if (daysDiff < 0) return 'error';
    if (daysDiff <= 1) return 'warning';
    if (daysDiff <= 3) return 'info';
    return 'success';
  };

  const getDueDateText = (dueDate: typeof task.dueDate) => {
    if (!dueDate) return '';
    
    const now = dayjs();
    const daysDiff = dueDate.diff(now, 'day');
    
    if (daysDiff < 0) return `${Math.abs(daysDiff)}d overdue`;
    if (daysDiff === 0) return 'Due today';
    if (daysDiff === 1) return 'Due tomorrow';
    return `Due in ${daysDiff}d`;
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#64748b';
    }
  };

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            cursor: 'grab',
            transform: snapshot.isDragging 
              ? 'rotate(5deg) scale(1.05)' 
              : 'rotate(0deg) scale(1)',
            transition: 'transform 0.2s ease',
            backgroundColor: snapshot.isDragging ? '#f8fafc' : 'background.paper',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, flexGrow: 1 }}>
                {task.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FlagIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: getPriorityColor(task.priority),
                    opacity: 0.8
                  }} 
                />
                <IconButton
                  size="small"
                  onClick={handleMenuOpen}
                  sx={{ p: 0.5 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {task.description && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, lineHeight: 1.4 }}
              >
                {task.description}
              </Typography>
            )}

            {task.subtasks.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Subtasks ({completedSubtasks}/{totalSubtasks})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {Math.round(progress)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: progress === 100 ? '#16a34a' : '#6366f1',
                    },
                  }}
                />
              </Box>
            )}

            {task.dueDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Chip
                  icon={<ScheduleIcon />}
                  label={getDueDateText(task.dueDate)}
                  size="small"
                  color={getDueDateColor(task.dueDate)}
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    '& .MuiChip-icon': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
            )}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                Delete
              </MenuItem>
            </Menu>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;