import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import NewTaskPage from './pages/NewTaskPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import TrashPage from './pages/TrashPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import { createTheme,ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette:{
    mode:'dark',
    primary:{
      main: '#d6c8f0ff'
    }
  }
})

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/tasks" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TasksPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/new-task" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewTaskPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/completed-tasks" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CompletedTasksPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/trash" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TrashPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 