import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Truck, 
  Wrench, 
  Users, 
  Settings,
  BarChart3,
  FileText,
  AlertTriangle,
  Calendar,
  LogOut,
  type LucideIcon
} from 'lucide-react';
import type { UserRole } from '../../types';
import { useAuth } from '../../contexts/useAuth';
import { clsx } from 'clsx';

// Define the NavigationItem type for better type safety
interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'construction_manager', 'engineer', 'driver'],
  },
  {
    name: 'Client Dashboard',
    href: '/client-dashboard',
    icon: LayoutDashboard,
    roles: ['client'],
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    roles: ['admin', 'construction_manager', 'engineer', 'client'],
  },
  {
    name: 'Transport & Logistics',
    href: '/transport',
    icon: Truck,
    roles: ['admin', 'construction_manager', 'driver'],
  },
  {
    name: 'Engineering',
    href: '/engineering',
    icon: Wrench,
    roles: ['admin', 'construction_manager', 'engineer'],
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: Calendar,
    roles: ['admin', 'construction_manager', 'engineer'],
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    roles: ['admin', 'construction_manager', 'engineer', 'client'],
  },
  {
    name: 'Issues',
    href: '/issues',
    icon: AlertTriangle,
    roles: ['admin', 'construction_manager', 'engineer'],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'construction_manager', 'client'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'construction_manager'],
  },
];

export const SidebarNav: React.FC = () => {
  const { user, hasAnyRole, logout } = useAuth();
  const location = useLocation();

  // Filter navigation items based on user role
  const filteredNavigation = React.useMemo(() => 
    navigationItems.filter(item => 
      user && hasAnyRole(item.roles)
    ), [user, hasAnyRole]
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-full flex flex-col bg-charcoal-800 border-r border-charcoal-900">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-5 bg-charcoal-900 text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-lg">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-heading font-bold text-white">
              StratoPath
            </h1>
            <p className="text-sm text-gray-300 italic">Paving Tomorrow</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg",
                  isActive 
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm" 
                    : "text-gray-300 hover:bg-charcoal-700 hover:text-white",
                  "transition-all duration-200"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={clsx(
                  "flex items-center justify-center h-8 w-8 rounded-md mr-3",
                  isActive ? "bg-primary-500 text-white" : "bg-charcoal-700 text-gray-300 group-hover:bg-charcoal-600 group-hover:text-white",
                  "transition-colors duration-200"
                )}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="flex-1 truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      {user && (
        <div className="flex-shrink-0 p-4 border-t border-charcoal-700 bg-charcoal-900">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-300 capitalize">
                {user.role.replace('_', ' ')}
              </p>
            </div>
            <button 
              className="p-1.5 rounded-lg text-gray-300 hover:text-accent-500 hover:bg-charcoal-800 transition-colors"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
