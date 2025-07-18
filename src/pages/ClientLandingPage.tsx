import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  BarChart3, 
  FolderOpen, 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  TrendingUp,
  Circle,
  Camera,
  MapPin,
  DollarSign,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientLandingPage: React.FC = () => {
  // Mock data for client projects
  const clientProjects = [
    {
      id: 1,
      name: 'Highway 95 Expansion',
      completion: 65,
      status: 'On Track',
      dueDate: '2023-12-15',
      lastUpdate: '2023-10-20',
      budget: {
        allocated: 5800000,
        used: 3770000
      }
    },
    {
      id: 2,
      name: 'Main Street Bridge Repair',
      completion: 20,
      status: 'At Risk',
      dueDate: '2024-02-28',
      lastUpdate: '2023-10-18',
      budget: {
        allocated: 2500000,
        used: 500000
      }
    }
  ];

  // Mock recent documents
  const recentDocuments = [
    { id: 1, name: 'Highway 95 - Environmental Impact Assessment', date: '2023-10-17', type: 'PDF' },
    { id: 2, name: 'Bridge Repair - Progress Photos', date: '2023-10-16', type: 'Image' },
    { id: 3, name: 'Highway 95 - October Financial Report', date: '2023-10-15', type: 'Excel' }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Weekly Progress Meeting', date: '2023-10-25', time: '10:00 AM' },
    { id: 2, title: 'Site Visit - Highway 95', date: '2023-10-27', time: '09:00 AM' },
    { id: 3, title: 'Quarterly Budget Review', date: '2023-10-30', time: '02:00 PM' }
  ];

  // Mock milestones
  const projectMilestones = [
    { id: 1, title: 'Environmental Approval', date: '2023-09-15', completed: true },
    { id: 2, title: 'Foundation Work', date: '2023-10-30', completed: false },
    { id: 3, title: 'Primary Structure', date: '2023-12-15', completed: false },
    { id: 4, title: 'Final Inspection', date: '2024-01-20', completed: false }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-construction relative overflow-hidden mb-8">
        {/* Construction accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome to Your Investor Dashboard
          </h1>
          <p className="text-primary-100 mt-2 max-w-3xl text-lg">
            Get real-time insights into your construction projects. Track progress, access documents, and stay informed with the latest updates.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="accent" 
              icon={FolderOpen}
              size="lg"
              className="shadow-button-3d"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              icon={FileText}
              size="lg"
            >
              <Link to="/documents">Access Documents</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              icon={MessageSquare}
              size="lg"
            >
              <Link to="/contact">Contact Project Manager</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Active Projects</h3>
              <p className="text-2xl font-bold text-white">{clientProjects.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-500/20 text-primary-400">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Overall Progress</h3>
              <p className="text-2xl font-bold text-white">
                {Math.round(clientProjects.reduce((acc, project) => acc + project.completion, 0) / clientProjects.length)}%
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success-500/20 text-success-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Total Investment</h3>
              <p className="text-2xl font-bold text-white">
                ${(clientProjects.reduce((acc, project) => acc + project.budget.allocated, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent-500/20 text-accent-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Next Milestone</h3>
              <p className="text-lg font-bold text-white truncate">Foundation Work</p>
              <p className="text-xs text-sky-300/60">Oct 30, 2023</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-warning-500/20 text-warning-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Project Overview Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Projects</h2>
          <Link to="/projects" className="text-sm text-sky-300 hover:text-sky-400 flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clientProjects.map(project => (
            <Card key={project.id} variant="elevated" className="h-full">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full flex items-center ${
                  project.status === 'On Track' ? 'bg-success-900/20 text-success-400' :
                  project.status === 'At Risk' ? 'bg-warning-900/20 text-warning-400' :
                  'bg-danger-900/20 text-danger-400'
                }`}>
                  <Circle className="w-2 h-2 mr-1 fill-current" />
                  {project.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sky-300/80">Completion</span>
                  <span className="font-medium text-white">{project.completion}%</span>
                </div>
                <div className="w-full h-2 bg-sky-950/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      project.status === 'On Track' ? 'bg-success-500' :
                      project.status === 'At Risk' ? 'bg-warning-500' :
                      'bg-danger-500'
                    }`}
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-sky-950/30 p-3 rounded-lg">
                  <p className="text-xs text-sky-300/80">Budget Utilization</p>
                  <p className="text-lg font-semibold text-white">
                    ${(project.budget.used / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-sky-300/80">
                    of ${(project.budget.allocated / 1000000).toFixed(1)}M 
                    ({Math.round((project.budget.used / project.budget.allocated) * 100)}%)
                  </p>
                </div>
                <div className="bg-sky-950/30 p-3 rounded-lg">
                  <p className="text-xs text-sky-300/80">Timeline</p>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-sky-300/80" />
                    <p className="text-sm font-semibold text-white">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-sky-300/80 mt-1">
                    Last update: {new Date(project.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" icon={Camera}>
                  <Link to={`/projects/${project.id}/photos`}>Site Photos</Link>
                </Button>
                <Button variant="primary" size="sm" icon={BarChart3}>
                  <Link to={`/projects/${project.id}/reports`}>Detailed Reports</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-8">
        <Card 
          title="Project Timeline" 
          icon={Calendar}
          variant="default"
        >
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 bg-sky-800/30"></div>
            <div className="space-y-6 relative">
              {projectMilestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start">
                  <div className={`relative flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full ${
                    milestone.completed 
                      ? 'bg-success-500/20 text-success-400' 
                      : 'bg-sky-300/20 text-sky-300/80'
                  }`}>
                    {milestone.completed 
                      ? <TrendingUp className="w-4 h-4" />
                      : <Clock className="w-4 h-4" />
                    }
                  </div>
                  <div className="ml-4 flex-1 pt-1 pb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white">{milestone.title}</h3>
                      <span className="text-sm text-sky-300/80">{new Date(milestone.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-1">
                      <div className="h-1.5 bg-sky-950/50 rounded-full w-full mt-2">
                        <div className={`h-full rounded-full ${milestone.completed ? 'bg-success-500' : 'bg-sky-300/20'}`} 
                          style={{ width: milestone.completed ? '100%' : '0%' }}></div>
                      </div>
                      <p className="text-xs text-sky-300/60 mt-1">
                        {milestone.completed ? 'Completed' : 'Upcoming'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Documents and Events Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          title="Recent Documents" 
          icon={FileText}
          variant="default"
          actionLabel="All Documents" 
          onAction={() => console.log('View all documents')}
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {recentDocuments.map(doc => (
              <div key={doc.id} className="flex items-center p-3 bg-sky-950/30 rounded-lg hover:bg-sky-950/50 transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300 mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{doc.name}</h4>
                  <p className="text-xs text-sky-300/70">
                    {new Date(doc.date).toLocaleDateString()} • {doc.type}
                  </p>
                </div>
                <Button variant="ghost" size="xs">View</Button>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card 
            title="Upcoming Events" 
            icon={Calendar}
            variant="default"
          >
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 bg-sky-950/30 rounded-lg">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <div className="flex items-center mt-1 text-xs text-sky-300/70">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                    <Clock className="w-3 h-3 ml-2 mr-1" />
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card 
            title="Project Contacts" 
            icon={Phone}
            variant="default"
          >
            <div className="space-y-3">
              <div className="p-3 bg-sky-950/30 rounded-lg">
                <h4 className="text-sm font-medium text-white">John Smith</h4>
                <p className="text-xs text-sky-300/80">Project Manager</p>
                <div className="flex items-center mt-2 text-xs text-sky-300/70">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-sky-300/70">
                  <Mail className="w-3 h-3 mr-1" />
                  <span>john.smith@example.com</span>
                </div>
              </div>
              <div className="p-3 bg-sky-950/30 rounded-lg">
                <h4 className="text-sm font-medium text-white">Elena Martinez</h4>
                <p className="text-xs text-sky-300/80">Client Relations</p>
                <div className="flex items-center mt-2 text-xs text-sky-300/70">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>(555) 987-6543</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-sky-300/70">
                  <Mail className="w-3 h-3 mr-1" />
                  <span>elena.m@example.com</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <Card 
        title="Project Locations" 
        icon={MapPin}
        variant="default"
        className="mt-8"
      >
        <div className="bg-sky-950/30 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-sky-300/50 mb-3" />
            <p className="text-white">Interactive map will be displayed here</p>
            <p className="text-sm text-sky-300/70">Showing all project locations and construction sites</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClientLandingPage;
