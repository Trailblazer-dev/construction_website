import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Truck, 
  HardHat, 
  FileText,
  Filter
} from 'lucide-react';

// TypeScript interfaces for dashboard data
interface ProjectSummary {
  id: number;
  name: string;
  completion: number;
  status: 'On Track' | 'At Risk' | 'Delayed';
  dueDate: string;
}

interface KpiData {
  label: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<any>;
  trend: 'up' | 'down' | 'neutral';
}

interface IssueItem {
  id: number;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  project: string;
  reportedBy: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'Delivery' | 'Inspection' | 'Meeting' | 'Deadline';
}

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  // Mock data for the dashboard
  const projects: ProjectSummary[] = [
    { id: 1, name: 'Highway 95 Expansion', completion: 65, status: 'On Track', dueDate: '2023-12-15' },
    { id: 2, name: 'Main Street Bridge Repair', completion: 20, status: 'At Risk', dueDate: '2024-02-28' },
    { id: 3, name: 'Downtown Intersection Upgrade', completion: 40, status: 'Delayed', dueDate: '2023-11-30' },
    { id: 4, name: 'Riverside Road Resurfacing', completion: 85, status: 'On Track', dueDate: '2023-11-15' }
  ];
  
  const kpis: KpiData[] = [
    { label: 'Active Projects', value: 8, change: 2, icon: HardHat, trend: 'up' },
    { label: 'Budget Utilization', value: '78%', change: -3, icon: BarChart3, trend: 'down' },
    { label: 'Fleet Utilization', value: '85%', change: 5, icon: Truck, trend: 'up' },
    { label: 'Pending Approvals', value: 12, change: 4, icon: FileText, trend: 'up' }
  ];
  
  const issues: IssueItem[] = [
    { 
      id: 1, 
      title: 'Material shortage affecting south section', 
      severity: 'High', 
      project: 'Highway 95 Expansion', 
      reportedBy: 'Elena Martinez', 
      status: 'In Progress',
      date: '2023-10-18' 
    },
    { 
      id: 2, 
      title: 'Unexpected soil condition discovered', 
      severity: 'Medium', 
      project: 'Main Street Bridge Repair', 
      reportedBy: 'David Wong', 
      status: 'Open',
      date: '2023-10-19' 
    },
    { 
      id: 3, 
      title: 'Safety compliance issue at site entrance', 
      severity: 'High', 
      project: 'Downtown Intersection Upgrade', 
      reportedBy: 'Sarah Adams', 
      status: 'Open',
      date: '2023-10-20' 
    }
  ];
  
  const upcomingEvents: UpcomingEvent[] = [
    { id: 1, title: 'Concrete delivery for Highway 95', date: '2023-10-22', time: '08:30 AM', type: 'Delivery' },
    { id: 2, title: 'Safety inspection at Bridge site', date: '2023-10-23', time: '10:00 AM', type: 'Inspection' },
    { id: 3, title: 'Project status meeting with clients', date: '2023-10-24', time: '02:00 PM', type: 'Meeting' },
    { id: 4, title: 'Downtown project phase 1 deadline', date: '2023-10-25', time: '05:00 PM', type: 'Deadline' }
  ];

  // Filter projects by status
  const onTrackProjects = projects.filter(p => p.status === 'On Track').length;
  const atRiskProjects = projects.filter(p => p.status === 'At Risk').length;
  const delayedProjects = projects.filter(p => p.status === 'Delayed').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Construction Dashboard</h1>
          <p className="text-sm text-sky-300/80 mt-1">
            Overview of your construction projects and key metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <span className="text-sm text-sky-300/80">View:</span>
          <div className="flex bg-sky-950/50 rounded-lg p-1">
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeRange === 'day' ? 'bg-sky-300/20 text-sky-300' : 'text-sky-300/60 hover:text-sky-300'}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeRange === 'week' ? 'bg-sky-300/20 text-sky-300' : 'text-sky-300/60 hover:text-sky-300'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md ${timeRange === 'month' ? 'bg-sky-300/20 text-sky-300' : 'text-sky-300/60 hover:text-sky-300'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={index} variant="elevated" className="h-full">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300">
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-sky-300/80">{kpi.label}</h3>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full flex items-center ${
                    kpi.trend === 'up' ? 'bg-success-900/20 text-success-400' : 
                    kpi.trend === 'down' ? 'bg-danger-900/20 text-danger-400' : 
                    'bg-sky-900/20 text-sky-400'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : 
                     kpi.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-0.5" /> : null}
                    {kpi.change > 0 ? `+${kpi.change}%` : `${kpi.change}%`}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Project Status */}
        <Card 
          title="Project Status" 
          icon={BarChart3}
          variant="default" 
          className="lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-success-500 mr-2"></span>
                <span className="text-xs text-sky-300/80">On Track ({onTrackProjects})</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-warning-500 mr-2"></span>
                <span className="text-xs text-sky-300/80">At Risk ({atRiskProjects})</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-danger-500 mr-2"></span>
                <span className="text-xs text-sky-300/80">Delayed ({delayedProjects})</span>
              </div>
            </div>
            <button className="text-xs flex items-center text-sky-300 hover:text-sky-400">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </button>
          </div>
          
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="p-3 bg-sky-950/30 rounded-lg border border-sky-800/30">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-white">
                    <a href={`/projects/${project.id}`} className="hover:text-sky-300 transition-colors">
                      {project.name}
                    </a>
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    project.status === 'On Track' ? 'bg-success-900/20 text-success-400' :
                    project.status === 'At Risk' ? 'bg-warning-900/20 text-warning-400' :
                    'bg-danger-900/20 text-danger-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="mb-1">
                  <div className="flex justify-between text-xs text-sky-300/80 mb-1">
                    <span>Completion</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div className="w-full h-2 bg-sky-950/70 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        project.status === 'On Track' ? 'bg-success-500' :
                        project.status === 'At Risk' ? 'bg-warning-500' :
                        'bg-danger-500'
                      }`}
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-sky-300/60">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Schedule */}
        <Card 
          title="Upcoming Schedule" 
          icon={Calendar}
          variant="default"
        >
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start p-3 border-b border-sky-800/20 last:border-0">
                <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  event.type === 'Delivery' ? 'bg-sky-300/10 text-sky-300' :
                  event.type === 'Inspection' ? 'bg-warning-500/10 text-warning-400' :
                  event.type === 'Meeting' ? 'bg-primary-500/10 text-primary-400' :
                  'bg-danger-500/10 text-danger-400'
                }`}>
                  {event.type === 'Delivery' && <Truck className="w-5 h-5" />}
                  {event.type === 'Inspection' && <AlertTriangle className="w-5 h-5" />}
                  {event.type === 'Meeting' && <Users className="w-5 h-5" />}
                  {event.type === 'Deadline' && <Clock className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <div className="flex items-center mt-1 text-xs text-sky-300/60">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                    <Clock className="w-3 h-3 ml-2 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-center text-xs text-sky-300 hover:text-sky-400">
            View Full Schedule
          </button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Issues */}
        <Card 
          title="Critical Issues" 
          icon={AlertTriangle}
          variant="default"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {issues.map(issue => (
              <div key={issue.id} className={`p-3 rounded-lg border ${
                issue.severity === 'High' ? 'border-danger-800/30 bg-danger-950/10' :
                issue.severity === 'Medium' ? 'border-warning-800/30 bg-warning-950/10' :
                'border-sky-800/30 bg-sky-950/10'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{issue.title}</h3>
                    <p className="text-xs text-sky-300/80 mt-1">
                      Project: {issue.project} • Reported by: {issue.reportedBy}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      issue.severity === 'High' ? 'bg-danger-900/20 text-danger-400' :
                      issue.severity === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                      'bg-sky-900/20 text-sky-400'
                    }`}>
                      {issue.severity}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      issue.status === 'Open' ? 'bg-danger-900/20 text-danger-400' :
                      issue.status === 'In Progress' ? 'bg-warning-900/20 text-warning-400' :
                      'bg-success-900/20 text-success-400'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs text-sky-300/60">
                    {new Date(issue.date).toLocaleDateString()}
                  </div>
                  <button className="text-xs text-sky-300 hover:text-sky-400">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
