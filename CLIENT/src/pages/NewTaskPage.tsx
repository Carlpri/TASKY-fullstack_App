import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const API_URL = process.env.REACT_APP_API_URL;
const PRIORITY_OPTIONS = [
  { value: 'VERY_URGENT', label: 'Very Urgent' },
  { value: 'URGENT', label: 'Urgent' },
  { value: 'IMPORTANT', label: 'Important' }
];

const NewTaskPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'IMPORTANT',
    deadline: null as Date | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as string]: value }));
  };

  const handlePriorityChange = (e: any) => {
    setFormData(prev => ({ ...prev, priority: e.target.value }));
  };

  const handleDeadlineChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, deadline: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/api/tasks`, {
        ...formData,
        deadline: formData.deadline ? formData.deadline.toISOString() : undefined
      });
      setSuccess(true);
      setFormData({ title: '', description: '', priority: 'IMPORTANT', deadline: null });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/tasks')}
          sx={{ mb: 2, color: 'black', fontWeight: 'bold' }}
        >
          Back to Tasks
        </Button>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 550, fontFamily: 'Lobster' }}>
          Create your new Task
        </Typography>
        <Typography variant="h6" color="text.main">
          Add a new task to your list and stay organized
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
            placeholder="Enter a descriptive title for your task"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
            placeholder="Provide a detailed description of what needs to be done"
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              name="priority"
              value={formData.priority}
              label="Priority"
              onChange={handlePriorityChange}
              required
            >
              {PRIORITY_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Deadline"
              value={formData.deadline}
              onChange={(value)=>handleDeadlineChange(value as Date | null)}
              ampm={false}
              minDate={new Date()}
              renderInput={(params)=>(
                <TextField {...params} fullWidth sx={{mb:3}}/>
              )}
                />
          </LocalizationProvider>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Save />}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                px: 4,
                py: 1.5
              }}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/tasks')}
              disabled={loading}
              sx={{ px: 4, py: 1.5 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Task created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewTaskPage; 