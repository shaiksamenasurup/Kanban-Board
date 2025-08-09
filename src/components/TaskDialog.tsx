import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Task, Subtask } from '../types';

interface TaskDialogProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate || null);
      setPriority(task.priority);
      setSubtasks(task.subtasks);
    } else {
      setTitle('');
      setDescription('');
      setDueDate(null);
      setPriority('medium');
      setSubtasks([]);
    }
    setNewSubtaskTitle('');
  }, [task, open]);

  const handleSave = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: task?.id || uuidv4(),
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      priority,
      subtasks,
    };

    onSave(newTask);
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
      onClose();
    }
  };

  const addSubtask = () => {
    if (!newSubtaskTitle.trim()) return;

    const newSubtask: Subtask = {
      id: uuidv4(),
      title: newSubtaskTitle.trim(),
      completed: false,
    };

    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
  };

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(
      subtasks.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
  };

  const deleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#64748b';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          {task ? 'Edit Task' : 'Create New Task'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              sx={{ flex: 1 }}
            />

            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                label="Priority"
                renderValue={(value) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon sx={{ fontSize: 16, color: getPriorityColor(value) }} />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Box>
                )}
              >
                <MenuItem value="low">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon sx={{ fontSize: 16, color: getPriorityColor('low') }} />
                    Low
                  </Box>
                </MenuItem>
                <MenuItem value="medium">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon sx={{ fontSize: 16, color: getPriorityColor('medium') }} />
                    Medium
                  </Box>
                </MenuItem>
                <MenuItem value="high">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon sx={{ fontSize: 16, color: getPriorityColor('high') }} />
                    High
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Subtasks
              {subtasks.length > 0 && (
                <Chip
                  label={`${subtasks.filter(s => s.completed).length}/${subtasks.length}`}
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Add a subtask..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSubtask();
                  }
                }}
                sx={{ flexGrow: 1 }}
              />
              <Button
                onClick={addSubtask}
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                disabled={!newSubtaskTitle.trim()}
              >
                Add
              </Button>
            </Box>

            {subtasks.length > 0 && (
              <List dense sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
                {subtasks.map((subtask) => (
                  <ListItem key={subtask.id} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Checkbox
                        edge="start"
                        checked={subtask.completed}
                        onChange={() => toggleSubtask(subtask.id)}
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={subtask.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          color: subtask.completed ? 'text.secondary' : 'text.primary',
                        },
                      }}
                    />
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => deleteSubtask(subtask.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        {task && onDelete && (
          <Button
            onClick={handleDelete}
            color="error"
            variant="outlined"
            sx={{ mr: 'auto' }}
          >
            Delete Task
          </Button>
        )}
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!title.trim()}
        >
          {task ? 'Update' : 'Create'} Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;