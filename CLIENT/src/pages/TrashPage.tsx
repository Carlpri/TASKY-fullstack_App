import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
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
  Paper,
  Fab
} from '@mui/material';
import {
  Add,
  RestoreFromTrash,
  Delete,
  AccessTime,
  Warning
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

const TrashPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {

  const fetchDeletedTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks?status=deleted`);
      setTasks(response.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch deleted tasks');
    } finally {
      setLoading(false);
    }
  };
  
    fetchDeletedTasks();
  }, [API_URL]);

  const handleRestore = async (taskId: string) => {
    try {
      await axios.patch(`${API_URL}/tasks/restore/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to restore task');
    }
  };

  const handlePermanentDelete = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to permanently delete task');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
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
          Trash
        </Typography>
        <Typography variant="h6" color="text.main">
          Recover or permanently delete your removed tasks
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning sx={{ color: '#bd3f3fff' }} />
          <Typography variant="body2" sx={{ 
            color: '#685009ff',
            fontWeight:'500'
             }}>
            Items in trash will be deleted after 30 days
          </Typography>
        </Box>
      </Paper>

      {tasks.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <RestoreFromTrash sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              There is no deleted tasks to recover
            </Typography>
            <br />
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
            key={task.id}
            >
            <Card sx={{  display:'flex',
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
                <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mb: 2,
                   }}>
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
                          Deleted: {formatDate(task.dateUpdated)}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Deleted" 
                        size="small" 
                        color="error" 
                        variant="outlined"
                      />
                      {task.isCompleted && (
                        <Chip 
                          label="Was Completed" 
                          size="small" 
                          color="success" 
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<RestoreFromTrash />}
                  onClick={() => handleRestore(task.id)}
                  sx={{ color: '#48bb78' }}
                >
                  Restore
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handlePermanentDelete(task.id)}
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

export default TrashPage; 