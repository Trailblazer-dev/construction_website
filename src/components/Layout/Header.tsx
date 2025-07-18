import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, LogOut, User, Settings, Sun, Moon, FileText, Calendar, Truck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockNotifications } from '../../data/mockData';
import { clsx } from 'clsx';

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
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock search results based on query
  const filteredResults = searchQuery.length > 1 
    ? [
        { id: 1, type: 'project', title: 'Highway 101 Expansion', path: '/projects/101' },
        { id: 2, type: 'task', title: 'Asphalt delivery schedule', path: '/tasks/asphalt-delivery' },
        { id: 3, type: 'document', title: 'Bridge design specifications', path: '/documents/bridge-specs' },
        { id: 4, type: 'project', title: 'Main Street Repaving', path: '/projects/main-street' },
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    if (searchQuery.length > 1) {
      setShowSearchResults(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 1);
  };

  const getIconForResultType = (type: string) => {
    switch (type) {
      case 'project': return <Calendar className="h-4 w-4 text-primary-600" />;
      case 'task': return <Truck className="h-4 w-4 text-accent-600" />;
      case 'document': return <FileText className="h-4 w-4 text-earth-600" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 flex-shrink-0 flex h-16 bg-primary-800 text-white shadow-construction border-b-2 border-sky-300">
      {/* Construction accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>

      <div className="flex-1 flex items-center justify-between px-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo - visible on larger screens */}
        <div className="hidden lg:block">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            Road Construction Platform
          </h3>
        </div>

        {/* Search - adaptable width with proper positioning */}
        <div
          className="hidden sm:flex-1 sm:flex sm:justify-center sm:max-w-lg sm:mx-4 sm:block relative"
          ref={searchRef}
        >
          <div className="w-full max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-primary-300" />
              </div>
              <input
                type="text"
                placeholder="Search projects, tasks, or documents..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="block w-full pl-10 pr-3 py-2 border border-primary-700 rounded-xl text-sm leading-5 bg-primary-700/50 backdrop-blur-sm placeholder-primary-300 focus:outline-none focus:placeholder-primary-200 focus:ring-1 focus:ring-accent-500 focus:border-accent-500 text-white"
                aria-label="Search"
                aria-expanded={showSearchResults}
              />

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-dropdown border border-earth-200 z-40 animate-fade-in overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    {filteredResults.length === 0 ? (
                      <div className="p-4 text-center text-earth-500">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div>
                        {filteredResults.map((result) => (
                          <a
                            key={result.id}
                            href={result.path}
                            className="block p-3 border-b border-earth-100 hover:bg-earth-50 transition-colors duration-150"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">
                                {getIconForResultType(result.type)}
                              </span>
                              <div>
                                <div className="text-sm font-medium text-earth-800">
                                  {result.title}
                                </div>
                                <div className="text-xs text-earth-500 capitalize">
                                  {result.type}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {filteredResults.length > 0 && (
                    <div className="p-2 border-t border-earth-200 bg-earth-50">
                      <button className="w-full text-center text-sm text-primary-600 hover:text-primary-800 p-1 font-medium">
                        View all results
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            aria-label={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {mode === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (showUserMenu) setShowUserMenu(false);
              }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-primary-800" />
              )}
            </button>

            {/* Notifications dropdown - positioned properly */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#28697b] rounded-xl shadow-dropdown border border-earth-200 z-40 animate-fade-in overflow-hidden">
                <div className="p-3 border-b border-earth-200 bg-primary-800 text-white">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length === 0 ? (
                    <div className="p-4 text-center text-earth-500">
                      No notifications
                    </div>
                  ) : (
                    <div>
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={clsx(
                            "p-3 border-b border-earth-100 hover:bg-earth-50 transition-colors duration-150",
                            !notification.read && "bg-primary-50"
                          )}
                        >
                          <div className="text-sm font-medium text-earth-800">
                            {notification.title}
                          </div>
                          <div className="text-xs text-earth-600 mt-1">
                            {notification.message}
                          </div>
                          <div className="text-xs text-earth-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-earth-200 bg-earth-50">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-800 p-1 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                if (showNotifications) setShowNotifications(false);
              }}
              className="flex items-center space-x-2 text-white/90 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-all duration-200"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-accent-400 flex items-center justify-center text-primary-800 font-bold overflow-hidden ring-2 ring-white/30">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || <User className="h-5 w-5" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                {user?.name || "User"}
              </span>
            </button>

            {/* User dropdown - positioned properly */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#28697b] rounded-xl shadow-dropdown border border-earth-200 z-40 animate-fade-in overflow-hidden">
                <div className="p-4 border-b border-earth-200 bg-primary-800 text-white">
                  <div className="font-medium text-sm">{user?.name}</div>
                  <div className="text-xs text-primary-300">{user?.email}</div>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-earth-700 hover:bg-earth-50 flex items-center space-x-2 transition-colors">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-earth-700 hover:bg-earth-50 flex items-center space-x-2 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="py-1 border-t border-earth-200 bg-earth-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
