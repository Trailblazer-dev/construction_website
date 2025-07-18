import React from 'react';
import { Calendar, Clock, TrendingUp, CheckCircle, AlertTriangle, Users, MapPin } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectProgressProps {
  projects: Project[];
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({ projects }) => {
  const getStatusIcon = (status: string, progress: number) => {
    switch (status) {
      case 'active':
        return progress > 75 
          ? <CheckCircle className="w-5 h-5 text-sky-300" /> 
          : <TrendingUp className="w-5 h-5 text-sky-300" />;
      case 'delayed':
        return <AlertTriangle className="w-5 h-5 text-warning-400" />;
      case 'on_hold':
        return <Clock className="w-5 h-5 text-sky-300/80" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-sky-300" />;
      default:
        return <Calendar className="w-5 h-5 text-sky-300/80" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-sky-300/20 text-sky-300';
      case 'planning': return 'bg-sky-300/20 text-sky-300';
      case 'delayed': return 'bg-warning-400/20 text-warning-400';
      case 'on_hold': return 'bg-sky-300/10 text-sky-300/80';
      case 'completed': return 'bg-sky-300/20 text-sky-300';
      case 'cancelled': return 'bg-danger-400/20 text-danger-400';
      default: return 'bg-sky-300/20 text-sky-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getProgressClass = (status: string, progress: number) => {
    if (status === 'delayed') return 'bg-warning-400';
    if (status === 'on_hold') return 'bg-sky-300/60';
    if (progress < 25) return 'bg-sky-400';
    if (progress < 50) return 'bg-sky-400';
    if (progress < 75) return 'bg-sky-300';
    return 'bg-sky-300';
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="border border-sky-800/30 rounded-lg p-4 bg-sky-950/70 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {getStatusIcon(project.status, project.progress)}
              <h3 className="text-lg font-medium text-white ml-2">{project.name}</h3>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(project.status)}`}>
              {project.status.replace('_', ' ')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-sky-300/60 mr-2" />
              <div>
                <p className="text-sky-300/80 font-medium">Timeline</p>
                <p className="text-white">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-sky-300/60 mr-2" />
              <div>
                <p className="text-sky-300/80 font-medium">Location</p>
                <p className="text-white">{project.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-sky-300/60 mr-2" />
              <div>
                <p className="text-sky-300/80 font-medium">Team</p>
                <p className="text-white">{project.teamMembers.length} members</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${project.priority === 'high' || project.priority === 'critical' ? 'bg-danger-400' : project.priority === 'medium' ? 'bg-warning-400' : 'bg-sky-300'} mr-2`}></div>
              <div>
                <p className="text-sky-300/80 font-medium">Priority</p>
                <p className="text-white capitalize">{project.priority}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-sky-300/80">Progress</span>
              <span className="font-medium text-white">{project.progress}%</span>
            </div>
            <div className="w-full bg-sky-950/50 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full ${getProgressClass(project.status, project.progress)}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className="text-sky-300/80">
                Budget: <span className="text-white font-medium">${project.budget.toLocaleString()}</span>
              </div>
              <div className={project.spent > project.budget ? "text-danger-400 font-medium" : "text-sky-300 font-medium"}>
                Spent: ${project.spent.toLocaleString()} 
                ({Math.round((project.spent / project.budget) * 100)}%)
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
