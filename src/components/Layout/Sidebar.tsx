import React, { useMemo } from 'react';
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
  X,
  HardHat,
  PlusCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import type { UserRole } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

interface SidebarProps {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
  badge?: string | number;
  category?: 'main' | 'management' | 'resources' | 'admin';
  description: string; // Added description field
}

// Update the navigationItems array to ensure admin items are properly marked
const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'construction_manager', 'engineer', 'driver', 'client'],
    category: 'main',
    description: 'Overview of projects, tasks, and key performance indicators'
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    roles: ['admin', 'construction_manager', 'engineer', 'client'],
    badge: 3,
    category: 'main',
    description: 'Manage construction projects, timelines, and documentation'
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: Calendar,
    roles: ['admin', 'construction_manager', 'engineer'],
    badge: 5,
    category: 'main',
    description: 'Track and manage assigned tasks and schedules'
  },
  {
    name: 'Logistics',
    href: '/transport',
    icon: Truck,
    roles: ['admin', 'construction_manager', 'driver'],
    category: 'management',
    description: 'Fleet management, delivery tracking, and material scheduling'
  },
  {
    name: 'Engineering',
    href: '/engineering',
    icon: Wrench,
    roles: ['admin', 'construction_manager', 'engineer'],
    category: 'management',
    description: 'Technical designs, blueprints, and engineering workflows'
  },
  {
    name: 'Issues',
    href: '/issues',
    icon: AlertTriangle,
    roles: ['admin', 'construction_manager', 'engineer'],
    badge: 2,
    category: 'management',
    description: 'Track and resolve project issues and safety concerns'
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    roles: ['admin', 'construction_manager', 'engineer', 'client'],
    category: 'resources',
    description: 'Access and manage all project-related documentation'
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'construction_manager', 'client'],
    category: 'resources',
    description: 'Generate and view reports on project performance and finances'
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin'],  // Make sure this is restricted to admin only
    category: 'admin',
    description: 'Manage user accounts, roles, and permissions'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'construction_manager'],
    category: 'admin',
    description: 'Configure system settings and preferences'
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, isOpen, onClose }) => {
  const { user, hasAnyRole, logout } = useAuth();
  const location = useLocation();

  // Make sure to properly filter navigation items based on user role
  const groupedNavigation = useMemo(() => {
    const filtered = navigationItems.filter(item => 
      user && hasAnyRole(item.roles)
    );
    
    return {
      main: filtered.filter(item => item.category === 'main'),
      management: filtered.filter(item => item.category === 'management'),
      resources: filtered.filter(item => item.category === 'resources'),
      admin: filtered.filter(item => item.category === 'admin')
    };
  }, [user, hasAnyRole]);

  // Determine the active category for the accordion effect
  const activeCategory = useMemo(() => {
    const currentPath = location.pathname;
    const activeItem = navigationItems.find(item => item.href === currentPath);
    return activeItem?.category;
  }, [location.pathname]);

  const renderNavGroup = (items: NavigationItem[], groupTitle?: string) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-4">
        {groupTitle && (
          <h3 className="px-4 mb-2 text-xs font-semibold text-white uppercase tracking-wider">
            {groupTitle}
          </h3>
        )}
        <div className="space-y-1 px-2">
          {items.map((item) => {
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
                onClick={isMobile ? onClose : undefined}
                aria-current={isActive ? 'page' : undefined}
                title={item.description} // Added tooltip with description
              >
                <div className={clsx(
                  "flex items-center justify-center h-8 w-8 rounded-md mr-3",
                  isActive ? "bg-primary-200 text-primary-700" : "bg-earth-100 text-earth-500 group-hover:bg-earth-200 group-hover:text-earth-700",
                  "transition-colors duration-200"
                )}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="flex-1 truncate">{item.name}</span>
                
                {item.badge && (
                  <span className={clsx(
                    "ml-2 px-2 py-0.5 text-xs rounded-full",
                    isActive
                      ? "bg-primary-200 text-primary-800" 
                      : "bg-earth-200 text-earth-700"
                  )}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={clsx(
                  "ml-1 h-4 w-4 opacity-0 group-hover:opacity-100",
                  isActive ? "text-primary-400" : "text-earth-400",
                  "transition-opacity duration-200"
                )} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-earth-900 bg-opacity-50 z-40 transition-opacity ease-in-out duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <div 
        className={clsx(
          "h-full",
          isMobile 
            ? (isOpen 
                ? "fixed inset-y-0 left-0 z-50 w-72 transition-transform transform duration-300 ease-in-out translate-x-0"
                : "fixed inset-y-0 left-0 z-50 w-72 transition-transform transform duration-300 ease-in-out -translate-x-full"
              )
            : "w-64 flex-shrink-0"
        )}
      >
        <div className="h-full flex flex-col bg-[#272e39] border-r border-earth-200 shadow-lg">
          {/* Sidebar Header */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="pl-5 w-25 h-15 bg-accent-500 rounded-lg flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <img src="/logo.jpg" alt="logo" />
              </div>
              <div className="ml-3">                
                <div className=" text-primary-200 flex text-2xl font-bold">StratoPath</div>
              </div>
            </div>
            
            {isMobile && (
              <button 
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="px-4 pt-4 pb-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-4 text-sm bg-earth-50 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-white/80"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="flex-1 overflow-y-auto py-4 px-1">
            {renderNavGroup(groupedNavigation.main, "Main")}
            {renderNavGroup(groupedNavigation.management, "Management")}
            {renderNavGroup(groupedNavigation.resources, "Resources")}
            {renderNavGroup(groupedNavigation.admin, "Administration")}
          </div>

          {/* Quick Action Button */}
          <div className="px-4 py-3">
            <button 
              className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg shadow-sm hover:from-accent-600 hover:to-accent-700 transition-all duration-200 font-medium"
              aria-label="Create new project"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              New Project
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-sky-300 bg-earth-50">
            {user && (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-white capitalize">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button 
                    className="p-1.5 rounded-lg text-earth-500 hover:text-sky-300 hover:bg-earth-200 transition-colors"
                    aria-label="User settings"
                  >
                    <Settings className="h-4 w-4 text-white" />
                  </button>
                  <button 
                    className="p-1.5 rounded-lg text-earth-500 hover:text-sky-300 hover:bg-danger-50 transition-colors"
                    onClick={logout}
                    aria-label="Log out"
                  >
                    <LogOut className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
