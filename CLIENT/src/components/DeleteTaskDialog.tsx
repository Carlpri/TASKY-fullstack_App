import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';

interface DeleteTaskDialogProps {
  open: boolean;
  taskTitle: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  taskTitle,
  onClose,
  onDelete
}) => {
  return (
    <Dialog open={open} onClose={onClose}
    sx={{
       backdropFilter: 'blur(5px)'
    }}
    >
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete "{taskTitle}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
