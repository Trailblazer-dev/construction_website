import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Calendar, Upload, CheckSquare, List } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  
  // Mock project data
  const projects = [
    { id: 1, name: 'Highway 95 Expansion', status: 'In Progress', completion: 65, dueDate: '2023-12-15' },
    { id: 2, name: 'Main Street Bridge Repair', status: 'Planning', completion: 20, dueDate: '2024-02-28' },
    { id: 3, name: 'Downtown Intersection Upgrade', status: 'On Hold', completion: 40, dueDate: '2023-11-30' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Project Management</h1>
        <Button variant="primary" size="md">
          <span className="mr-2">New Project</span>
          <span className="text-xl">+</span>
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-sky-800/30 mb-4">
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'timeline' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Timeline
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'documents' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('documents')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Documents
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'status' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('status')}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Status
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'list' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('list')}
          >
            <List className="w-4 h-4 mr-2" />
            List View
          </button>
        </div>

        {activeTab === 'timeline' && (
          <Card title="Project Timeline" variant="default">
            <div className="relative overflow-x-auto">
              {/* Timeline visualization would go here */}
              <div className="h-64 flex items-center justify-center text-sky-300/50">
                Timeline visualization will be implemented here
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card title="Project Documents" variant="default">
            <div className="p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-sky-300/50 mb-4" />
              <p className="text-sky-300/80 mb-4">Drag and drop files here or click to browse</p>
              <Button variant="outline" size="sm">Upload Files</Button>
            </div>
          </Card>
        )}

        {activeTab === 'status' && (
          <Card title="Project Status" variant="default">
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      project.status === 'In Progress' ? 'bg-blue-900/50 text-blue-300' :
                      project.status === 'Planning' ? 'bg-purple-900/50 text-purple-300' :
                      'bg-yellow-900/50 text-yellow-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-sky-300/80 mb-1">
                      <span>Completion</span>
                      <span>{project.completion}%</span>
                    </div>
                    <div className="w-full bg-sky-950 rounded-full h-2">
                      <div 
                        className="bg-sky-400 h-2 rounded-full" 
                        style={{ width: `${project.completion}%` }} 
                      />
                    </div>
                  </div>
                  <div className="text-xs text-sky-300/80">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'list' && (
          <Card title="Projects List" variant="default">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                  <tr>
                    <th className="px-6 py-3">Project Name</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Completion</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id} className="border-b border-sky-800/30">
                      <td className="px-6 py-4 font-medium text-white">{project.name}</td>
                      <td className="px-6 py-4">{project.status}</td>
                      <td className="px-6 py-4">{project.completion}%</td>
                      <td className="px-6 py-4">{new Date(project.dueDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sky-300 underline cursor-pointer">Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
