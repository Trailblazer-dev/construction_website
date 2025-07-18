import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Login } from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import ProjectManagement from './pages/ProjectManagement';
import TransportLogistics from './pages/TransportLogistics';
import EngineeringModule from './pages/EngineeringModule';
import UserManagement from './pages/UserManagement';
import TasksPage from './pages/TasksPage';
import IssuesPage from './pages/IssuesPage';
import DocumentsPage from './pages/DocumentsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ClientLandingPage from './pages/ClientLandingPage';
import WelcomePage from './pages/WelcomePage';
import EngineerLandingPage from './pages/EngineerLandingPage';
import DriverLandingPage from './pages/DriverLandingPage';
import { Menu } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRoles?: string[] }> = ({ children, requiredRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-earth-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Add role-based access control
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modified to properly handle non-authenticated users
  const getLandingPage = () => {
    if (!user) {
      return <WelcomePage />;
    }
    
    switch (user.role) {
      case 'engineer':
        return <EngineerLandingPage />;
      case 'driver':
        return <DriverLandingPage />;
      case 'client':
        return <ClientLandingPage />;
      case 'admin':
        return <UserManagement />;
      case 'construction_manager':
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-earth-50">
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
            
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-primary-600 text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </>
        )}
        
        {/* Main content - adjust width based on whether sidebar is shown */}
        <div className={`${user ? 'flex-1' : 'w-full'} overflow-auto`}>
          <main className={`${user ? 'p-5 md:p-8' : ''}`}>
            <Routes>
              {/* Updated routes to ensure welcome page is shown for non-authenticated users */}
              <Route path="/" element={getLandingPage()} />
              
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
                path="/engineer"
                element={
                  <ProtectedRoute requiredRoles={['engineer']}>
                    <EngineerLandingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/driver"
                element={
                  <ProtectedRoute requiredRoles={['driver']}>
                    <DriverLandingPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/client"
                element={
                  <ProtectedRoute requiredRoles={['client']}>
                    <ClientLandingPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <ProjectManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transport"
                element={
                  <ProtectedRoute>
                    <TransportLogistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineering"
                element={
                  <ProtectedRoute>
                    <EngineeringModule />
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
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
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
                path="/documents"
                element={
                  <ProtectedRoute>
                    <DocumentsPage />
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
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
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
