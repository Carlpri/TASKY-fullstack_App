import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTaskDialog from '../components/EditTaskDialog';
import DeleteTaskDialog from '../components/DeleteTaskDialog';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Fab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  CheckCircle,
  Assignment,
  AccessTime
} from '@mui/icons-material';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  dateCreated: string;
  dateUpdated: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks?status=active');
      setTasks(response.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId: string) => {
    try {
      await axios.patch(`/api/tasks/complete/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to mark task as complete');
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const handleEdit = async () => {
  if (!taskToEdit) return;
  try {
    await axios.patch(`/api/tasks/${taskToEdit.id}`, {
      title: editedTitle,
      description: editedDescription,
    });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, title: editedTitle, description: editedDescription }
          : task
      )
    );
    setEditDialogOpen(false);
    setTaskToEdit(null);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to edit task');
  }
};






  return (

    

    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
          My Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your active tasks and stay organized
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {tasks.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              You don't have any tasks yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by creating your first task to get organized
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/new-task')}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Create Your First Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3} 
        sx={{ 
        maxWidth: '100%',
        justifyContent:'center',
        display:'flex',
        flexWrap:'wrap'

        }}>
          {tasks.map((task) => (
            <Grid 
            item 
            xs={12} 
            sm={12} 
            md={6} 
            lg={6} 
            key={task.id}>
            <Card  sx={{ 
              display:'flex',
              flexDirection:'column',
              borderLeft: 4, 
              borderColor: '#667eea',
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 5
              },              
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                   mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection:'column',
                        alignItems: 'center',
                        gap: 0.5,
                         }}>
                        
                        <Typography variant="caption" color="text.secondary"
                        sx={{alignText:'center',}}
                        >
                          <AccessTime sx={{ 
                          fontSize: 16, 
                          color:'white'
                           }} /> 
                           <br />
                          <b>Created:</b> <i>{formatDate(task.dateCreated)}</i>
                        </Typography>
                        <Typography variant="caption" color="red"
                        sx={{alignText:'center'}}
                        >
                          
                          <b>Deadline:</b> <i>{formatDate(task.dateCreated)}</i>
                        </Typography>
                      </Box>
                      <Chip 
                        label="Active" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ 
                gap: 1,
                mt:'auto',
                paddingBottom: 2,
                paddingX: 2,
                justifyContent: 'flex-start'
                 }}>
                <Button
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => handleMarkComplete(task.id)}
                  sx={{ color: '#48bb78',
                    fontWeight:"600",
                    textAlign:"left"
                   }}
                >
                  Mark Complete
                </Button>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() =>{
                    setTaskToEdit(task);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description)
                    setEditDialogOpen(true);
                  }}
                  
                >
                  Edit
                </Button>
                <IconButton
                  size="small"
                  onClick={() => openDeleteDialog(task)}
                  sx={{ color: '#e53e3e' }}
                >
                  <Delete />
                </IconButton>

                                 
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      )}

      {/* CREATING A TRASH BTN*/}
      <Fab
        color="primary"
        aria-label="add task"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
          },
        }}
        onClick={() => navigate('/new-task')}
      >
        <Add />
      </Fab>


  <EditTaskDialog
  open={editDialogOpen}
  title={editedTitle}
  description={editedDescription}
  onTitleChange={setEditedTitle}
  onDescriptionChange={setEditedDescription}
  onClose={() => setEditDialogOpen(false)}
  onSave={handleEdit}
/>

<DeleteTaskDialog
  open={deleteDialogOpen}
  taskTitle={taskToDelete?.title || ''}
  onClose={() => setDeleteDialogOpen(false)}
  onDelete={() => taskToDelete && handleDelete(taskToDelete.id)}
/>

    </Container>
  );
};

export default TasksPage; 