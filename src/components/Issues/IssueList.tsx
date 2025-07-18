import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Wrench, 
  Cloud, 
  Package, 
  Hourglass, 
  HelpCircle,
  CheckCircle2,
  XCircle 
} from 'lucide-react';
import type { Issue } from '../../types';
import { clsx } from 'clsx';

interface IssueListProps {
  issues: Issue[];
  compact?: boolean;
  showProjectName?: boolean;
  className?: string;
}

const statusColors = {
  open: 'bg-danger-400/20 text-danger-400 border-danger-400/30',
  in_progress: 'bg-warning-400/20 text-warning-400 border-warning-400/30',
  resolved: 'bg-success-400/20 text-success-400 border-success-400/30',
  closed: 'bg-sky-300/20 text-sky-300 border-sky-300/30',
};

const severityColors = {
  low: 'border-l-sky-300/30',
  medium: 'border-l-warning-400',
  high: 'border-l-sky-400',
  critical: 'border-l-danger-400',
};

const typeIcons = {
  safety: AlertTriangle,
  quality: CheckCircle2,
  delay: Hourglass,
  equipment: Wrench,
  material: Package,
  weather: Cloud,
  other: HelpCircle,
};

const statusIcons = {
  open: AlertTriangle,
  in_progress: Clock,
  resolved: CheckCircle2,
  closed: XCircle,
};

export const IssueList: React.FC<IssueListProps> = ({ 
  issues, 
  compact = false,
  showProjectName = false,
  className = ''
}) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-8 bg-sky-950/50 rounded-lg border border-sky-800/30 shadow-sm">
        <p className="text-white font-medium">No issues found</p>
        <p className="text-sky-300/80 text-sm mt-1">Issues will appear here once reported</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {issues.map((issue) => {
        const TypeIcon = typeIcons[issue.type];
        const StatusIcon = statusIcons[issue.status];
        
        return (
          <Link
            key={issue.id}
            to={`/projects/${issue.projectId}/issues/${issue.id}`}
            className={clsx(
              'block p-4 border-l-4 bg-sky-950/50 hover:bg-sky-900/30 transition-all duration-200',
              severityColors[issue.severity],
              'rounded-lg border border-sky-800/30 shadow-sm hover:shadow-md'
            )}
          >
            <div className="flex items-start space-x-3">
              <div className={clsx(
                'w-9 h-9 rounded-lg flex items-center justify-center',
                issue.severity === 'critical' ? 'bg-danger-400/20' :
                issue.severity === 'high' ? 'bg-warning-400/20' :
                issue.severity === 'medium' ? 'bg-sky-300/20' :
                'bg-sky-300/10'
              )}>
                <TypeIcon className={clsx(
                  'w-5 h-5',
                  issue.severity === 'critical' ? 'text-danger-400' :
                  issue.severity === 'high' ? 'text-warning-400' :
                  issue.severity === 'medium' ? 'text-sky-300' :
                  'text-sky-300/80'
                )} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h4 className="text-base font-semibold text-white truncate font-heading">
                    {issue.title}
                  </h4>
                  <span className={clsx(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    statusColors[issue.status]
                  )}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {issue.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs bg-sky-950/70 text-sky-300 px-2 py-0.5 rounded-full border border-sky-800/30 capitalize">
                    {issue.type}
                  </span>
                </div>
                
                {showProjectName && (
                  <div className="text-xs text-sky-300 font-medium mt-0.5">
                    Project: {issue.projectId}
                  </div>
                )}
                
                {!compact && (
                  <p className="text-sky-300/80 mt-1.5 text-sm line-clamp-2">
                    {issue.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-sky-300/80">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-sky-300" />
                    <span>Reported by User {issue.reportedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-sky-300" />
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                  {issue.assignedTo && (
                    <div className="flex items-center space-x-1.5">
                      <User className="w-4 h-4 text-sky-300" />
                      <span>Assigned to User {issue.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>

              {issue.severity === 'critical' && (
                <div className="ml-1">
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
