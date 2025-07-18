import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, AlertCircle, CheckCircle2, HelpCircle, MoreHorizontal, AlertTriangle } from 'lucide-react';
import type { Task } from '../../types';
import { clsx } from 'clsx';

interface TaskListProps {
  tasks: Task[];
  compact?: boolean;
  showProjectName?: boolean;
  className?: string;
}

const statusColors = {
  pending: 'bg-warning-400/20 text-warning-400 border-warning-400/30',
  in_progress: 'bg-sky-300/20 text-sky-300 border-sky-300/30',
  review: 'bg-accent-400/20 text-accent-400 border-accent-400/30',
  completed: 'bg-success-400/20 text-success-400 border-success-400/30',
  blocked: 'bg-danger-400/20 text-danger-400 border-danger-400/30',
};

const priorityColors = {
  low: 'border-l-sky-300/30',
  medium: 'border-l-warning-400',
  high: 'border-l-sky-400',
  critical: 'border-l-danger-400',
};

const statusIcons = {
  pending: AlertCircle,
  in_progress: Clock,
  review: HelpCircle,
  completed: CheckCircle2,
  blocked: AlertTriangle,
};

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  compact = false, 
  showProjectName = false,
  className = ''
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 bg-sky-950/50 rounded-lg border border-sky-800/30 shadow-sm">
        <p className="text-white font-medium">No tasks found</p>
        <p className="text-sky-300/80 text-sm mt-1">Tasks will appear here once created</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {tasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        
        return (
          <Link
            key={task.id}
            to={`/projects/${task.projectId}/tasks/${task.id}`}
            className={clsx(
              'block p-4 border-l-4 bg-sky-950/50 hover:bg-sky-900/30 transition-all duration-200',
              priorityColors[task.priority],
              'rounded-lg border border-sky-800/30 shadow-sm hover:shadow-md'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h4 className="text-base font-semibold text-white truncate font-heading">
                    {task.title}
                  </h4>
                  <span className={clsx(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    statusColors[task.status]
                  )}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                
                {showProjectName && (
                  <div className="text-xs text-sky-300 font-medium mt-0.5">
                    Project: {task.projectId}
                  </div>
                )}
                
                {!compact && (
                  <p className="text-sky-300/80 mt-1.5 text-sm line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-sky-300/80">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-sky-300" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-sky-300" />
                    <span>Assigned to User {task.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-sky-300/60" />
                    <span>{task.estimatedHours}h estimated</span>
                  </div>
                </div>

                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {task.tags.slice(0, compact ? 2 : 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-950/70 text-sky-300 border border-sky-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > (compact ? 2 : 4) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-950/70 text-sky-300/60 border border-sky-800/30">
                        <MoreHorizontal className="w-3 h-3 mr-0.5" />
                        {task.tags.length - (compact ? 2 : 4)} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {task.priority === 'critical' && (
                <div className="ml-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-danger-400/20 text-danger-400 border border-danger-400/30">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-danger-400" />
                    Critical
                  </span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
