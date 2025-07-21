import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, LogOut, Settings, Sun, Moon, ChevronDown, X, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock notifications data
  const notifications = [
    { id: 1, message: "New task assigned: Review structural plans", time: "10 minutes ago", read: false },
    { id: 2, message: "Comment from John on Highway 95 project", time: "1 hour ago", read: false },
    { id: 3, message: "Project milestone completed: Foundation work", time: "3 hours ago", read: true },
    { id: 4, message: "Meeting reminder: Project review at 2:00 PM", time: "Yesterday", read: true }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Handle click outside
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const userPhotoURL = user?.photoURL || null;
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';

  return (
    <header className="bg-secondary-600 shadow-md border-b border-secondary-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 text-white">
          {/* Left side: Logo and toggle */}
          <div className="flex items-center">
            <button
              className="md:hidden p-2 mr-2 rounded-md text-gray-200 hover:bg-secondary-700 focus:outline-none"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                alt="Road Construction" 
                className="h-8 w-8 rounded"
              />
              <span className="ml-2 text-lg font-medium text-white hidden md:block">
                StratoPath
              </span>
            </div>
          </div>
          
          {/* Center: Search */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8" ref={searchRef}>
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-charcoal-600 rounded-md leading-5 bg-charcoal-700 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search for projects, tasks, or documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Right side: Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <button 
              className="p-2 rounded-full text-gray-200 hover:bg-charcoal-700 focus:outline-none"
              onClick={toggleMode}
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <div className="relative">
              <button
                className="p-2 rounded-full text-gray-200 hover:bg-charcoal-700 focus:outline-none relative"
                onClick={toggleNotifications}
                aria-expanded={showNotifications}
                aria-haspopup="true"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 block h-4 w-4 rounded-full bg-accent-500 text-white text-xs font-medium flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-charcoal-800 rounded-md shadow-lg z-20 border border-charcoal-700">
                  <div className="py-2 px-4 border-b border-charcoal-700">
                    <h3 className="text-sm font-medium text-white">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-charcoal-700 border-b border-charcoal-700 last:border-b-0">
                        <p className="text-sm text-gray-100">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="py-2 px-4 border-t border-charcoal-700">
                    <button className="text-sm text-accent-500 hover:text-accent-400 font-medium w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                onClick={toggleUserMenu}
                aria-expanded={showUserMenu}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                {userPhotoURL ? (
                  <img 
                    className="h-8 w-8 rounded-full"
                    src={userPhotoURL}
                    alt={`${userName}'s profile`}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    {userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <ChevronDown className="ml-1 h-4 w-4 text-gray-300" />
              </button>
              
              {/* User dropdown panel */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary-800 rounded-md shadow-lg z-20 border border-secondary-600">
                  <div className="py-2 px-4 border-b border-secondary-700">
                    <p className="text-sm font-medium text-white">{userName || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail || 'user@example.com'}</p>
                  </div>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-secondary-700">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-secondary-700">
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </div>
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-secondary-700">
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help Center
                      </div>
                    </a>
                  </div>
                  <div className="py-1 border-t border-secondary-700">
                    <button 
                      className="px-4 py-2 text-sm text-accent-500 hover:bg-secondary-700 w-full text-left flex items-center"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
     