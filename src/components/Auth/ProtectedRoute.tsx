import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import type { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to welcome page if not authenticated
  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  // Check role-based access if requiredRoles is provided
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Redirect to appropriate page based on user role
    switch (user.role) {
      case 'engineer':
        return <Navigate to="/engineering" replace />;
      case 'driver':
        return <Navigate to="/transport" replace />;
      case 'client':
        return <Navigate to="/projects" replace />;
      case 'admin':
      case 'construction_manager':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  // If everything passes, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
