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
  LogOut, // Add LogOut import
} from 'lucide-react';
import type { UserRole } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

const navigationItems: Array<{
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
}> = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'construction_manager', 'engineer', 'driver', 'client'],
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    roles: ['admin', 'construction_manager', 'engineer', 'client'],
  },
  {
    name: 'Logistics',
    href: '/logistics',
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
  const { user, hasAnyRole } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigationItems.filter(item => 
    user && hasAnyRole(item.roles)
  );

  return (
    <div className="h-full flex flex-col bg-white border-r border-earth-200">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-5 bg-primary-800 text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center shadow-lg">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-heading font-bold text-white">
              StratoPath
            </h1>
            <p className="text-sm text-primary-200 italic">Paving Tomorrow</p>
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
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-800 shadow-sm" 
                    : "text-earth-700 hover:bg-earth-100 hover:text-earth-900",
                  "transition-all duration-200"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={clsx(
                  "flex items-center justify-center h-8 w-8 rounded-md mr-3",
                  isActive ? "bg-primary-200 text-primary-700" : "bg-earth-100 text-earth-500 group-hover:bg-earth-200 group-hover:text-earth-700",
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
        <div className="flex-shrink-0 p-4 border-t border-earth-200 bg-earth-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-earth-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-earth-500 capitalize">
                {user.role.replace('_', ' ')}
              </p>
            </div>
            <button 
              className="p-1.5 rounded-lg text-earth-500 hover:text-danger-600 hover:bg-danger-50 transition-colors"
              onClick={() => {}} // Connect to logout function
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
