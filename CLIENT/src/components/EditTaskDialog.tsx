
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';

interface EditTaskDialogProps {
  open: boolean;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
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
        <Box component="form" sx={{ 
            mt: 2}}>
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
                marginBottom: '.3rem',
                height: '100px', 
                padding: '0.5rem',
                borderRadius: '4px',
                borderTop: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                transition: 'border-color 0.3s ease',
             }}
          />
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
