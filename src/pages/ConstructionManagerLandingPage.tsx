import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  Clock, 
  AlertTriangle, 
  Calendar,
  MapPin,
  HardHat,
  Plus,
  Users,
  Truck
} from 'lucide-react';

const ConstructionManagerLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  // Mock data for manager's projects
  const projects = [
    {
      id: 1,
      name: 'Highway 95 Expansion',
      location: 'Springfield County',
      completion: 65,
      status: 'On Track',
      budget: {
        allocated: 5800000,
        used: 3770000
      },
      teamSize: 28,
      issues: 3,
      dueDate: '2023-12-15'
    },
    {
      id: 2,
      name: 'Main Street Bridge Repair',
      location: 'Downtown Springfield',
      completion: 20,
      status: 'At Risk',
      budget: {
        allocated: 2500000,
        used: 500000
      },
      teamSize: 15,
      issues: 2,
      dueDate: '2024-02-28'
    },
    {
      id: 3,
      name: 'Downtown Intersection Upgrade',
      location: 'Springfield Center',
      completion: 40,
      status: 'Delayed',
      budget: {
        allocated: 1200000,
        used: 600000
      },
      teamSize: 12,
      issues: 4,
      dueDate: '2023-11-30'
    }
  ];
  
  // Mock data for team members across projects
  const teamMembers = [
    { id: 1, name: 'Elena Martinez', role: 'Lead Engineer', project: 'Highway 95 Expansion', status: 'Available' },
    { id: 2, name: 'David Wong', role: 'Civil Engineer', project: 'Main Street Bridge Repair', status: 'On Site' },
    { id: 3, name: 'Mike Johnson', role: 'Driver Team Lead', project: 'Multiple', status: 'Available' },
    { id: 4, name: 'Sarah Adams', role: 'Environmental Specialist', project: 'Highway 95 Expansion', status: 'Unavailable' }
  ];
  
  // Mock critical issues
  const criticalIssues = [
    { 
      id: 1, 
      title: 'Material shortage affecting south section', 
      project: 'Highway 95 Expansion',
      severity: 'High',
      reportedBy: 'Elena Martinez',
      date: '2023-10-18'
    },
    { 
      id: 2, 
      title: 'Unexpected soil condition discovered', 
      project: 'Main Street Bridge Repair',
      severity: 'Medium',
      reportedBy: 'David Wong',
      date: '2023-10-19'
    }
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Weekly Progress Meeting - Highway 95', date: '2023-10-25', time: '10:00 AM' },
    { id: 2, title: 'Client Review - Bridge Repair', date: '2023-10-27', time: '02:00 PM' },
    { id: 3, title: 'Site Inspection - Downtown Intersection', date: '2023-10-28', time: '09:00 AM' }
  ];
  
  // Mock resources status
  const resourcesStatus = {
    vehicles: { total: 45, inUse: 32, maintenance: 5, available: 8 },
    equipment: { total: 120, inUse: 78, maintenance: 12, available: 30 },
    materials: { 
      concrete: { status: 'Sufficient', lastDelivery: '2023-10-15' },
      asphalt: { status: 'Low', lastDelivery: '2023-10-10' },
      steel: { status: 'Ordered', expectedDelivery: '2023-10-25' }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Construction Manager Dashboard Header */}
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Construction Manager Dashboard</h1>
              <p className="text-primary-100 mt-1">Welcome back! Here's your project overview</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <HardHat className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Team Members</p>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Critical Issues</p>
                  <p className="text-2xl font-bold">{criticalIssues.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-700/50 p-4 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-accent-400" />
                <div className="ml-3">
                  <p className="text-primary-200 text-sm">Upcoming Events</p>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-earth-900">Project Overview</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'active' ? 'bg-primary-600 text-white' : 'bg-earth-200 text-earth-700'}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'completed' ? 'bg-primary-600 text-white' : 'bg-earth-200 text-earth-700'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <Card key={project.id} className="border-l-4 border-primary-600">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-earth-900">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'On Track' ? 'bg-success-100 text-success-800' : 
                    project.status === 'At Risk' ? 'bg-warning-100 text-warning-800' : 
                    'bg-danger-100 text-danger-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="flex items-center text-earth-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{project.location}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-earth-700 mb-1">
                    <span>Progress</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div className="w-full bg-earth-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.status === 'On Track' ? 'bg-success-500' : 
                        project.status === 'At Risk' ? 'bg-warning-500' : 
                        'bg-danger-500'
                      }`} 
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-earth-500">Budget Used</p>
                    <p className="text-sm font-semibold text-earth-800">
                      ${(project.budget.used / 1000000).toFixed(1)}M / ${(project.budget.allocated / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-earth-500">Due Date</p>
                    <p className="text-sm font-semibold text-earth-800">{project.dueDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-earth-500">Team Size</p>
                    <p className="text-sm font-semibold text-earth-800">{project.teamSize} members</p>
                  </div>
                  <div>
                    <p className="text-xs text-earth-500">Open Issues</p>
                    <p className="text-sm font-semibold text-earth-800">{project.issues} issues</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-earth-200">
                  <Button className="w-full">View Project Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Quick Access Section - Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column */}
        <div>
          {/* Critical Issues */}
          <Card className="mb-6">
            <div className="p-4 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-warning-500" />
                  Critical Issues
                </h3>
                <Button variant="text">View All</Button>
              </div>
            </div>
            <div className="divide-y divide-earth-200">
              {criticalIssues.map(issue => (
                <div key={issue.id} className="p-4 hover:bg-earth-50">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-earth-900">{issue.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.severity === 'High' ? 'bg-danger-100 text-danger-800' : 'bg-warning-100 text-warning-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-earth-600 mb-2">Project: {issue.project}</p>
                  <div className="flex justify-between text-xs text-earth-500">
                    <span>Reported by: {issue.reportedBy}</span>
                    <span>Date: {issue.date}</span>
                  </div>
                </div>
              ))}
              {criticalIssues.length === 0 && (
                <div className="p-4 text-center text-earth-500">
                  No critical issues at this time
                </div>
              )}
            </div>
          </Card>
          
          {/* Upcoming Events */}
          <Card>
            <div className="p-4 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                  Upcoming Events
                </h3>
                <Button variant="text">View All</Button>
              </div>
            </div>
            <div className="divide-y divide-earth-200">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-4 hover:bg-earth-50">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-earth-900">{event.title}</h4>
                  </div>
                  <div className="flex items-center text-sm text-earth-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Right Column */}
        <div>
          {/* Team Overview */}
          <Card className="mb-6">
            <div className="p-4 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-500" />
                  Team Members
                </h3>
                <Button variant="text">View All</Button>
              </div>
            </div>
            <div className="divide-y divide-earth-200">
              {teamMembers.map(member => (
                <div key={member.id} className="p-4 hover:bg-earth-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-earth-900">{member.name}</h4>
                      <div className="flex text-sm">
                        <span className="text-earth-600">{member.role}</span>
                        <span className="mx-2 text-earth-300">|</span>
                        <span className="text-earth-600">{member.project}</span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.status === 'Available' ? 'bg-success-100 text-success-800' : 
                        member.status === 'On Site' ? 'bg-primary-100 text-primary-800' : 
                        'bg-earth-100 text-earth-800'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Resources Status */}
          <Card>
            <div className="p-4 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-earth-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-primary-500" />
                  Resources Status
                </h3>
                <Button variant="text">Manage</Button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium text-earth-900 mb-2">Vehicles</h4>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-primary-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Total</p>
                    <p className="font-bold text-primary-700">{resourcesStatus.vehicles.total}</p>
                  </div>
                  <div className="bg-warning-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">In Use</p>
                    <p className="font-bold text-warning-700">{resourcesStatus.vehicles.inUse}</p>
                  </div>
                  <div className="bg-danger-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Maintenance</p>
                    <p className="font-bold text-danger-700">{resourcesStatus.vehicles.maintenance}</p>
                  </div>
                  <div className="bg-success-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Available</p>
                    <p className="font-bold text-success-700">{resourcesStatus.vehicles.available}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-earth-900 mb-2">Equipment</h4>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-primary-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Total</p>
                    <p className="font-bold text-primary-700">{resourcesStatus.equipment.total}</p>
                  </div>
                  <div className="bg-warning-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">In Use</p>
                    <p className="font-bold text-warning-700">{resourcesStatus.equipment.inUse}</p>
                  </div>
                  <div className="bg-danger-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Maintenance</p>
                    <p className="font-bold text-danger-700">{resourcesStatus.equipment.maintenance}</p>
                  </div>
                  <div className="bg-success-50 p-2 rounded-md text-center">
                    <p className="text-earth-600">Available</p>
                    <p className="font-bold text-success-700">{resourcesStatus.equipment.available}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-earth-900 mb-2">Materials</h4>
                <div className="divide-y divide-earth-200">
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-earth-800">Concrete</span>
                    <div className="flex items-center">
                      <span className={`mr-2 px-2 py-1 text-xs rounded-full ${
                        resourcesStatus.materials.concrete.status === 'Sufficient' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
                      }`}>
                        {resourcesStatus.materials.concrete.status}
                      </span>
                      <span className="text-xs text-earth-500">Last: {resourcesStatus.materials.concrete.lastDelivery}</span>
                    </div>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-earth-800">Asphalt</span>
                    <div className="flex items-center">
                      <span className="mr-2 px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-800">
                        {resourcesStatus.materials.asphalt.status}
                      </span>
                      <span className="text-xs text-earth-500">Last: {resourcesStatus.materials.asphalt.lastDelivery}</span>
                    </div>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-earth-800">Steel</span>
                    <div className="flex items-center">
                      <span className="mr-2 px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                        {resourcesStatus.materials.steel.status}
                      </span>
                      <span className="text-xs text-earth-500">Expected: {resourcesStatus.materials.steel.expectedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConstructionManagerLandingPage;
