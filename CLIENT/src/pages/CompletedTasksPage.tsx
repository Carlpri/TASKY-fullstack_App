import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab
} from '@mui/material';
import {
  Edit,
  Add,
  Delete,
  CheckCircle,
  AccessTime,
  RestoreFromTrash
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

const CompletedTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks?status=completed');
      setTasks(response.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch completed tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkIncomplete = async (taskId: string) => {
    try {
      await axios.patch(`/api/tasks/incomplete/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to mark task as incomplete');
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" 
        sx={{ 
          mb: 1, 
          fontWeight: 550,
          fontFamily: "Lobster",
           }}>
          Completed Tasks
        </Typography>
        <Typography variant="h6" color="text.main">
          View and manage your completed tasks
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
            <CheckCircle sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Complete some tasks to see them here
            </Typography>
            <br />
            <Button
              variant="contained"
              onClick={() => navigate('/tasks')}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              View Active Tasks
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ 
          display: 'flex',
          flexWrap:'wrap',
          justifyContent:'center',
          gap: 2 }}>
          {tasks.map((task) => (
            <Box key={task.id}
            sx={{
              flex: '1 1 100%',
              maxWidth :{
                xs: '100%',
                sm:'100%',
                md:'48%',
                lg:'48%'
              },
            }}
            >
            <Card  sx={{ 
              height:'100%',
              borderLeft: 4, 
              borderColor: '#48bb78',
              opacity: 0.9,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          Completed: {formatDate(task.dateUpdated)}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Completed" 
                        size="small" 
                        color="success" 
                        icon={<CheckCircle />}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<RestoreFromTrash />}
                  onClick={() => handleMarkIncomplete(task.id)}
                  sx={{ color: '#ed8936' }}
                >
                  Mark Incomplete
                </Button>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => navigate(`/edit-task/${task.id}`)}
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
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => taskToDelete && handleDelete(taskToDelete.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

    </Container>
  );
};

export default CompletedTasksPage; 