import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  FileUp, 
  FolderOpen, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BarChart3,
  Users,
  PenTool,
  Image,
  FileText,
  FileCode,
  ExternalLink,
  Plus,
  Filter,
  ArrowUpRight,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EngineerLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'all'>('assigned');
  const [fileUploadModal, setFileUploadModal] = useState(false);
  
  // Mock data for engineer's projects
  const projects = [
    {
      id: 1,
      name: 'Highway 95 Expansion',
      role: 'Lead Engineer',
      status: 'In Progress',
      completion: 65,
      drawings: 18,
      dueDate: '2023-12-15',
      lastUpdate: '2023-10-20'
    },
    {
      id: 2,
      name: 'Main Street Bridge Repair',
      role: 'Design Engineer',
      status: 'Design Phase',
      completion: 20,
      drawings: 12,
      dueDate: '2024-02-28',
      lastUpdate: '2023-10-18'
    }
  ];
  
  // Mock data for technical drawings
  const drawings = [
    { 
      id: 1, 
      name: 'Highway 95 - Foundation Details', 
      project: 'Highway 95 Expansion',
      type: 'CAD',
      version: '3.2',
      updatedAt: '2023-10-18',
      status: 'Approved'
    },
    { 
      id: 2, 
      name: 'Bridge Support Structure', 
      project: 'Main Street Bridge Repair',
      type: 'Blueprint',
      version: '1.0',
      updatedAt: '2023-10-15',
      status: 'Under Review'
    },
    { 
      id: 3, 
      name: 'Highway 95 - Drainage System', 
      project: 'Highway 95 Expansion',
      type: 'PDF',
      version: '2.1',
      updatedAt: '2023-10-12',
      status: 'Revision Needed'
    },
    { 
      id: 4, 
      name: 'Bridge Access Points', 
      project: 'Main Street Bridge Repair',
      type: 'CAD',
      version: '1.2',
      updatedAt: '2023-10-05',
      status: 'Draft'
    }
  ];
  
  // Mock engineering tasks
  const tasks = [
    {
      id: 1,
      title: 'Review structural calculations for Highway 95',
      priority: 'High',
      dueDate: '2023-10-25',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Update bridge support diagrams',
      priority: 'Medium',
      dueDate: '2023-10-30',
      status: 'Not Started'
    },
    {
      id: 3,
      title: 'Finalize drainage specifications',
      priority: 'High',
      dueDate: '2023-10-22',
      status: 'In Progress'
    }
  ];
  
  // Mock team members
  const teamMembers = [
    { id: 1, name: 'Elena Martinez', role: 'Structural Engineer', online: true },
    { id: 2, name: 'David Wong', role: 'Civil Engineer', online: false },
    { id: 3, name: 'Sarah Adams', role: 'Environmental Specialist', online: true }
  ];
  
  // Mock recent comments
  const comments = [
    { 
      id: 1, 
      user: 'John Smith', 
      drawing: 'Highway 95 - Foundation Details',
      comment: 'Please check the reinforcement specifications on page 3.',
      time: '2 hours ago'
    },
    { 
      id: 2, 
      user: 'Elena Martinez', 
      drawing: 'Bridge Support Structure',
      comment: 'The updated load calculations look good. Ready for final review.',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Engineer Dashboard Header */}
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden mb-8">
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Engineer Dashboard</h1>
              <p className="text-primary-100 mt-1">Welcome back, Elena. You have 3 tasks due this week.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                icon={FileText}
                size="sm"
              >
                My Projects
              </Button>
              <Button 
                variant="accent" 
                icon={FileUp}
                size="sm"
                className="shadow-button-3d"
                onClick={() => setFileUploadModal(true)}
              >
                Upload Drawing
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Active Projects</h3>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Drawings</h3>
              <p className="text-2xl font-bold">{drawings.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Pending Tasks</h3>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Team Members</h3>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Technical Drawings */}
        <Card 
          title="Technical Drawings" 
          icon={FileCode}
          variant="default"
          className="lg:col-span-2"
          actionLabel="View All"
          onAction={() => console.log('View all drawings')}
        >
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'assigned' ? 'bg-primary-500/20 text-primary-300' : 'bg-sky-950/30 text-sky-300/70 hover:text-sky-300'}`}
                onClick={() => setActiveTab('assigned')}
              >
                Assigned to Me
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'all' ? 'bg-primary-500/20 text-primary-300' : 'bg-sky-950/30 text-sky-300/70 hover:text-sky-300'}`}
                onClick={() => setActiveTab('all')}
              >
                All Drawings
              </button>
            </div>
            <button className="flex items-center text-sky-300 hover:text-sky-400 text-sm">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Drawing Name</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Version</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drawings.map(drawing => (
                  <tr key={drawing.id} className="border-b border-sky-800/30 last:border-0 hover:bg-sky-950/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {drawing.type === 'CAD' && <FileCode className="w-4 h-4 mr-2 text-sky-300" />}
                        {drawing.type === 'Blueprint' && <Image className="w-4 h-4 mr-2 text-sky-300" />}
                        {drawing.type === 'PDF' && <FileText className="w-4 h-4 mr-2 text-sky-300" />}
                        <span className="text-sm font-medium text-white">{drawing.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-sky-300/80">{drawing.project}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-sky-300/80">{drawing.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-sky-300/80">v{drawing.version}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-sky-300/60">{drawing.updatedAt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        drawing.status === 'Approved' ? 'bg-success-900/20 text-success-400' :
                        drawing.status === 'Under Review' ? 'bg-warning-900/20 text-warning-400' :
                        drawing.status === 'Revision Needed' ? 'bg-danger-900/20 text-danger-400' :
                        'bg-sky-900/20 text-sky-400'
                      }`}>
                        {drawing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" title="View drawing">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" title="Update drawing">
                          <PenTool className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              icon={FileUp}
              onClick={() => setFileUploadModal(true)}
            >
              Upload New Drawing
            </Button>
          </div>
        </Card>

        {/* Tasks and Assignments */}
        <Card title="Tasks & Assignments" icon={Clock} variant="default">
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="p-3 bg-sky-950/30 rounded-lg border border-sky-800/30">
                <div className="flex justify-between">
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    task.priority === 'High' ? 'bg-danger-900/20 text-danger-400' :
                    task.priority === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                    'bg-sky-900/20 text-sky-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-sky-300/70">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Due: {task.dueDate}
                  </div>
                  <span className={`${
                    task.status === 'Completed' ? 'text-success-400' :
                    task.status === 'In Progress' ? 'text-warning-400' :
                    'text-sky-300/70'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button variant="primary" size="sm" icon={Plus} className="w-full">
              New Task
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress */}
        <Card 
          title="Project Progress" 
          icon={BarChart3}
          variant="default"
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            {projects.map(project => (
              <div key={project.id} className="p-4 bg-sky-950/30 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-white text-lg">{project.name}</h3>
                    <p className="text-sm text-sky-300/70">
                      Role: {project.role} • Last update: {project.lastUpdate}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'In Progress' ? 'bg-warning-900/20 text-warning-400' :
                    project.status === 'Design Phase' ? 'bg-primary-500/20 text-primary-300' :
                    project.status === 'Completed' ? 'bg-success-900/20 text-success-400' :
                    'bg-sky-900/20 text-sky-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-300/80">Completion</span>
                    <span className="font-medium text-white">{project.completion}%</span>
                  </div>
                  <div className="w-full h-2 bg-sky-950/70 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="text-xs text-sky-300/80 bg-sky-950/50 px-2 py-1 rounded">
                    <span className="font-medium">{project.drawings}</span> Drawings
                  </div>
                  <div className="text-xs text-sky-300/80 bg-sky-950/50 px-2 py-1 rounded">
                    Due: {project.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team & Collaboration */}
        <div className="space-y-6">
          <Card title="Engineering Team" icon={Users} variant="default">
            <div className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center p-3 bg-sky-950/30 rounded-lg">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {member.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-earth-900 rounded-full"></span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-sky-300/70">{member.role}</p>
                  </div>
                  <button className="ml-auto text-sky-300 hover:text-sky-400">
                    <MessageIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Recent Comments" icon={MessageIcon} variant="default">
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="p-3 bg-sky-950/30 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-white">{comment.user}</p>
                    <span className="text-xs text-sky-300/60">{comment.time}</span>
                  </div>
                  <p className="text-xs text-sky-300/80 mb-2">on {comment.drawing}</p>
                  <p className="text-sm text-white">{comment.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* File Upload Modal Placeholder - In a real app, implement a proper modal component */}
      {fileUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setFileUploadModal(false)}>
          <div className="bg-earth-800 p-6 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4">Upload Technical Drawing</h2>
            {/* File upload form would go here */}
            <div className="text-center">
              <p className="text-sky-300/80 mb-4">This would be a file upload interface in the complete application.</p>
              <Button variant="primary" onClick={() => setFileUploadModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple message icon component
const MessageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default EngineerLandingPage;
