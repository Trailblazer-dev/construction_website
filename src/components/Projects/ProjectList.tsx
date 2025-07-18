import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, AlertTriangle, CheckCircle2, PauseCircle, Loader2 } from 'lucide-react';
import type { Project } from '../../types';
import { clsx } from 'clsx';

interface ProjectListProps {
  projects: Project[];
  compact?: boolean;
  className?: string;
}

const statusColors = {
  planning: 'bg-warning-400/20 text-warning-400 border-warning-400/30',
  active: 'bg-success-400/20 text-success-400 border-success-400/30',
  delayed: 'bg-danger-400/20 text-danger-400 border-danger-400/30',
  on_hold: 'bg-sky-300/10 text-sky-300/80 border-sky-300/30',
  completed: 'bg-accent-400/20 text-accent-400 border-accent-400/30',
  cancelled: 'bg-sky-300/10 text-sky-300/60 border-sky-300/20',
};

const priorityColors = {
  low: 'border-l-sky-300/30',
  medium: 'border-l-warning-400',
  high: 'border-l-sky-400',
  critical: 'border-l-danger-400',
};

const statusIcons = {
  planning: Loader2,
  active: Clock,
  delayed: AlertTriangle,
  on_hold: PauseCircle,
  completed: CheckCircle2,
  cancelled: AlertTriangle,
};

export const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  compact = false,
  className = '' 
}) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8 bg-sky-950/50 rounded-lg border border-sky-800/30 shadow-sm">
        <p className="text-white font-medium">No projects found</p>
        <p className="text-sky-300/80 text-sm mt-1">Projects will appear here once created</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {projects.map((project) => {
        const StatusIcon = statusIcons[project.status];
        
        return (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className={clsx(
              'block p-4 border-l-4 bg-sky-950/50 hover:bg-sky-900/30 transition-all duration-200',
              priorityColors[project.priority],
              'rounded-lg border border-sky-800/30 shadow-sm hover:shadow-md'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-white truncate font-heading">
                    {project.name}
                  </h3>
                  <span className={clsx(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    statusColors[project.status]
                  )}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                
                {!compact && (
                  <p className="text-sky-300/80 mt-1.5 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-sky-300/80">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-sky-300" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-sky-300" />
                    <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-sky-300/60" />
                    <span>{project.teamMembers.length} members</span>
                  </div>
                </div>

                {!compact && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-sky-300/80">Progress</span>
                      <span className="font-medium text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-sky-950/50 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={clsx(
                          'h-2.5 rounded-full',
                          project.status === 'delayed' ? 'bg-danger-400' :
                          project.status === 'completed' ? 'bg-success-400' :
                          project.status === 'on_hold' ? 'bg-warning-400' :
                          project.status === 'planning' ? 'bg-sky-400' :
                          'bg-sky-400'
                        )}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!compact && (
                <div className="ml-4 text-right">
                  <div className="text-sm text-sky-300/80">Budget</div>
                  <div className="text-lg font-semibold text-white">
                    ${(project.budget / 1000000).toFixed(1)}M
                  </div>
                  <div className={clsx(
                    'text-sm',
                    project.spent > project.budget ? 'text-danger-400' : 
                    project.spent > project.budget * 0.9 ? 'text-warning-400' : 
                    'text-success-400'
                  )}>
                    ${(project.spent / 1000000).toFixed(1)}M spent
                  </div>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
