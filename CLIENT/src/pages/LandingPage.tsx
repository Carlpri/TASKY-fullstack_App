import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import { 
  Assignment, 
  CheckCircle, 
  Delete, 
  Person,
  Add
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/tasks" replace />;
  }

  const features = [
    {
      icon: <Assignment sx={{ fontSize: 40, color: '#667eea' }} />,
      title: 'Create Tasks',
      description: 'Easily create and organize your tasks with titles and descriptions'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: '#48bb78' }} />,
      title: 'Track Progress',
      description: 'Mark tasks as completed and keep track of your accomplishments'
    },
    {
      icon: <Delete sx={{ fontSize: 40, color: '#ed8936' }} />,
      title: 'Smart Trash',
      description: 'Recover accidentally deleted tasks with our trash system'
    },
    {
      icon: <Person sx={{ fontSize: 40, color: '#9f7aea' }} />,
      title: 'Personal Profile',
      description: 'Customize your profile with an avatar and personal information'
    }
  ];

  const sampleTasks = [
    {
      title: 'Complete Project',
      description: 'Finish the final documentation for the client project',
      status: 'Pending',
      completed: false
    },
    {
      title: 'Review Code',
      description: 'Review pull requests for the team',
      status: 'Done',
      completed: true
    },
    {
      title: 'Plan Stakeholders Meeting',
      description: 'Schedule a team meeting for next week',
      status: 'Pending',
      completed: false
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #bccbe2ff 0%, #7551b8ff 100%)',
      py: 3
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "Lobster",
                  letterSpacing:"4px"
                }}
              >
                Boost your{' '}
                <Box component="span" sx={{ color: '#667eea' }}>
                  Productivity
                </Box>
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.main" 
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                The ultimate task management application that helps you organize your life with ease.
                Create✍🏾, track 🛤️, and complete✔️ your tasks in TASKY.
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        textAlign: 'center',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ mb: 1 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h5" 
                        sx={{ 
                          mb: 1, 
                          fontWeight: 550,
                          fontFamily: "Lobster",
                           }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box 
              sx={{
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap', 
                position: 'fixed',
                top: 30,
                right: 30,
                justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    color:'#ffff',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                    px: 3,
                    py: 1.5
                  }}
                >
                  Start for free
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#2f4dd1ff',
                    color: '#ffffffff',
                    '&:hover': {
                      borderColor: '#5a6fd8',
                      backgroundColor: 'rgba(102, 126, 234, 0.04)'
                    },
                    px: 3,
                    py: 1.5
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  maxWidth: 400, 
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h5" sx={{ 
                  mb: 2, 
                  color:'black',
                  fontWeight: 550, 
                  textAlign: 'center',
                  fontFamily: "Lobster",
                   }}>
                  Sample Tasks
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {sampleTasks.map((task, index) => (
                    <Card 
                      key={index}
                      sx={{ 
                        borderLeft: 4,
                        borderColor: task.completed ? '#48bb78' : '#667eea',
                        opacity: task.completed ? 0.8 : 1,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600,
                             }}>
                            {task.title}
                          </Typography>
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 10,
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              backgroundColor: task.completed ? '#c6f6d5' : '#fed7d7',
                              color: task.completed ? '#2f855a' : '#c53030'
                            }}
                          >
                            {task.status}
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid  >

          <Grid item xs={12} md={6}  >
            <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  background: 'linear-gradient(135deg, #7726c9ff 0%,  #445fd4ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "Lobster",
                  letterSpacing:"4px"
                }}
              >
                Customer{' '}
                <Box component="span" sx={{ color: '#5825b6ff' }}>
                  Reviews
                </Box>
              </Typography>
              <Typography 
                variant="h6" 
                color="text.main" 
                sx={{ mb: 2, lineHeight: 1.6 }}
              >
                What are our customers saying about us?
              </Typography>
            <Card 
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3
                        }
                      }}
            >
              <CardContent>
                <Typography>
                      I have improved my productivity since I started using TASKY app to manage my tasks. Nearly I have been productive 75% more.
                </Typography>
              </CardContent>
            </Card >
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 