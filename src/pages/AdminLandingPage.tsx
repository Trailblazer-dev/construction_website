import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  Settings, 
  Users, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Database,
  FileText,
  Lock,
  UserPlus,
  UserCheck,
  Trash2,
  Edit,
  Bell,
  Calendar,
  HardHat,
  Truck,
  Wrench
} from 'lucide-react';

const AdminLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'activity'>('users');
  
  // Mock user statistics
  const userStats = {
    total: 52,
    active: 48,
    pending: 2,
    inactive: 2,
    byRole: {
      admin: 2,
      construction_manager: 5,
      engineer: 25,
      driver: 12,
      client: 8
    }
  };
  
  // Mock system health statistics
  const systemHealth = {
    serverStatus: 'Operational',
    lastBackup: '2023-10-20 03:00 AM',
    storageUsed: '24.5 GB',
    storageTotal: '100 GB',
    activeConnections: 18,
    avgResponseTime: '0.8s',
    uptime: '99.9%'
  };
  
  // Mock recent activity
  const recentActivity = [
    { 
      id: 1, 
      user: 'John Smith', 
      action: 'Created a new project', 
      target: 'Highway 95 Expansion', 
      timestamp: '2023-10-20 14:25:32' 
    },
    { 
      id: 2, 
      user: 'Admin User', 
      action: 'Added new user', 
      target: 'Robert Johnson', 
      timestamp: '2023-10-20 11:30:15' 
    },
    { 
      id: 3, 
      user: 'Elena Martinez', 
      action: 'Uploaded document', 
      target: 'Bridge Support Structure.pdf', 
      timestamp: '2023-10-20 10:15:45' 
    },
    { 
      id: 4, 
      user: 'Sarah Wong', 
      action: 'Approved design', 
      target: 'Main Street Bridge Repair', 
      timestamp: '2023-10-19 16:50:20' 
    },
    { 
      id: 5, 
      user: 'System', 
      action: 'Backup completed', 
      target: 'Database', 
      timestamp: '2023-10-19 03:00:00' 
    }
  ];
  
  // Mock pending approvals
  const pendingApprovals = [
    { 
      id: 1, 
      type: 'User Registration', 
      requester: 'Thomas Anderson', 
      role: 'Engineer', 
      date: '2023-10-19',
      status: 'Pending'
    },
    { 
      id: 2, 
      type: 'Budget Increase', 
      requester: 'John Smith', 
      project: 'Highway 95 Expansion',
      amount: '$250,000', 
      date: '2023-10-18',
      status: 'Pending'
    },
    { 
      id: 3, 
      type: 'Permission Change', 
      requester: 'Elena Martinez', 
      role: 'Lead Engineer', 
      date: '2023-10-20',
      status: 'Pending'
    }
  ];
  
  // Mock recent users
  const recentUsers = [
    { 
      id: 1, 
      name: 'Robert Johnson', 
      email: 'robert@example.com', 
      role: 'Traffic Engineer', 
      status: 'Active',
      created: '2023-10-18'
    },
    { 
      id: 2, 
      name: 'Lisa Wang', 
      email: 'lisa@example.com', 
      role: 'Client', 
      status: 'Active',
      created: '2023-10-15'
    },
    { 
      id: 3, 
      name: 'Thomas Anderson', 
      email: 'thomas@example.com', 
      role: 'Engineer', 
      status: 'Pending',
      created: '2023-10-19'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Dashboard Header */}
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-100 mt-1">System monitoring and management</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button>
                <Shield className="w-4 h-4 mr-2" />
                Security Audit
              </Button>
              <Button>
                <Database className="w-4 h-4 mr-2" />
                Backup Now
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{userStats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">System Status</p>
                  <p className="text-2xl font-bold text-success-400">Healthy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Pending Approvals</p>
                  <p className="text-2xl font-bold">{pendingApprovals.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Uptime</p>
                  <p className="text-2xl font-bold">{systemHealth.uptime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-earth-200">
          <div className="flex space-x-8">
            <button
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'users' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-earth-500 hover:text-earth-700 hover:border-earth-300'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-4 h-4 inline-block mr-2" />
              User Management
            </button>
            <button
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'system' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-earth-500 hover:text-earth-700 hover:border-earth-300'
              }`}
              onClick={() => setActiveTab('system')}
            >
              <Settings className="w-4 h-4 inline-block mr-2" />
              System Settings
            </button>
            <button
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'activity' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-earth-500 hover:text-earth-700 hover:border-earth-300'
              }`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity className="w-4 h-4 inline-block mr-2" />
              Activity Log
            </button>
          </div>
        </div>
      </div>
      
      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Distribution */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <div className="p-4 border-b border-earth-200">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-500" />
                  User Distribution
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-earth-600">Admins</span>
                      <span className="text-sm font-medium text-earth-900">{userStats.byRole.admin}</span>
                    </div>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(userStats.byRole.admin / userStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-earth-600">Construction Managers</span>
                      <span className="text-sm font-medium text-earth-900">{userStats.byRole.construction_manager}</span>
                    </div>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(userStats.byRole.construction_manager / userStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-earth-600">Engineers</span>
                      <span className="text-sm font-medium text-earth-900">{userStats.byRole.engineer}</span>
                    </div>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(userStats.byRole.engineer / userStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-earth-600">Drivers</span>
                      <span className="text-sm font-medium text-earth-900">{userStats.byRole.driver}</span>
                    </div>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(userStats.byRole.driver / userStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-earth-600">Clients</span>
                      <span className="text-sm font-medium text-earth-900">{userStats.byRole.client}</span>
                    </div>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(userStats.byRole.client / userStats.total) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-success-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-success-600">{userStats.active}</div>
                    <div className="text-xs text-earth-600">Active</div>
                  </div>
                  <div className="bg-warning-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-warning-600">{userStats.pending}</div>
                    <div className="text-xs text-earth-600">Pending</div>
                  </div>
                  <div className="bg-earth-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-earth-600">{userStats.inactive}</div>
                    <div className="text-xs text-earth-600">Inactive</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b border-earth-200">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary-500" />
                  Permission Groups
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center p-2 hover:bg-earth-50 rounded-md">
                    <HardHat className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-earth-900">Construction Managers</h4>
                      <p className="text-xs text-earth-600">Project oversight, team management</p>
                    </div>
                    <Button size="sm" className="ml-auto">Edit</Button>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-earth-50 rounded-md">
                    <Wrench className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-earth-900">Engineers</h4>
                      <p className="text-xs text-earth-600">Technical work, document uploads</p>
                    </div>
                    <Button size="sm" className="ml-auto">Edit</Button>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-earth-50 rounded-md">
                    <Truck className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-earth-900">Drivers</h4>
                      <p className="text-xs text-earth-600">Delivery routes, transport logistics</p>
                    </div>
                    <Button size="sm" className="ml-auto">Edit</Button>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-earth-50 rounded-md">
                    <Users className="w-5 h-5 text-primary-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-earth-900">Clients</h4>
                      <p className="text-xs text-earth-600">View projects, check reports</p>
                    </div>
                    <Button size="sm" className="ml-auto">Edit</Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Create New Group
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Recent Users and Approvals */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="p-4 border-b border-earth-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-earth-900 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-primary-500" />
                    Recent Users
                  </h3>
                  <Button>View All Users</Button>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-earth-200">
                  <thead className="bg-earth-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Created</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-earth-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-earth-200">
                    {recentUsers.map(user => (
                      <tr key={user.id} className="hover:bg-earth-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-earth-900">{user.name}</div>
                              <div className="text-sm text-earth-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-500">{user.created}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-danger-600 hover:text-danger-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b border-earth-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-earth-900 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-primary-500" />
                    Pending Approvals
                  </h3>
                  <Button>View All</Button>
                </div>
              </div>
              <div className="divide-y divide-earth-200">
                {pendingApprovals.map(approval => (
                  <div key={approval.id} className="p-4 hover:bg-earth-50">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-earth-900">{approval.type}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-800">
                        {approval.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-earth-600">
                        {approval.type === 'Budget Increase' 
                          ? `Requested ${approval.amount} increase for ${approval.project}`
                          : approval.type === 'User Registration'
                            ? `New ${approval.role} account for ${approval.requester}`
                            : `Role change to ${approval.role} for ${approval.requester}`
                        }
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-earth-500">
                        <Calendar className="w-3 h-3 inline-block mr-1" />
                        Requested on {approval.date}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Reject</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {/* System Settings Tab */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Health */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-4 border-b border-earth-200">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary-500" />
                  System Health
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-earth-600">Server Status</span>
                    <span className="font-medium text-success-600">{systemHealth.serverStatus}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-earth-600">Last Backup</span>
                    <span className="font-medium text-earth-900">{systemHealth.lastBackup}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-earth-600">Storage Used</span>
                    <span className="font-medium text-earth-900">
                      {systemHealth.storageUsed} / {systemHealth.storageTotal}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-earth-600">Active Connections</span>
                    <span className="font-medium text-earth-900">{systemHealth.activeConnections}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-earth-600">Avg Response Time</span>
                    <span className="font-medium text-earth-900">{systemHealth.avgResponseTime}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-earth-600">Uptime</span>
                    <span className="font-medium text-success-600">{systemHealth.uptime}</span>
                  </li>
                </ul>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Run Diagnostics
                  </Button>
                  <Button>
                    <Database className="w-4 h-4 mr-2" />
                    Backup Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* System Settings */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-4 border-b border-earth-200">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary-500" />
                  System Configuration
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-earth-900 mb-3">Security Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Two-Factor Authentication</span>
                          <p className="text-xs text-earth-500">Require 2FA for administrative accounts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary-600">
                          <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Password Policy</span>
                          <p className="text-xs text-earth-500">Require strong passwords and 90-day rotation</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary-600">
                          <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Session Timeout</span>
                          <p className="text-xs text-earth-500">Automatically log out inactive users after 30 minutes</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-earth-300">
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-earth-900 mb-3">Backup & Maintenance</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Automatic Backups</span>
                          <p className="text-xs text-earth-500">Daily backups at 03:00 AM</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary-600">
                          <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Backup Retention</span>
                          <p className="text-xs text-earth-500">Keep backups for 30 days</p>
                        </div>
                        <select className="border-earth-300 rounded-md text-sm">
                          <option>7 days</option>
                          <option>14 days</option>
                          <option selected>30 days</option>
                          <option>90 days</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Maintenance Window</span>
                          <p className="text-xs text-earth-500">Schedule system updates during off-hours</p>
                        </div>
                        <select className="border-earth-300 rounded-md text-sm">
                          <option>Sunday 01:00 AM</option>
                          <option selected>Sunday 03:00 AM</option>
                          <option>Saturday 03:00 AM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-earth-900 mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Security Alerts</span>
                          <p className="text-xs text-earth-500">Notify admins of suspicious login attempts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary-600">
                          <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">System Notifications</span>
                          <p className="text-xs text-earth-500">Send alerts for system events to admins</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-primary-600">
                          <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-earth-800">Email Digests</span>
                          <p className="text-xs text-earth-500">Send weekly system health reports</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-earth-300">
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-earth-200 flex justify-end space-x-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {/* Activity Log Tab */}
      {activeTab === 'activity' && (
        <div>
          <Card>
            <div className="p-4 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary-500" />
                  System Activity Log
                </h3>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Log
                  </Button>
                  <Button>
                    <Bell className="w-4 h-4 mr-2" />
                    Configure Alerts
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-earth-200">
                <thead className="bg-earth-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Action</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-earth-200">
                  {recentActivity.map(activity => (
                    <tr key={activity.id} className="hover:bg-earth-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-500">
                        {activity.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold text-xs">
                            {activity.user === 'System' ? 'SYS' : activity.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3 text-sm font-medium text-earth-900">
                            {activity.user}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900">
                        {activity.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-500">
                        {activity.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-earth-50 border-t border-earth-200 flex items-center justify-between">
              <div className="text-sm text-earth-700">
                Showing <span className="font-medium">5</span> of <span className="font-medium">250</span> events
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-earth-300 rounded-md text-sm text-earth-700 hover:bg-earth-100">
                  Previous
                </button>
                <button className="px-3 py-1 border border-earth-300 rounded-md text-sm text-earth-700 hover:bg-earth-100">
                  Next
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminLandingPage;
