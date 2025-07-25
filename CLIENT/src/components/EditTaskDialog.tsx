import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


interface EditTaskDialogProps {
  open: boolean;
  title: string;
  description: string;
  deadline: Date | null;
  priority: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDeadlineChange: (value: Date | null) => void;
  onPriorityChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  title,
  description,
  deadline,
  priority,
  onTitleChange,
  onDescriptionChange,
  onDeadlineChange,
  onPriorityChange,
  onClose,
  onSave
}) => {
  return (
    <Dialog open={open} onClose={onClose}
      sx={{
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #516de7ff, #9763ccff)',
          color: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          margin: '1px 16px',
        }}
      >
        <Box component="form" sx={{ mt: 2 }}>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Title"
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '4px',
              borderTop: '1px solid #ccc',
              borderLeft: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transition: 'border-color 0.3s ease',
            }}
          />

          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description"
            rows={4}
            style={{
              width: '100%',
              marginBottom: '.7rem',
              height: '100px',
              padding: '0.5rem',
              borderRadius: '4px',
              borderTop: '1px solid #ccc',
              borderLeft: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transition: 'border-color 0.3s ease',
            }}
          />

          
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                          label="Deadline"
                          value={deadline}
                          onChange={(newValue)=> onDeadlineChange(newValue)}
                          ampm={false} 
                          minDate={new Date()}
                          renderInput={(params)=>(
                            <TextField {...params} fullWidth sx={{ mb:3, backgroundColor:'rgba(158, 151, 151, 0.1)', borderRadius:'4px'}}/>
                          )}                       
             />
              </LocalizationProvider>
          
           

          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel id="priority-label" sx={{ color: '#7209dbff' }}>Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              onChange={(e) => onPriorityChange(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                color:'black'
              }}
            >
              <MenuItem value="IMPORTANT">Important</MenuItem>
              <MenuItem value="URGENT">Urgent</MenuItem>
              <MenuItem value="VERY_URGENT">Very Urgent</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 24px'
        }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
