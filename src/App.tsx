import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/useAuth';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import ProjectManagement from './pages/ProjectManagement';
import TransportLogistics from './pages/TransportLogistics';
import EngineeringModule from './pages/EngineeringModule';
import UserManagement from './pages/UserManagement';
import WelcomePage from './pages/WelcomePage';
import DocumentsPage from './pages/DocumentsPage';
import IssuesPage from './pages/IssuesPage';
import ReportsPage from './pages/ReportsPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import ClientLandingPage from './pages/ClientLandingPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modified to properly handle non-authenticated users
  const getLandingPage = () => {
    if (!user) {
      return <Navigate to="/welcome" replace />;
    }
    
    switch (user.role) {
      case 'engineer':
        return <Navigate to="/engineering" replace />;
      case 'driver':
        return <Navigate to="/transport" replace />;
      case 'client':
        return <Navigate to="/client-dashboard" replace />;
      case 'admin':
      case 'construction_manager':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-secondary-800">
        {/* Only render the sidebar and menu toggle if user is logged in */}
        {user && (
          <>
            {/* Desktop sidebar */}
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
              isMobile={false} 
            />
            
            {/* Mobile sidebar */}
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
              isMobile={true} 
            />
          </>
        )}
        
        {/* Main content - adjust width based on whether sidebar is shown */}
        <div className={`${user ? 'flex-1' : 'w-full'} overflow-auto flex flex-col`}>
          {/* Add Header component for authenticated users */}
          {user && (
            <Header 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
              isSidebarOpen={sidebarOpen} 
            />
          )}
          
          <main className={`${user ? 'p-5 md:p-8 flex-1' : ''}`}>
            <Routes>
              {/* Updated route to ensure landing page is shown for root path */}
              <Route path="/" element={getLandingPage()} />
              
              {/* Welcome page before login */}
              <Route path="/welcome" element={<WelcomePage />} />
              
              <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
              
              {/* Make sure all protected routes use the ProtectedRoute component */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/projects/*"
                element={
                  <ProtectedRoute>
                    <ProjectManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transport/*"
                element={
                  <ProtectedRoute>
                    <TransportLogistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineering/*"
                element={
                  <ProtectedRoute>
                    <EngineeringModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <DocumentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/issues"
                element={
                  <ProtectedRoute>
                    <IssuesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client-dashboard"
                element={
                  <ProtectedRoute requiredRoles={['client']}>
                    <ClientLandingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all redirect */}
              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

