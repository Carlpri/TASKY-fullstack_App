import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditTaskDialog from "../components/EditTaskDialog";
import DeleteTaskDialog from "../components/DeleteTaskDialog";

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
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  CheckCircle,
  Assignment,
} from "@mui/icons-material";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  dateCreated: string;
  dateUpdated: string;
  priority?: "VERY_URGENT" | "URGENT" | "IMPORTANT";
  deadline: Date | string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDeadline, setEditDeadline] = useState<Date | null>(null);
  const [editPriority, setEditPriority] = useState("");

  const navigate = useNavigate();

  const PRIORITY_OPTIONS = [
    { value: "VERY_URGENT", label: "Very Urgent" },
    { value: "URGENT", label: "Urgent" },
    { value: "IMPORTANT", label: "Important" },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/tasks?status=active");
      setTasks(response.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId: string) => {
    try {
      await axios.patch(`/api/tasks/complete/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to mark task as complete"
      );
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

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
      setError(err.response?.data?.message || "Failed to edit task");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 550,
            fontFamily: "Lobster",
            letterSpacing: "2px",
          }}
        >
          My Tasks
        </Typography>
        <Typography variant="h6" color="text.main">
          Manage your active tasks and stay organized
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {tasks.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 6 }}>
          <CardContent>
            <Assignment sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              You don't have any tasks yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by creating your first task to get organized
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/new-task")}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                },
              }}
            >
              Create Your First Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "center", flexWrap: "wrap" }}
        >
          {tasks.map((task) => {
            const formattedDeadline = new Date(
              task.deadline
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Grid item xs={12} sm={12} md={6} lg={6} key={task.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: 4,
                    borderColor: "#667eea",
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1, position: "relative" }}>
                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
                          {task.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {task.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.4,
                              mt: "10px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="white"
                              sx={{
                                fontWeight: "500",
                              }}
                            >
                              <b>Created:</b> {formatDate(task.dateCreated)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="error"
                              sx={{
                                fontWeight: "700",
                              }}
                            >
                              Deadline: {formattedDeadline}
                            </Typography>
                          </Box>
                          <Chip
                            label="Active"
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        <Chip
                          label={
                            PRIORITY_OPTIONS.find(
                              (p) => p.value === task.priority
                            )?.label || "N/A"
                          }
                          sx={{
                            position: "absolute",
                            right: "10px",
                            top: "0px",
                            fontSize: "1rem",
                          }}
                          color="secondary"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      gap: 1,
                      mt: "auto",
                      paddingBottom: 2,
                      paddingX: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => handleMarkComplete(task.id)}
                      sx={{ color: "#48bb78", fontWeight: "600" }}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => {
                        setTaskToEdit(task);
                        setEditedTitle(task.title);
                        setEditedDescription(task.description);
                        setEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setTaskToDelete(task);
                        setDeleteDialogOpen(true);
                      }}
                      sx={{ color: "#e53e3e" }}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Fab
        color="primary"
        aria-label="add task"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
          },
        }}
        onClick={() => navigate("/new-task")}
      >
        <Add />
      </Fab>

      <EditTaskDialog
        open={editDialogOpen}
        title={editedTitle}
        description={editedDescription}
        priority={editPriority}
        deadline={editDeadline}
        onTitleChange={setEditedTitle}
        onDescriptionChange={setEditedDescription}
        onPriorityChange={setEditPriority}
        onDeadlineChange={setEditDeadline}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleEdit}
      />

      <DeleteTaskDialog
        open={deleteDialogOpen}
        taskTitle={taskToDelete?.title || ""}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={() => taskToDelete && handleDelete(taskToDelete.id)}
      />
    </Container>
  );
};

export default TasksPage;
