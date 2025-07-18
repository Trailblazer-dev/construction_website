import React from 'react';
import { 
  FolderOpen, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  MapPin,
  Clock,
  Activity,
  BarChart,
  FileText
} from 'lucide-react';
import { mockDashboardStats, mockProjects, mockTasks, mockIssues, mockDeliveries } from '../../data/mockData';
import { StatCard } from '../UI/StatCard';
import { EnhancedStatCard } from '../UI/EnhancedStatCard';
import { ProjectList } from '../Projects/ProjectList';
import { TaskList } from '../Tasks/TaskList';
import { IssueList } from '../Issues/IssueList';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { QuickActions } from './QuickActions';
import { ProjectProgress } from './ProjectProgress';

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const recentProjects = mockProjects.slice(0, 3);
  const urgentTasks = mockTasks.filter(task => task.priority === 'high' || task.priority === 'critical').slice(0, 5);
  const recentIssues = mockIssues.slice(0, 2);
  const activeDeliveries = mockDeliveries.filter(delivery => delivery.status === 'in_transit');
  
  // Add admin dashboard header and user count
  const totalUsers = 35; // Example value - adjust as needed based on your data

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Header */}
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-construction relative overflow-hidden">
        {/* Construction accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M95,50 L50,5 L5,50 L50,95 L95,50z" stroke="currentColor" strokeWidth="2" />
            <path d="M80,50 L50,20 L20,50 L50,80 L80,50z" stroke="currentColor" strokeWidth="2" />
            <path d="M65,50 L50,35 L35,50 L50,65 L65,50z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-primary-100 mt-2 max-w-3xl text-lg">
            Manage users, roles, and system settings for the road construction platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="accent" 
              icon={Users}
              size="lg"
              className="shadow-button-3d"
            >
              Manage Users
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              icon={Shield}
              size="lg"
            >
              Role Permissions
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              icon={Activity}
              size="lg"
            >
              View Audit Log
            </Button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <EnhancedStatCard
          title="Active Projects"
          value={stats.activeProjects}
          total={stats.totalProjects}
          icon={FolderOpen}
          trend="+12%"
          trendUp={true}
          color="primary"
          subtitle="Across multiple locations"
        />
        <EnhancedStatCard
          title="Available Vehicles"
          value={stats.availableVehicles}
          total={stats.totalVehicles}
          icon={Truck}
          trend="+5%"
          trendUp={true}
          color="accent"
          subtitle="Ready for dispatch"
        />
        <EnhancedStatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={Calendar}
          trend="-8%"
          trendUp={false}
          color="warning"
          subtitle="Requiring attention"
        />
        <EnhancedStatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          trend="+3"
          trendUp={true}
          color="success"
          subtitle="Active platform users"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Project Progress & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Project Progress" 
                subtitle="Key milestones and timeline overview" 
                actionLabel="View All Projects" 
                onAction={() => console.log('View all projects')}
                variant="elevated"
                className="h-full">
            <ProjectProgress projects={recentProjects} />
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card 
            title="Budget Overview" 
            subtitle="Financial status"
            icon={BarChart}
            variant="elevated">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-white">Total Budget</p>
                <p className="text-2xl font-bold text-white">
                  ${(stats.totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="w-12 h-12 bg-sky-300/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-sky-300" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Budget Used</span>
                <span className="font-medium text-white">
                  {Math.round((stats.spentBudget / stats.totalBudget) * 100)}%
                </span>
              </div>
              <div className="w-full bg-sky-950/50 rounded-full h-2.5">
                <div 
                  className="bg-sky-400 h-2.5 rounded-full" 
                  style={{ width: `${(stats.spentBudget / stats.totalBudget) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-sky-800/30">
              <div className="flex justify-between mb-2">
                <div className="text-sm">
                  <p className="text-white">Efficiency Rate</p>
                  <p className="text-xl font-semibold text-white">{stats.efficiency}%</p>
                </div>
                <div className="flex items-center text-sky-300">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 text-white border-sky-300/30 hover:bg-sky-300/10" size="sm">
                Financial Report
              </Button>
            </div>
          </Card>
          
          <Card 
            title="User Activity" 
            subtitle="Recent user logins"
            icon={Users}
            variant="elevated">
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-sky-950/50 rounded-lg">
                <div className="w-10 h-10 bg-sky-300/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Users className="w-5 h-5 text-sky-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    5 new users registered
                  </p>
                  <div className="flex items-center text-xs text-sky-300/80 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Last 30 days</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start p-3 bg-sky-950/50 rounded-lg">
                <div className="w-10 h-10 bg-sky-300/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Activity className="w-5 h-5 text-sky-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    28 active users today
                  </p>
                  <div className="flex items-center text-xs text-sky-300/80 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>87% of total users</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2 text-white border-sky-300/30 hover:bg-sky-300/10" size="sm">
                View User Management
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          title="Recent Tasks" 
          subtitle="Urgent items requiring attention"
          icon={Activity}
          variant="elevated"
          actionLabel="View All Tasks"
          onAction={() => console.log('View all tasks')}
          className="lg:col-span-2">
          <TaskList tasks={urgentTasks} className="mt-2" />
        </Card>
        
        <Card 
          title="Issues" 
          subtitle="Recent problems reported"
          icon={AlertTriangle}
          variant="elevated"
          actionLabel="View All Issues"
          onAction={() => console.log('View all issues')}>
          <IssueList issues={recentIssues} className="mt-2" />
        </Card>
      </div>
    </div>
  );
};
