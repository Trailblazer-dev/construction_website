import React from 'react';
import { Card } from '../UI/Card';
import { 
  FolderPlus, 
  Truck, 
  FileText, 
  AlertTriangle, 
  UserPlus,
  Calendar,
  BarChart2,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'New Project',
      icon: FolderPlus,
      description: 'Create a new construction project',
      link: '/projects/new',
      color: 'bg-primary-500/20 text-primary-400'
    },
    {
      title: 'Schedule Delivery',
      icon: Truck,
      description: 'Arrange material or equipment transport',
      link: '/transport/schedule',
      color: 'bg-accent-500/20 text-accent-400'
    },
    {
      title: 'Upload Document',
      icon: FileText,
      description: 'Share plans, permits, or reports',
      link: '/documents/upload',
      color: 'bg-success-500/20 text-success-400'
    },
    {
      title: 'Report Issue',
      icon: AlertTriangle,
      description: 'Report a problem requiring attention',
      link: '/issues/new',
      color: 'bg-danger-500/20 text-danger-400'
    },
    {
      title: 'Add Team Member',
      icon: UserPlus,
      description: 'Invite new users to the platform',
      link: '/users/invite',
      color: 'bg-warning-500/20 text-warning-400'
    },
    {
      title: 'View Schedule',
      icon: Calendar,
      description: 'Check project timelines and deadlines',
      link: '/calendar',
      color: 'bg-primary-500/20 text-primary-400'
    },
    {
      title: 'Generate Report',
      icon: BarChart2,
      description: 'Create custom performance reports',
      link: '/reports/new',
      color: 'bg-accent-500/20 text-accent-400'
    },
    {
      title: 'Site Locations',
      icon: MapPin,
      description: 'View and manage construction sites',
      link: '/locations',
      color: 'bg-success-500/20 text-success-400'
    }
  ];

  return (
    <Card title="Quick Actions" subtitle="Frequently used tasks and shortcuts" variant="elevated">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {actions.map((action, index) => (
          <Link 
            to={action.link} 
            key={index}
            className="block h-full"
          >
            <div className="flex flex-col items-center justify-start h-full p-3 rounded-lg bg-sky-950/50 border border-sky-800/30 hover:bg-sky-900/30 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium text-white text-center mb-1">{action.title}</h3>
              {/* Fix the text overlap by limiting description height and adding overflow ellipsis */}
              <p className="text-xs text-sky-300/70 text-center w-full h-9 overflow-hidden line-clamp-2">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};
