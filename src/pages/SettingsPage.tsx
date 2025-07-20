import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  PaintBucket,
  Monitor,
  Bell,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Sliders,
  User,
  Shield,
  CloudOff
} from 'lucide-react';

// TypeScript interfaces
interface ThemeColor {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  email: boolean;
  inApp: boolean;
  mobile: boolean;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'notifications' | 'account' | 'privacy'>('appearance');
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [density, setDensity] = useState<'comfortable' | 'compact' | 'spacious'>('comfortable');
  const [menuPosition, setMenuPosition] = useState<'left' | 'top'>('left');
  const [language, setLanguage] = useState<string>('en');
  const [selectedColor, setSelectedColor] = useState<string>('blue');

  // Mock theme colors
  const themeColors: ThemeColor[] = [
    { id: 'blue', name: 'Ocean Blue', primaryColor: '#0ea5e9', secondaryColor: '#0369a1' },
    { id: 'green', name: 'Forest Green', primaryColor: '#10b981', secondaryColor: '#047857' },
    { id: 'purple', name: 'Royal Purple', primaryColor: '#8b5cf6', secondaryColor: '#6d28d9' },
    { id: 'amber', name: 'Amber Gold', primaryColor: '#f59e0b', secondaryColor: '#b45309' },
    { id: 'red', name: 'Ruby Red', primaryColor: '#ef4444', secondaryColor: '#b91c1c' },
    { id: 'gray', name: 'Slate Gray', primaryColor: '#64748b', secondaryColor: '#334155' }
  ];

  // Mock notification settings
  const notificationSettings: NotificationSetting[] = [
    { 
      id: 'project_updates', 
      type: 'Project Updates', 
      description: 'Changes to project status, timelines, or milestones', 
      email: true, 
      inApp: true, 
      mobile: true 
    },
    { 
      id: 'task_assignments', 
      type: 'Task Assignments', 
      description: 'New tasks assigned to you or changes to existing ones', 
      email: true, 
      inApp: true, 
      mobile: false 
    },
    { 
      id: 'document_uploads', 
      type: 'Document Uploads', 
      description: 'New documents added to projects you follow', 
      email: false, 
      inApp: true, 
      mobile: false 
    },
    { 
      id: 'comments', 
      type: 'Comments & Mentions', 
      description: 'When someone comments on your work or mentions you', 
      email: true, 
      inApp: true, 
      mobile: true 
    },
    { 
      id: 'system_alerts', 
      type: 'System Alerts', 
      description: 'Important system notifications and maintenance updates', 
      email: true, 
      inApp: true, 
      mobile: false 
    }
  ];

  // Toggle notification setting
  const toggleNotification = (id: string, channel: 'email' | 'inApp' | 'mobile') => {
    // Implementation would update the state in a real app
    console.log(`Toggled ${channel} for ${id}`);
  };

  // Save settings
  const saveSettings = () => {
    console.log('Settings saved');
    // Implementation would save to backend in a real app
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sky-300/80 text-sm mt-1">Configure your application preferences</p>
        </div>
        <Button 
          variant="primary" 
          size="md"
          onClick={saveSettings}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card variant="default" className="sticky top-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeTab === 'appearance' 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <PaintBucket className="w-5 h-5 mr-3" />
                <span>Appearance</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeTab === 'notifications' 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <Bell className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeTab === 'account' 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Account</span>
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeTab === 'privacy' 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                <span>Privacy & Security</span>
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-sky-950/50 rounded-lg">
              <h3 className="font-medium text-white flex items-center">
                <Sliders className="w-4 h-4 mr-2" />
                Settings Version
              </h3>
              <p className="text-sm text-sky-300/80 mt-2">v2.3.0</p>
              <p className="text-xs text-sky-300/60 mt-1">Last updated: Oct 18, 2023</p>
              <Button variant="link" size="sm" className="mt-2 p-0">
                <RefreshCw className="w-3 h-3 mr-1" />
                Check for updates
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card title="Appearance Settings" icon={PaintBucket} variant="default">
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-white mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-sky-300 bg-sky-300/20' 
                          : 'border-sky-800/30 bg-sky-950/30 hover:bg-sky-950/50'
                      } flex flex-col items-center justify-center`}
                    >
                      <Sun className="w-6 h-6 mb-2 text-sky-300" />
                      <span className="text-sm text-white">Light</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-sky-300 bg-sky-300/20' 
                          : 'border-sky-800/30 bg-sky-950/30 hover:bg-sky-950/50'
                      } flex flex-col items-center justify-center`}
                    >
                      <Moon className="w-6 h-6 mb-2 text-sky-300" />
                      <span className="text-sm text-white">Dark</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-4 rounded-lg border ${
                        theme === 'system' 
                          ? 'border-sky-300 bg-sky-300/20' 
                          : 'border-sky-800/30 bg-sky-950/30 hover:bg-sky-950/50'
                      } flex flex-col items-center justify-center`}
                    >
                      <Monitor className="w-6 h-6 mb-2 text-sky-300" />
                      <span className="text-sm text-white">System</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-white mb-3">Color Scheme</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {themeColors.map(color => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`relative rounded-lg border p-4 ${
                          selectedColor === color.id 
                            ? 'border-sky-300' 
                            : 'border-sky-800/30 hover:border-sky-800/60'
                        }`}
                        aria-label={`Select ${color.name} color scheme`}
                      >
                        <div 
                          className="w-full h-8 rounded-md mb-2" 
                          style={{ backgroundColor: color.primaryColor }}
                        />
                        <div 
                          className="w-full h-4 rounded-md" 
                          style={{ backgroundColor: color.secondaryColor }}
                        />
                        <span className="block text-xs text-center mt-2 text-white truncate">
                          {color.name}
                        </span>
                        {selectedColor === color.id && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-sky-300 rounded-full flex items-center justify-center">
                            <span className="text-sky-950 text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-white mb-3">Layout</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-sky-300/80 mb-2">Menu Position</label>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setMenuPosition('left')}
                          className={`p-3 rounded-lg border ${
                            menuPosition === 'left' 
                              ? 'border-sky-300 bg-sky-300/20' 
                              : 'border-sky-800/30 bg-sky-950/30 hover:bg-sky-950/50'
                          } flex flex-col items-center justify-center`}
                        >
                          <div className="w-16 h-12 bg-sky-950 rounded-md flex">
                            <div className="w-3 h-full bg-sky-300/30 rounded-l-md"></div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-xs text-white mt-2">Left Sidebar</span>
                        </button>
                        
                        <button
                          onClick={() => setMenuPosition('top')}
                          className={`p-3 rounded-lg border ${
                            menuPosition === 'top' 
                              ? 'border-sky-300 bg-sky-300/20' 
                              : 'border-sky-800/30 bg-sky-950/30 hover:bg-sky-950/50'
                          } flex flex-col items-center justify-center`}
                        >
                          <div className="w-16 h-12 bg-sky-950 rounded-md flex flex-col">
                            <div className="h-3 w-full bg-sky-300/30 rounded-t-md"></div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="text-xs text-white mt-2">Top Bar</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-sky-300/80 mb-2">Density</label>
                      <select
                        value={density}
                        onChange={(e) => setDensity(e.target.value as 'comfortable' | 'compact' | 'spacious')}
                        className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="compact">Compact</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="animations" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="animations" className="ml-2 text-sm text-white">Enable animations</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-white mb-3">Language & Region</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-sky-300/80 mb-2">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-sky-300/80 mb-2">Date Format</label>
                      <select
                        className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="yyyy/mm/dd">YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card title="Notification Settings" icon={Bell} variant="default">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-sky-800/30">
                  <div>
                    <h3 className="font-medium text-white">Notification Channels</h3>
                    <p className="text-sm text-sky-300/80 mt-1">Configure how you'd like to receive notifications</p>
                  </div>
                  <div className="flex space-x-1">
                    <span className="text-xs text-sky-300/80 px-2">Email</span>
                    <span className="text-xs text-sky-300/80 px-2">In-App</span>
                    <span className="text-xs text-sky-300/80 px-2">Mobile</span>
                  </div>
                </div>
                
                {notificationSettings.map(setting => (
                  <div key={setting.id} className="flex items-start justify-between py-2">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-white">{setting.type}</h4>
                      <p className="text-sm text-sky-300/80 mt-1">{setting.description}</p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id={`${setting.id}-email`} 
                          checked={setting.email}
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => toggleNotification(setting.id, 'email')}
                          aria-label={`Email notifications for ${setting.type}`}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id={`${setting.id}-inapp`} 
                          checked={setting.inApp}
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => toggleNotification(setting.id, 'inApp')}
                          aria-label={`In-app notifications for ${setting.type}`}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id={`${setting.id}-mobile`} 
                          checked={setting.mobile}
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => toggleNotification(setting.id, 'mobile')}
                          aria-label={`Mobile notifications for ${setting.type}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Notification Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        id="quiet-hours" 
                        type="checkbox" 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="quiet-hours" className="ml-2 text-sm text-white">Enable quiet hours</label>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-sky-300/80 mb-1">From</label>
                        <select className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <option key={i} value={i}>{`${i.toString().padStart(2, '0')}:00`}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-sky-300/80 mb-1">To</label>
                        <select className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <option key={i} value={i}>{`${i.toString().padStart(2, '0')}:00`}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Email Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        id="digest-email" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="digest-email" className="ml-2 text-sm text-white">
                        Send daily digest email
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="marketing-email" 
                        type="checkbox" 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="marketing-email" className="ml-2 text-sm text-white">
                        Product updates and announcements
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="primary" onClick={saveSettings}>
                  Save Notification Settings
                </Button>
              </div>
            </Card>
          )}
          
          {/* Account Settings */}
          {activeTab === 'account' && (
            <Card title="Account Settings" icon={User} variant="default">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sky-300/20 text-sky-300 rounded-full flex items-center justify-center text-xl font-bold">
                    RC
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Robert Chen</h3>
                    <p className="text-sm text-sky-300/80">Admin</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Change Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-sky-800/30">
                  <div>
                    <label className="block text-sm text-sky-300/80 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value="Robert Chen" 
                      className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-sky-300/80 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      value="Project Administrator" 
                      className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-sky-300/80 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value="robert.c@example.com" 
                      className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-sky-300/80 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value="(555) 123-4567" 
                      className="w-full p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Password</h3>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-sky-300/80">Add an extra layer of security to your account</p>
                      <p className="text-xs text-green-400 mt-1">Enabled via Authenticator App</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage 2FA
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Connected Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-sky-300/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sky-300 text-sm">G</span>
                        </div>
                        <div>
                          <p className="text-sm text-white">Google</p>
                          <p className="text-xs text-sky-300/80">robertchen@gmail.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="xs">Disconnect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-sky-300/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sky-300 text-sm">M</span>
                        </div>
                        <div>
                          <p className="text-sm text-white">Microsoft</p>
                          <p className="text-xs text-sky-300/60">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="xs">Connect</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-red-400 mb-3">Danger Zone</h3>
                  <Button variant="danger" size="sm">
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card title="Privacy & Security" icon={Shield} variant="default">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Show my online status</p>
                        <p className="text-xs text-sky-300/80">Let others see when you're active in the platform</p>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          id="online-status" 
                          checked 
                          className="sr-only"
                          onChange={() => {}}
                        />
                        <label 
                          htmlFor="online-status" 
                          className="block w-10 h-6 rounded-full bg-sky-300/20 cursor-pointer"
                        >
                          <span className="block w-4 h-4 mt-1 ml-1 bg-sky-300 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Show my profile to other teams</p>
                        <p className="text-xs text-sky-300/80">Allow members from other teams to view your profile</p>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          id="profile-visibility" 
                          className="sr-only"
                          onChange={() => {}}
                        />
                        <label 
                          htmlFor="profile-visibility" 
                          className="block w-10 h-6 rounded-full bg-sky-900/50 cursor-pointer"
                        >
                          <span className="block w-4 h-4 mt-1 ml-1 bg-sky-600/50 rounded-full transition-transform duration-200 transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Allow data collection for analytics</p>
                        <p className="text-xs text-sky-300/80">Help us improve by allowing anonymous usage data collection</p>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          id="data-collection" 
                          checked 
                          className="sr-only"
                          onChange={() => {}}
                        />
                        <label 
                          htmlFor="data-collection" 
                          className="block w-10 h-6 rounded-full bg-sky-300/20 cursor-pointer"
                        >
                          <span className="block w-4 h-4 mt-1 ml-1 bg-sky-300 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-white">Session Management</p>
                        <Button variant="link" size="xs">View Active Sessions</Button>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="auto-logout" 
                          type="checkbox" 
                          checked 
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => {}}
                        />
                        <label htmlFor="auto-logout" className="ml-2 text-sm text-sky-300/80">
                          Automatically log out after 2 hours of inactivity
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-white">Login Alerts</p>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="login-alerts" 
                          type="checkbox" 
                          checked 
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => {}}
                        />
                        <label htmlFor="login-alerts" className="ml-2 text-sm text-sky-300/80">
                          Send email alerts for login attempts from new devices
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Data Management</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white mb-2">Download Your Data</p>
                      <p className="text-xs text-sky-300/80 mb-3">
                        Get a copy of your personal data including profile information, projects, and activities
                      </p>
                      <Button variant="outline" size="sm">
                        Request Data Export
                      </Button>
                    </div>
                    
                    <div>
                      <p className="text-sm text-white mb-2">Offline Access</p>
                      <div className="flex items-center">
                        <input 
                          id="offline-access" 
                          type="checkbox" 
                          className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                          onChange={() => {}}
                        />
                        <label htmlFor="offline-access" className="ml-2 text-sm text-sky-300/80">
                          Enable offline access to your project data
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sky-800/30">
                  <h3 className="font-medium text-white mb-3">Blocked Content</h3>
                  <div className="p-6 border border-sky-800/30 rounded-lg bg-sky-950/30 text-center">
                    <CloudOff className="w-8 h-8 mx-auto text-sky-300/50 mb-3" />
                    <p className="text-sm text-white mb-1">No Blocked Content</p>
                    <p className="text-xs text-sky-300/80">
                      You haven't blocked any content or users yet
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="primary" onClick={saveSettings}>
                  Save Privacy Settings
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
