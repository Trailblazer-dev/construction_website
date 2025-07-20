import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Users, UserPlus, Shield, Settings, Search, List, Activity, Lock, Bell, Database, Key } from 'lucide-react';

// TypeScript interfaces for data structures
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  projects?: number;
  loginAttempts?: number;
}

interface Role {
  id: number;
  name: string;
  users: number;
  permissions: string[];
  description: string;
  createdAt: string;
}

interface AuditLog {
  id: number;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
}

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  
  // Mock users data
  const users: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Construction Manager', status: 'Active', lastActive: '2023-10-20', projects: 5, loginAttempts: 0 },
    { id: 2, name: 'Elena Martinez', email: 'elena.m@example.com', role: 'Engineer', status: 'Active', lastActive: '2023-10-19', projects: 3, loginAttempts: 0 },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Driver', status: 'Inactive', lastActive: '2023-09-30', projects: 0, loginAttempts: 2 },
    { id: 4, name: 'Sarah Wong', email: 'sarah.w@example.com', role: 'Client', status: 'Active', lastActive: '2023-10-15', projects: 2, loginAttempts: 0 },
    { id: 5, name: 'Robert Chen', email: 'robert.c@example.com', role: 'Admin', status: 'Active', lastActive: '2023-10-20', projects: 8, loginAttempts: 0 },
    { id: 6, name: 'Emily Davis', email: 'emily.d@example.com', role: 'Engineer', status: 'Pending', lastActive: '2023-10-22', projects: 0, loginAttempts: 0 },
    { id: 7, name: 'David Wilson', email: 'david.w@example.com', role: 'Construction Manager', status: 'Active', lastActive: '2023-10-18', projects: 4, loginAttempts: 1 }
  ];

  // Mock roles data
  const roles: Role[] = [
    { 
      id: 1, 
      name: 'Construction Manager', 
      users: 3, 
      permissions: ['Dashboard access', 'Project management', 'Report generation', 'Team assignment', 'Budget viewing', 'Milestone management'], 
      description: 'Oversees construction projects and team coordination',
      createdAt: '2023-05-15'
    },
    { 
      id: 2, 
      name: 'Engineer', 
      users: 8, 
      permissions: ['Technical uploads', 'Project updates', 'Issue reporting', 'Document access', 'Design review', 'Quality checks'], 
      description: 'Handles technical aspects of projects including designs and quality checks',
      createdAt: '2023-05-15'
    },
    { 
      id: 3, 
      name: 'Driver', 
      users: 12, 
      permissions: ['Delivery schedules', 'Route access', 'Status updates', 'Basic reporting', 'Inventory viewing', 'Time logging'], 
      description: 'Manages material and equipment transportation',
      createdAt: '2023-06-02'
    },
    { 
      id: 4, 
      name: 'Client', 
      users: 5, 
      permissions: ['Project visibility', 'KPI dashboards', 'Document downloads', 'Comment access', 'Progress tracking', 'Invoice viewing'], 
      description: 'Views project progress and relevant documentation',
      createdAt: '2023-06-10'
    },
    { 
      id: 5, 
      name: 'Admin', 
      users: 2, 
      permissions: ['User management', 'System settings', 'Full access', 'Audit controls', 'Role management', 'Security settings'], 
      description: 'Full system access with administrative capabilities',
      createdAt: '2023-05-01'
    }
  ];

  // Mock audit logs
  const auditLogs: AuditLog[] = [
    { id: 1, user: 'Robert Chen', action: 'User Created', resource: 'Emily Davis (User #6)', timestamp: '2023-10-22 09:15:22', ipAddress: '192.168.1.45' },
    { id: 2, user: 'Robert Chen', action: 'Role Modified', resource: 'Engineer Role', timestamp: '2023-10-21 14:30:05', ipAddress: '192.168.1.45' },
    { id: 3, user: 'System', action: 'Failed Login Attempt', resource: 'mike.j@example.com', timestamp: '2023-10-21 08:22:17', ipAddress: '192.168.1.112' },
    { id: 4, user: 'Robert Chen', action: 'User Deactivated', resource: 'Mike Johnson (User #3)', timestamp: '2023-10-20 16:45:30', ipAddress: '192.168.1.45' },
    { id: 5, user: 'Robert Chen', action: 'System Settings Updated', resource: 'Password Policy', timestamp: '2023-10-19 11:10:43', ipAddress: '192.168.1.45' }
  ];

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesStatus = userStatus ? user.status === userStatus : true;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Reset filters
  const resetFilters = () => {
    setSelectedRole(null);
    setUserStatus(null);
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sky-300/80 text-sm mt-1">Admin control panel for user and role administration</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Audit Logs
          </Button>
          <Button variant="primary" size="md">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card title="User Statistics" variant="default" className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-sky-950/50 rounded-lg">
              <h3 className="text-sky-300/80 text-sm mb-1">Total Users</h3>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-xs text-sky-300/60 mt-1">+2 this month</p>
            </div>
            <div className="p-4 bg-sky-950/50 rounded-lg">
              <h3 className="text-sky-300/80 text-sm mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'Active').length}</p>
              <p className="text-xs text-sky-300/60 mt-1">95% of total</p>
            </div>
            <div className="p-4 bg-sky-950/50 rounded-lg">
              <h3 className="text-sky-300/80 text-sm mb-1">Pending Approval</h3>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'Pending').length}</p>
              <p className="text-xs text-sky-300/60 mt-1">Requires action</p>
            </div>
            <div className="p-4 bg-sky-950/50 rounded-lg">
              <h3 className="text-sky-300/80 text-sm mb-1">User Roles</h3>
              <p className="text-2xl font-bold text-white">{roles.length}</p>
              <p className="text-xs text-sky-300/60 mt-1">Fully configured</p>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" variant="default">
          <div className="space-y-3">
            {auditLogs.slice(0, 3).map((log, index) => (
              <div key={index} className="text-xs border-b border-sky-800/20 pb-2 last:border-0">
                <p className="text-white font-medium">{log.action}</p>
                <p className="text-sky-300/80">{log.user} • {log.resource}</p>
                <p className="text-sky-300/60 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="mt-3 w-full justify-center">
            View All Activity
          </Button>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-sky-800/30 mb-4">
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'users' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4 mr-2" />
            Users
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'roles' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('roles')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Roles & Permissions
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'security' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock className="w-4 h-4 mr-2" />
            Security
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'settings' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </button>
        </div>

        {activeTab === 'users' && (
          <Card title="User Management" variant="default">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-sky-300/60" />
                </div>
                <input
                  type="text"
                  className="block w-full p-2 pl-10 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 placeholder-sky-300/60 text-white focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Search users by name, email or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <label htmlFor="filter-role" className="sr-only">Filter by role</label>
              <select
                id="filter-role"
                className="p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                value={selectedRole || ''}
                onChange={(e) => setSelectedRole(e.target.value || null)}
                aria-label="Filter by role"
              >
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
              
              <label htmlFor="filter-status" className="sr-only">Filter by status</label>
              <select
                id="filter-status"
                className="p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                value={userStatus || ''}
                onChange={(e) => setUserStatus(e.target.value || null)}
                aria-label="Filter by status"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                disabled={!searchTerm && !selectedRole && !userStatus}
              >
                Reset
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Projects</th>
                    <th className="px-6 py-3">Last Active</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b border-sky-800/30">
                      <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.status === 'Active' ? 'bg-green-900/50 text-green-300' : 
                          user.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-red-900/50 text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.projects}</td>
                      <td className="px-6 py-4">{new Date(user.lastActive).toLocaleDateString()}</td>
                      <td className="px-6 py-4 space-x-2">
                        <Button variant="outline" size="xs">Edit</Button>
                        {user.status === 'Active' ? (
                          <Button variant="danger" size="xs">Deactivate</Button>
                        ) : user.status === 'Pending' ? (
                          <Button variant="success" size="xs">Approve</Button>
                        ) : (
                          <Button variant="success" size="xs">Activate</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-sky-300/60">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">No users match your search criteria</p>
                <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-sky-300/60">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'roles' && (
          <Card title="Roles & Permissions" variant="default">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-sky-300/80">
                Manage user roles and their associated permissions in the system
              </p>
              <Button variant="primary" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Create New Role
              </Button>
            </div>
            
            <div className="space-y-6">
              {roles.map(role => (
                <div key={role.id} className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-white text-lg">{role.name}</h3>
                        {role.name === 'Admin' && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-red-900/30 text-red-300 rounded">
                            Privileged
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-sky-300/80 mt-1">{role.description}</p>
                      <div className="flex items-center text-xs text-sky-300/60 mt-2">
                        <span>{role.users} users assigned</span>
                        <span className="mx-2">•</span>
                        <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Clone</Button>
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-sky-300 mb-2">Permissions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-sky-400 mr-2"></div>
                          <span className="text-sm text-white">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-sky-800/20">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="xs">View Users</Button>
                      {role.name !== 'Admin' && (
                        <Button variant="danger" size="xs">Delete</Button>
                      )}
                    </div>
                    
                    {role.name === 'Admin' && (
                      <span className="text-xs text-sky-300/60 italic">
                        Admin role cannot be deleted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card title="Security Settings" variant="default">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Lock className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Password Policy</h3>
                      <p className="text-sm text-sky-300/80">Configure password requirements and rotation policy</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Minimum length</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>8 characters</option>
                        <option>10 characters</option>
                        <option>12 characters</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="special-chars" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="special-chars" className="ml-2 text-sm text-white">Require special characters</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="uppercase" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="uppercase" className="ml-2 text-sm text-white">Require uppercase letters</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="numbers" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="numbers" className="ml-2 text-sm text-white">Require numbers</label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Password expiry</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>90 days</option>
                        <option>60 days</option>
                        <option>30 days</option>
                        <option>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Key className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-sky-300/80">Set up additional security verification</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        id="2fa-admin" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="2fa-admin" className="ml-2 text-sm text-white">Required for Admin users</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="2fa-optional" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="2fa-optional" className="ml-2 text-sm text-white">Optional for other users</label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">2FA method</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>SMS</option>
                        <option>Email</option>
                        <option>Authenticator App</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Activity className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Login Monitoring</h3>
                      <p className="text-sm text-sky-300/80">Track and restrict login attempts</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Failed login attempts before lockout</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>3 attempts</option>
                        <option>5 attempts</option>
                        <option>10 attempts</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Account lockout duration</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>24 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="notify-failed" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="notify-failed" className="ml-2 text-sm text-white">Notify admins of failed attempts</label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Bell className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Security Alerts</h3>
                      <p className="text-sm text-sky-300/80">Configure security notifications</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        id="login-alerts" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="login-alerts" className="ml-2 text-sm text-white">Suspicious login alerts</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="password-change" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="password-change" className="ml-2 text-sm text-white">Password change notifications</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="role-change" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="role-change" className="ml-2 text-sm text-white">Role change notifications</label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Alert recipients</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>All Admins</option>
                        <option>Security Team</option>
                        <option>Custom...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-red-800/30 rounded-lg bg-red-950/10">
              <h3 className="font-medium text-white mb-3 flex items-center">
                <Activity className="w-5 h-5 text-red-400 mr-2" />
                Security Audit Log
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-red-950/30 text-red-300">
                    <tr>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Action</th>
                      <th className="px-4 py-2">Resource</th>
                      <th className="px-4 py-2">Timestamp</th>
                      <th className="px-4 py-2">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log, index) => (
                      <tr key={index} className="border-b border-red-800/20">
                        <td className="px-4 py-2 font-medium">{log.user}</td>
                        <td className="px-4 py-2">{log.action}</td>
                        <td className="px-4 py-2">{log.resource}</td>
                        <td className="px-4 py-2">{log.timestamp}</td>
                        <td className="px-4 py-2">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="text-center mt-3">
                <Button variant="outline" size="sm">View Complete Audit Log</Button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Save Security Settings</Button>
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card title="System Settings" variant="default">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">General Settings</h3>
                      <p className="text-sm text-sky-300/80">Configure system-wide defaults</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm text-white">Company Name</label>
                      <input 
                        type="text"
                        value="RoadTech Construction"
                        className="p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                        onChange={() => {}}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm text-white">Support Email</label>
                      <input 
                        type="email"
                        value="support@roadtech.example.com"
                        className="p-2 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                        onChange={() => {}}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Default Language</label>
                      <label htmlFor="default-language" className="sr-only">Default Language</label>
                      <select
                        id="default-language"
                        className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white"
                        aria-label="Default Language"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Default Time Zone</label>
                      <label htmlFor="default-timezone" className="sr-only">Default Time Zone</label>
                      <select
                        id="default-timezone"
                        className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white"
                        aria-label="Default Time Zone"
                      >
                        <option>UTC-08:00 (PST)</option>
                        <option>UTC-05:00 (EST)</option>
                        <option>UTC+00:00 (GMT)</option>
                        <option>UTC+01:00 (CET)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Bell className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Notification Settings</h3>
                      <p className="text-sm text-sky-300/80">Configure system notifications</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        id="email-notifications" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="email-notifications" className="ml-2 text-sm text-white">Email notifications</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="in-app-notifications" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="in-app-notifications" className="ml-2 text-sm text-white">In-app notifications</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="sms-notifications" 
                        type="checkbox" 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                        aria-label="SMS notifications (additional charges may apply)"
                        title="Enable SMS notifications (additional charges may apply)"
                      />
                      <label htmlFor="sms-notifications" className="ml-2 text-sm text-white">SMS notifications (additional charges may apply)</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Database className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Data Management</h3>
                      <p className="text-sm text-sky-300/80">Configure data retention and backup settings</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Data Backup Frequency</label>
                      <label htmlFor="data-backup-frequency" className="sr-only">Data Backup Frequency</label>
                      <select
                        id="data-backup-frequency"
                        className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white"
                        aria-label="Data Backup Frequency"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Retention Period</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>6 months</option>
                        <option>1 year</option>
                        <option>3 years</option>
                        <option>7 years</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="auto-archive" 
                        type="checkbox" 
                        checked 
                        className="w-4 h-4 text-sky-600 bg-sky-950 border-sky-800 rounded focus:ring-sky-500"
                        onChange={() => {}}
                      />
                      <label htmlFor="auto-archive" className="ml-2 text-sm text-white">Auto-archive completed projects</label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Manual Backup</Button>
                  </div>
                </div>
                
                <div className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex items-start mb-4">
                    <List className="w-5 h-5 text-sky-300 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Default Values</h3>
                      <p className="text-sm text-sky-300/80">Set system-wide default values for new entities</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Default Project Status</label>
                      <label htmlFor="default-project-status" className="sr-only">Default Project Status</label>
                      <select
                        id="default-project-status"
                        className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white"
                        aria-label="Default Project Status"
                      >
                        <option>Planning</option>
                        <option>In Progress</option>
                        <option>On Hold</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Default User Role</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>Client</option>
                        <option>Driver</option>
                        <option>Engineer</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Default Issue Priority</label>
                      <select className="p-1 text-sm border rounded bg-sky-950/30 border-sky-800/50 text-white">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-sky-950/30 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-3">System Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-sky-300/60">Version</p>
                  <p className="text-white">2.3.0</p>
                </div>
                <div>
                  <p className="text-sky-300/60">Last Updated</p>
                  <p className="text-white">Oct 18, 2023</p>
                </div>
                <div>
                  <p className="text-sky-300/60">Database Size</p>
                  <p className="text-white">2.4 GB</p>
                </div>
                <div>
                  <p className="text-sky-300/60">Storage Used</p>
                  <p className="text-white">48.5 GB / 100 GB</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" size="sm">Reset to Defaults</Button>
              <Button variant="primary" size="sm">Save Settings</Button>
            </div>
          </Card>
        )}
      </div>
        </div>
      </div>
  );
}

export default UserManagement;
