import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Truck, 
  Wrench, 
  Users, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  BarChart2, 
  Settings,
  HardHat,
  ChevronDown,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

// Navigation items with categorization
const navigationItems = {
  main: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'construction_manager', 'engineer', 'driver', 'client']
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: FolderOpen,
      roles: ['admin', 'construction_manager', 'engineer', 'client']
    }
  ],
  logistics: [
    {
      name: 'Transport & Logistics',
      path: '/transport',
      icon: Truck,
      roles: ['admin', 'construction_manager', 'driver']
    }
  ],
  engineering: [
    {
      name: 'Engineering',
      path: '/engineering',
      icon: Wrench,
      roles: ['admin', 'construction_manager', 'engineer']
    }
  ],
  management: [
    {
      name: 'User Management',
      path: '/users',
      icon: Users,
      roles: ['admin']
    }
  ],
  tools: [
    {
      name: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
      roles: ['admin', 'construction_manager', 'engineer', 'driver']
    },
    {
      name: 'Issues',
      path: '/issues',
      icon: AlertTriangle,
      roles: ['admin', 'construction_manager', 'engineer', 'driver']
    },
    {
      name: 'Documents',
      path: '/documents',
      icon: FileText,
      roles: ['admin', 'construction_manager', 'engineer', 'client']
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: BarChart2,
      roles: ['admin', 'construction_manager', 'client']
    }
  ],
  settings: [
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      roles: ['admin', 'construction_manager']
    }
  ]
};

// Create a separate SidebarNav component directly in this file
const SidebarNav: React.FC<{
  navigation: Record<string, typeof navigationItems.main>;
  isActive: (path: string) => boolean;
  expanded: boolean;
}> = ({ navigation, isActive, expanded }) => {
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    main: true,
    logistics: true,
    engineering: true,
    management: true,
    tools: true,
    settings: true,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'main': return 'Main';
      case 'logistics': return 'Logistics';
      case 'engineering': return 'Engineering';
      case 'management': return 'Management';
      case 'tools': return 'Tools';
      case 'settings': return 'Settings';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <nav className="space-y-1">
      {Object.entries(navigation).map(([category, items]) => (
        <div key={category} className="mb-4">
          {/* Category Title - only show if expanded */}
          {expanded && (
            <div 
              className="flex items-center justify-between text-xs uppercase text-earth-300 px-3 py-2 cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              <span>{getCategoryTitle(category)}</span>
              {expandedCategories[category] ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          
          {/* Menu Items */}
          {expandedCategories[category] && (
            <div className="space-y-1">
              {items.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                
                return (
                  <a
                    key={item.path}
                    href={item.path} // Use proper Link component in actual code
                    className={`
                      flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                      ${active 
                        ? 'bg-primary-900/20 text-primary-300' 
                        : 'text-earth-300 hover:bg-earth-800/40 hover:text-earth-100'}
                    `}
                  >
                    <IconComponent className={`h-5 w-5 ${active ? 'text-primary-300' : 'text-earth-300'}`} />
                    {expanded && (
                      <span className="ml-3 truncate">{item.name}</span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Filter navigation items based on user role
  const filteredNavigation = useMemo(() => {
    if (!user) return {};
    
    const result: Record<string, typeof navigationItems.main> = {};
    
    Object.entries(navigationItems).forEach(([category, items]) => {
      const filteredItems = items.filter(item => 
        item.roles.includes(user.role)
      );
      
      if (filteredItems.length > 0) {
        result[category] = filteredItems;
      }
    });
    
    return result;
  }, [user]);

  // Check if path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Determine sidebar classes based on open state and mobile status
  const sidebarClasses = isMobile
    ? `fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
    : `hidden md:block md:flex-shrink-0 z-20 ${isOpen ? 'md:w-64' : 'md:w-20'} transition-all duration-300`;

  // Apply overlay on mobile
  const overlayClasses = isMobile && isOpen
    ? 'fixed inset-0 bg-black bg-opacity-50 z-30'
    : 'hidden';

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isMobile && isOpen && (
        <div className={overlayClasses} onClick={onClose}></div>
      )}
      
      <div className={sidebarClasses}>
        <div className="h-full flex flex-col bg-gradient-to-b from-earth-900 to-earth-950 shadow-xl">
          <div className="flex-1 overflow-y-auto">
            {/* Sidebar header with logo */}
            <div className="px-4 py-5 flex items-center justify-between">
              <div className="flex items-center">
                <img src="/logo.jpg" alt="Road Construction" className="h-10 w-10 rounded" />
                {(isOpen || isMobile) && (
                  <span className="ml-3 text-xl font-semibold text-white">StratoPath</span>
                )}
              </div>
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-earth-300 hover:bg-earth-800 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Navigation Categories */}
            <div className="mt-5 px-2">
              <SidebarNav 
                navigation={filteredNavigation} 
                isActive={isActive} 
                expanded={isOpen || isMobile}
              />
            </div>
          </div>
          
          {/* User profile at the bottom of sidebar */}
          <div className="p-4 border-t border-earth-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {user?.role === 'construction_manager' ? (
                    <HardHat className="h-5 w-5" />
                  ) : (
                    <Users className="h-5 w-5" />
                  )}
                </div>
              </div>
              {(isOpen || isMobile) && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || 'User Name'}
                  </p>
                  <p className="text-xs text-earth-300 truncate">
                    {user?.role ? user.role.replace('_', ' ') : 'Role'}
                  </p>
                </div>
              )}
              {(isOpen || isMobile) && (
                <button
                  onClick={logout}
                  className="p-1 rounded-full text-earth-300 hover:bg-earth-800 focus:outline-none"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
