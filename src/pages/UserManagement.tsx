import React, { useState } from 'react';
import { Plus, Edit, Trash, Search, Filter, ShieldCheck, Users } from 'lucide-react';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2023-10-20T14:30:00' },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'construction_manager', status: 'active', lastLogin: '2023-10-19T09:15:00' },
  { id: 3, name: 'Elena Martinez', email: 'elena@example.com', role: 'engineer', status: 'active', lastLogin: '2023-10-18T16:45:00' },
  { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'driver', status: 'inactive', lastLogin: '2023-10-10T11:20:00' },
  { id: 5, name: 'Sarah Wong', email: 'client@example.com', role: 'client', status: 'active', lastLogin: '2023-10-17T13:30:00' }
];

// Role data
const userRoles = [
  { id: 1, name: 'Admin', description: 'Full system access', permissions: ['all'] },
  { id: 2, name: 'Construction Manager', description: 'Manages construction projects and teams', permissions: ['projects', 'teams', 'reports'] },
  { id: 3, name: 'Engineer', description: 'Handles technical aspects and documentation', permissions: ['engineering', 'documents'] },
  { id: 4, name: 'Driver', description: 'Manages deliveries and transportation', permissions: ['transport'] },
  { id: 5, name: 'Client', description: 'Limited access to project information', permissions: ['view_projects', 'comments'] }
];

// Simple button component
const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  onClick
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'danger'; 
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}) => {
  const baseClasses = "flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors";
  
  const variantClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Tab component
const Tab = ({ 
  label, 
  icon, 
  active, 
  onClick 
}: { 
  label: string; 
  icon: React.ReactNode; 
  active: boolean; 
  onClick: () => void; 
}) => (
  <button
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
      active 
        ? 'bg-primary-100 text-primary-500' 
        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  // Filter users based on search term and role filter
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !roleFilter || user.role === roleFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Filter roles based on search term
  const filteredRoles = userRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-charcoal-800 rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-earth-800">User Management</h2>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'users' ? 'Add User' : 'Create Role'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-earth-200 pb-3">
          <Tab 
            label="Users" 
            icon={<Users className="h-4 w-4" />} 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <Tab 
            label="Roles & Permissions" 
            icon={<ShieldCheck className="h-4 w-4" />} 
            active={activeTab === 'roles'} 
            onClick={() => setActiveTab('roles')} 
          />
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" />
            <input
              type="text"
              placeholder={activeTab === 'users' ? "Search users..." : "Search roles..."}
              className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === 'users' && (
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={roleFilter || ''}
                onChange={(e) => setRoleFilter(e.target.value || null)}
                className="py-2 px-3 text-sm border border-gray-300 rounded-md text-gray-800"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="construction_manager">Construction Manager</option>
                <option value="engineer">Engineer</option>
                <option value="driver">Driver</option>
                <option value="client">Client</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                More Filters
              </Button>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-charcoal-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-charcoal-800 divide-y divide-charcoal-700">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-charcoal-700">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-100">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {user.role.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-earth-100 text-earth-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-earth-600">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-800">Edit</button>
                        <button className="text-danger-600 hover:text-danger-800">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Roles List Panel */}
            <div className="bg-charcoal-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-earth-800 mb-4">Available Roles</h3>
              <div className="space-y-3">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map(role => (
                    <div 
                      key={role.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedRole === role.id 
                          ? 'bg-primary-100 border-l-4 border-primary-500' 
                          : 'bg-charcoal-700 hover:bg-charcoal-600'
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="font-medium text-earth-800">{role.name}</div>
                      <div className="text-sm text-earth-600">{role.description}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-earth-500">
                    No roles match your search
                  </div>
                )}
              </div>
            </div>

            {/* Role Details Panel */}
            <div className="md:col-span-2 bg-charcoal-800 border border-charcoal-700 rounded-lg">
              {selectedRole ? (
                <div className="p-6">
                  {userRoles.filter(role => role.id === selectedRole).map(role => (
                    <div key={role.id}>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-earth-800">{role.name}</h3>
                          <p className="text-earth-600">{role.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="danger" size="sm">
                            <Trash className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="mb-6 p-4 bg-charcoal-700 rounded-md">
                        <div className="flex flex-col md:flex-row md:justify-between mb-2">
                          <span>Role ID: {role.id}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-earth-800 mb-2">Permissions:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {role.permissions.map((permission, index) => (
                            <div key={index} className="px-3 py-2 bg-earth-100 rounded text-sm text-earth-700">
                              {permission}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                  <div className="bg-earth-100 rounded-full p-4 mb-4">
                    <Search className="h-8 w-8 text-earth-400" />
                  </div>
                  <h3 className="text-lg font-medium text-earth-800 mb-2">No Role Selected</h3>
                  <p className="text-earth-600">Please select a role from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
        